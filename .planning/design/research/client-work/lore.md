# Lore (loreobsessed.com) — built by darkroom.engineering

## 1. Fetch proof
- Live URL: `https://www.loreobsessed.com/` — **HTTP 200** (curl `-L` reported `200` on the effective URL; WebFetch returned 403, curl with a browser UA and Playwright both returned the page).
- `<title>` verbatim: `Lore - Being a fan used to be fun. We are going to fix it.`
- Studio attribution sits in the client site's own `<head>`, not in a case study:
  - `<link rel="author" href="https://darkroom.engineering"/>`
  - `<meta name="author" content="darkroom.engineering"/>`
- Pointer URL / case-study page: **none found.** `https://darkroom.engineering/` (fetched, title `where things get developed - darkroom.engineering`) lists OREO & BTS, PolyAI (Looped), Bad Omens, Lightfield CRM, Provable Explorer, VITURE — Lore is not among them. There is no studio-side page to quote; the byline in the client's own metadata is the proof.
- Corroborating build fingerprint: Next.js (Turbopack chunk names), Vercel (`dpl_` deployment ids), Sanity CMS (`cdn.sanity.io/images/wmzqas3z/production/...`), and darkroom's own open-source stack live in `window`: `lenisVersion "1.3.16"`, `tempusVersion "1.0.0-dev.17"`, `gsapVersions ["3.14.2"]`. Lenis and Tempus are darkroom's libraries.

## 2. The client and the product
Lore is a pre-launch consumer app for fandom — one organized place to rabbit-hole into a story you love instead of forty tabs of wikis, threads and forums. The site sells **a waitlist signup and a reserved username**, not a product.

## 3. First screen
- What it asserts, in 12 words, one line, centred above the mark: *"Being a fan used to be fun. We are going to fix it."* Perfectly aligned — the same sentence is the `<title>`, the `og:description`, and the footer line. One sentence does four jobs.
- The hero **is** a real-time WebGL scene: a single `<canvas>` (1430x900, `position: fixed`, class `webgl-module__1NMCZa__webgl`) rendering the word **LORE** as a heavy carved-stone 3D logotype with a diamond inset in the O, lit by moving volumetric light shafts, dust motes and coloured spark particles. Zero `<video>`, zero `<img>` in the hero. The type IS the object.
- Nav: essentially none. Four persistent chrome items only — a **"Sound on/off"** toggle with a five-bar meter (top left), **"Blog"** (top right), a copyright line (bottom left), four social glyphs (bottom right). No menu, no hamburger, no section list. The page is a single scroll and refuses to offer an alternative.
- A gate precedes it: a full-screen `Loading...` state, then *"Click to turn on sound"* / *"Tap to turn on sound"*.

## 4. Type system (from the CSS + computed styles)
- Three self-hosted `@font-face` families, all `.woff2`, all first-party (`/_next/static/media/`):
  - **`ceraph`** — ABC Ceraph (`Ceraph_Roman-s.p.*.woff2`). Display only. High-contrast, flared, quasi-serif — the mythic register.
  - **`oracle`** — ABC Oracle (`ABCOracle_Book`, `_Regular`, `_Medium`). Body and UI.
  - **`mono`** — Server Mono (`ServerMono_Regular-s.p.*.woff2`). Labels only.
- Display vs text is a hard split: every narrative "chapter" line is `ceraph`, every paragraph is `oracle`. Nothing crosses.
- Weights in the whole document: **350, 400, 500.** Nothing bold anywhere. The display face carries emphasis by size and colour, never by weight.
- Display size is fluid by ratio, not clamp: `font-size: calc(4800/var(--device-width)*1vw)` (48px at 1440) for chapter lines and `calc(7200/var(--device-width)*1vw)` (72px) for team names; `--device-width` is `1440` on desktop and `375` on mobile, so the scale is authored at design-file pixel values and re-derived per breakpoint. Measured live: 47.67px and 71.5px. Body resolves to 16.88px from `calc(((17*100)/var(--device-width))*1vw)`.
- Tracking: **`-0.04em` on essentially everything** — display (`-2.86px` on 71.5px) *and* body (`-0.675px` on 16.88px). One tracking value for the site. `-0.02em` appears once; labels sit at `0`.
- Mono: labels and the sound meter only. `text-transform` in the CSS is only `uppercase` (small UI) and `lowercase` (the on/off state).

## 5. Palette (from the CSS)
Ground is near-black `#000`, with `<body>` computing to `rgb(19,21,20)`; type is bone `--color-secondary: #fffaf4` (7 occurrences, the highest-count non-black hex).

The interesting part: the accent is **not fixed**. A named "colour world" set themes the whole page — WebGL lighting included — and one is chosen per load:

| token | hex |
|---|---|
| `--color-fableberry` | `#6b3d54` |
| `--color-embergold` | `#cfad4f` |
| `--color-stardust` | `#fff89b` |
| `--color-dreamwisp` | `#b8c8e4` |
| `--color-neptune` | `#5bb5d6` |
| `--color-moss` | `#548235` |
| `--color-eldershade` | `#385723` |
| `--color-temple` | `#a9d18e` |
| `--color-oracle` | `#67bfa8` |
| `--color-stone` / `--color-void` | `#fffaf4` / `#000` |

Observed live across three loads, three different worlds: desktop load 1 resolved `--color-background: #6b3d54` (fableberry — the magenta screenshots); desktop load 2 resolved `#cfad4f` with `--color-title: #fff89b` (embergold/stardust); the 390 load came up neptune/dreamwisp blue. `--color-filter` cycles `#ff87c3 / #78dbff / #89c660 / #ffd76a`. It is the client's brand colour system doing the work — but as a *set*, not a single hex.

## 6. Narrative arc (sections in order)
1. **Problem, as a wall of running text.** "Being a fan used to be fun — but today, fandom discovery is scattered across multiple platforms, disorganized threads, hostile forums, and outdated wikis… The online fan experience is fragmented, toxic, and broken."
2. **The turn, one display line:** "Lore is going to fix it."
3. **Origin myth, chapter 1:** "When man first discovered fire, we gathered around it… we began to tell stories." / "We shared tales of gods and monsters, of lovers and liars, of villains and heroes."
4. **Display beat:** "And something inside us awakened."
5. **Chapter 2:** "…it became one of our highest callings to preserve what moves us, to make meaning of what might otherwise be lost."
6. **Chapter 3, the modern translation:** "the season finale watch party and the debates you start after… fast-moving threads and the theories that keep you up at night."
7. **Display beat:** "It's in our DNA. / So, we do what we were created to do."
8. **Chapter 4:** "We wonder; we explore; we create; we follow each other into strange, unknown places…"
9. **Display beat:** "This is what it means to be human. / This is our Lore."
10. **Chapter 5:** "We are not just keepers of stories, we are the ones who give them life."
11. **Display beat:** "We are the memory of the universe manifesting over and over again." → "How lucky we are to know it."
12. **The team.** Three names at 71.5px display, each with a role label and a "Learn more" pill, and a portrait that floats inside a glassy 3D ring in the WebGL scene. Expanding one opens a long, specific, unembarrassed bio (Zehra Naqvi: an anonymous One Direction Tumblr at 11 that reached 100,000 followers, a fashion brand at 16, Columbia, twice-published art historian at 21) with personal links — her X, her Airbuds, her Letterboxd.
13. **The ask.** "Fandom at your fingertips." → username + email → Submit → success state → "Join our Discord Server."
14. **Footer.** The title sentence again, sound toggle, Blog, © 2026 Lore Legend Myth, four socials.

The arc is: a concrete complaint (about 60 words of it), one promise, then roughly 250 words of creation myth that never mention the product, then three real humans, then the ask. Proof is *people*, not logos — there are no client marks on the page at all.

## 7. Motion grammar
- **Libraries confirmed in `window` on the live page:** Lenis `1.3.16` (`<html class="lenis lenis-scrolling">`, `window.lenis` present, `data-lenis-prevent` on the modal), Tempus `1.0.0-dev.17` (darkroom's rAF scheduler), GSAP `3.14.2`. **WebGL canvases: 1. Videos: 0. Images in the DOM at first paint: 0** — the 72 `<img>` seen later are Sanity-served portraits and social glyphs; the scene itself is generated.
- **That one canvas is fixed, full-viewport, behind everything, and never leaves.** Every scroll-driven behaviour on the page is a camera move inside it.
- Scroll-driven behaviours observed or inferable:
  - **A single sticky stage** — exactly one `position: sticky` element (`sticky top-0 h-screen w-full`) over an 8,790–9,098px document. The page is one pinned frame that text scrolls through, not a stack of pinned sections.
  - **Scrubbed 3D.** The LORE logotype rotates and recedes; by ~35% it has resolved into a single ring/torus with the diamond at its centre; by ~70% that ring is the frame holding a founder's portrait. One object, continuously transformed, carries the whole scroll.
  - **Text reveals synced to the scrub** — chapter paragraphs fade in at the right margin and out again; display beats land centred and large.
  - **Colour scrub** — light shafts, spark colour and background drift within the chosen colour world as you descend.
  - Smooth scroll (Lenis), `mix-blend-mode: overlay` on the type layer, a `gradientShift` keyframe on the background, a `progress-in` keyframe on the loader.
  - **Audio is part of the scroll** — a "Sound on/off" toggle with a live five-bar meter, gated behind a click; a score plays under the page. No `<audio>` element: WebAudio.
- **Deliberately still:** no cursor follower, no marquee, no horizontal section, no page transitions (it is one page), no hover-tilt on team cards, no parallax on the text itself. The chrome — sound toggle, Blog, copyright, socials, CTA pill — is pinned and motionless for the entire 9,000px. Total CSS keyframe animations: **two.**
- **The one motion moment that carries the page:** the LORE logotype is not a logo shown once — it is a physical object the scroll *turns*, and the letter O becomes the ring that eventually frames a human face. The site's whole length is one continuous transformation of one prop.

## 8. Commerce / the ask
No commerce. One conversion, offered twice:
- A pinned pill at bottom centre of every screen, visible from pixel 0 to the end: **"Sign up for early access"** (11.9px oracle, weight 500, black on a pale lilac pill, a small diamond glyph either side). Quiet — the only pinned interactive element besides the sound toggle, and it never grows, pulses or shouts.
- The form at the end: heading **"Fandom at your fingertips."**, two fields placeheld **"Reserve your username"** and **"Email"**, button **"Submit"**. "Reserve your username" is the whole persuasion — scarcity framed as identity, not as a countdown.
- The success state is written, not a toast: *"Thanks for signing up! Soon you'll have one place to rabbit-hole into your fandoms without endless tabs or toxic forums. Get ready to explore deeper than ever."* Then a second, softer ask: **"Join our Discord Server"**.

## 9. Rhythm
Fourteen beats over roughly 9,000px, but structurally **one full-bleed frame** — the canvas — with contained 12-column type laid over it (`--columns: 12` desktop / `4` mobile, `--gap: calc(((12*100)/1440)*1vw)`). Body copy runs narrow and right-of-centre; display beats go wide and centred. The alternation *narrow paragraph → wide display line → narrow paragraph* is the metronome, and the quiet is the display beats: one sentence alone in a dark frame with nothing else to read. The footer is not a footer — it is the same pinned chrome that has been there since load, so the page has no visual ending; it simply stops scrolling.

## 10. THE BEST PART for Micah
**One object, transformed by scroll, carrying the whole page — and Micah already owns the object.** Lore had a logotype and made it the only asset on a 9,000px site: rotate it, recede it, let it become the frame that holds the founder's face. Micah has nine hand-drawn book pages. The mechanism ports exactly and needs no 3D: pin one frame, and scrub a **single hand-drawn page** through it — page 6's diagram (already the `<WallChart />` subject) drawing itself line by line as the copy about the method scrolls past, then the drawing's central shape opening to become the frame that holds his photograph, then that same frame becoming the box around the $99 book cover. One prop, three jobs, zero new assets. Everything else holds still, exactly as here: two keyframes total, a permanently pinned CTA pill that never changes size, no hover theatrics.

Two smaller free steals sitting next to it:
- **The colour-world set.** Instead of one accent, name four to six palettes and pick one per load. Copper stays the family, but the ground shifts. Costs a CSS-variable swap and makes a static site feel authored. (House Lights' one-accent rule would have to be ruled on first — this is the *idea*, not a licence.)
- **The proof model.** Zero logos. Proof is three named humans with bios so specific they cannot be fabricated ("Mary-Kate and Ashley Olsen stopped her on the street to compliment her outfit. It was a big deal."). Micah has seven receipts with names and numbers and one photograph. Lore's page says: write the receipts long and specific, set the names at 72px, and let that be the credibility. No wall of client marks needed — they didn't have one either.

## 11. THE TELL
**The hero is a bespoke 3D asset with a real-time renderer behind it.** The LORE logotype is a modelled, textured, carved-stone mesh lit by volumetric shafts and particle systems, animated in WebGL and scrubbed at 60fps — plus a licensed type pairing (ABC Ceraph + ABC Oracle, both paid Dinamo faces, self-hosted) and an original score that plays under the scroll with its own gated sound toggle. That is a modelling/lookdev budget, a licensing budget and a music budget. Do not attempt a low-poly version: a cheap 3D word reads worse than no 3D at all. The transferable part is the *grammar* — one pinned frame, one object, one continuous transformation — not the renderer.

## 12. Screenshots
- `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/lore-top.png` (1440x900, first screen — fableberry world)
- `.../lore-mid.png` (~35% — "And something inside us awakened.", logotype resolved into the ring)
- `.../lore-late.png` (~70% — the ring now frames Zehra Naqvi's portrait beside three 71.5px names)
- `.../lore-390.png` (390 first screen — loaded in the neptune/dreamwisp blue world, itself the proof that the palette is randomized per visit)
