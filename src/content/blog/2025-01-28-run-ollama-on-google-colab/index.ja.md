---
title: 'Google Colab無料枠でOllamaを動かす2つの方法'
seoTitle: 'Google Colab無料枠でOllama DeepSeek-R1:32GBを動かす - ステップバイステップガイド'
slug: 'run-ollama-on-google-colab.ja'
description: 'Google Colabの無料枠でOllama DeepSeek-R1:32GBモデルを動かす方法を解説します。直接インストールする方法と、ワークフローを改善するOyamaラッパーを使う方法の2つを紹介。手順とコードスニペット付きで詳しく説明します。'
pubDate: '2025-01-28'
updatedDate: '2025-01-28'
tags: ['python', 'ollama', 'google colab']
---

## Ollamaとは？

Ollamaは、大規模言語モデル（LLM）をローカルで実行・作成・共有するためのオープンソースツールです。ローカル環境でのLLM実行をシンプルにするために設計されています。

この記事では、Google ColabでDeepSeek-R1:32GBを動かしてみます。  
https://ollama.com/library/deepseek-r1

### ランタイムの変更

まず、ノートブックのランタイムを無料枠のT4に変更する必要があります。

### 方法1: Google ColabでOllamaを実行する

私のGoogle Colabノートブック: https://github.com/koji/GoogleColab/blob/main/ollama_deepseek_r1_32b_4.ipynb

#### Ollamaのインストール

```shell
!curl https://ollama.ai/install.sh | sh

!echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections
!sudo apt-get update && sudo apt-get install -y cuda-drivers

import os

# Set LD_LIBRARY_PATH so the system NVIDIA library
os.environ.update({'LD_LIBRARY_PATH': '/usr/lib64-nvidia'})
```

#### サーバーの起動

```shell
!nohup ollama serve &
```

#### DeepSeek-R1モデルの取得

```shell
!ollama pull deepseek-r1:32b
```

#### Ollamaパッケージのインストール

```shell
!pip install ollama
```

#### モデルの実行

```python
import ollama
response = ollama.chat(model='deepseek-r1:32b', messages=[
  {
    'role': 'user',
    'content': "How many r's are in a strawberry?",
  },
])
print(response['message']['content'])
```

[実行結果]

```shell
<think>
Okay, so I'm trying to figure out how many 'r's are in the word "strawberry." Let me start by writing out the word and looking at each letter one by one. The word is S-T-R-A-W-B-E-R-R-Y. Now, I'll go through each letter:

1. S - that's just an S.
2. T - then a T.
3. R - okay, here's an R.
4. A - next is A.
5. W - after that comes W.
6. B - B follows.
7. E - then E.
8. R - another R here.
9. R - and yet another R.
10. Y - finally, Y.

Wait a second, let me count the Rs again to make sure I didn't miss any or double-count. So starting from the beginning: S, T, R (that's one), A, W, B, E, R (two), R (three), Y. So that makes three Rs in total. Hmm, but sometimes people might not count all of them correctly because they can be a bit fast when reading or writing. Let me check again just to be sure. S-T-R-A-W-B-E-R-R-Y: yes, the Rs are at positions 3, 8, and 9. So three Rs altogether.
</think>

The word "strawberry" contains **three 'r's**.

Here is the breakdown:

1. R (third letter)
2. R (eighth letter)
3. R (ninth letter)

So, counting each occurrence, there are a total of **3 r's** in "strawberry."
```

### 方法2: `oyama`を使ってGoogle ColabでOllamaを実行する

私のGoogle Colabノートブック: https://github.com/koji/GoogleColab/blob/main/ollama_deepseek_r1_32b_with_oyama.ipynb

#### oyama

URL指定でローカルモデルをワンショットで起動できる、Ollamaの改良ラッパーです。  
https://github.com/HawkClaws/oyama

#### Ollamaとoyamaのインストール

```shell
!pip install -q git+https://github.com/HawkClaws/oyama.git ollama
```

#### サーバーの起動とモデルの取得

```shell
from oyama import oyama
import ollama

model_path = "deepseek-r1:32b"
model_name = oyama.run(model_path)
```

#### モデルの実行

```python
import ollama
response = ollama.chat(model=model_name, messages=[
  {
    'role': 'user',
    'content': "How many r's are in a strawberry?",
  },
])
```

[実行結果]

```shell
<think>
Okay, so I'm trying to figure out how many 'r's are in the word "strawberry." Let me break it down step by step because sometimes these things can be tricky. First, I'll write out the word to have a clear view: S-T-R-A-W-B-E-R-R-Y.

Now, I need to count each letter carefully. Sometimes people rush through this and might miss letters or miscount. So let's go one by one:

1. **S** - That's just an 'S', no 'r' there.
2. **T** - Next is a 'T'. Still no 'r'.
3. **R** - Okay, here we have the first 'R'. I'll note that down as 1.
4. **A** - An 'A' follows, so no change in count.
5. **W** - Then a 'W', nothing to add here.
6. **B** - Next is a 'B', still not an 'r'.
7. **E** - An 'E' comes next, moving on.
8. **R** - Now we're back to another 'R'. That's the second one.
9. **R** - And then another one right after! So that's the third 'R'.
10. **Y** - Finally, we end with a 'Y'.

Wait, did I just count three 'R's? Let me double-check because sometimes it's easy to miscount or skip letters when they're close together. Going through again:

- S-T-R-A-W-B-E-R-R-Y.

Breaking it down syllable by syllable might help: "stra-wberry." The first part, "stra," has one 'R'. Then in "wberry," there are two more 'R's at the end. So that makes a total of three 'R's.

I think that's correct, but to make sure I'm not missing anything, let me write out the positions:

1. S
2. T
3. R (1st)
4. A
5. W
6. B
7. E
8. R (2nd)
9. R (3rd)
10. Y

Yes, that's three 'R's in total. I don't think there are any other letters after the last 'R' except for the 'Y', so I'm confident now.
</think>

The word "strawberry" contains three 'r's.

**Step-by-Step Explanation:**

1. **Write out the word:** S-T-R-A-W-B-E-R-R-Y.
2. **Identify each letter and count 'R's:**
   - 3rd letter: R (1)
   - 8th letter: R (2)
   - 9th letter: R (3)
3. **Total Count:** There are three 'R's in "strawberry."

**Answer:** There are three 'r's in the word strawberry.
```
