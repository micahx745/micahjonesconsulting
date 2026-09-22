# Harness research 2026-09-22: verify the Fable report's headline by smoke call, not by reading it
# (.planning/handoff/KICKOFF-HARNESS-RESEARCH.md). Claim under test (00-fable-report.md line 4): GLM (z.ai) and
# DeepSeek BOTH expose Anthropic-compatible, TOOL-USING endpoints, so either can run as a Claude Code worker.
# Test: each provider runs `claude -p` in a fresh EMPTY temp dir (no repo CLAUDE.md, no repo content) and must
#   1. Read probe.txt, which holds a random nonce it cannot guess, and
#   2. run one Bash command that echoes a second random nonce held only in its process environment.
# PASS = the reply carries both nonces. Keys are resolved in-process: never printed, never on a command line.
# DeepSeek's balance is read before and after (GET /user/balance), which also tests the report's schema claim.
# Run from the worktree root:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .planning/research/harness-2026-09-22/smoke/headline-smoke.ps1
param(
  [string]$Out  = ".planning/research/harness-2026-09-22/smoke/headline-smoke.txt",
  [string]$Only = ""   # "glm" or "deepseek" to run one leg
)
$ErrorActionPreference = 'Continue'
$repo  = (Get-Location).Path
$lines = New-Object System.Collections.Generic.List[string]
function Say([string]$s) { $lines.Add($s); Write-Host $s }

function Get-DeepSeekKey {
  if ($env:DEEPSEEK_API_KEY) { return $env:DEEPSEEK_API_KEY.Trim() }
  foreach ($f in @("$HOME/.claude/.deepseek-key", (Join-Path $repo ".claude/.deepseek-key"))) {
    if (Test-Path $f) { $k = (Get-Content -Raw $f).Trim(); if ($k) { return $k } }
  }
  return $null
}
function Get-ZaiKey {
  if ($env:ZAI_CODING_KEY) { return $env:ZAI_CODING_KEY.Trim() }
  if (Test-Path "$HOME/.claude/.zai-key") { return (Get-Content -Raw "$HOME/.claude/.zai-key").Trim() }
  return $null
}
function Get-DeepSeekBalance([string]$key) {
  try {
    $r = Invoke-RestMethod -Uri "https://api.deepseek.com/user/balance" -Headers @{ Authorization = "Bearer $key" } -Method Get -TimeoutSec 30
    $b = $r.balance_infos | Select-Object -First 1
    return "is_available=$($r.is_available) currency=$($b.currency) total=$($b.total_balance) granted=$($b.granted_balance) topped_up=$($b.topped_up_balance)"
  } catch { return "balance call FAILED: $($_.Exception.Message)" }
}

function Invoke-Worker([string]$name, [string]$baseUrl, [string]$token, [string]$model, [string]$small) {
  $probe = Join-Path $env:TEMP ("harness-smoke-" + $name + "-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
  New-Item -ItemType Directory -Path $probe | Out-Null
  $n1 = "FILE-" + [guid]::NewGuid().ToString('N').Substring(0, 10)
  $n2 = "ENV-"  + [guid]::NewGuid().ToString('N').Substring(0, 10)
  Set-Content -Path (Join-Path $probe 'probe.txt') -Value $n1 -Encoding ascii
  $prompt = 'Use the Read tool to open probe.txt in the current directory. Then use the Bash tool to run exactly: echo $SMOKE_NONCE2 . Reply with one line: the text of probe.txt, one space, then the Bash output. Nothing else.'
  $vars = [ordered]@{
    ANTHROPIC_BASE_URL = $baseUrl; ANTHROPIC_AUTH_TOKEN = $token; ANTHROPIC_MODEL = $model
    ANTHROPIC_DEFAULT_OPUS_MODEL = $model; ANTHROPIC_DEFAULT_SONNET_MODEL = $model
    ANTHROPIC_DEFAULT_HAIKU_MODEL = $small; ANTHROPIC_DEFAULT_FABLE_MODEL = $model
    CLAUDE_CODE_SUBAGENT_MODEL = $model; API_TIMEOUT_MS = "600000"
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"; SMOKE_NONCE2 = $n2
  }
  $saved = @{}
  foreach ($k in $vars.Keys) {
    $saved[$k] = [Environment]::GetEnvironmentVariable($k, 'Process')
    [Environment]::SetEnvironmentVariable($k, $vars[$k], 'Process')
  }
  $savedApiKey = [Environment]::GetEnvironmentVariable('ANTHROPIC_API_KEY', 'Process')
  [Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', $null, 'Process')
  Push-Location $probe
  $t0 = Get-Date
  try {
    $raw = (& claude -p $prompt --output-format json --max-turns 6 --dangerously-skip-permissions 2>$null) -join "`n"
  } catch { $raw = "" }
  finally {
    Pop-Location
    foreach ($k in $vars.Keys) { [Environment]::SetEnvironmentVariable($k, $saved[$k], 'Process') }
    [Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', $savedApiKey, 'Process')
  }
  $secs = [int]((Get-Date) - $t0).TotalSeconds
  $jsonText = ($raw -split "`n" | Where-Object { $_.TrimStart().StartsWith('{') } | Select-Object -Last 1)
  if (-not $jsonText) { Say "$name : FAIL, no JSON result after $secs s (stdout length $($raw.Length))"; return }
  try { $j = $jsonText | ConvertFrom-Json } catch { Say "$name : FAIL, unparseable JSON after $secs s"; return }
  $res = [string]$j.result
  $hasFile = $res.Contains($n1); $hasEnv = $res.Contains($n2)
  $verdict = if ($hasFile -and $hasEnv) { "PASS (Read + Bash both ran)" } elseif ($hasFile) { "PARTIAL (Read ran; Bash nonce missing)" } else { "FAIL (file nonce missing)" }
  $u = $j.usage
  $models = if ($j.modelUsage) { ($j.modelUsage.PSObject.Properties.Name) -join ',' } else { "n/a" }
  Say ("{0}: {1} | subtype={2} turns={3} is_error={4} secs={5}" -f $name, $verdict, $j.subtype, $j.num_turns, $j.is_error, $secs)
  Say ("{0}: usage in={1} cache_read={2} cache_write={3} out={4} | modelUsage keys={5}" -f $name, $u.input_tokens, $u.cache_read_input_tokens, $u.cache_creation_input_tokens, $u.output_tokens, $models)
  $flat = ($res -replace "`r?`n", ' ')
  Say ("{0}: reply = {1}" -f $name, $flat.Substring(0, [Math]::Min(160, $flat.Length)))
}

Say ("headline-smoke {0} | claude {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz'), ((& claude --version 2>$null) -join ' '))
$ds = Get-DeepSeekKey
if ($ds) { Say ("deepseek balance BEFORE: " + (Get-DeepSeekBalance $ds)) } else { Say "deepseek: NO KEY found" }
if ($Only -ne "deepseek") {
  $z = Get-ZaiKey
  if ($z) { Invoke-Worker "glm" "https://api.z.ai/api/anthropic" $z "glm-5.3" "GLM-5.3-Flash" } else { Say "glm: NO KEY found" }
}
if ($Only -ne "glm" -and $ds) {
  Invoke-Worker "deepseek" "https://api.deepseek.com/anthropic" $ds "deepseek-flash" "deepseek-flash"
  Start-Sleep -Seconds 5
  Say ("deepseek balance AFTER: " + (Get-DeepSeekBalance $ds))
}
$path = Join-Path $repo $Out
[IO.File]::WriteAllLines($path, $lines)
Write-Host "written: $Out"
