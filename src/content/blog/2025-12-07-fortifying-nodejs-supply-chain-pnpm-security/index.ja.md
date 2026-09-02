---
title: 'Node.js サプライチェーンを強化する: pnpm のための 4 つのセキュリティベストプラクティス'
seoTitle: 'Node.js サプライチェーンを強化する: pnpm のための 4 つのセキュリティベストプラクティス'
slug: 'fortifying-nodejs-supply-chain-pnpm-security.ja'
description: 'pnpm のための 4 つの重要なセキュリティベストプラクティス（minimumReleaseAge、Aikido、ignore-scripts、OSV-Scanner）を学び、サプライチェーン攻撃から Node.js サプライチェーンを保護しましょう。'
pubDate: '2025-12-07'
updatedDate: '2025-12-07'
tags: ['nodejs', 'pnpm', 'security', 'supply-chain', 'devops']
coverImage: './cover.png'
---

## Node.js サプライチェーンを強化する: pnpm のための 4 つのセキュリティベストプラクティス

**pnpm** への移行を機に、セキュリティ体制の強化に取り組んでいます。近年のサプライチェーン攻撃 —「Shai-Hulud」事件のような事例 — は不意を突くことを狙い、インストール直後に悪意のあるコードを実行します。

これに対抗するため、CI/CD パイプラインと開発者のマシンを守る 4 つの防御策を導入しています。

### 1\. 「クールダウン」期間: `minimumReleaseAge`

ゼロデイ攻撃に対する最も効果的な防御は「待つこと」です。悪意のあるパッケージは通常、数日以内にレジストリの管理者によって検出・削除されます。「新しすぎる」バージョンを拒否することで、危険な期間をまるごと回避できます。

過去 30 日以内にリリースされたパッケージバージョンを拒否するように pnpm を設定しています。

**設定:** `pnpm-workspace.yaml`

```yaml
# Rejects packages released less than 30 days ago
minimumReleaseAge: 43200 # 43200 minutes = 30 days
```

**⚠️ 緊急時の抜け道:**

たとえば `react` のようなライブラリの重大なセキュリティ脆弱性を修正するために、どうしても最新のリリースをすぐに取り込みたい場合があります。そのようなときは、`minimumReleaseAgeExclude` を使ってこのルールをバイパスできます:
**minimumReleaseAgeExclude** は最新バージョンの pnpm が必要な場合があります。

```yaml
minimumReleaseAge: 43200
# Allow urgent security patches for specific libraries
minimumReleaseAgeExclude:
  - react
  - react-dom
```

### 2\. マルウェアをブロックする: Aikido Safe Chain

`minimumReleaseAge` が _新しい_ 脅威から守るのに対し、**Aikido Safe Chain** は _既知の_ マルウェアから守ります。ローカルマシンと npm レジストリの間で安全なプロキシとして機能します。

- **マルウェアのブロック:** 既知のマルウェアが開発者のノート PC に届く前に積極的に阻止します。
- **スマートゲーティング:** 24 時間以内に公開されたパッケージを抑制します（pnpm の設定が無効になった場合のセーフティネットとして機能します）。
- **プライバシー:** トークン不要で、ビルドデータを共有しません。

### 3\. 攻撃対象領域の縮小: `ignore-scripts`

ライフサイクルスクリプト（`preinstall`、`postinstall`）は、リモートコード実行（RCE）攻撃の主要な経路です。これらのスクリプトをグローバルに無効化することで、`pnpm install` が任意のコードを密かに実行しないようにします。

**ステップ 1: スクリプトをグローバルに無効化する**
`.npmrc` にて:

```ini
ignore-scripts=true
```

**ステップ 2: 必要なツールをホワイトリストに登録する**
`esbuild` や `sharp` のようなツールは、動作するためにビルドステップが必要です。`package.json` で明示的にホワイトリストに登録してください:

```json
{
	"pnpm": {
		"onlyBuiltDependencies": ["esbuild", "sharp", "sqlite3"]
	}
}
```

### 4\. 継続的な脆弱性スキャン

セキュリティは一度設定して終わりではありません。Google 製のツール **OSV-Scanner** を使って脆弱性検出を自動化しています。このツールは依存関係を Open Source Vulnerability データベースと照合します。

これを定期的に（例: 毎週）実行し、結果を GitHub Security に投稿しています。

---

### GitHub Actions ワークフロー

以下は、自身の npm パッケージで実際に使用している GitHub Actions ワークフローです。
2 つのことを行います。1 つは `pnpm audit` の実行、もう 1 つは `osv-scanner` の実行です。

**ファイル:** `.github/workflows/security-audit.yaml`

```yaml
name: Weekly Security Audit

on:
  schedule:
    # every monday at 6:00 UTC
    - cron: '0 6 * * 1'
  workflow_dispatch: {}

permissions:
  contents: read
  # Needed for uploading SARIF to GitHub Code Scanning
  security-events: write

jobs:
  # JOB 1: Run the scanners, upload SARIF, and upload artifacts
  run-scanners:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # 1. Setup pnpm environment
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      # 2. Run pnpm audit (save as JSON)
      - name: Run pnpm audit (JSON)
        run: |
          pnpm audit --json > pnpm-audit.json || true

      # Run OSV-Scanner via Docker and save JSON results
      - name: Run OSV-Scanner (JSON)
        run: |
          docker run --rm \
            -v "$PWD":/src \
            ghcr.io/google/osv-scanner:v2.3.0-amd64 \
            scan source /src \
              --recursive \
              --format=json \
              --output=/src/osv-results.json \
          || true

      # Run OSV-Scanner again to produce SARIF for GitHub Code Scanning
      - name: Run OSV-Scanner (SARIF)
        run: |
          docker run --rm \
            -v "$PWD":/src \
            ghcr.io/google/osv-scanner:v2.3.0-amd64 \
            scan source /src \
              --recursive \
              --format=sarif \
              --output=/src/osv-results.sarif \
          || true

      # Upload SARIF to GitHub Code Scanning
      - name: Upload OSV SARIF to GitHub
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: osv-results.sarif

      # Upload JSON results so the next job can access them for Discord
      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: security-results
          path: |
            pnpm-audit.json
            osv-results.json

  # JOB 2: Download results and notify Discord
  notify:
    needs: run-scanners
    runs-on: ubuntu-latest
    env:
      DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
    steps:
      - name: Download Artifacts
        uses: actions/download-artifact@v4
        with:
          name: security-results

      - name: Notify Discord
        if: always()
        run: |
          PNPM_ISSUES=""

          # 3. Parse pnpm audit JSON
          if [ -s pnpm-audit.json ]; then
            # pnpm audit returns an "advisories" object. We map through it.
            PNPM_ISSUES=$(jq -r '
              .advisories 
              | to_entries[] 
              | .value 
              | "\(.module_name) (\(.severity))"
            ' pnpm-audit.json | sort -u)
          fi

          OSV_ISSUES=""
          if [ -s osv-results.json ]; then
            OSV_ISSUES=$(jq -r '
              .results[]
              .packages[]
              | select(.vulnerabilities | length > 0)
              | "\(.Package.name)@\(.Package.version)"
            ' osv-results.json | sort -u)
          fi

          if [ -z "$PNPM_ISSUES$OSV_ISSUES" ]; then
            MESSAGE="✅ **No Issues Found**\nAll security checks passed."
          else
            MESSAGE="🚨 **Security Alert**\n\`\`\`\n"
            if [ -n "$PNPM_ISSUES" ]; then
              MESSAGE="$MESSAGE[pnpm audit]\n$PNPM_ISSUES\n\n"
            fi
            if [ -n "$OSV_ISSUES" ]; then
              MESSAGE="$MESSAGE[osv-scanner]\n$OSV_ISSUES\n"
            fi
            MESSAGE="$MESSAGE\`\`\`"
          fi

          FORMATTED_MESSAGE=$(printf "%b" "$MESSAGE")
          PAYLOAD=$(jq -n --arg content "$FORMATTED_MESSAGE" '{content:$content}')

          curl -H "Content-Type: application/json" \
            -X POST \
            -d "$PAYLOAD" \
            "$DISCORD_WEBHOOK_URL"
```
