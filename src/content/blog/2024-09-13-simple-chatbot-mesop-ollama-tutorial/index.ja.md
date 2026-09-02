---
title: 'Mesop + Ollama で作るシンプルなチャットボット — たった25行のコードで'
seoTitle: 'MesopとOllamaで25行未満のコードでシンプルなチャットボットを作る方法'
slug: 'simple-chatbot-mesop-ollama-tutorial.ja'
description: 'MesopとOllamaを使って、わずか25行未満のPythonコードで軽量なチャットボットを作成する方法を学びましょう。インテリジェントなチャットボットを素早く効率的に構築する手順をわかりやすく解説します。'
pubDate: '2024-09-13'
updatedDate: '2024-09-13'
tags: ['Python', 'Mesop', 'Ollama']
---

この記事では、MesopとOllamaを使ってシンプルなチャットボットを作成する方法を紹介します。

## Mesopとは？

https://google.github.io/mesop/

- PythonでWeb UIを素早く構築できるフレームワーク
- Google社内で迅速な内部アプリ開発に利用されています

MesopはGradioやStreamlitに似たフレームワークです。

## Step0 Ollamaをインストールする

Ollamaは以下のリンクからダウンロードできます。

https://ollama.com/download

## Step1 依存関係をインストールする

```shell
pip install mesop ollama
```

## Step2 チャットボットを書く

`app.py`

```python
import ollama
import mesop as me
import mesop.labs as mel

@me.page(
    path="/",
    title="Mesop ChatBot",
)
def page():
    mel.chat(transform, title="Ollama ChatBot with Mesop", bot_user="Mesop Bot")

def transform(input: str, history: list[mel.ChatMessage]):
    messages = [{"role": "user", "content": message.content} for message in history]
    messages.append({"role": "user", "content": input})

    stream = ollama.chat(model='llama3', messages=messages, stream=True)

    for chunk in stream:
        content = chunk.get('message', {}).get('content', '')
        if content:
            yield content
```

## Step3 チャットボットを実行する

```shell
mesop app.py
```

![chatbot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xzyfbtvt8ajebqxy3kry.png)
