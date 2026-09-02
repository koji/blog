---
title: 'モノレポにおける依存関係のセキュリティをどう強化したか'
seoTitle: 'モノレポにおける依存関係のセキュリティをどう強化したか'
slug: 'strengthening-dependency-security-in-a-monorepo.ja'
description: 'モノレポにおける依存関係のサプライチェーンリスクを、1週間のパッケージクールダウン、lockfile、installスクリプトの無効化、GitHub ActionsのSHA固定、zizmorでどのように低減したかを紹介します。'
pubDate: '2026-04-23'
updatedDate: '2026-04-23'
tags: ['security', 'supply-chain-security', 'monorepo', 'npm', 'github-actions']
coverImage: './cover.png'
---

# モノレポにおける依存関係のセキュリティ強化

npm エコシステムでサプライチェーン攻撃が増加していることを受け、私たちはモノレポ全体での依存関係の管理方法を見直しました。本記事では、実施したセキュリティ強化の取り組みをまとめます。

## 背景

近年の攻撃パターンを見ると、パッケージが公開された直後に悪意のあるコードが仕込まれるケースが目立って増えています。しかし多くの場合、これらのパッケージは**公開から24〜48時間以内に検出・削除**されています。

ここから得られる重要な示唆は次の2点です。

- **公開されたばかりのパッケージをすぐに利用することはリスクが高い**
- **少し待つだけでリスクは大幅に下がる**

24〜48時間待つだけでも一定の防御になりますが、検出の遅れや週末をまたぐケースを考慮して、さらにバッファを持たせることにしました。その結果、**1週間のクールダウン期間**を設けることにしました。

このアプローチには次のようなメリットがあります。

- 既知の攻撃が取り除かれた後にパッケージを採用できる可能性が高まる
- 運用ルールとしてシンプルでわかりやすい

これを踏まえ、新しい依存関係の採用前にクールダウン期間を設けることを中心に、いくつかの対策を導入しました。

---

## 1. クールダウン期間の導入

### ポリシー

- 公開されたばかりのパッケージはすぐに使わない
- **公開から1週間以上経過した**パッケージのみ利用を許可する

### ツール別の実装

#### Yarn

```bash
yarn config set npmMinimalAgeGate 7
```

https://yarnpkg.com/configuration/yarnrc#npmMinimalAgeGate

この機能はモダンな Yarn（Berry）でのみサポートされています。そのため、**Yarn v1 からの移行**を進める良いきっかけにもなりました。

#### pnpm

以下のように設定します。

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080
```

https://pnpm.io/settings#minimumreleaseage

すでにワークスペースに適用済みです。

#### uv (Python)

```toml
# pyproject.toml
exclude-newer = "1 week"
```

https://docs.astral.sh/uv/reference/settings/#exclude-newer

| Tool | Configuration Key | Example Value                 |
| :--- | :---------------- | :---------------------------- |
| npm  | min-release-age   | 4320 (minutes)                |
| pnpm | minimumReleaseAge | 4320 (minutes)                |
| Yarn | npmMinimalAgeGate | "3d" (duration string)        |
| Bun  | minimumReleaseAge | 4320 (minutes in bunfig.toml) |

bun: https://bun.com/docs/runtime/bunfig#install-minimumreleaseage

---

## 2. Lockfile による依存関係管理

すべての依存関係のインストールで lockfile を使用するように徹底しています。

- `yarn.lock`
- `pnpm-lock.yaml`

これにより次のことが実現できます。

- 意図しないバージョンアップを防止する
- ローカル環境と CI/CD 環境の差異をなくす

`yarn`

```shell
yarn install --frozen-lockfile
```

`pnpm`

```shell
pnpm install --frozen-lockfile
```

---

## 3. postinstall スクリプトの無効化

`postinstall` スクリプトは便利な反面、サプライチェーン攻撃の侵入口としてもよく悪用されます。

私たちの対応は次のとおりです。

`.npmrc`

```properties
ignore-scripts=true
```

- **デフォルトで postinstall の実行を無効化する**

なお pnpm v10 ではこの挙動がネイティブにサポートされているため、追加の設定は不要でした。

---

## 4. GitHub Actions における SHA 固定

GitHub Actions も依存関係の一部と捉え、バージョン固定を強化しました。

### 変更前

```yaml
- uses: actions/checkout@v4
```

### 変更後

```yaml
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

**タグではなく特定のコミット SHA に固定する**ことで、次のメリットが得られます。

- サプライチェーン攻撃のリスクを低減できる
- 意図しないアップデートを防げる

ただし、この方法は yaml ファイルを手動で更新する必要があり、非常に手間がかかります。そのため、[pin-github-action](https://github.com/mheap/pin-github-action) のようなツールの導入を検討しています。

---

## 5. GitHub Actions の静的解析

最後のステップとして、GitHub Actions ワークフローのセキュリティ上の問題を検出するために [zizmor](https://github.com/zizmorcore/zizmor) を導入しました。

{% embed https://docs.zizmor.sh/trophy-case/ %}

---

## まとめ

今回の取り組みのポイントは次のとおりです。

- 新しいパッケージに**1週間のクールダウン期間**を設けた
- lockfile による**厳格な依存関係の固定**を徹底した
- **postinstall スクリプトの実行を制限**した
- GitHub Actions で **SHA 固定**を適用した

中でもクールダウン期間は、シンプルながら効果が高く、多くのプロジェクトですぐに導入できる対策です。

---

## おわりに

サプライチェーン攻撃は今後も増加していくと考えられます。しかし、

- 「最新バージョンをすぐに採用しない」
- 「依存関係を固定する」

といった基本的な実践だけでも、リスクを大きく減らすことができます。

モノレポを運用している方の依存関係セキュリティ改善の参考になれば幸いです。
