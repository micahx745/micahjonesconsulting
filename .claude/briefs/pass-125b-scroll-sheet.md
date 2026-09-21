# Brief: Pass-125b, rebuild + scroll sheets for the jurors (preview branch)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch
`preview/p125-full-time` at `98ead18`. Same standing rules as `.claude/briefs/pass-125-full-time.md` section 0: write
no non-ASCII, do not commit, never reinterpret an expected value, report mismatches verbatim and stop.
You change NO source file in this round. You only build, measure and capture.

## Why
The full-page captures of round 1 show every section on bone: the site's WorldSwitcher recolors the page per section
as you scroll, and a full-page screenshot freezes it at the top. The jurors and the owner must see the page as a
visitor does. Also the main session moved PageFooter's full-time link to its own row (it wrapped at 1440 and left a
separator dot hanging); that needs a fresh capture.

## Steps (expected output in brackets)
1. `npx next build --webpack` [exit 0].
2. `npx next start -p 3125` in the background.
3. Re-run `node .planning/qa/pass-125/measure.mjs` [same values as `measure.json` in the last commit; the one known
   difference from its own expectation is the 390 em-dash count of 1, which is the site-wide mobile "Menu" toggle in
   `components/color-worlds/Nav.tsx`; report it, do not change anything]. Overwrite `measure.json`.
4. Write `.planning/qa/pass-125/scroll-sheet.mjs` (puppeteer-core from `C:/tmp/p101tools`, Chrome, reduced motion ON,
   deviceScaleFactor 1). For each viewport, 390x844 and 1440x900, open `/full-time`, wait for `document.fonts.ready`,
   then take VIEWPORT (not full-page) screenshots at scrollY = 0, then every 0.8 x viewport height until the bottom of
   the page is in view (the last frame at max scroll). Before each shot: `window.scrollTo(0, y)`, then wait 700ms so
   the WorldSwitcher and the reveals settle. Save frames as `.planning/qa/pass-125/scroll/ft-<width>-<nn>.png`.
5. Compose one sheet per width: `.planning/qa/pass-125/sheets/full-time-scroll-390.png` and
   `...-1440.png`, the frames in order, each labelled with its width and scrollY, on a neutral grey page (model:
   `.planning/exec/compose-pass123-final-sheets.mjs`, the HTML-page-of-labelled-img-cells approach). For 390 put four
   frames per row; for 1440 two frames per row scaled to 50%.
6. Viewport captures of the fixed footer: `/about` scrolled to the bottom at 1440x900 and 390x844 ->
   `.planning/qa/pass-125/footer-about-1440-v2.png`, `footer-about-390-v2.png`; `/work` bottom at 1440x900 ->
   `footer-work-1440.png`. [The full-time link sits on its own line below the email / LinkedIn / copyright row, and
   no separator dot ends a line in the 1440 frames.]
7. Stop the server. `git status --short` [only new files under `.planning/qa/pass-125/`].

## Report back (plain text)
measure.json verbatim, the frame count per width, the sheet and capture file list with sizes, git status, and any
bracket that did not match, quoted verbatim.
