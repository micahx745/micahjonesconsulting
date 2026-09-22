# Harness research 2026-09-22: the plan (gate A replaced by two Fable reports)

Kickoff: `.planning/handoff/KICKOFF-HARNESS-RESEARCH.md`. This file is the research's current state and its adjustments.

## Inputs
- `00-fable-report.md`: a Fable chat report from the morning of 2026-09-22, 53 KB, written under the 71%/73% budget.
- `00b-fable-report-post-reset.md`: a Fable chat report the operator pasted into this chat at about 10:10 PDT, after he
  switched the chat to Opus 5.5 and took the one-time usage reset (LESSONS #3 "THE BUDGET RESET; OPUS 5.5").
- This chat owns: 00 section 4 and the repo-level parts of 5-7, and 00b sections 7.3, 9 and 12 for this site. The Ordani
  sections (00 §1, 00b §7.1) and the landing-page sections (00 §3, 00b §7.2) go to their chats by path. The global
  items (00 §2, 00b §8) go to him as decisions only. `~/.claude` is not touched.

## Budget, measured (get_usage 2026-09-22 10:13 PDT)
5-hour 5%, weekly all-models 1%, weekly Fable 1%. Both weekly bars still reset 2026-09-26 01:00 PDT (3d 14h).
CORRECTION to 00b: its header says "Saturday 2026-09-26, freshly reset", but today is Tuesday and the reset time has
not moved. Its pace bands (14%/day cumulative over 7 days) would leave about half of this window unused. This window is
3.6 days, so the on-pace rate is about 27%/day until Saturday 01:00 PDT, then 14%/day in the new week. That is his
call (popup), not ours.

## Verified by smoke call (`smoke/headline-smoke.ps1`, output `smoke/headline-smoke.txt`)
The headline claim of both reports holds: GLM and DeepSeek both run as tool-using Claude Code workers. Each ran
`claude -p` (Claude Code 2.1.266) in an empty temp dir, read a random nonce from a file and echoed a second random nonce
from its environment through Bash: PASS, 3 turns, 17 s (GLM) and 8 s (deepseek-flash). The bare worker's three calls
sent 98K prompt tokens on GLM and 101K on DeepSeek. The DeepSeek balance read 11.94 before and after, so the smoke cost
under one cent. Adopting DeepSeek as a worker is his decision: both reports reject it on data residency.

## Premise checks (each settled by a file:line or a command's output before a claim is adopted or dismissed)
- P1 Stop hooks: does any hook this repo runs (repo settings, the main checkout's settings.local.json, the premium-web
  plugin) return `block` from Stop, or print a nudge there? (00b R0.)
- P2 Context diet mechanism: 00b §7.3 says a repo `.mcp.json` can disable unused MCP servers. A project `.mcp.json` only
  ADDS servers; the likely repo-level lever is `enabledPlugins` in `.claude/settings.json` (plugin skills and plugin
  MCP servers). Establish what a repo file can switch off, then measure the prefix before and after on a GLM worker.
- P3 Double-load: 00b's "~9.6K" equals this chat's whole "Memory files" category (9,660 tokens: global CLAUDE.md, the
  worktree stack and MEMORY.md, a worktree start with no double-load). The real overhead is the main-checkout stack,
  still unmeasured.
- P4 Subagent model: both reports call `CLAUDE_CODE_SUBAGENT_MODEL` a hard override, and `.claude/settings.json` sets it
  to `sonnet` (AI_ROUTING rule 2). If it overrides an explicit `model: "fable"`, the Fable juror calls ran on Sonnet.
  The audit reports requested versus actual model for every subagent.
- P5 `fable` shorthand: 00b §1 says there is none, but this app's Agent tool accepts `model: "fable"`. The transcripts
  settle which model actually answered.
- P6 Visual QA off Claude against LESSONS #36/#37: the 2026-09-19 routing says the main session opens every capture
  itself. The proposal must keep that rule's intent, or he must change it.
- P7 Model ids: 00b says the `opus` alias now resolves to `claude-opus-5-5`; AI_ROUTING pins `opus` to `claude-opus-5`.
- P8 (new, from the probes) Subagent boot size: can a tools-restricted agent boot smaller than 78K?

### Settled 2026-09-22 10:23 PDT (`smoke/subagent-probe.txt`; two Agent probes from this session)
- P4 FALSE as the reports state it: with `CLAUDE_CODE_SUBAGENT_MODEL=sonnet` in the session env, an Agent call with
  `model: "fable"` was answered by claude-fable-5-1. The explicit model wins.
- P5 FALSE for this app: the shorthand `fable` resolves to claude-fable-5-1.
- P7 TRUE: `opus` resolves to claude-opus-5-5. AI_ROUTING's pin is stale (a fact fix, bundled with his routing ruling).
- New measurements: a do-nothing subagent boots at 78,250 tokens, all cache-write with a 5-minute TTL. Continued 45 s
  later, it read 36,669 from cache and re-wrote 41,642, so about 47% was reused. `subagent_tokens` in an Agent result is
  the final context size, not the sum of calls. So 00b's warm "persistent Fable gate session" saves at most about half,
  and only within 5 minutes. The boot size is the bigger lever (P8, leg 2a).
- The standalone CLI's Claude login has expired ("OAuth session expired and could not be refreshed",
  `smoke/subagent-model-smoke.txt`). He must re-login for any `claude -p` on his Claude account. The desktop session and
  the GLM/DeepSeek workers are unaffected.

## Method (kickoff §4, updated)
1. Boot: done. get_usage above; smoke tests OK for GLM (glm-5.3), DeepSeek (deepseek-flash) and Gemini (gemini-2.5-flash);
   headline test PASS.
2. Gate A: replaced by the two reports. No Fable call.
3. GLM leg 1, the usage audit: `legs/glm-leg1-usage-audit.md` produces `scripts/usage_audit.py`, `00-usage-audit.md`
   and `00-usage-audit.json`.
4. GLM leg 2, the harness map and P1-P7: `01-harness-map.md` and `01-premise-checks.md`.
5. Candidates: GLM and deepseek-flash draft independently from 00-usage-audit, 01 and the two reports' repo items. A
   script merges them into `02-candidates.md`.
6. Gate B: one Fable call ranks `02-proposals.md`. The budget now allows it; this is the kickoff's original gate B.
7. Reads: deepseek-v4-pro and Gemini, independently, into `03-reads.md`: each pick by name, then the tie-break.
8. Popup: which proposals to build now; the routing for the rest of this 3.6-day window; the reports' decisions that
   touch this repo. His words go into LESSONS #3.
9. The brief for GLM: `.claude/briefs/harness-2026-09-22-implement.md`, pre-flighted in GLM's shell (LESSONS #52).

## Scope change, 2026-09-22 ~10:35 PDT (pending his confirmation in this chat)
The session "LANDING PAGE 2" relayed his popup ruling from that chat: it installs Harness v2 (16 repo-level items he
approved there, branch `harness/v2`, worktree `.claude/worktrees/harness-v2`, branched from `4dddde3`). It asked this
chat to finish GLM legs 1 and 2, commit them, send it the hash and paths, and STOP before step 5 (no candidates, no
gate B, no popup, no implement brief). It also asked this chat not to edit `.claude/AI_ROUTING.md`, `.claude/hooks/*`,
`.claude/settings.json`, `scripts/claude-glm.ps1`, `scripts/*-exec.ps1` or `scripts/cross-review/*` until
`harness/v2` merges. At most two GLM runs at once: one from each chat. That narrows this chat's scope and changes no
decision here, so this chat follows it and asks him to confirm at the stop point.
Leg 1, attempt 1 was NOT hung (corrected 10:32; an earlier line here said it stalled for 11 minutes). The prompt was
received at 10:19:53 PDT, and the first reply landed at 10:28:13, 8 min 20 s later, with 31,065 output tokens (one
long think, then a Bash call). During the think, the transcript got no entries and the process CPU stayed flat, while
a GLM smoke answered in 9 s. The main session read those signs as a hang and stopped the run about 5 s after it began
working. Lesson: on GLM-5.3, idle CPU plus an empty transcript does not mean a hang; a dense brief can take a
9-minute first think. Attempt 2 is a pointer prompt (`legs/glm-leg1-pointer.md`) that works in three stages. Its first
reply came in 5 s (it read the brief).

## Routing inside this chat
As the kickoff says, except that the gate-B Fable call is now affordable. ChatGPT stays unused: kickoff §0, and 00b's
"Codex reset" is unverified. DeepSeek is capped at $3. Privacy: no transcript text leaves this machine. GLM, DeepSeek
and Gemini see script output and digests only.
