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
  [switch]$Search                  # live web search (codex's top-level --search; landing exemplar, 2026-09-21)
)

if (-not $Review -and $Brief -eq "" -and $Task -eq "") { Write-Error "Give -Brief <path> or -Task <path> to execute, or -Review -Prompt <path>."; exit 1 }
if ($Effort -eq "") { $Effort = if ($Review) { "ultra" } else { "xhigh" } }

$imgArgs = @()
if ($Image -ne "") { foreach ($i in $Image.Split(",")) { $imgArgs += @("-i", $i.Trim()) } }
$searchArgs = @(); if ($Search) { $searchArgs = @("--search") }

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
