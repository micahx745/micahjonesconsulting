# Pass-121 brief: /work and the five studies in Direction C ("Five exhibits"), and the ORDANI claims retirement

**Status: FOR G4, 2026-09-18, Opus 5 (main session).** Every copy string here is ledgered in LESSONS #3.
Fable's G3 ruling (`.planning/reviews/FABLE-121-G3.md`, verdict ADJUST, 2026-09-18) is folded in; each
placement cites its ruling (R1 to R14, N1 to N10). The operator approved the build and every open string on
2026-09-18 (LESSONS #3, PASS-121 BUILD APPROVED AND THE DRAWING WORDS; ORDANI DID-LINE AND THE RECORD
HEADING). Next: Fable reads this at G4, then it commits as final. Nothing here is executed before G4. One
conflict inside G3 is resolved here and flagged for G4: see 3.3, "The circle".

Executor: GLM 5.3 via `scripts/claude-glm.ps1 -Batch` (prompt on stdin, LESSONS #36). One stage per run,
each stage committed on its own with a `Pass-121:` subject and a pathspec (`git commit -- <paths>`,
LESSONS #23). Branch `design/live-evolve`, worktree `.claude/worktrees/p106-live`. No push, no deploy, no
preview URL: all of that is the operator's (section 8).

Read before any code: `AGENTS.md` (this Next.js differs from training data), then
`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` before Stage E.

---

## 1. The ruling

/work stops being a list and becomes five exhibits: a heading that says what the page holds, one designed
doorway into Guardicore, and four entries that each carry a hand-drawn diagram of how that engagement
worked, beside its number. Each study opens on its photograph or its diagram, carries a margin of lifted
notes, and closes on its figure with the home's hand circle. Nothing loops, pins, scrubs or follows the
cursor. In the same pass the retired ORDANI intake figure (40% to 91%) leaves every surface, and claims
takes its place, in the operator's approved words.

Why: the operator asked for visual punch, design skill on show and a site that does not read as AI-built
(LESSONS #3, PASS-121 DIRECTION AND /WORK HEADING). A template can make colour fields; it cannot draw the
east-west traffic Guardicore's buyers could not see, or the six steps an RFP takes through the engine.
Direction C, picked by the operator 2026-09-17; the proof passed round 4; this brief builds it.

---

## 2. Final copy, exact strings

**Rule of placement:** every visible string on /work and the studies renders from content (MDX
frontmatter, `content/work-page.ts`, `content/exhibits/*.ts`, `SERVICE_LABELS`), as the live page already
does. The executor edits the content files below and never retypes a string into a component. The one
kept component literal is the cross-link line, unchanged.

**Case rule (verified 2026-09-17 against the live home and `components/TitleCard.tsx`):** display headings
are written sentence case in the DOM and uppercased by CSS `text-transform: uppercase`, as the home does
(`"The receipts."`, `"How I work."`). A heading that breaks across lines uses line spans with a literal
space between them (the TitleCard pattern), never a `<br>`, so the served and accessible text carries the
space.

### 2.1 Content edits (file, field, exact new value, ledger row)

| File | Field | Exact value | LESSONS #3 row |
|---|---|---|---|
| `content/work/ordani.mdx` | `description` | `Birth workers keep hundreds of dollars per client that a claims service would take. I founded and built ORDANI, the HIPAA-compliant CRM where they file their own claims.` | ORDANI DESCRIPTION AND THE HOME MONEY LINE |
| `content/work/ordani.mdx` | `dek` | `A HIPAA-compliant CRM for birth workers, and a company I founded and built. Birth workers keep hundreds of dollars per client that a claims service would take. Active paying users in beta, none lost to a competitor, public release coming.` | ORDANI DEK AND THE ANSWER-SHAPE SCOPE |
| `content/work/ordani.mdx` | `results.lead` | `Birth workers keep hundreds of dollars per client that a claims service would take.` | ORDANI CLAIMS FACTS, PART 4 |
| `content/work/ordani.mdx` | `results.rest` | unchanged: `Active paying users in beta, none lost to a competitor.` | PART 5 (BETA) |
| `content/work/ordani.mdx` | `entry.line` | `Birth workers keep hundreds of dollars per client that a claims service would take.` | PART 4 |
| `content/work/ordani.mdx` | `entry.did` | `I founded and built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance claims.` | ORDANI DID-LINE AND THE RECORD HEADING |
| `content/work/ordani.mdx` | the whole `<Step n="02" ...>` element | `<Step n="02" lead="I put claims inside the calendar they already keep.">Birth workers who take Medicaid or private insurance either pay a service like Loula a fee on every visit, or file the claims themselves, which costs no fee but takes time and knowledge. Ordani builds the claim from the visits already on the calendar and checks it before it goes out, so fewer come back rejected. Filing comes with the subscription.</Step>` | ORDANI STEP 02 AND "WHAT IT BECAME" |
| `content/work/ordani.mdx` | "What it became", first sentence only | replace `One intake instead of fifteen pages, and 91% of clients finish it.` with `Practitioners in the beta file real Medicaid and private-insurance claims from Ordani, with no separate claims charge.` The two sentences after it stay. | same row |
| `content/work/content-engine.mdx` | `dek` | `Monthly impressions went from a few thousand to a peak of 800,000. A social activist's message had been landing in every room and nowhere online. I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work: finished videos, the blog post, and the whole marketing flow for the idea it argues. One income stream became four.` | THE TWO REWRITTEN STUDY OPENINGS |
| `content/work/birth-worker.mdx` | `dek` | `Bookings went from one to three a month to five to ten. She had been booked almost always for the same service, and part of every Medicaid payment went to processing fees. I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly. Thousands of dollars stopped going to fees.` | same row |
| `content/work/rfp-engine.mdx` | `entry.figure` (new field, as Guardicore has) | `$3M` | G2 §3.3 split; no word changes |
| `content/work/rfp-engine.mdx` | `entry.line` | `in signed contracts across eleven awards.` (the live line minus its leading `$3M `; the Next block renders `figure + " " + line` and reads exactly as before) | no word changes |
| `content/work/content-engine.mdx` | `entry.figure` (new) / `entry.line` | `figure: "Up to 800,000"`, `line: "impressions in a month, up from a few thousand a month."` The qualifier stays inside the figure and inside its circle; no `figurePrefix` field (G3 R8). The words do not change. | G2 §3.3; FABLE-121-G3 R8 |
| `content/work/ordani.mdx` | `entry.figurePhrase` (new, optional) | `hundreds of dollars` (must be a substring of `entry.line`) | FABLE-121-G3 R8 |
| `content/work/birth-worker.mdx` | `entry.figurePhrase` (new, optional) | `five to ten` (must be a substring of `entry.line`) | FABLE-121-G3 R8 |
| `content/work-page.ts` | `RECORD.heading` | `Also on the record.` (renders `ALSO ON THE RECORD.`) | ORDANI DID-LINE AND THE RECORD HEADING |
| `content/work-page.ts` | new export `WORK_HEADING` | `The work, on the record.` | PASS-121 DIRECTION AND /WORK HEADING (renders as `THE WORK, ON THE RECORD.`) |
| `content/work-page.ts` | new export `WORK_DESCRIPTION` | `Four client engagements and the company I founded. $14M in revenue for a security company, $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what changed.` | same row, DESCRIPTION PUNCTUATION |
| `content/work-page.ts` | new export `DOORWAY_LINK` | `Read this one first` (renders `READ THIS ONE FIRST →`, the arrow in `<span aria-hidden="true"> →</span>` as `cs-close__link` does) | Direction C as picked (G2 §1 A, carried by C) |
| `content/work-page.ts` | `METHOD_LINE` | unchanged | THE /WORK METHOD LINE |

Guardicore and RFP engine `dek`s: unchanged. **No h2 in any study changes** (ORDANI DEK AND THE
ANSWER-SHAPE SCOPE: audit-b's h2 rewrites are declined).

### 2.2 Outside content/

- `app/llms.txt/route.ts` line 42 is a hand-written literal (verified 2026-09-17; it imports nothing), so
  the MDX edit does not reach it. Replace that line's text after `): ` with the new ORDANI `description`
  above, word for word.
- `app/(foyer)/page.tsx`, the ORDANI block's `cw-lede` paragraph: insert ONE sentence between
  `...and a public release is coming.` and `The mission is bigger:`. Exact resulting paragraph text:
  `Birth workers run their practices on group chats and paper intakes. HIPAA is the law. So I built Ordani.
  It has active paying users today, it is in beta, and a public release is coming. Birth workers keep
  hundreds of dollars per client that a claims service would take. The mission is bigger: lower infant
  mortality, by giving the people who care for mothers and babies better tools than paperwork.`
  `<em>So I built Ordani.</em>` keeps its `<em>`. LESSONS #6 binds this paragraph: literal characters only,
  no HTML entity anywhere in the text node, no `{/* */}` inside the `<p>`. Rewrite the Pass-82 comment above
  it to say the money claim is back under LESSONS #3 ORDANI CLAIMS FACTS PARTS 3 to 5 and ORDANI
  DESCRIPTION AND THE HOME MONEY LINE, 2026-09-17.
- `/work` `metadata`: unchanged (it carries no retired figure).

### 2.3 Exhibit strings (`content/exhibits/<slug>.ts`, one file per study)

Each file exports the label strings its drawing places and the sentence beneath it. `content/**/*.ts` is
inside the build-time copy-lint scope and the retired-phrases gate's roots, so every string here is gated.

- `rfp-engine.ts`: labels `portals,` / `checked nightly`; `library,` / `300+ pieces`; `bid or no-bid` /
  `score`; `draft, on the` / `buyer's criteria`; `the gap,` / `marked` (the accent box); `a person` /
  `approves`. Sentence: `Nightly checks on procurement portals feed a library of more than 300 pieces of
  the client's own work. Each request is scored bid or no-bid, drafted against the buyer's criteria with
  any gap marked, and a person approves every response.` (Seen and approved by the operator in the proof.)
- `guardicore.ts`: frame labels `What the pitch led with`, `What buyers signed for`; inner labels
  `honeypot`, `north-south, defended`, `workloads`, `east-west traffic, seen`. Sentence: `The pitch led with
  honeypots. Buyers could not see the east-west traffic between their own workloads, and seeing inside the
  environment was what they signed for.` Approved 2026-09-18 (LESSONS #3, PASS-121 BUILD APPROVED AND
  THE DRAWING WORDS).
- `ordani.ts`: column heads `Filing it yourself or through a service`, `Filing it in Ordani`; sentences
  `A service takes a fee on every visit.`, `Filing it yourself costs no fee, but it costs time and
  knowledge.`, `The claim is built from the visits already on the calendar.`, `It is checked before it goes
  out, so fewer come back rejected.` No closing line (the superseded `stay with the practitioner` draft is
  retired). Approved 2026-09-18, same row.
- `content-engine.ts`: row 1 nodes `a few thousand`, `up to 800,000`; unit `impressions in a month`
  beneath row 1; row 2 nodes `one rough video`, `the week's work`. No tag (G3 R6).
- `birth-worker.ts`: row 1 nodes `one to three`, `five to ten` (words, as the dek has them); unit
  `bookings a month` beneath row 1; row 2 nodes, new, `the same service`, `the full arc of care`. No tag.
  Approved 2026-09-18, same row. Provenance: the four node phrases occur verbatim in the approved
  birth-worker dek; `bookings a month` occurred in no MDX and no LESSONS #3 row before that approval, so
  its provenance is that row.
- No sentence under the two figure-move drawings or under ORDANI's comparison (G3 R9). Sentences exist on
  the RFP flow and the visibility diagram only. G2 §3.4 is amended: a sentence where a drawing needs a key.
- **Facts gate match rule** (G3 R6): each label and sentence must occur as a contiguous, case-insensitive,
  whole-word substring of `content/work/<slug>.mdx` OR of the LESSONS #3 section only (from the `## #3`
  heading to the `## #4` heading of `docs/LESSONS_LEARNED.md`, never the whole file: lesson prose quotes
  unapproved strings). A miss is a stop-and-report to the main session, never a reword.

### 2.4 Margin notes (studies, 1440 only)

Lifted, never written (G2 §3.4): each note is the section's § number plus a phrase that already appears,
character for character, in that h2 section's own MDX text. ORDANI's CDC note renders from
`ORDANI_CDC_2024.FIGURES`. The executor lists every note it placed with the source line it was lifted
from; D2 checks each is a substring of its section, compared case-insensitively. Rendering case (G3 N3):
first letter lowercase unless the first word is a proper noun, an acronym or a figure (`Akamai`, `RFP`,
`$3M`), so `a person reviews and submits every response` is correct. Guardicore's §01 note is
`§01 · east-west traffic between workloads` (verified a verbatim lift, 2026-09-18); G2 §4.2's
`east-west, the blind spot` is a paraphrase and is not used.

---

## 3. Layout spec

Tokens that exist and are used (from `app/globals.css`, read 2026-09-17; do not invent one):
`--color-foyer-paper #f5efe4`, `--color-foyer-ink #1a1816`, `--color-foyer-ink-soft #3a3631`,
`--color-rule-foyer #d9d2c4`, `--color-accent-copper #bd5a2d`, `--color-accent-copper-deep #8a3d24`,
`--color-ordani-sage #5e7158`, `--color-cw-bone #ece3d0`, `--color-cw-espresso #2a1f18`,
`--duration-hover 200ms`, `--ease-hover`, `--ease-out`, `--ease-in-out`, `--duration-mode-fade 900ms`, and
the study variables `--cs-accent`, `--cs-ink`, `--cs-ink-soft`, `--cs-rule`, `--cs-link`.
Doc drift, fixed in this pass: `.claude/CLAUDE.md` and the header comment of `app/globals.css` (lines 8
and 11) name copper `#C8542B` and copper-deep `#8E3A1E` with ratios 3.85 and 5.4. The live tokens are
`#bd5a2d` (3.93:1 on paper) and `#8a3d24` (6.62:1). Update both prose sites to the live values and ratios;
the tokens do not change.

### 3.1 /work

Order, top to bottom: heading, description, doorway, four entries, method band, record on espresso, cross
line, footer. Classes: keep every existing `cw-wx-*` class that still has a job; new classes are named
`cw-wx-<element>` in the same scheme and listed in the stage's commit message.

- **Heading**: the page's only `h1`, `WORK_HEADING`, Bricolage `opsz` max, uppercase via CSS, 96px at 1440,
  48px at 390, two line spans. The doorway figure is no longer an `h1` (today `cw-wx-lead__h1` is).
- **Description**: `WORK_DESCRIPTION`, Hanken regular 22px at 1440 (18 at 390), max 60ch, columns 1 to 7,
  `text-wrap: pretty`. In the 1440 capture its last line carries three words or more; if not, the measure
  moves in 1ch steps between 58ch and 62ch until it does (G3 R3, N10).
- **Section labelling**: today the entries section is `aria-labelledby="cw-wx-method"`, the method line.
  The method line moves below the index, so the entries section gets its own visually hidden label
  (`<h2 class="sr-only">` reading `The engagements`; this is an accessible name, not display copy) and the
  method band becomes its own section.
- **Doorway** (`01`, Guardicore, the `order: 1` study): one `ViewTransitionLink` wrapping the block,
  hairline `--color-rule-foyer` above and below, no border, no card, no shadow. 1440: text in columns 1
  to 8, the still in columns 10 to 12 at 320 by 400 (4:5), `WorkHeroClip` inside it as today (its rules in
  `brand.json motion.heroclip` stand; the doorway is its new frame; poster preload stays). 390: the still
  first at 358 wide, 16:10, `object-position: 50% 0%` (fix round 2, D7: the face is in frame). Text order:
  mono folio `01`; context from `entry.context` in Hanken 14 `--color-foyer-ink-soft` (the same treatment
  as the four entries, G3 R3); `entry.figure` at 72px Bricolage with the static hand circle (one numeral
  size across the page, G3 R3); `entry.line` in Bricolage 22 at the words-figure's weight; `entry.did`;
  mono `SERVICE_LABELS`; `DOORWAY_LINK` (copper-deep at rest, no motion of its own beyond the arrow's 4px).
  The doorway carries the still only: the visibility diagram lives in the study (G3 R12). /work holds four
  drawings and one photograph.
- **Four entries** (order 2 to 5, live order: RFP, ORDANI, content engine, birth worker): each one
  `ViewTransitionLink`, hairline-separated. 1440: text in columns 1 to 6 (folio, figure line, did-line
  under it, service label), the exhibit in columns 8 to 12, max 400 wide, its top on the figure's cap
  line. A numeral figure (`entry.figure`) sets alone at 72px Bricolage with `entry.line` beneath in
  Bricolage 22 at the words-figure's weight, `text-wrap: pretty`; a words figure (no `entry.figure`) sets
  `entry.line` at 36px. No circle on any of the four entries: one circle per page, on the doorway (G3 R8).
  390: folio and figure line, the exhibit at full width (max 240 tall, 300 for ORDANI's stacked drawing),
  the did-line, the label, in that order. Context line: Hanken 14px, `--color-foyer-ink-soft`, two lines max
  at 1440 (PROOF §2 item 8). No `DRAFT` mark: every ORDANI string on /work is approved (2026-09-18), so
  G3 N9's placement rule is moot.
- **Method band**: `METHOD_LINE`, 36px Bricolage sentence case, alone on paper, 160px above and below at
  1440, 96px at 390. Keeps class `cw-wx-method`.
- **Record on espresso**: one full-bleed section, `data-world="espresso"`, ground
  `--color-cw-espresso`, type `--color-cw-bone`; heading in the home's uppercase display at 72px; rows in
  the home ledger's shape (`.cw-ledger` row styling from THE RECEIPTS): company Bricolage 36, role and
  outcome mono 14, description Hanken 18. The espresso world's saffron accent is not used on /work; the Guardicore row's
  link uses copper. At 390 the mono meta wraps under the company.
- **Type sizes on /work at 1440 (G3 R3): exactly {96, 72, 36, 22, 18, 14, 12}.** 96 Bricolage the h1; 72
  Bricolage the numeral figures (doorway and entries) and the record heading; 36 Bricolage the words-figures,
  the method line and a record row's company; 22 Hanken the description and Bricolage the figure lines; 18
  Hanken did-lines and record descriptions; 14 Hanken context lines, and JetBrains Mono service labels,
  `READ THIS ONE FIRST`, record role and outcome; 12 JetBrains Mono folio and the footer row. G2's 56, 28
  and 20 are retired. Scope of the check: the main content from the h1 to the record's last row; the cross
  line and the footer keep their live sizes outside the scope.
- **Sizes at 390** (checked at the first preview): h1 48; numeral figures 36; words-figures 26; method
  line 26; description 18; figure lines 18; did-lines 16; context 14; mono as live.
- Page height at 390: under 4,600px.

### 3.2 The drawings

- **Generator**: port `mulberry32`, `catmull`, `handStroke`, `boxSides`, `arrowParts` and the per-drawing
  layout from `.planning/mock/pass-121/set/gen-set.mjs` (after fix round 2) into `lib/hand/` as plain
  TypeScript, the same math and the same seeds, so the site draws exactly the mock's paths. Rendered by
  server components in `components/exhibits/` (one per drawing, e.g. `ExhibitFlow`, `ExhibitVisibility`,
  `ExhibitClaims`, `ExhibitFigureMove`). Zero client JavaScript; no runtime randomness.
- **Geometry scales with one viewBox; text size is set per placement; strokes do not scale** (G3 R5). Two
  drawings have a second, stacked viewBox at 390: the visibility diagram and ORDANI's comparison (G3 R14:
  `Filing it yourself or through a service`, its two boxes, `Filing it in Ordani`, its two boxes; boxes full
  width; words unchanged; height cap 300). Each width's morph uses that width's viewBox at both ends, so it
  stays a pure scale.
- **Text size per placement** (G3 R5): the SVG text's `font-size` in user units is
  `target px x (viewBox width / rendered width)`. Mono labels render 12px at the 1440 index (400 wide), 13px
  on the 1440 band and Guardicore's body break (560 to about 600 wide), 11px at 390 (358 wide); ORDANI's
  Hanken sentences one step up: 13, 14, 12. Line-height 1.25 mono, 1.3 Hanken. Everything mono in a drawing
  (box labels, unit lines, frame heads, column heads) takes the placement's label size; none is a title.
  Between 390 and 1440 the text scales with the drawing; the two named widths are what the check measures.
  On the visibility diagram the two north-south arrows sit at the left frame's top centre and
  `north-south, defended` sits centred 8px above their tips.
- **Box padding** (G3 N7): 8px of clear paper on all four sides inside every box at the 1440 index width
  (about 7 at 390, checked at 6 or more).
- **Figure-move layout** (G3 R6): two rows; each row's two boxes are 42 percent of the drawing's width each
  and the arrow takes the remaining 16 percent. A box is never sized to its label.
- **Line**: `currentColor` (foyer ink on paper, theater ink `#ece3d0` on the band), one stroke weight per
  page: 2px at 1440, 1.5px at 390 (PROOF §2 item 3), set in CSS with `vector-effect: non-scaling-stroke`
  so index and band hold the same weight. No fills, no shadows, no gradients, no icons, no people.
- **The accent element**: one meaning per drawing, which may be several strokes: the RFP gap box and the
  arrow into it; Guardicore's east-west arrows; ORDANI's two Ordani-column boxes; each figure-move's row-1
  arrow (row 2's arrow is ink). Written once as `stroke: var(--cs-accent, var(--color-accent-copper))`:
  `--cs-accent` is declared only under `[data-mode="theater"] .cs` (verified 2026-09-18, `app/globals.css`
  lines 530 to 550), so every drawing on /work is copper and the same component draws sage inside
  /work/ordani with no prop. The constitution's sage scope is unchanged (G3 R4). The morph carries copper
  into sage over its 600ms; that is intended. Drawn in two offset passes, **opacity 1 at rest** (D1).
  Accent on strokes only.
- **Text in drawings**: short labels in JetBrains Mono (the cleared R1 narrow third). Any full sentence is
  Hanken (fix round 2, D2); the ORDANI comparison's four sentences are Hanken. No text under 24px takes
  copper on paper: labels are ink, or `--color-accent-copper-deep`, or sage on ORDANI; on the band they
  are `#ece3d0`. Sizes per placement above.
- **Exhibit sentence** (the RFP flow and the visibility diagram only, G3 R9): Hanken 15px, max 48ch, server-rendered beneath the drawing,
  24 to 40px below it (M12). It is the exhibit's sentence, not a photo caption (the no-captions ruling
  covers photographs and the clip).
- Class: `.cs-exhibit` exists; add modifiers `--flow`, `--compare`, `--figure`, `--vis`.

### 3.3 The studies (`app/(theater)/work/[slug]/page.tsx`)

- **Band media**: today `.cs-band__media` renders only when `cs.hero` exists, and the grid carries
  `data-photo`. New rule: the slot renders the photograph when `hero` exists (Guardicore only, verified
  2026-09-17: no other study has `hero`), otherwise the study's exhibit, drawn in `#ece3d0` with its
  accent. Replace `data-photo` with `data-media="photo" | "exhibit"` and move its CSS with it. At 1440 the
  exhibit fills columns 8 to 12 (about 560 wide), its top on the title's cap line, the sentence 24 to
  40px beneath; leftover dark sits at the band's bottom (fix E of the mock brief). **Correction to G2
  §7**: G2 assumed ORDANI keeps a band photograph; it has none, so ORDANI's band carries the claims
  drawing like the other three. Guardicore alone opens on its photograph and gets the visibility diagram
  as its first body break.
- **Band order** (G3 R13): in the DOM at every width the media slot follows the h1: context, title, media,
  dek, at-a-glance list, results. Today it comes last (`cs-band__head`, `cs-band__text`,
  `cs-band__media`), which puts every study's image below the first fold at 390 (round 2, N1). At 1440 the
  grid still places the media in columns 8 to 12 from the title's cap line, so reading order and visual
  order agree. At 390 the still renders 358 wide at 16:10 (the doorway's own 390 crop, so the morph pair
  matches shape) and an exhibit 358 wide at its natural height, max 240, max 300 for the two stacked
  drawings. Markup order and CSS placement only; no string changes.
- **Margin column** `.cs-aside` (new), columns 10 to 12 beside the 68ch body at 1440, mono 12px
  `--cs-ink-soft`, one note per h2 section (2.4). Omitted at 390.
- **Hand marks**: at most three per study from one family, each with a job: the circle on the result
  figure, a bracket or arrow at the story's turn, an underline under the close's link. Use the existing
  components in `components/hand/` (the G2 `.cw-hand` class does not exist and is not created).
  `HandCircle` is a client component with effects; for static circles add `components/hand/
  HandCircleStatic.tsx`, a server component that renders `HandCircle`'s own `PATHS` (export that const;
  `HandCircle`'s behaviour does not change) with its grain filter, at the finished frame.
- **The turn's bracket** (G3 N4): drawn with `lib/hand`'s `handStroke` (the drawings' own line), shaped
  `[` with 12px ticks, spanning the full height of the paragraph that holds the turn (Guardicore: the
  paragraph from `I interviewed customers` to `visibility was the thing they signed for.`), 2px,
  `--cs-ink-soft`, in column 9 between the body and the margin column, its margin note beside its top
  tick. Never a text glyph.
- **Figure moment** in "What changed" (G3 R8): a numeral figure is the whole `entry.figure` string at 72px
  with the static circle around all of it (`Up to 800,000` is circled as one claim, qualifier included),
  `entry.line` beneath, `results.rest` in mono 14 beneath that. A words figure (ORDANI, birth worker):
  `entry.line` at 36px Bricolage, with the circle around the one phrase named by `entry.figurePhrase`,
  rendered as a span with `white-space: nowrap` so the circle never spans a line break; `results.rest`
  beneath. All from frontmatter, no new words.
- **The circle** (G3 R7): the mock's was a stadium (flat runs, even clearance, no crossing, no grain); the
  build draws the home's own mark. Render `HandCircle`'s `PATHS` variant 3 (the path the home runs, per
  `home-circle-ratios.json` `pathsD`) through `HandCircleStatic`, `viewBox="0 0 180 60"`,
  `preserveAspectRatio="none"`, grain filter on, the overlap at the top left. Placement uses the JSON's own
  measured ratios and bases (Fable: the JSON rules where it differs from his read): SVG width = 1.1885 x
  the figure's rendered text width; SVG left edge = the figure's left edge minus 0.0909 x that width; SVG
  height = 1.243em and top = -0.185em of the figure's own font-size (the JSON's `svgStyle`). Same ratios at
  72px (doorway, figure moments) and at 36px (390 and the words-figure phrase). At 390 the figure gets left
  padding equal to its overhang (0.0909 x its width) so the SVG, `overflow: visible`, never crosses the
  16px gutter. Colour: ink at rest; copper-deep with the numeral on the doorway hover; `--cs-ink` on a
  study. **Stroke, resolved here and flagged for G4:** R7 asks for the stroke to scale with the path;
  FABLE-121-PROOF §2 item 3 ruled one stroke weight for every hand mark on a page, circle included,
  because a heavier or lighter circle beside the drawings "reads as two sources". The brief keeps the
  proof's rule: the circle is 2px at 1440 and 1.5px at 390, `vector-effect: non-scaling-stroke`, like every
  other hand mark. G4 confirms or reverses.
- **RFP comparison table**: stays where it is, restyled: mono column heads, the gap row's sentence in
  `--cs-link`, a hand arrow in the margin pointing at that row.

---

## 4. Motion

Nothing new beyond these three, and nothing loops, pins, scrubs or follows the cursor.

1. **Hover grammar** (one, for the doorway and the four entries), CSS only, 200ms `--duration-hover`
   `--ease-hover`, reverses on unhover: the entry's lower hairline scales 0 to 1 in copper
   (`transform-origin: left`); the figure line's colour goes to `--color-accent-copper-deep`; the
   doorway's still tint lifts 0.82 to 1; the exhibit's accent element gains its second pass (opacity 0 to
   1 on the second pass only). **Corrected this session:** G2 §7 specified the accent going 0.6 to 1
   opacity; the 0.6 rest state measured 2.19:1 on paper, 2.29:1 for sage and 2.24:1 on the band, failing
   even 3:1 (LESSONS #37). At rest every accent is at full strength. Accepted as round 2 has it (G3 R2),
   with two clarifications: the words-figures (ORDANI, birth worker) take the same colour change on the
   whole 36px line, and the doorway's circle changes colour with its numeral; `READ THIS ONE FIRST` is
   already copper-deep at rest and gets no motion beyond its arrow's 4px. Reduced motion: the colour
   change with no transition and no second pass. No JS: CSS only.
2. **Two once-only in-view reveals per page**: 400ms `--ease-out`, translateY 12px to 0 and opacity 0 to
   1, never reverses. /work: the method band, and the record rows (40ms stagger, 520ms total). A study:
   the first exhibit, and the figure moment. Mechanism (verified 2026-09-17): the existing
   `components/color-worlds/ScrollReveal.tsx` observes `.cw-reveal` and adds `.is-in`, and hides before-
   states only under the `cw-js-reveals` class it puts on `[data-mode="cw"]`. It is mounted in the foyer
   layout only. For studies: widen its root query to `[data-mode="cw"], [data-mode="theater"]` and mount
   `<ScrollReveal />` in `app/(theater)/layout.tsx`; before-state CSS scoped under
   `:is([data-mode="cw"],[data-mode="theater"]).cw-js-reveals`. No JS and reduced motion both render the
   finished frame. Needs the motion-engineer's written approval, recorded in the Stage E commit (G1 item
   7's condition).
3. **The morph** (click an entry, its image flies into the study's band), inside the existing 900ms dim,
   600ms `--ease-in-out`, transform and opacity only, once. The doorway morphs its still onto
   `.cs-band__img`; each of the four entries morphs its exhibit onto the band's exhibit. Name:
   `cs-media-<slug>`, set as an inline `viewTransitionName` style on both ends, following the one named
   element the site already runs (`components/Nav.tsx`, `site-nav`, with its
   `::view-transition-group(site-nav)` rules). Durations set per group with five explicit
   `::view-transition-group(cs-media-<slug>)` selectors. Reduced motion: the existing rule at
   `app/globals.css` around line 352 already zeroes `::view-transition-group(*)`; verify it covers the new
   groups. No JS: plain navigation.
   **Risk, stated plainly:** no shared-element morph has run on this site. Navigation passes through two
   mechanisms at once, `document.startViewTransition` in `components/view-transition-link.tsx` and React's
   `<ViewTransition>` around the root layout (`app/layout.tsx:146`) with `experimental.viewTransition`
   on. Whether a named pair survives that is unproven. Hence the spike in Stage E1 and its hard stop
   (section 7).
   **If E1 fails** (G3 R11): C ships with the dim only and the drawings static at both ends; the pass loses
   nothing a buyer would miss. No second mechanism is tried inside this pass. If the operator wants the
   morph afterwards, it is a separate spike brief (the React `<ViewTransition name>` pair is the
   candidate), written by Opus, read by Fable, on its own branch. **At 390** the morph runs only after E1
   passes at 1440 and one 390 mid-point is captured. The mock's frame 05 (the RFP flow over Guardicore's
   photograph) cannot occur and is replaced by the spike's own captures.

The settle (`cs-settle`, 600ms) and the dim (900ms) stand as recorded. `document.getAnimations().length`
is 0 at rest on every touched route after its reveals finish.

---

## 5. Stages and verification

Build and serve for every check: `pnpm build` then `pnpm start -p 3121` (the production build; never the
dev server for motion, website-dev playbook). Every served check below reads `http://localhost:3121`.
Standing clauses from `.claude/briefs/README.md` bind every line: count what renders; never reinterpret
an expect (#25); measure the render (#26); scope from the layout, open the capture (#28); no `grep -i`
with `-F` (#34); no check passed by editing the work to fit it, contrast at rest and hovered, overlap on
both axes, the tenure grep excludes `© 2013–2026 Micah Jones` (#37).

**Visible-text helper**, written once in Stage A as `.planning/exec/visible-text.mjs`: reads HTML on
stdin, removes `<head>...</head>`, every `<script>...</script>` and every tag, decodes the five basic
entities, prints the text. All `expect >= 1` checks count its output; `expect 0` checks may read raw HTML.

### Stage A: the retirement and the plumbing (content, gates, llms, robots, sitemap, JSON-LD)

A1. Add to `PHRASES` in `scripts/retired-phrases-gate.mjs`, under a comment naming LESSONS #3 ORDANI CLAIMS
FACTS PART 2 and PART 4 and #37: `intake completion`, `91%`, `40% to`, `forty percent`,
`ninety-one percent`, `ninety one percent`, `per claim`, `Luna`, `stay with the practitioner`. Then,
BEFORE any content edit:
- `node scripts/retired-phrases-gate.mjs; echo EXIT=$?` expect a non-zero exit listing
  `content/work/ordani.mdx` lines 6, 7, 16, 20, 48, 58 and `app/llms.txt/route.ts` line 42. This proves the
  gate bites. If it lists anything else, stop and report it (a false positive is the judge's call).
- `node scripts/retired-phrases-gate.mjs --self-test; echo EXIT=$?` expect `EXIT=0`.
A2. Apply every edit in section 2.1 and 2.2. Then `node scripts/retired-phrases-gate.mjs; echo EXIT=$?`
expect `EXIT=0`.
A3. `app/robots.ts`: keep the `*` rule and add named `allow: "/"` rules for `Claude-User`,
`Claude-SearchBot`, `OAI-SearchBot`, `PerplexityBot`; keep the header comment. Served:
`curl -s localhost:3121/robots.txt | grep -c -E '^User-Agent: (Claude-User|Claude-SearchBot|OAI-SearchBot|PerplexityBot)$'`
expect `4` (check the served capitalisation once and quote it; if Next prints `User-agent`, the expect
pattern follows the served form, and the report says so).
A4. Sitemap dates. The build environment's git history is not guaranteed (a shallow clone, or a CLI upload
without `.git`), so dates are generated locally and committed: `scripts/lastmod.mjs` writes
`content/lastmod.json`, mapping each sitemap route to `git log -1 --format=%cs -- <its source file>` (the
MDX file for a study, the `page.tsx` for a static route). `app/sitemap.ts` reads it instead of
`new Date()`. Checks: `node scripts/lastmod.mjs --check; echo EXIT=$?` expect `EXIT=0` (every entry equals
the live git date); `curl -s localhost:3121/sitemap.xml | grep -o '<lastmod>[^<]*' | sort -u | wc -l`
expect `>= 2`.
A5. `app/layout.tsx`: drop `mainEntityOfPage` from the root-layout Ordani `Organization` block and rewrite
its comment; the ORDANI study's Article JSON-LD already names its own page. Served:
`curl -s localhost:3121/ | grep -c 'mainEntityOfPage":"https://www.micahjonesconsulting.com/work/ordani'`
expect `0`; `curl -s localhost:3121/work/ordani | grep -c '"@id":"https://www.micahjonesconsulting.com/work/ordani"'`
expect `>= 1`.
A6. Copy served, per route, with the visible-text helper:
- `/work/ordani`: each of the section 2.1 ORDANI strings `>= 1`; `Loula` exactly `1`.
- `/`: `Birth workers keep hundreds of dollars per client that a claims service would take.` `>= 1`, and
  the render gate's GLUE check passes (`node scripts/render-gate.mjs` in the build chain).
- `/llms.txt`: the new ORDANI description `>= 1`.
- `/work/content-engine`, `/work/birth-worker`: their new deks `>= 1`.
- Across `/`, `/work`, all five studies and `/llms.txt`, lowercased raw HTML: `intake completion`, `91%`,
  `40% to`, `per claim`, `luna`, `stay with the practitioner`, `free claims` each expect `0`, with the
  grep's own exit status read (PIPESTATUS), not only its count (#34).
Commit Stage A.

### Stage B: the drawing system

B1. `lib/hand/` port and `components/exhibits/*` per 3.2; `content/exhibits/<slug>.ts` per 2.3;
`HandCircleStatic` per 3.3.
B2. Facts-only gate, new, `scripts/exhibit-facts-gate.mjs` with `--self-test`: every label and sentence
exported from `content/exhibits/<slug>.ts` appears in `content/work/<slug>.mdx` or in the LESSONS #3
section only (from its `## #3` heading to the `## #4` heading), as a contiguous, case-insensitive,
whole-word substring, else it prints the string and exits 1. Self-test plants one invented label and
expects a miss, and plants one string that occurs only in LESSONS #37's prose and expects a miss (the
section scope bites). A miss on the real tree is a stop-and-report, never a reword (section 7).
Wire both into `package.json` `build` after the retired-phrases gate. Expect `EXIT=0` on the real tree.
B3. Determinism: render each exhibit twice in one process; the SVG strings are identical. Expect
`identical=5/5`.
Commit Stage B.

### Stage C: /work

C1. Build per 3.1. Served checks on `/work`:
- `h1` count in raw HTML: expect `1`; its `textContent` exactly `The work, on the record.` (read in the
  browser, `document.querySelector('h1').textContent`).
- Visible text contains each of: `The work, on the record.`, the description, `$14M`, `$3M`, `800,000`,
  `five to ten` (all `>= 1`).
- `grep -c controls` on raw HTML: expect `0` (the clip has no controls).
- Exhibits server-rendered: raw HTML `grep -c 'cs-exhibit'` expect `>= 4`.
C2. First Load JS for `/work` from the `pnpm build` route table, before (Stage A build) and after: expect
the same within 2 kB.
Commit Stage C.

### Stage D: the studies

D1. Build per 3.3. For each of the five studies at 1440: the band media slot holds the photograph
(Guardicore) or the exhibit (the other four); margin notes present; one figure moment; at most three hand
marks.
D2. Margin notes are lifted: for each note, its phrase is a substring of its h2 section's MDX text,
compared case-insensitively (2.4). Expect `lifted=<n>/<n>`, and the list printed.
D2b. Every `entry.figurePhrase` is a substring of its own `entry.line`. Expect `figurePhrase=2/2`.
D2c. At 390, each of the five study bands shows its media (photograph or exhibit) inside the first 812px:
read `document.querySelector('.cs-band__media').getBoundingClientRect().top` at a 390 viewport. Expect
`< 812` on all five, and open each 390 band capture once.
D3. First Load JS for `/work/[slug]`, before and after: expect within 3 kB (the ScrollReveal mount is the
only new client code).
Commit Stage D.

### Stage E: motion

E1. **The spike, one pair only: the Guardicore doorway still to `.cs-band__img`.** Production build, Chrome
via CDP. Set `Animation.setPlaybackRate` to `0.1`, click the doorway, and during the transition read
`document.getAnimations().map(a => a.effect?.pseudoElement)`: expect it to include
`::view-transition-group(cs-media-guardicore)`. Screenshot at the transition's mid-point and put it beside
`.planning/mock/pass-121/set/states-1440.png` frame 04. **If the named group is absent or the still does
not move between its two boxes, STOP (section 7).** Do not try a second mechanism by trial and error.
E2. Only after E1 passes: the four entry pairs, same method, one mid-point capture each.
E3. Hover and reveals per section 4. Checks at 1440 and 390, both grounds, at rest AND hovered:
- Contrast: every drawing text `>= 4.5`, every stroke `>= 3.0`, computed from the composited colour against
  its real ground. Run it once against a copy that sets the accent to `opacity: .6` first and show it
  fails (a check that cannot fail is not a check). Expect `min_text>=4.5 min_stroke>=3.0` per page.
- Overlap, both axes, every label, with NO own-box exemption (G3 N7): ink box (`getBBox()` through
  `getScreenCTM()`) inside its viewBox with 8px on all four sides, at least 8px from its own box's strokes
  at 1440 (6px at 390), and crossing no stroke at all. Expect `overlaps=0 clipped=0 padding_min>=8`
  (1440) and `padding_min>=6` (390).
- Rendered label size per placement (G3 R5): read each drawing text's computed rendered size (font-size
  in user units times the drawing's scale). Expect mono 12 at the 1440 index, 13 on the 1440 band and the
  body break, 11 at 390; ORDANI Hanken 13, 14, 12. Tolerance 0.5px.
- `document.getAnimations().length` at rest after load and one screen of scroll, reveals finished:
  expect `0` on `/work` and on two studies.
- Under `prefers-reduced-motion: reduce`, and with JavaScript disabled: a capture of `/work` and of one
  study, each showing the finished frame (reveals visible, no morph).
E4. The motion-engineer's written approval of the reveals and the five pairs, quoted in the commit.
Commit Stage E.

### Stage F: the whole-pass gates and the preview capture

- `pnpm build` exit `0` (copy-lint, vendor, retired-phrases, accent-states, gsap-quarantine, exhibit-facts,
  next build, render-gate).
- `node scripts/gsap-quarantine-gate.mjs; echo EXIT=$?` expect `EXIT=0`.
- Axe on `/`, `/work` and all five studies at 1440 and 390: serious and critical expect `0`.
- Lighthouse mobile on `/work` (local production build): Performance `>= 95`, LCP `<= 1800ms`, CLS
  `<= 0.05`.
- Type sizes on `/work` at 1440: the G1 section 2.2 snippet, scoped from the h1 to the record's last row;
  expect exactly `{96, 72, 36, 22, 18, 14, 12}` (G3 R3).
- Source ledger grep over `app components content lib` (lowercased, no `-iF`): each retired phrase in A1
  expect `0`; tenure pattern `(19|20)[0-9]{2}[-–](19|20)?[0-9]{2}` after removing the literal
  `© 2013–2026 Micah Jones`, expect `0` new hits against the Stage A baseline.
- Em-dashes: per rendered page `<= 1`.
- `prettier --check` on every touched file: pass.
- Captures, production build, deviceScaleFactor 2: `/work` full and fold at 1440 and 390; each of the five
  studies full and fold at 1440 and 390; `/work` hovered entry; one morph mid-point; one reveal before and
  after. Named `<route>-<width>[-fold|-state].png` under `.planning/qa/pass-121/`. Opened before cited.
- `verification/pass-121-viewports.md`: every surface by width with its capture path and pass/fail.

---

## 6. Rejected, and why

- Directions A and B, and B's four popups (world-coloured bands, circle draw-in, reveal on every world,
  1200ms zoom): G2; operator picked C.
- A stroke draw-in on the drawings: operator, "No, still drawings first".
- The hover accent at 0.6 opacity at rest: 2.19 to 2.29:1, fails 3:1 (LESSONS #37).
- Audit-b's answer-shaped h2 rewrites: operator, openings only; the h2s are voice.
- Uniform box grids and routed connectors: FABLE-121-PROOF §1 and §2.
- Full sentences in monospace: the constitution's mono ban.
- Copper text under 24px on paper: 3.93:1, fails AA for body text.
- Boxing a unit line, or adding a node or a tag, to meet a count: LESSONS #37.
- Loula's fee as a number; `per claim`; `Luna`; naming the clearinghouse or any internal tool; `free
  claims` or `no charge`: LESSONS #3 PARTS 1 to 4.
- The superseded ORDANI figure line `Hundreds of dollars per client stay with the practitioner.`: PART 4.
- A `.cw-hand` class (G2 §3.2): the hand family already exists as `components/hand/*`.
- G2's `html.js` reveal gate: the site's gate is `cw-js-reveals` from ScrollReveal.
- G2 §3.7's served check `grep -o 'THE WORK, ON THE RECORD'`: the DOM carries sentence case, so it fails a
  correct page. Replaced by C1's `textContent` check.
- `git log` at build time in `app/sitemap.ts`: the build environment may lack history. Replaced by the
  committed `content/lastmod.json`.
- Deleting or rewording the copyright line to satisfy a year grep: LESSONS #37.
- From the reference set (G2 §8): Locomotive's text scramble and photo-on-hover, Iventions' pinned
  panels, CJ Robinson's zoom, Anton Sten's loop, Buzz Usborne's silent screenshots.
- ORDANI as the featured study: its figure is a sentence and its screens have not arrived (G2 §9).

## 7. Return conditions (the executor stops and reports; the judge rules)

- E1's named group is absent, or the still does not move: stop. Per G3 R11 the default is already
  ruled: C ships with the dim only and the drawings static at both ends, and the morph becomes a
  separate parked spike. Opus confirms the trace before that default is taken.
- A facts-gate miss on any label or unit line (B2): stop and report; the main session checks the ledger.
  Never a reword (G3 R6).
- Any check that cannot pass without adding, removing, reboxing or restyling content (#37), or whose
  `got` differs from its `expect` (#25).
- Any copy string needed that is not in section 2: stop; it goes to the operator by popup.
- A false positive in A1's before-run.
- First preview, after Stage D: captures at 390 and 1440 to the main session, which looks, then Fable's
  first-preview checkpoint (CLAUDE.md: first preview at 390 and 1440; copy checked by `curl -s | grep`;
  one buyer read at the ship gate).
- LCP over 1800ms or Performance under 95 on `/work`.

## 8. Parked operator decisions (facts only he has)

- Push and deploy timing. Push to `main` deploys production and both domains are re-aliased (LESSONS #5).
  His approval is quoted with its date in RESUME before any push, branch or main.
- Answered 2026-09-18, before this brief commits (LESSONS #35): the build approval; the ORDANI
  `entry.did`; the record heading's period; the Guardicore, ORDANI and birth-worker drawing words. All
  ledgered in LESSONS #3.
- Speed Insights p75 LCP for `/work` after release (A4).
- The colleagues' okay to being animated in the clip (DESIGN_BAR R12 exception).
- Ordani screens, for ORDANI as a future featured study.

---

## G3 ruling (appended after Fable's look)

(empty until G3)
