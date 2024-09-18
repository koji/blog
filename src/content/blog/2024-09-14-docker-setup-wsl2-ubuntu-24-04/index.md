---
title: 'Setting Up Docker on WSL2 with Ubuntu 24.04: An Easy Guide'
seoTitle: 'How to Easily Set Up Docker on WSL2 with Ubuntu 24.04'
slug: 'docker-setup-wsl2-ubuntu-24-04'
description: 'Learn how to set up Docker on WSL2 with Ubuntu 24.04 in this step-by-step guide. Streamline your development environment on Windows with Linux integration through WSL2.'
pubDate: '2024-09-14'
updatedDate: '2024-09-14'
tags: ['Windows', 'Linux', 'WSL']
coverImage: 'wsl.png'
---

## Step1. activate WSL2

https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-1---enable-the-windows-subsystem-for-linux

## Step2. update WSL2

```shell
wsl --update
```

## Step3. install ubuntu

```shell
# check available distributions
wsl --list --online

# install 24.04
wsl --install -d Ubuntu-24.04
```

## Step4. install docker

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# check docker version
docker -v
```

## Step5. add your account to docker group

```shell
sudo groupadd docker
sudo usermod -aG docker <your_account_name>
```

## Optional

### change memory size

```shell
New-Item ~/.wslconfig
```

### add memory info to `.wslconfig`

```shell
[wsl2]
memory=32GB
```

### shutdown

```shell
wsl --shutdown
```
