---
title: 'OIDC Authentication Succeeded, but npm Publish Returned 404 — Here’s What Happened'
seoTitle: 'OIDC Authentication Succeeded, but npm Publish Returned 404 — Here’s What Happened'
slug: 'oidc-authentication-succeeded-but-npm-publish-returned-404-here-s-what-happened'
description: ''
pubDate: '2026-08-09'
updatedDate: '2026-08-09'
tags: ['git','npm']
---

Last week I published a new npm package, `hakoniwa-term`.

https://www.npmjs.com/package/hakoniwa-term

I did the first publish manually and set a GitHub Actions workflow to automate the publish process.

After adding a GitHub Actions workflow so that creating a release would automatically publish the latest package to npm, I registered my repository information on the npm side to use OIDC authentication. I had already done the same setup for another package called hyouji, so the configuration itself went smoothly. However, when I actually created a release, even though OIDC authentication worked fine, the npm publish step aborted with a 404 error.

What GitHub Actions showed me.
```shell
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/hakoniwa-term
```

I checked the information of my package with `npm view`
```shell
npm view hakoniwa-term
```

The output verified that the package exists and its maintainer is me. Also, I checked the package URL a couple of times.

https://www.npmjs.com/package/hakoniwa-term

However, the above URL works as expected, and all the info on the npm page is what I expected.


I tried to find out the issue with Gemini 3.5 Flash, but it kept asking me the same questions to me and couldn't find out a solution to my issue.


Today, I tried to fix the issue with ChatGPT, and it told me that my case is very weird since you don't have any issue with OIDC authentication, but the error shows 404. Basically, if you have any issue on the authentication part, it would be 403, so that means your issue isn't about authentication.
Then it asked me about `Trusted Publisher`, but it said your settings looked fine. Finally, it suggested me to `re-create the Trusted Publisher setting`.

I did it, then everything worked as expected lol.

## Conclusion
In the end, the problem wasn’t my workflow, my package configuration, or OIDC itself — it was the Trusted Publisher setup. Even though everything looked correct and OIDC authentication was succeeding, npm still returned a 404 during publish. Re‑creating the Trusted Publisher configuration instantly resolved the issue.

It was a good reminder that when npm’s registry behaves strangely — especially when authentication succeeds but publishing doesn’t — the Trusted Publisher settings can silently fall out of sync. Resetting them is sometimes the fastest path forward.

Now the release workflow works exactly as intended, and future publishes will be fully automated.
