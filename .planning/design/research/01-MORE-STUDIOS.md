# 01 — MORE STUDIOS

Ten more studios in the Studio Freight / darkroom lane, ranked by fit. Research only —
nothing here touches live code.

**Method, per the operator's rule.** A studio is read through the live sites it built for
clients, not its own homepage. Every studio URL and every client URL below was fetched with
`curl -sL` (browser UA) and returned **HTTP 200**; the `<title>` string quoted after each one
is the proof of fetch. Candidates that would not resolve are in "Dropped" at the bottom and
do not appear above it, however good their reputation.

**Two title strings below are quoted with one word elided** and marked `[…]`, because the
client's own copy uses a term on this repo's banned list and `copy-lint.sh` blocks the write.
Both elisions are flagged in place. Nothing else in a quoted title is altered.

**What surfaced them.** The Awwwards Site-of-the-Day archive, read for the *credit line*
rather than the site — pages 1 through 4 of `awwwards.com/websites/sites_of_the_day/`,
covering roughly Apr–Sep 2026 — plus FWA and WebGPU-community credits on individual launches.
Reading four pages of SOTD credits turns up the same twenty or so studios shipping this work;
that list, minus everything already in `00-THE-SET.md`, is most of what follows.

---

## 1. OFF+BRAND

- **slug:** `offbrand`
- **url:** https://www.itsoffbrand.com/ — 200, `<title>OFF+BRAND. | Global Creative & Technology Studio</title>`
- **source:** Awwwards SOTD credits — "Trevor Noah by OFF+BRAND." (Sep 03 2026) and
  "Steven.com by OFF+BRAND." — plus the Lando Norris credit search.
- **why it fits:** Founder-led, Glasgow and London, and the single closest match in the set to
  the brief's own examples: this is the studio behind the Lando Norris site the operator named.
  Athlete sites, comedian sites, AI product launches — real products and real brands, one
  cinematic build at a time, work-first. Awwwards Site of the Year plus 50+ awards, and still
  a studio rather than an agency.

**Client builds:**

| url | client | what |
|---|---|---|
| https://landonorris.com/ | Lando Norris (McLaren F1) | 200, `<title>McLaren Formula 1 Driver — Lando Norris</title>`. The F1 driver's official platform. Notable: the helmet "Hall of Fame" — a 2019–2025 archive treated as a gallery wall with hover states, which turns a merch-adjacent page into the reason to visit. On/Off Track as the whole IA. Took SOTM, SOTD and an FWA of the Day. |
| https://trevornoah.com/ | Trevor Noah | 200, `<title>Trevor Noah - Comedian, Author & Host \| Official Site</title>`. SOTD Sep 03 2026. A talent site that resists the linktree default: shows, watch/listen, books and store carried as one editorial spine instead of a card grid. |
| https://steven.com/ | Steven (creator-economy platform) | 200, `<title>Operating System for the Creator Economy \| Steven.com</title>`. SOTD + Developer Award, Jun 2026. The whole navigation is one interactive ecosystem diagram — "tap a section of our ecosystem to navigate" — so the site's single motion moment *is* the information architecture rather than decoration on top of it. |
| https://www.vizcom.com/ | Vizcom | 200, `<title>Vizcom \| Turn Sketches into Full-Fidelity 3D Renders, Instantly</title>`. AI design-tool product site; the sketch-to-render transformation is demonstrated in the page rather than described. |

---

## 2. Holographik

- **slug:** `holographik`
- **url:** https://holographik.co/ — 200, `<title>Holographik® is a creative studio specialized in design and motion.</title>`
  (work index: https://holographik.co/work — 200, `<title>Work</title>`)
- **source:** Awwwards SOTD credits — "Sui by HOLOGRAPHIK" and "Paul Kalkbrenner by
  HOLOGRAPHIK" (Sep 02 2026). Nominated among the 40 studios shortlisted for Awwwards Studio
  of the Year out of ~1,500.
- **why it fits:** The purest hit on the brief's own list of buyers. Crypto firm, band, athlete
  — Holographik has shipped all three inside eighteen months, and each one on the client's own
  domain rather than a portfolio subdomain. Small, interdisciplinary, strategy-led; six client
  projects on the work index, which is the rationing the ethos asks for. Note the studio lives
  at `.co` — `holographik.studio` is a parked Porkbun listing, not them.

**Client builds:**

| url | client | what |
|---|---|---|
| https://sui.io/ | Sui Foundation | 200, `<title>Sui \| The Infrastructure for Trusted Autonomous Execution</title>`. SOTD. A layer-1 blockchain site that refuses consumer-crypto styling entirely — institutional register, policy and compliance language, a modular stack diagram (Walrus, Seal, DeepBook) doing the explaining. Proof the studio can hold a restrained near-black brand under a technical load. Built with the Sui Foundation design team and AKKA Studio. |
| https://www.paulkalkbrenner.net/ | Paul Kalkbrenner | 200, `<title>Paul Kalkbrenner – Official Website</title>`. SOTD Sep 02 2026. The Berlin electronic artist's site: music, two decades of releases, a 2026 European tour routing, and a gallery. A band site where the discography and the tour table are the design, not a widget bolted under a hero video. |
| https://www.davidalaba.com/ | David Alaba | 200, `<title>David Alaba – Official Website</title>`. The Real Madrid / Austria footballer's official site — the athlete-site category the brief named, executed by a studio small enough to still be doing brand and site as one piece of work. |

---

## 3. Utsubo

- **slug:** `utsubo`
- **url:** https://www.utsubo.com/ — 200, `<title>Utsubo - Embark on New Frontiers of Digital Experiences</title>`
  (work index: https://works.utsubo.com/ — 200, `<title>Utsubo Works | Digital Experiences & Creative Projects</title>`)
- **source:** Awwwards SOTD credit "Vectr by Utsubo"; FWA of the Day (Jun 02 2026) and FWA
  Site of the Month (May 2026) credits.
- **why it fits:** The most literally engineering-led studio here — "technology-first creative
  studio," based in Osaka, and the works index lists **three** client projects total. That is
  the "two people and a GPU" shop the brief asked for, except the GPU is a WebGPU render
  pipeline. They publish their own performance numbers (an 80–95% cut to a 3D payload), which
  is the tell: the craft claim is falsifiable.

**Client builds:**

| url | client | what |
|---|---|---|
| https://vectrfl.com/ | Vectr | 200, `<title>Vectr</title>`. AI staffing platform for nuclear, gas-turbine, data-center and semiconductor sites. Design and dev end-to-end: a real-time three.js **WebGPU** hero of isometric white refineries and plants on a soft blue field, app-like page transitions. Launched May 21 2026; FWA of the Day Jun 02 2026. The restraint is the point — one 3D world, one color, no second idea. |
| https://athenahq.ai/ | AthenaHQ | 200, `<title>AthenaHQ \| Agents to Win on AI Search</title>`. An AI-search-visibility (AEO/GEO) product site — the "AI product launch" category, carrying real customer proof (SoFi, Coinbase, Hearst) without a logo-wall gimmick. |
| https://brand.ivress.co.jp/ | Ivress (株式会社イヴレス) | 200, `<title>SPIN A TALE ー 紡ぐ物語 ー｜株式会社イヴレス ブランドサイト</title>`. A Japanese brand site built on three.js + WebGPU as a single continuous story — FWA Site of the Month, May 2026. Co-built with Laugh Mind. |

---

## 4. OddCommon

- **slug:** `oddcommon`
- **url:** https://oddcommon.com/ — 200, `<title>OddCommon</title>`
  (work index: https://www.oddcommon.com/work — 200, `<title>Work | OddCommon</title>`)
- **source:** Awwwards SOTD credit "Cleo AI by OddCommon."
- **why it fits:** Independent since 2021, certified B Corp, roughly eight named people, and
  their own clients describe them as "lean, focused, and a refreshing alternative to the
  complexity of larger agencies." Positioning is exactly the darkroom register — "the
  expression of brand and product through high-craft digital experiences." A one-word homepage
  title is itself the work-first tell.

**Client builds:**

| url | client | what |
|---|---|---|
| https://meetcleo.com/ | Cleo AI | 200, `<title>Cleo makes money better.</title>`. SOTD. Brand and site for the AI personal-finance assistant — a consumer fintech that had to read as funny and trustworthy at once, which is a copy problem before it is a motion problem. |
| https://www.exo.inc/iris | Exo (Exo Iris) | 200, `<title>Exo Iris® \| Portable Handheld Ultrasound Device \| Exo</title>`. Awwwards Honorable Mention. Product positioning, content strategy, brand modernization and the launch site for a handheld ultrasound device — a hardware launch where the site has to carry clinical credibility, not vibes. The closest analogue in the set to a regulated-domain build. |
| https://www.agencie.com/ | Agencie | 200 (no `<title>` element served). Brand identity and site for an architectural practice expanding into new markets. |

---

## 5. Bürocratik

- **slug:** `burocratik`
- **url:** https://burocratik.com/ — 200, `<title>We are Büro</title>`
- **source:** Awwwards SOTD credit "Floema by Bürocratik."
- **why it fits:** Self-described "small but mighty," two studios in Portugal (Coimbra and
  Porto), and ranked #1 digital studio in Europe by the European Design Agencies League five
  years running (2021–2025). The client list is the fintech-and-crypto spine the brief points
  at — Clear Street, MultiversX, Jeton — and the work is type-led and near-black rather than
  illustration-led. The two-word homepage title is the same restraint as OddCommon's.

**Client builds:**

| url | client | what |
|---|---|---|
| https://www.clearstreet.io/ | Clear Street | 200, `<title>Clear Street — Speed, Transparency and Scale for Sophisticated Investors.™</title>`. Institutional prime brokerage. Minimalist, data-forward, segmented by investor type; carries ~700 institutional clients and ~$16bn balances as named numbers rather than adjectives — the exact discipline the House Lights voice rules ask for. |
| https://multiversx.com/ | MultiversX (formerly Elrond) | 200, `<title>The Internet-Scale Blockchain \| MultiversX</title>`. A layer-1 with a hard IA problem — individuals, builders, ecosystem, community — solved with persona-split navigation instead of one undifferentiated firehose. |
| https://selfbook.com/ | Selfbook | 200, `<title>[…] more direct bookings and expand your distribution through AI search \| Selfbook</title>` — first word elided, copy-lint banned term. Hotel-payments and direct-booking infrastructure; three numbered service modules carrying the whole page. |
| https://www.remote.com/ | Remote | 200, `<title>Global Employment Infrastructure \| EOR, Payroll & Compliance, Worldwide \| Remote</title>`. Global-employment platform at genuine scale. |

---

## 6. O0 (ozero.design)

- **slug:** `o0`
- **url:** https://www.ozero.design/ — 200, `<title>O0 | Digital Product Design & Branding Studio</title>`
- **source:** Awwwards SOTD credit "Fauna Robotics by O0" (Jun 16 2026); studio profile at
  awwwards.com/o0design.
- **why it fits:** The smallest shop in the set that still lands SOTD — US-based, stated
  project range $5,000–$30,000, describing itself as "a full-stack cloud design studio. We
  design products and brand them up." Hardware and deep-tech startups: robotics, spacecraft,
  a search API, a writing device. That is a studio choosing engineering-shaped clients on
  purpose. **Caveat:** ozero.design 403s a plain fetch; it returns 200 only with a browser
  user-agent, so treat any tooling against it accordingly.

**Client builds:**

| url | client | what |
|---|---|---|
| https://faunarobotics.com/ | Fauna Robotics | 200, `<title>Fauna Robotics \| Capable, Safe, Fun Robots for Everyone</title>`. SOTD Jun 16 2026. Brand system and site for the "Sprout" humanoid — the brief was to make robotics read warm and approachable rather than industrial: asymmetrical shapes, calm tones, close-up imagery, expressive interaction. Fauna was subsequently acquired by Amazon, so the build survived a diligence process. |
| https://portalspacesystems.com/ | Portal Space Systems | 200, `<title>Portal Space</title>`. Spacecraft company. A one-word title on a company selling orbital maneuvering — confidence carried by restraint. |
| https://www.newscatcherapi.com/ | NewsCatcher | 200, `<title>NewsCatcher: Web & News Search API for AI Agents</title>`. Developer-facing search API — a docs-adjacent audience that punishes decoration. |
| https://getfreewrite.com/ | Freewrite | 200, `<title>Freewrite: Distraction-Free Writing Tools</title>`. DTC hardware for writers; a product site that has to sell an object on feel. |

---

## 7. makemepulse

- **slug:** `makemepulse`
- **url:** https://www.makemepulse.com/ — 200, `<title>makemepulse — Global Creative Studio</title>`
- **source:** Awwwards SOTD credits — "Apechain by makemepulse" (Jun 06 2026), "Brunello
  Cucinelli - AI E-com" (Jul 09 2026), "XOX" (May 10 2026); five SOTDs in 2026 alone.
- **why it fits:** Paris, founded 2008, and the most consistently decorated interaction studio
  in the SOTD archive that is not already in `00-THE-SET.md`. Runs a partner-network model
  (Callimacus on Cucinelli) rather than headcount, which keeps it studio-shaped. The 3D earns
  its place instead of decorating — the same test darkroom passes.

**Client builds:**

| url | client | what |
|---|---|---|
| https://apechain.com/ | ApeChain | 200, `<title>APECHAIN</title>`. SOTD + Developer Award, Jun 2026. The ApeCoin/BAYC chain — a crypto build that had to be an app directory *and* a brand statement; large tiles, category filtering, a developer-facing footer. An all-caps one-word title carrying the whole brand. |
| https://www.brunellocucinelli.com/ | Brunello Cucinelli | 200, `<title>Brunello Cucinelli \| Philosophy, Online Boutique & Investor Relations</title>`. SOTD Jul 09 2026 for the human-centred AI e-commerce experience — luxury commerce where the AI layer had to disappear into the brand rather than announce itself. |

Also credited in 2026: Ruinart (digital fresco, Apr 21), the UNESCO Stolen Objects Museum
(Jan 14), and McDonald's Rösti Fall.

---

## 8. Merci Michel

- **slug:** `merci-michel`
- **url:** https://merci-michel.com/ — 200, `<title>Merci-Michel · Gamification & Advergame Studio</title>`
- **source:** Awwwards SOTD credits — "MIU MIU A House that we shaped" (Aug 25 2026),
  "Lacoste Ace Breaker" (Aug 03 2026), "Lacoste — Polo Factory" (Jul 21 2026), "Cdiscount -
  Jumping Max."
- **why it fits:** French, 40+ projects across 2014–2024, and the fashion-and-luxury end of
  this lane: Lacoste, Cartier, Kenzo, Boucheron, Miu Miu, Red Bull. **Read the title honestly**
  — they self-describe as a gamification and advergame studio, so this is the most playful,
  least type-led entry in the set. Included because the craft ceiling is very high and because
  the Lacoste work ships on the client's own domain, which most campaign studios cannot claim.
  If the reference you want is restraint, this is not it; if it is "one motion moment, executed
  to the last frame," it is.

**Client builds:**

| url | client | what |
|---|---|---|
| https://members-play.lacoste.com/ace-breaker/ | Lacoste | 200, `<title>Lacoste - Ace breaker</title>`. SOTD Aug 03 2026, scored 7.46. A Roland-Garros-court game inside the Lacoste Members programme — a loyalty mechanic disguised as a playable, running on Lacoste's own subdomain rather than an agency URL. |
| https://www.miumiu.com/ | Miu Miu | 200, `<title>Official Website and Online Boutique \| Miu Miu US</title>`. "A House that we shaped," SOTD Aug 25 2026. |

Also: "Lacoste — Polo Factory" (SOTD Jul 21 2026, 3D/WebGL) and Cdiscount Jumping Max.

---

## 9. Rogue Studio

- **slug:** `rogue-studio`
- **url:** https://rogue.studio/ — 200, `<title>Rogue Studio | Digital Branding & Experience Agency</title>`
  (work index: https://rogue.studio/work — 200, same title)
- **source:** Awwwards SOTD credit "NRG | Build Your Data Center by Rogue Studio."
- **why it fits:** Red Hook, Brooklyn. Grew out of founder Britton Stipetic's solo practice
  (formerly Britt Digital), and is explicit about *not* being full-service: branding and
  digital design, nothing else. The client mix is the small end of the brief — a musician, a
  streetwear label, a 3D-printed-sneaker brand, a clinic tool — with one enterprise energy
  build to prove the ceiling. The most directly comparable studio here to a one-person
  consultancy scaling up, which makes it the most useful structural reference for this site.

**Client builds:**

| url | client | what |
|---|---|---|
| https://business.nrg.com/campaigns/build-your-data-center/ | NRG Energy | 200, `<title>NRG \| Build Your Data Center</title>`. SOTD. A B2B "Bring Your Own Power" landing environment for data-center operators, structured as phased progressive disclosure ("Scroll to Phase 1") — scroll used as an explanatory device on genuinely dry infrastructure copy. Lives on NRG's own business subdomain. |
| https://radicalface.com/ | Radical Face | 200, `<title>Radical Face - Music, Writing, and Art \| Radical Face</title>`. Design and dev for the musician's digital home, plus a separate narrative build ("A Light in the Woods"). The band-site category, done small. |

---

## 10. Phantom Studios

- **slug:** `phantom`
- **url:** https://phantom.land/ — 200, `<title>Phantom Studios — Technology Creative Agency — London and Auckland</title>`
- **source:** Named in the operator's candidate list; verified directly.
- **why it fits — with a caveat:** London and Auckland, 92 projects catalogued back to 2016,
  WebGL/AR/3D craft, and a genuinely enviable client list (Monocle, Financial Times, Sony
  Music, Casamigos, Loop Earplugs, Netflix, Google). It is the **largest** studio I kept, and
  it sits closer to the agency end than the rest of this list — ranked last for that reason.
  **Attribution caveat, stated plainly:** the client builds below are live and were fetched at
  200, but the credit comes from Phantom's own portfolio index, and a current `.com` may be a
  later rebuild by someone else. Treat these as "Phantom claims it," not as verified authorship
  the way the Awwwards-credited builds above are.

**Client builds:**

| url | client | what |
|---|---|---|
| https://monocle.com/ | Monocle | 200, `<title>Monocle - global affairs, culture and design</title>`. Editorial publishing at magazine density — the hardest IA problem in this whole report. |
| https://www.casamigos.com/ | Casamigos | 200, `<title>Ultra-Premium Tequila and Mezcal \| Casamigos</title>`. DTC spirits brand. |
| https://www.loopearplugs.com/ | Loop Earplugs | 200, `<title>Your Life, Your Volume \| Loop Earplugs</title>`. DTC hardware at scale — 14M customers, TIME100 Most Influential Companies. The "DTC drops" category the brief named. |

---

## Dropped

Named so nobody re-litigates them next pass.

| candidate | why dropped |
|---|---|
| **Cuchillo** (`cuchillo.studio`) | Would not resolve. `ECONNREFUSED` on WebFetch, curl exit `000`. Credited on Awwwards SOTD for "Depo Luxe," so the work is real — but per the fetch rule it does not exist for this report. Retry next pass. |
| **The First The Last** (`thefirstthelast.com`) | DNS failure, `ENOTFOUND`. Two SOTD credits (ERA Residence, Son Daven) but no reachable domain found. Worth one more search pass for the correct URL. |
| **baqemono.inc** (`baqemono.com`) | DNS failure, `ENOTFOUND`. SOTD credit for "IZANAMI." Wrong TLD guessed; not chased further. |
| **holographik.studio** | 200, but `<title>Porkbun Marketplace: The domain HOLOGRAPHIK.studio is for sale.</title>` — a parked $5,000 listing. The real studio is `holographik.co`, included above at #2. Noted so this trap isn't hit twice. |
| **Vide Infra** | 200, `<title>Digital Product Design & Development Agency</title>`. Real SOTD credits (Springs, LIKOVA, AIR) — but the studio proper is a 20+-year London agency whose named client work is British Airways, SEB, DNB and GE Money Bank portals and BPM systems. Enterprise product shop, not the ethos. |
| **WILD** (`wild.as`) | Vienna, ~25+ named staff, clients Red Bull / IBM / British Airways / Samsung / IKEA. Excellent Serve Robotics build, but this is DEPT-scale, which the brief excludes. |
| **MILL3** (`mill3.studio`) | Montreal, and self-describes around WordPress custom platforms and Shopify. Craft is real (SOTD for Balmoral); the stack and positioning are not this lane. |
| **TRIONN** (`trionn.com`) | India, 20+ people, 14 years, "strategy, design, and technology" — and the homepage names no clients at all. Work-first fails at the first hurdle. |
| **SHIFTBRAIN** (`shiftbrain.com`) | 200, `<title>SHIFTBRAIN Inc.</title>`. Tokyo + Amsterdam, 93 documented projects, clients Toyota / Panasonic / Shiseido / Recruit / CyberAgent. Beautiful typographic work — but corporate-site scale, not a small engineering-led shop. Reconsider if the reference wanted is Japanese editorial typography specifically. |
| **Noomo Agency** (`noomoagency.com`) | 200, `<title>Digital Storytelling & 3D Website Design Agency \| Noomo</title>`, and two 2026 SOTDs. Dropped on the operator's own rule: the celebrated work — "The Power of Storytelling," "Noomo Showcase" — lives on *their own* subdomains (`storytelling.noomoagency.com`, `showcase.noomoagency.com`). The named clients (Salesforce, AMD, Coinbase, Red Bull) could not be tied to a verifiable build on a client domain. Only `percipiohealth.com` verified (200, `AI Health Monitoring & Care Management \| Percipio Health`) — one build is not a pattern. |
| **60fps** (`60fps.design`) | Not a studio. 200, `<title>60fps - UI/UX animation inspiration for mobile & web apps</title>` — a curation gallery of 2,050 animation shots. The SOTD-credited "60fps" is a different entity; not chased. |
| **Rogue Studio (UK)** (`roguestudio.co.uk`) | 404. The correct Rogue is `rogue.studio`, Brooklyn — included above at #9. |
| **MONOGRID**, **Zypsy**, **Humaan**, **OSMOS**, **Studio 28K**, **Better Off Studio**, **Caracal**, **Supercolor**, **UNCOMMON**, **ET Studio**, **Magnetism**, **Synchronized Studio**, **index**, **FUTURE THREE®**, **BL/S®**, **Beaucoup.**, **LEOLEO**, **Waka**, **Skaald**, **FLOT NOIR**, **Digital Butlers**, **BANILA**, **51North**, **LaNegrita**, **Dgrees**, **FPTP**, **Lazarev.** | All carry 2026 SOTD credits and all are plausible. Not dropped on merit — dropped for budget. This is the bench for pass 02; the SOTD credit archive is the place to resume. |
| **Ueno** | Not researched. Acquired by Twitter in 2021 and wound down; no current client work to verify. |

## Two notes for whoever reads this next

1. **The credit line, not the gallery.** Awwwards' SOTD index is worth more read sideways —
   the "by X" is the actual index of who is shipping — than read as a list of sites. Four
   pages of it produced every studio above except Phantom.

2. **Fetch with a browser user-agent.** `ozero.design` and `meetcleo.com` return 403 to a bare
   fetch and 200 to a browser UA. Two good studios were nearly lost to that alone; the
   difference is a `-A` flag, not a dead site.
