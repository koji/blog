---
title: 'WSLでOllama LLMをGPUアクセラレーション付きでインストールして実行する方法'
seoTitle: 'WSLでOllama LLMをGPU対応でインストール・実行するガイド'
slug: 'ollama-llm-install-wsl.ja'
description: 'WSL上でGPUサポートを有効にしてOllama言語モデルをインストールし実行するためのステップバイステップガイド。マシンで最適なパフォーマンスを得るためのセットアップ方法を解説します。'
pubDate: '2024-10-26'
updatedDate: '2024-10-26'
tags: ['WSL', 'Ollama', 'LLM', 'Installation Guide', 'GPU Acceleration']
coverImage: 'cover.jpg'
---

### 前提条件

始める前に、以下の準備が整っていることを確認してください：

1. **WSL (Windows Subsystem for Linux)** がWindowsマシンにインストールされていること。  
   [WSLのインストールについて詳しく見る](https://learn.microsoft.com/en-us/windows/wsl/install?source=post_page-----9d53151e254a--------------------------------)

2. **curl**: Ollamaのダウンロードに必要です。

```zsh
 sudo apt install curl
```

### ステップ1: CurlでOllamaをインストールする

ターミナルで以下のコマンドを実行してOllamaをインストールします：

```zsh
curl https://ollama.ai/install.sh | sh
```

### ステップ2: Ollamaを実行する

インストールが完了したら、Ollamaを起動してLlama3.2モデルを実行できます。利用可能な他のモデルは[こちら](https://ollama.ai/library)で確認できます。

```zsh
ollama serve
```

新しいターミナルのタブで、以下のコマンドを実行してモデルを取得して起動します：

本記事ではLlama3.2を実行してみます。

> Llama 3.2
> Meta Llama 3.2は、1Bおよび3Bサイズの多言語大規模言語モデル（LLM）コレクションで、事前学習済みおよび指示チューニング済みの生成モデルです（テキスト入力／テキスト出力）。Llama 3.2の指示チューニング済みテキスト専用モデルは、エージェントによる検索や要約タスクを含む多言語対話のユースケース向けに最適化されており、一般的な業界ベンチマークで多くのオープンソースおよびクローズドなチャットモデルを上回る性能を発揮します。

https://ollama.com/library/llama3.2

```zsh
ollama run llama3.2
```

マシンにGPU（例：RTX3070）が搭載されている場合、GPUが使用されていることを示す出力が確認できます。

<video src="https://github.com/user-attachments/assets/b78361c6-6a8e-4429-8f47-e87cc564d42b"></video>

### ステップ3: Ollamaを終了する

Ollamaを終了するには、次のように入力します：

```zsh
/bye
```

その後、`ollama serve`を実行しているターミナルで `Ctrl + C` を押します。
