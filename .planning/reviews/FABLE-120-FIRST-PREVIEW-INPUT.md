# Pass-120 first preview: input for the judge (brief §1.4 return condition 1)

Written by the build session (Opus 5) on 2026-09-16 after the build and the served checks on
`http://localhost:3200`. Everything below is raw output or a pointer to it; classifications are the
build session's and are claims for the judge to check, not rulings.

## State

- Branch `design/live-evolve`, worktree p106-live. Code commits `6c564b4` (content, template, /work),
  `e015346` (claims sweep and gate), `96fc8f1` (verifier scripts), LESSONS #34 `a5aa491`.
- Seven writer legs, each passed by an independent verifier (all PASS). Main session: `tsc` exit 0,
  copy-lint clean, 45/46 static checks (`.planning/exec/static120.txt`), build 15/15 gates
  (`.planning/exec/build120.txt`).
- Media in `public/media` is built but NOT committed (two W1 checks below need a ruling).
- Served outputs: `.planning/qa/pass-120/build/*.txt`; summary `served120.txt`.

## Operator answers and rulings made during the build (all ledgered before any leg launched)

1. O16 release date: "ASAP WE ARE JUST hiding dates and years i worked stuff and keeping it in the
   hidden background for seo" -> publishedAt `2026-09-16` x5 plus the pre-push date check
   (LESSONS #3, RELEASE DAY).
2. DESIGN_BAR R3: on the bone ground ORDANI's sage fails body text (4.14:1), so ORDANI's paper links
   and step numerals are foyer ink; sage stays on the band rule, dashes and focus rings ("Ink text,
   sage accents (Recommended)").
3. DESIGN_BAR R3: the exhibit tint `--color-bone` measured 1.04:1 against the bone page; the exhibit
   sits on `--color-foyer-paper` #F5EFE4 ("Old lighter cream (Recommended)").

## Section 1 applications the build session made (for the judge to confirm or reverse)

- O5 path `/media/guardicore-band-960.jpg` fails §2.1's photo `src` regex (no subdirectory), so the
  regex admits `/media/`; the two schema comments that call publishedAt a first-commit date say
  release date (O1).
- O8 applied to the study footer as well as the body ("so the page ends on one ground").
- A4 in lh120-summary: L1 reported, not gated; L1b gates the build's median against production
  /work's median (2710ms, three runs before any edit, `.planning/exec/lh120-prod/`).

## Failures, raw, with the build session's classification

### A. Checks written before section 1 or today's rulings (page follows the ruling)
| Check | Raw | Why |
|---|---|---|
| template120 U2, U3 (x10 each) | paper and footer `rgb(236, 227, 208)`, want `rgb(245, 239, 228)` | O8 bone ground |
| template120 U17 (ordani x2) | numeral `rgb(26, 24, 22)`, want sage | R3 ruling 2 |
| template120 U12 (guardicore x2) | `/_next/image?url=/media/guardicore-band-960.jpg`, want `guardicore-telaviv-session` | O5 |
| page120 T12 (ordani x2) | 0 elements with sage `color` | R3 ruling 2 (sage now only on borders/pseudo-elements) |
| S5 V5 rawsome /llms.txt x4 | rows 25-28 wording absent | O4 supersedes rows 25-28 (the §2.7 lines render) |

### B. Checks that conflict with other parts of the brief or with this machine (page looks right)
| Check | Raw | Why |
|---|---|---|
| §2.8 V9 `/work` tenure regex | 1 hit: `© 2013–2026 Micah Jones` (PageFooter) | §5.1 keeps the copyright line on purpose |
| page120 T9 rfp-engine x2 | 1 figcaption | PullQuote's attribution `<figcaption>The client, name protected</figcaption>`, not a photo caption |
| claims120 K1 "Flexport" (every route, raw 2) | JSON-LD `alumniOf` | the phrase gate exempts that array (`retired-phrases-gate.mjs:78`) |
| claims120 K1 "back to home" (raw 1 every route; visible 1 on /services) | `app/(foyer)/services/page.tsx:493` "← Back to home" link, and `app/not-found.tsx:32` in every RSC payload | K1 meant the old case-study nav link |
| claims120 K4 rfp-engine, content-engine | lowercase `an award-winning ... corporations` / `a social activist` absent | the page renders them capitalised as the client line |
| §6.5 V6, V7 and card1-120 redirect lines | `308 ` (empty redirect_url) | header is `location: /work#record`; curl 8.11 leaves `%{redirect_url}` empty when the Location carries a fragment (`/work/akamai` without one prints it) |
| §3-4 C14 (x5) | `404 text/html` at `/work/<slug>/opengraph-image` | Next 16 serves `/work/<slug>/opengraph-image-oti546` (build route table; og:image meta points there) |
| template120 U21 (x10) | two 404s | `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` exist only on Vercel |
| template120 U0 (x5) | status 304 | the brief's exact script reloads with cache on (page120 disables it) |
| static X5 | `components/EditorialTimestamp.tsx:22 {month} {year}` | no importer; current calendar year, not tenure |
| W1a, W1b | `h264,...,98` / `vp9,720,900,98`, want 97 | O6's exact crossfade command outputs 98 frames (4.083s) |
| W1i bite | poster vs frame 96 `All:0.992844`, want < 0.98 | O6 makes the last frames return to frame 0; frame 48 reads 0.892, frame 0 0.9936 |
| prettier | `app/globals.css` fails `prettier --check` on 5 lines | the brief's own single-line forms (C10 greps one of them literally); DoD #7 |
| brief lines 4924, 5392 | `grep -iF` | aborts in Git Bash (LESSONS #34); s5-render.sh and card1-120 run a corrected form |

### C. Real defects on the page (need a ruling or a fix)
| Check | Raw | Note |
|---|---|---|
| page120 T6 guardicore + rfp-engine, both widths | mono prose: `cs-next__context` / `cs-band__context` "An award-winning author and leadership consultant ..." (13 words) | §3.6.1 sets the band context and Next context in mono; §3b already moved the same string to Hanken on /work for this reason |
| layout-gate (3 NEW) | `/work/ordani @768/@390/@360 word breaks as "HIPAA- / compliant"` in `span.cs-title__line` | title line 1 "ORDANI: HIPAA-compliant" |
| clip120 C6 no-JS 1440/390 | video rect changes (max channel diff 37 / 58) between 1s and 5s | with scripting off Chrome exposes native media controls on `<video>`; see `work-hero-nojs-*` captures |
| page120 T15 postmates, neuton @1440 | `#record top -0.3` (want 0-160) | W5 at 390 passes; no scroll-margin on `#record` |

### C2. Lighthouse, /work, simulated mobile (brief §6.6 with A4)
- Build (localhost:3200): LCP 3081 / 3085 / 3158ms, median 3085; FCP 1957; CLS 0 x3; score 92; LCP element
  `video.cw-wx-lead__clip` (the poster). `lh120-summary`: `INFO L1 3084.7`, `FAIL L1b: got 3084.7ms (want <= 2710.1ms)`,
  `PASS L2`. A4's one hard limit is L1b, so this is a stop.
- Production /work before any edit: LCP 2714 / 2635 / 2710, median 2710; FCP 1210.
- Observed (unthrottled) breakdown is the same shape: build TTFB 2, load delay 4, load 6, render delay 212ms;
  production 26, 14, 27, 199ms. The poster preload is one tag with `fetchPriority="high"`.
- Calibration on `/contact` (no Pass-120 source edit to the route; globals.css changed site-wide), same loop:
  localhost FCP 1957 x3, LCP 2925 / 2927 / 2929; production FCP 1214 / 1210 / 1211, LCP 2711 x3. So localhost
  carries a constant +747ms FCP and about +216ms LCP on a route this pass barely touched; /work's gap is
  +375ms. Files: `.planning/exec/lh120/`, `.planning/exec/lh120-prod/`, `.planning/exec/lh120-calib/`.

### C3. Arriving through the dim (brief §3 open item 2)
`node .planning/exec/dimsettle120.mjs` clicks the /work lead link at 1440 with motion on and records CDP
screencast frames: `.planning/qa/pass-120/build/dim/dim-<ms after click>.png` (61 frames, 57-2790ms). Seen by
the build session: `dim-0220` double-exposes the cream /work page over the dark study (both texts legible at
once); `dim-0346` shows title line 1 in place and line 2 not yet visible; `dim-0600` is the settled study.

### C4. OG images
Five 200 `image/png` at the hashed URLs (`.planning/qa/pass-120/build/C14-hashed.txt`), saved as
`.planning/qa/pass-120/template/og-<slug>.png`, not yet opened.

### D. Copy for the copy checkpoint (not visual)
- `app/layout.tsx` PERSON_LD and `app/llms.txt` are third person ("Four exits behind his work", "ships
  his own products") and brief rows 22-23 place "$20M+ in revenue behind my work" inside them.

## Passing (served)

settle120 0 · clipnav120 0 · W5 0 · axe 253 scans 0 serious/critical · type117 0 · circle115 0 ·
C15 · W3a-c · §2.8 V10 (`"datePublished":"2026-09-16"`).

## Stale prose outside O14 (L7 report)

`.claude/CLAUDE.md` "Stack" GSAP bullet and "What not to do" gsap line describe TitleCard as the GSAP
home; the two-modes lines still say studies are obsidian and paper is #F5EFE4.
