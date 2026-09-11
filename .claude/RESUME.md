# RESUME — micahjonesconsulting (2026-09-11)

## READ FIRST
Dark rebuild REJECTED; LIVE evolved on `design/live-evolve` (worktree
`.claude/worktrees/p106-live`), ahead of `main`. `pnpm build` fails HERE only:
use `npx next build --webpack`. Battery gotcha found Pass-112: tsc runs BEFORE
build and reads the PREVIOUS build's `.next/types` — after deleting routes it
reports phantom TS2307s; re-run tsc after a fresh build before believing it.

## Pass-112 EXECUTED, STOPPED BEFORE COMMIT — one ruling needed
Sections 1-5 done in the worktree (deletions staged via git rm; edits, gate,
battery files uncommitted; nothing pushed). ALL battery checks green EXCEPT
the retired-phrases gate: exit 1, `app/api/stripe/webhook/route.ts:28` — the
import `"@/lib/playbook-delivery"` contains the substring `/playbook`. Brief
§0 keeps the webhook `book` branch (refunds); §3 pins exemptions to
catalog.ts + playbook-delivery.ts only. Deterministic false positive, node-
verified. Self-test 15 planted / 15 near misses, exit 0.
Fix options: (a) EXEMPT_FILES += the webhook route — RECOMMENDED, same
money-path rationale as the other two + add an import-path self-test fixture;
(b) boundary-match the phrase "/playbook" (not followed by "-"); (c) dynamic
import inside the webhook branch — worst, rewrites money code for a gate.
Then: rerun self-test + gate → §7 commit (subject/body per brief; explicit
paths; -F message file) → RESUME commit → judge look §9 (≤5 calls) → 111b.
Battery rest: tsc 0 post-build (2 in-battery = stale types), copy-lint 0,
vendor 0, accent/gsap x2 0, prettier 0, build 0 + 0 playbook in log, 404
404, served mentions 0 on 10 routes, nav 4, render 0, axe 0, layout 0,
shots 0 (14 PNGs, viewport-sized, `home-nav-open-390` shows 4 items).

## Rulings 2026-09-11
#7 book off site is now in LESSONS #3 + the gate. Others unchanged: pricing
floor, promises, area pick, $20M+ exception, case studies, $5B+, rename.

## Waiting on the operator
Gate-fix ruling (a/b/c above) · A4/S3 text · deactivate Stripe playbook-99 ·
merge to `main` · $500 live test · §9a.

## Traps
push to main auto-deploys · never edit a running script (#22) · Git Bash:
`MSYS_NO_PATHCONV=1` · no exit codes through a pipe · md docs were never
prettier-clean — never `--write` them · >1 world renders: no fixed text
colour, no opacity on text.
