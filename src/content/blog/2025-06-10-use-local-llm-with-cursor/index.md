---
title: 'How to Use Local LLM with Cursor'
seoTitle: 'Guide: Using Local LLMs with Cursor IDE - Step by Step Tutorial'
slug: 'use-local-llm-with-cursor'
description: 'Learn how to set up and use local LLMs with Cursor IDE using Ollama and ngrok. This step-by-step guide covers installation, configuration, and integration of local language models.'
pubDate: '2025-06-10'
updatedDate: '2025-06-10'
tags: ['cursor', 'ollama', 'local-llm', 'ai', 'development', 'tutorial']
---

## requirements
- `Cursor` is installed on your machine
- `Ollama` is installed on your machine, and you have a model
- `ngrok` is installed on your machine, and you have an ngrok account

### Step1. Install `Cursor`
Go to https://www.cursor.com/ and download Cursor, then install it on your machine.

### Step2. Install `Ollama`
Go to https://ollama.com/ and download Ollama, then install it on your machine.

### Step3. Create an ngrok account and install ngrok
Go to https://ngrok.com/ and download ngrok, then install it on your machine.
Then set up ngrok.

### Step4. Download(pull) a model
In this article, we'll use `deepseek-r1` model
https://ollama.com/library/deepseek-r1
Open the Terminal app

```shell
# 7B-model
ollama pull deepseek-r1:latest
```

### Step5. Enable CORS and run ngrok
```shell
# macOS & Linux
export OLLAMA_ORIGINS="*"

# If you are using Windows
set OLLAMA_ORIGINS="*"

ngrok http 11434 --host-header="localhost:11434"
```

### Step6. Set OpenAI API Key
1. Put the model name you pulled (in this case, the model is `deepseek-r1:latest`) and click `Add model`
2. Put `Ollama` in API key
3. Put the URL you get from ngrok command + `/v1`
   The URL looks like `https://ngrok_something/v1` 
![config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/juwee414s4n1d3tuqzgo.png)
4. Click `Save`

### Step7. Verify Ollama config
We are almost there.
Before clicking `Verify` button, we need to unselect all non-local models. So in this case, `deepseek-r1:latest` is the only selected model.
Then click `Verify` button.


### Step8. Use a local model
This is the final step. Open Cursor and Chat (Ct
