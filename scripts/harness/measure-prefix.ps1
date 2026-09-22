# measure-prefix.ps1 - measure a Claude Code session's fixed prefix on DeepSeek's Anthropic endpoint.
#
# Harness v2 C1 (2026-09-22): GLM was capped and the operator's Claude CLI login had expired, and he
# said "use deepseek ... instead of waiting on glm". One `claude -p` turn with a trivial prompt, run
# as a readonly executor (the E1 guard applies and the hooks skip, as in a GLM smoke), prints
#   PREFIX=<input + cache_creation + cache_read> ...
# and appends one priced line to <state>\deepseek-ledger.jsonl (the W3 format). The key is resolved
# in-process from DEEPSEEK_API_KEY or ~/.claude/.deepseek-key: never printed, never on a command line.
# What it sends: the session's instruction files and tool list plus "Reply with the single word OK."
#
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/harness/measure-prefix.ps1 -Dir <worktree> [-Label x]

param(
  [string]$Dir = (Get-Location).Path,
  [string]$Model = "deepseek-flash",
  [string]$Label = "measure-prefix"
)

function Get-DeepSeekKey {
  if ($env:DEEPSEEK_API_KEY) { return $env:DEEPSEEK_API_KEY.Trim() }
  foreach ($f in @("$HOME/.claude/.deepseek-key", (Join-Path $Dir ".claude/.deepseek-key"))) {
    if (Test-Path $f) { $k = (Get-Content -Raw $f).Trim(); if ($k) { return $k } }
  }
  return ""
}

$key = Get-DeepSeekKey
if (-not $key) { Write-Output "measure-prefix: no DeepSeek key (DEEPSEEK_API_KEY or ~/.claude/.deepseek-key)"; exit 2 }
$worktree = (Resolve-Path $Dir).Path
$state = $env:HARNESS_STATE_DIR
if (-not $state) { $state = Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting' }
New-Item -ItemType Directory -Force -Path $state | Out-Null

# Host-auth scrub (LESSONS #65): started from inside the Claude desktop app, a claude child fetches the
# operator's Claude OAuth token from the host and sends it to ANTHROPIC_BASE_URL instead of
# ANTHROPIC_AUTH_TOKEN. This script's first two runs sent such tokens to DeepSeek (401). Remove every host
# session variable before the child starts.
Get-ChildItem Env: | Where-Object { $_.Name -like 'CLAUDE_CODE_*' -or $_.Name -in @('CLAUDECODE', 'USE_LOCAL_OAUTH', 'USE_STAGING_OAUTH') } |
  ForEach-Object { Remove-Item -LiteralPath ('Env:' + $_.Name) -ErrorAction SilentlyContinue }

# Child-process env only (this process is the parent; nothing persists).
$vars = [ordered]@{
  ANTHROPIC_BASE_URL = "https://api.deepseek.com/anthropic"; ANTHROPIC_AUTH_TOKEN = $key; ANTHROPIC_MODEL = $Model
  ANTHROPIC_DEFAULT_OPUS_MODEL = $Model; ANTHROPIC_DEFAULT_SONNET_MODEL = $Model; ANTHROPIC_DEFAULT_HAIKU_MODEL = $Model
  ANTHROPIC_DEFAULT_FABLE_MODEL = $Model; CLAUDE_CODE_SUBAGENT_MODEL = $Model
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"; HARNESS_ROLE = "executor"; HARNESS_WORKTREE = $worktree
  HARNESS_EXECUTOR_SCOPE = "readonly"; HARNESS_STATE_DIR = $state
}
foreach ($k in $vars.Keys) { [Environment]::SetEnvironmentVariable($k, $vars[$k], 'Process') }
[Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', $null, 'Process')
$key = $null

Set-Location $worktree
$errFile = Join-Path $state ('measure-prefix-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '.err')
$raw = (& claude -p "Reply with the single word OK." --output-format json --max-turns 1 2> $errFile) -join "`n"
$code = $LASTEXITCODE
$j = $null
try { $j = $raw | ConvertFrom-Json } catch { $j = $null }
if ($null -eq $j -or $null -eq $j.usage -or $j.is_error -or $code -ne 0) {
  $why = if ($j -and $j.result) { [string]$j.result } else { $raw }
  $errTail = if (Test-Path $errFile) { ((Get-Content $errFile -Tail 5) -join ' | ') } else { '' }
  Write-Output ("measure-prefix: FAILED exit={0} subtype={1} result={2} stderr={3}" -f $code, $j.subtype,
    ($why -replace '\s+', ' ').Substring(0, [math]::Min(400, ($why -replace '\s+', ' ').Length)), $errTail)
  exit 3
}

$u = $j.usage
$inp = [int]$u.input_tokens; $cw = [int]$u.cache_creation_input_tokens; $cr = [int]$u.cache_read_input_tokens
$out = [int]$u.output_tokens
$prefix = $inp + $cw + $cr

# One ledger line, W3 format and rates (scripts/harness/deepseek-rates.json).
$now = [DateTime]::UtcNow
$dow = [int]$now.DayOfWeek
$isPeak = ($dow -ge 1 -and $dow -le 5) -and (($now.Hour -ge 1 -and $now.Hour -lt 4) -or ($now.Hour -ge 6 -and $now.Hour -lt 10))
$estUsd = 0.0
try {
  $rates = Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'deepseek-rates.json') | ConvertFrom-Json
  $entry = $rates.per_million.PSObject.Properties[$Model]
  if ($null -eq $entry) { $entry = $rates.per_million.PSObject.Properties['deepseek-v4-pro'] }
  $tier = if ($isPeak) { $entry.Value.peak } else { $entry.Value.offpeak }
  $estUsd = [math]::Round((($cr * $tier.cache_hit) + (($inp + $cw) * $tier.input) + ($out * $tier.output)) / 1e6, 6)
} catch { $estUsd = -1 }
$line = [ordered]@{ utc = $now.ToString('yyyy-MM-ddTHH:mm:ssZ'); model = $Model; peak = $isPeak; prompt_tokens = $prefix
  cache_hit = $cr; cache_miss = ($inp + $cw); completion_tokens = $out; reasoning_tokens = 0; est_usd = $estUsd; label = $Label }
[IO.File]::AppendAllText((Join-Path $state 'deepseek-ledger.jsonl'), ($line | ConvertTo-Json -Compress) + "`n", (New-Object System.Text.UTF8Encoding $false))

Write-Output ("PREFIX={0} input={1} cache_creation={2} cache_read={3} output={4} is_error={5} exit={6} model={7} est_usd={8}" -f $prefix, $inp, $cw, $cr, $out, $j.is_error, $code, $Model, $estUsd)
if ($j.is_error -or $code -ne 0) { exit 1 }
exit 0
