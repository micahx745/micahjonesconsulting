# Kickoff: micahjonesconsulting, 2026-09-11

Boot this chat on Micah's other Claude account. Conserve Claude usage. Establish readiness, then present his decisions and wait.
This prompt and the September 11 operator ruling (MODEL_ROUTING §9d) supersede any older routing instruction they conflict with, and `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/EXECUTOR-TIER-CARD.md`. §9b's bucket check and §6's cap still apply.
Do not resume Pass-104b or the rejected dark rebuild. Evolve the live site.

## 1. Boot once, cheaply

Work only in `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch `design/live-evolve`. Touch another repo, such as the book repo, only when Micah rules on that specific task.
The main checkout is `C:/Users/micah/Code/micahjonesconsulting`. A branch belongs to one worktree. Do not switch checkouts.
Read only the following boot sources. Do not explore code, history, transcripts, references, or other projects.

1. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/RESUME.md`. This is current state.
2. `C:/Users/micah/.claude/CLAUDE.md` and `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`.
3. `C:/Users/micah/.claude/MODEL_ROUTING.md`, §§6, 8, 9, 9a, 9b, 9c, 9d. The latest ruling wins. Sol means `gpt-5.6-sol`, never Sonnet.
4. `C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting/memory/MEMORY.md`. Read the index only.
5. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/LESSONS_LEARNED.md`, #19 through #22 only.
6. `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/DECISIONS-2026-09-11.md`. Hold the queue until step 4.

Honor the auto-loaded project rules in `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/CLAUDE.md`, `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/CLAUDE.md`, and `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/AGENTS.md`. Read only if absent from context.
Their older Fable-resident, Opus-executor defaults do not override §9d. Do not revive obsolete palettes from prose.

Credentials, settings, MCP servers, plugins, skills, memory, and history are per config directory.
Do not assume the other account loads anything from `C:/Users/micah/.claude`. Read the absolute paths above explicitly.
Inspect the current config-directory value and this session's exposed tools and skills. Do not read credentials or copy settings.
A separate directory such as `C:/Users/micah/.claude-alt` is not proof of identity, model access, or usable quota.
Workspace trust is interactive and per config directory. Without it, a noninteractive executor ignores the project's permission allow-list.
Report missing capabilities. Never silently skip a gate, install a replacement, or start another account to fill the gap.

## 2. Prove the tools exist

Run these in PowerShell. List all three launchers. Do not use the old card's paths.
```powershell
Set-Location -LiteralPath 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live'
Get-Item -LiteralPath 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/claude-glm.ps1','C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/codex-exec.ps1','C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/claude-alt.ps1' | Select-Object -ExpandProperty FullName
& 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe' -NoProfile -ExecutionPolicy Bypass -File 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/claude-glm.ps1' -Dir 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live' -Model glm-5.3 -Smoke
$glmSmokeExit = $LASTEXITCODE
Write-Output "GLM smoke exit: $glmSmokeExit"
& 'C:/Program Files/Git/cmd/git.exe' -C 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live' status --short --branch
& 'C:/Program Files/Git/cmd/git.exe' -C 'C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live' log -3 --oneline --decorate
(Get-Command codex).Source
codex --version
```
Expect `design/live-evolve` at `7d2c9b4` or a later handoff commit, tracking the preview branch.
Pass-110 and Pass-111a are committed and pushed. Pass-111b, the /services rebuild, awaits decisions 1 through 3.
After the handoff commit, expect only `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/exec/sol111a.log` untracked.
Report any deviation. Preserve unexpected work. Do not reset, clean, switch branches, or infer remote health from local refs.
GLM must answer OK without an error. On a quota error, record its reset message and use Sol for eligible work.
GLM has five-hour windows. Recheck after the reported reset. Do not loop retries or assume the previous cap still holds.
At handoff (2026-09-11) GLM answered 429 with a reset at 2026-09-12 06:26:46, z.ai time.
Launcher presence is not a successful executor call. `codex --version` proves the Codex CLI resolves without spending quota; leave Sol and Astra model calls untested during boot. Do not launch the alternate Claude executor.

## 3. Report readiness in at most 10 lines

Include this report and the decision queue in your first response. Do not stop between them to request permission.
Read your own statusline. Report the actual model, effort, and visible usage. Say unknown for anything it does not expose.
Report the working directory, branch, HEAD, dirty files, launcher presence, GLM response, and which executors actually answered.
Report missing or unverified MCP servers, plugins, skills, memory, and workspace trust. Distinguish accessible files from loaded capabilities.
Recommend Sonnet at medium effort, if offered, for the daily coordination loop. Verify the other account's available models; do not assume its old plan.
Recommend GLM for execution, Sol for drafting and fallback execution, and brief Fable or Opus visits for critical rulings.
The operator owns model switches. If the current tier differs, state the recommendation without launching work.

## 4. Present the decisions, then wait

After the readiness report, present the entire queue from `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/DECISIONS-2026-09-11.md` in one message.
Keep its numbering. Put blockers 1 through 3 first. Give each decision's recommendation, reason, and requested ruling. Separate recommendations from approved facts.
Carry forward any explicit later rulings in the resume. Do not reopen settled decisions or decide operator-owned facts yourself.
If the decision file is missing, report that the handoff is incomplete. Do not reconstruct its recommendations from stale material.
Wait for Micah. No page work, research fan-out, builds, screenshots, or QA loops before he rules.

## Routing after Micah rules

- Name the bucket before every fan-out: z.ai, ChatGPT, or this Claude account. Explain why that bucket should pay (§9b). Claude is scarce (§9d).
- Keep Sonnet coordination short. GLM 5.3 executes locked briefs, fixes, builds, captures, and verification on z.ai. One writer per file.
- Use `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/claude-glm.ps1` with explicit `-Dir`, `-Model glm-5.3`, `-Batch`, and `-PromptFile`.
- Do not use GLM's `-Brief` mode. Its current quoting sends literal `$Brief` instead of the path.
- The GLM prompt file contains only a short pointer to an absolute brief path. No embedded quotes or dash-prefixed options. Keep flags and substantial instructions in the referenced file.
- Use `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/codex-exec.ps1` for Sol and Astra. Always name `-Model`, `-Effort`, and absolute `-Dir`.
- Sol drafts/researches with `-Review -Model gpt-5.6-sol -Effort high -Prompt` and `-Out`. Sol executes with `-Brief -Model gpt-5.6-sol -Effort high` when GLM is capped.
- Astra is quality gates only, about one consolidated look per pass: `-Review -Model gpt-6-astra -Effort ultra`, with the evidence and images. Never use Astra for execution.
- Use absolute paths for every prompt, brief, output, image, and executable. Read the selected launcher's parameters before its first real dispatch. Never rely on its stale default model or sample paths.
- Codex cannot commit from this worktree (its git dir sits outside the sandbox, LESSONS #18). Do not give it browser or server work either: its sandbox has never been shown to allow them, and Pass-111a ran those gates outside Codex. GLM or the main session owns commits, builds and browser gates. Say so in every Codex brief, whatever the wrapper's own text says.
- If GLM is down, Sol still drafts and edits. Use only a bounded Sonnet/Haiku verification leg where capable, or report the browser/server gate pending. No top-tier fallback loop.
- The project's default subagent is now `sonnet` (`.claude/settings.json`, 2026-09-11). Name the model on EVERY Agent and Workflow call anyway. Workflow ignores the environment default. Never allow fan-out to inherit Fable or Opus. Avoid width without independent work.
- Switch to Fable, if available, or Opus for design direction, copy rulings, briefs, the final judge look, and anything touching money, public claims, or production.
- Cap Fable and Opus at 15 tool calls combined per arc. Budget DIRECT at most 10 and reserve at most 5 for JUDGE. Count across model switches and delegated top-tier work.
- No build, screenshot, axe, or verification loops on either top tier. Write the ruling, leave the execution loop to GLM/Sol, then return for the named judgment.
- Follow §6's brief contract in full (`C:/Users/micah/.claude/MODEL_ROUTING.md` §6): first the ruling in one paragraph with its one-line reason, then exact approved copy, existing layout tokens, motion limits, commands with expected results, rejected choices, return conditions, and parked decisions.
- Store and commit the brief under `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/`. Update the resume before a context/model change. Clear between arcs.
- Executors implement approved decisions. They never rule, push, or deploy. Verify their results against the brief before accepting them.

## Gates and standing traps

Before the first UI or copy edit, read `C:/Users/micah/.claude/playbooks/website-dev.md` and `C:/Users/micah/.claude/playbooks/marketing.md`.
Before UI work, read `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/DESIGN_BAR.md` and `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/brand.json`.
Before code changes, read the relevant installed Next.js guide under `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/node_modules/next/dist/docs/`.
Use `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/exec/gates111a.sh` as a template, not a blind rerun. Adapt routes, evidence destinations, and process ownership for the new pass.
The local build workaround is `& 'C:/Program Files/nodejs/npx.cmd' next build --webpack`. The normal pnpm build fails here only.
That direct build skips the package script's surrounding checks. Preserve every check and self-test from `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/package.json`, including the render gate.
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/axe-worlds.mjs` and `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/scripts/layout-gate.mjs` require Chrome and a running production server: `& 'C:/Program Files/nodejs/npx.cmd' next start --port 3100`. Both gates default to `http://localhost:3100`; on any other port, pass the same base URL to each.
The browser gates also need `C:/Program Files/Google/Chrome/Application/chrome.exe` and dependencies under `C:/tmp/p101tools`. Treat missing dependencies as setup failures.
Read every gate's own exit code. The template's final message or exit status is not an aggregate pass.
On cross-faded pages, use inherited/world foreground text, no opacity on text, no fixed fill under inherited text, and no accent under text (#19). Run the world and layout gates (#20).
Every new gate ships a `--self-test` with planted failures and near misses (#21). Never edit a running script. Retain the private-copy guard (#22).
Capture the VIEWPORT after the page settles. Use `C:/Python314/python.exe` with `-P`.
In `C:/Program Files/Git/bin/bash.exe`, set `MSYS_NO_PATHCONV=1` for "/" arguments. Capture exit codes before any pipe.
PowerShell 5.1 splits native arguments at embedded double quotes. Send commit messages through a Git Bash heredoc or Git's `commit -F` with an absolute message-file path.
Rewrite `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/RESUME.md` after every task and before context switches. Keep it at most 2,500 bytes. Measure bytes before every commit. Preserve concurrent handoff work.
Every push, deploy, merge to main, and spend belongs to Micah. Earlier push approval is not standing approval. Every push to main auto-deploys production.
The two Anthropic support questions in §9a remain Micah's. Do not contact support or assume concurrent-account capacity is approved.

## Micah: open the next chat

Open the Claude desktop app's Code tab, logged into your other account.
Select `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live` as the working directory and accept its trust prompt if shown.
Pick Sonnet first, at medium effort if offered. Paste this as the first message. If Sonnet is unavailable, use the cheapest offered model that can coordinate tools; reserve Fable/Opus for the critical calls above.