---
title: 'Flux 1はプロンプトが長くなると年齢指定が反映されにくくなるのか？'
seoTitle: 'Flux 1は長いプロンプトで年齢の再現精度が落ちるのか？'
slug: 'flux-1-age-accuracy-longer-prompts.ja'
description: ''
pubDate: '2024-10-15'
updatedDate: '2024-10-15'
tags: ['Flux1', 'text-to-image', 'GenAI']
coverImage: 'cover.png'
---

## Flux.1とは？

Flux.1はテキストから画像を生成するAI画像ジェネレーターです。

### Flux.1でできること

Flux.1はテキストの説明から高品質な画像を生成できる text-to-image モデルです。画像のディテール、プロンプトへの忠実性、スタイルの多様性において、最先端のモデルとして評価されています。

今回は Flux.1 schnell を使い、ランダムシードを固定した上で年齢を変えながら人物画像を生成する実験を行いました。実験には seaart.ai を使用しています。

## 短いプロンプト

```
70 year old caucasian, lady, brown hair, highly detailed face and beautiful  blue eyes, good natural , long hair
```

最初の年齢の部分を10歳ずつ下げながら画像を生成しました。
なお、ランダムシードは 4009167996 を使用しています。

#### 70歳

![70](./70.png)

#### 60歳

![60](./60.png)

#### 50歳

![50](./50.png)

#### 40歳

![40](./40.png)

#### 30歳

![30](./30.png)

#### 20歳

![20](./20.png)

20歳から60歳の範囲では生成画像に微妙な違いはあるものの、70歳の画像と比較すると明確な差が見られました。

## 長いプロンプト

```
70 year old caucasian, lady, brown hair, highly detailed face and beautiful  blue eyes, good natural , long hair, she is in gym taking a mirro photo, bending over, seductive smirk, in gym fit, legging gymshark and nice ass, in front
```

#### 70歳

![70](./gym_70.png)

#### 20歳

![30](./gym_30.png)

背景は異なっているものの、画像に写る女性像にはほとんど違いが見られませんでした。

## 単語を置き換えたプロンプト

```
70 year old caucasian, female, brown hair, highly detailed face and beautiful  blue eyes, good natural , long hair
```

#### 70歳

![70](./70_female.png)

#### 60歳

![60](./60_female.png)

#### 50歳

![50](./50_female.png)

#### 40歳

![40](./40_female.png)

#### 30歳

![30](./30_female.png)

#### 20歳

![20](./20_female.png)

#### 10歳

![10](./10_female.png)

プロンプト中の「lady」を「female」に置き換えたところ、年齢ごとの生成画像のバリエーションがわずかながらもはっきりと増えました。このことから、AIモデルが「lady」という単語をより限定的な属性やステレオタイプと結びつけていることで、出力の幅が狭まっている可能性が示唆されます。
