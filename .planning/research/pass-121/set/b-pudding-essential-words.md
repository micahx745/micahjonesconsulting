# b-pudding-essential-words

Primary URL: https://pudding.cool/2026/07/essential-words — live, 200, no fallback needed.
Captured 2026-09-16 (script timestamp 2026-09-17T04:41 UTC) via `.planning/exec/ref-capture121.mjs`.

## 1. Index shape

N/A — this is a single long-form scrollytelling article, not an index/list/grid/cards of entries.
There is no "entry" structure to break rhythm on. The nearest thing to a structural break is
between the intro fold (wordmark, scattered word field, two dek paragraphs) and the title card
("From Goat to Despite"), then into the first data section ("The Expanding World"), roughly one to
two screens down at 1440.

## 2. Featured entry

N/A — no index/entries exist on this page. If read loosely as "what is featured," it is the
alluvial/ribbon diagram: the only large graphic, distinguished by size and by staying pinned
through a stepped scroll sequence while captions change under it. There is no clickable surface —
this is a read-only editorial piece, not a navigation index.

## 3. How a study opens

At 1440, first fold, reading order: The Pudding wordmark (top center) → a loose scattered field of
gray italic real-corpus words (roughly 30+ visible, positioned individually, not a grid) → two
centered serif paragraphs stating the premise ("This page is filled with words... among the most
commonly used... in the English language") and sourcing ("a 2023 list of about 2,800 words, shown
to cover over 90% of general English use"). No image, no visible nav, no byline above the fold.

At 390, same three elements in the same order: wordmark, scattered field (compressed to roughly 3
columns), then the two paragraphs. Both widths name the subject (the word list) above the fold; the
closest thing to a "result" is the 2,800-words / 90%-coverage stat, present at both widths. Neither
width states a study-style "who benefited" result — this is an editorial dataset piece, not a case
study, so the comparison is inexact by design.

First thing below the fold at 1440: the scattered word field repeats with a fresh batch of words
(a second entrance pass, matching the `word-write` animation firing again after scroll), then a
second near-identical two-paragraph block.

## 4. The visual device standing in for photographs

No photograph appears anywhere in the capture. Three authored devices carry the eye instead, all
tied to the piece's own dataset (none reusable on another page without different word-frequency
data):

- The scattered background-word field: individual real corpus words, gray italic, positioned as a
  loose field rather than a grid; present in the raw HTML (not a canvas-only decoration).
- The alluvial/ribbon (Sankey-style) diagram, "The New List Devotes More Space to Abstract
  Concepts, and Less to the Physical World": 21 semantic-category bands between 1953 and 2023,
  each band's width sized by percentage share, each band's interior filled with its own member
  words set at large display size (e.g. "DEVELOPMENT, FUNCTIONAL..." filling the largest band).
- Inline highlighted word tags inside the scattered field: individual words get an orange
  background with a "−" or "+" prefix (dropped / added) directly beside running prose that states
  the counts ("about 600 words were −dropped, and over 1,100 were +added. The rest remained.").

## 5. Motion grammar

- **Word-write entrance** (`SPAN.word-write`): CSSTransition, 500ms, 1 iteration, DocumentTimeline
  (confirmed non-scroll-linked — duration is fixed, not tied to scroll position). Trigger: on load
  for the first batch (7 spans measured at 390, 20 spans at 1440), and again after one scroll (2
  spans at 390, 15 at 1440) — so the trigger is in-view per word batch, each instance once, never
  looping.
- **The alluvial diagram**: appears pinned/sticky through a stepped scroll sequence — the
  full-page stitched capture shows the same chart frame repeated three times with different caption
  overlays sliding in beneath it (a classic scrollytelling "sticky chart, changing caption" stepper).
  Not confirmed by the animation snippet directly (the snippet only caught the word-write spans at
  the two sampled moments), but visually unambiguous in the stitched frames.
- Signature motion: the word-write entrance (500ms, once per batch, DocumentTimeline, opacity/
  position on individual `<span>` words) is the page's one small, recurring signature. The pinned
  alluvial stepper is the larger structural motion and the page's real centerpiece, but is sprinkle
  in count (fires once per scroll step, not continuously).
- No loops observed. No cursor-follow. No hover tooltip confirmed on the chart itself — the
  auto-hover heuristic landed on a citation link (`a[href="...time.com/archive/.../new-problem-for-
  unions-the-rise-of-the-white-collar-worker/"]`), which is a text citation, not a chart element;
  the hover screenshot shows an underlined-citation, highlighted-quote paragraph rather than a
  chart interaction, so chart-specific hover/tooltip behavior is unverified from this capture.

## 6. Type scale and grid

From the computed-style snippet (2.2), not the eye:

- h1: 48px at both 1440 and 390. Body paragraph: 20px at 1440, 18px at 390.
- Ratio (display:body): 2.4:1 at 1440, 2.67:1 at 390.
- Active sizes ≥12px: 16 distinct values at 1440 (13 to 48), 13 distinct values at 390 (13 to 48).
- Face: `"Tiempos Text", Times, serif` for both h1 and the sampled body paragraph — one serif
  family carries display and body; the snippet found no separate sans/mono face on those two
  elements. By eye only (not confirmed by the snippet, which sampled just h1 + one paragraph), the
  scattered background words and the diagram's category labels/percentages look like a different,
  more condensed italic face than the serif body — flagged as an observation, not a measurement.
- Column: single-column, centered, narrow prose column at both widths (roughly 55-65ch by eye, not
  measured in ch). The alluvial diagram spans wider than the prose column, roughly half the 1440
  viewport, still centered with margin either side.
- Case: sentence-case throughout; `textTransform: none` confirmed on h1. The h1 itself is
  `"From Goat to Despite"` (an `sr-only` span) alongside a decorative SVG wordmark rendering of the
  same words for sighted users — not a generic headline, it names the piece's own first/last words.

## 7. Hand-made versus templated

Three things that could only belong to this page:

1. The scattered word field: individually positioned real corpus words, sourced to an actual
   dataset (confirmed present in raw HTML, not a stock decorative image).
2. The alluvial diagram with category bands filled by the real member words at large scale,
   labelled and sourced to a named methodology (UCREL Semantic Analysis System, cited on-page).
3. The "From Goat to Despite" title, which names the piece's own first and last list-comparison
   words rather than a generic headline template.

DESIGN_BAR never-list: none of the typical tells (cursor-follow, marquee, mono-aesthetic-
everywhere, parallax hero) observed in this capture.

Verdict: **hand-made** — a custom, data-derived editorial page, well above the tomcritchlow
plain-calibration point.

## 8. The one mechanism worth taking

"The scattered background-word field sets real corpus words in gray italic type, animating each
word into place with a single 500ms CSS transition (DocumentTimeline, non-scroll-linked, once per
batch), then tags specific words inline with a colored +/− label beside prose stating the count of
words dropped or added."

This differs from section 1's expectation. Section 1 predicted "the small-multiples panel" and "the
before/after device" as the two things to take. What the capture actually shows is not a literal
small-multiples grid — it is one alluvial diagram repeated/pinned through a scroll-stepper — and the
before/after device is this inline +/− tagged word annotation, not a separate small-multiples panel.
The transferable mechanism for micahjonesconsulting is the tagged-word annotation for change over
time (bookings 1-3 to 5-10, Guardicore's pipeline shift), not the pinned stepper.

## 9. What is budget

The Pudding has a data-journalism team, a named external dataset and methodology (UCREL Semantic
Analysis System, a published 2023 word-frequency list), and in-house data-viz engineering (a
Svelte-built site with a custom `word-write` animation component). micahjonesconsulting has none of
this: no dedicated data-viz engineer, no licensed linguistic dataset, and no scrollytelling-stepper
library in the stack (Lenis + a GSAP-quarantined TitleCard, not scrollama or a chart pinning system).

## 10. Rule collision

The pinned/stepped alluvial diagram, taken as-is, collides with the CLAUDE.md pin/parallax line (no
pinning or scroll-scrubbing beyond the one approved TitleCard) and with R15 (entrances run once — a
stepper that re-triggers captions across a pinned chart as the visitor scrolls is exactly the
"scroll-scrubbed reveal" family marked CONDITION/REJECT at section 3 item 7 of FABLE-121-G1).

The word-write per-span entrance (500ms, once per batch, DocumentTimeline, non-scroll-linked) does
**not** collide — it is a single, non-looping, non-scroll-linked entrance, compatible with the
once-only in-view reveal already permitted under item 7's TAKE branch.

## 11. Capture facts

- URL captured (final, after redirect): `https://pudding.cool/2026/07/essential-words/` (primary;
  live; fallback not needed).
- Date: 2026-09-16 (script timestamp 2026-09-17T04:41 UTC).
- Viewport: 390x844 and 1440x900, device scale factor 2 (fold shots) / 1 (stitched full-page).
- Page height: 35,954px at 390; 34,432px at 1440.
- Consent banner: none appeared (`"consent": "none"` in both viewport records); nothing to
  decline.
- Entry text in initial HTML: confirmed. `grep -c "This page is filled with words"` on the raw
  fetch returns 1 (905,291 bytes). The h1 (`<h1 class="story-title">`) contains an `sr-only` span
  reading "From Goat to Despite" plus a decorative SVG title-art `<svg>` for sighted users. The
  alluvial diagram's category label text ("General & Abstract") is present in the raw HTML without
  entity-encoding, indicating the diagram's labels are server-rendered SVG, not canvas-only.
- Fallback used: no.

## Snippet outputs (from the capture JSON, 1440 viewport)

**Animations, after load** (first 3 of 20 entries; all 20 share the same shape):
```json
[
  {"el":"SPAN.word-write svelte-1vdugue","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"},
  {"el":"SPAN.word-write svelte-1vdugue","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"},
  {"el":"SPAN.word-write svelte-1vdugue","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"}
]
```
(20 entries total after load, 15 after scroll — all identical shape: 500ms, 1 iteration,
`DocumentTimeline`, `SPAN.word-write`.)

**Type, computed styles:**
```json
{
  "fontSizes": [48,36,32,28,23.1,22,21,20,18.9,18,17.6,16,15,14,13.65,13],
  "h1": {"fontFamily":"\"Tiempos Text\", Times, serif","fontSize":"48px","textTransform":"none"},
  "paragraph": {"fontFamily":"\"Tiempos Text\", Times, serif","fontSize":"20px","textTransform":"none"}
}
```

---

**Mechanism to take (q8):** the inline +/− tagged word annotation — real words tagged with a
colored, prefixed label beside prose stating the count of change — as the device for change over
time, not a literal small-multiples panel.

**Rule it touches (q10):** none for the tagged-word annotation itself; the pinned alluvial stepper
(if taken instead) would touch the CLAUDE.md pin/parallax line and R15 (entrances run once).
