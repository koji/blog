---
title: 'WSL に Zellij をインストールする'
seoTitle: 'Windows Subsystem for Linux (WSL) に Zellij ターミナルマルチプレクサをインストールする方法'
slug: 'install-zellij-on-wsl.ja'
description: 'Windows Subsystem for Linux (WSL) に、強力なターミナルワークスペース兼マルチプレクサである Zellij をインストールするためのステップバイステップガイド。WSL のセットアップから Rust のインストール、Zellij の起動までを解説します。'
pubDate: '2024-11-27'
updatedDate: '2024-11-27'
tags: ['WSL', 'zellij', 'Windows', 'Linux']
coverImage: 'cover.png'
---

## Zellij とは？

> Zellij は開発者や運用担当者、そしてターミナルを愛するすべての人のためのワークスペースです。類似のプログラムは「ターミナルマルチプレクサ」と呼ばれることもあります。

リポジトリ  
https://github.com/zellij-org/zellij

## WSL に Zellij をインストールする

### ステップ1: WSL をインストールする

https://learn.microsoft.com/en-us/windows/wsl/install

### ステップ2: curl と build-essential をインストールする

```zsh
sudo apt update
sudo apt install curl build-essential
```

### ステップ3: Rust と Cargo をインストールする

以下のコマンドを実行すると、インストールオプションの選択を求められます。
特に理由がなければ、オプション 1 を選択することをおすすめします。

```zsh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

```zsh
# check rust version
rustc --version
rustc 1.82.0

# check cargo version
koji@kj-minis ~/dev/blog % cargo --version
cargo 1.82.0
```

### ステップ4: Zellij をインストールする

```zsh
cargo install --locked zellij
```

### ステップ5: Zellij のバージョンを確認して起動する

```zsh
# check zellij version
zellij --version
zellij 0.41.2
```

```zsh
# run zellij
zellij
```

![zellij-on-wsl](Zellij.png)
