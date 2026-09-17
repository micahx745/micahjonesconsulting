# Facet B — Making text-heavy case studies visual without photographs

Research leg for Pass-121, micahjonesconsulting.com. All findings below come from live WebSearch/WebFetch
this session (2026-09-16). Nothing here is drawn from training memory. Pass-120's 14 references (COLLINS
Mailchimp, Instrument PagerDuty, Koto Amazon, Wolff Olins Instacart, Basement Studio Harvey, Clay Sky,
Studio Freight Brex, NYT Snow Fall, The Pudding film dialogue, Works in Progress housing, April Dunford,
Dan Mall Spine, Harpal Singh, UXGen Advisory) are treated as already studied — cited only as background,
never re-proposed as new.

## Central claims

**C1.** Scrollytelling in 2026 is described by trend writers as past "peak" and now mainstream craft
("scroll like an editor treats a timeline"), but the *original* backlash — Robert Kosara's "The
Scrollytelling Scourge" (scrolljacking, awkward misuse, form/content mismatch) — is still the reference
point critics cite when a site overdoes it. Evidence type: expert-opinion (trend synthesis + citation of
Kosara's essay). URL: https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/ ,
https://svilenkovic.com/3d/scrollytelling-trends-2026 . Date: 2026 (trend pieces), Kosara essay
pre-2025 (background only, not a standalone citation). **For this site:** scrollytelling is not
disqualified by reputation, but the owner's ask ("stand out," "not look AI-built") is exactly the terrain
where a lazy scrollytelling implementation reads as templated — the craft bar is now higher than "add
ScrollTrigger."

**C2.** The single most-cited 2025–2026 technique for explaining something hard to put into a sentence —
a circular/relational financial or systems structure — is a node-link network diagram, not prose. Both
Reuters (AI economy financing) and Bloomberg (AI circular deals) independently reached for this device
for the *same* underlying story (OpenAI/Nvidia/Oracle/Microsoft money flows) within weeks of each other.
Evidence type: live-example + expert-opinion (GIJN interview with the graphics journalists).
URLs: https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/ ,
https://www.bloomberg.com/graphics/2026-ai-circular-deals/ . Date: reporting May 2026 (GIJN), graphic
dated with data "as of Jan. 9, 2026." **For this site:** RFP-engine's contract-flow story ($3M
contracts, anonymous client, AI drafting responses) and Guardicore's acquisition-and-revenue story are
both relationship stories, not just single numbers — a simple SVG node-link or flow diagram would replace
a paragraph of prose more honestly than any invented screenshot could.

**C3.** Reuters' own stated editorial rule for choosing a visual device: ask what question the reader
needs answered at that point — "scale over time" gets a chart, "relationships or systems" gets a
diagram. Evidence type: primary-doc/expert-opinion (graphics team's own account). URL:
https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/ . Date: 2026. **For this
site:** a usable per-exhibit decision rule for study body exhibits — don't default to the same widget
for every fact.

**C4.** The Pudding continues shipping visual essays that are overwhelmingly graphics/interaction, with
very little photography, on a roughly monthly cadence through mid-2026 — confirming the format is a
living, current practice, not a 2010s relic. Evidence type: live-example (site's own current index).
URLs and dates fetched directly: https://pudding.cool/2026/07/essential-words (Jul 2026),
https://pudding.cool/2026/06/mow (Jun 2026), https://pudding.cool/2026/05/similes (May 2026),
https://pudding.cool/2025/12/motifs (Dec 2025). **For this site:** validates that "no photos, all
diagram/typography" reads as current craft, not as a workaround for missing assets, if executed well.

**C5.** The Pudding's own 2025 "Pudding Cup" (its annual best-of, chosen from roughly 100 entries) named
three distinct winning approaches: (a) a motion-driven interactive *technical* explanation, (b) a
*document-driven* data story built on legislative text, (c) a narrative-driven exploration. This is a
usable taxonomy of "case study without photos" archetypes. Evidence type: primary-doc (The Pudding's own
award writeup) + live-example. URL: https://pudding.cool/pudding-cup/ . Date: awarded 2025 (announced
2026). **For this site:** the five case studies map roughly onto (a) technical (rfp-engine), (b)
document/record-driven (ordani's HIPAA/compliance story, content-engine), (c) narrative (birth-worker,
guardicore).

**C6.** The 2025 Pudding Cup's document-driven winner — a story about model anti-trans legislation
copied across states — carries its argument almost entirely in *quoted legislative text set beside a
static choropleth map*, not through heavy interactivity. The map itself was built as an `ai2html`-
exported static SVG/HTML (Adobe Illustrator to responsive web export), not D3/Canvas. Evidence type:
live-example (fetched directly). URL: https://cj-robinson.github.io/trans-model-leg/ . Date: published
2025, live as fetched 2026-09-16. **For this site:** proves a serious, honest data story can be carried
by *real public documents set as typographic objects* plus one simple static map — exactly the register
available for an anonymous NDA study (no invented screenshots needed, because the "document" here is
public record, not the client's private UI).

**C7.** Generative, code-drawn visualization tied to real data is an active 2025–2026 technique for
explaining an abstract *technical* concept with zero photography: the 2025 Pudding Cup's technical-
explanation winner renders roughly 160,000 GPU-instanced cubes in Three.js, driven by GLSL shaders, to
visually decode how image dithering works — published as a full build tutorial on Codrops in April 2026.
Evidence type: live-example + primary-doc (author's own tutorial). URLs:
https://visualrambling.space/dithering-part-1/ ,
https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/ .
Date: April 2026 (Codrops), 2025 (Pudding Cup award). **For this site:** shows the ceiling of "abstract
generative art tied to the data" — but also its cost: WebGL/shader work at this scale is a heavy,
GPU-bound build, not a weekend CSS job (see Costs).

**C8.** A commercial studio (Variable, UK) sells "generative data visualization" as a branding/campaign
deliverable to name-brand clients (Transport for London, Dropbox, Nike, IBM, Google), confirming abstract
generative art driven by real data is an established paid agency service, not just a journalism
technique. Evidence type: live-example (studio's own portfolio) — the studio's own description of its
work is a vendor claim, not an independently measured result. URL: https://variable.io/works/ . Date:
portfolio live as fetched 2026-09-16, includes an "Expo 2025" project. **For this site:** relevant
precedent for positioning "visual/animated case studies" as a saleable craft, since website design is
itself one of Micah's services — but Variable's work is decorative/branding-scale, not an account of a
specific client engagement, so it reads as a motion-vocabulary reference, not a data-honesty model.

**C9.** CSS-native scroll-driven animation (the `animation-timeline`/`ScrollTimeline` API family) runs
scroll-linked animation off the main thread on the compositor, avoiding JS scroll-event listeners —
a real performance advantage over classic ScrollTrigger-style scrollytelling. However, MDN's own
compatibility note (checked live) states the API is **not yet Baseline** — it does not work in some
widely used browsers — so any use needs a static/JS fallback, not a bare CSS-only implementation.
Evidence type: primary-doc (MDN spec status, fetched directly). URL:
https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline . Date: checked live 2026-09-16 (MDN
compat data is continuously updated, no separate publish date given in the fetched excerpt).
**For this site:** motion vocabulary — a scroll-tied progress technique (e.g., a study's step-through)
should be built progressive-enhancement style: static/instant by default, animated only where the API is
supported, honoring `prefers-reduced-motion` regardless.

**C10.** A live, continuously updated 2026 gallery of business/consultant websites (last updated August
2026) states as a pattern finding that most business-consultant sites now skip a hero photo entirely and
open with a words-only headline stating who they serve. Evidence type: vendor-claim/trend-blog
(aggregator's own editorial claim, not a measured study). URL:
https://createtoday.io/examples?category=business-consultant . Date: "updated August 2026" per the page.
**For this site:** the word-dominated hero this site already has is not a compromise forced by missing
photography — it is the current default shape of a credible consultant site; the visual problem to
solve is inside the body and index, not the hero concept itself.

**C11.** llms.txt adoption is growing in 2026 GEO ("generative engine optimization") practice, but an
independent 90-day monitoring study of over 500 million AI-bot visits found only 408 requests directly
targeted llms.txt, and no major LLM provider (OpenAI, Google, Microsoft) has publicly committed to
crawling it on a schedule — actual AI-search visibility tracks to structured content, schema/entity
signals, and earned authority, not the text file itself. Evidence type: measured (bot-traffic monitoring
study cited by the source) + expert-opinion. URL: https://otterly.ai/blog/the-llms-txt-experiment/ .
Date: 2026. **For this site:** relevant to the owner's "recommended by AI assistants" goal but is
plumbing, not a visual device — worth a line in AI-discoverability plumbing, not a design pass.

**C12.** A single documented February 2026 case (one agency's own account, so a vendor claim, not a
measured result) reports that adding a static llms.txt plus JSON-LD structured data was followed three
days later by Google AI Mode citing that file as its anchor source for a brand query — but the same
account concedes measurable SEO impact was "zero" and frames the value as an "identity layer," not
traffic. Evidence type: vendor-claim (single anecdote, agency's own case study). URL:
https://netkodo.com/case-studies/llmstxt . Date: February 2026. **For this site:** treat as a
directionally interesting anecdote only — not evidence llms.txt alone moves AI-assistant recommendation
behavior; pair any llms.txt work with schema/structured content, per C11.

**C13.** 2025–2026 trend coverage of agency/brand identity work documents kinetic and structural
typography — letterforms doing double duty as diagrams, UI motifs, or "sound waves" — as a live way to
build a visual system when there is no photography to lean on (cited example: Studio Dumbar's OutSystems
identity). Evidence type: expert-opinion/trend-blog (secondary trend roundup, not the studio's own case
study page — not independently fetched). URL:
https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026 .
Date: 2026. **For this site:** supports investing further in Bricolage Grotesque display treatments
(oversized numerals, pull figures) as the site's answer to "no photo" rather than reaching for
illustration/3D, which the project's own rules already ban.

**C14.** Portfolio/case-study guidance on handling NDA-restricted work (a pre-2025 background source,
Aug 2019, cited only because C6's 2025 live example independently confirms the same preference)
recommends wireframes/process sketches over blurred final screenshots, because a blurred image reads as
"broken/still loading," while an abstracted wireframe honestly signals "this is the structure, not the
finished pixel." Evidence type: expert-opinion (UX research org). URL:
https://www.nngroup.com/articles/ux-design-portfolios/ . Date: 2019 (background/pre-2025 — not treated as
current authority on its own). **For this site:** directly answers the "redacted/abstracted UI"
sub-question — a schematic wireframe ghost is the more honest device than any blur effect, and
categorically more honest than a fabricated screenshot.

**C15.** Trend coverage of 2025–2026 agency case-study conventions describes a now-standard three-part
shape — overview, then a process section usually carrying photography or mockups, then results — meaning
most competitor case studies still lean on a visual process beat that this site's photography-free
studies currently skip outright rather than replace with a diagram equivalent. Evidence type:
vendor-claim/trend-blog (marketing blog, a general claim, not a specific measured sample). URL:
https://www.stryvemarketing.com/blog/design-b2b-case-studies/ . Date: 2025–2026 trend content (exact
publish date not surfaced). **For this site:** names the actual gap — not "missing photos" in the
abstract, but a missing process visual beat in the middle of each study; a system map or step diagram is
the direct, honest substitute.

**C16.** Bloomberg's own 2025-year-in-review graphics index exists as a single dated anchor page
aggregating that year's visual-journalism work, but the live page returned HTTP 403 to this session's
WebFetch tool (likely bot-blocking), so its contents are reported only via search-result snippets, not a
direct fetch — flagged as secondary evidence, weaker than C2's directly fetched claim. URL:
https://www.bloomberg.com/graphics/2025-in-graphics/ . Date: index for calendar year 2025, published
around Jan 2026. **For a later capture leg:** use a real headless/browser tool (not plain WebFetch) to
load Bloomberg graphics pages — bot-protection blocks simple fetchers.

## Live examples

| Name | URL | Date/award | What it does | Capture-worthy |
|---|---|---|---|---|
| Bloomberg — AI Circular Deals | https://www.bloomberg.com/graphics/2026-ai-circular-deals/ | Data as of Jan 9, 2026 | Scrollytelling network diagram: circles sized by company valuation, colored lines by deal type, builds progressively then becomes a fully interactive graph | Yes — but blocked plain WebFetch (403); capture with a real browser session |
| Bloomberg — 2025 Year in Graphics (index) | https://www.bloomberg.com/graphics/2025-in-graphics/ | Published ~Jan 2026 | Index/hub of the year's chart-and-map visual stories | Yes, same bot-blocking caveat |
| The Pudding — Similes | https://pudding.cool/2026/05/similes | May 2026 | Data figures/typographic analysis of 200,000 similes from fiction — text-as-data made visual | Yes |
| The Pudding — Musical Motifs | https://pudding.cool/2025/12/motifs | Dec 2025 | Visualizes recurring musical motifs across musical-theatre scores as a navigable timeline/figure system | Yes |
| The Pudding — Essential Words | https://pudding.cool/2026/07/essential-words | Jul 2026 | Tracks change in taught English-vocabulary lists over time via annotated small multiples | Yes |
| C.J. Robinson — Legislative Network Behind State Trans Laws | https://cj-robinson.github.io/trans-model-leg/ | 2025 (Pudding Cup 2025 winner) | Document-driven story: quoted legislative text as the visual object plus one static ai2html choropleth map | Yes — directly relevant honesty model for anonymous/NDA studies |
| Damar Aji Pramudita — Dithering, Part I | https://visualrambling.space/dithering-part-1/ | 2025 (Pudding Cup); build tutorial Apr 2026 | ~160,000 GPU-instanced cubes in Three.js/GLSL, animated to visually decode a technical imaging concept | Yes, but heavy WebGL — capture for craft reference, not a build target |
| Codrops build tutorial for the above | https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/ | Apr 1, 2026 | Full technical write-up of the shader/Three.js technique | For technique reference, not visual capture |
| Variable (studio) — Works | https://variable.io/works/ | Ongoing; incl. Expo 2025 project | Commercial generative/data-driven art and visualization for brand campaigns | Yes, as motion/aesthetic reference only |
| Basement Studio — Harvey (already in Pass-120 as reference) | https://basement.studio/showcase/harvey-from-seed-to-series-d | Project year 2023; page live 2026 | Brand/typographic case-study narrative, largely text- and type-driven, minimal charting | Background only — do not re-propose |
| Clay Global — Sky (already in Pass-120 as reference) | https://clay.global/work/sky | Live 2026 (copyright span 2016–2026) | Illustration + gradient system, real UI mockups shown (contrast case: this one does show real screens) | Background only — useful as a contrast, not a model, since this site can't show real client UI |
| createtoday.io — Business Consultant gallery | https://createtoday.io/examples?category=business-consultant | "Updated August 2026" | Curated, annotated live gallery of consultant sites, most skipping hero photography | Yes, as a pattern-confirmation reference, not a single example to capture in detail |
| Reuters/GIJN — "Making Trillions Make Sense" (write-up of Reuters' AI-economy graphics) | https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/ | Reported 2026 | Describes Reuters' node-link/flow-diagram approach to an otherwise unexplainable circular-financing story | The write-up itself is text; use as technique evidence — capture the underlying Reuters graphic separately if its direct URL is confirmed later |

## Now overused

- **Scrolljacking / hijacked native scroll** — the original, still-current complaint (Kosara's "scourge")
  every 2026 trend piece still has to caveat against. (nightingaledvs.com, svilenkovic.com)
- **Giant screen-grid case studies with no explanation** — flagged directly by a 2025–2026 portfolio-critique
  search result as a named mistake ("eight, ten, or even twenty screens stacked in a 3-column grid").
  Not this site's problem (it has no screens to grid), but confirms judges are actively penalizing the
  opposite failure mode too.
- **llms.txt as a silver bullet** — 2026 GEO commentary is already correcting an overclaim from earlier in
  the same year; treating a text file as sufficient for "AI recommends you" is now the outdated take, not
  the current one (otterly.ai).
- **Kinetic/animated typography as the default "no-photo" fallback** — flagged in trend coverage as
  widespread enough in 2025–2026 branding work that it now needs real craft (motion timing, restraint) to
  not read as a template effect (creativebloq.com, fontfabric.com).

## Costs and risks

- **Performance.** Heavy scrollytelling (JS-driven pinning/scrubbing across many steps) is explicitly
  called out in 2026 commentary as a common cause of poor mobile LCP and INP — directly in tension with
  this project's Definition of Done (Performance ≥95 mobile, LCP ≤1800ms, INP ≤200ms). Any step-through
  device must be built CSS-first (see C9) with a light JS/no-JS fallback, and measured, not assumed.
- **Browser support / progressive enhancement.** `ScrollTimeline`/`animation-timeline` is not Baseline
  per MDN's own live status (C9) — a from-scratch build needs a static fallback for unsupported browsers,
  which is extra implementation surface, not a drop-in.
- **Accessibility.** None of the sources found gave a measured axe/WCAG audit of scrollytelling
  specifically, but the project's own Definition of Done (zero serious/critical axe violations,
  `prefers-reduced-motion` honored) already requires this; any new step-through or generative visual
  must be built with a static, reduced-motion equivalent from day one — not retrofitted.
- **Honesty.** The single biggest risk for this specific site: fabricated or recreated screenshots of a
  client's real product are the one device every source (C6, C14) implicitly or explicitly treats as the
  line not to cross. A wireframe ghost of the site's own concept (not a claimed recreation of the actual
  client UI) is honest; a screenshot-styled mockup captioned or implied as the real product is not. Any
  device using document artifacts (RFP excerpts, contract terms) must use either genuinely public
  material (like C6's legislative text) or clearly labeled illustrative/composite text, never a
  fabricated excerpt presented as the real client document.
- **Which written site rule this would relax.** The project's current rule ("no stock photography,
  illustration, icon kits or 3D") does not by its text ban SVG diagrams, generative canvas/WebGL art tied
  to real numbers, or typographic treatments — those are a different category from "illustration." But a
  generative/WebGL exhibit (C7, C8) would be new technical surface (WebGL/canvas) beyond the current
  CSS/SVG-only motion vocabulary, and should get the same "second signature motion" scrutiny the
  motion-engineer already applies, even though it is a body exhibit rather than a page-level motion.

## What this site could take

1. **Study body exhibits — relationship/flow diagrams over paragraphs.** For rfp-engine's contract-
   finding-and-drafting story and guardicore's acquisition story, build one simple SVG node/flow diagram
   per study (client to RFP to AI-drafted response to contract value; or startup to product to acquirer),
   following Reuters' own rule (C3): diagram for relationships, chart for scale-over-time. Replaces a
   paragraph, not a photo, so it doesn't violate the no-stock-imagery rule.

2. **Study hero — a document-artifact opener for at least one study.** For ordani (HIPAA/compliance-
   driven CRM) or content-engine, open the study body with one real, genuinely non-confidential document
   type set as a typographic object — e.g., a redacted compliance-checklist item, an anonymized workflow
   step — modeled on C6's approach of using real, publicly defensible text rather than any invented
   client screenshot.

3. **Index entries — one small multiple per case study instead of a data-point list.** The site's own
   rule already caps index entries at four data points; render those four points as a tiny inline SVG
   small-multiple (four aligned bar/number marks) rather than four separate text stats, so /work's index
   reads as a visual system rather than a spec sheet.

4. **Featured-study entry — oversized numeral treatment.** Apply the site's existing Bricolage Grotesque
   display face at hero scale to the study's single headline number ($14M, $3M, 91%) as the dominant
   visual element of the featured-study card, per C13/C15's finding that typographic scale is the
   current, non-illustration answer to "no photo."

5. **Motion vocabulary — a CSS-first, reduced-motion-safe step-through for one study's process beat.**
   Address C15's named gap (competitor case studies have a process visual beat this site skips) with a
   short (3–5 step) CSS `scroll-timeline`-driven reveal, static-rendered by default and animated only
   where supported (C9), never pinning/scrolljacking the whole viewport — keeping inside the "punctuation,
   not spectacle" rule already in force.

6. **Study body exhibits — wireframe ghost, never a recreated screenshot.** Where a study needs to show
   what the software does (rfp-engine, ordani), use an abstract, clearly schematic wireframe (boxes,
   labels, no invented brand chrome) rather than any styled mockup that could be mistaken for the real
   product — the honesty line identified in C6/C14.

7. **AI discoverability plumbing — structured content before llms.txt.** Per C11/C12, prioritize
   semantic HTML, JSON-LD/schema on case studies, and clearly structured Q&A-style content over adding an
   llms.txt file as if it were sufficient on its own; if llms.txt is added at all, treat it as a minor,
   low-cost addition, not the AI-discoverability strategy.

8. **/work header — words-only confirmation, not a gap to fill.** Per C10, do not read the absence of a
   header photo/illustration on /work as a deficiency to patch with stock imagery or generic hero art —
   current 2026 consultant-site convention (per a live, continuously updated gallery) is a words-only
   header; the fix belongs in the index entries and study bodies (items 3, 4, 6), not the /work header.

## Sources

- https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/
- https://svilenkovic.com/3d/scrollytelling-trends-2026
- https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/
- https://www.bloomberg.com/graphics/2026-ai-circular-deals/
- https://www.bloomberg.com/graphics/2025-in-graphics/ (403 to WebFetch this session; reported via search snippet only)
- https://pudding.cool/
- https://pudding.cool/pudding-cup/
- https://pudding.cool/2026/07/essential-words
- https://pudding.cool/2026/06/mow
- https://pudding.cool/2026/05/similes
- https://pudding.cool/2025/12/motifs
- https://cj-robinson.github.io/trans-model-leg/
- https://visualrambling.space/dithering-part-1/
- https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/
- https://variable.io/works/
- https://basement.studio/showcase/harvey-from-seed-to-series-d
- https://clay.global/work/sky
- https://createtoday.io/examples?category=business-consultant
- https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline
- https://otterly.ai/blog/the-llms-txt-experiment/
- https://netkodo.com/case-studies/llmstxt
- https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026
- https://www.nngroup.com/articles/ux-design-portfolios/ (2019 — background/pre-2025, not a standalone citation)
- https://www.stryvemarketing.com/blog/design-b2b-case-studies/
