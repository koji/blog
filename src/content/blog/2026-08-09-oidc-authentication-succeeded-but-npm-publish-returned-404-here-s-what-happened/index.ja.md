---
title: 'OIDC認証は成功したのに npm publish で404が返ってきた話'
seoTitle: 'OIDC認証は成功したのに npm publish で404が返ってきた話'
slug: 'oidc-authentication-succeeded-but-npm-publish-returned-404-here-s-what-happened.ja'
description: 'OIDC認証は成功したのに npm publish で404エラーが発生しました。原因はワークフローやパッケージ設定ではなく、密かに壊れていた Trusted Publisher の設定でした。再作成したところ即座に解決しました。'
pubDate: '2026-08-09'
updatedDate: '2026-08-09'
tags: ['git', 'npm']
---

先週、新しい npm パッケージ `hakoniwa-term` を公開しました。

https://www.npmjs.com/package/hakoniwa-term

初回は手動で publish し、以降の公開を自動化するために GitHub Actions のワークフローを用意しました。

GitHub でリリースを作成すると自動的に最新のパッケージが npm に publish されるようにワークフローを追加し、OIDC 認証を利用するために npm 側でリポジトリ情報を登録しました。別のパッケージである hyouji でも同じ設定を済ませていたため、今回の設定自体はスムーズに完了しました。しかし実際にリリースを作成してみると、OIDC 認証は問題なく成功したにもかかわらず、npm publish のステップで 404 エラーが発生して処理が中断されてしまいました。

GitHub Actions に表示されたエラーは次のとおりでした。

```shell
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/hakoniwa-term
```

`npm view` でパッケージの情報を確認してみました。

```shell
npm view hakoniwa-term
```

出力を見るとパッケージは確かに存在しており、メンテナーも自分自身になっていることが確認できました。念のためパッケージの URL も何度か確認してみました。

https://www.npmjs.com/package/hakoniwa-term

しかし上記の URL は想定どおりに開くことができ、npm 上の情報もすべて期待どおりでした。

Gemini 3.5 Flash に原因を調べてもらおうとしましたが、同じ質問を繰り返されるばかりで解決策は見つかりませんでした。

そこで今日、ChatGPT に相談してみたところ、「OIDC 認証自体は成功しているのに 404 が出るのはかなり奇妙だ」と言われました。基本的に認証周りに問題があれば 403 が返ってくるはずなので、これは認証の問題ではないということでした。
続いて `Trusted Publisher` の設定について聞かれましたが、一見すると設定に問題はないとのことでした。そして最終的に「Trusted Publisher の設定を再作成してみてはどうか」と提案されました。

言われたとおりに再作成してみたところ、あっさり期待どおりに動作するようになりました（笑）。

## まとめ

結局、問題はワークフローでもパッケージ設定でも OIDC 自体でもなく、Trusted Publisher の設定にありました。見た目上はすべて正しく設定されており OIDC 認証も成功していたのに、npm の publish 時には 404 が返ってきていました。Trusted Publisher の設定を再作成したところ、即座に問題は解消しました。

npm レジストリが奇妙な挙動を示すとき、特に認証は成功しているのに publish が失敗するような場合は、Trusted Publisher の設定が密かに同期ずれを起こしている可能性があるのだと実感しました。そういったときは設定をリセットするのが最も早い解決策になることもあります。

現在はリリースワークフローが想定どおりに動作しており、今後の publish はすべて自動化されました。
