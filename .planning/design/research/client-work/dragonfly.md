# dragonfly — Dragonfly (crypto VC), built by Studio Freight

## 1. Fetch proof

- **Live URL:** https://www.dragonfly.xyz/ — **HTTP 200** (`curl -s -o /dev/null -w "%{http_code}"` → `200`)
- **`<title>`:** `Dragonfly`
- Rendered and probed in an isolated headless Chrome (puppeteer-core, 1440x900 and 390x844), not the shared MCP browser.
- **Studio:** Studio Freight (now trading as darkroom.engineering).
- **Pointer URL:** https://www.awwwards.com/case-study-dragonfly-by-studio-freight.html — `<title>` **"Case Study: Dragonfly"**. Also live: https://ascii.dragonfly.xyz/ (HTTP 200, `<title>` **"Dragonfly ASCII"**) — the ASCII generator they built, shipped as a public client-owned tool.
- **What that case-study page says they did**, verbatim:
  - "We were asked to develop a brand and website to represent their position as boundary-pushing thought leaders helping to build the future of Web3."
  - "We built a custom tool using WebGL shaders which allowed us to use pretty much any file type for image generation and manipulation."
  - "We used Satus, our one-size-fits-all starter kit (that includes a basic setup of Next.js with Sass)"
- **Provenance caveat (verified, do not skip):** the case study describes a **Next.js** build; the site live today is **Nuxt** (`__NUXT__`, `/_nuxt/*.js`, Vue `data-v-*` scope hashes). The ASCII/orange system, the `--black-05..95` alpha scale and the full `--ease-*` set from Studio Freight's *Satus* starter survive verbatim in the current CSS, so this is the same design system re-platformed — the studio's *design* is what is live, the studio's *original code* is not. Do not cite the awwwards case study as evidence about the current stack.
- darkroom.engineering's own `/work` index (`<title>` "Selected Work by Darkroom Engineering") does **not** list Dragonfly today. The credit rests on the awwwards case study plus the surviving Satus tokens.

## 2. The client and the product

Dragonfly is a crypto venture fund selling **access to capital and to a technical peer group** — the product is the firm's own credibility, sold to founders who could raise anywhere, and secondarily a recruiting funnel.

## 3. First screen

- **Asserts:** one word — `DRAGONFLY` — in orange, 160px, dead centre. **One word.** Total alignment: the name is the claim, and the ASCII dragonfly behind it is the name rendered literally.
- **Hero IS:** a full-viewport fixed WebGL canvas (1440x900) rendering a 3D dragonfly **as ASCII characters** (`0 / < > # , . _ *` legible in the 390 capture). Not video, not photograph, not a plain render — a shader that turns a render into type. Zero `<video>` elements on the page.
- **Nav pattern:** **hidden by default.** A single small dark pill floats top-centre (~380px wide): logomark `>|<` at left, five orange dots at centre, the word `MENU` at right. Six links (ABOUT / WRITING / TEAM / PORTFOLIO / CAREERS / CONTACT) live behind it. Separately, four fixed corner glyphs spell the wordmark at the viewport edges: **D** top-left, **F** (mirrored) top-right, **L** bottom-left, **Y** bottom-right — the brand frames the window instead of sitting in a bar. Corner glyphs are dropped at 390.

## 4. Type system FROM THE CSS

Three `@font-face` families, 32 `.woff2` files, all `font-display:swap`, all `local()`-first.

| Role | Family | Live computed |
|---|---|---|
| Display | **FK Roman Standard** (Didone-ish serif) | `.display` → `clamp(130px … 280px)` (204px at 1440), **weight 300**, `line-height:90%`, `letter-spacing:-12.24px` desktop / `-5.28px` mobile, `text-transform:uppercase` |
| Hero wordmark | **NON Natural Grotesk** | 160px, weight 400, `letter-spacing:-6.4px`, uppercase, `#fa4c14` |
| Headings | NON Natural Grotesk (`h2`) / FK Roman (`.h2-alt`, `.h3-alt`) | `h2` 40–54px, w400, `-1.6px`, uppercase; `h3` locked at **16px** |
| Body | FK Roman Standard | `p` 16px w300 `-0.32px` / 140%; `.p-large` 18px → 24px → fluid 32px |
| Labels / § codes | **NON Natural Mono** | `.label` **10px**, w400, `+0.4px`, uppercase — e.g. `SEC—04`, `TENET`, `INFO`, `09` |

The system's spine: **serif for prose and for the biggest type, grotesk for headings and the wordmark, mono only at 10px.** Uppercase is applied to every heading level and every label; body prose is the only sentence-case surface. Negative tracking is aggressive and scales with size (−12.24px at 280px is about −4.4%). Weight range in use is narrow — **300 and 400 only**. No italics, no 700 in the display path.

## 5. Palette from the CSS

Ground and type are two values; the accent is one.

| Hex | Token | Role |
|---|---|---|
| `#000` | `--black`, `--theme-bg` | ground, everywhere |
| `#f2f2f2` | `--off-white`, `--theme-fg` | all type |
| `#fa4c14` | `--orange`, `--theme-contrast` on `.theme-orange` | **the accent** |
| `#0f0f0f` | `--dark-grey` | panel / nav pill |
| `#7d7d7d` | `--mid-grey` | secondary labels, roles under names |
| `#ec39b6` / `#5014fa` | `--pink` / `--purple` | `--theme-contrast` for `.theme-pink` / `.theme-purple` — **defined but not used on the home page** |

The home page's `<main>` carries `class="index fonts-loaded theme-orange"`, so `--theme-contrast` resolves to `#fa4c14` (verified live via `getComputedStyle`). **Frequency of the accent is the point: on the first screen it appears exactly twice** — the wordmark, and five 6px dots in the nav pill. Below the fold it drops to near zero; the portfolio, team and footer screens are pure `#f2f2f2` on `#000`. There is also a full `--black-0 … --black-95` alpha ladder and a `--dark-grey-0 … --dark-grey-95` twin — 40 tokens for *transparency*, six for *colour*.

Is it the client's brand colour doing the work? **Yes, and it is doing all of it.** There is no second hue anywhere on the page. Pink and purple exist only as alternate section themes the home page never invokes.

## 6. The narrative arc

Seven `<section>` elements, numbered on-page `01`–`05`, plus a pre-footer and footer. Page height 13,726px at 1440.

1. **Hero (900px)** — ASCII dragonfly plus the word. No subhead, no CTA, no scroll cue beyond the frame. Pure identity.
2. **`01 ABOUT` (268px — the shortest section on the page)** — one positioning sentence: "Eight years in crypto, Dragonfly brings access and influence to crypto teams with global aspirations to find adoption anywhere." Then an `ETHOS` label and the qualifying paragraph, which is where the numbers land: "checks go anywhere from **$3M to $30M+**", "offices in **New York City and Singapore**."
3. **`GLOBAL SINCE DAY 1` (910px)** — four words at 204px display serif, centred, alone. A held breath between the claim and the evidence.
4. **`02 WRITING` (1,749px)** — two featured essays with full first paragraphs, then a filterable index (`ALL / COMMENT-LETTER / LEGAL / OPINION / RECRUITING / RESEARCH`). Thought leadership as the first proof.
5. **`03 TEAM` (1,931px)** — four partners as large near-black portraits with name and title; then about 16 staff as small thumbnails in a four-column grid. Photographs are graded so dark they read as texture until you look.
6. **`04 PORTFOLIO` (4,026px — a third of the page)** — the section head, a TENET line ("Working on something weird? We love the weird stuff."), then **SPOTLIGHT: nine names set at display scale with a 10px mono category**, then **INDEX: about 200 portfolio companies as plain uppercase text in four alphabetized columns with single-letter dividers.**
7. **`05 CAREERS` (1,299px)** — three numbered doors: `01 OPPORTUNITIES AT DRAGONFLY / VIEW`, `02 BROWSE OUR PORTFOLIO JOB BOARD / BROWSE`, `03 JOIN OUR TALENT NETWORK / JOIN`.
8. **Pre-footer (1,204px)** — a small WebGL ASCII `>|<` logomark, three link columns (SECTIONS / CONNECT / LEGAL), a vertical mono `Ⓒ DRAGONFLY CAPITAL 2026` on the right rail, then an `INFO` label and the positioning sentence restated in large serif: "Dragonfly is a leading crypto investment fund. We back the best researchers and builders who will push the entire crypto ecosystem forward."

The arc: **name → claim → silence → what we think → who we are → who trusts us → how you join.** Proof is deferred until a third of the way down and then delivered at overwhelming volume.

## 7. Motion grammar

**Libraries in the DOM (read off `window`, live):** `lenisVersion = "1.3.17"`, `gsapVersions = ["3.14.2"]`, `tempusVersion = "1.0.0-dev.17"`. Nuxt config carries `three:{enabled:true, options:{alpha:false, antialias:false}}`. That trio — Lenis, Tempus, GSAP — is the darkroom/Studio Freight house stack; Lenis and Tempus were both authored on this project, per the case study.

- **WebGL canvases: 2.** One fixed full-viewport (1440x900) behind the hero; one in the pre-footer (`.site-pre-footer__webgl`, `aspect-ratio:1416/444` desktop / `351/442` mobile).
- **`<video>` count: 0.** No film anywhere.
- **CSS `@keyframes`: 0. `document.getAnimations()` at mid-scroll: 0.** Every moving thing is raf-driven through Tempus; nothing is declaratively animated. That is an architecture choice, not an absence of motion.
- **Smooth scroll:** Lenis, mounted on a `.lenis` wrapper; `data-lenis-prevent` on the writing and portfolio filter rails so those inner lists scroll natively.
- **Fixed, not sticky:** `header.site-header` (the four corner glyphs), `nav.site-nav` (the pill), `footer.site-footer`, `.ui-logo-gui` (a bottom bar reading `GUI ⋯ OPEN`, an easter-egg control panel), the hero `canvas`, `.utils-overlay`, `.rotate-device`. **No `position:sticky` anywhere.** Nothing pins, nothing scrubs, nothing goes horizontal.
- **Cursor behaviour — the one interactive mechanism.** `.mask-hover` stacks two copies of a headline and moves a mask under the pointer:
  `--radius:120px; --x:50%; --y:50%;` with
  `mask-image: radial-gradient(circle var(--radius) at var(--x) var(--y), transparent 0, #000 50%)` on the normal copy, and the inverse (`#000 0, #000 15%, transparent 70%`) on a `.mask-blur` twin absolutely positioned on top. A transparent `:before` pad extends the hit area 32px on every side. Result: a 120px lens follows the cursor across a headline and the type inside the lens is a different treatment. Pure CSS masks, two variables, no library.
- **Per-character split:** the hero word is split into `.char` divs (`contain:layout style`, a paint-containment hint) — the split exists to be animated per-glyph.
- **Edge masks:** the portfolio index and team grid fade at the top and bottom viewport edges, so long lists dissolve rather than clip.
- **Deliberately still:** no marquee (the doubled `GLOBAL SINCE DAY 1` is a centred stack, not a ticker — there is no keyframe to scroll it), no parallax on any image, no page transition, no scroll-velocity skew, no reveal-on-scroll stagger observed, no autoplay video, no carousel.

**The ONE motion moment that carries the page:** the fixed hero ASCII canvas. A 3D dragonfly, rendered live, resolved down to a grid of typographic characters, sitting behind the wordmark and never leaving the viewport. Every other moving part on the site is deferential to it.

## 8. Commerce / the ask

There is no buy, no download, no sign-up, no email capture, no form on the page. **The ask is CONTACT**, and it is deliberately quiet:

- `CONTACT → /contact` appears twice: inside the hidden MENU, and in the pre-footer's CONNECT column. Both are plain 16px uppercase links with a hairline rule under them. No button, no fill, no accent colour, no arrow.
- The **only** things resembling CTAs are the careers doors, and their words are one syllable each: **`VIEW`**, **`BROWSE`**, **`JOIN`** — pointing at `career.dragonfly.xyz/venture.html`, `jobs.dragonfly.xyz/jobs`, `career.dragonfly.xyz/portfolio.html`.

Loudness: near zero. The page's position is that if you need a button to find the contact link, you are not the founder they want.

## 9. Rhythm

- **Seven sections** plus pre-footer and footer, on a **12-column grid** (`repeat(12,1fr)` with `--layout-columns-gap`), 128px section margins at mobile and 180px at desktop (`main.index section:not(:first-child){margin:var(--spacer-180) 0}`).
- **Full-bleed:** hero canvas, team portrait row, the four-column portfolio index, the pre-footer WebGL. **Contained:** every paragraph, which sits in roughly columns 1–8 and never runs the full width.
- **Section headers are centred, everything else is left-aligned** — the centred `PORTFOLIO` / `SPOTLIGHT` / `INDEX` heads with a tiny left-flush `SEC—04` mono code and a hairline rule beneath are the page's punctuation.
- **Where it goes quiet:** the 910px `GLOBAL SINCE DAY 1` block (four words, no other ink) and the roughly 400px of pure black between the four partner portraits and the staff grid. The page buys silence in large, expensive units.
- **Footer pattern:** three link columns → a large field of black with the small ASCII logomark floating in it → vertical mono copyright on the right rail → an `INFO` label and the positioning sentence in large serif as the last words. The fixed corner **L** and **Y** are still there at the bottom of the document, so the wordmark closes the page the way it opened it.

## 10. THE BEST PART for Micah

**The two-tier proof block: SPOTLIGHT above INDEX — a handful of names set enormous, then the exhaustive list set as plain text with no logos at all.**

Dragonfly could afford a logo wall. They have about 200 portfolio companies including Avalanche, Polygon, Polymarket, Bybit, Aptos, 1inch, Compound. They ship **zero logos**. The index is uppercase text in four alphabetized columns with single-letter dividers (`A`, `B`, `C` …) as its only ornament, and the spotlight is nine of those same names promoted to 100px-plus serif with a 10px mono category beside them (`BYBIT / CEFI`, `NEAR FOUNDATION / L1-L2S`). Above that section: a `SEC—04` code, a centred head, and a count — the literal string `09` in 10px mono under `SPOTLIGHT`.

**Why it transfers exactly.** Micah has seven receipts with names and numbers, no logos, and no permission to invent any. Every "trusted by" pattern he cannot build requires logos; this one **forbids** them. Set his seven client names as plain uppercase type — three promoted to display size with the number as the mono category label beside them (`ORDANI / $150K RECOVERED`, and so on with `91% INTAKE COMPLETION`, `14 PRACTICES`), four remaining in a small alphabetized text list — and the absence of logos stops reading as a shortage and starts reading as a house rule. Add the count in 10px mono under the head (`07`) and the honest smallness becomes a stated fact rather than something the reader discovers.

The costs are all zero: no images, no library, no WebGL. It is an `<h2>` plus a mono `<span>` plus a `<ul>` plus a hairline rule, on a grid he already has. And it slots straight into his existing constitution — mono is already cleared for "labels, § codes and data" (the `SEC—04` idiom *is* the § code), the display face is already the `opsz`-aware Bricolage, and nothing here animates, so `motion-discipline.sh` never fires.

**Second-best, if he wants one interaction:** the `.mask-hover` lens — two stacked copies of a headline, a `radial-gradient` mask driven by two CSS custom properties, roughly eight lines of CSS. **But note it is a cursor follower and his `motion-discipline.sh` hook blocks those by name.** The borrowable form is the same two-layer mask driven by a scroll or hover *state* rather than pointer position, and it would still need the motion-engineer's written approval as a candidate second signature. Take the SPOTLIGHT/INDEX block; leave the lens.

## 11. THE TELL

**The hero.** It is a bespoke 3D dragonfly modelled in Blender, rendered through three.js / react-three-fiber, and pushed through a **custom WebGL ASCII shader the studio wrote as a standalone product** — shipped publicly at `ascii.dragonfly.xyz`. That is a modelling budget, a shader-authoring budget, and a spare-tool budget on one line item. Nobody fakes it. An ASCII-art filter over a stock image, or a CSS `text-shadow` trick, will read as a cheap imitation of a thing whose whole value is that it is running live.

The **four fixed corner glyphs** are a second, smaller tell — they work only because the wordmark is exactly four letters at the corners of DRAGONFLY's own name, and because there is a brand system underneath that decided the logomark is `>|<`. That is identity design, not web design; it arrives with the rebrand or it does not arrive.

Also unfakeable in kind, though cheap in code: the **200-name portfolio index**. The mechanism is free; the two hundred names are not. Micah should copy the *form* at his own scale — seven names, not seven hundred — and must not pad it. A text index is honest precisely because it is countable, and a padded one is the fastest way to lose the reader who counts.

## 12. Screenshots

Written to `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`:

- `dragonfly-top.png` — 1440x900 first screen (ASCII dragonfly, orange wordmark, corner D/F/L/Y, MENU pill)
- `dragonfly-mid.png` — about 35% (team: four partner portraits over the staff grid)
- `dragonfly-late.png` — about 70% (the four-column alphabetized portfolio index with letter dividers)
- `dragonfly-390.png` — 390x844 first screen (ASCII characters legible; corner glyphs dropped)
- `dragonfly-52.png` — extra, about 52% (`SEC—04 PORTFOLIO` head, TENET, `SPOTLIGHT` at display scale) — **the single most useful frame for Micah**
- `dragonfly-footer.png` — extra, page end (pre-footer WebGL logomark, three link columns, vertical mono copyright, `INFO` plus positioning sentence)

Capture note for whoever re-runs this: the page paints black on black under plain headless Chrome, and every frame comes back a 5.8KB black rectangle. Launch it with `--use-angle=swiftshader` plus the matching `unsafe-swiftshader` switch and the ASCII canvas appears.
