# cora — cora.computer (client build by darkroom.engineering)

## 1. Fetch proof
- Live URL: `https://cora.computer/` — **HTTP 200** (curl `-L`, no redirect).
- `<title>` verbatim: **`Give Cora your inbox. Take back your life.`**
  (confirmed twice: `grep -o "<title>..."` on the raw HTML, and `document.title` in Playwright.)
- Studio: **darkroom.engineering**. Pointer URL: `https://darkroom.engineering/work` — the work
  index lists `Cora → https://cora.computer`. There is **no dedicated case-study page**:
  `https://darkroom.engineering/work/cora.md` returns **404**. What the work index says about the
  project, quoted: "Give Cora your inbox. Take back your life." and "Your AI chief of staff that
  screens your inbox, drafts responses in your voice, and briefs the rest 2x daily."
  So the pointer is a one-line listing, not a written case study — the site itself is the artifact.
- The client's own footer credits the parent: "Built by **Every**" (`https://every.to`). Cora is
  Every's product; darkroom built the marketing site.

## 2. The client and the product
Cora, an AI email chief-of-staff from the media company Every: a $20/mo subscription SaaS that
screens your inbox, drafts replies in your voice, and sends two daily digest "Briefs."

## 3. First screen
- Asserts, in **9 words**: "Give Cora your inbox. Take back your life." Sub-line, **13 words**:
  "Cora is the $150,000 chief of staff that only costs $20 per month."
- Alignment: **centered**, single column, everything on the vertical axis — headline, sub, button,
  then the product screen below it.
- The hero **IS a painted sky**. Not video, not 3D, not a photograph: an illustrated/painted
  cloudscape (`/images/background.webp`, `/images/cloud.webp`) as the full-bleed ground, with a
  laptop-framed screenshot of the actual product Brief floating up from the bottom edge. One
  `<video>` exists on the page (`/videos/demo.mp4`, muted/looped/autoplay) but it is **not** the
  hero.
- Nav: **2 items only** — "Log in", "Start free trial" — top **right**, in a single white pill
  where the trial half is filled solid. Nothing hidden, no hamburger, no menu. The wordmark sits
  top-left as a small stamp-edged tile with sky showing through the letters. Total chrome: a logo
  and two words.

## 4. Type system (from the CSS + computed styles)
- Two self-hosted families, both preloaded as `.woff2`:
  - **Signifier** — a high-contrast Klim serif. **14 faces preloaded**: Thin/Extralight/Light/
    Regular/Medium/Bold/Black, each with its Italic. Display face.
  - **Switzer** (variable, `SwitzerVariable_Regular`) — geometric grotesk. Text face.
- Split of labour is lopsided: `font-family:var(--next-font-switzer)` appears 20× in the CSS,
  Signifier 5× — the serif is reserved almost entirely for H1/H2 and pull phrases; everything else
  (sub-line, body, buttons, plan tables, FAQ) is Switzer.
- H1 computed at 1440: `font-size: 55px`, `font-weight: 300` (Signifier **Light**, not bold),
  `line-height: 64.9px` (~1.18), `letter-spacing: normal`, `color: #fff`.
- Sizing is **not** `clamp()`. Every size is
  `font-size: min(calc(((N*100)/var(--device-width))*1vw), Npx)` — a vw scale that caps at the
  design-file pixel value. The ladder in use: 5, 6, 9, 10, 12, 14, 15, 16, 17, 18, 20, 22, 24, 26,
  34, 36, 38, 45, 55, plus one hard `64px`. Fourteen separate rules at 14px and eight at 12px —
  the small end is where the system actually lives.
- **Tracking: `letter-spacing:0` on all 25 declarations.** No tracked-out labels anywhere.
- **`text-transform`: exactly one declaration, and it is `lowercase`.** There is **no uppercase**
  in the type system — the eyebrow/label convention every other AI-product site reaches for is
  simply absent.
- **No monospace face is loaded at all.** Zero mono.
- Italic is the emphasis mechanism instead: "The rest gets *Briefed*" sets one word in Signifier
  Italic inside a roman line. That is what the seven italic faces are for.

## 5. Palette (from the CSS)
- Tokens: `--color-primary:#117bc8` · `--color-secondary:#fff` · `--color-tertiary:#000` ·
  `--color-grey:#ebebeb` · `--color-light-grey:#7d7d7d` · `--color-white:#fff` ·
  `--color-black:#000`.
- Counts across the three stylesheets: `#0000` ×12, `#fff` ×10, `#000` ×8, **`#117bc8` ×5**,
  `#ffffff15` ×4, `#f5f8fe00` ×4, `#00000080` ×4, `#f5f8fe` ×3, `#00000040`/`#00000010` ×3 each,
  then a tail of near-greys (`#ebebeb`, `#dadada`, `#d7d4cf`, `#d6d6d6`, `#a1a1a1`, `#7d7d7d`,
  `#2b2b2b`) and two borrowed UI colours (`#0b57d0`, `#1d1b20` — Gmail blue and Material ink,
  because the mockups imitate Gmail) plus `#cf372d` and `#488fcb`.
- Ground: `body { background: rgb(17,123,200) }` = **#117BC8, the sky blue**, type is `#fff` on
  it. The brand colour is not an accent — **it is the entire page**.
- There is effectively **no accent** in the traditional sense. Contrast is carried by white type,
  white pill buttons, and `#ffffff15` / `#ffffff05` glass panels. The red `#cf372d` appears only
  inside product screenshots ("Cora Draft", the calendar chip) — it is the app's colour, not the
  site's.
- One `mix-blend-mode: multiply` in the whole sheet. No gradient library, no dark mode.

## 6. Narrative arc (sections in DOM order)
1. **Header** — logo, "Log in / Start free trial."
2. **Hero** — headline + the $150,000-vs-$20 line + "Get Started," over painted sky, product Brief
   rising from the bottom edge.
3. **Testimonial river** — eight named quotes (Mike Krieger CPO at Anthropic, Kevin Roose of the
   NYT, Andrew Wilkinson, Brett Dashevsky, Danny Aziz, Jim Raptis, Mitchell Baldridge, Aodhán
   Moran), each with a face photo and their company's logo, cycling in a horizontal marquee.
   Proof arrives **second, before a single feature.**
4. **"Cora screens your email"** — pinned panel, screenshot of the inbox, "Start your free trial."
5. **"Cora drafts responses in your voice"** — pinned panel, a real draft-email card, "Get Started."
6. **"The rest gets *Briefed*"** — pinned panel; "It lets you read your inbox in 30 seconds instead
   of 3 hours."
7. **"Cora learns you inside and out"** — two sub-beats: "Cora gets to know you, automatically" and
   "Shape Cora through conversation," shown as two card panels ("You are a CEO").
8. **"Security and privacy are built in"** — four flat claims: never train on your data / no one
   can see your emails / Cora can't send or delete emails / top security standards. The objection
   handler, placed exactly where a buyer would raise it.
9. **Pricing** — "Pick a plan," yearly/monthly toggle (yearly saves 20%), Professional $20/month,
   Unlimited $39/month, feature list per tier.
10. **FAQ** — "Wait, does this actually write and send emails for me?" answered "No, Cora will
    never send emails for you… you always have full control."
11. **Footer / final ask** — "Free Yourself from Email … Start your free trial," then Privacy,
    Terms, Log In, and the Every logo.

The arc: promise → other people's names → three mechanics → it learns you → it's safe → what it
costs → the last doubt → ask again.

## 7. Motion grammar — the point of the corpus
- **Libraries: none of the usual ones.** Runtime probe: `window.lenis` **false**, `window.gsap`
  **false**, `window.THREE` **false**, `window.Tempus` **false**. `<canvas>` count: **0**. WebGL:
  **none**. Videos: **1**. This is a plain Next.js build (13 hashed chunks, `nonce` on every
  script) with hand-written scroll math. String matches for "GSAP"/"lenis"/"Tempus" appear in the
  bundle text but no global is exposed — darkroom's own utilities are compiled in, and native
  smooth-scroll is left alone.
- **Six `position:sticky` full-viewport panels.** Classnames verbatim:
  `h-[100vh] flex items-center justify-center sticky top-0 pointer-events-none` (×2),
  `sticky top-0 h-[100vh] flex justify-center items-center`,
  `sticky top-0 h-[100svh] flex justify-center items-center` (×2), `sticky top-0 h-[100svh]`.
  Plus 3 `position:fixed` elements (header, wordmark, the ground layer). The page is **12,318px
  tall** at 1440 — roughly 13 viewports, six of which are pinned.
- **THE MECHANISM: a two-layer, 38-frame scroll-scrubbed image sequence.**
  The DOM holds `/images/background/1..38.webp` and `/images/foreground/1..38.webp` — 76 stacked
  `<img>` tags inside `class="frame-sequence-module__X5Gf_W__sequence"`, every one carrying inline
  `style="visibility:hidden"` except the current frame (`visibility:visible`). The CSS confirms the
  technique: the only `will-change` in the entire stylesheet is **`will-change: visibility`**, and
  there is a `transition-duration:1ms` rule. Scroll position toggles which frame is visible —
  video-quality motion that scrubs precisely, seeks instantly, and never stalls. Two sequences
  means **background and foreground scrub independently**, so the painted world has real depth as
  you move through it. A static `/images/sides.webp` device bezel sits between the layers, so the
  sequence plays *inside* the product frame.
  What it depicts: the ground **travels through painted weather**. The top of the page is a blue
  sky with clouds; by ~70% you are standing in a golden wheat field under an orange sky (see
  `cora-late.png`). The page walks the reader out of the inbox and into open country — the
  headline's "take back your life," rendered as landscape.
- Other scroll behaviours observed: **sticky pin-and-swap** on all four feature panels (copy holds
  still, screenshot changes), **parallax** between the two frame layers, a **horizontal marquee** of
  testimonials (the eight quotes repeat ~5× in the DOM so the loop never shows a seam), card
  **reveals** on the "learns you" beat, and a single
  `transition: transform .75s cubic-bezier(.16,1,.3,1)` plus
  `transition: height .6s var(--ease-out-expo)` (`--ease-out-expo: cubic-bezier(.19,1,.22,1)`) —
  the FAQ accordion and the button hovers. No page transitions, no scroll-jacking, no velocity skew.
- **Deliberately still:** the type. Headlines do not split, mask, stagger, or fly. There is **no
  cursor follower**, no magnetic button, no counter, no scramble text. The words sit; the world
  moves behind them.
- **No `prefers-reduced-motion` block exists in the CSS. Zero occurrences.** Noted as a defect, not
  a technique.
- The ONE motion moment that carries the page: **the sky becoming a wheat field while the copy
  stays put.** Everything else is service.

## 8. Commerce / the ask
- Single destination: `https://cora.computer/users/sign_up`. Counted **11 links to it** on the page.
  `sign_in` gets 2.
- Exact words, in order down the page: "Start free trial" (header pill) · "Get Started" (hero) ·
  "Start your free trial" · "Get Started" · "Start your free trial" · "Get Started" ×3 ·
  "Start free trial" ×2 (pricing cards) · "Start your free trial" (footer).
- Loudness: the hero CTA is a **solid white pill on the blue ground with a right arrow** — the
  brightest object on the first screen after the headline. The header pill is always visible
  (fixed). It is loud, but there are only ever **two verbs on the entire site** and they mean the
  same thing. No demo request, no "book a call," no separate pricing page — the price is on the page.

## 9. Rhythm
- 10 `<section>` elements + header + footer; ~13 viewport-heights of scroll.
- **Full-bleed throughout.** The painted ground runs edge to edge for the whole document; content is
  a centered column floating on it. There is no contained/full-bleed alternation — instead the
  alternation is **centered (hero, Brief, learns-you, pricing) vs. split left-copy/right-artifact**
  (screens, drafts). See `cora-mid.png` for the split.
- Where it goes quiet: between the pinned panels, where the frame sequence has the screen to itself
  and there is no copy at all. Also the security section — four short claims, no imagery, the
  flattest moment on the page, deliberately.
- Footer pattern: an **ask, not a sitemap**. A headline ("Free Yourself from Email"), one sentence,
  one button, then three small links (Privacy, Terms, Log In) and the Every logo. No columns, no
  newsletter, no social row.

## 10. THE BEST PART for Micah
**The proof river placed second — eight named humans with faces and logos, before a single feature
is explained — is the structure, but Micah cannot build it: he has one anonymous quote and no
logos.**

The mechanism he *can* take is the one underneath it: **the price comparison as the sub-headline.**
"Cora is the $150,000 chief of staff that only costs $20 per month." Thirteen words. It names the
expensive alternative, names the price, and does the buyer's arithmetic in the same breath — and it
sits above the fold, under the headline, not in a pricing section. Micah has exactly the material
for this and it requires no proof he lacks: he knows what a full-time ops hire costs, and he knows
his three fixed prices and his $5K/mo. One line, no logos required.

Second, structurally free and worth as much: **the FAQ answers the one objection nobody says out
loud, in the buyer's own voice.** "Wait, does this actually write and send emails for me?" — the
"Wait," is doing the work. Micah's equivalent question is the one every prospect is thinking about a
solo consultant ("what happens when you're busy, is this just you?") and it belongs on the page in
that voice, answered flatly, near the ask.

Third, cheap and directly applicable to a book with nine hand-drawn pages: **the frame sequence is
just images toggled by `visibility`.** Nine drawn pages is nine frames. Pin a `100vh` sticky panel,
stack the nine scans, toggle `visibility` on scroll — the book draws itself as the reader descends.
No GSAP, no video, no canvas, roughly 40 lines. The mechanism scales down to nine frames as happily
as it scales up to 38, and it is the only motion on the page that would earn its own signature slot.

## 11. THE TELL
**The 76 painted landscape frames.** Two custom illustrated worlds — a cloudscape and an autumn
wheat field — rendered as 38-frame animated sequences, plus a bespoke painted cloud logo lockup.
That is a commissioned illustrator plus an animator, and it is where the money went. Do not try to
fake it with stock skies or an AI-generated landscape; the whole effect depends on the paint being
authored for this page.

**Second tell, subtler and more dangerous:** the eight testimonials are Mike Krieger (Anthropic),
Kevin Roose (NYT), Andrew Wilkinson. Cora's parent company Every is a media business whose founder
knows those people. That distribution is the asset, not the design. The *placement* (proof second)
is borrowable; the *roster* is not, and a page that borrows the placement with thin proof will read
worse than one that puts its proof where it belongs.

Third, minor: **14 preloaded Signifier faces.** A licensed Klim family in seven weights plus italics
is a real line item, and the page uses maybe four of them.

## 12. Screenshots
Captured with Playwright at 1440×900 (and 390×844), in a dedicated tab, verified as
`https://cora.computer/` at capture time:
- `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/cora-top.png` — first screen, painted sky, centered headline.
- `.../client-work/cora-mid.png` — ~35% (scrollY 4311 of 12318): the split left-copy /
  right-draft-card panel.
- `.../client-work/cora-late.png` — ~70% (scrollY 8623): the ground is now a painted golden wheat
  field; "Cora learns you inside and out."
- `.../client-work/cora-390.png` — mobile first screen; same centered stack, headline wraps to two
  lines, nav pill unchanged (no hamburger appears).
