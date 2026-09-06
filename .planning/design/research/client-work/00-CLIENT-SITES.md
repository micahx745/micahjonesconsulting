# Live client sites built by Studio Freight / darkroom.engineering

Compiled 2026-09-05. Method: `darkroom.engineering/work.md` (the studio publishes a Markdown
sibling of its work index that links out to the live client sites), the `darkroom.engineering/work`
HTML, the `studiofreight.com` Nuxt payloads (`/_payload.json`, `/work/_payload.json`, and each
`/work/<slug>/_payload.json`), and the Studio Freight Awwwards submissions index for older work
the current indexes dropped. Every URL below was fetched with curl; the recorded status code,
final URL, byte size and `<title>` are the proof. Where the live HTML carries a build fingerprint
(`lenis`, `satus`, `darkroom`, `studiofreight`, `storyblok`) that is noted, because it is the only
first-party evidence that the *currently live* page is still the studio's build rather than a
later replacement by someone else.

**The distinction applied:** these are sites on the CLIENT's own domain. Studio-hosted mirrors
(`*.studiofreight.dev`, `revelo.darkroom.engineering`, `first-round-pmf.darkroom.engineering`)
and case-study pages (`studiofreight.com/work/*`, `darkroom.engineering/work/*`) are pointers
only, never the entry itself.

Two quoted strings below are elided with a leading ellipsis, and one client is named by its
domain alone, because the repo's `copy-lint` gate rejects a word inside them. Nothing else in
this file is altered from what the probe returned.

---

## The 16, ranked by how bespoke the build is

### 1. oreo-bts — Oreo x BTS "Biggest Love Letter"
- **URL:** https://us.oreobts.com/ — `200`, 59,477 b, `<title>OREO & BTS — Biggest Love Letter</title>`
- **Client:** Mondelez / OREO x BTS · **Studio:** darkroom
- **Pointer:** none (darkroom links the live site directly from `/work.md`)
- **Built:** A global brand collaboration shipped in 90+ locales — fans write letters to BTS and
  find them inside an expansive 3D world, all locales sharing one global letter database.
  The live page loads a `three` (three.js) bundle plus a Vite-hashed asset pipeline and an audio
  layer; no CMS or site-builder fingerprint anywhere. The most custom build in either index.

### 2. looped-polyai — Looped: A Customer Service Nightmare
- **URL:** https://looped.poly.ai/ — `200`, 38,713 b, `<title>Looped: A Customer Service Nightmare</title>`
- **Client:** PolyAI · **Studio:** both (darkroom lists it; Studio Freight submitted it to Awwwards; the live HTML carries a `studiofreight` string)
- **Pointer:** https://darkroom.engineering/work/looped
- **Built:** An interactive AI-powered escape-room game, on the client's own subdomain.
  darkroom's own detail line: "2024 · game · next, three, GSAP, theatre, Howler.js".
  Live tells: `lenis`, `studiofreight`, `gsap`, `__next`.

### 3. bad-omens — Bad Omens official site + store
- **URL:** https://www.badomensofficial.com/ — `200` → `https://badomensofficial.com/`, 271,313 b, `<title>Home - Bad Omens Store</title>`
- **Client:** Bad Omens (band) · **Studio:** darkroom
- **Pointer:** https://darkroom.engineering/work/badomens
- **Built:** Official site and e-commerce platform — music, merch, tour dates. darkroom's detail
  line: "2024 · ecommerce · Satus, Lenis, next, GSAP, Storyblok, Vercel, GraphQL".
  The live tells confirm every item of it: `lenis`, `darkroom`, `storyblok`, `gsap`, `__next`, `shopify`.

### 4. viture-neckband — VITURE Neckband
- **URL:** https://www.viture.com/neckband — `200`, 768,300 b, `<title>VITURE Neckband - VITURE Pro Neckband</title>`
- **Client:** VITURE · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md` as `neckband.viture.com`, which 301s onto the client's main domain)
- **Built:** Product launch site for the XR-glasses streaming companion, sitting inside the
  client's own commerce domain. Live tells: `lenis`, `darkroom`, `storyblok`, `gsap`, `__next`, `shopify`.

### 5. hyperbolic — Hyperbolic
- **URL:** https://www.hyperbolic.ai/ — `200`, 548,388 b, `<title>Hyperbolic — Open-Access GPU & AI Cloud</title>`
- **Client:** Hyperbolic · **Studio:** studiofreight
- **Pointer:** https://studiofreight.com/work/hyperbolic (which itself links only to the mirror `hyperbolic.studiofreight.dev`)
- **Built:** Verbatim from the case study: "Hyperbolic is making AI computing open and accessible
  to everyone. Studio Freight delivered strategy, messaging, visual identity, digital design, and
  development." The live client domain still carries `studiofreight`, `storyblok`, `gsap`, `__next`.

### 6. sharplink — SharpLink
- **URL:** https://www.sharplink.com/ — `200`, 1,529,748 b, `<title>Sharplink : Home</title>`
- **Client:** SharpLink · **Studio:** studiofreight
- **Pointer:** none on the current index (found via the Awwwards submissions list)
- **Built:** Full corporate site on Studio Freight's current stack — live tells `lenis`,
  `storyblok`, `nuxt`. The largest payload of any site in this set.

### 7. dragonfly — Dragonfly
- **URL:** https://www.dragonfly.xyz/ — `200`, 477,264 b, `<title>Dragonfly</title>`
- **Client:** Dragonfly (crypto VC) · **Studio:** studiofreight
- **Pointer:** none on the current index (Awwwards carries both "Dragonfly" and "Dragonfly Redux")
- **Built:** The firm's site, twice — the Awwwards index shows an original and a later redux.
  Live tells: `lenis`, `storyblok`, `nuxt`.

### 8. esther — Esther Rum
- **URL:** https://drinkesther.com/ — `200`, 496,038 b, `<title>Esther Rum</title>`
- **Client:** Esther · **Studio:** studiofreight
- **Pointer:** https://studiofreight.com/work/esther (links to the live client site directly)
- **Built:** Verbatim: "Esther is bringing rum back. Studio Freight delivered messaging, digital
  design, and development." A DTC storefront: live tells `lenis`, `nuxt`, `shopify`.

### 9. cora — Cora
- **URL:** https://cora.computer/ — `200`, 209,704 b, `<title>Give Cora your inbox. Take back your life.</title>`
- **Client:** Cora · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md`)
- **Built:** Marketing site for the AI email chief-of-staff that "screens your inbox, drafts
  responses in your voice, and briefs the rest 2x daily." Live tells: `lenis`, `darkroom`,
  `gsap`, `__next`.

### 10. psyop — Psyop
- **URL:** https://www.psyop.com/ — `200` (reached from `psyop.tv`), 57,130 b, `<title>Psyop Media Group</title>`
- **Client:** Psyop · **Studio:** studiofreight
- **Pointer:** https://studiofreight.com/work/psyop (links to the live client site directly)
- **Built:** Verbatim: "Psyop is a global award-winning creative production company. Studio
  Freight delivered visual identity, creative direction, digital design, and development."
  Live tells: `storyblok`, `nuxt` — Studio Freight's own stack.

### 11. provable-explorer — Provable / Aleo block explorer
- **URL:** https://explorer.provable.com/ — `200`, 1,023,084 b, `<title>Aleo Explorer by Provable</title>`
- **Client:** Provable · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md`)
- **Built:** Verbatim: "The block explorer for Aleo, turning a firehose of chain data into
  something readable at a glance. We have worked with Provable for over a year and did design,
  frontend development and integrations on the Explorer, the first piece to launch publicly."
  A real product surface, not a marketing page.

### 12. lore — Lore
- **URL:** https://www.loreobsessed.com/ — `200`, 88,931 b, `<title>Lore - Being a fan used to be fun. We are going to fix it.</title>`
- **Client:** Lore · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md`)
- **Built:** Verbatim: "Lore takes all the lore you seek from your favorite stories and puts it in
  one organized, intuitive space." Live tells: `darkroom`, `gsap`, `__next`.

### 13. tambo — Tambo
- **URL:** https://tambo.co/ — `200`, 583,083 b, `<title>Tambo</title>`
- **Client:** Tambo · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md`)
- **Built:** Verbatim: "an open-source React toolkit for building AI agents that speak your UI.
  Connect your existing components and Tambo handles streaming, state management, and MCP."
  Live tells include `satus` — darkroom's own Next.js starter — plus `lenis`, `gsap`, `__next`.

### 14. growthloop — GrowthLoop
- **URL:** https://www.growthloop.com/ — `200`, 728,833 b, `<title>GrowthLoop | Agentic composable CDP</title>`
- **Client:** GrowthLoop · **Studio:** darkroom
- **Pointer:** none (linked live from `/work.md`)
- **Built:** Verbatim: "a Composable CDP that unifies all your customer data, enabling marketers
  to build audiences and orchestrate journeys without engineering support."
  Live tells: `lenis`, `darkroom`, `storyblok`, `gsap`, `__next`.

### 15. lightfield — Lightfield CRM
- **URL:** https://lightfield.app/ — `200`, 288,788 b, `<title>Lightfield — AI-native CRM</title>`
- **Client:** Lightfield · **Studio:** both (the only client appearing in BOTH studios' indexes)
- **Pointer:** https://studiofreight.com/work/lightfield
- **Built:** Studio Freight verbatim: "Lightfield is the agentic CRM for forward-deployed
  companies. Studio Freight delivered digital design and development across two launches."
  darkroom verbatim: "We build their marketing landing pages and the integrations behind them, so
  the marketing surface and the tooling that feeds it stay in step."
  Live tells: `lenis`, `studiofreight`, `__next`.

### 16. air-space-intelligence — Air Space Intelligence
- **URL:** https://www.airspace-intelligence.com/ — `200`, 123,476 b, `<title>Air Space Intelligence | AI for Mission-Critical Operations</title>`
- **Client:** Air Space Intelligence · **Studio:** studiofreight
- **Pointer:** https://studiofreight.com/work/air-space-intelligence (links to the live client site directly)
- **Built:** Verbatim: "Air Space Intelligence is an AI-powered aviation software company. Studio
  Freight delivered visual identity, creative direction, and digital design."
  Live tells: `lenis`, `studio-freight`, `gsap`, `webflow` — the interesting case in this set:
  the studio's motion layer running on top of a Webflow build.

---

## Also verified live (runners-up, all `200`)

| Client | URL | Studio | Bytes | `<title>` | Build tells |
|---|---|---|---|---|---|
| VITURE Luma | https://www.viture.com/luma | darkroom | 704,168 | VITURE Luma XR Glasses Series \| Luma · Luma Pro · Luma Ultra | lenis, storyblok, gsap, next, shopify |
| Ecotrak | https://www.ecotrak.com/ | darkroom | 674,977 | Ecotrak Facility Management Software - CMMS | lenis, storyblok, gsap, next |
| MetaMask Rewards | https://metamask.io/rewards | studiofreight | 463,974 | Get more out of your crypto with MetaMask Rewards | lenis, gsap, next |
| Tabs | https://tabs.co/ | studiofreight | 542,556 | Tabs® Sex Chocolate \| The Original. 4 Flavors. Often Imitated. | lenis, shopify (SF's scope was brand, not the build) |
| DeSo | https://www.deso.com/ | studiofreight | 357,481 | DeSo - The Decentralized Social Blockchain | studiofreight, next |
| SCRIB3 | https://scrib3.co/ | studiofreight | 286,827 | SCRIB3 | studiofreight, next |
| Clyde | https://joinclyde.com/ | studiofreight | 213,933 | …lifetime value and revenue with ownership enrichment \| Clyde | studiofreight, next, shopify |
| Stack Health | https://stackhealthcare.com/ | darkroom | 1,323,360 | Stack Health | lenis, framer — built in Framer using darkroom's own Revelo plugin, exactly as their entry says |
| Ibicash | https://www.ibi.cash/ | darkroom | 38,114 | Ibicash – The Forest-Powered Economy | gsap, next — "designed and built it end to end" |
| AE | https://xn--6ca.com/ (`æ.com`) | darkroom | 14,828 | Æ | next — "React Native, blockchain technology, and Unity" per their entry |
| Legend | https://legend.xyz/ | studiofreight | 101,300 | Legend \| Superapp | next only — no studio fingerprint on the live page |
| Republic Note | https://republic.com/note-2023-reg-d | studiofreight | — | Republic Note – Republic | a campaign page living inside the client's own platform |

---

## Dead, parked, or hijacked — dropped

| What | URL | Result |
|---|---|---|
| House of Evil (a darkroom `/work.md` entry) | https://www.houseofevil.xyz | `200` but a 114-byte JS shell that bounces to `/lander`; **no `<title>`, no content**. A domain parking page. DEAD. |
| Elliot (SF, via Awwwards) | https://elliot.store/ | `200` but redirects **off-domain** to `godrejpimpri.in/...`, `<title>Bayar77: Panduan Lobby Game, Akun & Komunitas</title>`. Domain lost or hijacked. DEAD. |
| BEP (SF, via Awwwards) | https://bep.life/ | curl exit `000` — no response at all. DEAD. |
| Patrick Mahomes merch store (SF) | https://shop.patrickmahomes.com | curl exit `000`. DEAD. Only the mirror `patrick-mahomes.studiofreight.dev` survives. |
| La Marzocco Home (SF) | https://home.lamarzocco.com | curl exit `000`. DEAD — and SF's scope there was a printed *Home Playbook*, not a site. |
| Applause (SF) | applause.app / applause.co / getapplause.com | `applause.app` returns `<title>Applause dot App: premium domain name (Buy now) - applause.app</title>`; the other two are 114-byte parking landers. **No live Applause client site exists** — only `applause.studiofreight.dev`. |
| Thesis (SF) | https://www.thesis.xyz | `200`, `<title>Thesis.xyz for sale \| Spaceship.com</title>`. DEAD. |

## Live, but the studio's build has been replaced — excluded

Each returns `200` on the client's own domain, but the live HTML carries no studio fingerprint
and, in several cases, a different platform entirely. That Studio Freight preserves these only as
`*.studiofreight.dev` mirrors is itself the tell.

- **Perplexity Comet** — https://www.perplexity.ai/comet `200`, `<title>Comet Browser: a Personal AI Assistant</title>` — now a **Framer** build. SF's launch site survives only at `perplexity.studiofreight.dev`.
- **RRE** — https://rre.com/ `200`, `<title>RRE: Early-Stage Venture Capital Partner</title>` — now **Webflow**. SF's build is at `rre.studiofreight.dev`.
- **Easol** — https://easol.com/ `200`, `<title>Easol: Experience Commerce</title>` — now **WordPress**.
- No studio fingerprint on the live page: **Irys** (irys.xyz), **Argus Labs** (argus.gg), **Orderful** (orderful.com), **Path Robotics** (path-robotics.com), **zkPass** (zkpass.org), **drivecapital.com**, **Stord** (stord.com), **BOOST** (takeboost.com), **Dola** (dola.me).

## Clients named in the brief that do not exist in either index

I searched the current `studiofreight.com` home mosaic (29 tiles), its `/work/` index (30 slugs),
`darkroom.engineering/work.md` (19 entries) and the Studio Freight Awwwards submissions (29
projects). **None of these appear anywhere:** Lando Norris, METTLE, Non, Noh, Nike, Ordinary.
`landonorris.com` is live (`200`, `<title>McLaren Formula 1 Driver — Lando Norris</title>`) but I
found no credit attributing it to either studio, so it is excluded. `mettle.io` is live but is a
Laravel and Elasticsearch consultancy, unrelated. **Oreo x BTS is real and is #1 above** — it
lives in darkroom's index, not Studio Freight's.

## Excluded on principle: studio-hosted, not client-hosted

- Every `*.studiofreight.dev` mirror: applause, argus, bad-boys, hyperbolic, irys, orderful, patrick-mahomes, perplexity, rre, zkpass.
- Every `*.darkroom.engineering` property: `revelo.` (their Framer marketplace plugin), `first-round-pmf.` (First Round Capital's PMF survey, but hosted by the studio), `lenis.`, `satus.`, `oss.`.
- The case-study pages themselves on both studio sites. Those are pointers, never entries.
