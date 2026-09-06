# Freight — the second design exploration (2026-09-05)

Operator: "I have found inspiration: https://studiofreight.com/ Dont feel restricted. Create
something for me that studio freight would build 100%."

A mock, published as a real scrolling page (an Artifact), not a change to the live site.
Constitution released; facts and anonymity not. Every sentence is one the site publishes.

## 1. What Studio Freight actually is (studied 2026-09-05, live page + full CSS)

Not black. Not a grotesk. Not a scroll spectacle on the surface.
- Ground `#fefdfc`, a warm paper white. Type `#000` / `#1a1a1a`. One grey `#dadada`. An acid
  green `#00ff6a` and a blue `#457db6` exist in the CSS and barely appear.
- Two commercial faces: **JJannon** (an old-style Garamond revival) for display at
  `clamp(126px … 286px)` and `clamp(104px … 184px)`, tracking −2.88px / −1.28px; **Publico
  Text Mono**, a monospaced SERIF, for every label, in small tracked uppercase.
- The home page is one viewport: mono chrome pinned to the four corners ("• Home", "Menu",
  "IG / LI", "©2026 / Terms"), a three-word serif thesis centred ("Moving Missions
  Forward"), and the WORK as large image tiles carrying all the colour. `window.lenis` is
  live; no canvas, no video. The craft is type, corners and how things move.

## 2. The ruling — what is his, not a replica

- **Ground:** paper white `#F7F4EE`, near-black `#121110`, one warm grey `#8B857C`. **No
  chromatic accent.** His artifacts are the colour: the cover's terracotta "80%", the
  saffron RUN TONIGHT tag, the portrait. Black is used as a surface only for the packages
  (the one place a price should feel like an object) and the book tile.
- **Type:** EB Garamond (a Garamond, as JJannon is) for display at their scale, 56 → 160px,
  tracking −0.035em, weight 500. **Xanh Mono** for all chrome, the Publico-Mono move: a
  monospaced serif with a real italic. Body in EB Garamond 18–21px.
- **His three-word thesis already exists:** "Operator, not consultant." Their "Moving
  Missions Forward" is three words; so is his. The second thesis is the book's beat, "It
  shipped. Nobody came."
- **The work is the page:** tiles of the real artifacts open it (portrait, cover, page 51),
  a wide tile of page 6, two more pages later. Captions in mono, the site's own § codes.
- **The record as an index list** with numbered rows, mono meta, and the figure in serif at
  up to 68px, right-aligned, tabular. Their project index; his receipts.
- **Packages as a horizontal snap gallery** of three black tiles with the price at up to
  140px and "Fixed." as the qualifier. A counter "01 / 03" in mono.
- **Corner chrome is fixed** and uses `mix-blend-mode: difference` so it reads on paper,
  on the black tiles and on the photograph alike.
- **The wordmark cropped at the foot**, 300px, rising out of the page edge on scroll.
- **Motion (Lenis + GSAP, their stack):** smooth scroll; tiles parallax ±6% transform-only;
  the record's figures skew with scroll velocity and settle; the second thesis tightens its
  tracking as it arrives; the load sequence settles the thesis from a visible state.
  Reduced motion: everything static, Lenis off. Nothing is parked invisible waiting for an
  observer; every section is readable at rest.

## 3. Rejected
- Black ground with acid green or vermilion — the two "near-black with one pop" clusters the
  design guidance names as generated-looking, and not what their site does anyway.
- Fraunces, Inter, Space Grotesk — template faces.
- A WebGL object. Their own page has no canvas; the restraint is the point. A CSS 3D book
  was considered and cut for the same reason.
- Any testimonial, logo, count or sentence not already on the site.
- Naming the industry author; itemising the birth worker's services; any Ordani count.

## 4. Build
`the-receipts.template.html` + `build.py` (inlines the six downsampled artifacts from
`../mock-assets/` as data URIs) → `<scratchpad>/the-receipts.html` → Artifact, title
"The Receipts". Libraries: gsap 3.12.5 + ScrollTrigger (cdnjs), lenis 1.3.4 (jsdelivr); the
page degrades to native scroll with no motion if either fails to load.
