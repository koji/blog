---
title: 'Google Colab T4で試すKokoro TTSの音声合成'
seoTitle: 'Kokoro TTSチュートリアル：Google Colab T4で音声合成を試す'
slug: 'kokoro-tts-google-colab-tutorial.ja'
description: 'Google Colab T4でKokoro TTSを使った高品質な音声合成の方法を解説します。kokoro-onnxの導入からボイスパックのカスタマイズまで紹介します。'
pubDate: '2025-01-22'
updatedDate: '2025-01-22'
tags: ['TTS', 'voice synthesis', 'AI', 'python', 'kokoro']
---

## Kokoro-82Mとは？

Kokoro-82Mは、高品質な音声を生成できる高性能なTTS（Text-to-Speech）モデルです。シンプルなテキストから音声への変換が可能で、音声ファイルに重み付けを適用することで、簡単に声の合成（ボイスミックス）が行えます。

[Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)  
バージョン0.23からは日本語にも対応しています。

以下のリンクから手軽に試すことができます：  
[Kokoro TTS on Hugging Face Spaces](https://huggingface.co/spaces/hexgrad/Kokoro-TTS)

ただし、日本語のイントネーションはまだ少し不自然さが残ります。

本記事では、KokoroとONNXランタイムを活用したTTS実装である[kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx)を使用します。安定版であるバージョン0.19を使用し、対応言語はアメリカ英語とイギリス英語のみでの音声合成を扱います。  
タイトルにもある通り、コードの実行はGoogle Colabで行います。

### kokoro-onnxのインストール

```shell
!git lfs install
!git clone https://huggingface.co/hexgrad/Kokoro-82M
%cd Kokoro-82M
!apt-get -qq -y install espeak-ng > /dev/null 2>&1
!pip install -q phonemizer torch transformers scipy munch
!pip install -U kokoro-onnx
```

### パッケージの読み込み

```python
import numpy as np
from scipy.io.wavfile import write
from IPython.display import display, Audio
from models import build_model
import torch
from models import build_model
from kokoro import generate
```

### サンプルを実行する

音声合成を試す前に、まずは公式サンプルを実行してみましょう。
以下のコードを実行すると、数秒で音声が生成・再生されます。

```python
device = 'cuda' if torch.cuda.is_available() else 'cpu'
MODEL = build_model('kokoro-v0_19.pth', device)
VOICE_NAME = [
    'af', # Default voice is a 50-50 mix of Bella & Sarah
    'af_bella', 'af_sarah', 'am_adam', 'am_michael',
    'bf_emma', 'bf_isabella', 'bm_george', 'bm_lewis',
    'af_nicole', 'af_sky',
][0]
VOICEPACK = torch.load(f'voices/{VOICE_NAME}.pt', weights_only=True).to(device)
print(f'Loaded voice: {VOICE_NAME}')

text = "How could I know? It's an unanswerable question. Like asking an unborn child if they'll lead a good life. They haven't even been born."
audio, out_ps = generate(MODEL, text, VOICEPACK, lang=VOICE_NAME[0])

display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

## 音声合成

それでは本題の音声合成を試していきます。

ボイスパックの定義

- `af`: アメリカ英語の女性の声
- `am`: アメリカ英語の男性の声
- `bf`: イギリス英語の女性の声
- `bm`: イギリス英語の男性の声
- 今回は利用可能なすべてのボイスパックを読み込みます。

今回は利用可能なすべてのボイスパックを読み込みます。

```python
voicepack_af = torch.load(f'voices/af.pt', weights_only=True).to(device)
voicepack_af_bella = torch.load(f'voices/af_bella.pt', weights_only=True).to(device)
voicepack_af_nicole = torch.load(f'voices/af_nicole.pt', weights_only=True).to(device)
voicepack_af_sarah = torch.load(f'voices/af_sarah.pt', weights_only=True).to(device)
voicepack_af_sky = torch.load(f'voices/af_sky.pt', weights_only=True).to(device)
voicepack_am_adam = torch.load(f'voices/am_adam.pt', weights_only=True).to(device)
voicepack_am_michael = torch.load(f'voices/am_michael.pt', weights_only=True).to(device)
voicepack_bf_emma = torch.load(f'voices/bf_emma.pt', weights_only=True).to(device)
voicepack_bf_isabella = torch.load(f'voices/bf_isabella.pt', weights_only=True).to(device)
voicepack_bm_george = torch.load(f'voices/bm_george.pt', weights_only=True).to(device)
voicepack_bm_lewis = torch.load(f'voices/bm_lewis.pt', weights_only=True).to(device)
```

### 既存ボイスでの音声生成

合成された声の違いを確認するため、異なるボイスパックで音声を生成してみましょう。
サンプルテキストはそのまま使用しますが、`voicepack_` 変数を変更することで任意のボイスパックを利用できます。

```python
audio, out_ps = generate(MODEL,
                         text,
                         voicepack_bf_emma,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

```python
audio, out_ps = generate(MODEL,
                         text,
                         voicepack_bf_isabella,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

```python
audio, out_ps = generate(MODEL,
                         text,
                         voicepack_bm_lewis,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

### 声の合成（ボイスミックス）

まずは、イギリス英語の女性の声（bf）2つを組み合わせた平均的な声を作成してみます。

```python
bf_average = (voicepack_bf_emma + voicepack_bf_isabella) / 2
audio, out_ps = generate(MODEL,
                         text,
                         bf_average,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

次に、女性2名と男性1名の声を組み合わせて合成してみます。

```python
weight_1 = 0.25
weight_2 = 0.45
weight_3 = 0.3
weighted_voice = (voicepack_bf_emma * weight_1 +
                  voicepack_bf_isabella * weight_2 +
                  voicepack_bm_lewis * weight_3)
audio, out_ps = generate(MODEL,
                         text,
                         weighted_voice,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

最後に、アメリカ英語とイギリス英語の男性の声をミックスしてみます。

```python
m_average = (voicepack_am_michael + voicepack_bm_george) / 2
audio, out_ps = generate(MODEL,
                         text,
                         m_average,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

`Gradio` で声をミックスした際の挙動も試してみました：
<video src="gradio.mp4" preload="none"></video>

これをOllamaと組み合わせれば、面白い実験ができそうです。
