# REFERENCES 2026 — five patterns, measured live

Leg A of the §17 design-critique arc ("really think about UI design and look at those
references and look up web search"). Twelve live pages fetched and measured in Chromium 151
at 1440×1000 on **2026-09-06**. Every number below is a computed style or a
`getBoundingClientRect()` read off that page on that date — nothing is quoted from a teardown
and nothing is remembered.

**Contact sheet:** `<scratchpad>/ref-2026-sheet.png` (1240 × 7880, nine labelled panels A–I).
**Raw section crops:** `<scratchpad>/refs/sec-*.png`. **Measurement dumps:**
`C:/tmp/refleg/meas2.json`, `m2.json`, `m3.json`.

---

## 0. The verified set, with provenance

Provenance is recorded in three honest tiers. Tier 1 is a jury listing I fetched. Tier 2 is a
curated gallery listing I fetched. Tier 3 is product-design canon with **no jury listing found** —
included because the composition is the best live example of the pattern, and labelled as such
rather than dressed up.

| # | URL | HTTP | `<title>` | Provenance |
|---|---|---|---|---|
| 1 | `https://www.warp.dev/pricing` | 200 | Pricing \| Warp | **T3** |
| 2 | `https://basecamp.com/pricing` | 200 | Basecamp — Pricing | **T3** |
| 3 | `https://cursor.com/pricing` | 200 | Cursor · Pricing | **T3** |
| 4 | `https://www.framer.com/pricing/` | 200 | Framer: Pricing | **T3** |
| 5 | `https://resend.com/pricing` | 200 | Pricing · Resend | **T3** |
| 6 | `https://press.stripe.com/poor-charlies-almanack` | 200 | Stripe Press — Poor Charlie's Almanack | **T2** — siteInspire entry 11846 (fetched 200, title "Stripe Press — Poor Charlie's Almanack", tags *Typographic · Business & Finance · Books & Literature*, published 2023-12-06); Minimal Gallery entry (fetched 200, "Stripe Press", published 2021-10-08). Both listings predate the 18-month window; the page is live and still curated. Stated, not glossed. |
| 7 | `https://www.practical-ui.com/` | 200 | UI design book - Practical UI | **T3** (searched Awwwards / Minimal Gallery / siteInspire / Land-book — no listing found) |
| 8 | `https://www.refactoringui.com/book` | 200 | Refactoring UI | **T3** |
| 9 | `https://linear.app/method` | 200 | Linear Method – Practices for building | **T2** — linear.app carries two Land-book entries (`land-book.com/websites/61990-linear-plan-and-build-products`, `.../53266-linear-asks-linear`). Land-book returns **403** to my fetcher, so those entries are search-verified, not fetch-verified. |
| 10 | `https://locomotive.ca/en/work` | 200 | Work \| Locomotive | **T1** — Awwwards profile fetched 200 ("Locomotive - Awwwards"): **1 SOTY, 4 SOTM, 91 SOTD, 131 HM**; most recent SOTD *Wolverine Worldwide, 24 Jun 2026* |
| 11 | `https://basement.studio/work` | 200 | Showcase \| basement.studio | **T1** — Awwwards profile fetched 200 ("basement studio - Awwwards"): **21 SOTD, 11 SOTY, 20 HM**; most recent HM *USAvionix, 10 Aug 2026* |
| 12 | `https://www.aardvarkbookclub.co.uk/` | 200 | Aardvark Book Club - Unbox stories worth talking about | **T1** — on the live Awwwards SOTD index (fetched 200) as *Aardvark Book Club, FUTURE THREE®, **30 Aug 2026*** |

Rejected after fetching: `darkroom.engineering` (200 — neon/mono register, unusable here);
`linear.app/pricing`, `attio.com/pricing`, `vercel.com/pricing` (200 each — all put the top tier
in a fourth column, the thing §14.5 already ruled against); `polar.sh/pricing` (**404**);
`aiindesignreport.com` (DNS failure).

---

## P1 · A pricing row with a distinct premium tier

### Best reference — **Warp**, `https://www.warp.dev/pricing` (200, "Pricing | Warp") — panel A

The mechanism, measured. Content column **1200px at x120** (120px gutters at 1440).

- **Row 1** — `grid-template-columns: 394.656px 394.672px 394.656px`, **gap 8px**. Three cards.
- **Row 2** — two cards of **596 × 852px** at x120 and x724, same 8px gap. 596 = (1200 − 8) / 2,
  so each premium block is **1.51× the width of a row-1 card**. Rank is width.
- One card system throughout: white fill, **`border-radius: 4px`, `padding: 24px`,
  `gap: 24px`** between card children, no shadow, no border on the unmarked cards.
- **One price size everywhere:** 48px / lh 48 / w600, `letter-spacing: -1.2px` — `$0`, `$20`,
  `$200`, `$50`, and the word **`Custom` measured at 166 × 48px**: the word takes the number's
  slot at the number's size. (Same finding as `CORPUS-PRICING-SECTIONS §B` on tambo.)
- **How the premium tier is marked — exactly two devices, no third:** a 2px outer wrapper at
  `radius: 6px` reading as a 1px lilac ring (measured 395 × 851 around the 391 × 847 card), plus
  an inline pill **104 × 24px**, `radius: 9999px`, `padding: 2px 10px`, label 12px / lh 20 / w500,
  set **on the tier-name line**. Never above the card, never a ribbon, never a scale-up.
- **Hover:** nothing on the card; the CTA only.

### Second reference — **Basecamp**, `https://basecamp.com/pricing` (200) — panel B

Five offers and not one of them a column: an **792px block, `grid-template-columns: 306.641px
485.734px`** — a **307px selector rail** of five tier rows on the left, a **486px detail panel**
on the right, separated by a single **1px `rgba(0,0,0,0.10)`** rule with no radius on the seam.
Only the selected tier prints its price, its CTA and its list. Rank is a **104 × 21px** badge
(`The sweet spot`, 13.3px / w500, `radius 2.67px`) sitting inline on one row. Five offers read as
one ranked list rather than five peers — precisely the operator's complaint.

### Third reference — **Resend**, `https://resend.com/pricing` (200) — panel H

What to do with offers that are *not* tiers: `Add-ons` is a **1022px stacked tray**,
`padding: 40px 32px`, each add-on a full-width row carrying its price inside its own 20px / lh 26
heading and its own button. A different shape cannot be misread as a fifth column. Same
conclusion as `CORPUS-PRICING-SECTIONS §A/§B`, where cora and tambo both put the fourth offer in
a dark full-width bar under the tray.

### Also measured, and rejected as models

Cursor (200): four equal cells on twelve × 108.328px columns, marked tier by CTA weight only.
Framer (200): four equal columns, marked by a blue CTA. Linear / Attio / Vercel (200 each): top
tier as a fourth column. Four columns is what the corpus and §14.5 already reject; none of these
solves rank.

---

## P2 · A single product sold on a page (a book, a manual)

### Best reference — **Stripe Press**, `https://press.stripe.com/poor-charlies-almanack` (200, "Stripe Press — Poor Charlie's Almanack") — panel C

- Page 1440, `main` padding **0 115.2px**. Two columns: the cover on the left, a **508px** copy
  column at **x817**. Body 17px / lh 25.5 / w500 (Ivar Text, a serif).
- **The cover carries no frame.** It sits on the section's own ground (a flat olive field) at
  **380 × 570** with a cast shadow that belongs to the object, not to a container. Nothing is
  drawn around it.
- **The buy block is a ledger, not a button.** One bordered box **508 × 220px** holding **five
  rows at 44px each**; each row is `label` + `price` on the left (`Purchase on Stripe   $30`) and
  an **↗ in its own right-hand cell divided by a vertical rule**. One border around the block,
  hairlines between rows, nothing else on the page carries a border.
- The supporting material is ranked below and set quieter: `——— Authors`, then a three-column
  `Praise` grid of pull quotes at body size.

### Second reference — **Practical UI**, `https://www.practical-ui.com/` (200)

The whole selling page runs on a **680px centred measure** (block at x380, w680) — narrower than
anything above it. Section head 40px / lh 52 / w600, `letter-spacing: -1px`. Chapter list,
"what's included", payment badges and a nine-question FAQ all live inside that one 680px column.
The lesson for a manual section: the product argument is a **narrow reading column**, not a
full-bleed row.

### Third reference — **Refactoring UI**, `https://www.refactoringui.com/book` (200)

Cover **477 × 576** unframed at x991; the two package prices at **48px / lh 48 / w600,
`ls -2.4px`** side by side at x224 and x704 — the Warp relationship again (one price size,
position carries the rank). The team-licence tiers further down are a bare five-row list whose
only styled element is `$399 →`, `$649 →`, `$1249 →`, `$1799 →` at 18px / lh 32 / w600,
right-flush at x≈1014–1088. Prices right-flush in a rule-less list; no cards at all.

---

## P3 · A compact FAQ / objections block

Three independent 2026 pages agree, and **none of them uses three side-by-side Q/A columns.**

### Best reference — **Basecamp**, `https://basecamp.com/pricing` (200) — panel D

- Head **`I have pricing questions…`** at **38.095px / lh 43.81 / w600, `ls -0.857px`**, placed
  **left at x91, width 532px**.
- The questions are **one column, 664px wide, at x685** — a two-column section in which the head
  owns the left third and the list owns the right two-thirds. No dead space anywhere.
- Row geometry: `<details>` **664 × 79px**, `border-bottom: 1px rgba(…, 0.10)`; `<summary>`
  padding **30.476px 0**; question **22.857px / lh 29.71 / w600**; a chevron in a ~24px cell
  *ahead* of the text.

### Second reference — **Cursor**, `https://cursor.com/pricing` (200) — panel E

The same idea on a grid: section **1440 × 640**, ground **`#F2F1ED`**, `padding: 89.6px 20px`;
inner row **1300px at x70** on **12 columns of 108.328px**. Head `Questions & Answers` at 36px /
lh 43.2, `ls -0.72px` on **cols 1–6 (650px)**; the accordion on **cols 7–12 (650px at x720)**;
**eight rows across 461px = 57.6px per row**.

### Third reference — **Aardvark Book Club**, `https://www.aardvarkbookclub.co.uk/` (200, Awwwards SOTD 30 Aug 2026) — panel I

Register is wrong for this brand (illustration, cartoon colour), so it is a geometry witness only:
**thirteen** questions as **one narrow centred stack** of ~39px rows with a `+` flush right. A
jury-current page, seven days old when measured, still refuses the column split.

---

## P4 · A method / process ledger with no imagery

### Best reference — **Linear Method**, `https://linear.app/method` (200, "Linear Method – Practices for building") — panel F

- The ledger is a **688px single column** inside a 736px wrap at x352 (`padding: 0 24px`) —
  **48% of the 1440 viewport**, deliberately narrow while the poster above it is full width.
- Structure: an uppercase group eyebrow (`Introduction`, `Direction`, `Building`), then an `<ol>`
  of rows with **`gap: 6px`**; each row measures **688 × 24px**.
- Each row is **title left / ordinal right**: title 16px / lh 24 in the body face; ordinal
  (`1.1`, `2.1`, `2.4`, `3.6`) at **15px / lh 24 in a SECOND face (Berkeley Mono), colour
  `rgb(138,143,152)`**, right-aligned at x1037 in a 27px cell. A dotted leader runs under each
  group heading.
- **Zero images inside the ledger.** The one drawing on the page (a two-circle Venn, ~465px tall)
  sits *above* the ledger as the section's poster and is never repeated per row. That is the
  whole answer to "what do we put beside Diagnose / Build / Position": nothing. The ordinal set
  in a second face and a dimmer colour is the ornament.

Cross-check with the corpus: `CORPUS-METHOD-SECTIONS` records **0 of 14 builds** placing a
photograph of the founder, the team or the workspace in the method section, and **9 of 14**
running typographic panels. Linear is the sharpest live instance of that majority.

---

## P5 · A proof index that entices a click

### Best reference — **Locomotive**, `https://locomotive.ca/en/work` (200, "Work | Locomotive"; Awwwards 91 SOTD, latest 24 Jun 2026) — panel G

- **45 rows**, each an `<article>` of **1360 × 41px** on a **12-column grid of 95px with 20px
  gutters**, 40px page gutters.
- Three fields, and **all three set at ONE size — 26px / lh 31.2, weight 400, black on white**:
  the name on **cols 1–7 (670px at x40)**, the sector at **x730 (325px)**, the place at **x1075
  (184px)**. Nothing is demoted to a caption size. Rank comes from column order alone.
- Each row carries **`border-top: 2px` and `border-bottom: 2px` in `rgba(0,0,0,0)`** — two
  transparent rules held in reserve so the hover rule costs no layout shift.
- **45 images are present in the document for 45 rows** — one artifact per row, revealed on
  hover; at rest the index is pure text. That is the enticement: the row promises a thing.
- The header sets expectation with a count, not a claim: **`All projects ⁴⁵`** (superscript).

### Rejected as a model — **basement.studio/work** (200, "Showcase | basement.studio")

Its index is a four-column grid of client **logos** on tinted tiles. It is heavily jury-decorated
(21 SOTD, 11 SOTY, HM 10 Aug 2026) and it is exactly the logo wall this project's constitution
bans. Recorded so the ban reads as a deliberate divergence from a jury favourite rather than an
oversight.

---

## The single transferable finding

Every one of these pages solves rank with **width, position and count** — 596 vs 394, cols 1–7 vs
cols 8–10, 307 vs 486, five rows of 44px — and **never with a decorative container**. Across all
twelve pages measured today the only borders drawn anywhere are four: one ring on Warp's marked
card, one divider on Basecamp's seam, one box around Stripe Press's five-row buy ledger, and one
hairline under each Basecamp question. Four rules on twelve pages.

Boxes are where these designs stop, not where they start.
