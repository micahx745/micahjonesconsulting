# Kickoff: finish Harness v2 (runs B-F) with Sonnet executors

Written 2026-09-22 11:15 PDT by the chat "LANDING PAGE 2" (Opus 5.5). It installed E1 and E2, then handed off at
539K context (AI_ROUTING rule 9 as briefed: hand off at 200K). Open this chat on Opus 5.5 INSIDE
`C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\harness-v2`, not the main checkout.

## His words (verbatim, 2026-09-22)
- The task: "install Harness v2 ... You are Opus and you RULE: you write the briefs, check the results and commit.
  GLM ... EXECUTES every edit, script and test from those briefs; DeepSeek/Gemini verify; make no Fable calls ...
  Repo-level changes only; anything touching ~/.claude is a proposal for me."
- Popups: E1-E4 "go with all your recs"; B1-B4 "go your recs"; W1-W4 "your recs"; C1-C4 "your recs"; installer
  "This chat installs (Recommended)"; GLM "Two at once, back off (Recommended)".
- After GLM hit its 5-hour cap (resets 14:44:53 PDT): "Fresh chat now, Sonnet executes".

## State (branch harness/v2)
- Done: E1 executor guard `8339676` (PASS E1 37/37) and its live probe `bd736be`; E2 dispatch log and receipts
  `1005427` (PASS E2-offline 3/3, live smoke receipt). Briefs for B-F: `5bff7b8`, in `.claude/briefs/harness-v2-*.md`
  (read `harness-v2-00-common.md` first); pointer prompts in `.planning/harness/prompts/`; digests in
  `.planning/harness/digests/`.
- MJCONSULT 13's research is merged up to `95de6f4`. Its premise checks P1-P8 (`f8538ce`,
  `.planning/research/harness-2026-09-22/01-premise-checks.md`) are on `design/live-evolve`: merge it first.

## Boot
1. `get_usage`; say the numbers, then record them once run B has built `status.py`.
2. `git status --short`, `git log --oneline -8`, `git merge design/live-evolve` (explicit message; RESUME conflicts
   are merged by hand, never overwritten).
3. `python scripts/harness/tests/run_all.py` -> expect `PASS E1 37/37`, `PASS E2-offline 3/3`, `ALL PASS (2 files)`.

## Running each brief (the executor is a Sonnet subagent: his choice)
- Order: B, D, C, E, F. One at a time in this worktree: parallel runs break each other's `diff_scope` and `run_all`
  counts.
- Rule 1, said before each Agent call: GLM is capped until 14:44 PDT, Sol is rationed (ChatGPT 8%), DeepSeek is not
  adopted as an executor (data residency), and he chose Sonnet by popup.
- One `Agent` call per run: `model: "sonnet"`, `subagent_type: "general-purpose"`, in the background, prompt:
  "Read .planning/harness/prompts/run-<x>.md and do exactly what it says. You are a Sonnet subagent standing in for
  GLM. The executor guard does not cover in-session subagents, so the hard rules in
  .claude/briefs/harness-v2-00-common.md bind you as instructions. Do not commit."
- Review each run: its digest (`digest_check.py` once B lands); `git status --short`;
  `python scripts/harness/diff_scope.py <brief>` (once B lands); re-run `run_all.py` yourself; spot-read the
  security-relevant parts. Revert anything outside the brief's Files list. Commit each item (E3, E4, B2 ...) by
  explicit path; the message carries the test's last line and "Executed by Sonnet (subagent); reviewed by Opus 5.5".
- Once run C lands, its tier-burn hook can stop this chat after 40 execution calls with no message from him; an
  Agent call or his next message resets it.

## Brief amendments the executor change forces (you own the briefs; commit each before its run)
1. Run D, `live_w4_xreview.py`: the glmcc leg needs GLM. Before 14:44 PDT, record it as dead ("GLM capped until
   21:44 UTC"), or run that one test after the reset.
2. Run D, add an E2 fix found at run B: a capped GLM run's receipt said `is_error: false` (claude's own JSON said
   success; exit code was 1, `glm_429` true). Files += `scripts/claude-glm.ps1`,
   `scripts/harness/tests/test_e2_launcher.py`; `is_error` becomes true when the exit code is not 0 or `glm_429` is
   true; a 4th offline check proves it. (LESSONS #59.)
3. Run F, C1.2 and C1.4: `claude -p` from a Sonnet subagent runs on HIS Claude login, which expired. Measure with
   `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Smoke -Dir <worktree>` after the GLM
   reset and read the receipt's usage (input + cache_creation + cache_read), or ask him to run `claude` once.
4. Run F expectations (MJCONSULT 13, P2 in `f8538ce`): the repo-level diet buys about 2% (three zero-call plugins
   saved 707 tokens). `disabledMcpServers` lives in `~/.claude.json` and the 720 personal skills in
   `~/.claude/skills`: both proposals.
5. Run E, C4: P8 (the lean-agent boot) was never measured; C4's first live gate measures it (after his login).

## Also yours: MJCONSULT 13's harness map (leg 2b), after the GLM reset
His picks in that chat, verbatim (11:02 PDT, LESSONS #3 at `999ee1f` on `design/live-evolve`): "Yes, stop and hand
off (Recommended)" and "Hand it to LANDING PAGE 2 for after 2:45 (Recommended)". After 14:44:53 PDT, and after the
boot merge has brought `.planning/research/harness-2026-09-22/` to `f8538ce` or later, run it on GLM (it needs no
Sonnet leg):
`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Batch -PromptFile .planning/research/harness-2026-09-22/legs/glm-leg2b-pointer.md -Dir <this worktree>`
Outputs: `01-harness-map.md` (15 KB max) and an update to `01-premise-checks.md` (P3's docs quote; P6 is settled,
skip it). Allow 15 minutes of silence before calling it hung (#53). Review and commit it like any run.

## Close
- `scripts/cross-review/run_cross_review.py --mode diff --legs deepseek,gemini` on
  `git diff 4dddde3..HEAD -- scripts .claude/hooks .claude/settings.json` (harness code, no client data). Dispose
  every finding by name, premises checked against the repo first.
- Rewrite `.claude/RESUME.md` (merge, at most 2500 bytes). LESSONS for any new catch: next free number #60.
  LEGS stamp. `get_usage` at the end.
- Push, and merging `harness/v2` into `design/live-evolve` or `main`: his call.

## Proposals for him (they touch ~/.claude or the main checkout; nothing installed)
1. The post-reset report's global kit (00b section 8).
2. The global tier-burn monitor (`~/.claude/hooks/tier-burn-monitor.js`) denying instead of warning.
3. Pruning `~/.claude/skills` (720 personal skills feed the 9.8K skills list).
4. `disabledMcpServers` for claude-context, github, supabase and sequential-thinking in this repo (`~/.claude.json`).
5. `gsd-statusline.js` writing the rate-limit numbers into the status file.
6. Wiring the new hooks into the main checkout's untracked `.claude/settings.local.json` (#49, #50).
7. `claude` CLI login refresh (the Fable gate's live runs; the C1 measurement).
