# claude-alt.ps1 — launch a SECOND Claude Code executor authenticated as the operator's OTHER
# Claude account, so its usage allowance does the work instead of this session's.
#
# Why: MODEL_ROUTING §9. Fable is away, Astra is rationed to quality gates, and the main session's
# allowance is the bottleneck. Claude Code holds ONE authenticated identity per process, so two
# accounts cannot be pooled inside a session — but a second process with its own config directory
# reads its own credentials and spends its own quota. Same pattern as scripts/claude-glm.ps1.
#
# HOW IT WORKS (documented in code.claude.com/docs/en/authentication): CLAUDE_CONFIG_DIR relocates
# .credentials.json, settings.json, .mcp.json, plugins and session history. A process started with
# a different CLAUDE_CONFIG_DIR is a different identity.
#
# ONE-TIME SETUP, by the operator, in his own terminal. The browser opens; sign in as the SECOND
# account. Nothing secret is ever typed into a chat or written into this repo:
#
#   $env:CLAUDE_CONFIG_DIR = "C:\Users\micah\.claude-alt"
#   claude login
#   cd C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p101-integrate
#   claude          # accept the workspace trust dialog once, then /exit
#
# That second step matters: a non-interactive run in an untrusted workspace IGNORES the project's
# permission allow-list and stalls or skips work. The GLM executor hit exactly that.
#
# Usage after setup:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-alt.ps1 -Smoke
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-alt.ps1 -Dir .claude/worktrees/p101-integrate -Brief .claude/briefs/pass-104b-home-rebuild.md
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-alt.ps1 -Dir <dir> -Batch -PromptFile <file>
#
# POLICY, and it is the operator's to confirm, not this harness's to assume: Anthropic's public
# docs do not address one person running two of their own subscription accounts concurrently, and
# they say nothing about whether two live sessions share a rate-limit bucket. Ask support before
# leaning on this. If the answer is no, delete this script rather than working around it.
#
# NEVER: put a token, key or password in this file or on the command line. This script sets a
# DIRECTORY, nothing else; the credentials live where `claude login` put them.

param(
  [string]$Dir = (Get-Location).Path,
  [string]$Brief = "",
  [string]$ConfigDir = "",
  [switch]$Smoke,
  [switch]$Batch,
  [string]$PromptFile = "",
  [string]$Model = ""
)

# Resolve the alternate config directory: the parameter, else an env var the operator set, else
# the documented default location this script's header tells him to create.
if ($ConfigDir -eq "") { $ConfigDir = $env:CLAUDE_ALT_CONFIG_DIR }
if (-not $ConfigDir)   { $ConfigDir = Join-Path $HOME ".claude-alt" }

if (-not (Test-Path $ConfigDir)) {
  Write-Error @"
No alternate config directory at $ConfigDir.
Run the one-time setup in your own terminal first (the browser opens; sign in as the SECOND account):

  `$env:CLAUDE_CONFIG_DIR = "$ConfigDir"
  claude login

Then run `claude` once inside the target directory and accept the workspace trust dialog.
"@
  exit 1
}

$cred = Join-Path $ConfigDir ".credentials.json"
if (-not (Test-Path $cred)) {
  Write-Error "«$ConfigDir» exists but has no credentials. Run: `$env:CLAUDE_CONFIG_DIR = `"$ConfigDir`"; claude login"
  exit 1
}

# Child-process environment only. Nothing here persists, and no secret is handled.
$env:CLAUDE_CONFIG_DIR = $ConfigDir
# This process must NOT inherit the z.ai routing if claude-glm.ps1 ran in the same shell.
Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
Remove-Item Env:ANTHROPIC_BASE_URL   -ErrorAction SilentlyContinue
Remove-Item Env:ANTHROPIC_API_KEY    -ErrorAction SilentlyContinue
foreach ($v in @("ANTHROPIC_MODEL","ANTHROPIC_DEFAULT_OPUS_MODEL","ANTHROPIC_DEFAULT_SONNET_MODEL",
                 "ANTHROPIC_DEFAULT_HAIKU_MODEL","ANTHROPIC_DEFAULT_FABLE_MODEL","CLAUDE_CODE_SUBAGENT_MODEL")) {
  Remove-Item "Env:$v" -ErrorAction SilentlyContinue
}
if ($Model -ne "") { $env:ANTHROPIC_MODEL = $Model }

Set-Location $Dir
Write-Host "claude-alt: second account, config dir $ConfigDir, in $Dir" -ForegroundColor DarkYellow
Write-Host "  This session's usage is billed to the OTHER account. No push, no deploy." -ForegroundColor DarkGray

if ($Smoke) {
  & claude -p "Reply with the single word OK."
  exit $LASTEXITCODE
}
if ($Batch) {
  if ($PromptFile -eq "" -or -not (Test-Path $PromptFile)) { Write-Error "-Batch needs -PromptFile <file>."; exit 1 }
  $text = Get-Content -Raw $PromptFile
  Write-Host "claude-alt: BATCH (permissions skipped; hooks and gates still run)" -ForegroundColor DarkYellow
  & claude -p --dangerously-skip-permissions --output-format text $text
  exit $LASTEXITCODE
}
if ($Brief -ne "") {
  $prompt = "You are the EXECUTOR. Read ``.claude/RESUME.md``, then execute ``$Brief`` verbatim: every step, every verification command with its expected output. Never push, never commit if this is a git worktree (the main session commits), never bypass a hook, never change a price, fact, link or live string. Stop and report on any return condition in the brief."
  & claude $prompt
} else {
  & claude
}
