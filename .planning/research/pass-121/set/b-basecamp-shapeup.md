# b-basecamp-shapeup

Primary URL captured live. Status 200 at both viewports, final URL unchanged (no redirect). Fallback (joshwcomeau.com flexbox guide) not needed.

## 1. Index shape

n/a - long-form chapter, not an index. This is a single reading page (a book chapter), not a list of entries. There is a left-rail table of contents (8 section links plus "Next:") but it is chapter navigation, not an index of separate items, so the "entries visible in first fold" / "rhythm break" questions do not apply.

## 2. Featured entry

n/a - no entries on this page type. The nearest analog is the chapter itself inside the book's TOC (not captured here), which is out of scope for this capture.

## 3. How a study opens

Reading order in the 1440 fold (see `b-basecamp-shapeup-1440-fold.png`): dark pill nav button ("Shape Up" + hamburger icon, top left) -> small tracked-uppercase kicker "CHAPTER 4:" -> serif h1 "Find the Elements" -> left-rail list of 7 section links + "Next: Risks and Rabbit Holes" -> at right, a large two-panel hand-drawn cartoon (two stick figures at a whiteboard, speech bubbles "A-HA!" / "YES! AND THEN...") -> below the fold line, the intro paragraph begins.

At 390 (`b-basecamp-shapeup-390-fold.png`): same elements, stacked - nav pill, kicker, h1, the cartoon (scaled to full column width, TOC list not visible in this fold, presumably below), then the intro paragraph starts and is visible through "Move at the right speed" h2 by the bottom of the fold.

It does **not** name a subject-plus-result above the fold at either width - this is a book chapter, so what's named is the topic ("Find the Elements") and its place in the argument (chapter 4 of a sequence), not a client/result pair. There is no comparable "answer-shaped lede."

First thing below the fold at 1440: continuation of the intro paragraph into the "Move at the right speed" section body text. At 390: the same section's opening line, naming two factors behind pacing at this stage of the process.

## 4. The visual device standing in for photographs

Hand-drawn, black-line cartoon diagrams carry every screen that has no photograph (there are no photographs anywhere on this page - 13 images total, all line drawings). Two registers appear in this chapter: (a) narrative cartoons of people at a whiteboard (scene-setting, used once per chapter), and (b) "breadboard" diagrams - abstract UI wireframes with hand-lettered element names and arrows (e.g. "Invoice" -> "Setup Autopay" -> "Confirm", "Print Receipt", "Thank You Message"), used repeatedly through the "Breadboarding" section to walk a single example step by step. Both are authored specifically to this content - the breadboard names are the book's own running example and could not be reused on another page. No caption element wraps any image (no `<figure>`/`<figcaption>` in the raw HTML); the meaning is carried by labels drawn inside the image itself plus descriptive `alt` text.

## 5. Motion grammar

None detected. `document.getAnimations()` returned an empty array after load and again after a one-screen scroll, at both 1440 and 390 (see snippet output below). No load animation, no hover state was found for a link/nav probe, no scroll-linked behavior. The page is entirely static - the hand-drawn diagrams do not draw themselves in, they are just images. Signature motion: **none**. Sprinkle: none.

## 6. Type scale and grid

From the computed-style snippet (pasted below):

- 1440: sizes present (px, desc) 43.92, 24, 21.96, 18.666, 16.47, 14.274 - 6 active sizes, all >=12px. Display (h1) 43.92px, body paragraph 24px. Ratio display:body = 1.83.
- 390: sizes present 35.9, 24, 17.95, 15.2575, 13.4625, 11.6675 - 5 of 6 active sizes >=12px (smallest, 11.6675px, falls just under). Display (h1) 35.9px, body paragraph 24px (unchanged from 1440). Ratio display:body = 1.50.
- Faces: h1 and body paragraph both `ff-meta-serif-web-pro, serif` - one licensed serif face used for both display and body, no separate sans/mono anywhere sampled.
- Body column width at 1440: measured from the fold screenshot at roughly 1114px (from the paragraph's left edge to its right edge). That is an estimate from the rendered line width, not a computed-style `ch` value (the type snippet only captures `font-size`, not layout width) - call it approximately 80-85ch for a serif face at 24px.
- Columns: at 1440 the page is a fixed left rail (nav pill, kicker, h1, TOC list) beside one reading column on the right - not a two-column body, the rail is navigation, not content. At 390 the rail collapses into the stacked flow (nav pill becomes a hamburger-triggered pill, TOC presumably reachable but not visible above the fold), single column throughout.
- Display case: sentence/title case ("Find the Elements"). The only uppercase-tracked text on the page is the small kicker "CHAPTER 4:".

## 7. Hand-made versus templated

Three things that could only belong to this site:

1. The author's recurring cartoon-diagram voice - stick figures with speech bubbles narrating a real product conversation ("A-HA!" / "YES! AND THEN...") - a specific illustrated argument style, not stock.
2. The "breadboard" diagram vocabulary invented for this book: named UI elements and arrows (Invoice, Setup Autopay, Confirm, Print Receipt) built as a teaching device across a whole section, unique to this content.
3. The pairing of a dark rounded "Shape Up" pill nav button with the licensed serif Meta Serif Pro face for both display and body - a distinct editorial identity, not a SaaS-template combination.

DESIGN_BAR section 4 never-list check: one soft/borderline hit. "CHAPTER 4:" is a tracked-uppercase kicker label (pixel reference: top-left of `b-basecamp-shapeup-1440-fold.png`, approximately x=380,y=198 in the 2000px-wide display, i.e. natural-res position near the h1's top edge). The never-list flags this as a tell when it repeats "on every section" of a marketing page; here it appears once per chapter as a running head in a book's reading interface, not stacked section-by-section, so it reads as a mild echo rather than the tell itself. No other never-list item found (no gradients, no cards, no centered hero-badge stack, no stock imagery, no AOS fade-ups - there is no motion at all).

Verdict: **hand-made**.

## 8. The one mechanism worth taking

A hand-drawn diagram sits inline in the reading column at full column width, with no caption element (meaning carried by labels drawn into the image plus `alt` text), appearing roughly once every 1-2 paragraphs during a worked example rather than capped at one per section.

This differs from what section 1 expected ("one per section at most, the same drawing voice as this site's circle"). The actual density is higher: the "Breadboarding" section alone runs 7 diagrams back to back, each advancing the same example by one step, effectively a diagram per beat of an argument rather than one per section. The transferable idea (a diagram in the author's own hand, inside the column, uncaptioned) still holds; the "at most one per section" cap in the G1 ruling for this site's exhibits should be read as this site's own restraint, not something Shape Up itself models - Shape Up would support taking more if a study needed a multi-step device (e.g. the RFP flow as a short sequence rather than one static diagram).

## 9. What is budget

Basecamp/37signals commissioned this as a paid book product: a named illustrator's hand-drawn art across 13+ images in this chapter alone (multiplied across the whole book), a licensed serif webfont pairing for both display and body, and a dedicated long-form reading interface (persistent TOC rail, "Next chapter" navigation, book-wide chrome) built for a multi-chapter product. That scale of commissioned illustration and dedicated reading-product engineering is not this site's budget.

## 10. Rule collision

None, as captured. The diagrams are static images - no animation was measured (see question 5) - so nothing here touches R15 or the animated-figure line. If a future direction added a "draw-in" reveal to mimic the hand-drawn line appearing over time, that specific addition (not what Shape Up does) would collide with R15 (entrances run once) and the animated-figure/GSAP-quarantine lines named in FABLE-121-G1 section 3, item 10.

## 11. Capture facts

- URL captured (final, after redirects): `https://basecamp.com/shapeup/1.3-chapter-04` (identical at both viewports, no redirect).
- Date: 2026-09-17.
- Viewport / page height: 1440x900 -> 13248px page height, not truncated (15 of max 15 frames used). 390x844 -> 13340px page height, **truncated: true** (12 of max 12 frames used) - the stitched `b-basecamp-shapeup-390.png` may not include the very last portion of the page (past the "No conveyor belt" section / footer).
- Consent banner: none encountered at either viewport; no blocker.
- Entry text in initial HTML: confirmed. `grep -o "Find the Elements" _raw/b-basecamp-shapeup.html` returns 3 matches, including `<h1 class="intro__title">`. Raw HTML byte length 56469, status 200.
- Fallback used: no - primary was live and used throughout.
- Hover capture: not produced. The tool's work/project/case/stud href heuristic found no matching link on this page (`"hover":{"selector":"none found","screenshot":false}` in the capture JSON), which is expected - this is a reading page with chapter-navigation links, not a work index, so there is no comparable "index entry" to hover. No manual hover was substituted since no element on the page functions as a hoverable entry; the diagrams themselves have no hover state (confirmed by the empty `afterScroll` animations array).

## Snippet outputs (from capture JSON)

**Animations, 1440** (`afterLoad` and `afterScroll`):
```
[]
[]
```

**Animations, 390** (`afterLoad` and `afterScroll`):
```
[]
[]
```

**Type sizes, 1440** (descending px):
```
[43.92, 24, 21.96, 18.666, 16.47, 14.274]
h1: { fontFamily: "ff-meta-serif-web-pro, serif", fontSize: "43.92px", textTransform: "none" }
paragraph: { fontFamily: "ff-meta-serif-web-pro, serif", fontSize: "24px", textTransform: "none" }
```

**Type sizes, 390** (descending px):
```
[35.9, 24, 17.95, 15.2575, 13.4625, 11.6675]
h1: { fontFamily: "ff-meta-serif-web-pro, serif", fontSize: "35.9px", textTransform: "none" }
paragraph: { fontFamily: "ff-meta-serif-web-pro, serif", fontSize: "24px", textTransform: "none" }
```

## Closing line

**Take (q8):** a hand-drawn diagram set inline at full column width, uncaptioned (meaning carried by drawn-in labels plus alt text), placed once per step of a worked example rather than capped at one per section. **Rule it touches (q10):** none as a static image; a drawn-in reveal of the line would touch R15 and the animated-figure line.
