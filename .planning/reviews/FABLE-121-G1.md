# FABLE-121-G1: the reference set, the capture rubric, the take-list ruling, the two audits

Fable 5.1, 2026-09-16, gate G1 of Pass-121 DIRECT. Twelve tool calls. Inputs: FABLE-121-G1-INPUT.md,
SYNTHESIS.md (with the input's four corrections applied), FABLE-120-DESIGN.md sections 2 and 5,
DESIGN_BAR.md sections 4 and 6, brand.json `motion`, and six captures: s1-work-1440, s2-work-390,
s3-guardicore-1440, s5-birth-ordani-1440, s7-body-390 (all Pass-120 build) and home-exits-1440
(Pass-116). No web research, no builds, no source edits.

This file is written for three readers: the Sonnet capture leg (section 1 and 2 are its brief,
section 4 is its audit brief), the Opus 5 main session (section 3 is the ruling it plans G2 from),
and my own G2 call (section 5 says what I expect to receive). It stands alone; nobody needs the
transcript.

Plain markdown. No emoji. No em-dashes.

---

## 0. What the captures show, and the ruling principle for the pass

Before any reference says anything, here is what the live Pass-120 build looks like next to the
home page it belongs to.

- **/work at 1440 (s1).** A dark-free paper page: the Guardicore band (mono context, `$14M` at 112,
  the dek, a paragraph, the service label, the clip at right), the method line at display size,
  then four entries in one identical shape: hairline, mono context, Bricolage figure line on the
  left, Hanken sentence on the right, mono service label, hairline. The record block repeats the
  same shape with the company name where the figure line was. Every entry is the same shape at the
  same size. That is a table, not an index. A table is why it reads plain, and it is clean in the
  way a machine is clean. The operator's read ("clean but very plain and weak") is accurate.
- **Home at 1440 (home-exits).** The site already has an identity: uppercase Bricolage at display
  size (`THE STORY THE MARKET REPEATS.`, `THE RECEIPTS.`), grain on espresso, mono data rows set as
  a ledger, and the hand-drawn circle around `$20M+`. /work and the five studies use none of the
  four: sentence-case headings, flat paper, no hand mark, no ledger density. The site has a voice;
  /work is not speaking it. That is the first thing G2 fixes, before any new motion.
- **Studies at 1440 (s3, s5).** The band now names the client and the result in the first fold,
  which repairs FABLE-120's largest finding. Below the copper rule the body is h2, three
  paragraphs, h2, three paragraphs, in a 68ch column that leaves the right 40 percent of a 1440
  screen as empty bone. The only exhibit on any study is the RFP typographic block (s7). The only
  image is the band photograph, where one exists. A skimmer gets the at-a-glance block and then
  nothing until the close. "Word dominated" is accurate for the body.
- **At 390 (s2, s7).** Everything stacks correctly. Nothing breaks. Nothing is memorable either.
- **One thing to check live.** s1 bottom-right shows the clip with a native control bar (`0:00`,
  mute, fullscreen). brand.json `motion.heroclip` says no controls. Audit (a) confirms on the live
  domain; it may be a hover artifact of the capture.

**Ruling principle.** The site's problem is not that it has too many rules. It is that /work and
the studies do not speak the home's language and have no exhibits. The order of moves for G2:

1. Bring the home's display voice (uppercase Bricolage at display scale), its ground treatment and
   its one hand-drawn mark to /work. This costs no rule and is where the "not built by AI" answer
   mostly lives: a site with one authored voice on every page is attributable (R20).
2. Give every study one to three authored exhibits in the same hand: a relationship diagram, a
   quoted document with its source, a typographic figure. Static first.
3. Add motion in exactly three places: the featured entry's shared-element morph into its study
   (inside the existing dim), one hover grammar for the whole index, and at most two once-only
   in-view reveals per page. Nothing scrubbed by scroll, nothing looping, nothing following the
   cursor. These are the moves the 2026 award sites in the set actually make; the ones this site
   bans are the ones the same sites have stopped making.
4. Plumbing (robots, JSON-LD, llms.txt) as hygiene, reported as hygiene.

Anything beyond that (a draw-in on the hand mark, a scroll-scrubbed reveal, an animated diagram) is
stated to the operator once at G2 by popup with the rule named and the cost, and his answer is
recorded. The research and this ruling say how and at what price; they do not hand him back the
page he called underwhelming.

---

## 1. The reference set: 15 across three classes

Four are additions outside the pool (marked ADD), each with a fallback. The capture leg verifies
liveness, swaps in the fallback only if the primary is dead (non-200, parked, redirected to a
different domain, or a login wall), and never substitutes a third. Nothing here is in Pass-120's
fourteen.

Slug convention: `<class>-<site>-<page>`. Captures and rubric answers go to
`.planning/research/pass-121/set/` (see section 2.3).

### Class A: studio work indexes with real motion and interaction craft (4)

| Slug | URL to capture | Fallback | What to look at and scroll to | The one mechanism I expect to take |
|---|---|---|---|---|
| a-locomotive-work | https://locomotive.ca/en/work | none (pool, verified live) | How the page opens (heading, intro line, count). Card anatomy at 1440: image, name, tags, the award or outcome line. Hover one card and record what moves and for how long. Note the filter row but do not take it. Scroll the first three rows and the page foot. At 390: stacking, whether the award line survives. | The inline award or outcome line as ONE mono line inside the entry, and the hover grammar (property, duration, easing). Not the filterable grid (avoid list). |
| a-bakkenbaeck-work | https://bakkenbaeck.com/work | none (pool, verified live) | Entry anatomy: how many crops per card, the text under. Whether card sizes or shapes vary down the page or repeat. Hover. At 390. | Variance in entry size and shape as index rhythm without a hero. The crops themselves are budget (24 clients). |
| a-iventions-home | https://iventions.com | none (pool, award verified; tech unverified) | Is the index one project fully framed at a time? What paces it: scroll-snap, a pinned section, or plain stacking? Check DevTools for `<canvas>`; run the animations snippet (2.2). At 390. | The pacing (one entry at a time) only if it is achieved without pin or snap. If it is canvas or WebGL, or pinned, record it as rejected with the reason and move on. |
| a-portorocha-index (ADD) | https://portorocha.com (the index is the homepage; capture a /work route instead if one exists) | https://area17.com/work | A text-list work index: list item type size, the hover reveal of the image, the grid at 1440, whether the list keeps its scale at 390. | Type as the index: entries set at display scale in a list, with the image as a secondary hover event rather than the entry's body. |

### Class B: case studies made visual without photography (6)

| Slug | URL to capture | Fallback | What to look at and scroll to | The one mechanism I expect to take |
|---|---|---|---|---|
| b-pudding-similes | https://pudding.cool/2026/05/similes | https://pudding.cool/2025/12/motifs (pool alternate) | The opening fold. The first typographic figure: how text becomes a figure (size by count, grouping, colour, mono label). Whether the first step is pinned or flows. At 390. | Text set as a figure: a phrase given data treatment. Transfers to the RFP "one requirement, start to finish" block and the ORDANI claims comparison. |
| b-pudding-essential-words | https://pudding.cool/2026/07/essential-words | https://pudding.cool/2025/12/motifs (pool alternate) | The small-multiples panel. The annotation style (pointed labels). The before/after device. How small multiples stack at 390. | Annotated small multiples for change over time. Transfers to bookings one-to-three to five-to-ten (birth worker) and to the Guardicore pipeline change. |
| b-cjrobinson-transmodel | https://cj-robinson.github.io/trans-model-leg/ | none (pool, verified live) | How quoted public-record text is set as the visual object: size, highlight, the source line. The one static ai2html map. Column width. At 390. | Quoted text as exhibit with a source line. Transfers to the RFP study if a public procurement requirement is used (take-list 13). |
| b-pentagram-reddit | https://www.pentagram.com/work/reddit | none (pool, verified live) | The conversation-bubble motif doing structural work: framing quotes, marking section breaks. Count uses per screen. Does it animate. Note the photo and video (budget). | One motif family used structurally three or four times per page. The model for the hand-drawn voice on studies (take-list 10). Pattern reference, not a 2026 example. |
| b-bloomberg-ai-deals | https://www.bloomberg.com/graphics/2026-ai-circular-deals/ | The Reuters graphic on the same story (AI circular deals, Jan 2026); one search on reuters.com/graphics to locate it is permitted, nothing else | Needs a real browser (plain fetch 403s). If a paywall blocks, capture what renders and note it. The node-link diagram: node, label and edge styling; how it introduces itself; whether it animates on scroll; the legend. How it reflows at 390. | A static relationship diagram with mono labels and one accent. Transfers to the RFP flow (take-list 11). |
| b-basecamp-shapeup (ADD) | https://basecamp.com/shapeup/1.3-chapter-04 (the chapter "Find the Elements"; if the URL pattern differs, reach it from https://basecamp.com/shapeup) | https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/ | Hand-drawn diagrams inside a long read: how they sit in the column, their line weight against the type, the caption, how many per chapter. At 390. | A diagram in the author's own hand inside a reading column, one per section at most, the same drawing voice as this site's circle. |

### Class C: solo operators and small consultancies that do not read as templates (5)

| Slug | URL to capture | Fallback | What to look at and scroll to | The one mechanism I expect to take |
|---|---|---|---|---|
| c-antonsten-home | https://antonsten.com | none (pool, verified live) | The fold: the offer sentence, how the person shows up. The work tiles (stacked images), the testimonial block, the client band (record; do not take). Type system. At 390. | How a solo consultant stacks proof types within one screen without a case-study page. Not the logo band (R13, project ban). |
| c-tomcritchlow-home | https://tomcritchlow.com | none (pool, verified live) | The fold, the index of writing and work, type scale. 1440 first fold and one scroll only; 390 first fold only. | Nothing visual. This is the calibration point for audit (a): human, undesigned, plain. An AI-tell audit must not mistake plainness for template. |
| c-buzzusborne-home | https://buzzusborne.com | none (pool, verified live) | The six-tile Recent Work: tile anatomy, static versus video, hover. The offer sentence. At 390. | The tile as the demonstration: a designer's own index proves design skill in the entries themselves (the operator's "did it for the birth worker" point). |
| c-draftnu-home (ADD) | https://draft.nu | https://jonathanstark.com | The fold, the named productized offer, the typography, how proof is shown without a logo wall, any results section. At 390. | Voice-led, typographic solo-consultancy page with named offers and no template tells: the register for /work's heading and description. |
| c-emilkowalski-home (ADD) | https://emilkowal.ski | https://rauno.me | Every motion on the page with trigger and duration (run the animations snippet; hover list items). The type. At 390. | The micro-interaction grammar for index entries (take-list 6): one easing, one duration, transform and opacity only. This is the outer bound of the craft register (a developer's site); the copy voice is not to be taken. |

Count: A 4, B 6, C 5, total 15. Additions: a-portorocha-index, b-basecamp-shapeup, c-draftnu-home,
c-emilkowalski-home.

### Pool entries rejected, one line each

- unseen.co: a bespoke 3D project-ring asset per case; 3D budget.
- by-kin.com: photography-driven; this site has two photographs.
- awwwards.com/cuberto/: the URL is an Awwwards profile, not work; the Agency of the Year claim is stale.
- resn.co.nz: WebGL shell to fetch; the document-as-artifact idea is carried in section 3.5 (gaps), not captured.
- brand.ivress.co.jp: WebGPU renderer; 3D.
- shopify.com/editions/spring2026: a product-catalog scroll sequence; e-commerce budget, not a work index.
- sleep-well-creatives.com: commissioned illustration set; illustration is banned.
- cartier.com/watchesandwonders: 3D alcoves and a Web Audio score; luxury budget.
- pudding.cool/2025/12/motifs: third Pudding; kept as the alternate for the two Pudding entries above.
- visualrambling.space/dithering-part-1/: 160,000 GPU-instanced cubes; GPU budget, 3D.
- variable.io/works/: a vendor portfolio of decorative generative work, not an account of an engagement.
- leoparpeix.com: Blender 3D transitions.
- warmnfuzzy.tv: an animation studio's showreel site; the two-colour lesson is already this site's copper-on-paper.
- theycallmegiulio.com: WebGPU/TSL shader work; the pool's own outer-bound caution.
- joseph-san.com: GPU-instanced 3D navbar; same.
- sakazuki.io: a membership brand's site, photography-led; not an operator.
- justphilride.co.uk: a one-off campaign site; the one-fact typographic lesson is covered by CJ Robinson and the Puddings.
- pendragoncycle.com: WebGL cinematic franchise site.
- planetono.space: Blender, Rive and three.js; 3D.
- Oryzo, uncommonstudio.com.au, matvoyce.tv: already dropped by the verifiers (satire, moved domain, unresolved redirect).

---

## 2. The capture rubric

One rubric, used for every reference in section 1 and for audit (a) on the live site. The leg
answers every question from the captures and DevTools, at 390 and 1440, in a markdown file per
slug. Where a question does not apply (a class C homepage has no study to open), write `n/a`
and say why in five words.

### 2.1 The eleven questions

1. **Index shape.** List, grid, cards, or one-at-a-time? Entries visible in the first fold at 1440
   and at 390. Data points per entry (count them; name them). Does the index have a rhythm break (an
   entry of a different shape or size, a full-bleed, a quiet section), or is every entry the same
   shape? Where is the first break, in screens from the top?
2. **Featured entry.** Is there one? What makes it featured: size, position, image, motion, colour?
   What is the clickable surface: the whole entry, one word, a button, an image? Where does it sit
   relative to the page heading?
3. **How a study opens.** List the elements in the first fold at 1440 and at 390 in reading order
   (subject, result, image, label, nav, other). Does it name the subject and the result above the
   fold at both widths? What is the first thing below the fold?
4. **The visual device standing in for photographs.** On any screen without a photograph, what
   carries the eye: type scale, a figure, a diagram, a quoted document, a colour field, a motif, a
   table, nothing? Is it authored to this content (could not be reused on another page) or generic?
5. **Motion grammar.** List every motion seen. For each: trigger (load, in-view, hover, click,
   scroll-linked), duration bucket (under 400ms, 400 to 1000ms, over 1s, continuous), property
   (opacity, transform, colour, clip, size, other), once or loop, whether it pins or hijacks scroll,
   whether it reverses on scroll-up. Name the ONE motion that is the page's signature and list the
   rest as sprinkle. Use the snippet in 2.2, not the eye, for durations.
6. **Type scale and grid.** From computed styles (2.2), not the eye: largest display size and body
   size at 1440 and at 390; the ratio; the count of active sizes 12px and up; the faces; body column
   width in ch; columns at 1440 and how they stack at 390; uppercase or sentence-case display.
7. **Hand-made versus templated.** Three things on the page that could only belong to this site (or
   "none", which is itself the finding). Anything from the DESIGN_BAR section 4 never-list that is
   present, with a pixel reference. Verdict: hand-made, templated, or plain (tomcritchlow is the
   calibration for plain).
8. **The one mechanism worth taking**, as one transferable sentence in the form "X does Y when Z,
   for N ms" or "X sets Y at Z beside W". If it differs from what section 1 expected, say so.
9. **What is budget.** What this site has that micahjonesconsulting does not: assets, team, client
   count, 3D pipeline, illustration, photography, a newsroom.
10. **Rule collision.** Which DESIGN_BAR R-number or CLAUDE.md line the mechanism in question 8
    would touch if taken as-is (R9, R11, R12, R15, the pin/parallax/cursor line, the animated-figure
    line, the GSAP quarantine). "None" is a valid answer and a useful one.
11. **Capture facts.** URL captured (final, after redirects), date, viewport, page height at each
    width, any consent banner (declined) or blocker, whether the entry text exists in the initial
    HTML (view-source or `curl -s`, grep for the first entry's name), fallback used or not.

### 2.2 Protocol

- Tool: Chrome DevTools MCP or Playwright, whichever the leg has. Viewports 390x844 and 1440x900,
  device scale factor 2. Full-page PNG and first-fold PNG at each width. One extra fold PNG at 1440
  taken about 1.5s after load so entrance motion is caught in its finished state, and one with the
  first index entry hovered.
- Motion, measured: after load and once after scrolling one screen, run
  `document.getAnimations().map(a=>({el:a.effect?.target?.tagName+'.'+(a.effect?.target?.className||''),dur:a.effect?.getTiming().duration,iter:a.effect?.getTiming().iterations,name:a.animationName||a.constructor.name}))`
  and paste the result. For scroll-linked animations note `timeline` when present.
- Type, measured: run
  `[...new Set([...document.querySelectorAll('body *')].filter(e=>e.children.length===0&&e.innerText&&e.innerText.trim()).map(e=>getComputedStyle(e).fontSize))].map(parseFloat).sort((a,b)=>b-a)`
  and paste; the largest is display, the mode is body. Read `font-family` on the h1 and on one body
  paragraph.
- Consent: decline non-essential. No accounts, no downloads, no forms.
- Liveness: primary first; fallback only on non-200, parked page, cross-domain redirect or login
  wall; never a third. A dead pair is reported dead and the set proceeds one short.
- Bloomberg: real browser; if the paywall covers the graphic, capture what renders and say so.
- Time box: about 25 minutes per reference. Do not read the reference's copy for taste; the copy
  voice on every site here is not to be taken.

### 2.3 Output

Directory `.planning/research/pass-121/set/`:

- `<slug>-1440.png`, `<slug>-1440-fold.png`, `<slug>-1440-hover.png`, `<slug>-390.png`,
  `<slug>-390-fold.png`.
- `<slug>.md`: the eleven answers under numbered headings, the two pasted snippet outputs, and one
  closing line: the mechanism to take (question 8) and the rule it touches (question 10).
- `SET-INDEX.md`: one row per slug: URL captured, live or fallback or dead, page height at 1440 and
  390, largest display size and body size at 1440, signature motion (trigger and duration), the
  question 8 sentence, the question 10 rule. Fifteen rows. Below the table: the three references
  whose question 8 mechanisms are closest to each other (so G2 does not take the same idea three
  times) and any reference where the capture contradicted section 1's expectation.
- A contact sheet `SET-SHEET-1440.png` of the fifteen first folds at 1440, four across, labelled.

---

## 3. Ruling on the take list

SYNTHESIS section 2, items 1 to 20, with the input's corrections applied. Three verdicts: TAKE (in
bounds now, no popup), CONDITION (in bounds only as stated, or needs one named popup at G2), REJECT
(with the reason tied to the operator's own goals, not only to the rule).

| # | Item | Verdict | Rule it would relax | Condition or reason |
|---|---|---|---|---|
| 1 | Cap index entries at four data points | DONE | none | Shipped in Pass-120 (s1). The record block's rows carry company, role, what happened with its year, and a line; that block is the record by design (FABLE-120 section 2) and is not an index entry. |
| 2 | Answer-shaped lede per study | TAKE | none | It is the dek's first sentence, not a new element. Guardicore's already has the shape. Audit (b) checks the other four and proposes; the copy-editor applies against the LESSONS #3 ledger. |
| 3 | Numbers as visible server-rendered prose | TAKE | none | Protect it: the G2 brief's verification greps every `content/citations.ts` figure in `curl -s` output of each study, no JS. |
| 4 | robots.txt named allows for Claude-User, Claude-SearchBot, OAI-SearchBot, PerplexityBot | TAKE | none | Belt and braces over the existing allow-all; documents intent in `app/robots.ts`'s header. Audit (b) prints today's file first. |
| 5 | Shared-element View Transition: /work featured entry morphs into the study hero photograph | TAKE | none | This is the standing recommendation (FABLE-120 section 4 option 2). It runs inside the existing 900ms dim, once, transform and opacity, with the reduced-motion kill switch. The shared element on /work is the still (the clip's poster; the clip's held last frame is frame 0). It is also the answer to "a small thing (beautiful design) to click": the featured entry IS the doorway, and the doorway is what moves. It only pays where the study has a photograph (Guardicore, ORDANI), so it constrains which study a direction features. |
| 6 | Hover and idle craft on index entries | TAKE | none | One hover grammar for the whole index: underline or colour or a small transform, 150 to 300ms, ease-out, no lift, no cursor follow, no idle state. Specified with durations in the brief. The set (Locomotive, Porto Rocha, Emil Kowalski) shows what considered means. Cheapest visible craft move on the page. |
| 7 | CSS scroll-driven entrance (`animation-timeline: view()`) on the /work heading and record block | CONDITION | R15 (entrances run once); the CLAUDE.md pin/parallax line | A scroll-scrubbed reveal is coupled to scroll position and reverses on scroll-up; that is the parallax family, and it is the "scroll-fade-everything" tell the avoid list names. REJECT the scrubbed form. TAKE a once-only in-view reveal (IntersectionObserver adds a class; CSS does the rest; 400ms; transform and opacity; never reverses; finished frame without JS and under reduced motion) at no more than two moments per page, named in the brief, with the motion-engineer's written approval. The home count-up already uses this trigger once. |
| 8 | Inline outcome badge on entries | REJECT | R11 | The figure line already is the outcome; a badge is a fifth data point and a second place for the same number. Locomotive's badge is taken as a line, not as a badge, and only if a direction shows an entry that lacks the figure. |
| 9 | Oversized numeral on the featured entry | CONDITION | R2 | The /work header ruling makes the featured entry small and designed, so it cannot carry 112. R2 still needs a display size of 72px or more on /work after the band leaves. The page heading carries it, in the home's uppercase Bricolage voice, or a direction argues another carrier. The featured entry's figure sits at 36 to 56 at most. |
| 10 | Hand-drawn motif as a structural device on studies | TAKE (static) | R12 permits it as one authored voice used sparingly | One family (the home's circle, an underline, a bracket, an arrow), at most three uses per study, each with a job: framing the result figure in the band, marking the turn in the story, underlining the close. Never decorating a paragraph. Static by default. A draw-in would be an animated figure; that goes to the G2 popup as a named collision (R15 plus the animated-figure line, precedent the home circle), not into a brief by assumption. |
| 11 | Relationship or flow SVG diagram | TAKE (static) | none if static; the animated-figure line if animated | Authored SVG in the same hand as item 10 so it reads as one voice; labelled with the study's real nouns; encodes only ledgered facts; a server-rendered text equivalent beside it. One per study at most, and not every study needs one: RFP is a flow (request, library, draft, gap); ORDANI is a comparison (a claim's fee, this way versus the typical service; the clearinghouse is never named); Guardicore is a before-and-after (honeypots to east-west); the birth worker is a booking path. Which study gets which exhibit is G2's. |
| 12 | Wireframe or schematic ghost for NDA studies | REJECT as a UI ghost | R12 | A ghost of a screen the buyer cannot see is the grey NDA box better dressed, the fault FABLE-120 named in UXGen's mockups. A schematic of the WORK's structure is item 11 and is taken there. |
| 13 | Document-artifact opener from a genuinely public fragment | CONDITION | none; the provenance rule applies | Only a real fragment the operator supplies or approves: a public procurement requirement for the RFP study (public record, CJ Robinson's move), a redacted real remittance line for ORDANI. Provenance (source, date, URL) in the fact register, cited the way `content/citations.ts` cites the CDC. A citation line on a quoted document is a source, not a caption. Never an invented excerpt; if none exists, the study keeps the typographic exhibit it has. |
| 14 | Person, Organization or ProfessionalService, CreativeWork JSON-LD | TAKE (hygiene) | none | Sourced from `content/site.ts` and frontmatter; no invented fields (no ratings, no fake dates). Reported as hygiene. Audit (b) lists what exists today first. |
| 15 | Real last-updated markers | CONDITION | none; the provenance rule applies | `dateModified` in JSON-LD from `git log -1 --format=%cs -- content/work/<slug>.mdx`, never hand-typed. REJECT a visible "Updated" line on studies for now: it reads as a blog and is a mild dev-Twitter tell (CLAUDE.md). |
| 16 | Minimal llms.txt | TAKE (hygiene) | none | A route generated from the same data as the sitemap, unlinked, never a visible page. Twenty lines for a near-zero measured payoff; the operator asked for crawler-readiness and this is the honest floor of it. Never reported as a result. |
| 17 | Scoped paper body inside theater routes, plus the shared element | DONE / see 5 | none | The paper body shipped in Pass-120 (s3). The shared element is item 5. |
| 18 | Kinetic type (SplitText) on the study title | REJECT | R9, the GSAP quarantine, `motion.signature` | The title already has its entrance (the 600ms settle, signed 2026-09-16). A per-character split is a second entrance on the same element, a GSAP re-entry, and the most common creative-dev move of 2025 to 2026; it reads as portfolio template, the opposite of the operator's goal. Not what he asked for either (he asked about the index and the bodies). |
| 19 | Off-site presence | OUT OF SCOPE | none | Parked in the RESUME queue as an operator conversation. Not a brief line. |
| 20 | Rive interactive diagram | REJECT for this pass | the animated-figure line; a new runtime dependency | The studies need static exhibits first. Revisit only if, after seeing static diagrams live, the operator asks for motion in them; then it is a popup with the cost named. No direction should propose it. |

### 3.5 The gaps: what the directions need that the research did not cover

1. **The /work opening.** A heading, a plain description of what the page holds, and one small
   designed entry into a featured study (ledgered). The research has nothing on how such an opening
   is set. The set's questions 1 and 2 supply the shapes; G2 must draft the description in three
   versions against the LESSONS #3 ledger, and every direction must draw the featured entry at 390
   and 1440, including what happens on hover, on click (item 5), and where the clip lives (inside
   the featured entry at reduced scale, or off /work; its exception is /work only).
2. **Index rhythm without images.** Five entries and a record block, one photograph. The research
   offers Locomotive (a line), Bakken and Baeck (crops, budget) and Iventions (pacing). The model
   for a typographic index with rhythm is the home page itself (ledger rows, uppercase display) plus
   Porto Rocha. Each direction must say what VARIES between entries (size, alignment, a figure set
   large on one, rule weight, a quiet gap), not only what is shared.
3. **The display voice on /work.** The home sets display in uppercase Bricolage on a grained ground;
   /work is sentence case on flat paper. Nobody researched this. My steer for G2: /work is a foyer
   page and adopts the home's display voice and ground treatment; the studies' 56px titles stay
   sentence case for reading. Audit (a) measures whether grain is on paper today.
4. **The right 40 percent at 1440 on studies.** What lives beside the 68ch column on an anonymous
   study: margin marks (item 10), a mono side note carrying the citation figure, the step numeral.
   Snow Fall's chapter break exists only where a photograph exists. Each direction must show a
   study with no photograph at 1440 and prove the column is not floating in bone.
5. **The skim path.** The operator says people will not read. Nothing in the research addresses a
   skim layer. The skim path is: the at-a-glance block, answer-shaped h2s (item 2 extended to h2s,
   which D-C15 supports), one exhibit per section, the hand marks as anchors. Each direction must
   show a study at 50 percent zoom (R20) and prove a skimmer gets who, what and the number from h2s,
   figures and exhibits alone.
6. **A JS budget for /work.** The clip already sits on the operator's LCP override. New motion on
   /work must add no client JavaScript beyond one IntersectionObserver hook; motion is CSS. The
   brief states the budget and the verification (bundle size before and after).
7. **Reduced-motion and no-JS renders.** Every new motion needs its finished-frame render named in
   the brief and captured in verification, as `motion.signature` does for the settle.
8. **ORDANI sequencing.** The claims-facts rewrite is in flight and the exact fee sentence is still
   being checked. ORDANI's exhibits at G2 are drawn against the claims story (a comparison figure,
   no clearinghouse named), never the intake story. If real ORDANI screens arrive, ORDANI gets a
   real exhibit; directions must work with and without.
9. **The featured-study criteria.** Each direction proposes one and says why (ledgered). The
   criteria a proposal must meet: a client that can be named, a real image (item 5 only pays with
   one), a figure a stranger reads in two seconds, and a story that shows the method rather than a
   single deliverable.

---

## 4. Audit instructions

Both audits run on the LIVE domain (`https://www.micahjonesconsulting.com`), not the build,
because the operator will look at the live site. Both may use the set only after section 1's
captures exist.

### 4.1 Audit (a): "looks built by AI" tells on /work and the five studies

Pages: `/work` and the five studies (the slugs under `content/work/*.mdx`; list them with `ls`).
Capture each per the 2.2 protocol (same PNG set, same two snippets), then answer the eleven rubric
questions for each page. Then:

1. **Never-list pass.** DESIGN_BAR section 4, line by line, present or absent per page, with a pixel
   reference for every present item. Add the facet-E tells the never-list does not name: every
   entry the same shape and size (count identical shapes per page), grain as the only identity on
   the page, a tracked-uppercase kicker on every section, uniform section padding (measure the gap
   between the last four sections at 1440), and the copy-rhythm check below.
2. **Copy rhythm.** For each study body (the `<main>` text from `curl -s`, tags stripped), split
   into sentences, compute count, mean length, standard deviation, and the share of sentences
   between 15 and 20 words. Flag a body where the standard deviation is under 5 words or the 15 to
   20 share is over 50 percent; that monotony is the tell copy-lint does not catch. Count em-dashes
   per page (the cap is one). Report the numbers for c-tomcritchlow-home and c-antonsten-home as
   the human baseline.
3. **Attributability.** For each page, the three things that could only belong to this site, or
   "none". Compare with the home page (capture `/` at 1440 too): list the home's identity devices
   (uppercase display, grain, hand mark, ledger rows) and mark each as present or absent on /work
   and on one study.
4. **Grade.** The DESIGN_BAR section 6 rubric, R1 to R20, per page, with the recorded exceptions
   applied (R2 study exception, R3 ORDANI rulings, R12 clip exception, R13 and R15 count-up
   exception, R16 award-winning descriptor). Report the score and the core-criteria status.
5. **Two live checks.** The clip on /work: native controls present or not at rest and on hover
   (brand.json says none). The photograph on the ORDANI study (s5, bottom right): report whether it
   reads as a record of the work or as a stock frame, and pull its provenance from the repo (file
   name, the commit that added it, `public/README.md`). Report only; do not rule.
6. **The buyer's two seconds.** One paragraph per page: what a buyer sees in the first two seconds
   at 390, in plain words, no rubric vocabulary.

Output: `.planning/research/pass-121/audit-a-tells.md` with, in this order: a page-by-question
table (six pages by eleven questions, short cells), the never-list table, the copy-rhythm numbers,
the attributability list, the R-grade per page, the two live checks with their evidence, the six
buyer paragraphs, and a closing ten-line list of the tells found, ordered by how much each would
cost to fix. Captures go to `.planning/research/pass-121/audit-a/` with the same naming as 2.3,
slugs `live-work`, `live-<study-slug>`, `live-home`.

### 4.2 Audit (b): AI-assistant discoverability of the live site

Every claim in this audit is a quoted probe output. No score. The measured-versus-myth split from
SYNTHESIS section 4 is the frame: robots rules, server-rendered prose, freshness and answer shape
are measured levers; llms.txt and JSON-LD are hygiene with no measured lift, and are reported as
such.

1. **robots.** `curl -s https://www.micahjonesconsulting.com/robots.txt`; paste it. List which of
   these agents are addressed by name and which fall under `*`: ClaudeBot, Claude-User,
   Claude-SearchBot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User,
   Google-Extended, Bingbot, CCBot. Confirm the `Sitemap:` line. Read `app/robots.ts`'s header
   comment and quote it.
2. **llms.txt.** `curl -s -o /dev/null -w '%{http_code}' .../llms.txt`; report the code (404 is
   expected today).
3. **JSON-LD.** For `/`, `/about`, `/work` and each study: extract every
   `<script type="application/ld+json">` block from `curl -s`, parse it with node, list the `@type`
   values and every property, and flag any field not traceable to `content/site.ts`, frontmatter or
   `content/citations.ts`. "None present" is a valid result.
4. **Server-rendered text.** For each study, from `curl -s` with no JS: confirm the h1, every h2,
   the dek, the at-a-glance `<dl>` and every figure from `content/citations.ts` referenced by that
   study appear in the HTML. For `/work`: confirm every entry's figure line and the record block's
   four company names appear. Report each as found or missing with the grep used. Compare the word
   count of the `<main>` text in the raw HTML with the rendered page's `innerText`; a gap means
   client-only content.
5. **Answer shape.** For each study, quote the dek's first sentence and every h2. Judge each: does
   it stand alone as an answer (who, what, the number) or is it a headline ("Everyone was selling
   honeypots" is a headline; "Guardicore's buyers were paying for east-west visibility, not
   honeypots" is an answer)? Propose one answer-shaped rewrite per h2 that fails, marked PROPOSED,
   not applied, for the copy-editor and the LESSONS #3 ledger.
6. **Meta and structure.** Per page: `<title>`, `meta description`, canonical, OpenGraph title and
   image, `<html lang>`, one h1, a `<main>` landmark. `sitemap.xml`: every study listed, `lastmod`
   present and whether it matches `git log -1 --format=%cs` for that MDX file. The two retired-slug
   301s resolve to `/work#record`.
7. **What cannot be verified here.** How any assistant actually cites the site is not testable
   without live web access; say so in those words. Nothing in this audit claims an effect.

Output: `.planning/research/pass-121/audit-b-discoverability.md` with: the raw probe outputs
quoted; one table with rows robots-named-agents, server-rendered-figures, answer-shaped-ledes,
answer-shaped-h2s, freshness (lastmod), JSON-LD, llms.txt, each marked measured or hygiene, and
today's status present, partial or absent; the ranked fix list with the exact file each touches
(`app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx` or a JSON-LD component, a new
`app/llms.txt/route.ts`); the answer-shape proposals per study; and the unverifiable line.

---

## 5. What G2 receives and must produce

I expect at G2: `SET-INDEX.md` and the fifteen `<slug>.md` files with their captures;
`audit-a-tells.md`; `audit-b-discoverability.md`; and the Opus 5 session's three directions
written against this file. I will read the index, the sheet, the two audits and the directions. I
will open at most six individual captures.

Each direction must contain:

1. /work at 390 and 1440: heading, the description (three drafts, ledger-checked), the featured
   entry drawn with its rest, hover and click states, the index with what varies between entries,
   the record block, where the clip lives. The display-size carrier for R2 named.
2. The study template at 390 and 1440, shown on a study WITH a photograph and on one WITHOUT: the
   band, the exhibits per study (which of diagram, quoted document, typographic figure, hand mark
   each study gets, drawn against the ledgered facts, ORDANI on the claims story), the right 40
   percent at 1440, the skim path at 50 percent zoom.
3. The motion list: every motion, with trigger, duration, property, once or loop, the reduced-
   motion and no-JS render, and the rule it touches. The three permitted places (item 5, item 6,
   two in-view reveals) and anything beyond them marked POPUP with the rule and cost stated once.
4. The featured study proposed, with the reason against the criteria in 3.5 item 9.
5. What it borrows from the set, by slug and question 8 sentence, and what it rejects from the set
   with the reason, in the shape of FABLE-120 section 5.
6. The JS budget for /work and the verification commands with expected output, in the shape the
   briefs README requires.

The popup list for the operator, assembled by the main session from every POPUP mark across the
three directions, stated once each: a draw-in on the hand mark (R15, animated-figure line), any
scroll-scrubbed reveal (pin/parallax line), any animated diagram (animated-figure line), and any
motion over 400ms outside the recorded exceptions. His ruling on each is recorded in the ledger
before the brief is written.

---

## Summary

1. The set is 15: class A 4 (Locomotive, Bakken and Baeck, Iventions on condition, Porto Rocha added), class B 6 (two Puddings, CJ Robinson, Pentagram Reddit, Bloomberg with a Reuters fallback, Shape Up added), class C 5 (Anton Sten, Tom Critchlow as the plain calibration, Buzz Usborne, Draft added, Emil Kowalski added). Twenty pool entries rejected, mostly 3D, illustration or photo budget.
2. The captures show the real defect: the home already has the site's identity (uppercase display, grain, ledger rows, the hand circle) and /work and the studies use none of it; /work is a table and the study bodies are prose with no exhibits.
3. Ruling 1 (item 5): the featured entry is the doorway and the doorway is what moves; the shared-element morph of the still into the study band, inside the existing dim.
4. Ruling 2 (items 10 and 11): the hand-drawn voice becomes the exhibit system on studies, static; diagrams and quoted documents in the same hand; a draw-in goes to popup.
5. Ruling 3 (items 7, 18, 20): scroll-scrubbed reveals, kinetic type on the title and Rive diagrams are rejected; once-only in-view reveals at two moments per page are allowed with the motion-engineer's approval.
6. Item 9 transfers: R2's display size moves from the retired band to the /work heading, in the home's voice.
7. Plumbing (4, 14, 16) is taken as hygiene and reported as hygiene; 15 is JSON-LD only; 13 needs a real public fragment or is dropped.
8. Gaps: the /work opening shape, index rhythm without images, the display voice on /work, the right 40 percent at 1440, the skim path, a JS budget, reduced-motion renders, ORDANI sequencing, the featured-study criteria.
9. Audit (a) grades six live pages against the rubric with a copy-rhythm check and two live checks (clip controls, the ORDANI photograph's provenance). Audit (b) quotes probes for robots, server-rendered figures, answer shape, meta and sitemap, and names what cannot be verified.
10. G2 receives the set index, the sheet, both audits and three directions in the shape of section 5; I read the index, the audits and the directions and open at most six captures.
