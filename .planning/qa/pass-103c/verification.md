Pass 103c verification report

Branch: `design/room-and-ledger`. Date: 2026-09-08. Worktree: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate`.

All ten operator-ticked rows and the packages description stretch are applied. **The build is not green:** row 10 is applied verbatim, but its `/about` description is **176 characters**, exceeding the unchanged render gate’s **160-character** limit by **16**. OpenGraph is the approved text without the trailing ` Oakland, CA.` and is **163 characters**. The render gate checks the standard description, not OpenGraph length. No wording was shortened and no gate was bypassed. This is the outstanding return condition for Fable/operator resolution.

`pnpm build` completed copy-lint, vendor and retired-phrase checks, compilation, TypeScript, and static generation; its final render gate returned exit 1 solely for that description. `python -P scripts/verify-room.py` returned **62 checks, 61 pass, 1 fail**: only `16.2-arrival`, “ffmpeg missing or clip absent.” The clip exists; missing ffmpeg is the permitted sandbox limitation. Fable owns the outside-sandbox arrival rerun.

No commit, push, deployment, hook bypass, price/fact/link change, or unticked copy change occurred. The initial working tree was clean. Exactly eight source files changed; all new evidence is under `.planning/qa/pass-103c/`. `content/citations.ts`, the catalog, home, components, both earlier tick tables, and shared legacy styles are unchanged.

| Row | ID / change | File | Status |
|---:|---|---|---|
| 1 | PK15 | `app/(room)/packages/page.tsx` | applied |
| 2 | AB06 | `app/(room)/about/page.tsx` | applied |
| 3 | GC08 | `content/work/guardicore.mdx` | applied |
| 4 | RF03 | `content/work/rfp-engine.mdx` | applied |
| 5 | PB05 | `app/(room)/playbook/page.tsx` | applied |
| 6 | CA02 | `app/(room)/call/page.tsx` | applied |
| 7 | /about order | `app/(room)/about/page.tsx` | applied |
| 8 | Six prompt files statement | `app/(room)/playbook/page.tsx` | applied |
| 9 | Nine templates statement | `app/(room)/playbook/page.tsx` | applied |
| 10 | /about metadata + OpenGraph | `app/(room)/about/page.tsx` | applied; return-condition: 176 > 160 |

Not-found rows: **0**. All nine wording/metadata rows match their approved cells, including JSX/entity and MDX splits. RF03 retains bold emphasis around its opening sentence. Section 4 adds only `align-self: stretch` to `#packages .rl-cards > .rl-card > p` inside the existing `min-width: 900px` rule. The copy gate has **10 exact entries** covering the **9 wording/metadata rows**, each cited `PASS-103 reword row N`; row 10 has both descriptions. Superseded explicit entries `PASS-102 row 12` and `PASS-103 row 48` were removed. Row 7 needs no new copy approval.

The rendered `/about` paragraph sequence at 390 follows. List-item statements are counted as paragraphs; the responsive AB01/AB02 promise appears once at each width. The labels travel with AB07–AB09.

| Position | Before: first six words | After: first six words |
|---:|---|---|
| 1 | I help you build it and | I help you build it and |
| 2 | For thirteen years, I’ve worked inside | I’m building Ordani. This country loses |
| 3 | $20M+ in client revenue since 2013. | Products I build from start to |
| 4 | Four companies I worked inside reached | I also take engagements with teams |
| 5 | Growth, GTM, and platform strategy roles | I also wrote The 80% Wall, |
| 6 | Positioning research that moves deal size. | For thirteen years, I’ve worked inside |
| 7 | Software for marketing and contracts. For | Positioning research that moves deal size. |
| 8 | Products I build from start to | Software for marketing and contracts. For |
| 9 | I’m building Ordani. This country loses | I plan how enterprise software companies |
| 10 | I also take engagements with teams | $20M+ in client revenue since 2013. |
| 11 | I also wrote The 80% Wall, | Four companies I worked inside reached |

Approved after order: **AB01/AB02 → AB10 → AB09 → AB11 → AB12 → AB03 → AB07 → AB08 → AB06 → AB04 → AB05**. All 11 reading positions are present; all paragraphs except separately approved AB06 retain their wording. The Guardicore image remains in the AB07 exhibit. The case-studies CTA and closing portrait retain their contents, attributes, and order.

Heading outline before: `h1 Operator, not consultant. → h2 Receipts → h2 What I’m known for → h2 Currently`. After, at both widths: `h1 Operator, not consultant. → h2 Currently → h2 What I’m known for → h2 Receipts`. No heading was renamed. IDs `rl-about-title`, `rl-now-title`, and `rl-known-title`, and every other existing page ID and link, are preserved.

The first desktop capture exposed a 52.25px film stretch caused by the moved heading’s old section margin and the engagement paragraph’s old spacing. Removing those redundant spacing wrappers/classes within row 7 restored the original square using existing styles. The final source and rendered audits pass. No film, image, or global layout CSS changed.

| /about geometry at 1440 | Before | Final |
|---|---:|---:|
| Film x / y | 32 / 160 | 32 / 160 |
| Film width / height | 782.65625 / 782.65625 | 782.65625 / 782.65625 |
| Intro text x / y | 862.65625 / 160 | 862.65625 / 160 |
| Portrait width / height | 545.328125 / 681.65625 | 545.328125 / 681.65625 |
| Closing text width | 664 | 664 |

Both desktop column pairs remain aligned; mobile stacks without overflow. The brief’s legacy `.cw-about-intro:has(.cw-portrait)` selector matched **0 elements before and after**: this worktree already uses `.rl-opgrid` for the opening and a `.rl-two` block containing `.cw-portrait` for the closing photograph. Those actual layouts and the untouched legacy selector are verified. Both rendered photograph sources and alt strings are unchanged.

Packages at 1440: coordinates are document CSS pixels. The actual painted hairline belongs to the first feature `<li>` (`border-top: 1px`); the description `<p>` and `<ul>` themselves have 0px borders. The measured equivalent of the brief’s seam is the description bottom coinciding with that painted feature border.

| Card | Description bottom | Feature-list / first-feature top | Gap |
|---|---:|---:|---:|
| The Unstick Session, $500 | 870.40625 | 870.40625 | 0.0 |
| The Audit, $2,500, start here | 870.40625 | 870.40625 | 0.0 |
| The Sprint, $7,500 | 870.40625 | 870.40625 | 0.0 |

Across-card spread: **0px**; each gap: **0px**, within ±1px. In this Chromium baseline, `align-self: auto` already measured the same seam; the final CSS explicitly computes `stretch` in all three cards as requested. At 390, all recorded card geometry and computed layout values are unchanged.

All six changed pages return HTTP 200 at 390 × 844 and 1440 × 900. Axe **4.13.0** reports **0 → 0 violations in all 12 samples**. Each has **0 em-dashes** and **0px horizontal overflow**. Sentence counts use English `Intl.Segmenter` over normalized rendered body `innerText`, matching Pass 103. Every average falls and remains below 25.

| Page / width | Words before → after | Sentences before → after | Average before → after |
|---|---:|---:|---:|
| `/packages@390` | 358 → 360 | 25 → 27 | 14.3200 → 13.3333 |
| `/about@390` | 341 → 352 | 33 → 35 | 10.3333 → 10.0571 |
| `/work/guardicore@390` | 431 → 432 | 44 → 45 | 9.7955 → 9.6000 |
| `/work/rfp-engine@390` | 392 → 386 | 33 → 34 | 11.8788 → 11.3529 |
| `/playbook@390` | 1132 → 1134 | 97 → 98 | 11.6701 → 11.5714 |
| `/call@390` | 186 → 185 | 13 → 13 | 14.3077 → 14.2308 |
| `/packages@1440` | 363 → 365 | 25 → 27 | 14.5200 → 13.5185 |
| `/about@1440` | 346 → 357 | 33 → 35 | 10.4848 → 10.2000 |
| `/work/guardicore@1440` | 449 → 450 | 44 → 45 | 10.2045 → 10.0000 |
| `/work/rfp-engine@1440` | 410 → 404 | 33 → 34 | 12.4242 → 11.8824 |
| `/playbook@1440` | 1137 → 1139 | 97 → 98 | 11.7216 → 11.6224 |
| `/call@1440` | 191 → 190 | 13 → 13 | 14.6923 → 14.6154 |

Twelve final full-page screenshots were captured and visually inspected: `packages`, `about`, `work-guardicore`, `work-rfp-engine`, `playbook`, and `call`, each suffixed `-390.png` and `-1440.png` in this directory. Baselines are in `before/`. Desktop captures wait for fonts plus three seconds. The playbook desktop capture uses the existing Pass 103b method: expand to document height before the font/animation wait, then capture the full viewport so the SVG chart remains finished. The call form was inspected idle; no form was submitted.

Cleanup restored **13 overwritten files**: **12** Pass 101 verifier artifacts and `next-env.d.ts`. All **134** backed-up tracked files match their original bytes, including all **133** tracked Pass 101 files. `git diff --exit-code -- .planning/qa/pass-101 next-env.d.ts` returns **0**. The **40** ignored arrival frames predate this run; their timestamps and the verifier’s early return before touching them confirm they were not generated here. The initial cleanup helper incorrectly classified them as new; its corrected check passes. No new Pass 101 files remain. Temporary servers were stopped.

Verification commands and expected outputs are listed below. Bare `pnpm` is unavailable; every `pnpm` command used the existing unchanged CLI via `node C:/Users/micah/AppData/Local/Temp/pass-102-corepack/v1/pnpm/10.12.1/bin/pnpm.cjs`. Browser Python commands used `C:/Users/micah/AppData/Local/Temp/pass-102-python/Scripts/python.exe`, with `PYTHONIOENCODING=utf-8` and `PLAYWRIGHT_BROWSERS_PATH=C:/Users/micah/AppData/Local/Temp/pass-102-browsers`. Other Python commands used `C:/Python314/python.exe`.

| Verification command | Expected | Actual / evidence |
|---|---|---|
| `git branch --show-current` | `design/room-and-ledger` | Matched |
| `git status --short` (initial) | Clean | No entries; `initial-status.txt` |
| `pnpm start --port 3000` | Production server ready | Ready for baseline and both builds; all three stopped afterward |
| `python -P .planning/qa/pass-103c/page-qa.py before` | 12 HTTP 200 samples, baseline axes/order/metrics | Exit 0; `before.json`, `page-qa-before.txt` |
| `pnpm exec prettier --check "app/(room)/about/page.tsx"` | All matched files use Prettier code style | Initial check flagged formatting; final check exit 0 after `prettier --write` |
| `pnpm build` (initial and final) | Exit 0; all package gates pass | Both exit 1 solely for `/about` description 176 > 160; `build-initial.txt`, `build.txt` |
| `python -P scripts/verify-room.py` (initial and final) | 62 pass, allowing only missing-ffmpeg arrival exception | Both exit 1: 61 pass, 1 permitted sandbox failure; `verify-room.txt`, `verify-room-final.txt`, `verify-room-result.json` |
| `python -P .planning/qa/pass-103c/page-qa.py after` | 12 screenshots; axe unchanged; dashes ≤1; average ≤25; no overflow | Exit 0; `after-initial.json`, `page-qa-after.txt`; about superseded by final capture |
| `python -P .planning/qa/pass-103c/page-qa.py after /about` | Exact paragraph order, original film square, axe 0 at both widths | Exit 0; final `after.json`, `page-qa-about-final.txt`, both about PNGs |
| `python -P .planning/qa/pass-103c/borders.py` | Each seam gap ≤1px and across-card spread ≤1px | Exit 0; all gaps and spread 0px; `borders.json`, `borders.txt` |
| `python -P .planning/qa/pass-103c/audit.py` | `all_pass: true`; no unauthorized copy, numeric, link, ID, CSS or gate changes | Initial audit caught film stretch; final exit 0, errors `[]`; `audit-initial.json`, `audit.json`, `audit.txt` |
| `pnpm exec tsx .planning/qa/pass-103c/check-lint.ts` | Zero findings in 9 proposals and 12 rendered samples | Exit 0, findings `[]`; `copy-lint.json`, `copy-lint.txt` |
| `python -P .planning/qa/pass-103c/restore-artifacts.py` | All baseline bytes match, no new Pass 101 files, content diff 0 | Final exit 0; `restored-artifacts.json`, `restore-artifacts.txt` |
| `git diff --exit-code -- .planning/qa/pass-101 next-env.d.ts` | Exit 0, no output | Matched; `pass101-diff.txt` |
| `git diff --check` | Exit 0, no whitespace errors | Matched; `diff-check.txt` |
| `git status --short` / `git diff --stat` (final) | Only 8 authorized source files plus Pass 103c evidence | Matched; `final-status.txt`, `final-stat.txt` |

The initial source-location search attempted `rg`, which is unavailable here; PowerShell reads and Git file lists were used instead. Git emits a read-only warning for the inaccessible global ignore file; source and restoration checks still return the recorded results.

Final build output:

```text

> micahjonesconsulting@0.1.0 build C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p101-integrate
> tsx lib/copy-lint-cli.ts && node scripts/vendor-gate.mjs && node scripts/retired-phrases-gate.mjs && next build && node scripts/render-gate.mjs

[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.
vendor-gate: clean
retired-phrases-gate: clean
▲ Next.js 16.2.6 (Turbopack)
- Experiments (use with caution):
  ✓ viewTransition

  Creating an optimized production build ...
✓ Compiled successfully in 2.6s
  Running TypeScript ...
  Finished TypeScript in 3.3s ...
  Collecting page data using 27 workers ...
node : ⚠ Using edge runtime on a page currently disables static generation for that page
At line:2 char:1
+ node C:/Users/micah/AppData/Local/Temp/pass-102-corepack/v1/pnpm/10.1 ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (⚠ Using edge ru...n for that page:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
<claude-code-hint v="1" type="plugin" value="stripe@claude-plugins-official" />
  Generating static pages using 27 workers (0/23) ...
  Generating static pages using 27 workers (5/23) 
  Generating static pages using 27 workers (11/23) 
<claude-code-hint v="1" type="plugin" value="stripe@claude-plugins-official" />
  Generating static pages using 27 workers (17/23) 
✓ Generating static pages using 27 workers (23/23) in 643ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /about/opengraph-image-1bqzyr
├ ƒ /api/stripe/webhook
├ ○ /call
├ ○ /call/kickoff
├ ƒ /call/opengraph-image-5r3xvx
├ ○ /contact
├ ○ /icon.svg
├ ƒ /llms.txt
├ ƒ /opengraph-image-12gd74
├ ○ /packages
├ ƒ /packages/opengraph-image-1kpiyr
├ ○ /playbook
├ ƒ /playbook/opengraph-image-6iczzm
├ ○ /playbook/thanks
├ ○ /robots.txt
├ ○ /services
├ ○ /services/thanks
├ ○ /sitemap.xml
├ ○ /work
├ ● /work/[slug]
│ ├ /work/guardicore
│ ├ /work/ordani
│ ├ /work/rfp-engine
│ └ /work/content-engine
├ ƒ /work/[slug]/opengraph-image-oti546
└ ƒ /work/opengraph-image-5rjodw


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand


render-gate: 1 finding(s)

  /about                description is 176 chars, over 160

 ELIFECYCLE  Command failed with exit code 1.
```

Final room-verifier output, preserving every check and measured number:

```text
PASS 14.1-stage-16x9  1440: stage 1440.0x810.0 (16:9 wants 810.0), width==innerWidth(1440), object-fit=cover, object-position=50% 50%, source 1280x720 -> 1:1 mapping
PASS 16.2-fingertip-to-g  tip -> nearest point of the "g" glyph box, the glyph LEFT of the tip, and the copper row's cap-top 4px UNDER the tip: 1280: tip (248, 275), g box [200 279 287 389], dx 0.0 dy 4.0, euclid 4.0px (<=60), g left of tip=True, cap-top +4.0px off the tip; 1440: tip (279, 310), g box [231 314 329 438], dx 0.0 dy 4.0, euclid 4.0px (<=60), g left of tip=True, cap-top +4.0px off the tip; 1920: tip (372, 413), g box [324 417 422 542], dx 0.0 dy 4.0, euclid 4.0px (<=60), g left of tip=True, cap-top +4.0px off the tip
PASS 14.7-copper-row-inside-stage  'go-to-market.' right end vs the stage's right edge (SS14.7 wants >=32px): 1280: row ends 1202, stage ends 1280, 78px inside, 1 client rect; 1440: row ends 1358, stage ends 1440, 82px inside, 1 client rect; 1920: row ends 1456, stage ends 1920, 464px inside, 1 client rect
PASS 14.7-sentence-and-chips-share-the-left-edge  1280: g at 200, sentence at 200, chips at 200, proof at 200 and 24px under the chips at 14px (SS18: 24px, 14px label); 1440: g at 231, sentence at 231, chips at 231, proof at 231 and 24px under the chips at 14px (SS18: 24px, 14px label); 1920: g at 324, sentence at 324, chips at 324, proof at 324 and 24px under the chips at 14px (SS18: 24px, 14px label)
PASS 16.2-hero-lighting  SS16.2: the bone row is over the film on the veiled wall, the copper row is on the veil's solid ground. bone row min 4.86:1 (>=4.5); the copper row's ground from its cap-top (= fingertip_y + 4px, the stop SS16.2 pins) down is FLAT espresso -- brightest channel 15 of 255 (#0D0D0F is 15) -- carrying copper at 4.40:1, which is the brief's own measured copper-on-espresso figure | f0(t=0.00s) bone 4.86 | copper ground 4.40, brightest channel 15; f48(t=2.00s) bone 5.01 | copper ground 4.40, brightest channel 15; f96(t=3.99s) bone 4.94 | copper ground 4.40, brightest channel 15
PASS 14.1-hero-clearance  hero block foot -> operator top: 1440: +40px clear (block runs -40px past the stage's foot), 1280: +88px clear (block runs -40px past the stage's foot), 1024: +147px clear (block runs -27px past the stage's foot), 900: +114px clear (block runs +6px past the stage's foot)
PASS 16.2-veil-cut  1440, the veil measured directly (the film replaced by flat white, so alpha = (255 - pixel) / 242): 0.554 at fingertip_y - 12px (SS16.2 pins .55), 1.000 at fingertip_y + 4px (SS16.2 pins solid), 0.550 at the bone row's own box top (what carries that row at >=4.5:1), 0.550 40px above the tip, 1.000 40px below
PASS 16.2-fingertip-emerges  1440, hold frame: inside the 18px of ramp still lit above the tip, the finger reads a median 22% darker than the wall on the same row (>=15%, the scale-free form of SS14.1's old 25-of-145 step), peaking at a 37-level absolute step; per-row (wall, finger, rel): [(91, 91, 0.0), (91, 91, 0.0), (88, 74, 0.15), (85, 67, 0.21), (83, 51, 0.39), (61, 29, 0.52)]. Below fingertip_y + 4px the veil is solid by SS16.2's own ruling, so the hand is in the dark there BY DESIGN and only the tip is lit.
PASS 14.2-op-square  square stage 782.7x782.7; heading top 702.3 is inside the lower third (starts 705.8) and its foot 891.6 is inside the film (966.7); overlay position=absolute
PASS 14.2-op-columns  first paragraph 901.6..925.4 sits under the heading (891.6) and on the film (foot 966.7); right column top 184.0 vs film top 184.0 (top-aligned); section line present=True
PASS 14.2-op-contrast  heading min 7.73:1 over the film (>=4.5) | f0(t=0.00s) 7.73; f48(t=2.00s) 7.85; f96(t=4.00s) 7.73
PASS 14.7-op-heading-d2-wdth106  heading font-size 102.87 == --d2 102.87 at "wdth" 106; rows [('Operator,', 470.3, 534.3, 1), ('not consultant.', 720.3, 784.3, 1)] -- each one client rect, each ending inside the square (right edge 814.7)
PASS 14.7-op-veil-62-82  the operator veil reaches .6 at 62.0% (SS14.7 wants 62) and solid at 82.0% (wants 82); every stop: [(0.0, 0.0), (0.0, 30.0), (0.1, 40.0), (0.26, 48.0), (0.45, 56.0), (0.6, 62.0), (0.68, 68.0), (0.74, 73.0), (0.8, 77.0), (0.92, 80.0), (1.0, 82.0), (1.0, 100.0)]
PASS 14.7-op-rows-auto-height  the right column's three register rows take their own height: [84.9, 109.9, 55.4] (flex-grow/basis ['0/auto', '0/auto', '0/auto'] -- 0/auto is auto height; 1/0px was the stretched thirds SS14.7 removed)
PASS 14.4-heads  --d2=102.9; 5 section heads all at --d2 [102.9, 102.9, 102.9, 102.9, 102.9]; index names [28, 28, 28]; FAQ q [24, 24, 24] / a [17, 17, 17]; captions [28, 28, 28]; section air [120, 120, 120, 120, 120]; hero --d=135.4, ask --d=135.4 (only these two)
PASS 14.7-faq-full-stop  the FAQ head reads 'The objections, in your words.'
PASS 14.7-captions-initial-capital  3 index captions, every one opening on a capital: ['Millions in revenue · acqu', 'Millions in contracts won ', 'Videos, blogs, newsletters']
PASS 18-work-head-split-eyebrow-and-one-line  every section head on one width axis: {"work": "\"wdth\" 115", "price": "\"wdth\" 115", "proof": "\"wdth\" 115", "manual": "\"wdth\" 115", "faq": "\"wdth\" 115"} (wdth 115 on all five, and zero middots left in any of them). The how-I-work head, at each width: 1920: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 103.4px in 1 line(s), gap 20.0px; 1440: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 102.9px in 1 line(s), gap 20.0px; 1280: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 91.4px in 1 line(s), gap 20.0px; 900: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 64.3px in 1 line(s), gap 20.0px; 390: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 39.5px in 1 line(s), gap 20.0px; 360: eyebrow 'Operating principles' at 14px uppercase, head 'How I work.' at 39.5px in 1 line(s), gap 20.0px
PASS 15.5-cards  1440: widths [442.7, 442.7, 442.7] (each wants (content - 48)/3 = 442.7 of a 1376 content); the row sits IN the content width (x 32.0 == the 32px gutter, width 1376.0); borders ['1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)'] -- 1px at 15% ink, which computes oklab(0.159987 0.00115423 -0.00401844 / 0.15); radius {'8px'}; padding ['28px', '28px', '28px']; name [24, 24, 24] at ['"Hanken Grotesk"', '"Hanken Grotesk"', '"Hanken Grotesk"'] / weight ['500', '500', '500']; price [72, 72, 72]; the chip is the full card interior [384.7, 384.7, 384.7] vs [384.7, 384.7, 384.7]; CTA tops spread 0.00px
PASS 18-audit-copper-border-and-pill  the Audit's four borders are ['1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)'] -- 1px copper on ALL FOUR, which is SS18's first device, and the other two cards keep the hairline (['1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)'] / ['1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)', '1px oklab(0.159987 0.00115423 -0.00401844 / 0.15)']). The second device is the pill 'Start here' on the NAME line (same row as the name: True), 12px, radius 999px, border 1px rgb(200, 84, 43)
PASS 14.7-chip-labels-are-the-live-buttons  the three card chips read ['Buy the Unstick Session', 'Buy the Audit', 'Buy the Sprint']; app/(room)/packages/page.tsx renders ['Buy the Unstick Session', 'Buy the Audit', 'Buy the Sprint'] (BuyButton appends the arrow, which the chip carries as its own glyph); each label fits its chip without clipping: [True, True, True]
PASS 18-engagements-is-the-fourth-card  one <A> with 0 links inside it -> /call; 1376.0px wide == the cards row 1376.0, 24.0px below it; radius 8px (the cards' 8px, not the slab's 16px); padding 28px (the cards' 28px); NO copper top rule (1px rgba(0, 0, 0, 0)); height 222px, by content, not a 220px floor; ground rgb(13, 13, 15); the name 'Engagements' at 24.0px "Hanken Grotesk" weight 500 (the card's name slot, not --d2 102.9), the price slot at 72px, the sentence at 17px, one chip 'Get a reality check→' on the right; every word run >= 16.97:1 and the one aria-hidden arrow at 16.97:1. Runs: [('Engagements', 16.97, 24, False), ('From $5K a month', 16.97, 72, False), ('advisory, project, retainer, or em', 16.97, 17, False), ('Get a reality check', 16.97, 19, False), ('→', 16.97, 20, True)]
PASS 18-objections-one-lane-from-the-seam  1440: THREE rows in ONE column, stacked (tops [3929, 4077, 4230]), every row the lane's own width [792.66, 792.66, 792.66]; the lane opens at x 615.3 -- the column-6 seam is 615.3 (Rule B) -- and runs 792.7 against the cols 6-12 span 792.7, with the head holding cols 1-5 (559.3 vs 559.3); each row closes on its own {'1px solid'} hairline; questions [24, 24, 24] / answers [17, 17, 17] at oklab(0.159987 0.00115423 -0.00401844 / 0.8); the copper arrow cell is "→" rgb(200, 84, 43)
PASS 18-manual-no-frame-and-a-buy-ledger  RULE A: zero .frame and zero dashed borders inside the figure (0 / 0). The cover DECODES (576 x 814, complete=True) and fills cols 1-5 alone -- 559.3 wide against the measured span 559.3, at 4:5 (559.3 x 699.2 = 0.8000), border 0px, radius 8px, padding 0px, object-fit cover. The copy holds cols 6-12 (792.7 vs 792.6) to its RIGHT; the head reads 'The 80% Wall.' at 102.9 == --d2 102.9 and the display sentence is DEMOTED to 28px in 2 line(s); three symptom rows at [21, 21, 21] on {'1px solid'} hairlines (the last closing on a 1px rule). The buy LEDGER is the section's only border: a 1px solid box at radius 0px holding 3 rows [48, 48, 48] tall ['Get chapter one free→', '$99at launch', 'PDF + ZIPevery future edition'], each with a [44, 44, 44] copper cell rgb(200, 84, 43), the first linking /playbook
PASS 11-bar-over-ask  with the copper field under it the bar paints rgb(13, 13, 15) (dark=True); worst label contrast 6.44:1 (>=4.5). Not copper, not bone.
PASS 15.4-work-ledger  #work now holds 0 .panel, 0 <svg>, 0 <img>, 0 <video> and 0 sticky/fixed elements [] -- SS15.4 wants zero of each. Three full-width rows ([1376, 1376, 1376] of a 1376 content): ordinals ['01', '02', '03'] in the label style (['Anybody', 'Anybody', 'Anybody'] at [14, 14, 14], {'uppercase'}), the step names ['Diagnose', 'Build', 'Position'] at [102.9, 102.9, 102.9] == --d2 102.9, and each sentence at [21, 21, 21] on a [45.98, 45.98, 45.98] measure ({'540.96px'} = 46ch) starting at x [615.3, 615.3, 615.3] against the column-6 seam 615.3 (SS18 Rule B); hairlines {'1px solid'}, the ledger closing on a 1px rule
PASS 18-receipts-ledger-and-the-way-out  exactly 3 .prf rows -- ['Guardicore', 'RFP engine for an industry author', 'AI content engine for an industry author'] -- each a link carrying an arrow (True), [79, 79, 107]px tall; name and caption at ONE size ([28, 28, 28] / [28, 28, 28]), the name holding the cols 1-5 lane ([559.3, 559.3, 559.3] vs 559.3) and the caption opening on the column-6 seam ([615.3, 615.3, 615.3] vs 615.3), the arrow in a [32, 32, 32] cell, 2px reserved top and bottom ({'2px'}) so the copper hover rule cannot shift the row; zero captions ending in a full stop (tails ['nue · acquired by Akamai', 'won · close rate doubled', 'd fewer hours to produce']). The way out is a PILL, not a fourth row: 'See the rest' + '→' to /work, 40px tall at radius 999px, 32px under the ledger, on the ledger's own left edge (32 vs 32) and narrower than it (142 vs 1376). The head is unchanged ('The receipts. Every line below is real.') and carries the count '04', which is the number of non-stub case studies in content/work ('04')
PASS hero-rows-1440  'I build the' 750px in 1177px, 1 client rect; 'go-to-market.' 1127px in 1177px, 1 client rect
PASS media  [{"id": "filmvid", "muted": true, "loop": false, "preload": "auto", "playsinline": true, "poster": true, "srcs": 2, "rs": 4, "types": ["video/webm", "video/mp4"], "urls": ["/video/a2-hold-720.webm", "/video/a2-hold-720.mp4"]}, {"id": "opvid", "muted": true, "loop": true, "preload": "none", "playsinline": true, "poster": true, "srcs": 2, "rs": 4, "types": ["video/webm", "video/mp4"], "urls": ["/video/b-loop-720.webm", "/video/b-loop-720.mp4"]}]
PASS 14.8-renders-with-javascript-off  scripting DISABLED: the 16:9 stage is 1440x810 and the headline block starts at (231, 181) against the CSS-only fingertip (279, 310) -- 48px to its left and the copper row's cap-top at 313.7, +4.0px off the tip, from :root's measured percentages and nothing else; 2 headline rows, 3 cards, 3 ledger rows, 3 objection columns, 3 receipts (SS17: three) + 1 'see the rest' link, the engagements block 222px tall, the cover frame 559px wide, and the bar visible=True (the <noscript> rule opens it)
PASS 15.1-gesture-plays-both  preload ['auto', 'none'] on both; both clips paused by hand first (hero paused=True, operator paused=True, hero ended=False, operator square 100% visible -- past the 35% gate); after ONE synthetic wheel event the hero is playing (paused=False, t=1.22s) and the operator clip is playing (paused=False, t=3.73s)
PASS discipline  the Room and Ledger set declares 0 @keyframes and runs 0 animations inside .rl-home -- every item is a transition between two declared states. gsap=undefined, mix-blend-mode elements=0, banned faces=[], Anybody loaded=True. Site-wide the shared stylesheet still declares 6 (fade-out, fade-in, wc-wipe, wc-climb, wc-stamp, wc-fade): legacy Color Worlds + WallChart, owned by the routes Pass-101 phase 3 ports, none of them reachable from this page. SS16.3's site-wide ceiling of 3 is met when those routes are ported.
PASS 14.3-proof-row  reads 'Four exits, $5B+ combined.'; nodes ['Four exits, $5B+ combined.'] (both verified substrings of the freight template)
PASS 16.2-hero-mobile  390: stage 390x292 cropped 0% 50%; fingertip (100.6, 163.7) = 25.79% across (SS14.7 wants ~26) and 38.24% down; "g" box left edge 60.6, 14.0px from the tip (<=60, g left=True); rows [('I build the', 203.0, '126px gutter', 1), ('go-to-market.', 306.8, '23px gutter', 1)]; visible source window 0..1442 (the face at 1010..1290 is inside); headline box 117..212 inside the stage 52..344; the sentence starts 344, the stage ends 344; bar opacity 1, 52px tall, and the stage opens at y 52 CLEAR of it || 360: stage 360x270 cropped 0% 50%; fingertip (93.0, 155.2) = 25.83% across (SS14.7 wants ~26) and 38.24% down; "g" box left edge 53.0, 15.6px from the tip (<=60, g left=True); rows [('I build the', 190.5, '117px gutter', 1), ('go-to-market.', 288.1, '19px gutter', 1)]; visible source window 0..1440 (the face at 1010..1290 is inside); headline box 108..204 inside the stage 52..322; the sentence starts 322, the stage ends 322; bar opacity 1, 52px tall, and the stage opens at y 52 CLEAR of it
PASS no-hscroll-390-360  390: scrollWidth 390 <= innerWidth 390; 360: scrollWidth 360 <= innerWidth 360
PASS 16.2-hero-lighting-390  390, the SS16.2 cut at the other end of the ladder: bone row min 4.86:1 (>=4.5); the copper row's ground from its cap-top down is flat espresso (brightest channel 15) at 4.40:1 | f0(t=0.00s) bone 4.86 | copper ground 4.40, brightest channel 15; f48(t=2.00s) bone 5.01 | copper ground 4.40, brightest channel 15; f96(t=3.99s) bone 4.94 | copper ground 4.40, brightest channel 15
PASS 14.2-op-mobile-overlay  390: film 390x390 is the FULL width (390) and square; heading cap row starts 66.4% of the square and ends 85.0%, 32px inside its right edge; live film under the veil at the cap row reads +61 levels off the solid espresso (>=12, or the type is a caption under a photograph)
PASS 15.5-cards-mobile  390: the three cards stack (tops [2197, 2530, 2862]) at the full 326px content width [326, 326, 326], keeping their 8px ground {'8px'}; the Audit's borders are ['1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)', '1px rgb(200, 84, 43)'] -- the SAME 1px copper border on four sides as the desktop, no bleed (row margin 0px, x [32, 32, 32], right [358, 358, 358] of a 390px viewport); the engagements block stacks into 4 rows on 1 left edge(s), 274px tall and 326px wide; section air 64px
PASS 18-objections-mobile  390: the three objections stack (tops [5918, 6133, 6296]) at the full 326px width [326, 326, 326], each closing on its own hairline with no gap between rows ([0, 0])
PASS 15.2-manual-mobile  390: the cover comes FIRST (its top 4324, the copy's 4853) at the full 326px width
PASS 15.2-fileline-mobile  390: the manual's file line is column with 2 rows sharing 1 left edge(s), and each label occupies [1, 1] client rect(s) -- 1 each means neither wraps
FAIL 16.2-arrival  the arrival could not be measured (ffmpeg missing or clip absent)
PASS 16.3-1-the-moment  with the clip paused at t=1.00s the copper row computes opacity 0.28 (rest state .28) and at t=3.04s (arrival + 0.5s) it computes 1, over a 0.26s fill; 'I build the' rests at translateY 24.0px over 0.6s and settles at 0.0px
PASS 16.3-2-bar  the bar rests at translateY -12.0px and arrives at 0.0px over 0.24s, 0.24s (opacity and transform together); `on` is only ever ADDED by the script, so the entrance cannot run twice; PASS-102 row 1 bar labels: ['Micah Jones', 'Record', 'Playbook', 'Packages from $500', 'Get a reality check']
PASS 16.3-3-heads  5 section heads; each rests clipped from the left (inset(-30.8621px 100% -30.8621px 0px)) and settles open (inset(-30.8621px 0px)) over {'0.7s'}. The vertical inset is -0.3em in BOTH states: the .d.two line box is shorter than the font's em box and a literal inset(0) shears descenders
PASS 16.3-4-hairlines  18 ledger rules -- the three how-I-work rows and the ledger's closing rule, the three manual symptoms and theirs, the three objection rules, the three card price rules, the THREE receipts (SS17) and the ledger's opening rule -- all rest at scaleX {0.0} and settle at scaleX {1.0} over {'0.5s'}, staggered ['0s', '0.06s', '0.12s'] inside a section
PASS 16.3-5-rises  three price cards rest at translateY [20, 20, 20] / opacity ['0', '0', '0'] on delays ['0s', '0.07s', '0.14s'] and settle at [0, 0, 0] / ['1', '1', '1']; the Engagements block rests at 20px on a 0.21s delay (after them); the three objection columns rest at [20, 20, 20] on ['0s', '0.07s', '0.14s']; the cover rests at 10px and settles at 0px
PASS 16.3-6-operator  the square's film rests at scale 1.378 and settles to 1.300 over 1.2s (the SS14.2 crop zoom is 1.30, so the SS16.3 1.06 settle is applied on it: 1.30 x 1.06 = 1.378); the two heading rows rest at translateY [20, 20] on delays ['0s', '0.08s']
PASS 16.3-7-hovers  on hover the chip's arrow slides to translateX 6.0px and a receipt row's arrow to 6.0px, both over 0.2s / 0.2s; the price card's border computes rgb(200, 84, 43) (copper) over 300ms. The chips' 300ms ground swap is unchanged and the receipts' copper wipe is untouched.
PASS 16.3-8-ask  the copper field's headline rests at translateY 30px / opacity 0 over 0.6s, the reply promise rides with it at translateY 30px / opacity 0, and the chips -- which carry the arrow now that SS18 deleted the floating one -- enter from translate(-30, 30) on a 0.12s delay, settling at opacity 1; PASS-102 row 1 headline: 'Get a reality check.'
PASS 16.3-9-ground-unchanged  --p reads 0.0000 at the top of the room and 1.0000 over the ledger with html.lit=True; the sheet still travels over 0.7s. Nothing in SS16.3 touched it.
PASS 16.3-keyframes  zero @keyframes animations run anywhere inside .rl-home (SS16.3: every item in the set is a transition between two declared states, so none is needed). The shared stylesheet declares 6 for the routes phase 3 has yet to port; none is reachable from this page.
PASS 16.3-reduced-motion-off  under prefers-reduced-motion: reduce the script never adds html.js (js=False), so every SS16.3 rest state is absent: 16 transforms all identity (hover included), 14 opacities all 1, 5 clip-paths all `none`, and every remaining transition duration is 0s ({'0s'})
PASS 16.3-no-js-finished-frame  with the `js` class off .rl-home and the <noscript> stylesheet unwrapped, js reads False and nothing declares a rest state: 15 transforms identity, 14 opacities 1 (the copper word included, at 1), 5 clip-paths `none`, 15 ledger rules at scaleX 1, the operator film at its plain 1.30 crop, and the bar at opacity 1
PASS 16.3-no-js-render  the REAL java_script_enabled=False render at 1440: 1133 copper pixels sampled across the `go-to-market.` row (the word is at full strength with no script to light it) and the bar paints its espresso band on 180 of 180 sampled columns
PASS 18-rule-c-every-chip-reads  SS18 Rule C, swept over 7 routes: 24 chips, every one carrying its label against its own ground at >= 4.5:1 (worst 16.97:1). LESSONS #18's gate.
PASS 103b-playbook-price-space  rendered Price row: '$99 at launch · $149 after'
PASS 14.3-copy-gate  87 distinct text nodes, 0 misses ; provenance {"verbatim": 67, "PASS-102 row 1": 2, "PASS-102 row 4": 1, "PASS-102 row 2": 1, "PASS-102 row 3": 1, "PASS-102 row 5": 1, "bar label": 8, "SS14.3 rewrite + SS14.7 initial capital": 2, "verbatim + SS14.7 initial capital": 1, "SS15.6 operator-supplied": 1, "verbatim + SS14.7 terminal full stop": 2} (sources: freight template + content/work frontmatter + app/(room)/packages/page.tsx; exempt: the five bar labels). The two SS14.7 shape changes, in full: [["Millions in contracts won \u00b7 close rate doubled", "SS14.3 rewrite + SS14.7 initial capital"], ["Millions in revenue \u00b7 acquired by Akamai", "SS14.3 rewrite + SS14.7 initial capital"], ["Objections", "verbatim + SS14.7 initial capital"], ["The 80% Wall.", "verbatim + SS14.7 terminal full stop"], ["The objections, in your words.", "verbatim + SS14.7 terminal full stop"]]
PASS 14.3-two-rewrites  the gate enumerates exactly 2 rewrites and both are used: '$14M in revenue' -> 'millions in revenue'; '$3M in contracts won' -> 'millions in contracts won' -- as rendered, with SS14.7's initial capital: ['Millions in contracts won · close rate doubled', 'Millions in revenue · acquired by Akamai']
PASS 14.3-no-years  zero years in the rendered text
PASS 14.3-no-figures  zero digit-bearing tokens outside the allow-list (prices ['$500', '$2,500', '$7,500', '$99', '$5K', '$5B+']; non-figure digit tokens ['80%', '80-percent', 'v0', '01', '02', '03', 'page 6', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'])
PASS no-data-uri-media  the served document is 52303 bytes and carries 0 data: URIs (SS7: data-URI video on the site is rejected). Both clips, both posters and the cover are FILES.

62 checks, 61 pass, 1 fail
```

Final Git status:

```text
 M app/(room)/about/page.tsx
 M app/(room)/call/page.tsx
 M app/(room)/packages/page.tsx
 M app/(room)/playbook/page.tsx
 M app/room-and-ledger.css
 M content/work/guardicore.mdx
 M content/work/rfp-engine.mdx
 M scripts/verify-room.py
?? .planning/qa/pass-103c/
```

Final diff statistics:

```text
 app/(room)/about/page.tsx    | 217 +++++++++++++++++++++----------------------
 app/(room)/call/page.tsx     |   2 +-
 app/(room)/packages/page.tsx |   6 +-
 app/(room)/playbook/page.tsx |  12 +--
 app/room-and-ledger.css      |   3 +
 content/work/guardicore.mdx  |   2 +-
 content/work/rfp-engine.mdx  |   2 +-
 scripts/verify-room.py       |  22 +++--
 8 files changed, 138 insertions(+), 128 deletions(-)
```

Fable handoff: resolve the approved row-10 description versus the 160-character gate, rerun arrival outside the sandbox, and own any commit. The requested changes remain uncommitted in this worktree.
