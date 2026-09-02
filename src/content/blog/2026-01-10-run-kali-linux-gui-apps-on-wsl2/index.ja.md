---
title: 'WSL2でKali LinuxのGUIアプリを実行する'
seoTitle: 'WSLgを使ってWSL2でKali LinuxのGUIアプリを実行する方法'
slug: 'run-kali-linux-gui-apps-on-wsl2.ja'
description: 'Windows 11のWSLgを活用してWSL2にKali Linuxをインストールし、GUIアプリケーションを実行する手順をステップバイステップで解説します。'
pubDate: '2026-01-10'
updatedDate: '2026-01-10'
tags: ['wsl', 'kali-linux', 'linux', 'windows']
coverImage: './cover.png'
---

Windows 11の Windows Subsystem for Linux 2（WSL2）では、**WSLg**のおかげでLinuxディストリビューションをフルGUIサポート付きで実行できます。本記事では、**WSL2にKali Linuxをインストール**し、**xeyes**や**Firefox**といったGUIアプリケーションをシームレスに動作させるためのグラフィカル環境を構築した手順を紹介します。

## ステップ1: WSLにKali Linuxをインストールする

まず、**ターミナル**（PowerShellまたはWindows Terminal）を管理者として開き、次のコマンドを実行します。

```bash
wsl --install -d kali-linux
```

このコマンドでKali LinuxがWSL2ディストリビューションとしてインストールされます。インストールが完了したら、スタートメニューからKali Linuxを起動し、初期セットアップ（ユーザー名とパスワードの設定）を完了してください。

---

## ステップ2: GUI環境（`WSLg`）を確認する

`WSLg`経由でGUIアプリケーションが表示できることを確認するため、Kali Linux内で次の環境変数をチェックします。

```bash
echo $WAYLAND_DISPLAY
echo $DISPLAY
```

次のような出力が表示されれば：

```text
wayland-0
:0
```

いずれか一方、または両方の変数が設定されていることになり、`WSLg`経由でGUIアプリケーションが動作する可能性が高い状態です。

---

## ステップ3: パッケージリストを更新する

追加のソフトウェアをインストールする前に、パッケージリストを更新します。

```bash
sudo apt update
```

---

## ステップ4: X11テスト用アプリケーションをインストールする

次に、GUI機能をテストするための基本的なX11アプリケーションをインストールします。

```bash
sudo apt install -y x11-apps
```

インストールが完了したら、簡単なGUIテストを実行します。

```bash
xeyes
```

![xeyes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gmohs23t6ar63kbwq58s.png)

目がアニメーションする小さなウィンドウが表示されれば、GUI環境は正常に動作しています 🎉

---

## ステップ5: Firefox（GUIアプリケーション）をインストールする

次に、実際のGUIアプリケーションであるFirefox ESRをインストールしてみましょう。

```bash
sudo apt install -y firefox-esr
```

インストールが完了したら、次のコマンドでFirefoxを起動します。

```bash
firefox-esr
```

![firefox](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m1f3cehskgdmz4zlmycs.png)

FirefoxがWindowsデスクトップ上に独立したウィンドウとして開き、WSL2内のKali Linuxから直接実行されていることが確認できます。

---

## まとめ

Windows 11とWSL2により、Kali LinuxのGUIアプリケーションを実行するのは非常に簡単になりました。WSLgのおかげで外部のXサーバーを設定する必要はなく、GUIアプリはそのまま動作します。

このセットアップは特に次のような用途に役立ちます。

- Kali Linuxのセキュリティテストツール
- Linux GUIアプリケーションの開発
- Windows上でのLinuxの学習や実験

まだWSLgを試したことがない方は、Windows 11の今こそ試す絶好の機会です。

Happy hacking! 🚀
