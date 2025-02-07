---
title: 'Easily Export and Import VSCode Extensions with a Shell Script'
seoTitle: 'How to Export and Import VSCode Extensions Using a Shell Script'
slug: 'vscode-export-import-extensions'
description: 'Learn how to export and import VSCode extensions using a simple shell script. This script saves your installed extensions to a file and allows easy reinstallation without manually clicking the install button.'
pubDate: '2025-02-06'
updatedDate: '2025-02-06'
tags: ['vscode', 'extension', 'shell', 'productivity']
coverImage: './cover.jpg'
---

## How to Export and Import VSCode Extensions Using a Shell Script

If you use Visual Studio Code across multiple devices or frequently reinstall your system, manually reinstalling extensions can be tedious. This simple shell script automates the process by exporting and importing your VSCode extensions with a single command.

### Step 1: Save the Script
Copy the following script and save it as `vscode-extension-importer-exporter.sh` in your home directory:

```shell
#!/bin/bash

echo "Do you want to export or import VSCode extensions? (export/import)"
read action

if [ "$action" == "export" ]; then
  echo "Exporting VSCode extensions..."
  code --list-extensions > vscode-extensions.txt
  echo "Extensions have been exported to vscode-extensions.txt"
elif [ "$action" == "import" ]; then
  echo "Importing VSCode extensions..."
  while IFS= read -r extension; do
    code --install-extension "$extension"
  done < vscode-extensions.txt
  echo "Extensions have been imported from vscode-extensions.txt"
else
  echo "Invalid action. Please choose 'export' or 'import'."
fi
```

### Step 2: Make the Script Executable
After saving the script, give it execution permission by running:

```shell
chmod +x vscode-extension-importer-exporter.sh
```

### Step 3: Run the Script
To execute the script, use the following command:

```shell
./vscode-extension-importer-exporter.sh
```

### How It Works
When you run the script, you will be prompted to choose between exporting or importing VSCode extensions:

- **Exporting:** The script lists all installed VSCode extensions and saves them to a file named `vscode-extensions.txt`.
- **Importing:** The script reads the `vscode-extensions.txt` file and installs each extension automatically.

#### Example Output of `vscode-extensions.txt`
```text
ms-azuretools.vscode-docker
ms-edgedevtools.vscode-edge-devtools
ms-python.autopep8
ms-python.debugpy
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-vscode-remote.remote-containers
ms-vscode.makefile-tools
ms-vscode.vscode-typescript-next
```

### Why Use This Script?
- Saves time when setting up a new machine.
- Ensures you have the same extensions across multiple devices.
- Eliminates the need to manually search and install extensions.

With this simple script, managing VSCode extensions becomes effortless! 🚀

