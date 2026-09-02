---
title: 'CursorでローカルLLMを使う方法'
seoTitle: 'Cursor IDEでローカルLLMを使う完全ガイド - Ollamaとngrokによるステップバイステップ解説'
slug: 'use-local-llm-with-cursor.ja'
description: 'Ollamaとngrokを使ってCursor IDEでローカルLLMをセットアップして使う方法を解説します。インストールから設定、連携までをステップバイステップで紹介する完全ガイドです。'
pubDate: '2025-06-10'
updatedDate: '2025-06-10'
tags: ['cursor', 'ollama', 'local-llm', 'ai', 'development', 'tutorial']
---

## 必要要件

- `Cursor` がマシンにインストールされていること
- `Ollama` がマシンにインストールされ、モデルを用意済みであること
- `ngrok` がマシンにインストールされ、ngrok アカウントを持っていること

### Step1. `Cursor` をインストールする

https://www.cursor.com/ にアクセスして Cursor をダウンロードし、マシンにインストールしてください。

### Step2. `Ollama` をインストールする

https://ollama.com/ にアクセスして Ollama をダウンロードし、マシンにインストールしてください。

### Step3. ngrok アカウントを作成して ngrok をインストールする

https://ngrok.com/ にアクセスして ngrok をダウンロードし、マシンにインストールしてください。
その後、ngrok のセットアップを行ってください。

### Step4. モデルをダウンロード（pull）する

本記事では `deepseek-r1` モデルを使用します。
https://ollama.com/library/deepseek-r1
ターミナルアプリを開いてください。

```shell
# 7Bモデル
ollama pull deepseek-r1:latest
```

### Step5. CORS を有効化して ngrok を実行する

```shell
# macOS & Linux
export OLLAMA_ORIGINS="*"

# Windowsの場合
set OLLAMA_ORIGINS="*"

ngrok http 11434 --host-header="localhost:11434"
```

### Step6. OpenAI API Key を設定する

1. pull したモデル名（今回の場合は `deepseek-r1:latest`）を入力し、`Add model` をクリックします
2. APIキーに `Ollama` と入力します
3. ngrok コマンドで取得した URL の末尾に `/v1` を付けて入力します
   URL は `https://ngrok_something/v1` のような形式になります
   ![config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/juwee414s4n1d3tuqzgo.png)
4. `Save` をクリックします

### Step7. Ollama の設定を確認する

もう少しで完了です。
`Verify` ボタンをクリックする前に、ローカル以外のモデルはすべて選択を解除してください。今回の場合は `deepseek-r1:latest` のみが選択された状態にします。
その後、`Verify` ボタンをクリックしてください。

### Step8. ローカルモデルを使う

これが最後のステップです。Cursor を開いてチャット（Ct
