---
title: 'WSL2 + Ubuntu 24.04 で Docker をセットアップする簡単ガイド'
seoTitle: 'WSL2 + Ubuntu 24.04 で Docker を簡単にセットアップする方法'
slug: 'docker-setup-wsl2-ubuntu-24-04.ja'
description: 'WSL2 と Ubuntu 24.04 を使って Docker をセットアップする方法をステップバイステップで解説します。Windows 上で WSL2 による Linux 統合を活用し、開発環境を効率化しましょう。'
pubDate: '2024-09-14'
updatedDate: '2024-12-22'
tags: ['Windows', 'Linux', 'WSL']
coverImage: 'wsl.png'
---

## ステップ1. WSL2 を有効化する

https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-1---enable-the-windows-subsystem-for-linux

## ステップ2. WSL2 をアップデートする

```shell
wsl --update
```

## ステップ3. Ubuntu をインストールする

```shell
# check available distributions
wsl --list --online

# install 24.04
wsl --install -d Ubuntu-24.04
```

## ステップ4. curl と必要なパッケージをインストールする

```shell
sudo apt -y update
sudo apt -y install curl
sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

## ステップ5. Docker をインストールする

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# check docker version
docker -v
```

## ステップ6. 自分のユーザーアカウントを docker グループに追加する

```shell
sudo groupadd docker
sudo usermod -aG docker $USER
```

## 補足（オプション）

### メモリサイズを変更する

```shell
New-Item ~/.wslconfig
```

### `.wslconfig` にメモリ設定を追加する

```shell
[wsl2]
memory=32GB
```

### WSL をシャットダウンする

```shell
wsl --shutdown
```
