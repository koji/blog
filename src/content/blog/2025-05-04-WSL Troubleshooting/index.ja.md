---
title: 'ターミナルからWSL2にアクセスできないときのトラブルシューティングガイド'
seoTitle: 'WSL2アクセスエラーを解決: エラー0x80072745とLxssManagerのトラブルシューティング'
slug: 'wsl2-access-issue-error-0x80072745.ja'
description: 'エラーコード0x80072745やLxssManagerの消失など、WSL2の起動トラブルを解決する方法を解説します。ターミナルからのアクセスを復旧するためのステップバイステップガイドです。'
pubDate: '2025-05-04'
updatedDate: '2025-05-04'
tags: ['WSL', 'Windows']
---

突然WSLにアクセスできなくなったときのトラブルシューティングガイドです。
この問題は、Docker DesktopとWSLを併用している環境でよく発生します。

## 問題: WSLが起動しない

WSLを起動しようとすると、次のようなエラーが表示されます:

```
[process exited with code 4294967295 (0xffffffff)]
You can now close this terminal with Ctrl+D, or press Enter to restart.
The Windows Subsystem for Linux instance has terminated.
Error code: Wsl/Service/0x80072745

[process exited with code 4294967295 (0xffffffff)]
You can now close this terminal with Ctrl+D, or press Enter to restart.
```

## 診断手順

1. WSLの状態を確認する:

   ```powershell
   wsl --status
   ```

2. すべてのWSLインスタンスをシャットダウンする:

   ```powershell
   wsl --shutdown
   ```

3. インストールされているWSLディストリビューションとその状態を一覧表示する:

   ```powershell
   wsl -l -v
   ```

4. 必要に応じて特定のディストリビューションを終了する:

   ```powershell
   wsl --terminate Ubuntu-24.04
   ```

5. WSLサービスの状態を確認する:

   ```powershell
   Get-Service LxssManager | Select-Object Name, Status, StartType
   ```

   ℹ️ このサービスが見つからない場合、WSLコンポーネントが正しくインストールされていないことを意味します。

6. WSL機能がインストールされているか確認する:
   ```powershell
   dism.exe /online /get-featureinfo /featurename:Microsoft-Windows-Subsystem-Linux
   ```
   ⚠️ このコマンドの実行には管理者権限が必要です。

## 解決方法

エラーコード0x80072745が発生した場合や、LxssManagerサービスが見つからない場合は、次の手順を試してください:

1. **PowerShellまたはコマンドプロンプトを管理者として開く**（右クリックして「管理者として実行」を選択）

2. **必要なWindows機能を有効化する**:

   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

3. **コンピューターを再起動する**

4. **再起動後、WSLを更新する**（管理者として実行）:

   ```powershell
   wsl --update
   ```

5. **再度WSLを起動してみる**

## その他のトラブルシューティング

問題が解決しない場合:

- **WSLをリセットする**:

  ```powershell
  wsl --unregister <distro-name>
  ```

  その後、Microsoft Storeからディストリビューションを再インストールしてください。

- **Windowsを更新する**: WSLの更新はWindows Update経由で配信されることが多いため、Windowsが最新の状態であることを確認してください。

- **競合するソフトウェアを確認する**: 一部のウイルス対策ソフトやファイアウォールがWSLの動作を妨げている場合があります。
