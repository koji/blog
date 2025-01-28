---
title: "2 Ways to Run Ollama on Google Colab Free Tier"
seoTitle: "Run Ollama DeepSeek-R1:32GB on Google Colab Free Tier - Step-by-Step Guide"
slug: "run-ollama-on-google-colab"
description: "Learn how to run the Ollama DeepSeek-R1:32GB model on Google Colab's free tier. Explore two methods: direct installation and using the Oyama wrapper for an improved workflow. Includes step-by-step instructions and code snippets."
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
my google colab link: https://github.com/koji/GoogleColab/blob/main/ollama_deepseek_r1_32b_4.ipynb
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
my google colab link: https://github.com/koji/GoogleColab/blob/main/ollama_deepseek_r1_32b_with_oyama.ipynb
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
