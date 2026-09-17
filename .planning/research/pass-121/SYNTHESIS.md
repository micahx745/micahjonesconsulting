# Pass-121 Synthesis — trend research for micahjonesconsulting.com

Synthesis leg, 2026-09-16. Reads all five facet files and their adversarial verifications plus
`docs/DESIGN_BAR.md` §4/§6 and `.planning/reviews/FABLE-120-DESIGN.md` §5. Every claim below
carries its facet-letter + claim-id (e.g. `A-C1` = Facet A, central claim 1) so it can be traced
back to the facet file and its verify file. Verifier verdicts are applied throughout: refuted
claims are dropped and listed in §6 so nobody re-adds them; weakened claims are marked weakened
inline and used only with their hedge attached; nothing is presented as settled fact if the
verifier could not confirm it. This file does not touch any site file.

---

## 1. Delta vs what the site believes

The site's written rules (CLAUDE.md, DESIGN_BAR.md) were set before this research. Here is where
2025–2026 evidence agrees, disagrees, or sharpens them.

- **One signature motion — the evidence supports keeping it, not relaxing it.** Awwwards' own
  published judging rubric (Design 40% / Usability 30% / Creativity 20% / Content 10%) names "one
  deliberate signature moment... rather than many small effects" as a craft factor that separates
  winners from generic sites (`E-C13`, upheld). Award coverage of 2026 sites converges on
  restraint-over-spectacle language (`A-C13`, weakened — one juror's blog, not independently
  corroborated, but consistent with `E-C13`'s primary-source rubric). DESIGN_BAR R9 and this
  site's own rule are therefore not a compromise; they are the current tier's actual bar. What the
  evidence argues for is craft *inside* the existing motion budget — hover/idle timing, easing,
  cursor feedback (`E-C13`, `E-C15` partial) — not a second motion vocabulary.
- **Motion as punctuation, ≤400ms — supported, with a concrete new reason to hold the line.** A
  January 2026 developer critique of "scroll-fade-everything" names two costs beyond taste: it can
  trigger vestibular-disorder symptoms and it measurably hurts LCP when applied above the fold
  (`E-C10`, upheld as an unmeasured-but-plausible opinion piece — the author states he collected no
  test data). This directly reinforces the existing Definition-of-Done LCP/CLS budget, not just the
  taste rule.
- **No pin/parallax/cursor-follow — validated as a *commodity* problem, not just a taste call.**
  2026 search results for magnetic-cursor/hover-follow effects return almost entirely snippet
  libraries and component marketplaces, not fresh award coverage (`A-C19`) — the technique has
  moved from signature to commodity component. The ban is not costing the site anything at the
  current tier.
- **No illustration/3D — holds, but the rule's own boundary needs naming.** Nothing in this
  research shows the rule's text bans SVG relationship diagrams, real-photograph shared-element
  transitions, or generative visualization tied to real numbers — those are a different category
  from "illustration" and from "3D" as decoration (`B`-facet costs section). But an animated
  diagram or a Rive state-machine crosses into the standing "no animated figure" ruling
  (CLAUDE.md, 2026-09-11) in a way that needs an explicit operator call, not an assumption — two
  independent facets (A, C) raised this same tension without resolving it.
- **Index entries ≤4 data points — the site is currently failing its own rule, and the reference
  set explains why that matters.** `FABLE-120-DESIGN` §1 found today's `/work` entries carry nine
  data points against R11's four, and the stats restate the dek rather than adding information.
  Every reference facet C fetched live (Locomotive, Koto pattern via DESIGN_BAR, Bakken & Bæck)
  compresses to badge-plus-tag or four-point cards. This is the single most concrete,
  already-verified gap between the site and the evidence.
- **Cross-document View Transitions are not "Chromium-only."** Facet A's own central claim (`A-C3`,
  `A-C20`) was refuted by its verifier: Safari has supported cross-document View Transitions since
  v18.2 (~87.78% global coverage); only Firefox is gapped. This changes the honest cost/benefit for
  a `/work`-thumbnail-to-study-hero photo morph, and it independently matches
  `FABLE-120-DESIGN`'s own recommended option 2 (give the Tel Aviv photograph the motion through
  the existing signature, as a shared view-transition element) — two independent sources arrived
  at the same move for different reasons.
- **llms.txt and FAQ sections as "AI plumbing" — the delta is large and one-directional.** The site
  currently has no written position on this, but three independent facets (A, B, D) and both their
  verifiers converge on the same finding from different studies: llms.txt has no measurable effect
  on AI citation at any scale tested (`D-C2` Google's own public non-support, `D-C3` weakened but
  corroborated 300K-domain no-correlation study, `D-C10` a controlled Ahrefs before/after study
  showing no citation lift from JSON-LD either, `E-C20`'s verifier adding a June-2026 Google
  Search Central statement plus a 137,000-domain 97%-zero-traffic study). What the evidence instead
  supports is mechanical, invisible plumbing: crawler-specific robots.txt allow rules (`D-C4`–`D-C6`,
  primary-doc, all upheld) and keeping every number in visible server-rendered prose, since no
  major AI crawler executes JavaScript (`D-C8`, upheld with a date correction — the source is from
  December 2024, not 2026, but the finding still holds).

---

## 2. Take list

Ordered most valuable first: already-aligned-with-existing-rulings and cheap/high-evidence items
first, then diagnostic fixes, then AI-discoverability plumbing, then higher-risk items that need an
explicit operator ruling before a brief assumes them.

| # | Item | Surface | What it is concretely | Evidence | Cost | Rule it relaxes | Honesty risk |
|---|---|---|---|---|---|---|---|
| 1 | Cap index entries at 4 data points | index entries | Compress today's 9-point card (number, title, dek, role+tenure, read link, 3 stats) to context label (mono) + one figure-bearing line + one line of what he did + service link, per DESIGN_BAR R11 | `FABLE-120-DESIGN` §1 (today's capture shows the violation); `C-C1`/`C-C2` (Locomotive badge, Bakken & Bæck stacked-card patterns, both upheld) | M — content restructuring, no new dependency; zero perf risk; no motion involved | None — fixes an existing violation, doesn't relax anything | None |
| 2 | Answer-shaped lede sentence per study | study hero | One self-contained sentence stating what was done for whom, before scene-setting prose | `D-C15` (upheld, academic, question-form/self-contained-answer content raises AIO activation odds); `D-C9` (weakened, single vendor test, directionally consistent) | S — copy discipline only, matches existing R7 "hero states the offer in one sentence" | None | None |
| 3 | Keep all named numbers as visible running prose, never JS-only or JSON-LD-only | study body exhibits, index | Continue rendering `content/citations.ts` figures as ordinary paragraph text, not client-fetched or hidden-markup-only | `D-C8` (upheld — no major AI crawler renders JS); `D-C9` (weakened, single source, but consistent direction) | None — already the site's pattern; protect it as new components are built | None | None |
| 4 | robots.txt: explicit allow for Claude-User, Claude-SearchBot, OAI-SearchBot, PerplexityBot | AI discoverability (site-wide, non-visual) | Add named-user-agent allow rules independent of any ClaudeBot/GPTBot training decision | `D-C4`, `D-C5`, `D-C6` (all upheld, primary-doc: Anthropic/OpenAI/Perplexity's own crawler docs) | S — near-zero, no design surface | None — compatible with the existing "robots.txt allows ALL crawlers" stance; makes it explicit | None |
| 5 | Same-document View Transition: `/work` thumbnail morphs into study hero photo (Guardicore, ORDANI only) | study hero, tied to `/work`→study nav | Shared `view-transition-name` on the real photograph, React 19 `<ViewTransition>`, feature-detected, dim-only fallback for Firefox | `A-C3`/`A-C20` refuted-as-"Chromium-only" (actually ~88% coverage, only Firefox gapped); independently recommended in `FABLE-120-DESIGN` §4 option 2 | M — needs feature detection and reduced-motion kill switch; zero LCP cost (real photo, no new asset) | None — this is the standing Fable recommendation, awaiting operator sign-off per §6 Q8 | None (real photograph, no synthesis) |
| 6 | Micro-detail hover/idle-state craft on index cards | index entries | Considered hover timing/easing/cursor feedback per card, not a new entrance effect | `E-C13` (upheld, Awwwards rubric names micro-details as a craft factor); `E-C15` (partial — hover/idle claims plausible but not independently confirmed from a text fetch) | S — transform/opacity only, stays inside R9's one-signature budget | None | None |
| 7 | CSS scroll-driven entrance (`animation-timeline: view()`) for `/work` header and record-block numbers | `/work` header | Pure-CSS scroll-linked reveal with `@supports`/`@media (prefers-reduced-motion)` guards, zero JS | `A-C1` (upheld, 87.22% global support per caniuse); `A-C2` (upheld, Safari 26 landed Sept 2025) | S — compositor-only, no JS weight; must be guarded for reduced-motion | None — compatible with "motion is punctuation" if kept to entrances ≤400ms | None |
| 8 | Inline award/outcome badge on index card, reusing `content/citations.ts` | featured-study entry / index entries | One-line stat badge (e.g. "$14M, acquired by Akamai") rendered the way Locomotive renders an award count | `C-C1` (weakened only on the announcement date — the badge pattern itself is confirmed live) | S | None — reinforces R11 if limited to one badge, not a new stat row | None |
| 9 | Oversized numeral treatment on featured-study card | featured-study entry | Bricolage display scale on the single headline number as the card's dominant visual element | `B-C13` (weakened — one example overgeneralized into an industry claim) but matches the site's own already-specified 112px lead figure (`DESIGN_BAR` R2, `FABLE-120-DESIGN` §2) | S — already spec'd, this is an execution note not a new decision | None — already the rule | None |
| 10 | Recurring hand-drawn motif as a literal structural content device | study body | The existing underline/hand-circle frames pull quotes and section breaks, not just headline decoration | `C-C6` (upheld — Pentagram's Reddit conversation-bubble motif verified live) | S–M | None — extends the existing accent system, doesn't add a new one | None |
| 11 | Relationship/flow SVG diagram for relationship-shaped facts (RFP contract flow, Guardicore acquisition) | study body exhibits | One simple SVG node/flow diagram replacing a paragraph, per Reuters' own rule: diagram for relationships, chart for scale-over-time | `B-C2` (upheld — Reuters/Bloomberg both independently used node-link diagrams for the same story); `B-C3` (upheld, direct quote confirmed) | M — SVG build, needs an accessible text equivalent, no JS required | None if scoped as a diagram — flag for the motion-engineer only if it becomes animated | Low, if the diagram encodes only figures already locked in `content/citations.ts` |
| 12 | Wireframe/schematic ghost, never a recreated screenshot, for NDA studies | study body exhibits | Abstract boxes-and-labels schematic showing structure, no invented brand chrome | `B-C6` (upheld — the ai2html/public-document honesty model); `B-C14` **refuted as cited** — do not lean on NNGroup as the authority for "wireframe beats blur"; the "never fabricate a screenshot" principle stands on its own, not on that source | M | None — stays inside "no stock imagery" since it is abstract and tied to the real product, not decorative | Must not imply it is the real UI; the honesty line is the schematic itself, not any borrowed authority for it |
| 13 | Document-artifact study opener using genuinely public or clearly-labeled-illustrative text | study hero/body (ORDANI or content-engine) | One real, non-confidential document fragment (redacted compliance item, anonymized workflow step) set as a typographic object | `B-C6` (upheld) | M — content-sourcing risk, not a build risk | None | **High if not genuinely public or clearly labeled as composite** — never present an invented excerpt as a real client document (facet B's own costs section names this as the site's single biggest risk) |
| 14 | Person + Organization/ProfessionalService + CreativeWork JSON-LD, site-wide and per study | AI discoverability | Standard schema.org markup, entity-clarity only | `D-C10` (upheld, controlled Ahrefs study — **no measurable citation lift**, do this for correctness only); `D-C18` (weakened, vendor claim, no measured effect) | S–M | None | None, but must not be marketed internally as a growth item — the only controlled study found shows a null-to-negative effect |
| 15 | Real "last updated" markers, tied to actual substantive edits only | index entries / study body | A genuine date, sourced from a real edit, never a cosmetic refresh | `D-C14` (upheld — real Ahrefs data: AI-cited content skews ~25.7% fresher, ChatGPT strongest) | S | None | **High if faked** — collides directly with the project's own fact-provenance rule; must be tied to a real edit, per the same discipline as Pitfall E2 |
| 16 | Minimal `llms.txt` at root, mechanical only, unlinked from nav | AI discoverability | Site purpose, link to `/work`, one line per case study | Converging refutation of impact across `D-C2`/`D-C3` (upheld), `E-C20` (weakened further by its verifier: Google's June 2026 statement, a 137K-domain 97%-zero-traffic study, a 300K-domain no-correlation study) | S — near-zero cost, near-zero payoff | None | Must not become a visible "AI-friendly" landing page — that reads as a dev-Twitter tell the site otherwise bans |
| 17 | Scoped surface override (paper body inside a theater-mode study route) + the View Transition shared-element mechanism | study hero/body (structural) | `data-surface="paper"` on the study body wrapper, token remap, contrast re-checked both grounds | `FABLE-120-DESIGN` §3 (Direction B recommendation) and §7 (named as a build-brief requirement); cross-referenced against reading-page-on-light-ground pattern independently observed in facet B's Pudding/CJ-Robinson examples | M — new CSS mechanism, needs its own contrast pass | This is a structural change the Fable ruling already recommends — still needs the operator's sign-off named in §6 Q8 of that document, not a brief assumption | None |
| 18 | Kinetic-type entrance (GSAP SplitText) on study title only | study hero title | Scoped, one-entrance, ≤400ms character/word-split animation | `A-C5` (upheld — SplitText free since April 2025); `A-C14` (weakened, vendor trend report) | S once ruled | **Needs an explicit operator ruling** against the GSAP-quarantine rule — and the current codebase has already moved past this facet's premise: Pass-120 removed GSAP from TitleCard entirely (it is now CSS `cs-settle`), leaving `SplitReveal.tsx` as the sole importer. Re-read current state before treating this as live territory. | None |
| 19 | Off-site presence (LinkedIn activity, interviews, directory listings under Micah's real name) | none — off-site | Not a `/work` or study-page change | Named across `D-C12`/`D-C13`/`D-C18`/`D-C20` as the plausible strongest lever — **but see §6: the specific supporting numbers for all four did not survive verification.** Only the qualitative direction survives. | N/A — not a build item | None | None |
| 20 | Interactive Rive state-machine diagram for a study pipeline | study body exhibits | Small abstract workflow/funnel diagram as a low-weight interactive explainer | `A-C15` (weakened — vendor file-size comparison, Duolingo case unverified) | L — new runtime dependency, needs a genuine static/canvas-invisible fallback for screen readers | **Directly contests** the standing "no animated figure... the answer there is no" ruling (CLAUDE.md, 2026-09-11) — flag to the operator as a likely reject, do not build on spec | None if never presented as a figure/mascot, but the ruling risk is the point |

---

## 3. Avoid list

What reads as overused, dated, or "AI-built" in 2026 — evidence ids in parentheses.

- **Magnetic/cursor-follow buttons.** Commodity snippet-library tier now, not fresh award coverage
  (`A-C19`). Already banned; the ban is validated, not worth relaxing.
- **Full-bleed WebGL hero scenes as a default.** 2026 award commentary favors "atmosphere not
  spectacle" (`A-C13`, weakened) — consistent with `E-C1`/`E-C3`/`E-C4`'s AI-slop research on
  gradient/glow hero convergence. This site has no assets to fill a full 3D scene anyway (NDA
  constraint, facet A costs section).
- **Scroll-hijacking smooth scroll as an unquestioned default.** Thoughtworks Radar's "Assess"
  ring plus a documented (if now-410) Lenis/scroll-snap conflict mean this needs real testing, not
  a drop-in call (`A-C11` upheld, `A-C12` weakened but the underlying mechanism corroborated via a
  live GitHub issue).
- **Purple/blue gradient hero backgrounds ("VibeCode Purple"), pill badge above a centered H1,
  colored left borders on cards, icon-topped feature-card triads, glassmorphism, shadcn defaults.**
  All confirmed live in a 1,590-site Show HN scan (`E-C1`, upheld) and independently corroborated
  by a practitioner HN thread (`E-C3`, upheld with a minor date correction) and the library's own
  changelog acknowledging the sameness problem (`E-C2`, upheld). None of this currently appears on
  the site; keep it that way as new components are built.
- **Scroll-fade-everything.** A named 2026 critique argues generic fade-up-on-scroll is both tacky
  and a measurable LCP/vestibular-motion risk (`E-C10`, upheld as an honest, unmeasured opinion
  piece). Directly relevant if any new step-through or reveal is added to `/work` or a study hero.
- **Client-logo walls.** Appears on nearly every solo-consultant site surveyed in facet C, which
  makes it a convention, not a differentiator — and it is already this site's own banned pattern
  (`C`'s "Now overused" section). The evidence supports continuing to break from it, not adopting it.
- **Horizontal-scroll, filterable case-study grids** and the **"portal/tesseract transition into a
  project."** Both flagged by facet C as saturated among 2025–2026 studio and solo-technologist
  sites (expert-opinion, not independently measured this session).
- **llms.txt pitched as an AI-visibility fix.** The single most over-recommended, least-supported
  tactic across every facet that touched it (`D-C2`/`D-C3` upheld, `E-C20`'s verifier adding
  further 2026 disconfirmation). Treat as near-zero-cost hygiene at most, never as a strategy.
- **FAQPage schema as an "AI citation hack."** Google deprecated the Search feature it targeted in
  2026; no study shows AI assistants weighting it (`D-C17`, upheld).
- **Chasing JSON-LD depth as a checklist item** (Person + Organization + ProfessionalService +
  Article + FAQPage + Breadcrumb all at once). The one controlled study found shows no citation
  gain, and a direct-retrieval test shows most assistants ignore hidden markup entirely on live
  fetch (`D-C10` upheld, `D-C9` weakened but consistent).
- **"Rule of Three" copy constructions and uniformly 15–20-word sentences in every paragraph.**
  Confirmed present in an AI-writing-tells breakdown (`E-C8`, upheld); not currently caught by the
  site's word-list-based copy-lint, which checks vocabulary and length average, not rhythm.
- **High-density em-dash use.** Contested as a literal AI-detector (`E-C7`, upheld — historical
  writers used them heavily too) but measurably associated with post-2023 writing in a
  pre-registered corpus study (`E-C6`, upheld). Keep the existing one-per-page cap for voice
  discipline, never claim it publicly as an "AI-detection" feature.

---

## 4. AI assistant discoverability

### What is measured to matter
- Crawler-specific robots.txt control: Anthropic, OpenAI, and Perplexity each document distinct,
  independently controllable user agents with different consequences for training vs. live-fetch
  vs. search-index inclusion (`D-C4`, `D-C5`, `D-C6` — all primary-doc, all upheld).
- No major AI crawler renders JavaScript; content must exist in server-rendered HTML to be citable
  (`D-C8`, upheld with a date correction — the log study is from December 2024, not 2026, but the
  finding is not stale in mechanism).
- JSON-LD/hidden schema produces **no measured citation lift** and, in one controlled study, a
  small statistically significant *decline* in Google AI Overviews citations the researchers could
  not explain (`D-C10`, upheld — 1,885 pages vs. 4,000 matched controls, disclosed method).
- Organic top-10 ranking is a weakening predictor of AI Overview citation — the overlap fell from
  76% to 38% between mid-2025 and early 2026 (`D-C11`, upheld).
- AI-cited content skews meaningfully fresher than organic-ranked content, strongest for ChatGPT
  (`D-C14`, upheld — 17M-citation Ahrefs study, all headline numbers confirmed exact).
- Question-form queries and self-contained-answer content measurably raise the odds of triggering
  an AI Overview (`D-C15`, upheld — 55,393-query academic study, not yet peer-reviewed).
- The foundational GEO mechanism (quotations and statistics raise citation-visibility) is real and
  peer-reviewed but pre-2025 — background only, not current evidence on its own (`D-C16`).
- Google publicly states no special AI markup or file is required to appear in AI Overviews/AI Mode
  (`D-C1`, upheld, primary-doc).

### What is myth or overclaimed
- **llms.txt moves AI citation.** Comprehensively unsupported at every scale tested: Google
  explicitly does not support it (`D-C2`); a large-domain study found it added noise, not signal,
  to a citation-prediction model (`D-C3`, weakened citation but directionally corroborated
  elsewhere); further 2026 evidence found by the facet-E verifier (Google's June 2026 statement, an
  Ahrefs 137,000-domain study finding 97% zero traffic, an SE Ranking 300,000-domain no-correlation
  study) strengthens the refutation further.
- **JSON-LD/FAQPage schema as citation levers.** Refuted by a controlled before/after study for
  JSON-LD (`D-C10`) and mooted for FAQPage by Google's own 2026 feature deprecation (`D-C17`).
- **The specific figure "Claude cites brand sites 64% of the time, Reddit zero, vs. Reddit at 40.1%
  overall across four assistants."** This was facet D's own most-emphasized, "most encouraging"
  data point — and it does not survive a source check. **Drop this claim entirely.** The real,
  source-confirmed numbers (from a single undisclosed-category, 119,939-citation study, not the
  ~150,000-citation four-assistant study described) are: Reddit at 2.0% of Perplexity's citations
  specifically, Claude's Reddit/YouTube share "below 0.1%" (near-zero, not literally zero), and
  Claude's own tracked brand-domain share at 14.7%, not 64% (`D-C13`, refuted as cited).
- **Cross-engine source-overlap figures "11–12% domain overlap, 7.9 vs. 21.9 sources per answer."**
  Neither cited URL supports these numbers; a larger, more recent study (22.7M citations) found
  6.1–6.5% overlap and 4.2 vs. 4.7 sources per answer instead — direction unchanged, magnitude
  overstated roughly 2x (`D-C12`, refuted as cited).
- **Entity-linking (`sameAs` to LinkedIn/Wikidata/ORCID) as a proven citation lever.** No controlled
  study found; vendor claims only, with an unverified 3–12 month lag narrative (`D-C18`, weakened).

### Ranked concrete actions for this site
1. **robots.txt**: explicit allow rules for `Claude-User`, `Claude-SearchBot`, `OAI-SearchBot`, and
   `PerplexityBot` — primary-doc evidence, near-zero cost, directly serves the owner's stated goal.
2. **Server-rendered, visible content discipline**: every number, quote, and answer-shaped sentence
   must exist in the initial HTML, never behind client-side fetch or animation-gated reveal —
   measured evidence, and this project's Next.js App Router server-component baseline already fits.
3. **Answer-shaped ledes and question-form section headers**: one self-contained sentence per study
   stating what was done for whom, before scene-setting — the single most evidence-backed content
   move in this research (academic, `D-C15`).
4. **Numbers stay in visible prose**, sourced from `content/citations.ts`, never JSON-LD-only.
5. **Person/Organization/ProfessionalService/CreativeWork JSON-LD** — do it for entity-clarity
   hygiene and because it costs little, but do not sell it internally as a citation lever; the only
   controlled study found shows a null-to-negative effect.
6. **Real "last updated" dates**, tied to genuine substantive edits only — never a cosmetic refresh.
7. **A minimal, mechanical `llms.txt` at the root**, unlinked from nav, no visible "AI-friendly"
   landing page — near-zero cost, near-zero measured payoff, worth doing only because it costs
   almost nothing.
8. **Off-site presence** (LinkedIn activity, interviews, directory listings, consistent identity
   under Micah's real name) is the one item this research repeatedly names as plausibly the
   strongest — but every specific number offered in support of it failed verification (see §6).
   Treat as a reasonable hypothesis for the operator's queue, not a proven finding, and explicitly
   out of scope for a visual-craft brief.

---

## 5. Candidate reference pool for G1

24–32 live URLs across three classes. **Excludes** Pass-120's 14 references (COLLINS Mailchimp,
Instrument PagerDuty, Koto Amazon, Wolff Olins Instacart, Basement Studio Harvey, Clay Sky, Studio
Freight Brex, NYT Snow Fall, The Pudding film dialogue, Works in Progress housing, April Dunford,
Dan Mall Spine, Harpal Singh, UXGen Advisory) and anything the verifiers found dead or materially
misrepresented (Oryzo — undisclosed satire; Uncommon Studio AU — domain moved; Mat Voyce —
unresolved redirect this session). Verified-live status is taken directly from each item's verify
file, not re-asserted here.

### Class A — studio work indexes with real motion and interaction craft

| URL (page to capture) | Date/award | One mechanism worth taking | The thing that is budget, not method | Verified-live status |
|---|---|---|---|---|
| locomotive.ca/en/work | Awwwards Agency of the Year x7 (confirmed announced 2025-09-18, not Feb 2025 as first drafted) | Inline award/outcome badge per card, tag-filterable grid | The 7-year award streak itself | Upheld live, fetched, date-corrected (`C-C1`) |
| bakkenbaeck.com/work | live 2026 | Multi-thumbnail stacked card (2-4 crops) instead of one hero image per entry | Roughly 24 real client projects to draw thumbnails from | Upheld, live fetch matches (`C-C2`) |
| unseen.co | Codrops profile 2026-07-20 | Motion that states the platform's vision, not just decorates | A bespoke 3D "project ring" asset per case | Upheld via profile; root site loads but not fully crawled this session (`C-C3`) |
| iventions.com | CSSDA Website of the Month, Oct 2025 (confirmed) | Spotlit-installation pacing: one project fully framed at a time | The Three.js/GSAP scene claim is **misattributed** in the source research — verify the actual tech stack on capture, do not assume WebGL | Weakened — CSSDA award confirmed live; the specific "Three.js spotlit scene" quote traces to a different blog than cited and is unconfirmed by Awwwards' own tech tags (`C-C5`) |
| by-kin.com | Awwwards SOTD + Dev Award, FWA, CSSDA WOTD | GSAP+Lenis restraint winning a Developer Award on a **photography-driven** site (a caution, not a no-photo model) | Real interiors/branding photography | Upheld, live fetch confirms photo-driven hero and portrait-mode notice (`C-C8`) |
| awwwards.com/cuberto/ (studio profile; cuberto.com itself not independently fetched) | 2026 Honorable Mentions confirmed (Sweeping Corp May 2026, FIND Real Estate Mar 2026, Born & Bred Feb 2026) | Sustained Honorable Mentions, not one lucky hit, as the credibility shape | The studio's own "Agency of the Year" self-claim | Weakened — "Agency of the Year" is a stale/historical self-claim on Cuberto's own site; current Awwwards page shows only HMs; treat the AOTY framing as not current (`C-C4`) |
| resn.co.nz (studio site; use the Codrops profile as the primary source) | Codrops profile 2026-09-14 | Turning a brand-guidelines document (Squarespace Foundations) into an entertaining interactive artifact — transferable to `content/citations.ts` | Its Getty Museum provenance-tracing project's scale | Weakened for the site itself — confirmed to be a content-less JS shell on static fetch; capture with a real browser before citing any interaction detail (`C-C14`) |
| brand.ivress.co.jp | FWA SOTM May 2026; CSS Design Awards | WebGPU renderer with WebGL fallback | Custom shader compilation to two backends | **Not independently verified this session** — not in either facet's spot-check list; verify on capture |
| shopify.com/editions/spring2026 | Featured, Spring 2026 | Scroll-sequenced product reveal, choreographed section transitions | A full e-commerce product catalog | **Not independently verified this session** — verify on capture |
| sleep-well-creatives.com | Awwwards SOTD, Jan 2026 | Scroll-driven illustrated narrative blending hand-drawn art with a Three.js stage | A commissioned illustration set (this site bans illustration) | **Not independently verified this session** — verify on capture; illustration-heavy technique likely not transferable regardless |
| cartier.com/watchesandwonders | Awwwards SOTD; CSS Design Awards | Six self-contained 3D "alcove" sections with a Web Audio score | Luxury-brand production budget, 3D-modeled product assets | **Not independently verified this session** — verify on capture; 3D-heavy technique not transferable under this site's no-3D rule |

### Class B — case studies made visual without photography

| URL (page to capture) | Date/award | One mechanism worth taking | The thing that is budget, not method | Verified-live status |
|---|---|---|---|---|
| pudding.cool/2026/05/similes | May 2026 | Text-as-data made visual: 200,000 comparisons rendered as typographic figures | A large real corpus to analyze | Upheld, live fetch matches (`B-C4`) |
| pudding.cool/2025/12/motifs | Dec 2025 | Recurring-motif navigable timeline/figure system | Licensed musical-theatre score data | Upheld, live fetch matches (`B-C4`) |
| pudding.cool/2026/07/essential-words | Jul 2026 | Annotated small multiples tracking change over time | A public vocabulary-list dataset | Upheld, live fetch matches (`B-C4`) |
| cj-robinson.github.io/trans-model-leg/ | 2025 (Pudding Cup winner) | Real quoted public-record text as the visual object, plus one static ai2html map — the strongest honesty model for an NDA'd study | Access to public legislative text (this site's studies are private, not public record) | Upheld, live fetch confirms ai2html export (`B-C6`) |
| visualrambling.space/dithering-part-1/ | 2025 (Pudding Cup); build tutorial Apr 2026 | Generative, code-drawn visualization tied to real data explaining an abstract technical concept | Roughly 160,000 GPU-instanced cubes, GLSL shader work — a heavy, GPU-bound build | Upheld, tutorial confirms technique exactly (`B-C7`) |
| variable.io/works/ | ongoing, incl. Expo 2025 project | Generative data visualization sold as a branding/campaign deliverable to name-brand clients | Decorative/branding-scale budget, not an account of a specific engagement | Upheld — vendor's own portfolio, correctly flagged as vendor-claim (`B-C8`) |
| pentagram.com/work/reddit | underlying project 2022-2023 (background, pre-2025), page live 2026 | A recurring graphic motif (conversation-bubble) doing literal structural work — framing quotes, data, section breaks | Two custom-commissioned typefaces | Upheld, live fetch confirms all elements — cite as a *pattern* reference, not a fresh 2025-2026 example (`C-C6`) |
| bloomberg.com/graphics/2026-ai-circular-deals/ | data as of Jan 9, 2026 | Node-link network diagram for a relationship story (the same device both Reuters and Bloomberg independently reached for) | A live newsroom graphics team | Exists and content independently confirmed via search, but **403s to plain WebFetch — needs a real browser session to capture**, not plain fetch (`B-C2`) |

### Class C — solo operators / small consultancies that do not read as templates

| URL (page to capture) | Date/award | One mechanism worth taking | The thing that is budget, not method | Verified-live status |
|---|---|---|---|---|
| antonsten.com | live 2026 | Client-logo band + testimonial + stacked-image work tiles as *proof* substituting for full case studies where NDA blocks a full write-up | 3,000+ newsletter subscribers, name-brand client list (Google, Spotify, IKEA) | Upheld, live fetch confirms every element (`C-C11`) |
| tomcritchlow.com | live 2026 | The floor: near-zero visual craft, content-led credibility — cite as the explicit counter-example against overshooting | A decade-plus of public long-form writing | Upheld, live fetch confirms (`C-C12`) |
| buzzusborne.com | live 2026 | Six-tile "Recent Work" mixing static and video — a lightweight minimum-viable index if a full five-study rebuild is too much for one pass | A founder-exit story (Prevue, acquired 2018) as the credibility anchor | Upheld, live fetch confirms (`C-C13`) |
| leoparpeix.com | Awwwards SOTD + Dev Award, 2026-09-14 | Choreographed, paced 3D transitions bespoke to the person's own work, not templated | Blender-authored 3D assets, After Effects-informed motion | Upheld, live fetch + Awwwards listing match exactly (`E-C14`) |
| warmnfuzzy.tv | Awwwards SOTD + Dev Award, 2026-09-12 | A deliberately narrow two-color palette instead of a gradient system | (none named — the palette itself is the low-budget move) | Upheld partial — site loads and functions; specific hex/hover details not independently confirmed from a text fetch (`E-C15`) |
| theycallmegiulio.com | Codrops profile 2026-04-14 | Outer bound reference only: solo, no-template, cinematic craft at its most extreme | Bespoke WebGPU/TSL shader work, Blender assets — explicitly too showy for this site's own "don't look machine-built" goal | Upheld via Codrops profile (`C-C9`) |
| joseph-san.com | Codrops profile 2026-04-28 | Same outer-bound caution as above; self-description as "Creative Software Engineer" models a technical-credibility register, not the visual language | 144fps GPU-instanced 3D navbar replacement | Upheld via Codrops profile (`C-C10`) |
| sakazuki.io | Awwwards SOTD, 2026-06-14 | Original photography/graphic design plus specific, non-generic category copy | A crafted footer, an unusually specific brand story | Upheld, live fetch confirms membership-brand framing (`E-C16`) |
| justphilride.co.uk | Awwwards Honorable Mention, 2026-03-31 | Built around one real, specific, verifiable fact (an actual charity ride) rather than composite claims — the closest precedent for a word-dominated, fact-constrained site | Colorful graphics + strong typography serving one narrative | Upheld, live fetch confirms; minor distance-rounding noted, not a contradiction (`E-C17`) |
| pendragoncycle.com | Awwwards SOTD, 2026-01-03 | Restrained two-tone palette (charcoal + taupe) instead of gradient/purple convergence | WebGL cinematic storytelling for a fantasy franchise | Upheld partial — site loads; specific palette not independently confirmed from text fetch (`E-C18`) |
| planetono.space | Awwwards SOTD, 2026-03-15 (Awwwards page itself shows Mar 14 — one-day discrepancy) | Narrow, saturated two-color system; sound tied to specific interactions, not ambient | Blender/Rive/three.js — not transferable under this site's no-3D rule | Upheld, live fetch + Awwwards listing confirm (`E-C19`) |

---

## 6. Refuted or dropped

Do not re-add these to a brief. Each was checked live by the facet's own adversarial verifier.

- **`A-C3`/`A-C20`** — "Cross-document View Transitions are Chromium-only; Safari and Firefox don't
  support them." Refuted: Safari has supported this since v18.2 (~88% global coverage); only
  Firefox is gapped.
- **Oryzo (`A` live-example table)** — presented as straight technique evidence with no disclosure
  that the site is Lusion's self-declared satirical/fictional-product campaign; the award tier was
  also misstated (SOTD, not SOTM). Drop or cite only with the satire caveat attached.
- **Uncommon Studio AU (`uncommonstudio.com.au`)** — 301-redirects to a different domain
  (`uncommondesign.group`); drop as a capture target.
- **`matvoyce.tv`** — unresolved redirect this session; treat as unconfirmed, not a citable live
  example, until re-checked with a real browser tool.
- **`A-C12`'s cited URL** (raoulcoutard.com Lenis/scroll-snap post-mortem) — returns HTTP 410. The
  underlying mechanism (Lenis fights native scroll-snap) is independently corroborated by a live
  Lenis GitHub issue, but do not cite the dead URL.
- **`A-C10`** — the "120ms INP improvement" scroll-driven-animation migration case could not be
  pinned to either candidate source by the facet itself. Treat as unverifiable folklore, not
  evidence.
- **`B-C10`** — "most business-consultant sites now skip a hero photo entirely." Refuted by its own
  cited source, which reports 83% of sampled sites use hero imagery (43.6% photography + 26.6%
  illustration). Drop entirely; do not use to justify the word-only hero as an industry norm.
- **`B-C12`** — the netkodo.com case (JSON-LD + llms.txt leading to a Google AI Mode citation
  "three days later," then a conceded "zero" SEO impact). Refuted: this narrative does not appear
  anywhere in the cited source, which tests ChatGPT/Claude/Perplexity only, never mentions Google
  or JSON-LD, and its only "zero" claim is about server performance. Drop entirely.
- **`B-C14`** — "NNGroup recommends wireframes over blurring because blur reads as broken/still
  loading." Refuted: the actual 2019 NNGroup article treats blurring as an equally valid,
  even-recommended option for financial/medical data and never makes the "reads as broken" claim.
  Drop the ranking and the rationale; the "never fabricate a screenshot" principle for this site
  stands on its own reasoning, not on borrowed NNGroup authority.
- **`B-C15`** — "a now-standard three-part case-study shape across the industry." Refuted as an
  overgeneralization: the cited source describes one company's one page as an example among many
  design tips, not an industry standard. Drop the industry-wide framing.
- **`B-C1`** — "scrollytelling is described by 2026 trend writers as past peak, now mainstream."
  Weakened to the point of unreliable: the primary citation (Nightingale) is dated 2020/2021, not
  2026; only one thin, vendor-flavored 2026 blog post corroborates. Do not cite as a 2026 trend
  finding.
- **`C-C1`'s date** — Locomotive's 7th consecutive Agency of the Year year was announced
  2025-09-18, not "February 2025" as first drafted. Use the corrected date if cited.
- **`C-C4`** — "Cuberto holds Awwwards Agency of the Year." Overstated: Cuberto's own current
  Awwwards profile shows only 2026 Honorable Mentions; independent search shows Cuberto as a 2026
  *nominee*, with the only confirmed past win dated 2020. Treat any "Agency of the Year" framing
  for Cuberto as a stale self-claim, not a current credential.
- **`C-C5`** — the Iventions "Three.js spotlit installation" quote is misattributed to
  utsubo.com/blog/best-threejs-websites-2026, which never mentions Iventions. The real source
  (hontran.dev) carries the quote, but Awwwards' own technical tags for the site list
  WordPress/Next.js/GSAP, not Three.js. Do not assert a confirmed Three.js/GPU-scene technique for
  this site without a direct capture confirming it.
- **`C-C7`** — "Basement Studio's Harvey case study is typography- and motion-led, with no
  photography." Unsupported by direct fetch, which found product-demo videos and at least one
  full-width image. Do not cite as a zero-photography precedent (and note Basement/Harvey is
  already a Pass-120 reference regardless — not eligible to re-propose).
- **`D-C12`** — the "11-12% domain overlap, 7.9 vs. 21.9 sources per answer" cross-engine figures.
  Neither cited URL supports these numbers; a larger, more recent study found materially different
  figures (6.1-6.5% overlap, 4.2 vs. 4.7 sources). Drop the specific numbers; the qualitative
  "source pools don't fully overlap" thesis survives at a smaller magnitude.
- **`D-C13`** — "Reddit cited 40.1% overall, zero on Claude, brand sites take 64% on Claude."
  Refuted as cited. This was facet D's own flagged "most encouraging" data point and it does not
  survive: the real source reports Reddit at 2.0% of *Perplexity's* citations specifically, Claude's
  Reddit/YouTube share below 0.1% (near-zero, not literally zero), and Claude's brand-domain share
  at 14.7% (not 64%) — from a single undisclosed-category study, not the "~150,000-citation,
  four-assistant" study described. **Drop the specific numbers entirely.**
- **`D-C8`'s currency** — the "2026 log studies" framing is wrong; the Vercel source is dated
  December 2024. The no-JS-rendering conclusion itself still holds; only the "current as of 2026"
  claim is overstated.
- **`D-C19`'s citation** — the Semrush "4.4x AI-referred conversion" figure does not appear at the
  cited URL (a different, later Semrush article); the number is corroborated by several independent
  secondary write-ups, but do not cite semrush.com/blog/traffic-channel-mix-study as its source.
- **`E-C4`** — the specific "converged AI-built silhouette" (dark hero + purple gradient + pill
  badge + three feature cards + glass panels + SaaS pricing). Refuted: no such passage exists in
  the cited source on two full-text fetches. This composite belongs to `E-C1`/`E-C3`'s pattern
  lists; cite those instead, not this URL.
- **`E-C9`** — "seam-less functions as a placeholder standing in for a missing feature
  description." Overstated: the cited copywriter calls the word overused/annoying but does not make
  this specific framing claim.
- **`E-C20`** (and the parallel claims in `D-C2`/`D-C3`, `B-C11`/`B-C12`, `A-C16`) — "llms.txt sees a
  small but steady stream of traffic from Anthropic/Perplexity/agent tools." Already weak in the
  facet; its own verifier found further 2026 evidence (Google's June 2026 statement that llms.txt
  "does not help or hurt rankings"; a 137,000-domain study finding 97% zero traffic; a 300,000-domain
  study finding no correlation with AI citations) that tightens the refutation further. Treat
  llms.txt's payoff as effectively zero everywhere it has been measured, not as an open question.

---

## 7. Open questions only a live capture or the owner can settle

1. **The eight operator questions already logged in `FABLE-120-DESIGN.md` §6** remain open and gate
   several take-list items directly: whether real working-session footage exists and is releasable
   (item 5 depends on this if extended beyond the still photograph); whether the Tel Aviv photograph
   is cleared for a hero-scale crop; whether ORDANI has a redactable real screen; whether the RFP
   client's quote is cleared to appear under "name protected"; whether the sage accent exception on
   `/work/ordani` survives a single shared template; the S2 line's exact content; whether each
   study's close routes to the `/services` anchor or to `/contact`; and — most relevant to this
   research — whether the operator signs off on recasting the TitleCard as a 600ms settle entrance,
   since that is a recorded signature change, not a build decision.
2. **Has the GSAP-quarantine rule already moved past what Facet A assumed?** The live worktree's
   `.claude/CLAUDE.md` shows TitleCard is now CSS-only (`cs-settle`) since Pass-120, with
   `SplitReveal.tsx` as the sole remaining GSAP importer. Any brief drawing on take-list item 18
   (kinetic-type SplitText) needs to re-read current state before treating a "second GSAP surface"
   as live, undecided territory — it may already be a different question than the facet posed.
3. **Does an abstract SVG relationship/flow diagram, or a Rive-based interactive diagram, count as
   a "figure" under the standing 2026-09-11 "no animated figure" ruling?** Raised independently by
   facets A and C with no resolution either way. Needs an explicit operator ruling before a brief
   assumes either is in-bounds — item 20 in particular (the Rive diagram) should likely be treated
   as a probable reject pending that ruling, not built on spec.
4. **Can any of the three fully anonymous clients (rfp-engine, content-engine, birth-worker) supply
   one genuinely public or clearly-labeled-illustrative document fragment** for a document-artifact
   study opener (take-list item 13)? If not, that idea should be dropped rather than approximated
   with an invented excerpt.
5. **Is off-site presence work (LinkedIn, interviews, directory listings) something the operator
   wants opened as a separate, explicitly non-visual work item?** It is the one item this research
   repeatedly names as plausibly the strongest, but every specific supporting number failed
   verification (§6) — the honest framing for G1 is "worth a conversation," not "worth a brief line
   item" in this visual-craft pass.
6. **Several Class A reference-pool entries were not independently verified live this session**
   (IVRESS, Shopify Editions, Sleep Well Creative, Cartier Watches & Wonders) **and Resn's own site
   is a content-less JS shell to plain fetch.** Only a real capture at 390/1440 (not another
   WebFetch pass) can confirm what these actually show before G1 scores them.

---

## Summary (10 lines)

Read every Pass-121 facet and its adversarial verification, plus DESIGN_BAR §4/§6 and
FABLE-120-DESIGN §5, and wrote `SYNTHESIS.md` at the path above. The evidence mostly *confirms*
the site's existing rules rather than arguing to relax them: one signature motion, ≤400ms
punctuation-only entrances, and the ban on cursor-follow/pin/parallax all match what 2026 award
criteria and anti-slop research independently reward. The one concrete, already-verified gap is
`/work`'s index entries carrying nine data points against the site's own four-point rule. llms.txt
and JSON-LD are comprehensively refuted as AI-citation levers across three independent facets and
their verifiers — the real discoverability moves are crawler-specific robots.txt rules and keeping
every number in visible server-rendered prose, both near-zero-cost and already close to how this
site already works. The facet's single most "encouraging" AI-discoverability claim (Claude favoring
brand sites 64% over Reddit) did not survive verification and must not be reused. A same-document
View Transition carrying the real Tel Aviv photograph from `/work` into the Guardicore study hero is
independently recommended by both the trend research and the standing Fable design ruling. The
candidate pool holds 30 live URLs across three classes, excluding Pass-120's 14 and three dead/
misrepresented entries the verifiers caught (Oryzo's undisclosed satire, Uncommon Studio's moved
domain, Mat Voyce's unresolved redirect). Several pool entries still need a real browser capture
before G1 scores them, not another text-only fetch. Seven items in the take list touch the standing
"no animated figure" or GSAP-quarantine rules and are flagged for an explicit operator ruling rather
than assumed into a brief.
