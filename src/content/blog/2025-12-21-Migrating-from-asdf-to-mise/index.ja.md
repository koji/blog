---
title: 'asdfからmiseへ移行する — ハマりどころを避ける実践ガイド'
seoTitle: 'asdfからmiseへの移行ガイド'
slug: 'migration-from-asdf-to-mise.ja'
description: 'asdfからmiseへの移行を実践デバッグに基づいて解説する日本語ガイド。'
pubDate: '2025-12-21'
updatedDate: '2025-12-21'
tags: ['asdf', 'mise', 'toolchain', 'version-manager', 'cli']
coverImage: 'cover.png'
---

## 1. asdfのプラグインを削除してアンインストール

```shell
# プラグインを削除
asdf plugin list | xargs -n 1 asdf plugin remove

# asdfをアンインストール
brew uninstall asdf --force
brew autoremove
```

`.zshrc` を整理します。

```shell
# ASDF configuration
. "$BREW_PREFIX/opt/asdf/libexec/asdf.sh"
```

ファイルを削除:

```shell
rm -rf ~/.asdf
rm -rf ~/.tool-versions
```

asdfが削除されたことを確認します。

```shell
brew list asdf

# 成功していれば以下のようなエラーが表示されます
Error: No such keg: /opt/homebrew/Cellar/asdf
```

## 2. miseをインストール

https://github.com/jdx/mise  
https://mise.jdx.dev/getting-started.html

```shell
brew install mise
```

```shell
mise --version
```

`.zshrc` に以下を追加します（bash/fishの場合は `zsh` を置き換えてください）:

```shell
eval "$(mise activate zsh)"
```

## 3. miseのプラグインをインストール

この例では nodejs, pnpm, bun, yarn, python をインストールします。

```shell
mise plugins ls-remote
mise plugins ls --core
```

```shell
mise install node@22.21.1
mise install yarn@1.22.22
mise install pnpm@10.22.0
mise install bun@1.3.5
mise install python@3.12.12
```

または `mise.toml` 経由でインストール:

```toml
[tools]
node = "22.21.1"
python = "3.12.12"
yarn = "1.22.22"
pnpm = "10.22.0"
```

```shell
mise trust
mise install
```

## 4. asdf → mise コマンド対応表

| asdf (modern)              | mise equivalent                    | 備考                                   |
| -------------------------- | ---------------------------------- | --------------------------------------- |
| `.tool-versions`           | `mise.toml`                        | プロジェクト定義          |
| `asdf set <tool> <ver>`    | Edit `mise.toml`                   | `asdf set` replaces `asdf local/global` |
| `asdf install`             | `mise install`                     | 全ツールをインストール               |
| `asdf current`             | `mise current`                     | アクティブなバージョンを表示                    |
| `asdf plugin list`         | `mise ls`                          | インストール済みツール一覧                    |

日本語版のサンプル記事です。英語版と同じ `slug` で `index.ja.md` として配置することで、`/ja/migration-from-asdf-to-mise/` で表示されます。
