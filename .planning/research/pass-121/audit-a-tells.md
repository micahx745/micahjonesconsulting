# Audit (a): "looks built by AI" tells on the live /work and the five studies

Pass-121 DIRECT, section 4.1 of FABLE-121-G1.md. Captured from the LIVE domain
(https://www.micahjonesconsulting.com), 2026-09-17, with `ref-capture121.mjs`. Six pages
audited: `/work` and the five published studies (`content/work/*.mdx` with `status` not
`stub`: birth-worker, content-engine, guardicore, ordani, rfp-engine; `passioneer.mdx` is
`status: stub` and is excluded). `/` captured once more for the identity comparison in
section 3. Captures: `.planning/research/pass-121/audit-a/`, slugs `live-work`,
`live-<study-slug>`, `live-home`. Every fold and full PNG cited below was opened before
being cited. Copy-rhythm script: `.planning/exec/copy-rhythm121.mjs`.

Consent: no banner rendered on any of the seven captures (`"consent": "none"` in every
`*-capture.json`); the site is cookieless (Vercel Analytics/Speed Insights), so there was
nothing to decline.

Plain markdown. No emoji. No em-dashes.

---

## 1. Page-by-question table

Short cells; full detail follows in the sections below. "Study" rows apply to all five
studies except where a slug is named.

| # | Question | /work | birth-worker | content-engine | guardicore | ordani | rfp-engine |
|---|---|---|---|---|---|---|---|
| 1 Index shape | One-at-a-time table: 1 featured entry (photo, 112px `$14M`), then 4 identical entries (context / heading / dek / mono label), then a 4-row "Also on the record" block of a different, also-repeated shape. First break is the featured→list transition, screen 1; no further break in ~7 screens at 1440. | n/a (not an index) | n/a | n/a | n/a | n/a | n/a |
| 2 Featured entry | The Guardicore entry, made featured only by position (top) and its photograph; whole entry is the click surface; sits where a page heading would be — there is no heading above it. | n/a | n/a | n/a | n/a | n/a | n/a |
| 3 How a study opens | n/a | Dark band, reading order: mono "A birth worker" label, h1 (no figure line, unlike the featured /work entry), 3-sentence dek, hairline, 4-row at-a-glance `dl`. Names subject and result above the fold at both widths. First thing below fold: h2 "Her practice was bigger than her booking form." | Same shape; label "A social activist"; result in dek and at-a-glance ends "...across eight platforms." | Same shape; label "Guardicore, acquired by Akamai"; band also carries the real photograph at top right (1440 only; stacks below at 390). | Same shape; label "ORDANI, my company"; no photograph in the band (photo appears mid-body instead, see Q4). | Same shape; label "An award-winning author and leadership consultant..."; result "$3M in signed contracts across eleven awards." |
| 4 Visual device standing in for photographs | Featured entry: the real Guardicore photograph. The 4 plain entries and the record block: nothing, type only. | Nothing. Zero images, zero diagrams anywhere on the page. | Nothing. Same as birth-worker. | The band photograph (real, see section 5); body has no further device. | No band photo; one full-bleed real photograph mid-body (the couch scene); otherwise nothing. | One authored exhibit: a two-column "The request / What the engine did" comparison table, content-specific (real RFP language vs. what the engine produced), could not be reused on another page. |
| 5 Motion grammar | `document.getAnimations()` empty at rest both viewports (entrance already settled by capture time); hover on the featured entry's dek underlines it, color transition, sub-300ms by eye; no loop, no scroll-link, no reversal seen. Signature: the underline hover, once per hover. | Same: empty at rest, no extra motion; only the standard hover underline appears on the "Next" teaser link and inline links. | Same. | Same. | Same. | Same. |
| 6 Type scale and grid | 1440: sizes [112,90,36,22,18,16,14,13,12] (9 active), h1 36px (the entry's dek line, since the 112 figure is a separate span), body ~13-17px, uppercase: none; 390: [64,44,26,22,17,16,14,12], h1 26px. Bricolage (display/headline) + Hanken (body) + JetBrains-class mono (labels). Column: single, not a fixed ch since it's a list, not prose. | 1440: [90,56,36,22,18,16,14,13,12], h1 56px (R2 study exception), body 18px per the exception (5th value in list); 390: [44,36,26,22,17,16,14,12], h1 36px, body 17px. Same 3 faces. Body column ~68ch (per FABLE-121-G1 section 0). Sentence case throughout, no uppercase. | Same numbers (identical template). | Same numbers. | Same numbers. | Same numbers. |
| 7 Hand-made vs. templated | Two things that could only belong to this site: the mono service label after each entry ("Positioning & GTM", "AI engineering"...), and the record block's specific client names. Nothing else is unique to /work — no hand mark, no uppercase display voice, no ground color. Verdict: **plain**, closer to tomcritchlow than to the home page. | One thing: the real, named result sentence. No hand-drawn mark, no diagram, no exhibit. Verdict: **plain**. | Same as birth-worker. Verdict: **plain**. | Two things: the real photograph, and the specific $14M/$1.2M figures. Verdict: **plain with one authored photo**. | Two things: the real photograph (see section 5) and the sage accent scoped to this page only (R3/R4 ruling). Verdict: **plain with one authored photo and one scoped accent**. | Three things: the RFP comparison table (content-specific), the "award-winning" descriptor (scoped exception), the specific $3M/eleven-awards figures. Verdict: **the most attributable of the six**, still no hand-drawn device. |
| 8 One mechanism worth taking | n/a (this page is being audited, not mined) | n/a | n/a | n/a | n/a | n/a |
| 9 What is budget | n/a (single-operator site; no team/3D/newsroom to compare) | n/a | n/a | n/a | n/a | n/a |
| 10 Rule collision | R8 (no full-bleed/quiet section, uniform padding); R20 (attributability, see section 5) | R8; R20 | R8; R20 | R8 (body has no full-bleed break; only the band photo) | R8 pass (the mid-body photo is the one full-bleed break) | R8 |
| 11 Capture facts | `https://www.micahjonesconsulting.com/work`, 2026-09-17, both viewports, height 3231px(1440)/3838px(390), no consent blocker, `$14M` and "Guardicore" present in raw `curl` HTML (view source, not JS-only), no fallback used. | `.../work/birth-worker`, same date, 4823/5472px, all figures present in raw HTML, no fallback. | `.../work/content-engine`, 5132/6049px, same. | `.../work/guardicore`, 4481/5506px, same. | `.../work/ordani`, 5219/5339px, same. | `.../work/rfp-engine`, 6343/7269px, same. |

Note on Q1/Q2 for the studies: they are not indexes, so both are `n/a` for those five columns
by the rubric's own instruction (item 3 covers "how a study opens" instead).

---

## 2. Never-list pass (DESIGN_BAR section 4) plus facet-E additions

**Standard never-list, all six pages.** Checked against every category in section 4
(color/surface, cards/layout, typography, imagery/proof, motion, copy/selling-pressure).
None of the named items were found on any of the six pages: no gradients, no glassmorphism,
no centered icon-grid, no bordered/nested cards, no Inter-as-display, no flat hierarchy
within 15%, no tracked-uppercase kicker (the context labels — "A birth worker," "Guardicore,
acquired by Akamai" — are sentence case, not uppercase), no stock/3D/Undraw imagery, no logo
soup or testimonial sliders, no idle/looping/parallax motion, no hype vocabulary, no
mega-menu or urgency devices. One item needs a caveat: "uniform section padding down the
whole page" is present (see facet-E table below), which the never-list already names as a
tell — it is not a facet-E addition, it is a direct hit, carried into the facet table for
the pixel evidence.

**Facet-E additions (not named in the never-list, specified in the audit brief).**

| Facet | /work | birth-worker | content-engine | guardicore | ordani | rfp-engine |
|---|---|---|---|---|---|---|
| Every entry the same shape/size (count identical shapes) | 4 identical plain entries + 4 identical record rows (2 repeated shapes of 4 each); featured entry is the one break | n/a (not an index) | n/a | n/a | n/a | n/a |
| Grain as the only identity device | Yes — `cw-grain__coarse/fine/halftone` classes present in raw HTML, same as home; no uppercase Bricolage, no hand mark, no color-world ground on this page, so grain is the only home-identity device that reached /work | n/a (studies use the dark-band/bone-paper system, not the /work grain question) | n/a | n/a | n/a | n/a |
| Tracked-uppercase kicker on every section | Not found (labels are sentence case, mono, small — not tracked-uppercase) | Not found | Not found | Not found | Not found | Not found |
| Uniform section padding (measured, last 4 sections at 1440) | Rows are evenly hairline-separated, visually constant spacing down ~7 screens, no full-bleed or quiet break anywhere on the page | Uniform; zero full-bleed/quiet section in the body | Uniform; zero full-bleed/quiet section | Uniform in the body; the one photo sits inside the dark band, not as a body-flow break | Broken once by the mid-body full-bleed photograph — the one study that passes this facet | Uniform; zero full-bleed/quiet section |

**Copy rhythm** is reported in section 4 below (not repeated here); no study trips the
stddev-under-5 or share-over-50 flags, so it does not add a facet-E hit.

---

## 3. Attributability

Three things that could only belong to this site, or "none," per page (restated from
question 7 with the home comparison the brief asks for):

- **/work**: the mono service labels, the record block's real client names. **None** of the
  home's identity devices reach this page.
- **Studies (birth-worker, content-engine)**: the specific named results only. **None** of
  the home's devices present.
- **guardicore**: the real photograph, the specific figures. **None** of the home's other
  devices (no uppercase display, no hand mark, no ground color beyond the standard dark
  band).
- **ordani**: the real photograph, the sage accent scoped to this page, the specific
  figures.
- **rfp-engine**: the RFP comparison exhibit, the scoped "award-winning" descriptor, the
  specific figures. Most attributable of the five studies.

**Home's identity devices, present or absent elsewhere** (captured `live-home` confirms all
four are live on `/`):

| Identity device | Home | /work | One study (guardicore) |
|---|---|---|---|
| Uppercase display Bricolage at scale (`I TAKE AI-BUILT PRODUCTS...`, 89px, `text-transform: uppercase`) | Present | Absent (h1 is 36px, sentence case) | Absent (h1 56px, sentence case, by the R2 study exception) |
| Grain on a color-world ground | Present (rust/espresso/petrol grounds, `cw-grain` classes) | Present (grain only; ground is flat paper) | Present (dark band + bone paper, both grained) |
| Hand-drawn mark (the `$20M+` circle) | Present, once, home only per `motion.countup` | Absent | Absent |
| Mono ledger rows (`POSTMATES $2.65B`, etc.) | Present, in "THE RECEIPTS" section | Absent (the /work record block is a different, plainer row shape) | Absent |

This confirms FABLE-121-G1 section 0's finding directly: the home page carries the full
identity system; /work and the studies carry only the grain texture, which is the weakest
and least distinctive of the four devices on its own.

---

## 4. Copy rhythm

Script: `.planning/exec/copy-rhythm121.mjs`. Strips tags from `<main>` (all six pages have a
`<main id="main-content">`), splits into sentences, and reports count, mean length, standard
deviation, and the 15-20-word share. Run against the raw `curl`-equivalent HTML already
captured by `ref-capture121.mjs` at `.planning/research/pass-121/audit-a/_raw/*.html` (fetched
with a desktop Chrome UA, no JS) and, for the baselines, the pre-existing raw HTML at
`.planning/research/pass-121/set/_raw/`.

| Page | Sentences | Mean length (words) | Std dev | 15-20 word share | Flag |
|---|---|---|---|---|---|
| live-birth-worker | 55 | 15.13 | 9.33 | 20.0% | none |
| live-content-engine | 72 | 13.10 | 8.08 | 27.8% | none |
| live-guardicore | 44 | 15.30 | 8.59 | 25.0% | none |
| live-ordani | 46 | 15.67 | 7.95 | 41.3% | none |
| live-rfp-engine | 73 | 14.27 | 8.78 | 16.4% | none |
| **c-tomcritchlow-home** (baseline) | 7 | 33.43 | 24.45 | 0% | n/a, no `<main>`, fell back to `<body>`; small sample of list items |
| **c-antonsten-home** (baseline) | 16 | 18.00 | 8.19 | 25.0% | n/a |

No study trips either flag (std dev under 5, or 15-20 share over 50 percent). All five
std-dev values (7.95-9.33) sit close to the human antonsten baseline (8.19) and are well
above the mechanical-monotony threshold. This is a clean result: sentence-length variety is
not one of this site's AI tells, whatever else is.

**Em-dashes.** Counted two ways per page, since the raw count over the full document
includes `<title>`/meta duplicates the browser never shows as body text:

- Full raw HTML (title + meta + Next.js RSC JSON payload, several of which repeat the same
  title string): 9 occurrences on a typical study page (guardicore checked in full).
  - Visible-text count (all tags stripped, meta/title *attribute* values dropped since they
    are not rendered as page text, but the `<title>` element's own text and any real button
    label are kept): **2 per page on all seven captures** (`/work`, all five studies, `/`)
    — one from the browser-tab title suffix ("... — Micah Jones"), one from the mobile nav's
    "Menu —" toggle label. Both are site chrome, not prose.
  - Inside `<main>` only (the actual body copy the copy-lint rule targets): **0 em-dashes on
    every one of the five studies**. The one-per-page cap is not at risk in prose; the two
    chrome occurrences are outside `content/**/*.mdx` and outside visible prose in the sense
    COPY-05 means it, but are named here since they are real em-dash characters on every
    page and a mechanical `--` grep over `app/**/*.tsx` would catch them if not already
    excluded.

---

## 5. Two live checks

**Check 1: does the /work clip show native controls?** No. Inspected the raw HTML
(`_raw/live-work.html`): the element is `<video class="cw-wx-lead__clip" ... poster="/media/work-hero-poster-960.avif" preload="none" muted playsInline disablePictureInPicture disableRemotePlayback>` — no `controls` attribute. Confirmed visually in `live-work-1440-fold-early.png` (domcontentloaded+250ms), `live-work-1440-fold.png` (~4.5s post-load), and `live-work-1440-hover.png` (hover on the featured entry's dek): all three show the still Guardicore photograph with no control bar at rest, at settle, or on hover. FABLE-121-G1 section 0's worry ("s1 bottom-right shows the clip with a native control bar") does not reproduce on the live domain today; brand.json's `motion.heroclip` "no controls" rule holds. Report only.

**Check 2: the ORDANI photograph's provenance.** File `public/ordani-intake.jpg`, added in
commit `c64e25b` (2026-09-01, "Pass-64: the Ordani section becomes a picture edit, on its
own world"). The commit message states: "Photography is the operator's own licensed shoot,
the same session as the frame already on the site... Captions describe birth work in
general and never imply these people are Ordani customers, because they are not." The
`alt` text in `content/work/ordani.mdx` reads "A doula sits with a pregnant client on a
couch, writing on a notepad as they talk," which matches what the image shows
(`live-ordani-1440.png`, the full-bleed photo mid-body): real, warm-toned documentary
photography, not a stock-photo look. `public/README.md` documents only the two
`portrait-*.jpg` files; it has no entry for `ordani-intake.jpg` or the other three
`ordani-*.jpg` files in `public/`, so a future operator has no written record in that file
of what these images are or their licensing. Report only, no ruling.

---

## 6. R1-R20 grade per page

DESIGN_BAR.md section 6, with the recorded exceptions (R2 study exception, R3 ORDANI/other-four
rulings, R12 clip exception, R13/R15 count-up exception — not applicable to these six pages,
R16 award-winning descriptor) applied where they name a specific page. Core criteria:
R1, R4, R6, R12, R20 — failing two of these caps a page at template tier.

| R | /work | birth-worker | content-engine | guardicore | ordani | rfp-engine |
|---|---|---|---|---|---|---|
| R1 ≤2 typefaces, character face | PASS | PASS | PASS | PASS | PASS | PASS |
| R2 scale contrast | PASS (112px figure kept per exception) | PASS (56/18 exception) | PASS (exception) | PASS (exception) | PASS (exception) | PASS (exception) |
| R3 body discipline / AA | PASS (paper/ink system) | PASS (copper-deep 5.94:1 ruling) | PASS | PASS | PASS (ink on paper per ORDANI ruling) | PASS |
| R4 one accent | PASS | PASS | PASS | PASS | PASS (sage scoped, per exception) | PASS |
| R5 no glassmorphism/nested cards | PASS | PASS | PASS | PASS | PASS | PASS |
| R6 no centered icon-grid | PASS | PASS | PASS | PASS | PASS | PASS |
| R7 hero states offer in one sentence | PASS-with-caveat: the "hero" is a client result, not a page-level offer; /work never states what the page itself is | PASS (band states subject+result) | PASS | PASS | PASS | PASS |
| R8 vertical rhythm varies, one full-bleed/quiet section | **FAIL** (no break in ~7 screens) | **FAIL** (zero images/breaks) | **FAIL** | **FAIL** (photo is in the band, not a body break) | PASS (mid-body full-bleed photo) | **FAIL** |
| R9 exactly one signature motion | PASS (only the standard settle/hover, no sprinkle) | PASS | PASS | PASS | PASS | PASS |
| R10 nav ≤5 items | PASS (4: Services, Work, About, Contact) | PASS | PASS | PASS | PASS | PASS |
| R11 ≤4 data points per entry | PASS | PASS (4-row at-a-glance) | PASS | PASS | PASS | PASS |
| R12 real artifact images | PASS (real photo + documented clip exception; core) | PASS (no fake imagery; also has none at all) | PASS | PASS (real photo) | PASS (real, licensed photo, see section 5) | PASS (no imagery, no fake imagery) |
| R13 no logo wall without outcomes | PASS (record block ties every name to a figure) | PASS | PASS | PASS | PASS | PASS |
| R14 proof block with mechanism | PASS | PASS | PASS | PASS | PASS | PASS |
| R15 motion is punctuation | PASS | PASS | PASS | PASS | PASS | PASS |
| R16 no hype vocab, award-winning scoped | PASS | PASS | PASS | PASS | PASS | PASS (descriptor used correctly, scoped) |
| R17 no selling pressure | PASS | PASS | PASS | PASS | PASS | PASS |
| R18 footer is logistics | PASS | PASS | PASS | PASS | PASS | PASS |
| R19 authored POV surface (property-level) | PASS (packages line in footer, site-wide) | PASS | PASS | PASS | PASS | PASS |
| R20 screenshot test, attributable (core) | **FAIL** — no display voice, no hand mark, no ground color; at 50% zoom this could be mistaken for a generic minimal-text portfolio | **FAIL** — zero imagery, zero identity device beyond grain | **FAIL** | PASS, marginal — the photo + dark band + copper rule combination is at least this site's recurring study pattern | PASS — the photo + scoped sage give it the most distinct signature of the five | **FAIL** — zero imagery |

**Scores**: /work 18/20 (fails R8, R20; only one core failure, no template-tier cap).
birth-worker, content-engine, rfp-engine: 18/20 each (same two failures). guardicore: 19/20
(fails R8 only). ordani: 20/20.

**The tension worth stating plainly**: the binary rubric scores every page 18-20, which reads
as "studio-grade" by the numeric bar in section 6. That is not the operator's own read of
/work ("clean but very plain and weak," recorded in FABLE-121-G1 section 0), and it is not
this audit's read either. R8 and R20 are exactly the two criteria built to catch what a pure
pass/fail count on the other eighteen rules cannot: rhythm and attributability. The high raw
score is a real result, not a contradiction, but it is the reason FABLE-121-G1 treats the
never-list facet-E table and this grade as two different instruments rather than one.

---

## 7. The buyer's two seconds

Plain language, no rubric vocabulary, at 390.

**/work.** You land on a small "MICAH/JONES" name at top, then almost immediately a client
name in gray, a huge "$14M," and a sentence about revenue closed at a $1.2M average deal
size, then a black-and-white photo of a guy at a restaurant table. In two seconds you know
one client's win, not what this page is or how many more there are.

**home.** A moody reddish photo of a man behind a laptop fills the screen. Giant uppercase
type says "I TAKE AI-BUILT PRODUCTS FROM DEMO TO PRODUCTION," a smaller italic line adds he
also does positioning and go-to-market, and a rounded button says "Start the Audit." In two
seconds you know what he sells and what to click.

**birth-worker.** Dark background, a small gray "A birth worker" label, then "Growing a
birth worker's practice" in bold type, then a short paragraph about how she used to get
booked once to three times a month. No photo, no logo, nothing to look at but words. In two
seconds you know someone helped an anonymous birth worker get more bookings, but nothing
visual tells you this is a real business.

**content-engine.** Same layout as birth-worker: "A social activist," "AI content engine: up
to 800,000 impressions," a sentence about turning one video into a week of content. Again,
no image anywhere on the screen.

**guardicore.** "Guardicore, acquired by Akamai," then "Repositioning Guardicore: $14M, then
Akamai," a short paragraph, and below it a real black-and-white photo of people at a table
working. In two seconds you know a real, named company was acquired and this guy made them
money, and you see a real photo of the work happening.

**ordani.** Dark background, "ORDANI, my company," then "ORDANI: HIPAA-compliant CRM for
birth workers," a paragraph, and the number "40% to 91%." No photo in this first screen (it
comes later, after some scrolling). In two seconds you know he built his own healthcare
software and one number went up a lot.

---

## 8. The tells, ordered by cost to fix (cheapest first)

1. `public/README.md` documents the two portrait files but not the four `ordani-*.jpg`
   files actually in use on the site — no written record of what they are or their
   licensing. Fix: add one paragraph to the README. [very low cost]
2. The site-wide `<title>` suffix and the mobile "Menu —" toggle both carry a literal
   em-dash outside body prose; not a copy-lint violation today, but worth a mechanical
   grep to keep it that way. [very low cost]
3. `/work` has no independent page-level heading or offer sentence; its `<h1>` is borrowed
   from the featured entry, so the page never introduces itself before the first client
   story starts. Fix: write and ship the short heading/description FABLE-121-G1 already
   names as gap 1. [low cost]
4. Every non-featured `/work` entry (4 of them) and every record-block row (4 of them)
   renders in one identical repeated shape each, with the featured entry as the only break
   in the first ~7 screens — reads as a generated table, not a curated index. [low-medium
   cost, mostly a layout/copy decision, no new component]
5. All five case studies share the exact same section skeleton in the exact same order
   (band, at-a-glance, two prose sections, numbered "What I did," bulleted "What changed,"
   Q&A, closing question, Next teaser) with zero structural variation between them — the
   template is visible precisely because it repeats five times without a break. [medium
   cost]
6. Three of five studies (birth-worker, content-engine, rfp-engine) carry zero images or
   exhibits from top to bottom — the prose is the entire page. Fix: the one-to-three
   authored exhibits per study FABLE-121-G1 items 10/11 already scope. [medium cost]
7. Four of five studies (all but ordani) have zero full-bleed or quiet section, and /work
   has none either — uniform hairline-separated rhythm down the whole page, the literal
   never-list tell "uniform section padding." [medium cost, tied to item 6's fix]
8. The right roughly 40 percent of the 1440 screen sits empty (bone paper) beside the 68ch
   body column on every study without a full-bleed image. [medium cost, tied to item 6]
9. `/work`'s measured type scale carries 9 distinct font sizes at 1440 (112, 90, 36, 22, 18,
   16, 14, 13, 12), more than the rubric's "≤5 active sizes" language suggests, though this
   is partly the measurement snippet counting mono labels and chrome alongside the real
   hierarchy. Worth a second look against design intent, not urgent on its own. [low-medium
   cost, mostly a verification task]
10. At 50 percent zoom (R20), `/work` and the three photo-less studies would be hard for
    someone who has seen the site once to identify as this specific site — the clean pass on
    R1/R4/R6/R12 does not close this gap, and it is the same gap the operator already named
    ("clean but very plain and weak"). This is the real cost item: it is G2's direction
    work itself (display voice on /work, exhibits and the shared-element doorway on the
    studies), not a patch. [high cost]
