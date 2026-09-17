# c-emilkowalski-home

Primary URL captured: https://emilkowal.ski (final URL https://emilkowal.ski/, status 304 on
repeat viewport load, 200 on the raw fetch). Live. No fallback needed.

## 1. Index shape

Single-column list, not a grid or cards. At 1440 the first fold shows: name and role, the full
"Today" bio (two short paragraphs), and the "Projects" heading with the first entry's top edge
just entering. At 390 the first fold shows only name, role, and the start of the "Today" bio
(cut off mid-sentence). Data points per entry: 2 (a title line, one description line) — no
image, no date, no tag, no numeral. Every "Projects" and "Writing" entry is the identical shape
end to end: title span, description span, wrapped in one padded link row. The one rhythm break
on the page is the Newsletter form (an input and a pill button, not a link row), which sits
roughly 2.3 screens down at 1440 (page height 2480px, form top near y=2000px) and about the same
proportion at 390. Nothing else varies in shape.

## 2. Featured entry

None. No Projects or Writing entry is featured by size, position, image, motion, or color; all
entries in both lists share the same two-line typographic treatment. The clickable surface is
the whole entry: `<a>` wraps both the title span and the description span in one padded row
(`-mx-3 ... px-3`), confirmed in the raw HTML.

## 3. How a study opens

n/a — no case-study pages exist on this site. It is one flat homepage; "Projects" and "Writing"
entries link out to separate products/posts, not to an in-site study template, so there is no
"study open" moment to record.

## 4. The visual device standing in for photographs

Nothing. No image, figure, diagram, quoted document, colour field, motif, or table appears
anywhere on the page at either width — confirmed on the full-page 1440 and 390 stitches, top to
bottom. The only thing carrying the eye is plain type set in a single flat off-white block
(`bg-gray-100`). There is no device to judge as authored or generic; its absence is itself the
finding.

## 5. Motion grammar

`document.getAnimations()` returned `[]` after load and after one scroll, both in the automated
capture and in a manual re-check in a live browser tab (see snippet output below) — no
Web-Animations-API or CSS-animation activity anywhere on the page. Hovering a Projects entry
(`a[href="https://aiforui.dev/"]`, computed live) shows `transition-property: all` but
`transition-duration: 0s`: the `hover:bg-[#F5F4F4]` background swap is instant, not eased — no
transform, no timing function actually applied. A promo banner at the top of the DOM carries an
inline `opacity:0; transform:translateY(-100%)` (built for a slide-down entrance) but never
fires in this capture; it reads as a time- or dismissal-gated component ("31 minutes left to
join"), not a usable motion sample. Signature motion: none observed. Sprinkle: none beyond the
instant, non-eased hover background-swap.

## 6. Type scale and grid

From computed styles, not the eye: only two active font sizes on the page at both 1440 and 390 —
16px and 14px (ratio 16:14 ≈ 1.14). No display size exists; the largest text on the page (16px,
weight 500) is the person's name in the header, the same size as the body copy. Face: a custom
variable literally named `Sans` with fallback `"Sans Fallback"` — a licensed/obscured typeface
whose real name next/font hides from devtools, confirmed live (`Sans, "Sans Fallback"` on both
the header link and a body paragraph). Body column width: single column, `max-width: 692px`
container (roughly 43-46ch at 16px). Columns: 1 at both 1440 and 390 — nothing reflows because
there is nothing to reflow. Display case: sentence case / title case throughout ("Emil
Kowalski", "Today", "Projects", "Writing") — no uppercase anywhere.

## 7. Hand-made versus templated

Three things that could only belong to this page: (a) the obscured `Sans`/`Sans Fallback`
font-family naming, a custom licensed face hidden by name; (b) the specific list of authored
Projects and Writing titles and one-line deks (own products, own essay titles); (c) an
unusually narrow information architecture for a portfolio — no nav bar, no case-study pages,
just Today / Projects / Writing / Newsletter / More. None of the obvious AI-template tells
(gradient mesh, glassmorphism, stock icon kit, 3D, grain) are present, but neither is any
authored visual craft beyond type and content — no motion, no image, no diagram. Verdict:
closer to **plain** than to hand-made in the visual sense; the restraint itself reads as the
signature (consistent with the author's own essay "You Don't Need Animations"), but there is no
additional visual-craft evidence to call it hand-made outright. It sits nearer the tomcritchlow
calibration point than the class C peers with visible proof-stacking (Anton Sten, Buzz Usborne).

## 8. The one mechanism worth taking

Section 1 expected "the micro-interaction grammar for index entries: one easing, one duration,
transform and opacity only." That mechanism is **not present** on this page — motion is
confirmed absent by two independent checks (automated capture and live re-check), and the hover
state is an instant, non-eased background swap, not a timed transition. The actual transferable
mechanism found instead: **the page caps its active type scale at two sizes (16px and 14px) and
carries all hierarchy through font-weight (500 vs 400) and text colour (near-black vs
`text-gray-1100`) rather than through size**, at both 1440 and 390, with zero display size and
zero imagery. Stated in the rubric's form: "Entry titles and descriptions sit at 16px/500 and
14px/400 beside no image, with hover swapping background colour at 0ms (no easing, no
transform)." This differs from what section 1 expected — record it as a contradiction, not a
match.

## 9. What is budget

Nothing here is asset, team, or pipeline budget in the FABLE-120 sense — the opposite: this page
spends almost no budget at all (no photography, no illustration, no diagrams, no motion
engineering). What it has that micahjonesconsulting.com does not is authorial restraint backed
by real product credibility (Sonner, Vaul, an animations course) that lets a bare list read as
confident rather than unfinished — a credibility budget, not a production budget.

## 10. Rule collision

None. Since no motion mechanism exists on this page to take, there is no collision with R9,
R11, R12, R15, the pin/parallax/cursor line, the animated-figure line, or the GSAP quarantine.
The type-hierarchy-by-weight finding (question 8) does not conflict with any named rule either;
it is a reference point for restraint, not a pattern this site is asked to adopt (R2's 72px+
display-size requirement on /work already rules out copying this page's zero-display-size
approach as-is).

## 11. Capture facts

- URL captured (final, after redirects): `https://emilkowal.ski/` (200 on the raw fetch, 304 on
  repeat browser loads).
- Date: 2026-09-17.
- Viewports: 390x844 and 1440x900, device scale factor 2 (fold shots); dsf 1 for full-page
  stitches and the early-fold shot.
- Page height: 2480px at 1440, 2242px at 390.
- Consent banner: none encountered (JSON field `consent: "none"` at both widths; no cookie
  banner visible in either full-page screenshot).
- Blocker: none.
- Entry text in initial HTML: confirmed via `curl`-equivalent raw fetch
  (`.planning/research/pass-121/set/_raw/c-emilkowalski-home.html`, 28,040 bytes, status 200).
  `grep`-checked: `Emil Kowalski` and `aiforui.dev` both present verbatim in the server-rendered
  markup (inside `<div class="root layout-root...">`), not client-injected.
- Fallback used: no (primary live).
- `h1: null` in the capture JSON is correct, not a capture error: the name "Emil Kowalski" is a
  plain `<a href="/">` in the `<header>`, not an `<h1>` element — confirmed in the raw HTML.
- Hover: automated detection reported `"selector": "none found"` at 1440 (no `work`/`project`/
  `case`/`stud` href match on the Projects/Writing entries, which link to external product/post
  URLs). No `<slug>-1440-hover.png` was produced. I manually verified the hover mechanism
  instead, live in a browser tab, on `a[href="https://aiforui.dev/"]` (see question 5 and the
  snippet below) — it is an instant, non-eased background-colour swap, so a hover screenshot
  would show nothing a static screenshot doesn't already show (no transform, no motion frame to
  catch).

### Snippet 1: animations, after load (automated capture, both viewports)

```
"animations": { "afterLoad": [], "afterScroll": [] }
```

Manually re-confirmed live in an open browser tab with the exact protocol snippet:

```
document.getAnimations().map(a=>({el:a.effect?.target?.tagName+'.'+(a.effect?.target?.className||''),dur:a.effect?.getTiming().duration,iter:a.effect?.getTiming().iterations,name:a.animationName||a.constructor.name}))
=> []
```

### Snippet 2: type, computed styles (automated capture, both viewports identical)

```
"type": {
  "fontSizes": [16, 14],
  "h1": null,
  "paragraph": {
    "fontFamily": "Sans, \"Sans Fallback\"",
    "fontSize": "14px",
    "textTransform": "none"
  }
}
```

Manually re-confirmed live (header link and body paragraph):

```
{ headerFont: 'Sans, "Sans Fallback"', headerSize: '16px', headerWeight: '500',
  pFont: 'Sans, "Sans Fallback"', pSize: '16px', sizes: [16, 14] }
```

## Closing line

The mechanism to take (question 8): a capped two-size type scale (16px/500, 14px/400) carrying
all hierarchy through weight and colour rather than size, with zero display size and zero
imagery — not the micro-interaction grammar section 1 expected, since no motion exists on this
page to take. The rule it touches (question 10): none.
