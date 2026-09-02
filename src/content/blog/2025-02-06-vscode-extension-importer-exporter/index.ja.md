---
title: 'シェルスクリプトでVSCode拡張機能を簡単にエクスポート・インポートする方法'
seoTitle: 'シェルスクリプトでVSCode拡張機能をエクスポート・インポートする方法'
slug: 'vscode-export-import-extensions.ja'
description: 'シンプルなシェルスクリプトでVSCode拡張機能をエクスポート・インポートする方法を解説します。インストール済みの拡張機能をファイルに保存し、手動でインストールボタンをクリックすることなく簡単に再インストールできます。'
pubDate: '2025-02-06'
updatedDate: '2025-02-06'
tags: ['vscode', 'extension', 'shell', 'productivity']
coverImage: './cover.jpg'
---

## シェルスクリプトでVSCode拡張機能をエクスポート・インポートする方法

複数のデバイスで Visual Studio Code を使っている場合や、OS を頻繁に再インストールする場合、拡張機能を手動で入れ直すのは手間がかかります。このシンプルなシェルスクリプトを使えば、ワンコマンドで VSCode 拡張機能のエクスポートとインポートを自動化できます。

### ステップ1: スクリプトを保存する

以下のスクリプトをコピーして、ホームディレクトリに `vscode-extension-importer-exporter.sh` という名前で保存してください:

```shell
#!/bin/bash

echo "Do you want to export or import VSCode extensions? (export/import)"
read action

if [ "$action" == "export" ]; then
  echo "Exporting VSCode extensions..."
  code --list-extensions > vscode-extensions.txt
  echo "Extensions have been exported to vscode-extensions.txt"
elif [ "$action" == "import" ]; then
  echo "Importing VSCode extensions..."
  while IFS= read -r extension; do
    code --install-extension "$extension"
  done < vscode-extensions.txt
  echo "Extensions have been imported from vscode-extensions.txt"
else
  echo "Invalid action. Please choose 'export' or 'import'."
fi
```

### ステップ2: スクリプトを実行可能にする

スクリプトを保存したら、以下のコマンドで実行権限を付与します:

```shell
chmod +x vscode-extension-importer-exporter.sh
```

### ステップ3: スクリプトを実行する

以下のコマンドでスクリプトを実行します:

```shell
./vscode-extension-importer-exporter.sh
```

### 仕組み

スクリプトを実行すると、VSCode 拡張機能をエクスポートするかインポートするかを選択するよう求められます:

- **エクスポート:** インストール済みの VSCode 拡張機能を一覧取得し、`vscode-extensions.txt` というファイルに保存します。
- **インポート:** `vscode-extensions.txt` ファイルを読み込み、各拡張機能を自動的にインストールします。

#### `vscode-extensions.txt` の出力例

```text
ms-azuretools.vscode-docker
ms-edgedevtools.vscode-edge-devtools
ms-python.autopep8
ms-python.debugpy
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-vscode-remote.remote-containers
ms-vscode.makefile-tools
ms-vscode.vscode-typescript-next
```

### このスクリプトを使うメリット

- 新しいマシンのセットアップ時間を大幅に節約できます。
- 複数のデバイス間で同じ拡張機能の構成を保てます。
- 拡張機能を手動で検索してインストールする手間が不要になります。

このシンプルなスクリプトで、VSCode 拡張機能の管理がぐっと楽になります！🚀
