---
title: 'DiffusersでM3 MacにFlux.1を導入して動かす'
seoTitle: 'Markdownスタイル完全ガイド'
slug: 'run-flux1-on-mac-with-diffusers.ja'
description: 'Diffusersを使ってM3 MacでFlux.1を動かす方法'
pubDate: '2024-09-12'
updatedDate: '2024-09-12'
tags: ['Flux1', 'Mac', 'Python', 'Diffusers']
# coverImage: './output.avif'
---

## Diffusersとは？

https://github.com/huggingface/diffusers

## Fluxとは

https://blackforestlabs.ai/announcing-black-forest-labs/

### 1. 仮想環境を作成する

```shell
python3 -m venv fluxtest
source fluxtest/bin/activate
```

### 2. CLIでHugging Faceにログインする

https://huggingface.co/docs/huggingface_hub/main/en/guides/cli

```shell
pip install -U "huggingface_hub[cli]"
huggingface-cli login
```

### 3. パッケージをインストールする

```shell
pip install torch==2.3.1
pip install git+https://github.com/huggingface/diffusers.git
pip install transformers==4.43.3 sentencepiece==0.2.0 accelerate==0.33.0 protobuf==5
```

### 4. Pythonスクリプトを実行する

`image.py`

```py
import torch
from diffusers import  FluxPipeline
import diffusers

_flux_rope = diffusers.models.transformers.transformer_flux.rope
def new_flux_rope(pos: torch.Tensor, dim: int, theta: int) -> torch.Tensor:
    assert dim % 2 == 0, "The dimension must be even."
    if pos.device.type == "mps":
        return _flux_rope(pos.to("cpu"), dim, theta).to(device=pos.device)
    else:
        return _flux_rope(pos, dim, theta)

diffusers.models.transformers.transformer_flux.rope = new_flux_rope

pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-schnell", revision='refs/pr/1',  torch_dtype=torch.bfloat16).to("mps")

prompt = "japanese girl, photo-realistic"
out = pipe(
     prompt=prompt,
     guidance_scale=0.,
     height=1024,
     width=1024,
     num_inference_steps=4,
     max_sequence_length=256,
).images[0]
out.save("image.png")
```

最後に、Pythonスクリプトを実行して画像を生成します。

```shell
python image.py
```

#### 出力結果

![output](output.png)
