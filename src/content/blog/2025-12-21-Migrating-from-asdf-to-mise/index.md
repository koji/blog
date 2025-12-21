---
title: 'Migrating from asdf to mise without the headaches'
seoTitle: 'Migrating from asdf to mise: a practical guide'
slug: 'migration-from-asdf-to-mise'
description: 'A practical walkthrough of switching from asdf to mise, based on a real debugging session.'
pubDate: '2025-12-21'
updatedDate: '2025-12-21'
tags: ['asdf', 'mise', 'toolchain', 'version-manager', 'cli']
coverImage: 'cover.png'
---


## 1. Remove asdf plugins and uninstall asdf

```
# remove plugins
asdf plugin list | xargs -n 1 asdf plugin remove

# uninstall asdf
brew uninstall asdf --force
brew autoremove
```

clean up `.zshrc`

```
# ASDF configuration
. "$BREW_PREFIX/opt/asdf/libexec/asdf.sh"
```

remove files
```shell
rm -rf ~/.asdf
rm -rf ~/.tool-versions
```

Confirmed that asdf has been deleted.
```shell
brew list asdf

# if you can remove asdf successfully, you will see something like this
Error: No such keg: /opt/homebrew/Cellar/asdf
Execution time: 0.88s
```

## 2. Install mise

https://github.com/jdx/mise  
https://mise.jdx.dev/getting-started.html
```shell
brew install mise
```

```shell
# if you install mise successfully, you can see this when running version command
 mise --version
              _                                        __              
   ____ ___  (_)_______        ___  ____        ____  / /___ _________
  / __ `__ \/ / ___/ _ \______/ _ \/ __ \______/ __ \/ / __ `/ ___/ _ \
 / / / / / / (__  )  __/_____/  __/ / / /_____/ /_/ / / /_/ / /__/  __/
/_/ /_/ /_/_/____/\___/      \___/_/ /_/     / .___/_/\__,_/\___/\___/
                                            /_/                 by @jdx
2025.12.12 macos-arm64 (2025-12-18)
Execution time: 0.90s     
```

add the following to `.zshrc`. If you use bash or fish, you need to replace `zsh` with `bash`/`fish`
```shell
eval "$(mise activate zsh)"
```

## 3. Install mise plugins
In my case, I need to install nodejs, pnpm, bun, yarn, and python.  
First check available plugins

```shell
mise plugins ls-remote
```

Also check the core list
```shell
mise plugins ls --core
bun
deno
elixir
erlang
go
java
node
python
ruby
rust
swift
zig
```

Then check available version for each plugin

```shell
# Check available nodes version
mise ls-remote node
mise ls-remote pnpm
mise ls-remote bun
mise ls-remote yarn
mise ls-remote python
```

Finally install
```shell
mise install node@22.21.1
mise install yarn@1.22.22
mise install pnpm@10.22.0
mise install bun@1.3.5
mise install python@3.12.12
```

or you can install them via `mise.toml`
1. create `mise.toml` in your repo folder
2. add `[tools]` to `mise.toml`
For this case, the toml file is like below

```toml
[tools]
node = "22.21.1"
python = "3.12.12"
yarn = "1.22.22"
pnpm = "10.22.0"
```

3. install versions

```shell
mise ERROR error parsing config file: ~/Desktop/dev_test/blog/mise.toml
mise ERROR Config files in ~/Desktop/dev_test/blog/mise.toml are not trusted.
Trust them with `mise trust`. See https://mise.jdx.dev/cli/trust.html for more information.
mise ERROR Run with --verbose or MISE_VERBOSE=1 for more information
```

```shell
# if you see the above Error message, you need to run the trust command to accept the config file.
mise trust

mise install
```

### Check versions
```shell
yarn -v
1.22.22
Execution time: 0.17s  

node -v
v22.21.1
Execution time: 0.03s    

python --version
Python 3.12.12
Execution time: 0.04s      
```

If you see something like this, probably you are missing adding the `eval` command to your `.zshrc`

```shell
 node -v
zsh: command not found: node
```

You need to add the following to `.zshrc`.
```shell
eval "$(mise activate zsh)"
```

## 4. asdf → mise command mapping
| asdf (modern) | mise equivalent | Notes |
|--------------|-----------------|-------|
| `.tool-versions` | `mise.toml` | Project-local tool definitions |
| `asdf set <tool> <ver>` | Edit `mise.toml` | `asdf set` replaces `asdf local/global` |
| `asdf set -u <tool> <ver>` | `~/.config/mise/config.toml` | User/global config |
| `asdf install` | `mise install` | Install all defined tools |
| `asdf exec <cmd>` | `mise exec -- <cmd>` | Run with pinned tools |
| `asdf current` | `mise current` | Show active versions |
| `asdf plugin add <tool>` | *implicit* | mise auto-manages plugins |
| `asdf plugin list` | `mise ls` | List installed tools |
| shims | shell activation (`mise activate`) | PATH-based |
| `.asdf/installs` | `~/.local/share/mise/installs` | Tool installs |
| `.asdf/shims` | `~/.local/share/mise/shims` | Executable shims |
