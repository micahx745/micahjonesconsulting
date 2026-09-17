# a-locomotive-work

Primary URL: https://locomotive.ca/en/work
Fallback: none (pool, verified live)
Class: A (studio work indexes with real motion and interaction craft)

## 1. Index shape

A plain three-column text table, not cards and not a grid. At 1440 the columns are: company
name, industry/category, location (`a-locomotive-work-1440-fold.png`). At 390 the columns
collapse to: name (bold) and category (grey) stacked on the left, a static thumbnail photograph
on the right, and a `(+)` mark (`a-locomotive-work-390-fold.png`).

Entries visible in the first fold: about 8 rows at 1440 (Truck'n Roll through Structured), 3
rows at 390 (Truck'n Roll, Wolverine Worldwide, Zero.fun).

Data points per entry: 3 at 1440 (name, category, location); 3 at 390 (name, category, thumbnail
image, plus the `(+)` mark as a 4th, non-textual affordance).

Rhythm break: none. Every one of the roughly 45 entries (the intro's superscript `45`) is the
same shape and size all the way to the footer (`a-locomotive-work-1440.png`,
`a-locomotive-work-390.png`, both stitched full pages). No full-bleed break, no featured-size
entry, no quiet section. It is a table for its entire length.

## 2. Featured entry

None. Every row is visually identical. Nothing is larger, positioned differently, colour-marked,
or motion-marked at rest. The clickable surface is the whole row (an `<a class="c-button -full">`
wraps the row's children, confirmed in the live DOM: `href="/en/work/dulcedo"` etc). There is no
distinguished "start here" entry relative to the page heading.

## 3. How a study opens

Not captured (out of scope for this reference per section 1: "do not take" the filterable grid;
the brief asks for the index only). n/a — no case-study page opened.

## 4. The visual device standing in for photographs

On the index row itself, nothing at rest. On hover (1440) or by default (390), a project
photograph. At 1440 the photograph only exists as a hover payoff, positioned over the category/
location columns at the hovered row (`a-locomotive-work-1440-hover.png`, hovering "Dulcedo"). At
390 the same photograph is always visible, inline, one per row (`a-locomotive-work-390-fold.png`
shows a truck at night for Truck'n Roll, a tent for Wolverine Worldwide, a black card with a
wordmark for Zero.fun). It is authored per entry (a real client photograph, not a generic device)
but the CONTAINER (a 3-column type table) is fully generic and reused identically for every entry.

## 5. Motion grammar

Measured via the section 2.2 snippet, `document.getAnimations()`, at load and after one scroll,
at both viewports: empty array in all four calls (see pasted output below). A second snippet call
taken 60ms into a hover and again after the hover settled (900ms) was also empty. This site's
hover effect is not built on CSS Animations or the Web Animations API at all — it is timer- or
rAF-driven, which is itself a finding: `document.getAnimations()` will not see it.

From direct observation (Claude Browser pane, manual hover, not the eye alone — screenshots at
~60ms and ~900ms into the hover):
- **Trigger:** hover (desktop only; the mobile equivalent is "always on", no motion).
- **What moves:** (1) the row's text in the two right-hand columns briefly scrambles to
  randomized characters before resolving back to the real word ("Dulcedo" -> garbled -> "Dulcedo",
  "Talent management" -> garbled -> "Talent management"); (2) the location cell's text is replaced
  by a static `(+)` glyph for the duration of the hover; (3) a project photograph fades/slides in,
  floating over the category/location columns, roughly vertically centered on the hovered row.
- **Duration bucket:** under 1s, visually settled by ~900ms; likely in the 400-1000ms bucket, but
  this is an eye estimate flagged as such — the snippet (the rubric's required source of truth for
  duration) returned nothing to cite.
- **Property:** opacity/content for the image; character content (text) for the scramble, not a
  transform in the WAAPI sense.
- **Once or loop:** once per hover-in; reverses back to plain text and no image on hover-out
  (not confirmed by snippet, inferred from the un-hovered 1440-fold screenshot).
- **Pin/scroll-hijack:** none observed. The full stitched page (`a-locomotive-work-1440.png`,
  `-390.png`) shows plain, unpinned stacking; `afterScroll` animations are also empty.
- **Signature motion:** the hover text-scramble + image reveal on index rows is the page's one
  real interaction; everything else (the entrance loader, the plain list) is static or a generic
  fade.
- **Entrance:** `a-locomotive-work-1440-fold-early.png` shows a full black loading screen with a
  centered grey wordmark and glyph mark — a branded loader gate before the page reveals, not an
  in-view content reveal.

## 6. Type scale and grid

From the required snippet (pasted below):
- 1440: sizes `[115.2, 70, 26, 15, 13]`. Largest (115.2px) belongs to the footer address block
  (a large serif/slab display treatment of the studio's street address with custom inline glyph
  icons — not the page's h1). The probed `h1` (the intro sentence describing what the studio
  does) is 26px, `HelveticaNowDisplay`, sentence-case, `text-transform: none`. Body paragraph
  15px, same face. Ratio largest:body = 115.2/15 ~ 7.7. Active sizes >=12px: 5.
- 390: sizes `[46.8, 35.685, 31.2, 18, 15, 9]`. h1 18px, paragraph 15px, same face. Active sizes
  >=12px: 5 (46.8, 35.685, 31.2, 18, 15).
- Face: a single custom face, `HelveticaNowDisplay` (with system fallbacks), reported for both
  the probed h1 and paragraph elements. No second face (serif/mono) turned up in that probe; the
  footer address visually reads as a heavier/display cut of the same family, not confirmed by a
  separate computed-style read.
- Grid: not a prose column. At 1440 it is a 3-column table (name / category / location) spanning
  roughly the page's full measure; at 390 it collapses to a single stacked column (name, category,
  thumbnail, `(+)`), one row per entry, no reflow surprises.
- Case: sentence-case throughout (the h1 sentence, entry names in title case). No uppercase
  kicker or uppercase display anywhere on this page.

## 7. Hand-made versus templated

Three things that could only belong to this site:
1. The footer address block: street address, phone, and email set as an oversized display
   typographic composition with small hand-placed inline glyph icons (a diamond/compass mark, a
   directional arrow, a clock face) substituting for parts of the text — visible at the bottom of
   `a-locomotive-work-1440.png` and `-390.png`.
2. The hover text-scramble on index rows (section 5) — a bespoke interaction, not a stock hover
   underline or lift.
3. The `data-hover-shuffle="children"` attribute pattern confirmed live in the DOM (via the
   Claude Browser pane), naming the mechanism as the studio's own authored behavior, not a theme
   default.

DESIGN_BAR section 4 never-list: none of the named tells (cursor-follow, mono-aesthetic terminal
look, marquee, scroll-jacking) are present on this page.

Verdict: **hand-made.** Plain in its base layout (a text table) but the two moves above are
specific to this studio and would not transfer to another agency's site unmodified.

## 8. The one mechanism worth taking

A plain, generic 3-column text row reveals an authored project photograph on hover, floating
beside the row rather than replacing it, while the row's neighboring text runs a brief character-
scramble before resolving — giving an otherwise flat text table one authored image payoff per
entry without turning it into a card grid.

This differs from what section 1 expected. Section 1's brief anticipated "the inline award or
outcome line as ONE mono line inside the entry" as the mechanism to take. That line does not
exist anywhere in the rendered index at either viewport. Raw-HTML evidence does contain per-entry
award counts as plain text (`2 awards`, `4 awards`, `3 awards` — confirmed 10+ times by grep on
`_raw/a-locomotive-work.html`), but this text is not visible in any captured screenshot at either
viewport, at rest or on hover, at the entries where it was checked. It appears to belong to
markup not surfaced in this view (possibly a different route's data embedded in the same
document, or an expansion state this capture did not trigger). The award/outcome-line half of
section 1's expectation is REJECTED as not verifiable from what actually renders; the hover-
grammar half is TAKEN, and is the real mechanism above.

## 9. What is budget

A 45-entry client roster spanning finance, automotive, hospitality, education, municipal, and
consumer clients across multiple countries (Montreal, San Francisco, Zurich, Hosbach). Per-entry
photography for every single project (confirmed at 390, where the thumbnail is always rendered).
A licensed commercial type face (`HelveticaNowDisplay`). A hidden per-entry awards dataset
(question 8) the studio has but does not currently surface on this page. None of this is
available to micahjonesconsulting: five studies, not forty-five clients; two photographs
site-wide, not one per entry.

## 10. Rule collision

The hover-reveal mechanism (a fixed-position image fade-in tied to a hovered row, not tracking
the cursor pixel-by-pixel) collides with no named rule. It is a hover-triggered, non-scroll-
linked, non-cursor-following reveal — it is exactly the shape SYNTHESIS/FABLE-121-G1 section 3
item 6 ("hover and idle craft on index entries... no cursor follow") already rules TAKE, and this
reference is supporting evidence for that ruling, not a new collision.

The text-scramble half is a distinct, additional typographic motion not covered by that ruling or
by CLAUDE.md's one-signature-motion line. If taken as its own move (rather than skipped in favor
of a plain image-only hover), it would need the motion-engineer's written approval per
CLAUDE.md ("NOTHING ELSE pins, sticks, parallax-scrolls, or follows the cursor without the
motion-engineer agent's written approval") and, depending on implementation, could touch the GSAP
quarantine (one importer only, `components/color-worlds/SplitReveal.tsx`) if built with GSAP's
text utilities — it would need a plain JS/CSS implementation to stay clear of that rule.

## 11. Capture facts

- URL captured (final, after redirects): `https://locomotive.ca/en/work` at both viewports — no
  redirect occurred.
- Date: 2026-09-17 (capture timestamp `2026-09-17T04:43:22.841Z` per `a-locomotive-work-
  capture.json`).
- Viewport: 1440x900 and 390x844, device-scale-factor 2 for fold/hover shots, 1 for stitched
  full-page and early-entrance shots, per the script's fixed protocol.
- Page height: 3167px at 1440; 7067px at 390 (`a-locomotive-work-capture.json`).
- Consent banner: present ("We use cookies!", with "Accept All" / "Accept Necessary" / "Let me
  choose"). The automated script's regex (`reject|decline|only necessary|necessary only|deny`)
  did not match this site's exact button copy, so its own log records `consent: "none"` at both
  viewports — a known limit, not a dead capture. I separately opened the page in the Claude
  Browser pane and manually clicked "Accept Necessary" (declining non-essential/marketing
  cookies) before hovering, consistent with the section 2.2 protocol ("decline non-essential").
- Blocker: none beyond the consent banner.
- Entry text in initial HTML: confirmed. `grep -c 'Dulcedo' _raw/a-locomotive-work.html` -> `9`;
  `grep -o 'href="/en/work/[^"]*"' _raw/a-locomotive-work.html | sort -u | wc -l` -> `32` distinct
  project links, all present in the plain-fetch HTML (status 200, 323,903 bytes) with no
  client-only rendering required for the index text.
- h1 in raw HTML: `<h1 class="o-text -medium">` wraps the intro sentence describing what the
  studio does — confirmed server-rendered, present verbatim in the plain-fetch HTML.
- Fallback used: no. Primary is live and was captured directly.
- Hover shot correction: the automated `--hover` selector first matched the nav's own "Work"
  link (`a[href*='work']`), producing a useless hover shot; a second attempt at
  `a[href*='dulcedo']` and a third at `main a[href*='/en/work/']` both found the element in the
  DOM (`page.$` returned truthy) but its `getBoundingClientRect()` reported a zero-size box at
  (0,0), so no real screenshot resulted (the script correctly recorded `screenshot: false`
  rather than a false positive). I wrote a small standalone puppeteer script
  (`locomotive-hover.mjs`, in the session scratchpad) using the same Chrome binary and
  launch flags as the capture tool, and instead of relying on `getBoundingClientRect` on that
  selector, moved the mouse to the fixed pixel position where "Dulcedo" sits in the first fold
  after accepting cookies (verified visually first in the Claude Browser pane, then reproduced at
  1440x900 dsf2 in puppeteer). That produced the correct hover screenshot now saved at
  `a-locomotive-work-1440-hover.png`, and along the way confirmed `document.getAnimations()` is
  empty even mid-hover (pasted below).

### Snippet output - animations (after load / after scroll), both viewports

```
1440 afterLoad:   []
1440 afterScroll: []
390  afterLoad:   []
390  afterScroll: []
(also empty 60ms into a hover and 900ms into a hover, checked manually)
```

### Snippet output - type sizes

```
1440: [115.2, 70, 26, 15, 13]
  h1: { fontFamily: "HelveticaNowDisplay, -apple-system, ... sans-serif", fontSize: "26px", textTransform: "none" }
  paragraph: { fontFamily: "HelveticaNowDisplay, -apple-system, ... sans-serif", fontSize: "15px", textTransform: "none" }
390: [46.8, 35.685, 31.2, 18, 15, 9]
  h1: { fontFamily: "HelveticaNowDisplay, -apple-system, ... sans-serif", fontSize: "18px", textTransform: "none" }
  paragraph: { fontFamily: "HelveticaNowDisplay, -apple-system, ... sans-serif", fontSize: "15px", textTransform: "none" }
```

---

**Mechanism to take (q8):** a fixed-position, hover-triggered project photograph reveal on an
otherwise plain text-table index row, with a brief text-scramble on the neighboring cell before
it resolves — not the inline award/outcome line section 1 expected, which this capture found no
visible evidence of.

**Rule it touches (q10):** none for the image-hover half (it supports take-list item 6 as
written); the text-scramble half would need motion-engineer approval and a plain JS/CSS
implementation if taken as a separate move.
