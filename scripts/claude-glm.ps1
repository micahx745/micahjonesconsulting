# claude-glm.ps1 — launch a Claude Code EXECUTOR session backed by z.ai's GLM Coding Plan.
#
# Why: MODEL_ROUTING §6 / §7. Fable 5.1 (the main session) writes the brief and judges at
# the named checkpoints; this session runs the brief. Claude Code has ONE API config per
# process, so a subagent inside the Fable session cannot be pointed at z.ai; a second
# process can. The env vars below are set for THIS child process only and never written to
# any settings file. The key is read from a user environment variable you set yourself.
#
# One-time setup (you, in a PowerShell window; the value never enters a chat):
#   [Environment]::SetEnvironmentVariable('ZAI_CODING_KEY', '<your z.ai Coding Plan key>', 'User')
#   then open a NEW terminal so the variable is visible.
#
# Usage (this machine has Windows PowerShell 5.1, not pwsh):
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Smoke
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Dir .claude/worktrees/p101-integrate -Brief .claude/briefs/pass-102-wording-round.md
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Batch -PromptFile <pointer.md> -Dir <worktree> [-Scope default|harness|readonly]
#   Every -Smoke/-Batch run appends to <state>\dispatch.jsonl and writes <state>\receipts\<run_id>.json (Harness v2 E2).
# Verified 2026-09-07: -Smoke answered "OK" on glm-5.3 through api.z.ai with the account's
# existing key. One-time: run `claude` interactively once in the repo AND in each worktree
# and accept the trust dialog, or non-interactive runs ignore .claude/settings.json's
# permission allow-list and will stall on tool prompts.
#
# Policy: the Coding Plan key is for use inside coding tools only (docs.z.ai/devpack/
# usage-policy). It is NOT the key the cross-review REST leg uses (that one is GLM_API_KEY /
# ZAI_API_KEY, pay-as-you-go). Keep them separate.

param(
  [string]$Dir = (Get-Location).Path,
  [string]$Brief = "",
  [string]$Model = "glm-5.3",       # the plan's main model per docs.z.ai/devpack/tool/claude
  [switch]$Smoke,                    # one tiny call to prove the plan answers, then exit
  [switch]$Batch,                    # unattended: claude -p with permissions skipped (hooks still run)
  [string]$PromptFile = "",          # with -Batch: the prompt to run, read from a file
  [ValidateSet('default','harness','readonly')]
  [string]$Scope = 'default',        # Harness v2 E1: what the executor guard lets this run touch
  [int]$MaxTurns = 400,              # Harness v2 E2: --max-turns for a -Batch run
  [int]$TimeoutMin = 120             # Harness v2 E2: wall-clock cap on the child, in minutes
)

# Harness v2 E2.2: refuse a long prompt before anything else (LESSONS #36). Nothing is
# dispatched, no process starts and no state is written on this path.
if ($Batch) {
  if ($PromptFile -eq "" -or -not (Test-Path $PromptFile)) { Write-Error "-Batch needs -PromptFile <file>."; exit 1 }
  $text = Get-Content -Raw -Encoding UTF8 $PromptFile
  if ($null -eq $text) { $text = "" }
  if ($text.Length -gt 30000) {
    Write-Output ("claude-glm: prompt is {0} characters (limit 30000). Put the material in a file and point the executor at it (LESSONS #36)." -f $text.Length)
    exit 2
  }
}

# Key resolution: the user env var, else the gitignored key file the cross-review harness
# already reads (z.ai binds the Coding Plan to the account's existing API key, so no new
# key is needed — confirmed by the operator's other session, 2026-09-07). Never printed.
$key = $env:ZAI_CODING_KEY
if (-not $key) {
  foreach ($f in @("$HOME/.claude/.zai-key", (Join-Path (Get-Location).Path ".claude/.zai-key"))) {
    if (Test-Path $f) { $key = (Get-Content -Raw $f).Trim(); if ($key) { break } }
  }
}
if (-not $key) {
  Write-Error "No z.ai key: set ZAI_CODING_KEY for this user, or place the key in ~/.claude/.zai-key (gitignored)."
  exit 1
}
$env:ZAI_CODING_KEY = $key

# Child-process env only. Nothing here persists.
$env:ANTHROPIC_AUTH_TOKEN          = $env:ZAI_CODING_KEY
$env:ANTHROPIC_BASE_URL            = "https://api.z.ai/api/anthropic"
# Explicit main model: without it Claude Code picks "opus[1m]" and the [1m] suffix reaches
# z.ai as "glm-5.3[1m]" (an unrecognized-model warning; the call still succeeds).
$env:ANTHROPIC_MODEL               = $Model
$env:ANTHROPIC_DEFAULT_OPUS_MODEL  = $Model
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = $Model
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "GLM-5.3-Flash"
# Every tier the harness can name resolves to the plan's models; the project's
# settings.json asks for "opus" subagents, which must not reach z.ai unmapped.
$env:ANTHROPIC_DEFAULT_FABLE_MODEL = $Model
$env:CLAUDE_CODE_SUBAGENT_MODEL    = $Model
# LESSONS #20: Claude Code does not recognise "glm-5.3", so it assumes a 200k window and
# autocompact THRASHES on a large brief (Pass 104b died this way with 105KB of specs).
# Declare the real window. z.ai documents GLM-5.3 at 200k; raise this if that changes.
$env:CLAUDE_CODE_MAX_CONTEXT_TOKENS = "200000"
$env:CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT = "1"
$env:API_TIMEOUT_MS                = "3000000"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"
Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue

# Harness v2 E2.3: mark this child as an executor for the PreToolUse guard (E1), and lay
# down the state directory tree. Runtime state (prompts, receipts, the guard log) never
# lands inside the repo.
$env:HARNESS_ROLE = 'executor'
$env:HARNESS_WORKTREE = (Resolve-Path $Dir).Path
$env:HARNESS_EXECUTOR_SCOPE = $Scope
if (-not $env:HARNESS_STATE_DIR) {
  $env:HARNESS_STATE_DIR = Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting'
}
$state = $env:HARNESS_STATE_DIR
New-Item -ItemType Directory -Force -Path (Join-Path $state 'runs'), (Join-Path $state 'receipts') | Out-Null

# Harness v2 E2.4: every -Smoke/-Batch run goes through Invoke-Recorded. It archives the
# prompt, appends a dispatch line, runs the child with stdin redirected from the prompt
# copy, parses the JSON stdout, and writes a receipt. The result and RECEIPT lines go out
# through [Console]::Out.WriteLine rather than Write-Output: the call sites are
# `exit (Invoke-Recorded ...)`, and in PS 5.1 pipeline output inside that expression is
# swallowed and the exit code collapses to 0 (probed 2026-09-22, run A).
function Invoke-Recorded([string]$PromptText, [string]$Mode, [string]$PromptLabel) {
  $runId = 'glm-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '-' + ('{0:x4}' -f (Get-Random -Maximum 65536))
  $runsDir = Join-Path $state 'runs'
  $promptCopy = Join-Path $runsDir ($runId + '.prompt.md')
  $jsonFile = Join-Path $runsDir ($runId + '.json')
  $errFile = Join-Path $runsDir ($runId + '.err')
  $outFile = Join-Path $runsDir ($runId + '.out.md')
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [IO.File]::WriteAllText($promptCopy, $PromptText, $utf8)
  $startedUtc = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
  $entry = [ordered]@{
    run_id = $runId
    started_utc = $startedUtc
    dir = $Dir
    prompt_file = $PromptLabel
    scope = $Scope
    model = $Model
    mode = $Mode
    launcher_pid = $PID
  }
  [IO.File]::AppendAllText((Join-Path $state 'dispatch.jsonl'), ($entry | ConvertTo-Json -Compress) + "`n", $utf8)
  $claudeArgs = @('-p')
  if ($Mode -eq 'smoke') {
    $claudeArgs += @('--output-format', 'json', '--max-turns', '1')
  } elseif ($Scope -eq 'readonly') {
    $claudeArgs += @('--allowedTools', 'Read,Grep,Glob', '--output-format', 'json', '--max-turns', [string]$MaxTurns)
  } else {
    $claudeArgs += @('--dangerously-skip-permissions', '--output-format', 'json', '--max-turns', [string]$MaxTurns)
  }
  $exe = (Get-Command claude -CommandType Application | Select-Object -First 1).Source
  $p = Start-Process -FilePath $exe -ArgumentList $claudeArgs -WorkingDirectory $Dir -RedirectStandardInput $promptCopy -RedirectStandardOutput $jsonFile -RedirectStandardError $errFile -NoNewWindow -PassThru
  $null = $p.Handle
  $timedOut = $false
  if (-not $p.WaitForExit($TimeoutMin * 60000)) {
    taskkill /T /F /PID $p.Id | Out-Null
    $timedOut = $true
    $exitCode = 124
  } else {
    $p.WaitForExit()
    $exitCode = $p.ExitCode
  }
  $stdoutText = ''
  if (Test-Path $jsonFile) { $stdoutText = [IO.File]::ReadAllText($jsonFile) }
  $stderrText = ''
  if (Test-Path $errFile) { $stderrText = [IO.File]::ReadAllText($errFile) }
  $parsed = $null
  try { $parsed = $stdoutText | ConvertFrom-Json } catch { $parsed = $null }
  $resultText = $stdoutText
  if ($parsed -and $null -ne $parsed.result) { $resultText = [string]$parsed.result }
  [IO.File]::WriteAllText($outFile, $resultText, $utf8)
  $glm429 = $false
  if (($stderrText + "`n" + $resultText) -match 'rate_limit_error|\[1308\]|\[1310\]') { $glm429 = $true }
  if ($glm429) {
    $statusPy = Join-Path $PSScriptRoot 'harness\status.py'
    if (Test-Path $statusPy) {
      & python $statusPy glm-429 --file $jsonFile
      if ($LASTEXITCODE -eq 3) { & python $statusPy glm-429 --file $errFile }
    }
  }
  $guardDenies = 0
  $guardLog = Join-Path $state 'guard.log'
  if ((Test-Path $guardLog) -and $parsed -and $parsed.session_id) {
    $sid = [string]$parsed.session_id
    $guardDenies = @((Get-Content $guardLog) | Where-Object { $_.Contains($sid) }).Count
  }
  $receipt = [ordered]@{
    run_id = $runId
    started_utc = $startedUtc
    ended_utc = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
    exit_code = $exitCode
    timed_out = $timedOut
    is_error = ($null -eq $parsed)
    subtype = $null
    num_turns = $null
    duration_ms = $null
    session_id = $null
    usage = $null
    total_cost_usd = $null
    glm_429 = $glm429
    guard_denies = $guardDenies
    prompt_copy = $promptCopy
    out_file = $outFile
    err_file = $errFile
  }
  if ($parsed) {
    $receipt.subtype = $parsed.subtype
    $receipt.num_turns = $parsed.num_turns
    $receipt.duration_ms = $parsed.duration_ms
    $receipt.session_id = $parsed.session_id
    $receipt.usage = $parsed.usage
    $receipt.total_cost_usd = $parsed.total_cost_usd
  }
  $receiptPath = Join-Path (Join-Path $state 'receipts') ($runId + '.json')
  [IO.File]::WriteAllText($receiptPath, ($receipt | ConvertTo-Json -Depth 6) + "`n", $utf8)
  [Console]::Out.WriteLine($resultText)
  [Console]::Out.WriteLine('RECEIPT: ' + $receiptPath)
  return $exitCode
}

Set-Location $Dir
# Harness v2 E2.5: the recorded modes. $text was read and length-checked at the top of
# the script (E2.2), before key resolution; the prompt reaches the child on stdin, UTF-8,
# redirected from the archived prompt copy (LESSONS #36: an argument cuts at the first
# embedded double quote).
if ($Smoke) {
  exit (Invoke-Recorded 'Reply with the single word OK.' 'smoke' 'smoke')
}
if ($Batch) {
  exit (Invoke-Recorded $text 'batch' $PromptFile)
}
Write-Host "claude-glm: executor session on $Model via z.ai, in $Dir" -ForegroundColor DarkYellow
Write-Host "  Fable writes the brief and judges; this session executes it verbatim. No push, no deploy." -ForegroundColor DarkGray

if ($Brief -ne "") {
  $prompt = "You are the EXECUTOR. Read $Brief and execute it verbatim: every step, every verification command with its expected output. Do not commit, push, stash or change branches, and do not write .claude/RESUME.md, MEMORY.md, docs/LESSONS_LEARNED.md, CLAUDE.md or AGENTS.md: the main session commits and keeps the books. Never deploy, never bypass a hook, never change a price, fact, link or live string. Stop and report on any return condition in the brief, and end with the digest the brief names."
  & claude $prompt
} else {
  & claude
}
