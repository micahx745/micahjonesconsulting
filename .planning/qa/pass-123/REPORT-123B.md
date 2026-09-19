# REPORT-123B — Pass-123b (GLM batch): RFP contract count retired; study-band BEFORE captures; home CLS attribution

Date: 2026-09-19. Worktree: `.claude/worktrees/p106-live`. No commits, pushes, deploys or
index-changing git commands were run. The four Pass-123a files already modified in the tree
(`app/globals.css`, `components/view-transition-link.tsx`, `app/(foyer)/work/page.tsx`,
`app/(foyer)/page.tsx`) were not touched.

## Part 1 — retire the RFP contract count

Files changed (exactly three, as scoped): `content/work/rfp-engine.mdx` (three strings),
`scripts/work-entry-gate.mjs` (header comment + self-test fixtures),
`scripts/retired-phrases-gate.mjs` (six new phrases appended to `PHRASES`).

### Step 1 — BEFORE text (port 3250, current `.next`)

Port confirmed free first (`netstat` → no listener). `pnpm start -p 3250` served the build
that was already in `.next` (built from the tree including the four Pass-123a files).

```
$ curl -s http://localhost:3250/work | node .planning/exec/visible-text.mjs > .planning/qa/pass-123/rfp/text-before-work.txt
$ curl -s http://localhost:3250/work/rfp-engine | node .planning/exec/visible-text.mjs > .planning/qa/pass-123/rfp/text-before-study.txt
2753 .planning/qa/pass-123/rfp/text-before-work.txt
6783 .planning/qa/pass-123/rfp/text-before-study.txt
$ grep -c "eleven" text-before-work.txt text-before-study.txt
text-before-work.txt:1
text-before-study.txt:2
```

Server stopped (see the incident note at step 8 — the stop was incomplete the first time).

### Step 2 — prove the gate bites (phrases appended to `PHRASES` first)

```
$ node scripts/retired-phrases-gate.mjs; echo "exit=$?"
retired-phrases-gate: content\work\rfp-engine.mdx:18: "eleven awards" — retired copy (LESSONS #3 ledger, LESSONS #15)
retired-phrases-gate: content\work\rfp-engine.mdx:23: "eleven awards" — retired copy (LESSONS #3 ledger, LESSONS #15)
retired-phrases-gate: content\work\rfp-engine.mdx:76: "eleven awards" — retired copy (LESSONS #3 ledger, LESSONS #15)

retired-phrases-gate: 3 finding(s). These phrases were retired by a dated operator ruling. Restore one only with a NEW dated ruling in LESSONS #3, and update this gate in the same commit — never route around it.
exit=1
```

PASS: exit=1, findings name `content/work/rfp-engine.mdx` at lines 18, 23 and 76, nothing else.

### Steps 3–4 — the edits

`content/work/rfp-engine.mdx` (three whole-string replacements, nothing else):

- line 18: `  lead: "$3M in signed contracts across eleven awards."` → `  lead: "$3M in signed contracts."`
- line 23: `  line: "in signed contracts across eleven awards."` → `  line: "in signed contracts."`
- line 76: `- $3M in signed contracts through the platform, across eleven awards.` → `- $3M in signed contracts through the platform.`

`scripts/work-entry-gate.mjs`: header comment line 5 now reads `line "in signed contracts."
(Pass-123 cut the count);`; `expectedRfp = "$3M in signed contracts."`; `defectiveHtml` h3 =
`in signed contracts.`; `correctHtml` h3 = `$3M in signed contracts.`. Nothing else changed.

### Step 5 — both gates

```
$ node scripts/retired-phrases-gate.mjs; echo "exit=$?"
retired-phrases-gate: clean
exit=0
$ node scripts/work-entry-gate.mjs --self-test; echo "exit=$?"
work-entry-gate --self-test: PASS (dropped-figure case reported missing, fixed case passes, &#x27; decodes to ')
exit=0
```

### Step 6 — build

```
$ pnpm build 2>&1 | tee .planning/qa/pass-123/rfp/build.log
> micahjonesconsulting@0.1.0 build C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live
> tsx lib/copy-lint-cli.ts && node scripts/vendor-gate.mjs && node scripts/retired-phrases-gate.mjs --self-test && node scripts/retired-phrases-gate.mjs && node scripts/accent-states-lint.mjs --self-test && node scripts/accent-states-lint.mjs && node scripts/gsap-quarantine-gate.mjs --self-test && node scripts/gsap-quarantine-gate.mjs && next build && node scripts/render-gate.mjs && node scripts/work-entry-gate.mjs --self-test && node scripts/work-entry-gate.mjs

[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.
vendor-gate: clean
retired-phrases-gate self-test: 87 planted caught, 32 near misses passed
retired-phrases-gate: clean
accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms
accent-states-lint: clean
gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean
gsap-quarantine-gate: clean (86 files)
▲ Next.js 16.2.6 (Turbopack)
- Experiments (use with caution):
  ✓ viewTransition

  Creating an optimized production build ...
✓ Compiled successfully in 2.3s
  Running TypeScript ...
  Finished TypeScript in 2.6s ...
  Collecting page data using 23 workers ...
⚠ Using edge runtime on a page currently disables static generation for that page

  Generating static pages using 23 workers (0/22) ...
  Generating static pages using 23 workers ...
  Generating static pages (22/22) in 773ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /about/opengraph-image-10qg6g
├ ○ /api/stripe/webhook
├ ○ /call
├ ○ /call/kickoff
├ ○ /contact
├ ○ /icon.svg
├ ƒ /llms.txt
├ ƒ /opengraph-image-1o6u9y
├ ○ /packages
├ ○ /services
├ ○ /services/thanks
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /work
├ ● /work/[slug]
│ ├ /work/guardicore
│ ├ /work/rfp-engine
│ ├ /work/ordani
│ └ [+2 more paths]
├ ƒ /work/[slug]/opengraph-image-oti546
└ ƒ /work/opengraph-image-xevl18

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)   server-rendered on demand

render-gate: 14 routes — links resolve, fragments exist, metadata within limits.
work-entry-gate --self-test: PASS (dropped-figure case reported missing, fixed case passes, &#x27; decodes to ')
work-entry-gate: PASS birth-worker (1x) "Bookings went from one to three a month to five to ten."
work-entry-gate: PASS content-engine (1x) "Up to 800,000 impressions in a month, up from a few thousand a month."
work-entry-gate: PASS guardicore (1x) "$14M in revenue, sourced and closed, at a $1.2M average enterprise deal."
work-entry-gate: PASS ordani (1x) "Birth workers keep hundreds of dollars per client that a claims service would take."
work-entry-gate: PASS rfp-engine (1x) "$3M in signed contracts."
work-entry-gate: 5 studies — every entry figure+line renders.
```

Exit 0. The expected line is present verbatim:
`work-entry-gate: PASS rfp-engine (1x) "$3M in signed contracts."`

### Step 7 — built HTML grep

```
$ grep -ci "eleven" .next/server/app/work.html .next/server/app/work/rfp-engine.html
.next/server/app/work.html:0
.next/server/app/work/rfp-engine.html:0
```

(grep's own exit 1 = "no matches", which is the expected outcome; counts are `:0` for both —
this reads the RSC payload and JSON-LD too, since it greps the full prerendered file.)

### Step 8 — AFTER text + diffs

INCIDENT (reported, not papered over): the first stop of the step-1 server (harness
TaskStop) killed the `pnpm` wrapper but orphaned the `node.exe` child (PID 43116), which kept
listening on 3250. The first `pnpm start -p 3250` for the AFTER capture therefore died
instantly on EADDRINUSE (empty log, exit 1) and the capture silently hit the STALE server,
still serving the pre-edit build — its text showed `eleven` counts identical to before.
Detected because the counts did not drop; fixed by `taskkill //F //PID 43116`, verifying
`PORT 3250 FREE` via netstat, then a fresh server on the new build. The diffs below are from
the fresh server. The same PID-kill + netstat verification was used to stop the after-server
(PID 49652), so the port is verified free at the end of Part 1.

```
$ grep -c "eleven" text-after-work.txt text-after-study.txt   (fresh server)
.planning/qa/pass-123/rfp/text-after-work.txt:0
.planning/qa/pass-123/rfp/text-after-study.txt:0
```

```
$ diff text-before-work.txt text-after-work.txt
1c1
<           Skip to content                                   MICAH/JONES    Services    Work    About    Contact    Menu —    Close ✕  Services  Work  About  Contact      The work,   on the record.    Four client engagements and the company I founded. Each page says what I found, what I built, and what changed.           →           Guardicore, acquired by Akamai    $14M    in revenue, sourced and closed, at a $1.2M average enterprise deal.    I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.  Positioning & GTM       An award-winning author and leadership consultant who teaches government bodies and corporations    $3M    in signed contracts across eleven awards.    It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.  AI engineering       ORDANI, my company   Birth workers keep hundreds of dollars per client that a claims service would take.    I founded and built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance claims.  Product building       A social activist    Up to   800,000    impressions in a month, up from a few thousand a month.    I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work.  Product building       A birth worker   Bookings went from one to three a month to   five to ten.    I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly.  Positioning & GTM      I find what your buyers are actually paying for, then build the system that sells exactly that.    Also on the record.  Four of the companies I worked inside reached an exit.    SurveyMonkey   Enterprise sales  IPO, 2018   $1M+ in enterprise sales toward the 2018 IPO.    Postmates   Product analyst  Acquired by Uber, $2.65B, 2020   Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.     Guardicore    Revenue and positioning  Acquired by Akamai, 2021     Neuton.AI   Helped launch  Technology acquired by Nordic Semiconductor, 2025   North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.      The next entry in this record could be yours.   Engagements   scoped on a call;   packages   at $500, $2,500 and $7,500.   I read every message and reply inside one business day.   micah@micahjonesconsulting.com  ·  LinkedIn  ·  © 2013–2026 Micah Jones
\ No newline at end of file
---
>           Skip to content                                   MICAH/JONES    Services    Work    About    Contact    Menu —    Close ✕  Services  Work  About  Contact      The work,   on the record.    Four client engagements and the company I founded. Each page says what I found, what I built, and what changed.           →           Guardicore, acquired by Akamai    $14M    in revenue, sourced and closed, at a $1.2M average enterprise deal.    I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.  Positioning & GTM       An award-winning author and leadership consultant who teaches government bodies and corporations    $3M    in signed contracts.    It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.  AI engineering       ORDANI, my company   Birth workers keep hundreds of dollars per client that a claims service would take.    I founded and built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance claims.  Product building       A social activist    Up to   800,000    impressions in a month, up from a few thousand a month.    I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work.  Product building       A birth worker   Bookings went from one to three a month to   five to ten.    I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly.  Positioning & GTM      I find what your buyers are actually paying for, then build the system that sells exactly that.    Also on the record.  Four of the companies I worked inside reached an exit.    SurveyMonkey   Enterprise sales  IPO, 2018   $1M+ in enterprise sales toward the 2018 IPO.    Postmates   Product analyst  Acquired by Uber, $2.65B, 2020   Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.     Guardicore    Revenue and positioning  Acquired by Akamai, 2021     Neuton.AI   Helped launch  Technology acquired by Nordic Semiconductor, 2025   North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.      The next entry in this record could be yours.   Engagements   scoped on a call;   packages   at $500, $2,500 and $7,500.   I read every message and reply inside one business day.   micah@micahjonesconsulting.com  ·  LinkedIn  ·  © 2013–2026 Micah Jones
\ No newline at end of file
```

The only change on the /work page is the `entry.line` string (line 23 of the MDX):
`$3M    in signed contracts across eleven awards.` → `$3M    in signed contracts.`

```
$ diff text-before-study.txt text-after-study.txt
1c1
<           Skip to content   MICAH/JONES    Services    Work    About    Contact    Menu —    Close ✕  Services  Work  About  Contact         An award-winning author and leadership consultant who teaches government bodies and corporations   AI   RFP   software:   $3M   in   signed   contracts     $3M in signed contracts, won through AI software I built for an award-winning author and leadership consultant. It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning. Their close rate went from one in eight to one in four.    Client  An award-winning author and leadership consultant who teaches government bodies and corporations   Name protected     My role  Strategist and sole builder    First real RFPs delivered  Day three    What I built  Discovery, bid/no-bid scoring, a library of their work with provenance, and response drafting    Results   $3M in signed contracts across eleven awards.   Close rate from one in eight to one in four inside six months. Responses out per month: two or three, then eight to ten.          Three responses a month was the ceiling
---
>           Skip to content   MICAH/JONES    Services    Work    About    Contact    Menu —    Close ✕  Services  Work  About  Contact         An award-winning author and leadership consultant who teaches government bodies and corporations   AI   RFP   software:   $3M   in   signed   contracts     $3M in signed contracts, won through AI software I built for an award-winning author and leadership consultant. It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning. Their close rate went from one in eight to one in four.    Client  An award-winning author and leadership consultant who teaches government bodies and corporations   Name protected     My role  Strategist and sole builder    First real RFPs delivered  Day three    What I built  Discovery, bid/no-bid scoring, a library of their work with provenance, and response drafting    Results   $3M in signed contracts.   Close rate from one in eight to one in four inside six months. Responses out per month: two or three, then eight to ten.          Three responses a month was the ceiling
23c23
<  $3M in signed contracts through the platform, across eleven awards.
---
>  $3M in signed contracts through the platform.
```

Two changed hunks on the study: the Results lead (MDX line 18) and the What-changed bullet
(MDX line 76). (`entry.line` renders on /work only, which is why the study has two changes,
not three.)

Byte-exactness proof (the visible text is one line per page, so `diff` cannot isolate the
change; this proves nothing ELSE moved):

```
$ node -e "<replace the three strings in the before files; compare to after>"
work: after == before with the one substitution: true
study: after == before with the two substitutions: true
```

## Part 2 — study-band BEFORE captures (live site, read only)

Script: `.planning/exec/study-before-123.mjs` (one syntax fix during the run: a transposed
`)` in the fullPage screenshot line, caught by node before any capture ran; the first launch
produced zero captures). Log: `.planning/exec/study-before-123.log`, exit 0.

Captures (30 PNGs under `.planning/qa/pass-123/study-before/`): for each of
[guardicore, rfp-engine, ordani, content-engine, birth-worker] × {390, 1440}:
`<slug>-<W>-band.png` (viewport, post-networkidle2 + 2500ms), `<slug>-<W>-full.png`
(full page), `<slug>-<W>-rm.png` (fresh load, `prefers-reduced-motion: reduce`, viewport).
390 loads use DPR 2 / isMobile / hasTouch; 1440 uses DPR 1. Geometry in
`study-before/geometry.json`; summary:

| slug | W | band H | context | title lines (fs/fw) | dek | glance result | media | scrollH |
|---|---|---|---|---|---|---|---|---|
| guardicore | 390 | 1517.23 | 12px/500 | "Repositioning Guardicore:", "$14M, then Akamai" — 36px/800 both | 17px/400 | 26px/700 | 358×447.73 | 5506 |
| guardicore | 1440 | 1022.59 | 13px/500 | same texts — 56px/800 both | 18px/400 | 36px/700 | 404.38×505.47 | 4481 |
| rfp-engine | 390 | 1175.31 | 12px/500 | "AI RFP software:", "$3M in signed contracts" — 36px/800 | 17px/400 | 26px/700 | none | 7354 |
| rfp-engine | 1440 | 1065.30 | 13px/500 | same — 56px/800 | 18px/400 | 36px/700 | none | 6412 |
| ordani | 390 | 1116.38 | 12px/500 | "ORDANI: HIPAA-compliant", "CRM for birth workers" — 36px/800 | 17px/400 | 26px/700 | none | 5511 |
| ordani | 1440 | 982.19 | 13px/500 | same — 56px/800 | 18px/400 | 36px/700 | none | 5334 |
| content-engine | 390 | 1155.56 | 12px/500 | "AI content engine:", "up to 800,000 impressions" — 36px/800 | 17px/400 | 26px/700 | none | 6049 |
| content-engine | 1440 | 1063.28 | 13px/500 | same — 56px/800 | 18px/400 | 36px/700 | none | 5132 |
| birth-worker | 390 | 1142.50 | 12px/500 | "Growing a", "birth worker's practice" — 36px/800 | 17px/400 | 26px/700 | none | 5447 |
| birth-worker | 1440 | 1047.09 | 13px/500 | same — 56px/800 | 18px/400 | 36px/700 | none | 4796 |

Notes a designer will want, stated as measurements, not verdicts: only guardicore mounts a
`.cs-band__media` (it is the one study with a `hero`); every study renders exactly 2 title
lines; rfp-engine is the longest page at both widths (7354 / 6412); the rfp-engine title line
2 already reads "$3M in signed contracts" — the live band title never carried the count (the
count lived in `results.lead`, `entry.line` and the What-changed bullet).

## Part 3 — home CLS attribution (live site, read only)

Script: `.planning/exec/cls-attrib-123.mjs`; log `.planning/exec/cls-attrib-123.log`,
exit 0. Same load + scroll as Pass-123a's `cls-123.mjs`; every layout-shift entry recorded
with per-source selectors and rects; Chrome session-window CLS computed as well.

| width | total (Pass-123a method) | largest session window (Chrome method) | windows |
|---|---|---|---|
| 390 | 0.3298 | 0.32980 | 1 |
| 1440 | 0.2035 | 0.19902 | 2 |

Top entries by value (all files: `.planning/qa/pass-123/cls-attrib-390.json`,
`cls-attrib-1440.json`):

**390 — every entry (2 total; fewer than 12 exist):**

1. value=0.18410, startTime=6594.7ms, scrollY=5600, input=false — sources:
   `section.cw-exits > div.cw-exits__stage > ol.cw-exits__row > li.cw-exits__deal`
   (350×153 → 350×268.6), two `p.cw-exits__val` (368.3×95.7 → 338.4×120.3;
   368.3×106.2 → 338.4×120.3), two `p.cw-exits__co` appearing (0×0 → 196.5×27.9 and
   0×0 → 95.6×17.5).
2. value=0.14570, startTime=6845.3ms, scrollY=6000, input=false — same source set:
   another `li.cw-exits__deal` (350×27.5 → 350×146.5), `p.cw-exits__val` pair resizing
   (370×93.8 → 338.5×120.3), two more `p.cw-exits__co` appearing from 0×0.

**1440 — top 4 (4 total):**

1. value=0.10947, startTime=6297.9ms, scrollY=5600, input=false —
   `li.cw-exits__deal` cards (1360×351.2 → 1360×163.3; 1360×141 → 1360×163.3; one appearing
   0×0 → 1360×131.9), `p.cw-exits__val` (998.1×377.1 → 907.4×354.5).
2. value=0.08930, startTime=5928.6ms, scrollY=5000, input=false — `li.cw-exits__deal`
   (1360×62.8 → 1360×272.8), `p.cw-exits__val` (937.3×169 → 861.3×311.2), two
   `p.cw-exits__co` moving/resizing.
3. value=0.00448, startTime=202.9ms, scrollY=0, input=false — load-time:
   `h1.cw-h1 > span.cw-line > span` (1360×76.8 → 1360×76.8), `header.cw-hero > p.cw-sub`
   and its `em` moving down 1px (39,557.4 → 40,588.9).
4. value=0.00025, startTime=6544.3ms, scrollY=6000, input=false —
   `p.cw-exits__outcome` (247.7×55 → 247.7×55).

Attribution: the CLS is the home receipts scoreboard (`section.cw-exits`, the Pass-122
scroll-driven four-exits section), not the hero or the receipts figure. At both widths,
every entry over 0.08 fires during the scripted scroll (scrollY 5000–6000) as the scoreboard
goes live: deal cards change height, the big `p.cw-exits__val` numbers resize to their
assembled size, and the `p.cw-exits__co` company labels render in from nothing. Mobile has
no other source at all (the two scoreboard entries ARE the 0.33); desktop adds only the
0.0045 load-time hero-sub 1px shift. Caveat for the fix brief: these shifts happen ~6.3–6.9s
after navigation start because the scroll script reaches the section then — the section's
assembling-on-activation is the mechanism, whenever the reader scrolls to it.
