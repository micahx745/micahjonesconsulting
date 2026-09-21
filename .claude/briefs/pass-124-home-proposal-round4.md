# Task (Sol): Pass-124 homepage proposal, round 4 (Astra FIX FIRST)

Written 2026-09-20 by the main session. You are Sol, executing; you decide nothing. Workspace
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, branch `pass-124/home-proposal`,
HEAD `30c88d7` (variant A v3, working tree clean). Preview only, never merges. You cannot commit here;
leave edits uncommitted. Never push, deploy, bypass a hook, or touch another worktree.

Astra's review (`../p106-live/.planning/reviews/ASTRA-124-HOME.md`) blocked on three items. Fix exactly
these. Every target below is MEASURED; report the before and after numbers.

## E1. Hero widow — `components/color-worlds/Hero.tsx`
In the `.cw-sub` paragraph, the space between "I" and "build" in "I build what sells." becomes one literal
NO-BREAK SPACE (U+00A0). No other character changes.

## E2. How I work reads as one block — append to the END of `app/globals.css`
```css
/* Pass-124 PREVIEW round 4 (Astra): How I work reads as one continuous block; the supporting
 * paragraphs sit at a readable size on the lede's measure; no full-width dividers. */
[data-mode="cw"] .cw-principles--prose .cw-principle {
  border-bottom: 0;
  padding: 0 0 20px;
}
[data-mode="cw"] .cw-principles--prose .cw-principle:not(:first-child) .cw-principle__text {
  font-size: clamp(18px, 1.6vw, 21px);
  line-height: 1.5;
  max-width: 46ch;
}
```

## E3. Halve the gap after the Audit
MEASURE at 390 and 1440 (reduced motion, after load): the vertical distance from the bottom edge of the
Audit card (`#offer` section's package card) to the top edge of the text "The story comes first.". Then add,
at the end of `app/globals.css`, ONE override of the `padding-top` of the `<section>` that contains
`.cw-principles--prose` (select it with `section:has(.cw-principles--prose)` under `[data-mode="cw"]`),
written as `calc(<that section's currently declared padding-top expression> / 2)` or an equivalent
expression, so the measured gap becomes 45-60% of its current value at BOTH widths. If you cannot reach that
range with the section's own padding-top alone, stop E3 and report the numbers.

## E4. Doors at phone width: link directly under its copy
Read the `.cw-door` rules. Inside `@media (max-width: 760px)` only, appended at the end of `app/globals.css`,
override whatever pushes each door's link to the bottom of its panel (a `margin-top: auto`, a `min-height`
or fixed `height`, a `justify-content: space-between`) so each panel is sized by its content and its link
sits 20-32px below the last paragraph above it. MEASURE at 390 for BOTH doors, before and after: the gap
from the bottom of the last body paragraph to the top of the link. Target: 20-32px in both. Do not change
anything at 761px and wider; confirm the 1440 capture of the doors is pixel-identical to v3.

## Gates, then capture A
Every command of package.json's `build` script by hand (`npx next build --webpack` for the Next build),
exit codes checked directly. EXPECT all 0. Serve on 3241 and capture A clean and annotated at 390 and 1440
with `.planning/qa/pass-124/home-v3/capture-home-v2.mjs`, writing to `.planning/qa/pass-124/home-v4/`.

## E5. Variant B, then capture B
Replace exactly these two lines
```
        <RevenueFigure />
        <ExitRecord />
```
with this element (literal ’, no entities):
```
        <p className="cw-prose-lede cw-reveal">
          Four companies I worked inside reached an exit. Uber bought Postmates
          for $2.65B. SurveyMonkey went public at a $2.33B first-day value.
          Akamai bought Guardicore for $600M. Nordic Semiconductor acquired
          Neuton.AI’s technology.
        </p>
```
Gates again, serve, capture B clean and annotated at 390 and 1440 into `home-v4/`. Leave the tree in B.

## Sheets and axe
Copy `live-390.png` and `live-1440.png` into `home-v4/` from `home-v3/`. Compose `sheet-390.png` and
`sheet-1440.png` with `compose-sheets.mjs` (same three columns, same NEW outlines; the receipts paragraph in
B is NEW). axe-core serious + critical for A and B at both widths.

## Final message
E1-E5 APPLIED or STOPPED with reason · the E3 and E4 before/after measurements · every gate command with
its exit code · the home-v4 file list · axe counts · anything that still renders oddly. Plain facts.
