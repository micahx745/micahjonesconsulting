# sf-work-3 — Studio Freight / Perplexity Comet (case study)

Kind: `sf-work` (Studio Freight's own case-study page for a client launch).
Captured 2026-09-05, 1440x900, Chromium.

---

## 1. Fetch proof

- URL: `https://studiofreight.com/work/perplexity-comet`
- HTTP status: **200** (verified via `page.request.get`)
- `<title>`: **`Perplexity Comet | Studio Freight`**
- Stack: Nuxt (`/_nuxt/*.css` chunk names — `_slug_`, `MediaGrid`, `PreFooter`, `Symbol`, `ALink`). `document.documentElement.className === "lenis theme-dark"`.
- Document height at 1440 wide: **11,103px** (≈12.3 viewports).

## 2. Type system (from CSS, not looks)

Three self-hosted `@font-face` families, all `.woff2`, all preloaded in `<head>`:

| family | role | observed use |
|---|---|---|
| `publico-text-mono-roman` | **display AND label AND UI** | 46 of 64 leaf text nodes |
| `publico-text-mono-semibold` | emphasis only | 2 nodes |
| `jjannon-regular` | the serif "voice" face | 11 nodes |

- Publico Text Mono is a **mono-serif** — a monospaced Publico. This is the whole identity: the studio runs a serif on a fixed advance width for nav, labels, and the giant project title, and reserves a proportional serif (JJannon) for the few large editorial moments.
- Weights in use: `400` everywhere. There is no weight ladder — semibold is a separate loaded file, used twice.
- Display sizes (computed, not clamps — they resolve to px):
  - Project title `PERPLEXITY COMET`: **144px / lh 115.2px (0.8) / letter-spacing −2.88px (−0.02em) / uppercase**, publico-text-mono-roman.
  - Overlay-menu items (Home, Work, Info, News, Aeon, Contact): **56px / lh 44.8px (0.8) / ls 1% / uppercase**.
  - JJannon display: **42px / lh 48.72px (1.16) / ls normal** — the "More" project names.
- Text sizes: body/labels **14px / ls 0.14px (0.01em)**, some `text-transform: capitalize`; JJannon body **18px / ls 0.18px**.
- **The whole page runs on two text sizes (14 and 18) and three display sizes (42, 56, 144).** That is the entire scale.
- Uppercase is used exactly twice: the project title and the overlay nav. Nothing else shouts.
- Negative tracking on display (−0.02em), positive tracking on everything small (+0.01em) — the classic inversion, applied consistently.

## 3. Palette (from computed styles)

Two colors. Literally two.

| value | role | count (leaf text nodes) |
|---|---|---|
| `rgb(254, 253, 252)` `#FEFDFC` | type + the one light panel | 59 |
| `rgb(0, 0, 0)` `#000000` | ground (`html` and `body` background) | 5 |

- Ground: **pure `#000`** on both `html` and `body`. Not a soft near-black — zero.
- Type: **`#FEFDFC`**, a warm-shifted white (R254 G253 B252), never `#FFF`.
- Greys: **none in the CSS.** All grey on screen is video/photograph luminance, not a token.
- Accents: **none in the CSS.** Every color on the page — the comet's teal, the Venus planet's orange/cyan stripes, the bluebell purples — arrives inside `<video>` and `<img>` content. The site chrome contributes zero hue.
- **Achromatic in practice: yes, absolutely.** This is the strongest version of the pattern in this study set: the design system is monochrome and the client's work supplies 100% of the color.

## 4. Composition of the first screen

(This is a case page, so field 4 reads as "the case's first screen".)

- Fixed top bar, 64px (`--header-height: 64px`), four zones across:
  1. far left — the studio's horse-and-`F` mark, 40x40px `<img>`;
  2. left-of-center — `• Work`;
  3. center — `Perplexity Comet / Back` (the breadcrumb doubles as the back link);
  4. right — `Home, Info, News, Aeon` as a **comma-separated run of text**, then `Contact` pinned to the far right.
- Nav item count: 6 destinations + Work + Back = 8 links in a 64px bar, all at 14px.
- **Words asserted on the first screen: zero.** No headline, no dek, no client name in prose. The first screen is one full-width video of a comet with the client's own logo lockup centered in it. The page identifies itself only through the breadcrumb in the header.
- A fixed footer strip is pinned to the bottom of the viewport at all times: `IG / LI` left, `Studio Freight` centered, `©2026 / Terms` right.
- Grid: `.layout-grid` = **12 columns of 107px, 12px gutter** at 1440. Media blocks span 11 of 12 (1178px wide) or half (583px).
- **Is the work the page? Yes, to an extreme degree** — see §5.

## 5. How work is shown

The DOM order is the finding. `section.work-case` has exactly four children:

| order | block | top | height |
|---|---|---|---|
| 1 | `.work-case__media` | 64px | **8,723px** |
| 2 | `.work-case__title` | 8,787px | 443px |
| 3 | `.work-case__content` (Info + prose + Services + Labels + Links) | 9,230px | 1,123px |
| 4 | `.work-case__media-grid` → `.work-case__pre-footer` (More + Contact) | 10,354px | 750px |

- **8,723px of media — 9.7 full viewports — before a single word of prose.** The project title arrives at 79% scroll depth. The write-up arrives at 83%. A reader who bounces at two screens has seen only the work.
- Media census: **13 `<video>`, 7 `<img>`, 0 `<canvas>`.** Every video is `autoplay` + `loop`, `object-fit: contain`.
- Aspect ratios in the stack: 1.51 (3:2, the full-width hero and wides), 0.75 (3:4 verticals, paired two-up at 583px each), and a run of very wide crops (7.85 at full width, 3.89 at half width) used as band/strip moments between the large plates.
- **Captions: none.** Zero `figcaption`, zero `[class*=caption]` elements on the page. Nothing labels or explains an image.
- Hover behaviour on media: none detected — the media stack is inert. Hover lives only on links.
- The prose block, when it finally comes, is 7 short paragraphs in the 18px JJannon serif, followed by three flat metadata lists — `Services` (Creative Direction / Digital Design / Development / Campaign), `Labels` (AI / Platform), `Links` (Website, The Manifest, Pangram Pangram, The Brand Identity, Vimeo). The outbound links are the receipts: the live site, two press write-ups, the type foundry, the film.

## 6. The path to business

- One CTA on the page, in the pre-footer, under the word `Contact`. **Exact words: "Work with us".**
- It is preceded by `More` and three sibling project names in 42px JJannon (`Thesis / RRE / Battleface` on one load, `Psyop / IYO / RRE` on another — the set rotates). So the last thing before the ask is *more work*, not more argument.
- `Contact` also sits permanently in the fixed header, far right.
- **Pricing: not shown.** No rates, no ranges, no engagement model.
- Contact pattern: a link to a dedicated `/contact` page. No inline form, no calendar embed, no email address exposed on this page.
- Persistent footer strip carries `IG / LI` and `Terms` only — no newsletter, no logo wall, no testimonial anywhere on the page.

## 7. Motion vocabulary

Detected in the DOM/scripts:

- **Lenis** — confirmed, `html.lenis` class present. Smooth scroll is the base layer.
- **GSAP: not present** (`window.gsap` undefined).
- **three.js / WebGL: not present** (`window.THREE` undefined, **0 `<canvas>`**).
- Marquee: none.
- Video count: 13, all autoplay/loop/muted-style ambient.
- Class-name evidence of a scroll-reveal system: `.stagger-item` on the title, content, and media-grid blocks — a staggered entrance on the three non-media blocks only.
- Fixed/sticky elements: `header.site-header`, `nav.site-nav`, `footer.footer`, and a `.scroll-indicator` — all `position: fixed`, none `sticky`. **No pinning, no scroll-jacking, no horizontal gallery, no parallax rig, no cursor follower, no velocity/skew effect.**
- Third-party scripts: Microsoft Clarity, GTM, GA4, a B2B visitor-ID script. (Named for completeness; not design.)

**What is quiet:** almost everything. The entire motion budget is (a) Lenis smoothing, (b) a stagger on three text blocks, (c) looping video. A 12-viewport page with 13 videos and *no* scroll library beyond smoothing is the discipline here.

## 8. Rhythm

- Section count: **1**. One `<section class="work-case">`. The rhythm is made by media block widths inside a single 12-column grid, not by sectioning.
- The beat: full-width 3:2 plate → two-up 3:4 verticals → full-width wide strip (7.85:1) → half-width strips → repeat, ~20 units deep. Wide strips act as the rests.
- The one deliberate tonal break: a near-white panel (`#FEFDFC` background, the only light block on an all-black page) holding two small logo marks at 583px wide, sitting beside a dark UI screenshot. On a black page, a white plate is the loudest available move, and it is spent on the logo.
- It goes quiet exactly once in the chrome sense: nothing is ever full-bleed to the browser edge. Every plate is inset to the 11-column measure, so black margin frames every asset. **The black gutter is the frame.**
- Footer pattern: **no giant wordmark.** The footer is a 14px fixed strip — `Studio Freight` centered at body size. The studio's own name is the smallest display decision on the page.

## 9. THE BEST PART

**The write-up is placed at 79% scroll depth, and the ask is placed after three more projects — so the argument is made entirely by artifacts, and the words only confirm what the reader already concluded.**

What the studio did *for* the client that transfers: the client had **no product to show** ("No demo. No feature list. No wireframes," in the studio's own words). The response was to build a system from one committed idea — cosmic — and then let the artifacts of that system carry every load: the site descends visually from space to Earth as you scroll, and the announcement film runs the same path in reverse so the two loop into each other. The case page then *enacts* that same discipline: 9.7 viewports of made things, then a title, then seven short paragraphs, then out.

**Legal for Micah: yes, and it is close to free.** He has real artifacts — a book with hand-drawn pages, a photograph of himself, screenshots, seven receipts with names and numbers. This pattern needs no client logos, no testimonials, no invented proof; it needs only that the artifacts come *first* and the prose come *late*. The common consultant instinct is the inverse: positioning sentence, then proof. Flipping a case page so the hand-drawn page-6 diagram, the receipts, and the screenshots occupy the first several screens — with the write-up and the "hire me" arriving only after — is directly available with assets already in the repo. Two supporting moves also transfer cleanly:

- **Zero captions.** Nothing on this page explains an image. It forces the artifact to be good enough to stand alone, which is the honest test.
- **The outbound-links block as the receipt.** `Website / The Manifest / Pangram Pangram / The Brand Identity / Vimeo` — verifiable third-party destinations, not claims. The equivalent here is the live URL plus whatever public trace exists; a link is a receipt, and it requires no testimonial.

## 10. THE TELL

**The mono-serif set at 14px with +0.01em tracking, running the nav, the labels, and everything else, on pure `#000`.** Publico Text Mono is a distinctive and expensive choice, but "small mono/mono-serif label type, uppercase, wide-tracked, on absolute black, with Lenis under it" is now the default costume of the studio-portfolio genre — it reads as *studio* before it reads as *this studio*. Two supporting tells:

- The comma-run nav (`Home, Info, News, Aeon`) is a 2024–26 mannerism.
- The hero is **AI-generated imagery** by the studio's own description. On a page whose argument is "we make real things," a generated hero is the seam. That category is hard-banned in this project's constitution (R12), so it is a tell already structurally excluded — but worth naming as the thing that makes an otherwise rigorous page feel less earned than the plates below it.

## 11. Screenshots

- First screen: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-3-home.png` (1440x900 viewport)
- Case page, full-page capped at 3 viewports: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-3-work.png` (1440x2700)

Both verified as `Perplexity Comet | Studio Freight` at capture time (a co-resident agent was navigating the shared browser; the captures were re-taken in a dedicated page and the title asserted before and after each shot).
