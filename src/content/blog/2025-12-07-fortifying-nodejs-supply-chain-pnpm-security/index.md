---
title: 'Fortifying the Node.js Supply Chain: 4 Security Best Practices for pnpm'
seoTitle: 'Fortifying the Node.js Supply Chain: 4 Security Best Practices for pnpm'
slug: 'fortifying-nodejs-supply-chain-pnpm-security'
description: 'Learn 4 critical security best practices for pnpm (minimumReleaseAge, Aikido, ignore-scripts, OSV-Scanner) to protect your Node.js supply chain against supply chain attacks.'
pubDate: '2025-12-07'
updatedDate: '2025-12-07'
tags: ['nodejs', 'pnpm', 'security', 'supply-chain', 'devops']
coverImage: './cover.png'
---

## Fortifying the Node.js Supply Chain: 4 Security Best Practices for pnpm

As I migrate to **pnpm**, I am seizing the opportunity to harden our security posture. Recent supply chain attacks—like the "Shai-Hulud" incident—rely on the element of surprise, executing malicious code immediately upon installation.

To counter this, I am introducing four defenses to protect CI/CD pipelines and developer machines.

### 1\. The "Cooling-Off" Period: `minimumReleaseAge`

The most effective defense against zero-day attacks is patience. Malicious packages are typically flagged and removed by registry maintainers within days. By rejecting versions that are "too new," the danger zone can be bypassed entirely.

I configure pnpm to reject any package version released in the last 30 days.

**Configuration:** `pnpm-workspace.yaml`

```yaml
# Rejects packages released less than 30 days ago
minimumReleaseAge: 43200 # 43200 minutes = 30 days
```

**⚠️ The Emergency Hatch:**
Sometimes you *need* a fresh release immediately—for example, to patch a critical security vulnerability in a library like `react`. In those cases, you can bypass this rule using `minimumReleaseAgeExclude`:

```yaml
minimumReleaseAge: 43200
# Allow urgent security patches for specific libraries
minimumReleaseAgeExclude: 
  - react
  - react-dom
```

### 2\. Blocking Malware: Aikido Safe Chain

While `minimumReleaseAge` protects against *new* threats, **Aikido Safe Chain** protects against *known* malware. It acts as a secure proxy between local machines and the npm registry.

  * **Malware Blocking:** Actively prevents known malware from reaching developer laptops.
  * **Smart Gating:** It suppresses packages newer than 24 hours (acting as a safety net if our pnpm config is ever disabled).
  * **Privacy:** It is tokenless and shares no build data.

### 3\. Reducing Attack Surface: `ignore-scripts`

Lifecycle scripts (`preinstall`, `postinstall`) are the primary vector for Remote Code Execution (RCE) attacks. I am disabling these scripts globally to ensure `pnpm install` never silently executes arbitrary code.

**Step 1: Disable scripts globally**
In `.npmrc`:

```ini
ignore-scripts=true
```

**Step 2: Whitelist essential tools**
Tools like `esbuild` or `sharp` require build steps to function. Whitelist them explicitly in `package.json`:

```json
{
  "pnpm": {
    "onlyBuiltDependencies": ["esbuild", "sharp", "sqlite3"]
  }
}
```

### 4\. Continuous Vulnerability Scanning

Security is not a one-time setup. I automate vulnerability detection using **OSV-Scanner**, a tool by Google that checks dependencies against the Open Source Vulnerability database.

I run this on a schedule (e.g., weekly) and post results to GitHub Security.

-----

### The GitHub Actions Workflow

The following is the GitHub Actions workflow that I'm using for my npm package.
It does two things. One is running `pnpm audit` and the other is running `osv-scanner`.

**File:** `.github/workflows/security-audit.yaml`

```yaml
name: Weekly Security Audit

on:
  schedule:
    # every monday at 6:00 UTC
    - cron: "0 6 * * 1"
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

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: "latest"

      # save bun audit as JSON
      - name: Run bun audit (JSON)
        run: |
          bun audit --json > bun-audit.json || true

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
        uses: github/codeql-action/upload-sarif@v4
        with:
          sarif_file: osv-results.sarif

      # Upload JSON results so the next job can access them for Discord
      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: security-results
          path: |
            bun-audit.json
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
          BUN_ISSUES=""
          if [ -s bun-audit.json ]; then
            BUN_ISSUES=$(jq -r '
              ..
              | objects
              | select(.name? and .severity?)
              | "\(.name)@\(.version // "unknown") (\(.severity))"
            ' bun-audit.json | sort -u)
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

          if [ -z "$BUN_ISSUES$OSV_ISSUES" ]; then
            MESSAGE="✅ **No Issues Found**\nAll security checks passed."
          else
            MESSAGE="🚨 **Security Alert**\n\`\`\`\n"
            if [ -n "$BUN_ISSUES" ]; then
              MESSAGE="$MESSAGE[bun audit]\n$BUN_ISSUES\n"
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


