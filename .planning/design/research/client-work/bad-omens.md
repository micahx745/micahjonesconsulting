# Bad Omens — badomensofficial.com (client build by darkroom.engineering)

## 1. Fetch proof
- Live URL: `https://www.badomensofficial.com/` → 301 → `https://badomensofficial.com/` — **HTTP 200**.
- `<title>` (curl and Playwright, both): **`Home - Bad Omens Store`**
- `<meta name="author" content="darkroom.engineering">` sits in the head. Footer credit line, verbatim from the DOM:
  **"DESIGNED BY ALT-TUNING  DEVELOPED BY DARKROOM.ENGINEERING"** — darkroom built it; an outside
  design studio (alt-tuning) art-directed it.
- Studio pointer page: `https://darkroom.engineering/work/badomens`, `<title>` **`Bad Omens`** (fetched, 200).
  What it says it is: *"Official website and e-commerce platform for Bad Omens, the American rock band"*,
  *"a dark, immersive digital experience"*. Listed year 2024, category ecommerce, stack: Satus, Lenis,
  Next.js, GSAP, Storyblok, Vercel, GraphQL.
- Live-code correction to that case study: on the home page **GSAP is not loaded** (`window.gsap === false`;
  no gsap anywhere in the delivered bundle graph). Lenis IS (`<html class="lenis">`). CMS is Storyblok
  (`a-us.storyblok.com` image origins), commerce is Shopify (890 `shopify` strings in the SSR payload),
  email capture is Klaviyo (company_id QYsbex), host is Vercel, framework is Next.js with Turbopack chunks.

## 2. The client and the product
Bad Omens, a metalcore band: this is the band's own store — merch drops, pre-orders, tour tickets, pop-up
shop addresses and the "stream the new single" moment, all on one page.

## 3. First screen
- Asserts almost nothing in words. **One word of copy in the entire first viewport: "STREAM".** No headline,
  no dek, no band name in text.
- The hero IS a **film still, full-bleed, 100dvh** — a 4392x3164 frame pulled straight from the music video
  (an evidence-wall / crime-scene set, near-black teal), served through `next/image`, with a centered
  16:9 **YouTube facade** (a click-to-play thumbnail button; the real embed mounts only on click) at 50%
  width, and the word STREAM under it.
- Nav pattern: **there is no nav on the first screen.** The fixed header carries `data-hide="true"` and
  `opacity: 0` at scrollY 0 (verified in the DOM) and fades in over 300ms on `--gleasing`
  cubic-bezier(.4,0,0,1) once you scroll. It then holds **three items**: a 618px-wide wordmark logo
  ("HOMEPAGE"), **MENU**, and a cart pill reading **`00`**. Everything else lives behind the MENU modal
  (HOME / SHOP / TOUR DATES / POP-UPS / LEFT FOR GOOD / DYING TO LOVE / IMPOSE / SPECTER / ABOUT /
  UK STORE / AUSTRALIA STORE / TERMS, plus six social icons).

## 4. Type system FROM THE CSS
- **Zero `@font-face`. Zero webfonts.** The three shipped stylesheets declare exactly two families:
  `Helvetica, Arial, sans-serif` (13 declarations) and `monospace` (1). `document.fonts` holds only
  Klaviyo's Nunito Sans, status `unloaded`. Computed styles across the page: **360 of 362 text nodes render
  in Helvetica/Arial at weight 400**; the two exceptions are a `"Times New Roman"` fallback inside
  third-party markup.
- Display vs text: **no distinction**. Section titles 22.5px, product titles 13.5px, pop-up body 13.3px —
  same face, same single weight. The only "display" scale on the page is the header wordmark, which is an
  *image*, not type.
- Sizes are `vw`-locked, not `clamp()`: `.833333vw` body, `1.25vw` h2, `1.5625vw` links; `2.32558vw` /
  `3.25581vw` on the sub-800px branch. Two hard breakpoints (799/800px) instead of fluid interpolation.
- Tracking: **`letter-spacing` computes to `normal` everywhere** on the home page. Five declarations exist in
  the CSS, all inside sub-modules this page never mounts. Nothing is tracked out.
- Uppercase: **12 `text-transform: uppercase` rules covering essentially all chrome** — headings, product
  titles, prices, tour rows, menu, footer form. Lowercase survives only in the pop-up street addresses.
- Mono use: one `monospace` declaration, not visibly exercised.

## 5. Palette from the CSS
Declared in a single inline `<style>` in the head — five tokens and three themes, and that is the whole system:
```
:root{--black:#131514; --white:#ffffff; --gray:#ECEAEB; --green:#27414C; --red:#917269;}
.theme-base {--theme-primary:#131514; --theme-secondary:#ECEAEB; --theme-contrast:#27414C;}
.theme-dark {--theme-primary:#131514; --theme-secondary:#ffffff; --theme-contrast:#917269;}
.theme-green{--theme-primary:#131514; --theme-secondary:#27414C; --theme-contrast:#ffffff;}
```
Computed frequency on the live home page (which runs `theme-base`): `rgb(236,234,235)` #ECEAEB **722** ·
`rgb(39,65,76)` #27414C **282** · `#ffffff` 204 · `rgba(236,234,235,.2)` 32 (hairline rules) ·
`rgb(19,21,20)` #131514 5 (it is the body ground, so it is set once) · `#000` 1.
- Ground: **#131514**, an almost-black with a green cast. `meta theme-color` and `color-scheme: dark` match it.
- Type colour: **#ECEAEB**, an off-white. Never pure white for body.
- Accent: **#27414C**, a desaturated slate-green. It is the client's brand colour doing the work — the same
  teal-green that grades the film stills. It appears only on *labels and wipes*: the ANNOUNCEMENT header bar,
  the SOLD OUT ticker, the newsletter `<legend>`, the menu modal at `#27414c80`, the tour-row hover wipe.
  Never on type. `--red #917269` (dusty oxblood) is reserved for `.theme-dark` and goes unused here.

## 6. The narrative arc (measured section tops, 9098px page)
1. **0–900** Hero — 100dvh film still, YouTube facade, the word STREAM. No nav, no name.
2. **918–5059 (4141px, 45% of the page)** PRE-ORDER COLLECTION — h2 plus "SHOP ALL", then a 3-up product grid,
   twelve items, $36–$80, every one tagged "(PRE-ORDER)". Sold-out items wear an ANNOUNCEMENT strip.
3. **5177–7241 (2064px)** EVERGREEN COLLECTION — the same grid for the permanent catalogue, in-stock and
   sold-out mixed together.
4. **7359–7768 (409px)** BAD OMENS – LOCATIONS — two tour rows on a 30-column grid: MONTH · date · festival ·
   city · TICKETS pill, separated by dotted hairlines.
5. **7768–8723 (955px)** POP-UP SHOP LOCATIONS — five dated street addresses in a left column, the pop-up
   poster art at right.
6. **8723–9098** Footer — 100svh (26vw desktop) full-bleed still from the same set as the hero, a
   `linear-gradient(#131514, transparent)` scrim over it, and one glass card: SUBSCRIBE FOR UPDATES /
   NAME@EMAIL.COM / SUBMIT.

The arc is: *watch the thing → buy the thing → see the thing live → be told about the next thing.* Buying is
literally two thirds of the scroll.

## 7. Motion grammar
- Libraries in the DOM: **Lenis** (`<html class="lenis">`, `data-lenis-prevent` on both modal scrollers) —
  and that is the whole animation stack. **0 canvases. 0 `<video>` elements. No GSAP. No three.js. No hamo,
  no tempus. `document.getAnimations()` returns an empty array at rest.** The only third-party JS is Klaviyo.
- Scroll-driven behaviour, complete list:
  - **Header hide/reveal** — `[data-hide=true]{opacity:0; pointer-events:none}` with
    `transition:.3s opacity var(--gleasing)`; hidden at y=0, shown by y=1200 (both verified). The wordmark
    inside it carries its own independent `data-hide`.
  - **Sticky PDP rail** — a single `position:sticky` on the product page's details column
    (`top: calc(var(--header-height) + 3.64583vw)`).
  - **Marquee** — a transform-driven `.marquee > .inner{white-space:nowrap; transform:translate(0,0)}`
    ticker, JS-stepped, used for the SOLD OUT strip inside product cards.
- Hover behaviour:
  - **Product image crossfade** — two stacked absolute images, `transition: opacity .3s ease-in-out`
    (front and back of the garment).
  - **Tour-row wipe** — `::before{background:var(--theme-contrast); transform-origin:0; transform:scaleX(0);
    transition: transform .3s var(--ease-out-expo)}` going to `scaleX(1)` on `.hover`. A green bar sweeps the
    full row from the left edge.
  - **Link underline grow** — `.link:after{width:105%; transform:scaleX(0); transition .5s var(--ease-out-expo)}`
    going to `scaleX(1)`.
- Deliberately still: **the hero**. No parallax, no Ken Burns, no scrub, no autoplaying video, no entrance
  stagger anywhere, no page transitions, no cursor work, no scroll-jacking, no pinning outside that one PDP
  rail. The product grid does not animate in.
- **THE ONE MOTION MOMENT: the SOLD OUT ticker inside a sold-out product card.** A green `ANNOUNCEMENT`
  header bar drops onto the card, and beneath it a marquee runs `SOLD OUT • SOLD OUT • SOLD OUT •` on loop
  inside a bordered strip. Nothing else on the page moves on its own; the only thing that *does* move is the
  thing you can no longer buy. That is the emotional design of a drop store compressed into one component.

## 8. Commerce / the ask
- Primary ask on every card: the product title plus a price pill (`$36.00`) — the card IS the button; there
  is no add-to-cart until the PDP. Sold-out items show a `SOLD OUT` pill *beside* a still-visible price,
  which keeps the loss legible.
- Section-level ask: **"SHOP ALL"**, once per collection, small, sitting next to the h2 — never a big button.
- Tour ask: **"TICKETS"** pill, right-aligned, one per row.
- Cart: a header pill reading **`00`** (zero-padded item count) with a cart glyph.
- Terminal ask: **"SUBSCRIBE FOR UPDATES"** / placeholder `NAME@EMAIL.COM` / **"SUBMIT"** (Klaviyo).
- Loudness: quiet. Every CTA is the same ~13px uppercase Helvetica in a small grey pill. Nothing is a
  full-width coloured button. The photography carries the volume; the UI whispers.

## 9. Rhythm
Six sections. Two of them (hero, footer) are **full-bleed 100dvh/100svh photographs**; the four middle ones
are **contained on a 30-column grid** (`--layout-columns-count:30`, `--layout-margin:2.08333vw`,
`--layout-columns-gap:.520833vw`; 5 columns and 4.65vw margins on mobile). Cards take a `.416667vw` (~6px)
radius. It goes quiet twice: the 409px tour block, which is nothing but hairlines and text after 6300px of
product grid, and the ~500px of empty ground before the footer photograph begins. Footer pattern: a
photograph the height of the screen, gradient-scrimmed into the page above it, with a single
backdrop-blurred `#13151466` email card floating near the bottom — the page ends on the same set it opened on.

## 10. THE BEST PART for Micah
**The zero-webfont build.** This is a nine-figure band's flagship store, made by the studio that wrote Lenis,
and it is set entirely in **Helvetica/Arial, one weight, uppercase**, with **no `@font-face` rule anywhere**.
Every ounce of identity comes from (a) full-bleed photography, (b) a five-token colour system in a single
inline `<style>`, and (c) uppercase. The type is deliberately the plainest available surface so the pictures
and the words carry the meaning.

Micah's transferable version: he has nine hand-drawn book pages, a photograph of himself, screenshots, and
seven named receipts — real pictures. The mechanism is **let the artifact be the only ornament, and hold the
chrome to one face, one weight, uppercase labels, and a five-value palette declared in one place.** Two
sub-mechanisms to lift more or less verbatim:
1. **The nav that is not there until you have seen the thing.** `data-hide="true"` plus `opacity:0` plus a
   300ms `cubic-bezier(.4,0,0,1)` fade on the fixed header, released after the first viewport. His first
   screen becomes one book page and one sentence with nothing competing; the nav arrives once the reader has
   committed. (House Lights note: this is a fade, not a second signature motion — one CSS transition, no library.)
2. **The label-bar plus ticker as the only moving thing.** One accent-coloured header strip over a card
   (`ANNOUNCEMENT`), and a marquee beneath it stating one status. For Micah that is a `BOOKED THROUGH MARCH`
   or `2 SLOTS` strip on a package card: the single animated element on the page, reserved for scarcity, so
   motion means something instead of decorating. He already owns honest content for it; nothing is invented.

Runner-up, cheaper still: the **tour-row wipe** — `::before` `scaleX(0)` to `scaleX(1)` from
`transform-origin:0` over 300ms `ease-out-expo` — as the hover state for a receipts or engagements list. It
reads expensive and is four lines of CSS.

## 11. THE TELL
**The photography is the budget.** The hero and footer are stills from a professionally shot music video — a
built set (an evidence wall, practical lighting, a colour grade), a 4392x3164 frame, a crew. So is every
product shot: studio-lit garments on a sweep with matching falloff, plus a second angle per SKU to feed the
hover crossfade — a full merch photoshoot with a consistent grade. And the whole store rides a
Shopify + Storyblok + Klaviyo commerce stack with real inventory behind the SOLD OUT states.

None of that is a mechanism; it is a line item. Do not fake it with stock photography, AI stills, or an
invented "SOLD OUT" badge on something that was never for sale — a scarcity ticker over fake scarcity is the
one way this borrow goes wrong.

## 12. Screenshots
Playwright, Chromium, own browser context (1440x900, DSF 1):
- `bad-omens-top.png` — first screen, y=0
- `bad-omens-mid.png` — y=2869 (35%)
- `bad-omens-late.png` — y=5739 (70%)
- `bad-omens-390.png` — 390x844, DSF 2, iPhone UA, first screen
- `bad-omens-footer.png`, `bad-omens-hover.png` — extra: footer email card, tour-row block

All in `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`.
