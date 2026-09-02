---
title: 'Intel MacでTeraxをソースからビルドする'
seoTitle: 'Intel MacでTeraxをソースからビルドする'
slug: 'building-terax-from-source-on-an-intel-mac.ja'
description: 'TeraxはIntel Mac向けのビルドを提供していないため、自分でコンパイルしました。本記事では、Intel Mac上のmacOSでTeraxをソースからビルドするための環境構築、必要なツール、ステップバイステップの手順を解説します。'
pubDate: '2026-06-22'
updatedDate: '2026-06-22'
tags: ['terax', 'terminal', 'cli']
---

長い間Warpを愛用していましたが、新機能が追加されるにつれて徐々に重くなってきたため、Ghosttyに乗り換えました。Ghosttyは自作のフラグメントシェーダーを背景に設定できるのが気に入っています。その後、Ghosttyベースでさらに多機能なCmuxを試し、1ヶ月ほど使いました。しかし想定以上にメモリ使用量が多かったため、iTerm2に戻ろうかと考えていたところ、[Better Stack](https://www.youtube.com/watch?v=3L8htHUzAI4)でTeraxを見つけました。

残念ながらTeraxはIntel Mac向けのビルドを提供していないため、自分でビルドすることにしました。この記事では、その手順を紹介します。

## 私のターミナル遍歴

1. Terminal app

2. iTerm 2 (still using)
   https://iterm2.com/

3. Warp
   https://www.warp.dev/

4. Ghostty
   https://ghostty.org/

5. Cmux
   https://cmux.com

6. Terax ← now
   https://terax.app/

Warpは大好きでしたが

> A lightweight AI terminal with a built-in editor, AI agents, and live web preview. 7 MB on disk. 300 ms cold start. BYOK or fully local.

#### 現在の環境

他のターミナルアプリと同様に背景に画像を設定できますが、Teraxはより軽量で高速です 😎

![Terax](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/p1bhebm30ek2w1embt0f.png)

GitHubリポジトリ
https://github.com/crynta/terax-ai

## Teraxをソースからビルドする

### 前提条件

- **Rust**（stable）— [rustup](https://rustup.rs)からインストール
- **Node.js** 20+
- **pnpm** v10 — [mise](https://mise.jdx.dev)経由（推奨）または直接インストール
- [Tauriの前提条件ガイド](https://tauri.app/start/prerequisites/)に記載されているプラットフォームごとの前提条件

### miseまたはnpmでpnpm v10をインストール

```shell
mise install pnpm@10.32.1
mise use pnpm@10.32.1

# npm
npm i -g pnpm
```

## 開発ビルド

```bash
pnpm install
pnpm tauri dev
```

### 本番ビルド

### macOS — Intel (x86_64)

```shell
rustup target add x86_64-apple-darwin
pnpm install
pnpm tauri build --target x86_64-apple-darwin
```

出力先: `src-tauri/target/x86_64-apple-darwin/release/bundle/macos/Terax.app`

### 補足

- 初回ビルドはRustがすべての依存関係をゼロからコンパイルするため、20〜40分かかります。2回目以降はキャッシュが効くため大幅に高速になります。
- DMGの作成にはmacOS標準のツール（`hdiutil`）が必要です。DMG作成のステップが失敗しても、`Terax.app`バンドル自体は利用可能です — `/Applications`にコピーするか、直接実行してください。
- ローカルビルドではコード署名は任意です。CIではリリースビルド用にAppleの証明書と公証（notarization）を使用しています。
