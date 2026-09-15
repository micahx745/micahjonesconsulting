# RESUME — micahjonesconsulting (2026-09-15)

## READ FIRST
LIVE evolves on `design/live-evolve` (worktree `.claude/worktrees/p106-live`).
Build `npx next build --webpack`. ROUTING (operator 2026-09-12): conserve THIS
account. Sol writes scripts and code, reviews plans (no npx); Astra judges
gates; Opus rules. Detached executors (Sonnet agent, GLM claude -p) hang at
next build here: run build/measure chains in the main session's background.

## LIVE 2026-09-15: main = c2ffb36, dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23 BOTH
Pass-118 tuned font fallbacks, verified on prod: / all-shift CLS 0.001 x10
(was 0.290), /services 0; LH home simulate 94/94/93 (was 89/88/94), CLS 0.
Revert: Vercel promote dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC. Operator must PULL
the main checkout (hooks read its stale brand.json).

## NEXT: the /work page (Micah 2026-09-15: "The next thing i want to work on is the
work page"). New chat boots from .planning/handoff/NEXT-SESSION-KICKOFF.md §7.

## Pass-119 LCP — PARKED by Micah 2026-09-15 ("lets park this for later")
GSAP-after-load works (0 initial GSAP chunks, reveals R1-R4 PASS, gates clean)
but / LCP sim 3510 -> 3559ms (gate FAIL); hero image or fonts blocked: no
change. Patch kept in .planning/qa/pass-119; SplitReveal restored. First paint
= LCP after hydration on both routes; suspect: ScrollReveal hides the LCP
element p.cw-sub then fades it in (motion). HIS RULING 2026-09-15: "1" = field data
first. Not reachable here: PSI keyless 429 quota, Vercel Web Analytics API 404,
no Speed Insights tool. He reads Vercel > Speed Insights p75 (mobile) for /
and /services; <2.5s LCP = close Pass-119. Brief §11.

## Open (mine)
Stand-in glyphs mixed case in headless fonts-blocked captures (prod too;
Astra: severe): check in a real browser. 117 §8: mono links home/404,
spring CTA on home hero.

## Waiting on operator
Speed Insights p75 (parked 119) · Ordani screens · Stripe playbook-99 off + LIVE Audit
description · 500 dollar live test · A4/S3 text · §9a.

## Traps
push to main auto-deploys · pathspec commits (#23) · never reinterpret an
expect (#25) · measure the render (#26) · scope gates from layout (#28) · lab
CLS counts hadRecentInput shifts (#29) · probe overwrites 118a probe.json ·
never build while serving · export MSYS_NO_PATHCONV=1 (env vars too) · gate
table steps on probe exit codes · hooks read the MAIN checkout's brand.json.
