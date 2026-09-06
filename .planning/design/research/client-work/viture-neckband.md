# VITURE Pro Neckband — client build by darkroom.engineering

## 1. Fetch proof
- Live URL: `https://www.viture.com/neckband` — **HTTP 200**.
- `<title>`: **"VITURE Neckband - VITURE Pro Neckband"** (confirmed twice: curl of the HTML, and the Playwright page title on the live tab).
- Vanity domain `https://neckband.viture.com/` → **200**, redirects to `https://www.viture.com/neckband`.
- Studio: **darkroom.engineering**. The pointer is not a case-study page but a direct link in their machine-readable work index, `https://darkroom.engineering/work.md` (HTTP 200), line 22:
  > `- [Viture Neckband](https://neckband.viture.com/): VITURE Neckband - The ultimate streaming companion for XR glasses. Stream games, movies, and more wirelessly with this portable computing powerhouse.`
  The same index carries two sibling VITURE builds — `[Viture Luma](https://luma.viture.com)` ("Making the parallel possible.") and `[Viture Pro](https://pro.viture.com/)`. VITURE is a repeat client with a microsite per product launch. `https://darkroom.engineering/work/viture-neckband` returns **404** — darkroom publishes no narrative page for it; the link IS the case study.

## 2. The client and the product
VITURE sells a $328 wearable Android computer — a neckband that streams games and film to its XR glasses. The page sells one SKU at one price to someone who already owns the glasses.

## 3. First screen
- Asserts: **"Sleek Design, Trusted Like a True Friend."** (7 words) under a `PRO` badge and the single-word wordmark **"Neckband"**. Below it one quiet secondary: `Watch the film ▶`.
- Alignment: hero copy sits bottom-left; the product occupies centre-right. Claim and object never collide. The headline is two-tone — `Sleek` and `True Friend.` in red, the connective words white — so the glance-read is "Sleek… True Friend."
- The hero IS a **scroll-scrubbed frame sequence painted to a `<canvas>`** (`section1_sequence` > `frame-sequence_sequence` + `section1_sticky` + `<canvas>`), not a video and not a static render. A spotlit studio render of the neckband on dark sand.
- Nav: a fixed bar — **hamburger + search + `FROM $328` + `Order Now`** — 4 targets, top-aligned, the whole catalogue hidden behind the hamburger. Above it a persistent black promo strip ("VITURE × Phantom Blade / Phantom Beast XR Glasses →"). The price is IN the nav, always.

## 4. Type system (from the CSS)
- One family: **Inter**, self-hosted via `next/font` (`--font-inter:"Inter","Inter Fallback"`; `@font-face` for weights 400/500/600/700/800, `font-display:swap`, subsetted per unicode-range, plus a metric-matched `Inter Fallback` on `local("Arial")` with `size-adjust:107.12%`). No display face. No serif. **No mono anywhere** — `swiper-icons` is the only other face and it is a UI glyph font.
- Display vs text is **size and weight only**, from a closed 14-step scale defined twice — desktop (`-d`) and mobile (`-m`) — and expressed entirely in `vw`, never `px`, never `clamp`:
  `.text-180-d{font-size:9.375vw;line-height:10.3125vw}` … `.text-50-d{2.6041vw/3.125vw}` … `.text-30-d{1.5625vw/1.875vw}` … `.text-10-d{0.5208vw/0.7291vw}`.
  Mobile mirrors it: `.text-180-m{48vw}` … `.text-30-m{8vw}`. 9.375vw = 135px at 1440. The layout is a scaled drawing, not a responsive one.
- Weights in use: 400/500/600/700/800. Section headlines are `font-medium` (500) at `text-50-d` (about 37.5px at 1440) — the display sizes are reserved for marquee words, not for the argument.
- **Tracking: not one `letter-spacing` declaration in the entire stylesheet.** Zero. Inter's defaults carry it.
- Uppercase: exactly **one** `text-transform:uppercase` rule in 75KB of CSS. Case does no work here.

## 5. Palette (from the CSS)
- Ground: **`var(--black)`** — pure black, written literally as `#020202` where it appears. Every section is black; the imagery supplies all the colour.
- Type: white plus a ladder of alphas — `--white-80`, `--white-60`, `--white-40` — and `--white-6` / `--white-10` as the only surface fills (glass chips, caption pills, buttons). Counted: `background:var(--white-6)` ×9, `var(--white-10)` ×6. The entire UI-surface language is two translucent whites.
- Accent: **red**, `--color-contrast:#ed1512` / `var(--red)`. It appears as one gradient recipe reused verbatim for every commerce-or-play control: `linear-gradient(90deg,#8a0f35 0,var(--red) 100%)` — on the `PRO` badge, the watch-film icon, and the preorder button. One accent, one gradient, three jobs. `--orange` is used only for the loader light-bar.
- Two atmosphere gradients, both navy radials: `radial-gradient(ellipse at bottom center,#062c63,var(--black) 25%)` behind section 2 and the same at the footer, scaled `scaleX(3)` / `scaleX(8)`. They read as light bloom, not as colour.
- Yes, the red is VITURE's brand red doing the work. The stats row is the one departure: `linear-gradient(135deg,#f14c78,#847ea5)` background-clipped into the numerals with `-webkit-text-fill-color:rgba(0,0,0,0)`.

## 6. Narrative arc (12 sections, in order)
1. **section-1 · Hero** — "Pro Neckband / Sleek Design, Trusted Like a True Friend." + `Watch the film`. Pinned canvas sequence.
2. **section-2 · Thesis** — "Providing **Ultra Freedom** for **Gaming & Streaming**", set as a marquee with a logo band beneath, over a navy bloom.
3. **section-3 · Proof by number** — "All the Level Ups You Have Been Waiting for": `7 x CPU POWER`, `40 x GPU POWER`, `6 x RAM`, `Minimal Noise`, `Minimal Heat`, `50%+ Battery Life`, `20%+ Lighter`, footnoted `*Compared to VITURE One Neckband`.
4. **section-4 · Interaction demo** — "Hand Gestures Enabled" + a slider of four labelled clips: `Hover On`, `Move Cursor`, `Resize Screen`, `Scroll Down`. Second `Watch the film`.
5. **section-5 · Ecosystem** — "Millions of Apps Around You": two counter-running logo marquees (GeForce Now, Netflix, Disney+, Xbox, Slack, Zoom, HBO Max, Twitch, Moonlight) over a particle film. `height:calc(var(--frames)*15px)` with `--frames:336` → **5040px of scroll for one idea**.
6. **section-6-top / section-6 · Compatibility** — "Standard USB-C Monitor Supported", then "Multiple Screens Supported".
7. **section-7 · Tracking** — "Ambient Mode, 3DoF and Smooth Follow Support" with the honest footnote `*6DoF will be enabled combined with our next-gen glasses`.
8. **section-8 · AI** — "AI Enabled / Hey Vizard", three scripted lines by use-case: gaming ("which gun has the fastest TTK?"), streaming (shopping list), productivity ("schedule a 2 pm meeting tomorrow").
9. **section-9 · 3D** — "Turn Everything into 3D!" with the scope-limiting note that the neckband gives a preview only.
10. **section-10 · Storage** — "Download Movies for Travel / up to 256 GB Storage / Prepare to be AMAZED".
11. **section-11 · The ask** — "Nothing Beats the Experience of VITURE Pro Neckband", a subline ending "every moment to the next level!", then `ORDER NOW` and the footer.

The arc: claim → thesis → **numbers** → it responds to you → it runs what you already use → it fits what you already own → it is honest about what it cannot do yet → buy. Proof precedes features, and the caveats are printed in the same section as the boast.

## 7. Motion grammar
- Libraries confirmed at runtime: **GSAP `window.gsapVersions = ["3.12.5"]`** and **Lenis `window.lenisVersion = "1.1.16"`**. No three.js, no WebGL context, no hamo/tempus globals. Swiper drives the one slider. `data-lenis-prevent-touch="true"` sits on the section-4 slider list — Lenis is deliberately switched off inside the single component that owns the gesture.
- **7 `<canvas>` elements and 13 `<video>` elements** live (5 canvases in the SSR HTML). Videos are `.webm` from a Storyblok CDN, several with an explicit `-sd` variant.
- **16 elements compute to `position:sticky`**; 14 `position:sticky` rules in the CSS.
- Scroll-driven behaviours observed:
  - **Pinned canvas frame-sequence scrub** — the signature. `.section5{height:calc(var(--frames)*15px)}` with `--frames:336` inlined on the element: scroll distance is derived from the asset, 15px per frame. The sticky child is `height:100vh;top:0`.
  - **Text and logo marquees** (775 `marquee` tokens in the DOM), counter-running rows.
  - **Split-text reveals** — `split-text_splitText` carries `style="opacity:0"` on the server render with a `split-text_fallback` copy underneath, so the sentence exists for crawlers and for no-JS.
  - **A masked rotated image reveal** in section 4: `transform:translateY(12vh) scaleX(-1) rotate(-15deg)` with `mask-image:linear-gradient(-135deg,transparent 15%,black 50%,black 80%,transparent)`.
  - **A scroll-progress marker rail** at the right edge — a column of dots with one lit orange dash, driven by `--current-marker:0`.
  - **A loader** with its own frame sequence and a curtain: `loader_curtain` / `loader_border` at `transform:scaleY(0)` with `linear-gradient(to top,transparent 33%,var(--orange),transparent 66%)` plus `filter:blur(5px)` — a light-bar wipe.
  - Easing is a full named ladder: 18 cubic-beziers on `:root` (`--ease-out-expo`, `--ease-in-out-quart`, …) plus a house `--gleasing:cubic-bezier(0.4,0,0,1)`.
- **Deliberately still:** no cursor follower, no horizontal-scroll section, no route transitions (it is one page), no parallax on type, no velocity skew. Nothing moves that is not the product moving.
- **The one motion moment:** the hero neckband turning under a spotlight as you scroll, on a pinned canvas. The object rotates; the page does not.

## 8. Commerce / the ask
- Persistent, in the nav, from pixel one: **`FROM $328`** beside a filled red pill, **`Order Now`** → `/product/viture-pro-neckband`.
- Terminal ask at section 11: **`ORDER NOW`** → `/product/viture-pro-neckband?discount=neckband` — the microsite's own attribution code rides on the query string, so the page's contribution is measurable.
- Loudness: the nav CTA is the only saturated red rectangle on a black page, so it is the loudest thing on screen at all times and never has to be repeated mid-page. Between hero and footer there is **no** interstitial buy button — 11 sections of argument with zero interruption.
- Soft asks: `Watch the film` twice, rendered as a small white label plus a play glyph, no button chrome.

## 9. Rhythm
- 12 sections over **28,540px** at 1440×900 — roughly 32 viewports.
- Everything is full-bleed black; containment happens through `--layout-margin:14.8958vw` (desktop) / `8.5333vw` (mobile) applied to text blocks only, against a 12-column grid (`--layout-columns-count:12`, `--layout-columns-gap:0.7291vw`; 4 columns on mobile).
- Section heights are deliberately uneven: 1190 / 1785 / 2380 / 595 / **5040** / 595 / 1785 / 1190 / 1785 / 595 / 1190 / 4985. The 595px sections are single beats; the 5040px one is the set piece. It goes quiet at the 595px sections — one line, one image, move on.
- Footer: a `--footer-height:27.083vw` block with the navy radial bloom scaled `scaleX(8)` behind it, four link columns, copyright, four legal links. The ask sits above the footer, not inside it.

## 10. THE BEST PART for Micah
**Section 3.** A single screen that is nothing but a headline, a row of comparative numbers set at display size with a gradient clipped into the glyphs, and one asterisked footnote naming the baseline:
`7 x CPU POWER · 40 x GPU POWER · 6 x RAM · 50%+ Battery Life · 20%+ Lighter` / `*Compared to VITURE One Neckband`.
No chart, no icon, no photograph, no logo — the numbers ARE the graphic. Micah has seven receipts with names and numbers; that is the same raw material. Two things make it work and both are free: the **footnote naming what the number is measured against**, which turns a boast into a claim someone could check; and the **placement — proof at position 3 of 11, before a single feature is explained.**

Second free mechanism, from the nav: **the price lives in the header the whole way down** (`FROM $328` beside the CTA). For a $99 book and three fixed-price packages, a persistent `FROM $99 · Get the book` bar costs nothing and removes the entire "what does this cost" scroll. Third, cheapest of all: `?discount=neckband` on the final CTA — one query param and the page's contribution stops being a guess.

## 11. THE TELL
The **336-frame studio render sequence** — and there are up to seven canvases running such sequences, plus 13 bespoke `.webm` product films with `-sd` variants on a Storyblok CDN. That is a CGI vendor, a turntable render farm and a bandwidth bill: VITURE's launch budget, not a mechanism. Do not attempt a frame sequence with a photograph of yourself. The transferable half is the structure around it — sticky container, scroll length derived from the content (`frames × 15px`), one idea per pin.

Also budget-bought: the app-logo marquee in section 5. Its persuasive force is entirely borrowed from Netflix, Xbox and Disney+ owning those marks. Micah has no logos and must not fake an equivalent. Section 3 is the part of this page that works with nothing but text.

## 12. Screenshots
- `viture-neckband-top.png` (1440×900, first screen)
- `viture-neckband-mid.png` (about 35%, the section-5 app marquee)
- `viture-neckband-late.png` (about 70%, sections 9–10)
- `viture-neckband-390.png` (390×844, first screen)

All in `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`.
