---
title: 'How to Run Samurai on Google Colab'
seoTitle: 'How to Run Samurai Motion Tracking Model on Google Colab: Step-by-Step Guide'
slug: 'how-to-run-samurai-on-google-colab'
description: 'Learn how to run SAMURAI, a zero-shot visual tracking model based on SAM (Segment Anything Model), on Google Colab. This step-by-step guide covers setting up GPU runtime, installing dependencies, and running inference with the LaSOT dataset for motion tracking.'
pubDate: '2024-11-25'
updatedDate: '2024-11-25'
tags: ['google-colab', 'samurai', 'motion-tracking', 'python', 'machine-learning']
coverImage: './cover.png'
---

## What is Samurai?

> SAMURAI: Adapting Segment Anything Model for Zero-Shot Visual Tracking with Motion-Aware Memory

<video src="https://github.com/user-attachments/assets/9d368ca7-2e9b-4fed-9da0-d2efbf620d88" controls></video>

## Requirements

- Google account for Google Colab
- Hugging Face account to download data

## How to Run Samurai on Google Colab

### Step 0. Get Hugging Face token and add it to your environment variable

We will need to access to Hugging Face to download data.

If you don't know how to get Hugging Face token, please refer to [this page](https://huggingface.co/docs/hub/security-tokens).
Also, if you don't know how to add Hugging Face token to your environment variable, please check [this post](https://dev.to/0xkoji/use-ngrok-with-secret-key-on-google-colab-47l0).

### Step 1. Change the default runtime

To run Samurai on Google Colab, we need to change the default runtime to GPU.
We need to use T4 (free-tier GPU).

### Step 2. Install packages

```zsh
!pip install matplotlib==3.7 tikzplotlib jpeg4py opencv-python lmdb pandas scipy loguru
```

### Step 3. Clone the Samurai repository

```zsh
!git clone https://github.com/yangchris11/samurai.git
```

### Step 4. Install Sam2

```zsh
%cd samurai/sam2
!pip install -e .
!pip install -e ".[notebooks]"
```

### Step 5. Download checkpoints

```zsh
%cd /content/samurai/sam2/checkpoints
!./download_ckpts.sh && \
%cd ..
```

### Step 6. Download data from Hugging Face

In this part we will use python script to set up the data that samurai repo mentioned in data preparation section.
https://github.com/yangchris11/samurai?tab=readme-ov-file#data-preparation

The data we will use is [l-lt/LaSOT](https://huggingface.co/datasets/l-lt/LaSOT)

In this case, we will download cat dataset, so if you want to try other datasets, you can change the code accordingly.

```python
import os

# Define the data directory
data_directory = '/content/samurai/data/LaSOT'

# Create the data directory if it does not exist
try:
    os.makedirs(data_directory, exist_ok=True)
    print(f"Directory '{data_directory}' created successfully or already exists.")
except OSError as error:
    print(f"Error creating directory '{data_directory}': {error}")

# Define the content to be written to the file
content = '''cat-1
cat-20'''

# Define the file path
file_path = os.path.join(data_directory, 'testing_set.txt')

# Write the content to the file
try:
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"Content written to file '{file_path}' successfully.")
except IOError as error:
    print(f"Error writing to file '{file_path}': {error}")

# Print the file path
print(f'File path: {file_path}')
```

```python
import os
from huggingface_hub import hf_hub_download
import zipfile
import shutil

def download_and_extract(base_dir="/content/samurai/data"):
    try:
        # Create LaSOT and cat directories
        lasot_dir = os.path.join(base_dir, "LaSOT")
        cat_dir = os.path.join(lasot_dir, "cat")
        os.makedirs(cat_dir, exist_ok=True)

        # Create directory to save the ZIP file
        zip_dir = os.path.join(base_dir, "zips")
        os.makedirs(zip_dir, exist_ok=True)

        print("Downloading dataset...")
        zip_path = hf_hub_download(
            repo_id="l-lt/LaSOT",
            filename="cat.zip",
            repo_type="dataset",
            local_dir=zip_dir
        )
        print(f"Downloaded to: {zip_path}")

        # Extract ZIP file to cat directory
        print("Extracting ZIP file to cat directory...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(cat_dir)

        print("\nCreated directory structure:")
        print("LaSOT/")
        print("└── cat/")
        # Display the first few cat folders
        for item in sorted(os.listdir(cat_dir))[:6]:
            print(f"    ├── {item}/")
        print("    └── ...")

        return lasot_dir

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

if __name__ == "__main__":
    extract_path = download_and_extract()
    if extract_path:
        print("\nDownload and extraction completed successfully!")
    else:
        print("\nDownload and extraction failed.")
```

### Step 7. Inference

The last step is to run Samurai inference.
Inference will take a while.

```zsh
%cd /content/samurai
!python scripts/main_inference.py
```

If everything goes well, you should see the following output:

<video src="./cat-20.mov" controls></video>

All the code is available on [this GitHub repository](https://github.com/koji/GoogleColab/blob/main/Samurai.ipynb).

If you like this post, please give it a star on [GitHub](https://github.com/koji/GoogleColab).
