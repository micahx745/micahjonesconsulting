# CORPUS — PRICING AND PARALLEL-OFFERING SECTIONS

Leg B. Every build in the corpus that prints a price or presents 2–4 parallel offerings,
measured at 1440 in Chromium 151 on 2026-09-06, plus a 390 pass on the three that matter.

**Contact sheet:** `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/corpus-pricing-sheet.png`
(1232 × 6070, six labelled desktop panels A–F plus a 390 row G).

**Method.** For each build the price string was located as a leaf text node, then the card was
resolved by climbing to the highest ancestor that contains exactly one price — so "card" below is
the real DOM card, not a guess. Every px, colour and font figure is a computed style read off the
live page. Hover was measured by reading computed style before and after a real pointer move.

**Provenance caveat, stated once.** `viture-neckband §8` records `FROM $328` living in the fixed
nav. On 2026-09-06 `viture.com/neckband` no longer serves that microsite nav — my probe found no
`$328` leaf anywhere on the page. That row is therefore **teardown-sourced, no px**. Everything
else in the table was measured today.

---

## 1. What the corpus actually contains

The `CLIENT-WORK-SYNTHESIS §A8` count holds: **5 of 14 client builds print a price, 0 of 14 studio
sites do.** Of those five, only **two ship a true multi-column plan block** — `cora §9` and
`tambo §8`. The other three price single products (`viture-neckband §8`, `esther §8`,
`bad-omens §8`).

So the corpus's own plan-block sample is two. To get a usable sample I went to the client builds
named in `01-MORE-STUDIOS.md` and pulled the three that ship a real pricing page: NewsCatcher
(O0, `01-MORE-STUDIOS §6`), AthenaHQ (Utsubo, `§3`), Vizcom (OFF+BRAND, `§1`). All three are
studio-built client work by the same rule the client-work corpus used, and all three were fetched
live today.

---

## 2. The measured table

### A · cora §9/§10 — `cora.computer` — 2 cards + a bar
| | |
|---|---|
| Layout | **Columns.** Flex row, 2 cards, **288 × 364px** each, **8px gap**, inside a **604px** grey `#EBEBEB` tray with 21px section gap. The tray is **604px on a 1440 page** — the pricing block is an island, not a full-bleed band. Ground behind it is the page's painted sky, full bleed. |
| The number | `$20/month` — **36px, Signifier (serif), weight 400**, `ls: normal`. Section h2 "Pick a plan" is **45px**. **Price = 80% of display.** |
| Around it | Plan name **20px/600 Switzer** above; a **14px/500** billing line below (`Billed anually as $240` — their typo, not mine); then a 5-item check list at **14px/400**, 25px line step. |
| Borders | None on the card. White `#FFF` fill, **10px radius**, 21px padding, 104px bottom padding to floor the CTA. The only rule on screen is the tray edge. |
| CTA | One per card, **246 × 51px**, solid black, **999px radius**, 16px label. Both read `Start free trial` — identical, not per-tier. |
| Hover | Fill `#117BC8` → `#D6D6D6`, text white → black, **0.3s**. No lift, no scale, no shadow. |
| 390 | Stacks. Cards **334px**, price **stays 35.7px** (unchanged). Heights are **not** equalised — 352px vs 269px. |
| Recommended | **Nothing is marked.** Two tiers, no badge, no border, no scale. |
| Fourth offer | **A dark bar directly beneath the tray**: two lines of 14px copy left, one outlined pill (`Subscribe to EVERY`) right. A different offer in a different shape, so it cannot be mistaken for a third tier. |

### B · tambo §8 — `tambo.co` — 3 cards + a bar
| | |
|---|---|
| Layout | **Columns.** CSS grid, `grid-template-columns: 357.66px × 3`, **24px gap**, row **1121px** wide, 497px tall, centred on a 1430px page. |
| The number | `$25 /mo` — **32px, Sentient, weight 300**, `ls: -1.6px` (−0.05em). Section h2 is 48px. **Price = 67% of display.** `Free` and `Annual Contract` sit in the same slot at the same 32px — **words take the number's place at the number's size**. |
| Around it | Eyebrow **12px/400 geistMono, uppercase, ls 0.24px** (`STARTER`). Descriptor **16px/400 geist** (`Perfect for getting started.`). Feature list **12px mono uppercase, 28px line step**. |
| Borders | Card is unbordered; the header zone (eyebrow + price + descriptor) is a tinted mint block with a hairline under it, separating the price from everything below. |
| CTA | **340 × 48px**, white fill, **2px `#CBE2DB` border, 16px radius**, 14px/500 mono uppercase label, with a mint circular arrow at the right end. **The CTA sits ABOVE the feature list**, not under it. |
| Hover | Label colour only: `#0F1A17` → `#7FFFC3`. `transition: all`. Nothing moves. |
| 390 | Stacks, cards **340px**, ~16px gap, price **32 → 24.96px (−22%)**. Card order and CTA position unchanged. |
| Recommended | **Nothing is marked.** |
| Fourth offer | **A full-width dark bar beneath the row** (`Open Source / Self-host for Free. Forever.` + 3 mono check items + a `GITHUB` pill). Same width as the three cards combined, own ground, own shape. |

### C · NewsCatcher — `newscatcherapi.com/pricing` (O0, `01-MORE-STUDIOS §6`) — 4 stubs, one hairline
| | |
|---|---|
| Layout | **Columns, no gap.** Grid `294.78px × 4`, **gap 0**, total 1179px. Cards share a **single 1px `#EEEEF2` hairline** — no radius anywhere. One table, four cells. |
| The number | `$50` **28px/500** with `/ mo` at **16px** in grey beside it. Page h1 "Compare plans" is **64px**. **Price = 44% of display** — the smallest ratio in the set. |
| Around it | Name **22px/500** above; **one 16px line** of substance (`+6,000 credits / mo`) below. **That is the entire card** — 221px tall. Every feature lives in a comparison table further down the page, not in the card. |
| CTA | **262 × 44px**, `#EEEEF2` fill, 1px border, **4px radius**, **11px mono uppercase, ls 0.66px**. |
| Hover | Fill `#EEEEF2` → `#E2E3E9`, border darkens, 0.3s. No movement. |
| 390 | Cards become **rows**: 358 × 145px, name left, **price right-aligned** at x≈288, 28 → 24px. |
| Recommended | Not marked by badge or border. The **Enterprise CTA is solid black** while the three self-serve CTAs are grey — differentiation by CTA weight alone. |
| Note | A tab pair above the row (`WEB SEARCH API` / `NEWS API`) swaps the whole four-card set. Two products, one block. |

### D · AthenaHQ — `athenahq.ai/pricing` (Utsubo, `01-MORE-STUDIOS §3`) — 3 cards, the marked one
| | |
|---|---|
| Layout | **Columns.** Flex, 3 cards **449 × 750px** (grid measure 396px), **16px gap**, row 1380px. |
| The number | `$295` set as three parts — `$` **12px/700**, `295` **16px/700**, `/month` **12px/300** — in the compare strip; in the card itself `Free` / `Custom` render at **36px/700 Space Grotesk**. Page h1 is 90px, the section h2 72px. |
| Around it | Name **16px/700**; a bordered **credit strip** (`$25 free credit`, 14px, 1px white border, 8px radius) directly under the number; then model-logo chips; then the feature list at **14px**, 31px step, with key terms bolded mid-sentence. |
| Borders | **1px solid, 10px radius**, `rgba(255,255,255,0.6)` fill, 24px padding, faint shadow. |
| CTA | **399 × 60px**, solid indigo `#4F39F6`, 8px radius, 16px/700 — plus a **`See all features` accordion row (399 × 46px) above it**, which is how three unequal feature lists still end with their CTAs on the same line. |
| Hover | `transform: scale(1.02)`, 0.3s `cubic-bezier(.195,.495,.26,.945)`. **The only build in the set whose CTA moves.** |
| Recommended | **The middle card's border is `#4F39F6` (1px) where the others are white.** No badge, no ribbon, no lift, no scale. One hairline is the whole marker. |
| Also | Monthly/Annual pill toggle top-right, 40px tall, 20px radius, `(17% off)` in the inactive label. |

### E · Vizcom — `vizcom.com/pricing` (OFF+BRAND, `01-MORE-STUDIOS §1`) — 4 cards, price as display
| | |
|---|---|
| Layout | **Columns.** Grid `308.17px × 4`, **16px gap**, row 1281px. Cards `#242425` on a near-black page — dark on dark, separated by value not by rule. |
| The number | `$49/` — **56.28px/500 Matter**. The section h1 "Choose the plan right for you" is **56.28px**. **Price = 100% of display.** `per user/month` sits under it at **14px** — a 4× step. |
| Around it | Name **16px/400** above (3.5× smaller than the price). A 2-line 14px descriptor. Then `Includes` + a 14px check list. |
| Borders | None. **6px radius**, padding 24px / 16px. |
| CTA | **119 × 40px** blue pill, **bottom-left, not full width** — the only build in the set whose CTA is not the card's width. |
| Recommended | **Nothing is marked.** |
| Key move | The Enterprise card puts **`Contact Sales` in the number's slot at the number's 56px**. A card with no price loses no rank. |

### F · bad-omens §8 — `badomensofficial.com` — the anti-table
| | |
|---|---|
| Layout | **Rows of images**, 3-up, cards **455 × 613px**, 30-col grid, **7.5px column gap / 78.75px row gap**, 6px radius on the image. |
| The number | `$36.00` — **13.5px/400 Helvetica, uppercase**, in a small grey chip below the title. The title above it is **also 13.5px**. **Price = same size as its own label**, and roughly 1/5 of the section h2. |
| Around it | Nothing. Image, title, price chip. No feature list, no descriptor, no per-item button — **the card is the button**. |
| Sold out | A `SOLD OUT` ticker pill runs **beside a still-visible price**, so the loss stays legible. |
| Why it is here | It is the honest opposite pole: when the object does the selling, the number is a fact in the margin, not a pitch. |

### Corpus builds with 2–4 parallel offerings and **no** price
| build | composition |
|---|---|
| `hyperbolic §6.4` | Three audiences (AI Natives / Researchers / Compute Providers) stacked **down the right column**, each with its own CTA, against a **pinned line-art figure on the left that changes per audience**. Three offerings, one screen, no grid, no tabs. `hyperbolic §10` calls this "the three-packages problem, solved." |
| `growthloop §6.13` | A **pinned numbered rail** `01 Audiences / 02 Universal Journeys / 03 Insights` against a full-bleed panel that swaps screenshots on scroll. `growthloop §10`: it turns "here are my packages" into "you are at step two of a sequence." |
| `tambo §6.4` | Four benefit cards with human titles ("Agent included", "The boring parts, solved") — the same 4-up geometry as the pricing row, used for reasons instead of tiers. |
| `dragonfly §10` | The two-tier proof ladder: SPOTLIGHT set enormous over INDEX set as plain text. A ranking mechanism that costs no chrome. |
| `esther §8` | `ESTHER RUM $36.99` and `ESTHER LION RING 2,500.00 … Now accepting pre-orders` — price printed plainly beside the product name, no card, no plan. |
| `viture-neckband §8` | *(teardown-sourced, see caveat)* `FROM $328` fixed in the nav beside `Order Now`, visible from pixel one; **no interstitial buy button across 11 sections**. |
| Selfbook, Clear Street, MultiversX (`01-MORE-STUDIOS §5`) | Three numbered service modules; segmentation by investor type; persona-split navigation. Parallel offerings handled as IA rather than as a grid. |

---

## 3. What the measurements agree on

1. **Everyone puts them in columns, and nobody uses more than four.** Six of six. Widths cluster
   at **288–449px**, gaps at **0 / 8 / 16 / 24px**. Nothing in the corpus stacks priced offerings
   as full-width rows at desktop.
2. **The price is the second-largest type in its card and it is never the largest on the page.**
   Ratio of price to that section's display type: **cora 80%, tambo 67%, vizcom 100%, athenahq
   ~50%, newscatcher 44%**. Median ≈ 70%.
3. **The unit is always smaller and always adjacent** — `/mo` at 16px beside 28px, `per user/month`
   at 14px under 56px. Never the same size as the number.
4. **One line of substance under the number, then either a short list or nothing.** NewsCatcher
   proves the extreme: **one line**, and the detail moved to a table.
5. **One CTA per card, no exceptions**, 40–60px tall, and in five of six it is the card's width.
6. **Nothing lifts.** Five of six hover states are a colour swap over 300ms. Only AthenaHQ moves,
   and only 2%.
7. **Marking the recommended one is rare and quiet.** Four of six mark nothing. AthenaHQ uses a
   **1px border colour change**. NewsCatcher differentiates by **CTA fill weight**. No build in
   the set ships a popularity ribbon of any kind.
8. **The offer that is not a package gets a different shape.** cora and tambo both close the block
   with a **full-width bar** — one sentence, one pill, its own ground. This is the single most
   directly useful thing in the whole leg.

---

## 4. Recommendation — three packages, the engagements line, the manual

Ranked. The composite is **tambo §8's geometry, cora §10's island, NewsCatcher's card interior**.

### R1 — Three cards, then one bar. Not five things in a ledger. (`tambo §8`, `cora §10`)
The complaint — "very unorganized … underwhelming" — is a **rank** problem, not a styling problem.
Five offers currently read as five peers. Two of them are not packages: the engagements line is
bigger than all three, the manual is smaller than all three. Both builds that faced this solved it
the same way: **the peers go in a row, the odd one out goes in a bar underneath, in its own shape.**

- Row: **3 cards × 360px, 24px gap, 1128px total**, centred. (tambo: 357.66 × 3 + 24 × 2 = 1121.)
- Bar: **1128 × 104px**, ink `#1A1816` ground, bone `#EAE6DD` text, 16px radius, sitting **32px**
  under the row. One 18px sentence left, one outlined copper pill right (`from $5K a month` is the
  sentence, not a fourth price slot).
- **The $99 manual is not a fourth package and should stop being drawn as one.** Per `bad-omens §8`
  it is a product: an image, a 16px title, and the price as a **13px JetBrains Mono chip**, placed
  elsewhere on the page. Giving it a plan column is what makes the ledger read as five equal
  things and therefore as none of them.

### R2 — The card interior, in five parts and no more. (`newscatcher`, `tambo §8`)
Top to bottom, on a 360px card with **24px padding**:

| element | spec |
|---|---|
| eyebrow | JetBrains Mono **12px**, uppercase, `ls .02em` (= 0.24px), copper `#C8542B` — the R1 mono lane exactly as tambo uses geistMono |
| price | Bricolage Grotesque **40px**, weight 500, `ls −0.02em`, ink. See R3. |
| unit | Hanken **14px**, ink at 60% — `one project` / `fixed` — 8px to the right of the number, baseline-aligned |
| one line | Hanken **16px**, `lh 1.45`, max **2 lines**. What it is, not what it includes. |
| CTA | **312 × 48px** (card width − 2 × 24), 999px radius, **2px copper border**, transparent fill, 14px mono uppercase label. **Above the list**, per tambo — an ask under two unequal lists lands at two different heights. |
| list | JetBrains Mono **12px** uppercase, **28px line step**, max 6 items, copper check glyph |

Hairline under the price block only (1px, ink at 12%), per tambo's tinted header. **No card border,
no shadow, no fill** on cream — the cards separate by the 24px gap and the rule, which is how cora
does it inside its tray.

### R3 — Set the price at 40px and let it be the second-loudest thing. (`cora §9`, `vizcom`)
Measured ratios put a safe landing at **70–80% of the section display size**. If the packages
heading is **48–52px** Bricolage, the price at **40px** is 77–83% — cora's exact register, and
comfortably under vizcom's 100% (which works on near-black and would shout on cream). `$7,500`
at 40px Bricolage is roughly 150px wide; three of those at 360px leave room.
**`from $5K a month` never enters a price slot** — it lives in the bar as a sentence, per cora's
bundle line.

### R4 — Mark $2,500 with one hairline, and claim nothing. (`athenahq`)
The only marker mechanism in the corpus is **a 1px border colour change on the middle card**.
Use **1px copper `#C8542B`** where the other two cards have none. **No badge, no popularity claim,
no scale, no lift.** A claim about how often a package is chosen is unevidenced here — the same
class of claim already caught once on this repo — and a border needs no evidence to be true.

### R5 — Level the CTAs, don't equalise the cards. (`athenahq`, against `cora`)
cora lets the two cards end at different heights (352 vs 269 at 390) and it looks unfinished.
AthenaHQ's fix is structural: an accordion row above the CTA absorbs the slack so all three CTAs
land on one line. Cheapest version here: **cap every list at 6 items** and put the CTA above the
list per R2 — then the CTAs are level by construction and the lists may end where they end.

### R6 — Hover: colour only, 300ms. (5 of 6 builds)
Border `#C8542B` → fill `#C8542B` with bone label, **300ms ease**, `transform: none`. No lift on
the card. Honour `prefers-reduced-motion` by dropping the transition to 0ms. This clears
DESIGN_BAR R15 and adds no second signature motion.

### R7 — 390. (`cora`, `tambo`, `newscatcher` measured)
Stack, **card 342px** (390 − 24 gutters), **16px gap**. Price **40 → 32px** (tambo's −22%; cora
keeps its size and gains nothing by it). CTA stays **48px** — never shrink the tap target. The bar
becomes two stacked lines with the pill full-width beneath. If the manual chip crowds at 390, take
NewsCatcher's move: title left, price right-aligned on the same line.

### Rejected, with the reason
- **A comparison table under the cards** (`newscatcher`, `athenahq` both ship one). Three
  fixed-price services are not three feature sets; a matrix would invent axes that do not exist.
- **A Monthly/Annual toggle** (`cora`, `athenahq`, `vizcom` all ship one). He has no billing
  period. A toggle with one state is furniture.
- **Four columns** (`tambo`'s open-source column, `vizcom`, `newscatcher`). The fourth column is
  what he is already doing wrong. Three, then a bar.
- **`hyperbolic §6.4`'s pinned per-audience figure** and **`growthloop §6.13`'s pinned rail**.
  Both are excellent and both are a second signature motion. The `motion-engineer` refuses; so
  do I. Keep them on the list for the services page argument, not the price block.
- **A card lift or scale on hover** (only `athenahq`, only 2%). Not worth the exception.

---

## 5. Files
- Contact sheet: `.../scratchpad/corpus-pricing-sheet.png`
- Per-build crops: `.../scratchpad/pricing/X-{cora,tambo,newscatcher,athenahq,vizcom,badomens}.png`
- 390 crops: `.../scratchpad/pricing/M-{cora,tambo,newscatcher}.png`
- Raw computed-style dumps: `.../scratchpad/pricing/*.c.json`, `*.t.json`, `*.s.json`
