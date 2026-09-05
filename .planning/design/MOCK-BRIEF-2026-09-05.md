# Mock brief — "Dark studio, warm paper" (2026-09-05)

Fable ruling for a DESIGN EXPLORATION of micahjonesconsulting.com, not a shipping change.
Operator, 2026-09-05, verbatim: "I really like procreate.com style - screams premium, has
subtle designs touches that are unique, but lays out the path to do business with them
clearly without all the noise … I know you have design restrictions but I do not want you to
feel stuck by them go wild."

So the design constitution (palette, faces, one-accent, one-motion) is RELEASED for this
mock. Two things are NOT released, because they are not taste:
- Every sentence and every number is one the site already publishes. No invented clients,
  quotes, counts, logos, or testimonials. The one quote is the real, ledgered one.
- The industry author is never named. The birth worker's services are never itemised.
  Ordani's only framing is "active paying users, in beta, public release coming".

## 1. What procreate.com does (studied 2026-09-05, first fold + full text + full CSS)

Not a display face. `system-ui` grotesk at 500/600, heading tracking −0.031em. Ground is
STEPPED near-blacks (#0b0b0b / #101010 / #121212 / #141414 / #262626), cards one step
lighter than ground: depth by tone, no shadow theatre. Three greys. ONE accent (#0076ff),
actions only. One serif (Frank Ruhl Libre) loaded for one editorial register. Radii 16 /
12 / 8 + pills. Copy capped 500–800px. Small tracked-uppercase kickers name every
section. Copy is declarative fragments with periods: "Art is for everyone." "Animate
anywhere." The path to business is four lines: product · one sentence · Learn / Buy ·
"$12.99 USD. Once." — the pricing model in a word. Order: business, then support, then
company. Imagery: the product in a human hand, in use, full-bleed and dark.

## 2. The ruling — what is his, not a replica

He has three things procreate does not: a PERSON, a BOOK with hand-drawn pages, and
RECEIPTS with names and numbers. So:

- **Ground:** layered WARM near-blacks (his palette is espresso, theirs is neutral).
  `#0F0C0A` ground · `#17120F` surface-1 · `#1F1915` surface-2 · hairlines at bone 10%/18%.
  A film-grain overlay at 5.5% soft-light gives the depth their video does.
- **The only light surfaces are his paper:** the book's actual pages (bone `#ECE3D0`) and
  his photograph, glowing on the dark. That contrast IS the identity.
- **Type:** Instrument Sans 400/500/600/700 for display and body (character at size,
  tracking −0.028 to −0.038em on display). Instrument Serif, italic and roman, ONLY for
  quoted text: the build-log entry, the one testimonial, and "The receipts. Every line
  below is real." JetBrains Mono for § codes, kickers, data, prices' model word — his
  editorial grammar, which procreate lacks.
- **Accent:** ONE, saffron-amber `#E3A63B` (hover `#F0B650`), actions and kickers only.
  Pill buttons with near-black text. Never on body text.
- **The pricing-model word:** "Fixed." beside each package price. It is his word ("Three
  fixed prices.") and it does the job "Once." does.
- **Section grammar:** mono kicker `§ 0N · NAME` in accent → 28×2 saffron tick → H2 at
  44px/600/−0.028em. Every section.
- **Radii:** 20 on cards (a hair more generous than their 16), 6 on paper, pills for actions.
- **Motion:** one reveal on the hero only (opacity + 14px rise, 720ms, ease-out, staggered
  80–400ms, once). Reduced-motion kills it. Nothing else moves.
- **Nav:** his five items, mono tracked, no CTA in the nav.
- **Order:** hero → stat strip → § 01 Packages (the path to business, three cards, Buy) →
  § 02 Engagements (rows, From $5K) → § 03 The record (7 receipts, mono table) → § 04 The
  manual (cover + rings page as paper on dark) → § 05 Build log + the quote (serif) →
  § 06 Ordani → "Name the problem →" at 72px → logistics footer.

`Main.dc.html` (the home) is authored by Fable and IS the vocabulary. Everything else
extends it: same tokens, same classes, same section grammar, same copy discipline.

## 3. Opus: author these, in this order

Working tree: `.planning/design/mock/`. Images already downsampled in
`.planning/design/mock-assets/` (cover.jpg 22KB, rings.jpg 65KB, wallchart.jpg 65KB,
portrait.jpg 59KB, opener02.jpg 33KB, card.jpg 46KB) — reference by bare filename.

**Verbatim copy source: the LIVE snapshot** `.planning/snapshots/2026-09-04-live-2/`
(`playbook.txt`, `services.txt`, `packages.txt`, `about.txt`). Open with python utf-8.
Use sentences exactly as they appear there. Where you need a sentence that does not exist,
leave the element out — never write one.

### 3.1 `Playbook.dc.html` — the proof page, 1440 wide, flowing
Same helmet/tokens/classes as Main. Sections:
1. Nav (identical).
2. Hero: left — kicker `A field manual for solo founders` (accent), H1 `The AI handed you
   the code. Now ship the company.` at 76px, dek verbatim from the live page, actions:
   pill `Get chapter one free →` + textlink `$99 at launch · coming soon` in mono. Right —
   the cover (`cover.jpg`) as paper at ~440px with the wall-chart page (`wallchart.jpg`)
   tucked behind at an offset, both on dark.
3. `§ 01 · If this is you`: the three pain lines verbatim from live, at 30px/500,
   stacked; then the diagnosis paragraph (`The wall is not a talent problem…`) as body.
4. `§ 02 · Read two pages`: two paper spreads side by side — `wallchart.jpg` captioned
   `§ 01.4 · Why it hits at 80% and not sooner · page 6 of 69` and `rings.jpg` captioned
   `§ 08.2 · Where the ten actually live · page 51 of 69` (mono captions).
5. `§ 03 · Contents`: the ten chapter rows verbatim from live (number mono accent · title
   600/22px · tag body · page mono right-aligned), hairlines between.
6. `§ 04 · Run tonight`: `card.jpg` as paper left; right, the three companion-file
   paragraphs verbatim (Ten pre-flight checklists… / Six prompt files… / Nine templates…).
7. Back cover band (surface-1, radius 20, padding 48): spec rows verbatim (Pages 69 …
   Status Coming soon) as a two-column mono/sans dl on the left; right, `The day it ships`
   copy verbatim + a single email input + pill `Send me chapter one →`. ONE form.
8. FAQ: the five Q/A pairs verbatim from live, Q at 600/20px, A body.
9. Foot: `Past the playbook?` kicker · `If your build needs a second pair of hands.` at
   44px · textlinks `Fixed-price packages →` and `Book a free intro call →`. Footer.

### 3.2 `Services.dc.html` — 1440 wide, flowing
1. Nav.
2. Two doors as two cards side by side (surface-1, radius 20, padding 40): `For companies
   / Engagements / Advisory, project, retainer, or embedded. Scoped together once you tell
   me the problem. / From $5K a month / The three services →` and `For solo builders and
   small teams / Packages / Three fixed prices. Pick one, buy it, and the work starts this
   week. / $500 · $2,500 · $7,500 / The three packages →`. Prices at 32px/600.
3. `§ 01 · Engagements`: `Three services, one pair of hands.` H2; the three services each
   as a block: number · name · pain line · `What lands` list · `Proof` lines, all verbatim.
4. `§ 02 · How engagements work`: the four-shape table verbatim (Shape · When it fits ·
   Time · Price), hairline rows, mono headers.
5. `§ 03 · On the price` + `Why one person`: the two verbatim paragraphs side by side in
   body type.
6. `Next step` band: verbatim `A free 30-minute call comes first…` + pill `Book a free
   intro call →`. Footer.

### 3.3 Two LOW-FI alternates, 1440×900 each, deliberately sketchy (greys, boxes, one
accent swatch, real headlines only), so the operator can pick an axis:
- `DirectionB.dc.html` — **"Paper first."** Invert: bone `#ECE3D0` ground, espresso type,
  the dark used only as a hero band behind the cover. Axis: light editorial vs dark studio.
- `DirectionC.dc.html` — **"Type is the image."** No photographs at all. The H1 at 140px in
  Instrument Serif, the seven receipts at 56px as the whole page. Axis: type-as-image vs
  artifact-as-image.
Each carries a mono note in its corner naming its axis and its trade-off in one line each.

### 3.4 `canvas.json`
Row 1: Main (0,0,1440,5600, expand "fill") · Playbook (1560,0,1440,4600, fill) · Services
(3120,0,1440,3400, fill). Row 2 at y=5800: DirectionB (0,5800,1440,900) · DirectionC
(1560,5800,1440,900). Annotations: one sticky note at (0,−160) w 520: "Dark studio, warm
paper. Everything on these boards is a sentence the site already publishes. Two alternates
below name a different axis each." `launch: {"view":"canvas"}`.

### 3.5 Seed and check
From `.planning/design/mock/`:
```
node "<design skill base dir>/seed-canvas.mjs" --template "<base>/payload.template.html" \
  --out "<scratchpad>/micah-jones-dark-studio.html" --title "Micah Jones, dark studio" \
  --artboard Main.dc.html --artboard Playbook.dc.html --artboard Services.dc.html \
  --artboard DirectionB.dc.html --artboard DirectionC.dc.html \
  --image ../mock-assets/cover.jpg --image ../mock-assets/rings.jpg \
  --image ../mock-assets/wallchart.jpg --image ../mock-assets/portrait.jpg \
  --image ../mock-assets/opener02.jpg --image ../mock-assets/card.jpg --canvas canvas.json
node "<base>/seed-canvas.mjs" --check "<scratchpad>/micah-jones-dark-studio.html"
```
The base dir is `C:/Users/micah/AppData/Local/Temp/claude/bundled-skills/2.1.260/cf3be725090367883a099c56affe5eaa/design`.
Read every stderr warning. Then screenshot Main at 1440 via Playwright or the browser MCP
(the seeded file opens in a browser; a blank first capture means the editor is mounting,
retake) to `<scratchpad>/mock-main-1440.png`, and Playbook to `mock-playbook-1440.png`.
Commit the working files (`.planning/design/mock/*`, this brief, the assets) by explicit
path. Never commit the seeded output (it is 2MB+ of editor). No push.

## 4. Rejected
- Copying procreate's centred hero. His R7 is asymmetric and his photograph earns the
  right column.
- procreate blue. Wrong temperature for espresso; his accent is warm.
- A rotated/3D book. Their premium is flat and calm; the paper glows on its own.
- A "Learn more" second button per card. His site has one action per card; keep it.
- Any testimonial, logo, count or quote not already on the site.
- Geist, Inter, Roboto as the face. Template fingerprints.
