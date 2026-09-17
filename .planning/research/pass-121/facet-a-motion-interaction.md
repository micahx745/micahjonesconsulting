# Pass-121 Facet A — Motion and interaction on portfolio/case-study sites (2025-2026)

Researched live via WebSearch/WebFetch on 2026-09-16. All claims below carry the URL(s) actually
returned/fetched this session and a 2025/2026 date. Nothing here re-proposes the 14 Pass-120
references (COLLINS, Instrument, Koto, Wolff Olins, Basement, Clay, Studio Freight, NYT Snow Fall,
The Pudding, Works in Progress, April Dunford, Dan Mall, Harpal Singh, UXGen) though one recurs
below only as citation context (Studio Freight/Lenis).

## Central claims

**C1.** CSS `animation-timeline: scroll()` reached ~87% global browser support as of August 2026
(Chrome/Edge 115+, Firefox 159+, Safari 26.0+, Opera 101+, Samsung Internet 23+). Firefox shipped
support only recently (v159) after a long stretch behind a flag.
URL: https://caniuse.com/mdn-css_properties_animation-timeline_scroll — Date: data as of Aug 2026 —
Evidence: primary-doc (caniuse aggregation of vendor release data). Means for this site: scroll-linked
reveals can now be done in pure CSS with a `@supports` fallback rather than requiring GSAP
ScrollTrigger for the simple 80% of effects (see C9).

**C2.** Safari's `animation-timeline` support landed in Safari 26 (September 2025) — the last major
engine to ship it, closing the gap that made scroll-driven CSS unsafe to ship broadly before late 2025.
URL: https://caniuse.com/mdn-css_properties_animation-timeline_scroll (corroborated by
https://cydstumpel.nl/start-using-scroll-driven-animations-today/) — Date: Sept 2025 — Evidence:
primary-doc. Means: this site can adopt `view()`-timeline reveals now without a JS polyfill tax on
Safari users, a constraint that did not exist a year ago.

**C3.** Cross-document View Transitions (`@view-transition { navigation: auto }`) shipped in Chrome/Edge
126 (June 2024) but Safari and Firefox still do not support them as of the 2026 sources fetched.
Same-document View Transitions (`document.startViewTransition()` and React's experimental
`<ViewTransition>`) have wider support and are what Next.js's official guide documents.
URL: https://nextjs.org/docs/app/guides/view-transitions ; https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
— Date: fetched 2026-09-16, Next.js docs current — Evidence: primary-doc. Means: the site's existing
900ms foyer↔theater dim is the same-document flavor (works broadly); a true cross-document morph
(e.g., a case-study thumbnail growing into the hero photo across a full navigation) is Chromium-only
today and would need a graceful no-op fallback on Safari/Firefox.

**C4.** React 19's `<ViewTransition>` component is still experimental/opt-in behind a flag in React
19.x, not a stable API, even though Next.js 16 (this site's framework) ships React 19.2 canary
integration.
URL: https://www.digitalapplied.com/blog/react-19-2-view-transitions-animate-navigation-nextjs-16 ;
https://nextjs.org/docs/app/guides/view-transitions — Date: 2026 — Evidence: primary-doc/vendor-claim
mix. Means: any new shared-element transition work should be built defensively (feature-detected), the
same posture the codebase already takes.

**C5.** GSAP and all its former "Club GreenSock" paid plugins — SplitText, ScrollSmoother, DrawSVG,
MotionPath — became free for any commercial use in April 2025 after Webflow's acquisition and
subsidy of the library.
URL: reflected in https://gsap.com/docs/v3/Plugins/SplitText/ and corroborated across independent
tutorial sites, e.g. https://lab.good-fella.com/blog/gsap-text-animation-splittext-guide — Date:
April 2025 — Evidence: vendor-claim (GSAP's own release), corroborated independently. Means: the
site's GSAP quarantine to `TitleCard.tsx` is a policy choice, not a licensing constraint — SplitText-
driven kinetic type is free to use if the operator wants a second GSAP surface, but AGENTS.md's
quarantine rule still governs unless amended.

**C6.** GSAP itself runs on only ~2.2% of all websites and ~2.8% of sites with any detectable JS
library, per w3techs 2026 data surfaced in search results — despite being the dominant tool at the
award-site tier.
URL: cited via search summary referencing w3techs.com (2026); not independently re-fetched this
session — Date: 2026 — Evidence: measured (usage-share tracker), secondary-sourced. Means: heavy
motion libraries remain a minority technique overall; their concentration at Awwwards/FWA tier is a
taste signal, not a baseline expectation.

**C7.** HTTP Archive Web Almanac data (2024/2025, aggregated by Annnimate's 2026 report): 91.7% of
mobile pages use a CSS transition, but only 18.4% load any JS animation library at all — the vast
majority of the web's motion is CSS-only.
URL: https://annnimate.com/state-of-web-animation — Date: report cites Web Almanac 2024/2025 data,
page fetched 2026-09-16 — Evidence: measured (HTTP Archive crawl of real sites). Means: JS-driven
motion (GSAP, Lenis, Three.js) is a differentiator technique, not table stakes — using it selectively
on the /work index and study heroes reads as intentional rather than default.

**C8.** `prefers-reduced-motion` adoption on mobile sites rose from 34% (2022) to over 50% (2024), per
Web Almanac data cited by Annnimate.
URL: https://annnimate.com/state-of-web-animation — Date: 2024 data, page fetched 2026-09-16 —
Evidence: measured. Means: this site already honors reduced-motion on its signature moments (per its
Definition of Done §6); any new motion vocabulary must extend that, not carve exceptions.

**C9.** Non-composited ("janky") animations still appear on ~40% of mobile pages and ~44% of desktop
pages; only 48% of mobile origins pass all three Core Web Vitals; INP is "good" on 77% of mobile sites
vs. 97% of desktop, with heavy JS animation named as a direct INP cost (Web Almanac 2025, via
Annnimate).
URL: https://annnimate.com/state-of-web-animation — Date: 2025 data, fetched 2026-09-16 — Evidence:
measured. Means: this site's ≥95 mobile Lighthouse / INP≤200ms / CLS≤0.05 bar (per CLAUDE.md
Definition of Done) is already tighter than the median site — any new motion must be built to keep
that margin, favoring transform/opacity-only animation and CSS scroll-timelines over JS scroll
listeners.

**C10.** A cited migration case reported that swapping ScrollMagic for native CSS scroll-driven
animation removed all JS scroll listeners and cut p75 INP by 120ms with visually identical output.
URL: surfaced via a search on scroll-driven-animation performance costs (candidate sources:
https://mintec.co/blog/scroll-driven-view-transitions-css-2026/ or
https://www.css-scroll-driven.com/accessibility-inclusive-motion-standards/ — exact attribution
unclear from the aggregated snippet) — Date: 2026 — Evidence: vendor-claim/case-study, unverified
sample size — flag as directional, not a controlled study. Means: directionally supports moving any
new scroll-tied number build or reveal (see item 6 below) to CSS timelines rather than a scroll-event
JS library.

**C11.** Lenis is described industry-wide in 2026 coverage as the leading smooth-scroll library, built
to avoid the scroll-hijacking anti-pattern (faking `position: fixed` + JS translate) that broke
keyboard nav and assistive tech in older libraries (the Locomotive Scroll era) — but Thoughtworks
Technology Radar placed it only in "Assess" (October 2024 edition; not carried into a later edition in
what I could find) and explicitly warned of accessibility issues with vertical/horizontal scroll
interactions needing careful implementation.
URL: https://www.thoughtworks.com/radar/languages-and-frameworks/lenis (fetched 2026-09-16, edition
dated Oct 2024) ; corroborating text via https://lenis.dev/ and
https://github.com/darkroomengineering/lenis — Evidence: expert-opinion (Thoughtworks Radar panel) +
vendor-claim (Lenis's own site). Means: this site already runs Lenis at root layout with
`syncTouch:false` locked — that is the documented safer configuration; Thoughtworks' caution argues
against layering scroll-snap or additional scroll-hijacking patterns on top of it (a known conflict,
see C12).

**C12.** Mixing Lenis (or any scroll-hijacking smooth-scroll) with native CSS `scroll-snap` is a
documented conflict — a 2026 practitioner post-mortem details Lenis breaking scroll-snap behavior and
the fix required.
URL: https://raoulcoutard.com/posts/2026-02-03-lenis-scrollsnap-conflict-en/ — Date: 2026-02-03 —
Evidence: expert-opinion/practitioner case study. Means: if a new "featured study" horizontal or
snap-scroll interaction is ever considered for `/work`, it cannot be combined naively with the site's
existing Lenis instance without dedicated testing.

**C13.** Award coverage of 2026 sites converges on a restrained-craft description at the top tier:
By-Kin's Awwwards SOTD copy is praised for "transitions that never call attention to themselves,"
Iventions uses Three.js for atmosphere "rather than spectacle," and Minh Pham's portfolio pairs GSAP
with WebGL so that the 3D "enhances rather than overwhelms." This vocabulary repeats across
independently written site descriptions.
URL: https://www.hontran.dev/blog/best-award-winning-websites-2026 (fetched 2026-09-16; sites:
by-kin.com, iventions.com, minhpham.design) — Date: article covers 2025-2026 winners — Evidence:
expert-opinion (a stated Awwwards juror's blog). Means: the owner's ask to stand out visually is
compatible with the site's existing restraint rules (motion as punctuation, one signature) — current
award-tier taste is restraint plus one or two well-executed moments, not maximalism.

**C14.** Kinetic typography via GSAP SplitText (character/word/line splitting plus animation) is named
explicitly as one of the three biggest 2026 web-animation trends, alongside scrollytelling and native
scroll-driven CSS, "filtered through a performance-first, accessibility-first lens."
URL: https://motionkit.io/blog/web-animation-trends-2026 — Date: 2026 — Evidence: vendor-claim/trend
report (marketing content from an animation-tooling blog; treat as directional, not measured). Means:
a kinetic-type treatment on study hero titles or the `/work` header would track a trend the sector
itself names, but crosses into font-animation territory this site currently reserves for the
TitleCard alone.

**C15.** Rive's interactive state-machine model differs fundamentally from Lottie's replayed-keyframe
model; for comparable small animations, Rive files run 3-5x smaller than equivalent Lottie JSON
(Duolingo's own case cites a 15x file-size reduction switching a character animation to Rive).
URL: citing https://unicornicons.com/blog/lottie-vs-rive-performance and
https://rive.app/blog/rive-as-a-lottie-alternative — Date: 2026 — Evidence: vendor-claim (Rive's own
comparison, and a third-party aggregator repeating the Duolingo case without independent verification
this session). Means: since this site barely uses Lottie or Rive today, an animated diagram inside a
study body (e.g., an abstract RFP-pipeline or CRM-workflow exhibit, no real screenshots) could use a
Rive state machine as an interactive explainer at low weight cost — but AGENTS.md's "no animated
figure" ruling (2026-09-11) currently forecloses anything resembling a mascot; a data diagram is a
different category and would need its own explicit ruling.

**C16.** The llms.txt proposal (Sept 2024, Answer.AI) is comprehensively ignored by AI crawlers in
practice: an Ahrefs analysis of 137,000 domains found 97% of published llms.txt files received zero
requests in May 2026; of the requests that did arrive, AI bots made up roughly 1% of traffic to the
file (figures cited: GPTBot ~4.5%, ClaudeBot ~0.8%, DeepseekBot ~0.02% of requests — these read as
crawler-share-of-requests rather than domain-level figures; treat cautiously). Google's Gary Illyes
stated in July 2025 that Google does not and will not support llms.txt, comparing it to the keywords
meta tag; as of Q1 2026 no major AI vendor (OpenAI, Google, Anthropic, Meta, Mistral) has committed to
reading it in production.
URL: https://mecanik.dev/en/posts/does-llms-txt-do-anything-yet/ ; corroborated by
https://medium.com/@jsanthoshwriter/google-says-you-dont-need-llms-txt-so-why-is-everyone-talking-about-it-1756d5c98ffd
and https://www.1clickreport.com/blog/llms-txt-evidence-2026 — Date: 2026 (Ahrefs log analysis cited
as "May 2026"; Illyes quote "July 2025") — Evidence: measured (server-log study, secondary-cited, not
independently re-fetched from Ahrefs' own report this session) + primary-doc (Google's public
statement). Means: do not build llms.txt as the AI-discoverability answer for this site — current
evidence says it is close to a dead end. This bears directly on the owner's stated goal of being
recommended by AI assistants.

**C17.** What the 2026 GEO (Generative Engine Optimization) writing converges on instead: quotations
lift AI-citation likelihood roughly 41%, statistics roughly 32%, inline citations roughly 30%; about
80% of AI-cited pages use lists and structured elements; third-party trust signals (earned media,
external mentions) lift citation likelihood roughly 75x; a cited Princeton study of 10,000 queries
found authority techniques (citations, named sources, statistics) beat cosmetic or structural
techniques. Schema.org markup is described as "not required" for AI Overviews but still valuable for
entity clarity.
URL: drawn from https://writer.com/blog/geo-aeo-optimization/ and
https://www.pingprime.ai/en-be/blog/schema-markup-geo-guide (the exact primary source of the
41%/32%/30%/75x figures is unclear from the aggregated search snippet — likely a specific study, but I
could not confirm the primary paper this session) — Date: 2026 — Evidence: mixed measured/vendor-claim,
flagged as needing primary-source verification before being cited as settled fact. Means: if the
owner wants AI-assistant recommendation, the lever named across the industry writing is named numbers,
named sources, and third-party mentions in the prose — which is already this site's voice rule
(COPY-04 in CLAUDE.md: "$150K, 14 practices, 91% intake completion") — not new JS or markup. This is a
copy/content finding, outside this facet's core scope (motion/interaction), but it directly answers
the "AI discoverability plumbing" ask so it belongs in the section below.

**C18.** JSON-LD structured data (Person, ProfessionalService, CreativeWork/Article for case studies)
remains the concrete, buildable plumbing layer independent of llms.txt's uncertain fate — it is
consumed by classic search (rich results) and is the one AI-adjacent technical addition multiple 2026
GEO sources still recommend alongside content quality, rather than instead of it.
URL: https://www.digidop.com/blog/structured-data-secret-weapon-seo ;
https://www.pingprime.ai/en-be/blog/schema-markup-geo-guide — Date: 2026 — Evidence: vendor-claim
(SEO-agency content), directional not measured. Means: adding Person/CreativeWork JSON-LD to the
case-study pages is a low-risk, low-motion-impact technical addition that doesn't touch the "looks
plain and weak" visual complaint but serves the stated AI-discoverability goal with better evidence
behind it than llms.txt.

**C19.** The technique inventory across the 8+ fetched 2026 live examples clusters into a short list
of repeatable primitives: scroll-sequenced or scroll-scrubbed camera/object motion (Oryzo, Explore
Primland, Shopify Editions), spotlight/atmosphere-only WebGL rather than full 3D scenes (Iventions,
Hubtown), timeline-driven kinetic type (Mat Voyce), and GSAP-layered-over-Three.js restraint (Minh
Pham, Cartier). No fetched 2026 example relies on cursor-follow or magnetic buttons as its headline
technique — those show up mainly in component-library/snippet-site content (CodeFronts, GSAP Vault,
Framer Marketplace), not in the award coverage itself.
URL: https://www.utsubo.com/blog/best-threejs-websites-2026 ;
https://www.hontran.dev/blog/best-award-winning-websites-2026 — Date: fetched 2026-09-16 — Evidence:
live-example (aggregator descriptions of fetched award sites). Means: magnetic-cursor/hover-follow
effects are a commodity snippet-tier technique now (see "Now overused" below), not what separates 2026
award sites — this site's existing ban on cursor-followers already matches where the craft lives.

**C20.** The cross-document View Transition browser gap (Chromium-only, per C3) means any full-page
morph between `/work` index and `/work/[slug]` would currently animate only for Chrome/Edge users and
fall back to a normal navigation elsewhere — standard progressive enhancement, not a broken experience,
but it means a cross-document moment cannot be counted on as a universal visual identity the way the
current same-document dim transition is.
URL: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API ;
https://nextjs.org/docs/app/guides/view-transitions — Date: fetched 2026-09-16 — Evidence: primary-doc.
Means: relevant if Pass-121 considers a thumbnail-to-hero-photo morph for the two studies that do have
a photograph (guardicore, ordani).

## Live examples

| Name | URL | Date/award | What it does | Capture-worthy |
|---|---|---|---|---|
| Oryzo | oryzo.ai | Awwwards SOTM + Dev Award, April 2026 | Inertial 3D product render with Z-depth scroll, physics-mimicking easing on a single hero object | Yes |
| IVRESS | brand.ivress.co.jp | FWA SOTM May 2026; CSS Design Awards | WebGPU renderer with WebGL fallback; TSL shaders compiled to both backends | Yes |
| Lacoste Ace Breaker | members-play.lacoste.com/ace-breaker-rg/gb/en/ | Awwwards nominee, 2026 | Branded Three.js/WebGL micro-game (brick-breaker) with a live leaderboard | No (off-genre for this site) |
| Shopify Editions | shopify.com/editions/spring2026 | Featured, Spring 2026 | Scroll-sequenced product reveal; particle-dispersing kinetic type; choreographed section transitions | Yes |
| Hubtown | hubtown.co.in | Awwwards SOTD, June 2026 | 3D monolith with mouse-reveal interaction uncovering geometry/lighting detail | Yes |
| Sleep Well Creative | sleep-well-creatives.com | Awwwards SOTD, January 2026 | Scroll-driven illustrated narrative blending hand-drawn art with a Three.js stage | Yes |
| Explore Primland | explore.ownprimland.com | Awwwards SOTD, February 2026 | 3D landscape flythrough with atmospheric fog; scroll-driven camera navigation | Yes |
| Cartier Watches & Wonders | cartier.com/watchesandwonders | Awwwards SOTD; CSS Design Awards | Six self-contained 3D "alcoves" (GLSL + GSAP + Lenis) with a Web Audio score | Yes |
| By-Kin | by-kin.com | Awwwards SOTD + Dev Award, FWA, CSS DA Web of the Day | Editorial typography, weighted smooth scroll, transitions built to be unobtrusive; Next.js + GSAP + Strapi | Yes |
| Iventions | iventions.com | CSS DA Website of the Month Oct 2025; Awwwards SOTD + Dev Award | Three.js spotlight/atmosphere lighting (not full 3D scenes); GSAP-paced project reveals | Yes |
| Mat Voyce | matvoyce.tv | Awwwards SOTD; GSAP Site of the Year 2025 nominee | Kinetic typography — letters stretch/snap/recombine on scroll, fully timeline-driven | Yes |
| Uncommon Studio | uncommonstudio.com.au | Awwwards SOTD + Dev Award, FWA | Grid-based layout, GSAP transitions acting as "camera moves"; perf-optimized art direction | Yes |
| Minh Pham (portfolio) | minhpham.design | Awwwards SOTD (dev score 7.77) | GSAP layered over Three.js/WebGL for restrained 3D framing of portfolio pieces | Yes |
| Léo Parpeix (portfolio) | (per search: "Léo Parpeix — Portfolio 2026") | Awwwards Dev Award + SOTD, Sept 14 2026 | Named in the WebGL collection; specific technique not independently confirmed this session — verify on capture | Verify first |

Note: the Lacoste micro-game and Léo Parpeix entries need a direct fetch/screenshot pass before being
cited as technique evidence in a brief — they came through aggregator summaries only, not a page
fetch, in this session.

## Now overused

- **Magnetic/cursor-follow buttons.** 2026 search results for this technique return almost entirely
  snippet libraries and component marketplaces (CodeFronts, GSAP Vault, Framer Marketplace,
  freefrontend) rather than fresh award coverage — a sign it has moved from craft signature to
  commodity component.
  (https://codefronts.com/motion/css-hover-effects/css-magnetic-cursor-pull-hover-effect/ ;
  https://www.framer.com/marketplace/components/magnetic-button/, both 2026 listings.) This site
  already bans cursor-followers — that ban is validated, not worth relaxing.
- **Full-bleed WebGL hero scenes as a default**, versus the more current "atmosphere not spectacle"
  pattern (Iventions, Hubtown) — per C13, award-tier critical language in 2026 explicitly favors
  restraint over maximal 3D. A generic particle/shader hero on every case study would read as catching
  up to a mid-2020s trend rather than meeting 2026's actual bar.
- **Scroll-hijacking smooth scroll as an unquestioned default.** Thoughtworks Radar's caution (C11)
  plus the documented Lenis/scroll-snap conflict (C12) mean the technique now needs real testing
  effort, not a drop-in library call — treating it as solved is itself dated thinking.
- **llms.txt as an AI-visibility fix.** Per C16 this is actively debunked by the platforms it targets;
  in 2026 web-dev discourse it reads as a 2025 checkbox that didn't pay off.

## Costs and risks

- **Performance.** JS-driven scroll libraries and WebGL/shader surfaces are the primary INP and
  JS-weight risk on mobile (C9); Web Almanac data shows the sites that fail Core Web Vitals mostly
  fail via non-composited or JS-heavy animation, exactly the category any new "stand out visually"
  work would add. This site's Definition of Done already sets Performance ≥95 mobile / INP≤200ms /
  CLS≤0.05 — tighter than the ~48%-pass median (C9) — so any new motion needs a perf budget check
  before it ships, not after.
- **Accessibility.** `prefers-reduced-motion` is now a documented baseline expectation, not a
  nice-to-have (C8); Lenis specifically carries a flagged accessibility caution from Thoughtworks
  (C11) around keyboard/AT interaction with vertical/horizontal scroll. Any WebGL/canvas exhibit needs
  a genuine static fallback, not just a paused animation, since canvas content is invisible to screen
  readers by default.
- **Honesty / NDA constraint.** Nearly every fetched 2026 award technique (3D product renders,
  particle reveals of real product shots, screenshot-driven scroll sequences) assumes real visual
  assets to animate. This site has almost none (NDA, client data) — so techniques like Shopify
  Editions' particle-dispersing product reveal or Oryzo's 3D product render have no photograph or
  screenshot to act on for four of five case studies. Motion here has to carry typography, data (named
  numbers), and abstract diagram/geometry rather than product imagery — a real constraint the
  reference sites above don't share.
- **Which written rule each item would touch:**
  - Scroll-driven CSS reveals on index/hero entrances → compatible with "motion is punctuation," no
    rule change needed if kept to entrances ≤400ms.
  - A second GSAP surface (kinetic type via SplitText on `/work` header or study hero words) → touches
    "GSAP quarantined to TitleCard.tsx only" (AGENTS.md) — needs an explicit operator/motion-engineer
    ruling, not an assumption.
  - Any animated diagram (e.g., an abstract RFP-pipeline or CRM-workflow exhibit in study body) →
    intersects the "no animated figure, second-signature-motion is a standing no" ruling (CLAUDE.md,
    2026-09-11) — a data diagram is arguably a different category than a "figure," but a brief needs
    to name that distinction explicitly rather than assume it.
  - Any cross-document View Transition morph → new territory, not currently against a written rule,
    but Chromium-only (C3, C20) so it can't be the site's sole signature.
  - llms.txt or a similar AI-plumbing file → not a motion item, but flagged here because the owner's
    ask conflated "look better" with "get recommended by AI" — per C16/C17 those need different
    plumbing (structured data plus citation-friendly prose, not a crawler manifest).

## What this site could take

1. **`/work` header — scroll-driven CSS entrance for the header and record-block numbers**, using
   `animation-timeline: view()` with a `@supports` fallback (C1, C2). Zero JS weight,
   transform/opacity only, honors reduced-motion when the `animation-timeline` declaration is guarded
   by `@media (prefers-reduced-motion: reduce)`. Addresses "looks plain" without new library weight.

2. **Featured-study entry — a restrained, atmosphere-only treatment**, following the
   Iventions/Hubtown pattern (C13, C19) rather than a full WebGL scene: e.g., a single subtle
   gradient/shader plane behind the entry title that responds to scroll position via
   `animation-timeline`, not a 3D object. Keeps the "no stock 3D" rule intact since it is decorative
   light, not modeled geometry.

3. **Index entries — a kinetic-type entrance on the study title only** (GSAP SplitText, now free per
   C5), scoped tightly (title line only, one entrance, ≤400ms) so it reads as a second controlled use
   of GSAP rather than a second signature motion. This is the one item that needs an explicit ruling
   against the TitleCard-only GSAP quarantine before it is built (see Costs above) — flag to the
   operator rather than assume.

4. **Study hero — evaluate a same-document View Transition shared-element move** for the two studies
   with a real photograph (guardicore, ordani): the index thumbnail image morphs into the hero photo
   position using a shared `view-transition-name`, same-document API (works broadly, unlike the
   cross-document variant per C3/C20). This is additive to the existing 900ms dim, not a replacement,
   and should be scoped as an experiment on those two studies only, not all five.

5. **Study body exhibits — an interactive Rive state-machine diagram** (not a figure or mascot — a
   small abstract workflow or funnel diagram, e.g. illustrating the RFP-engine pipeline stages or the
   ORDANI intake flow) as a low-weight (per C15, 3-5x smaller than Lottie) alternative to a static
   image where NDA prevents showing the real product. This needs an explicit operator ruling given the
   standing "no animated figure" language, and should be pitched as a diagram, not a figure, to keep
   the distinction clean.

6. **Motion vocabulary — extend, don't multiply.** Per C7/C19, the median web page is
   CSS-transition-only and award-tier restraint is now the described taste (C13); the strongest
   stand-out-without-looking-AI-built move is fewer, better-timed CSS scroll-timeline entrances across
   more surfaces (index, header, exhibits) rather than adding a second heavy JS/WebGL system. This
   directly answers "stay of a piece with the site."

7. **AI discoverability plumbing — do not build llms.txt** (C16: roughly 97% zero-request rate,
   Google's public non-support). Instead: (a) add JSON-LD `Person` + `ProfessionalService` schema
   site-wide and `CreativeWork`/`Article`-type schema per case study (C18); (b) lean harder into the
   site's own existing named-numbers voice rule in visible prose, since quotations, statistics, and
   named sources are the citation-lift factors cited across 2026 GEO writing (C17) — a copy/content
   move, already compatible with COPY-04, not a new motion or design surface.

8. **What to explicitly avoid adding:** cursor-follow/magnetic buttons (now commodity-tier, C19/"Now
   overused"), a full 3D hero scene per case study (asset-constrained by NDA, and reads as catching up
   rather than current per C13), and Lenis-plus-scroll-snap combinations without dedicated testing
   (C12).

## Sources

- https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- https://cydstumpel.nl/start-using-scroll-driven-animations-today/
- https://nextjs.org/docs/app/guides/view-transitions
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://www.digitalapplied.com/blog/react-19-2-view-transitions-animate-navigation-nextjs-16
- https://gsap.com/docs/v3/Plugins/SplitText/
- https://lab.good-fella.com/blog/gsap-text-animation-splittext-guide
- https://www.utsubo.com/blog/best-threejs-websites-2026 (oryzo.ai, brand.ivress.co.jp, members-play.lacoste.com, shopify.com/editions/spring2026, hubtown.co.in, sleep-well-creatives.com, explore.ownprimland.com, cartier.com/watchesandwonders)
- https://www.hontran.dev/blog/best-award-winning-websites-2026 (by-kin.com, iventions.com, matvoyce.tv, uncommonstudio.com.au, minhpham.design)
- https://www.thoughtworks.com/radar/languages-and-frameworks/lenis
- https://lenis.dev/
- https://github.com/darkroomengineering/lenis
- https://raoulcoutard.com/posts/2026-02-03-lenis-scrollsnap-conflict-en/
- https://motionkit.io/blog/web-animation-trends-2026
- https://annnimate.com/state-of-web-animation
- https://unicornicons.com/blog/lottie-vs-rive-performance
- https://rive.app/blog/rive-as-a-lottie-alternative
- https://mecanik.dev/en/posts/does-llms-txt-do-anything-yet/
- https://medium.com/@jsanthoshwriter/google-says-you-dont-need-llms-txt-so-why-is-everyone-talking-about-it-1756d5c98ffd
- https://www.1clickreport.com/blog/llms-txt-evidence-2026
- https://writer.com/blog/geo-aeo-optimization/
- https://www.pingprime.ai/en-be/blog/schema-markup-geo-guide
- https://www.digidop.com/blog/structured-data-secret-weapon-seo
- https://codefronts.com/motion/css-hover-effects/css-magnetic-cursor-pull-hover-effect/
- https://www.framer.com/marketplace/components/magnetic-button/
