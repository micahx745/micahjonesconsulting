# sf-work-2 — Studio Freight, La Marzocco Home Playbook (case study)

## 1. Fetch proof
- URL: https://studiofreight.com/work/la-marzocco
- HTTP status: 200 (Playwright `response.status()` = 200; `curl -s -o /dev/null -w "%{http_code}"` = 200)
- `<title>`: **La Marzocco | Studio Freight**
- Home also fetched for context: https://studiofreight.com/ — `<title>`: **Studio Freight**
- Contact fetched: https://studiofreight.com/contact — `<title>`: **Studio Freight**
- Stack: Nuxt (`/_nuxt/*.css`, `/_nuxt/BLoMIR1p.js`), `html class="theme-light lenis"`.

## 2. Type system (from CSS)
Three self-hosted woff2 faces, preloaded, no Google/Adobe:
- `publico-text-mono-roman` — /fonts/publico-text-mono-roman.woff2
- `publico-text-mono-semibold` — /fonts/publico-text-mono-semibold.woff2
- `jjannon-regular` — /fonts/jjannon-regular.woff2

Roles are inverted from the usual: **the mono-serif (Publico Text Mono, a monospaced slab/serif) is the DISPLAY face and the label face**; **JJannon (a Garamond revival) is the reading face**. There is no grotesk anywhere on the site.

Scale, verbatim from `_nuxt/entry.CjzddFcg.css`:
- `play` — publico-text-mono-roman, `clamp(126px, …15.83vw…, 286px)`, ls `-2.88px`, lh `80%`, uppercase
- `.h1-pr` — publico-text-mono-roman, `clamp(104px, …8.33vw…, 184px)`, ls `-2.88px`, lh `80%`, uppercase — computed **210px / lh 168px** on this page via a per-page override (`h1-pr{font-size:144px}` also present)
- `.h2-pr` — 64px fixed, ls `-1.28px`, lh 80%, uppercase
- `.h3-pr` — 42px, ls `1%`, lh 116%, uppercase; `.h3-ps` — semibold `clamp(36px…64px)`; `.h3-jj` — jjannon, same clamp, ls 0
- `.h4-jj` / `.h4-ps` — 26px, lh 124%
- `.p-nav` — publico mono, 56px, lh 80%, uppercase
- `.p` — jjannon, `clamp(18px, 1.25vw, 24px)`, ls `.18px`, lh **132%** (case-study body computes 18px / 23.76px)
- `.p-small` 16–18px; `.px-small` jjannon 14px; `.pxx-small` publico mono 14px, ls `.14px`, lh 112% — the label style
- Nav/UI (`.ui-label`) = 14px publico mono, ls `.14px`, `capitalize` on the active item

Letter-spacing census (entry + slug CSS): `-2.88px` ×17 (display), `-1.28px` ×11 (h2), `.14px` ×16 (labels), `.18px` ×8 (body), `1%` ×21, `0` ×27. Weights in use: 400 everywhere, 600 only on `.h4-ps`. Uppercase is reserved for the mono display and the `.pxx-small` labels; body is never uppercased.

## 3. Palette (from CSS + computed)
Full hex census across entry/slug/index CSS: `#000` ×4, `#fefdfc` ×3, `#1a1a1a` ×3, `#dadada` ×2, plus one-off `#9acd32`, `#457db6`, `#00ff6a` (utility values, not painted on this page), and `#0000001f` (a 12% black hairline).
Computed on the live case page there are exactly **two** text colours: `rgb(0,0,0)` ×70 and `rgb(254,253,252)` ×45. One background: `rgb(254,253,252)` = `#fefdfc`, a warm near-white.
**Achromatic in practice: yes, completely.** There is no accent colour in the chrome. Every colour on the page — terracotta tile, ochre backdrop, black studio sweep — arrives inside the client photographs. The site is a white gallery wall; the work supplies the hue.

## 4. Composition of the home first screen
The home page **does not scroll**: `document.scrollHeight` = 900 at a 900px viewport. It is one screen, and that screen is 26 project thumbnails scattered on the warm-white field in a loose asymmetric grid with deliberate holes punched in it. Dead centre, in JJannon at 42px, three words: **"Moving Missions Forward"** — the only sentence on the page and the only `<h1>`. Total home-page prose: **3 words**.
Alignment: centred claim over a non-uniform tile field. Nav is a single 14px mono row across the top — left: mark plus `• Home`; centre: `Work, Info, News, Aeon` comma-separated on one line; right: `Contact`. A footer row is pinned at the bottom of the same screen: `IG / LI` left, `Studio Freight` centre, `©2026 / Terms` right. No hidden menu, no hamburger.
**Is the work the page? Literally.** 43 links, 26 of them project tiles, 0 body paragraphs.

## 5. How work is shown
Home = untitled image tiles only. The anchors carry no text — `<a href="/work/la-marzocco">` wraps an image — so you must hover or click to learn what anything is. No captions in the DOM.
Case page order, top to bottom: **photograph first, title later.** The `<h1>` "LA MARZOCCO" (210px, uppercase, lh 80%) measures at y≈3529 — roughly four screens down, *after* the media run. The opening screen is a 1178px-wide top-down photograph of the physical book on terracotta tile (ar 1.51); then an autoplay muted looping `<video>` (`studiofreight-lamarzocco-2.mp4`, ar 1.50) of a tattooed hand fanning the signatures; then a two-up of 583×777 portrait crops (ar 0.75) — the linen spine on ochre, and the coloured page edges with the head-and-tail band. Declared ratios in CSS: `16/9`, `750/1000`, `1080/1350`. 18 images and 2 videos, one of them a 7.85:1 letterbox strip.
Prose (`.p`, JJannon 18px) begins only under a mono `Info` label after the media: six paragraphs, ~350 words, no internal headings.
Metadata closes the page as a stack of mono `pxx-small` labels: `Services` (Creative Direction, Applied Design), `Labels` (Consumer, Food/Drink), `Links` (Are.na and Savee — the actual research boards, published), `More` (three sibling projects at 42px JJannon).

## 6. The path to business
No CTA above the fold anywhere on the site. The case page ends with a `Contact` label and one 42px JJannon link: **"Work with us"** → `/contact`. Nav carries `Contact` top-right on every page. No pricing.
`/contact` is a form (`Inquire` … **`Submit`**) plus an FAQ of plain mailto routes: `jobs@`, `press@`, `hello@studiofreight.com`, plus a **Capabilities** deck offered as `Download` / `View` (a Figma prototype link). No calendar link, no "book a call". The same FAQ also answers "Food recommendations" and "Book recommendations" — a personality tax paid in the least commercial corner of the site.

## 7. Motion vocabulary
Detected in the DOM/scripts: **Lenis** (`html class="theme-light lenis"`). **No GSAP, no THREE, no WebGL canvas** (`canvas: 0`). 2 `<video>` elements, both autoplay/muted/loop/inline, used as *content* rather than decoration. No marquee. Third-party: Microsoft Clarity, GTM/GA, a B2B identification script.
Described behaviours: smooth scroll; a load/entry sequence that leaves the H1 measured far below the initial media; hover on home tiles reveals which project a tile is (the anchors are otherwise unlabelled).
What is quiet: no pinning, no sticky sections, no horizontal gallery, no cursor follower, no parallax, no velocity skew, no page-transition curtain observed. **By 2026 studio standards this is a restrained site** — the entire motion budget is Lenis plus two looping videos.

## 8. Rhythm
Case page height 5662px ≈ 6.3 screens. Sequence: media run (≈4 screens, alternating full-width / two-up / letterbox strip, with dark-backdrop shots placed between warm-ground shots so the page itself goes dark then light) → giant uppercase title → `Info` prose → `Receipt` (the testimonial) → `Services` / `Labels` / `Links` → `More` (3 siblings) → `Contact` → footer. Only one `<section>` in the DOM; rhythm is carried entirely by media width and ground colour, never by rules or subheads.
Footer: **no giant wordmark.** One 14px mono line — `IG / LI` · `Studio Freight` · `©2026 / Terms`. The restraint is the point: after a 210px title, the sign-off is 14px.

## 9. THE BEST PART — what the studio did FOR the client
**They shot the artifact as the case study.** The deliverable was a printed book, and the page is eighteen photographs plus a video of *that object being handled*: a hand fanning the signatures, the linen spine raking light, the coloured page edges and the head-and-tail band, the book lying on a café tile beside a spent cup and a biscotti. The proof is not a metric and not a logo — it is the thing existing, photographed well, in the situation it was made for. The prose that follows never claims a result; its last line says the book "doesn't try to sell anything."
Structurally, the second lesson: **the title comes after the evidence.** Four screens of the object, then the name at 210px. The visitor is convinced before they are told.
Third: **the testimonial is labelled `Receipt`** — one client quote, named person and role, set as body prose in the reading face rather than dressed up in a pull-quote card.
**Legal for Micah: yes, entirely — this is the closest match in the set.** He has a book with hand-drawn pages, the exact artifact class. Photograph it the way they photographed theirs: pages fanned, one spread lying flat, one detail of the hand-drawn line, one shot of it on a real desk in use. His seven receipts with names and numbers map onto the `Receipt` label pattern one-for-one, and his single anonymous line is enough to fill one such block. He needs no client logos because this page's chrome uses none — the client's identity arrives only as the object in the photograph. His screenshots take the place of the video loop.

## 10. THE TELL
The nav that reads `Work, Info, News, Aeon` — comma-separated, 14px monospace, active item marked by a bullet — sitting over a home page of 26 unlabelled thumbnails you must hover to identify. That is the 2024–26 agency house style, and the unlabelled grid in particular is a confidence flex a solo consultant cannot afford: a buyer who cannot tell what he built without hovering leaves. Skip the `/contact` FAQ's food-and-book recommendations too — charming for a twenty-person studio, dev-Twitter tell for one person. And mono-as-display at 210px with `-2.88px` tracking is currently everywhere; the underlying idea (one narrow slab/mono voice carrying both labels and the title, one serif carrying the reading) survives translation, the specific look does not.

## 11. Screenshots
- Home: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-2-home.png` (1440×900 viewport, full-page capped at 2700px; the home is exactly one screen)
- Work/case: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-2-work.png` (1440×900 viewport, capped at 2700px of a 5662px page)
