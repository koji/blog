---
title: 'Google Colab から Hugging Face にログインする方法'
seoTitle: 'Google Colab で Hugging Face にログインする方法：ステップバイステップガイド'
slug: 'login-huggingface-google-colab.ja'
description: 'Google Colab でシークレットを作成・利用して Hugging Face にシームレスにログインする方法を解説します。コード例付きのステップバイステップチュートリアルです。'
pubDate: '2024-12-31'
updatedDate: '2024-12-31'
tags: ['python', 'huggingface', 'google colab']
---

## ステップ1. `Secrets` でシークレットを作成する

まず、新しいシークレットを作成します。ここでは `HF_TOKEN` という名前を使用しますが、任意の名前を付けることができます。

![Colab Secrets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ulzvl8iambkm6rwnwy0t.png)

## ステップ2. シークレットを読み込んで Hugging Face にログインする

作成したシークレットを使って、Google Colab から Hugging Face にログインします。

```python
from huggingface_hub import login
from google.colab import userdata

# Retrieve your secret token
HF_TOKEN = userdata.get('HF_TOKEN')

if HF_TOKEN:
    login(HF_TOKEN)
    print("Successfully logged in to Hugging Face!")
else:
    print("Token is not set. Please save the token first.")
```
