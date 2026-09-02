#!/usr/bin/env pwsh

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = $PSScriptRoot
$templatePath = Join-Path $scriptDir 'src/content/blog-template/index.md'
$blogRoot = Join-Path $scriptDir 'src/content/blog'

function Convert-ToSlug {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  $slug = $Value.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
  $slug = $slug.Trim('-')
  $slug = $slug -replace '-+', '-'
  return $slug
}

function Convert-ToYamlSingleQuoted {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  return $Value -replace "'", "''"
}

if (-not (Test-Path -LiteralPath $templatePath -PathType Leaf)) {
  Write-Error "Template not found: $templatePath"
}

# Parse CLI args
$title = $null
$titleJa = $null
$createJa = $false
$addJaMode = $false
$existingDir = $null
$help = $false

$argsQueue = @($args)
for ($i = 0; $i -lt $argsQueue.Count; $i++) {
  $arg = $argsQueue[$i]
  switch ($arg) {
    '--ja' { $createJa = $true }
    '--both' { $createJa = $true }
    '--add-ja' {
      $addJaMode = $true
      if ($i + 1 -lt $argsQueue.Count) {
        $existingDir = $argsQueue[$i + 1]
        $i++
      }
    }
    '--help' { $help = $true }
    '-h' { $help = $true }
    default {
      if ($addJaMode -and -not $existingDir) {
        $existingDir = $arg
      } elseif (-not $title) {
        $title = $arg
      } elseif ($createJa -and -not $titleJa) {
        $titleJa = $arg
      } else {
        if (-not $title) { $title = $arg }
      }
    }
  }
}

if ($help) {
  Write-Host "Usage: .\new-article-win.ps1 [""Title""] [--ja|--both] [--add-ja <existing-dir>]"
  Write-Host "  Title: article title (en). If omitted, will prompt."
  Write-Host "  --ja/--both: also create index.ja.md (slug will be <slug>.ja)"
  Write-Host "  --add-ja: add Japanese version to existing article directory"
  exit 0
}

# Add-ja mode: add Japanese translation to existing article
if ($addJaMode) {
  if (-not $existingDir) {
    $existingDir = Read-Host 'Existing article directory (e.g. 2025-12-21-my-post)'
  }
  if (Test-Path -LiteralPath (Join-Path $blogRoot $existingDir) -PathType Container) {
    $articleDir = Join-Path $blogRoot $existingDir
  } elseif (Test-Path -LiteralPath $existingDir -PathType Container) {
    $articleDir = $existingDir
  } else {
    Write-Error "Directory not found: $existingDir (tried $blogRoot\$existingDir)"
  }

  if (Test-Path -LiteralPath (Join-Path $articleDir 'index.ja.md')) {
    Write-Error "Japanese version already exists: $(Join-Path $articleDir 'index.ja.md')"
  }

  $existingEnPath = Join-Path $articleDir 'index.md'
  $existingContent = Get-Content -LiteralPath $existingEnPath -Raw
  $existingSlug = if ($existingContent -match "(?m)^slug:\s*'(.*)'") { $Matches[1] } else { $null }
  if (-not $existingSlug) {
    Write-Error "Could not read slug from $existingEnPath"
  }
  if ($existingSlug.EndsWith('.ja')) {
    $slugJa = $existingSlug
  } else {
    $slugJa = "$existingSlug.ja"
  }

  if (-not $title) {
    $titleJaInput = Read-Host 'Title (ja) [auto]'
    if ([string]::IsNullOrWhiteSpace($titleJaInput)) {
      $titleFromEn = if ($existingContent -match "(?m)^title:\s*'(.*)'") { $Matches[1] -replace "''", "'" } else { $null }
      if ($titleFromEn) {
        $titleJa = $titleFromEn
      } else {
        $titleJa = $existingSlug
      }
    } else {
      $titleJa = $titleJaInput
    }
  } else {
    $titleJa = $title
  }

  $pubDate = if ($existingContent -match "(?m)^pubDate:\s*'(.*)'") { $Matches[1] } else { Get-Date -Format 'yyyy-MM-dd' }

  $titleJaYaml = Convert-ToYamlSingleQuoted -Value $titleJa
  $template = Get-Content -LiteralPath $templatePath -Raw
  $lines = $template -split "`r?`n"
  $content = ($lines | ForEach-Object {
    switch -Regex ($_) {
      "^title: ''$" { "title: '$titleJaYaml'"; continue }
      "^seoTitle: ''$" { "seoTitle: '$titleJaYaml'"; continue }
      "^slug: ''$" { "slug: '$slugJa'"; continue }
      "^pubDate: '.*'$" { "pubDate: '$pubDate'"; continue }
      "^updatedDate: '.*'$" { "updatedDate: '$pubDate'"; continue }
      default { $_ }
    }
  }) -join "`n"

  $articleJaPath = Join-Path $articleDir 'index.ja.md'
  [System.IO.File]::WriteAllText($articleJaPath, $content, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Created $articleJaPath (ja) for $articleDir"
  Write-Host "Note: slug is ""$slugJa"" (must end with .ja)"
  exit 0
}

# Normal creation mode
if (-not $title) {
  $title = Read-Host 'Title (en)'
}

if ([string]::IsNullOrWhiteSpace($title)) {
  Write-Error 'Title cannot be empty.'
}

$slug = Convert-ToSlug -Value $title

if ([string]::IsNullOrEmpty($slug)) {
  Write-Error 'Could not derive a slug from the title. Please provide an English title with alphanumeric characters.'
}

# Prompt for Japanese version if not decided via CLI and interactive
if (-not $createJa -and $args.Count -eq 0) {
  $answer = Read-Host 'Create Japanese version as well? [y/N]'
  if ($answer -match '^(y|Y|yes|YES)$') {
    $createJa = $true
  }
}

if ($createJa -and -not $titleJa) {
  if ($args.Count -eq 0) {
    $titleJaInput = Read-Host 'Title (ja) [same as en]'
    if ([string]::IsNullOrWhiteSpace($titleJaInput)) {
      $titleJa = $title
    } else {
      $titleJa = $titleJaInput
    }
  } else {
    $titleJa = $title
  }
}

$date = Get-Date -Format 'yyyy-MM-dd'
$articleDir = Join-Path $blogRoot "$date-$slug"
$articlePath = Join-Path $articleDir 'index.md'

if (Test-Path -LiteralPath $articleDir) {
  if ($createJa -and -not (Test-Path -LiteralPath (Join-Path $articleDir 'index.ja.md'))) {
    Write-Host "Directory already exists: $articleDir - creating only Japanese version." -ForegroundColor Yellow
    $slugJa = "$slug.ja"
    $titleJaYaml = Convert-ToYamlSingleQuoted -Value $titleJa
    $template = Get-Content -LiteralPath $templatePath -Raw
    $lines = $template -split "`r?`n"
    $contentJa = ($lines | ForEach-Object {
      switch -Regex ($_) {
        "^title: ''$" { "title: '$titleJaYaml'"; continue }
        "^seoTitle: ''$" { "seoTitle: '$titleJaYaml'"; continue }
        "^slug: ''$" { "slug: '$slugJa'"; continue }
        "^pubDate: '.*'$" { "pubDate: '$date'"; continue }
        "^updatedDate: '.*'$" { "updatedDate: '$date'"; continue }
        default { $_ }
      }
    }) -join "`n"
    $articleJaPath = Join-Path $articleDir 'index.ja.md'
    [System.IO.File]::WriteAllText($articleJaPath, $contentJa, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Created $articleJaPath (ja)"
    exit 0
  }
  Write-Error "Directory already exists: $articleDir"
}

$titleYaml = Convert-ToYamlSingleQuoted -Value $title
$template = Get-Content -LiteralPath $templatePath -Raw
$lines = $template -split "`r?`n"
$content = ($lines | ForEach-Object {
  switch -Regex ($_) {
    "^title: ''$" { "title: '$titleYaml'"; continue }
    "^seoTitle: ''$" { "seoTitle: '$titleYaml'"; continue }
    "^slug: ''$" { "slug: '$slug'"; continue }
    "^pubDate: '.*'$" { "pubDate: '$date'"; continue }
    "^updatedDate: '.*'$" { "updatedDate: '$date'"; continue }
    default { $_ }
  }
}) -join "`n"

$null = New-Item -ItemType Directory -Path $articleDir
[System.IO.File]::WriteAllText($articlePath, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "Created $articlePath"

if ($createJa) {
  $slugJa = "$slug.ja"
  $titleJaYaml = Convert-ToYamlSingleQuoted -Value $titleJa
  $template = Get-Content -LiteralPath $templatePath -Raw
  $lines = $template -split "`r?`n"
  $contentJa = ($lines | ForEach-Object {
    switch -Regex ($_) {
      "^title: ''$" { "title: '$titleJaYaml'"; continue }
      "^seoTitle: ''$" { "seoTitle: '$titleJaYaml'"; continue }
      "^slug: ''$" { "slug: '$slugJa'"; continue }
      "^pubDate: '.*'$" { "pubDate: '$date'"; continue }
      "^updatedDate: '.*'$" { "updatedDate: '$date'"; continue }
      default { $_ }
    }
  }) -join "`n"
  $articleJaPath = Join-Path $articleDir 'index.ja.md'
  [System.IO.File]::WriteAllText($articleJaPath, $contentJa, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Created $articleJaPath (ja, slug: $slugJa)"
}
