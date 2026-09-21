# Task (Sol): Pass-124 homepage, verify the real build before the ship gate

Written 2026-09-21 by the main session. You are Sol; you decide nothing and you edit NO source file.
Workspace `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, detached at `61db1d7`
(the approved homepage on `design/live-evolve`). You write only under `.planning/qa/pass-124/home-final/`
and `.planning/exec/card1-124-markers.sh` in your workspace. Never push, deploy, commit, bypass a hook, or
touch another worktree. Write NO non-ASCII character anywhere (LESSONS #46). A "?" or U+FFFD inside a word
in any capture is a defect: report it.

## 1. Gates
Every command of package.json's `build` script, by hand, in order (it now includes
`node scripts/mojibake-gate.mjs --self-test` and `node scripts/mojibake-gate.mjs`), with
`npx next build --webpack` for the Next build. Exit codes checked directly. EXPECT all 0.

## 2. Captures (home)
Serve on 3241. Reduced motion, full page, 390 and 1440, never an element screenshot. BEFORE = production
`https://www.micahjonesconsulting.com/`; AFTER = `http://localhost:3241/`. Write clean `before-{390,1440}.png`,
`after-{390,1440}.png`, and compose `sheet-{390,1440}.png` (two columns, BEFORE | AFTER, header with the width)
with the `home-v4/compose-sheets.mjs` pattern, into `.planning/qa/pass-124/home-final/`.

## 3. Rendered text (AFTER, 1440, `document.body.innerText`, compare case-insensitively, whitespace collapsed)
PRESENT, each exactly once or more: "It works." · "It just does not sell." · "I shape the product and build the
message that sells it." · "I have $20M+ in revenue behind my work." · "An agency is too broad. A hire is too
early." · "I build what your growing business needs next" · "How I work." · "Week one is an audit and a scope." ·
"I name the trade-offs before I build." · "I build the real thing, not a prototype." · "I stay for launch and
what customers" · "See the work" · "In revenue behind my work" · "Four exits I worked inside" · "Name the problem".
ABSENT: "I take AI-built" · "demo to production" · "Too big for duct tape" · "Operating principles" · "The story
comes first" · "I step in as the operator" · "Make it sell" · "Labor support" · "Bodywork". And the regex
`[A-Za-z][?\uFFFD][a-z]`: EXPECT no match. Report every string with its count.

## 4. Measure (AFTER; report, do not fix)
- axe-core serious + critical at 390 and 1440 (tooling in `C:/tmp/p101tools`).
- Lab layout shift after load at 1440 and 390 (PerformanceObserver `layout-shift`, include entries with
  hadRecentInput, per LESSONS #29), and which elements shifted. Baseline noted in the kickoff: 0.0045 at 1440
  on `h1.cw-h1` / `p.cw-sub`.
- Largest contentful paint element and time at 390 with 4x CPU throttling (lab only; field data decides).
- The gap from the bottom of the Audit card to the top of "How I work." at 390 and 1440.

## 5. Ship-check markers
Write `.planning/exec/card1-124-markers.sh`: a bash fragment in the style of the `cnt`/`chk` lines in
`../p106-live/.planning/exec/card1-123.sh` (read it), ASCII only, asserting on `$HV` (the served home's
visible text): the PRESENT strings above as `>=1` and the ABSENT strings as `0`. Leave out any string that
contains a non-ASCII character. Prove it both ways: run the same assertions against the AFTER innerText
(EXPECT all pass) and against production's innerText (EXPECT the new PRESENT strings to fail there, since
production still carries the old copy), and report both tallies.

## Final message
Gate exit codes · the rendered-text table with counts · axe counts · layout shift with the shifting elements ·
LCP element and time · the Audit gap · the marker file and both bite tallies · the home-final file list ·
anything odd. Plain facts.
