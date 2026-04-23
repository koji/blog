---
title: 'How We Strengthened Dependency Security in Our Monorepo'
seoTitle: 'How We Strengthened Dependency Security in Our Monorepo'
slug: 'strengthening-dependency-security-in-a-monorepo'
description: 'How we reduced dependency supply chain risk in our monorepo with a one-week package cooldown, lockfiles, disabled install scripts, SHA-pinned GitHub Actions, and zizmor.'
pubDate: '2026-04-23'
updatedDate: '2026-04-23'
tags: ['security', 'supply-chain-security', 'monorepo', 'npm', 'github-actions']
coverImage: './cover.png'
---


# Strengthening Dependency Security in a Monorepo

In response to the recent increase in supply chain attacks in the npm ecosystem, we revisited how dependencies are managed across our monorepo. This article summarizes the security improvements we implemented.

## Background

Looking at recent attack patterns, there has been a noticeable rise in cases where malicious code is introduced into packages immediately after publication. However, in many cases, these packages are **detected and removed within 24–48 hours**.

This leads to a couple of important observations:

* **Using newly published packages immediately carries higher risk**
* **Simply waiting for a short period significantly reduces that risk**

While waiting 24–48 hours already provides some protection, we decided to introduce additional buffer time to account for delayed detection and cases that span weekends. As a result, we adopted a **1-week cooldown period**.

This approach provides:

* A higher likelihood that known attacks have already been mitigated before adoption
* A simple and easy-to-understand operational rule

Based on this, we introduced several measures centered around adding a cooldown period before adopting new dependencies.

---

## 1. Introducing a Cooldown Period

### Policy

* Do not use newly published packages immediately
* Only allow packages that are **at least 1 week old**

### Implementation by Tool

#### Yarn

```bash
yarn config set npmMinimalAgeGate 7
```
https://yarnpkg.com/configuration/yarnrc#npmMinimalAgeGate

This feature is only supported in modern Yarn (Berry). As a result, this also became a good opportunity to **move away from Yarn v1**.

#### pnpm

Configured as follows:

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080
```
https://pnpm.io/settings#minimumreleaseage
uv: 

This has already been applied to our workspace.

#### uv (Python)

```toml
# pyproject.toml
exclude-newer = "1 week"
```
https://docs.astral.sh/uv/reference/settings/#exclude-newer


| Tool | Configuration Key | Example Value |
| :--- | :--- | :--- |
| npm | min-release-age | 4320 (minutes) |
| pnpm | minimumReleaseAge | 4320 (minutes) |
| Yarn | npmMinimalAgeGate | "3d" (duration string) |
| Bun | minimumReleaseAge | 4320 (minutes in bunfig.toml) |


bun: https://bun.com/docs/runtime/bunfig#install-minimumreleaseage

---

## 2. Lockfile-based Dependency Management

We ensure that all dependency installations use lockfiles:

* `yarn.lock`
* `pnpm-lock.yaml`

This allows us to:

* Prevent unintended version upgrades
* Eliminate differences between local and CI/CD environments

`yarn`
```shell
yarn install --frozen-lockfile
```

`pnpm`
```shell
pnpm install --frozen-lockfile
```

---

## 3. Disabling postinstall Scripts

While `postinstall` scripts can be useful, they are also a common entry point for supply chain attacks.

Our approach:
`.npmrc`
```properties
ignore-scripts=true
```

* **Disable postinstall execution by default**

pnpm v10 supports this behavior natively, so no additional configuration was required.

---

## 4. SHA Pinning in GitHub Actions

We also treat GitHub Actions as part of our dependency surface and strengthened version pinning.

### Before

```yaml
- uses: actions/checkout@v4
```

### After

```yaml
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

By pinning to a **specific commit SHA instead of a tag**, we:

* Reduce the risk of supply chain attacks
* Prevent unintended updates

This is secure but it requires to update yaml files manually which is very painful.
So I'm planning to introduce a tool like [pin-github-action](https://github.com/mheap/pin-github-action).

---

## 5. Static analysis for GitHub Actions
As the last step, introduced [zizmor](https://github.com/zizmorcore/zizmor) to detect GitHub Actions' workflows' security issues. 

{% embed https://docs.zizmor.sh/trophy-case/ %}

---

## Summary

Key takeaways from this effort:

* Introduced a **1-week cooldown period** for new packages
* Enforced **strict dependency pinning via lockfiles**
* **Restricted postinstall script execution**
* Applied **SHA pinning in GitHub Actions**

Among these, the cooldown period is particularly simple yet highly effective, and can be adopted quickly in most projects.

---

## Closing Thoughts

Supply chain attacks are likely to continue increasing. However, even basic practices such as:

* “Don’t immediately adopt the latest version”
* “Lock down dependencies”

could reduce risk.

Hopefully, this helps others managing monorepos think about improving their dependency security.
