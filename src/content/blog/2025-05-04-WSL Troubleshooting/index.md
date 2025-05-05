---
title: 'WSL Troubleshooting Guide When You Can Not Access to WSL2 From Terminal'
seoTitle: 'Fix WSL2 Access Issues: Error 0x80072745 & LxssManager Troubleshooting'
slug: 'wsl2-access-issue-error-0x80072745'
description: 'Troubleshoot WSL2 startup problems including error 0x80072745 and missing LxssManager. Follow step-by-step solutions to restore access via terminal.'
pubDate: '2025-05-04'
updatedDate: '2025-05-04'
tags: ['WSL', 'Windows']
coverImage: ''
---

Here is a troubleshooting guide for when you suddenly become unable to access WSL.
This issue often occurs when using Docker Desktop in combination with WSL.

## Problem: WSL Fails to Start

When attempting to run WSL, the following error appears:
```
[process exited with code 4294967295 (0xffffffff)]
You can now close this terminal with Ctrl+D, or press Enter to restart.
The Windows Subsystem for Linux instance has terminated.
Error code: Wsl/Service/0x80072745

[process exited with code 4294967295 (0xffffffff)]
You can now close this terminal with Ctrl+D, or press Enter to restart.
```

## Diagnosis Steps

1. Check WSL status:
   ```powershell
   wsl --status
   ```

2. Shut down all WSL instances:
   ```powershell
   wsl --shutdown
   ```

3. List installed WSL distributions and their states:
   ```powershell
   wsl -l -v
   ```

4. Terminate specific distributions if needed:
   ```powershell
   wsl --terminate Ubuntu-24.04
   ```

5. Check the WSL service status:
   ```powershell
   Get-Service LxssManager | Select-Object Name, Status, StartType
   ```
   ℹ️ If this service is not found, it indicates WSL components aren't correctly installed.

6. Verify WSL feature installation:
   ```powershell
   dism.exe /online /get-featureinfo /featurename:Microsoft-Windows-Subsystem-Linux
   ```
   ⚠️ This requires administrator privileges.

## Solution

If you encounter error code 0x80072745 or if the LxssManager service is missing, follow these steps:

1. **Open PowerShell or Command Prompt as Administrator** (right-click and select "Run as Administrator")

2. **Enable required Windows features**:
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

3. **Restart your computer**

4. **After restart, update WSL** (as Administrator):
   ```powershell
   wsl --update
   ```

5. **Try launching WSL again**

## Additional Troubleshooting

If issues persist:

- **Reset WSL**:
  ```powershell
  wsl --unregister <distro-name>
  ```
  Then reinstall the distribution from the Microsoft Store.

- **Update Windows**: Ensure your Windows is up to date as WSL updates are often delivered through Windows Update.

- **Check for conflicting software**: Some antivirus or firewall software might block WSL operations.
