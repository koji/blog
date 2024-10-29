---
title: 'Build a Text Extractor App with Python Code Under 30 Lines Using Gradio and Hugging Face'
seoTitle: 'Create a Text Extractor App in Python Under 30 Lines with Gradio and Hugging Face'
slug: 'build-text-extractor-python-under-30-lines'
description: 'Learn how to create a deployable text extraction app from images using a compact Python script, Gradio for UI, and Hugging Face Spaces for deployment. This guide covers Docker setup, OCR with pytesseract, and more.'
pubDate: '2024-10-29'
updatedDate: '2024-10-29'
tags: ['Python', 'OCR', 'pytesseract', 'Gradio', 'Hugging Face', 'Docker']
coverImage: 'orc_cover.png'
---

Extracting text from images, known as Optical Character Recognition (OCR), is a valuable feature for applications in document processing, data extraction, and accessibility. In this guide, we will create an OCR app using Python libraries like `pytesseract` for OCR, `Pillow` for image processing, and `Gradio` for building an interactive UI. We’ll deploy this app on Hugging Face Spaces.

## Prerequisites
Before starting, you’ll need a [Hugging Face account](https://huggingface.co/join) and basic familiarity with Docker.

## Step-by-Step Guide

### Step 1: Create a Hugging Face Space

1. **Navigate to Hugging Face Spaces**: Log in to [Hugging Face](https://huggingface.co/) and go to the "Spaces" section.
2. **Create a New Space**:
   - Click on "New Space."
   - Name your space (e.g., `image-text-extractor`).
   - Choose **Gradio** as the SDK and set the visibility (public or private).
   - Click "Create Space."

### Step 2: Create a Dockerfile

To deploy on Hugging Face Spaces with required system dependencies, such as Tesseract for OCR, we need a `Dockerfile` that configures the environment.

Create a `Dockerfile` with the following content:

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

### Step 3: Create the OCR Application
1. Create a file called app.py with the following content:

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

2. Create a requirements.txt file to specify the dependencies:
```
gradio
pytesseract
Pillow
```

This setup includes:
- Image Upload: gr.Image(type="filepath") allows users to upload images as file paths, which pytesseract processes.
- Text Extraction: pytesseract.image_to_string extracts text from the image.
- User Interface: Gradio generates a simple UI for users to upload an image and view extracted text.

### Step 4: Push All Files to Hugging Face Spaces
With all files created, push them to your Hugging Face Space

<video src="https://github.com/user-attachments/assets/d7f0f74f-a422-4b52-8d8d-a78c4cf928a7"></video>
