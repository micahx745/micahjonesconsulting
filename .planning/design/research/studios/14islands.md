# 14islands — teardown

Slug: `14islands` · kind: studio · fetched 2026-09-05

## 1. Fetch proof

- URL: `https://www.14islands.com/` — HTTP **200** (curl, 162,345 bytes; Playwright `resp.status()` 200)
- `<title>`: **`14islands | Creative design & technology agency`**
- Case page: `https://www.14islands.com/work/cartier365` — HTTP **200**, title `14islands | Cartier 365 website design and development`
- Stack: Next.js (pages router, `/_next/static/`). Three stylesheets pulled and parsed directly:
  `f2973826e8215c7b.css`, `b40ae3ae3dc88ad5.css`, `b1809e097e5bdce5.css` (104 KB total).

## 2. Type system (from the CSS)

Four `@font-face` families, all self-hosted woff2/woff, all **weight 400 only** — no weight axis:

| family | file | role |
|---|---|---|
| `AftenScreen` | `AftenScreen.woff2` | **display AND body prose** |
| `AftenScreenItalic` | `AftenScreen-Italic.woff2` | italic emphasis |
| `BentonSans` | `BentonSans-Regular.woff2` | **labels / nav / meta only** |
| `Inter` | `Inter-Regular.woff2` | utility fallback, not seen in the visible hierarchy |

No monospace face is loaded. Two mono stacks exist in the CSS but both belong to vendored
third-party widgets (an embedded Tweet component and a code block), not to the design system.
`font-weight` in the authored CSS is `400` (13 rules) with `700` appearing only inside the
vendored Tweet block. So: **one weight, two faces, zero bold.**

**The scale is a pure vw ladder with a rem floor** — no `clamp()` anywhere in the CSS. Every step
is `max(<rem floor>, <vw>)`, computed against a 1728px design width:

```
max(5rem,      19.6759vw)   → 340px @1440   (largest, reserved)
max(3.75rem,   12.5vw)      → 180px @1440   ← hero "Design / Technology", section words
max(3.125rem,  12.5vw)
max(3.75rem,    5.2083vw)
max(1.875rem,   5.2083vw)   →  75px @1440   ← "Let's make something great together"
max(2.1875rem,  6.9444vw)
max(1.75rem,    3.4722vw)
max(1.375rem,   1.2731vw)
max(1.25rem,    1.8519vw)   →  26.7px @1440 ← project titles in the index
max(.875rem,    .8102vw)
max(.75rem,     .8102vw)    →  12px         ← all labels
```

Measured live at 1440×900: display 180px / ls **−9px (−0.05em)** / lh 144px (0.8) / weight 400;
mid-display 75px / ls −3px (−0.04em) / lh 75px (1.0); project title 26.7px / ls −1.07px / lh 34.7px;
label 12px / ls `normal` / lh 16.8px / **uppercase** / colour `#a2a2a9`.

**The whole letter-spacing system is two values: `-0.05em` and `-0.04em`, both negative, both on
display only.** Labels are never tracked out — uppercase at 12px with normal spacing. That is the
opposite of the usual studio move (`+0.1em` on tiny caps) and it is worth stealing.
`text-transform: uppercase` appears exactly **3 times** in the entire stylesheet.

Spatial tokens are the same vw system: `--gap: 0.5787vw`, `--indent: 3.7616vw`,
`--menuNavigationHeight: 7.6968vw`. Breakpoints `600 / 900 / 1400px`.

## 3. Palette (from the CSS custom properties)

The authored token block, verbatim:

```
--color-almost-black          #070707
--color-background            #f2f2f2
--color-grey-highlight-dark   #797979
--color-grey-highlight-light  #a2a2a9
--color-sand-highlight        #a59d92
--color-sand                  #eae5df
--color-white                 #fff
--color-beige-theme-animated-text-highlight-bg  #e4ded7
--color-dark-theme-animated-text-highlight-bg   #26272a
```

- **Ground:** `#fff` on the default theme (`--theme-background: var(--color-white)`; live
  `body` computes `rgb(255,255,255)`), with `#f2f2f2` as the alternate section ground and
  `#eae5df` sand for editorial breaks.
- **Type colour:** `#070707` — near-black, not `#000`.
- **Greys:** exactly two, `#797979` and `#a2a2a9`. `#a2a2a9` is the label/meta colour and is the
  only grey a visitor consciously reads.
- **Accents:** there is **no brand accent**. The three chromatic tokens
  (`--color-aila-purple #a5a9fd`, `--color-aila-yellow #ffca6b`, `--color-aila-grey #1f1f1f`)
  are namespaced to one sub-brand ("Aila") and never appear on the home or the Cartier case.
- **Achromatic in practice: yes.** Nine tokens, seven of them neutral, and the two warm ones
  (`#eae5df`, `#a59d92`) are sand rather than colour. All colour on the page arrives inside
  client imagery.

## 4. Composition of the home first screen

Assertion, in the order the eye takes it:

1. `CREATIVE AGENCY` — 12px BentonSans uppercase grey label, set at the **horizontal centre**,
   not at the left margin.
2. `WE DESIGN AND BUILD BESPOKE DIGITAL PRODUCTS, BRANDS, AND EXPERIENCES.` — **11 words**, same
   12px uppercase label size, directly under the label. The entire positioning statement is set
   at caption scale.
3. `Design` (left-aligned, at the left margin) / `&` in grey / `Technology` (right-aligned, running
   off the right edge) at 180px. Two words, opposed alignments, one grey ampersand between them.

So the first screen asserts the offer in **11 words at 12px**, and gives 180px to two nouns. The
alignment is deliberately unresolved: label centred, display split left/right, so the screen has no
single axis. Nav is a **top bar, 6 items** (`WORK SERVICES CULTURE JOURNAL AI CONTACT`), 12px
uppercase, with the wordmark at top-left; on scroll it collapses to a single `MENU` toggle
(BentonSans 12px uppercase). **The work is not the first screen** — it begins one full viewport
down. Document height 10,304px at 1440.

## 5. How work is shown

A **list-index**, not a tile grid. 34 projects link out of the home page (`/work/<slug>` ×34),
each rendered as: project title (26.7px AftenScreen) + sector label (12px uppercase grey) —
`Cartier / Luxury`, `Neko / Health Tech`, `Poly AI / AI Technologies`. No thumbnails in the markup;
media is drawn into a **single WebGL canvas** (1 `<canvas>`, 20 `<img>` as textures/sources, 1
`<video>`), so hovering an index row is what summons the image. My 1440-wide screenshot shows those
regions as blank — that is the canvas layer, and it is the proof the media is not DOM imagery.

**34 projects appear before any prose.** The only sentence between the hero and the index is one
12px line: `WE WORK CLOSELY WITH OUR CLIENTS TO CREATE OUTSTANDING EXPERIENCES FOR THEIR AUDIENCES.`
followed by a `SERVICES →` link.

The case page (Cartier 365) inverts the ratio: 15 images, 1 canvas, **19,952px tall**, and the
prose is three short paragraphs. Its structure is
`INDUSTRY / LUXURY` + `AWARDS / [5 lines]` (both 12px labels, top of page) → `Cartier` at 180px →
full-bleed image → three paragraphs in AftenScreen at ~18px, set in the **right-hand column with the
left half empty** → `Visit site.` → `MORE WORK` (two adjacent projects) → the global contact block.

## 6. The path to business

- Nav item `CONTACT` (6th of 6, top-right).
- The closing block on **every** page, at 75px display: `Let's make something` / `great together`
  — set across two lines, the second line indented.
- Directly under it, the only contact mechanism on the site: **`hello@14islands.com`**, a plain
  `mailto:`. One mailto href on the page. **No form. No calendar. No phone.**
- **No pricing anywhere.** No "starting at", no engagement tiers, no rate.
- Proof is carried instead by an `AWARDS` label column on the case page (SOTD Awwwards, Developer
  Award Awwwards, SOTD The FWA, SOTD CSS Design Awards, Silver Winner Lovie Awards) — jury awards,
  not testimonials. There is no testimonial anywhere on the home or the Cartier case.
- Footer: `14islands designs and builds digital products, brands, and experiences — with offices in
  Stockholm and Reykjavík.` then `© 2026 14ISLANDS` / `INSTAGRAM` / `X / TWITTER` / `LINKEDIN` /
  `PRIVACY`.

## 7. Motion vocabulary

Counted by string frequency across all nine JS chunks (2.5 MB concatenated):

| token | hits | reading |
|---|---|---|
| `lenis` | 23 | smooth scroll, confirmed |
| `three.` / `webglrenderer` / `shadermaterial` | 187 / 46 / 25 | three.js with custom shaders |
| `r3f` / `@react-three` / `scrollrig` | 73 / 1 / 15 | react-three-fiber + their own `r3f-scroll-rig` |
| `uniforms` / `glsl` | 151 / 28 | hand-written shader material |
| `velocity` | 92 | scroll-velocity-driven distortion |
| `parallax` | 20 | parallax present |
| `cursor` | 53 | custom cursor treatment |
| `gsap` / `scrolltrigger` | **0 / 0** | none |
| `framer-motion` / `locomotive` / `barba` / `splitting` | **0** each | none |
| `marquee` | **0** | **no marquee** |
| `sticky` | 1 | essentially no pinning |

Live DOM: **1 canvas**, **1 video**, 20 imgs (home); 1 canvas, 15 imgs, **0 video** (case).

So: Lenis smooth scroll + a single full-viewport WebGL canvas that every image on the site is
composited into, driven by scroll velocity. **What is quiet:** no scroll-jacking, no pinned
sections, no horizontal gallery, no marquee, no page-transition library, no bold weight, no
entrance animation on body copy. The motion budget is spent entirely on one mechanism.

## 8. Rhythm

5 `<section>` elements, 10,304px on the home:

1. Hero — 12px label + 180px two-word display. Enormous negative space; the type occupies maybe a
   fifth of the screen.
2. One 12px sentence + `SERVICES →`. **This is the quiet beat** — a full band of near-empty page
   between the hero and the index.
3. The 34-project index, the longest section by far.
4. Culture: `OUR TEAM FOSTERS AN INCLUSIVE CULTURE OF CRAFT, COLLABORATION, AND CREATIVITY.` +
   `CULTURE →` — again a single 12px sentence.
5. Contact: `Let's make something great together` at 75px + the mailto.

Full-bleed happens only inside the canvas (case-page hero image, project hovers). Footer is a
**thin utility strip**, 12px uppercase — explicitly **not** a giant wordmark. The site's biggest
type is the hero and the contact line; the footer refuses the trend.

## 9. THE BEST PART

**The offer is stated at 12px and the nouns get 180px.**

The complete positioning sentence — "We design and build bespoke digital products, brands, and
experiences", 11 words — is set at label scale, uppercase, in grey, centred. Then two words get
180px with −0.05em tracking. Most sites do this backwards: the headline argues and the caption
labels. 14islands lets the headline be a **category** and the caption carry the **claim**, and the
result reads as confidence rather than pitch. The same discipline runs through the case page: the
project name at 180px, everything factual (`INDUSTRY / LUXURY`, the five awards, the sector) in the
12px label register.

Second, inseparable: **labels are uppercase at 12px with `letter-spacing: normal`.** No tracked-out
caps. It is a one-line difference from the studio default and it is the reason the labels read as
documentation rather than as decoration.

**Legal for him: yes, entirely.** This is a type-hierarchy inversion, not a proof strategy. He can
set the positioning line at 12px uppercase in the mono face (JetBrains Mono is already the cleared
R1 "narrow third" — this is exactly the label register it was cleared for), give the display face
one or two nouns at the top of the ladder, and put every hard fact from the seven receipts into the
12px label column: `SECTOR / CLIENT / YEAR / OUTCOME`. The awards column becomes a **receipts
column** — `$150K`, `14 practices`, `91% intake completion`, each on its own 12px line under a grey
`RESULTS` label. No logos, no testimonials, no invented proof needed; the pattern works on named
numbers alone, and named numbers are what he has.

Third, cheaper to steal: **the contact block is one 75px line and one mailto, repeated on every
page.** No form, no calendar. That is available to him today.

## 10. THE TELL

**The single WebGL canvas that every image is composited into.** One `<canvas>`, 187 references to
three.js, 151 to shader uniforms, 92 to scroll velocity — the entire image layer is a shader. It is
the 2021–2026 award-site signature (it is literally how they win the Awwwards Developer Award they
list on the Cartier page), and it carries three costs: images are invisible to a plain screenshot,
invisible to anything that does not run WebGL, and the site is doing hundreds of kilobytes of GPU
work to achieve a hover reveal. For a solo consultant it is also a **credibility mismatch** — a
shader-composited image layer says "we have a graphics engineer", which is a claim, not a
decoration.

Second, smaller tell: the vw-only scale with no `clamp()`. `max(3.75rem, 12.5vw)` gives a floor but
no ceiling, so display type keeps growing past 1728px with nothing to stop it. `clamp()` is the
correct tool and the reason they avoided it is not visible in the CSS.

Third: the nav item `AI` sitting between `JOURNAL` and `CONTACT` will date faster than anything else
on the page.

## 11. Screenshots

- Home: `.../scratchpad/studios/14islands-home.png` (1440×900 viewport, full-page capped 2700px)
- Case: `.../scratchpad/studios/14islands-work.png` (`/work/cartier365`, same settings)

Both show large blank bands where imagery sits — that is the WebGL canvas layer not rasterising into
a screenshot, and it is itself evidence for §7 and §10.
