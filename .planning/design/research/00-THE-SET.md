# 00 — THE SET

Research pass for an original design. Every URL below was fetched live on **2026-09-05/06**
and is quoted with its `<title>` as proof. Nothing here is described from memory. Sites that
would not resolve, or that resolved to the wrong entity, are listed at the bottom with the
reason. **Study principles only — no assets, no copy, no UI is to be reused.**

Probe method: `urllib` GET with a Chrome UA, following redirects; `<title>` + `og:description`
+ font files + library fingerprints extracted from the returned HTML. Screenshots at 1440x900
via Playwright in `./shots/`.

---

## A. Studio Freight's own work — 6 verified URLs

Studio Freight and Darkroom Engineering are two halves of one lineage: Lenis was born inside
Studio Freight (the GitHub org moved `studio-freight/lenis` to `darkroomengineering/lenis`) and
both studios still appear on each other's client rosters — **Lightfield** is credited by both.

| # | URL | `<title>` (verified) | What it is |
|---|-----|----------------------|------------|
| A1 | https://studiofreight.com/work | `Work \| Studio Freight` | The work index. 29 case studies, three view modes — `Grid / List / Zoom` — and a `Filter (+)`. Tiles carry **client name only**: no dek, no year, no tag. |
| A2 | https://studiofreight.com/work/la-marzocco | `La Marzocco \| Studio Freight` | The case-study template at its clearest: `Info` (five paragraphs of narrative prose), `Receipt` (named client quote), `Services`, `Labels`, `Links`, `More` (3 siblings). |
| A3 | https://studiofreight.com/work/perplexity-comet | `Perplexity Comet \| Studio Freight` | Hero is one full-bleed media frame inset ~130px from the page edge. No title overlay. The page's identity lives only in the breadcrumb: `Perplexity Comet / Back`. |
| A4 | https://darkroom.engineering/work | `Work - Projects That Speak for Themselves - darkroom.engineering` | The engineering-side index. 19 projects; most link **out to the live client site**, only two are hosted case studies. |
| A5 | https://us.oreobts.com | `OREO & BTS — Biggest Love Letter` | Live client work by Darkroom. Global brand platform, shipped in 90+ locales against one shared letter database. |
| A6 | https://lightfield.app | `Lightfield — AI-native CRM` | The cross-reference: Studio Freight lists it ("digital design and development across two launches"), Darkroom lists it ("marketing landing pages and the integrations behind them"). |

Also verified live from Darkroom's `work.md`, available as further reference:
`https://explorer.provable.com` (`Aleo Explorer by Provable`), `https://ibi.cash` which
redirects to `https://www.ibi.cash/` (`Ibicash – The Forest-Powered Economy`),
`https://cora.computer` (`Give Cora your inbox. Take back your life.`),
`https://www.loreobsessed.com` (`Lore - Being a fan used to be fun. We are going to fix it.`),
`https://stackhealthcare.com` (`Stack Health`), `https://tambo.co` (`Tambo`),
`https://revelo.darkroom.engineering` (`Revelo - The Ultimate Text Reveal Component for Framer`).

### Principles extracted from list A

**Type system.** Studio Freight (2026) ships exactly **three font files** and **no sans-serif
at all**: `jjannon-regular.woff2` (a Jannon serif revival) for display, and
`publico-text-mono-roman.woff2` + `-semibold` for *everything else* — nav, filters, captions,
footer, breadcrumb. A serif top and a mono bottom, with nothing in the middle. The mono is not
decoration; it is the entire UI layer.

**Scale.** Two sizes, violently separated. `EXPER|` on the work index sets at roughly 120px
cap-height; every label on the same screen sets at ~13px letterspaced mono. There is no 24px,
no 32px, no comfortable middle register. The gap *is* the hierarchy.

**Rhythm.** The home page is one non-scrolling screen: a sparse mosaic of ~24 unlabelled
thumbnails on a strict column grid, with the positioning line **"Moving Missions Forward"**
sitting in a cleared cell *inside* the grid — typeset as if it were another tile. Empty cells
are load-bearing. There is no hero, no scroll cue, and no CTA on the home page at all.

**Persistent chrome.** Header (`logo / current-page / siblings / Contact`) and footer
(`IG / LI` — `Studio Freight` — `©2026 / Terms`) are fixed and identical on every route. Only
the middle changes. Page identity is carried by a breadcrumb, not by an `<h1>`.

**How work is shown.** Client name and nothing else on the tile. Inside, the client's own
artefact is the hero — Studio Freight never puts its own headline over the client's work.
The case study is *prose*, not a metric card: La Marzocco opens "La Marzocco has never chased
attention." and closes "The result is a book that doesn't try to sell anything." The proof
of value is a named client quote under the heading **`Receipt`** — Ben Blake, Marketing and
Creative Director — not a stat block.

**How they ask to be hired.** Studio Freight: a single word, `Inquire`, then a form, then an
FAQ that answers *job*, *press*, *collaboration* — and then food recommendations and book
recommendations by city. Personality is spent on the FAQ, never on the work pages. The footer
CTA is `Work with us`. A `Capabilities` deck is offered as `Download / View`.
Darkroom: `contact:// if you've got a vision, we've got questions` plus a **productized entry
point** — "A focused two-week discovery sprint is available for teams that need an audit,
opportunity map, and clear roadmap before committing to a longer engagement."

**What moves.** Studio Freight loads `lenis` + `three` and **no GSAP**. The only motion on the
work index is a typewriter reveal with a blinking caret on the display word. Darkroom loads
`lenis`, `gsap`, `three`, `tempus`, `hamo` — its own stack, dogfooded.

**A discipline artefact worth stealing.** Darkroom publishes `llms.txt`, `work.md`,
`about.md`, `contact.md`, an `openapi.json` and a read-only `/api/content`. Its own contact
page states the engineering value proposition in the same breath: "we document the system so
the people who inherit it can understand and extend it."

**Rejected reference (named so it is not drifted into).** Darkroom's own site is
red-on-black, all-mono, terminal-styled, with an ASCII-decorated header bar. It is a fine
identity for an engineering studio and it is exactly the aesthetic House Lights bans. Take
Darkroom's *structure* and *productized offer*; take none of its skin.

Screenshots: `./shots/sf-home-1440.png`, `./shots/sf-work-1440.png`,
`./shots/sf-comet-1440.png`, `./shots/darkroom-home-1440.png`.

---

## B. The set — 16 verified studios, ranked by fit

Fit = type-led, restrained, work-first, engineered motion, visibly current in 2025–2026, and
the site itself is the proof. Ranked with a solo operator's site as the destination, so the
individual-operator entries are weighted up.

| # | Slug | URL | Why it fits | Source that surfaced it |
|---|------|-----|-------------|-------------------------|
| B1 | `studiofreight` | https://studiofreight.com/ | `Studio Freight`. Serif + mono, no sans; two type sizes; unlabelled mosaic home; prose case studies ending in a named `Receipt`. The reference case. | Seed list; live sitemap `lastmod 2026-09-06` |
| B2 | `darkroom` | https://darkroom.engineering/ | `where things get developed - darkroom.engineering`. The engineering half: publishes `llms.txt`/`work.md`/OpenAPI, links out to live client sites rather than hosting screenshots, and sells a named two-week discovery sprint. | Seed list; Codrops 2026-07-29 names it Lenis co-maintainer |
| B3 | `unseen` | https://unseen.co/ | `Unseen Studio® – Brand, Digital & Motion`. Saol Display + Neue Montreal — one serif, one grotesk, nothing else. The page is `Home / Selected Projects / Say hello`. Three headings total. | Seed list; its own meta says "Design Studio of the Year – Awwwards"; featured on lenis.dev showcase |
| B4 | `antinomy` | https://www.antinomy.studio/ | `Antinomy Studio`. One sentence as the whole hero: "Antinomy is an independent creative studio shaping contemporary brands." Four `/project/` pages — Google Gemini, MetaMask, i-D, VAST. Restraint plus real logos. | Awwwards SOTD + Awwwards Inspiration listings (search) |
| B5 | `exoape` | https://www.exoape.com/ | `Exo Ape - Global Digital Design Studio`. A single family at three weights (Lausanne 300/400/500) and nothing else. `/work /studio /story /contact` — four routes. three.js, no scroll library. | Seed list |
| B6 | `14islands` | https://www.14islands.com/ | `14islands \| Creative design & technology agency`. 30 `/work/` case studies, each headline being client plus a one-line category (`Cartier — Luxury`, `Cogent AI — Technologies`). Small team, named cities. | Seed list |
| B7 | `upperquad` | https://upperquad.com/ | `Upperquad`. Every `h2` is client plus one clause of what it was — "Gemini: A family of models built from the ground up for multimodality". Lenis. Six routes. The cleanest work-first index in the set. | Awwwards Inspiration listing; named as Antinomy's Gemini collaborator (search) |
| B8 | `obys` | https://obys.agency/ | `Obys Agency`. Ships a **proprietary typeface** (`ObysSans4.woff2`, family `Obys`) and zero `<h1>`/`<h2>` — the page is type and image, no HTML headings at all. 20 `/work/` slugs. Extreme type-leadership. | Seed list |
| B9 | `malvah` | https://malvah.studio/ | `Malvah Studio`. One face — Neue Haas Grotesk Text — plus Lenis. Routes: `/projects /studio /words /site-index /contact`. Its own `h1` reads "AWWWARDS Studio of the Year '25". | Awwwards Studio of the Year 2025 (search + LBBOnline) |
| B10 | `collins` | https://wearecollins.com/ | `COLLINS`. Included for one reason: `/programs` — **eleven named engagements** (`Reposition`, `Turnaround`, `Premiumization`, `Exit (IPO/Sale)` and more), each with a promise line, a feature list, and outcome numbers. The best model in the set for how a consultancy asks to be hired. | Seed list |
| B11 | `basement` | https://basement.studio/ | `basement.studio \| We make cool shit that performs.` Custom faces, GSAP + WebGL, `/showcase /lab /people /services`. Voice is sharper than House Lights should go, and it runs a "Trusted by Visionaries" logo wall — a named anti-pattern. Study the engineering, not the framing. | Seed list |
| B12 | `immersive-garden` | https://immersive-g.com/ | `Immersive Garden`. Awwwards Agency of the Year 2025. The high-water mark for engineered motion in this cohort — useful as the ceiling to *not* build toward. | Awwwards Agency of the Year 2025 (search) |
| B13 | `matthias-ott` | https://matthiasott.com/ | `Matthias Ott`. **Individual operator.** Ships NaN Tragedy Text + NaN Tresor VAR — a one-person site with a real type identity. Hires via one question, "How can I help you grow?", forking to services and `/workshops` ("Over 400 designers and developers"). | Analyst-proposed candidate; verified live (200 + title) |
| B14 | `sara-soueidan` | https://www.sarasoueidan.com/ | `Home` — "the personal website of Sara Soueidan, inclusive Web UI engineer". **Individual operator.** Zero JS libraries; text and structure only. Named work surfaces as `/endorsements/`, `/speaking/`, `/press-kit/` — the solo-consultant proof stack. | Analyst-proposed candidate; verified live (200 + title) |
| B15 | `rauno` | https://rauno.me/ | `Rauno Freiberg`. **Individual operator.** One sentence — "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details" — and three routes: `/craft /notes /projects`. The smallest defensible surface area. | Seed list |
| B16 | `aristide-benoist` | https://aristidebenoist.com/ | `Aristide Benoist — Independent developer`. **Individual operator.** 4.4KB of HTML, Arial, no heading elements. The extreme-restraint boundary case: proof that a motion specialist can market himself with a page that does not move. | Seed list |

### Runners-up (verified live, ranked out of the 16)

`locomotive.ca` gives `Locomotive | Montreal web agency` (still on locomotive-scroll; emoji in
the `h1`). `resn.co.nz` gives `Resn - Creative Digital Agency`. `activetheory.net` gives
`Active Theory · Creative Digital Experiences`. `lusion.co` gives `Lusion - Award Winning 3D
and Interactive Web Studio` (WebGL-first, not type-led). `utsubo.com` gives `Utsubo - Embark on
New Frontiers of Digital Experiences` (Astro + Lenis + three). `phantom.land` gives
`Phantom Studios — Technology Creative Agency`. `matbold.com` gives `Matbold® - Brand
Transformation & Digital Experiences` (Awwwards Studio-of-the-Year nominee, but Webflow
origin). `index.studio` gives `Index` (16KB, Barba; almost too thin to read). `metalab.com`
gives `Metalab | We make interfaces` (one `h1`, no nav paths — pure restraint, but
agency-scale). Also verified and ranked out: `koto.com`, `pentagram.com`, `work.co`,
`studiodumbar.com`, `buck.co`, `instrument.com`, `hellomonday.com`, `fantasy.co`,
`further.group`, `zajno.com`, `cuberto.com`, `freeassociation.com`, `dogstudio.co`,
`uncommon.studio` (`Uncommon Creative Studio`).

Individual operators considered and ranked out: `danmall.com` gives `Dan Mall Helps Designers
Make More Money & Get Their Flowers` — the strongest *pricing* model in the set; Framer + Inter
so template-adjacent visually, but worth reading for how he names and prices a solo practice.
`arun.is` gives `Arun Venkatesan` (Astro, essay-led). `emilkowal.ski` gives `Emil Kowalski`
(ten `/ui/` essays, no `h1`). `ped.ro` gives `Pedro Duarte's Personal Website`. `jhey.dev`
gives `Jhey Tompkins`. `baptistebriel.com` gives `Baptiste Briel | Creative Technologist,
Co-founder & CEO of Antinomy Studio`. `tomcritchlow.com` gives `Tom Critchlow. Move. Think.
Create.` `designjoy.co` gives `Designjoy - Design as a Subscription` — one person, publicly
priced subscription, the productized-solo extreme.

### Dropped — did not resolve, or resolved to the wrong thing

- `thisisstudio.co.uk` — returns 200, but the title is now `Free Bets on UK Betting Sites 2026`.
  The domain lapsed into affiliate spam. **Dead as a reference.**
- `by-kin.com` — returns 200, but it is `'kin Commercial Interior Design & Branding Studio`,
  Manchester. Not the web studio the award coverage meant.
- `ueno.co` — returns 200; its own meta calls it "a retired global design agency". Historical
  only.
- `wearemotto.com` — HTTP 403 to every request. Could not fetch, so it is not in this report.
- `uncommon.com` — returns 200, but it is `The Uncommon Group | Private Equity & Venture
  Capital`.
- `off-brand.co`, `goodfella.studio`, `nationaldesign.studio` — surfaced from the lenis.dev
  showcase but resolved to TLS failures, a coffee shop, and a parked 1KB page respectively.

### Discovery sources used

1. The orchestrator's seed list — all 26 probed, 26 resolved 200.
2. Awwwards Annual Awards 2025 — Malvah (Studio of the Year), Immersive Garden (Agency of the
   Year), Unseen (Design Studio of the Year, per its own meta). Matbold surfaced as a top-40
   Studio-of-the-Year nominee.
3. Awwwards SOTD / Inspiration listings — Antinomy, Upperquad.
4. **lenis.dev's own showcase** (`Lenis – Smooth Scroll`, by darkroom.engineering). Its
   featured list names Netflix Careers, **Unseen Studio®**, Lando Norris, OFF+BRAND, Rockstar's
   Grand Theft Auto VI, Google Cloud x Team USA, Good Fella, National Design Studio and
   Ibicash. The page also states Lenis now powers "even libraries like Locomotive Scroll" and
   closes each card with `Need a site like these? Work with darkroom` — the
   open-source-library-as-lead-generator pattern, in the open.
5. Codrops, 2026-07-29, "Studio Freight: Moving Missions Forward" — the studio's stated
   principle is **"brutal elegance"**: "honest about what actually matters even when it means
   dropping good ideas for one great one."
6. Analyst-proposed individual-operator candidates, each verified live before inclusion.

---

## Cross-cutting principles for the original design

1. **Two type sizes, not five.** Every strongest site in the set separates a display register
   from a label register and refuses the middle. Studio Freight: ~120px serif and ~13px mono.
2. **One or two faces, shipped as actual files.** Exo Ape ships one family at three weights.
   Unseen ships two. Obys ships its own. The weakest sites in the set ship the most families.
3. **The work tile carries a name and nothing else.** No dek, no year, no tag cloud. Detail
   belongs inside.
4. **The client's artefact is the hero; the studio's headline is not.** Comet's hero is
   Perplexity's own film, inset, silent.
5. **Persistent chrome, changing middle.** Identity in the breadcrumb, not in a per-page
   `<h1>`. This is compatible with House Lights' route-determined foyer/theater modes and gives
   the mode switch something to switch *around*.
6. **Proof is a named quote, not a metric card.** `Receipt` — a real person, a real title, in
   their own sentences.
7. **The hire is a named, scoped thing.** Darkroom's two-week discovery sprint; COLLINS'
   eleven programs. A bare "Contact" link is the weakest option in the set.
8. **Motion is one gesture, engineered, and it terminates.** Studio Freight ships Lenis and
   three.js and spends its entire motion budget on a caret. That is the whole signature.
9. **Personality is quarantined.** Studio Freight puts food and book recommendations on the
   contact FAQ and keeps every work page dead straight.
10. **Publishing the machine-readable surface is part of the craft claim.** Darkroom's
    `llms.txt` + `work.md` + OpenAPI is itself an argument that they will document what they
    build.
