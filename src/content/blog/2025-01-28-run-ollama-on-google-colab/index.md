---
title: '2 Ways to Run Ollama on Google Colab Free Tier'
seoTitle: ''
slug: ''
description: ''
pubDate: '2025-01-28'
updatedDate: '2025-01-28'
tags: ['python', 'ollama', 'google colab']
coverImage: ''
---

## What is Ollama?
Ollama is an open-source tool that allows users to run, create, and share large language models (LLMs) locally. It's designed to simplify the process of running LLMs on a local computer. 

In this article, we'll try to run DeepSeek-R1:32GB on Google Colab.  
https://ollama.com/library/deepseek-r1  

### change runtime
First, we need to change the runtime of the notebook to use T-4, free-tier.  

### 1 Way to Run Ollama on Google Colab
#### install ollama
```shell
!curl https://ollama.ai/install.sh | sh

!echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections
!sudo apt-get update && sudo apt-get install -y cuda-drivers

import os

# Set LD_LIBRARY_PATH so the system NVIDIA library
os.environ.update({'LD_LIBRARY_PATH': '/usr/lib64-nvidia'})
```

#### start server
```shell
!nohup ollama serve &
```

#### pull deepseek-r1 model
```shell
!ollama pull deepseek-r1:32b
```

#### install ollama package
```shell
!pip install ollama
```

#### run model
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

[result]
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


### 2 Ways to Run Ollama on Google Colab with `oyama`
#### oyama 
An improved wrapper for ollama that allows for one-shot launching of local models with URL specification.  
https://github.com/HawkClaws/oyama  

#### install ollama and oyama
```shell
!pip install -q git+https://github.com/HawkClaws/oyama.git ollama
```

#### start serve and pull model
```shell
from oyama import oyama
import ollama

model_path = "deepseek-r1:32b"
model_name = oyama.run(model_path)
```

#### run model
```python
import ollama
response = ollama.chat(model=model_name, messages=[
  {
    'role': 'user',
    'content': "How many r's are in a strawberry?",
  },
])
```

[result]

```shell

```
