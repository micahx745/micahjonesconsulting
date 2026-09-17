# FABLE-121-PROOF: the Direction C proof, judged

Fable 5.1, 2026-09-17, the quality gate before the operator sees the proof. Eight tool calls: the
input file, FABLE-121-G2.md, the four proof captures (work-fold-1440, work-fold-390, rfp-study-1440,
rfp-study-390), live-home-1440-fold.png (no circle in it) and live-home-1440.png (the `$20M+`
circle). No edits, builds, captures or web research. Plain markdown, no emoji, no em-dashes.

Verdict: ADJUST FIRST.

---

## 1. The hand

**What matches.** The stroke technique is the home's: two overlapping passes, the small overshoot
where a stroke turns a corner, the arrowheads as two short strokes, one element in copper. On close
inspection at 1440 the box corners and the arrowheads are the same family as the `$20M+` circle.
This is not clip-art, and the renderer is not the problem.

**What gives it away as a flowchart tool with a wobble filter, at both sizes and on both grounds:**

1. Six identical boxes on a grid. Same width, same height, same gaps, corners aligned. A pen draws
   each box to fit its word, so the widths differ. Uniform boxes are the first thing the eye reads,
   and they read as software.
2. The boxes are empty and the words are typeset beneath them. A person writing on a whiteboard puts
   the word inside the box. An empty pill with a caption under it is a wireframe convention, and six
   of them in a row is a wireframe.
3. The return connector. From the third box it turns down, runs left under the row-one labels with
   rounded corners, and turns down again into the fourth box. That is an auto-router's orthogonal
   path with a wobble applied. It is the longest line in the drawing and the one that carries no
   meaning. At 1440 on /work its vertical segment runs about 5px from the edge of `score`.
4. The wobble is uniform along every path. A filter's turbulence has constant amplitude; a hand
   wavers most at the start, the end and the corners, and runs cleaner through the middle of a
   stroke. On the dark band, where the bone stroke sits on a flat ground, this reads as "shaky"
   rather than "drawn".
5. Two stroke weights on one page. The `$14M` and `$3M` circles are visibly heavier than the flow's
   lines and the margin arrow. The home has one weight; this page has a heavy mark and a light
   diagram, which reads as two sources.

**The circle itself.** The home's `$20M+` circle is thrown: wider than the figure by a clear margin,
its stroke running at the cap line and baseline so it grazes the glyphs, with the overshoot loop at
the left. The proof's circles at 56 and 72 are fitted: even clearance on all four sides, more
rectangular, a rounded box hugging the number. At that size they read as a hand-drawn button
outline, not a scrawl around a figure. The path or its aspect changed between the home and the
proof; Opus measures the live circle's box against its figure's box and the proof reuses the ratios.

**At 390.** The drawing is 358 wide, the boxes about 90 by 26, and the wobble drops below a pixel.
It reads as a small clean flowchart with nervous edges. The copper element still reads. Points 1 to 3
above are what the phone reader sees; point 4 is not visible at that size.

**On the dark band.** Bone on `#12100e` at 1.5px is delicate. It holds, but the diagram reads as an
annotation in the corner of the band, not as the band's image.

Summary of the hand: the stroke is right, the composition is a tool's. Composition is numbers in a
brief, not a new renderer, which is why this is not a STOP.

## 2. The punch

Too quiet, as shown, and for measurable reasons:

- On the RFP band at 1440 the drawing is about 380 by 190 CSS px in the top-right of a band roughly
  900px tall. Beneath its sentence there is about 280px of empty dark. The at-a-glance list on the
  left is taller than the drawing. The band is still a text band with a diagram in the corner.
- On /work at 1440 the entry is roughly half paper: a 72px numeral, three lines of mono context above
  it, and a thin drawing of empty boxes at right.
- Lines at 1.5px, labels at 11px mono, nothing inside the boxes, and the emphasised element is a
  faint orange outline at the same weight as everything else.

The changes that make it land, all inside the rules as ruled at G1 and G2:

1. **Words inside the boxes.** The six label strings, unchanged, set in mono inside their boxes, two
   lines where needed (`portals,` / `checked nightly`; `library,` / `300+ pieces`; `bid or no-bid` /
   `score`; `draft, on the` / `buyer's criteria`; `the gap,` / `marked`; `a person` / `approves`).
   Each box sized to its words with 8px padding, so the widths differ (roughly 70 to 125 in the index
   viewBox). That one change removes the grid and the wireframe tell together.
2. **Kill the routed connector.** Row two runs right to left, the whiteboard snake: `draft` sits
   under `bid or no-bid score`, `the gap, marked` in the middle, `a person approves` at the left,
   with row-two arrows pointing left. The row-one-to-row-two link is one short down arrow, about one
   box-height long, from the bottom edge of box three to the top edge of box four. The connector
   becomes the shortest line in the drawing instead of the longest, and nothing is routed around
   anything.
3. **One stroke weight for every hand mark on a page.** 2px at 1440 (circle, flow, margin arrow,
   bracket, underline alike), 1.5px at 390. The amendment to G2 section 4.1's 1.5px stands for every
   exhibit from here.
4. **Emphasis the way a hand does it.** The copper element (the gap box and the arrow into it) is
   drawn over twice, two visibly offset passes, the way the home's circle gets its weight. No fill,
   no glow; the second pass is the emphasis.
5. **Wobble that varies.** Heavier displacement in the first and last 15 percent of each path and at
   corners, lighter through the middle. If the filter cannot do it per segment, split each box into
   four strokes so the corners get their own start and end.
6. **Scale and placement.** Band at 1440: the exhibit fills columns 8 to 12 (about 560 wide), its top
   aligned to the title's cap line, the sentence beneath it at 15px and max 48ch; no empty band region
   taller than 120px beneath the sentence. Index at 1440: max 400 wide as G2 says, top aligned to the
   numeral's cap line. At 390 the entry order is figure line, drawing, did-line, label; the proof puts
   the drawing after the label, so the reader who will not read meets a paragraph before the picture.
7. **The circle.** The home's proportions, measured from the live DOM at 1440: width relative to the
   figure's width, height relative to the cap height, the overshoot at the left. Applied at 56 on the
   doorway and 72 at the figure moment. The stroke grazes the cap line and baseline; no even clearance.
8. **The index rhythm.** The anonymous clients' long context line (`An award-winning author and
   leadership consultant who teaches government bodies and corporations`) is three lines of mono
   above the numeral at both widths, and it is the heaviest thing in the entry. Set it as the study
   band sets the same string: Hanken 14, `--color-foyer-ink-soft`, two lines max at 1440. Mono stays
   for the folio and the service label. A shorter string is the operator's call, not this round's.

One thing the proof cannot show, said plainly: the punch in C is cumulative and it moves. Five
drawings of five different shapes down one page, the hover taking the copper element to full
strength, and the click carrying the drawing into the band are what the operator asked for. A single
static row will never look like punch on its own. The proof's job is to settle whether the hand is
credible and the scale is right; the mock set's job is to show the page.

## 3. The /work top

- **Heading.** `THE WORK, ON THE RECORD.` at two lines at both widths, in the home's voice. Right.
- **Description.** The operator's corrected string (`Four client engagements`, `peaked at 800,000`)
  stands. One punctuation item, no word changes: the colon makes the first sentence 40 words, over
  COPY-04's 35-word line, and puts the two-sentence average at 26. A period where the colon is (`Four
  client engagements and the company I founded. $14M in revenue ...`) restores Draft 1's shape, three
  sentences averaging 17. Copy-editor item, not a design item.
- **The fold at 390.** Heading, the whole description, the hairline and the top of the still all show
  inside 844px. Audit A's finding is fixed.
- **The doorway.** One designed object with no border: hairlines, the tinted still at 320 by 400 at
  right, the still first at 390, the copper link line. Right. The circle is the fitted pill described
  in section 1; item 7 above fixes it. The did-line wraps at about 440px at 1440, narrower than
  columns 1 to 8; let it run to the column edge.
- **The first entry.** Folio, numeral at 72, line at 28, did-line, label, drawing at right: the
  four-point discipline holds and the hover frame reads (figure to copper-deep, the hairline in
  copper). The context line and the 390 order are items 8 and 6 above.
- **The RFP body.** The comparison table restyled with mono heads and the gap sentence in copper-deep
  reads well; the margin arrow beside the gap row is the right idea at the wrong weight (item 3). The
  `$3M` figure moment with its mono facts line is the device working as specified.
- **Ledger.** No retired figure, no em-dash, no `per claim`, no tenure year in any string on the four
  captures. The ORDANI entry is not in the proof, so its DRAFT marking is unchecked here.

## 4. Ruling on the known deviation

Two rows of three at every size, one viewBox, scale only: **accepted.** One row of six at 400 wide
gives 60px boxes and no room for words inside them, and at 560 on the band it is still too small. Two
rows is the drawing's natural shape once the words move inside the boxes, and it keeps the morph a
pure scale. With item 2 above, row two runs right to left; the viewBox does not change.

## 5. Verdict

**ADJUST FIRST.** One more GLM proof round on the same two pages and two widths, with items 1 to 8 of
section 2 and the period in section 3 applied, and the label strings, the heading and the description
otherwise unchanged. Opus opens the captures once against these checks:

- The six boxes have at least four distinct widths, and every label sits inside its box (measure on
  the 1440 /work capture).
- The row-one-to-row-two connector is shorter than the tallest box; no orthogonal segment anywhere in
  the drawing.
- One stroke weight page-wide: sample the circle, a box edge and the margin arrow at 1440; all three
  the same within half a pixel.
- On the RFP band at 1440 the empty dark region beneath the exhibit's sentence is 120px or less.
- The circle's box-to-figure ratios match the live home circle's within 10 percent.
- At 390 the entry order is figure line, drawing, did-line, label.
- Ledger grep on the mock's strings as in G2 section 3.7: no output.

If those pass, it is GO: GLM builds the full mock set per G2 section 7's frame list with these
adjustments folded into sections 3.2, 3.3 and 4.1 of the spec. If round four still reads as a tool
with a wobble, the fallback is the STOP remedy, taken without another code round: the operator sketches
the five diagrams on paper, they are photographed and traced into the same SVG technique. Ten minutes
of pen per drawing, and the tracing reuses everything built so far, so nothing in the proof is wasted
either way.

## 6. What the operator should hear

1. The pen stroke matches your home page circle; what gives the drawing away is that it is six
   identical empty boxes on a grid with a machine-routed return arrow, which is a wireframe in a
   nice hand.
2. That is a composition problem, not a tool problem, and the fix is a short list of numbers: words
   inside the boxes so they size to their labels, a short down arrow instead of the routed one, one
   line weight for everything, and the drawing large enough to carry the band.
3. As shown it is too quiet, and even fixed a single static row will not look like punch; the punch
   in this direction comes from five different drawings down one page, the hover, and the click that
   flies the drawing into the study, which only the full mock set can show.
4. The /work top is right: the heading, your corrected description (one colon should be a period so
   the first sentence is not 40 words), the doorway and the first entry all hold, with the circle
   needing to be thrown wider like the home's rather than fitted like a button.
5. One more GLM proof round on z.ai's quota with measured pass checks, then GO; if that round still
   reads as software, you sketch the five drawings by hand in ten minutes each and they get traced,
   and nothing built so far is thrown away.
