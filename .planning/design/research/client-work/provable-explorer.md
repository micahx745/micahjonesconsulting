# provable-explorer — Aleo Explorer by Provable (built by darkroom.engineering)

## 1. Fetch proof
- Live URL: `https://explorer.provable.com/` — **HTTP 200** (curl `-w %{http_code}` → `200`).
- `<title>` = **`Aleo Explorer by Provable`** (also confirmed in the live page: `document.title === "Aleo Explorer by Provable"`).
- Meta description positions it as a tool for navigating and analyzing activity on the Aleo blockchain.
- Studio: **darkroom.engineering**. Pointer page found: `https://darkroom.engineering/work` (title: *"Selected Work by Darkroom Engineering"*), which lists "Provable Explorer" among 19 client projects. A dedicated detail URL at `/work/provable` returns **404**, so `/work` is the only verified pointer.
- What the pointer page says (quoted): **"The block explorer for Aleo, turning a firehose of chain data into something readable at a glance."** Corroborating summary from search: darkroom worked with Provable for over a year on design, frontend development and integrations; the Explorer was the first piece to launch publicly.
- Deploy: Next.js on Vercel (`/_next/static/chunks/…?dpl=dpl_9NQY9bMjXnt11JdxxW3p9hb42Esm`, Turbopack chunk present).

## 2. The client and the product
Provable (the company behind the Aleo privacy blockchain) selling **trust in a network** — the explorer is the public instrument panel where anyone can read live chain state: price, stake, transactions, validators, provers, programs, blocks.

## 3. First screen
- Assertion, 4 words at 1440: **"Explore the Aleo Network"** — and only *Aleo* is at full ink; "Explore", "the", "Network" render at `foreground/64%`. At 390 the copy itself trims to **"Explore Aleo"** (the two low-ink spans carry `hidden md:block`).
- Alignment: dead centre, hero band roughly 260px tall. Below it, immediately, a stat grid — the fold is *content*, not a pitch.
- What the hero IS: **type + a search field + two canvas-drawn "block curtains."** Two `<canvas>` elements (326×480, one `left-[-200px]`, its twin `right-[-200px] rotate-180`) render a faint vertical-tick barcode of chain data behind the headline. No photograph, no 3D, no video (`document.querySelectorAll('video').length === 0`).
- The real hero control is the **search input**: full width of the centred column, pill-shaped, with a `/` keyboard-shortcut chip on the right and a **cycling placeholder** — `search by program… / transaction… / wallet… / block…`.
- Nav: **6 items** (VALIDATORS · PROVERS · PROGRAMS · BLOCKS · TRANSACTIONS · DOCS), left-aligned after the `Explorer` wordmark; right cluster = search icon, theme toggle (moon), `MAINNET ▾` network switcher. Header is `sticky top-0 z-50 bg-background-88 backdrop-blur`. At 390 the six collapse into a hamburger; only wordmark, search, MAINNET and menu remain. Nothing is hidden behind a menu on desktop.

## 4. Type system (from the CSS)
- Self-hosted `@font-face` families, three: **`innovatorGrotesk`** (woff2, weights **100–900, roman + italic at every weight** — 18 faces), **`abcDiatype`**, and **`supplyMono`** (PP Supply Mono, `.ttf`).
- A metric-matched fallback ships with it: `@font-face{font-family:innovatorGrotesk Fallback;src:local(Arial);ascent-override:90.14%;descent-override:23.36%;size-adjust:105.72%}` — zero-CLS swap.
- Computed `body`: `innovatorGrotesk, "innovatorGrotesk Fallback", sans-serif` at **16px**. Display and text are the **same family**; hierarchy comes from weight, size and *opacity*, not from a second face.
- Display sizes are tiny by agency standards — **the largest type on the page is 32px**. h1 `32px / letter-spacing -0.96px (-0.03em) / weight 700`; section heads `22px / -0.66px / 700`; card headlines `18px / -0.54px / 600`; the CTA head `28px / -0.84px / 700`. Headline numbers sit at 24–32px. **No clamp() display scale** in these chunks; fixed steps only (`11 · 13 · 14 · 16 · 18 · 20 · 22 · 28 · 32`).
- Tracking: negative on display (`-.03em`, `-.02em`, `-.025em`), positive on labels (`.01em`, `.04em`/`.04px`, `.05em`, `.1em`).
- **Mono does the labelling.** Every nav item, stat label, table header, tag chip, transaction ID, footer link and the search placeholder is `supplyMono`, uppercase, tracked open. `text-transform:uppercase` runs throughout the label layer; body prose is never uppercase and never mono.
- Weight usage in the page CSS: 700 (16 rules) > 600 (10) > 400/500 (7 each) > 300 (5).

## 5. Palette (from the CSS)
HSL tokens on `:root` / `.dark`, consumed through Tailwind:
- `--background: 30 18% 96%` → **#F7F5F3** (measured `rgb(247,245,243)`) — warm paper grey, *not* white.
- `--foreground` / `--dark: 20 27.27% 2.16%` → **#070504** (measured `rgb(7,5,4)`) — warm near-black, *not* #000.
- `--white: 18 25% 92%` → **#F0E9E6** — the dark-theme type colour (verified by flipping `html.light` → `.dark`: body becomes `rgb(7,5,4)` ground with `rgb(240,233,230)` type).
- `--positive: 159 82% 41%` (≈ **#13BE87** mint) and `--negative: 1 99% 65%` (≈ **#FD524C** coral) — the only saturated colours, and they appear **only on data**: sparkline strokes, the ±% price chip, `ACCEPTED` status tags.
- `--search-bkg: 20 33% 98%` (light) / `30 9% 9%` (dark); `--border: foreground / .04`; `--header-bkg: background / .32`.
- Hex counts in the page CSS are dominated by alpha ramps of the two grounds — `#0000` ×43, `#fff0` ×14, `#07050402/05/08`, `#f0e9e602/05/08/0f` — i.e. the whole system is **two colours at ~fifteen opacities**. `--accent` is literally `var(--foreground)`: **there is no brand accent doing the work.** The chain-logo dots in the lists (Coinbase blue, Pondo, Arcane) are the only other colour on screen and they are third-party marks, not palette.
- Separator: `linear-gradient(90deg,#f0e9e600 0%,#f0e9e60f 50%,#f0e9e600 100%)` — rules fade at both ends rather than butting the margin.

## 6. Narrative arc (sections in order)
1. **Hero** — "Explore the Aleo Network" + the search field. One promise: you can find anything here.
2. **Stat grid, 9–12 cards** — Aleo price (1-day sparkline, `-1.52%` chip) · Total Network Stake `1.22B` · Total Transactions `26.34M` (all-time sparkline) · Staking APY `11.4%` · Staked `58.9%` · Coinbase Target `142.74T` · Proof Target `35.68T` · Total Validators `27` · Total Provers `174` · Program Calls This Week `120,158` · Deployed Programs `917` · Puzzle Rewards 7d `2.14M`. Every card = one mono label + one number, some with a sparkline; a few carry `1 DAY ▾` / `ALL TIME ▾` range switchers.
3. **Ecosystem News** — a horizontally scrolling card rail (`react-horizontal-scrolling-menu`) of Provable posts with generated gradient thumbnails; "VIEW ALL ›" at the right of the heading.
4. **Three parallel lists** — Latest Blocks · Validators (by stake) · Top Programs / Provers: compact ranked rows, avatar dot, name, right-aligned mono number, "View All".
5. **The one pitch band** — "Want to build **cryptographically secure dApps** at scale?" / "Use the Provable SDK to build secure, private applications on Aleo. Empowering digital privacy." / `LEARN MORE ›`. Full-bleed, over a ghosted canvas landscape.
6. **Latest Transactions** — a full-width live table: ID, `ACCEPTED`, program, function, block height, `EXECUTE`, age.
7. **Footer** — a wide, quiet canvas band, then four mono uppercase columns (PRODUCTS · DEVELOPERS · UPDATES · COMPANY) and `© PROVABLE 2026`.

Arc in one line: *prove the network is alive → let the visitor verify any of it themselves → once, quietly, invite them to build on it.*

## 7. Motion grammar
- **Libraries: none of the usual.** In-page probe on a clean tab: `window.lenisVersion === null`, `window.gsapVersions === null`, `window.tempusVersion === null`, `window.__THREE__ === false`, `window.lenis === false`. No Lenis, no GSAP, no three.js, no Framer Motion. From the studio that *wrote* Lenis — on this build they left it out.
- **Canvases: 5.** Two 433×330 (chart layers), two 326×480 hero "block curtains" (mirrored `rotate-180`), one 1495×68 full-width band at `lg:opacity-10 dark:lg:opacity-20`. **Videos: 0.** SVGs: 255. Images: 36 (news thumbnails, chain logos).
- **Scroll-driven behaviour: essentially zero.** The only `position:sticky` elements are the header and the mobile menu. No pin, no parallax, no horizontal scroll-jack, no scrub, no scroll-triggered reveal, no page transition, no cursor follower, no velocity skew, no marquee. Page height at 1440 is only **3792px** — about four screens.
- Keyframes in the CSS are all micro: `pulse` (2s, skeleton loaders), `rotateCW` (9s linear infinite, the search module ring), and five 0.2s tooltip enter/exit slides. Transitions: `opacity .4s/.6s ease-in`, `transition-colors duration-200`, `transform .4s`, `clip-path .3s`.
- **The ONE motion moment: the cycling search placeholder.** `search by program… → transaction… → wallet… → block…` types itself through the four things the field accepts, inside the only control on the first screen, next to a `/` chip. It is the page's entire tutorial and it costs no library.
- Second-order: the numbers and lists are *live* — the data is the animation. Everything chrome-side is deliberately still.

## 8. Commerce / the ask
No commerce at all — nothing sold, no sign-up, no email capture, no wallet-connect. The single ask sits at ~70% depth: a pill reading **"LEARN MORE ›"** under "Want to build cryptographically secure dApps at scale?", pointing at the Provable SDK. Volume: **quiet** — 28px head, two-line dek, outlined pill, no colour, on a ghost-white ground. The secondary ask is the word `DOCS`, last in the nav.

## 9. Rhythm
Seven sections over ~4 screens. Everything lives in a **contained max-width grid of cards** (rounded, 1px borders at 4% ink) except two full-bleed moments: the SDK band and the footer canvas — and both of those are the *quiet* ones, not the loud ones. Density is highest at the top (a dozen numbers above the second screen) and decays to whitespace at the bottom. It goes quiet twice: the ~300px of empty paper above the SDK band, and the ~200px canvas band above the footer. Footer is a four-column mono uppercase link matrix with the copyright bottom-left — no newsletter, no social row, no oversized logo.

## 10. THE BEST PART for Micah
**The opacity-graded headline plus the one-number card grid — the same two moves, used together.**

1. *Grade the headline by ink, not by size.* The h1 is literally four spans: `<span class="text-foreground-64">Explore</span> <span class="text-foreground-64">the</span> <span>Aleo</span> <span class="text-foreground-64">Network</span>`. One word at 100% ink, the rest at 64%. That is a full hierarchy at **32px** with no second font, no colour and no size jump — and House Lights already has the ingredient (foreground at fractional alpha). It degrades honestly, too: the two low-ink spans are `hidden md:block`, so at 390 the headline shortens itself to the two words that matter.
2. *Make the proof a grid of small, equal cards, each carrying exactly one named number.* Same weight for every card, a mono uppercase label, one figure at 24–32px, and — where the data exists — a two-colour trendline. Micah has **seven receipts with names and numbers**: seven equal cards on the paper ground, labels in JetBrains Mono uppercase (his cleared R1 "narrow third"), numbers at 32px, borders at 4% ink. No logos required, nothing invented, and the discipline that makes it read premium is that *nothing on the page is bigger than the numbers* — the largest type on a darkroom-built blockchain site is 32px.

Third, free: **the search field as the hero's only control, with a placeholder that cycles through what it accepts.** For Micah that maps to a single input ("what are you trying to fix?") whose placeholder rotates through the three fixed-price packages — teaching the offer without a pricing table above the fold.

## 11. THE TELL
**The live chain firehose.** Five canvases of ambient block-tick texture drawn from real chain data, a price sparkline, an all-time transactions chart, an auto-updating transaction table with `ACCEPTED` states and block heights — that is an indexer backend plus a year of integration work (darkroom "worked with Provable for over a year"). Client budget, not a mechanism: a solo consultant has no firehose, and faking one with dummy tickers is the exact opposite of the honesty this design trades on. Second tell, smaller: **two licensed proprietary typefaces** (Innovator Grotesk in 18 self-hosted faces, PP Supply Mono). The *system* — one grotesk plus one mono reserved for labels — is borrowable; the licence bill is not.

## 12. Screenshots
`C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-micahjonesconsulting/5e1d622c-a05a-43bd-9bbe-992aaaf6d702/scratchpad/client-work/`
- `provable-explorer-top.png` (1440×900, first screen)
- `provable-explorer-mid.png` (~35% depth — ranked lists into the SDK band)
- `provable-explorer-late.png` (~70% depth — transactions table into the footer)
- `provable-explorer-390.png` (390 first screen — headline trims to "Explore Aleo")
