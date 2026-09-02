---
title: 'Raspberry PiにDockerをインストールする方法'
seoTitle: 'Raspberry PiにDockerをインストールする完全ガイド - ステップバイステップ解説'
slug: 'how-to-install-docker-raspberry-pi.ja'
description: 'Raspberry PiにDockerをインストールして、コンテナ化されたアプリケーションのための環境を構築する方法を、わかりやすいステップバイステップガイドで解説します。'
pubDate: '2024-12-26'
updatedDate: '2024-12-26'
tags: ['docker', 'raspberry pi']
coverImage: 'raspberry-pi.jpg'
---

Photo by <a href="https://unsplash.com/@praveentcom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Praveen Thirumurugan</a> on <a href="https://unsplash.com/photos/red-and-white-circuit-board-VHTVtYTNr8M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Raspberry PiにDockerをインストールする

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## ユーザーをdockerグループに追加する

```shell
sudo gpasswd -a $USER docker   # Add user to the docker group
newgrp docker                 # Refresh the group membership
```

## Dockerのインストールを確認する

このコマンドで、Raspberry PiにDockerが正常にインストールされたか確認できます。

```shell
docker --version

Docker version 27.4.1, build b9d17ea
```

## Hello World

このコマンドは、Dockerが正常に動作しているかを確認するためのテストコンテナを実行します。

```shell
docker container run --rm hello-world
```
