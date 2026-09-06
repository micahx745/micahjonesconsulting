# OREO x BTS — "Biggest Love Letter" (us.oreobts.com)

Client build. Studio: **darkroom.engineering**. Client: **Mondelez / OREO** (with BTS + HYBE).
Fetched 2026-09-05.

## 1. Fetch proof
- Live URL: `https://us.oreobts.com/` — **HTTP 200**, 59,477 bytes of server-rendered HTML.
- `<title>` — **`OREO &amp; BTS — Biggest Love Letter`**
- Second live route captured: `https://us.oreobts.com/gallery` — **HTTP 200**, `<title>` **`Letter Gallery | OREO & BTS`**
- Studio pointer page: `https://darkroom.engineering/work` (fetched). What it says, quoted:
  > "OREO & BTS Are Calling. A global brand collaboration shipped in more than 90 locales, where fans write letters to BTS and find them inside an expansive 3D world."

  and: "one global letter database, and more than half a million letters have been sent already, with more countries still to come."
- Awwwards nominee page `https://www.awwwards.com/sites/oreo-bts-love-letter-site` (fetched), description quoted:
  > "An immersive digital experience invites fans to create & share personalised digital love letters set in a vibrant Korean night market."

  Credits listed there: Bulletproof (brand/design), **darkroom.engineering** (build), Chirag Grover, Glenn Catteeuw, Clément Roche, Felix Mayr, guido-fier, 3Dkurt. Tech tags: 3D, WebGL, Cinema 4D, Figma, microinteractions.

**Status caveat, load-bearing for reading the screenshots:** the campaign has ENDED. The home
route now renders a tombstone state — "THANK YOU / FOR THE LOVE … This campaign is sadly over."
The 3D night-market hero and the letter world are still live and still rendering; the letter
*composer* is retired. The gallery at `/gallery` is fully intact and is where the mechanism lives.

## 2. The client and the product
A limited-edition OREO x BTS cookie (hotteok / brown-sugar-pancake flavour) sold as a global
drop — but the site sells **participation**, not the cookie: fans write a letter to BTS and it
joins one worldwide letter database. Pack QR code leads here.

## 3. First screen
- Asserts: **"THANK YOU FOR THE LOVE"** (4 words display) plus one 21-word subhead. Pre-tombstone the
  same slot ran the intro copy still in the DOM: "Our Biggest Voice, BTS ARMY! / We are grateful to
  have the most passionate fans in the world. / YOU ARE OUR HAPPINESS. / Thank you for being here!"
  (32 words, centred, `whitespace-pre-line`, with a `SKIP INTRO` escape button).
- Alignment: dead-centre, single column, everything stacked on the vertical axis.
- The hero **IS a real-time 3D scene** — one `<canvas>`, zero `<video>` elements: a Korean night
  market at night, neon signs in Hangul, OREO-BTS billboards, a lightstick neon, a globe on the
  street. Camera drifts. Layered on top: DOM `<picture>` neon sprites (`neon1/2/3`, avif+webp,
  rotated -15deg / +15deg) parallaxing over the canvas — a hybrid DOM/WebGL hero.
- Nav: **3 items, split**. Logo centred on mobile / left on desktop; right side carries two links
  (`SEE ALL LOVE LETTERS` glass-pill, `SHOP OREO & BTS` gradient text) plus a hamburger. Below
  800px both links collapse and only the hamburger survives. Header is `fixed`, `5rem` tall on
  desktop / `3.75rem` mobile.

## 4. Type system (from `/assets/style-C60-2Zci.css`)
Seven self-hosted `@font-face` families, all woff2, all `font-display:swap`:
- `BricolageGrotesque` (Variable, weight 800) — **display and every UI label**. Always run with
  `font-variation-settings:"opsz" 72, "wdth" 75` and `font-feature-settings:"ss01" 1`. That is the
  whole trick: one variable face driven to condensed-display axis values, not a second font.
- `BricolageGrotesqueDisplay` (DisplayCondensed cut, 800) — the extra-large headline cut.
- `Pluto` (PlutoCondRegular 400 / PlutoCondMedium 500) — **body**. Preloaded in `<head>`.
- `GuthenBlootsMonoline` (400) — the **handwriting** on the letter cards.
- `HaveHeartsTwo` (400) — second script face, decorative.
- `NotoSans` (Variable 100–900) — the 90-locale fallback (Hangul, Cyrillic, Kazakh all appear on
  cards). Stack is `var(--font-noto-sans), system-ui, sans-serif`.
- `ServerMono` (400) — mono, labels/data only. `<html data-script="latin">` switches the stack.

Ramp and tracking (the real values):
- `.typo-h1` 4.25rem desktop / **2.5rem** mobile, weight 800, **line-height 80%**, tracking **+2%**
- `.typo-h2` weight 800, line-height 80%, tracking **+6%**
- `.typo-h3` 2rem / 1.5625rem, weight 800, line-height 80%, tracking **+6%**
- `.typo-body` (Pluto) .9375rem / .8125rem, weight 500, line-height **128%**, tracking **-3%**
- `.typo-detail` .75rem, weight 700, tracking +2%
- `.typo-button-lg` 1rem, tracking +1%; `.typo-button-sm` tracking **+6%**
- `.typo-handwritten` 2rem, tracking .04em, line-height 120%

Uppercase is applied exactly **once** in CSS (`text-transform:uppercase`) — everything else that
reads as caps is typed in caps in the copy. Tracking is positive and *large* on display and labels
(+6%), negative on body (-3%). That inversion is the system.

Notably: **no `clamp()` anywhere.** Sizes are fixed rem, swapped at a single
`@media (width>=800px)` breakpoint, with a `--device-width: 390 → 1440` variable and a `dr-*`
utility scale (`.dr-w-32{width:2rem}`) that maps design-file pixels to rem 1:1.

## 5. Palette (hex counts from the stylesheet)
Declared tokens: `--color-black:#000`, `--color-dark:#060606`, `--color-white:#fff`,
`--color-blue:#0047d9`, `--color-light-blue:#00c3ff`, `--color-very-light-blue:#89ecff`,
`--color-grey:#333`.

Counted occurrences, top of list:
`#5597ff` x51 · `#03c3ff` x48 · `#fff` x27 · `#89ecff` x27 · `#3784ff` x23 · `#bfc4ff` x6 ·
`#00c3ff` x4 · `#000` x4 · `#dbe8ff` x3 · `#0047d9` x1 · `#060606` x1.

- **Ground:** black / near-black `#060606`, but almost never seen flat — the 3D scene is the ground.
- **Type colour:** white, with the display headline filled by a blue vertical gradient
  (`#89ecff` to `#3784ff`) plus an SVG inset-shadow filter (`#text-inset-shadow-glass`) that fakes
  extruded neon glass on live text.
- **Accent:** it is **one hue family — OREO blue — in five stops**, ~160 occurrences total. There is
  no second accent. Magenta `#ff00ff` and green `#00ff88` appear twice each and are debug values.
- Yes: this is the client's brand colour doing 100% of the work. OREO's blue, pushed to neon.

## 6. Narrative arc (sections in order)
1. **Fixed header** — logo, "SEE ALL LOVE LETTERS", "SHOP OREO & BTS", hamburger.
2. **Full-bleed 3D night market hero** — intro copy fades in over the scene, `SKIP INTRO` offered.
3. **Address to the fandom** — "Our Biggest Voice, BTS ARMY! … YOU ARE OUR HAPPINESS." The brand
   speaks *to* the audience before asking anything. No product yet.
4. **The ask (retired):** write your letter. Now replaced by "THANK YOU FOR THE LOVE / This
   campaign is sadly over" plus two buttons.
5. **`/gallery` — "LETTERS FROM THE WORLD"** — the payoff: a rotating globe with half a million
   fan letters orbiting it as 3D cards, "DRAG TO EXPLORE", filter pill `ALL LETTERS`, toggle
   `ALL LETTERS / WORLD VIEW`.
6. **`/shop`** — the commerce exit.
7. Footer: locale switcher (`USA`), audio Pause/Muted controls, "Hooligan" and "BTS" credits.

The arc is: gratitude, then contribute, then see everyone else's contribution, then buy. The
product is last and smallest.

## 7. Motion grammar
Libraries visible in the module graph (`/assets/*.js`, from `<link rel="modulepreload">`):
`react-three-fiber.esm`, `OrthographicCamera`, `canvas`, `blend`, `three` (referenced),
**`lenis`** (confirmed live: `window.lenis === true`), **`tempus`** (`tempus-react`),
**`hamo`**, `use-theatre` (Theatre.js sequencing), `tunnel` (tunnel-rat, React portal into canvas),
`timeline`, `stagger`, `transitions`, `store`/`vanilla` (zustand), `letters-api`, `middleware`,
`platform`, `keys`. React Router v7 / Remix framework mode (`entry.client`, `root`, `manifest`).
**No GSAP. No Framer Motion.** WebGL canvases: **1**. `<video>` elements: **0**.

- **`tempus`** is a single shared RAF loop; **`hamo`** supplies throttled resize/rect hooks;
  **`lenis`** smooths the wheel. That trio is the darkroom house rig — one frame loop drives DOM
  and WebGL together so they never desync.
- **`use-theatre`** means the hero camera move is an *authored animation timeline* baked in
  Theatre.js, not hand-written tweens — a designer scrubbed it.
- Scroll-driven behaviours observed: the page does **not** scroll in the document sense
  (`scrollHeight === innerHeight === 900`). Wheel input is captured and converted into **camera
  dolly through the 3D letter field** — I sent 6000px of wheel on `/gallery` and the letters grew,
  re-parallaxed at different depths, and the headline faded out; a single card resolved to frame
  centre. Drag rotates the globe (`DRAG TO EXPLORE`). Route changes run a **staged page
  transition** (`data-transition-outlet` / `data-transition-phase="idle"` /
  `data-transition-page="present"` in the DOM — a real outlet, not a fade).
- Micro-motion: gradient-sweep hover on the pill button (`_glow` / `_glowHover` / `_glass` /
  `_border` spans stacked), hamburger bars with a duplicated `_glow` layer behind them.
- 22 named cubic-beziers as CSS variables (`--ease-out-expo`, `--ease-glease:cubic-bezier(.4,0,0,1)`).
- **Deliberately still:** the body copy. No text reveals, no split-letter staggers, no marquee, no
  cursor follower, no scroll-jacked section pinning. `@media (prefers-reduced-motion:reduce)` is
  present. The type just sits there while the world moves behind it.
- **THE one motion moment:** on `/gallery`, wheel equals camera travel *into* a sphere of half a
  million real fan letters. The scroll gesture stops being navigation and becomes flight.

## 8. Commerce / the ask
- Primary ask in-campaign was **write a letter** (free, about 60 seconds, no account).
- Persistent nav: `SHOP OREO & BTS` links to `/shop` (id `btn_shop_product` — instrumented).
- Tombstone state: `SIGN UP FOR NEWSLETTER` (outlined glass pill) and `GO TO OREO.COM` (filled blue
  gradient pill), side by side, centred, below the subhead.
- Loudness: quiet. The shop link is a plain gradient-text link in the header at 1rem, no box, no
  contrast against the two-word display headline. Nothing shouts "buy". The meta description is the
  only place a hook appears: "Help create the world's largest love letter to BTS. The first 10
  letters shared each day are eligible to win exclusive prizes."

## 9. Rhythm
Two "sections" per route, both **full-bleed, 100vh, no contained column anywhere**. The layout
system is a `--columns: 8 (mobile) / 12 (desktop)` grid with `--safe: 1.5rem / 2.5rem` and
`--gap: .5rem / 1rem`, but the pages barely use it — content is centred flex over a full-viewport
canvas. It goes quiet exactly once: the ~20-word paragraph in the middle of the hero, small, white,
Pluto, 128% leading, against the busiest image on the site. No conventional footer at all — just a
floating locale chip (`USA`), audio Pause/Mute, and two credit words.

## 10. THE BEST PART for Micah
**The provenance line on every card.** Each letter in the gallery is a small landscape card with:
the handwritten line in a monoline script face, a set of stickers, an initials signature (`M.O.`,
`C.M.`, `Y.B.`, `S.A.`), and — the part that does the work — a caps micro-line in the card's own
language naming where it came from: `CON AMOR DESDE ECUADOR`, `MIT LIEBE AUS DEUTSCHLAND`,
`CON AMOR DESDE ARGENTINA`, `ҚАЗАҚСТАН ЕЛІНЕН ЫСТЫҚ ЫҚЫЛАС`. Four typographic elements, no photo,
no logo, no video, and the card reads as *from a specific human in a specific place*.

Micah has exactly that raw material: **seven receipts with names and numbers, and one anonymous
quote.** The transferable mechanism is the **card grammar, not the 3D globe** — one line of claim,
an initials/attribution mark, and a caps provenance micro-line (`SOLO PRACTICE · AUSTIN, TX` /
`14-PRACTICE GROUP · ANONYMISED`). Set the claim in the display face at 80% line-height, the
provenance in a `.typo-detail` equivalent at .75rem with +2% tracking. The anonymous quote gets a
card too — its provenance line is `NAME WITHHELD BY REQUEST`, which is honest and reads as *more*
credible than a stock logo wall, not less. Seven cards laid flat on a page with one enlarged is the
same idea at a thousandth of the budget: **the proof is the artefact, and the artefact carries its
own address.**

Second, free: the `--ease-glease:cubic-bezier(.4,0,0,1)` token plus the 22-name ease palette is a
two-line CSS steal that costs nothing.

Third: OREO addresses the audience for a full screen — 32 words of thanks — before mentioning the
product. A consultant page can open on the reader ("You run 14 practices and your intake is 40%
complete") before it opens on the offer.

## 11. THE TELL
**The Korean night market is a Cinema 4D build.** A bespoke 3D city block — modelled, lit, baked,
with dozens of hand-lettered Hangul neon signs and a licensed BTS likeness on a billboard — driven
by an authored Theatre.js camera timeline. Awwwards credits four named 3D/creative-tech people plus
a separate brand agency (Bulletproof) on top of darkroom. That is a six-figure asset pipeline and a
music-industry licence. Nobody should attempt a WebGL night market, a globe of orbiting cards, or a
Theatre.js camera move as a solo consultant. The same goes for the letter database — half a million
rows behind a global API in 90 locales is infrastructure, not design.
Take the card grammar and the ease tokens. Leave the world.

## 12. Screenshots
All at 1440x900 unless noted, in
`C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`

- `oreo-bts-top.png` — home first screen, 3D night market plus "THANK YOU FOR THE LOVE"
- `oreo-bts-mid.png` — `/gallery` first frame: globe and orbiting letter cards, "LETTERS FROM THE WORLD"
- `oreo-bts-late.png` — `/gallery` after 6000px of wheel: camera dollied in, headline gone, one card centred
- `oreo-bts-390.png` — mobile 390x844 first screen

Note: the home route has no document scroll (`scrollHeight === innerHeight`), so the required
35%/70% scroll positions do not exist there; `mid` and `late` capture the `/gallery` route's
scroll-driven camera instead, which is where the page's motion actually lives.
