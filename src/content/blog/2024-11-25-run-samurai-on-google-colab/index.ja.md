---
title: 'Google ColabでSamuraiを実行する方法'
seoTitle: 'Google ColabでSamuraiモーショントラッキングモデルを実行する方法：ステップバイステップガイド'
slug: 'how-to-run-samurai-on-google-colab.ja'
description: 'SAM（Segment Anything Model）をベースにしたゼロショットのビジュアルトラッキングモデル「SAMURAI」をGoogle Colabで実行する方法を解説します。GPUランタイムの設定、依存関係のインストール、LaSOTデータセットを使った推論の実行までをステップバイステップで紹介します。'
pubDate: '2024-11-25'
updatedDate: '2024-11-25'
tags: ['google-colab', 'samurai', 'motion-tracking', 'python', 'machine-learning']
coverImage: './cover.png'
---

## Samuraiとは？

> SAMURAI: Adapting Segment Anything Model for Zero-Shot Visual Tracking with Motion-Aware Memory

<video src="https://github.com/user-attachments/assets/9d368ca7-2e9b-4fed-9da0-d2efbf620d88" controls></video>

## 必要なもの

- Google Colabを利用するためのGoogleアカウント
- データをダウンロードするためのHugging Faceアカウント

## Google ColabでSamuraiを実行する方法

### Step 0. Hugging Faceトークンを取得して環境変数に追加する

データをダウンロードするために、Hugging Faceへのアクセスが必要です。

Hugging Faceトークンの取得方法がわからない場合は、[こちらのページ](https://huggingface.co/docs/hub/security-tokens)を参照してください。
また、Hugging Faceトークンを環境変数に追加する方法がわからない場合は、[こちらの記事](https://dev.to/0xkoji/use-ngrok-with-secret-key-on-google-colab-47l0)をご確認ください。

### Step 1. デフォルトランタイムを変更する

Google ColabでSamuraiを実行するには、デフォルトランタイムをGPUに変更する必要があります。
無料枠のGPUであるT4を使用します。

### Step 2. パッケージをインストールする

```zsh
!pip install matplotlib==3.7 tikzplotlib jpeg4py opencv-python lmdb pandas scipy loguru
```

### Step 3. Samuraiリポジトリをクローンする

```zsh
!git clone https://github.com/yangchris11/samurai.git
```

### Step 4. Sam2をインストールする

```zsh
%cd samurai/sam2
!pip install -e .
!pip install -e ".[notebooks]"
```

### Step 5. チェックポイントをダウンロードする

```zsh
%cd /content/samurai/sam2/checkpoints
!./download_ckpts.sh && \
%cd ..
```

### Step 6. Hugging Faceからデータをダウンロードする

ここでは、Samuraiリポジトリのデータ準備（Data Preparation）セクションで紹介されているデータをセットアップするために、Pythonスクリプトを使用します。
https://github.com/yangchris11/samurai?tab=readme-ov-file#data-preparation

使用するデータは[l-lt/LaSOT](https://huggingface.co/datasets/l-lt/LaSOT)です。

今回はcatデータセットをダウンロードします。他のデータセットを試したい場合は、コードを適宜変更してください。

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

### Step 7. 推論を実行する

最後のステップは、Samuraiの推論を実行することです。
推論にはしばらく時間がかかります。

```zsh
%cd /content/samurai
!python scripts/main_inference.py
```

すべてがうまくいけば、次のような出力が表示されます：

<video src="https://github.com/user-attachments/assets/edb2a72a-fd32-41dd-87dd-d74e730dd677" controls></video>

すべてのコードは[こちらのGitHubリポジトリ](https://github.com/koji/GoogleColab/blob/main/Samurai.ipynb)で公開しています。

この記事が役に立ったと思ったら、ぜひ[GitHub](https://github.com/koji/GoogleColab)でスターを付けてください。
