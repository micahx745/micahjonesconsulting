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
#   ... -PromptFile x.md -Model deepseek-reasoner     # the thinking model
#
# STATUS: UNSMOKED as of 2026-09-20 — no key was set when this was written, so
# not one line below has been run against the real API. Run -Smoke first and
# record the result here, the way claude-glm.ps1 carries its own dated
# verification line. Until that line exists, treat this script as untested code
# and do not report its output as evidence for anything.

param(
  [switch]$Smoke,                      # one tiny call to prove the account answers
  [switch]$Models,                     # list the models this account exposes
  [string]$PromptFile = "",            # the prompt to run, read from a file (never inline)
  [string]$Out = "",                   # write the reply here as well as to stdout
  [string]$Model = "",                 # default: deepseek-chat, or DEEPSEEK_MODEL
  [string]$System = "",                # optional system instruction
  [int]$TimeoutSec = 600
)

$ErrorActionPreference = "Stop"
$Base = "https://api.deepseek.com"

# --- key resolution, never printed ------------------------------------------
function Get-DeepSeekKey {
  if ($env:DEEPSEEK_API_KEY) { return $env:DEEPSEEK_API_KEY.Trim() }
  foreach ($f in @("$HOME/.claude/.deepseek-key", (Join-Path (Get-Location).Path ".claude/.deepseek-key"))) {
    if (Test-Path $f) {
      $k = (Get-Content -Raw $f).Trim()
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
  if ($env:DEEPSEEK_MODEL) { $Model = $env:DEEPSEEK_MODEL } else { $Model = "deepseek-chat" }
}

# --- the prompt ---------------------------------------------------------------
if ($Smoke) {
  $userText = "Reply with the single word OK and nothing else."
} elseif ($PromptFile) {
  if (-not (Test-Path $PromptFile)) { Write-Error "No such prompt file: $PromptFile"; exit 1 }
  $userText = Get-Content -Raw $PromptFile
  if (-not $userText.Trim()) { Write-Error "Prompt file is empty: $PromptFile"; exit 1 }
} else {
  Write-Error "Give me something to do: -Smoke, -Models, or -PromptFile <path>."
  exit 1
}

$messages = @()
if ($System) { $messages += @{ role = "system"; content = $System } }
$messages += @{ role = "user"; content = $userText }

$body = @{ model = $Model; messages = $messages; stream = $false } | ConvertTo-Json -Depth 8

try {
  $resp = Invoke-RestMethod -Uri "$Base/chat/completions" -Headers $headers -Method POST `
    -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -TimeoutSec $TimeoutSec
} catch {
  # A 402 here means the account is out of credit -- the same wall the GLM
  # pay-as-you-go key hit on 2026-09-18. Say so plainly rather than retrying.
  Write-Error "DeepSeek call failed: $($_.Exception.Message)"
  exit 1
}

$choice = $resp.choices[0]
$text = $choice.message.content
if (-not $text) {
  Write-Error "DeepSeek returned no content (finish_reason=$($choice.finish_reason))."
  exit 1
}

if ($Smoke) {
  $u = $resp.usage
  Write-Output "deepseek-exec -Smoke: model=$($resp.model) reply=$($text.Trim()) tokens_in=$($u.prompt_tokens) tokens_out=$($u.completion_tokens)"
  Write-Output "Record this line and its date in the STATUS comment at the top of this file."
  exit 0
}

if ($Out) {
  $dir = Split-Path -Parent $Out
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  Set-Content -Path $Out -Value $text -Encoding utf8
  Write-Output "wrote $Out ($($text.Length) chars, model=$($resp.model), finish=$($choice.finish_reason), tokens_out=$($resp.usage.completion_tokens))"
}
Write-Output $text
