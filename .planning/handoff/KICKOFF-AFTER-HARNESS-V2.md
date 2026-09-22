# Kickoff: after Harness v2 (runs B to G done; his decisions pending)

Written 2026-09-22 15:25 PDT by the chat that ran runs B to G (Opus 5.5; it went past 200K on his pick "K1 Continue
here (Recommended)" and ended at 690K). Open the next chat INSIDE its worktree (AI_ROUTING rule 9): for harness work,
`C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\harness-v2`.

## State (branch `harness/v2`, not pushed, not merged)
- Installed and verified: E1-E4, B1-B4, W1-W4, C1-C4, the G gates (brief_lint count check, dispatch-lint,
  resume-size) and the H host-auth scrub. `python scripts/harness/tests/run_all.py` -> 17 PASS lines, then
  `ALL PASS (17 files)`. `python scripts/harness/status.py tier` prints the budget line.
- 63 commits since `438d1ad`. Cross-review record: `.planning/harness/xreview-2026-09-22.md`. Harness map:
  `.planning/research/harness-2026-09-22/01-harness-map.md`. LESSONS #60-#65; #65 is a SECURITY incident.

## His decisions (popups for calls only he owns; paths go in chat text, never in a popup)
1. SECURITY (#65): he signs out of the Claude desktop app and claude.ai and back in, which revokes the Claude OAuth
   tokens a `claude -p` child sent to api.deepseek.com (21:32 to 21:38 UTC, rejected with 401). Ask if he did it;
   record his words in LESSONS #3.
2. Merge `harness/v2` into `design/live-evolve` and/or `main`, and push: his call. At the landing merge,
   `settings.json` keeps both sets of hook entries and `AI_ROUTING.md` takes this branch's side.
3. The proposals below.

## Queued (repo-level)
- Cross-review queue: the status.py lock steal at the deadline; visual_qa overflow rows per frame; an `error`
  decision in `_fixtures.run_hook`; the Fable count is per chat.
- `scripts/claude-alt.ps1`: the same host-auth scrub (identity mix-up, not exposure).
- `run_cross_review.py`'s DeepSeek leg is not priced into the W3 ledger.
- The map's findings: two entrance caps for one rule (DESIGN_BAR R15 400 ms, the plugin 300 ms); stale plugin prose
  (copper hex, GSAP importers); image-budget.sh wired by the plugin while `.claude/CLAUDE.md` says unwired; three
  call budgets for one rule; the landing branch's quote and citation gates and DeepSeek map-reduce, reusable here.
- DeepSeek balance $7.78 at 22:21 UTC (this arc spent about $0.45): the $5 hold is near.
- Any Claude Code child aimed at a third party goes through a launcher with the #65 scrub; prove the credential on
  127.0.0.1 first.

## Proposals for him (they touch ~/.claude or the main checkout; nothing installed)
1. The post-reset report's global kit (00b section 8).
2. The global tier-burn monitor denying instead of warning.
3. Pruning `~/.claude/skills` (720 personal skills).
4. `disabledMcpServers` in `~/.claude.json` for claude-context, github, supabase and sequential-thinking.
5. `gsd-statusline.js` writing the rate-limit numbers into the status file.
6. Wiring the new hooks into the main checkout's untracked `.claude/settings.local.json` (#49, #50).
7. A `claude` CLI login refresh: the Fable gate's live runs, and P8 is measured at the first live gate.
