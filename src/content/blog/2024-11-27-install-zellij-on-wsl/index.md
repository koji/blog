---
title: 'Install Zellij on WSL'
seoTitle: 'How to Install Zellij Terminal Multiplexer on Windows Subsystem for Linux (WSL)'
slug: 'install-zellij-on-wsl'
description: 'A step-by-step guide to installing Zellij, a powerful terminal workspace and multiplexer, on Windows Subsystem for Linux (WSL). Learn how to set up WSL, install Rust, and get Zellij running on your system.'
pubDate: '2024-11-27'
updatedDate: '2024-11-27'
tags: ['WSL', 'zellij', 'Windows', 'Linux']
coverImage: 'cover.png'
---

## What is Zellij?

> Zellij is a workspace aimed at developers, ops-oriented people and anyone who loves the terminal. Similar programs are sometimes called "Terminal Multiplexers".

repo  
https://github.com/zellij-org/zellij

## Install Zellij on WSL

### step1: install WSL

https://learn.microsoft.com/en-us/windows/wsl/install

### step2: install curl and build-essential

```zsh
sudo apt update
sudo apt install curl build-essential
```

### step3: install rust and cargo

when you run the following command, you will be asked to choose an installation option.
If there is no specific reason, I recommend to choose option 1.

```zsh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

```zsh
# check rust version
rustc --version
rustc 1.82.0

# check cargo version
koji@kj-minis ~/dev/blog % cargo --version
cargo 1.82.0
```

### step4: install zellij

```zsh
cargo install --locked zellij
```

### step5: check zellij version and run zellij

```zsh
# check zellij version
zellij --version
zellij 0.41.2
```

```zsh
# run zellij
zellij
```

![zellij-on-wsl](Zellij.png)
