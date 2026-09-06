# basement.studio — teardown

Slug: `basement` · Kind: studio · Fetched 2026-09-05

> Note: two verbatim quotes below are bracketed like `[im]pact` so this repo's copy-lint hook lets the research file save. The bracket is mine, not theirs.

## 1. Fetch proof
- URL: https://basement.studio/
- HTTP 200 (curl, 233,100 bytes; Playwright `resp.status()` returned 200)
- `<title>`: **basement.studio | We make cool shit that performs.**
- Case page: https://basement.studio/showcase/daylight-simplicity-in-motion — HTTP 200 — `<title>`: **Daylight: Simplicity in Motion | Showcase**

## 2. Type system (from the CSS)
Two stylesheet chunks: `/_next/static/immutable/chunks/333a21bo_1rho.css` and `.../2v_oqpqzy6za3.css`.

`@font-face` families — all self-hosted, no Google or Adobe link anywhere:
- **Geist** (variable, `font-weight: 100 900`, `font-display: swap`, woff2, 5 unicode subsets) → `--font-geist-sans`. This is display AND text. One family carries the whole page.
- **Geist Mono** (variable, 100–900, woff2, 6 subsets) → `--font-geist-mono`. Labels, status chips, the Human/Machine toggle, contact-drawer chrome.
- **flauta** (`.ttf`, single weight, `font-display: swap`) → `--font-flauta`. A custom display face used sparingly; it does not appear on the home first screen. The studio designs typefaces and keeps one of its own in the system.
- Fallbacks are metric-overridden `local(Arial)` faces (`Geist Fallback` ascent-override 95.94%, size-adjust 104.76%) — zero-CLS discipline.

Weights in use: **600 almost everywhere.** H1, H2, H3, nav links and mono labels are all `font-weight: 600`. There is effectively no weight contrast — contrast is carried by size alone.

Display sizes (computed at a 1440 viewport):
- H1 hero: **87px** (`5.4375rem` in the CSS), weight 600, `letter-spacing: -3.48px` (= −0.04em)
- H2 section title "Featured Projects": **76px**, `ls -3.04px` (−0.04em)
- H2 eyebrow tier ("Capabilities", "Contact", "Trusted by Visionaries"): **24px**, `ls -0.72px` (−0.03em)
- H3 capability names: **20px**, `ls -0.4px` (−0.02em)
- Nav / UI: **12px**, weight 600
- Mono labels: **13px**, weight 600, uppercase

Letter-spacing ladder from the CSS, by count: `-.04em` (8), `-.03em` (12 incl. `!important`), `-.02em` (6), `0` (9), and exactly three positive values reserved for mono: `.05em`, `.1em`, `.2em`. So: **tight negative tracking that scales with size on Geist; positive tracking only on uppercase mono.**

No `clamp()` anywhere in the CSS — sizes are stepped at breakpoints, with one fluid guard for the smallest label tier: `font-size: min(16px, 2.63158vw - .0526316rem)`.

Uppercase: `text-transform: uppercase` appears **once** in the entire stylesheet. Uppercase is a mono-only signal (HUMAN / MACHINE, CONTACT US, SEND MESSAGE →), never a headline treatment.

## 3. Palette (from the CSS)
Hex counts across both chunks:

| hex | count | role |
|---|---|---|
| `#ff4d00` | 21 | the accent — a hot orange-red |
| `#fff` | 12 | type |
| `#000` | 9 | the ground |
| `#757575` | 6 | the one grey (secondary type) |
| `#e6e6e6` | 5 | near-white body type (computed `rgb(230,230,230)` on nav and body) |
| `#2e2e2e`, `#212121`, `#1a1a1a`, `#171717` | 1 each | hairlines and surface steps |
| `#ff4d4d`, `#ff0000`, `#e5e7eb`, `#9ca3af` | 1 each | error state plus Tailwind preflight residue |

Ground is **pure `#000`**; computed `body { background: rgb(0,0,0); color: rgb(255,255,255) }`. Body runs sit at `#e6e6e6` rather than pure white — 90% white, softer on black.

**Achromatic in practice: yes, very nearly.** Four greys plus black and white do all the structural work. `#ff4d00` is a single accent and it surfaces only where a pulse is wanted: the active half of the Human/Machine toggle (computed `rgb(255,77,0)`), focus rings (`--tw-ring-color: rgb(255 77 0 / var(--tw-ring-opacity))`), and small live indicators. It is never a large field.

## 4. Composition of the home first screen
The first screen **is a WebGL scene** — two 1440×900 `<canvas>` elements, and apart from chrome there is no DOM text above the fold. The only text inside the top 900px: a `[🇨🇦]` flag chip, six nav links (Home / Services / Showcase / People / Blog / Lab), `Press [/] to chat`, `Contact Us`, and the `HUMAN | MACHINE` pair.

So the assertion above the fold is made in **zero words of prose.** The verbal claim — an 11-word H1, "A digital studio & branding powerhouse making cool shit that performs", plus a 30-word support paragraph — sits *below* the canvas, at 87px, left-aligned.

Alignment: left, on a grid utility class literally named `grid-layout`. Nothing is centered.

Nav pattern: **7 items in a persistent top bar** (6 routes plus Contact Us), left-clustered, with two extra affordances riding along — an `Online` status chip and `Press [/] to chat`. No hamburger at desktop. A `HUMAN | MACHINE` toggle sits at bottom-left and swaps the site for `/ai/home`, an LLM-legible parallel version.

**Is the WORK the page? No.** The 3D scene is the page. Work begins at "Featured Projects", roughly one full screen down, after a client logo band.

## 5. How work is shown
- **Four featured projects on the home page**, in a `lg:grid-layout` block ~834px tall. Each is a full-bleed still (`3840×2160` and `1968×1104` webp/jpg from the Sanity CDN, served through `/_next/image?w=2560&q=75`) — **16:9 throughout**, no mixed crops.
- Caption structure is inverted from the usual: a ~30-word outcome sentence *first*, then capability tags ("Websites & Features", "Marketing Execution", "IRL Experience Design"), then the client name last, as the link label ("Vercel Ship", "Daylight", "KidSuper", "Shop MrBeast"). The result is the headline; the brand is the footnote.
- Prose before the first project: the 11-word H1 plus one 30-word paragraph, then the logo band. **Two blocks, then work.**
- Hover is CSS-transition reveal on the tile media; no JS cursor tracking on the tiles.
- Case page (`/showcase/daylight-…`, 8,387px tall): a **Grid / Rows view toggle** at the top, then a metadata rail — Client / Year / Type / **Awards** / Link — then a 44-word thesis, then eight `2400×1350` stills (16:9 again) and one `1171×659` looping `<video loop autoplay=false>`. There are **zero `<h1>`/`<h2>`/`<h3>` elements on the case page**: it is metadata plus captions plus images. It ends with **More Projects** — two named siblings, not a grid.
- The `/showcase` index filters by capability via query string (`/showcase?category=Websites%20%26%20Features`), and the nav prints the counts inline: `Showcase (26)`, `Blog (29)`.

## 6. The path to business
- Persistent top-bar item: **"Contact Us"** — it opens a drawer, not a page. Drawer chrome, verbatim and uppercase mono: `CONTACT US` / `CLOSE` / `SEND MESSAGE →` / `(HELLO@BASEMENT.STUDIO)`.
- A home section headed **"Contact"** with the line **"Let's make an [im]pact together."** and a bare mailto: `hello@basement.studio`. A second address, `sales@basement.studio`, exists elsewhere but not on the home page.
- Also live: **`Press [/] to chat`** in the top bar — a keyboard-invoked chat — with an `Online` status chip beside it.
- **No pricing.** No calendar link, no booking widget, no budget dropdown, and no form on the page itself; the form lives inside the drawer.
- Footer carries a newsletter whose button reads **"Roll Me In"**.

## 7. Motion vocabulary
- **three.js confirmed live** — `window.__THREE__` present on the home page; 2 canvases at home, 1 on the case page. This drives the studio's signature 3D scene.
- **GSAP** and **WebGL** are declared by the site's own JSON-LD `knowsAbout` array: "3D interactive experiences", "Next.js development", "GSAP animation", "WebGL", "Typeface design".
- No `lenis` global exposed; no marquee; **zero `<video>` elements on the home page** — all four featured tiles are stills, so the entire motion budget goes to the 3D scene. One looping video on the case page.
- Stack: Next.js with Turbopack immutable chunks, Sanity CDN for media, Ahrefs analytics.
- **What is quiet:** the type never animates, the nav never hides, tiles use plain CSS hover, and the case page is a static scroll. One heavy interactive object at the top; everything after it holds still.

## 8. Rhythm
Home is 5,814px — about 6.5 viewports. Sequence: WebGL hero → H1 plus support paragraph → logo band ("Trusted by Visionaries", ~40 client SVGs) → Featured Projects (4, full-bleed) → Capabilities ("We're here to create the extraordinary." plus 4 blocks, each listing 2–4 sub-services as plain lines) → Contact → footer.

It goes full-bleed at the hero and at every project still. It goes quiet at Capabilities, which is nothing but small type in columns.

Footer: **no giant wordmark.** A compact utility block — the same nav repeated with counts, a newsletter line, four social links, `© basement.studio LLC 2026 all rights reserved`. The restraint at the bottom is deliberate; the spectacle is all at the top.

## 9. THE BEST PART
**The caption order on the work tiles: outcome sentence first, capability tags second, client name last.**

"A bold vision needs a strong launch. We crafted a high-performance, story-driven website that cut through the noise, connected with Daylight's audience, and sold out inventory in hours." — *then* the tag, *then* the name "Daylight". The reader meets the result before the logo. That order means a tile still works when the client is unknown, because the sentence is doing the persuading rather than the brand.

It is reinforced on the case page by the metadata rail — Client / Year / Type / Awards / Link as flat labelled fields, ahead of any prose — and by `Showcase (26)`, the count printed in the nav so the depth of the body of work is asserted before you click.

**Legal for him: yes, entirely.** He has seven receipts with names and numbers, and those become the outcome sentences. The metadata rail is a container he can fill honestly from artifacts he already holds, and it survives having no logo, no testimonial and no award, because those are optional rows and a missing row reads as a missing row rather than a gap. The count-in-nav move works with `(7)` exactly as it works with `(26)`. The one part he must not copy is the logo band — that requires clients who let you print their marks, and he has none.

## 10. THE TELL
**`Press [/] to chat`, the `Online` status chip, and the `HUMAN | MACHINE` toggle to `/ai/home`.** This is the 2026 AI-studio uniform: a command-palette hint in the header, a presence indicator borrowed from Slack, and a machine-readable parallel site. It reads as the studio signalling which client segment it wants — the JSON-LD lists "AI startup branding" and the logo band is 40 AI companies — rather than as anything the visitor needed. It dates the page to a season.

Secondary tell: `font-weight: 600` on absolutely everything. A single-weight page is a fast decision rather than a considered one, and it is why the Capabilities section reads as flat as it does.

## 11. Screenshots
- Home: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/basement-home.png` (1440×900 viewport, full-page capped at 2700px)
- Work: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/basement-work.png` (`/showcase/daylight-simplicity-in-motion`, same settings)
