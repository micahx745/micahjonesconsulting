# Esther Rum — drinkesther.com (Studio Freight for Nihilo / Esther)

## 1. Fetch proof
- Live client URL: `https://drinkesther.com/` — HTTP **200** — `<title>Esther Rum</title>`
- Studio: **Studio Freight**. Pointer / case study: `https://studiofreight.com/work/esther` — HTTP **200** — `<title>Esther | Studio Freight</title>`
- What the case-study page says they did (verbatim):
  - "We designed the site like graphic designers, not web designers. Every screen had to work as a poster on its own, no matter where you stopped scrolling."
  - "On scroll, the iconic green cap rides down the page with you."
  - "We wrote new rules as we designed, exploring the unexpected ways each element should behave on screen and extending the brand system to have its own internet aura."
- Stack observed: Nuxt 3 (`/_nuxt/*`), Sanity CMS (`sanity-*` class prefix, `cdn.sanity.io` assets), Shopify commerce (`flatten-connection` chunk, cart drawer), three.js (minified: `WebGLRenderer`, `BufferGeometry`, `GLTF`, `DRACO` in bundle), GSAP + ScrollTrigger, Lenis, Tempus.

## 2. The client and the product
A new Colombian rum brand — one $36.99 bottle, three house cocktails, a little merch, and a $2,500 gold lion ring — sold direct and positioned as "the Reposado of rum," the first rum you ask for by name.

## 3. First screen
- **Age gate first** (fixed `.age-gate`, scroll locked): a black `ESTHER` plate over a mirrored, kaleidoscoped bottle still; "THIS STORY BEGINS WITH YOU." / "Are you of legal drinking age in your country? The next chapter waits for those who are ready." plus a birthday field, `ENTER SITE`, `NO`. Screenshot: `esther-agegate.png`.
- **Behind it**, the real first screen asserts **three words: "RUM IS BACK."** Set at full page width on a cream band, one word left / one centre / one right. Above it, a full-bleed flash-lit photograph of four bottles on a red table at night, green caps glowing. Two tiny black chips float in the photo: `FIND US` (left) and `SHOP US` (right). Between photo and headline, a black marquee ticker: "THE REPOSADO OF RUM · THIS STORY IS ALWAYS BEGINNING AND NEVER ENDING · RUM IS BACK."
- Alignment: very high. Three words, one photograph, two chips, one ticker.
- Hero **IS**: a photograph (not video, not 3D). Zero `<video>` on the home route; one full-viewport WebGL canvas sits *over* the page for the cap.
- Nav pattern: **no visible nav.** A fixed bar pinned to the *bottom* of the viewport (`.site-header`, `position:fixed`, green `#0DAF1E`) carries exactly three items — `MENU` (left), a black `ESTHER` tab (centre), `CART (0)` (right). Everything else lives in the `MENU` overlay (Home / About / Find Us / FAQ / Shop / Merch / Cocktails / Contact).

## 4. Type system from the CSS
Four licensed families, all self-hosted woff2, all mono or semi-mono:
- `ABC Gaisyr Semimono` (400/700) — **body default**, `body{font-size:14px; line-height:120%; letter-spacing:0}`
- `ABC Gaisyr` (350/400) — the big display words (`RUM IS BACK`, `ESTHER IS ZERO SUGAR`, `THE REPOSADO OF RUM`)
- `ABC Gaisyr Mono` (500)
- `Isola Mono` (300/350/400/600/700/900) — labels, eyebrows, chips, nav
- `Isola Semimono` (600) — drawer headings (`ADD TO CART` at 48px/48px)
- Display size: a single `font-size:clamp(88px, 11vw, 115px)` rule, used **34 times** — one display size for the whole site.
- Weights in use: 300 / 350 / 400 / 500 / 600 / 700 / 900 (display sits at 400).
- Tracking: `letter-spacing:0` (223 rules) on display and body; `.01em` (151) on small text; `.04em` (34) on the smallest labels. Display gets **no negative tracking at all**.
- Mono use: total — this is a mono-first site, not a mono accent.
- Uppercase: `text-transform:uppercase` **258 times**. Labels, nav, headings, marquees, buttons. Sentence case survives only in paragraph body copy.

## 5. Palette from the CSS
Declared tokens (the whole palette, in `:root`):
- `--green #0daf1e` — the brand green; also `--theme-contrast`
- `--black #101010` — `--theme-fg`
- `--cream #faf6e6` — the page ground
- `--off-cream #ece8da`, `--burnt-cream #e3ddc2`, `--border #e0ddd0`, `--dark-grey #797871`, `--red #ff2e2e`, `--white #fff`

Ground: cream `#faf6e6`. Type: black `#101010` on cream. Accent: `#0daf1e`, doing enormous work — `html{background-color:var(--green)}` so the green shows as a **frame around the entire page** on every screen, plus the bottom bar, plus the physical bottle cap in every photograph, plus the 3D cap. It is unambiguously the client's brand colour: the cap is that green, and the site is built to match it.

## 6. The narrative arc (sections in order)
1. **Age gate** — "This story begins with you."
2. **Hero** — photograph, `RUM IS BACK`, ticker.
3. **Tasting note** — "ripe stone fruit and grassy agricole … light caramel, toasted oak … 100% free of additives," with a named expert quote: Antonio L. de Haro, "Founder, Rare Spirits Global Society of Rum Explorers." Ends `SHOP PRODUCT`.
4. **THIS IS ESTHER** — a press wall, three items, each with its outlet and an outbound link: Brand Identity, The Dieline, CPG Wire. Real headlines, real pull quotes, "Read It In The Dieline ↗".
5. **THE REPOSADO / OF / RUM** — the process claim (pot still plus 4-year column still, fermented and matured in Cali), broken into three labelled proofs: `SIGNATURE BLEND`, `ADDITIVE-FREE`, `FOR RUM VETERANS AND TEQUILA LOVERS`. Ends `SHOP RUM`.
6. **Photo strip** — a horizontal band of five lifestyle/product frames, full bleed.
7. **ALWAYS / BEGINNING** — "Rum for daiquiris. Or rum & coke. Rum for being together. Or just rum." Ends `SHOP ESTHER`.
8. **ESTHER IS / ZERO SUGAR / ZERO CARBS** — three lines of display type, nothing else on screen but the 3D cap parked dead centre.
9. **NEVER ENDING / founder story** — "Esther was founded by two mothers from Ohio who didn't used to think they liked rum," set one word per line.
10. **Router cards** — Shop / Cocktails / Find Us.
11. **Footer** — the brand paragraph, a `SUBMIT` email capture ("STAY IN THE LOOP. KEEP UP WITH EVERYTHING ESTHER."), and link columns (LEGAL / SHOP / COCKTAILS / COMPANY).

## 7. Motion grammar
- Libraries in the bundle: **Lenis** (`<html class="lenis">`, 23 hits), **Tempus** (raf scheduler, 4), **GSAP** (30) plus **ScrollTrigger** (5), **three.js** minified (33x `WebGLRenderer`, 20x `BufferGeometry`, 30x `GLTF`, 8x `DRACO`). No `window.gsap`/`window.THREE` globals — all bundled.
- WebGL canvases: **1** (1440x900, full viewport, drawn over the page). Videos on the home route: **0** — every moving image is either the canvas or a marquee.
- Scroll-driven behaviours observed:
  - **The cap rides the page.** One DRACO-compressed GLTF cap in a single fixed canvas, animated between invisible 1px DOM anchors: `.sanity-display-text__text-top-path-marker {top:10%; right:40vw}`, `__text-bottom-path-marker {bottom:20vh; left:40vw}`, `__text-middle-path-marker {bottom:-10vh; left:40vw}`, plus `.home-webgl-path-target` (sticky) and `.home-webgl-drop-zone` (fixed). The path is authored **in the layout markup**, not in animation code.
  - **Velocity coupling** — 50 `velocity` references; the cap reacts to scroll speed.
  - **Idle easter egg** — 23 `idle` hits; per the case study, leave the page untouched and a lion appears and rolls over.
  - Marquees: **55 marquee elements**, five distinct systems (`home-page__hero-marquee`, `sanity-marquee`, `site-menu__marquee`, `home-webgl-drop-zone__marquee`, `marquee--track`), all `will-change:transform`, `pointer-events:none`.
  - Sticky: `.column-width-text__line` (sticky, `top:12px`) — the founder-story lines pin one at a time; `.router-card__link-container` (sticky, `top:450px`); display-text bottoms sticky.
  - `prefers-reduced-motion` honoured (4 rules).
- **Deliberately still:** the photographs. No parallax, no Ken Burns, no cursor follower, no scroll-jack, no page-transition curtain. The type never animates in — it is simply there, poster-flat, at whatever scroll position you stop.
- **The one motion moment that carries the page:** the green cap detaches from the bottle and travels the full 7,708px of the page along markers you cannot see, landing dead centre of the ZERO SUGAR / ZERO CARBS screen. One object, one continuous route, the whole site.

## 8. Commerce / the ask
- Persistent: `CART (0)` in the fixed bottom bar, right side, 14px mono, always on screen. Quiet.
- In the hero: `SHOP US` — a black chip roughly 60px wide floating in the photograph. Almost a whisper.
- Repeated once per section, always as the last line of that section's argument, always uppercase mono in a black plate: `SHOP PRODUCT`, then `SHOP RUM`, then `SHOP ESTHER`, then `GO TO SHOP`. Four asks, four phrasings, each earned by the paragraph above it.
- The drawer: `ADD TO CART` at 48px Isola Semimono — the loudest commerce type on the site, and it exists only once you have opened the product.
- Prices shown plainly: `ESTHER RUM $36.99`; `ESTHER LION RING 2,500.00 … Now accepting pre-orders.`
- Secondary ask: `SUBMIT` email capture in the footer, one line, no incentive offered.

## 9. Rhythm
Roughly 11 sections over 7,708px at 1440. Almost everything is **full bleed**: the hero photo, the photo strip, the marquee bands, the display-type screens. The only contained elements are the two-column body paragraphs. It goes quiet twice, hard: the ZERO SUGAR screen (three display lines and ~900px of empty cream) and the founder story (one word per line). The whole page is framed in green because `html` is green and the content sits inset — the brand colour is a passe-partout, not a background. Footer is a conventional link block, black on cream, small mono, plus the email line — deliberately ordinary after all that.

## 10. THE BEST PART for Micah
**Author the animation path in the markup, then move one small object along it.**

The cap follows invisible 1px `div`s (`top:10%; right:40vw`, `bottom:20vh; left:40vw`) placed inside the sections themselves. The motion is a *content* decision made where the content lives; the code driving it is generic. Micah has exactly the object this wants: **one hand-drawn page from his book** — a single figure at ~120px that detaches from the book in the hero, travels down the page, arrives beside the receipt whose number it explains, and parks dead centre of the pricing screen. Nine drawings, twenty-six files: he needs one, and he already owns it. A 2D SVG on a CSS `offset-path` (or GSAP MotionPath) reading `getBoundingClientRect()` off marker divs does this with no WebGL and no model.

Second, cheaper mechanism from the same page: **one display size for the entire site.** `clamp(88px, 11vw, 115px)`, used 34 times, `letter-spacing: 0`. There is no h1/h2/h3 ladder in the display voice — a phrase is either a poster or it is 14px mono. That is a decision, not a budget, and it is why every screenshot looks composed. Micah's `RUM IS BACK` equivalent is three words at 115px pushed to the frame edges.

Third: **the press wall as proof.** Three quotes, each with the outlet named and an outbound arrow link, no logos anywhere. Micah has seven receipts with names and numbers plus one anonymous quote — the same pattern, set as blocks with the client name and the number as the headline, transfers directly and needs no logo wall.

## 11. THE TELL
The **DRACO-compressed GLTF cap in a full-viewport three.js canvas**, lit to match the photography, plus the idle-triggered lion that appears and rolls over. That is a 3D model of a real bottle closure, a lighting rig matched to a photo shoot, and a hand-animated easter-egg rig — a modelling-and-shader budget, not a mechanism. Faking it with a rotating PNG sprite would read as cheap immediately. Also budget, not method: the flash-lit night photography (four bottles, a red table, a crew) and four licensed type families. Take the path-marker idea and the single display size; leave the 3D, the shoot, and the type licences alone.

## 12. Screenshots
Written to `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`:
- `esther-agegate.png` — the age gate, 1440x900 (the literal first screen)
- `esther-top.png` — first screen past the gate, 1440x900
- `esther-mid.png` — ~35%, 1440x900
- `esther-late.png` — ~70%, 1440x900 (the cap parked centre of ZERO SUGAR / ZERO CARBS)
- `esther-390.png` — mobile 390 first screen
