# Task (Sol): Pass-124 homepage proposal, layout fix round + recapture

Written 2026-09-20 by the main session. You are Sol, executing. You decide nothing and write no copy.
Your workspace is `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, branch
`pass-124/home-proposal`, HEAD `1e794c2` (variant B). This branch is a PREVIEW and never merges.
You cannot commit here (LESSONS #18); leave your edits uncommitted, the main session commits.
Never push, never deploy, never bypass a hook, never touch any other worktree.

WHY: the main session reviewed the first captures and found three layout breaks caused by the brief:
(1) `.cw-principle` is a two-column grid (`auto 1fr`) built for the stage numeral, which was removed, so
the text fell into the narrow `auto` track; (2) `.cw-ord-grid` still lays out areas for the ORDANI photos
that were removed, leaving an empty block; (3) in variant B the $20M+ poster (`<RevenueFigure />`) still
renders above the receipts sentences, which render tiny. Also the closing arrow orphans onto its own line.

## Edits — EXACT. If one cannot be applied exactly, stop that edit and report it.

E1. Append to the END of `app/globals.css`, verbatim:
```css
/* Pass-124 PREVIEW ONLY (branch pass-124/home-proposal, never merges). The stage numerals left
 * the home, so each principle is one column; the one paragraph that matters most is set larger;
 * the ORDANI grid holds copy only once its photos are gone. */
[data-mode="cw"] .cw-principles--prose .cw-principle {
  grid-template-columns: 1fr;
}
[data-mode="cw"] .cw-prose-lede {
  font-family: var(--font-cw-body);
  font-weight: 400;
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.45;
  letter-spacing: normal;
  max-width: 46ch;
  margin: 0 0 18px;
  text-transform: none;
}
[data-mode="cw"] .cw-ord-grid--copy-only {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "copy";
}
@media (min-width: 1100px) {
  [data-mode="cw"] .cw-ord-grid--copy-only {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas: "copy";
  }
}
```
E2. `app/(foyer)/page.tsx`: `<ol className="cw-principles">` becomes `<ol className="cw-principles cw-principles--prose">`.
E3. Same file: the `<p className="cw-principle__text">` whose text begins "I find the buyer’s words" becomes
`<p className="cw-principle__text cw-prose-lede">`. No other principle paragraph changes.
E4. Same file: `<div className="cw-ord-grid">` becomes `<div className="cw-ord-grid cw-ord-grid--copy-only">`.
E5. Same file: inside `<a href="/call" className="cw-big-link" ...>`, the text `Make it sell →` becomes
`Make it sell` + one literal NO-BREAK SPACE character (U+00A0, not the entity) + `→`, so the arrow never
sits alone on a line.
E6 (variant B, the current HEAD): delete the line `<RevenueFigure />` that sits right after the sr-only
"The receipts." h3. On the paragraph right after it whose text begins "Four companies I worked inside",
change `className="cw-lede cw-reveal"` to `className="cw-prose-lede cw-reveal"`. Do NOT touch the
ORDANI paragraph, which also carries `cw-lede cw-reveal`.

## Gates (after E1-E6, and again after the A swap below)
Run package.json's `build` script by hand: each command before `next build`, then
`npx next build --webpack`, then each command after it. Report each command's exit code, checked
directly, never through a pipe. EXPECT all 0; copy-lint "Zero banned-word findings, zero schema
violations." with no `[em-dash-cap]` block. On failure: stop and report; do not fix.

## Capture B, then build A, capture A
Tooling (outside the repo, read-only): puppeteer-core and axe-core in `C:/tmp/p101tools`
(`createRequire('C:/tmp/p101tools/package.json')`), Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`. Pattern:
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/exec/capture-rec-123.mjs`.
Serve with `node node_modules/next/dist/bin/next start -p 3241`; stop it afterwards (find the real PID
with `Get-NetTCPConnection -LocalPort 3241`, then Stop-Process). Reduced motion emulated
(`prefers-reduced-motion: reduce`), full page, viewport widths 390 and 1440, `page.screenshot({fullPage:
true})`, never an element screenshot.
1. With E1-E6 applied, build, serve, capture `propB-390.png`, `propB-1440.png`.
2. Variant A: replace the whole receipts paragraph element (`<p className="cw-prose-lede cw-reveal">Four
   companies...</p>`) with exactly these two lines, then gates, build, serve, capture `propA-390.png`,
   `propA-1440.png`:
   ```
           <RevenueFigure />
           <ExitRecord />
   ```
   Leave the working tree in this A state.
3. Write everything to `.planning/qa/pass-124/home-v2/` in your workspace. `live-390.png` and
   `live-1440.png` are already there; do not recapture production.
4. Compose `sheet-390.png` and `sheet-1440.png` (Python PIL is available): three columns LIVE NOW /
   PROPOSAL A (receipts as locked) / PROPOSAL B (receipts in sentences), a header with the width. For the
   proposal columns, capture a SECOND annotated screenshot of each variant in which every element whose
   text is NEW carries a 3px #1d6fd8 outline and a small "NEW" label at its top-left, injected by
   page.evaluate at capture time only: the h1, `.cw-sub`, the sell door's headline and body, li 1's
   artifact and text and its "See the work" link, li 2's text, li 3's text, the `.cw-big-link`, and in B
   the receipts paragraph. The sheet uses the annotated shots; the clean `prop*.png` stay clean.

## Also report, do not fix
axe-core serious + critical counts for A and B at both widths. Anything that still renders oddly:
an empty block, a narrow column, an orphaned word, text overlapping text.

## Final message
Each edit E1-E6 and the A swap APPLIED or STOPPED with reason · every gate command with its exit code ·
the file list in home-v2 · axe counts · anything odd. Plain facts; a stopped step honestly reported is
correct.
