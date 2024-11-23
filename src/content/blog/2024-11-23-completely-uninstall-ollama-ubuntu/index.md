---
title: 'How to Completely Uninstall Ollama from Ubuntu: A Step-by-Step Guide'
seoTitle: 'Complete Guide: Uninstall Ollama on Ubuntu - Remove All Traces [2024]'
slug: 'completely-uninstall-ollama-ubuntu'
description: 'Learn how to properly uninstall Ollama from Ubuntu with this comprehensive guide. Follow step-by-step instructions to remove all Ollama components, including services, binaries, and configuration files, ensuring a clean system.'
pubDate: '2024-11-23'
updatedDate: '2024-11-23'
tags: ['ollama', 'ubuntu', 'linux']
coverImage: './cover.png'
---

To uninstall Ollama from Ubuntu, follow these comprehensive steps:


## 1. Stop and Disable the Service
First, stop the Ollama service and prevent it from starting automatically on boot:

```zsh
sudo systemctl stop ollama
sudo systemctl disable ollama
```


## 2. Remove Ollama Files and Directories
Delete the Service File
Remove the Ollama service file:

```zsh
sudo rm /etc/systemd/system/ollama.service
```


## 3.Remove the Ollama Binary
Delete the Ollama executable:

```zsh
sudo rm ${which ollama}
```


## 4. Clean Up Ollama Data and Configuration
Remove Ollama's data directory and configuration files:

```zsh
sudo rm -r /usr/share/ollama
rm -rf ~/.ollama
```

## 6. Remove Ollama User and Group
Delete the Ollama user and group from the system:
This step may not be necessary if you have not created a separate user for Ollama.
```zsh
sudo userdel ollama
sudo groupdel ollama
```

## 7.Verify Uninstallation
To ensure Ollama has been completely removed, you can run:

```zsh
systemctl list-units --type=service | grep ollama
```

If you no longer see the Ollama service listed, you have successfully uninstalled it.


## Conclusion
By following these steps, you have successfully uninstalled Ollama from your Ubuntu.
