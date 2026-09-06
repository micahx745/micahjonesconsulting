# psyop — psyop.com (built by Studio Freight)

## 1. Fetch proof
- Live URL: https://www.psyop.com/ — HTTP **200** (curl + Playwright navigation both 200).
- `<title>`: **`Psyop Media Group`** (verified in-page via `document.title`).
- Secondary page fetched: https://www.psyop.com/work — `<title>`: **`Work | Psyop`**, doc height 72,540px.
- Studio: **Studio Freight**. Pointer / case study: https://studiofreight.com/work/psyop — `<title>`: **`Psyop | Studio Freight`**.
- What the case-study page says they did (quoted): the logo "carried almost everything, without typographic language or visual architecture"; after launch stakeholders repeatedly said "I didn't know you guys did that" about work previously buried by navigation. Services listed: Messaging, Visual identity, Digital design, Development. Deliverables named: New Heterodox Mono + FT Calhern type system, Siren Red accent, a filterable and searchable work index with shareable multi-select URLs for sales, per-director pages, camera-framing notches as tile hover states.
- Corroboration in the live CSS: the fonts the case study names are the two `@font-face` families actually served (`/_nuxt/fonts/new-heterodox-mono-400.woff2`, `ft-calhern-300/500/600.woff2`), and `--theme-contrast` is `red` in both themes. The claim checks out against the build.

## 2. The client and the product
Psyop Media Group — a 25-year-old animation/VFX/live-action studio collective (Netflix, Nike/Hyperice, Oakley, Google Maps, Phish) selling its directors and its reel to agencies and brands; the site sells access to the back catalogue, not a product.

## 3. First screen
- Asserts: **"An independent, artist-led studio collective built on craft and innovation"** — **11 words**, one sentence, no sub-dek, no button. Perfectly aligned with the client: the only claim is independence plus craft.
- The hero **IS type**. On desktop the first paint is white paper, black mono capitals, nothing else. Zero videos, zero canvases, one `<img>` in the DOM at load. The reel is withheld.
- Nav: **5 items** (WORK / STUDIOS / ABOUT / PSYOP / CONTACT), not hidden, distributed edge-to-edge across a 38px sticky bar with a `P.` wordmark pinned far left. Justified across the full 1440 — no logo-left/menu-right cluster. Mobile (390): hamburger, three bars, same wordmark.
- Document height at 1440x900 is **900px exactly**. The homepage is one screen and does not scroll.

## 4. Type system (from the CSS)
Two families, both self-hosted woff2, both named in the case study:
- **New Heterodox Mono** (`--font-mono`, w400 + w700) — the display face. `h1`/`h2` are mono, uppercase.
- **FT Calhern** (`--font-sans`, w300, w300 italic, w500, w600) — text, UI, labels.
- Display size: `--font-size-h1: 48px` mobile, `clamp(56px, 1.9vw + 28.64px, 80px)` at ≥1024px.
- Display tracking: `letter-spacing: .01em`, `line-height: 90%`, `text-transform: uppercase`.
- `h2`: 32px mono, `.02em`. `h3/h4/h5`: 16px mono, `.04em`, uppercase.
- Body/links/buttons: 16px FT Calhern **300**, `.02em`, `line-height: 140%`.
- Labels/nav/filters/footer: 12px FT Calhern **500**, `.04em`, uppercase — one label size used everywhere.
- Global `font-feature-settings: "case" on` so punctuation lifts inside all-caps settings.
- **Mono is the display face and the sans is the workhorse** — the inversion of the usual arrangement, and the whole reason the page reads as a title card rather than a website.

## 5. Palette (from the CSS)
- Ground: `--theme-bg: #fff` (`.theme-light`); the dark theme flips to `#000` / `#fff`.
- Type colour: `rgb(0,0,0)` on 290 elements; `rgb(255,255,255)` on 75 (footer wordmark plus overlaid tile labels).
- Backgrounds actually painted at 1440: `#fff` x3, `#000` x3, **`rgb(255,0,0)` x1**. That is the entire palette.
- Accent: `--theme-contrast: red` — identical token in light and dark theme. Pure `red`, not a tuned hex. Frequency on the homepage: exactly **one** element (the `(ALL WORK)` link on hover, and always-on at 390). On /work it appears on the six `(VIEW)` labels, the active-filter state, and a dot beside the active nav item.
- It is **not** the client's brand colour doing the work — Psyop's identity was black-and-white wordmark-only before this project; Studio Freight invented Siren Red for them and then spends it about six times a page.

## 6. Narrative arc (homepage, in order)
1. **Sticky header** (38px) — wordmark, five nav words, hairline rule. Silent.
2. **The statement** — three centre-weighted mono rows on a 12-column grid, each row indented differently (`grid-column: 2/-1`, then `4/-1` plus 36px, then `2/-1`), so the paragraph staircases down the page.
3. **`(ALL WORK)`** — the single link, centred under the statement, in parentheses. The whole ask.
4. **Fixed centre label** — `PSYOP MEDIA GROUP`, 12px, `position: fixed` at page bottom-centre, on every route.
5. **Footer wordmark** — `P . M . G` set enormous and spread edge-to-edge, letters and periods as separate grid cells so the mark becomes the page's baseline furniture.
6. **Footer marquee** — one press headline scrolling on loop: "INSIDE PSYOP'S NEW MEDIA GROUP WHERE INDEPENDENCE IS 'TRUE DIFFERENTIATOR'", linked out. Plus `© 2026 PSYOP`, `INSTAGRAM LINKEDIN SEARCH`.

That is the entire homepage. The story is told in one breath and one link.

## 7. Motion grammar
Libraries actually in the DOM: **Lenis** only (`<html class="light lenis">`, Lenis CSS shipped in the entry bundle). Nuxt 3 SPA (`/_nuxt/`), one app JS chunk plus a Cloudflare beacon. **No GSAP. No Three.js. No WebGL. Zero `<canvas>`.** Zero `<video>` at load; **3 videos and 4 images injected on hover**. Everything below is CSS keyframes and transitions.

- **Entrance (1.4s, `cubic-bezier(.48,0,.1,1)`)** — each headline line exists twice, stacked; `rotate-top` / `rotate-bottom` pairs roll one out and the other in like a split-flap board, while `unmask-left`, `unmask-bottom`, `unmask-right` slide their lines in from three different edges. Different lines arrive from different directions; the composition assembles rather than fades. Gated by an `--animations-ready` class that holds every animation at `animation-play-state: paused; opacity: 0` until the app says go.
- **THE hover reveal (the one moment that carries the page)** — hovering `(ALL WORK)` adds `.page--home__intro--hovered`, which slides the three headline rows apart horizontally (`translate(8.33vw)`, `translate(-18.89vw)`, `translate(8.33vw)`, `.65s var(--ease-in-out-quart)`) while three muted project reels fade into the emptied white space in a broken grid. The headline is `color: var(--theme-bg); mix-blend-mode: difference` at ≥800px, so the type does not sit on the video — it inverts through it, going ghost-white over the dark plate and staying black over the paper. The link itself flips to red with an arrow. An empty page becomes a showreel only when you reach for it, and reverses when you let go.
- **Mobile equivalent** — the hover mechanism is dropped, not faked: `.page--home__mobile-media` shows one always-on 4:5 reel below the statement, and the rows reveal with `clip-path: inset(0 0 100% 0)` plus translateY, staggered 200 / 375 / 550 / 725ms on a bespoke spring `linear(0,.688 18.7%,1.019 34.9%,…)`.
- **List hover (/work, /studios)** — `.global-list__item:after` is a 1px red rule that goes `scaleY(0)→1` from the top-left over `.45s`; simultaneously a 160px square thumbnail fades in at the row's left edge (`.4s`) and a red `(VIEW)` fades in at grid column 12 (`.5s`).
- **Filters** — `.filtered-layout__filters` is `position: sticky; top: var(--header-height)` with a full-height right hairline; active filters turn red, shift `translate(14px)` and reveal a 10px check (`375ms ease-out-quint`).
- **Page transitions** — `.page-enter/leave-active { transition: opacity .6s }`; a Vue-router crossfade, no flourish.
- **Marquee** — footer press headline only.
- Deliberately still: no cursor follower, no parallax, no scroll-jacking, no pinning, no horizontal scroll, no velocity skew, no scrub. The homepage does not scroll at all. Lenis is present for the long index pages and does nothing on the home route.

## 8. Commerce / the ask
No commerce. The ask is `(ALL WORK)` — three words in parentheses, 56–80px mono, dead centre, the only link in the body of the page. Volume: quiet in colour (black on white) and enormous in size; it turns red only under the cursor. Secondary asks are nav-level (`CONTACT`) and footer-level (`INSTAGRAM`, `LINKEDIN`, `SEARCH`), all at 12px. There is no button, no form, no phone number, no "book a call" on the homepage.

## 9. Rhythm
Three zones on one screen: header rule / statement block / footer wordmark. Full-bleed everywhere — `--layout-margin` is **12px**, so content runs almost to the glass on a 12-column grid with 12px gutters. The page is roughly 55% empty white by area; the quiet is between the statement and the footer, and that gap is exactly the space the reels fill on hover. Footer pattern: giant spread wordmark, looping press-headline marquee, copyright, two socials, search — all 12px caps. `/work` inverts the rhythm entirely: sticky filter rail at 200px max, irregular two-up tile grid, 72,540px tall.

## 10. THE BEST PART for Micah
**The hover-row list from `/work` — a text-only list that grows evidence on hover.** Every row is set as plain type (client name, one category label). On hover it does three cheap things at once: a 1px accent hairline scales in across the row's top edge from the left (`transform: scaleY(0→1); transform-origin: top left; .45s`), a single 160x160 thumbnail fades in at the row's left margin (`opacity .4s`), and a `(VIEW)` label fades in flush right (`opacity .5s`). Nothing is visible at rest, so the page reads as a clean typographic index.

Why it fits Micah exactly: he has **seven receipts with names and numbers, one anonymous quote, screenshots, no logos**. Set the seven receipts as seven rows of type — that is an honest, complete list at rest, and it needs no logo wall to look substantial. Hovering a row spends one screenshot he already owns and one copper hairline. Rows he has no image for simply show the hairline and the label; the mechanism degrades per-row without looking broken, which a logo grid cannot do. It is pure CSS transitions on opacity and transform — no library, no scroll listener, no GSAP — and sits inside the House Lights motion ban.

The second, cheaper borrow: **the withheld hero**. Psyop's first screen is 11 words of type and one parenthetical link, and the proof only appears when the visitor reaches for it. Micah's `(ALL WORK)` is `(READ THE BOOK)` — one link, set at display size, in parentheses, as the entire ask.

## 11. THE TELL
**The three reels are the budget.** The hover mechanism is free; what makes it land is 25 years of Netflix, Nike and Google broadcast animation sitting behind the type, colour-graded and silent. Nobody should try to fake that with stock footage or an AI loop — the same interaction with generic B-roll reads as a screensaver. Second tell: the two bespoke/licensed typefaces (New Heterodox Mono, FT Calhern) are a paid identity deliverable, not a Google Fonts pairing. Copy the inversion (mono as display, sans as text) with faces already licensed here; do not copy the faces.

## 12. Screenshots
- `client-work/psyop-top.png` — first screen, 1440x900.
- `client-work/psyop-mid.png` and `client-work/psyop-late.png` — **identical to `-top`**: the document is exactly 900px, one viewport, so the 35% and 70% scroll positions resolve to y=0. Reported as observed, not as a capture failure.
- `client-work/psyop-390.png` — mobile first screen (hamburger, left-set 48px mono, red `(ALL WORK)`, one 4:5 reel below).
- Supplementary (the page's motion is hover-driven rather than scroll-driven, so the standard slots do not capture it):
  - `client-work/psyop-hover-allwork.png` — the hover reveal with three reels and the difference-blended type.
  - `client-work/psyop-work-index.png` and `client-work/psyop-work-scrolled.png` — the `/work` index and its sticky filter rail.
- Raw CSS pulled for the type and colour claims: `client-work/psyop-entry.css`, `client-work/psyop-home.css`.
