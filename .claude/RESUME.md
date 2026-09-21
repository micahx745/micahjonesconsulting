# RESUME — micahjonesconsulting (2026-09-21, end of Pass-125/126 session)

## READ FIRST
Next chat: `.planning/handoff/NEXT-SESSION-KICKOFF.md`. Open it in the p106-live worktree (the routing hook did not
load when the chat opened at the main checkout). Branch `design/live-evolve` (`.claude/worktrees/p106-live`).
Build: `node .planning/exec/prepush-gates.mjs` (every gate + `next build --webpack`; LESSONS #47). Push to main
deploys. Routing: `.claude/AI_ROUTING.md`. Preview builds: `.claude/worktrees/p124-cuts`.

## LIVE: main = e8b44e3, dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH, all three domains (off the wire 09-21)
Revert target stays `dpl_9Q3JRk47vpd9b9xGnmkruoG5zkEM` for the Pass-124 home; after a Pass-126 push the revert is
promote `dpl_2mGq...`.

## NEXT: Pass-126 How I work ship check (approved in design, LESSONS #3 "HOW I WORK REDESIGN TO THE SHIP CHECK")
`design/live-evolve` = `b257b66` (50 ahead of origin/main, not pushed): the redesign merged from
`preview/p126-how-i-work` (`3d5bb88`); Plan body re-ruled (Sol's), Build kept. Steps: gated build -> write
`card1-126.sh` (from card1-124 + How I work markers; NOT 125) + bite test -> his push words recorded verbatim
BEFORE the push -> push -> deploy id off the wire -> card1-126 with EXPECT_DPL.

## HELD: /full-time (approved in content, not pushed)
Whole on `preview/p125-full-time` (`708ac61`). To ship: `git revert 95cb41b`, then its own ship check (card1-125).

## Owed
Inner pages (incl. /about "practice management" vs study "CRM" for Ordani); the blog (answered-ratio cut first);
open facts (ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page 27 vs 34);
Guardicore mobile LCP p75; K4/K5 race; confirm the 09-20 DeepSeek key was rotated.

## Traps
deploy id off the wire (#45) · explicit pathspecs (#23) · executors write no non-ASCII (#46) and cannot run bash ·
never commit in a worktree while an executor runs · viewport scroll frames, not full-page shots · measures need a
liveness gate · `MSYS_NO_PATHCONV=1` for `/` args · stop the preview server before a rebuild.
