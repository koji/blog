---
title: 'WSL2でDockerをアップデートするクイックガイド'
seoTitle: 'WSL2でDockerを素早く効率的にアップデートする方法'
slug: 'update-docker-on-wsl2.ja'
description: 'WSL2でDockerのバージョン確認からアップデートまでを、簡潔なステップバイステップで解説します。Docker環境を常に最新の状態に保ち、最適なパフォーマンスを維持しましょう。'
pubDate: '2024-12-20'
updatedDate: '2024-12-20'
tags: ['Docker', 'WSL2', 'Linux']
---

## 現在のDockerバージョンを確認する

Dockerをアップデートする前に、現在インストールされているバージョンを確認しておきましょう。次のコマンドを実行してください：

```shell
docker --version

Docker version 27.4.0, build bde2b89
```

## WSL2でDockerをアップデートする

WSL2環境でDockerをアップデートするには、次の手順に従ってください：

1. パッケージリストを更新し、利用可能なパッケージの最新情報を取得します：

```shell
sudo apt-get update
```

2. Docker関連のパッケージをアップグレードします：

```shell
sudo apt upgrade docker-ce docker-ce-cli containerd.io
```

## アップデート後のDockerバージョンを確認する

アップデートが完了したら、Dockerのバージョンが正常に更新されたことを確認します：

```shell
docker --version

Docker version 27.4.1, build b9d17ea
```
