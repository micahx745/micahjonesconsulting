# Brief: screenshot sheets of the live site for the Opus 5.5 web-chat review (Brief-Format: v2)

Executor: GLM 5.3 via `scripts/claude-glm.ps1 -Batch`, in the p106-live worktree. Capture and image assembly only.

## Ruling
Operator 2026-09-22, verbatim: "i want to have the new opus model do more research and give its feedback on our
wording on everything on the site", then "also visual designs", then "so this is running on chat on the web app". A
web chat cannot load the site's visuals, so it gets one screenshot sheet per page per width of the LIVE site.
Nothing in the site's source changes.

## Files
Write only these, all under `.planning/qa/opus55-pack/`:
- `.planning/qa/opus55-pack/capture.mjs`
- `.planning/qa/opus55-pack/make_sheets.py`
- `.planning/qa/opus55-pack/manifest.json`
- `.planning/qa/opus55-pack/frames/` (the raw viewport PNGs)
- `.planning/qa/opus55-pack/sheets/` (the sheets)
- `.planning/qa/opus55-pack/DIGEST.md`

## Pre-flight (run by the main session on 2026-09-22; rerun the first three in your shell before step 1)
- `node --version` -> `v22.20.0`
- `python -c "import PIL; print(PIL.__version__)"` -> `12.2.0`
- `node scripts/harness/visual-qa.mjs --selftest`, with `PLAYWRIGHT_PATH` set to
  `C:/Users/micah/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright` -> a line `playwright: found`
- curl status of each of the 12 routes below on www.micahjonesconsulting.com (main session only) -> `200` for all 12

## Steps
1. Write `capture.mjs` (Node 22 ESM). Load chromium the way `scripts/harness/visual-qa.mjs` does in
   `loadChromium()`: import `index.js` from `process.env.PLAYWRIGHT_PATH`. Base URL
   `https://www.micahjonesconsulting.com`. Routes, in this order: `/`, `/about`, `/work`, `/services`, `/packages`,
   `/contact`, `/call`, `/work/guardicore`, `/work/rfp-engine`, `/work/ordani`, `/work/content-engine`,
   `/work/birth-worker`. Slug: `home` for `/`, otherwise the route without its leading slash, other slashes turned
   into dashes. Two widths: phone = viewport 390x844, `isMobile: true`, `hasTouch: true`; desktop = viewport
   1440x900. Both at `deviceScaleFactor: 1` and `reducedMotion: 'reduce'`. For each route and width: `goto` with
   `waitUntil: 'networkidle'` and a 60 s timeout; wait 1500 ms; read `document.documentElement.scrollHeight` (H) and
   the viewport height (V); take frames at y = 0, V, 2V, ... while y < H - V, then one last frame at y = H - V; at
   most 30 frames. Before each frame: `window.scrollTo(0, y)`, wait 400 ms, then a VIEWPORT screenshot (never
   `fullPage`) to `frames/<slug>-<390|1440>-<NN>.png`, NN two digits from 01. Write `manifest.json`: a JSON list,
   one object per route and width, with exactly the keys `route`, `slug`, `width`, `status`, `H`, `V`, `frames`.
2. Run it: `node .planning/qa/opus55-pack/capture.mjs` with `PLAYWRIGHT_PATH` set as in Pre-flight.
3. Write `make_sheets.py` (Pillow). One sheet per route per width, named `sheets/<RR>-<slug>-<phone|desktop>.png`,
   RR = the route's two-digit order from 01 to 12. Phone frames scaled to 260 px wide, 6 per row; desktop frames
   scaled to 470 px wide, 4 per row; aspect kept; 12 px gutters; white background. A 40 px strip at the top reads
   `<route> | <phone 390 px|desktop 1440 px> | frames 1-N, left to right, top to bottom | reduced motion`, black,
   `ImageFont.load_default(size=18)`. Each frame carries its number in a small black box with white text at its
   top-left corner. Save PNG with `optimize=True`; if one exceeds 4.5 MB, save it as JPEG quality 85 instead and
   say so in the digest.
4. Run it, then write `DIGEST.md`.

## Verification
```
ls .planning/qa/opus55-pack/sheets | wc -l
python -c "import json; m=json.load(open('.planning/qa/opus55-pack/manifest.json')); print(len(m), sorted({e['status'] for e in m}), min(e['frames'] for e in m))"
find .planning/qa/opus55-pack/frames -name "*.png" -size -5k
git status --short --untracked-files=no
```
Expected: `24` sheets.
Expected: the manifest line prints `24 [200]` and a minimum frame count of at least 1.
Expected: the find prints nothing (no frame under 5 KB, the blank-frame sign); list any it prints.
Expected: `git status --short --untracked-files=no` prints nothing (no tracked file changed).

## Rejected
- Editing `scripts/harness/visual-qa.mjs` or any file outside `.planning/qa/opus55-pack/`.
- `fullPage` screenshots: the Color Worlds page recolours its sections on scroll.
- Normal motion: headings fade in over 0.55 s and would be caught half-drawn.
- Capturing localhost, port 3126, or any preview deployment. The live domain only.
- Installing anything, committing, or reinterpreting an expected value.

## Digest
`DIGEST.md`, 8 KB at most: the pre-flight outputs as printed; a table of route, width, status, H, frames; the 24
sheet names with sizes in KB; every error or warning printed; the Verification results with the exact outputs.

## Return conditions
Stop and report, changing nothing further, if: a pre-flight value differs, Playwright does not launch, any route is
not `200`, or any count differs from its Expected value. Otherwise return when DIGEST.md is written.
