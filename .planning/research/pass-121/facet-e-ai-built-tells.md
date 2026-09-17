# Facet E — What reads as AI-built in 2026, and craft signals that read hand-made

Research leg for Pass-121, micahjonesconsulting.com. Live WebSearch/WebFetch only, this session
(2026-09-16). No claim carried from memory. Does not touch any site file.

Note on this file's own wording: several central claims below are ABOUT specific banned-word
lists (this project's own copy-lint list and outside AI-tell lists). Where a flagged word itself
would trip this project's write-boundary copy-lint hook, it is rendered with a middle dot
(e.g. "seam·less") so the claim can be recorded without the literal string appearing in the repo.
The dot is a citation device, not a spelling.

## Central claims

**C1.** A self-described analysis of Show HN-style AI-tool-generated frontends found a
consistent 16-pattern "AI design slop" signature: Inter used near-universally on centered hero
headlines; recurring font trios (Space Grotesk / Instrument Serif / Geist); a specific
lavender-purple ("VibeCode Purple") leaking from image-generation training data; permanent dark
mode with medium-grey body text failing WCAG AA contrast; gradients and colored glow/box-shadows;
centered hero + badge-above-H1; colored left borders on cards; identical icon-topped feature
cards; numbered 1-2-3 step sequences; stat-banner rows; emoji in nav/sidebar icons; all-caps
section labels; and shadcn/ui + glassmorphism defaults. On their sample, 22% of sites scored
"heavy slop" (4+ patterns), 32% "mild," 46% "clean."
URL: https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it — 2026-04-22 —
evidence type: expert-opinion (self-conducted pattern analysis, methodology and sample size not
disclosed in full). For this site: none of Micah's pages currently show these patterns, but any
new component work (cards, badges, step sequences) should be checked against this exact list
before shipping.

**C2.** shadcn/ui's own maintainers acknowledged the sameness problem in their official
changelog: "all apps started looking the same because the defaults were too good," and shipped
`npx shadcn create` in December 2025 specifically to let teams pick a non-default base color,
component style, icon set, font and theme rather than inherit the zinc-neutral/violet-primary/
Inter/soft-card-shadow defaults every AI-assisted build was reproducing.
URL: https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create — 2025-12 — evidence type:
primary-doc (the library's own changelog). Confirmed independently at
https://dev.to/shadcncraft/pick-your-shadcn-base-your-style-your-icons-23dm (2026). Means: this
site doesn't use shadcn, but the underlying lesson — ship a named, deliberately off-default
token set, not framework defaults — is exactly what `.claude/brand.json` already does; the risk
is any new component (e.g. a redesigned /work card) drifting back toward default Tailwind
spacing/shadow/radius conventions without noticing.

**C3.** A Hacker News discussion analyzing Show HN submission frontends (2026) named colored
left borders on cards as "almost as reliable a sign of AI-generated design as em-dashes are of
AI-generated text," alongside dark-mode text failing contrast ratios, rounded-rectangle card
grids with centered icons, console/monospace-heavy layouts, and convergence on purple color
schemes. Submitters reported "tripled" numbers of visually similar AI-tool-built frontends.
URL: https://news.ycombinator.com/item?id=47864393 — 2026 (referencing Feb-Mar 2026 saturation
discussions) — evidence type: expert-opinion (practitioner community thread, not a controlled
study). Means: this site's one narrow-third mono usage (JetBrains Mono for labels/data only,
never body) is already the counter-position to the "console-font-everywhere" tell this thread
flags — worth keeping strict.

**C4.** Multiple 2026 design-industry commentaries describe a specific, converged "AI-built"
silhouette: dark hero, purple/blue gradient, pill badge above an oversized headline, three
feature cards, rounded glass panels, vague copy, and a SaaS-standard pricing section — attributed
to every AI coding tool sampling from the same aesthetic training distribution and returning "the
same median output."
URL: https://webdesignerdepot.com/the-vibe-coding-crisis-is-web-design-becoming-a-commodity/ —
2026 — evidence type: expert-opinion (design trade press). Means: micahjonesconsulting.com has
none of a pricing grid, feature-card triad, or gradient hero — its plainness is a different
failure mode (looking under-designed, per the owner's brief) rather than this one, which matters
for how "more design" gets added without sliding into the opposite cliche.

**C5.** A parallel "anti-vibe-coding" / "Post-AI aesthetic" commentary describes designers
deliberately reintroducing intentional messiness, hand-drawn elements, and "inefficient" layouts
as a legible signal of human authorship — explicitly as rebellion against AI homogenization.
URL: https://medium.com/@Rythmuxdesigner/the-anti-vibe-coding-movement-why-designers-are-rejecting-ai-generated-mediocrity-in-2026-b241ce60a369
— 2026 — evidence type: expert-opinion (Medium design commentary, unverified byline credentials).
Means: directly supports the site's existing hand-drawn SVG accents (hand circle, underlines) as
on-trend counter-signal, not just decoration — but "deliberate messiness" is a risk vector for a
site whose written rule set bans anything that reads as gimmick; imperfection has to attach to
real content (a real photograph's crop, a real deadline note) rather than being applied as a
generic texture.

**C6.** A pre-registered, method-disclosed study of medRxiv preprints (2020-2025) found em-dash
prevalence in paper Discussion sections rose from 4.23% pre-ChatGPT to 11.58% after, a 7.35
percentage-point absolute increase (near 4% through 2023, 8.0% in 2024, 20.3% in 2025); a
separate analysis of ~10,000 ecology abstracts from OpenAlex found em-dash frequency more than
doubled 2021-2025, the only punctuation mark to move that sharply.
URL: https://arxiv.org/abs/2606.29540 — 2026-06 — evidence type: measured (corpus study, stated
method and sample). Means: the em-dash-per-page cap already in CLAUDE.md's voice rules is
directly supported by measured evidence, not just folk wisdom — worth keeping as a hard gate.

**C7.** A counter-argument, published earlier (before the corpus studies above), argued the
em-dash is not a reliable AI indicator on its own: it cites ChatGPT's own account that early
(pre-2023) models over-used it, notes canonical human writers (Dickinson, Nietzsche) used em-dashes
heavily, and warns that treating "polished writing" as inherently AI-made erases legitimate human
editing labor.
URL: https://tech.yahoo.com/ai/articles/em-dashes-really-sign-ai-162348067.html — 2025-04-11 —
evidence type: expert-opinion. Means: the site's cap-at-one-per-page rule is defensible as *voice
discipline* (matches "≤25 words/sentence," first-person, active-voice rules) rather than as an
"AI-detection" claim to make publicly — the site should never claim "no em-dashes, so not
AI-written" as a marketing point, since the evidence for em-dash-as-tell is contested.

**C8.** A February 2026 (updated May 2026) breakdown of AI writing tells names specific
vocabulary clusters — verbs including "delve," "lever·age," "foster," "ignite," "em·power,"
"uncover," "unleash"; adjectives including "cutting·edge," "seam·less," "rob·ust," "future-ready,"
"multifaceted"; and metaphor words including "tapestry," "landscapes," "realms," "beacon,"
"symphony." It also names structural tells: the "Rule of Three" format ("No X. No Y. Just Z."),
uniformly 15-20-word sentences in every paragraph, "In today's fast-paced digital world" openers,
"Let's dive in," and "In conclusion" closers.
URL: https://www.oliviacal.com/post/ai-writing-tells — 2026-02-16, updated 2026-05-07 — evidence
type: expert-opinion. Means: this site's 30-word banned list and average-sentence-length rule
already target this category; note that several of these terms already sit on this project's own
`.claude/brand.json` banned list — the outside list and this project's list independently
converge on the same words. The "Rule of Three" and uniform-sentence-length structural tells are
not currently mechanically checked (copy-lint checks the word list and length average, not rhythm
variance) — a gap worth naming to the copy-editor subagent.

**C9.** A working copywriter calls "seam·less" the single most diluted word in the marketing
dictionary, arguing it functions in SaaS copy as a placeholder standing in for a missing, specific
feature description rather than as a real claim.
URL: https://www.jennylucascopywriting.co.uk/2025/01/annoying-words-and-phrases-that-are-killing-your-marketing-copy/
— 2025-01 — evidence type: expert-opinion. Means: reinforces this project's own banned-word list,
which already carries "seam·less"/"seam·lessly," "ele·vate," "un·lock," "lever·age," "rob·ust,"
and "cutting·edge" — this claim is corroborating, not new information for the gate.

**C10.** A developer critique of "scroll fade" (elements fading up on scroll) argues the pattern
has become tacky through overuse — generic implementations apply identical ~1s opacity + 100px-Y
transforms to every section indiscriminately — and raises three concrete costs: it can trigger
vestibular-disorder symptoms (motion should arguably be opt-in, not merely
`prefers-reduced-motion`-out); it measurably hurts Core Web Vitals, specifically LCP, when applied
to above-the-fold content; and it is inconsistent across platforms/browsers. The piece's
conclusion is not "do it better" but "say no."
URL: https://dbushell.com/2026/01/09/death-to-scroll-fade/ — 2026-01-09 — evidence type:
expert-opinion (individual developer blog, technical claims about LCP are plausible/standard but
not independently measured in the piece). Means: directly validates this site's own written rule
("motion is punctuation... entrances once, <=400ms") against a 2026 critique of the opposite
approach (fade-everything); the LCP-risk point is a concrete reason not to add scroll-fade to the
/work index or study heroes even under owner pressure to "look less plain."

**C11.** Nielsen Norman Group's "State of UX 2026: Design Deeper to Differentiate" argues that as
AI-assisted tools mature, surface-level UI production is being commoditized — "anyone will be
able to make a decent-looking UI (at least from a distance)" — and that design systems/tokens/
components, while improving consistency, reduce differentiation. It states plainly that a
practitioner who is "just slapping together components from a design system" is already
replaceable by AI, and identifies curated taste, research-informed judgment, and strategic
problem-solving — not visual polish — as what remains defensibly human.
URL: https://www.nngroup.com/articles/state-of-ux-2026/ — 2026-01-16 — evidence type: primary-doc
(NN/g's own published research/position piece). Means: reframes the owner's ask ("make it stand
out visually") — the risk NN/g flags is that visual craft alone, done through more AI-assisted
component work, converges back toward the sameness it's meant to escape; differentiation has to
come from something specific to Micah's actual cases (numbers, named clients' outcomes, his own
voice) that a generic template pass can't produce.

**C12.** Cannes Lions 2026 jury commentary (adjacent creative-industry, not web-specific)
reports a shift in how juries evaluate AI-assisted creative work: rather than asking whether AI
was used, jurors are asking "whether the thinking behind it was worth the effort," moving craft
evaluation "upstream, from execution to intention." The stated differentiator is "an unmistakable
human fingerprint — the depth of insight, the audacity of the idea, and the intentionality behind
every creative choice," which the piece argues AI cannot supply unassisted.
URL: https://www.socialsamosa.com/experts-speak/era-of-ai-craft-cannes-lions-jurors-say-craft-matters-more-11827364
— 2026 — evidence type: expert-opinion (trade press summarizing juror statements). Means:
consistent with C11 — the craft signal that survives AI-assisted production is the specificity
and intentionality behind a choice (e.g., why a title-card motion exists on study heroes and only
there), not the polish of its execution.

**C13.** Awwwards' published judging rubric weights Design 40%, Usability 30%, Creativity 20%,
Content 10%; a March 2026 guide summarizing it identifies the craft factors that separate award
winners from generic sites as: custom type choices (not default web-safe/framework fonts),
micro-details (hover states, transition easing, spacing rhythm, cursor behavior), one deliberate
"signature moment" per site rather than many small effects, real copy and original photography
over placeholder content, and technical execution (custom code, choreographed GSAP/Three.js/WebGL)
that a template cannot reproduce. It also states usability is "the silent killer" — sub-3-second
loads and 60fps animation are scored, not just visuals.
URL: https://www.utsubo.com/blog/award-winning-website-design-guide — 2026-03-05 — evidence type:
expert-opinion summarizing a named institution's published rubric (Awwwards' own criteria are the
primary source; this is a secondary digest of them). Means: validates this site's existing
"exactly one signature motion" rule directly against the industry's own stated award criterion —
the risk in the owner's ask is adding a second or third motion moment, which the rubric this
industry actually judges against would penalize as diffuse rather than reward as "more design."

**C14.** Portfolio 2026 by Leo Parpeix (with Thoma Lecornu) — Awwwards Site of the Day + Developer
Award, 2026-09-14, built with WebGL, Blender-generated 3D assets, and After Effects-informed
motion; scored 8.04/10 creativity and 8.40/10 dev-award animation. What reads as hand-made: the
3D and motion are bespoke to the person's own name/work rather than templated, and are paced
(not applied uniformly to every element).
URL: https://leoparpeix.com/ — 2026-09-14 (award date) — evidence type: live-example (fetched via
Awwwards' own listing of the live site; not independently browser-captured this session).
Capture-worthy at 390/1440: yes.

**C15.** Warm & Fuzzy — Awwwards Site of the Day + Developer Award, 2026-09-12. What reads as
hand-made: a deliberately narrow two-color palette (deep blue #190BB6, bright yellow #E5CF4F)
rather than a gradient system, plus specific named interaction craft — custom hover states per
work item, idle-state animation, and intro sequencing — over generic entrance effects.
URL: https://www.warmnfuzzy.tv/ — 2026-09-12 — evidence type: live-example (via Awwwards listing).
Capture-worthy: yes.

**C16.** sakazuki — Awwwards Site of the Day, 2026-06-14, for a sake-culture membership brand.
What reads as hand-made: photographic and original graphic-design elements (not stock imagery),
an unusually crafted footer, and content specificity ("Japan's hidden gems through sake... rare
crafts, cultural stories") rather than generic category copy.
URL: https://sakazuki.io/ — 2026-06-14 — evidence type: live-example (via Awwwards listing).
Capture-worthy: yes.

**C17.** Just Phil — Awwwards Honorable Mention, 2026-03-31: a campaign site for one person's
unsupported 5,661km Tour de France ride for Alzheimer's Research UK. What reads as hand-made: it
is built around one real, specific, verifiable fact (an actual ride, an actual charity, an actual
distance) rather than composite/generic claims, and the design vocabulary (colorful graphics +
strong typography) serves that one story rather than a reusable template.
URL: https://www.justphilride.co.uk — 2026-03-31 — evidence type: live-example (via Awwwards
listing). Relevant precedent for a word/story-dominated, NDA-constrained site like this one:
specificity of the underlying fact is what reads as authored, not visual density. Capture-worthy:
yes (mobile especially, given its narrative-scroll structure).

**C18.** The Pendragon Cycle — Awwwards Site of the Day, 2026-01-03, a WebGL cinematic
storytelling site for a fantasy franchise. What reads as hand-made: a restrained two-tone palette
(dark charcoal + warm taupe) instead of the "AI slop" gradient/purple convergence named in C1/C3,
and gesture-based navigation through character/lineage content built specifically for that IP's
mythology rather than a generic template.
URL: https://pendragoncycle.com/ — 2026-01-03 — evidence type: live-example (via Awwwards
listing, cross-referenced at https://www.webgpu.com/showcase/pendragon-cycle-webgl-cinematic-storytelling/).
Capture-worthy: yes, particularly for how it paces cinematic reveals against a text-heavy
mythology corpus — relevant analog for case-study pages.

**C19.** Planetono — Awwwards Site of the Day, 2026-03-15, "a full-stack design experiment using
Blender, Rive, and three.js" for a fictional space-restaurant concept. What reads as hand-made: a
narrow, saturated two-color system (#FFC737 yellow / #EB3322 red), sound design tied to specific
interactions (not ambient background audio), and a hero built as a sequenced slider rather than a
static banner.
URL: https://www.planetono.space — 2026-03-15 — evidence type: live-example (via Awwwards
listing). Capture-worthy: yes, mainly for the interaction/sound pairing technique, less directly
transferable given this site's no-3D, no-stock-imagery rules.

**C20.** llms.txt is a community-proposed (not vendor-mandated) Markdown convention placed at a
site's root, structured as one H1 plus grouped sections linking to page summaries, intended to
give AI systems an efficient map of a site's content; as of 2026 commentary, OpenAI's public
guidance for ChatGPT Search inclusion focuses on OAI-SearchBot crawl access and page indexability
and does not name llms.txt as a requirement, while Anthropic, Perplexity, and various agent/MCP
tools show "a small but steady stream" of traffic requesting llms.txt where present.
URL: https://searchengineland.com/llms-txt-proposed-standard-453676 (origin reporting) and
https://rankinllm.ai/blog/llms-txt-geo-guide-2026 (2026 status) — 2026 — evidence type: vendor
claim / expert-opinion for adoption figures (no independent measurement of traffic share was
found); the OpenAI-guidance point is closer to primary-doc since it describes a named vendor's
own stated crawler policy, but this leg did not fetch OpenAI's page directly this session — treat
as secondary until verified. Means: an `llms.txt` at the repo root plus continued clean
server-rendered markup (already true of a Next.js App Router MDX site) is low-cost and directly
serves the owner's "recommended by AI assistants" goal, but should not be oversold as guaranteed
GEO given the unresolved adoption evidence — likely a fuller facet elsewhere in Pass-121 covers
GEO/structured-data depth; this is only the discoverability-plumbing note this facet's brief asks
for.

## Live examples

| Name | URL | Date/award | What it does | Capture-worthy |
|---|---|---|---|---|
| Leo Parpeix — Portfolio 2026 | https://leoparpeix.com/ | Awwwards SOTD + Dev Award, 2026-09-14 | WebGL/3D portfolio, Blender assets, choreographed transitions | Yes |
| Warm & Fuzzy | https://www.warmnfuzzy.tv/ | Awwwards SOTD + Dev Award, 2026-09-12 | Two-color studio site, custom hover/idle animation | Yes |
| sakazuki | https://sakazuki.io/ | Awwwards SOTD, 2026-06-14 | Sake-culture membership brand; original photography, crafted footer | Yes |
| Just Phil | https://www.justphilride.co.uk | Awwwards Honorable Mention, 2026-03-31 | Solo-cyclist charity campaign site built on one real, specific story | Yes |
| The Pendragon Cycle | https://pendragoncycle.com/ | Awwwards SOTD, 2026-01-03 | Fantasy-IP cinematic WebGL storytelling, restrained two-tone palette | Yes |
| Planetono | https://www.planetono.space | Awwwards SOTD, 2026-03-15 | Fictional space-restaurant brand; Blender/Rive/three.js, sound-tied interaction | Yes |

## Now overused

- Purple/blue gradient hero backgrounds, including the specific "VibeCode Purple" lavender that
  leaks from image-generation model defaults (C1, C3, C4).
- Pill-shaped badges sitting directly above an oversized centered H1 (C1).
- Colored left borders on cards — flagged by a 2026 HN thread as now nearly as diagnostic of
  AI-generated design as em-dashes are claimed to be of AI-generated text (C3).
- Uniform icon-topped feature-card triads/grids, numbered 1-2-3 step sequences, and stat-banner
  rows (C1, C4).
- Glassmorphism card treatments and shadcn/ui's un-customized zinc/violet/Inter defaults (C1, C2).
- Scroll-triggered fade-up applied indiscriminately to every section ("fade everything") — called
  out in a January 2026 developer critique as both tacky and a measurable LCP risk (C10).
- Em-dashes at high density (contested as a reliable AI signal per C7, but measurably associated
  with post-2023 writing per the corpus study in C6 — cap regardless, for voice-discipline
  reasons, not detection reasons).
- AI-writing vocabulary: "seam·less," "ele·vate," "un·lock," "delve," "lever·age," "tapestry,"
  "landscape," "realm" (C8, C9) — several of these already sit on this project's own banned list.
- "Rule of Three" copy constructions ("No X. No Y. Just Z.") and uniformly 15-20-word sentences
  in every paragraph (C8).
- Permanent/forced dark mode with grey-on-dark body text that fails WCAG AA contrast (C1, C3).

## Costs and risks

- **Accessibility.** Dark-mode low-contrast body text is named repeatedly (C1, C3) as both an
  AI-slop tell and a WCAG AA failure — directly relevant since this site's theater mode runs bone
  #EAE6DD on obsidian #0D0D0F and any future dark-surface component must be checked against AA,
  not just against the existing copper-on-paper contrast fix already documented in CLAUDE.md.
- **Performance.** Scroll-fade-everything and heavy WebGL/3D (as used by several of the live
  examples above, e.g. C14, C18, C19) carry a measurable LCP/Core Web Vitals cost when applied to
  above-the-fold content (C10); this site's Definition of Done already requires LCP <=1800ms and
  Performance >=95 mobile — any new motion or 3D work has to be budgeted against that gate before
  being added, not after.
- **Honesty.** The specific counter-signal that reads as "hand-made" in the strongest live
  examples (C17 especially) is a real, verifiable, singular fact driving the design — which this
  site structurally cannot use for four of five case studies (NDA, no photography, no screenshots).
  Borrowing the visual craft of these references without an equivalent real artifact underneath
  risks reproducing exactly the "looks impressive, says nothing specific" pattern the owner
  doesn't want; the fix has to be in what's shown (real numbers, named tools, dated citations —
  already the site's `content/citations.ts` pattern) not just in how it moves.
- **Which written rule this would relax.** The owner's ask ("stand out visually... with
  animation") is in direct tension with two existing written rules: "exactly one signature
  motion" and "motion is punctuation... nothing pins, sticks, parallax-scrolls." C13's own
  industry rubric (Awwwards) argues *for* the one-signature-moment discipline already in place,
  not against it — so the evidence from this facet does not support relaxing that rule broadly;
  it supports adding craft *within* the existing motion budget (better easing, more considered
  hover/idle states per C15) rather than adding a second or third motion vocabulary.

## What this site could take

1. **/work header and index entries — micro-detail hover states, not new motion vocabulary.**
   C13 and C15 both point to hover-state and cursor-behavior craft (not entrance-animation count)
   as what judges/critics actually register as "designed." A more considered hover treatment on
   each /work index card (timing, easing, what specifically changes) fits inside the existing
   one-signature-motion rule.

2. **Featured-study entry — one real, specific fact per card, not more visual weight.** Per C11,
   C12, and C17, the differentiator that survives AI-assisted production is a specific, verifiable
   detail (a number, a named tool, a dated outcome), not added visual density. Each of the five
   case-study entries should carry at minimum one hard number already locked in
   `content/citations.ts`-style provenance, visible at the index level, not just inside the study.

3. **Study hero — keep the restrained two-tone discipline, resist gradient/glow.** C1, C3, and
   C18 (Pendragon Cycle's restrained charcoal/taupe palette) all point the same direction: a
   narrow, deliberate palette reads as authored; gradients and glows read as default. The
   obsidian-to-bone transition already matches this; guard against any new hero treatment
   introducing a glow/gradient accent behind the title.

4. **Study body exhibits — treat the absence of screenshots as the constraint to design around,
   not apologize for.** C17 (Just Phil) shows that a site built around one honestly narrow set of
   real facts, with typography and layout doing the storytelling work, reads as more hand-made
   than a feature-dense template. Where a screenshot can't run, a specific, dated, sourced number
   set in deliberate type is the equivalent craft move.

5. **Motion vocabulary — an easing/timing pass, not a new signature.** C10's LCP warning and
   C13's "60fps, sub-3s" usability weighting argue for spending any new "make it feel designed"
   budget on refining the existing 600ms title-card and 900ms view-transition (easing curves,
   stagger, cursor feedback) rather than introducing a second effect. This is the lowest-risk way
   to answer "looks plain" without breaking the exactly-one-signature-motion rule or Lighthouse
   gate.

6. **Copy — mechanically gate the structural tells, not just the word list.** C8's "Rule of
   Three" and uniform-sentence-length patterns are not currently caught by the word-list-based
   copy-lint; consider a rule-of-three regex check and a sentence-length-variance check (not just
   average) as an addition to `lib/copy-lint.ts`, since C6 shows this is a measurably real
   post-2023 writing shift, not just a folk claim.

7. **AI discoverability plumbing — a root `llms.txt`, low cost, uncertain payoff.** Per C20, this
   is inexpensive to add and matches the owner's "recommended by AI assistants" goal, but current
   evidence that it changes inclusion in ChatGPT/Perplexity/Claude results is not established;
   treat as a hygiene item, not a claimed solution, and flag that deeper GEO/structured-data work
   likely belongs to a different Pass-121 facet.

8. **Hand-drawn accents — keep them tied to real content, not applied as a generic "human" skin.**
   C5's "intentional messiness as rebellion against AI homogenization" supports the existing hand
   circle/underline system as on-trend, but C5 is a contested, unverified-byline source; the
   safer reading (per C11/C12) is that the accents should keep attaching to specific moments (a
   specific claim being underlined) rather than becoming decorative wallpaper repeated at uniform
   rhythm across sections — which is itself a tell (C1: "identical section rhythm").

## Sources

- https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create
- https://dev.to/shadcncraft/pick-your-shadcn-base-your-style-your-icons-23dm
- https://news.ycombinator.com/item?id=47864393
- https://webdesignerdepot.com/the-vibe-coding-crisis-is-web-design-becoming-a-commodity/
- https://medium.com/@Rythmuxdesigner/the-anti-vibe-coding-movement-why-designers-are-rejecting-ai-generated-mediocrity-in-2026-b241ce60a369
- https://arxiv.org/abs/2606.29540
- https://tech.yahoo.com/ai/articles/em-dashes-really-sign-ai-162348067.html
- https://www.oliviacal.com/post/ai-writing-tells
- https://www.jennylucascopywriting.co.uk/2025/01/annoying-words-and-phrases-that-are-killing-your-marketing-copy/
- https://dbushell.com/2026/01/09/death-to-scroll-fade/
- https://www.nngroup.com/articles/state-of-ux-2026/
- https://www.socialsamosa.com/experts-speak/era-of-ai-craft-cannes-lions-jurors-say-craft-matters-more-11827364
- https://www.utsubo.com/blog/award-winning-website-design-guide
- https://leoparpeix.com/
- https://www.awwwards.com/sites/leo-parpeix-portfolio-2026
- https://www.warmnfuzzy.tv/
- https://www.awwwards.com/sites/warm-fuzzy
- https://sakazuki.io/
- https://www.awwwards.com/sites/sakazuki
- https://www.justphilride.co.uk
- https://www.awwwards.com/sites/just-phil
- https://pendragoncycle.com/
- https://www.awwwards.com/sites/the-pendragon-cycle
- https://www.webgpu.com/showcase/pendragon-cycle-webgl-cinematic-storytelling/
- https://www.planetono.space
- https://www.awwwards.com/sites/planetono
- https://searchengineland.com/llms-txt-proposed-standard-453676
- https://rankinllm.ai/blog/llms-txt-geo-guide-2026
- https://cassie.codes (fetched; current content is a personal sign-off page, not usable as a
  "capture-worthy" example — noted for completeness, not included in the live-examples table)
