# Studio Freight — /work (slug: sf-work-1)

## 1. Fetch proof
- URL: https://studiofreight.com/work — `curl -L` returned **200**, 563,017 bytes.
- `<title>` (verbatim): `Work | Studio Freight`
- Case page fetched too: https://studiofreight.com/work/la-marzocco — `<title>` `La Marzocco | Studio Freight`
- Stack: Nuxt (`/_nuxt/*.js`), Storyblok CMS, images served AVIF via `a2.storyblok.com`.

## 2. Type system (from the CSS)
Three `@font-face` families, all self-hosted `.woff2`, `font-display:swap`. **No Google/Adobe link. No sans-serif anywhere in the stylesheet.**

| family | role | declarations |
|---|---|---|
| `publico-text-mono-roman` | DISPLAY + all labels/UI | 40 |
| `jjannon-regular` | TEXT (body prose) | 32 |
| `publico-text-mono-semibold` | emphasis / `.bold` | 21 |

The display face is a **monospaced serif** (Publico Text Mono). The site's whole voice comes from running a mono-serif at billboard size instead of the usual grotesk. The text face is a Jannon revival — a serif. There is no sans on the site.

Scale, exactly as authored. Every `font-size` is a `clamp()` even when both ends are equal, so the ramp is one generated system:

- `.display` — `clamp(126px, …15.83vw…, 286px)`, mono-roman, **letter-spacing −2.88px**, line-height 80%, `text-transform:uppercase`; mobile hard-set 210px
- `.h1-pr` — `clamp(104px, …8.33vw…, 184px)`, −2.88px, 80%, uppercase; mobile 144px
- `.h2-pr` — 64px flat, −1.28px, 80%, uppercase
- `.h3-pr` — 42px flat, letter-spacing `1%`, line-height 116%, uppercase
- `.h3-ps` (semibold) — `clamp(36px…64px)`, 1%, 116%, uppercase
- `.h3-jj` — `clamp(36px…64px)` jjannon, ls 0, 116% — the only large non-uppercase step
- `.h4-jj` / `.h4-ps` — 26px, ls 0, 124%
- `.p-nav` — 56px mono-roman uppercase, 80% — the full-screen menu size
- `.p` — `clamp(18px…24px)` jjannon, ls .18px, **line-height 132%**
- `.p-small` — `clamp(16px…18px)`, .16px, 132%
- `.px-small` — 14px jjannon, .14px, 112%
- `.pxx-small` — 14px **mono-roman**, .14px, 112% — the tile-caption / header-nav class

Two tracking regimes: display is negatively tracked hard (−2.88px at 184–286px), labels positively (`.14px`, `1%`). `text-transform:uppercase` appears **33 times** and is confined to mono-roman — uppercase is a property of the display/label face, never of the body face. Body copy is never uppercase, never mono.

Weights: only `font-weight:400` in the CSS. `.h4-ps` declares 600 but semibold is a separate file, not a weight axis. No variable-font axes.

## 3. Palette (from the CSS)
`:root` defines a generated alpha ladder (`--black-5` … `--black-95`, same for white, dark-grey, blue) but only five base hexes exist. Raw hex counts in `entry.css`: `#fefdfc` ×3, `#1a1a1a` ×3, `#dadada` ×2, `#457db6` ×1, `#00ff6a` ×1.

- Ground: `--white:#fefdfc` — a warm off-white, not `#fff` (confirmed live: `body` computed `rgb(254,253,252)`).
- Type: `--theme-fg:#000`, pure black on the light theme.
- Greys: `--dark-grey:#1a1a1a` (`--theme-contrast`), `--grey:#0000001f`, `#dadada`.
- Accents: `--blue:#457db6` and `--green:#00ff6a` — each defined **once**, neither visible on /work. Effectively **achromatic in practice**; all color on the page comes from the client thumbnails.
- Themes are two classes, not a toggle: `.theme-light{--theme-bg:#fefdfc;--theme-fg:#000}` / `.theme-dark{--theme-bg:#000;--theme-fg:#fefdfc}`. `<html>` carries `theme-light lenis`.
- The fixed header is `mix-blend-mode:difference` with `color:var(--white)` and the wordmark `filter:invert(1)` — the chrome inverts itself over whatever thumbnail scrolls beneath instead of owning a color.

Grid tokens: `--layout-columns-count:6` mobile → **12** at ≥900px, `--layout-columns-gap:8px`→12px, `--layout-margin:12px`. A 12px page margin at 1440 is essentially full-bleed. Spacers are a fixed ladder: 2/4/6/8/12/16/24/32/40/48/64/88…164.

## 4. Composition of the first screen
It asserts **one word**. The `<h1>` is a single rotating noun — SSR ships `Strategy`, the live render showed `Mettle` — set at 144–184px mono-roman uppercase, with a small square image (`aspect-ratio:1/1`, height matched to cap height via `--title-height`) butted against its left edge like an illuminated initial. That is the entire headline. **No positioning sentence, no dek, no services list above the fold.**

Header: 40–48px tall, fixed, one line, 14px mono, four clusters across the 12-col grid — wordmark (left) · `• Work` · `Grid / List / Zoom` (view modes) · `Home, Info, News, Aeon` (comma-separated inline run) · `Contact` (right). Six destinations plus three view modes, all visible; no hamburger at desktop, though a full-screen 56px `p-nav` menu exists for mobile. A fixed footer bar sits at the viewport bottom at every scroll position: `IG / LI` · `Studio Freight` · `©2026 / Terms`.

Below the word: `Filter (+)`, then the grid. **The work is the page** — 29 project tiles begin ~280px down and run to 5,501px.

## 5. How work is shown
- Grid of 29 tiles on the 12-column grid, each carrying an inline `grid-column: span N` with N ∈ {2,4,6} — one 6-span hero tile, 4-span mids, 2-span smalls, packed left-to-right, `row-gap:32–48px`. The rhythm is authored per project, not uniform.
- `aspect-ratio:auto` — thumbnails keep their native ratio (the only fixed ratio in the stylesheet is `1080/1350` for a portrait media block). Tiles are top-aligned (`align-self:self-start`), so bottoms are ragged. That raggedness is the layout's signature.
- Caption is two 14px mono lines under the image: project name, then a `.sector` label at `opacity:.64`.
- Hover: `.media__overlay` fades to `opacity:1`, revealing a 20px arrow SVG centred on the thumbnail with `mix-blend-mode:difference`. No zoom, no tilt, no cursor follower.
- Filtering does not remove: non-matching tiles go to `opacity:.32` + `pointer-events:none` and stay in place. You always see the whole body of work.
- Three view modes (Grid / List / Zoom) as a persistent 14px header control.
- **Prose before the work: zero words.** The only text above the grid is the one-word title.
- Case page (`/work/la-marzocco`, scrollHeight 13,027px) opens on a full-bleed photograph of the *printed artifact* — no headline in the first screen. 18 images, 2 videos, 0 canvas. Sections labelled in mono: `Info` → six body paragraphs → **`Receipt`** (their word for the client quote, attributed by name and title) → `Services` → `Labels` → `Links` (Are.na, Savee) → `More` (three sibling projects) → `Contact`.

## 6. The path to business
- Header far-right: `Contact`.
- Every case page ends with `Contact` / **"Work with us"**.
- The index ends in a pre-footer that is the loudest thing on the site: `.work-pre-footer` with **`padding:288px 0`**, the words **"WORK WITH US →"** set in `.h1-pr` (104–184px, −2.88px tracking) as stacked lines, with a small thumbnail sitting *inline inside the line* (`aspect-ratio:var(--ratio)`, grid-row spanning both lines). Hover fades the whole block to `opacity:.32` — the CTA dims when you point at it rather than lighting up.
- The arrow is a separate `span.arrow`, absolutely positioned off the last line at 64px so it does not scale with the 184px text.
- No pricing. No calendar embed. No form on this page — `Contact` is a route.
- Proof mechanism: one named `Receipt` quote per case, never a wall, no logo bar.

## 7. Motion vocabulary
- **Lenis** — three occurrences in the HTML, `.lenis` class on `<html>`, `data-lenis-prevent` on the nav scroller. Smooth scroll is the baseline.
- **three.js: present in config but explicitly disabled** — `three:{enabled:false,options:{alpha:false,antialias:false,stencil:…}}`. They built the WebGL layer and turned it off. **0 canvas elements.**
- 0 `<video>` on the index; 2 on the case page. 32 `<img>`, all AVIF.
- GSAP: not detected. No marquee, no horizontal gallery, no cursor follower, no scroll-jack.
- The entire transition vocabulary in `entry.css` is `transition:opacity .1s` and `transition:opacity .2s ease`. **Opacity is the only animated property.**
- Entrance: `.work-grid__grid__item{opacity:0}` + `.stagger-item{opacity:0}`, resolved by JS to `visibility:visible;opacity:1` — a staggered fade-in, nothing else.
- Quiet: no parallax, no pinning, no page-transition choreography, no hover scale. The only "effect" is `mix-blend-mode:difference` on the header and on the hover arrow.

## 8. Rhythm
Index = four zones over 5,501px: (1) one-word title + inline square image, (2) `Filter (+)` control, (3) 29 tiles in an irregular 2/4/6-span mosaic with 32–48px gutters, (4) the 288px-padded "WORK WITH US →" block. Then a fixed footer bar present at every scroll position rather than arriving at the end. **There is no giant wordmark footer** — the giant type is spent on the CTA instead. Full-bleed happens at tile level (12px page margin), not as a separate device.

## 9. THE BEST PART — and is it legal for Micah
**The case page opens on a photograph of the physical artifact, and the client quote is labelled `Receipt`.**

The La Marzocco page's first screen is a top-down photograph of the finished book on terracotta tile, coffee cups in frame — no headline, no logo, no dek. The proof is the object, shot as an object. Then, deep in the page, a section header that just says `Receipt`, holding one named quote.

That is exactly Micah's inventory. He has a book with hand-drawn pages, a photograph of himself, screenshots, and seven receipts with names and numbers. **Legal, and unusually well matched.**

- Open the case on a photograph of the actual book, a hand-drawn spread visible, shot flat in real light. No headline above it. The artifact is the assertion.
- Steal the *word* `Receipt` as the section label for proof. It reframes "testimonial" — which he mostly does not have — as "the thing you got back", which is what his seven numbered receipts already are. One per case, named where naming is allowed, never a wall.
- Steal the filter behaviour: dim non-matching items to 32% instead of removing them. With a small body of work, never hiding any of it is a feature.
- Steal the CTA proportion: the ask gets the largest type on the site and 288px of air, and it dims on hover instead of glowing.

Not legal / not applicable: the 29-tile mosaic needs volume he does not have, and the rotating one-word `<h1>` only works when the visitor arrived already knowing who you are.

## 10. THE TELL
The rotating one-word headline (`Strategy` / `Mettle`) over a 5,000px grid with no sentence anywhere above the fold. It is the 2024–26 agency template: a noun, a mono face, and the assumption the visitor arrived pre-sold. Also templated: the `Filter (+)` and `Grid / List / Zoom` triple-view control — portfolio-CMS furniture; three ways to look at 29 thumbnails serves the studio, not the buyer. And the disabled-but-shipped three.js config is its own tell: the WebGL layer was built, switched off, and the dead config still rides in every payload.

A solo consultant asserting one abstract noun reads as evasive, not confident. Micah's first screen has to say what he does in a sentence.

## 11. Screenshots
- Home/index: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-1-home.png` — 1440×900 viewport, full-page capped at 2700px (3 viewports)
- Case page (La Marzocco): `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-1-work.png` — same settings
