# deepseek-exec.ps1 — run a prompt on DeepSeek (pay-as-you-go), for grunt work.
#
# Why this exists. The operator funded a DeepSeek account on 2026-09-20 to be used
# "like the other AIs - grunt work, another top model to give quality feedback",
# and then asked that it be wired into the harness so it gets used consistently
# rather than remembered occasionally. Two things were needed for that: the
# cross-review REST juror leg (done, scripts/cross-review/run_cross_review.py
# --legs deepseek) and THIS, a way to hand it an ordinary task.
#
# It deliberately does NOT mirror claude-glm.ps1's shape. That script launches a
# whole second Claude Code process against z.ai, because GLM's Coding Plan is
# sold for exactly that. DeepSeek here is pay-as-you-go API credit: a plain REST
# call is the honest fit, it cannot wander, and every run's cost is one visible
# request. Use it for reading, drafting, summarising, classifying and one-shot
# rewrites. It is NOT an agent: it has no tools, no filesystem, no repo access.
# For work that must edit files or run commands, use a Sonnet subagent or Sol.
#
# SECRETS. The key is read from the DEEPSEEK_API_KEY user environment variable,
# else ~/.claude/.deepseek-key, else .claude/.deepseek-key (both gitignored by
# the ".claude/.*-key" rule). It is never printed, never written to a settings
# file, and never passed on a command line. Set it once, in your own shell:
#   [Environment]::SetEnvironmentVariable('DEEPSEEK_API_KEY', '<key>', 'User')
# then open a NEW terminal. The key the operator pasted into a chat on
# 2026-09-20 is in a session transcript on disk and should be rotated first.
#
# Usage (Windows PowerShell 5.1 on this machine, not pwsh):
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -Smoke
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -Models
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -PromptFile .planning/exec/prompt.md -Out .planning/exec/out.md
#   ... -PromptFile x.md -Model deepseek-v4-pro        # the frontier model
#
# STATUS: VERIFIED 2026-09-20 against the live account, both tiers, end to end.
#   -Smoke:  model=deepseek-flash reply=OK tokens_in=14 tokens_out=1
#   -PromptFile on deepseek-flash   -> 388 chars, finish=stop, tokens_out=333
#   -PromptFile on deepseek-v4-pro  -> 308 chars, finish=stop, tokens_out=208
#   UTF-8 round-trip: a right single quote, an em-dash and an e-acute all
#   survive to disk intact, no BOM, no mojibake.
#   Re-confirmed 2026-09-20 in the Pass-124 session, key read from
#   ~/.claude/.deepseek-key: -Smoke -> reply=OK tokens_in=40 tokens_out=14.
# Two bugs were found and fixed getting there; both are commented at the site
# of the fix: ConvertTo-Json exploding a Get-Content string to 105 MB, and
# Invoke-RestMethod decoding the reply as Latin-1.
#
# MODEL NAMES, read off the account with -Models the same day. Do not guess
# these from memory:
#   deepseek-flash   cheap tier. The default here. Sweeps, catalogue walks,
#                    premise checks, volume reads, drafting.
#   deepseek-v4-pro  top tier. Pass -Model deepseek-v4-pro when the job is a
#                    second independent opinion on a plan, a diff or a verdict.
# "deepseek-chat" and "deepseek-reasoner" DO NOT EXIST on this account. Both
# were written into the first draft of this harness from memory, and the API
# quietly aliased "deepseek-chat" to deepseek-flash on the smoke call -- which
# is exactly how a wrong model id survives unnoticed. Confirm with -Models.
#
# BOTH TIERS ARE REASONING MODELS (measured, 2026-09-20). The reply carries
# `content` AND `reasoning_content`, and reasoning tokens are charged against
# completion_tokens. Two consequences this script handles:
#   - Read choices[0].message.content SPECIFICALLY, never the first field.
#   - Too small a max_tokens returns content as an EMPTY STRING with
#     finish_reason "length" -- indistinguishable from a failed call unless you
#     look. At max_tokens=10 both tiers returned empty; 400 was fine for a short
#     answer. So -MaxTokens budgets reasoning + answer, not just the answer, and
#     an empty reply with finish=length is reported as a BUDGET problem, not a
#     failure. Default here is deliberately generous.
# usage.prompt_cache_hit_tokens is reported, so re-sending the same brief is
# cheaper -- worth knowing when iterating on one long input.
#
# PRIVACY. DeepSeek is a third-party provider outside the US. Send code, diffs,
# plans and public copy only. NEVER real client rows, personal data, auth
# tokens, or anything belonging to a real account. This repo's case studies name
# anonymised clients on purpose; keep it that way in anything sent here.

param(
  [switch]$Smoke,                      # one tiny call to prove the account answers
  [switch]$Models,                     # list the models this account exposes
  [string]$PromptFile = "",            # the prompt to run, read from a file (never inline)
  [string]$Out = "",                   # write the reply here as well as to stdout
  [string]$Model = "",                 # default deepseek-flash, or DEEPSEEK_MODEL
  [string]$System = "",                # optional system instruction
  [int]$MaxTokens = 8000,              # budgets REASONING + answer (see STATUS)
  [int]$TimeoutSec = 600,
  [switch]$Force,                      # Harness v2 W3: bypass the $5 balance hold
  [string]$LedgerFixture = ""          # test-only: a saved API response to use instead of the call
)

$ErrorActionPreference = "Stop"
$Base = "https://api.deepseek.com"

# Harness v2 W3: runtime state (status.json, the cost ledger) lives outside the repo.
if (-not $env:HARNESS_STATE_DIR) {
  $env:HARNESS_STATE_DIR = Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting'
}
$state = $env:HARNESS_STATE_DIR
if (-not (Test-Path $state)) { New-Item -ItemType Directory -Force -Path $state | Out-Null }

# --- key resolution, never printed ------------------------------------------
function Get-DeepSeekKey {
  if ($env:DEEPSEEK_API_KEY) { return $env:DEEPSEEK_API_KEY.Trim() }
  foreach ($f in @("$HOME/.claude/.deepseek-key", (Join-Path (Get-Location).Path ".claude/.deepseek-key"))) {
    if (Test-Path $f) {
      # .NET read, same reason as the prompt file below: no provider
      # NoteProperties riding along on the string.
      $k = [System.IO.File]::ReadAllText((Resolve-Path $f).Path).Trim()
      if ($k) { return $k }
    }
  }
  return ""
}

$key = Get-DeepSeekKey
if (-not $key) {
  Write-Error @'
No DeepSeek key. Set it for your user, in your own shell, then open a new terminal:
  [Environment]::SetEnvironmentVariable('DEEPSEEK_API_KEY', '<key>', 'User')
or put the key alone in ~/.claude/.deepseek-key (gitignored).
Never paste it into a chat or onto a command line.
'@
  exit 1
}

$headers = @{ "Authorization" = "Bearer $key"; "Content-Type" = "application/json" }

# --- -Models ------------------------------------------------------------------
if ($Models) {
  try {
    $r = Invoke-RestMethod -Uri "$Base/models" -Headers $headers -Method GET -TimeoutSec 60
  } catch {
    Write-Error "DeepSeek /models failed: $($_.Exception.Message)"
    exit 1
  }
  Write-Output "models this account exposes:"
  foreach ($m in $r.data) { Write-Output "  $($m.id)" }
  exit 0
}

if (-not $Model) {
  if ($env:DEEPSEEK_MODEL) { $Model = $env:DEEPSEEK_MODEL } else { $Model = "deepseek-flash" }
}

# Harness v2 W3: the $5 hold. -Smoke and -Models (already returned above) are exempt;
# -Force bypasses it for a critical leg.
if (-not $Smoke -and -not $Force) {
  $dsStatusPath = Join-Path $state 'status.json'
  if (Test-Path $dsStatusPath) {
    $dsStatusObj = $null
    try { $dsStatusObj = ([IO.File]::ReadAllText((Resolve-Path $dsStatusPath).Path)) | ConvertFrom-Json } catch { $dsStatusObj = $null }
    if ($dsStatusObj -and $dsStatusObj.deepseek) {
      $dsBlock = $dsStatusObj.deepseek
      $dsBalance = $null
      try { $dsBalance = [double]$dsBlock.total_balance } catch { $dsBalance = $null }
      $dsUpdatedDt = $null
      try {
        $dsUpdatedDt = [DateTime]::Parse([string]$dsBlock.updated_utc, [System.Globalization.CultureInfo]::InvariantCulture,
          [System.Globalization.DateTimeStyles]::AdjustToUniversal -bor [System.Globalization.DateTimeStyles]::AssumeUniversal)
      } catch { $dsUpdatedDt = $null }
      if ($null -ne $dsBalance -and $null -ne $dsUpdatedDt) {
        $dsAgeHours = ([DateTime]::UtcNow - $dsUpdatedDt).TotalHours
        if ($dsAgeHours -lt 24 -and $dsBalance -lt 5) {
          $dsHoldMsg = "deepseek-exec: balance `$" + $dsBalance.ToString("0.00") + " is under `$5: volume is held (AI_ROUTING). Pass -Force for a critical leg."
          Write-Output $dsHoldMsg
          exit 6
        }
      }
    }
  }
}

# --- the prompt ---------------------------------------------------------------
if ($Smoke) {
  $userText = "Reply with the single word OK and nothing else."
} elseif ($PromptFile) {
  if (-not (Test-Path $PromptFile)) { Write-Error "No such prompt file: $PromptFile"; exit 1 }
  # .NET, NOT Get-Content -Raw. Get-Content decorates its output string with
  # provider NoteProperties (PSPath, PSProvider, ...), and ConvertTo-Json walks
  # those recursively: a 101-character prompt serialised to a 105 MB body and
  # the API answered 413 Request Entity Too Large. Measured 2026-09-20. The
  # smoke call never hit it because its prompt is a literal.
  $userText = [System.IO.File]::ReadAllText((Resolve-Path $PromptFile).Path)
  if (-not $userText.Trim()) { Write-Error "Prompt file is empty: $PromptFile"; exit 1 }
} else {
  Write-Error "Give me something to do: -Smoke, -Models, or -PromptFile <path>."
  exit 1
}

$messages = @()
if ($System) { $messages += @{ role = "system"; content = $System } }
$messages += @{ role = "user"; content = $userText }

$body = @{ model = $Model; messages = $messages; stream = $false; max_tokens = $MaxTokens } | ConvertTo-Json -Depth 8

$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
if ($bodyBytes.Length -gt 2000000) {
  Write-Error "Refusing to send a $($bodyBytes.Length)-byte body from a $($userText.Length)-character prompt. Something decorated the string (see the Get-Content note above) or the prompt really is enormous. Not sending."
  exit 1
}

# Invoke-WebRequest + an EXPLICIT UTF-8 decode, not Invoke-RestMethod.
# Measured 2026-09-20: PowerShell 5.1's Invoke-RestMethod decodes a response
# body as ISO-8859-1 when the Content-Type carries no charset, which DeepSeek's
# does not. A reply containing a right single quote came back as the three
# characters "a-euro-trademark" and was then written to disk as valid UTF-8
# mojibake -- silently corrupting every smart quote, accent and em-dash. On a
# copywriting harness with a one-em-dash-per-page rule, that is not cosmetic.
if ($LedgerFixture -ne "") {
  # Harness v2 W3: test-only. Read a saved API response instead of calling out.
  if (-not (Test-Path $LedgerFixture)) { Write-Error "No such ledger fixture: $LedgerFixture"; exit 1 }
  try {
    $resp = ([IO.File]::ReadAllText((Resolve-Path $LedgerFixture).Path)) | ConvertFrom-Json
  } catch {
    Write-Error "Cannot parse -LedgerFixture $($LedgerFixture): $($_.Exception.Message)"
    exit 1
  }
} else {
  try {
    $raw = Invoke-WebRequest -Uri "$Base/chat/completions" -Headers $headers -Method POST `
      -Body $bodyBytes -TimeoutSec $TimeoutSec -UseBasicParsing
    $resp = [System.Text.Encoding]::UTF8.GetString($raw.RawContentStream.ToArray()) | ConvertFrom-Json
  } catch {
    # A 402 here means the account is out of credit -- the same wall the GLM
    # pay-as-you-go key hit on 2026-09-18. Say so plainly rather than retrying.
    Write-Error "DeepSeek call failed: $($_.Exception.Message)"
    exit 1
  }
}

$choice = $resp.choices[0]
# choices[0].message.content SPECIFICALLY -- these are reasoning models and the
# message also carries reasoning_content, which is not the answer.
$text = $choice.message.content
if (-not $text) {
  if ($choice.finish_reason -eq "length") {
    Write-Error "DeepSeek spent the whole budget on reasoning and returned an EMPTY answer (finish_reason=length, max_tokens=$MaxTokens, completion_tokens=$($resp.usage.completion_tokens)). This is a budget problem, not a failed call -- re-run with a larger -MaxTokens."
  } else {
    Write-Error "DeepSeek returned no content (finish_reason=$($choice.finish_reason))."
  }
  exit 1
}

# Harness v2 W3: a cost ledger line for every successful response (-Smoke included).
$dsNowUtc = [DateTime]::UtcNow
$dsIsWeekday = ($dsNowUtc.DayOfWeek -ne [DayOfWeek]::Saturday) -and ($dsNowUtc.DayOfWeek -ne [DayOfWeek]::Sunday)
$dsHour = $dsNowUtc.Hour
$dsInPeakHours = (($dsHour -ge 1 -and $dsHour -lt 4) -or ($dsHour -ge 6 -and $dsHour -lt 10))
$dsIsPeak = [bool]($dsIsWeekday -and $dsInPeakHours)

$dsUsage = $resp.usage
$dsPromptTokens = if ($dsUsage -and $null -ne $dsUsage.prompt_tokens) { [int]$dsUsage.prompt_tokens } else { 0 }
$dsCacheHit = if ($dsUsage -and $null -ne $dsUsage.prompt_cache_hit_tokens) { [int]$dsUsage.prompt_cache_hit_tokens } else { 0 }
$dsCacheMiss = if ($dsUsage -and $null -ne $dsUsage.prompt_cache_miss_tokens) { [int]$dsUsage.prompt_cache_miss_tokens } else { $dsPromptTokens - $dsCacheHit }
$dsCompletionTokens = if ($dsUsage -and $null -ne $dsUsage.completion_tokens) { [int]$dsUsage.completion_tokens } else { 0 }
$dsReasoningTokens = 0
if ($dsUsage -and $dsUsage.completion_tokens_details -and $null -ne $dsUsage.completion_tokens_details.reasoning_tokens) {
  $dsReasoningTokens = [int]$dsUsage.completion_tokens_details.reasoning_tokens
}

$dsRatesPath = Join-Path $PSScriptRoot 'harness/deepseek-rates.json'
$dsRates = $null
if (Test-Path $dsRatesPath) {
  try { $dsRates = ([IO.File]::ReadAllText((Resolve-Path $dsRatesPath).Path)) | ConvertFrom-Json } catch { $dsRates = $null }
}
$dsRateEntry = $null
if ($dsRates -and $dsRates.per_million) {
  $dsProp = $dsRates.per_million.PSObject.Properties[[string]$resp.model]
  if ($dsProp) {
    $dsRateEntry = $dsProp.Value
  } else {
    $dsFallback = $dsRates.per_million.PSObject.Properties['deepseek-v4-pro']
    if ($dsFallback) { $dsRateEntry = $dsFallback.Value }
  }
}
$dsEstUsd = $null
if ($dsRateEntry) {
  $dsTierKey = if ($dsIsPeak) { "peak" } else { "offpeak" }
  $dsTierProp = $dsRateEntry.PSObject.Properties[$dsTierKey]
  if ($dsTierProp) {
    $dsTier = $dsTierProp.Value
    $dsRaw = ($dsCacheHit * $dsTier.cache_hit + $dsCacheMiss * $dsTier.input + $dsCompletionTokens * $dsTier.output) / 1000000.0
    $dsEstUsd = [Math]::Round($dsRaw, 6)
  }
}
$dsLabel = if ($Smoke) { "smoke" } else { Split-Path -Leaf $PromptFile }
$dsEntry = [ordered]@{
  utc = $dsNowUtc.ToString('yyyy-MM-ddTHH:mm:ssZ')
  model = $resp.model
  peak = $dsIsPeak
  prompt_tokens = $dsPromptTokens
  cache_hit = $dsCacheHit
  cache_miss = $dsCacheMiss
  completion_tokens = $dsCompletionTokens
  reasoning_tokens = $dsReasoningTokens
  est_usd = $dsEstUsd
  label = $dsLabel
}
$dsLedgerJson = $dsEntry | ConvertTo-Json -Compress
$dsLedgerPath = Join-Path $state 'deepseek-ledger.jsonl'
$dsUtf8NoBom = New-Object System.Text.UTF8Encoding $false
[IO.File]::AppendAllText($dsLedgerPath, $dsLedgerJson + "`n", $dsUtf8NoBom)

if ($Smoke) {
  $u = $resp.usage
  Write-Output "deepseek-exec -Smoke: model=$($resp.model) reply=$($text.Trim()) tokens_in=$($u.prompt_tokens) tokens_out=$($u.completion_tokens)"
  Write-Output "Record this line and its date in the STATUS comment at the top of this file."
  exit 0
}

if ($Out) {
  $dir = Split-Path -Parent $Out
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  # UTF8Encoding($false) = no BOM. Set-Content -Encoding utf8 writes one in
  # PS 5.1, and a BOM riding into copy that gets pasted elsewhere is a bug
  # waiting to be blamed on something else.
  # BUG FIXED 2026-09-20 (Pass-124). This was an unconditional
  # `Join-Path (Get-Location).Path $Out`, which turns an ALREADY-ABSOLUTE -Out
  # ("C:/tmp/out.md") into a cwd-prefixed nonsense path and dies with "The given
  # path's format is not supported." Only a RELATIVE -Out needs the cwd.
  $outPath = if ([System.IO.Path]::IsPathRooted($Out)) { $Out }
             else { Join-Path (Get-Location).Path $Out }
  [System.IO.File]::WriteAllText(
    $outPath, $text, (New-Object System.Text.UTF8Encoding($false)))
  Write-Output "wrote $Out ($($text.Length) chars, model=$($resp.model), finish=$($choice.finish_reason), tokens_out=$($resp.usage.completion_tokens), cache_hit=$($resp.usage.prompt_cache_hit_tokens))"
}
Write-Output $text
