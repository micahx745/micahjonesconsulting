# a-bakkenbaeck-work

URL captured: https://bakkenbaeck.com/work (primary, live, no fallback needed).

## 1. Index shape

A single flat-scrolling list, not a grid, not cards, not one-at-a-time. Every entry is: a small
client-name label above, then a full-bleed row of equal-width image/video crops (a filmstrip), a
hairline gap, next entry. At 1440 the first fold shows the H1 plus the top of entry 1 (Sierra,
three crops) only; no second entry is visible in the first screen. At 390 the first fold shows
the H1 and the very top of entry 1's carousel.

Data points per entry: 2, the client name (text) and the crop count (3 or 4 images/videos). No
role, year, service line, or outcome line anywhere on the index.

Rhythm break: yes, but it is a crop-count break, not a shape or size break. Most entries (14 of
19: Sierra, Wysp, Legora, Deepmind, IKEA Voice, IKEA Studio, Ramp, Lassie, World Labs, Phantom,
CoinTracker, Sanity, Pio, Carbon Banks) run 3 equal crops per row. Five entries (Parallel,
Photoncycle, Carbo Culture, På(fyll), Starline) run 4 equal crops per row, a visibly taller,
denser row. Confirmed by counting `<img>`/`<video>` tags per row in the raw HTML (Parallel: 4
img; Sanity, Pio, Carbon Banks: 3 img each) and by direct pixel inspection of the stitched
full-page PNG.

First break, in screens from top: about 1.5 screens. Entry 2 (Parallel) is already the 4-crop
variant; the break comes almost immediately, not late in the page. (Row heights run roughly
550 to 700px each at a 900px-tall 1440 viewport; the H1 block plus Sierra's row already consumes
most of screen 1.)

At 390 this rhythm collapses: every entry, 3-crop or 4-crop on desktop alike, renders as the
same shape: one large center crop with peeking left and right neighbor edges and a pause button
(an autoplay-video carousel), client name label above. The crop-count variance that reads at
1440 is invisible at 390; mobile is uniform.

## 2. Featured entry

None. Sierra is simply first in document order; it gets no different size, position, color, or
motion treatment than any other 3-crop entry. The whole entry (the label plus the full crop row)
is the clickable surface, confirmed by the raw HTML: `<a href="/case/sierra">` wraps the label,
and the hover interaction (see 5) fires across the full row, not a sub-element.

## 3. How a study opens

n/a. This capture is the index only (`/work`); no `/case/*` study route was captured under this
task's scope.

## 4. The visual device standing in for photographs

n/a in the sense the question intends: nothing stands in for missing photography here, because
there is no missing photography. Every one of the 19 entries is 3 to 4 real crops: product
photos, device-in-hand photos, and UI or product screenshots drawn straight from each client
engagement. The crops themselves are the exhibit; no diagram, quote, or color field substitutes
for an image anywhere on this page.

## 5. Motion grammar

- Entrance (measured, both viewports). `document.getAnimations()` after scrolling one screen
  returns three `CSSTransition` entries per crop group: `opacity-100`, `duration-500`,
  `delay-[600ms]` (and one at `delay-[800ms]` at 1440), a 500ms opacity fade-in, staggered by
  100 to 200ms per crop, `timeline: DocumentTimeline` (not scroll-linked), firing once per row
  as it enters view. `afterLoad` is empty; nothing animates until the row is scrolled to. This
  is an in-view reveal, not a scroll-scrubbed one; it does not reverse on scroll-up (not
  re-tested this session, but the timeline type rules out a reversible scroll binding).
- Hover (observed, not snippet-measured). Hovering an entry (`a[href="/case/sierra"]`) reveals a
  small pill-tag row top-right of the row (service tags, "Brand", "Web", "Product", each a
  colored pill), and the crops that contain a video or prototype show more of their content (a
  phone screen gains a second overlay line, "Home_Network_5GHz Connecting..." appears): reads as
  the hover un-pausing or advancing an autoplaying clip inside that crop, not a discrete hover
  transform. Exact duration and easing were not captured; the protocol's snippet runs after load
  or scroll, not on hover trigger, so this is reported as observed, not measured.
- Mobile carousel. The center crop in each entry is an autoplaying video with a visible pause
  button, confirmed at both first-fold and mid-page crops at 390. This is the page's second
  motion source, present at 390 only in this capture's evidence (not confirmed absent at 1440;
  1440 renders as a static grid within the fold captures taken).
- Signature motion: the staggered opacity fade-in on scroll-into-view (500ms, roughly 100 to
  200ms stagger, opacity only). Sprinkle: the hover tag-reveal, the autoplay-video crops.

## 6. Type scale and grid

From the capture JSON's computed-style snippet:
- 1440: sizes present 12px and up: `[50, 16, 14, 12]`. Largest (h1) 50px, body/label 14px.
  Ratio 50/14 is about 3.6. Four active sizes.
- 390: sizes present 12px and up: `[28, 16, 14, 12]`. Largest (h1) 28px, body/label 14px. Ratio
  2.0. Four active sizes.
- Face: `bbSans, "bbSans Fallback"` on both h1 and paragraph, one custom typeface, no serif or
  mono pairing, distinguished only by size and weight.
- Display case: sentence-case ("Our work. An overview of recent case studies...").
- Grid: underlying `grid grid-cols-12` (confirmed in raw HTML) driving a 3-crop or 4-crop
  equal-width row per entry at 1440, full-bleed (no side gutter beyond a 16px page margin). No
  body-copy column exists on this page (no paragraphs beyond the H1 and the one-word client
  labels), so a column-width-in-ch figure does not apply here.
- At 390: the 12-col grid collapses to the one-crop-wide autoplay carousel described in 1 and 5;
  effectively single-column with horizontal peek, not a stacked grid.

## 7. Hand-made versus templated

Three things that could only belong to this site:
1. `bbSans`, a named custom typeface, not a Google or system font.
2. The variable crop-count row (3 vs 4 real, client-specific images and videos per entry, unique
   per case); this cannot be templated without real per-client media libraries (each entry's raw
   HTML references 10 or more responsive source variants per image).
3. The hover-triggered service-tag reveal plus in-crop micro-animation (the phone screen
   advancing a conversation); content-specific interaction, not a generic card hover.

Nothing from the DESIGN_BAR never-list was identified on this page: no cursor-follow, no
scroll-jacking, no marquee, no mono-everything aesthetic.

Verdict: hand-made. Not templated, not plain: dense, real-asset craft carried mostly by budget
(19 real client engagements with full media libraries) rather than by structural invention; the
structure itself (label plus N-crop filmstrip, repeated) is simple.

## 8. The one mechanism worth taking

Variance in entry crop-count (3 vs 4 equal-width images per row) as the index's only rhythm
break, achieved with zero new UI chrome, just more or fewer crops in the same row shape,
appearing as early as entry 2.

This differs from section 1's expectation in one respect: section 1 implied a distributed
variance ("whether card sizes or shapes vary down the page or repeat"); the capture shows the
variance is real but binary (3 or 4, never more, never a genuinely different shape) and clusters
early (entry 2) and late (entries 17 to 19), with a long uniform 3-crop stretch (entries 3 to 12,
excluding 13) in between. It also does not survive to 390; the mechanism is 1440-only, and mobile
normalizes every entry to the same one-large-crop carousel shape. For micahjonesconsulting.com
the transferable idea is not the crop grid itself (this site has two photographs total, not
budget for 3 to 4 real crops per entry) but the underlying principle: a rhythm break can be
achieved by varying how many of an existing repeated element appear, not by introducing a new
element type.

## 9. What is budget

19 named client engagements each with a full photo, video and UI-screenshot library (10 or more
responsive source variants per image in the raw HTML), a named in-house typeface, an apparent
Sanity-backed CMS media pipeline, and enough real production screenshots per case to fill 3 to 4
crops without ever repeating a placeholder. micahjonesconsulting.com has two photographs and
five case studies total; this scale of real-asset variety is not available to it.

## 10. Rule collision

None directly. The crop-count-variance mechanism (question 8) is a layout-density device applied
to images, not to data points or copy, so it does not touch R11 (the four-data-point cap) or R2
(display-size rule). The entrance fade (question 5) is a once-only, non-reversing, opacity-only
in-view reveal on `DocumentTimeline`; it lands inside the CONDITION already granted at
FABLE-121-G1 section 3 item 7 (once-only in-view reveals, two per page, motion-engineer
approval), not a new collision. Nothing here touches R9, R12, R15, the pin/parallax/cursor line,
the animated-figure line, or the GSAP quarantine.

## 11. Capture facts

- URL captured (final, after redirects): `https://bakkenbaeck.com/work` at both viewports, no
  redirect.
- Date: 2026-09-16 (capturedAt 2026-09-17T04:41:25Z UTC in the capture JSON).
- Viewport and status: 390x844 returned HTTP 304 (conditional revalidation on the tool's second
  request); 1440x900 returned HTTP 304. The separate plain `fetch` used for the raw HTML
  returned HTTP 200, 317,893 bytes.
- Page height: 1440 is 10,914px. 390 is 7,482px.
- Consent banner: none present, nothing to decline. Confirmed by both the capture JSON's
  `"consent": "none"` and a grep of the raw HTML for cookie, consent and GDPR strings: zero
  matches.
- Entry text in initial HTML: confirmed. `grep -c "Sierra"` on the raw HTML returns a match
  inside server-rendered markup: `href="/case/sierra"><p class="font-body-md text-grey-900">
  Sierra</p>`. The first entry's name is server-rendered, not client-fetched.
- Fallback used: no (none exists for this slug; primary was live).

### Snippet outputs (from `a-bakkenbaeck-work-capture.json`)

Animations, 1440, after one scroll:
```
[
  {"el":"DIV.absolute inset-0 size-full duration-500 delay-[600ms] opacity-100","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"},
  {"el":"DIV.absolute inset-0 size-full duration-500 delay-[800ms] opacity-100","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"},
  {"el":"DIV.absolute inset-0 size-full duration-500 delay-[600ms] opacity-100","dur":500,"iter":1,"name":"CSSTransition","timeline":"DocumentTimeline"}
]
```

Type, 1440: font sizes `[50, 16, 14, 12]`; h1 `bbSans, "bbSans Fallback"` 50px sentence-case;
paragraph `bbSans, "bbSans Fallback"` 14px.

---

Mechanism to take (q8): vary the crop or element count of an otherwise identical repeated row
(3 vs 4 images) to create an index rhythm break, rather than introducing a new element type or
size.

Rule it touches (q10): none. It is a layout-density device on images, outside R2, R11 and R15
and every named motion ban; the page's own entrance fade already sits inside the once-only
in-view reveal condition granted at G1 section 3 item 7.
