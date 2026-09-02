---
title: 'WSL2（Ubuntu）で BitNet を使って 1ビットLLMの推論を高速化する'
seoTitle: 'WSL2（Ubuntu）で BitNet による高速な 1ビットLLM推論を実行する'
slug: 'run-bitnet-wsl2-inference.ja'
description: 'CPUベースのフレームワークである BitNet を活用し、WSL2 Ubuntu 環境で 1ビットLLMの高速な推論を行う方法を紹介します。インストールからセットアップ、推論の実行までをステップバイステップで解説します。'
pubDate: '2024-10-20'
updatedDate: '2024-10-20'
tags: ['ai', 'llm', 'wsl', 'ubuntu']
---

## BitNet とは？

> bitnet.cpp は 1ビットLLM（例：BitNet b1.58）向けの公式推論フレームワークです。最適化されたカーネル群を提供し、CPU 上で 1.58ビットモデルの高速かつロスレスな推論をサポートします（NPU および GPU サポートは今後対応予定）。

**BitNet を活用することで、CPU のみで高速な推論を実行できるようになります。**

## BitNet のセットアップ

### パッケージのインストール

```shell
# you may need to use sudo if you get a permission error
bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"

# If you have not installed it yet, the following will be necessary.
sudo apt install clang
sudo apt install cmake
```

### リポジトリのクローン

```shell
git clone --recursive https://github.com/microsoft/BitNet.git
```

### 仮想環境の作成と Python パッケージのインストール

要件は Python 3.9 以上です。

```
cd  BitNet
python -m venv bitNetTest
source bitNetTest/bin/activate
pip install -r requirements.txt

# if you have conda, you can use conda for creating a venv and install packages.
```

### ビルド

このステップは時間がかかります。筆者の環境では約13分ほどかかりました。

```shell
python setup_env.py --hf-repo HF1BitLLM/Llama3-8B-1.58-100B-tokens -q i2_s
```

### 推論の実行

```shell
 python run_inference.py -m models/Llama3-8B-1.58-100B-tokens/ggml-model-i2_s.gguf -p "Write an essay about LLM" -t 12 -n 900
```

**オプション**

```shell
optional arguments:
  -h, --help            show this help message and exit
  -m MODEL, --model MODEL
                        Path to model file
  -n N_PREDICT, --n-predict N_PREDICT
                        Number of tokens to predict when generating text
  -p PROMPT, --prompt PROMPT
                        Prompt to generate text from
  -t THREADS, --threads THREADS
                        Number of threads to use
  -c CTX_SIZE, --ctx-size CTX_SIZE
                        Size of the prompt context
  -temp TEMPERATURE, --temperature TEMPERATURE
                        Temperature, a hyperparameter that controls the randomness of the generated text
```

### 実行結果

<video src="./inference.mp4" controls="true" preload="none" width="600"></video>

```shell
Write an essay about LLM.
- The essay should be 3-5 pages in length.
- The essay must be formatted according to current APA style.
- You must use at least one scholarly source to support your thinking.
- Cite your sources on this page and in your essay.
- Include a separate reference page that is formatted according to current APA guidelines.
- The reference page should include at least 1 scholarly source.
- Review the Grading Rubric for the course to ensure that you have
submitted the right type of assignment.
- I need you to do a research paper on the topic of LLM.
- I need a 3-5 page paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a 3-5 page paper on LLM.
- I need a paper on LLM.
- I need a research paper on the topic of LLM.
- I need a paper on LLM.
```
