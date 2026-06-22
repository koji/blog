---
title: 'Building Terax from Source on an Intel Mac'
seoTitle: 'Building Terax from Source on an Intel Mac'
slug: 'building-terax-from-source-on-an-intel-mac'
description: 'Terax doesn’t ship Intel Mac builds, so I compiled it myself. This guide covers the full setup, required tools, and step‑by‑step instructions for building Terax from source on an Intel-based macOS machine.'
pubDate: '2026-06-22'
updatedDate: '2026-06-22'
tags: ['terax', 'terminal', 'cli']
---


Warp was my favorite for a long time, but as new features were added it gradually became heavier, so I switched to Ghostty. I like Ghostty because it lets you use fragment shaders you’ve written yourself as the background. After that, I tried Cmux, which is based on Ghostty and lets you do even more, and I used it for about a month. However, its RAM usage turned out to be much higher than I expected, so I was thinking I might go back to iTerm2 when I discovered Terax on [Better Stack](https://www.youtube.com/watch?v=3L8htHUzAI4).

Unfortunately, Terax doesn’t provide a build for Intel Macs, so I built it myself. In this article, I’ll walk through the steps I took.

## My Terminal History
1. Terminal app

2. iTerm 2 (still using)
https://iterm2.com/

3. Warp
https://www.warp.dev/

4. Ghostty
https://ghostty.org/

5. Cmux 
https://cmux.com

6. Terax ← now
https://terax.app/

I loved Warp but 

>A lightweight AI terminal with a built-in editor, AI agents, and live web preview. 7 MB on disk. 300 ms cold start. BYOK or fully local.

#### my current
You can set an image as the background as well as other Terminal apps but Terax is lighter and faster than them 😎

![Terax](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/p1bhebm30ek2w1embt0f.png)

GitHub repo
https://github.com/crynta/terax-ai


## Building Terax from Source

### Prerequisites

- **Rust** (stable) — install via [rustup](https://rustup.rs)
- **Node.js** 20+
- **pnpm** v10 — install via [mise](https://mise.jdx.dev) (recommended) or directly
- **Platform prerequisites** from [Tauri's getting started guide](https://tauri.app/start/prerequisites/)

### Install pnpm v10 via mise or npm

```shell
mise install pnpm@10.32.1
mise use pnpm@10.32.1

# npm
npm i -g pnpm
```

## Development build

```bash
pnpm install
pnpm tauri dev
```

### Production build

### macOS — Intel (x86_64)

```shell
rustup target add x86_64-apple-darwin
pnpm install
pnpm tauri build --target x86_64-apple-darwin
```

Output: `src-tauri/target/x86_64-apple-darwin/release/bundle/macos/Terax.app`


### Notes
- The first build takes 20–40 minutes as Rust compiles all dependencies from scratch. Subsequent builds use the cache and are much faster.
- DMG creation requires macOS system tools (`hdiutil`). If the DMG step fails, the `Terax.app` bundle is still usable — copy it to `/Applications` or run it directly.
- Code signing is optional for local builds. The CI uses Apple certificates and notarization for release builds.
