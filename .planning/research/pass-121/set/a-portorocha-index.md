# a-portorocha-index

Primary URL https://portorocha.com, final https://www.portorocha.com/ (200, same-domain www redirect).
No dedicated /work route exists (`/work` returns 404), so per section 1's own instruction the
homepage is the capture, as intended when no separate route is present. Live, primary used, no
fallback (area17.com/work) needed.

## 1. Index shape

A left-rail list of project cards (markup class `nav__card`, each `<a class="nav__card__inner">`
wrapping an icon tile, an `<h2>` name, and a `<p>` one-line outcome) beside a separate, much larger
right-hand column of press/news items (masonry-style photo cards, dates, headlines). This is not a
single scrolling index — it is two independent panels.

Data points per project entry: 3 (client mark/icon, name, one-line outcome sentence). No fourth
field (no year, no role) on the entry itself.

Visible in the first fold at 1440: 4 full entries (FURSYS, MoMA PS1, Robinhood Market, United Flags
of Fashion) plus one partial fifth, next to the top of the press feed (a Nike photo hero and three
news cards). At 390: 5 full entries (FURSYS, MoMA PS1, Robinhood Market, United Flags of Fashion,
Nike Run) plus a sixth partial (A&D).

Rhythm break: every project entry is the identical card shape and size; there is no size/shape
variance among them in either capture. The one real rhythm break on the page is structural, not
within the list: the sidebar (compact cards) sits beside a full-bleed photography column, and that
split is present from screen 0 (the first fold already shows both). So: zero breaks inside the
list; one break in the page composition, at 0 screens from the top.

## 2. Featured entry

No entry in the project list is featured by size, position, or motion; all cards read identically.
If anything reads as "featured" on this page it is the top item in the unrelated press column (a
Nike Running photograph at page load), which is editorial content, not a case-study entry. Clickable
surface for a project card is the whole card (`nav__card__inner` is the anchor). Position relative to
the page heading: directly below the "PORTO ROCHA" wordmark and the live clock, in a boxed "About us"
card, so first entry is roughly 3 stacked elements below the h1.

## 3. How a study opens

n/a — the capture is the index page only; no case-study route was opened (out of scope for this
slug, and each project card links to its own page, e.g. `/fursys`, `/moma-ps1`).

## 4. The visual device standing in for photographs

Two different devices on one page: (a) on the project list, a small flat-color icon/logotype tile
per client (Fursys mark, MoMA PS1 wordmark, Robinhood chair icon, a star for United Flags of Fashion)
standing in for a case-study photograph — authored per client, not generic; (b) on the press column,
real editorial photography and screenshots (books, exhibition posters, portraits) — also authored,
not stock. Neither is a diagram, table, or quoted document.

## 5. Motion grammar

`document.getAnimations()` returned an empty array at both viewports, both after load and after one
scroll — no Web Animations API entries were live at the two sampled moments. Two things the snippet
would not catch, seen in the raw CSS and on screen:
- A live city clock ("Thursday, September 17 / New York, 00:41:44") that increments once per
  second. This is DOM text mutation via a JS interval, not a WAAPI/CSS animation, so it never shows
  in `getAnimations()`. Trigger: load, continuous, duration: n/a (loops indefinitely), property: text
  content. This is the page's one truly continuous motion.
- The stylesheet declares `.nav__card__inner` transitions on `background-color .5s` and
  `will-change: transform, opacity` on `.nav__card`, implying a hover state (background/transform)
  that the capture's single hover shot (scrolled to the press feed, not the card list) did not
  visually confirm changing.

No scroll-linked (`timeline`) animation was recorded at either sample. No pin or scroll-hijack
observed. Signature motion for the page as captured: the live clock tick (continuous, DOM-text,
not WAAPI). Sprinkle: the presumed 500ms background-color hover transition on list cards (unconfirmed
visually).

One more entrance signal visible only by comparing the two fold-early shots: at 390,
`<slug>-390-fold-early.png` (captured at domcontentloaded+250ms) already shows the full layout at
reduced opacity with grey placeholder blocks in place of icons, while the equivalent 1440 shot is
blank white. That asymmetry means the entrance is opacity/placeholder-based and finishes faster (or
starts sooner) at 390 than at 1440 in this sampling; it was not caught by the animations snippet
because it had already settled by the later "fold" capture at both widths.

## 6. Type scale and grid

From the snippet, 1440: font sizes in use `[23, 14]`; the `<h1>` is an inline SVG wordmark with no
text node, so its "font-size" (14px) is not meaningful type; the sampled body paragraph is 14px.
Ratio 23:14 ≈ 1.64. Count of active sizes ≥12px: 2. Face: `sf-pro-text, sans-serif` on both h1 and
paragraph (system/SF Pro fallback, no custom webfont loaded at capture time). At 390: sizes `[16,
13.5]`, same face. Case: sentence-case throughout (project names "FURSYS" render uppercase only
because the client's own logotype is uppercase; "MoMA PS1", "Robinhood Market" are mixed/sentence
case) — no display-scale uppercase treatment anywhere on this page. Body column width: n/a, the
page is card-grid/list, not a prose column. Columns at 1440: 1 (sidebar) + a multi-column masonry
feed (roughly 3 wide in the stitched capture) = effectively a 2-panel layout. At 390: single column,
sidebar and feed both stack to full width.

## 7. Hand-made versus templated

Three things that could only belong to this site: (1) the live incrementing city clock under the
wordmark; (2) an unlabeled on/off toggle switch top-right of the sidebar (purpose not determined
from this capture — not a theme switch, page stayed light in both shots); (3) the two-panel
composition itself (a permanent project index beside a live press feed) is an unusual choice for an
agency site. DESIGN_BAR section 4's never-list was not supplied to this capture leg, so it is not
checked item-by-item here; visually, none of the commonly-banned moves (cursor follower, marquee,
scroll-jacking, mono-only aesthetic) were observed. Verdict: hand-made (closer to bespoke app-shell
than template), though the project-card component itself is a repeated, generic pattern once you are
inside it.

## 8. The one mechanism worth taking

This differs from what section 1 expected. The row anticipated "entries set at display scale in a
list, with the image as a secondary hover event rather than the entry's body" — a large-type text
index where hovering reveals an image. What the live page actually is: a compact icon-plus-two-line
card list (14 to 23px type, not display scale) that sits permanently beside a separate, unrelated
photography/press column; hovering a card was not confirmed to reveal an image at all (CSS shows
only a background-color transition, not an image reveal), and the "image" on screen belongs to press
items, not to the project entries.

The mechanism actually worth taking: **a persistent project-index card sets client mark, name and a
one-line outcome at compact size (14 to 16px) in an identical shape per entry, and stays visible
beside a separately-scrolling content column, rather than growing entries to display scale.** This
is a rhythm-and-restraint lesson (small, calm, identical cards) rather than a type-scale lesson, and
it is the opposite of what was expected going in.

## 9. What is budget

What Porto Rocha has that micahjonesconsulting does not: a roster of named enterprise clients (Nike,
Robinhood, MoMA PS1, Google) generating a constant stream of press mentions, awards and talks; a
live PR/content pipeline feeding the news column; a team large enough to staff that pipeline and
build bespoke front-end chrome (the clock widget, the toggle, the masonry feed engine).

## 10. Rule collision

None, as the mechanism actually worth taking (question 8) is a static, restrained card list with no
motion claimed. If the live clock or the continuous press feed were taken instead, they would
collide with the no-loop / no-continuous-motion posture this project holds for anything outside the
one recorded count-up exception, and with the project's scope discipline against adding an ongoing
content pipeline this site has no team to feed. Neither is proposed for the take-list.

## 11. Capture facts

- URL captured (final, after redirect): `https://www.portorocha.com/`
- Date: 2026-09-17 (per capture timestamp 2026-09-17T04:41:38Z, confirmed on-page by the live clock)
- Viewports: 1440x900 and 390x844, device scale factor 2 for fold shots
- Page height: 1440 reported 46191px by `document.body.scrollHeight` (see caveat below); 390
  reported 844px
- Consent banner: none encountered, "consent": "none" in both viewport records
- Entry text in initial HTML: confirmed. `grep -o "FURSYS"` against `_raw/a-portorocha-index.html`
  matches; the raw HTML shows `<a href="/fursys" class="nav__card__inner">...<h2>FURSYS</h2>
  <p>Making room for workplace reinvention</p>` verbatim, so the index is server-rendered, not
  client-only
- Fallback used: no (primary live and on-domain)
- Caveat: the reported 390 page height (844px, equal to the viewport) indicates the project list and
  press feed scroll inside internal containers rather than the document body; the frame-stitcher in
  this leg's tool scrolls the window, so the 390 full-page PNG and the 1440 stitched PNG (truncated
  at 15 frames against a reported 46191px document height) undercount the real list length. The fold
  and fold-early shots are accurate; the "full page" PNGs should not be read as complete for this
  slug.

## Snippet outputs

Animations (`document.getAnimations()...`), both viewports, both after load and after scroll:

```
[]
```
(empty at every sample point; see question 5 for the DOM-text clock and CSS-transition hover that
this snippet does not surface)

Type sizes (largest-to-smallest, px):

```
1440: [23, 14]
390:  [16, 13.5]
```

## Closing line

The mechanism to take (question 8): a persistent project-index card sets client mark, name and a
one-line outcome at compact, identical size for every entry, beside a separately-scrolling content
column, rather than growing entries to display scale. The rule it touches (question 10): none, as
captured and as proposed to take; the site's continuous clock and press feed, if ever considered,
would collide with the no-continuous-motion posture and are not being proposed.
