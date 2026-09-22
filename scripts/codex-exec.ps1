# codex-exec.ps1 — run a brief (or a review) on OpenAI Codex / gpt-6-astra, ChatGPT Pro.
#
# Why: MODEL_ROUTING §8. The operator's ChatGPT Pro tier carries 5x the Codex usage of the
# previous plan, resetting weekly. Codex is a full coding agent with its own sandbox, so it
# can EXECUTE briefs in a worktree the same way the GLM executor does, and it is the best
# juror the harness has (the Astra design review caught what the corpus alone did not).
# Auth is the ChatGPT login already on this machine (`codex login status`); no key here.
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/codex-exec.ps1 -Brief .claude/briefs/pass-102-wording.md -Dir .claude/worktrees/p101-integrate
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/codex-exec.ps1 -Review -Prompt .planning/prompts/CODEX-ROOM-AND-LEDGER-REVIEW.md -Out .planning/reviews/x.md -Image a.png,b.png
#   -Effort ultra (default for reviews) | xhigh (default for execution) | high
#   -Model gpt-6-astra (default: the juror) | gpt-5.6-sol (drafting, research; MODEL_ROUTING §9c)
#
# Policy: never push, never deploy, never bypass a hook. Execution runs with
# --sandbox workspace-write inside $Dir; reviews run read-only.
#
# KNOWN LIMIT (LESSONS #18, 2026-09-08): a git WORKTREE keeps its git dir under the main
# repo's .git/worktrees/<name>/, which is OUTSIDE $Dir, so Codex's workspace-write sandbox
# cannot create index.lock there and `git commit` fails with "Permission denied". In a
# worktree Codex WRITES and the GLM executor (or Fable) COMMITS; in the main checkout or a
# full clone Codex can commit itself.

param(
  [string]$Brief = "",
  [string]$Task = "",   # a prompt FILE run as-is (workspace-write, no commit/RESUME wrapper; Pass-123)
  [switch]$Review,
  [string]$Prompt = "",
  [string]$Out = "",
  [string]$Image = "",
  [string]$Dir = (Get-Location).Path,
  [string]$Effort = "",
  [string]$Model = "gpt-6-astra",  # gpt-5.6-sol for drafting and research legs (MODEL_ROUTING §9c)
  [switch]$Search,                 # live web search (codex's top-level --search; landing exemplar, 2026-09-21)
  [switch]$DryRun                  # Harness v2 W1: acquire/release the codex.lock, never start Codex
)

if (-not $Review -and $Brief -eq "" -and $Task -eq "") { Write-Error "Give -Brief <path> or -Task <path> to execute, or -Review -Prompt <path>."; exit 1 }
if ($Effort -eq "") { $Effort = if ($Review) { "ultra" } else { "xhigh" } }

$imgArgs = @()
if ($Image -ne "") { foreach ($i in $Image.Split(",")) { $imgArgs += @("-i", $i.Trim()) } }
$searchArgs = @(); if ($Search) { $searchArgs = @("--search") }

# Harness v2 W1: one Codex run at a time. Two parallel Codex runs locked the Windows sandbox
# account (error 1909); a lockfile refuses the second instead of racing it.
if (-not $env:HARNESS_STATE_DIR) {
  $env:HARNESS_STATE_DIR = Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting'
}
$state = $env:HARNESS_STATE_DIR
if (-not (Test-Path $state)) { New-Item -ItemType Directory -Force -Path $state | Out-Null }
$lockPath = Join-Path $state 'codex.lock'
$codexMode = if ($Review) { "review" } elseif ($Task -ne "") { "task" } else { "brief" }
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$lockJson = ([ordered]@{ pid = $PID; started_utc = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ'); mode = $codexMode; dir = $Dir } | ConvertTo-Json -Compress)
$lockBytes = [System.Text.Encoding]::UTF8.GetBytes($lockJson)
$weOwnLock = $false

try {
  $fs = $null
  try {
    $fs = [IO.File]::Open($lockPath, 'CreateNew', 'Write', 'None')
  } catch {
    $fs = $null
  }

  if ($fs) {
    $fs.Write($lockBytes, 0, $lockBytes.Length)
    $fs.Close()
    $weOwnLock = $true
  } else {
    $existingLock = $null
    try { $existingLock = ([IO.File]::ReadAllText($lockPath)) | ConvertFrom-Json } catch { $existingLock = $null }
    $liveProc = $null
    if ($existingLock -and $existingLock.pid) { $liveProc = Get-Process -Id ([int]$existingLock.pid) -ErrorAction SilentlyContinue }
    if ($liveProc) {
      Write-Output "codex-exec: another Codex run holds the lock (pid $($existingLock.pid), mode $($existingLock.mode), started $($existingLock.started_utc)). One Codex run at a time: parallel runs locked the Windows sandbox account (error 1909)."
      exit 3
    }
    $stalePid = if ($existingLock -and $existingLock.pid) { [string]$existingLock.pid } else { "unknown" }
    Write-Output "codex-exec: reclaimed a stale lock (pid $stalePid is not running)."
    [IO.File]::WriteAllText($lockPath, $lockJson, $utf8NoBom)
    $weOwnLock = $true
  }

  if ($DryRun) {
    Write-Output "DRY RUN: would run codex $codexMode in $Dir"
    exit 0
  }

  if ($Review) {
    if ($Prompt -eq "") { Write-Error "-Review needs -Prompt <file>."; exit 1 }
    $outArgs = @(); if ($Out -ne "") { $outArgs = @("-o", $Out) }
    Write-Host "codex-exec: REVIEW on $Model @ $Effort, read-only, search=$Search, in $Dir" -ForegroundColor DarkYellow
    Get-Content -Raw -Encoding UTF8 $Prompt | & codex @searchArgs exec -m $Model -c "model_reasoning_effort=$Effort" --sandbox read-only -C $Dir @imgArgs @outArgs -
    exit $LASTEXITCODE
  }

  if ($Task -ne "") {
    if (-not (Test-Path $Task)) { Write-Error "-Task file not found: $Task"; exit 1 }
    # Pass-123: the prompt file is the whole instruction. No commit wrapper (a worktree's git dir sits
    # outside the sandbox, LESSONS #18) and no RESUME rewrite (the main session owns that file).
    Write-Host "codex-exec: TASK $Task on $Model @ $Effort, workspace-write, in $Dir" -ForegroundColor DarkYellow
    Get-Content -Raw -Encoding UTF8 $Task | & codex @searchArgs exec -m $Model -c "model_reasoning_effort=$Effort" --sandbox workspace-write -C $Dir -
    exit $LASTEXITCODE
  }

  $text = "You are the EXECUTOR. Read .claude/RESUME.md, then execute the brief at $Brief verbatim: every step, every verification command with its expected output. Commit as each unit lands with the brief's commit subjects and the trailer 'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>'. Never push, never deploy, never bypass a hook (amend a superseded rule with a quoted reason instead), never change a price, fact, link or live string. Stop and report on any return condition named in the brief. Before you stop, rewrite .claude/RESUME.md as one current-state file of at most 2.5KB."
  Write-Host "codex-exec: EXECUTE $Brief on $Model @ $Effort, workspace-write, in $Dir" -ForegroundColor DarkYellow
  & codex exec -m $Model -c "model_reasoning_effort=$Effort" --sandbox workspace-write -C $Dir $text
  exit $LASTEXITCODE
} finally {
  if ($weOwnLock) {
    $stillOurs = $false
    try {
      $curLock = ([IO.File]::ReadAllText($lockPath)) | ConvertFrom-Json
      if ($curLock -and [int]$curLock.pid -eq $PID) { $stillOurs = $true }
    } catch { $stillOurs = $false }
    if ($stillOurs) { Remove-Item -Force $lockPath -ErrorAction SilentlyContinue }
  }
}
