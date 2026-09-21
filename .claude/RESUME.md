# RESUME — micahjonesconsulting (2026-09-21, Pass-125)

## READ FIRST
Branch `design/live-evolve` (worktree `.claude/worktrees/p106-live`). Build: `bash .planning/exec/prepush-gates.sh`
(every gate + `next build --webpack`; the bare command skips all gates, LESSONS #47). Push to main deploys.
ROUTING: `.claude/AI_ROUTING.md` (the hook did not load this session: open chats in the p106-live worktree).
Preview builds: `.claude/worktrees/p124-cuts`; served preview = `prod-p124` in the MAIN checkout's launch.json
(port 3126); stop it before any rebuild there (Windows file locks).

## LIVE: main = e8b44e3, dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH, all three domains (read off the wire 09-21 12:05)
Revert target: promote `dpl_9Q3JRk47vpd9b9xGnmkruoG5zkEM`. Branch vs main: sitemap dates only.

## NOW: How I work (operator 2026-09-21, LESSONS #3 "FULL-TIME PAGE HELD; HOW I WORK IS THE PRIORITY")
Same words (Scope/Plan/Build/Stay, locked 09-21), better design on the home, and the same four steps carried to
/services (replacing its own wording of the commitments). Astra + dspro still owe a confirmation of the four steps.
Pass-126 (preview `preview/p126-how-i-work`, p124-cuts): Fable picked Sol's "Marked-Up Proof" on espresso;
built + gated (prepush-gates.mjs); jury (Fable, Astra, dspro) all "after fixes", disposition in
`.planning/reviews/PASS-126-JURY-DISPOSITION.md` there. He re-ruled the Plan body (Sol's, LESSONS #3 "HOW I WORK:
THE PLAN LINE"), kept Build. Sol running brief 126b (design fixes); then main session runs CLS
(`scratchpad cls-page.mjs` / `.planning/exec/cls-attrib-123.mjs`), crossfade, `region-sheet.mjs` captures ->
his look at the rendered page -> ship check -> his push words.

## HELD: /full-time (approved in content, not pushed)
Whole on `preview/p125-full-time` (`708ac61`, incl. card1-125 + QA). To ship: `git revert 95cb41b`, then ship check.

## Owed
Inner pages (incl. /about "practice management" vs "CRM" for Ordani); the blog (answered-ratio cut first); open
facts (ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page 27 vs 34); Guardicore
mobile LCP p75; K4/K5 race; confirm the 09-20 DeepSeek key was rotated.

## Traps
deploy id off the wire (#45) · explicit pathspecs (#23) · Codex writes '?' for non-ASCII (#46) · a brief never pins
HEAD its own commit moves · "email me", "sales manager" gated site-wide.
