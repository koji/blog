---
title: 'UbuntuからOllamaを完全にアンインストールする方法：ステップバイステップガイド'
seoTitle: '完全ガイド：UbuntuでOllamaをアンインストールして痕跡を残さず削除する方法【2024】'
slug: 'completely-uninstall-ollama-ubuntu.ja'
description: 'UbuntuからOllamaを正しくアンインストールする方法を、この包括的なガイドで解説します。サービス、バイナリ、設定ファイルなど、すべてのOllamaコンポーネントを削除し、システムをクリーンな状態に保つためのステップバイステップの手順を紹介します。'
pubDate: '2024-11-23'
updatedDate: '2024-11-23'
tags: ['ollama', 'ubuntu', 'linux']
coverImage: './cover.png'
---

UbuntuからOllamaをアンインストールするには、以下の手順に従ってください。

## 1. サービスの停止と無効化

まず、Ollamaサービスを停止し、起動時に自動起動しないように無効化します。

```zsh
sudo systemctl stop ollama
sudo systemctl disable ollama
```

## 2. Ollamaのファイルとディレクトリを削除する

サービスファイルを削除する

Ollamaのサービスファイルを削除します。

```zsh
sudo rm /etc/systemd/system/ollama.service
```

## 3. Ollamaバイナリを削除する

Ollamaの実行ファイルを削除します。

```zsh
sudo rm ${which ollama}
```

## 4. Ollamaのデータと設定をクリーンアップする

Ollamaのデータディレクトリと設定ファイルを削除します。

```zsh
sudo rm -r /usr/share/ollama
rm -rf ~/.ollama
```

## 6. Ollamaユーザーとグループを削除する

システムからOllamaユーザーとグループを削除します。

Ollama用に専用ユーザーを作成していない場合は、この手順は不要な場合があります。

```zsh
sudo userdel ollama
sudo groupdel ollama
```

## 7. アンインストールの確認

Ollamaが完全に削除されたことを確認するには、以下のコマンドを実行します。

```zsh
systemctl list-units --type=service | grep ollama
```

Ollamaサービスが一覧に表示されなくなれば、アンインストールは成功です。

## まとめ

以上の手順で、UbuntuからOllamaを正常にアンインストールできました。
