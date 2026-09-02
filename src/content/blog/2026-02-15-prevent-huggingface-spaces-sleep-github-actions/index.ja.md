---
title: 'GitHub ActionsでHugging Face Spacesのスリープを防止する'
seoTitle: 'GitHub ActionsとPlaywrightでHugging Face Spacesのスリープを防止する方法'
slug: 'prevent-huggingface-spaces-sleep-github-actions.ja'
description: 'GitHub Actionsとagent-browserを使ってHugging Face Spaceを自動的に起動状態に保つ方法を紹介します。毎日スクリーンショットを取得してDiscordに送信し、シンプルな稼働監視を実現します。'
pubDate: '2026-02-15'
updatedDate: '2026-02-15'
tags: ['HuggingFace', 'GitHubActions', 'Discord']
coverImage: './cover.png'
---

Hugging Face Spacesは、デモやツール、軽量なアプリのホスティングに非常に便利です。

https://huggingface.co/

ただし、1つだけ制限があります。

48時間アクセスがないと、Spaceはスリープしてしまいます。

これは次のような場合に困ります。
• デモのURLを共有した際、初回アクセスが遅くなる（コールドスタート）
• n8nのような自動化ツールをホスティングしている
• アプリを常に「すぐ使える」状態にしておきたい
• シンプルな稼働監視をしたい

そこで、次のような小さな自動化を組みました。

GitHub Actionsが毎日Spaceにアクセスする
agent-browserがページを開いてスクリーンショットを撮影する
スクリーンショットをDiscordに投稿する

これで2つを同時に実現できます。
• ✅ スリープの防止
• ✅ 目視による稼働監視

この記事では、その具体的なセットアップ方法を紹介します。

⸻

なぜagent-browserを使うのか？

SpaceのURLに単純にcurlするだけでも構いません。

しかし、私が求めていたのは次のようなことでした。
• HTTP pingではなく、実際のブラウザでのアクセス
• ページが完全にレンダリングされたことの確認
• 証拠としてのスクリーンショットの取得
• 何も壊れていないことを目視で確認できること

そこで使ったのが、PlaywrightベースのCLIブラウザ自動化ツール「agent-browser」です。

GitHub Actions内でも問題なく動作します。

agent-browser
https://github.com/vercel-labs/agent-browser

⸻

GitHub Actionsワークフロー

実際に使っているYAMLファイルがこちらです。

```yaml
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  access-hugging-face-n8n:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Install agent-browser
        run: npm install -g agent-browser

      - name: Install Playwright browsers
        run: agent-browser install --with-deps

      - name: Go to the hugging face space
        run: |
          agent-browser open ${{ secrets.HUGGING_FACE_SPACE_URL }}
          agent-browser wait --text "Sign in"
          agent-browser screenshot page.png
          agent-browser close

      - name: Notify Discord on done access
        if: success()
        run: |
          curl --fail-with-body -sS -X POST \
            -F 'payload_json={"content":"Hugging Face access job done."}' \
            -F "file1=@page.png;type=image/png" \
            "${{ secrets.DISCORD_WEBHOOK_URL }}"
```

⸻

仕組み

1. 毎日定時に実行

```text
cron: "0 0 * * *"
```

毎日00:00 UTCに1回実行されます。

⸻

2. agent-browserをインストール

```text
npm install -g agent-browser
agent-browser install --with-deps
```

GitHub Actionsのランナー内にPlaywrightと必要なブラウザの依存関係をインストールします。

⸻

3. Hugging Face Spaceを開く

```text
agent-browser open ${{ secrets.HUGGING_FACE_SPACE_URL }}
agent-browser wait --text "Sign in"
agent-browser screenshot page.png
agent-browser close
```

やっていることは次のとおりです。 1. 実際のブラウザでSpaceを開く 2. 「Sign in」というテキストが表示されるまで待機する（完全なレンダリングを保証） 3. スクリーンショットを撮影する 4. ブラウザを閉じる

`wait --text` のステップにより、ページの読み込みが完了する前にスクリーンショットを撮ってしまうのを防ぎます。

テキストは、あなたのアプリに合わせてより具体的なものに変更しても構いません。

⸻

4. スクリーンショットをDiscordに投稿

```text
curl -X POST \
-F 'payload_json={"content":"Hugging Face access job done."}' \
-F "file1=@page.png;type=image/png" \
"${{ secrets.DISCORD_WEBHOOK_URL }}"
```

これによりDiscordチャンネルにwebhook経由で以下が送信されます。
• 成功メッセージ
• スクリーンショット画像

これで次の2つが手に入ります。
• スリープ防止
• 毎日の目視ヘルスチェック

⸻

シークレットの設定

GitHubリポジトリで、

Settings → Secrets and variables → Actions

を開き、以下を追加します。
• HUGGING_FACE_SPACE_URL
• DISCORD_WEBHOOK_URL

これらはワークフロー内で次のように安全に注入されます。

```text
${{ secrets.SECRET_NAME }}
```

⸻

このアプローチの良いところ

✅ 無料で運用できる

GitHub Actionsの無料枠で十分に収まります。

✅ サーバー不要

EC2もcronサーバーも不要で、メンテナンスも必要ありません。

✅ 実際のブラウザでチェック

単なるpingではなく、レンダリングまで含めた検証ができます。

✅ 目視で確認できる

何かが壊れても、すぐに気づけます。

✅ 拡張が簡単

監視やメトリクス、複数Spaceへの対応なども簡単に追加できます。

⸻

さらなる改善アイデア

さらに拡張するなら、例えば次のようなことができます。
• 特定のテキストが見つからない場合にジョブを失敗させる
• ページの読み込み時間を計測する
• スクリーンショットをS3 / R2にアップロードする
• 複数のSpaceを並列で監視する
• Slack通知を追加する
• スクリーンショットをGitHub Actionsのartifactsとして保存する

軽量な稼働監視システムとして活用することも可能です。

![huggingface_space](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4atpq7wecundwdeuzf3q.png)

⸻

まとめ

Hugging Face Spacesがスリープしてしまうのは、やはり不便です。

しかし、

GitHub Actions + agent-browser

があれば、次のことが可能です。
• Spaceを自動的に起動状態に保つ
• 毎日スクリーンショットを取得する
• Discordで通知を受け取る
• 見た目から正常性を監視する

しかも、自身でサーバーを運用する必要はありません。

シンプルで、効果的、そして完全自動です。
