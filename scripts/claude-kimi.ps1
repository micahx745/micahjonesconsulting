# claude-kimi.ps1 — launch a Claude Code READER/DRAFTER session backed by Kimi K3 (Kimi Code).
#
# Why: MODEL_ROUTING §8. Kimi K3 carries a 1M-token context: it reads whole corpora in one
# pass (the Reddit threads, the manuscript, transcripts) and drafts copy from the attested
# phrase bank. The membership's Kimi Code key is a coding-tool key (kimi.com/code docs), so
# it is used here, inside Claude Code, and never by the REST cross-review leg (that leg
# needs a pay-as-you-go platform key, `KIMI_API_KEY`, endpoint api.moonshot.ai).
#
# One-time setup (you, in a PowerShell window; the value never enters a chat):
#   create a key in the Kimi Code Console (kimi.com/code), then
#   [Environment]::SetEnvironmentVariable('KIMI_CODING_KEY', '<your Kimi Code key>', 'User')
#   and open a NEW terminal.
#
# Usage:
#   pwsh scripts/claude-kimi.ps1 -Brief .claude/briefs/pass-102-wording-round.md -Dir .claude/worktrees/p101-integrate
#
# Docs: platform.kimi.ai/docs/guide/claude-code-kimi and kimi.com/code/docs/en/third-party-tools/claude-code.html
# (base URL https://api.kimi.com/coding/ for a Kimi Code key; model "k3[1m]"). A leftover
# ANTHROPIC_API_KEY silently conflicts with ANTHROPIC_AUTH_TOKEN, so it is cleared below.

param(
  [string]$Dir = (Get-Location).Path,
  [string]$Brief = "",
  [string]$Model = "k3[1m]"
)

if (-not $env:KIMI_CODING_KEY) {
  Write-Error "KIMI_CODING_KEY is not set for this user. Set it once with:`n  [Environment]::SetEnvironmentVariable('KIMI_CODING_KEY','<key>','User')`nthen open a new terminal."
  exit 1
}

# Per kimi.com/code/docs (third-party-tools/claude-code): a Kimi Code key rides
# ANTHROPIC_API_KEY, and EVERY tier variable must be set or that scenario silently breaks.
Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
$env:ANTHROPIC_API_KEY              = $env:KIMI_CODING_KEY
$env:ANTHROPIC_BASE_URL             = "https://api.kimi.com/coding/"
$env:ANTHROPIC_MODEL                = $Model
$env:ANTHROPIC_DEFAULT_OPUS_MODEL   = $Model
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = $Model
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL  = $Model
$env:ANTHROPIC_DEFAULT_FABLE_MODEL  = $Model
$env:CLAUDE_CODE_SUBAGENT_MODEL     = $Model
$env:CLAUDE_CODE_AUTO_COMPACT_WINDOW = if ($Model -eq "k3[1m]") { "1048576" } else { "262144" }
$env:CLAUDE_CODE_MAX_CONTEXT_TOKENS  = $env:CLAUDE_CODE_AUTO_COMPACT_WINDOW
$env:API_TIMEOUT_MS                 = "3000000"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"

Set-Location $Dir
Write-Host "claude-kimi: reader/drafter session on $Model via Kimi Code, in $Dir" -ForegroundColor DarkYellow
Write-Host "  Executes the brief's READ and DRAFT steps only; proposals go to the operator's table. No push, no deploy." -ForegroundColor DarkGray

if ($Brief -ne "") {
  $prompt = "You are the READER and DRAFTER. Read `.claude/RESUME.md`, then execute the READ and DRAFT steps of `$Brief` exactly as written (the sections that name Kimi), writing only the files the brief names. Do not apply any copy to a page. Never push, never deploy, never bypass a hook. Stop when the proposal table is written and report its path and row count. Rewrite `.claude/RESUME.md` (≤2.5KB) before you stop."
  & claude $prompt
} else {
  & claude
}
