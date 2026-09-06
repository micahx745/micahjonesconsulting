# sf-work-4 — darkroom.engineering /work

Kind: sf-work (Studio Freight lineage — darkroom.engineering is the studio that maintains Lenis/Tempus/Hamo and credits "Studio Freight" as a collaborator on five entries in this very index). Fetched 2026-09-05.

## 1. Fetch proof
- URL: https://darkroom.engineering/work
- HTTP 200, 1,069,473 bytes of HTML (curl, desktop UA).
- `<title>Work - Projects That Speak for Themselves - darkroom.engineering</title>`
- Case page: https://darkroom.engineering/work/badomens — `<title>Bad Omens - darkroom.engineering</title>`
- Contact: https://darkroom.engineering/contact — `<title>Contact - Let's Build Something That Lasts - darkroom.engineering</title>`

## 2. Type system (from the CSS, chunks `1qlf-7l8edf8h.css` + `2zlpkz7lx5tcy.css`)
Three self-hosted `@font-face` families, no Google/Adobe link:
- `therma` — `ASTherma_BoldCondensed.woff2`, weight 700, normal. **Display.** Bold condensed grotesk.
- `sauce` — `ASModule2VF.woff2`, weight 400, a variable face. Secondary display/UI.
- `mono` — `ReplicaMonoLLWeb_Regular.woff2`, weight **200**. **This is the body face** — computed `body { font-family: mono, "mono Fallback", ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 16px }`.

Every face ships a matching `Fallback` metric-override (`ascent-override`, `size-adjust: 67% / 121.04% / 133.68%`) against `local(Arial)` — zero-CLS font swap, done properly.

Weights in use: 200 (mono body), 400 (sauce), 700 (therma), plus 500/600 from a utility layer.

Scale: **no `clamp()` anywhere.** A single fluid ladder, `font-size: calc(((N * 100) / var(--device-width)) * 1vw)`, with N = 8, 10, 12, 14, 16, 20, 32, 40, 48, 72, 80, 86, 120, 270. The design file's px value goes straight into the formula and scales linearly with the viewport. Measured at 1440: project H2 = **120px**, section H2 = **48px**, the eyebrow/intro H1 = **14px**.

Letter-spacing: display 120px → `-6px` (−0.05em); 48px → `-1.44px` (−0.03em); mono 14px labels → `-0.14px` (−0.01em). The token list is −0.05 / −0.03 / −0.02 / −0.01em plus positive `.05em` / `.1em` for small uppercase, and two extreme negative vw values (`-1.33vw`, `-0.69vw`) reserved for the 270-size wordmark.

Uppercase: **essentially everything.** `text-transform: uppercase` on the shared type primitive; the only sentence-case strings on either page are the section H2s ("the brief vs. what we shipped", "behind the pixels").

## 3. Palette (CSS `--color-*` tokens, each shipped twice — hex + `lab()`)
- `--color-black: #000` — the ground. `body { background: lab(0 0 0) }`.
- `--color-red: #e71419` — bound to `--color-primary` AND `--color-secondary` on this route; **the body text colour is red**, not white.
- `--color-white: #fff` (5 hits)
- `--color-light-grey: #e5e5e5`, `--color-dark-grey: #262626`
- `--color-dark-red: #c20510`, `--color-burnt-red: #390205`
- `--color-hover: color-mix(in oklab, var(--color-secondary) 83%, transparent)`
- Strays: `#00d9ff` (2), `#dc2626`, `#e5e7eb`, `#111827`, `#888`, `#666` — Tailwind-preset residue, not part of the system.

Counts: `#000` 7, `#fff` 5, `#e71419` 4, `#e5e5e5` 4, `#c20510` 2, `#390205` 2, `#262626` 2.

**Not achromatic** — but it is a *one-hue* system: black ground, one red, greys. `--color-contrast` is re-bound per section so the same components invert (red-on-black → black-on-red) without new tokens. Two `mix-blend-mode` uses (`difference`, `overlay`) do the rest.

## 4. Composition of the first screen
Ground black. Top bar, four items, left wordmark + three right: `DARKROOM.ENGINEERING · WORK · ABOUT · CONTACT`.

Under it a full-width horizontal marquee repeating **`work:// designed to be built, built to be used.`** ten times.

Then the only prose above the grid, an H1 set at 14px mono uppercase — **21 words**:
> "A sampling of things we've built. Launched websites, collaborations, and links to deeper dives when there's more to say."

Then the control row: `ALL[19]` and a `GRID —— LIST` toggle. Alignment is a hard left rail with the count/toggle pushed right.

**The work is the page.** No hero image, no positioning statement, no service list — the studio's pitch lives on /contact, not here. Total scroll height 12,760px at 1440 wide.

## 5. How work is shown
19 projects, **grid ⇄ list toggle** persisted in the DOM (both orderings are in the markup — the same 19 links appear twice in the anchor dump, once per view). Each tile: a looping video or image, the project name in therma 120px uppercase, and 1–3 tag chips (`BRAND`, `AI`, `SAAS`, `WEB3`, `ECOMMERCE`, `HEALTH`, `FRAMER`, `GAME`, `VENTURE CAPITAL`).

Media: 103 `<img>`, 15 `<video>`, 1 `<canvas>`. `aspect-ratio` tokens: `var(--body-ratio)` and `16/9`.

**Two link affordances per card, and they are honest about the difference:** `LIVE SITE ↗` on all 19, and `CASE STUDY →` on only **2** (Looped, Bad Omens). Seventeen projects are just a name, a tag and a link to the shipped thing. Collaborator credits sit inline on the card as outbound links — `Studio Freight` (×4), `Bulletproof`, `Milkinside` (×2), `Every`, `Alt-tuning`, plus five named individual freelancers linked to their own sites.

Prose before the first project: **21 words.** Zero after.

## 6. Path to business
Bottom-of-page prefooter, two lines, on every page: **`BECOME AN OPEN SOURCE SPONSOR`** and **`LET'S TALK →`**. Those are the exact words. No pricing anywhere. Nav carries `CONTACT`; the contact page's own title is the pitch — "Let's Build Something That Lasts". No calendar embed, no budget dropdown, no form in the first volley.

The footer runs three world clocks (`ARG 09:56 PM · CET 02:56 AM · WET 01:56 AM`) — the "we are a distributed studio" flex — then columns: NAV, **OPEN SOURCE** (`SATUS · LENIS · HAMO · TEMPUS · ELASTICA · ANISO · CC-SETTINGS`), SOCIAL, and **INSPIRATION** (`IMPORTANT VIDEO · A MEANINGFUL SONG · GREAT BOOK BTW · AMAZING GAME · A GOOD MOVIE`).

## 7. Motion vocabulary
Detected in DOM/scripts: **lenis** (18 hits), **gsap** (7), **three / webgl** (4 / 8), **tempus** (6, their own rAF scheduler), **hamo** (5, their own hooks lib), `marquee` (33 hits). No framer-motion, no locomotive, no splitting.

CSS-side: native **View Transitions with a named type** — `::view-transition-old(root)` / `::view-transition-new(root)` under `view-transition-type(curtain)`, i.e. a *curtain* page transition, animation suppressed on the root pair so the custom groups carry it. A full easing token set (`--ease-out-expo`, `--ease-in-out-expo`, `--ease-gleasing: cubic-bezier(.4,0,0,1)`, and the whole circ/cubic/quad/quart/quint family). Transitions: `.6s` on `transform`, `ease-out-expo`.

Behaviours: smooth scroll (Lenis), the header marquee, autoplaying muted card video, grid⇄list re-layout, curtain page transition, one WebGL canvas. **What is quiet:** no cursor follower, no scroll-jacking, no horizontal gallery, no pinned sections in the index, only three `@keyframes` in the whole stylesheet.

## 8. Rhythm
Index: marquee → 21-word intro → control row → 19-tile grid → prefooter → footer. Five movements over 12,760px; the grid is 90% of it. It never goes quiet — it goes *uniform*, which is the same restraint applied differently.

Case page (`/work/badomens`, 8,223px): 120px H1 pull-quote → a four-cell `YEAR / CLIENT / TYPE / ROLE` spec block → narrative sections at 48px → a numbered merch index (`01. DETHRONE HOODIE` … `08.`) → **"the brief vs. what we shipped"** → **"behind the pixels"** (credits, technologies, awards) → NEXT PROJECT → the same prefooter.

Footer wordmark: yes — `darkroom` set large, with `©2026 DARKROOM.ENGINEERING ALL RIGHTS RESERVED`.

## 9. THE BEST PART — and it is legal for Micah
**The two-tier proof ladder, and the "brief vs. what we shipped" block.**

Tier one: 19 projects, each reduced to *name + one tag + a link to the live thing*. No screenshot essay, no invented narrative. Tier two: exactly **two** get a case study, and the card says so in words — `CASE STUDY →` appears twice, `LIVE SITE ↗` nineteen times. The index is honest that most of the work is a link, and honesty about that is what makes the two deep dives credible.

On the case page, the single strongest device is a two-cell block, headed in sentence case among all the shouting:
- **"WHAT THEY ASKED FOR"** — one flat sentence: an official website and merch store for the band.
- **"WHAT WE DELIVERED"** — the reframe: a cinematic web experience that extends the band's universe, with the commerce flow inside the world rather than bolted onto it.

That is the whole consulting argument in two cells, and it needs no logo wall, no testimonial, and no metric. Directly adjacent, **"behind the pixels"** lists credits by name and role, the actual stack (Next.js / Storyblok / Vercel / Lenis / GSAP / GraphQL), and third-party awards — proof outsourced to named parties rather than asserted.

**Legal for him: yes, entirely.** Micah has seven receipts with names and numbers — that is seven "what they asked for / what I delivered" pairs, and the format wants exactly the artifacts he already has (screenshots, the book's hand-drawn pages, the numbers). The tiering is the important half: let most receipts be one line and a number, and give only the two or three that deserve it a full case. His single anonymous testimonial line fits where darkroom puts its awards row — a small, credited, non-load-bearing footnote under the credits, not a hero. Nothing here requires a client logo or an invented claim.

## 10. THE TELL
The footer's **"INSPIRATION" column** — `IMPORTANT VIDEO · A MEANINGFUL SONG · GREAT BOOK BTW · AMAZING GAME · A GOOD MOVIE` — plus the three world clocks. This is the dev-Twitter personality shelf (a `/now`-page instinct wearing a footer), and it is the one place the page stops being about the buyer. Micah's own blueprint §13 already bans exactly this.

Second tell, smaller: the all-uppercase mono body copy — it reads as terminal cosplay at paragraph length, and is precisely the "narrow third" overreach his DESIGN_BAR R1 forbids. Third: the Tailwind-preset hex strays (`#dc2626`, `#e5e7eb`, `#111827`) surviving in the shipped CSS next to a hand-built `lab()` token system.

## 11. Screenshots
- Home/index: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-4-home.png` (1440×2700, 3 viewports, clipped)
- Case page: `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/studios/sf-work-4-work.png` (1440×2700, `/work/badomens`)
