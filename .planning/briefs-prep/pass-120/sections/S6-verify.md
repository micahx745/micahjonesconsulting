## 6. Verification

Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Every command runs from the worktree root in Git Bash unless it says
PowerShell. Every line an executor prints as a result is `PASS <id>: got <x>` or
`FAIL <id>: got <x> (want <y>)`, and every script ends on `<name> failures: N` and exits 1 when N
is not 0.

### 6.0 Standing clauses (copied from `.claude/briefs/README.md`, they bind every check below)

1. **Count what renders.** An `expect 0` may grep raw served HTML. An expected count of 1 or more
   counts visible text (`document.body.innerText` in the browser, whitespace collapsed to single
   spaces), or asserts `-ge 1` on raw HTML with `<!-- -->` stripped first. A raw
   `curl | grep -c` also counts the RSC flight payload, so an exact count never uses raw HTML.
2. **The executor never reinterprets an expected value.** A `got` that differs from its `want`
   is a failure. If the executor believes a number in this section is wrong, it stops before the
   commit and reports the raw output and its reason. The judge rules.
3. **Measure the render, not the model.** Motion and media checks read painted pixels and
   bounding boxes, not component props. Every new script in 6.3 is run once against production
   before any Pass-120 edit and must FAIL there (the bite proof).
4. **Scope from the layout, look at the capture.** In both route groups the nav is a sibling of
   `main`, not inside it: `app/(foyer)/layout.tsx:40` `<Nav />` then `:46`
   `<main id="main-content">`; `app/(theater)/layout.tsx:38` `<Nav />`, `:39` `<main>`, `:42`
   `<Footer />`. `/work` and `/about` mount `PageFooter` (root class `.cw-pagefoot`) INSIDE `main`
   (`app/(foyer)/work/page.tsx:190`, `app/(foyer)/about/page.tsx:225`). So: type-ladder, mono,
   uppercase, sticky, caption and link checks scope to `main` minus `.cw-pagefoot`; string sweeps
   and tenure-year checks scope to the whole `document.body`. Each capture is opened once before
   it counts as evidence, and its name matches what it frames.

Slugs used throughout: `guardicore`, `rfp-engine`, `ordani`, `content-engine`, `birth-worker`.
`STUDIES` means those five routes under `/work/`. The birth-worker slug is fixed here as
`birth-worker` (file `content/work/birth-worker.mdx`); if another section of this brief names a
different slug, the executor stops and reports (clause 2).

### 6.1 Build order and every gate that runs

The build is run as the steps of `package.json:6` one at a time, so the webpack flag the RESUME
requires ("Build `npx next build --webpack`") applies and each gate's output is captured. Run the
build in the foreground or with the Bash tool's background mode and wait for its notification;
never as a detached process (RESUME: "Detached executors hang at next build"). Log everything to
`.planning/exec/gates120.log`.

| # | Command | Expected output (exact) |
|---|---|---|
| G1 | `node_modules/.bin/tsx lib/copy-lint-cli.ts` | `[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.` exit 0 |
| G2 | `node scripts/vendor-gate.mjs` | `vendor-gate: clean` exit 0 |
| G3 | `node scripts/retired-phrases-gate.mjs --self-test` | `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed` exit 0 (was 36 and 23; the value is section 5.6 V1's, because section 5.5 is the one edit to this file, 6.2 E2; if the assembler folds E2's four extra phrases into 5.5, both this line and 5.6 V1 read `70 planted caught, 32 near misses passed`) |
| G4 | `node scripts/retired-phrases-gate.mjs` | `retired-phrases-gate: clean` exit 0 |
| G5 | `node scripts/accent-states-lint.mjs --self-test` | `accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms` exit 0 |
| G6 | `node scripts/accent-states-lint.mjs` | `accent-states-lint: clean` exit 0 |
| G7 | `node scripts/gsap-quarantine-gate.mjs --self-test` | `gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean` exit 0 |
| G8 | `node scripts/gsap-quarantine-gate.mjs` | one line matching `^gsap-quarantine-gate: clean \([0-9]+ files\)$` exit 0 |
| G9 | `npx next build --webpack` | exit 0 |
| G10 | `node scripts/render-gate.mjs` | one line matching `^render-gate: [0-9]+ routes — links resolve, fragments exist, metadata within limits\.$` exit 0 (must run after G9; `scripts/render-gate.mjs:70-75` exits 1 without `.next/server/app`) |
| G11 | `npx tsc --noEmit` | no output, exit 0 (after G9, as Pass-117 ran it) |
| G12 | `node -e 'console.log(require("fs").readdirSync(".next/server/app/work").filter(f=>f.endsWith(".html")).sort().join(" "))'` | `birth-worker.html content-engine.html guardicore.html ordani.html rfp-engine.html` |
| G13 | `node scripts/layout-gate.mjs --self-test` | `layout-gate self-test: 7 planted defects caught, 8 near misses clean` exit 0 |
| G14 | `node scripts/ordani-claims-gate.mjs > .planning/exec/ordani120.txt; grep -c -e "^ordani-claims-gate: app" -e "^ordani-claims-gate: components" -e "^ordani-claims-gate: content" .planning/exec/ordani120.txt` | `0` (the gate itself exits 1 today; that exit is expected, see G15) |
| G15 | `grep -c "product.playbook.src" .planning/exec/ordani120.txt` | `10` (the pre-existing book findings in `gates.md` §2.9; not wired into build, not a Pass-120 regression; any other count is a failure) |

Then start the server for 6.5: `npx next start --port 3200 > .planning/exec/server120.log 2>&1`
in the Bash tool's background mode. Ready when
`curl -s -o /dev/null -w '%{http_code}' http://localhost:3200/work` prints `200`. Every served
check in 6.5 and 6.6 runs against this one server. Stop it after 6.7.

### 6.2 Existing gates that fail on this pass as designed, and their edits (same commit as the pass)

**E1. `scripts/layout-gate.mjs:71-73` default routes.** Today:
`["/", "/services", "/packages", "/work", "/work/postmates", "/work/neuton"]`. After the pass the
last two 308 away and the five studies are never checked. Replace the array literal with exactly:

```js
  : ["/", "/services", "/packages", "/work", "/work/guardicore", "/work/rfp-engine", "/work/ordani", "/work/content-engine", "/work/birth-worker"];
```

Expected after the edit, served: `node scripts/layout-gate.mjs http://localhost:3200` last line
matches `^layout-gate: [0-9]+ page loads across 9 routes, 0 finding\(s\), 0 not in KNOWN$`, exit 0.

**E2. `scripts/retired-phrases-gate.mjs`: owned by section 5.5, not edited here.** One writer
per file. Section 5.5 makes every edit to this file (SCOPE comment, `ROOTS` gains `components`,
the Pass-120 `PHRASES`, `stripComments`, the new near misses), and this section adds nothing to
it: the executor applies 5.5 once and never a second PHRASES or ROOTS edit from here. G3's
expected line is 5.6 V1's (`70 planted caught, 32 near misses passed`, measured today as `36
planted caught, 23 near misses passed` with 25 phrases).

Reconciliation for the assembler, before execution (not an executor step). 5.5 Edit 3 already
covers, in the same or a broader spelling, every phrase this section proposed except four:
`"fourteen practitioners"`, `"six had referred"`, `"22 birth workers"` (all three live today in
`content/work/ordani.mdx:47,56,57`, retired by the ORDANI no-counts ruling) and `"sales manager"`
(Guardicore carries no job title; 0 live hits on 2026-09-16). If the assembler adds those four to
5.5 Edit 3, it changes 5.6 V1 and G3 together to `70 planted caught, 32 near misses passed` and
re-counts 5.6 V2's base-tree finding total (the three ORDANI lines add findings there). If it does
not, both lines stay at 66. The executor never edits either count to match what it sees
(clause 2); a mismatch stops the run. If G4 reports a `components/` finding, the executor stops and
reports it; it never removes `components` from ROOTS to pass.

**E3. `.planning/exec/card1-115.sh` is retired, not edited.** It asserts 200 on
`/work/postmates` and `/work/neuton` (`:24`), and markers that live only on those pages
(`:29-31, :34`); every one fails once they 308. Its `BASE_DPL` (`:4`,
`dpl_BfViKgzf8bHDU5AwneqWDpsTUDLz`) is also stale: RESUME records production on
`dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23`. Leave the file as history and write
`.planning/exec/card1-120.sh` (spec in 6.3 V5).

**E4. `.planning/exec/circle115.mjs` C13 (`runC13`, `:455-576`).** The home page changes in this
pass (ledger rows, the $20M label), so circle115 runs, and C13 loads `/work/postmates` (`:500`),
clicks `a.case-study__nav-link[href="/"]` (`:506`, the "back to home" link the new template
removes) and waits for `/work/postmates` on Back (`:536`). Edits:
- `:500` `${S}/work/postmates` becomes `${S}/work/guardicore`.
- `:536` `location.pathname === "/work/postmates"` becomes `location.pathname === "/work/guardicore"`.
- `:506` `await page.click('a.case-study__nav-link[href="/"]');` becomes
  ```js
  await page.evaluate(() => {
    const go = () => window.next.router.push("/");
    if ("startViewTransition" in document) document.startViewTransition(go);
    else go();
  });
  ```
  This is the same call `components/view-transition-link.tsx` makes on click, issued through the
  public App Router instance that this Next version assigns to `window.next.router`
  (`node_modules/next/dist/client/components/app-router-instance.js:387-388`). It keeps C13 a
  client navigation inside one document, which the header's plain `<a href="/">`
  (`components/color-worlds/Nav.tsx:191`) cannot be.

Expected: `node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-120/circle` last line
`circle failures: 0`.

**No edit, expected to pass unchanged:**
- `.planning/exec/type117.mjs` is scoped to `/services` only (`:44`), and its pins (`EXPECT`, T7's
  Guardicore proof line) are not touched by any Pass-120 ruling. The `/services` receipt edits
  change strings, not roles. Expected `type117 failures: 0`. If it fails, stop and report; the
  pins are not edited in this pass. (The request that framed this section listed "type117 pins" as
  failing by design; the repo does not support that, and the repo wins.)
- `scripts/axe-worlds.mjs`: default routes (`:79`) exclude `/work` and every study; no edit, the
  routes are passed on the command line (6.5 V8).
- `scripts/render-gate.mjs`: redirect sources are read live from `next.config.ts`
  (`:109-115`), so the two new entries need no script edit.
- `scripts/gsap-quarantine-gate.mjs`: no edit while the settle stays in
  `components/TitleCard.tsx`. If another section of this brief moves GSAP into a new file, that
  section names the ALLOWLIST line; this section adds none.
- Not re-run, not edited, stale after this pass (history only): `.planning/exec/capture-113.mjs`,
  `capture116.mjs`, `decompose-113.mjs`, `shots111a.mjs`.

### 6.3 New verifier scripts (written from this section before the build; the executor does not change them)

All use puppeteer-core from `C:/tmp/p101tools` (`createRequire("C:/tmp/p101tools/package.json")`)
and Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`, as `type117.mjs:13-14`
does. Viewports: `1440` = 1440x900, deviceScaleFactor 1, not mobile; `390` = 390x844,
deviceScaleFactor 2, isMobile, hasTouch (the `axe-worlds.mjs:94-110` pair). Base URL is the first
positional argument, default `http://localhost:3200`. Each page waits for `networkidle0` (timeout
60000), then `document.fonts.ready`, then 1500ms, unless the check says otherwise. "Reduced" means
`emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}])`; "motion" means
`no-preference`. "Visible" means rect width > 2 and height > 2, computed `visibility` not
`hidden`, `display` not `none`, and no ancestor matching `.sr-only, .cw-sr-only, [hidden],
.skip-to-content, [role="dialog"]`. "Own text" is the element's direct text nodes joined and
whitespace-collapsed. "Effective background luminance" of an element is the relative luminance
(WCAG formula) of the first ancestor-or-self whose computed `background-color` has alpha > 0.

**V1 `.planning/exec/claims120.mjs`** (strings). Routes:
`/ /about /services /packages /contact /call /work` + STUDIES + `/llms.txt` + `/sitemap.xml`.
For each route: `fetch` the raw body; for HTML routes also load it at 1440, reduced, and read
`document.body.innerText` (collapsed). For `/llms.txt` and `/sitemap.xml` the raw body is the
visible text.

- **K1 retired, every route, expect 0 each.** Every string in the `PHRASES` array of
  `scripts/retired-phrases-gate.mjs`, read from that file at run time (regex
  `/const PHRASES = \[([\s\S]*?)\n\];/`, then each `"..."` literal), matched case-insensitively
  against the visible text. Phrases of 8 or more characters are also matched against the raw body;
  shorter ones (`36x`, `290K`, the five-letter vendor name) can occur inside base64 and hashes in raw
  HTML, so they are matched on visible text only. Plus, visible text only: `/\b8K\b/`,
  `/\bRLS\b/` (case-sensitive), and on `/work/ordani` the vendor regex
  `/\b(Supabase|Vercel|Next\.js|Postgres(?:QL)?|Twilio|Resend|Neon|Expo|Railway|Firebase|PlanetScale|Cloudflare|AWS|GCP|Azure)\b/`
  (copied from `scripts/vendor-gate.mjs:21-22`) and, case-insensitive,
  `row-level security`, `auth.uid`, `encrypted at rest`, `encryption at rest`, `audit log`.
  Plus, raw and visible, case-insensitive: `Protected by NDA`, `client-confidential`,
  `NEXT WORK`, `back to home`, `every practitioner had been`, `8,000 to`.
- **K2 scoped zero, visible, expect 0:** `same engagement` on `/work`, STUDIES and `/llms.txt`
  only. (`/about` keeps "on the same engagement, for the same fee" at
  `app/(foyer)/about/page.tsx:59`; that sentence is not about clients.)
- **K3 exact presence, visible, expect exactly 1 on the route named:**
  - `/work`: `I find what your buyers are actually paying for, then build the system that sells exactly that.`
  - `/work`: `Also on the record`
  - `/work`: `Four of the companies I worked inside reached an exit.`
  - `/services`: `An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled.`
  - every route other than `/work`: the method line above, expect 0.
- **K4 presence, visible, expect 1 or more:**
  - `/work`: `$14M`
  - `/work/guardicore`: `$14M in revenue, sourced and closed` · `a major U.S. utility` · `Acquired by Akamai in 2021`
  - `/work/rfp-engine`: `an award-winning author and leadership consultant who teaches government bodies and corporations` · `$3M in signed contracts` · `One requirement, start to finish`
  - `/work/content-engine`: `a social activist` · `800,000 impressions` · `a few thousand`
  - `/work/ordani`: `HIPAA-compliant` · `Six apps and a Sunday night` · `44.8` · `3.15`
  - `/work/birth-worker`: `one to three` · `five to ten` · `thousands of dollars` · `Medicaid`
  - `/services`: `five to ten`
- **K5 the record block on `/work`, in the browser at 1440 and at 390:**
  `document.querySelectorAll('[id="record"]').length` is `1`. Inside `#record` innerText, each of
  these occurs exactly once, matched case-sensitively: `SurveyMonkey`, `Enterprise sales`, `IPO, 2018`,
  `$1M+ in enterprise sales toward the 2018 IPO.`, `Postmates`, `Product analyst`,
  `Acquired by Uber, $2.65B, 2020`,
  `Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.`,
  `Revenue and positioning`, `Acquired by Akamai, 2021`,
  `$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.`,
  `Neuton.AI`, `Helped launch`, `Technology acquired by Nordic Semiconductor, 2025`,
  `North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.`
  (`Guardicore` occurs at least once.) Order: index of `SurveyMonkey` < `Postmates` <
  `Guardicore` < `Neuton.AI`. `#record a` count is exactly 1 and its `getAttribute("href")` is
  `/work/guardicore`. The bare string `Helped launch · 2025` occurs 0 times on the page.
- **K6 index links on `/work`:** the set of distinct `href` values of `main a[href^="/work/"]`
  equals exactly `{/work/guardicore, /work/rfp-engine, /work/ordani, /work/content-engine, /work/birth-worker}`.
- **K7 tenure years, visible, whole body, expect 0 each.** Routes `/`, `/about`, `/work`, STUDIES,
  `/llms.txt`. First delete the exact substring `© 2013–2026 Micah Jones` (the legal notice in
  `components/color-worlds/PageFooter.tsx:34`, kept by the 2026-09-02 ruling). Then count
  `/\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|\d{2})\b(?![-–]\d)/g` (a year range; the
  lookahead keeps an ISO date such as `2026-09-16` out) and
  `/·\s*(?:19|20)\d{2}\b|\b(?:19|20)\d{2}\s*·/g` (a year beside a middot, the role-row
  template). Event years in the record rows use commas and pass. Raw HTML of `/`, `/about`,
  `/work` and STUDIES also carries 0 of `case-study__year` and `<dt>Year</dt>`.
- **K8 JSON-LD on each study (raw HTML):** exactly one `script[type="application/ld+json"]` whose
  JSON has `"@type":"Article"`; its `datePublished` matches `^\d{4}-\d{2}-\d{2}$` and equals, as a string,
  the `publishedAt` frontmatter value of `content/work/<slug>.mdx` read from disk (never a bare
  tenure year). Today section 2.3 sets that value to each file's first-commit date (guardicore and
  ordani `2026-05-14`, rfp-engine and content-engine `2026-09-01`, birth-worker the content-commit
  date), and section 2's V5 checks it against git. **Stop before the commit** unless the RESUME records the
  operator's or judge's ruling, with its date, on which date counts as "the date the page is
  published" for the four existing studies: first commit (section 2.3 as written) or the Pass-120
  republish date (then 2.3 sets all five to the content-commit date). K8 passes under either
  ruling; the executor never picks one.
- **K9 sitemap:** `/sitemap.xml` `<loc>` values containing `/work` are exactly
  `https://www.micahjonesconsulting.com/work` plus the five study URLs, 6 in total; 0 contain
  `postmates` or `neuton`.
- **K10 redirects (raw fetch, `redirect: "manual"`):** `/work/postmates` and `/work/neuton` each
  return status `308` with `location` header `/work#record`.

Prints `claims120 failures: N`.

**V2 `.planning/exec/page120.mjs`** (render). Routes `/work` + STUDIES, each at 1440 and 390,
reduced, unless a check says motion.

- **T1 type ladder.** Collect computed `font-size` (px, rounded to 0.01) of every visible element
  with own text inside `main`, excluding `.cw-pagefoot` and its descendants. At 1440 the set is a
  subset of `{13, 18, 36, 56, 112}` and contains `13, 18, 36`; `/work` also contains `112`; each
  study also contains `56`. At 390 the set is a subset of `{12, 17, 26, 36, 64}` and contains
  `12, 17, 26`; `/work` also contains `64`; each study also contains `36`. Print every size with
  up to six first class names, as `type117.mjs` does.
- **T2** set size `<= 5`.
- **T3** `/work` at 1440 only: largest size divided by 18 is `>= 4` (want `6.22`).
- **T4 chrome sizes, INFO, not gated.** Print the sizes of visible own-text elements in `.cw-nav`,
  `.cw-pagefoot` and the theater `footer`, labelled `INFO chrome sizes <route> <w>: ...`.
- **T5 page spill:** `document.documentElement.scrollWidth - window.innerWidth <= 0`.
- **T6 mono prose:** visible elements in main (scope as T1) whose first `font-family` contains
  `mono` (case-insensitive) and whose own text has 7 or more words: count `0`.
- **T7 tracked uppercase:** visible own-text elements in main (scope as T1) with computed
  `text-transform: uppercase`: count `0`.
- **T8 no rail:** elements in `main` with computed `position` `sticky` or `fixed`: `0`;
  `.case-study__sidebar` count `0`.
- **T9 no captions:** `main figcaption` count `0`. (C9 covers the clip; the capture look in 6.7
  covers a caption set in any other element. A class name is not tested: the live dek class is
  `.title-card-caption`, `app/globals.css:557`.)
- **T10 one title:** `main h1` count exactly `1`; on each study it is visible.
- **T11 body links on paper.** For every visible `main p a` (excluding `.cw-pagefoot`) whose
  effective background luminance is `>= 0.5`: create a sibling probe `<span>` with inline
  `color: var(--color-accent-copper-deep)`, read its computed color, remove it; the link's
  computed `color` equals the probe's. On `/work/ordani` a link also passes if it equals a probe
  of `var(--color-ordani-sage)`. Links with luminance `< 0.5` (the dark band) must NOT equal the
  copper-deep probe.
- **T12 sage scope.** Resolve `var(--color-ordani-sage)` with a probe. Count visible elements in
  main whose computed `color`, `background-color`, `border-top-color`, `fill` or `stroke` equals it.
  `/work/ordani`: `>= 1`. `/work` and the other four studies: `0`.
- **T13 photographs.** A full-bleed image is a visible `main img` or `main video` with rendered
  width `>= document.documentElement.clientWidth - 1`. `/work/ordani`: `>= 1` full-bleed `img` (its
  chapter break, `/ordani-intake.jpg`). `/work/guardicore` has no chapter break (section 2.3) and
  its band photograph sits in the band's media column, not full bleed: full-bleed `img` count `0`,
  and exactly `1` visible `main img` whose `currentSrc` (URL-decoded) contains
  `guardicore-telaviv-session.jpg`, with rendered width `> 0` and `<` the full-bleed threshold. `/work/rfp-engine`, `/work/content-engine`, `/work/birth-worker`: `main
  img` count `0` and `main video` count `0`. On every route, no `img` whose `currentSrc`
  (URL-decoded) contains `guardicore-telaviv.jpg`, and no `video` whose `poster` contains it (that
  file still shows the Instagram location sticker; the `-session` file does not match this
  pattern).
- **T14 the close.** Each study: exactly 1 visible `main a[href="/work"]` whose innerText
  (collapsed) is `All work`.
- **T15 the fragment lands.** At 1440, `page.goto(base + "/work/postmates")`; after load,
  `location.pathname + location.hash` is `/work#record` and
  `document.getElementById("record").getBoundingClientRect().top` is between `0` and `160`.
  Same for `/work/neuton`.
- **T16 no-JS finished frame.** `page.setJavaScriptEnabled(false)` then load: each study's `main
  h1` is visible with every ancestor's computed `opacity` product equal to `1`, and its rect `top`
  equals the reduced-motion run's `top` within 1px (reserved height).

Prints `page120 failures: N`.

**V3 `.planning/exec/settle120.mjs`** (the TitleCard settle, STUDIES, 1440 and 390).
A frame sampler is installed with `evaluateOnNewDocument`: on `DOMContentLoaded` it starts a
`requestAnimationFrame` loop that records, for `main h1` and each of its descendants with a
non-zero rect: `performance.now()`, effective opacity (product of computed `opacity` from the
element up to `document.documentElement`), `rect.left`, `rect.top + scrollY`, and the h1's computed
`filter`, `clip-path`, `font-size`, `letter-spacing`. It stops after 3000ms. The final frame is the
last sample. A frame is non-final when any element's effective opacity differs from its final value
by more than 0.01 or its position by more than 0.5px.

- **S1 motion runs:** at least 1 non-final frame.
- **S2 600ms total:** time from the first non-final frame to the first final frame after the last
  non-final frame is `<= 634` ms (600ms plus two frames).
- **S3 no flash:** frames before the first non-final frame in which the h1 is at its final state:
  `0`. (The finished frame must not paint and then jump back to the start state.)
- **S4 transform and opacity only:** `filter`, `clip-path`, `font-size`, `letter-spacing` take one
  value each across all frames.
- **S5 once per load:** after S1-S4, clear samples, start the sampler by hand, scroll to the bottom,
  wait 500ms, scroll to the top, set the viewport width to 1200 then back (390 run: 360 then 390),
  sample 2000ms: non-final frames `0`.
- **S6 reduced:** reduced, fresh page: non-final frames over 3000ms `0`, final h1 effective
  opacity `1`.
- **S7 CLS:** motion, fresh page, a buffered `PerformanceObserver` on `layout-shift` installed with
  `evaluateOnNewDocument`; sum of `value` where `!hadRecentInput` over 5000ms after `load` is
  `<= 0.05`. Also run S7 on `/work` at both widths.

Prints `settle120 failures: N`.

**V4 `.planning/exec/clip120.mjs`** (the `/work` hero clip). "Ink" means: screenshot of the
media element's rect, decoded in a separate `about:blank` page through a canvas (the
`circle115.mjs` pattern), luminance standard deviation `> 10`. "Same pixels" means the two decoded
captures differ by at most 2 in every channel of every pixel.

- **C1 SSR markup (raw HTML of `/work`, `<!-- -->` stripped):** exactly one `<video`; that tag has a
  non-empty `poster` attribute and no `autoplay`, `loop` or `controls` attribute; no `<track` in the
  page.
- **C2 properties (motion, after load):** `video.muted === true`, `video.playsInline === true`,
  `video.loop === false`, `video.controls === false`, `3.9 <= video.duration <= 4.2`.
- **C3 plays once (motion, 1440 and 390):** captures at 300ms and 2500ms after `load` are not the
  same pixels; `ended` fires within 8000ms of `load`; capture at `ended` + 100ms and
  `ended` + 2100ms are the same pixels and inked; then `video.paused === true`,
  `video.played.length === 1`, `video.played.start(0) <= 0.05`,
  `video.played.end(0) >= video.duration - 0.1`.
- **C4 reduced (1440 and 390):** captures at 1000ms and 5000ms after `load` are the same pixels and
  inked; `video.played.length === 0` (or no `video` element exists and a visible `main img` is
  inked).
- **C5 save-data (motion, 1440):** `evaluateOnNewDocument` defines
  `Object.defineProperty(Navigator.prototype, "connection", { get: () => ({ saveData: true, effectiveType: "4g", addEventListener() {}, removeEventListener() {} }) })`;
  same assertions as C4.
- **C6 no-JS (1440 and 390):** `setJavaScriptEnabled(false)`; captures at 1000ms and 5000ms after
  `load` are the same pixels and inked.
- **C7 served size budget:** for `video.currentSrc`, every `video source` `src`, and `video.poster`:
  `curl -sI` status 200; videos `content-type` starts `video/` and `content-length <= 800000`
  each, all video bytes together `<= 1400000`; poster `content-type` starts `image/` and
  `content-length <= 150000`.
- **C8 no raw source committed:** `git ls-files -s public` then `stat` each file: no file of
  exactly `3264298` bytes (the size of
  `C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4`).
- **C9 no caption:** no visible text node within 120px below the media element's rect inside its
  nearest `figure` or section ancestor. (T9 also covers `figcaption`.)

Prints `clip120 failures: N`.

**V5 `.planning/exec/card1-120.sh`** (served markers, local or production). Copy the structure of
`card1-115.sh` (`chk`, the no-arg two-domain mode, `CHECK_DPL`), with
`BASE_DPL="dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23"`. Before writing it, confirm
`curl -s https://www.micahjonesconsulting.com/ | grep -o 'data-dpl-id="[^"]*"' | head -1` prints
`data-dpl-id="dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23"`; if not, stop and report. Every fetched body is
piped through `sed 's/<!-- -->//g'`. Per domain `D`:
- dpl id new (no-arg mode only), as `card1-115.sh:19-22`.
- `curl -s -o /dev/null -w '%{http_code}'` is `200` for `/ /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker /llms.txt /sitemap.xml`.
- `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$D/work/postmates"` is
  `308 $D/work#record`; same for `/work/neuton`.
- Across the concatenated bodies of `/`, `/about`, `/services`, `/work`, the five studies and
  `/llms.txt`, `grep -ciF` count `0` (fixed strings, so `$` is literal) for each of: `client revenue`, `consulting revenue`, `290,000`,
  `industry author`, `industry-authority`, `been hacked`, `Organic bookings up 30%`,
  `repositioned toward the buyers`, `one of four companies I worked inside`,
  `same engagement also produced`, `2018–2021`, `2018-2021`, `2024–2025`, `2024-2025`,
  `2025–2026`, `2025-2026`, `Protected by NDA`, `$80M`, `80 million`.
- `grep -cF`, `-ge 1`: `/work` `I find what your buyers are actually paying for, then build the system that sells exactly that.`;
  `/work` `id="record"`; `/work` `Also on the record`; `/work` `Technology acquired by Nordic Semiconductor, 2025`;
  `/services` `software that finds and drafts RFPs from buyers outside their existing network`;
  `/` `revenue behind my work`; `/work/content-engine` `a social activist`;
  `/work/rfp-engine` `leadership consultant who teaches government bodies and corporations`.
- Home figure markers kept from `card1-115.sh:35-42` unchanged (`More than 20 million dollars`, the
  tick SSR `$20M+`, the loop path `M 100 0.5 C 12 -0.5`, the two CSS values).
- Both domains same deployment (no-arg mode), as `card1-115.sh:44-47`.
Ends `card1 failures: N`.

**V6 `.planning/exec/lh120-summary.mjs`.** Reads `.planning/exec/lh120/work-{1,2,3}.json`. Per run
prints performance score, `largest-contentful-paint` numericValue, `cumulative-layout-shift`
numericValue, and the `largest-contentful-paint-element` node selector. Gates:
`L1 median LCP <= 1800`, `L2 every run CLS <= 0.05`. Ends `lh120 gate failures: N`.

**V7 `.planning/exec/shots120.mjs`** writes the captures in 6.7.

**Bite proof, before the first Pass-120 edit.** Run V1-V5 once against production and save each
output: `node .planning/exec/claims120.mjs https://www.micahjonesconsulting.com > .planning/exec/claims120-bite.txt`,
likewise `page120-bite.txt`, `settle120-bite.txt`, `clip120-bite.txt`, and
`bash .planning/exec/card1-120.sh https://www.micahjonesconsulting.com > .planning/exec/card1-120-bite.txt`.
Expected: every one exits non-zero. Named failures that must appear (production today has them):
claims120 K1 on `/work/content-engine` (`290,000`); K10 (`/work/postmates` status 200);
page120 T10 on each study (the only h1 is `sr-only`); settle120 S1 or S2 on each study; clip120 C1
(no `<video` on `/work`); card1-120 the two redirect lines. A script that passes on production
is not a gate; stop and report.

### 6.4 Static checks (no server)

| # | Command | Expected |
|---|---|---|
| X1 | `grep -rl "titleCardWords" app components lib content; echo "exit=$?"` | `exit=1` and no file names |
| X2 | `grep -rlF --include=*.mdx --include=*.tsx -e "44.8" -e "3.15" -e "14.2" app components content; echo "exit=$?"` | `exit=1` and no file names (the CDC figures live only in `content/citations.ts`, Pitfall E2) |
| X3 | `grep -c "ORDANI_CDC_2024" content/citations.ts` | `1` or more |
| X4 | `node -e 'const r=f=>require("fs").readFileSync(f,"utf8").match(/^client:.*$/m)[0];console.log(r("content/work/rfp-engine.mdx")!==r("content/work/content-engine.mdx"))'` | `true` |
| X5 | `grep -rn -e "cs.year" -e "lead.year" -e "[^a-zA-Z]s.year" -e "{year}" -e "year={" app components; echo "exit=$?"` | `exit=1` and no lines (no template renders `year`; `content-model.md` §4 lists the render sites) |
| X6 | `node -e 'const m=require("./.claude/brand.json").motion;const d=m.signature.description;console.log(/Inter/.test(d),/600ms/.test(d),/900ms/.test(m.view_transition.description),/600ms/.test(m.view_transition.description))'` | `false true true false` |
| X7 | `ls content/work/` | `birth-worker.mdx content-engine.mdx guardicore.mdx ordani.mdx passioneer.mdx rfp-engine.mdx` or the same list plus `neuton.mdx postmates.mdx`; in the second case G12 and K9 still hold (whichever the content section rules) |
| X8 | `grep -rn "guardicore-telaviv.jpg" app components content \| wc -l` | `0` |
| X9 | `node .planning/exec/type117.mjs http://localhost:3200` (needs the server; run in 6.5) | `type117 failures: 0` |

### 6.5 Served checks against `next start` on port 3200

| # | Command | Expected |
|---|---|---|
| V1 | `node .planning/exec/claims120.mjs http://localhost:3200` | `claims120 failures: 0` |
| V2 | `node .planning/exec/page120.mjs http://localhost:3200` | `page120 failures: 0` |
| V3 | `node .planning/exec/settle120.mjs http://localhost:3200` | `settle120 failures: 0` |
| V4 | `node .planning/exec/clip120.mjs http://localhost:3200` | `clip120 failures: 0` |
| V5 | `bash .planning/exec/card1-120.sh http://localhost:3200` | `card1 failures: 0` |
| V6 | `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3200/work/postmates` | `308 http://localhost:3200/work#record` |
| V7 | `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3200/work/neuton` | `308 http://localhost:3200/work#record` |
| V8 | `MSYS_NO_PATHCONV=1 AXE_OUT=.planning/qa/pass-120/build/axe.json node scripts/axe-worlds.mjs http://localhost:3200 / /about /services /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker` | last line matches `^axe-worlds: axe-core [0-9.]+, [0-9]+ scans, 0 serious/critical finding\(s\), 0 not in KNOWN$`, exit 0 (exit 3 is a coverage failure and fails this check) |
| V9 | `MSYS_NO_PATHCONV=1 node scripts/layout-gate.mjs http://localhost:3200` | last line matches `^layout-gate: [0-9]+ page loads across 9 routes, 0 finding\(s\), 0 not in KNOWN$` (E1) |
| V10 | `node .planning/exec/type117.mjs http://localhost:3200` | `type117 failures: 0` |
| V11 | `node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-120/circle` | `circle failures: 0` (E4) |

Save each output to `.planning/qa/pass-120/build/<id>.txt`.

### 6.6 CLS and mobile LCP on `/work` (Lighthouse CLI, the Pass-119 invocation)

```bash
mkdir -p .planning/exec/lh120 && for i in 1 2 3; do node C:/tmp/p101tools/node_modules/lighthouse/cli/index.js "http://localhost:3200/work" --only-categories=performance --output=json --output-path=".planning/exec/lh120/work-$i.json" --chrome-path="C:/Program Files/Google/Chrome/Application/chrome.exe" --chrome-flags="--headless=new" --quiet; done && node .planning/exec/lh120-summary.mjs
```

This is Lighthouse's default mobile form factor with simulated throttling, the same mode as
`.claude/briefs/pass-119-gsap-after-load.md:186`. Expected: `PASS L1 median LCP <= 1800`,
`PASS L2 every run CLS <= 0.05`, `lh120 gate failures: 0`. The summary also prints the LCP element;
record it. Reference, not a gate: Pass-119 measured simulated median LCP 3510ms on `/` and 2944ms on
`/services` (`pass-119-gsap-after-load.md` §11), so L1 may fail for causes shared by every route.
If L1 fails, the executor does not remove, delay or shrink the clip, the photograph or any ruled
element to pass it; it stops and reports the three runs. The clip ships only with L1 passing or the
operator's dated words overriding it (6.8).

### 6.7 Captures (`node .planning/exec/shots120.mjs http://localhost:3200` into `.planning/qa/pass-120/build/shots/`)

Reduced motion unless the name says `motion`. `<w>` is `390` and `1440`, both taken for every row.

| File | What it frames |
|---|---|
| `work-lead-hero-still-<w>.png` | `/work` first viewport: context line, `$14M`, the still |
| `work-lead-hero-clip-lastframe-motion-<w>.png` | `/work` first viewport 500ms after the clip's `ended` |
| `work-hero-nojs-<w>.png` | `/work` first viewport with JavaScript disabled |
| `work-method-line-and-entries-<w>.png` | the element holding the method line scrolled to 96px below the viewport top |
| `work-record-block-<w>.png` | `#record` scrolled to the viewport top |
| `work-full-<w>.png` | `/work` full page |
| `study-<slug>-curtain-<w>.png` (x5) | each study's first viewport: context, title, dek, at a glance |
| `study-<slug>-band-to-paper-<w>.png` (x5) | scrolled to the dark band's bottom edge minus 200px (band = the h1's first ancestor with an opaque background of luminance `< 0.5`) |
| `study-ordani-chapter-photo-<w>.png` | the first full-bleed `main img` scrolled to viewport centre |
| `study-guardicore-band-photo-<w>.png` | the `main img` whose `currentSrc` contains `guardicore-telaviv-session.jpg` scrolled to viewport centre (the band photograph; Guardicore has no chapter break) |
| `study-rfp-engine-worked-example-<w>.png` | the h2 `One requirement, start to finish` scrolled to the viewport top |
| `study-<slug>-close-and-all-work-<w>.png` (x5) | the `All work` link scrolled to the viewport bottom |
| `study-<slug>-full-<w>.png` (x5) | each study full page |
| `study-guardicore-settle-t0-motion-1440.png` ... `-t750-` | the hero rect at nominal 0, 150, 300, 450, 600, 750ms after `DOMContentLoaded`; the script prints each capture's actual ms |
| `redirect-postmates-lands-on-record-1440.png`, `redirect-neuton-lands-on-record-1440.png` | the viewport after following each retired slug |

The executor opens every capture once with the Read tool and writes
`.planning/qa/pass-120/build/CAPTURES.md`: one line per file, `<file> — <what is visible, 12 words
or fewer>`. A capture whose content does not match its name is a failure; so is any visible
caption under a photograph or the clip, any `PROTECTED BY NDA` box, a location sticker on the Tel
Aviv frame, or a colleague cropped anywhere but the frame's edge in either hero capture.

### 6.8 Ship conditions (all four, in order; none is waived by a passing gate)

1. **Motion-engineer written approval of the settle AND the clip.** The `motion-engineer` agent
   (premium-web plugin, CARD 5) reads `components/TitleCard.tsx`, the `.claude/brand.json`
   `motion` diff, the `settle120`, `clip120` and `lh120` outputs, and the settle and clip captures,
   and writes `.planning/reviews/MOTION-120-APPROVAL.md`. Check:
   `grep -c "^APPROVED: settle$" .planning/reviews/MOTION-120-APPROVAL.md` prints `1` and
   `grep -c "^APPROVED: clip$" .planning/reviews/MOTION-120-APPROVAL.md` prints `1`. Any other
   verdict line stops the ship. The colleagues' consent to being animated is the operator's to
   hold (DESIGN_BAR R12 exception) and is not asserted by this check.
2. **The operator's words that day, before any push, deploy or alias.** The RESUME carries his
   approval quoted verbatim with the calendar date of the deploy, written before the first
   `git push`, `vercel deploy` or `vercel alias` command. The executor never pushes or deploys on
   an approval from an earlier day, from an agent, or from this brief. Before the deploy the RESUME
   also carries the revert: promote `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23` (production as recorded in
   RESUME on 2026-09-16; re-read it from `card1-120.sh`'s dpl line at deploy time and use that id).
3. **Every gate in 6.1, 6.4, 6.5 and 6.6 passing on the commit that deploys**, with outputs saved
   under `.planning/qa/pass-120/build/`.
4. **Production check on both domains after deploy** (STANDING_TECHNIQUES CARD 1: alias both,
   after the push):
   - `bash .planning/exec/card1-120.sh` (no argument: both domains, new dpl id, same dpl id on
     both) → `card1 failures: 0`.
   - `node .planning/exec/claims120.mjs https://www.micahjonesconsulting.com` and
     `node .planning/exec/claims120.mjs https://micahjonesconsulting.vercel.app` → each
     `claims120 failures: 0`.
   - `node .planning/exec/clip120.mjs https://www.micahjonesconsulting.com` → `clip120 failures: 0`.
   - `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.micahjonesconsulting.com/work/postmates`
     → `308 https://www.micahjonesconsulting.com/work#record`; same for `/work/neuton`, and both on
     `https://micahjonesconsulting.vercel.app` with that host in the expected URL.
   - The 6.6 Lighthouse loop against `https://www.micahjonesconsulting.com/work` into
     `.planning/exec/lh120/prod-work-{1,2,3}.json`, summary reported with its numbers.
   Any failure: promote the revert deployment on both domains, then report.
