# 2. Final copy and the content model

Sources, all read on 2026-09-16: the locked drafts in `.planning/drafts/pass-120/`, LESSONS #3
(the rows dated 2026-09-15 and 2026-09-16), `docs/DESIGN_BAR.md` R12, and
`.planning/reviews/FABLE-120-DESIGN.md` §2 and §7. The maps are `content-model.md`,
`study-template.md`, `work-index.md` and `gates.md`. Every file:line below is from those maps or
from my own read of the worktree.

**How to read this section.** Every string inside a code block is final copy. Place it
byte for byte. The executor strips nothing, adds nothing and rewords nothing. I already removed
every bracket tag (`[?#]`, `[B#]`, `[G#]`, `[O#]`, `[S2]`) and every meta section (legend,
written-for, search terms, tag tables, confirmed and still-open lists, bracketed notes). If a
string here looks wrong, stop before the commit and report it (standing clause 2).

**Where this section and the repo disagree** (the repo wins, and I followed it):
- Mock `.planning/mock/pass-120/b/work.html` ends the method line "...sells it."
  LESSONS #3 (THE /WORK METHOD LINE, 2026-09-16) ends it "...sells exactly that." The ledger
  wins.
- The mocks drop event years ("IPO", "Acquired by Akamai") and use a bare `Name protected` as
  the context label. The rulings restore both, so the mock is wrong on those points.
- LESSONS #3 (BIRTH WORKER VOLUME) still reads "five to ten inquiries". The later row BIRTH
  WORKER BOOKINGS, BOTH SIDES supersedes it: they are bookings.
- LESSONS #3 (ORDANI CARRIES NO COUNTS) calls the 22 interviews "publishable pending his
  confirmation". The ruling list says no interview counts, and the locked ORDANI draft carries
  none. No count ships.
- `.claude/CLAUDE.md` ("Content") says case-study numbers render from `content/citations.ts`.
  That is false today for the CDC figures (`content-model.md` §3: `content/work/ordani.mdx:43`
  hardcodes them). §2.6 fixes it.

---

## 2.0 Prerequisite: the harness frontmatter hook still encodes the retired schema

`premium-web@premium-web` is enabled in `~/.claude/settings.json` (lines 582-595). Its
PreToolUse hook
`C:/Users/micah/Code/premium-web-harness/plugins/vertical-plugins/premium-web/hooks/mdx-frontmatter.sh`
blocks with exit 2 any Write or Edit to `content/work/*.mdx` that lacks the lines
`title: dek: role: tools: year: status:` in the first 30 lines of the written content. The new
schema removes `role`, `tools` and `year`. Under the old hook, every file in §2.3 would be
refused.

That file is harness configuration and lives outside this repo. **The executor does not edit it
and does not route around it** (no Bash heredoc, no `cp`, no script that writes the MDX so the
hook never fires). If the hook refuses a write in §2.3, stop and report the refusal verbatim. The
change it needs is listed in §2.10 as a parked decision. The exact replacement for the operator
or judge to apply is below: line 9, then line 15.

```bash
for field in title dek status; do
```
```bash
  echo "Required: title, dek, status (Pass-120 schema, lib/case-study-schema.ts)." >&2
```

Once that edit is in, write each MDX file whole with the Write tool. Never use Edit on
`content/work/*.mdx`: the hook greps only `new_string`, so a body-only Edit fails even under the
new field list.

---

## 2.1 The schema: `lib/case-study-schema.ts` and `lib/title-card-schema.ts`

### Fields removed, and why
| Field | Removed because |
|---|---|
| `titleCardWords` | The pinned word stack retires. The title is the words (TITLECARD ruling, 2026-09-16). |
| `year` | No personal year renders anywhere (YEARS ruling). It is replaced by the hidden `publishedAt`. |
| `role` | It now lives in `atAGlance` as the `My role` row. Its only other consumers were the sidebar and the meta fallback, and both retire. |
| `tools` | Its only consumers were the sidebar and the meta fallback (`page.tsx:247,274`), and both retire. |
| `stats` | The design rules out stat trios. `results` replaces it on the study, and `entry` replaces it on /work. |
| `indexLine` | Replaced by `entry.line`. |
| `feature` | Replaced by `entry.figure` plus `entry.line` on the `order: 1` study. |
| `heroStill` | Replaced by `hero`, an object carrying src, width, height and alt. |

### Fields added
`titleLines`, `description`, `client`, `clientNameProtected`, `atAGlance`, `results`, `entry`,
`service`, `publishedAt`, `hero`. Kept: `title`, `dek`, `status`, `order` (`order` is now
required on every published study).

### `lib/case-study-schema.ts`: replace the whole file with exactly this
```ts
// lib/case-study-schema.ts
//
// Pass-120. Zod schema for content/work/*.mdx frontmatter, the Direction B spine.
// Invoked from lib/case-studies.ts (runtime) and lib/copy-lint-runner.ts (build gate).
//
// Two shapes. A stub (status "stub") carries title, dek and status only and never renders.
// A published study carries everything the dark band, the at-a-glance block, the /work entry
// and the close need. Both are strict: any leftover retired key (the Pass-58/61 index
// fields, the tenure field, the tool list, the word stack) fails the build.
//
// Rulings: LESSONS #3, 2026-09-15 and 2026-09-16 rows. No personal year renders anywhere.
// publishedAt is the date the page was first committed (hidden: JSON-LD and sort only),
// never a tenure year.
import { z } from "zod";

export const CASE_STUDY_STATUSES = [
  "shipped",
  "in-flight",
  "archived",
  "stub",
] as const;
export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number];

/** The three /services areas. Labels equal the SERVICES titles in app/(foyer)/services/page.tsx. */
export const SERVICE_SLUGS = [
  "ai-engineering",
  "product-building",
  "positioning-gtm",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  "ai-engineering": "AI engineering",
  "product-building": "Product building",
  "positioning-gtm": "Positioning & GTM",
};

/** A tenure range such as 2018-2021 or 2018–2021. Never allowed in any frontmatter string. */
const TENURE_RANGE = /\b(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}\b/;

const text = z
  .string()
  .min(1)
  .refine((s) => !TENURE_RANGE.test(s), "no year ranges (LESSONS #3, no personal years)");

const photo = z.strictObject({
  src: z.string().regex(/^\/[a-z0-9-]+\.(jpg|jpeg|png|avif|webp)$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: text,
});

export const stubCaseStudySchema = z.strictObject({
  title: text,
  dek: text,
  status: z.literal("stub"),
});

export const publishedCaseStudySchema = z
  .strictObject({
    /** The search title. It renders as the visible h1 and is the page <title>. */
    title: text,
    /** The same title split into the lines the settle entrance animates. Joined with one space they equal title. */
    titleLines: z.array(text).min(1).max(3),
    /** Meta and JSON-LD description. At most 155 characters, so clampDescription passes it through. */
    description: text.refine((s) => s.length <= 155, "description is at most 155 characters"),
    /** The dek under the title in the dark band. */
    dek: text,
    /** The client as the page names it, with no trailing period. */
    client: text,
    /** true renders the mono label "Name protected" after the client. */
    clientNameProtected: z.boolean(),
    /** The at-a-glance rows between Client (from client) and Results (from results). */
    atAGlance: z.array(z.strictObject({ label: text, value: text })).min(1).max(3),
    /** The Results row: lead renders at the 36 size, rest beneath it at body size. */
    results: z.strictObject({ lead: text, rest: text }),
    /** The /work entry. figure exists only on the order-1 study, which renders it at 112. */
    entry: z.strictObject({
      context: text,
      figure: text.optional(),
      line: text,
      did: text,
    }),
    /** The /services area the close and the /work entry route to. */
    service: z.enum(SERVICE_SLUGS),
    /** Hidden. ISO date of the MDX file's first commit. JSON-LD datePublished and the fallback sort only. */
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(["shipped", "in-flight", "archived"]),
    /** /work position and the Next order, ascending, unique. */
    order: z.number().int().positive(),
    /** The band photograph, where a real, cleared photograph exists. No caption field exists anywhere. */
    hero: photo.optional(),
  })
  .superRefine((cs, ctx) => {
    if (cs.titleLines.join(" ") !== cs.title) {
      ctx.addIssue({ code: "custom", path: ["titleLines"], message: "titleLines joined with one space must equal title" });
    }
    if ((cs.order === 1) !== (cs.entry.figure !== undefined)) {
      ctx.addIssue({ code: "custom", path: ["entry", "figure"], message: "entry.figure is required on order 1 and forbidden elsewhere" });
    }
  });

export const caseStudyFrontmatterSchema = z.union([
  stubCaseStudySchema,
  publishedCaseStudySchema,
]);

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
export type PublishedCaseStudyFrontmatter = z.infer<typeof publishedCaseStudySchema>;
```
Zod here is 4.4.3 (`node_modules/zod/package.json`). `z.strictObject`, `.superRefine` and
`code: "custom"` are v4 API. Do not rewrite them in v3 form.

### `lib/title-card-schema.ts`: replace the whole file with exactly this
```ts
// lib/title-card-schema.ts
//
// Pass-120. Props for the TitleCard settle entrance. The pinned word stack and its
// frontmatter word list are retired (operator signed 2026-09-16). The title is the words:
// the band's h1 text is `title`, and `lines` are the spans that settle in.
import { z } from "zod";

export const titleCardSchema = z.object({
  /** The full search title; the h1's accessible text. */
  title: z.string().min(1),
  /** 1 to 3 lines; joined with one space they equal title. */
  lines: z.array(z.string().min(1)).min(1).max(3),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
```
If the motion section of this brief gives TitleCard more props (timing and so on), that section
owns the extra props. This section fixes only three things: `words`, `caption`, `heroSrc` and
`heroAlt` are gone, and the text comes from `cs.title` and `cs.titleLines`.

---

## 2.2 Every consumer, updated in the same commit as the schema

The build throws on the first schema mismatch (`lib/case-studies.ts:60-68`), so the schema,
every consumer and all six MDX files land in ONE commit. The line numbers are from
`content-model.md` §4 and my read of the files.

| File:line (today) | Reads | Change |
|---|---|---|
| `lib/case-studies.ts:22-30` | `CaseStudyFrontmatter` | Import `PublishedCaseStudyFrontmatter` too. Export `interface CaseStudyMeta` as `CaseStudyFrontmatter & { slug: string }` (a type alias, because an interface cannot extend a union) and `type PublishedCaseStudyMeta = PublishedCaseStudyFrontmatter & { slug: string }`, plus `export function isPublished(cs: CaseStudyMeta): cs is PublishedCaseStudyMeta { return cs.status !== "stub"; }` |
| `lib/case-studies.ts:87-102` | `order`, `status`, `year` | The sort puts stubs last. Published studies go by `order` ascending, with `publishedAt` descending as the tie-break (string compare). Delete the `year` regex block (`:93-100`). |
| `lib/case-studies.ts:109-112,120-128,144-152` | `status` | `getSelectedWork`, `getCaseStudyBySlug` and `getNextCaseStudy` filter with `isPublished` and return `PublishedCaseStudyMeta` (or `PublishedCaseStudyMeta[]`). The wrap behaviour is unchanged. |
| `lib/copy-lint-runner.ts:27,90` | the schema | No code change: the union parses. |
| `app/(theater)/work/[slug]/page.tsx:43` | `status` | `generateStaticParams` filters with `isPublished`. |
| `page.tsx:88` | `dek` | `const description = clampDescription(cs.description);` |
| `page.tsx:130-145` | `year` | Delete the `yearStr` and `startYear` lines (`:134-139`) and their comment (`:128-133`). The JSON-LD becomes `description: cs.description, datePublished: cs.publishedAt,`. |
| `page.tsx:180,198-205` | `title`, `titleCardWords`, `indexLine`, `dek`, `heroStill` | Becomes `titleCardSchema.parse({ title: cs.title, lines: cs.titleLines })`. The template section places the visible h1. |
| `page.tsx:219-233` | `stats` | Deleted. The at-a-glance block reads `client`, `clientNameProtected`, `atAGlance` and `results` (template section). |
| `page.tsx:236-253` | `role`, `tools`, `year` | The meta fallback is deleted. |
| `page.tsx:255-262` | `heroStill`, `year` | Deleted. The band photograph reads `cs.hero` (template section). |
| `page.tsx:274` | `role`, `tools`, `year` | `<CaseStudySidebar>` and its import are deleted (no sticky rail). |
| `app/(theater)/work/[slug]/opengraph-image.tsx:37` | `titleCardWords` | `const words = cs?.titleLines ?? FALLBACK.words;` and at `:81` `fontSize: cs ? 64 : 92`. |
| `opengraph-image.tsx:40` | `dek` | `const caption = cs ? cs.results.lead : FALLBACK.caption;` |
| `opengraph-image.tsx:104` | `client` | Unchanged (`cs.client` is still a string). |
| `app/(foyer)/work/page.tsx:67,93,96,102,104,106,145,147,150,152,158-166` | `status`, `feature`, `stats`, `title`, `indexLine`, `dek`, `role`, `year` | Replaced by the index section's markup, which reads exactly `entry.context`, `entry.figure` (order 1 only), `entry.line`, `entry.did` and `SERVICE_LABELS[service]`, with the list filtered by `isPublished`. No `year`, `role` or `stats` read survives. |
| `app/sitemap.ts:97` | `status` | Filter with `isPublished`. `lastModified` is unchanged. |
| `app/llms.txt/route.ts:40-43` | hand-typed | Replace the four study lines with the five lines in §2.7. |
| `mdx-components.tsx:29-43` | none | Register `Step`, `Exhibit`, `ExhibitRow` and `ChapterBreak` (contracts below). Remove `TitleCard`, `Dek`, `CaseStudyStill` and `CopperRule` from the map: no MDX body uses them after §2.3. |

**MDX body component contracts.** The markup and CSS belong to the template section. The props
are fixed here.
- `Step`: `{ n: string /* two digits, "01" */; lead: string; children: React.ReactNode }`. It
  renders the numeral `n` in mono, then one paragraph: `<strong>{lead}</strong> {children}`.
- `Exhibit`: `{ children: React.ReactNode }`. It renders exactly two column labels, the strings
  `The request` and `What the engine did`, then its rows. It is the only exhibit block type, and
  only rfp-engine.mdx uses it.
- `ExhibitRow`: `{ request: string; engine: string }`.
- `ChapterBreak`: `{ src: string; width: number; height: number; alt: string }`. It is full
  bleed and uses `next/image`. It has **no caption prop**: its TypeScript props type does not
  declare one.
- `PullQuote` (existing, `components/PullQuote.tsx`): used with `attribution` only.

MDX authoring rule for `Step` and `PullQuote`: the element and its text sit on ONE line, so MDX
parses the text as phrasing and not as a nested paragraph.

---

## 2.3 The five studies: complete files

Delete `content/work/postmates.mdx` and `content/work/neuton.mdx` (the redirects are in the
index section). Delete `public/guardicore-telaviv.jpg`: after this commit nothing references it,
and it still carries the Instagram location sticker (`study-template.md` §11). Git history keeps
it.

`content/work/passioneer.mdx` stays a stub. Replace its frontmatter block (lines 1-13) with the
block below and leave its body unchanged:
```yaml
---
title: Passioneer
dek: An AI content platform. Case study draft pending.
status: stub
---
```

**Order and Next.** 1 guardicore, 2 rfp-engine, 3 ordani, 4 content-engine, 5 birth-worker.
Next wraps from 5 to 1 (`getNextCaseStudy`, unchanged).

**publishedAt.** The date the MDX file was first committed:
`git log --follow --diff-filter=A --format=%as -- content/work/<slug>.mdx | tail -1`. For the
four existing files that gives guardicore 2026-05-14, ordani 2026-05-14, rfp-engine 2026-09-01
and content-engine 2026-09-01 (run on 2026-09-16). birth-worker.mdx is new, so its value is the
local date of the Pass-120 content commit, in `YYYY-MM-DD`. The executor writes that one date
and nothing else, and V5 checks it against git after the commit.

**BLOCKING before the content commit.** The first-commit date is a proxy, not the ruling's
value. LESSONS #3 YEAR FIELDS (operator 2026-09-16) says the hidden date is "the date the page
was published". Guardicore and ORDANI were first committed 2026-05-14, during pre-launch phase
work, so the proxy may not be their publish date. The executor does not write the §2.3
frontmatter until the judge or operator has done one of two things, recorded in RESUME with a
date: confirmed the four first-commit dates above as the publish dates, or supplied the real
first-publish dates. If dates are supplied, they replace the values in §2.3, and V5's
`publishedAt` line is judged against that supplied table, not against git. A V5 pass without
that record is not a pass.

**Photographs.** Guardicore's band uses the already-cleaned `/guardicore-telaviv-session.jpg`
(770x575; its sticker and patch history are in `app/(foyer)/work/page.tsx:29-42`). Guardicore
gets no chapter break: that is its only clean photograph, and at 770px wide it cannot run full
bleed at 1440 without upscaling. ORDANI's `/ordani-intake.jpg` (1600x1068) is its chapter break
between "What I did" and "What it became", and ORDANI has no band photograph. The other three
studies have no photograph and no placeholder. No caption anywhere.

### content/work/guardicore.mdx
```mdx
---
title: "Repositioning Guardicore: $14M, then Akamai"
titleLines:
  - "Repositioning Guardicore:"
  - "$14M, then Akamai"
description: "A Tel Aviv security company was selling a feature the market already had. I found what North American banks were buying, moved the story, and sold $14M."
dek: "$14M in revenue, sourced and closed, at a $1.2M average enterprise deal, for a security company built in Tel Aviv whose buyers sat in North American banks. I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals. Akamai acquired the company in 2021."
client: "Guardicore, acquired by Akamai"
clientNameProtected: false
atAGlance:
  - label: "My role"
    value: "Revenue and positioning"
  - label: "The work"
    value: "Customer research and data analysis, the repositioning, target accounts and outbound, executive briefings, managed-security partners, and a microsegmentation pilot"
results:
  lead: "$14M in revenue, sourced and closed."
  rest: "$1.2M average enterprise deal. Acquired by Akamai in 2021."
entry:
  context: "Guardicore, acquired by Akamai"
  figure: "$14M"
  line: "in revenue, sourced and closed, at a $1.2M average enterprise deal."
  did: "I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals. Akamai acquired the company in 2021."
service: positioning-gtm
publishedAt: "2026-05-14"
status: shipped
order: 1
hero:
  src: "/guardicore-telaviv-session.jpg"
  width: 770
  height: 575
  alt: "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
---

## Everyone was selling honeypots

In the years before the acquisition, the security market was saturated with deception. Honeypots were a feature several vendors shipped, and Guardicore led with theirs.

Meanwhile the thing enterprises could not do was see their own networks. North-south traffic, in and out through the firewall, was well defended. The lateral east-west traffic between workloads was a blind spot, and that blind spot was where ransomware lived.

So the top-of-funnel message described a feature the market already had, while buyers at the bottom of the funnel were signing for something else. The product was built an ocean away from the buyers who needed it.

## What the customers said that the deck did not

I interviewed customers, researched the market, and ran the data analysis on what closed against what the pitch promised. The two came apart in the same place every time: buyers were not buying deception. They could not see anything inside their own environments, and visibility was the thing they signed for.

I brought that to leadership with the analysis behind it, and the story moved: visibility first, then east-west microsegmentation.

## What I did

<Step n="01" lead="The research, before the pitch changed.">Customer interviews, market research, and the analysis that showed where the message and the money disagreed.</Step>

<Step n="02" lead="The reposition.">Two anchors, in order: see the traffic, then segment it. Every surface told the same story in the same sequence.</Step>

<Step n="03" lead="The pipeline.">I picked the target accounts, ran the outbound, briefed executives, qualified the leads, and sat in the deals. Once leadership backed the new focus, I was selling microsegmentation before the product was finished. That is the part of positioning nobody puts in a deck: the story has to hold in a live deal while the roadmap catches up.</Step>

<Step n="04" lead="Managed-security partners.">I helped sign the managed-security and reseller partners who extended the platform's reach, and their reps carried the repositioned story the direct team carried.</Step>

<Step n="05" lead="The pilot that proved it.">A microsegmentation pilot with a top-10 North American bank. The two anchors held under a real network, with a real security team pushing on them.</Step>

## What changed

- $14M in revenue, at a $1.2M average enterprise deal size.
- Deployed behind a global systemically important bank and a federal research agency. It reached a white-shoe Wall Street law firm and a major U.S. utility too.
- Trillions in financial assets sit protected behind those deployments.
- Akamai acquired Guardicore in 2021, and the positioning carried into the product that followed the acquisition.

## Questions buyers ask

**Why would positioning change revenue?** It changes which buyer takes the meeting and what they think they are solving. Here the pitch described a feature while buyers were signing the contracts for an outcome.

## If enterprise teams still are not buying

You built it. Enterprise teams still are not buying, and the gap is positioning, not features. I run the customer interviews and the sales-call analysis that name the question your buyers are actually asking, then the positioning shift and the sales narrative your team runs without me.
```

### content/work/rfp-engine.mdx
```mdx
---
title: "AI RFP software: $3M in signed contracts"
titleLines:
  - "AI RFP software:"
  - "$3M in signed contracts"
description: "I built RFP discovery, scoring and drafting around one expert's own body of work. $3M signed, and the close rate doubled from one in eight to one in four."
dek: "$3M in signed contracts, won through AI software I built for an award-winning author and leadership consultant. It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning. Their close rate went from one in eight to one in four."
client: "An award-winning author and leadership consultant who teaches government bodies and corporations"
clientNameProtected: true
atAGlance:
  - label: "My role"
    value: "Strategist and sole builder"
  - label: "First real RFPs delivered"
    value: "Day three"
  - label: "What I built"
    value: "Discovery, bid/no-bid scoring, a library of their work with provenance, and response drafting"
results:
  lead: "$3M in signed contracts across eleven awards."
  rest: "Close rate from one in eight to one in four inside six months. Responses out per month: two or three, then eight to ten."
entry:
  context: "An award-winning author and leadership consultant who teaches government bodies and corporations"
  line: "$3M in signed contracts across eleven awards."
  did: "It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning."
service: ai-engineering
publishedAt: "2026-09-01"
status: shipped
order: 2
---

## Three responses a month was the ceiling

The client had twenty years of published work behind them: books, keynotes and training programs. Public buyers were funding exactly that expertise. Most of those requests never reached them.

New opportunities arrived through a single newsletter list and the client's existing network. Everything else sat on federal, state and local procurement portals that nobody was watching.

Every response started from a blank page. One took three to five working days, so two or three went out a month and the client passed on the rest. Volume was the ceiling, and each pass was a contract someone else won.

## Real RFPs by day three

Day three, the software was live and sending real opportunities. Scoring, the library and the drafting came after that.

<Step n="01" lead="Discovery.">It checks federal, state and local procurement portals every night and pulls each new RFP in the client's field.</Step>

<Step n="02" lead="One record per solicitation.">Portals repost the same solicitation, and amendments change it. Duplicates collapse into one record, and an amendment gets flagged for review rather than quietly replacing what the client already read.</Step>

<Step n="03" lead="The library, with provenance.">I put more than 300 pieces of the client's work into a searchable library: books, articles, talks, past proposals and client results. Every passage keeps its source, its date and how that engagement ended. This is the retrieval layer, RAG, and the provenance is the point: a draft can name real work instead of describing work in general.</Step>

<Step n="04" lead="Bid/no-bid scoring.">Each RFP gets scored before a person reads it: eligibility, deadline, required certifications, and how far the scope overlaps proven work.</Step>

<Step n="05" lead="Drafting against the buyer's own criteria.">Each solicitation states how it will be scored, and evaluation factors differ from one to the next. The draft follows that solicitation's stated criteria rather than a house template.</Step>

<Step n="06" lead="Gaps instead of invention.">Where the library cannot support a claim, the draft leaves a marked gap and says what is missing. It does not write a sentence that merely sounds right.</Step>

<Step n="07" lead="Outcomes tune the scoring.">Every award and every rejection adjusts the weights, so the scoring keeps learning from real results.</Step>

Nothing submits itself. A person reads and approves every response before it goes out.

## One requirement, start to finish

<Exhibit>
  <ExhibitRow request="A buyer asks for proof of similar work delivered in the last five years." engine="The engine pulls two engagements out of the library that match the scope, each with its date and how it ended, and drafts the answer around them in the client's own language." />
  <ExhibitRow request="The same RFP asks for a credential the client does not hold." engine="Nothing in twenty years of their work supports it. The draft leaves a marked gap and names what is missing, so the client can answer it honestly, bring in a partner who has it, or skip the bid." />
</Exhibit>

That gap is the part I care about. A model that writes something plausible there costs a client their credibility with a buyer they wanted for years.

## What the replay found

Before the software scored a live RFP, I ran thirty to fifty of the client's past bids back through it. The pattern held: every win matched two or more of their proven capabilities, and every loss matched one or none. Capability overlap became the heaviest weight in the score.

That is also the honest answer to a fair question. A better filter raises a win rate on its own, so the scoring had to earn its weights against bids whose outcomes were already known.

## What changed

- $3M in signed contracts through the platform, across eleven awards.
- Contracts started arriving from buyers outside the client's existing network and outside their home state.
- The close rate went from one in eight to one in four of submitted proposals, inside six months.
- Responses out went from two or three a month to eight to ten.
- First drafts arrive in hours instead of days.
- The judgment that used to fire only when I was in the room now fires on every submission.

<PullQuote attribution="The client, name protected">Micah does the work that most strategy decks promise and never deliver.</PullQuote>

## Questions buyers ask

**What did this RFP engine automate?** Finding relevant solicitations, scoring whether each one is worth a bid, and drafting a first response from the client's own published work. A person reviews and submits every response.

**Can AI write a government RFP response?** It can draft one. Here the draft came from the client's own library and followed that solicitation's stated evaluation criteria, and a person finished every response. Eligibility, pricing and submission checks stayed human.

**What was working after three days?** Real RFPs arriving, scored for fit. The library, the drafting and the tuning came after.

## If your experts read the same document every week

Your AI works in the notebook. Production is a different stack, and I run that stack. I build the retrieval, the scoring and the drafting on your own material, for real load and not the demo, with evals that fire on every change and catch failures before your customers do. Your team runs it after I leave.
```
In the `Exhibit` above, the draft's two walkthrough paragraphs are split at their existing
sentence boundaries into request and engine cells. No word is added or dropped.

### content/work/ordani.mdx
```mdx
---
title: "ORDANI: HIPAA-compliant CRM for birth workers"
titleLines:
  - "ORDANI: HIPAA-compliant"
  - "CRM for birth workers"
description: "Birth workers run practices on group chats and paper intakes. I founded and built ORDANI, where intake completion went from 40% to a measured 91%."
dek: "A HIPAA-compliant CRM for birth workers, and a company I founded and built. Intake completion went from 40% to a measured 91%. Active paying users in beta, none lost to a competitor, public release coming."
client: "ORDANI, my company"
clientNameProtected: false
atAGlance:
  - label: "My role"
    value: "Founder and sole engineer"
  - label: "The work"
    value: "Practitioner interviews, a progressive intake flow, a HIPAA-compliant build shaped with birth workers and cyber security experts, and a closed beta"
results:
  lead: "Intake completion 40% to 91%."
  rest: "Active paying users in beta, none lost to a competitor."
entry:
  context: "ORDANI, my company"
  line: "Intake completion went from 40% to a measured 91%."
  did: "A HIPAA-compliant CRM for birth workers, and a company I founded and built."
service: product-building
publishedAt: "2026-05-14"
status: in-flight
order: 3
---

import { CITATIONS } from "../citations";

export const CDC = CITATIONS.ORDANI_CDC_2024.FIGURES;

## Six apps and a Sunday night

Birth workers, doulas, midwives and perinatal counselors, were not running their practices on nothing. They were running them on half a dozen tools: a scheduler, an invoicing app, a form builder for intake, a notes app, a payments app, and a group chat holding it together.

Each one did its own job. None of them talked to the others, so the practitioner became the integration, copying the same client's details from one app into the next on a Sunday night. The monthly bill for six subscriptions added up to a system nobody had designed.

Nobody I spoke to was shopping for a platform. Nobody had ever offered them one built for their work, so they did not know to want it. And HIPAA is the law for all of it: every copy of a client's details in another app was one more place that data lived.

## Why it matters

In the United States, non-Hispanic Black women die from maternal causes at {CDC.blackRate} per {CDC.per}, {CDC.ratio} times the rate of non-Hispanic white women, per the CDC's {CDC.releaseYear} release. Doulas and midwives, disproportionately Black women themselves, are one of the most evidence-supported interventions against that gap. The data they hold is sensitive and almost never properly protected. The market has not shipped for these workers because the market does not see them.

## What I did

<Step n="01" lead="I talked to birth workers before writing a line of code.">Four weeks of unpaid conversations: what they used, what they hated, what they would never give up, what they would pay for. Two patterns came back. Nobody asked for a platform, because nobody had been offered one that understood their work. And everybody wanted intake to stop eating their Sundays.</Step>

<Step n="02" lead="I made intake one flow instead of a form wall.">The tools they had dropped fifteen pages of medical forms on a pregnant person at one in the morning. I built a single conversational flow that adapts to the practitioner's preferences and saves at every step. Completion went from a self-reported 40% to a measured 91%.</Step>

<Step n="03" lead="I built it HIPAA-compliant, and not on my own judgment.">An app holding this data has to be shaped by the people who understand both halves of it. That means the birth workers whose practice lives inside it, and people who work in healthcare and in cyber security. Ordani has a small team around it for that reason. How the protections work is not something a HIPAA product publishes, so this page does not.</Step>

<Step n="04" lead="I shipped to a closed beta first.">Free for the first year in exchange for weekly feedback calls. By the end of it, practitioners were using it every week, referring peers, and none had left. That beta is where today's paying practitioners started.</Step>

<ChapterBreak src="/ordani-intake.jpg" width={1600} height={1068} alt="A doula sits with a pregnant client on a couch, writing on a notepad as they talk." />

## What it became

One intake instead of fifteen pages, and 91% of clients finish it. The practitioner opens a Tuesday-morning view of the week instead of a spreadsheet and a group chat. The screens hold real client data, so this page describes them rather than shows them.

## Questions buyers ask

**Can one person build a HIPAA product?** One person can write the code. Nobody should decide alone what "compliant" means, which is why birth workers, healthcare people and security people shaped it.

## If you have the idea and no team

You have the idea, the budget, and customers waiting. What you do not have is the team to build it. I build it: strategy, design, code, security and launch, with nothing handed to a second team.
```
The old `<PullQuote attribution="A beta user, name withheld">` (`content/work/ordani.mdx:67-70`)
is not in the locked draft, so it does not ship. See §2.10.

### content/work/content-engine.mdx
```mdx
---
title: "AI content engine: up to 800,000 impressions"
titleLines:
  - "AI content engine:"
  - "up to 800,000 impressions"
description: "I built the AI content engine that turns one rough video into a week of content for a social activist. Monthly impressions peaked at 800,000."
dek: "A social activist whose message landed in every room and nowhere online. I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work: finished videos, the blog post, and the whole marketing flow for the idea it argues. Monthly impressions went from a few thousand to a peak of 800,000, and one income stream became four."
client: "A social activist"
clientNameProtected: true
atAGlance:
  - label: "My role"
    value: "Strategist and builder"
  - label: "What I built"
    value: "The platform strategy, the AI content engine, the video pipeline, and the handoff to their content lead"
results:
  lead: "A peak of 800,000 impressions in a month, up from a few thousand, across eight platforms."
  rest: "One income stream became four: books, services, speaking and courses."
entry:
  context: "A social activist"
  line: "Up to 800,000 impressions in a month, up from a few thousand a month."
  did: "I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work."
service: product-building
publishedAt: "2026-09-01"
status: shipped
order: 4
---

## The room was full and the internet was empty

In person, the work landed. Online, the same message reached a few thousand people a month across every platform combined.

Content went out weekly-ish, made by hand by an assistant and the activist themselves. Every video, blog post, newsletter and digital event came one at a time, and each one cost money and hours. A talk that took days to prepare was seen by the room and then by nobody.

That reads as a marketing problem and it is not. The message was already good. Nothing carried it, and nothing turned attention into income.

## What I did

<Step n="01" lead="I measured before I wrote anything.">I went through what had already been published and sorted it by what travelled and what died. The pattern set the strategy, not my taste.</Step>

<Step n="02" lead="The strategy document, 25 pages.">Platform by platform. Not "post more". A weekly cadence, a content-pillar map, a measurement frame, and the exact experiments to run in the first 90 days. I wrote it so their content lead could run it without supervision. It became the operating system their content lead still runs.</Step>

<Step n="03" lead="The bet.">The work went out on eight platforms: LinkedIn, YouTube, Facebook, Instagram, TikTok, X, Threads and Bluesky. I did not treat them equally. I picked two to overinvest in and one to underinvest in, on purpose. The two got the weekly cadence, because that is where the people who buy this work were already reading. Production time went where it converted.</Step>

<Step n="04" lead="The video pipeline.">The activist records something quickly, with no editing and no crew. The engine takes that raw video and returns a finished one, ready to publish. I started from an open source video tool and extended it well past what it does out of the box, so each video is assembled in code instead of by hand in an editor. The same source video also produces the blog post and the rest of the marketing flow for the idea it argues. That means the posts, the newsletter, and the copy that sells the product or event behind it.</Step>

<Step n="05" lead="Their words, not a model's.">The engine drafts from what the activist has already published and said, so the language stays theirs.</Step>

<Step n="06" lead="The production line.">A weekly queue, a review step, and a publishing window per platform. The cadence held because the week's work was ready before it was due.</Step>

<Step n="07" lead="The handoff.">I trained their content lead on the system and stayed on retainer. Not "I am the agency now". The work is "you have the system, and I am the second brain when the platforms change". Algorithm shifts, new platform launches, policy changes: that is the retainer.</Step>

## The part most content work skips

Reach is not the product. Revenue is. I built the engine so each piece of content pointed at something the activist sells. One recording can carry an idea all the way from a clip to a page that asks for the sale.

That is what changed the business. Before, the income came from one stream. After, four: books, services, speaking and courses.

## What changed

- Monthly impressions grew from a few thousand a month to a peak of 800,000 in a month.
- Eight platforms carried the work, and two carried the weekly cadence. The two I backed outperformed the one I did not, as planned.
- One income stream became four: books, services, speaking, courses.
- More content at a higher quality, with less money and fewer hours going into producing it.
- A 25-page strategy sits with their content lead, who runs it without supervision.
- I stayed on retainer for the platform and algorithm shifts that come next.

## Questions buyers ask

**What is an AI content engine?** A system that turns one piece of source material into the week's work: the finished video, the posts, the blog, the newsletter, and the copy that sells whatever the idea points at. A person approves each piece.

**Will it sound like me?** It drafts from what you have already published, so the phrasing stays yours.

**Do I need a studio?** No. Here the input is an unedited video recorded quickly, and the pipeline does the rest.

## If your message is stuck in the room

You have the audience, the message and the demand. What you do not have is the team to build the machine that carries it. I build it: strategy, design, code, security and launch, all mine. Then I train the person who runs it and stay on retainer for the platform shifts that follow.
```
`entry.line` above uses the REACH ruling's exact wording, not a draft sentence. Every number in
it appears in the body ("a few thousand a month", "800,000"), as LESSONS #2 requires.

### content/work/birth-worker.mdx (new)
```mdx
---
title: "Growing a birth worker's practice"
titleLines:
  - "Growing a"
  - "birth worker's practice"
description: "Bookings from one to three a month to five to ten. I repositioned a birth worker's practice, rebuilt her booking path and set up her insurance claims."
dek: "She was booked one to three times a month, almost always for the same service, and part of every Medicaid payment went to processing fees. I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly. Bookings went to five to ten a month, and thousands of dollars stopped going to fees."
client: "A birth worker"
clientNameProtected: true
atAGlance:
  - label: "My role"
    value: "Positioning, website, marketing and back-office operations"
  - label: "The work"
    value: "Reading her own inquiries, talking to past clients, naming the range, rebuilding her website and booking path, the marketing that carried it, and direct insurance claims"
results:
  lead: "Bookings from one to three a month to five to ten."
  rest: "Thousands of dollars kept that used to go to claims-processing fees. Requests across her whole range instead of one service."
entry:
  context: "A birth worker"
  line: "Bookings went from one to three a month to five to ten."
  did: "I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly."
service: positioning-gtm
publishedAt: "<YYYY-MM-DD, the local date of the Pass-120 content commit>"
status: shipped
order: 5
---

## Her practice was bigger than her booking form

Clients booked her for births. That is what people asked for, and that is what her page offered. The care she gave in the months around a birth was work she had trained for and practised for years, and almost nobody asked for it, because nothing told them they could.

This is a positioning problem I see again and again in a practice of one. The market's picture of you is narrower than your skill, and it stays that way until you change what a stranger reads first.

The second problem was quieter. Part of her work was paid through Medicaid and Medicare, and a slice of every claim went to whoever processed it. Every booking she won cost her a fee she never saw on a bill.

## What I did

<Step n="01" lead="I read her own inquiries before I wrote anything.">Where they came from, what they asked for, and what she quoted. The pattern was the diagnosis: one service, over and over.</Step>

<Step n="02" lead="I talked to people she had already cared for.">They did not describe a service. They described a person who was there for the whole thing. That gap, between how clients talked about her and how her page talked about her, was the brief.</Step>

<Step n="03" lead="I named the range as one offer.">Not a longer menu. One arc of care around birth, with the birth itself as a part of it rather than the whole thing. A menu asks a stranger to diagnose themselves. A named arc tells them they are in the right place.</Step>

<Step n="04" lead="I rebuilt her website around it.">How she introduces herself, what her first screen says she does, and how her services are grouped.</Step>

<Step n="05" lead="I put the new position in front of the people looking.">The posts and listings that carried it said the new thing in her own voice, so someone searching for care before or after a birth found her instead of a directory.</Step>

<Step n="06" lead="I rebuilt the path from question to booking.">One route from first message to booked consult, so an inquiry about care beyond the birth itself had somewhere to go, and the words for answering it were already written.</Step>

<Step n="07" lead="I set up her claims so the fees stopped.">I set up direct Medicaid and Medicare claims for her birth work. She kept thousands of dollars that would otherwise have gone to processing fees.</Step>

## What changed

- Bookings went from one to three a month to five to ten.
- Requests started arriving across her whole range instead of one service.
- Thousands of dollars that used to go to claims-processing fees now stay in her practice.
- She keeps running it. The language and the booking path are hers now, not a document I left behind.

## Why I know this world

I later founded and built Ordani, a HIPAA-compliant CRM for birth workers, and it exists because of engagements like this one.

## Questions buyers ask

**What does repositioning actually change?** What a stranger reads first, and what they think they can ask you for. Here it moved the bookings from one service to a whole practice.

**Does positioning work for a practice of one?** That is often where it moves quickest: there is no committee between the decision and the page.

**How long before bookings move?** Here, the new bookings started inside the first few weeks of the new introduction and booking path.

## If your buyers only ask for one of the things you do

I read what your buyers ask for, talk to the people you have already served, and name the offer they are actually buying. Then I rewrite what a stranger reads first, and you run it without me. The same method, at enterprise scale, is [the Guardicore story](/work/guardicore).
```
The `publishedAt` value above is the one slot the executor fills: a real date in `YYYY-MM-DD`,
double-quoted, with the angle-bracket text replaced. The schema regex rejects the placeholder,
so the build fails if it is left in.

### At-a-glance normalisation (the one deliberate change from the drafts)
The drafts write at-a-glance values in inline sentence fragments ("- **My role:** strategist
and sole builder."). As `dd` values they get a capital first letter. A value that is one phrase
loses its trailing period. The two-sentence client lines split their `Name protected` sentence
into `clientNameProtected: true`. The Results values keep their sentences. No word is changed.

---

## 2.4 The record block and the method line: `content/work-page.ts` (new)

The record block **diverges from `components/color-worlds/ExitRecord.tsx` on purpose**, and that
component stays unchanged on the home page. It sorts by deal value (`ExitRecord.tsx:14-16`),
while /work sorts by exit year. It carries no role, while /work needs one. It prints
SurveyMonkey's $2.33B and Guardicore's $600M, which the /work rows do not carry. Its heading
wording differs too. Merging the two would change the home page, which is out of scope. V7 keeps
the two in agreement on facts by checking every year and value against
`CITATIONS.EXITS_COMBINED_VALUE.DEALS`.

Create `content/work-page.ts` with exactly:
```ts
// content/work-page.ts
//
// Pass-120. Copy for /work that is not a case study: the method line and the record block.
// Rulings: LESSONS #3, THE /WORK METHOD LINE (2026-09-16) and the record-block rows
// (operator 2026-09-15, descriptions confirmed 2026-09-16). Event years only, never tenure.
// The block DIVERGES on purpose from components/color-worlds/ExitRecord.tsx (home):
// sorted by exit year, carries roles, no deal values except Postmates'. Every year and value
// below must match CITATIONS.EXITS_COMBINED_VALUE.DEALS (checked by the Pass-120 V7 command).

export const METHOD_LINE =
  "I find what your buyers are actually paying for, then build the system that sells exactly that.";

export const RECORD = {
  id: "record",
  heading: "Also on the record",
  line: "Four of the companies I worked inside reached an exit.",
  rows: [
    {
      company: "SurveyMonkey",
      role: "Enterprise sales",
      outcome: "IPO, 2018",
      description: "$1M+ in enterprise sales toward the 2018 IPO.",
      href: null,
    },
    {
      company: "Postmates",
      role: "Product analyst",
      outcome: "Acquired by Uber, $2.65B, 2020",
      description:
        "Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.",
      href: null,
    },
    {
      company: "Guardicore",
      role: "Revenue and positioning",
      outcome: "Acquired by Akamai, 2021",
      description:
        "$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.",
      href: "/work/guardicore",
    },
    {
      company: "Neuton.AI",
      role: "Helped launch",
      outcome: "Technology acquired by Nordic Semiconductor, 2025",
      description:
        "North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.",
      href: null,
    },
  ],
} as const;
```
The template renders `role` and `outcome` as two separate mono spans with no separator glyph
between them. It never renders the pair joined as one string such as "Helped launch · 2025". The
element carrying `id={RECORD.id}` is the block's `<section>`.

Also in the same commit, `content/citations.ts:96`:
`citedIn: ["content/work/ordani.mdx (Why it matters, renders FIGURES)"],`. Add
`"content/work-page.ts (record block, years and values checked)"` to
`EXITS_COMBINED_VALUE.citedIn` (`content/citations.ts:27-34`).

---

## 2.5 The /work entries: four data points each, as they render

These are read from each study's frontmatter (§2.3). Nothing here is typed a second time into
`app/(foyer)/work/page.tsx`. The service label comes from `SERVICE_LABELS`.

| Order | Context label (mono) | Figure-bearing line (Bricolage) | What he did (Hanken 18) | Service (mono) |
|---|---|---|---|---|
| 1 (lead, hero scale) | `Guardicore, acquired by Akamai` | `$14M` at 112, then `in revenue, sourced and closed, at a $1.2M average enterprise deal.` | `I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals. Akamai acquired the company in 2021.` | `Positioning & GTM` |
| 2 | `An award-winning author and leadership consultant who teaches government bodies and corporations` | `$3M in signed contracts across eleven awards.` | `It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.` | `AI engineering` |
| 3 | `ORDANI, my company` | `Intake completion went from 40% to a measured 91%.` | `A HIPAA-compliant CRM for birth workers, and a company I founded and built.` | `Product building` |
| 4 | `A social activist` | `Up to 800,000 impressions in a month, up from a few thousand a month.` | `I wrote the platform strategy, then built an AI engine that turns one rough video into the week's work.` | `Product building` |
| 5 | `A birth worker` | `Bookings went from one to three a month to five to ten.` | `I repositioned the practice around the full arc of care, rebuilt how clients find and book her, and set up claims she could file directly.` | `Positioning & GTM` |

No entry carries a year beside a role, a `Name protected` label, a stat trio or a second link.
The only years on /work are event years inside a sentence (Akamai 2021 in entry 1) and in the
record rows.

## 2.5a The method line, exact, once, on /work only
```
I find what your buyers are actually paying for, then build the system that sells exactly that.
```
It renders from `METHOD_LINE` in `content/work-page.ts`, never as a literal in a `.tsx` file.

---

## 2.6 ORDANI's CDC figures render from `content/citations.ts` (Pitfall E2)

Add a structured `FIGURES` object inside `ORDANI_CDC_2024`, directly after `quotedStatistics`
(`content/citations.ts:91-95`):
```ts
    // Pass-120: the values the ORDANI page RENDERS. Each is read off quotedStatistics above;
    // content/work/ordani.mdx imports these, so no figure is typed into prose (Pitfall E2).
    FIGURES: {
      blackRate: "44.8",
      whiteRate: "14.2",
      ratio: "3.15",
      per: "100,000 live births",
      releaseYear: "2024",
    },
```
`content/work/ordani.mdx` imports it relatively (`import { CITATIONS } from "../citations";`,
which resolves to `content/citations.ts`) and renders `{CDC.blackRate}`, `{CDC.per}`,
`{CDC.ratio}` and `{CDC.releaseYear}` (§2.3). MDX ESM `import`/`export` in a page body is
supported by `@next/mdx` in this version: see `node_modules/next/dist/docs/01-app/02-guides/mdx.md`,
"Using imports" (line 174). The rendered sentence must read exactly:
```
In the United States, non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births, 3.15 times the rate of non-Hispanic white women, per the CDC's 2024 release.
```
`whiteRate` is carried for traceability and not rendered, because the locked draft sentence does
not print 14.2. React SSR puts `<!-- -->` between adjacent text nodes, so the visible-text probe
strips comments before it matches.

---

## 2.7 `app/llms.txt/route.ts`: the study lines (replace `:40-43` with exactly these five, in this order)
```
- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): A Tel Aviv security company was selling a feature the market already had. I found what North American banks were buying, moved the story, and sold \$14M.
- [RFP engine case study](https://www.micahjonesconsulting.com/work/rfp-engine): I built RFP discovery, scoring and drafting around one expert's own body of work. \$3M signed, and the close rate doubled from one in eight to one in four.
- [Ordani case study](https://www.micahjonesconsulting.com/work/ordani): Birth workers run practices on group chats and paper intakes. I founded and built ORDANI, where intake completion went from 40% to a measured 91%.
- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): I built the AI content engine that turns one rough video into a week of content for a social activist. Monthly impressions peaked at 800,000.
- [Birth worker case study](https://www.micahjonesconsulting.com/work/birth-worker): Bookings from one to three a month to five to ten. I repositioned a birth worker's practice, rebuilt her booking path and set up her insurance claims.
```
The `\$` is the escape inside that file's template literal. The file's "Background" lines
(`:30-34`) belong to the live-claims sweep section, not this one.

---

## 2.8 Verification (commands and expected output)

The four standing clauses apply: count what renders; never reinterpret an expected value; measure
the render, not the model; scope from the layout and look at the capture. V1 to V8 need no
server. V9 and V10 need `pnpm build && pnpm start`, serving `http://localhost:3000`.

Write this helper once as `.planning/exec/p120-text.mjs`. It prints a count of matches in
**visible** text: `<head>`, every `<script>` and `<style>`, and HTML comments are stripped first,
and entities are decoded.
```js
// usage: node .planning/exec/p120-text.mjs <url> <needle>        -> count of literal needle
//        node .planning/exec/p120-text.mjs <url> --re <regex>    -> count of regex matches
const [url, a, b] = process.argv.slice(2);
const html = await (await fetch(url)).text();
const text = html
  .replace(/<head[\s\S]*?<\/head>/i, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ");
const n = a === "--re" ? (text.match(new RegExp(b, "g")) ?? []).length : text.split(a).length - 1;
console.log(n);
```

**V1 typecheck.** `pnpm typecheck` → exit 0, no output lines from tsc.

**V2 schema and copy gate.** `pnpm lint:copy` → exactly
`[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.`

**V3 retired keys and components are gone.** This counts comments too, so no comment may name a
retired key. `components/CaseStudySidebar.tsx` is deleted by the template section, and the
rewritten `page.tsx` header comment (`:1-19`) must not name the old fields.
`grep -rnE "titleCardWords|heroStill|indexLine|CaseStudySidebar|cs\.year|cs\.tools|cs\.role|\.stats\b|\.feature\b" app components lib content mdx-components.tsx | wc -l`
→ `0`

**V4 file set.** `ls content/work` → exactly these six lines:
`birth-worker.mdx` `content-engine.mdx` `guardicore.mdx` `ordani.mdx` `passioneer.mdx` `rfp-engine.mdx`.
`ls public/guardicore-telaviv.jpg 2>&1 | grep -c "No such file"` → `1`.
`grep -rn "guardicore-telaviv.jpg" app components content | wc -l` → `0`.

**V5 order, service, publishedAt** (run AFTER the content commit):
```bash
node_modules/.bin/tsx -e '
import { getAllCaseStudies, isPublished } from "./lib/case-studies";
import { execSync } from "node:child_process";
const all = (await getAllCaseStudies()).filter(isPublished);
let ok = 0;
for (const s of all) {
  const first = execSync(`git log --follow --diff-filter=A --format=%as -- content/work/${s.slug}.mdx`).toString().trim().split("\n").pop();
  if (first === s.publishedAt) ok++;
  console.log(s.order, s.slug, s.service, s.entry.figure ?? "-");
}
console.log(`publishedAt: ${ok} of ${all.length} match first-commit date`);'
```
Expected output, exactly:
```
1 guardicore positioning-gtm $14M
2 rfp-engine ai-engineering -
3 ordani product-building -
4 content-engine product-building -
5 birth-worker positioning-gtm -
publishedAt: 5 of 5 match first-commit date
```

**V6 retired claims in source (expect 0 each).**
`grep -rniE "industry author|industry-authority|the same engagement|290,000|290K|\b8K\b|8,000|36×|36x|every practitioner had been hacked|one of four companies I worked inside|Helped launch · 2025|client revenue|consulting revenue|anti.racism|repositioned toward|organic bookings" content lib/case-study-schema.ts | wc -l` → `0`
`grep -rnE "(19|20)[0-9]{2} ?[-–] ?(19|20)[0-9]{2}" content | wc -l` → `0`
`grep -c "—" content/work/guardicore.mdx content/work/rfp-engine.mdx content/work/ordani.mdx content/work/content-engine.mdx content/work/birth-worker.mdx content/work-page.ts` → every line ends `:0`
`grep -ciE "caption" content/work/*.mdx | grep -v ":0" | wc -l` → `0`
`node scripts/vendor-gate.mjs` → `vendor-gate: clean`
`node scripts/retired-phrases-gate.mjs` → `retired-phrases-gate: clean`
`node scripts/ordani-claims-gate.mjs 2>&1 | grep -ci "content"` → `0` (its 10 findings live only
in `product\playbook\src`, and they predate this pass: `gates.md` §2.9).

**V7 record data matches the citation and counts itself.**
```bash
node_modules/.bin/tsx -e '
import { RECORD, METHOD_LINE } from "./content/work-page";
import { CITATIONS } from "./content/citations";
const D = CITATIONS.EXITS_COMBINED_VALUE.DEALS;
const years = RECORD.rows.map(r => r.outcome.match(/(\d{4})$/)?.[1]);
const sorted = [...years].sort().join() === years.join();
const match = RECORD.rows.every((r, i) => { const d = D.find(x => x.company === r.company); return d && d.year === years[i]; });
const pm = RECORD.rows[1].outcome.includes(D.find(x => x.company === "Postmates").value);
const four = RECORD.line.startsWith("Four ") && RECORD.rows.length === 4;
console.log(`record: ${RECORD.rows.length} rows, years ${years.join(" ")}, sorted ${sorted}, citations ${match && pm}, count ${four}`);
console.log(METHOD_LINE.length);'
```
Expected output, exactly:
```
record: 4 rows, years 2018 2020 2021 2025, sorted true, citations true, count true
95
```

**V8 CDC is not typed into prose.**
`grep -cE "44\.8|14\.2|3\.15|100,000" content/work/ordani.mdx` → `0`
`grep -c "{CDC.blackRate}" content/work/ordani.mdx` → `1`

**V9 what renders (server running).** Each command prints a number, and the expectation is `-ge 1`:
```bash
node .planning/exec/p120-text.mjs http://localhost:3000/work/ordani "at 44.8 per 100,000 live births, 3.15 times the rate of non-Hispanic white women, per the CDC's 2024 release."
node .planning/exec/p120-text.mjs http://localhost:3000/work "I find what your buyers are actually paying for, then build the system that sells exactly that."
node .planning/exec/p120-text.mjs http://localhost:3000/work "Four of the companies I worked inside reached an exit."
node .planning/exec/p120-text.mjs http://localhost:3000/work "Technology acquired by Nordic Semiconductor, 2025"
node .planning/exec/p120-text.mjs http://localhost:3000/work "An award-winning author and leadership consultant who teaches government bodies and corporations"
node .planning/exec/p120-text.mjs http://localhost:3000/work/birth-worker "Bookings went from one to three a month to five to ten."
node .planning/exec/p120-text.mjs http://localhost:3000/work/rfp-engine "What the engine did"
```
Then two expect-0 lines per route, for each of `/work`, `/work/guardicore`, `/work/rfp-engine`,
`/work/ordani`, `/work/content-engine` and `/work/birth-worker`:
```bash
node .planning/exec/p120-text.mjs http://localhost:3000<route> --re "(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}"   # expect 0
node .planning/exec/p120-text.mjs http://localhost:3000<route> "Helped launch · 2025"                      # expect 0
```
`node .planning/exec/p120-text.mjs http://localhost:3000/work/postmates "Postmates"` is not a
check here: the retired routes are the index section's redirect checks.

**V10 JSON-LD carries the hidden date and no tenure year.**
`curl -s http://localhost:3000/work/guardicore | grep -o '"datePublished":"[^"]*"'` → `"datePublished":"2026-05-14"`.
Open `http://localhost:3000/work/rfp-engine/opengraph-image` once and look at it. Pass means the
title lines, the client line and the `results.lead` caption all sit inside the 1200x630 frame
with nothing clipped. Name the saved capture `og-rfp-engine.png`.

**Prove the gates bite (standing clause 3), once, before the commit.** Add `year: 2018-2021` to
guardicore.mdx's frontmatter and run `pnpm lint:copy`. It must report a schema violation on
`content/work/guardicore.mdx`. Then revert the line and re-run V2. Separately, type `44.8`
literally into the ordani.mdx "Why it matters" paragraph and run V8. The first line must print
`1`. Revert that too.

---

## 2.9 Rejected for this section

- **Keeping `year`, `role` or `tools` as hidden fields.** A hidden `year` is one template edit
  away from printing a tenure year again. The strict schema makes a reintroduced `year` key fail
  the build.
- **Reusing `ExitRecord` for /work** or extending `DEALS` with roles. That means a different
  sort, different fields and a change to the home page. See §2.4.
- **Hardcoding the CDC figures, or a `<CdcStat>` component with the sentence inside it.** The
  sentence belongs in the MDX. Only the numbers come from the citation.
- **A 112 result figure on every study band.** The design uses 112 once, on the /work lead
  entry. The study band's largest size after the title is the `results.lead` at 36.
- **`Name protected` as the /work context label** (the mocks). The rulings restore the client
  descriptors, and `Name protected` renders only in the at-a-glance Client row.
- **A Guardicore chapter break reusing the band photograph** (the mock shows the same image
  twice), or the stickered `guardicore-telaviv.jpg`.
- **Any caption prop or string on `ChapterBreak`, the band photograph or the clip.** No
  captions ruling.
- **Restoring the ORDANI beta-user pull quote, the 22-interview count or any closed-beta count.**
  None of them is in the locked draft, and counts are banned.
- **The ORDANI FAQ O2 line** (cut 2026-09-16) and the **Guardicore glossary FAQ** (cut
  2026-09-15).
- **A "00. The reposition" step on the RFP study** (Fable craft fix #6, rejected in LESSONS #3).
- **"five months" on the content engine.** The ?12 confirmation covers that period, but the
  locked copy does not print it, and this section adds no copy.

## 2.10 Parked (operator or judge), one line each

- The harness hook `mdx-frontmatter.sh` (outside this repo) must drop `role tools year` before
  any §2.3 write. Applying §2.0's two-line edit to harness config is the operator's call.
- ORDANI draft grammar, placed verbatim: "Birth workers, doulas, midwives and perinatal
  counselors, were not running..." has a comma between subject and verb. Fix it only on a
  dated copy ruling.
- The ORDANI beta-user quote ("It is the first piece of software that treats my practice the way
  I treat my clients.") drops because the locked draft omits it. Confirm it is meant to go.
- BLOCKING (see §2.3 publishedAt): `publishedAt` is defined as the first-commit date, which puts
  Guardicore and ORDANI at 2026-05-14, a pre-launch commit, against a ruling that says "the date
  the page was published". Confirm that, or supply real first-publish dates, before the content
  commit.
- The Guardicore band photograph is 770x575, soft at 2x on a 1440 band. Is a higher-resolution
  clean export of the Tel Aviv frame available?
- The close routes to `/services#<slug>`, but no element on /services has
  `id="ai-engineering"`, `"product-building"` or `"positioning-gtm"` today (the articles carry
  only `key`). Design doc §6 Q7 (block anchor or /contact) is still open.
- The /services Product building receipt still carries 8,000 to 290,000. The rulings give no
  exact replacement string (the live-claims sweep section owns it).
- Birth worker Medicaid naming narrows where she practises (the draft's identity note). Flag it
  at the ship-gate identity read.
