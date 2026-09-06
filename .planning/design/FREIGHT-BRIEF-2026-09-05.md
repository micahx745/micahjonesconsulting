# Freight — the second design exploration (2026-09-05), ruled from the client work

Operator: "I have found inspiration: https://studiofreight.com/ Dont feel restricted. Create
something for me that studio freight would build 100%." Then: "also look at their work
examples not just their site … find a collection of the best design studios like this and
take the best parts." Then, after I copied their homepage: "seems like you just copied
their own website. i meant look at all their work examples. not the website itself."

A mock, published as a real scrolling page (an Artifact), not a change to the live site.
Constitution released; facts and anonymity not. Every sentence is one the site publishes.

## 0. What went wrong first, on the record

Two research passes studied the wrong thing. The first tore down fourteen studio HOMEPAGES
(`research/00-THE-SET.md`, `research/studios/`, `research/STUDIO-ETHOS-SYNTHESIS.md`); the
page built from it copied Studio Freight's homepage composition. A studio's homepage is how
it sells itself; its work is what it builds when the product is someone else's. Memory now
carries the rule (`design-research-means-a-set`): research a studio's LIVE CLIENT SITES.

## 1. The corpus that counts (2026-09-05)

Fourteen live client builds by Studio Freight / darkroom.engineering, verified on the
clients' own domains and torn down with one rubric aimed at a client build:
`research/client-work/00-CLIENT-SITES.md`, `research/client-work/<slug>.md` (14),
`research/client-work/CLIENT-WORK-SYNTHESIS.md`, contact sheets in the scratchpad.
The set: OREO × BTS, Looped (PolyAI), Bad Omens, VITURE Neckband, Hyperbolic, SharpLink,
Dragonfly, Esther Rum, Cora, Psyop, Provable Explorer, Lore, Tambo, GrowthLoop.

### What they do for clients, with counts
- 14/14 one accent, 0/14 a second; 12/14 the client's own colour, rationed to single
  digits per screen and kept off body type (labels, arrows, wipes).
- 6 dark / 7 light / 1 saturated field. Only 1 of 6 dark builds is literal #000; only 2 of
  7 light builds are literal #fff. Bone on dark, warm near-black on light.
- 12/14 display at weight 300–500. The display face is not bold. 8/14 negative tracking.
- 6/14 the three-role split: display / text / mono fenced to labels and data. His
  `lib/fonts.ts` already runs exactly that. 8/14 uppercase once or never; one label style.
- 10/14 a named number by the second screen. 5/14 print a price (0/14 studio homepages
  do). 6/14 a named objection section, 4 beside the price. 10/14 file the ask as quiet;
  14/14 one or two button styles. 6/14 proof at position 2–3 before any feature.
- Motion: Lenis 12/14; GSAP 8/14; 4/14 ship essentially no animation library and three of
  those are among the most expensive-looking pages. 9/14 a sticky pin. 0/14 scroll-jack.
  8/14 say explicitly that the type does not animate in. 1/14 a cursor follower. 7/14 a
  marquee, 5 of them carrying borrowed logos. Ceiling of two @keyframes per page.
  14/14 name exactly ONE motion moment; everything else is service.
- The house curve, shipped by name in 4/14: `cubic-bezier(.4, 0, 0, 1)` ("gleasing").
- Tells (budget, not mechanism): custom type 8/14, bespoke 3D 5/14, a crew 4/14.

## 2. The ruling

**He is two clients and the corpus never blends them.** A person (the Dragonfly / Psyop /
Lore register: name, claim, silence, proof as names-as-text with zero logos, the ask as
an address) and a product (the Cora / Tambo / VITURE register: claim, proof, mechanism,
numbers with footnotes, objections beside the price, price in the persistent header). The
home is the person; the book appears on it as the artifact it is. One house through
ground, accent, labels and easing, never through layout.

**What the corpus KEEPS from his existing constitution:** Bricolage Grotesque / Hanken
Grotesk / JetBrains Mono (the three-role split, 6/14); copper as the one accent (14/14
one accent); espresso `#0D0D0F` and bone `#F5EFE4` (near-black not black, paper not white,
12/14). Both earlier mocks threw these away; the client work says they were right.

**What changes:**
| Mechanism | Source builds | On his page |
| --- | --- | --- |
| Four-block hero with a void: headline top-left, the chip pair, ~320px of nothing, the positioning sentence bottom-left, one dated proof row bottom-right | SharpLink §3, §9 ("that emptiness is the luxury signal, not the render") | "I build the go-to-market." with the noun in copper; "Strategy and software, shipped by the same pair of hands…"; Guardicore · 2018–2021 · $14M |
| The noun in the accent, the connectives in ink; no rolling word, no timer | VITURE §3 | `go-to-market.` in copper, nowhere else on type |
| Display at weight 400, opsz driven | 12/14 at 300–500; OREO × BTS drives Bricolage's axes | Bricolage 400, opsz 96, −0.02 to −0.03em |
| Proof at position two, spotlight over index, names as text, "07" in mono, zero logos | Dragonfly §10, Cora §6 | Guardicore / Postmates / Industry author over the other four |
| Hover reveal on a row: a 1px accent wipe scaleX(0→1) and the artifact fading in at the margin, rows without one show only the wipe | Bad Omens §7, Psyop §7 | the record rows |
| THE ONE MOMENT: a pinned rail at opacity .42, one line lighting to 1 as its panel passes | GrowthLoop §10, Hyperbolic §10, SharpLink §7, Cora §7 — 9/14 | 01 Diagnose / 02 Build / 03 Position with page 6, the pre-flight card, page 51 passing |
| The product in a dashed frame that reads as the artifact being produced | Tambo §3 | the cover as `the-80-percent-wall.pdf` |
| The numbers as the graphic, one figure per card, nothing on the screen bigger than the numbers, an asterisk naming what each is measured against | VITURE §10, Provable §10 | 40%→91% *intake completion, Ordani beta; 8,000→290,000; $3M; $14M |
| The price ON the page and in the persistent header; the objection beside it in the buyer's words | VITURE §10, Cora §8, §10 | "Packages from $500" in the nav; five priced rows beside three live FAQ answers |
| The ask as a chip pair: near-white chip with an accent square-arrow chip bolted on, a grey secondary beneath, nothing until the foot; attribution on the terminal link | SharpLink §8, VITURE §10 | "Name the problem →" / "See the packages"; `?from=mock-foot` |
| The ground changes with no section declaring a colour: one fixed sheet, the light travels espresso → bone once | SharpLink §7 | `--p` from the reading line; the product section turns the page to bone |
| Entrance offsets declared in markup, transform only, the picture lands before the claim | Hyperbolic §7, GrowthLoop §7 | `data-rise="10"` on media, `"30"` on rows |
| What stays still: the type, the photograph, the chrome | 8/14, Esther §7, Looped §7 | no split text, no Ken Burns, the nav never hides |

**Motion, in total:** Lenis smooth scroll (12/14), the world fade, the rail, the hover
wipe, the transform-only entrances. Zero @keyframes. No GSAP, no three.js, no cursor, no
marquee, no velocity, no horizontal section, no page curtain. Reduced motion: static.

## 3. Rejected, with the build that rejected it
- A WebGL hero or any 3D object (Lore §11: "a cheap 3D word reads worse than no 3D at all").
- A frame sequence of himself (VITURE §11). Stock, AI stills, illustration (four builds).
- A logo wall or trusted-by marquee (Hyperbolic §11: "faking it is out of the question").
- A scarcity ticker (Bad Omens §11), a mascot (Tambo §11), a padded index (Dragonfly §11).
- The rolling hero word and the pointer-coupled drift in his live Hero.tsx (13/14 no
  cursor effect; the two-tone noun is cheaper and reads at a glance).
- Text entrances (8/14: the type is simply there).
- The paper-mosaic homepage composition of the previous page: their storefront, not their work.
- Any sentence, number, name, logo or quote not already on the site.

## 4. Build
`freight/the-receipts.template.html` + `build.py` (inlines the six artifacts) →
`<scratchpad>/the-receipts.html` → the existing Artifact URL, title "Operator, not
consultant". Lenis 1.3.4 (jsdelivr) only; native scroll and no motion if it fails.
