# RESUME — micahjonesconsulting (2026-09-12)

## READ FIRST
Dark rebuild REJECTED; LIVE evolved on `design/live-evolve` (worktree
`.claude/worktrees/p106-live`), ahead of `main`. `pnpm build` fails HERE only:
use `npx next build --webpack`. tsc reads the PREVIOUS build's `.next/types`.
ROUTING (operator 2026-09-12): conserve THIS account. GLM (claude-glm.ps1
-Batch) executes briefs; Astra (codex-exec.ps1 -Review) judges gates; Claude
judges and records only. 113 + 114 + 115 ran entirely off the Claude account.

## Pass-115 (032ce79): geometry PASS, JUDGE FAILED THE RENDER; NOT PUSHED
Brief .claude/briefs/pass-115-circle-encloses.md. Variant-3 loop (rounded,
aspect="none") sized in em from the measured ink box; wrap margin-left 0.26em
(loop edge on the column edge); num padding-block 0.184em. M1@1440: L .021
T -.001 W 2.825 H .875, W/H 3.229 (390: 3.245); hx .28 hy .184; box -.259 /
-.185 / 3.385 / 1.243em. All gates 0; circle115.mjs C1-C10 both widths
circle failures: 0; countup114 7/7 failures: 0 (dashoffset 0px @3000ms, CLS
0); render-gate 0; axe / 0 serious. Captures .planning/qa/pass-115/. Traps
found: puppeteer screenshot({clip}) renders an UNSCROLLED surface (crop full
frames instead); DOMRect serializes {} through evaluate (toJSON it).
countup rerun overwrote pass-114 PNGs; restored.

## NOW: Pass-115b on GLM (brief pass-115b-loop-dash-length.md)
Capture shows no loop (top + bottom strokes, sides missing; 114 had it too).
Hypothesis: dasharray=getTotalLength (user units) under non-scaling-stroke
(dashes in screen px). 115b probes first, adds C11 pixel coverage (must fail
before, pass after), then fixes. Then judge, ONE Astra look, push branch only.

## LIVE: main = a71788a, dpl_4C7zkovDAMCv2H9jFQWj4iFiHTCk on BOTH domains,
CARD 1 19/19. Local main behind origin: operator pulls. 112 pushed (b5de535).
## Waiting on operator: Stripe playbook-99 off + LIVE Audit description to
area names · 500 dollar live test · A4/S3 text · five parked bar items · §9a.

## Traps
push to main auto-deploys · commit by explicit pathspec after diff --cached
(#23) · never edit a running script (#22) · MSYS_NO_PATHCONV=1 · no exit codes
through a pipe · md never prettiered · served expect>=1 counts RSC payload (#24)
· executor never reinterprets an expect (#25) · GLM pointers: no quotes ·
PowerShell *> logs are UTF-16, iconv before grep · detached GLM wrapper may not
write its exit file, trust git log · kill next start by PID before restarting.
