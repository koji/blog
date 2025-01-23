---
title: 'Exploring Kokoro TTS Voice Synthesis on Google Colab with T4'
seoTitle: 'Kokoro TTS Tutorial: Voice Synthesis on Google Colab T4'
slug: 'kokoro-tts-google-colab-tutorial'
description: 'Learn how to use Kokoro TTS for high-quality voice synthesis with Google Colab T4, featuring kokoro-onnx and voice pack customization.'
pubDate: '2025-01-22'
updatedDate: '2025-01-22'
tags: ['TTS', 'voice synthesis', 'AI', 'python', 'kokoro']
---


## What is Kokoro-82M?

Kokoro-82M is a high-performance TTS (Text-to-Speech) model capable of generating high-quality audio. It allows for straightforward text-to-audio conversion and enables easy voice synthesis by applying weights to audio files.

[Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)  
From version 0.23, Japanese is also supported.

You can try it out easily via the following link:  
[Kokoro TTS on Hugging Face Spaces](https://huggingface.co/spaces/hexgrad/Kokoro-TTS)

However, the intonation for Japanese still feels slightly unnatural.

In this post, we will use [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx), a TTS implementation utilizing Kokoro and the ONNX runtime. We will use version 0.19, a stable release, which only supports American English and British English for voice synthesis.  
As the title suggests, the code execution will be done using Google Colab.

### Installing kokoro-onnx

```shell
!git lfs install
!git clone https://huggingface.co/hexgrad/Kokoro-82M
%cd Kokoro-82M
!apt-get -qq -y install espeak-ng > /dev/null 2>&1
!pip install -q phonemizer torch transformers scipy munch
!pip install -U kokoro-onnx
```

### Loading Packages
```python
import numpy as np
from scipy.io.wavfile import write
from IPython.display import display, Audio
from models import build_model
import torch
from models import build_model
from kokoro import generate
```


### Running the Sample
Before testing voice synthesis, let’s run the official sample.
Running the following code will generate and play audio within a few seconds.

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

## Voice Synthesis

Now, let’s get into the main topic and test voice synthesis.

Defining Voice Packs
- `af`: American English female voice
- `am`: American English male voice
- `bf`: British English female voice
- `bm`: British English male voice
- `We` will load all available voice packs for now.

We will load all available voice packs for now.

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


### Generating Text with Predefined Voices
To check the difference between synthesized voices, let’s generate audio using different voice packs.
We will use the sample text as is, but you can change the voicepack_ variable to use any desired voice pack.

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

### Voice Synthesis
First, let’s create an average voice combining two British female voices (bf).

```python
bf_average = (voicepack_bf_emma + voicepack_bf_isabella) / 2
audio, out_ps = generate(MODEL,
                         text,
                         bf_average,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```

Next, let’s synthesize a combination of two female and one male voice.
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

Finally, let’s synthesize a mix of American and British male voices.
```python
m_average = (voicepack_am_michael + voicepack_bm_george) / 2
audio, out_ps = generate(MODEL,
                         text,
                         m_average,
                         lang=VOICE_NAME[0])
display(Audio(data=audio, rate=24000, autoplay=True))
print(out_ps)
```


I also tested mixing voices with `Gradio` to see what happens:
<video src="gradio.mp4"></video>

Combining this with Ollama could lead to some fun experiments.
