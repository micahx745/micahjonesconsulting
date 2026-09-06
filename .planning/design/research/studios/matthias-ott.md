# matthias-ott — https://matthiasott.com/

Kind: studio (solo consultant, "independent web design engineer"). Fetched 2026-09-05.

## 1. Fetch proof
- `https://matthiasott.com/` → HTTP **200**, `<title>` = `Matthias Ott`
- `https://matthiasott.com/web-design-engineering` → HTTP **200**, `<title>` = `Web Design Engineering · Matthias Ott`
- CSS read: `/assets/main-O6AJKMMC.css` (200, 93,409 B). JS read: `/assets/index-BVR6YADZ.js` (200, 327,928 B).

## 2. Type system (from the CSS)
Two licensed retail families, both self-hosted woff2, no Google/Adobe link:
- `@font-face NaN Tresor VAR` — `/assets/fonts/nan-tresor/variable/NaNTresorVAR-subset.woff2`, `font-weight: 300 700`, `size-adjust:100%`, `ascent-override:94%`, `font-display:swap`. This is **display**: it is `--font-family-sans` and therefore `--font-family-h1/h2/h3`. A heavy, quirky grotesque.
- `@font-face NaN Tragedy` — five static cuts (Regular, Italic, Semibold, Bold, BoldItalic), `size-adjust:110%`. This is **text**: `--font-family-base` AND `--font-family-serif`. Body copy is set in it.
- `NaN Tragedy Optical` VF (`100 900`) exists as a third face, used only by `.kontra { font-family: var(--font-family-display-kontra); font-style: italic }` — a single display flourish.
- No monospace face is loaded. `--font-family-mono: "SFMono-Regular", Consolas, …` is a system stack only, used for inline `<code>` (the `<a>` in the essay).

Scale is generated, not hand-picked — a Utopia-style two-ratio system:
`--baseFontSizeMin: 1.125rem`, `--baseFontSizeMax: 1.3125rem`, `--minWidth: 400`, `--maxWidth: 1600`, ratios interpolated between minor-third and perfect-fourth. Body is ~19px→24px. Resulting steps:
- `--font-size--2: clamp(.8247rem, .8191rem + .0279vw, .8442rem)` (tags, meta)
- `--font-size--1: clamp(.9896rem, .9508rem + .1939vw, 1.1253rem)`
- `--font-size-0: clamp(1.1875rem, 1.0982rem + .4464vw, 1.5rem)` — body
- `--font-size-1: clamp(1.425rem, 1.2609rem + .8207vw, 1.9995rem)`
- `--font-size-2: clamp(1.71rem, 1.437rem + 1.3648vw, 2.6653rem)`
- `--font-size-3: clamp(2.052rem, 1.6232rem + 2.1441vw, 3.5529rem)`
- `--font-size-4: clamp(2.4624rem, 1.8128rem + 3.248vw, 4.736rem)` — hero `h1` (`.elevator h1`)
- `--font-size-5: clamp(2.9549rem, 1.9954rem + 4.7974vw, 6.3131rem)`
- Footer wordmark: `font-size: clamp(5rem, .714rem + 17.14vw, 20rem)`, `font-weight:700`, `text-transform:uppercase`, `text-box-trim:trim-both; text-box-edge:cap alphabetic`. That is the ONLY uppercase display use on the site.

Letter-spacing, all of it: `h1 -.0075em`; other headings `-.00625em` / `-.01em` / `-.025em`; the hero resolves to `-.01em`; and `.1em` + `.5px` on the two tracked label cases. Tight on display, near-zero elsewhere. No wide-tracked uppercase eyebrow anywhere.

The clever part: hero weight is a **computed variable-font weight**, not a constant —
`--_initial-weight: 380; font-weight: calc(200 + (var(--_initial-weight) - 200) * min(1, var(--font-weight-multiplier)) + …)`, with `strong`/`a` at `--_initial-weight: 650`. One global multiplier can push the whole page's weight axis at once. Line-height likewise: `line-height: calc(var(--mixed-air, 1) * 1.05)`.

## 3. Palette (from the CSS)
A full generated ramp system (yellow / light-orange / orange / red / violet-red / magenta / indigo / gray / sand, each 0→105 in 5-step increments, declared twice: `rgb()` fallback then an `@supports (color: oklch())` override). Almost none of it is used. What actually renders:
- Ground: `--color-root-background: #efefef`; `--light-bg-primary: var(--gray-10)` = `#e6e6e7` / `oklch(92.5% .002 274.5)`. Dark-mode ground `--gray-102` `#15161a`.
- Type: light-mode ink is `--sand-105` `rgb(19,20,18)`; dark-mode ink `--sand-0` `rgb(239,240,237)`; secondary `--sand-30` `rgb(197,198,195)`.
- Grey ramp `--gray-0 #f0f0f1` … `--gray-105 #0b0c10`, chroma `.001–.012` at hue 274.5 — a blue-cast neutral, effectively achromatic.
- **One accent**: `--accent-color: light-dark(var(--indigo-80), var(--indigo-80))` = `rgb(73,56,255)` / `oklch(52.6% .286 274)`. Identical in both modes. It appears as: link `text-decoration-color`; the `aria-current=page` nav pill (`color:#fff; background:var(--indigo-80); box-shadow:0 0 0 3px`); and the mixer knob chrome. That is it.
- Second, near-invisible accent: `--color-focus` = magenta `rgb(245,52,182)` light / `rgb(215,0,157)` dark — focus ring only.
- Raw hex counts in the stylesheet: `#fff` ×14, `#000` ×4, `#3dffbb` ×4, `#634fcf`/`#462cff`/`#0f27aa` ×2–3 — all of the colourful ones live inside the mixer's SVG gradients, not on the page.

**In practice: achromatic.** Grey paper, near-black ink, one electric indigo doing 100% of the accenting, plus a photograph. `color-scheme` is honoured via `light-dark()` with a `[data-color-scheme]` override — a real toggle, not a media-query-only theme.

## 4. Composition of the home first screen
It asserts a sentence, not a slogan. The `h1` is **40 words** of running prose at `--font-size-4` (~76px at 1440):
"Hi, I'm **Matthias Ott**, independent web design engineer, speaker, and teacher for interface prototyping. I run **workshops** on web design and web accessibility and write the **Own Your Web** newsletter."
Four phrases are bolded links inside the sentence — the nav *is* the headline. Everything left-aligned, ragged right, one column. Nothing on the site is centred.

Layout is three rails: a left gutter carrying the wordmark set `writing-mode: vertical-lr` + `transform: rotate(-180deg)` ("MATTHIAS OTT / Web Design Engineer" reading bottom-to-top) beside a circular indigo logo mark; a wide centre measure; a right rail holding the nav.

Nav: **8 items** (Home, Notes, Articles, Newsletter, Speaking, Workshops, Links, About) in a `position: sticky` right-hand vertical stack at ≥48em, wrapping to a horizontal flex row below. Current page is a filled indigo pill. Above it sit two icon buttons only: colour-scheme, and the style mixer. No hamburger, no hidden menu, no logo-centred bar.

A ~140px portrait of his own face (`.avatar--home { width: clamp(7.75rem, 5.386rem + 11.82vw, 14.25rem); transform: rotate(-3deg); margin-top: -1.5rem }`) floats right of the sentence, tilted three degrees, with a chromatic border.

**The work is not the page. The writing is the page.** Below the sentence: `How can I help you grow?` and two service cards, then `Latest Posts` and 21 post excerpts, then pagination running to page 19.

## 5. How work is shown
There is no portfolio. No tiles, no case studies, no client grid, no video — so no aspect ratios to report. Work is shown three ways:
1. **21 full-excerpt post cards** on the home page — `Posted <date> by Matthias Ott in Notes`, a display-weight linked title carrying soft hyphens (`Ad Infini­tum`, `Buck­le Up`), 3–8 lines of the real opening paragraph, a tag row (`#google #AI #advertising`), and a **webmention count as the social proof**: "390 Webmentions", "141 Webmentions", "52 Webmentions". The proof is the conversation the writing caused, not a logo.
2. **The site itself as the artifact** — the footer credits its own materials ("Made with HTML, CSS, enhanced with JavaScript, powered by Craft CMS • Set in NaN Tresor and NaN Tragedy") and JS appends "This page loaded in 0.4 seconds. 🚀" to the copyright line.
3. **Named clients in a sentence, not a wall** — on `/web-design-engineering`: "I've worked with teams at Bosch, SAP, Deutsche Bahn, Siemens Healthineers, and many more."

Hover on post titles: underline only (thick, indigo `text-decoration-color`). Zero projects appear before prose — prose is the entire ladder.

## 6. The path to business
Two doors from the hero, framed as a question rather than a pitch: **"How can I help you grow?"** then two white raised cards on the grey ground:
- **Web Design Engineering** — "I design and build modern and resilient websites and products for the Web. Let me help you build yours." CTA: `More about my services →`
- **Workshops & Training** — "Over 400 designers and developers from all over the world have joined me for a live workshop – in-person or online." CTA: `More about my workshops`

`/web-design-engineering` is the sales page and it is a **~1,100-word essay**, not a services list. It opens cold on a four-paragraph anecdote about a Figma card component that screen readers announce twice — a real defect, no client named — and lands on "It falls into the space neither side owns, the space where design and engineering overlap. That's where I work." Then: *Why the Design-Engineering Gap Exists* / *Working in the Material* / *What Changes* / *Nearly 20 Years of Experience* / *Let's Talk*. Numbers are specific and self-owned: "over 30 hands-on workshops for Adobe", "teach Interface Prototyping at Muthesius Academy of Fine Arts and Design since 2012", "over 2,400 readers". The CTA at the end is two words: **"Write me"** (a mailto).

No pricing. No form. No calendar. Contact is a footer section headed **"Get in touch!"** carrying a `mailto:` and a **`tel:+49 177 654 6175`** — both set italic semibold at `--fluid-1/2` with `text-decoration-thickness: 3.5px`. Publishing the phone number is the whole trust move.

## 7. Motion vocabulary
Detected in `/assets/index-BVR6YADZ.js`: **GSAP 3.13.0** with `ScrollTrigger`, `Observer` and `SplitText` registered. **No Lenis, no smooth-scroll hijack, no Three/WebGL.** `<canvas>` ×1 (`#sparkle-canvas`), `<video>` ×0, `<img>` ×3 on the home page.

Every behaviour on the site:
- **Hero entrance**: `gsap.from(".elevator h1 a strong", { duration: .46, scale: 2, autoAlpha: 0, stagger: .035, ease: "power3.out" })` — only the four bolded link-phrases pop in from 2× scale. The sentence itself never animates.
- **Footer wordmark marquee**: an infinite `horizontalLoop` over `.hi-my-name-is span` ("MAT / THIAS / OTT"), paused by an `IntersectionObserver` when off-screen, with `timeScale` tied to scroll direction — `ScrollTrigger.create({ trigger: ".marquee", start: "top bottom", end: "bottom top", onUpdate: n => gsap.timeline().to(loop, { timeScale: .5 * n.direction, duration: 4.5 }).to(loop, { timeScale: .25 * n.direction, duration: 4.5 }, "+=10") })`. Scroll up and the name reverses, then decays. It `kill()`s and rebuilds on resize.
- **The Kontrastor 82M** (see §9) — an SVG `feColorMatrix`/`feBlend` chromatic-aberration filter applied to `.site-header, #mainnav, #main, .info-card, .site-footer`, plus a cursor-following particle field on `#sparkle-canvas`. Both sit at zero by default.
- Logo mark on hover: `transform: rotate(-20deg) scale(1.1)`.
- MPA `@view-transition` rules are present in the CSS (and are the subject of one of his own posts).
- **What is quiet**: no pinning, no parallax, no horizontal gallery, no page-load curtain, no custom cursor by default, no marquee anywhere but the footer name, and no reveal-on-scroll on body copy or on any of the 21 post cards. The reading surface does not move at all.

## 8. Rhythm
Home = four content sections before the footer: hero sentence → two-card service teaser → 21-item post list → pagination (`1 2 … 19 Next`). It never goes full-bleed and it never goes quiet-and-empty; it is a dense, evenly spaced reading column with hairline rules between posts. The only release of pressure is the footer.

Footer pattern: the contact block ("Get in touch!" + email + phone) beside a nav headed **"Click here!"** (visually; `Footer navigation` for screen readers) with 12 links, a `Socialize!` column of 11, a legal row — and then the **giant wordmark**: MAT·THIAS·OTT at up to 20rem, uppercase, 700 weight, scrolling. Below it, the materials credit line and the page-load-time boast.

## 9. THE BEST PART
**The "Kontrastor 82M – Dynamic Cascading Style Enhancer."** A hardware-synth panel hidden behind one corner icon, whose seven custom-element knobs are each bound to a CSS custom property the design system already consumes:

| knob label | custom property | range | what it changes |
|---|---|---|---|
| Pitch | `--hue-rotate` | 0–360 | site hue |
| Saturation | `--saturate` | 0–3.5 | chroma |
| **Air** | `--air` | 0–3 | line-height (`calc(var(--mixed-air) * 1.05)`) |
| **Grit** | `--grit` | 0–3 | **the type-scale ratio itself** — `--ratioMin`/`--ratioMax` interpolate minor-third → perfect-fourth by `--grit` |
| Jitter | `--glitch` | 0–42 | chromatic-aberration SVG filter |
| Sparkle | `--sparkle` | 0–10 | cursor particle canvas |
| Mix | `--mix` | 0–1 | wet/dry for all of the above |

Settings persist to `localStorage` (`84M-mixer-settings`) with a two-day staleness window, `safeRange: { "--air": [.4,2.2], "--grit": [.4,2.2] }` clamps, and a written-out recovery line: *"You went a bit wild with the style mixer last time — I restored the default look so the site stays readable."*

The lesson is not the toy. It is that **the toy is proof of the pitch**. He sells "I hold the design lens and the engineering lens at once"; the mixer shows, live, that his design system is parameterised deeply enough for a stranger to turn its typographic ratio with a knob and not break it — guardrails and apology copy included. It is a portfolio piece that needs no client's permission to publish.

**Legal for Micah?** Yes, and the pattern transfers. He owns a book with hand-drawn pages; the equivalent move is a control that operates on his own artifact in public — the page-6 wall chart already animating in `/playbook`, extended into something a visitor can actually turn, or one knob that redraws a real diagram from real numbers. The transferable rules: (a) it sits behind one icon and is off by default; (b) it is bounded and self-restoring, so the reading surface can never be destroyed; (c) it shows the exact capability being sold. Also directly copyable and needing no sign-off from anyone: **the anecdote-first sales page** (a real defect, no client named, ending "That's where I work"), **the two-word CTA** ("Write me"), **the phone number in the footer**, and **naming clients inside a sentence instead of building a logo wall**. Two things he must NOT copy: the webmention counts (he has no equivalent artifact) and the "over 2,400 readers" style metric unless he holds the receipt.

## 10. THE TELL
The `/now` and `/uses` links in the footer, sitting beside a "This page loaded in 0.4 seconds. 🚀" self-report and a page-materials colophon. That cluster is the personal-site-of-a-web-person genre signature: it addresses peers, not buyers, and it is exactly the dev-Twitter tell already banned in this project's blueprint §13. Second-order tell: the mixer's costume — rack-unit chrome, radial-gradient power button, an "82M" model number — is a skeuomorphic-synth trope that reads as a 2025 web-craft-scene in-joke. Steal the mechanism; leave the costume.

## 11. Screenshots
- `…/scratchpad/studios/matthias-ott-home.png` — 1440×900 viewport, full page capped at 3 viewports (1425×2700 captured).
- `…/scratchpad/studios/matthias-ott-work.png` — `/web-design-engineering`, same settings.
