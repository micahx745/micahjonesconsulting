You are the executor for Pass-121 STAGE B (the drawing system) on micahjonesconsulting.com, in the git
worktree C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W), branch `design/live-evolve`.
Stage A is committed. Do not start Stage C or any later stage. Stage B mounts nothing on any page.

Read first, in W: `AGENTS.md`; `.claude/briefs/pass-121-work-and-studies.md` sections 2.3 (the exact
drawing strings), 3.2 (the drawings), 3.3 ("Hand marks" and "The circle" only), 5 (opening paragraphs,
standing clauses, "Stage B"); `.planning/reviews/FABLE-121-G3.md` R5, R6, R14 and N7 (the new geometry);
`.planning/mock/pass-121/set/gen-set.mjs` lines 29 to 133 (the hand math) and the drawing functions
`flowMarkup`, `visibilityMarkup`, `claimsMarkup`, `figureMoveMarkup`, `bracketSvg`, `underlineSvg`
(the proven geometry, after fix round 2); `components/hand/HandCircle.tsx`.

## Build

1. `lib/hand/rng.ts` and `lib/hand/stroke.ts`: `mulberry32`, `catmull`, `handStroke`, `boxSides`,
   `arrowParts` ported to TypeScript with the SAME math and constants as `gen-set.mjs`. Pure functions,
   no randomness except the seeded PRNG.
2. `lib/hand/exhibits/`: one pure geometry module per drawing returning path data and label positions,
   using the mock's seeds so the site draws the mock's paths. New geometry the mock does not have, built
   exactly to the rulings: the two figure-move drawings as two rows (row boxes 42 percent of the drawing's
   width each, arrow 16 percent; unit line beneath row 1; row 1's arrow is the accent; no `+` tag; the
   birth worker's row 2 `the same service` to `the full arc of care`), G3 R6; ORDANI's stacked 390 variant
   (head, two boxes, head, two boxes, boxes full width, height cap 300 at 358 wide), G3 R14; the
   visibility diagram's north-south arrows at the left frame's top centre with `north-south, defended`
   centred 8px above their tips, G3 R5. The visibility diagram keeps its wide and stacked variants.
3. `components/exhibits/`: server components (no `"use client"`), e.g. `ExhibitFlow`,
   `ExhibitVisibility`, `ExhibitClaims`, `ExhibitFigureMove`, taking a `variant` for the stacked 390
   drawings. Every string comes from `content/exhibits/<slug>.ts`; nothing is typed into a component.
   SVG text carries a class, `exh-label` (JetBrains Mono) or `exh-sent` (Hanken, ORDANI's four sentences
   only), and NO font-size attribute: sizes per placement are set in Stages C and D. Strokes use
   `currentColor`; the accent strokes use `stroke: var(--cs-accent, var(--color-accent-copper))` and are
   drawn as two offset passes with classes `hl`, `p1`, `p2`. Both passes render by default (the studies'
   emphasis); hiding `p2` at rest on /work belongs to Stages C and E, not here.
4. `content/exhibits/{rfp-engine,guardicore,ordani,content-engine,birth-worker}.ts`: the strings of brief
   section 2.3, copied character for character.
5. `components/hand/HandCircle.tsx`: add `export` to the `PATHS` const and change nothing else.
   `components/hand/HandCircleStatic.tsx`: a server component rendering `PATHS` variant 3 per brief 3.3
   "The circle" (viewBox, preserveAspectRatio, grain filter, the JSON's placement ratios, the loop 2px and
   overshoot 0.85 of it, `vector-effect: non-scaling-stroke`).
6. `app/globals.css`: ONE appended block, fenced by `/* Pass-121 Stage B: exhibits base */` and
   `/* end Pass-121 Stage B */`, holding only the base exhibit rules: `.cs-exhibit` modifiers `--flow`,
   `--compare`, `--figure`, `--vis`; `vector-effect: non-scaling-stroke` with `stroke-width: 2px` (1.5px
   under `max-width: 767px`); no fills; the two text classes' font families. No font sizes, no layout.
7. `scripts/exhibit-facts-gate.mjs` with `--self-test`, per brief B2 and 2.3's match rule (the MDX or the
   LESSONS #3 section only, from its `## #3` heading to the `## #4` heading). Wire it and its self-test into
   `package.json` `build` right after the retired-phrases gate.

## Checks (command | expect | got | PASS/FAIL, verbatim)

- B1 `pnpm exec tsc --noEmit; echo EXIT=$?` expect `EXIT=0`.
- B2 `node scripts/exhibit-facts-gate.mjs --self-test; echo EXIT=$?` expect `EXIT=0`, the self-test
  planting one invented label (must miss) and one string found only in LESSONS #37's prose (must miss);
  then `node scripts/exhibit-facts-gate.mjs; echo EXIT=$?` expect `EXIT=0`. A miss on the real tree is a
  STOP: report the strings, commit nothing, never reword.
- B3 `.planning/exec/exhibits-check.tsx`, run with `pnpm exec tsx`: renders all seven drawings (five, plus
  the two stacked variants) twice with `renderToStaticMarkup`; expect `identical=7/7`.
- B4 the same script writes `.planning/qa/pass-121/stageB/exhibits.html`: every drawing at the /work index
  placement (rendered 400 wide on `#f5efe4`, labels at 12px and ORDANI sentences at 13px via the brief's
  formula, set inline on the preview page only), the stacked variants at 358 wide, and the RFP flow on the
  band (560 wide, `#12100e`, text `#ece3d0`). Capture it at 1440, deviceScaleFactor 2, with
  `puppeteer-core` loaded the way `.planning/mock/pass-121/proof/capture-proof.mjs` loads it, to
  `.planning/qa/pass-121/stageB/exhibits-1440.png`. Open the PNG and say in one line per drawing what you see.
- B5 on that preview page, per label, both axes, no own-box exemption (G3 N7): the label's ink box
  (`getBBox()` mapped through `getScreenCTM()`) sits inside its viewBox with 8px on every side, at least
  8px from its own box's strokes, and crosses no stroke. Expect `overlaps=0 clipped=0 padding_min>=8`.
  Run it once against a planted label moved onto its box's edge first, and show it fails.
- B6 on the preview page, the computed `stroke` of one accent path on paper: expect `rgb(189, 90, 45)`.
- B7 `pnpm build; echo EXIT=$?` expect `EXIT=0` (the new gate now runs in it).

## Rules

A result that differs from its expected value is a failure. Never edit the work to make a check pass
(LESSONS #37), never reinterpret an expected value (#25), never `grep -i` with `-F` (#34). If a check cannot
pass, stop before committing and report the raw output. No push, no deploy, no dev server.

## Commit

One commit, `Pass-121: Stage B, the drawing system`, with an explicit pathspec of exactly the files you
created or changed (`git commit -m "..." -- <paths>`; never `git add -A`), ending
`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

## Report, under 40 lines

B1 to B7 as `command | expect | got | PASS/FAIL`; one line per drawing from the opened capture; the commit
hash and file list; anything you could not do, named plainly.
