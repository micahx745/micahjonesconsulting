# gemini-exec.ps1 -- run a prompt on Gemini, for routine one-shot work.
#
# Why this exists. Gemini is useful for reading, drafting, summarising and
# second opinions, but until this script it was reachable here only as a
# cross-review juror. This wrapper makes an ordinary task one explicit REST
# call. It is NOT an agent: it has no tools, no filesystem and no repo access.
#
# SECRETS. The key is read from the GEMINI_API_KEY environment variable, else
# ~/.claude/.gemini-key, else .claude/.gemini-key. It is never printed, never
# put in a URL, never written to settings and never passed on a command line.
# The REST request sends it only in the x-goog-api-key header. Set it once in
# your own shell, then open a NEW terminal:
#   [Environment]::SetEnvironmentVariable('GEMINI_API_KEY', '<key>', 'User')
#
# Usage (Windows PowerShell 5.1 on this machine, not pwsh):
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -Smoke
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -Models
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -PromptFile .planning/exec/prompt.md -Out .planning/exec/out.md
#   ... -PromptFile x.md -Image screenshot.jpg,detail.png
#   ... -PromptFile x.md -Model gemini-2.5-flash
#
# STATUS: VERIFIED 2026-09-21 by the main session (Pass-124 wrap), key from ~/.claude/.gemini-key.
#   -Models: 40+ generateContent models listed (2.5, 3.x, 3.5-3.8 flash, 3.1 pro preview, pro-latest).
#   -Smoke gemini-2.5-flash       -> reply=OK finish=STOP tokens_in=11 tokens_out=1 thoughts=21
#   -Smoke gemini-pro-latest       -> 429 Too Many Requests (no quota on this key's plan)
#   -Smoke gemini-3.1-pro-preview  -> 429 Too Many Requests
#   -Smoke gemini-2.5-pro          -> 404 Not Found
#   -Smoke gemini-3.7-flash / gemini-3.8-flash / gemini-flash-latest -> 503 Server Unavailable (twice)
#   So TODAY only gemini-2.5-flash answers. A top Gemini tier needs a paid plan on the key: operator's call.
#   Written by Sol 2026-09-21 (parser 0 errors, pure ASCII); smoked by the main session.
#
# MODEL NAMES come from -Models, never from memory. The default is
# gemini-2.5-flash, the id already used by the cross-review leg, but the default
# is to be confirmed with -Models before relying on it.
#
# BUDGET. Gemini 2.5 models can spend output tokens on thinking. Too small a
# maxOutputTokens budget can therefore return no answer with finishReason
# MAX_TOKENS. This script identifies that as a budget problem and tells the
# operator to re-run with a larger -MaxTokens.
#
# PRIVACY. Gemini is a third-party provider. Send code, diffs, plans and public
# copy only. NEVER send real client rows, personal data, auth tokens or anything
# belonging to a real account.

param(
  [switch]$Smoke,                      # one tiny call to prove the account answers
  [switch]$Models,                     # list models that support generateContent
  [string]$PromptFile = "",            # the prompt to run, read from a file (never inline)
  [string]$Out = "",                   # write the reply here as well as to stdout
  [string]$Model = "gemini-2.5-flash", # confirm the default with -Models
  [string]$System = "",                # optional system instruction
  [int]$MaxTokens = 8000,              # budgets thinking + answer
  [int]$TimeoutSec = 600,
  [string]$Image = ""                  # comma-separated jpg, jpeg, png or webp paths
)

$ErrorActionPreference = "Stop"
$Base = "https://generativelanguage.googleapis.com/v1beta"

$imageParts = @()
if ($Image) {
  foreach ($imagePathValue in $Image.Split(',')) {
    $imagePath = $imagePathValue.Trim()
    if (-not $imagePath -or -not (Test-Path -LiteralPath $imagePath -PathType Leaf)) {
      Write-Error "No such image file: $imagePath"
      exit 1
    }

    $extension = [System.IO.Path]::GetExtension($imagePath).ToLowerInvariant()
    $mimeType = switch ($extension) {
      ".jpg"  { "image/jpeg" }
      ".jpeg" { "image/jpeg" }
      ".png"  { "image/png" }
      ".webp" { "image/webp" }
      default {
        Write-Error "Unsupported image type '$extension': $imagePath (use jpg, jpeg, png or webp)."
        exit 1
      }
    }
    $resolvedImagePath = (Resolve-Path -LiteralPath $imagePath).Path
    $imageData = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes($resolvedImagePath))
    $imageParts += @{ inline_data = @{ mime_type = $mimeType; data = $imageData } }
  }
}

# --- key resolution, never printed ------------------------------------------
function Get-GeminiKey {
  if ($env:GEMINI_API_KEY) { return $env:GEMINI_API_KEY.Trim() }
  foreach ($f in @("$HOME/.claude/.gemini-key", (Join-Path (Get-Location).Path ".claude/.gemini-key"))) {
    if (Test-Path $f) {
      # .NET read, same reason as the prompt file below: no provider
      # NoteProperties riding along on the string.
      $k = [System.IO.File]::ReadAllText((Resolve-Path $f).Path).Trim()
      if ($k) { return $k }
    }
  }
  return ""
}

$key = Get-GeminiKey
if (-not $key) {
  Write-Error @'
No Gemini key. Set it for your user, in your own shell, then open a new terminal:
  [Environment]::SetEnvironmentVariable('GEMINI_API_KEY', '<key>', 'User')
or put the key alone in ~/.claude/.gemini-key (gitignored).
Never paste it into a chat or onto a command line.
'@
  exit 1
}

$headers = @{ "x-goog-api-key" = $key; "Content-Type" = "application/json" }

# --- -Models ----------------------------------------------------------------
if ($Models) {
  try {
    $raw = Invoke-WebRequest -Uri "$Base/models" -Headers $headers -Method GET `
      -TimeoutSec 60 -UseBasicParsing
    $resp = [System.Text.Encoding]::UTF8.GetString($raw.RawContentStream.ToArray()) | ConvertFrom-Json
  } catch {
    Write-Error "Gemini /models failed: $($_.Exception.Message)"
    exit 1
  }
  Write-Output "models that support generateContent:"
  foreach ($m in $resp.models) {
    if (@($m.supportedGenerationMethods) -contains "generateContent") {
      Write-Output "  $($m.name)"
    }
  }
  exit 0
}

$modelPath = $Model.Trim()
if ($modelPath.StartsWith("models/")) { $modelPath = $modelPath.Substring(7) }
if (-not $modelPath) { Write-Error "Model cannot be empty."; exit 1 }

# --- the prompt -------------------------------------------------------------
if ($Smoke) {
  $userText = "Reply with the single word OK and nothing else."
} elseif ($PromptFile) {
  if (-not (Test-Path $PromptFile)) { Write-Error "No such prompt file: $PromptFile"; exit 1 }
  # .NET, NOT Get-Content -Raw. Get-Content decorates its output string with
  # provider NoteProperties (PSPath, PSProvider, ...), and ConvertTo-Json walks
  # those recursively. That made a tiny prompt into a 105 MB DeepSeek request;
  # the same PowerShell trap applies here.
  $userText = [System.IO.File]::ReadAllText((Resolve-Path $PromptFile).Path)
  if (-not $userText.Trim()) { Write-Error "Prompt file is empty: $PromptFile"; exit 1 }
} else {
  Write-Error "Give me something to do: -Smoke, -Models, or -PromptFile <path>."
  exit 1
}

if ($Image) {
  $parts = @( @{ text = $userText } )
  $parts += $imageParts
  $bodyObject = @{
    contents = @(
      @{ role = "user"; parts = $parts }
    )
    generationConfig = @{ maxOutputTokens = $MaxTokens }
  }
} else {
  $bodyObject = @{
    contents = @(
      @{ role = "user"; parts = @( @{ text = $userText } ) }
    )
    generationConfig = @{ maxOutputTokens = $MaxTokens }
  }
}
if ($System) {
  $bodyObject["systemInstruction"] = @{ parts = @( @{ text = $System } ) }
}
$body = $bodyObject | ConvertTo-Json -Depth 8

$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
# Inline image data can legitimately take the request beyond the prompt-only
# safety ceiling. The .NET prompt read above still prevents decorated strings.
if (-not $Image -and $bodyBytes.Length -gt 2000000) {
  Write-Error "Refusing to send a $($bodyBytes.Length)-byte body from a $($userText.Length)-character prompt. Something decorated the string (see the Get-Content note above) or the prompt really is enormous. Not sending."
  exit 1
}

# Invoke-WebRequest + an EXPLICIT UTF-8 decode, not Invoke-RestMethod.
# PowerShell 5.1 can decode a response as Latin-1 when Content-Type has no
# charset, silently corrupting smart punctuation and accents. The script itself
# stays ASCII, but model output must make the UTF-8 round trip intact.
$endpoint = "$Base/models/$($modelPath):generateContent"
try {
  $raw = Invoke-WebRequest -Uri $endpoint -Headers $headers -Method POST `
    -Body $bodyBytes -TimeoutSec $TimeoutSec -UseBasicParsing
  $resp = [System.Text.Encoding]::UTF8.GetString($raw.RawContentStream.ToArray()) | ConvertFrom-Json
} catch {
  Write-Error "Gemini call failed: $($_.Exception.Message)"
  exit 1
}

$candidate = @($resp.candidates)[0]
$finishReason = $candidate.finishReason
$textPieces = @(
  foreach ($part in @($candidate.content.parts)) {
    if ($null -ne $part.text) { [string]$part.text }
  }
)
$text = $textPieces -join ""

$u = $resp.usageMetadata
$tokensIn = if ($null -ne $u.promptTokenCount) { $u.promptTokenCount } else { "n/a" }
$tokensOut = if ($null -ne $u.candidatesTokenCount) { $u.candidatesTokenCount } else { "n/a" }
$thoughtTokens = if ($null -ne $u.thoughtsTokenCount) { $u.thoughtsTokenCount } else { "n/a" }
$tokensTotal = if ($null -ne $u.totalTokenCount) { $u.totalTokenCount } else { "n/a" }
$cacheHit = if ($null -ne $u.cachedContentTokenCount) { $u.cachedContentTokenCount } else { "n/a" }

if (-not $text) {
  if ($finishReason -eq "MAX_TOKENS") {
    Write-Error "Gemini spent the whole budget on thinking and returned an EMPTY answer (finishReason=MAX_TOKENS, maxOutputTokens=$MaxTokens, candidatesTokenCount=$tokensOut, thoughtsTokenCount=$thoughtTokens, totalTokenCount=$tokensTotal). This is a budget problem, not a failed call -- re-run with a larger -MaxTokens."
  } else {
    Write-Error "Gemini returned no content (finishReason=$finishReason)."
  }
  exit 1
}

$reportedModel = if ($resp.modelVersion) { $resp.modelVersion } else { $modelPath }
if ($Smoke) {
  Write-Output "gemini-exec -Smoke: model=$reportedModel reply=$($text.Trim()) finish=$finishReason tokens_in=$tokensIn tokens_out=$tokensOut thoughts=$thoughtTokens total=$tokensTotal cache_hit=$cacheHit"
  Write-Output "Record this line and its date in the STATUS comment at the top of this file."
  exit 0
}

if ($Out) {
  $dir = Split-Path -Parent $Out
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  # UTF8Encoding($false) = no BOM. Set-Content -Encoding utf8 writes one in
  # PowerShell 5.1, and a BOM can break copy that is pasted elsewhere.
  # Only a RELATIVE -Out needs the cwd; joining an absolute path to the cwd
  # creates an invalid path.
  $outPath = if ([System.IO.Path]::IsPathRooted($Out)) { $Out }
             else { Join-Path (Get-Location).Path $Out }
  [System.IO.File]::WriteAllText(
    $outPath, $text, (New-Object System.Text.UTF8Encoding($false)))
  Write-Output "wrote $Out ($($text.Length) chars, model=$reportedModel, finish=$finishReason, tokens_in=$tokensIn, tokens_out=$tokensOut, thoughts=$thoughtTokens, total=$tokensTotal, cache_hit=$cacheHit)"
}
Write-Output $text
