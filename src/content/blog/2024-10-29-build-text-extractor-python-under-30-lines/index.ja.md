---
title: 'GradioとHugging Faceで作る！30行未満のPythonコードでテキスト抽出アプリを構築する'
seoTitle: 'GradioとHugging Faceで30行未満のPythonコードでテキスト抽出アプリを作成する'
slug: 'build-text-extractor-python-under-30-lines.ja'
description: 'コンパクトなPythonスクリプト、UI構築のためのGradio、そしてデプロイのためのHugging Face Spacesを使って、画像からテキストを抽出するデプロイ可能なアプリの作り方を学びます。本ガイドではDockerのセットアップ、pytesseractによるOCRなどを解説します。'
pubDate: '2024-10-29'
updatedDate: '2024-10-29'
tags: ['Python', 'OCR', 'pytesseract', 'Gradio', 'Hugging Face', 'Docker']
coverImage: 'orc_cover.png'
---

画像からテキストを抽出する技術は、光学文字認識（OCR）として知られ、文書処理、データ抽出、アクセシビリティといった分野のアプリケーションで非常に有用な機能です。本ガイドでは、OCRに`pytesseract`、画像処理に`Pillow`、インタラクティブなUI構築に`Gradio`といったPythonライブラリを使ってOCRアプリを作成します。そして、このアプリをHugging Face Spacesにデプロイします。

## 前提条件

始める前に、[Hugging Faceアカウント](https://huggingface.co/join)とDockerの基本的な知識が必要です。

## ステップバイステップガイド

### ステップ1: Hugging Face Spaceを作成する

1. **Hugging Face Spacesに移動する**: [Hugging Face](https://huggingface.co/)にログインし、「Spaces」セクションに移動します。
2. **新しいSpaceを作成する**:
   - 「New Space」をクリックします。
   - Spaceに名前を付けます（例: `image-text-extractor`）。
   - SDKとして**Gradio**を選択し、公開範囲（publicまたはprivate）を設定します。
   - 「Create Space」をクリックします。

### ステップ2: Dockerfileを作成する

OCRに必要なTesseractなどのシステム依存関係を含めてHugging Face Spacesにデプロイするために、環境を構成する`Dockerfile`が必要です。

以下の内容で`Dockerfile`を作成します:

```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.12
ENV PIP_ROOT_USER_ACTION=ignore

# Set the working directory in the container
WORKDIR $HOME/app

# Install system dependencies
RUN apt-get update && apt-get install -y
RUN apt-get install -y tesseract-ocr
RUN apt-get install -y libtesseract-dev
RUN apt-get install -y libgl1-mesa-glx
RUN apt-get install -y libglib2.0-0
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY app.py ./

# Expose the port for Gradio
EXPOSE 7860

# Run the application
CMD ["python", "app.py"]
```

### ステップ3: OCRアプリケーションを作成する

1. 以下の内容でapp.pyというファイルを作成します:

```python
import gradio as gr
import pytesseract
from PIL import Image
import os

def extract_text(image_path):
    if not image_path:
        return "No image uploaded. Please upload an image."

    if not os.path.exists(image_path):
        return f"Error: File not found at {image_path}"

    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text if text.strip() else "No text detected in the image."
    except Exception as e:
        return f"An error occurred: {str(e)}"

iface = gr.Interface(
    fn=extract_text,
    inputs=gr.Image(type="filepath", label="Upload an image"),
    outputs=gr.Textbox(label="Extracted Text"),
    title="Image Text Extractor",
    description="Upload an image and extract text from it using OCR."
)

iface.launch(server_name="0.0.0.0", server_port=7860)
```

2. 依存関係を指定するrequirements.txtファイルを作成します:

```
gradio
pytesseract
Pillow
```

このセットアップの内容:

- 画像アップロード: gr.Image(type="filepath")により、ユーザーは画像をファイルパスとしてアップロードでき、pytesseractがそれを処理します。
- テキスト抽出: pytesseract.image_to_stringが画像からテキストを抽出します。
- ユーザーインターフェース: Gradioが、ユーザーが画像をアップロードして抽出されたテキストを確認できるシンプルなUIを生成します。

### ステップ4: すべてのファイルをHugging Face Spacesにプッシュする

すべてのファイルを作成したら、Hugging Face Spaceにプッシュします

<video src="https://github.com/user-attachments/assets/d7f0f74f-a422-4b52-8d8d-a78c4cf928a7"></video>
