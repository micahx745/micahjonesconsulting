# c-tomcritchlow-home

URL: https://tomcritchlow.com (primary, live). Fallback: none needed.

## 1. Index shape

A single-column content flow inside a fixed left sidebar layout, not a grid or card system. Two
lists sit on the page: "Latest Writing" (a plain title-plus-date list, 9 entries shown before a
"See all" link) and "Projects" (an icon-plus-title-plus-description-plus-domain list, 4 entries).
Both lists are visible in the 1440 first fold along with the full intro paragraph (page height is
only 1447px at 1440, under two screens total). At 390 the intro paragraph and most of "Latest
Writing" are visible in the fold; "Projects" sits near the bottom of the 1896px stitched page.

Data points per entry: writing entries carry 2 (title, date). Project entries carry 4 (a circular
favicon icon, a bold title, a one-line description, a domain label). Every entry within a given
list is the same shape and size; there is no rhythm break inside either list. The one shape change
on the page is the list-to-list transition itself (2-point text row to 4-point icon row), which
lands about one screen down at 1440, and close to two screens down at 390.

## 2. Featured entry

None. No entry is sized, positioned, coloured or animated differently from its siblings in either
list. Clickable surface differs by list: a project row's whole flex row is one anchor (icon, title
and description all inside `<a>`); a writing row's link is the title text only, the date sits
outside the anchor as plain text. There is no page heading above these lists to feature an entry
relative to; the intro paragraph runs directly into "Latest Writing".

## 3. How a study opens

n/a — this is a personal blog homepage, not a case study; there is no study to open.

## 4. The visual device standing in for photographs

Nothing. No photograph, figure, diagram, quoted document, colour field, motif or table carries the
eye. What is present is plain type hierarchy: a green link colour on inline text and on the
"Latest Writing" / "Projects" kickers, bold black titles, and small grey-50 dates. It is not
authored to this content; the same list-of-title-and-date pattern would work unchanged on any blog
or personal site (it is the stock indie-blogger home layout).

## 5. Motion grammar

`document.getAnimations()` returned an empty array after load and after scroll, at both
viewports (see snippet below). No entrance motion, no in-view reveal, no scroll-linked animation.
The only latent motion in the markup is a CSS hover class (`bg-animate hover-bg-white`) on the nav
items, which is a plain `:hover` background swap, not something the Web Animations API surfaces at
rest, and it was not exercised in this capture (hover-target auto-detection found nothing to
attach to on this page: `"hover": {"selector": "none found", "screenshot": false}`, so no
`c-tomcritchlow-home-1440-hover.png` exists). No signature motion. No sprinkle.

## 6. Type scale and grid

From computed styles, identical at 1440 and 390: font sizes in use are `[20, 16, 14, 12]` (4 active
sizes), largest 20px (paragraph body), smallest 12px (dates/labels). Ratio largest:smallest is
20:12 = 1.67. `h1: null` — there is no semantic `<h1>`; the site name "TOM CRITCHLOW" is a styled
anchor (`ttu b`, Tachyons uppercase-bold utilities), not a heading. Body paragraph font is
`"Libre Franklin"` at 20px, `text-transform: none` (sentence case). The page also loads IBM Plex
Mono and Inconsolata in `<head>` but neither appeared in the sampled visible-text font sizes.
Column: the main content sits in a `w-two-thirds-ns` block inside an `mw8` (max-width ~60rem)
centered wrapper alongside a 223px fixed left nav — effectively one text column plus one nav rail
at 1440; single full-width column at 390, where the nav collapses behind a hamburger and a sticky
mobile header bar. Display case: the brand mark is uppercase via a utility class; all running body
and heading-equivalent text ("Latest Writing", "Projects", article titles) is otherwise
sentence-case or title-case, not a designed display voice at a large size.

## 7. Hand-made versus templated

Built on Tachyons (a stock utility-CSS framework — classes like `ttu`, `f4`, `f5`, `bg-animate`,
`hover-bg-white`, `mw8`, `w-two-thirds-ns` are visible verbatim in the markup), jQuery, and Feather
icons. Three things that could only belong to this site: (1) the specific project list content
(The Strategic Independent, Quotebacks, The SEO MBA, Fiercely Curious — real, named work); (2) the
custom accent green (a Tachyons custom colour, `newgreen`) used for links, kickers and the active
nav state; (3) the first-person voice of the intro paragraph. Nothing about the structure,
components or interaction pattern is unique to this person — the fixed-sidebar-plus-post-list shape
reads as stock indie-blogger tooling. No DESIGN_BAR never-list item is present (no gradient orbs,
no glassmorphism, no giant emoji, nothing to flag) because there is essentially no visual design
system here to violate. Verdict: **plain** — the calibration point the set expects.

## 8. The one mechanism worth taking

"A homepage sets one plain two-data-point list (title, date) for writing and one plain
four-data-point list (icon, title, description, domain) for projects, with zero motion and zero
imagery, at N/A ms — because an honest, low-craft index is itself the correct register for a
personal, undesigned page." This matches section 1's expectation exactly: nothing visual to take.
The finding is confirmatory, not a divergence — the page is the intended "plain, not template"
calibration point for audit (a).

## 9. What is budget

None in the direction micahjonesconsulting would need to close. If anything the comparison runs
the other way: this site has less production budget than micahjonesconsulting.com (no photography,
no illustration, no custom type system, no motion, a free utility CSS framework and jQuery) and
still reads as a credible, human personal site. That is the point of including it: plainness alone
is not an AI tell.

## 10. Rule collision

None. There is no motion, diagram, oversized numeral or index device here that would touch any
DESIGN_BAR R-number, the pin/parallax/cursor line, the animated-figure line, or the GSAP
quarantine. If it touches anything, it is confirmatory of R11 (cap data points per entry) — both
this page's lists already sit at or under a small fixed count (2 and 4) per entry.

## 11. Capture facts

- URL captured (final, after redirect): `https://tomcritchlow.com/` (trailing-slash normalize only,
  same origin — not a cross-domain redirect).
- Date: 2026-09-17 (capture timestamp `2026-09-17T04:50:19.653Z` UTC).
- Viewports: 390x844 and 1440x900, device scale factor 2 for the fold shots.
- Page height: 1896px at 390; 1447px at 1440.
- Consent banner: none present at either viewport (`"consent": "none"`); no blocker.
- Entry text in initial HTML: confirmed present. `grep`-equivalent check on the raw fetched HTML
  (`.planning/research/pass-121/set/_raw/c-tomcritchlow-home.html`, 14,144 bytes, status 200) shows
  the first writing entry's exact anchor text server-rendered with no JS required:
  `<a class="link black b" href="https://tomcritchlow.com/2026/06/08/termites-tokens/">Of Termites
  & Tokens</a>`. The whole page is static/server-rendered Jekyll-style markup; jQuery only wires the
  hamburger toggle and nav-active-class logic.
- Fallback used: no. Primary is live, 200, same domain.

## Snippet outputs (from capture JSON)

Animations (`document.getAnimations()`), both viewports, before and after scroll:

```json
"animations": {
  "afterLoad": [],
  "afterScroll": []
}
```

Type (largest-to-smallest visible font sizes), identical at both viewports:

```json
"type": {
  "fontSizes": [20, 16, 14, 12],
  "h1": null,
  "paragraph": {
    "fontFamily": "\"Libre Franklin\"",
    "fontSize": "20px",
    "textTransform": "none"
  }
}
```

## Closing line

The mechanism to take (q8): nothing visual — a plain, low-data-point list with zero motion is
itself the correct, honest register for an undesigned personal page. The rule it touches (q10):
none; at most it confirms R11's data-point cap already at work in the wild.
