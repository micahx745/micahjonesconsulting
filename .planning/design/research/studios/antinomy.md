# Antinomy Studio — teardown

Slug: `antinomy` · Kind: studio · Researched 2026-09-05

---

## 1. Fetch proof

- URL: `https://www.antinomy.studio/` — **HTTP 200**, 228,067 bytes HTML.
- `<title>` → **`Antinomy Studio`**
- Second page fetched: `https://www.antinomy.studio/project/vast` — 200, `<title>` → **`Antinomy Studio | Vast`**
- Also fetched 200: `/work` (133,105 B), `/llms.txt`, `/work.md`, `/contact.md`, `/project/vast.md`, and the single CSS chunk `/_next/static/chunks/1mi4o5yexwvxm.css` (47,392 B) plus all 23 JS chunks (1.98 MB).
- Stack tell: Next.js App Router on Vercel, Turbopack chunks, Tailwind v4 (CSS-first, `@layer utilities`). Meta description: "Antinomy is an independent creative studio shaping contemporary brands."
- Notable: the site ships `/llms.txt` and a per-page `.md` mirror of every route (`/index.md`, `/work.md`, `/project/vast.md`). It instructs agents that project pages are authoritative over broad studio claims.

---

## 2. Type system (from the CSS, not from looks)

**One family. One weight in practice. Three sizes on the entire home page.**

`@font-face` — four declarations, all one family, self-hosted `.woff` from `/_next/static/media/`:

```
ABCDiatype  400  ABCDiatype_Regular-s.p.2r2_aachf6bvu.woff
ABCDiatype  500  ABCDiatype_Medium-s.p.0tfh8_nr3c2-4.woff
ABCDiatype  700  ABCDiatype_Bold-s.p.09j_ele_53wzl.woff
ABCDiatype Fallback  src: local(Arial); ascent-override:98.15%; descent-override:27.78%; size-adjust:99.34%
```

No Google/Adobe link. No serif. No monospace anywhere in the served CSS (`--font-mono` is Tailwind's untouched default and is never applied). **`text-transform` appears zero times in the whole stylesheet** — nothing is uppercased by CSS; the one all-caps string visible on the home page ("NOW READING: TROYE SIVAN…") is inside a client's own artwork.

The root-size trick that makes the rem values readable:

```css
html { background: var(--background); font-size: 10px }   /* 1rem = 10px */
body { font-family: var(--font-diatype); font-size: 1.4rem;
       letter-spacing: -.028rem; font-weight: 400; }      /* 14px / -0.28px ≈ -0.02em */
.type-h1 { font-size: 2.4rem; line-height: 105%;
           letter-spacing: -.048rem; }                    /* 24px / -0.48px ≈ -0.02em */
.type-content { max-width: 100% }
@media (min-width:48rem){ .type-content { max-width: 40rem } }  /* 400px measure */
```

**`.type-h1` has no responsive override. 24px at 375px, 24px at 1440px.** Verified live at 1440×900: the largest font-size on any element on the home page is **24px**, and it is the `<h1>`. There is no display face and no display clamp — there is no `clamp()` in the stylesheet at all.

Computed type census, home page at 1440 (leaf nodes with text; `size/weight/letter-spacing/transform`):

| decl | count | role |
|---|---|---|
| `14px / 400 / -0.28px / none` | 143 | everything: body, nav, captions, news |
| `24px / 400 / -0.48px / none` | 89 | headline + every case-study caption (word-split spans) |
| `14px / 500 / -0.28px / none` | 19 | the *only* emphasis: metadata keys ("Year", "Client", "Scope") |
| `10px / 400 / -0.2px / none` | 4 | micro-labels |
| `10px / 400 / normal / none` | 2 | micro-labels |

Other sizes exist in the CSS but are not on the home page: `0.7rem` (7px), `1.1rem` (11px), `13px`, `md:text-[10rem]` (100px) and `lg:text-[15rem]` (150px). The 100/150px pair is the sole large-display utility in the build and never fires on `/`, `/work` or `/project/vast` — reserved for a 404 or a one-off. Weight 700 is loaded but unused on the pages inspected; the `strong` reset maps bold down to `font-weight:500`.

The whole hierarchy is **24 vs 14 vs 10**, at one weight, with a −0.02em tracking constant applied at both display and body scale.

---

## 3. Palette (from the CSS)

```css
:root {
  --motion: 1;
  --header-height: 3.8rem;          /* 38px */
  --color-grey: #f5f5f5;
  --foreground: var(--color-black); /* #000 */
  --background: var(--color-white); /* #fff */
  --ease-out: cubic-bezier(.16,1,.3,1);
  --section-padding: 10rem;         /* 100px → 150px @48rem → 185px @64rem */
  --gap: 1.8rem;                    /* 18px, the single spacing unit */
}
@media (prefers-reduced-motion: reduce) { :root { --motion: 0 } }
```

Hex counts in the stylesheet: `#0000` ×14 (transparent), `#f5f5f5` ×4, `#fff` ×3, `#000` ×2, `#0a0a0a` ×1, `#232323` ×1 (`--color-dark`, unused on these pages). Zero `oklch()`.

Live computed on the home page: text color is `rgb(0,0,0)` on 843 elements and `rgb(255,255,255)` on 69 (type sitting on dark media). Backgrounds: `#000` ×50, `#fff` ×30, `#f5f5f5` ×19. Everything else is `rgba(0,0,0,0.05)` hairlines and `/0.8` scrims.

**Achromatic in practice: yes, absolutely.** The interface has no accent color. The two dozen saturated hexes also present in the bundle — `#3d065f`, `#eafec9`, `#e9c1ff`, `#d90909`, `#feb18b`, `#001222`, `#cce7ff`, `#fdf3ec` — are per-project theme grounds injected around case-study media; the *chrome* never uses them. Color on this site is always somebody else's brand, never Antinomy's.

---

## 4. Composition of the home first screen

**What it asserts, in eleven words:** *"Antinomy is an independent creative studio shaping contemporary brands."* That is the entire first screen. Nothing else. No sub-line, no button, no scroll cue, no image.

- **Alignment:** flush left, top-left, indented one `--gap` (18px) from the content edge, set in a 400px measure at 24px. The right two-thirds of the screen is empty white.
- **Nav pattern:** a **pill** — fixed, centered, 38px tall (`border-radius:19px`, `bg-(--background)/80`, `backdrop-blur-md`, `border-(--foreground)/5`), max-width 1200px at ≥80rem, floated 18px below the top edge. Left end: a 20px circular monogram mark. Right end: **four** items, `Home, Work, About, Contact`, comma-separated as one running sentence with the commas at `opacity:.4`. Inactive links sit at `opacity:.4` and go to 1 on hover (`@media(hover:hover)` only). No hamburger, no hidden menu, no CTA in the bar.
- **Is the work the page?** Not on the first screen — but the delay is about one screen. The h1 section is `h:[calc(var(--height)+var(--height))]` with `mb:-var(--height)` and a `sticky top-0` child: the headline sits still while a full-bleed showreel (`aspect-square` on mobile, `aspect-video` on desktop, poster served eager with `fetchPriority="high"`) rises over it. By 900px of scroll the page is entirely client work.
- The `<h1>` is doubled: a `visually-hidden` full sentence for screen readers and machines, plus an `aria-hidden` span-per-word rig, each word server-rendered at inline `style="opacity:0.1"`, with a `no-js:opacity-100!` escape.

Home section order (7 sections, measured heights at 1440):
`hero 620px` → `showreel 802px` → `featured work 8,218px` → `selected clients 45px` → `about preview 900px` → `news 579px` → `news rail 579px`. Total scroll height **9,829px**.

---

## 5. How work is shown

**Alternating full-bleed media and a 24px caption in an off-column — not a grid, not a list-index.** There are no `grid-cols-*` utilities in the served CSS for either page. Four featured projects on the home page (i-D, Vast, Google Gemini, MetaMask), each a `Case Study / View Case Study` pair of links to `/project/<slug>`.

- Aspect ratios in the markup: `aspect-3/4` ×17 (dominant, portrait), `aspect-530/662` ×8 and `aspect-921/1150` ×5 (both ≈ 0.80, i.e. 4:5), `aspect-video` ×4, `aspect-square` ×4. Portrait-first, 3:4 and 4:5 — the ratios of a magazine page, not of a laptop screenshot.
- **Captions are the headline.** Each project's caption is set at the same `.type-h1` 24px as the studio's own positioning line, and it is a full sentence about the *client*, not about the studio: *"i-D Magazine, the defining voice in identity, style and culture."* / *"Vast, pioneering the next giant leap toward long-term living and thriving in space."* Antinomy's own name appears once above the fold and then effectively disappears.
- Media: 11 `<video>` and 40 `<img>` on the home page; 18 videos, 17 images, 6 `<canvas>` on `/project/vast`. Home carries exactly **1 canvas** (WebGL).
- Hover: the only hover rules in the stylesheet are `@media(hover:hover){ .type-link:hover{opacity:1} }` and a couple of `hover:bg-white hover:text-…` inversions on buttons. **No tile scale, no image zoom, no reveal-on-hover.** `cursor-grab` exists in the bundle for a draggable gallery but is not instantiated on the home page.
- **How many projects before any prose:** four. The first paragraph of studio prose on `/` is "We are a team of people from all across the globe." — section five of seven, roughly 7,000px down. `/work` lists 13 projects with four discipline filters (Strategy, Identity, Motion, Interactive) and no prose at all.
- `/project/vast` structure: grey title (unread state) → black dek → a three-row metadata block (`Year 2025 / Client Vast / Scope Design, Motion, Interactive`, key in 14px/500 black, value in 14px/400 grey) → full-bleed video → narrative → alternating media. It closes with a **Colophon** naming Scope (6 lines), **Credits crediting other studios by name** (Manual Creative, Future Deluxe, Territory Studio) and Awards. Then one "Next Project" link. Page height: 20,258px.

---

## 6. The path to business

There is **no CTA on the home page**. None. No "Start a project," no "Get in touch," no calendar, no form, no pricing.

- The whole of the ask lives in the footer and on `/contact`, and it is one sentence: **"For project inquiries, email hi@antinomy.studio."**
- The footer control is labelled **"Copy Mail"** with `Email` and `hi@antinomy.studio` beside it — clicking copies the address rather than launching a mail client.
- `/contact` is contact-form-free: the studio statement, the named human (`Contact: Baptiste Briel`), the email, two physical offices with Google Maps links (AMS: Levantkade 87, 1019 MJ Amsterdam · BER: Kurfurstenstrasse 143, 10785 Berlin), and three social links (X, Instagram, LinkedIn).
- Nav item is the plain word **"Contact"**, at `opacity:.4` like the other three — the ask is given no more visual weight than "About."
- Pricing: not shown, not hinted at, no ranges, no "starting at."
- Instead of a CTA, the footer's last move is a lateral one: a "Discover" link handing the reader off to **27b**, their sibling studio for entertainment, fashion and culture clients.

---

## 7. Motion vocabulary

Libraries actually in the bundle (grep across all 23 chunks, 1.98 MB):

| library | hits | verdict |
|---|---|---|
| `lenis` / `@studio-freight` / `tempus` | **0** | no smooth-scroll library |
| `gsap` / `ScrollTrigger` / `ScrollSmoother` | **0** | none |
| `THREE` | 103 · `WebGLRenderer` ×35 · `ShaderMaterial` ×23 | three.js present |
| `@react-three/fiber` / `useFrame` | 1 / 7 | R3F |
| Motion runtime (`motionValue` ×25, `useScroll` ×8, `spring` ×28, `useTransform` ×2) | — | present |
| `startViewTransition` | 1 | React 19's built-in view transitions |
| `IntersectionObserver` | 7 | reveal triggers |
| `framer-motion` / `embla` / `swiper` / `splitType` / `hls` / `EffectComposer` / `OrbitControls` | 0 | none |

Behaviours:

- **The signature is a word-by-word opacity fill driven by scroll.** Every headline and paragraph is server-rendered split into one `<span>` per word at `opacity:0.1`, and the words fill to 1 as the block passes through the viewport. Caught mid-flight in the `/project/vast` capture: *"…we were tasked with **highlighting both their technical**"* is black while the rest of the sentence is still grey. It is the only thing on the site that animates, and it is doing the work an italic or a bold would do — pacing the read.
- Sticky-not-pinned hero: `sticky top-0` inside a double-height section with a negative bottom margin. The headline holds while the showreel overtakes it. No pin library, no scroll hijack.
- Smooth scrolling is **native** (`body { scroll-behavior: smooth }`), not JS-driven — momentum stays the OS's.
- A marquee exists in the CSS (`--marquee-duration:60s`, `--marquee-direction:-1`, `@keyframes marquee`, `.animate-marquee`) but **`.animate-marquee` is not mounted on the home page** — the "Selected clients" section measures 45px tall and is a quiet strip, not a scrolling logo belt.
- `--motion: 1`, flipped to `0` under `@media (prefers-reduced-motion: reduce)` at `:root`, so one custom property gates the whole motion system.
- Ease is one curve: `--ease-out: cubic-bezier(.16,1,.3,1)`.
- **What is quiet:** no cursor follower (the only `cursor` hits are `cursor-pointer`, `cursor-grab`, `cursor-progress`), no parallax, no horizontal gallery on `/`, no velocity/skew effects, no load counter, no scroll-jacking, no marquee, no custom scrollbar.

---

## 8. Rhythm

- Seven `<section>`s on the home page over 9,829px. Height budget: 620 / 802 / **8,218** / 45 / 900 / 579 / 579. Featured work is 84% of the page.
- Where it goes quiet: the hero (620px holding eleven words and nothing else) and the 45px "Selected clients" strip — a whole named section given the height of two lines.
- Where it goes full-bleed: the showreel and every case-study media block, edge to edge with zero side gutter, against a `#fff` / `#f5f5f5` alternation. The `.content` wrapper is `padding-inline: var(--gap)` up to 80rem, then `max-width: 1200px` with zero inline padding — so text lives in a 1200px column and media escapes it entirely.
- Vertical rhythm is one variable: `--section-padding` 100 → 150 → 185px. Horizontal is one variable: `--gap` 18px.
- **Footer: 1,000px tall, and there is no giant wordmark.** It is an index, not a sign-off: Copy Mail / email / X / Instagram / LinkedIn, then two office blocks with street addresses and map links, then the 27b cross-link. The largest thing in it is still 24px.
- One structural oddity worth naming: the news section is a dated ledger running back to **November 2021** — awards, talks, new-client notes, an office move — twenty-odd entries, each with a date, a category (`News` / `Events` / `Awards` / `Clients` / `Press` / `Interview`) and one sentence. It is a changelog for a studio.

---

## 9. THE BEST PART

**The headline and the client caption are set at exactly the same size, in the same weight, on the same baseline — 24px — so the page has no voice louder than the work it is describing.**

There is no display type on this site. The studio's own positioning sentence, the caption on the i-D case, and the dek on the Vast page are typographically indistinguishable. The consequence is that Antinomy never appears to be shouting about itself; it appears to be *introducing* things. The hierarchy a normal site buys with 120px display type, this one buys with **white space and sequence** — a 620px screen holding eleven words, then 8,218px of somebody else's photographs.

The mechanism underneath it: **three sizes (24 / 14 / 10), one family, one weight, one tracking value (−0.02em) applied at both scales, one spacing unit (18px), one section rhythm (100/150/185px), one easing curve.** That is the whole system. It is reproducible from a text file.

**Is it legal for Micah?** Yes — and it is close to the only borrowed principle here that is fully legal for him, because it is a *restraint*, not a proof device. It costs nothing to adopt and needs no logos, no testimonials, no invented metrics. Specifically:

- **Cap the display size.** A 24px-class headline (one modest Bricolage step in House Lights terms) set in a 400px measure, with the rest of the page in 14px, would let the book's hand-drawn pages, the seven receipts and the screenshots be the largest things on the site. The temptation on a solo consultant's site is to make the *claim* the biggest object; Antinomy proves the claim can be small and still land.
- **Give the artifacts the portrait ratios.** `aspect-3/4` and 4:5, full-bleed, no gutter. A hand-drawn book page is a portrait object and photographs better at 3:4 than in a 16:9 card.
- **The caption-as-headline move transfers directly and honestly.** Micah cannot write "i-D Magazine, the defining voice in identity, style and culture" — he has no client logos and no permission. But he *can* set a receipt's own line — a real number with a real name on it, from his seven receipts — at headline size, and put his own name nowhere near it. The rule to steal is: *the largest text on the page is a fact about the work, never a claim about me.*
- **Adopt the copy-the-email footer.** "Copy Mail" plus a visible address and a named human, with no form and no calendar, reads as more available than a form does, and it is the right pattern for a solo operator who answers his own mail. It is also one fewer thing to build.
- **Steal the dated ledger, honestly.** Antinomy's news list works because every entry is a checkable event with a date. Micah has real dated events (a book finished, a system shipped, a receipt earned). A ledger of those is proof by accumulation and needs no logo wall.

Do **not** steal the showreel, the WebGL canvas, or the two-office footer — all three are proof-of-scale devices for a 2019-founded team, and on a one-person site they read as costume.

---

## 10. THE TELL

**The floating blurred pill nav.** `border-radius:19px`, `bg-(--background)/80`, `backdrop-blur-md`, `border-(--foreground)/5`, fixed 18px below the top edge, centered, max-width 1200px. This is the most-copied 2024–2026 component on the agency web; it arrives pre-installed in every Tailwind/Next starter, and it is the one element on an otherwise ruthlessly specific page that could be lifted onto any other studio in this study without anyone noticing. The comma-separated `Home, Work, About, Contact` inside it is a genuinely nice touch — but it is performing that nice touch inside a stock container.

Runner-up tell, minor: the `/llms.txt` plus per-route `.md` mirror and `webmcp-diagnostics.js`. Technically thoughtful, and it will date fast — it is 2026's `humans.txt`, and on a consultant's site it would read as exactly the dev-Twitter tell the House Lights blueprint §13 already bans.

---

## 11. Screenshots

- Home, 1440×900 viewport, full-page capped at 3 viewports (1440×2700):
  `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/antinomy-home.png`
- Case study `/project/vast`, same settings:
  `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/antinomy-work.png`
