---
title: 'Accelerate 1-bit LLM Inference with BitNet on WSL2 (Ubuntu)'
seoTitle: ' Run BitNet on WSL2 (Ubuntu) for Fast 1-bit LLM Inference'
slug: 'run-bitnet-wsl2-inference'
description: ' Leverage BitNet, a CPU-based framework, to perform rapid inference with 1-bit LLMs on your WSL2 Ubuntu environment. This guide walks you through installation, setup, and running inference tasks.'
pubDate: '2024-10-20'
updatedDate: '2024-10-20'
tags: ['ai', 'llm', 'wsl', 'ubuntu']
---

## What is BitNet?
>bitnet.cpp is the official inference framework for 1-bit LLMs (e.g., BitNet b1.58). It offers a suite of optimized kernels, that support fast and lossless inference of 1.58-bit models on CPU (with NPU and GPU support coming next).

**By utilizing BitNet, it becomes possible to perform rapid inference using only the CPU.**


## Set up BitNet
### install packages
```shell
# you may need to use sudo if you get a permission error
bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"

# If you have not installed it yet, the following will be necessary. 
sudo apt install clang
sudo apt install cmake
```

### clone repo
```shell
git clone --recursive https://github.com/microsoft/BitNet.git
```

### create a venv and install python packages
requirement is python 3.9+
```
cd  BitNet
python -m venv bitNetTest
source bitNetTest/bin/activate
pip install -r requirements.txt

# if you have conda, you can use conda for creating a venv and install packages.
```

### build
This step will take some time. In my case, it took around 13 minutes
```shell
python setup_env.py --hf-repo HF1BitLLM/Llama3-8B-1.58-100B-tokens -q i2_s
```


### inference
```shell
 python run_inference.py -m models/Llama3-8B-1.58-100B-tokens/ggml-model-i2_s.gguf -p "Write an essay about LLM" -t 12 -n 900
```

**options**
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


### output

<video src="./inference.mp4" controls="true" width="600"></video>

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
- I need a research paper on LLM.
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
