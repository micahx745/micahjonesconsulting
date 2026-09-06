# Obys Agency — teardown

Slug: `obys` · Kind: studio · Researched 2026-09-05

## 1. Fetch proof
- URL: `https://obys.agency/` — HTTP **200** (curl, 90,245 bytes), also verified in Playwright at 1440x900.
- `<title>`: **`Obys Agency`**
- Meta description (verbatim from source): "Concept-driven design studio based in the EU. Crafting award-winning brand and web experiences shaped by storytelling and strong visual systems."
- Secondary fetches: `https://obys.agency/work/makhno` → 200, `<title>` `Makhno - Obys Agency`; `https://obys.agency/about` → 200, `<title>` `About - Obys Agency`.
- CSS read directly: inline `<style>` (1,893 B) + `https://obys.agency/css/d.css?msh4f1r6` (14,804 B). JS: one file, `https://obys.agency/js/d.js?msh4f1r6` (119,748 B).

## 2. Type system (from the CSS)
- **One `@font-face`, one weight, one file:**
  `@font-face{font-family:Obys;src:url(/font/ObysSans4.woff2) format(woff2);font-weight:400;font-style:normal;font-display:swap}`
  The About page names it: **"Typography: OTF Obys NG by Obys"** — a proprietary in-house typeface. No Google Fonts, no Adobe, no second family. Stack is `font-family:Obys,serif` on `body` (the `serif` fallback is a throwaway; nothing else is declared).
- **There is no display face and no text face. There is one face at two sizes.** Display = the same 400-weight grotesk set enormous; text = the same face at 11px.
- **The scale is viewport-locked, not clamped.** `html{font-size:.694444vw}` → 1rem = exactly 10px at 1440. Every size is therefore fluid at all widths with *no* `clamp()` anywhere in the stylesheet (`clamp` count: 0).
  - Display: `font-size:8rem` = **80px @1440** (measured computed: `79.9999px`), `line-height:1`.
  - Secondary display: `font-size:4rem` = 40px.
  - Body / labels / metadata: `font-size:1.1rem` = **11px**, `line-height:1.2`. Confirmed computed on `body`: `11px`.
  - Ratio display:text ≈ **7.3:1**. There is essentially nothing in between — a two-step scale.
- **Letter-spacing, the only two values in the file:**
  - display `letter-spacing:-.03em` (computed `-2.4px` on the 80px titles)
  - everything else, set once on `body`: `letter-spacing:-.01em`
  - No positive/wide tracking anywhere. No tracked-out labels.
- **Uppercase: zero.** `text-transform` appears **0 times** in `d.css`. The wordmark "OBYS®" is drawn as SVG paths, not typed caps.
- **Monospace / mono-serif: none.** No second family of any kind, so the numeric indices (`01`…`19`, the `10` counter) are set in the same grotesk at 11px — they read as data because of position and colour, not because of a mono face.
- `font-weight` appears exactly once in the whole stylesheet: `400`.

## 3. Palette (from the CSS)
- Declared tokens, the entire root: `:root{--white:#fff;--black:#000}`.
- Hex counts across both stylesheets: `#fff` ×1, `#000` ×1. That is the complete hex inventory.
- Other colour values in `d.css`: `#c9c9c9` ×6 (the inactive-index grey and the hairline rules), `#fff` ×2 (blend-mode layers), `#0000001a` ×1 (a 10%-black hover border on grid thumbnails), and `background:red` ×1 — which is **the debug column-grid overlay** (`#g div{background:red}` at `opacity:.15`), a development affordance left in and toggleable.
- Ground: **`#fff`**. Type: **`#000`**. Grey: **`#c9c9c9`**, and nothing between it and black.
- **Accent: there is none.** The chrome is fully achromatic. The only colour on screen lives inside the client photographs, and even those are held desaturated in the WebGL layer until an item is active — the active thumbnail resolves to full colour while its neighbours stay grey. Colour is a state, not a brand asset.
- Achromatic in practice: **yes, absolutely** — 2 hexes plus 1 grey.

## 4. Composition of the home first screen
The home is **one fixed 100svh screen** — `document.documentElement.scrollHeight` is **900**, i.e. the page never scrolls. The whole thing is a fixed frame with an internal virtual scroll.

What the first screen asserts, and in how many words: the positioning paragraph in the top-right column is **31 words**:
> "The studio is shaped by people who care deeply about design and the process behind. Each project becomes a case study and a meaningful part of our portfolio, developed with care and attention."

Note what it does *not* say: no service list, no "we make X for Y", no claim of results. The assertion is about temperament.

Layout (12-column grid, `--c:calc((100vw - (var(--m-x)*2 + var(--g)*11))/12)`, 1rem gutter and margin):
- **Top-left:** the `OBYS®` wordmark, huge, flush to the corner.
- **Top-right bar** (`#header`, `position:fixed`, `mix-blend-mode:difference`): `Work, About` · `CEST 2:52 AM` · `Contact`. **Nav item count: 2** (plus one contact action). Items are comma-joined by CSS (`#header-menu>a:not(:last-child):after{content:", "}`) so the nav reads as a sentence fragment, not a row of buttons.
- **Upper-right column** (2 columns wide): the 31-word paragraph, then `Contact:` / `info@obys.agency` with an animated underline.
- **Left column, vertically centred:** the **complete index of all 19 project names**, every one visible at once, in `#c9c9c9`, with the active one flipped to `#000`.
- **Dead centre:** a vertical filmstrip of thumbnails moving through the frame, with the OBYS roundel logo (fixed, `mix-blend-mode:difference`, `z-index:9999`) **split in half and pushed apart** — `#logo.is-spread #logo-l{transform:translate(-137%)}` — so the two halves frame the active image like brackets. This is the site's whole signature in one CSS rule.
- **Centre row, full width:** the active project's metadata as one 11px line spread across the grid — `Fashion, Photography` (left of centre) … `Creative Direction, Web Design/Dev` … `10` (right edge, the index).
- **Bottom-left:** the view switcher, `Vertical, Horizontal, Grid`.
- **Bottom-right:** `All rights reserved. ©2026 Obys` in `#c9c9c9`.
- Alignment: hard flush-left for the index and wordmark, flush-right for the paragraph column and counter, dead-centre for the imagery. Nothing is centre-aligned as *text*.
- **Is the work the page? Yes, totally.** There is no hero sentence, no headline, no scroll cue. Two-thirds of the ink on the first screen is either a project name or a project image.

## 5. How work is shown
- **Nineteen projects, all of them, before a single sentence of prose.** The only prose on the home page is the 31-word studio line, which sits beside the work, not before it.
- Presentation is **a list-index cross-referenced with a filmstrip**, and the visitor picks the geometry: three modes toggled bottom-left.
  1. **Vertical** (default) — thumbnails scroll up the centre channel; names list down the left.
  2. **Horizontal** — same content re-laid on the x-axis; the project titles rotate 90° (`#ho-wo-1>.ho-wo-s a{transform:rotate(-90deg)}`) and the metadata moves to the bottom-right.
  3. **Grid** — a faint 12-column contact sheet of every thumbnail at very low opacity, with the numeric indices (`01, 03, 05, 06, 09, 10, 15, 16, 19, 20, 26, 30…`) as the visible layer. Hovering lifts one out: `.ho-wo-2-r{clip-path:inset(50%)}` → `.is-on{clip-path:inset(0%)}` with the image scaling `1.15 → 1` over `1.6s cubic-bezier(.16,1,.3,1)`, while the project title appears at 80px pinned to the bottom edge.
- **Aspect ratios are the client's, not the grid's.** Measured naturals: 1:1 (1440×1440), 4:5 (1440×1800), 2:3 (1440×2160), 3:2 (1439×959). The CSS carries `aspect-ratio:1` ×3 (logo/icons) and `aspect-ratio:.770601` ×1. Images are `.webp` from a headless CMS (`cms.obys.agency/uploads/…`).
- **Captions** are two 11px lines only: sector (`Architecture, Furniture`) and scope (`Creative Direction, Web Design/Dev`) plus an index number. No client blurb, no year on the tile, no result.
- **Hover behaviour:** a hairline underline wipes in from the left on the active list item (`transform-origin:left; transform:scaleX(1)` over `.8s cubic-bezier(.19,1,.22,1)`); grid tiles get a 1px `#0000001a` inset border plus the clip-path reveal.
- **The case page** (`/work/makhno`) is also a single fixed 100svh frame — **zero `<img>` elements, one `<canvas>`**. The entire gallery is drawn in WebGL. The left half stays white and holds four things: project name, sector, scope, and a link reading **`Live Website`**. The right half is a column of full-bleed images scrolling under the split logo. Full body text of the page, in its entirety: "Back / Makhno / Architecture, Furniture / Creative Direction, Web Design/Dev / Live Website". **A case study here contains no writing at all.**

## 6. The path to business
- **Where:** `Contact` sits top-right in the fixed header on every page, and the email is *also* printed in plain text directly under the 31-word studio paragraph on the home first screen.
- **Exact words on the CTA:** the header link says only **`Contact`**. The inline one says **`Contact:`** followed by **`info@obys.agency`** as an underlined mailto. On the case page the outbound CTA is **`Live Website`**.
- **Contact pattern: a raw email address.** No form on the home screen, no Calendly, no "book a call", no chat widget, no newsletter.
- **Pricing: not shown**, and no budget qualifier anywhere.
- The qualifying language lives on `/about`, not on the home: "Obys takes on a limited number of projects each year, partnering with marketing leaders and founders who value authorship, clarity and long-term brand impact." Scarcity plus a named buyer, stated once, off the main path.
- Also on `/about`, the credibility block: founders named with roles (Viacheslav Olianishyn, Design Director; Olha Olianishyna, Managing Director), "intentionally small, under 10 people… Every project is led closely by the founders. No layers. No dilution.", a client list in prose (CNN, Porsche, Hilton, Miro, Makhno, Glyphic Biotechnologies), and an awards list that pre-empts its own vanity: recognition "not as an objective, but as a reflection of consistent standards".
- A live **`CEST 2:52 AM`** clock in the header — the "we are a real place in a real timezone" signal, doing the work a location line would do.

## 7. Motion vocabulary
- **Libraries detected: none. It is all hand-written.** Grepping the single 119KB `d.js`: `lenis` 0, `gsap` 0, `THREE` 0, `ScrollTrigger` 0, `barba` 0, `SplitText` 0, `marquee` 0. Present instead: `lerp` **×45**, `wheel` ×6, `canvas` ×14, `getContext` ×1, `webgl` ×1, `requestAnimationFrame` ×2, `IntersectionObserver` ×1.
- **WebGL canvas count: 1** (`#gl`, `position:fixed`, full-viewport, `pointer-events:none`, confirmed to return a live `webgl` context at 1440×900). **Video count: 0.** On the case page the canvas replaces images entirely (`<img>` count 0).
- **Smooth scroll is bespoke:** the body does not scroll (`scrollHeight` 900, `overscroll-behavior:none`); a wheel handler drives lerped transforms on `will-change:transform` layers. Same result as Lenis, no dependency.
- **Described behaviours:**
  - A **black full-screen preloader** with a centred logo and a right-edge numeric percentage counter (captured mid-load at `50`), plus a 2.5px top progress bar (`#prg`) that wipes `translate(-101%) → 0`.
  - **Line-by-line masking** as the site's universal entrance: `.ln{transform:translateY(102%)}` inside `.ln_{overflow:hidden}`, with 1px bleed padding so descenders are not clipped. Every headline, menu item, clock and metadata row enters this way (`translateY(110%)` on the header children).
  - **The split logo**: fixed centre, `mix-blend-mode:difference`, halves translating ±137%, width transitioning over `1.6s cubic-bezier(.19,1,.22,1)`.
  - **`mix-blend-mode:difference` ×2** — on the logo and on the whole header — so white chrome inverts itself over dark photography and never needs a scrim.
  - Grid hover: `clip-path:inset(50%) → inset(0%)` with a paired `scale(1.15) → scale(1)` image push.
  - Underline wipes with `transform-origin` flipping left/right so the rule leaves the way it came.
  - Easing is disciplined: only two curves in the whole file, `cubic-bezier(.16,1,.3,1)` and `cubic-bezier(.19,1,.22,1)` — both hard-out expo. Durations cluster at `.4s / .6s / .8s / 1s / 1.6s`.
- **What is quiet:** no cursor follower, no scroll parallax, no marquee, no horizontal scroll-jack (the horizontal view is a *mode you choose*, not a hijack), no page-transition library, no video, no 3D scene. The WebGL is used for image treatment only.

## 8. Rhythm
- **Section count on the home page: one.** There are no sections. The home is a single fixed composition with three states. There is no scroll narrative, no capabilities band, no logo wall, no testimonial band, no CTA band.
- Where it goes quiet: **everywhere except the centre channel.** At 1440 roughly 60% of the first screen is empty white. The left column of names and the right column of prose are both narrow (2 of 12 columns); the middle is one image wide.
- Full-bleed: only inside the case pages, where the right half of the frame is edge-to-edge photography with a hard vertical white/image seam down the middle.
- **Footer pattern: there is no footer, and no giant wordmark at the bottom.** The copyright is an 11px `#c9c9c9` line pinned bottom-right of the fixed frame, balanced against the view switcher bottom-left. The giant wordmark is at the *top* left — where a footer wordmark would be a farewell, this is a greeting.
- `/about` is the only page that scrolls, and it carries every conventional item (team, awards, press, socials, services list) that was deliberately kept off the home.

## 9. THE BEST PART
**The whole index is visible at once, and the visitor chooses the geometry rather than the content.**

Nineteen project names sit in the left column simultaneously in `#c9c9c9`, one turning black as it becomes active. Nothing is hidden behind a "view all". Nothing is ranked as "featured". The visitor sees the shape of the entire body of work in the first second, then decides whether to read it as a list (Vertical), a strip (Horizontal), or a contact sheet (Grid). The site never asks "do you want to see more?" — it has already shown everything and is only asking *how you would like it arranged*.

The mechanism underneath is cheaper than it looks, and it is the transferable part: **one grey, one black, one hairline, and position** do all the work of hierarchy. Grey means it exists, black means it is active, an underline wipe means you are here. No boxes, no cards, no shadows, no accent colour.

**Legal for him: yes, and close to ideal for his constraint set.** He has seven receipts with names and numbers — that is an index. Rendering them as a single always-visible grey list with the active one in black requires no client logos (names as *text*, in the same face as everything else, are not a logo wall), no testimonials, and no invented proof. The book's hand-drawn pages, the screenshots and the portrait become the centre channel; the list becomes the left column. The "choose the geometry" idea is optional and probably over-scope for a solo site, but the **complete-index-visible-at-once** principle costs nothing and directly counters the thin-portfolio problem: seven items shown all at once reads as a body of work; seven items shown three at a time behind a "view all" reads as a shortage.

One adjacent move worth taking: the metadata line is **sector + scope + index number**, and nothing else — no outcome claim on the tile. He can carry the numbers inside the case itself while keeping the index line purely factual, which keeps the home page honest and the receipts intact.

## 10. THE TELL
**The numeric-percentage black preloader**, and behind it the decision that made it necessary. The site loads to a full-screen black panel with a centred mark and a counter ticking to 100 before anything appears — the single most recognisable Awwwards-era convention there is, and here it exists only because the whole page is a WebGL canvas that cannot render progressively. A visitor who has seen four studio sites this month has seen this exact screen four times.

The second-order tell is the same root cause: **`scrollHeight` is 900 on every page, and the case study contains zero `<img>` and zero words.** The scrollbar lies, find-in-page finds nothing, the images cannot be saved or linked, and a case study that is purely a moving image column has no argument in it — it is a mood, not a proof. For a studio whose product *is* the surface, that trade is defensible. For a consultant selling a documented method it would be fatal: his artifacts have to be real text and real images in the DOM.

A minor third: the debug column-grid overlay left in the shipped CSS (`#g div{background:red}`) is charming, but it is a designer's in-joke, not a buyer's feature.

## 11. Screenshots
- Home (1440×900): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/obys-home.png`
- Work / case (`/work/makhno`, 1440×900): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/obys-work.png`
- Extra states captured: `obys-home-grid.png` (Grid mode), `obys-home-scrolled.png`, `obys-work-scrolled.png`
- Full-page capture is identical to viewport capture on every page: the document is exactly 900px tall by design.
