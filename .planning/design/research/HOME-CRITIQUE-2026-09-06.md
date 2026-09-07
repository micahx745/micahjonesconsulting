# HOME CRITIQUE — Room and Ledger, section by section (2026-09-06)

**Leg B of the §17 design-critique arc.** Every home section judged **composed** or **assembled**
with a juror's eye, from the 1440 and 390 captures listed in the brief, against
`CORPUS-PRICING-SECTIONS.md`, `CORPUS-METHOD-SECTIONS.md`, `CLIENT-WORK-SYNTHESIS.md`,
`01-MORE-STUDIOS.md`, and live fetches made today (each recorded with its status and title).

**Definitions used throughout.** *Composed* = the section reads as **one object** with one
governing edge, one rhythm and one hierarchy; remove any part and it looks broken. *Assembled* =
correct parts placed correctly and independently; remove any part and nothing else notices.
Assembled is what "unorganized" means from the other side of the screen.

**Constants read off the template** (`winning/room-and-ledger.template.html`), used for every px
spec below: `--g` 32 / `--gap` 24 / `--s` 120 at ≥900; `--d` = `clamp(52px, 9.4vw, 136px)` =
**135.36px at 1440**; `--d2` = 0.76·`--d` = **102.87px at 1440**; content width 1376; 12-col
column = 92.67px. At 390: `--g` 20, `--gap` 16, `--s` 64, `--d` pinned at its 52px floor.

**Live fetches made for this leg** (all today, all 200):
- `https://tambo.co` — `<title>Tambo</title>`. Three pricing cards, each with a **single CTA
  button, no separate coloured square**; the fourth offer sits below the row as its own
  "Open Source" block with its own contents.
- `https://athenahq.ai/pricing` — `<title>Plans & Pricing | Action on AI Search</title>`.
  Card CTAs are "a **single solid rectangle button** with centered label text… No separate
  coloured arrow squares are present."
- `https://www.clearstreet.io/` — `<title>Clear Street — Speed, Transparency and Scale for
  Sophisticated Investors.™</title>`. Closing CTA = headline + one button + a background image,
  **three objects, nothing left empty**. Footer = **five labelled columns** plus a legal line.
- `https://faunarobotics.com/` — `<title>Fauna Robotics | Capable, Safe, Fun Robots for
  Everyone</title>`. Hero video sits **behind** the headline, headline overlaid across it.
- `https://cora.computer` — `<title>Give Cora your inbox. Take back your life.</title>`
  (fetched; its CTA description conflicts with the measured `CORPUS-PRICING §A` reading of
  "246 × 51px, solid black, 999px radius" — the **measured** figure is the one cited below).

---

## Verdict table

| # | Section | Verdict |
|---|---|---|
| 01 | The bar | composed (one addition) |
| 02 | The hero | **assembled** |
| 03 | Operator, not consultant | **assembled** |
| 04 | How I work | composed (head excepted) |
| 05 | Packages + Engagements | **assembled** — *this is the box* |
| 06 | The receipts | **assembled** |
| 07 | The manual | **assembled** — *this is the other box* |
| 08 | The objections | **assembled** |
| 09 | The ask | **assembled** |
| 10 | The foot | **assembled** |

Four of ten hold. The page is not badly designed; it is **under-composed**. Six sections are
correct parts sitting beside each other with no shared line running through them.

---

## THE BOX — what he is pointing at, and the fix

Two objects on this page are literally boxes. Both are in the half of the page he complained
about. Both fail the same test.

### Primary: the **Engagements** block (§05). This is almost certainly "the box."

Evidence, from `rlz8-2x-engagements.png` (1440) and `rlz8-2x-390-engagements.png` (390):

- It is a **236px-tall espresso rounded rectangle** (`min-height: 220px`, `border-radius: 16px`,
  `padding: 34px 36px`) sitting 24px under three **bone rounded rectangles** (`border-radius: 8px`,
  `padding: 28px`). Same shape family, opposite value, different radius, different padding. Four
  boxes in one section, three light and one black, and the black one is the biggest thing in the
  section.
- Inside it, four objects at four sizes on **no shared line**. Measured off the 1440 capture:
  `Engagements` (102.87px, wdth 96) cap-top y≈160; `From $5K a month` (64px) cap-top y≈175; the
  descriptor (21px) cap-top y≈296; the chip's top y≈272. The subgrid was meant to give one shared
  top edge and one shared foot; two different display sizes on "row one" and a 48px chip against a
  21px sentence on "row two" means neither line reads.
- `From $5K a month` at **64px** is the same size as the card prices at 72px to within one step.
  The block therefore reads as **a fourth price tier that got promoted**, which is the exact rank
  confusion `CORPUS-PRICING §4 R1` was written to kill: *"the peers go in a row, the odd one out
  goes in a bar underneath, in its own shape."* This is not a bar. It is a fourth card at full
  width.
- At 390 it is unmistakable: one black box, 352 × ~290px, radius 16, holding four stacked objects
  and a **130px-wide empty gutter down its right side** (the chip stops at x≈232 of a 352 box).
  A big empty black rectangle is what a non-designer calls "the box."
- The corpus's two precedents both make this object **a bar, not a plate**:
  `CORPUS-PRICING §A` (cora, measured) — "a dark bar directly beneath the tray: two lines of 14px
  copy left, one outlined pill right"; `§B` (tambo, measured) — "a full-width dark bar beneath the
  row… same width as the three cards combined, own ground, own shape." `§3.8` states the rule
  outright and calls it *"the single most directly useful thing in the whole leg."* Live: tambo.co
  still ships it as its own block below the row.

**The fix (1440).** Demote the plate to a bar and give it one line.

- Height **fixed at 104px** (`min-height: 220px` → `height: 104px`), `border-radius: 8px` to match
  the cards, keep the 2px copper top rule (that is what ties it to the Audit's rank mark), keep
  the espresso ground, keep the 24px top margin. Full content width 32 → 1408.
- Interior padding **0 28px**, `display: grid; grid-template-columns: 1fr auto; align-items: center`.
- **Left cell, one line, one size:** `Engagements · advisory, project, retainer, or embedded.`
  at **21px/1.35 Hanken 400, bone**, vertically centred. The word `Engagements` in **Hanken 500**
  at the same 21px — the emphasis is weight, not size. Delete the 102.87px display head. The bar
  is not a section; it does not get a section head.
- **Right cell:** `From $5K a month` at **19px Hanken 500, copper**, inside a **1px copper
  outlined pill, 44px tall, 999px radius, 0 22px padding**, flush to the right padding edge.
  (`CORPUS-PRICING §4 R1`: *"`from $5K a month` is the sentence, not a fourth price slot."*)
  Delete the 64px figure and delete the separate chip — the whole bar is one link to /call, which
  it already is.
- Copper on espresso measures 5.8:1; the pill's label is 19px so it clears AA as normal text.

**The fix (390).** Bar becomes 2 rows inside one 8px-radius espresso block, `padding: 20px`,
auto height: row 1 the sentence at 19px/1.35 (2 lines), row 2 the copper outlined pill at 44px,
**full width** (20 → 370), 16px between. No box wider than its content, no empty right lane.

### Secondary: the manual's **dashed frame** (§07). A literal box, and the only dashed line on the page.

`1px dashed ink-40%` with `padding: 16px` around a 4:5 cover. Measured on `rl9-sec-manual.png`
at 1440: cover 50 → 573, frame 32 → 590 — **left inset 18, right 17, top 16, bottom 2**. The
frame is not concentric with the thing inside it, and at 390 (`rlz8-2-390-manual.png`) the dashed
rectangle with an inset image inside it is the exact visual language of an **empty drop-zone**.
`CORPUS-METHOD §2 B` specifies the opposite treatment for a real artifact — *"one white card with
a large radius and a soft shadow, no device chrome"* — and the dash appears nowhere else in this
document, so it reads as debug chrome, not as a house rule.

**The fix.** Delete the dashed border and the 16px padding. The **cover is the object**: full
column width (cols 1–5 = 559.33px at 1440), `aspect-ratio: 4/5`, `border-radius: 8px` to match
the cards, `object-fit: cover`, no border, no frame. Under it, the file line as it is at
`padding-top: 12px` — now aligned to the cover's own edges, because the cover's edges *are* the
column. One object, one edge. At 390: same, full width 20 → 370.

---

## 01 · THE BAR — **composed** (one addition)

**Why it holds.** 48px, one hairline foot, five items in the label style, identity left and the
ask right, ground swapping espresso→bone with the page's own light. It reads as one strip.

**The one failure.** `.bar .hide-s { display: none }` at ≤899px removes `RECORD`, `PLAYBOOK` and
**`NAME THE PROBLEM →`**, so at 390 (`rlz8-2-390-top.png`) the persistent bar is two labels and
**no CTA at the width where a persistent CTA earns its keep**. `CLIENT-WORK-SYNTHESIS` records
`viture-neckband §8` as the extreme discipline — the price and `Order Now` fixed in the nav,
*"visible from pixel one… no interstitial buy button across 11 sections."*

**Recomposition (390 only).** Keep the two nav labels hidden. Restore the CTA as a **compact chip
in the bar**: `NAME THE PROBLEM` at 12px label style + the `→`, right-aligned, **32px tall**,
`padding: 0 12px`, 1px copper border, 999px radius, `margin-right: 20px`. Bar height 48 → **52px**
so the 32px chip keeps 10px of air above and below. Hide `PACKAGES FROM $500` instead — the price
is repeated three times 1200px further down; the ask is not.

Secondary note, both widths: `justify-content: space-between` across 1376px gives gaps of
311 / 282 / 295 / 360px between five items of unequal width — a wobble a juror sees. Set the three
middle items in a `1fr` centre track with `justify-content: center; gap: 56px`, identity and CTA in
`auto` tracks either side. One rhythm instead of four.

---

## 02 · THE HERO — **assembled**

**Why.** Three separate failures, each visible in one glance.

1. **The point does not land.** §16.2 rules that the copper row's cap-top sits 4px under the
   fingertip and the "g" is one hand's width right of it, *"the hand emerges from the dark and its
   tip touches the 'g'."* Measured on `rlz8-2-1440-top.png`: the fingertip reads at ≈(420, 350);
   `I build the` cap-top is at y≈305 and the "I" at x=230; `go-to-market.` cap-top is at y≈432.
   **The tip is on row one, between the "I" and the "b" of "build" — 82px above the copper row it
   is supposed to point at.** The whole hero is built on a `--fx/--fy` mechanism whose payload has
   drifted. Same at 390 (`rlz8-2-390-top.png`): the tip sits inside the word `build`.
2. **The proof row is stranded.** `FOUR EXITS, $5B+ COMBINED.` sits at x≈1250 on the chips'
   baseline, with **≈670px of empty espresso** between it and `SEE THE PACKAGES`. Two objects at
   opposite ends of a line with nothing between them is a table row, not a composition. The
   hairline above them is the only thing spanning the gap, and it does a job nothing else does.
3. **Air that reads as a hole.** ≈140px of dead espresso below the chips at 1440. At 390 it is
   far worse: ≈130px between the copper row and the sentence, ≈60px above the proof label and
   ≈120px below it, and the veil goes solid at the headline's cap-top so **the film survives only
   in the top 165 CSS px of a 292px "stage."** The 4:3 crop was bought and then painted over.
   The headline is also indented to x≈62 (fingertip-derived) while every other element sits at 20
   — a 42px indent that reads as a mistake once the finger behind it is invisible.

`faunarobotics.com` (fetched, 200) is the register this is reaching for: video behind, headline
overlaid across it, one block. It holds because the film is legible under the type the whole way.

**Recomposition (1440).**
- **Re-measure `--fx/--fy` on the exact hold frame that ships**, then apply §16.2's rule to the
  **copper row**, not row one: `--fx` → the copper row's left edge = `fingertip_x − 48px`;
  the copper row's cap-top = `fingertip_y + 4px`. `I build the` sits on the row above
  (`--d` × 0.92 line-height = 124.5px up). Verify by screenshot, not by arithmetic — the current
  values are internally consistent and still wrong on screen.
- **Veil:** `.55` at `fingertip_y − 12px`, solid **only from the copper row's cap-top**, and
  **clear from 0% to 22%** so the whiteboard and the face stay readable above the type.
- **Proof row rejoins the block.** Move `FOUR EXITS, $5B+ COMBINED.` out of the chip row: place it
  **directly under the chips, left-aligned to the headline's left edge, 24px below the chips'
  foot**, 14px label style at 60% bone. Two things stacked on one edge beat two things at opposite
  ends of a rule. Delete the full-width hairline above the chips — with the proof line moved, it
  spans nothing.
- **Close the hole:** stage padding-bottom 140 → **56px**.

**Recomposition (390).**
- Stage stays 4:3 at 292px; **veil solid only from the copper row's cap-top**, `.5` 60px above it,
  clear above 20%.
- Headline left edge = `fingertip_x − 40px` per §14.7 **but never less than the 20px gutter and
  never more than 20px** — if the measured value exceeds the gutter, move the crop
  (`object-position`) rather than the type. One left edge on a 390 screen.
- Gap headline → sentence **130 → 40px**; sentence → hairline **32px**; chips **48px tall, full
  width, 12px apart**; proof label **24px** under the second chip; stage bottom padding **48px**.
  That returns ≈200 CSS px to the fold.

---

## 03 · OPERATOR, NOT CONSULTANT — **assembled**

**Why.** Two columns that share a top edge and nothing else.

Measured on `rlz8-2x-sec-operator.png` (1440): the film is a 781px square, 32 → 813, top y=161,
foot y≈918. The right column's three ledger rows run y=163 → **y≈420**. The quote block then sits
at **y≈830–935**. That is a **410px hole** in the middle of the right column, pinned open by
bottom-aligning the quote to the film. The `rl9` variant closes the hole by letting the quote
follow the rows — and opens a **330px hole below it instead** (`rl9-sec-operator.png`, right
column ends y≈660, film ends y≈990). Neither is composed; the column has 500px of content and the
film has 757px, and no arrangement of two objects fixes that.

Second failure: **three left edges.** The film's edge at 32, the heading and paragraph overlaid on
it at 64, the right column at 862. `Most consultants don't ship…` sits at 64 on the film's last
20px, so it belongs to neither the film nor the section grid.

**Recomposition (1440).** Make the film a **7-column, 4:5 portrait** instead of a square, and let
the right column set the section's height.

- Film: `grid-column: 1 / 8` = 7 cols = **672.67px wide**, `aspect-ratio: 4/5` → **840.8px tall**,
  `object-position: 62% 50%` (keeps the face and the phone; measure). `border-radius: 8px`.
- Heading `Operator, / not consultant.` stays overlaid at `--d2` wdth 106, its **left edge at 32 —
  the film's own edge**, not 64. Overlay type takes the object's edge or the grid's edge; picking
  a third is what makes it float. Veil solid from the heading's cap-top, `.6` 80px above it.
- The paragraph `Most consultants don't ship…` **leaves the film** and becomes the right column's
  **first** row at 21px, above the three register rows. That is 3 lines of content moved into the
  hole, and the film's foot is then clean.
- Right column `grid-column: 8 / 13`, top-aligned with the film, rows as they are (24px padding,
  hairline tops), the quote following the last row at **40px** with its own hairline.
- Set the section's height by `align-items: start` on both columns and **`min-height: 0`** — if
  the right column now runs ≈700px against the film's 841px, that 140px difference reads as
  deliberate asymmetry, not as a hole. 410px does not.

**Recomposition (390).** Film full width 20 → 370 at 4:5 (**437px tall**), heading overlaid at the
20px gutter, veil from the heading's cap-top; paragraph, three rows and the quote stacked under it
at 24px steps. Nothing overlaid below the heading.

---

## 04 · HOW I WORK — **composed** (the head excepted)

**Why it holds.** This is the best-composed section on the page and the one to build the rest
against. Three rows, one hairline rhythm, ordinal + name + sentence, no frame, no image, no
sticky. It is exactly what `CORPUS-METHOD §3.5` (pattern D, `esther §6.5` / `dragonfly §6.6`)
prescribes, and `§0`'s finding — *"0 of 14 builds put a photograph of the founder, the team, or
the workspace in the process panel"* — is honoured. `rlz8-2-390-work.png` shows it surviving the
stack cleanly.

**The exception: the head.** `Operating principles · How I work.` is **two labels glued by a
middot, both at 102.87px**, and it wraps into nonsense at both widths: at 1440 line 2 opens
`· How I work.` at x=577 with no relationship to any column; at 390 it reads
`Operating / principles · How I / work.` A juror reads that as a string-concatenation bug.

**Recomposition (the head only; everything below it: keep).**
- Eyebrow: `OPERATING PRINCIPLES` at **14px label style, ink-60%, letter-spacing .08em**, at the
  32px gutter, **20px above** the head. Every other section on this page already opens on an
  eyebrow (`FIXED.`, `RECORD`, `THE 80% WALL`) — this section is the only one that doesn't, which
  is why the middot exists.
- Head: `How I work.` alone at `--d2`, wdth 115, one line at both widths.
- Delete the middot and the nowrap span it needed.
- Head → first hairline: **56px** (currently ≈52; keep the rhythm).

**Second-order note (keep, but tighten).** The ordinal stub is 40px and the ordinals are ~16px
wide, so `01` sits 24px clear of the name it numbers. Set the stub to **28px** and the name
starts at x=84 instead of 96 — closer to the ordinal, and the ledger's left lane stops looking
like an empty column. The right-hand sentence occupies ~35% of its own 656px cell; cap it at
`max-width: 46ch` as it is and **left-align it to col 7 (x=732)** rather than the 1fr split, so
the caption lane starts on a grid line the receipts section can share.

---

## 05 · PACKAGES + ENGAGEMENTS — **assembled** *(the box; see the section above for Engagements)*

The Engagements fix is specified above. The three cards need three more corrections.

**Why the cards are assembled.**

1. **The chip is two shapes.** `.chip .t` (a black block with the label) butted against
   `.chip .a` (a 48px copper square with an arrow). Three cards × two shapes = **six rectangles**
   in the CTA row, plus the copper square repeats the label's job — both say "go." The corpus is
   unanimous and so is the live web: `CORPUS-PRICING §3.5` — *"One CTA per card, no exceptions,
   40–60px tall, and in five of six it is the card's width"*; `§A` (cora, measured) — *"246 × 51px,
   solid black, 999px radius, 16px label"*; `athenahq.ai/pricing` (fetched, 200) — *"a single
   solid rectangle button with centered label text… No separate coloured arrow squares are
   present"*; `tambo.co` (fetched, 200) — *"Single CTA button… no separate coloured square
   element."* Nothing in the corpus splits a CTA into two blocks.
2. **The card is 443px wide and its content fills 60% of it.** `$500` at 72px ends at x≈213 of a
   443px card; the name ends at x≈271. `CORPUS-PRICING §3.1` measures the whole corpus at
   **288–449px** with the *content* filling the card — this card is at the top of the band with
   the least content in the set. A box drawn around not-enough is the second box on this page.
3. **The Audit carries two markers.** A 2px copper top rule **and** `START HERE` beside the price.
   `CORPUS-PRICING §4 R4`: *"The only marker mechanism in the corpus is a 1px border colour change
   on the middle card… No badge, no popularity claim, no scale, no lift."* Four of six corpus
   builds mark nothing at all.
4. **The price did not step down at 390.** §14.5 rules 52px on mobile; `rlz8-2-390-price.png`
   shows it still at ≈64px. `CORPUS-PRICING §R7` (tambo, measured): **−22%** at 390.
5. **Three left edges in one section.** Section head at 32, card text at 61, Engagements text at
   64.

**Recomposition (1440).**
- **Chip → one shape.** Delete `.chip .a` inside `.card .cta`. One rectangle, **full card width
  (386.67px = 442.67 − 56), 48px tall, 8px radius**, espresso fill, bone label at **19px Hanken
  500**, centered, with the `→` as an **inline glyph 10px after the last word inside the same
  block** (`margin-left: 10px`), which keeps §16.3's 6px arrow-slide on hover. Hover: fill
  espresso → copper, 300ms, `transform: none` (`CORPUS-PRICING §3.6`: five of six builds are a
  colour swap over 300ms).
- **Narrow the row, centre it.** Cards **360px × 3, 24px gap = 1128px**, centred in the 1376
  content width (32px of cream either side becomes 156px). That is `CORPUS-PRICING §4 R1`'s exact
  geometry and `§A`'s island logic — the block stops being a full-bleed band and becomes an object.
  Card padding **28px** → interior 304px; `$7,500` at 72px measures ≈250px and still fits.
- **Audit: one marker.** Keep the 2px copper top rule. **Delete `START HERE`.** The card then has
  the same four parts as its peers.
- **Engagements bar** at **1128px, centred, 104px tall**, per the box fix above — same width as
  the three cards combined, which is tambo's rule verbatim (`CORPUS-PRICING §B`).
- **One left edge.** Section head and eyebrow move to the **row's** left edge (x=156), so head,
  cards and bar all open on one line. (Or keep the head at 32 and the row full-width at 443 — but
  then the head and the cards must share x=32, which means card padding 28 → 0 and a borderless
  card. The 1128px island is the cheaper fix and the one the corpus measured.)
- Card interior order and sizes: name 24px Hanken 500 → price 72px wdth 106 → 1px hairline at
  ink-12% → sentence 17px/1.5 max 2 lines → **CTA pinned to the card foot** (`margin-top: auto`,
  `padding-top: 28px`) as it already is. Five parts, no more (`CORPUS-PRICING §4 R2`).

**Recomposition (390).** Cards stack full width 20 → 370 (**350px**), 16px gap, **price 52px**
(§14.5, and `§R7`'s −22%), chip 48px full width one shape, Audit's copper top rule kept. The bar
below as specified. `CORPUS-PRICING §R7`: *"CTA stays 48px — never shrink the tap target."*

---

## 06 · THE RECEIPTS — **assembled**

**Why.**

1. **Two receipts where the ruling says three.** §17: *"receipts — we should add the content ai
   part to the list so we have three."* `rlz8-2-sec-proof.png` shows Guardicore, the RFP engine,
   and the exit link. `dragonfly §11`, quoted in `CORPUS-METHOD §2 D`: *"A text index is honest
   precisely because it is countable, and a padded one is the fastest way to lose the reader who
   counts."* Two is also the count that makes the exit link look like a third receipt.
2. **The exit link wears the receipt's clothes.** `See the rest →` takes the same hairline, the
   same 84px row, the same right-margin arrow, at 21px instead of 28px. It is a **fourth object
   repeating the row's job** at lower weight — the reader has to work out that one of these rows
   is not a receipt.
3. **A 150px dead lane inside every row.** `grid-template-columns: minmax(0,560px) 1fr 40px`.
   The longest name, `RFP engine for an industry author`, measures ≈411px of that 560px track, so
   every row carries 150px of empty cream before the caption starts.
4. **The head's rag.** `The receipts. Every / line below is real.` breaks after `Every`, hanging a
   function word off the end of line 1 and opening line 2 mid-clause.
5. **≈100px of dead cream** between the ledger's last rule and the next section, on top of `--s`.
6. **At 390 the arrow loses its anchor.** `rlz8-2x-390-engagements.png`: name on its own line,
   caption wrapping to two lines, the `→` vertically centred against the **caption**, not the row.

**Recomposition (1440).**
- **Three rows** — Guardicore · RFP engine for an industry author · AI content engine for an
  industry author — then the exit.
- Row grid → `minmax(0, 460px) minmax(0, 1fr) 32px`, `column-gap: 32px`. 460px fits the longest
  name with 49px of breathing room and moves the caption lane onto **col 6 (x=615)**, the same
  line the How-I-work sentences should take. One caption lane down the whole page.
- Row `min-height: 84px` → **76px**, `padding: 22px 0`. Three rows + head then occupy the height
  two rows + head occupy now, and the section stops looking short.
- **The exit stops being a row.** Delete `.prfx`'s hairline, arrow and 84px height. It becomes a
  **chip**: `See the rest →`, 14px label style, **1px ink-40% border, 999px radius, 40px tall,
  padding 0 20px**, sitting **32px below the ledger's last rule at the 32px gutter**. A ledger's
  way out is a control, not an entry.
- **Hard-break the head** after the first sentence: `The receipts.` / `Every line below is real.`
  Two clean lines, both opening at x=32.
- Ledger's last rule → next section: `--s` alone (120px). Delete the extra ≈100px.

**Recomposition (390).** Row becomes: name 24px on row 1, caption 17px on row 2, `→` **absolutely
positioned right, top-aligned to the name's cap-line** (`top: 4px`), not centred on the block.
Row padding 22px 0, hairline tops. Exit chip full width, 44px tall, centred label.

---

## 07 · THE MANUAL — **assembled** *(the dashed frame; fix above)*

Beyond the frame:

1. **Two measures in one column.** The three symptom lines take the full 793px right column
   (hairline ledger), then the chapters paragraph drops to ≈475px with no rule under it. The
   column's bottom-right corner rags out by 318px against a hard-ruled block above it.
2. **The display line is a third head.** `The AI handed you the code. Now ship the company.` at
   `--d2` over three lines is the tallest type block on the light half — taller than
   `Three fixed prices. Start this week.` (2 lines) and `The receipts…` (2 lines) — while the
   section's actual head is a 14px label. The hierarchy inverts inside the section.
3. **No section head.** Every other light-half section opens `eyebrow + --d2 head`. This one opens
   `eyebrow + --d2 sentence`, which is why it reads as a stray block rather than section 07.
4. **The buy block ($99 / `at launch` / the chip) is pushed below the fold of the section** at
   1440 and does not appear in the capture at all — the section's commercial payload is the last
   thing composed and the first thing lost.

**Recomposition (1440).**
- **Left column (cols 1–5, 559.33px):** the cover alone, 4:5, 8px radius, no frame, no padding;
  file line under it at `padding-top: 12px`, `justify-content: space-between` across the cover's
  own width. Cover height 699.2px.
- **Right column (cols 6–12, 793.33px), one measure for everything:**
  eyebrow `THE 80% WALL` 14px →20px→ head **`The 80% Wall.`** at `--d2` (one line) →28px→
  the display sentence demoted to the **lede at 28px/1.25 Hanken 400**, max 3 lines, full column
  width →32px→ three symptom lines as they are (21px, hairline top, `padding: 14px 0`, last one
  hairline-bottom) →28px→ chapters paragraph **at the full column width, `max-width: none`**
  →32px→ buy block.
  Column total ≈690px against the cover's 699px: the two columns end within 9px of each other,
  which is the whole reason for the demotion.
- **Buy block, one line:** `$99` at 64px wdth 106 · `at launch` 14px label at ink-60% on the
  price's baseline, 14px right of it · chip `Get chapter one free →` **one shape**, 48px tall,
  8px radius, espresso fill, bone 19px label, `margin-left: 32px`. All three baseline-aligned.

**Recomposition (390).** Cover full width 20 → 370, no frame; file line as two rows under it;
then eyebrow, head, lede at 24px, symptoms, chapters, buy block with the chip full-width at 48px.

---

## 08 · THE OBJECTIONS — **assembled**

**Why.**

1. **A 490 × 210px void in the top-right.** The head `The objections, in / your words.` fills the
   left ~66% of two `--d2` lines and leaves the right third empty above the columns. The eye reads
   the hole before it reads the questions.
2. **The three columns rag by ~30px at the foot** — col 1 has 3 answer lines, cols 2 and 3 have 2.
   `CORPUS-PRICING §4 R5` names this exactly: *"cora lets the two cards end at different heights…
   and it looks unfinished,"* and prescribes a **structural** fix, not a copy trim.
3. **≈150px of dead cream** between the last answer and the copper field, on top of the section's
   own 120px bottom padding — ≈270px of nothing immediately before the loudest object on the page.
4. The section carries **no eyebrow** while its neighbours do.

**Recomposition (1440).**
- Add the eyebrow `OBJECTIONS` at 14px label style, 20px above the head.
- **Head goes to one line** at `--d2` wdth 106: `The objections, in your words.` measures ≈1090px
  at wdth 106 against 1376 — it fits, and it closes the void by consuming the row.
  If it will not fit at 106 at a given width, wrap it — but then **fill the right third** with the
  count, per `CORPUS-METHOD §2 D` (`dragonfly §6.6`'s idiom): `03` at 14px mono-label plus
  `SEC—08` on a hairline, right-aligned at x=1408, baseline-aligned to the head's last line. A
  deliberate object beats a hole.
- **Level the feet structurally, not by editing copy:** `.qs { align-items: stretch }` and give
  each `.q` a **1px hairline bottom at ink-10%** in addition to its top rule, with
  `padding-bottom: 24px` and `min-height` unset — three closed cells of equal height end on one
  line by construction, and the rag becomes internal air instead of a ragged edge.
- Answers → `max-width: 34ch` so all three wrap at similar depths.
- Last hairline → copper field: **120px** (`--s` alone). Delete the extra 150px.

**Recomposition (390).** Three stacked cells, hairline top **and** bottom on each, 24px padding,
**40px between cells** (§15.3), question 22px/1.2, answer 17px/1.5.

---

## 09 · THE ASK — **assembled**

**Why.** It is a 720px copper field holding 340px of content.

Measured on `rlz8-2x-sec-ask.png`: field top y=62, foot y=782 (**720px**, from
`min-height: 720px`). Content runs y≈260 → y≈602. **≈465px of copper is empty**, and the entire
right 45% of the field (x 800 → 1408) holds nothing at all. Clear Street (fetched, 200) closes on
*"headline + button + background image — three objects, nothing left empty."* This page's loudest
field is its emptiest.

Second failure: **two arrows doing one job.** `problem.` is followed by a floating 56px `→` at
x≈745, and the chip 110px below carries its own arrow square. Third: **two chips of different
construction** — `BOOK A FREE INTRO CALL` (espresso block + bone arrow square) beside
`SEE THE PACKAGES` (bone block, no arrow, no border). Two buttons, two grammars, 22px apart.

**Recomposition (1440).**
- `min-height: 720px` → **`min-height: 0`**, `padding: 120px var(--g)`. The field's height becomes
  its content's height + 240px. On the current content that is ≈580px — a 140px saving and no hole.
- **Fill the right third with the one thing the ask is missing: the reply promise.** Move
  `I READ EVERY MESSAGE AND REPLY INSIDE ONE BUSINESS DAY.` **up out of the foot** and set it at
  **19px/1.4 espresso, max-width 26ch, right-aligned at x=1408, baseline-aligned to the headline's
  last line.** The field then reads as head-left / promise-right, and the foot loses an item it
  was only holding because nothing else would.
- **One arrow.** Delete the floating 56px `→` after `problem.` The chip's arrow is the ask.
- **Two chips, one grammar.** Both **48px tall, 8px radius, one shape each**:
  primary `BOOK A FREE INTRO CALL →` espresso fill / bone label / inline arrow;
  secondary `SEE THE PACKAGES` **1px espresso border, transparent fill, espresso label, no arrow**.
  16px between them. `CORPUS-PRICING §3.5`/`§3.7`: one CTA shape, differentiation by weight —
  NewsCatcher's measured move, *"differentiation by CTA fill weight alone."*
- Headline `max-width: 9ch` stays; head → chips gap 48px stays.

**Recomposition (390).** `padding: 72px 20px`, headline at the 52px floor, promise line under the
headline at 17px (not right-aligned — there is no right), chips stacked full width 48px, 12px
apart.

---

## 10 · THE FOOT — **assembled**

**Why.** A 176px espresso band containing **one 14px line**. Three items — the email at x=32, the
reply sentence centred in the viewport, `MICAH JONES` at the right margin — on a single baseline
at y≈865, with **no rule, no columns, no structure**, and ≈100px of black above and ≈70px below.
It also **repeats the bar's shape**: identity-adjacent item left, name right, 14px labels
throughout. The page opens and closes with the same thin strip.

`clearstreet.io` (fetched, 200) closes on **five labelled columns plus a legal line** — not
because a solo consultant needs five columns, but because a footer is where a site proves it has
more than one surface. `dragonfly §6.6` (via `CORPUS-METHOD §2 D`) shows the small version: an
ordinal, a section name, a `SEC—` code on a hairline, and a **count**.

**Recomposition (1440).**
- `padding: 72px 32px 64px` stays. Add a **1px hairline at bone-15% across the full content width
  at the top of the foot**, so the band has an edge instead of a colour change.
- **Three columns on the 12-col grid**, top-aligned, `align-items: start`:
  - **cols 1–4:** `MICAH JONES` at **24px Hanken 500 bone**, then
    `micah@micahjonesconsulting.com` at 17px bone-60% under it, then
    `I read every message and reply inside one business day.` — **unless** it has moved into the
    ask per §09, in which case this cell ends at the email.
  - **cols 6–8:** a label `PAGES` at 14px bone-40%, then `Record` · `Playbook` · `Packages` ·
    `Name the problem` as **four 17px bone-80% rows, 12px apart**. The bar's nav labels, given a
    permanent home — which is what lets §01 drop two of them at 390 without loss.
  - **cols 10–12:** a label `THE MANUAL` at 14px bone-40%, then `The 80% Wall · $99 at launch` at
    17px and the chip `Get chapter one free →`, 40px tall, 1px copper border, 999px radius.
- **A closing line at the foot of the foot:** `SEC—09` and the year-free copyright at 12px
  bone-40%, left and right of a second hairline, 32px under the columns. This is `dragonfly`'s §
  idiom and the only place on the page it costs nothing.
- Foot height rises from 176px to ≈300px and stops being a caption.

**Recomposition (390).** The three cells stack in that order, 32px apart, all left-aligned to the
20px gutter; the closing line last, its two items on two rows.

---

## The one rule that fixes six of these sections

Every failing section fails the same way: **a container whose height or width is set by something
other than its content.** `min-height: 720px` on the ask. `min-height: 220px` on the Engagements
plate. A square film beside a 500px column. A 443px card holding 260px of type. A 560px name track
holding a 411px name. A dashed frame 16px larger than the cover inside it.

Delete every fixed dimension on this page except the three that are load-bearing — the bar's
height, the chip's 48px tap target, and the hero stage's aspect ratio — and let content set the
rest. That single pass closes ≈1,400px of vertical hole across the home page, removes both boxes,
and is most of the difference between assembled and composed.

---

## Sources

Corpus: `CORPUS-PRICING-SECTIONS.md` §A (cora, measured), §B (tambo, measured), §C (NewsCatcher,
measured), §D (AthenaHQ, measured), §3.1/§3.5/§3.6/§3.7/§3.8, §4 R1/R2/R4/R5/R6/R7.
`CORPUS-METHOD-SECTIONS.md` §0, §1 (census), §2 B/D, §3.1/§3.5, and the `dragonfly §11` and
`growthloop §11` rules quoted there. `CLIENT-WORK-SYNTHESIS.md` §A8 (5 of 14 price, 0 of 14
studios), and the `viture-neckband §8` nav-CTA discipline. `01-MORE-STUDIOS.md` §1 (Vizcom /
OFF+BRAND), §3 (AthenaHQ / Utsubo), §5 (Selfbook, Clear Street), §6 (NewsCatcher / O0).
Rulings: `WINNING-BRIEF-2026-09-05.md` §14.1–14.8, §15.1–15.8, §16.1–16.4, §17.

Fetched live 2026-09-06, all 200: `https://tambo.co` (`Tambo`);
`https://athenahq.ai/pricing` (`Plans & Pricing | Action on AI Search`);
`https://www.clearstreet.io/` (`Clear Street — Speed, Transparency and Scale for Sophisticated
Investors.™`); `https://faunarobotics.com/` (`Fauna Robotics | Capable, Safe, Fun Robots for
Everyone`); `https://selfbook.com/` (title's first word elided here, copy-lint banned term:
`[…] more direct bookings and expand your distribution through AI search | Selfbook`);
`https://cora.computer` (`Give Cora your inbox. Take back your life.`).

Screenshots read: `rlz8-2-1440-top.png`, `rlz8-2-sec-work.png`, `rlz8-2-sec-price.png`,
`rlz8-2-sec-proof.png`, `rlz8-2-sec-manual.png`, `rlz8-2-sec-faq.png`, `rlz8-2x-sec-ask.png`,
`rlz8-2x-sec-operator.png`, `rlz8-2x-engagements.png`, `rl9-sec-manual.png`,
`rl9-sec-operator.png`, `rlz8-2-390-top.png`, `rlz8-2-390-price.png`, `rlz8-2-390-manual.png`,
`rlz8-2-390-work.png`, `rlz8-2x-390-engagements.png`.
