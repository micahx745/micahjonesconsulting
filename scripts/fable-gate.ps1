# scripts/fable-gate.ps1 -- C4, Harness v2 run E (.claude/briefs/harness-v2-e-visualqa-fablegate.md).
# Windows PowerShell 5.1.
#
# Makes a Fable gate a single, counted, lean call: digest in, images before text, several
# judgments per call, at most three per arc (AI_ROUTING rule 11) unless -OperatorOk overrides.
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/fable-gate.ps1 `
#     -Digest <digest.json> -Question <question.md> -Out <verdict.md> `
#     [-Images a.png,b.png] [-Arc <id>] [-DryRun] [-OperatorOk "his words"]
#
# This run (harness-v2-e) is DryRun-only by amendment: never call this script live here (the
# operator said no Fable calls in this arc, and the claude CLI login was expired 2026-09-22).
# The live branch (step 6) is written to spec but not exercised by any test in this run.

param(
  [string]$Digest = "",
  [string]$Question = "",
  [string]$Out = "",
  [string]$Images = "",
  [string]$Arc = "",
  [switch]$DryRun,
  [string]$OperatorOk = ""
)

# Manual validation instead of [Parameter(Mandatory=$true)]: a missing mandatory parameter
# makes PowerShell prompt interactively, which would hang a non-interactive caller instead of
# failing fast.
if ($Digest -eq "" -or $Question -eq "" -or $Out -eq "") {
  Write-Output 'usage: fable-gate.ps1 -Digest <file> -Question <file> -Out <file> [-Images a.png,b.png] [-Arc id] [-DryRun] [-OperatorOk "text"]'
  exit 1
}

if ($Arc -eq "") {
  $branchName = ""
  try { $branchName = (& git rev-parse --abbrev-ref HEAD 2>$null).Trim() } catch { $branchName = "" }
  if ($branchName -eq "") { $branchName = "unknown-branch" }
  $Arc = $branchName + "-" + [DateTime]::UtcNow.ToString('yyyyMMdd')
}

$utf8NoBom = New-Object System.Text.UTF8Encoding $false

# --- state dir (Harness v2 rule: runtime state never lives inside the repo) -----------------
$state = $env:HARNESS_STATE_DIR
if (-not $state) { $state = Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting' }
New-Item -ItemType Directory -Force -Path $state | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $state 'runs') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $state 'receipts') | Out-Null

# --- step 1: digest must pass digest_check.py ------------------------------------------------
$dcOut = & python scripts/harness/digest_check.py $Digest
$dcExit = $LASTEXITCODE
if ($dcExit -ne 0) {
  $dcLine = ($dcOut | Select-Object -Last 1)
  Write-Output ("fable-gate: the digest fails digest_check (" + $dcLine + ")")
  exit 7
}

# --- step 2: images (at most 4, each existing, PNG/JPEG, long edge <= 2576px) ----------------
$imageList = @()
if ($Images -ne "") {
  $imageList = @($Images -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })
}

$imageSizeCode = 'import sys
from PIL import Image
im = Image.open(sys.argv[1])
print(max(im.size))'

function Test-GateImage([string]$path) {
  if (-not (Test-Path -LiteralPath $path)) { return $false }
  $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
  if ($ext -ne '.png' -and $ext -ne '.jpg' -and $ext -ne '.jpeg') { return $false }
  $sizeOut = & python -c $imageSizeCode $path 2>$null
  if ($LASTEXITCODE -ne 0) { return $false }
  $longEdge = 0
  $lastLine = ($sizeOut | Select-Object -Last 1)
  if (-not [int]::TryParse([string]$lastLine, [ref]$longEdge)) { return $false }
  return ($longEdge -le 2576)
}

$imagesOk = ($imageList.Count -le 4)
if ($imagesOk) {
  foreach ($imgPath in $imageList) {
    if (-not (Test-GateImage $imgPath)) { $imagesOk = $false; break }
  }
}
if (-not $imagesOk) {
  Write-Output 'fable-gate: downscale first: python scripts/harness/visual_qa.py --sheet <dir> --out <dir>'
  exit 8
}

# --- step 3: the counter (this check runs in dry runs too) ----------------------------------
function ConvertTo-HashtableDeep($obj) {
  if ($null -eq $obj) { return $null }
  if ($obj -is [string]) { return $obj }
  if ($obj -is [System.Collections.IDictionary]) {
    $h = @{}
    foreach ($k in $obj.Keys) { $h[$k] = ConvertTo-HashtableDeep $obj[$k] }
    return $h
  }
  if ($obj -is [System.Collections.IEnumerable]) {
    $list = @()
    foreach ($item in $obj) { $list += ,(ConvertTo-HashtableDeep $item) }
    return , $list
  }
  if ($obj.PSObject -and $obj.PSObject.Properties -and ($obj.GetType().Name -eq 'PSCustomObject')) {
    $h = @{}
    foreach ($p in $obj.PSObject.Properties) { $h[$p.Name] = ConvertTo-HashtableDeep $p.Value }
    return $h
  }
  return $obj
}

$countersPath = Join-Path $state 'fable-gates.json'
$counters = @{}
if (Test-Path -LiteralPath $countersPath) {
  try {
    $raw = Get-Content -Raw -Encoding UTF8 -LiteralPath $countersPath
    if ($raw -and $raw.Trim() -ne "") {
      $parsed = $raw | ConvertFrom-Json
      $converted = ConvertTo-HashtableDeep $parsed
      if ($converted -is [System.Collections.IDictionary]) { $counters = $converted }
    }
  } catch {
    $counters = @{}
  }
}

$count = 0
if ($counters.ContainsKey($Arc)) {
  $arcEntry = $counters[$Arc]
  if ($arcEntry -is [System.Collections.IDictionary] -and $arcEntry.ContainsKey('count')) {
    $count = [int]$arcEntry['count']
  }
}

if ($count -ge 3 -and $OperatorOk -eq "") {
  Write-Output ("fable-gate: arc " + $Arc + " has used 3 of 3 Fable gates (AI_ROUTING rule 11). Pass -OperatorOk with his words to run another.")
  exit 6
}

# --- step 4: build the one stream-json request line ------------------------------------------
# No double quotes in this snippet: an argument containing embedded double quotes can be
# mangled when PowerShell 5.1 passes it to a native executable (confirmed by hand, run E
# pre-flight follow-up). Single-quote Python literals only; '' is PowerShell's escape for a
# literal single quote inside a single-quoted string.
$b64Code = 'import sys, base64
with open(sys.argv[1], ''rb'') as f:
    sys.stdout.write(base64.b64encode(f.read()).decode(''ascii''))'

$contentBlocks = @()
$previewBlocks = @()
foreach ($imgPath in $imageList) {
  $ext = [System.IO.Path]::GetExtension($imgPath).ToLowerInvariant()
  $mediaType = 'image/jpeg'
  if ($ext -eq '.png') { $mediaType = 'image/png' }
  $b64 = & python -c $b64Code $imgPath
  $b64 = [string]$b64
  $block = [ordered]@{
    type   = 'image'
    source = [ordered]@{ type = 'base64'; media_type = $mediaType; data = $b64 }
  }
  $contentBlocks += , $block
  $previewBlock = [ordered]@{
    type   = 'image'
    source = [ordered]@{ type = 'base64'; media_type = $mediaType; data = ('<base64, ' + $b64.Length + ' bytes>') }
  }
  $previewBlocks += , $previewBlock
}

$questionText = (Get-Content -Raw -Encoding UTF8 -LiteralPath $Question).TrimEnd()
$digestText = (Get-Content -Raw -Encoding UTF8 -LiteralPath $Digest).TrimEnd()
$finalInstruction = 'Answer every question above. For each, start a line with VERDICT: PASS, FIX or FAIL, then at most 12 lines of reasons, each citing a digest item number or an image number.'
$fullText = $questionText + "`n`n" + 'DIGEST (json):' + "`n" + $digestText + "`n`n" + $finalInstruction
$textBlock = [ordered]@{ type = 'text'; text = $fullText }

$contentBlocks += , $textBlock
$previewBlocks += , $textBlock

$requestObj = [ordered]@{
  type    = 'user'
  message = [ordered]@{ role = 'user'; content = $contentBlocks }
}
$requestLine = $requestObj | ConvertTo-Json -Depth 20 -Compress

$stamp = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss')
$requestPath = Join-Path (Join-Path $state 'runs') ('fable-' + $stamp + '.request.jsonl')
[IO.File]::WriteAllText($requestPath, $requestLine + "`n", $utf8NoBom)

# --- which flags this claude.exe actually supports (checked once, used by dry-run's message
# and by the live call alike; C4 passes only flags that exist) ------------------------------
function Get-ClaudeHelpText {
  try {
    $lines = & claude --help 2>&1
    return ($lines -join "`n")
  } catch {
    return ""
  }
}

function Build-ClaudeArgs([string]$helpText) {
  $a = @('-p')
  if ($helpText -match '--model') { $a += '--model', 'claude-fable-5-1' }
  if ($helpText -match '--input-format') { $a += '--input-format', 'stream-json' }
  if ($helpText -match '--output-format') { $a += '--output-format', 'json' }
  # Always: hidden from --help on 2.1.266 but accepted (an unknown option fails at parse,
  # probed 2026-09-22 with the API pointed at a closed port). One turn keeps the gate lean.
  $a += '--max-turns', '1'
  if ($helpText -match '--strict-mcp-config') { $a += '--strict-mcp-config' }
  if ($helpText -match '--setting-sources') { $a += '--setting-sources', 'project' }
  return $a
}

$claudeHelpText = Get-ClaudeHelpText
$claudeArgs = Build-ClaudeArgs $claudeHelpText

# --- step 5: dry run --------------------------------------------------------------------------
if ($DryRun) {
  $blockTypes = ($contentBlocks | ForEach-Object { $_.type }) -join ','
  $previewObj = [ordered]@{
    type    = 'user'
    message = [ordered]@{ role = 'user'; content = $previewBlocks }
  }
  $previewPath = $Out + '.request-preview.json'
  [IO.File]::WriteAllText($previewPath, ($previewObj | ConvertTo-Json -Depth 20), $utf8NoBom)

  $claudeArgsStr = $claudeArgs -join ' '
  Write-Output ("DRY RUN: blocks = " + $blockTypes + "; arc " + $Arc + " count " + $count + "/3; would run: claude " + $claudeArgsStr + " (in an empty temp dir)")
  if ($OperatorOk -ne "") {
    Write-Output 'operator OK noted (dry run: not recorded)'
  }
  exit 0
}

# --- step 6: live ------------------------------------------------------------------------------
$envVarsToRemove = @(
  'ANTHROPIC_BASE_URL', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_API_KEY', 'ANTHROPIC_MODEL',
  'ANTHROPIC_DEFAULT_OPUS_MODEL', 'ANTHROPIC_DEFAULT_SONNET_MODEL', 'ANTHROPIC_DEFAULT_HAIKU_MODEL',
  'ANTHROPIC_DEFAULT_FABLE_MODEL', 'CLAUDE_CODE_SUBAGENT_MODEL', 'CLAUDE_CODE_MAX_CONTEXT_TOKENS',
  'HARNESS_ROLE', 'HARNESS_WORKTREE', 'HARNESS_EXECUTOR_SCOPE'
)
$savedEnv = @{}
foreach ($name in $envVarsToRemove) {
  $envPath = 'Env:' + $name
  $item = Get-Item -Path $envPath -ErrorAction SilentlyContinue
  if ($item) { $savedEnv[$name] = $item.Value }
  Remove-Item -Path $envPath -ErrorAction SilentlyContinue
}

$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) ('fable-gate-' + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

try {
  $exeCmd = Get-Command claude -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $exeCmd) {
    Write-Output 'fable-gate: the claude CLI login has expired; he runs claude once and logs in.'
    exit 9
  }
  $exe = $exeCmd.Source
  $liveOutFile = Join-Path $tempDir 'stdout.json'
  $liveErrFile = Join-Path $tempDir 'stderr.txt'

  $p = Start-Process -FilePath $exe -ArgumentList $claudeArgs -WorkingDirectory $tempDir `
    -RedirectStandardInput $requestPath -RedirectStandardOutput $liveOutFile -RedirectStandardError $liveErrFile `
    -NoNewWindow -PassThru
  $null = $p.Handle
  $timedOut = $false
  if (-not $p.WaitForExit(15 * 60000)) {
    taskkill /T /F /PID $p.Id | Out-Null
    $timedOut = $true
  } else {
    $p.WaitForExit()
  }
  $exitCode = 124
  if (-not $timedOut) { $exitCode = $p.ExitCode }

  $stdoutText = ''
  if (Test-Path -LiteralPath $liveOutFile) { $stdoutText = [IO.File]::ReadAllText($liveOutFile) }
  $stderrText = ''
  if (Test-Path -LiteralPath $liveErrFile) { $stderrText = [IO.File]::ReadAllText($liveErrFile) }
  $combined = $stdoutText + "`n" + $stderrText

  if ($combined -match '(?i)login.{0,60}(expired|missing)' -or $combined -match '(?i)(expired|missing).{0,60}login') {
    Write-Output 'fable-gate: the claude CLI login has expired; he runs claude once and logs in.'
    exit 9
  }

  $parsed = $null
  try { $parsed = $stdoutText | ConvertFrom-Json } catch { $parsed = $null }
  $resultText = $stdoutText
  if ($parsed -and ($null -ne $parsed.result)) { $resultText = [string]$parsed.result }

  [IO.File]::WriteAllText($Out, $resultText, $utf8NoBom)

  if (-not $counters.ContainsKey($Arc)) { $counters[$Arc] = @{ count = 0; calls = @() } }
  $counters[$Arc]['count'] = [int]$counters[$Arc]['count'] + 1
  $newCall = [ordered]@{
    utc         = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
    out         = $Out
    operator_ok = $OperatorOk
  }
  $counters[$Arc]['calls'] = @($counters[$Arc]['calls']) + , $newCall
  [IO.File]::WriteAllText($countersPath, ($counters | ConvertTo-Json -Depth 20), $utf8NoBom)

  $verdictLines = @($resultText -split "`n" | Where-Object { $_ -match '^VERDICT:' })
  $sessionId = $null
  $usage = $null
  if ($parsed) {
    if ($parsed.PSObject.Properties['session_id']) { $sessionId = $parsed.session_id }
    if ($parsed.PSObject.Properties['usage']) { $usage = $parsed.usage }
  }
  $receipt = [ordered]@{
    arc           = $Arc
    count_after   = $counters[$Arc]['count']
    session_id    = $sessionId
    usage         = $usage
    verdict_lines = $verdictLines
    exit_code     = $exitCode
  }
  $stamp2 = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss')
  $receiptPath = Join-Path (Join-Path $state 'receipts') ('fable-' + $stamp2 + '.json')
  [IO.File]::WriteAllText($receiptPath, ($receipt | ConvertTo-Json -Depth 20), $utf8NoBom)

  Write-Output $resultText
  exit 0
} finally {
  foreach ($name in $envVarsToRemove) {
    if ($savedEnv.ContainsKey($name)) {
      Set-Item -Path ('Env:' + $name) -Value $savedEnv[$name]
    }
  }
}
