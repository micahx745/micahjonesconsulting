# codex-exec.ps1 — run a brief (or a review) on OpenAI Codex / gpt-6-astra, ChatGPT Pro.
#
# Why: MODEL_ROUTING §8. The operator's ChatGPT Pro tier carries 5x the Codex usage of the
# previous plan, resetting weekly. Codex is a full coding agent with its own sandbox, so it
# can EXECUTE briefs in a worktree the same way the GLM executor does, and it is the best
# juror the harness has (the Astra design review caught what the corpus alone did not).
# Auth is the ChatGPT login already on this machine (`codex login status`); no key here.
#
# Usage:
#   pwsh scripts/codex-exec.ps1 -Brief .claude/briefs/pass-102-wording.md -Dir .claude/worktrees/p101-integrate
#   pwsh scripts/codex-exec.ps1 -Review -Prompt .planning/prompts/CODEX-ROOM-AND-LEDGER-REVIEW.md -Out .planning/reviews/x.md -Image a.png,b.png
#   -Effort ultra (default for reviews) | xhigh (default for execution) | high
#
# Policy: never push, never deploy, never bypass a hook. Execution runs with
# --sandbox workspace-write inside $Dir; reviews run read-only.

param(
  [string]$Brief = "",
  [switch]$Review,
  [string]$Prompt = "",
  [string]$Out = "",
  [string]$Image = "",
  [string]$Dir = (Get-Location).Path,
  [string]$Effort = ""
)

if (-not $Review -and $Brief -eq "") { Write-Error "Give -Brief <path> to execute, or -Review -Prompt <path>."; exit 1 }
if ($Effort -eq "") { $Effort = if ($Review) { "ultra" } else { "xhigh" } }

$imgArgs = @()
if ($Image -ne "") { foreach ($i in $Image.Split(",")) { $imgArgs += @("-i", $i.Trim()) } }

if ($Review) {
  if ($Prompt -eq "") { Write-Error "-Review needs -Prompt <file>."; exit 1 }
  $outArgs = @(); if ($Out -ne "") { $outArgs = @("-o", $Out) }
  Write-Host "codex-exec: REVIEW on gpt-6-astra @ $Effort, read-only, in $Dir" -ForegroundColor DarkYellow
  Get-Content -Raw $Prompt | & codex exec -m gpt-6-astra -c "model_reasoning_effort=$Effort" --sandbox read-only -C $Dir @imgArgs @outArgs -
  exit $LASTEXITCODE
}

$text = "You are the EXECUTOR. Read .claude/RESUME.md, then execute the brief at $Brief verbatim: every step, every verification command with its expected output. Commit as each unit lands with the brief's commit subjects and the trailer 'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>'. Never push, never deploy, never bypass a hook (amend a superseded rule with a quoted reason instead), never change a price, fact, link or live string. Stop and report on any return condition named in the brief. Before you stop, rewrite .claude/RESUME.md as one current-state file of at most 2.5KB."
Write-Host "codex-exec: EXECUTE $Brief on gpt-6-astra @ $Effort, workspace-write, in $Dir" -ForegroundColor DarkYellow
& codex exec -m gpt-6-astra -c "model_reasoning_effort=$Effort" --sandbox workspace-write -C $Dir $text
exit $LASTEXITCODE
