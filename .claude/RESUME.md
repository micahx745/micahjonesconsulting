# RESUME — micahjonesconsulting (2026-09-21, Pass-126 ship check session)

## READ FIRST
Kickoff: `.planning/handoff/NEXT-SESSION-KICKOFF.md`. Branch `design/live-evolve` (`.claude/worktrees/p106-live`).
Build: `node .planning/exec/prepush-gates.mjs` (LESSONS #47). Push to main deploys. Routing: `.claude/AI_ROUTING.md`.
Preview builds: `.claude/worktrees/p124-cuts` (now ff'd to design/live-evolve; `preview-p124-cuts` in this
worktree's launch.json serves it on 3126).

## LIVE: main = e8b44e3, dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH, all three domains (off the wire 09-21, this session)

## NOW: Pass-126 How I work ship check, fix round (Pass-126d) before the push
- Ship check on 62d293a: gated build PREPUSH pass (Sol); `card1-126.sh` (card1-124 + 22 How I work markers,
  OLD_DPL dpl_2mGq) bit: local 74/0, prod 20 FAIL = the new markers; ledger byte-match; Fable ship read SHIP
  (`FABLE-126-SHIP-READ.md`) with 2 layout nice-to-haves.
- PUSH ASKED -> he picked "Fix Fable's two small ones first" (LESSONS #3 "FABLE'S TWO FIXES"). Pass-126d `90b3699`
  (on both branches): /services Build `text-wrap: balance`; home title 40px phone margin. Gate
  `.planning/qa/pass-126/hiw-wrap-gate.mjs` bit pre-fix (3 known FAILs), LESSONS #48.
- NOW: Sol rebuilds 90b3699 in p124-cuts (`build-p126d.log`) -> serve 3126 -> hiw-wrap-gate 0 FAIL + card1-126 local
  0 FAIL + sheets -> push popup AGAIN -> words verbatim in LESSONS #3 + here BEFORE the push -> deploy id off the wire
  -> `EXPECT_DPL=<id> bash .planning/exec/card1-126.sh`. Revert = promote dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH.

## HELD: /full-time (approved in content). `preview/p125-full-time` (`708ac61`); ship = `git revert 95cb41b` + card1-125.

## Owed
Inner pages (incl. /about "practice management" vs "CRM"); the blog
(answered-ratio cut first); open facts (ORDANI "one engineer", east-west swap, "it shipped, nobody came", landing
page 27 vs 34); Guardicore mobile LCP p75; K4/K5 race; DeepSeek key rotation (he said 09-21: "Not yet, I'll do it").

## Traps
deploy id off the wire (#45) · explicit pathspecs (#23) · executors write no non-ASCII (#46), cannot run bash ·
PowerShell `*>` logs are UTF-16 · never commit in a worktree while an executor runs · `MSYS_NO_PATHCONV=1`.
