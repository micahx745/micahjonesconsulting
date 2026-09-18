# FABLE-121-G3: ruling on the Direction C mock set

Fable 5.1, gate G3 of Pass-121, 2026-09-18. Read in this order: `FABLE-121-G3-INPUT.md`, the brief draft
`.claude/briefs/pass-121-work-and-studies.md`, the eight images named in the input. Nothing else opened,
nothing built, nothing captured. One file written: this one. Every number below is a rendered CSS pixel
unless it says otherwise; every colour is an existing token name.

## 1. R1: ADJUST

Direction C lands. Build it from the brief once the eleven changes below are in it. No third mock round:
the changes are placeable by rule, and my next look is the first built preview at 390 and 1440 (brief
section 7, the first-preview checkpoint).

What I saw. At 1x the hand reads as drawn: the corners overshoot, the strokes vary in weight along their
length, the arrows are pulled rather than routed. At half size the five drawings read as a sketch tool's
output, and two things cause that: the boxes are fitted to their labels (a tool sizes a box to its text;
a hand draws the box around the words with room to spare), and the two figure-move drawings are three
small boxes and a `+`. Both are fixable by rule. The page itself has the punch he asked for: the 96px
heading, the doorway with the still, four hairlined entries with a drawing beside each number, the method
line alone on paper, the record on espresso. Nothing in the type or the structure reads as a template. A
buyer would not take the page for AI-built. A buyer might take the drawings for a diagram tool's output
until the list below is applied. Nothing here calls for his hand-sketched fallback.

Changes, each placed by the ruling or note it names:

1. The `+` tags go. The accent on each figure-move drawing is the figure row's arrow (R6).
2. The birth-worker drawing gets a second row: four words lifted from its own dek, shown to the operator
   with the visual approval (R6).
3. Boxes in the figure-move drawings take their widths from the layout, not from the label (R6).
4. One label size per placement: 12 at the index, 13 on the band and in the body, 11 at 390. The unit
   lines and the frame heads are labels, not titles (R5).
5. The circle is the home's own path at the home's ratios, not a fitted stadium (R7).
6. The doorway carries the still only; the visibility diagram lives in the study (R12).
7. Copper on all five drawings on /work; sage arrives inside /work/ordani through `--cs-accent` (R4).
8. 8px of clear paper inside every box, and the overlap check stops exempting a label's own box (N7).
9. One type set at 1440, seven sizes; the figure line under every numeral is display 22 on the doorway
   and the entries alike; every context line is Hanken 14 (R3).
10. At 390 every study opens on its image (R13); ORDANI's comparison stacks (R14).
11. Guardicore's §01 note is re-lifted and the §02 bracket spans its paragraph (N3, N4); DRAFT moves
    inside ORDANI's entry (N9); `text-wrap: pretty` on the description and the figure lines (N10).

## 2. Rulings R2 to R14

**R2. Hover grammar: accepted as round 2 has it.** At rest every accent is at full strength, one pass.
On hover, 200ms `--duration-hover` `--ease-hover`, reversing on unhover: the second offset pass of the
accent appears (opacity 0 to 1 on that pass only); the entry's lower hairline scales 0 to 1 in
`--color-accent-copper` from the left; the figure line (numeral or words, and the doorway's circle with
it) goes `--color-accent-copper-deep`; the doorway still's tint lifts 0.82 to 1. States frames 02 and 03
show exactly this and it reads. Two clarifications: the words-figures (ORDANI, birth worker) take the
same colour change on the whole 36px line; `READ THIS ONE FIRST` is already copper-deep at rest and gets
no extra motion. Reduced motion: the colour change with no transition, no second pass. No JavaScript.

**R3. The type set on /work at 1440: seven sizes, and G2's three outliers are retired.**

| px | face | what |
|---|---|---|
| 96 | Bricolage, uppercase via CSS | the h1 |
| 72 | Bricolage | numeral figures on the doorway and the entries; the record heading (uppercase); a study's figure moment |
| 36 | Bricolage | words-figures (ORDANI, birth worker); the method line; a record row's company |
| 22 | Hanken regular | the description (max 60ch, `text-wrap: pretty`) |
| 22 | Bricolage, the words-figure's weight | the figure line (`entry.line`) under every numeral figure, doorway included |
| 18 | Hanken | did-lines; record descriptions |
| 14 | Hanken, `--color-foyer-ink-soft` | context lines on all five entries, the doorway's included (today the brief sets the doorway's in mono; one treatment for five) |
| 14 | JetBrains Mono | service labels; `READ THIS ONE FIRST`; record role and outcome |
| 12 | JetBrains Mono | folio; DRAFT; the footer row |

So: description 22 (not 20), doorway figure 72 (not 56), figure lines 22 (not 28). The doorway is the
featured entry by its still and its link, not by a larger numeral; one numeral size across the page. The
figure line is display so that figure plus line reads as one headline unit (as the mock's entries 02 and
04 already do) and the did-line beneath reads as body; the mock's doorway had its line in Hanken regular
and that inconsistency goes. The check (brief Stage F) scopes to the main content from the h1 to the
record's last row and expects exactly {96, 72, 36, 22, 18, 14, 12}; the cross line and the footer keep
their live sizes and sit outside the scope.

At 390, for completeness (the first preview checks these): h1 48; numeral figures 36; words-figures 26;
method line 26; description 18; figure lines 18; did-lines 16; context 14; mono as live.

**R4. Sage: copper on /work, sage inside /work/ordani.** The constitution's scope stands unchanged. On
/work all five drawings accent in `--color-accent-copper`. The exhibit's accent stroke is written once as
`stroke: var(--cs-accent, var(--color-accent-copper))`, so inside the ORDANI study, where `--cs-accent`
is sage, the same component draws sage with no prop. The morph's crossfade carries copper into sage over
its 600ms; that is the study's colour arriving, not a defect. "One accent element" means one meaning,
which may be several strokes: the gap box, the east-west arrows, the Ordani column's two boxes, the
figure row's arrow.

**R5. Label size, rendered, per placement.** Geometry keeps one viewBox per drawing and scales; text size
does not scale with it. The executor sets the SVG text's `font-size` in user units per placement as
`target px × (viewBox width / rendered width)`, four values, and the check measures the render.

| placement | rendered width | mono labels | Hanken sentences (ORDANI only) |
|---|---|---|---|
| 1440 index (/work entries) | 400 | 12 | 13 |
| 1440 band, and Guardicore's body break | 560, about 600 | 13 | 14 |
| 390 index and band | 358 | 11 | 12 |

Line-height 1.25 for mono, 1.3 for Hanken. Everything mono in a drawing renders at the placement's label
size: box labels, the unit lines (`impressions in a month`, `bookings a month`), the two frame heads on
the visibility diagram, ORDANI's two column heads. The mock's 24px unit line and its near-h2 frame heads
(N5) are the size this rule removes. Strokes take `vector-effect: non-scaling-stroke`, 2px at 1440 and
1.5px at 390 set in CSS, so one stroke weight per page holds across index and band without a second
computation. On the visibility diagram the two north-south arrows sit at the left frame's top centre and
`north-south, defended` sits centred 8px above their tips; at 13px `What the pitch led with` fits its
frame on one line.

**R6. Drop the `+`.** It carries no count and the page has none to give it. Each figure-move drawing has
two rows, one grammar (D5 stands): row 1 is the figure move, row 2 is the mechanism.

- content-engine: row 1 `a few thousand` → `up to 800,000`, unit `impressions in a month` beneath row 1;
  row 2 `one rough video` → `the week's work`. Unchanged words.
- birth-worker: row 1 `one to three` → `five to ten`, unit `bookings a month` beneath row 1; row 2, new,
  `the same service` → `the full arc of care`. Both phrases appear character for character in the new dek
  (brief 2.1). **Operator approval needed, asked with the visual approval:** it is a new composition of
  his words, like the Guardicore and ORDANI exhibit strings. Digits or words for row 1: the words, as the
  dek has them, so the facts gate matches without a number map.

The accent element on both is row 1's arrow, copper, two passes. Row 2's arrow is ink. Box widths come
from the layout: each row's two boxes are 42 percent of the drawing's width each, the arrow takes the
remaining 16 percent, and the labels sit inside with the 8px padding of N7; a box is never sized to its
label. Facts gate: match each label as a contiguous, case-insensitive, whole-word substring of the MDX or
a LESSONS #3 row; the two unit lines are the likely misses (`bookings a month` is not contiguous in the
dek), and a miss is a stop-and-report for the main session to check the ledger, never a reword.

**R7. The circle: not the home's mark yet.** The mock's is a stadium, flat runs top and bottom,
semicircular ends, heavy uniform stroke, no crossing where the stroke starts and ends, no grain. The
home's `$20M+` mark (image 8) bows at the top, tilts at the ends, overlaps itself at about ten o'clock,
tapers, and carries grain. The build renders `HandCircle`'s own `PATHS` through `HandCircleStatic` (brief
3.3), so the shape comes from the home; the numbers to place it: the circle's box is 1.19 times the
numeral's ink width and 1.51 times its cap height (my read of the home crop; `home-circle-ratios.json`
rules if it disagrees), centred on the numeral's ink box on both axes, the overlap at the top left, the
stroke width scaling with the path (no pixel stroke set on it), the grain filter on. Same ratios at 72
on the doorway and the figure moments and at 36 at 390. At 390 the overhang (about 10 percent of the
numeral's width each side) would cross the 16px gutter, so the figure gets left padding equal to the
overhang and the SVG's overflow stays visible. Colour: ink at rest, copper-deep with the numeral on the
doorway hover, `--cs-ink` on a study.

**R8. Figure moments.** A numeral figure: the whole `entry.figure` string at 72 with the circle around
all of it, so `Up to 800,000` is circled as one claim, qualifier included; no `figurePrefix` field, no
mono `Up to` above the number. A words figure (ORDANI, birth worker): `entry.line` at 36 Bricolage, and
the circle goes around one phrase inside it, named in a new optional frontmatter field
`entry.figurePhrase` that must be a substring of `entry.line` (a V-check): ORDANI `hundreds of dollars`,
birth worker `five to ten`. The phrase is a span with `white-space: nowrap` so the circle never spans a
line break. `results.rest` in mono 14 beneath as the brief has it. On /work only the doorway carries a
circle; the four entries carry none, numeral or words; one circle per page, as the home.

**R9. No sentence under the two figure-move exhibits,** on /work or on their bands. With row 2 the
drawing carries its own mechanism, and a sentence would repeat the dek beside it. ORDANI's comparison
carries none either (its boxes are the sentences). Sentences exist on the RFP flow (approved) and the
visibility diagram (with the operator). G2 §3.4 is amended to: a sentence where a drawing needs a key.
No new sentence is drafted here, so nothing goes to the operator under R9.

**R10. The RFP band's dark below the sentence: accepted as the brief's rule has it.** The drawing's top
on the title's cap line, its sentence 24px beneath, the leftover dark at the band's bottom. Filling it
would be a #37 move. Guardicore's 4:5 still fills more of its band and that difference is honest.

**R11. The morph.** Frame 04 reads: the still travels up and right and grows while the page dims, and
that is the whole idea. Frame 05 is a composite that cannot occur (N6): the reader clicks entry 02 with
entry 02 in view, and the flow lands on the RFP band's own slot, not over Guardicore's photograph; the
spike's own mid-point capture replaces it. The spike stands as written: one pair, Guardicore doorway
still to `.cs-band__img`, production build, playback at 0.1, the named group read from
`document.getAnimations()`, hard stop. If E1 fails, C ships with the dim only and the drawings static at
both ends; the pass does not lose anything a buyer would miss. No second mechanism is tried inside this
pass: if the operator wants the morph after a failed E1, it is a separate spike brief (the React
`<ViewTransition name>` pair is the candidate), written by Opus, read by me, on its own branch. The morph
runs at 390 only after E1 passes at 1440 and one 390 mid-point is captured.

**R12. The doorway carries the still only.** The visibility diagram under the still was a count's
doing. It moves to the study as Guardicore's first body break (brief 3.3 already says so). /work then
holds four drawings and one photograph: five exhibits. C1's `cs-exhibit >= 4` stands.

**R13. The band's order at 390: context, title, media, dek, at-a-glance list, results.** The media slot
follows the h1 in the DOM at every width, and at 1440 the grid places it in columns 8 to 12 from the
title's cap line as now, so reading order and visual order agree. At 390 the still renders 358 wide at
16:10 (the doorway's own 390 crop, so the morph pair matches shape) and an exhibit renders 358 wide at
its natural height, max 240, max 300 for the two stacked drawings. This touches the Pass-120 band's
markup order and its CSS placement only; no string changes.

**R14. ORDANI at 390: a second, stacked viewBox,** the same exception the visibility diagram has. Order
top to bottom: `Filing it yourself or through a service`, its two boxes, `Filing it in Ordani`, its two
boxes; boxes full width; sentences at 12 Hanken per R5; the words unchanged. Both ends of ORDANI's
morph pair use the stacked viewBox at 390 and the wide one at 1440, so each width's morph remains a pure
scale. Height cap at 390: 300.

## 3. Notes N1 to N10 not already covered

- N1: R13. N2: R14. N5: R5. N6: R11. N8: R1 items 1 to 4.
- N3: the §01 note is `§01 · east-west traffic between workloads`, a character-for-character lift from
  the section's second paragraph. Case convention: a note is compared case-insensitively for the lift
  check and rendered with its first letter lowercase unless the first word is a proper noun, an acronym or
  a figure (`Akamai`, `RFP`, `$3M`), so `a person reviews and submits every response` is correct.
- N4: the §02 mark is a bracket drawn by `lib/hand`'s `handStroke` (the drawings' own line, so it
  matches), shaped `[` with 12px ticks, spanning the full height of the paragraph that holds the turn
  (`I interviewed customers ... visibility was the thing they signed for.`), 2px, `--cs-ink-soft`, in
  column 9 between the body and the margin column, its margin note beside its top tick. A 20px glyph is
  not a mark.
- N7: 8px clear on all four sides inside every box at the 1440 index width (scaled with the geometry, so
  about 7px at 390, checked at 6 or more). The E3 overlap check drops its own-box exemption: a label's
  ink box must be at least 8px from its own box's strokes at 1440 and cross no stroke at all.
- N9: DRAFT renders inside ORDANI's entry, on the folio row, 24px to the right of `03`, mono 12
  `--color-foyer-ink-soft`, above the hairline that closes the entry. Only its did-line remains open,
  with the operator.
- N10: `text-wrap: pretty` on the description and on every figure line; where a browser lacks it the
  page is unchanged. The executor confirms in the 1440 capture that the description's last line carries
  three words or more; if not, the measure moves from 60ch in 1ch steps, 58 to 62, until it does.
- Reveal frames 06 and 07 read: the method line from its before-state to full. Accepted.

## 4. Corrections to the brief draft

Opus's five corrections against the repo (ORDANI has no band photograph; no `.cw-hand` class; the
`cw-js-reveals` gate; `textContent` instead of an uppercase grep; committed `lastmod.json`) all stand.
The 0.6-opacity correction stands. Apply these:

- §2.1 content-engine row: `entry.figure: "Up to 800,000"`, `entry.line: "impressions in a month, up
  from a few thousand a month."`; no `figurePrefix` (R8). Add `entry.figurePhrase` to ORDANI
  (`hundreds of dollars`) and birth-worker (`five to ten`) (R8).
- §2.3: both figure-move files lose `tag`. `birth-worker.ts` nodes become `one to three`, `five to ten`,
  `the same service`, `the full arc of care`, unit `bookings a month`, marked **[OPERATOR, asked with the
  visual approval]** (R6). No sentence under the figure-moves (R9). State the facts gate's match rule
  and its stop-and-report (R6).
- §2.4: the §01 note wording and the case convention (N3).
- §3.1 Description: 22, `text-wrap: pretty` (R3, N10). Doorway: figure 72; the context line Hanken 14
  ink-soft, not mono; no diagram (R3, R12). Four entries: figure lines Bricolage 22 at the words-figure's
  weight; no circles on entries (R3, R8). DRAFT placement (N9). Type sizes: the R3 table and its scope.
  Add the 390 sizes from R3.
- §3.2: "one viewBox per drawing, scale only" becomes "geometry scales with one viewBox; text size is set
  per placement (R5); strokes `vector-effect: non-scaling-stroke`". ORDANI joins the visibility diagram as
  a two-viewBox drawing (R14). Accent: copper everywhere on /work via `var(--cs-accent,
  var(--color-accent-copper))` (R4); the one-element definition (R4). Label sizes: the R5 table. Box
  padding 8px (N7). Figure-move layout: two rows, 42/16/42 (R6). Exhibit sentence: flow and visibility
  only (R9). 390 height cap 240, 300 for the stacked two (R13, R14).
- §3.3: band DOM order and grid placement (R13); the still 16:10 at 390 (R13). Figure moment: R8's
  rule, `figurePhrase`, nowrap span. The circle: R7's ratios and placement, 390 left padding. The §02
  bracket from `lib/hand` (N4).
- §4 item 1: accepted as written plus the R2 clarifications. Item 3: add R11's fallback and the 390
  condition.
- §5 E3: the overlap check without the own-box exemption (N7); a rendered label-size check per placement
  expecting the R5 table; Stage F's type-size check expecting exactly the R3 set within its scope. Stage
  D: a check that each `figurePhrase` is a substring of its `entry.line`; the 390 band captures show the
  media inside the first 812px.
- §7: add "E1 fails: ship with the dim only, drawings static at both ends; the morph becomes a parked
  spike" (R11), and "a facts-gate miss on a unit line is a stop, not a reword" (R6).
- §8: add the birth-worker second-row words to the items asked with the visual approval.

## 5. For the operator

1. Verdict: ADJUST. Direction C works and gets built; eleven precise fixes go into the brief first, and
   there is no fourth round of mock-ups. I look again at the first real build on phone and desktop.
2. What you will see change: the little `+` boxes go; the birth-worker drawing gets a second line made
   of your own words (you approve those four words); every label in the drawings is one size; the ring
   around $14M becomes the same mark as the $20M+ on your home page.
3. The /work doorway keeps the photograph only; the Guardicore diagram lives on its own page. Every
   drawing on /work is copper; the green stays inside ORDANI's page.
4. On a phone every study now opens on its picture or its drawing, and ORDANI's comparison stacks so its
   words are readable.
5. Waiting on you, all asked together with the visual approval: the birth-worker drawing's four words
   (`the same service` to `the full arc of care`), the Guardicore and ORDANI exhibit sentences you were
   shown, the ORDANI did-line, and whether `Also on the record` takes a period.
