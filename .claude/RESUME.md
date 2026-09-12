# RESUME — micahjonesconsulting (2026-09-11)

## READ FIRST
Dark rebuild REJECTED; LIVE evolved on `design/live-evolve` (worktree
`.claude/worktrees/p106-live`), ahead of `main`. `pnpm build` fails HERE only:
use `npx next build --webpack`. tsc gotcha: it reads the PREVIOUS build's
`.next/types` — after deleting routes it reports phantom TS2307s; re-run
after a fresh build before believing it.

## Pass-112 COMMITTED — the book is off the site
Ruling 2026-09-11: not mentioned, not shown until it ships. The 19 file
deletions rode the shared index into `ec84b07` (pushed; that preview fails
render-gate — recorded as LESSONS #23). Edits + gate + battery committed in
`95141f3` (subject "Pass-112: the book comes off the site"). Gate
`retired-phrases-gate.mjs`: 4 phrases, EXEMPT_FILES money path (catalog.ts,
playbook-delivery.ts), `stripSpecifiers` blanks module specifiers (judge F1);
self-test 17 planted / 19 near misses, scan clean, tsc 0, prettier 0.
Battery was fully green on this exact tree: build 0 + 0 playbook in log,
404 404, 0 mentions on 10 routes, nav 4, render/axe/layout/shots 0.
JUDGED PASS (Opus, 4 calls): doors + open nav captures correct, every exact string
landed, gate re-run clean by the judge. Push of 95141f3/4ffb3a8 needs his OK → 111b.

## Rulings 2026-09-11
#7 book off site is in LESSONS #3 + the gate. Others unchanged: pricing
floor, promises, area pick, $20M+ exception, case studies, $5B+, rename.

## Waiting on the operator
Push 112 (3 commits ahead) · A4/S3 text · deactivate Stripe playbook-99 (LIVE+TEST)
+ drop PLAYBOOK_ON_SALE from Vercel env · merge to `main` · $500 live test.

## Traps
push to main auto-deploys · shared index: commit with an explicit pathspec
after reading git diff --cached (#23) · never edit a running script (#22) ·
Git Bash: `MSYS_NO_PATHCONV=1` · no exit codes through a pipe · md docs
were never prettier-clean — never `--write` them · >1 world renders: no
fixed text colour, no opacity on text.
