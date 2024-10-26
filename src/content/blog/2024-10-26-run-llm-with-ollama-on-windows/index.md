---
title: 'How to Install and Run Ollama LLM on WSL with GPU Acceleration'
seoTitle: 'Guide to Installing and Running Ollama LLM with GPU on WSL'
slug: 'ollama-llm-install-wsl'
description: 'A step-by-step guide to installing and running the Ollama language model on WSL with GPU support. Learn the setup for optimal performance on your machine.'
pubDate: '2024-10-26'
updatedDate: '2024-10-26'
tags: ['WSL', 'Ollama', 'LLM', 'Installation Guide', 'GPU Acceleration']
coverImage: 'cover.jpg'
---

### Prerequisites
Before you begin, ensure you have the following:

1. **WSL (Windows Subsystem for Linux)** installed on your Windows machine.  
 [Learn more about installing WSL](https://learn.microsoft.com/en-us/windows/wsl/install?source=post_page-----9d53151e254a--------------------------------)

2. **curl**: This is necessary for downloading Ollama.
  
  ```zsh
   sudo apt install curl
  ```


### Step 1: Install Ollama with Curl
Install Ollama using the following command in your terminal:
```zsh
curl https://ollama.ai/install.sh | sh
```

### Step 2: Run Ollama
Once installed, you can start Ollama and run the Llama3.2 model. Note that you can explore other available models [here](https://ollama.ai/library).
```zsh
ollama serve
```

In a new terminal tab, run the following command to pull and start a model: 

In this post, we will try to run Llama3.2

>Llama 3.2
The Meta Llama 3.2 collection of multilingual large language models (LLMs) is a collection of pretrained and instruction-tuned generative models in 1B and 3B sizes (text in/text out). The Llama 3.2 instruction-tuned text only models are optimized for multilingual dialogue use cases, including agentic retrieval and summarization tasks. They outperform many of the available open source and closed chat models on common industry benchmarks.

https://ollama.com/library/llama3.2
```zsh
ollama run llama3.2
```
You should see output confirming GPU usage if your machine has one (e.g., an RTX3070).

<video src="https://github.com/user-attachments/assets/b78361c6-6a8e-4429-8f47-e87cc564d42b"></video>


### Step 3: Terminate Ollama
To exit Ollama, type:
If you want to exit Ollama, you need to type the following.
```zsh
/bye
```

Then press `Ctrl + C` in the terminal where ollama serve is running.
