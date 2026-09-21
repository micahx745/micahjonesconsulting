# RESUME — micahjonesconsulting (2026-09-21, after the Pass-126 push)

## READ FIRST
Branch `design/live-evolve` (p106-live). Build: `node .planning/exec/prepush-gates.mjs` (#47). Push to main deploys.
Routing: `.claude/AI_ROUTING.md`. Preview builds: `p124-cuts` (`preview-p124-cuts` in this launch.json, port 3126).

## LIVE: main = e091a16, dpl_Bk18zCfBqPb2DjTrkozL2dBs7git, all three domains (Pass-126; card1-126 157/0)
Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. Branch ahead by docs only (unpushed; a push needs his words).

## NOW (09-21; rulings in LESSONS #3, newest last)
- DOORS: he picked round-two 6 "The Copy Gets Eaten" (jury unanimous). Brief `.claude/briefs/pass-127c-doors-build.md`
  (Sol, new branch `preview/p127-doors` in p124-cuts); section 4b PENDING the jank root cause; do not dispatch before.
- BLOG 1: generic SEO advice, NOT his work, NO pitch (his ruling). Fable wrote it (voice approved); tags + work lines
  cut; Astra+DeepSeek "almost" -> Fable revising. Gate: `node .planning/exec/blog-lint.mjs <post>` (0 failures).
  No /blog page until 3 posts are approved. Posts 2-3 go back to the routing (DeepSeek/Sol) unless he rules.
- BUG (his phone): workflow wf_24b793b4-f2b (evidence only) in `.planning/qa/pass-128/`; no fix before root cause.
- NEXT after doors: exits on phones (dead swipes), exits title presence, Neuton "Undisclosed".

## QUEUE (his to order; popup before any page arc)
HELD /full-time (`preview/p125-full-time` 708ac61; ship = `git revert 95cb41b` + card1-125 on card1-126) · inner
pages (/about lacks the research voice; Ordani "practice management" vs "CRM") · open facts (ORDANI "one engineer",
east-west swap, landing page 27 vs 34) · Guardicore LCP p75 · K4/K5 race · dead CSS `cw-principle__artifact`,
`cw-pband__incl` · DeepSeek key rotation ("Not yet, I'll do it").

## Traps
deploy id off the wire (#45) · explicit pathspecs (#23) · executors: no non-ASCII (#46), no bash · PS `*>` logs are
UTF-16 (use `cmd /c`) · geometry = finished frame (#48) · no commit while an executor runs · `MSYS_NO_PATHCONV=1`.
