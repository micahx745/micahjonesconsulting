# b-pudding-similes

URL captured: https://pudding.cool/2026/05/similes/ (final URL after trailing-slash redirect)
Fallback used: no (primary live, 200, same domain)
Date: 2026-09-16 (site content published 2026-05, per URL)

## 1. Index shape

n/a — single-scroll narrative essay, not an index of entries. The closest analog is the
small-multiples grid further down the page: 84 identical mini bar-charts, one per adjective, every
entry the same shape and size (image `_raw`/crop confirms uniform card: label line, axis, bars,
top-noun caption). The first rhythm break in the page is the swipeable quote-card carousel (three
ornate picture-frame cards, one browsable at a time) that appears about 2 screens down, before any
chart. The small-multiples grid itself starts around screen 5-6 and has no internal break; every
tile is identical.

## 2. Featured entry

n/a — no single item is featured among equals; this is a linear essay, not a collection. The
closest equivalent to a "featured" element is the interactive pick-a-word quiz just below the
hero illustration: a styled dropdown/input plus a gold "Submit" button, the first clickable
surface on the page. It sits below the h1 and subhead, below the book illustration, above the
"Above are real results..." paragraph.

## 3. How a study opens

At 1440, first fold, in reading order: The Pudding wordmark (hand-lettered logo), h1
("Comparisons" / "as Predictable as" / "the Sunrise" — the middle and third lines individually
color-underlined, teal and purple), the subhead ("An analysis of 200,000 similes from popular
fiction."), the byline (two credited people, writer and illustrator, each linked), and the top of
a hand-drawn open-book illustration beginning at the bottom edge of the fold. At 390 the same
five elements stack in the same order and all fit inside the fold with the book illustration
fully visible (see `-390-fold.png`).

Does it name the subject and result above the fold at both widths: it names the subject
("similes") and a scope figure ("200,000 similes") but not a result/finding — no "so what" claim
sits above the fold at either width. That is a headline-plus-scope, not an answer.

First thing below the fold: at 1440 and 390 alike, the rest of the open-book illustration
finishes, then the pick-a-word quiz widget.

## 4. The visual device standing in for photographs

No photographs anywhere in the captured page. The devices carrying the eye: (a) hand-drawn line
illustrations specific to each essay beat (the open book, Shakespeare stacking blocks reading
"To Be Or Not To Be," a paper-scattering vignette bridging into the dark section); (b) the
color-coded, underlined example sentence acting as a linguistic diagram; (c) the swipeable
ornate-frame quote cards; (d) the bar chart and the 84-tile small-multiples grid. All four are
authored to this specific content — the illustrations depict this essay's own beats and the
charts plot this essay's own corpus; none is a generic stock device.

## 5. Motion grammar

`document.getAnimations()` returned an empty array after load and after one scroll, at both
390 and 1440 (see capture JSON). The fold and fold-early screenshots at 1440 are visually
near-identical, so no obvious hero entrance animation survives to the ~4.5s mark or is missing
from the ~250ms mark — either there is none, or it is a fast (sub-250ms) fade that both captures
already show settled. No persistent, looping, or scroll-linked (WAAPI) animation was measured at
either viewport. The one interaction implied by the page itself is the quote carousel's "Swipe to
see examples" caption, a drag/swipe-triggered slide — not exercised by this capture (trigger is
touch/drag, not hover or load, so it falls outside the rubric's hover-only automation). No
signature motion is measurable from this protocol; the page reads as reveal-light and
interaction-triggered rather than scroll-driven or looping. Nothing pins or hijacks scroll: the
full stitched 1440 and 390 images show ordinary top-to-bottom stacking with no repeated frozen
frame beyond the normal sticky masthead pattern this tool already discounts.

## 6. Type scale and grid

From the computed-style snippet (pasted below):

- 1440: sizes [56, 44.8, 32, 28, 24, 20, 16, 14, 12.8, 12] px — 10 active sizes ≥12px. Display
  (h1) 56px, `"Tiempos Text", "Iowan Old Style", "Times New Roman", Times, serif`. Body
  (paragraph) 20px, `"Atlas Grotesk", -apple-system, BlinkMacSystemFont, Helvetica, Arial,
  sans-serif`. Ratio display:body ≈ 2.8:1.
- 390: sizes [36, 28.8, 24, 20, 18, 16, 14.4, 14, 12.8, 12] px — 10 active sizes. Display 36px,
  same serif face. Body 18px, same sans face. Ratio ≈ 2:1.
- Column width: not read from computed `ch`; measured from the screenshot instead — the body
  paragraph column spans roughly 546 CSS px at 1440 (a serif body face at 20px), which is
  approximately 55-60ch. Single column throughout the prose; the only multi-column layout is the
  small-multiples chart grid (7-8 tiles across at 1440, collapsing to 2 at 390), which is a data
  grid, not a text column.
- Display case: sentence case, not uppercase (`"Comparisons as Predictable as the Sunrise"`).

## 7. Hand-made versus templated

Three things that could only belong to this piece: (1) the hand-illustrated vignettes tied to
specific essay beats (the open book at the top, Shakespeare stacking cliche-word blocks, a
paper-scatter transition into the dark section) — content-specific line art, not a stock icon
set; (2) the tenor/ground/vehicle color-coded example sentence with its matching legend, a
bespoke linguistic diagram invented for this analysis; (3) the antique ornate picture-frame CSS
border wrapping the swipeable quote cards, a period motif matching the "old book" framing device
used nowhere else on the web. No DESIGN_BAR never-list item was observed in this capture (no
cursor follower, no marquee, no mono-only aesthetic, no scroll-jack). Verdict: hand-made.

## 8. The one mechanism worth taking

The intro explainer sets three roles of one example sentence — "My **mouth** has gone as **dry**
as **sawdust**." — as three color-coded, underlined inline spans (gold/teal/purple), directly
below a matching Tenor/Ground/Vehicle legend in the same three colors, so the sentence becomes a
self-labeling diagram before any chart appears. In the requested form: "Text sets matching
colored underlines on three phrase roles beside a same-colored legend, in the normal document
flow, at load (no scroll trigger, no pin)." This confirms section 1's expectation exactly — the
mechanism is text-as-figure, and it flows rather than pins.

## 9. What is budget

A named two-person byline (writer plus a dedicated illustrator credited separately), a
200,000-similes NLP corpus mined across popular fiction as the piece's entire evidentiary base, a
data-journalism outlet's production backing (The Pudding), a full set of bespoke hand
illustrations tied to specific narrative beats, and a custom-built charting system producing 84
unique small-multiple mini bar charts plus an interactive pick-a-word quiz. All of this is well
beyond a solo consultancy's asset or team budget.

## 10. Rule collision

None. As captured, the mechanism is static (colored text in normal flow, no animation measured)
and touches no DESIGN_BAR R-number, no CLAUDE.md pin/parallax/cursor line, and no animated-figure
line. If a future direction added a draw-in or reveal to the colored spans themselves, it would
then collide with R15 (entrances run once) and the animated-figure line — but nothing in this
capture does that.

## 11. Capture facts

- URL captured (final, after redirect): `https://pudding.cool/2026/05/similes/`
- Date: 2026-09-16
- Viewports: 390x844 and 1440x900, dsf 2 for fold shots, dsf 1 for full-page stitches
- Page height: 23028px at 1440, 26205px at 390
- Consent banner: none encountered, no blocker
- Entry text in initial HTML: the h1 IS present in the raw fetch —
  `<h1><span>Comparisons</span><small><br>as <span>Predictable</span> as<br> <span>the
  Sunrise</span></small></h1>` — and the intro paragraph ("Similes are all around us. But, if you
  haven't considered this figure of speech since grade school...") is present verbatim. The
  dynamic example sentence ("My mouth has gone as dry as sawdust") is NOT present in the raw
  fetched HTML — it is client-rendered after SvelteKit hydration (`svelte`, `__sveltekit` markers
  found in raw HTML). So this page is partially server-rendered: headline and prose paragraphs
  are in the initial payload; the data-driven figures and charts are client-only.
- Fallback used: no

### Snippet outputs (pasted from capture JSON)

Animations, 1440, after load and after scroll:
```
[]
```
Animations, 390, after load and after scroll:
```
[]
```

Type, 1440:
```
[56, 44.8, 32, 28, 24, 20, 16, 14, 12.8, 12]
h1: {"fontFamily":"\"Tiempos Text\", \"Iowan Old Style\", \"Times New Roman\", Times, serif","fontSize":"56px","textTransform":"none"}
paragraph: {"fontFamily":"\"Atlas Grotesk\", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif","fontSize":"20px","textTransform":"none"}
```

Type, 390:
```
[36, 28.8, 24, 20, 18, 16, 14.4, 14, 12.8, 12]
h1: {"fontFamily":"\"Tiempos Text\", \"Iowan Old Style\", \"Times New Roman\", Times, serif","fontSize":"36px","textTransform":"none"}
paragraph: {"fontFamily":"\"Atlas Grotesk\", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif","fontSize":"18px","textTransform":"none"}
```

---

**Mechanism to take (q8):** matching colored underlines on the three roles of one example
sentence (tenor/ground/vehicle), beside a same-colored legend, in normal document flow at load —
transfers directly to the RFP "one requirement, start to finish" block and the ORDANI claims
comparison, both of which need a short labeled phrase turned into a self-explaining figure without
a chart.

**Rule it touches (q10):** none, as captured (static, no animation measured).
