---
title: 'How to Install Docker on Raspberry Pi'
seoTitle: 'Step-by-Step Guide: Install Docker on Raspberry Pi'
slug: 'how-to-install-docker-raspberry-pi'
description: 'Learn how to install Docker on a Raspberry Pi and set up your environment for containerized applications with a simple step-by-step guide.'
pubDate: '2024-12-26'
updatedDate: '2024-12-26'
tags: ['docker', 'raspberry pi']
coverImage: 'raspberry-pi.jpg'
---

Photo by <a href="https://unsplash.com/@praveentcom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Praveen Thirumurugan</a> on <a href="https://unsplash.com/photos/red-and-white-circuit-board-VHTVtYTNr8M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Install Docker on Raspberry Pi

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Add user to the docker group

```shell
sudo gpasswd -a $USER docker   # Add user to the docker group
newgrp docker                 # Refresh the group membership
```

## Verify Docker Installation

This command checks that Docker has been successfully installed on your Raspberry Pi.

```shell
docker --version

Docker version 27.4.1, build b9d17ea
```

## Hello World

This command runs a test container to verify Docker is working properly.

```shell
docker container run --rm hello-world
```
