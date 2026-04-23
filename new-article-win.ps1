#!/usr/bin/env pwsh

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
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

$title = Read-Host 'Title'

if ([string]::IsNullOrWhiteSpace($title)) {
  Write-Error 'Title cannot be empty.'
}

$slug = Convert-ToSlug -Value $title

if ([string]::IsNullOrEmpty($slug)) {
  Write-Error 'Could not derive a slug from the title.'
}

$date = Get-Date -Format 'yyyy-MM-dd'
$articleDir = Join-Path $blogRoot "$date-$slug"
$articlePath = Join-Path $articleDir 'index.md'

if (Test-Path -LiteralPath $articleDir) {
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