---
title: 'Clawファミリーをざっと眺めてみる'
seoTitle: 'Clawファミリーをざっと眺めてみる：OpenClaw代替プロジェクトまとめ'
slug: 'a-quick-look-at-the-claw-family.ja'
description: 'OpenClawにインスパイアされたプロジェクトを短く紹介。zeroclaw、nanoclaw、ironclawなど、軽量・安全・セルフホスト可能な代替案に注目します。'
pubDate: '2026-03-18'
updatedDate: '2026-03-18'
tags: ['OpenClaw', 'agent', 'llm', 'security', 'self-hosting']
---

## OpenClaw

https://github.com/openclaw/openclaw

OpenClawを使ってみたのですが、セキュリティ面で少し気になる点がありました。そこで代替となる選択肢がないか調べてみることにしました。
現在は `zeroclaw` を試しています 💪

## NemoClaw

https://github.com/NVIDIA/NemoClaw

### 概要

NVIDIA NemoClawは、OpenClawの常時稼働アシスタントを安全に実行するためのオープンソーススタックです。NVIDIA Agent Toolkitの一部であるNVIDIA OpenShellランタイムをインストールし、自律エージェントを実行するためのセキュアな環境を提供します。推論はNVIDIAクラウド経由でルーティングされます。

## picoclaw

https://github.com/sipeed/picoclaw

### 概要

🦐 PicoClawは、nanobotにインスパイアされた超軽量な個人用AIアシスタントです。AIエージェント自身がアーキテクチャ移行とコード最適化を主導するセルフブートストラッププロセスによって、Goでゼロから全面的にリファクタリングされています。

## nanoclaw

https://github.com/qwibitai/nanoclaw

### 概要

セキュリティのためにコンテナ内で動作する、OpenClawの軽量な代替です。WhatsApp、Telegram、Slack、Discord、Gmailなどのメッセージングアプリと連携でき、記憶機能やスケジュール実行ジョブを備え、Anthropic Agents SDK上で直接動作します。

## zeroclaw

https://github.com/zeroclaw-labs/zeroclaw

### 概要

高速・小型・完全自律型のAIアシスタント基盤 — どこにでもデプロイでき、何でも差し替え可能 🦀

## nanobot

https://github.com/HKUDS/nanobot

### 概要

🐈 nanobotは、OpenClawにインスパイアされた超軽量な個人用AIアシスタントです。

## ironclaw

https://github.com/nearai/ironclaw

### 概要

IronClawは、プライバシーとセキュリティを重視した、RustによるOpenClawインスパイアの実装です。

## nullclaw

https://github.com/nullclaw/nullclaw

### 概要

Zigで書かれた、最も高速で最小、完全自律型のAIアシスタント基盤です。

## moltis

https://github.com/moltis-org/moltis

### 概要

音声、記憶、サンドボックス、MCPツール、マルチチャネルアクセスを備えたRustネイティブな個人用AIアシスタントです。

## zclaw

https://github.com/tnm/zclaw

### 概要

888KiB（アプリコードは約35KB）に収まる個人用AIアシスタント。ESP32上で動作し、GPIO、cron、カスタムツール、記憶機能などを備えています。

## clawlet

https://github.com/mosaxiv/clawlet

### 概要

超軽量で効率的な個人用AIアシスタントです。

## rosclaw

https://github.com/PlaiPin/rosclaw

### 概要

ROS2とOpenClawの融合です。

## geminiclaw

https://github.com/e-mon/geminiclaw

### 概要

Gemini CLIを活用した個人用自律エージェント。スケジューリング、永続的な記憶、MCPツール、マルチチャネルメッセージングを統合します。

## ClawX

https://github.com/ValueCell-ai/ClawX

### 概要

ClawXは、OpenClaw AIエージェントにグラフィカルインターフェースを提供するデスクトップアプリです。CLIベースのAIオーケストレーションを、ターミナルを使わずにデスクトップ体験として利用できるようにします。

## claw-empire

https://github.com/GreenSheep01201/claw-empire

### 概要

CEOデスクからAIエージェント帝国を指揮 — CLI、OAuth、API連携エージェント（Claude Code、Codex CLI、Gemini CLI、OpenCodeなど）を仮想の自律企業としてオーケストレーションする、ローカルファーストなAIエージェントオフィスシミュレーターです。
