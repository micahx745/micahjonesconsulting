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
  [string]$PromptFile = ""           # with -Batch: the prompt to run, read from a file
)

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
$env:API_TIMEOUT_MS                = "3000000"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"
Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue

Set-Location $Dir
if ($Smoke) {
  Write-Host "claude-glm: smoke test on $Model via z.ai" -ForegroundColor DarkYellow
  & claude -p "Reply with the single word OK."
  exit $LASTEXITCODE
}
if ($Batch) {
  if ($PromptFile -eq "" -or -not (Test-Path $PromptFile)) { Write-Error "-Batch needs -PromptFile <file>."; exit 1 }
  $text = Get-Content -Raw $PromptFile
  Write-Host "claude-glm: BATCH on $Model via z.ai, in $Dir (permissions skipped; hooks and gates still run)" -ForegroundColor DarkYellow
  & claude -p --dangerously-skip-permissions --output-format text $text
  exit $LASTEXITCODE
}
Write-Host "claude-glm: executor session on $Model via z.ai, in $Dir" -ForegroundColor DarkYellow
Write-Host "  Fable writes the brief and judges; this session executes it verbatim. No push, no deploy." -ForegroundColor DarkGray

if ($Brief -ne "") {
  $prompt = "You are the EXECUTOR. Read `.claude/RESUME.md`, then execute `$Brief` verbatim: every step, every verification command with its expected output, commit as each unit lands with the brief's commit subjects and the trailer 'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>'. Never push, never deploy, never bypass a hook, never change a price, fact, link or live string. Stop and report on any return condition in the brief. Rewrite `.claude/RESUME.md` (≤2.5KB) before you stop."
  & claude $prompt
} else {
  & claude
}
