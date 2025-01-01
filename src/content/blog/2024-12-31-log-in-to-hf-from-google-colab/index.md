---
title: 'How to Log in to Hugging Face from Google Colab'
seoTitle: 'Log in to Hugging Face in Google Colab: Step-by-Step Guide'
slug: 'login-huggingface-google-colab'
description: 'Learn how to seamlessly log in to Hugging Face from Google Colab by creating and using secrets. A step-by-step tutorial with code examples.'
pubDate: '2024-12-31'
updatedDate: '2024-12-31'
tags: ['python', 'huggingface', 'google colab']
---

## Step 1. Create a Secret in `Secrets`

First, create a new secret. In this case, we will use `HF_TOKEN`, but you can name it whatever you want.

![Colab Secrets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ulzvl8iambkm6rwnwy0t.png)

## Step 2. Load the Secret and Log In to Hugging Face

Use the secret you created to log in to Hugging Face from Google Colab.

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
