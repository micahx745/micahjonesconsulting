You are the executor building the Pass-121 MOCK SET for micahjonesconsulting.com, in the git worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W). The operator approved Direction C
("Five exhibits") on 2026-09-17 after seeing the proof. These are static HTML mocks for his approval and for
Fable's G3 judgement, not the site build.

HARD LIMITS: write ONLY under W/.planning/mock/pass-121/set/ (new folder) and reuse, without editing, the
proof files in W/.planning/mock/pass-121/proof/ (work-fold.html, rfp-study.html, gen-round4.mjs,
measure-round4.mjs, capture-proof.mjs, home-circle-ratios.json). Never edit app/, components/, content/, lib/,
public/, docs/ or .claude/. No pnpm build, no dev server, no commit, no push. No emoji, no em-dashes, no sketch
libraries, no fills, no icons, no people drawn, no stock imagery. Every copy string below is exact: place it
verbatim, never rewrite it, never invent a new one.

READ FIRST, in W:
1. .planning/reviews/FABLE-121-G2.md sections 3.1 to 3.7, 4, 7 and 10 (Direction C is section 7; section 10
   is what Fable checks).
2. .planning/reviews/FABLE-121-PROOF.md sections 2 and 3 (the eight adjustments; all already applied in the
   proof files, so copy the proof's technique forward).
3. The proof's generated HTML for the hand technique, the circle ratios and the flow drawing.

## A. What to build

Four HTML files under W/.planning/mock/pass-121/set/, each self-contained (fonts from Google Fonts, tokens
inline as in the proof):

1. `work.html` — the whole /work page in Direction C: heading, description, the Guardicore doorway, four index
   entries each with its drawing, the method band, the record block on espresso, the footer cross line.
2. `study-guardicore.html` — the study with a photograph: band (context, title, dek, at-a-glance with the
   photograph in the media slot), copper rule, bone body with the visibility diagram as the first break, the
   margin notes, the result figure moment with the circle, the close, the Next entry.
3. `study-rfp.html` — the study with no photograph: the same template with the six-step flow in the band's
   media slot, the comparison table restyled, the figure moment. Start from the proof's rfp-study.html.
4. `states.html` — the interaction frames, each labelled with a small mono note OUTSIDE the design:
   doorway at rest; doorway hovered; an index entry hovered; the doorway morph mid-point; an index-entry
   morph mid-point; the method band's in-view reveal before and after. Build the two morph mid-points as
   composites exactly as FABLE-121-G2 section 7 describes ("The morph mid-point frame"): ground at the 50
   percent mix of #f5efe4 and #12100e, the /work content at 50 percent opacity, the shared element's box
   halfway between its /work box and its band box.

## B. The five drawings (index scale on /work; band or body scale in the studies)

Same hand and technique as the proof: words inside boxes, boxes sized to their words, varying widths, one
stroke weight per page (2px at 1440, 1.5px at 390), varied wobble, one copper element drawn in two offset
passes, mono labels, no fills. One viewBox per drawing, scaled only.

1. **RFP engine (six-step flow)** — already built in the proof. Reuse as is.
2. **Guardicore (the visibility diagram)** — FABLE-121-G2 section 4.2. Two frames side by side at 1440,
   stacked at 390. Left frame label: `What the pitch led with`. Inside: a rectangle (the environment) with one
   small box labelled `honeypot`, and two arrows crossing the top edge labelled `north-south, defended`. Right
   frame label: `What buyers signed for`. The same rectangle with six small boxes in two rows labelled once
   `workloads`, and lateral arrows between them in copper labelled `east-west traffic, seen`. Sentence beneath
   (Hanken 15px, max 48ch): `The pitch led with honeypots. Buyers could not see the east-west traffic between
   their own workloads, and seeing inside the environment was what they signed for.`
3. **ORDANI (the claims comparison)** — a two-column typographic block, NOT a flow. Sage `#5E7158` replaces
   copper as this study's accent. Left column head: `Filing it yourself or through a service`. Left column
   lines: `A service takes a fee on every visit.` / `Filing it yourself costs no fee, but it costs time and
   knowledge.` Right column head: `Filing it in Ordani`. Right column lines: `The claim is built from the
   visits already on the calendar.` / `It is checked before it goes out, so fewer come back rejected.` Beneath,
   one line in the sage accent: `Hundreds of dollars per client stay with the practitioner.` No numbers, no
   percentage, no fee figure, no company named in the drawing.
4. **Content engine (the figure move)** — two nodes joined by one arrow: `a few thousand` then `up to 800,000`,
   with a mono `+` tag beside the second, and beneath: `impressions in a month`. A second small pair under it:
   `one rough video` to `the week's work`.
5. **Birth worker (the figure move)** — two nodes: `1 to 3` and `5 to 10`, with the mono line beneath:
   `bookings a month`. No service names, no itemised services, no fee figure.

## C. Exact copy for /work (place verbatim)

Heading: `THE WORK, ON THE RECORD.`
Description: `Four client engagements and the company I founded. $14M in revenue for a security company, $3M
in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth
worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what changed.`
The doorway (folio `01`): as the proof's work-fold.html has it, unchanged.
Index entries, in this order, each with folio, context line (Hanken 14px, #3a3631, two lines max), figure line,
did-line, service label, and its drawing:
- `02` context `An award-winning author and leadership consultant who teaches government bodies and
  corporations`; figure `$3M` at 72 then `in signed contracts across eleven awards.`; did-line `It finds the
  RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response
  waiting by morning.`; label `AI engineering`; drawing: the six-step flow.
- `03` context `ORDANI, my company`; figure line (words, 36px) `Birth workers keep hundreds of dollars per
  client that a claims service would take.`; did-line `I founded and built ORDANI, a HIPAA-compliant CRM where
  birth workers file their own Medicaid and private-insurance claims.`; label `Product building`; drawing: the
  claims comparison. Mark this entry `DRAFT` in a small mono note outside the design.
- `04` context `A social activist`; figure `Up to 800,000` at 72 then `impressions in a month, up from a few
  thousand a month.`; did-line `I wrote the platform strategy, then built an AI engine that turns one rough
  video into the week's work.`; label `Product building`; drawing: the content-engine figure move.
- `05` context `A birth worker`; figure line (words, 36px) `Bookings went from one to three a month to five to
  ten.`; did-line as in the live site's birth-worker entry frontmatter (read
  W/content/work/birth-worker.mdx, `entry.did`); label `Positioning & GTM`; drawing: the birth-worker figure
  move.
Method band, alone on paper, 36px Bricolage, 160px above and below at 1440 (96 at 390): `I find what your
buyers are actually paying for, then build the system that sells exactly that.`
Record block on espresso (`#2a1f18`, type in `#ece3d0`): heading `ALSO ON THE RECORD.` at 72px uppercase; line
`Four of the companies I worked inside reached an exit.`; the four rows exactly as
W/content/work-page.ts holds them (read it; do not retype from memory).

## D. Study copy

Take every string for the two studies from the live MDX: W/content/work/guardicore.mdx and
W/content/work/rfp-engine.mdx (frontmatter title, titleLines, dek, atAGlance, results, and the body headings
and text you place). Place, never rewrite. The margin notes are phrases lifted from the section they sit
beside (FABLE-121-G2 section 3.4).

## E. Fix carried from the proof

On the RFP band the exhibit's sentence was pushed to the bottom of the column, leaving a large empty dark area
between the drawing and its sentence. The sentence sits directly beneath its drawing (24 to 40px below it).
Instead of padding the column, make the drawing large enough to carry the band: at 1440 it fills columns 8 to
12 (about 560px wide) and its top aligns with the title's cap line. Any leftover dark space then sits at the
bottom of the band, not between the drawing and its sentence. Same rule on every study band that carries a
drawing.

## F. Measurements (reuse and extend the proof's measure script)

Keep M1, M2, M4, M5, M6, M7, M8, M10 and M11 from the proof round, applied to every drawing on every page and
width, and add:
M12. On every study band with a drawing: the vertical gap between the drawing's bottom and its sentence's top
     is between 24 and 40px.
M13. /work has exactly seven distinct rendered font sizes at 1440 (FABLE-121-G2 section 3.1).
M14. Every one of the five drawings appears on work.html, and each has at least four distinct box widths.
M15. Ledger grep over all four HTML files: none of `40%`, `91%`, `intake completion`, `290,000`, `36x`,
     `$80M`, `Luna`, `per claim`, an em-dash, or any four-digit tenure year pattern like `2018-2021`.
Iterate until every check passes at 390 and 1440 (at most four rounds).

## G. Captures

Extend the proof's capture script: for `work.html`, `study-guardicore.html`, `study-rfp.html` take full-page
and first-fold PNGs at 1440 and 390 (deviceScaleFactor 2), plus a 50 percent zoom full-page capture of each
study at 1440 (Fable checks the skim path at 50 percent). For `states.html` take one full-page capture at 1440
and one at 390. Also crop each drawing to its own PNG (`drawing-<slug>-1440.png`). Name files
`<page>-<width>.png`, `<page>-<width>-fold.png`, `<page>-1440-50pct.png`. Open every PNG you cite.

## H. Report (under 30 lines)

Every measurement line verbatim per page and width; the list of files written; one honest line per drawing on
how it reads; and anything in this brief you could not do, named plainly. Claim nothing a measurement or an
opened image did not show.
