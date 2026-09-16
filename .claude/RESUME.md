# RESUME — micahjonesconsulting (2026-09-16)

## READ FIRST
LIVE evolves on `design/live-evolve` (worktree p106-live). Build =
`bash .planning/exec/build120.sh` (§6.1 gates, then next build --webpack).
ChatGPT EMPTY till 2026-09-19 12:17; Fable stands in for Astra, one look
per gate. Main session builds (detached executors hang at next build).

## LIVE: main = c2ffb36, dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23 BOTH domains
Revert: promote dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC. He must PULL main checkout.

## NOW: Pass-120 BUILD. base 73dde08. Code 6c564b4 e015346 96fc8f1
- Writers+verifiers all PASS (wf_50be51a6-dbe). tsc 0; static 45/46
  (X5: dead components/EditorialTimestamp.tsx, for ruling).
- build120: 15/15 PASS (render-gate 14 routes). Server :3200 up.
- IN FLIGHT: served120.sh -> .planning/qa/pass-120/build/. Then 6.6
  Lighthouse (prod /work baseline median 2710ms, A4), 6.7 shots, CAPTURES.md,
  ONE Fable first-preview look, report to Micah. STOP there.
- O16 SHIP CHECK: publishedAt "2026-09-16" x5 must equal deploy day.
- HOLD FOR RULING (report at first preview): media uncommitted (W1a/b 98
  frames want 97; W1i bite 0.9928 want <0.98, O6 made last=first; frame
  48 = 0.892); X5; prettier fails globals.css on 5 brief single-lines
  (DoD #7 vs C10); JSON-LD + llms.txt third person but "behind my work"
  (rows 22-23); brief grep -iF lines 4924/5392 (LESSONS #34, fixed in
  s5-render.sh); CLAUDE.md GSAP + two-mode lines stale (outside O14);
  K1 may trip on "Flexport" (gate-exempt alumniOf).

## Waiting on operator
Release push words · the rulings above · Ordani screens · Stripe
playbook-99 off · 500 dollar test · A4/S3 · §9a · colleague okay for the
clip (his) · Speed Insights p75 (/, /services; /work after release).

## Traps
LEDGER EVERY ANSWER BEFORE A LEG LAUNCHES (#32) · retired figures in every
spelling (#33) · no grep -iF (#34) · push to main deploys · pathspec
commits (#23) · never reinterpret an expect (#25) · measure the render
(#26) · hooks read MAIN brand.json (#31) · never build while serving ·
MSYS_NO_PATHCONV=1 · long scripts go in files.
