# c-buzzusborne-home — https://buzzusborne.com

Captured live (primary URL, no fallback needed). Status 200, finalUrl `https://buzzusborne.com/`.

## 1. Index shape

Not a work index page — this is the homepage, and the project entries live inline below the
hero as one full-width, single-column stack of alternating-background tiles (not a grid, not
cards side by side). At 1440 the first fold shows the hero headline only, with the first tile's
top edge just entering at the bottom of the viewport (0 full entries visible). At 390 the fold
shows the hero and roughly 80 percent of tile 1.

Data points per entry are uneven: tile 1 (the featured entry, see Q2) carries a heading, a
paragraph, and a "View" link. Tiles 2 through 7 show only a framed product screenshot on a solid
color field, no visible heading or copy — each has a small hamburger-style icon in the top-right
corner, presumably an expand/menu affordance, not a visible label. Total entries in the stack: 7
(counted top to bottom: AI tooling card, an inbox/support-app screenshot, a "Calculate" button
screenshot, a kanban board screenshot, "The Family Nook" logo card, a stacked-thumbnail moodboard
card, a rating-widget screenshot).

Rhythm break: every tile is the same shape (full-bleed row, one per screen height roughly),
but tile 1 differs from every tile after it by having visible text at all. That break happens
immediately — at the first tile, roughly 0.3 screens down from the top at 1440.

## 2. Featured entry

Yes. Tile 1, "Building the AI tooling for creativity," is featured by position (directly under
the hero, first in the stack), by being the only tile with an always-visible heading, paragraph
and "View" link, and by a two-column internal layout (a white demo panel on the left, copy on the
right) inside a lavender field — every other tile is a single full-bleed screenshot with no
internal columns. The clickable surface appears to be the whole card: in the hover capture, both
the heading and the "View" link underline together in copper/yellow at once, consistent with one
enclosing link rather than two separate ones. It sits immediately below the hero headline, with
nothing in between.

## 3. How a study opens

n/a — no click-through was made per the time-box and no-forms/no-extra-navigation instruction, and
this capture is the homepage, not a case-study page. This homepage's "View" link would presumably
open a separate case study, but that page was not captured.

## 4. The visual device standing in for photographs

Real, literal product-UI screenshots (framed with soft corners, drop shadow, on a solid pastel
field) stand in for photography on every tile: a support-inbox app, a kanban board, a calculator
button, a rating widget. Tile 1 additionally has an authored, non-generic device: a small mock
"AI chat" panel showing a cursor-bubble labeled "Buzz" and a cycling caption ("Reading the design
system…" / "Creating beauty…" — text differs between captures, see Q5). That one is authored to
this content (it dramatizes the "AI tooling" positioning); the plain screenshots on tiles 2-7 are
generic case-study furniture, reused wherever a real client screenshot exists.

## 5. Motion grammar

`document.getAnimations()` returned an empty array for both `afterLoad` and `afterScroll`, at
both viewports (pasted in the closing section below) — no Web-Animations-API-tracked animation
was mid-flight at capture time. But the screenshots show motion the snippet missed:

- **Headline entrance.** The 1440 fold-early shot (taken ~250ms after DOMContentLoaded) shows the
  logo only, with the giant headline area blank; the 1440 fold shot (~4.5s later) shows the full
  headline. Trigger: load. Property: opacity and/or transform (untracked by the snippet because it
  had already finished by the 3s+ measurement point). Duration bucket: under 1s, one-shot.
- **Tile 1's live-demo caption.** A short caption beside a triangular cursor icon and a green
  "Buzz" speech-bubble cycles text ("Creating beauty…" at 390, "Reading the design system…" at
  1440) between two separate page loads. This reads as a continuous, looping, JS-driven text swap
  (not a CSS animation, which is why `getAnimations()` never caught it) rather than a one-shot
  reveal. Trigger: load/in-view, continuous, property: text content (plus icon position).
- **Hover underline on tile 1.** On hover, the heading and "View" link both gain a copper/yellow
  underline simultaneously. Trigger: hover, property: text-decoration/background, no visible
  duration (near-instant), reverses on hover-out (not directly captured, inferred from CSS
  convention).

Signature motion for the page: the tile-1 auto-cycling "AI is working" caption — it is the one
motion built specifically to sell the page's positioning ("Building the AI tooling for
creativity"). Everything else (headline fade, hover underline) is sprinkle. No pin, no
scroll-hijack, no scroll-linked timeline observed anywhere.

## 6. Type scale and grid

From computed styles (see snippets below), not the eye:

- **1440:** font sizes present (largest to smallest): 52, 40, 18, 17, 16, 15, 14, 13 (8 active
  sizes ≥12px). `h1` and body paragraph both report `15px`, `font-family: Roboto, sans-serif`,
  `text-transform: none`. The giant visible headline ("I'm Buzz…") is almost certainly NOT the
  measured `<h1>` — 15px does not match what renders at roughly 52px in the screenshot, which
  means the true `<h1>` is a small/visually-secondary element (likely an accessibility-only or
  differently-styled heading) and the big display line is a styled non-heading element. Ratio of
  largest-to-body: 52/15 ≈ 3.5:1.
- **390:** font sizes: 40, 32, 18, 17, 16, 15, 14, 13 (8 active sizes). Same `h1`/paragraph facts:
  15px, Roboto, sentence-case.
- **Face:** one face throughout, Roboto (default sans, not a licensed display face) — no serif, no
  mono anywhere observed.
- **Columns:** single-column, full-bleed stack at both widths — no multi-column grid at 1440; tile
  1's internal two-column layout (demo panel + copy) collapses to stacked at 390.
- **Case:** sentence-case throughout; no uppercase display type.

## 7. Hand-made versus templated

Three things that could only belong to this site:
1. The hand-lettered cursive "Buzz"/"Zuzz" wordmark used as the logo.
2. The green "Buzz" speech-bubble-with-cursor mascot pinned to the hero demo card.
3. The auto-cycling "Reading the design system…" / "Creating beauty…" caption tied directly to
   the "AI tooling for creativity" positioning line.

DESIGN_BAR never-list item present: heavy decorative emoji inline in the H1-equivalent headline
(peace sign, rainbow, unicorn, hugging face) — informal/mascot voice, not this site's register,
noted for completeness only (copy voice is explicitly not to be taken).

Verdict: hybrid. Hand-made in personality (mascot, hand-lettered mark, one authored demo widget)
but templated in typographic system — a single default sans (Roboto) at plain sizes, and six of
seven entries are bare framed screenshots on a color field with no distinguishing type treatment.
Not the tomcritchlow calibration point for plain (there is real authored personality here), but
also not fully hand-made the way a custom type system would be.

## 8. The one mechanism worth taking

"Tile 1 pairs an always-visible heading, one-sentence dek and a 'View' link beside a small framed
demo panel that auto-cycles a short first-person caption on load, while every other entry (6 of
7) is reduced to a bare screenshot on a solid color field with no visible text." This is close to
section 1's expectation ("the tile as the demonstration: a designer's own index proves design
skill in the entries themselves") but differs in the specifics: section 1 expected a six-tile
"Recent Work" grid with a hover state and a static-versus-video comparison across tiles; the live
page instead has 7 full-width stacked rows (not a grid), no "Recent Work" heading found in this
fold set, and only the first tile carries any visible copy — the other six are hover-silent
screenshots, not a hover-per-tile system.

## 9. What is budget

A body of real, varied client product screenshots (support-inbox software, a kanban tool, a
calculator UI, a rating widget, a brand identity, a moodboard) spanning several completed SaaS
engagements — a volume of finished client work micahjonesconsulting does not have to draw from.
Also a small amount of front-end engineering budget to build the auto-cycling demo caption
(a bespoke widget, not a template component), though this is modest, not a production/3D/team
budget.

## 10. Rule collision

None of pin, parallax, or cursor-follower observed — no collision with that CLAUDE.md line.
The closest collision: the tile-1 auto-cycling caption is a continuous, load-triggered animation
running independent of the signature motion. Taken as-is on this project it would read as a
second signature motion (CLAUDE.md: "NOTHING ELSE pins, sticks, parallax-scrolls, or follows the
cursor without the motion-engineer agent's written approval" and the standing "no second
signature" ruling) — it would need the motion-engineer's sign-off, not a straight port. No
reduced-motion handling was verified for it either way (out of scope for this capture; flagged,
not confirmed).

## 11. Capture facts

- URL captured (final, after redirects): `https://buzzusborne.com/`
- Date: 2026-09-17T15:15:37.031Z
- Viewports: 390x844 and 1440x900, device scale factor 2 (fold shots)
- Page height: 1440 width — 5020px; 390 width — 3111px
- Consent banner: none encountered at either viewport; no blocker
- Entry text in initial HTML: yes — `grep -io "help teams"` and `grep -io "Building the"` /
  `grep -io "tooling for"` all match in `_raw/c-buzzusborne-home.html` (14,641 bytes, status 200,
  page `<title>Buzz Usborne • Home</title>`), so the headline and tile-1 copy are server-rendered,
  not client-injected.
- Fallback used: no (primary live, none needed)

### Snippet: animations (`document.getAnimations()`)

```
1440 afterLoad: []
1440 afterScroll: []
390 afterLoad: []
390 afterScroll: []
```

### Snippet: type (unique computed font sizes, descending)

```
1440: [52, 40, 18, 17, 16, 15, 14, 13]
h1: { fontFamily: "Roboto, sans-serif", fontSize: "15px", textTransform: "none" }
paragraph: { fontFamily: "Roboto, sans-serif", fontSize: "15px", textTransform: "none" }

390: [40, 32, 18, 17, 16, 15, 14, 13]
h1: { fontFamily: "Roboto, sans-serif", fontSize: "15px", textTransform: "none" }
paragraph: { fontFamily: "Roboto, sans-serif", fontSize: "15px", textTransform: "none" }
```

---

**Mechanism to take (Q8):** the featured-entry pattern — one entry (of 7) carries the only
visible heading, dek and CTA, paired with a small authored demo widget, while the rest of the
index is silent, unlabeled screenshots on color fields.

**Rule it touches (Q10):** the auto-cycling demo caption, if ported as a standing on-load loop,
risks reading as a second signature motion and needs motion-engineer sign-off before use;
everything else touches no named rule.
