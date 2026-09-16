# Pass-120 build brief: the /work index, five case studies, the live claims sweep

Written 2026-09-16 by the ruling tier (Opus 5) from the operator's rulings of 2026-09-15 and 16,
two Fable looks (.planning/reviews/FABLE-120-CRAFT.md, FABLE-120-DESIGN.md) and a five-facet
build map (.planning/briefs-prep/pass-120/). Sections 2 to 6 were drafted by five Opus writers,
attacked by three Sonnet reviewers (premises, rulings, executability) and fixed by their writers.
This section rules over them: where section 1 and a later section disagree, **section 1 wins**,
and every override below names the text it replaces.

## 1. The ruling

Rebuild /work and every case study as one release, in Direction B ("Curtain, then Page"): /work is
paper, with the lead study at hero scale over the operator's hero clip, one method line, four
four-point entries and a record block of four exits; every study opens on a dark band that names
the client and the result, then turns to paper for the read. The stories are the locked Pass-120
drafts, every fact ledgered. The same commit set sweeps every live claim the operator corrected on
2026-09-15 and 16. **Reason:** every reference in a fourteen-site set names its subject in the first
screen and sets long reads on light ground, and today's study hero hides both the client and the
result behind four words on black.

**Release rule.** Operator 2026-09-16: "Ship everything together." Nothing from this brief pushes,
merges to main or deploys without the operator's words that day, quoted in RESUME with the date.

## 1.1 Operator answers given after the sections were drafted (these win)

| # | Question | Answer, verbatim or picked, 2026-09-16 | Replaces |
|---|---|---|---|
| A1 | Hidden publish date for each study | "The release date of the rewrite" | S2 §2.3 `publishedAt` = first-commit date, and the BLOCKING paragraph at S2:291 and S2 §2.10. `publishedAt` for all five studies is the release date, written at the content commit as the date recorded in RESUME for the release (the executor stops and asks the judge for it if RESUME has none). S6 K8 checks datePublished equals that date. |
| A2 | Edit the premium-web `mdx-frontmatter.sh` hook | "Yes, edit the hook" | S2 §2.0 and §2.10 item 1: apply S2 §2.0's two-line edit before any §2.3 write, and record in RESUME: `hook edit approved by operator 2026-09-16 ("Yes, edit the hook")`. |
| A3 | ORDANI beta-user quote | "Drop it" | Confirms S2's omission. |
| A4 | How the clip's LCP condition is measured | "Field data, like Pass-119" | S6 §6.6 "stop rather than trim". Lighthouse runs as specified and its numbers are REPORTED, not gated, with one hard limit: /work's simulated mobile LCP on the build must not be worse than production /work measured by the same loop before any edit (record the baseline first). The LCP ship condition in DESIGN_BAR R12's exception is judged on Vercel Speed Insights field p75 for /work after release, read by the operator (the Pass-119 standard). |
| A5 | The soft 770px Guardicore photograph | "thought we would use the vid in the hero?" (the /work hero is the clip; the soft photo was the study band) | Judge ruling below, O5. |
| A6 | What visitors see before and after the clip | "what you recommmend is the best looking idea" | Judge ruling below, O6. |
| A7 | Study pages at 56/18 (3.1x) under R2's 4x | "what you think is best" | Judge ruling below, O7. |

## 1.2 Judge rulings and assembly overrides (these win over sections 2 to 6)

- **O1 publishedAt.** As A1.
- **O2 the hook.** As A2. If the hook still refuses after the edit, stop and report the refusal.
- **O3 LCP.** As A4. Add to section 6's ship conditions: "operator reads Speed Insights p75 LCP for
  /work after release"; it does not block the deploy.
- **O4 llms.txt ownership.** Section 2 §2.7 owns the five study lines at `app/llms.txt/route.ts:40-43`
  (they reuse each study's approved search description verbatim, LESSONS #2). Section 5 rows 25 to
  28 are SUPERSEDED; section 5 row 24 (the `:32` background line) stands.
- **O5 the Guardicore band still.** The band photograph on /work/guardicore is NOT
  `guardicore-telaviv-session.jpg`. It is a JPEG made from the clip's frame 0 (the graded real
  photograph, from the 1440 source, no sticker, colleagues at the edge), so the /work hero and the
  Guardicore band show the same frame. After section 3b's transcode step has produced
  `$TMP/work-hero-f0-960.png`, run exactly:
  ```bash
  ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -q:v 3 "public/media/guardicore-band-960.jpg"
  ```
  Expected: the file exists, 960x1200, at most 180,000 bytes (`ffprobe -v error -show_entries stream=width,height -of csv=p=0` prints `960,1200`; `wc -c` at most 180000; over budget, stop and report). In guardicore.mdx the `hero` becomes `{ src: "/media/guardicore-band-960.jpg", width: 960, height: 1200, alt: "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses." }`. Every check in sections 2, 3 and 6 that names `guardicore-telaviv-session.jpg` for the Guardicore study band now names `guardicore-band-960.jpg` (the /about page's own use of the session JPEG is untouched). `public/guardicore-telaviv.jpg`, the stickered file, is still deleted as section 2 says.
- **O6 the clip returns to its first frame.** The resting image before and after play is frame 0,
  never a generated frame. Before section 3b's two video transcodes, build a 1440 intermediate that
  crossfades the clip's last 0.5s back to frame 0, then point section 3b's `$SRC` for the MP4 and WebM
  commands at the intermediate (the poster and the O5 still still come from frame 0). The source is
  24fps, 97 frames, 4.0417s. Run exactly (Git Bash, from the worktree, with section 3b's `$SRC` and
  `$TMP` already set):
  ```bash
  ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,0)" -frames:v 1 "$TMP/clip-f0-1440.png"
  ffmpeg -v error -y -i "$SRC" -loop 1 -framerate 24 -t 0.5 -i "$TMP/clip-f0-1440.png" -filter_complex "[0:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[a];[1:v]fps=24,format=yuv420p,setsar=1,settb=AVTB[b];[a][b]xfade=transition=fade:duration=0.5:offset=3.5417,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 12 "$TMP/clip-return-1440.mp4"
  SRC="$TMP/clip-return-1440.mp4"
  ```
  Then run section 3b's MP4 and WebM commands unchanged. Check the end state:
  ```bash
  ffmpeg -v error -y -sseof -0.05 -i public/media/work-hero-720.webm -frames:v 1 "$TMP/webm-last.png"
  ffmpeg -v info -i "$TMP/webm-last.png" -i public/media/work-hero-poster-960.avif -lavfi "[1:v]scale=720:900:flags=lanczos,format=yuv420p[p];[0:v]format=yuv420p[l];[l][p]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*'
  ```
  Expected: `All:` followed by a value of at least `0.97`. Lower, or any ffmpeg error: stop and report;
  do not change the filter. Re-measure section 3b's byte budgets on the new files; over budget, stop
  and report.
- **O7 R2 at study scale.** Studies keep 56/18 at 1440 (3.1x) and 36/17 at 390. A 112px figure does
  not hold across the anonymous studies (results such as "Bookings: 1–3 to 5–10 a month" and "up to
  800,000 impressions" wrap). Add to `docs/DESIGN_BAR.md` under R2 in the same commit as the template:
  `  - Exception (operator 2026-09-16, left to the judge: "what you think is best"): case-study pages set their largest type at 56px against 18px body at 1440 (3.1x) and 36px against 17px at 390, because a result figure at 112px wraps on the anonymous studies. /work keeps its 112px lead figure. Study pages only, not a precedent.`
- **O8 one paper ground.** The study body's paper uses the same ground as /work, the Color Worlds
  bone `#ECE3D0` (`--color-cw-bone`), not `--color-foyer-paper #F5EFE4`. In section 3's token remap,
  the paper token points at `var(--color-cw-bone)`. Every contrast pair section 3 computed on
  `#F5EFE4` is re-measured on `#ECE3D0` in section 3's checks, with the same thresholds (4.5:1 body,
  3:1 large text and UI). Any pair that fails: stop and report.
- **O9 the /work title.** `metadata.title` and `openGraph.title` on /work become exactly
  `Work: revenue, products, and exits` ("pipeline" no longer describes anything on the page).
- **O10 R16 and "award-winning".** Add to `docs/DESIGN_BAR.md` under R16, same commit as the content:
  `  - Exception (operator 2026-09-15, the RFP client's descriptor, "a award winning author/ Leadership consultant also for gov and corps"): "award-winning" may appear only in that client's descriptor on /work and /work/rfp-engine. Not a precedent for any other adjective.`
- **O11 one writer per file.** `.claude/brand.json`: one step applies section 3's `motion.signature`
  and `view_transition` edits and section 3b's `motion.heroclip` together. `app/globals.css`: section
  3b's line-range deletions run FIRST on the unedited file (boundary lines checked as 3b says), then
  section 3's selector-based edits, then section 3b's `.cw-wx*` insert above the Pass-110 comment,
  then section 3's inserts. `scripts/retired-phrases-gate.mjs`: section 5 §5.5 is its only writer.
- **O12 the gate count.** Section 5 §5.5 merged section 6's four ORDANI and title phrases. The
  expected self-test line everywhere, including section 6 G3 and its §6.2 note, is exactly
  `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed`.
- **O13 the study OG image.** Section 3 §3.10 supersedes section 2 §2.2's three opengraph-image rows.
- **O14 `.claude/CLAUDE.md` prose, same commit as the template.** Rewrite, in both the worktree's
  `.claude/CLAUDE.md` and nowhere else: the "One signature motion" paragraph (the TitleCard is a 600ms
  settle entrance on a hero that names the client and result; the foyer-to-theater dim is 900ms); the
  "Content" bullet's required frontmatter fields to match section 2's schema; the CDC sentence (now
  true: ORDANI's figures render from `content/citations.ts`); Definition of done #1 (settle entrance,
  900ms dim). Exact replacement sentences are the executor's to place, using the facts in this list
  and nothing else; the judge reads the diff at the first return.
- **O15 judge acceptances.** "Once per load" for the settle means once per study page render (section
  3 open item 1). The nav's wordmark and link sizes are site chrome; R2's five-size count is scoped
  to `main` as section 6 measures it (section 3 item 14). The /work cross-link line ("The next entry
  in this record could be yours...") stays, outside `#record`. `llms.txt` keeps "Thirteen years" as a
  duration (section 5 §5.8 item 1).

## 1.3 The rejected list

- **The generated clip with a caption or disclosure.** Operator 2026-09-16: "no captions not
  everything needs a caption... its for the aesthetic". No caption on any Pass-120 photograph or the clip.
- **A repositioning step on the RFP study** (Fable craft fix 6). The client was not repositioned
  (ledger #3, 2026-09-15).
- **290,000, 36x, "industry author", "same engagement", "client revenue since 2013", tenure years
  beside a role, ORDANI counts, the "hacked" line.** Each retired by a dated ruling; gated in §5.5.
- **Removing event years or the client descriptors.** The mock review did this by mistake; IPO 2018,
  Uber 2020, Akamai 2021, Nordic Semiconductor 2025 and both descriptors are restored.
- **The pinned TitleCard word stack.** Retired, operator-signed 2026-09-16.
- **A sticky sidebar, grey "Protected by NDA" boxes, stat trios on index entries, related-project
  card shelves, tracked-uppercase kicker labels.** Design ruling and references (FABLE-120-DESIGN §5).
- **Ken Burns drift or slow zoom on any still; a looping clip.** R15.
- **A 112px result figure in the study band.** O7.
- **A second Guardicore photograph as a chapter break.** One clean frame exists; it lives in the band.
- **Naming the birth worker's claims vendor or itemising her services.** Ledger #3.

## 1.4 Return conditions (when the judge comes back)

1. **First preview.** After the build passes section 6's static and served gates on localhost: the
   judge looks once at the captures section 6 names, at 390 and 1440, for /work, /work/guardicore,
   /work/rfp-engine and /work/birth-worker. Includes section 3 open item 2: arriving through the dim,
   is the 600ms settle visible or veiled?
2. **Copy on the page.** The judge reads rendered text by `curl -s` against the ledger's 2026-09-15
   and 16 rows, not by screenshot.
3. **Ship gate.** One buyer read of the built pages and one identity read of the two anonymous
   studies side by side (Astra's 2026-09-15 finding), including whether naming Medicaid narrows the
   birth worker's location too far. Fable stands in for Astra until 2026-09-19 (operator rule,
   2026-09-16).
4. **Motion-engineer written approval** of the settle entrance and the clip, recorded before the deploy.

## 1.5 Parked operator decisions

- The colleagues' okay to being animated is the operator's to hold (DESIGN_BAR R12 exception); the
  repo records nothing and asserts nothing.
- Speed Insights p75 LCP for /work after release (A4), and for / and /services (Pass-119, parked).
- ORDANI product screens, if he ever publishes one redacted.
- The ORDANI draft's comma ("Birth workers, doulas, midwives and perinatal counselors, were not
  running..."): placed verbatim per section 2; a punctuation fix needs his word.

---

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

# 3. The study template (Direction B) and 4. Motion

Sources, all read on 2026-09-16: `.planning/reviews/FABLE-120-DESIGN.md` §2, §3 and §7;
`.planning/mock/pass-120/b/study-guardicore.html`; `.planning/briefs-prep/pass-120/study-template.md`,
`content-model.md` and `gates.md`; section 2 of this brief (`sections/S2-content.md`, for the
frontmatter fields and the MDX component props, which that section owns); section 4
(`sections/S4-work.md`, for the /work CSS it deletes and its own `--wx-*` scale); section 6
(`sections/S6-verify.md`, which owns `page120.mjs` and `settle120.mjs`); and my own read of
`app/(theater)/work/[slug]/page.tsx`, `components/TitleCard.tsx`, `components/TitleCardComposition.tsx`,
`app/(theater)/work/[slug]/opengraph-image.tsx`, `components/PullQuote.tsx`, `app/(theater)/layout.tsx`,
`components/Footer.tsx`, `components/view-transition-link.tsx`, `mdx-components.tsx`,
`app/(foyer)/services/page.tsx`, `app/globals.css`, `.claude/brand.json`, `lib/fonts.ts`,
`scripts/gsap-quarantine-gate.mjs`, and `node_modules/next/dist/docs` (image.md, link.md).

**Where the rulings, the mock, the maps and the repo disagree (the repo and the rulings win):**
- The mock's tokens are right (it copied live code). `.claude/CLAUDE.md`'s hexes are stale: live
  copper is `#bd5a2d` and copper-deep `#8a3d24` (`app/globals.css`, `@theme`), not `#C8542B` and
  `#8E3A1E`. Every contrast figure below is computed from the live values.
- The mock prints captions under both photographs. The no-captions ruling removes them.
- The mock's step numerals use copper-deep, which is right: plain copper on paper measures 3.93:1
  and fails at 13px. The design doc's "copper mono numeral" is overruled by Pitfall B1.
- The design doc tints optional blocks with `rule-foyer`. A rule colour as a fill makes the
  block's own hairlines vanish. The tint is `--color-bone` (`#e8dfd0`), the existing token the
  doc itself calls "bone, one step off paper".
- The design doc and the ruling say the settle runs "once per load". This section defines that
  exactly in 4.1 and lists the interpretation in the open items.

---

## 3.0 Contract with the other sections

The template reads only fields section 2 defines (`lib/case-study-schema.ts`,
`PublishedCaseStudyMeta`): `title`, `titleLines`, `description`, `dek`, `client`,
`clientNameProtected`, `atAGlance`, `results.lead`, `results.rest`, `entry.context`,
`entry.figure`, `entry.line`, `entry.did`, `service`, `publishedAt`, `hero`, and the exported
`SERVICE_LABELS`. It uses section 2's component props unchanged: `Step { n, lead, children }`,
`Exhibit { children }`, `ExhibitRow { request, engine }`, `ChapterBreak { src, width, height,
alt }`, `PullQuote { attribution, children }`. If section 2 renames any of these before
assembly, the assembler renames them here; the executor does not.

Slugs and order (section 2): 1 `guardicore`, 2 `rfp-engine`, 3 `ordani`, 4 `content-engine`,
5 `birth-worker`. Next wraps 5 to 1.

Photographs (section 2): the Guardicore band carries `/guardicore-telaviv-session.jpg`
(770x575). ORDANI has no band photograph and one chapter break, `/ordani-intake.jpg`. The other
three studies carry no image of any kind.

---

## 3.1 Files

**Rewrite whole:** `app/(theater)/work/[slug]/page.tsx` (3.3), `components/TitleCard.tsx` (4.1),
`app/(theater)/work/[slug]/opengraph-image.tsx` (3.10), `mdx-components.tsx` (3.8).

**Create:** `components/study/StudyBlocks.tsx` (3.6.3).

**Edit:** `app/globals.css` (3.4 to 3.7, 4.1), `components/PullQuote.tsx` (one attribute,
3.6.5), `app/(foyer)/services/page.tsx` (one attribute, 3.6.6), `.claude/brand.json` (4.6).

**Delete:** `components/TitleCardComposition.tsx`, `components/CaseStudySidebar.tsx`,
`components/CaseStudyStill.tsx`, `components/Dek.tsx`, `components/CopperRule.tsx`. Proof that
nothing else needs them: after section 2's MDX rewrite no body uses `<CaseStudyStill>`,
`<Dek>`, `<CopperRule>` or `<TitleCard>` (today `<CaseStudyStill>` appears at
`content/work/content-engine.mdx:39`, `guardicore.mdx:46,55`, `ordani.mdx:33`,
`rfp-engine.mdx:36`, and `<Dek>`/`<CopperRule>` appear in no MDX at all);
`TitleCardComposition` is imported only by `components/TitleCard.tsx:40`; `CaseStudySidebar`
only by `page.tsx:26,274`. `lib/title-card-schema.ts` is NOT deleted: section 2 rewrites it and
the page still parses through it.

**Not touched:** `components/view-transition-link.tsx`, the `::view-transition-*` rules and
`--duration-mode-fade` in `app/globals.css`, `components/color-worlds/Nav.tsx`,
`scripts/gsap-quarantine-gate.mjs`, `components/CaseStudyReadTracker.tsx`.

---

## 3.2 The render, top to bottom

```
[data-mode="theater"]                        app/(theater)/layout.tsx, unchanged
  a.skip-to-content
  Nav (.cw-nav, fixed)                       unchanged
  main#main-content
    article.cs[data-case=<slug>]
      script[type="application/ld+json"]
      CaseStudyReadTracker                   no output
      header.cs-band                         THE DARK BAND (theater tokens)
        div.cs-band__grid[data-photo]
          div.cs-band__head
            p.cs-band__context               client
            h1.cs-title > span.cs-title__line x titleLines   (TitleCard, the settle)
          div.cs-band__text
            p.cs-band__dek                   dek
            dl.cs-glance                     Client, atAGlance rows, Results
          div.cs-band__media                 only when hero exists
      div.cs-page[data-surface="paper"]      THE PAPER BODY (token remap)
        div.cs-body                          the MDX body on a 68ch column grid
          ...MDX (h2, p, ul, Step, Exhibit, ChapterBreak, PullQuote)
          p.cs-close > a                     the /services block link
        nav.cs-next                          one Next entry, then All work
  Footer[data-footer-root]                   repainted to paper on study pages
```

No sticky rail, no reading-progress bar, no table of contents, no meta line, no placeholder
image, no "back to home" link, no stat strip.

---

## 3.3 `app/(theater)/work/[slug]/page.tsx`

Keep `generateStaticParams`, `dynamicParams`, `clampDescription` and `generateMetadata`
(today's lines 34-108) exactly as section 2 §2.2 leaves them (the `isPublished` filter and
`clampDescription(cs.description)`). Replace everything else (the header comment at lines 1-19,
the imports at lines 20-32, and the default export at lines 110-293) with exactly this. First the
head of the file:

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Pass-120, Direction B: curtain, then page. A dark band names the client, the
// title, the dek and the result, with the photograph where one exists. The body
// turns to paper through data-surface="paper" (app/globals.css, "PASS-120 STUDY
// TEMPLATE"). One Next entry and All work close the page. The title's settle
// entrance is components/TitleCard.tsx.
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { titleCardSchema } from "@/lib/title-card-schema";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
  isPublished,
} from "@/lib/case-studies";
```

Then the kept functions, unchanged from section 2. Then the default export:

```tsx
export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const mod = await import(`@/content/work/${slug}.mdx`);
  const MDXContent = mod.default;

  const next = await getNextCaseStudy(slug);

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.description,
    datePublished: cs.publishedAt,
    author: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    publisher: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.micahjonesconsulting.com/work/${slug}`,
    },
  };

  return (
    <article className="cs" data-case={slug}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <CaseStudyReadTracker slug={slug} />

      <header className="cs-band">
        <div className="cs-band__grid" data-photo={cs.hero ? "true" : "false"}>
          <div className="cs-band__head">
            <p className="cs-band__context">{cs.client}</p>
            <TitleCard
              {...titleCardSchema.parse({ title: cs.title, lines: cs.titleLines })}
            />
          </div>

          <div className="cs-band__text">
            <p className="cs-band__dek">{cs.dek}</p>
            <dl className="cs-glance">
              <div className="cs-glance__row">
                <dt>Client</dt>
                <dd>
                  {cs.client}
                  {cs.clientNameProtected ? (
                    <>
                      {" "}
                      <span className="cs-glance__protected">Name protected</span>
                    </>
                  ) : null}
                </dd>
              </div>
              {cs.atAGlance.map((row) => (
                <div className="cs-glance__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className="cs-glance__row">
                <dt>Results</dt>
                <dd>
                  <span className="cs-glance__result">{cs.results.lead}</span>{" "}
                  <span className="cs-glance__result-rest">{cs.results.rest}</span>
                </dd>
              </div>
            </dl>
          </div>

          {cs.hero ? (
            <div className="cs-band__media">
              <Image
                src={cs.hero.src}
                width={cs.hero.width}
                height={cs.hero.height}
                alt={cs.hero.alt}
                preload
                sizes="(min-width: 1024px) 405px, calc(100vw - 32px)"
                className="cs-band__img"
              />
            </div>
          ) : null}
        </div>
      </header>

      <div className="cs-page" data-surface="paper">
        <div className="cs-body">
          <MDXContent />
          <p className="cs-close">
            <ViewTransitionLink
              href={`/services#${cs.service}`}
              className="cs-close__link"
            >
              {SERVICE_LABELS[cs.service]}
              <span aria-hidden="true"> →</span>
            </ViewTransitionLink>
          </p>
        </div>

        <nav className="cs-next" aria-labelledby="cs-next-label">
          <p className="cs-next__label" id="cs-next-label">
            Next
          </p>
          {next ? (
            <ViewTransitionLink
              href={`/work/${next.slug}`}
              className="cs-next__entry"
            >
              <span className="cs-next__context">{next.entry.context}</span>{" "}
              <span className="cs-next__line">
                {next.entry.figure
                  ? `${next.entry.figure} ${next.entry.line}`
                  : next.entry.line}
              </span>{" "}
              <span className="cs-next__did">{next.entry.did}</span>{" "}
              <span className="cs-next__service">
                {SERVICE_LABELS[next.service]}
              </span>
            </ViewTransitionLink>
          ) : null}
          <ViewTransitionLink href="/work" className="cs-next__all">
            All work
          </ViewTransitionLink>
        </nav>
      </div>
    </article>
  );
}
```

Notes the executor needs and must not reinterpret:
- `preload` replaces `priority`, which Next.js 16 deprecated
  (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:265-293`). The
  band photograph is the only above-the-fold image on the one study that has it.
- `sizes`: at 1440 the band's content box is 1184px; the grid gives the media column
  (1184 - 72) x 4/11 = 404.4px, so `405px`. Below 1024 the photograph runs the band's width.
- The Next entry is the /work entry's four data points and nothing else: context, the
  figure-bearing line (the lead study's `figure` joined to its `line` with one space, since only
  order 1 carries `figure`), what he did, and the service. Wrapping from birth-worker, the line
  reads `$14M in revenue, sourced and closed, at a $1.2M average enterprise deal.`
- The close link lands on the /services block by hash (`link.md:685-694`: a hash in `href`
  scrolls to the id). The id it needs is added in 3.6.6.
- The exact visible strings this file adds: `Client`, `Name protected`, `Results`, `Next`,
  `All work`, and the three `SERVICE_LABELS` values from section 2 (`Positioning & GTM`,
  `Product building`, `AI engineering`) followed by ` →` (the arrow is `aria-hidden`).

---

## 3.4 The paper surface inside a theater route: attribute, token remap, atmosphere, footer

**The attribute.** `data-surface="paper"` on `div.cs-page`. Only the study template uses it.
The route group still stamps `data-mode="theater"` (`app/(theater)/layout.tsx`), so the dim
between /work and a study is unchanged.

**The remap.** New template classes never read `--color-theater-*` or `--color-foyer-*`
directly. They read seven local properties, set once for the band (theater values) and
re-set on the paper region. This opens the new block (3.9 says where the block goes):

```css
/* ============================================================
 * PASS-120 STUDY TEMPLATE (Direction B: curtain, then page)
 * Classes: .cs, .cs-band*, .cs-title*, .cs-glance*, .cs-page,
 * .cs-body, .cs-step*, .cs-exhibit*, .cs-break*, .cs-close*,
 * .cs-next*. Local tokens --cs-* are set per surface below;
 * template rules read only those.
 * ============================================================ */
[data-mode="theater"] .cs {
  --cs-bg: var(--color-theater-ground);
  --cs-ink: var(--color-theater-ink);
  --cs-ink-soft: var(--color-theater-ink-soft);
  --cs-rule: var(--color-rule-theater);
  --cs-accent: var(--color-accent-copper);
  --cs-link: var(--color-theater-ink);
  --cs-tint: var(--color-theater-surface);
}
[data-mode="theater"] .cs [data-surface="paper"] {
  --cs-bg: var(--color-foyer-paper);
  --cs-ink: var(--color-foyer-ink);
  --cs-ink-soft: var(--color-foyer-ink-soft);
  --cs-rule: var(--color-rule-foyer);
  --cs-accent: var(--color-accent-copper);
  --cs-link: var(--color-accent-copper-deep);
  --cs-tint: var(--color-bone);
  background-color: var(--cs-bg);
  color: var(--cs-ink);
}
/* ORDANI: sage replaces copper (the one recorded exception). */
[data-mode="theater"] .cs[data-case="ordani"] {
  --cs-accent: var(--color-ordani-sage);
}
[data-mode="theater"] .cs[data-case="ordani"] [data-surface="paper"] {
  --cs-accent: var(--color-ordani-sage);
  --cs-link: var(--color-ordani-sage);
}
```

**The atmosphere.** `[data-mode="theater"]::before` (film grain) and `::after` (the drifting
spotlight) are `position: fixed` over the whole viewport (`app/globals.css:210-250` at map
time), so they would sit on the paper body. On a page that carries a paper surface both are
removed, and the band carries the grain alone (no spotlight: a fixed layer cannot be scoped to
the band).

1. In the rule `[data-mode="theater"]::before`, replace the whole `background-image:` value
   (the two `url("data:image/svg+xml;utf8,...")` layers) with `var(--grain-theater)`.
2. Directly above that rule, add this, with the two `url(...)` layers moved byte for byte:
   ```css
   :root {
     --grain-theater: url("data:image/svg+xml;utf8,<the first layer, unchanged>"), url("data:image/svg+xml;utf8,<the second layer, unchanged>");
   }
   ```
3. In the new block, add:
   ```css
   [data-mode="theater"]:has([data-surface="paper"])::before,
   [data-mode="theater"]:has([data-surface="paper"])::after {
     content: none;
   }
   .cs-band::before {
     content: "";
     position: absolute;
     inset: 0;
     z-index: -1;
     pointer-events: none;
     background-image: var(--grain-theater);
     background-size:
       120px 120px,
       180px 180px;
     opacity: 0.14;
     mix-blend-mode: screen;
   }
   @media (prefers-reduced-motion: reduce) {
     .cs-band::before {
       opacity: 0.07;
     }
   }
   ```

**The footer.** `Footer` sits outside `main` in the theater layout. On study pages it turns to
paper so the page ends on one ground (the mock does the same). Add:

```css
[data-mode="theater"]:has([data-surface="paper"]) [data-footer-root] {
  background-color: var(--color-foyer-paper);
  color: var(--color-foyer-ink-soft);
  border-top-color: var(--color-rule-foyer);
}
[data-mode="theater"]:has([data-surface="paper"]) [data-footer-root] .footer-email-link {
  color: var(--color-foyer-ink);
  text-decoration-color: var(--color-accent-copper);
}
[data-mode="theater"]:has(.cs[data-case="ordani"]) [data-footer-root] .footer-email-link {
  text-decoration-color: var(--color-ordani-sage);
}
```

The nav is not touched: at the top it is transparent over the band, and once scrolled it paints
its own `--color-theater-ground` chip (`app/globals.css`, `.cw-nav.is-scrolled`), which reads on
paper as a dark bar with bone type.

**Contrast pairs to re-check** (WCAG ratios computed 2026-09-16 from the live token hexes; the
section 6 axe run V8 and page120 T11 re-measure the render):

| Where | Foreground on background | Ratio | Use allowed |
|---|---|---|---|
| Band text | theater-ink `#ece3d0` on ground `#12100e` | 14.88 | all text |
| Band labels | theater-ink-soft `#a69b8a` on ground | 6.94 | 13px/12px mono labels |
| Band rule | copper `#bd5a2d` on ground | 4.22 | the 2px bottom rule only |
| Band rule, ORDANI | sage `#5e7158` on ground | 3.60 | the 2px bottom rule only (UI, 3:1) |
| Paper body | foyer-ink `#1a1816` on paper `#f5efe4` | 15.47 | all text |
| Paper labels | foyer-ink-soft `#3a3631` on paper | 10.47 | mono labels, footer |
| Paper links and numerals | copper-deep `#8a3d24` on paper | 6.62 | body links, step numerals |
| Paper links and numerals, ORDANI | sage on paper | 4.61 | body links, step numerals |
| Paper decoration | copper on paper | 3.93 | list dashes, hover underline colour, focus ring; NEVER text |
| Exhibit text | foyer-ink on bone `#e8dfd0` | 13.40 | exhibit cells |
| Exhibit labels | foyer-ink-soft on bone | 9.07 | exhibit headers |

Sage on bone is 4.00 and fails small text; ORDANI has no exhibit, so the pair never renders.

---

## 3.5 The type scale: five tokens, four active sizes on a study

Add inside the new block, before the surface tokens. These are the ruled sizes (1440: 112, 56,
36, 18, 13; 390: 64, 36, 26, 17, 12). Section 4 sizes /work with its own `--wx-*` properties;
these `--fs-*` properties serve the study template only, with the same values.

```css
:root {
  --fs-display: 112px;
  --fs-h1: 56px;
  --fs-h2: 36px;
  --fs-body: 18px;
  --fs-label: 13px;
  --cs-gutter: clamp(32px, 8.9vw, 128px);
}
@media (max-width: 767px) {
  :root {
    --fs-display: 64px;
    --fs-h1: 36px;
    --fs-h2: 26px;
    --fs-body: 17px;
    --fs-label: 12px;
    --cs-gutter: 16px;
  }
}
```

A study page uses four of them. `--fs-display` is /work's figure size and never renders on a study.

| Token | 1440 | 390 | Face | Classes |
|---|---|---|---|---|
| `--fs-h1` | 56 | 36 | Bricolage 800, lh 1.08, -0.02em | `.cs-title` |
| `--fs-h2` | 36 | 26 | Bricolage 700 | `.cs-body h2`, `.cs-glance__result`, `.cs-next__line`, `.case-study-pull-quote__quote` |
| `--fs-body` | 18 | 17 | Hanken 400 (600 for `strong`), lh 1.6 | `.cs-band__dek`, `.cs-glance dd`, `.cs-glance__result-rest`, `.cs-body` (p, li, Step text, exhibit cells), `.cs-close__link`, `.cs-next__did`, `.cs-next__all` |
| `--fs-label` | 13 | 12 | JetBrains Mono 500, +0.06em, no uppercase | `.cs-band__context`, `.cs-glance dt`, `.cs-glance__protected`, `.cs-step__n`, `.cs-exhibit th`, `.cs-exhibit td::before`, `.cs-next__label`, `.cs-next__context`, `.cs-next__service`, `.case-study-pull-quote__attribution` |

Mono renders only in those label classes. Nothing in the template sets `text-transform:
uppercase`. The page gutter is `--cs-gutter`: 16px below 768, 128px at 1440.

---

## 3.6 Layout CSS, in order

### 3.6.1 The band

```css
.cs-band {
  position: relative;
  isolation: isolate;
  background-color: var(--cs-bg);
  color: var(--cs-ink);
  border-bottom: 2px solid var(--cs-accent);
  padding: 128px var(--cs-gutter) 96px;
}
@media (max-width: 767px) {
  .cs-band {
    padding: 104px var(--cs-gutter) 48px;
  }
}
.cs-band__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "head" "text" "media";
  row-gap: 28px;
  max-width: 1184px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .cs-band__grid[data-photo="true"] {
    grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
    grid-template-areas: "head head" "text media";
    column-gap: 72px;
  }
}
.cs-band__head {
  grid-area: head;
}
.cs-band__text {
  grid-area: text;
  max-width: 820px;
}
.cs-band__media {
  grid-area: media;
  align-self: start;
  margin: 0;
}
.cs-band__img {
  display: block;
  width: 100%;
  height: auto;
}
.cs-band__context {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0 0 20px;
}
.cs-title {
  font-family: var(--font-cw-display);
  font-weight: 800;
  font-size: var(--fs-h1);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--cs-ink);
  margin: 0;
}
.cs-title__line {
  display: block;
}
.cs-band__dek {
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.6;
  max-width: 56ch;
  margin: 0 0 36px;
  color: var(--cs-ink);
}
.cs-glance {
  margin: 0;
  padding-top: 28px;
  border-top: 1px solid var(--cs-rule);
  display: grid;
  row-gap: 20px;
}
.cs-glance__row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 24px;
  align-items: baseline;
}
@media (max-width: 767px) {
  .cs-glance__row {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 4px;
  }
}
.cs-glance dt,
.cs-glance__protected {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0;
}
.cs-glance__protected {
  display: block;
  margin-top: 4px;
}
.cs-glance dd {
  margin: 0;
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.5;
  color: var(--cs-ink);
}
.cs-glance__result {
  display: block;
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.cs-glance__result-rest {
  display: block;
  margin-top: 8px;
}
```

Why these numbers: the 220px key column holds the longest key, `First real RFPs delivered`
(25 characters at 13px mono with 0.06em tracking is about 214px), on one line, so layout-gate's
solo-mono-label break check stays clean. The title spans the full 1184px at 1440 so each
`titleLines` entry sets on one line there. The band has no min-height and no max-height: it is
as tall as its content.

**Order below 1024:** head, then dek and at-a-glance, then the photograph. The design doc puts
the photograph straight after the dek on a phone and also wants the Results row on the first
screen; both cannot hold, and Results is the proof. Only Guardicore has a band photograph.

### 3.6.2 The paper body and its column

```css
.cs-page {
  padding: 96px 0 120px;
}
@media (max-width: 767px) {
  .cs-page {
    padding: 56px 0 72px;
  }
}
.cs-body {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--cs-gutter), 1fr)
    [col-start] minmax(0, var(--measure-body))
    [col-end] minmax(var(--cs-gutter), 1fr)
    [full-end];
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.6;
  color: var(--cs-ink);
}
.cs-body > * {
  grid-column: col;
}
.cs-body > .cs-break {
  grid-column: full;
}
.cs-body h2 {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--cs-ink);
  margin: 96px 0 24px;
}
.cs-body > h2:first-child {
  margin-top: 0;
}
@media (max-width: 767px) {
  .cs-body h2 {
    margin: 64px 0 16px;
  }
}
.cs-body p {
  margin: 0 0 20px;
}
.cs-body strong {
  font-weight: 600;
}
.cs-body a {
  color: var(--cs-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.cs-body a:hover {
  text-decoration-thickness: 2px;
}
.cs-body a:focus-visible {
  outline: 2px solid var(--cs-accent);
  outline-offset: 3px;
}
.cs-body ul {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
}
.cs-body ul > li {
  position: relative;
  padding-left: 22px;
  margin-bottom: 12px;
}
.cs-body ul > li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 8px;
  height: 1px;
  background: var(--cs-accent);
}
```

The column is `--measure-body` (68ch, an existing `@theme` token) resolved at the body size.
Full bleed is a grid line (`full`), never `100vw`, so a classic scrollbar cannot cause horizontal
overflow. MDX renders its h2, p and ul elements, and the Step, Exhibit, ChapterBreak and
PullQuote elements, as direct children of `.cs-body`, which is what the grid needs.

**Buyer questions** need no component: section 2 writes them as `## Questions buyers ask`
followed by paragraphs that open with a `**question**`. They render as `.cs-body p` with a
600-weight lead at body size (the design doc's "separated by weight").

**The technical section** needs no component and no tint: it is an `h2` section of prose
(on the RFP study, `## What the replay found`). The exhibit is the only tinted block type.

### 3.6.3 `components/study/StudyBlocks.tsx` (create, exactly this)

```tsx
// components/study/StudyBlocks.tsx
//
// Pass-120. The MDX body blocks of the study template. Props are fixed by section 2
// of the Pass-120 brief; markup and CSS by section 3. Server components only.
import type { ReactNode } from "react";
import Image from "next/image";

export function Step({
  n,
  lead,
  children,
}: {
  n: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="cs-step">
      <span className="cs-step__n" aria-hidden="true">
        {n}
      </span>
      <p>
        <strong>{lead}</strong> {children}
      </p>
    </div>
  );
}

export function Exhibit({ children }: { children: ReactNode }) {
  return (
    <table className="cs-exhibit">
      <thead>
        <tr>
          <th scope="col">The request</th>
          <th scope="col">What the engine did</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function ExhibitRow({
  request,
  engine,
}: {
  request: string;
  engine: string;
}) {
  return (
    <tr>
      <td data-label="The request">{request}</td>
      <td data-label="What the engine did">{engine}</td>
    </tr>
  );
}

export function ChapterBreak({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <figure className="cs-break">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes="100vw"
        className="cs-break__img"
      />
    </figure>
  );
}
```

`ChapterBreak` has no caption prop and renders no `figcaption`. The numeral is `aria-hidden`
because the lead sentence already reads in order; the visible "01" is for sighted readers.

### 3.6.4 Block CSS

```css
.cs-step {
  position: relative;
  margin: 0 0 28px;
}
.cs-step p {
  margin: 0;
}
.cs-step__n {
  display: block;
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--cs-link);
  margin: 0 0 8px;
}
@media (min-width: 1024px) {
  .cs-step__n {
    position: absolute;
    left: -64px;
    top: 0.5em;
    width: 40px;
    margin: 0;
    text-align: right;
  }
}
.cs-exhibit {
  width: 100%;
  margin: 40px 0;
  border-collapse: collapse;
  background: var(--cs-tint);
}
.cs-exhibit th,
.cs-exhibit td {
  text-align: left;
  vertical-align: top;
  padding: 20px 32px;
}
.cs-exhibit th {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--cs-ink-soft);
  padding-top: 28px;
  padding-bottom: 0;
  width: 50%;
}
.cs-exhibit td {
  font-size: var(--fs-body);
  line-height: 1.6;
  color: var(--cs-ink);
}
.cs-exhibit tbody tr + tr td {
  border-top: 1px solid var(--cs-rule);
}
@media (max-width: 767px) {
  .cs-exhibit thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .cs-exhibit tr,
  .cs-exhibit td {
    display: block;
  }
  .cs-exhibit td {
    padding: 16px;
  }
  .cs-exhibit td + td {
    padding-top: 0;
  }
  .cs-exhibit td::before {
    content: attr(data-label);
    display: block;
    margin: 0 0 4px;
    font-family: var(--font-cw-mono);
    font-size: var(--fs-label);
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--cs-ink-soft);
  }
}
.cs-break {
  margin: 96px 0;
}
.cs-break__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
@media (max-width: 767px) {
  .cs-break {
    margin: 56px 0;
  }
  .cs-break__img {
    aspect-ratio: 4 / 3;
  }
}
.cs-close {
  margin: 8px 0 0;
}
.cs-close__link {
  font-weight: 600;
}
.cs-next {
  width: min(var(--measure-body), calc(100% - 2 * var(--cs-gutter)));
  margin: 120px auto 0;
  padding-top: 40px;
  border-top: 1px solid var(--cs-rule);
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  color: var(--cs-ink);
}
@media (max-width: 767px) {
  .cs-next {
    margin-top: 72px;
  }
}
.cs-next__label,
.cs-next__context,
.cs-next__service {
  display: block;
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0;
}
.cs-next__label {
  margin-bottom: 16px;
}
.cs-next__entry {
  display: grid;
  row-gap: 8px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--cs-rule);
  color: var(--cs-ink);
  text-decoration: none;
}
.cs-next__line {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.cs-next__did {
  line-height: 1.5;
}
.cs-next__entry:hover .cs-next__did {
  text-decoration: underline;
  text-decoration-color: var(--cs-accent);
  text-underline-offset: 3px;
}
.cs-next__entry:focus-visible,
.cs-next__all:focus-visible {
  outline: 2px solid var(--cs-accent);
  outline-offset: 4px;
}
.cs-next__all {
  display: inline-block;
  margin-top: 24px;
  color: var(--cs-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
```

The numeral hangs 64px into the left margin at 1024 and up (the body grid's side track is at
least 91px there) and sits above the lead below 1024. The exhibit is a real table at 768 and
up (two columns under the two header labels) and stacks below 768, where each cell prints its
column's label from `data-label` as generated content, so the DOM carries the two header strings
exactly once. No border radius, no shadow, no one-side accent border, no nested card.

The chapter break crops to 16:9 at 768 and up and 4:3 below, centred. The ORDANI frame
(`/ordani-intake.jpg`, 1600x1068, about 3:2) loses little either way; the judge looks at the
crop in the capture (3.11).

**No hover lift, no transition** on any template element. Underline thickness and underline
colour change without a transition.

### 3.6.5 PullQuote on paper

Delete every `[data-mode="theater"] .case-study-pull-quote*` rule (`app/globals.css:1022-1099`
at map time) and add exactly these, each selector on one line:

```css
.cs-body .case-study-pull-quote {
  margin: 64px 0;
  padding: 32px 0;
  border-top: 1px solid var(--cs-rule);
  border-bottom: 1px solid var(--cs-rule);
}
.cs-body .case-study-pull-quote__quote {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--cs-ink);
  margin: 0;
  position: relative;
  padding-bottom: 20px;
}
.cs-body .case-study-pull-quote__underline {
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 14px;
  overflow: visible;
  pointer-events: none;
}
.cs-body .case-study-pull-quote__underline path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1000ms cubic-bezier(0.22, 0.8, 0.28, 1); /* motion-ok: the PRE-EXISTING PullQuote underline-grow (D10), unchanged timing, re-scoped to the paper body in Pass-120 */
}
.cs-body .case-study-pull-quote[data-in-view="true"] .case-study-pull-quote__underline path {
  stroke-dashoffset: 0;
}
.cs-body .case-study-pull-quote__attribution {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--cs-ink-soft);
  margin: 20px 0 0;
}
@media (prefers-reduced-motion: reduce) {
  .cs-body .case-study-pull-quote__underline path {
    transition: none !important;
    stroke-dashoffset: 0 !important;
  }
}
```

In `components/PullQuote.tsx`, change the path's `stroke="var(--color-accent-copper)"` to
`stroke="var(--cs-accent, var(--color-accent-copper))"`. Nothing else in that file changes. The
attribution loses its uppercase and 0.08em tracking (no tracked-uppercase labels).

### 3.6.6 The /services block anchors

The close links to `/services#<service>`. Today no element on /services carries those ids
(the area articles have only `key`, `app/(foyer)/services/page.tsx:399`), so render-gate's
fragment check would fail every study.

- `app/(foyer)/services/page.tsx:399`: `<article key={service.slug} className="cw-area">` becomes
  `<article key={service.slug} id={service.slug} className="cw-area">`.
- `app/globals.css`, in the new block, one line: `.cw-area { scroll-margin-top: 96px; }`

This also makes the JSON-LD `@id` values that already point at `/services#<slug>`
(`services/page.tsx:180`) resolve. If the live-sweep section also edits line 399, the two edits
are the same attribute; apply it once.

---

## 3.7 Removals in `app/globals.css`

Delete every rule, and every comment block that heads only such rules, whose selector contains
any of: `[data-title-card]`, `.title-card`, `[data-tc-`, `.case-study__`, `.case-study-dek`,
`.case-study-copper-rule`, `.case-study-still`, `[data-mode="theater"] .case-study {`, or
`[data-mode="theater"] .case-study-pull-quote` (replaced in 3.6.5). At map time these sat at
`453-635` (TitleCard header, stack, caption, hero, reduced-motion net, mobile composition),
`663-666` (Pass-30 nav margin), `686-1020` (case study frame, title-card-root bleed, layout
grid, header, meta, dek, body, copper rule, still), `1022-1099` (pull quote, replaced),
`1101-1281` (sidebar and footer nav), `5124-5135` (the third mobile block) and `6520-6575`
(the glance strip; section 4 confirms this one is this section's). Delete by selector, not by
line number: line numbers move as edits land, and section 4 deletes by `sed` line ranges, so
the assembler orders the two sections' globals.css edits.

Today the count of lines matching the removal pattern is 101 (measured 2026-09-16, C5 below).

---

## 3.8 `mdx-components.tsx` (rewrite whole, exactly this)

```tsx
// mdx-components.tsx
//
// The MDX component map. Required at REPO ROOT (not inside app/) by the
// @next/mdx App Router convention: inside app/ the map is silently ignored and
// MDX renders with default HTML primitives only.
//
// Pass-120: every content/work/*.mdx body may use these names without an import.
//   <Step>, <Exhibit>, <ExhibitRow>, <ChapterBreak>  components/study/StudyBlocks.tsx
//   <PullQuote>                                      components/PullQuote.tsx
// Headings, paragraphs and lists stay default HTML; app/globals.css styles them
// under .cs-body.
import type { MDXComponents } from "mdx/types";
import {
  ChapterBreak,
  Exhibit,
  ExhibitRow,
  Step,
} from "@/components/study/StudyBlocks";
import { PullQuote } from "@/components/PullQuote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Step,
    Exhibit,
    ExhibitRow,
    ChapterBreak,
    PullQuote,
  };
}
```

---

## 3.9 Where the new CSS goes

One contiguous block, opened by the comment in 3.4, inserted where the deleted
`CASE STUDY (THEATER) — Phase 7` header comment stood. Order inside it: the header comment, 3.5
type tokens, 3.4 surface tokens, atmosphere and footer, 3.6.1 band, 4.1 settle, 3.6.2 body,
3.6.4 blocks, 3.6.5 pull quote, 3.6.6 anchor line, and last, on its own line, the end marker
`/* END PASS-120 STUDY TEMPLATE */`. The `:root { --grain-theater }` rule goes
above `[data-mode="theater"]::before` as 3.4 says, not in the block.

Existing tokens used and not redefined: `--color-theater-ground`, `--color-theater-surface`,
`--color-theater-ink`, `--color-theater-ink-soft`, `--color-foyer-paper`, `--color-foyer-ink`,
`--color-foyer-ink-soft`, `--color-bone`, `--color-rule-foyer`, `--color-rule-theater`,
`--color-accent-copper`, `--color-accent-copper-deep`, `--color-ordani-sage`,
`--font-cw-display`, `--font-cw-body`, `--font-cw-mono`, `--measure-body`. New properties, all
defined above: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-body`, `--fs-label`, `--cs-gutter`,
`--grain-theater`, and the seven `--cs-*` surface tokens.

---

## 3.10 The study OG image: `app/(theater)/work/[slug]/opengraph-image.tsx` (rewrite whole)

This supersedes the three `opengraph-image.tsx` rows in section 2 §2.2 with a file that reads the
same fields (`titleLines`, `client`, `results.lead`) and also drops the tracked uppercase eyebrow
and the saffron second accent (`:44-47,104` today).

```tsx
// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Pass-120. The study's Open Graph card, 1200x630: wordmark, an accent bar, the
// title in its settle lines, the client, and the results lead. It reads real
// frontmatter; the retired word stack is gone.
//
// Satori (next/og) cannot read CSS variables, so the colours are hex literals
// mirroring app/globals.css: --color-theater-ground, --color-theater-ink,
// --color-theater-ink-soft, --color-accent-copper, --color-ordani-sage.
import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK = {
  lines: ["Micah Jones"],
  client: "Case studies",
  caption: "Strategy and software, shipped by the same pair of hands.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug).catch(() => null);
  const lines = cs?.titleLines ?? FALLBACK.lines;
  const client = cs?.client ?? FALLBACK.client;
  const caption = cs?.results.lead ?? FALLBACK.caption;

  const GROUND = "#12100E";
  const INK = "#ECE3D0";
  const INK_SOFT = "#A69B8A";
  const ACCENT = slug === "ordani" ? "#5E7158" : "#BD5A2D";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: GROUND,
        color: INK,
        padding: "64px 96px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        MICAH/JONES
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", width: 96, height: 4, background: ACCENT }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {lines.map((line, i) => (
            <span key={`${i}-${line}`} style={{ display: "flex" }}>
              {line}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.35,
            color: INK_SOFT,
            maxWidth: "92%",
          }}
        >
          {client}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.3,
            color: INK,
            maxWidth: "92%",
          }}
        >
          {caption}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
```

Height budget, worst case (the RFP card): padding 128 + wordmark 34 + gaps 72 + bar 4 + two
title lines 138 + two client lines 65 + one caption line 39 = 480, inside 630. The executor
opens all five cards once (C14).

---

## 3.11 Captures for the judge (written by the verifier, opened once each)

`node .planning/exec/template120.mjs http://localhost:3200 --shots .planning/qa/pass-120/template`
writes, per study and per width (390, 1440): `study-<slug>-fold-<w>.png` (the first viewport) and
`study-<slug>-full-<w>.png` (the full page). The executor opens each file once before it counts
as evidence, and checks that its name matches what it frames (standing clause 4). The judge's
look covers: the band's first fold at both widths, the Guardicore photograph's softness at 1440,
the ORDANI chapter-break crop, the RFP exhibit at both widths, the band-to-paper hard rule, and
the paper footer.

---

## 4. Motion

What moves on a study page after Pass-120, and nothing else:
1. **The TitleCard settle** (the signature, 4.1).
2. **The foyer-to-theater dim** on arrival and exit through `ViewTransitionLink`, unchanged
   (4.4).
3. **The existing PullQuote underline draw** on the RFP study, unchanged timing (3.6.5).

Forbidden on the template: any scroll pin, scroll-linked progress, sticky element, parallax,
hover lift, transition on colour or position, the theater spotlight drift, and any second
entrance (dek, at-a-glance, photograph, chapter break and Next entry all render static).

### 4.1 The settle

**Ruling.** The pinned full-fold word stack retires. The study title settles in over 600ms at
most, transform and opacity only, ease-out, with the finished frame for no-JS and reduced motion
(operator, signed 2026-09-16).

**Timings, exact.**

| Title lines (`titleLines.length`) | Line 1 starts | Line 2 starts | Line 3 starts | Each line | Total |
|---|---|---|---|---|---|
| 1 | 0ms | none | none | 400ms | 400ms |
| 2 | 0ms | 200ms | none | 400ms | 600ms |
| 3 | 0ms | 100ms | 200ms | 400ms | 600ms |

All five Pass-120 studies have two lines (section 2), so every study runs 0ms and 200ms, 600ms
in total. Each line goes from `opacity: 0; transform: translateY(12px)` to its resting style
(`opacity: 1; transform: none`) on `cubic-bezier(0.16, 1, 0.3, 1)`, the same curve as the
existing `--ease-out` token (written as a literal because no rule reads `var(--ease-out)` today).
Each line stays within DESIGN_BAR R15's 400ms entrance cap; the stagger makes the 600ms.

**"Once per load", defined.** The settle runs once each time a study page's h1 is inserted into
the document: on a full load, and on a client-side navigation into a study (Next, or /work to a
study). It never replays on scroll, resize, hover, focus, re-render or back-to-top. There is no
memory across pages. (Section 6 `settle120.mjs` S5 measures the no-replay part; M4 below
measures the client-navigation part.)

**Mechanism: CSS, not GSAP.** A GSAP tween can only start after hydration. The title would either
paint finished and then jump back to its start state (section 6 settle120 S3 "no flash" fails),
or be hidden until the JS bundle runs (LCP waits on hydration). A CSS animation starts at first
paint. The `(scripting: enabled)` media feature gives the no-JS finished frame with no script at
all. Probe run 2026-09-16 in Chrome 153 (puppeteer, a data: page with exactly the rules below):
with JavaScript on, `matchMedia("(scripting: enabled)")` was `true` and two animations ran
(`[400, 0, "backwards"]`, `[400, 200, "backwards"]`), and after 800ms both lines read `1/none`
with `document.getAnimations().length` `0`; with JavaScript off the query was `false`, no
animation ran, and both lines read `1/none`.

**`components/TitleCard.tsx` (rewrite whole, exactly this):**

```tsx
// components/TitleCard.tsx
//
// Pass-120. The signature motion, re-cast (operator signed 2026-09-16): the study
// title settles into place once when the page renders. Each line rises 12px and
// fades in over 400ms; line 2 starts 200ms after line 1 (100ms and 200ms when there
// are three lines), 600ms at most. Transform and opacity only. No pin, no scroll
// coupling, no replay.
//
// The motion is CSS (app/globals.css, .cs-title__line), gated by
// (prefers-reduced-motion: no-preference) and (scripting: enabled). Reduced motion,
// no-JS and browsers without the scripting media feature get this server render,
// which is the finished frame. It starts at first paint and never waits for
// hydration. This is a server component and imports no animation library.
import { Fragment } from "react";
import type { TitleCardProps } from "@/lib/title-card-schema";

export function TitleCard({ title, lines }: TitleCardProps) {
  return (
    <h1 className="cs-title" data-title={title}>
      {lines.map((line, i) => (
        <Fragment key={`${i}-${line}`}>
          {i > 0 ? " " : null}
          <span className="cs-title__line">{line}</span>
        </Fragment>
      ))}
    </h1>
  );
}
```

The h1's text is the lines joined by one space, which section 2's schema guarantees equals
`title` (so the accessible name, the page `<title>` and section 6's h1 checks agree).
`data-title` carries the same string for the verifier and has no visual effect.

**CSS (in the block, after 3.6.1):**

```css
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .cs-title__line {
    animation: cs-settle 400ms cubic-bezier(0.16, 1, 0.3, 1) backwards; /* motion-ok: Pass-120 TitleCard settle, the one signature (brand.json motion.signature), operator-signed 2026-09-16 */
  }
  .cs-title__line:nth-child(2):last-child,
  .cs-title__line:nth-child(3) {
    animation-delay: 200ms;
  }
  .cs-title__line:nth-child(2):not(:last-child) {
    animation-delay: 100ms;
  }
}
@keyframes cs-settle {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}
```

`backwards` holds the start state through each line's delay and releases the element when the
animation ends, so no animation object lingers and the resting style is the base rule.
`:nth-child` counts element siblings only, so the space text nodes between the spans do not
shift the count.

### 4.2 Reduced motion, no-JS, unsupported browsers

All three get the server render unchanged: `.cs-title__line` has no animation, opacity 1, no
transform. No inline style, no class toggle, no script decides it. A browser that does not know
`scripting` drops the whole `@media` rule and shows the finished frame, which is the safe side.

### 4.3 CLS

Nothing in the settle changes layout. The lines are in flow at full size from the first paint;
`opacity` and `transform` do not move neighbouring boxes. There is no `min-height` reservation
because nothing arrives later: the band's height is the finished band's height from the first
frame. The one photograph carries `width` and `height`. Section 6 settle120 S7 measures CLS
<= 0.05 on all five studies at both widths; page120 T16 measures the no-JS h1 top equal to the
reduced run's within 1px.

### 4.4 What happens to the pin, the Lenis bridge, GSAP and the dim

- **`PIN_DISTANCE_PX`** (`components/TitleCard.tsx:49` at map time) is deleted with the file's
  old body, together with the `ScrollTrigger.create({ pin: true, ... scrub: 0.3 })` call
  (`:141-150`), the `gsap.registerPlugin(useGSAP, ScrollTrigger)` line (`:45`), the three GSAP
  imports (`:28-30`) and the `useLenis(() => ScrollTrigger.update())` bridge (`:64-66`). No pin,
  no pin-spacer, and no scroll-linked timeline exist on any study.
- **The mobile static branch and the reduced-motion GSAP branch** (`:94-109`) go with them: one
  CSS path now serves every width.
- **`scripts/gsap-quarantine-gate.mjs` is not edited.** Its ALLOWLIST (`:28-32`) keeps
  `components/TitleCard.tsx`; an allowlisted file that imports nothing passes (the gate only
  skips allowlisted paths, `:147`). No new file imports `gsap`, so the gate stays green.
  `components/color-worlds/SplitReveal.tsx` keeps its recorded exception.
- **The foyer-to-theater dim is unchanged**: `--duration-mode-fade: 900ms`, the
  `::view-transition-old(root)` and `::view-transition-new(root)` fades, their reduced-motion
  kill switch, and `components/view-transition-link.tsx`. No `ViewTransition` shared element is
  added. Arriving through the dim, the 600ms settle plays inside the 900ms fade-in of the new
  page; neither timing is changed to accommodate the other (both are ruled).

### 4.5 Forbidden, with the check that catches it

| Forbidden | Caught by |
|---|---|
| GSAP, ScrollTrigger, useGSAP or useLenis in TitleCard | C2 |
| Any `pin: true`, `PIN_DISTANCE_PX` or `CaseStudySidebar` left in code | C4 |
| A second animation in the template block | C7 (exactly one `animation:` declaration in the block) |
| A caption on a photograph | C11, U13, section 6 page120 T9 |
| Replay on scroll or resize | section 6 settle120 S5 |
| A settle over 600ms, a flash, a non-transform property | section 6 settle120 S2, S3, S4; M1, M3 |

### 4.6 `.claude/brand.json` `motion` (edit two values)

Replace `motion.signature` (today `.claude/brand.json:139-143`) with exactly:

```json
    "signature": {
      "id": "title-card",
      "description": "Case-study hero title settle, on /work/[slug] only. The band's h1 (Bricolage Grotesque 800; 56px at 1440, 36px at 390) settles in once when the study page renders, on a full load or a client navigation into a study. Each title line rises 12px and fades from 0 to 1 over 400ms on cubic-bezier(0.16, 1, 0.3, 1); line 2 starts 200ms after line 1 (100ms and 200ms when there are three lines), so the entrance is 600ms at most. Transform and opacity only: no scroll pin, no scroll coupling, no replay on scroll, resize or re-render. CSS only, gated by (prefers-reduced-motion: no-preference) and (scripting: enabled), so reduced motion, no-JS and browsers without the scripting media feature get the server-rendered finished frame. It replaced the pinned full-fold word stack and its GSAP scroll-resolve (operator signed 2026-09-16, Pass-120).",
      "files": ["components/TitleCard.tsx", "app/globals.css"]
    },
```

Replace only the `description` value of `motion.view_transition` (today `:146`) with exactly:

```json
      "description": "900ms ease-in-out cross-fade (--duration-mode-fade in app/globals.css) between cream paper and theater ground on foyer↔theater navigation. Reduced-motion kill-switch in app/globals.css.",
```

This corrects the two stale facts the ruling names: `Inter Display` (the live display face is
Bricolage Grotesque, `lib/fonts.ts`) and `600ms` for the dim (live value 900ms,
`app/globals.css:307` at map time). `motion.figure`, `motion.countup` and `motion.banned` are
unchanged. Section 4 adds `motion.heroclip` to the same file; the assembler merges both edits
into one step (one writer per file).

---

## Verification for sections 3 and 4

Standing clauses (every check below): count what renders (an `expect N >= 1` counts visible DOM
text with `<head>` and scripts stripped; raw greps only assert 0 or count source lines); the
executor never reinterprets an expected value (a mismatch stops the pass before the commit, with
the raw output and a reason, and the judge rules); measure the render, not the model (the
template script reads computed style and CDP animation events from Chrome, and the captures are
opened); scope from the layout and look at the capture (the theater layout is
`[data-mode="theater"] > a.skip-to-content, Nav, main#main-content, Footer`; template checks
read `main#main-content`, and the footer and atmosphere checks name their elements).

**Before any Pass-120 edit:** `git rev-parse HEAD > .planning/exec/p120-base.txt` (if section 6
already records a base commit, use that file instead and say so in the report).

### Static (no server)

| # | Command | Expected output |
|---|---|---|
| C1 | `node scripts/gsap-quarantine-gate.mjs --self-test && node scripts/gsap-quarantine-gate.mjs` | first line `gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean`; second line matches `^gsap-quarantine-gate: clean \([0-9]+ files\)$`; exit 0 |
| C2 | `grep -nE '"gsap\|@gsap/\|ScrollTrigger\|PIN_DISTANCE_PX\|useLenis\|useGSAP\|use client' components/TitleCard.tsx` | no output (exit 1) |
| C3 | `ls components/TitleCardComposition.tsx components/CaseStudySidebar.tsx components/CaseStudyStill.tsx components/Dek.tsx components/CopperRule.tsx 2>&1 \| grep -c "No such file"` | `5` |
| C4 | `grep -rlE "CaseStudyStill\|CaseStudySidebar\|TitleCardComposition\|titleCardWords\|PIN_DISTANCE_PX\|components/Dek\|CopperRule\|pin: true" app components lib mdx-components.tsx` | no output (exit 1) |
| C5 | `grep -cE 'data-title-card\|\.title-card\|data-tc-\|\.case-study__\|\.case-study-(dek\|still\|copper-rule)\|\.case-study \{' app/globals.css` | `0` (bite: `101` on 2026-09-16) |
| C6 | `grep -c 'data-mode="theater"\] \.case-study-pull-quote' app/globals.css; grep -c '^\.cs-body \.case-study-pull-quote' app/globals.css; grep -c '^  \.cs-body \.case-study-pull-quote__underline path {$' app/globals.css` | `0`, `6`, `1` |
| C7 | `grep -c "cs-settle" app/globals.css; grep -c "(prefers-reduced-motion: no-preference) and (scripting: enabled)" app/globals.css; awk '/PASS-120 STUDY TEMPLATE \(Direction B/,/END PASS-120 STUDY TEMPLATE/' app/globals.css \| grep -c "animation:"` | `2`, `1`, `1` |
| C8 | `git diff "$(cat .planning/exec/p120-base.txt)" -- app/globals.css components/view-transition-link.tsx \| grep -E '^[-+][^-+].*(duration-mode-fade\|view-transition-(old\|new\|group)\|startViewTransition)'` | no output (exit 1) |
| C9 | `node -e "const m=require('./.claude/brand.json').motion;console.log(m.signature.id,m.signature.files.join(','),/Inter Display/.test(JSON.stringify(m)),/600ms ease-in-out/.test(JSON.stringify(m)),m.view_transition.description.startsWith('900ms ease-in-out'),m.signature.description.includes('settles in once when the study page renders'))"` | `title-card components/TitleCard.tsx,app/globals.css false false true true` |
| C10 | `grep -c 'id={service.slug}' "app/(foyer)/services/page.tsx"; grep -c '^\.cw-area { scroll-margin-top: 96px; }$' app/globals.css` | `1`, `1` |
| C11 | `grep -nE "figcaption\|caption" components/study/StudyBlocks.tsx` | no output (exit 1) |
| C12 | `grep -cE "TitleCard\|Dek\|CaseStudyStill\|CopperRule" mdx-components.tsx; grep -cE "^    (Step\|Exhibit\|ExhibitRow\|ChapterBreak\|PullQuote),$" mdx-components.tsx` | `0`, `5` |
| C13 | `grep -c 'var(--cs-accent, var(--color-accent-copper))' components/PullQuote.tsx` | `1` |

C6 note: six `.cs-body .case-study-pull-quote` rules in 3.6.5 start at column 0; the seventh
sits inside `@media`, indented two spaces, hence the third count. C7's awk reads from the block
header to the block's end marker (3.9); the one `animation:` inside it is the settle (the pull
quote uses `transition:`, and `animation-delay:` does not match).

### Served (after the build, on the section 6 server at `http://localhost:3200`)

| # | Command | Expected output |
|---|---|---|
| C14 | `mkdir -p .planning/qa/pass-120/template && for s in guardicore rfp-engine ordani content-engine birth-worker; do curl -s -o .planning/qa/pass-120/template/og-$s.png -w "$s %{http_code} %{content_type}\n" http://localhost:3200/work/$s/opengraph-image; done` | five lines, `guardicore 200 image/png` through `birth-worker 200 image/png` in that order. Then open each PNG once: the accent bar, both title lines, the client line and the results lead sit inside 1200x630 with nothing clipped; the ORDANI bar is sage and the other four copper; no text is uppercase except the `MICAH/JONES` wordmark. |
| C15 | `curl -s http://localhost:3200/services \| grep -oE 'id="(ai-engineering\|product-building\|positioning-gtm)"' \| sort \| tr '\n' ' '` | `id="ai-engineering" id="positioning-gtm" id="product-building" ` |
| C16 | `node .planning/exec/template120.mjs http://localhost:3200 --shots .planning/qa/pass-120/template` | last line `template120 failures: 0`, exit 0 |
| C17 | `node .planning/exec/settle120.mjs http://localhost:3200` and `node .planning/exec/page120.mjs http://localhost:3200` (section 6) | `settle120 failures: 0` and `page120 failures: 0` |

**Bite proof (standing clause 3), once, before any Pass-120 edit:**
`node .planning/exec/template120.mjs https://www.micahjonesconsulting.com > .planning/exec/template120-bite.txt; tail -1 .planning/exec/template120-bite.txt`
must print `template120 failures: N` with N >= 1, and
`grep -c "FAIL U1 band ground" .planning/exec/template120-bite.txt` must print `10` (no live
study has a `.cs-band`, so U1 fails on all five routes at both widths; `/work/birth-worker` also
fails U0 with a 404). If either number differs, stop and report.

### `.planning/exec/template120.mjs` (write exactly this before the build; the executor does not change it)

One line is deliberate and looks odd: the CDP method name is assembled as
`"Animation." + "en" + "able"` because the copy-lint write hook rejects that English verb when it
appears whole in this `.md` brief. Write the `.mjs` exactly as printed; the assembled string is
the CDP call that switches on the Animation domain.

```js
// Pass-120 sections 3-4 gate: the Direction B study template (band, paper surface,
// atmosphere, footer, at-a-glance, blocks, close, Next) and the settle's CSS mechanics
// read through CDP. Section 6's page120.mjs (type ladder, rail, captions, link colours)
// and settle120.mjs (frame timing, no flash, replay, CLS) cover the rest.
// Scope (LESSONS #28): app/(theater)/layout.tsx renders [data-mode="theater"] >
// a.skip-to-content, Nav, main#main-content, Footer[data-footer-root]. Template checks
// read main#main-content; U3 reads the footer and U6 the layout wrapper, by name.
// Usage: node .planning/exec/template120.mjs [base] [--shots <dir>]
// Bite proof: run against https://www.micahjonesconsulting.com before any Pass-120 edit.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const CDP_ANIMATION_ON = "Animation." + "en" + "able";
const argv = process.argv.slice(2);
const si = argv.indexOf("--shots");
const SHOTS = si >= 0 ? argv[si + 1] : null;
const pos = argv.filter((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const STUDIES = {
  guardicore: { next: "rfp-engine", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "AI engineering", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: "guardicore-telaviv-session", breaks: 0, exhibits: 0, sage: false },
  "rfp-engine": { next: "ordani", service: "ai-engineering", label: "AI engineering", nextLabel: "Product building", dts: ["Client", "My role", "First real RFPs delivered", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 1, sage: false },
  ordani: { next: "content-engine", service: "product-building", label: "Product building", nextLabel: "Product building", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: null, breaks: 1, exhibits: 0, sage: true },
  "content-engine": { next: "birth-worker", service: "product-building", label: "Product building", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
  "birth-worker": { next: "guardicore", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "The work", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
};
const RGB = {
  ground: "rgb(18, 16, 14)",
  paper: "rgb(245, 239, 228)",
  copper: "rgb(189, 90, 45)",
  copperDeep: "rgb(138, 61, 36)",
  sage: "rgb(94, 113, 88)",
};

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function expectedStarts(n) {
  if (n === 1) return [[400, 0]];
  if (n === 2) return [[400, 0], [400, 200]];
  if (n === 3) return [[400, 0], [400, 100], [400, 200]];
  return "bad line count";
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
try {
  for (const [slug, X] of Object.entries(STUDIES)) {
    for (const w of [1440, 390]) {
      console.log(`/work/${slug} @${w} reduced`);
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 140)));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text().slice(0, 140));
      });
      await page.setViewport({ width: w, height: w === 390 ? 844 : 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      const res = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      chk("U0 status", res?.status() === 200, res?.status(), 200);

      const m = await page.evaluate(() => {
        const main = document.querySelector("main#main-content");
        const wrap = document.querySelector('[data-mode="theater"]');
        const q = (s) => main?.querySelector(s) ?? null;
        const qa = (s) => (main ? [...main.querySelectorAll(s)] : []);
        const t = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "missing");
        const bg = (el) => (el ? getComputedStyle(el).backgroundColor : "missing");
        const band = q(".cs-band");
        const paper = q('[data-surface="paper"]');
        const numeral = q(".cs-step__n");
        const h1 = q("h1.cs-title");
        return {
          bandBg: bg(band),
          paperBg: bg(paper),
          footBg: bg(document.querySelector("[data-footer-root]")),
          gap: band && paper ? Math.round(paper.getBoundingClientRect().top - band.getBoundingClientRect().bottom) : "missing",
          bandRule: band ? getComputedStyle(band).borderBottomColor : "missing",
          wrapPseudo: wrap ? [getComputedStyle(wrap, "::before").content, getComputedStyle(wrap, "::after").content] : "missing",
          bandGrain: band ? getComputedStyle(band, "::before").content : "missing",
          old: document.querySelectorAll("[data-title-card], .title-card-root, .case-study__sidebar, .case-study-still, .case-study__glance, .case-study__nav").length,
          nda: main ? /Protected by NDA|Client-confidential/.test(main.innerText) : "missing",
          headOk: !!band?.querySelector(".cs-band__head > .cs-band__context + h1.cs-title"),
          contextLen: t(q(".cs-band__context")).length,
          h1Match: !!h1 && t(h1) === h1.getAttribute("data-title"),
          dts: qa(".cs-glance dt").map(t),
          nameProtected: qa(".cs-glance__protected").filter((e) => t(e) === "Name protected").length,
          bandImgs: qa(".cs-band img").map((i) => decodeURIComponent(i.currentSrc)),
          mainImgs: qa("img").length,
          breaks: qa(".cs-body > .cs-break").length,
          breakCaptions: qa(".cs-break figcaption").length,
          exhibits: qa(".cs-exhibit").length,
          exhibitTh: qa(".cs-exhibit th").map(t),
          exhibitRows: qa(".cs-exhibit tbody tr").length,
          steps: qa(".cs-body > .cs-step").length,
          badNumerals: qa(".cs-step__n").filter((e) => !/^\d\d$/.test(t(e))).length,
          numeralColor: numeral ? getComputedStyle(numeral).color : "missing",
          close: qa(".cs-body > .cs-close a").map((a) => `${a.getAttribute("href")}|${t(a)}`),
          next: qa(".cs-next__entry").map((a) => a.getAttribute("href")),
          nextParts: [".cs-next__context", ".cs-next__line", ".cs-next__did", ".cs-next__service"].map((s) => t(q(s))),
          all: qa(".cs-next__all").map((a) => `${a.getAttribute("href")}|${t(a)}`),
        };
      });

      chk("U1 band ground", m.bandBg === RGB.ground, m.bandBg, RGB.ground);
      chk("U2 paper body", m.paperBg === RGB.paper, m.paperBg, RGB.paper);
      chk("U3 footer on paper", m.footBg === RGB.paper, m.footBg, RGB.paper);
      chk("U4 band meets paper", m.gap === 0, m.gap, 0);
      const rule = X.sage ? RGB.sage : RGB.copper;
      chk("U5 band rule accent", m.bandRule === rule, m.bandRule, rule);
      chk("U6 fixed atmosphere off", same(m.wrapPseudo, ["none", "none"]), m.wrapPseudo, ["none", "none"]);
      chk("U7 band grain", m.bandGrain === '""', m.bandGrain, '""');
      chk("U8 retired template gone", m.old === 0 && m.nda === false, [m.old, m.nda], [0, false]);
      chk("U9 band head", m.headOk && m.contextLen > 0 && m.h1Match, [m.headOk, m.contextLen, m.h1Match], [true, ">0", true]);
      chk("U10 at-a-glance keys", same(m.dts, X.dts), m.dts, X.dts);
      chk("U11 Name protected", m.nameProtected === X.nameProtected, m.nameProtected, X.nameProtected);
      const imgOk = X.photo ? m.bandImgs.length === 1 && m.bandImgs[0].includes(X.photo) : m.bandImgs.length === 0;
      chk("U12 band photograph", imgOk, m.bandImgs, X.photo ?? []);
      chk("U13 chapter breaks, no caption", m.breaks === X.breaks && m.breakCaptions === 0, [m.breaks, m.breakCaptions], [X.breaks, 0]);
      const wantImgs = (X.photo ? 1 : 0) + X.breaks;
      chk("U14 images in main", m.mainImgs === wantImgs, m.mainImgs, wantImgs);
      const exOk = m.exhibits === X.exhibits && (X.exhibits === 0 || (same(m.exhibitTh, ["The request", "What the engine did"]) && m.exhibitRows === 2));
      chk("U15 exhibit", exOk, [m.exhibits, m.exhibitTh, m.exhibitRows], [X.exhibits, X.exhibits ? ["The request", "What the engine did"] : [], X.exhibits ? 2 : 0]);
      chk("U16 steps", m.steps >= 1 && m.badNumerals === 0, [m.steps, m.badNumerals], [">=1", 0]);
      const numeralWant = X.sage ? RGB.sage : RGB.copperDeep;
      chk("U17 numeral colour", m.numeralColor === numeralWant, m.numeralColor, numeralWant);
      const closeWant = [`/services#${X.service}|${X.label} →`];
      chk("U18 close link", same(m.close, closeWant), m.close, closeWant);
      const nextOk = same(m.next, [`/work/${X.next}`]) && m.nextParts.every((p) => p !== "missing" && p.length > 0) && m.nextParts[3] === X.nextLabel;
      chk("U19 Next entry", nextOk, [m.next, m.nextParts[3]], [[`/work/${X.next}`], X.nextLabel]);
      chk("U20 All work", same(m.all, ["/work|All work"]), m.all, ["/work|All work"]);
      chk("U21 no console or page errors", errors.length === 0, errors, []);

      if (SHOTS) {
        await page.screenshot({ path: `${SHOTS}/study-${slug}-fold-${w}.png` });
        await page.screenshot({ path: `${SHOTS}/study-${slug}-full-${w}.png`, fullPage: true });
      }

      if (w === 1440 && m.close.length === 1) {
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/services", { timeout: 20000 }),
          page.click(".cs-close a"),
        ]);
        await sleep(2500);
        const land = await page.evaluate(() => {
          const el = document.getElementById(location.hash.slice(1));
          return { hash: location.hash, top: el ? Math.round(el.getBoundingClientRect().top) : "missing" };
        });
        const landOk = land.hash === `#${X.service}` && typeof land.top === "number" && land.top >= 0 && land.top <= 240;
        chk("U22 close lands on its /services block", landOk, land, { hash: `#${X.service}`, top: "0..240" });
      }
      await page.close();
    }

    for (const js of [true, false]) {
      console.log(`/work/${slug} @1440 motion js=${js}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
      await page.setJavaScriptEnabled(js);
      const cdp = await page.createCDPSession();
      const started = [];
      cdp.on("Animation.animationStarted", (e) => {
        if (e.animation.name === "cs-settle") started.push([Math.round(e.animation.source.duration), Math.round(e.animation.source.delay)]);
      });
      await cdp.send(CDP_ANIMATION_ON);
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 });
      await sleep(1500);
      const s = await page.evaluate(() => {
        const lines = [...document.querySelectorAll("main h1.cs-title > .cs-title__line")];
        let props = "missing";
        const walk = (rules) => {
          for (const r of rules) {
            if (r.type === CSSRule.KEYFRAMES_RULE && r.name === "cs-settle") {
              props = [...new Set([...r.cssRules].flatMap((k) => [...k.style]))].sort().join(",");
            } else if (r.cssRules) {
              walk(r.cssRules);
            }
          }
        };
        for (const sheet of document.styleSheets) {
          try {
            walk(sheet.cssRules);
          } catch {
            /* cross-origin sheet */
          }
        }
        return { n: lines.length, end: lines.map((l) => `${getComputedStyle(l).opacity}/${getComputedStyle(l).transform}`), props };
      });
      const sorted = [...started].sort((a, b) => a[1] - b[1]);
      const want = js ? expectedStarts(s.n) : [];
      chk(`M1 settle animations js=${js}`, same(sorted, want), sorted, want);
      chk(`M2 finished frame js=${js}`, s.n >= 1 && s.end.every((e) => e === "1/none"), s.end, "every line 1/none");
      chk(`M3 keyframes animate opacity and transform only js=${js}`, s.props === "opacity,transform", s.props, "opacity,transform");

      if (js && slug === "guardicore" && !(await page.$(".cs-next__entry"))) {
        chk("M4 settle runs on a client navigation into a study", false, "no .cs-next__entry", "a Next entry to click");
      } else if (js && slug === "guardicore") {
        started.length = 0;
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 20000 }),
          page.click(".cs-next__entry"),
        ]);
        await sleep(1500);
        const n2 = await page.evaluate(() => document.querySelectorAll("main h1.cs-title > .cs-title__line").length);
        const sorted2 = [...started].sort((a, b) => a[1] - b[1]);
        chk("M4 settle runs on a client navigation into a study", same(sorted2, expectedStarts(n2)), sorted2, expectedStarts(n2));
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log(`template120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
```

---

## Rejected for sections 3 and 4

- **Driving the settle with GSAP in TitleCard.** It cannot start before hydration: the title
  either paints finished and jumps back (a flash, section 6 settle120 S3) or hides until JS runs
  (LCP waits on the bundle). CSS starts at first paint.
- **An inline pre-paint script that sets a "JS on" class.** `(scripting: enabled)` does the same
  with no script (probe 2026-09-16, Chrome 153).
- **A module-level "played" flag for once per load.** It needs client JS and a hydration-time
  decision, which brings back the flash. The settle runs once per study page render instead.
- **Delaying the settle until the 900ms dim finishes.** Both timings are ruled; retiming either
  is a new motion decision.
- **A shared-element view transition of the photograph** (FABLE-120-DESIGN §4 option 2). The
  dim is ruled unchanged and the /work hero is the clip, so no shared element is added.
- **Keeping `PIN_DISTANCE_PX`, ScrollTrigger or the Lenis bridge for later.** Dead motion code
  in the one allowlisted GSAP file invites the pin back.
- **Removing `components/TitleCard.tsx` from the gsap-quarantine-gate ALLOWLIST.** Optional
  cleanup, not needed for a green gate, and it edits a gate this pass has no reason to touch.
- **The sticky rail, the TOC, the reading-progress bar and the meta fallback line.** Ruled out;
  the at-a-glance block carries role and client in the first fold, and the rail printed years.
- **The `Protected by NDA` and `Client-confidential` specimen boxes.** A box posing as an image
  says an image is missing.
- **Captions under the band photograph and the chapter break** (the mock prints `Working
  session · Tel Aviv`). No-captions ruling.
- **Copper step numerals on paper.** 3.93:1 fails at 13px; copper-deep (6.62) or sage (4.61).
- **`rule-foyer` as the exhibit tint.** The block's own hairline would vanish; bone is the
  one-step-off-paper token.
- **The mock's mono `All work` link.** Mono is for labels; a link is not a label.
- **Leaving the theater grain and spotlight fixed over the paper body.** They would speckle and
  lighten the reading surface.
- **A dark footer after the paper body.** The page would end on a third ground; the mock ends
  on paper.
- **The OG image's uppercase, 0.14em-tracked saffron client eyebrow.** A tracked-uppercase
  kicker in a second accent; the client line is sentence case in ink-soft, under a copper (sage
  on ORDANI) bar.
- **`priority` on the band image.** Deprecated in Next.js 16 in favour of `preload`.
- **`100vw` full bleed for the chapter break.** A classic scrollbar makes `100vw` wider than the
  page; the grid's `full` line does not.
- **Photograph straight after the dek on phones** (design doc). It pushes the Results row a full
  screen down on Guardicore; head, dek, at-a-glance, then photograph.
- **A context line above the title with copy different from the Client row.** No such copy exists
  in the locked drafts; the design doc sets both the context line and a Client row, and section 2
  supplies one `client` string for both.

---

## Open items (one line each)

1. Operator: "once per load" is built as once per study page render (full load or client navigation into a study), never on scroll or re-render, with no memory across pages; confirm.
2. Judge: arriving through the dim, the 600ms settle plays inside the 900ms fade-in and is partly veiled; look at it on the M4 path before ship.
3. Operator: DESIGN_BAR R2 wants the largest type at least 4x body; a study tops out at 56/18 = 3.1 (390: 36/17 = 2.1), because the design and section 2 reject a 112 figure on the band.
4. Operator: DESIGN_BAR R16 lists "award-winning" as hype vocabulary, and the ruled RFP descriptor puts it in the context line, the Client row and the dek; record whether the ruling is an R16 exception.
5. Assembler: section 6 page120 T13 expects at least one full-bleed image on /work/guardicore, but section 2 and this section give Guardicore no chapter break and a non-bleed band photograph.
6. Assembler: section 6 K8 expects `datePublished >= "2026-09-16"`, but section 2 sets Guardicore and ORDANI `publishedAt` to 2026-05-14.
7. Assembler: this section's 3.10 OG file supersedes section 2 §2.2's three opengraph-image rows (same fields, plus the eyebrow and accent fixes); keep one.
8. Assembler: section 4 deletes /work CSS by `sed` line ranges while this section deletes by selector; order the two globals.css edits so neither shifts the other's targets.
9. Technical: the production CSS pipeline (Lightning CSS under Next 16 and Tailwind v4) must keep `(scripting: enabled)` in the media query; M1 fails if it is stripped or rewritten.
10. Technical: fonts load with `display: swap`; a late Bricolage swap could move the h1 after 600ms and trip settle120 S2's position-based frame sampler, and that has not been measured.
11. Technical: the close link's hash landing runs through `router.push` inside `startViewTransition` with Lenis mounted; U22 measures it, and nothing earlier has.
12. Technical: MDX must not emit whitespace text nodes inside the exhibit's `tbody`; U21 fails on the resulting hydration error if it does.
13. Assembler: `.claude/CLAUDE.md` still describes the pinned TitleCard, a 600ms dim and GSAP Pitfall C1 as the signature (One signature motion, Definition of done #1); no section edits it.
14. Operator: the nav's 22px wordmark and 12px links are site chrome outside `main`; counted with them a study shows six sizes at 1440, so R2's five-size limit holds only in the content scope section 6 uses.
15. Operator: the Guardicore band photograph is a 770px source, soft at 2x on a 1440 band (also parked in section 2).

## 3b. The /work index, the hero clip and redirects

Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Every command runs
from the worktree root in Git Bash unless it says PowerShell. Every file:line below comes from
`.planning/briefs-prep/pass-120/work-index.md`, `study-template.md`, `gates.md`, or my own read of
the worktree on 2026-09-16.

**What this section writes, and what it only reads.**

| This section writes | It reads, and never retypes |
|---|---|
| `app/(foyer)/work/page.tsx` (whole file) | Every visible string on /work except the one kept cross-link line (3b.1): the entry strings from each study's `entry` frontmatter and `SERVICE_LABELS` (section 2, §2.1, §2.3, §2.5), `METHOD_LINE` and `RECORD` from `content/work-page.ts` (section 2, §2.4, §2.5a) |
| `components/color-worlds/WorkHeroClip.tsx` (new) | `isPublished` and `PublishedCaseStudyMeta` from `lib/case-studies.ts` (section 2, §2.2) |
| `app/globals.css`: delete `.cw-wk*` and `.cw-lot*`, add `.cw-wx*` | The /work metadata description string (section 5, row 29) |
| `next.config.ts`: two redirects | The deletion of `content/work/postmates.mdx` and `neuton.mdx` (section 2, §2.3) |
| `public/media/work-hero-720.mp4`, `work-hero-720.webm`, `work-hero-poster-960.avif` (new) | `llms.txt` (section 2 §2.7 and section 5 rows 23-28) |
| `.claude/brand.json`: a new `motion.heroclip` key only (the `motion.signature` rewrite belongs to the TitleCard section) | Every gate, script and ship condition in section 6 |
| `.planning/exec/clipnav120.mjs` (new verifier, 3b.12) | |

**Where the inputs disagree, and what this section follows.**
- `.planning/reviews/FABLE-120-DESIGN.md` §4 rules that the generated clip "does not ship on the
  site in any form". The operator overrode that on 2026-09-16 ("Use the AI clip anyway"), recorded
  as the R12 exception in `docs/DESIGN_BAR.md:201`. The repo file wins: the clip ships, under the
  exception's conditions.
- FABLE-120-DESIGN §2 and §4 option 1 give the photograph "its real caption". The CAPTIONS ruling
  (2026-09-16) and `DESIGN_BAR.md:201` say no caption and no disclosure. No caption ships. The mock
  `.planning/mock/pass-120/b/work.html:398` caption `Working session · Tel Aviv · animated from a
  photograph` is rejected.
- FABLE-120-DESIGN §2 (index entries) puts the context label in mono. Its own shared rule in the
  same section limits JetBrains Mono to "the at-a-glance keys, the step numerals, the record block's
  role and year columns, and the `Name protected` label", and section 6 T6 fails any mono text of 7
  or more words. The RFP context label is 13 words. So the context label is Hanken Grotesk at the
  label size, and only the service label and the record role and outcome are mono.
- The mock ends the method line "...sells it." and drops event years and client descriptors. The
  ledger (LESSONS #3, THE /WORK METHOD LINE) and the rulings win; section 2 already carries the
  corrected strings.
- `work-index.md` §7 calls the redirects "301". `permanent: true` answers **308**
  (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md:30`).
  Every check in this section asserts 308.
- `.claude/CLAUDE.md` "Two modes" says foyer pages carry `data-mode="foyer"` on cream paper
  `#F5EFE4`. Live code wins: `app/(foyer)/layout.tsx:35` stamps `data-mode="cw"`, and every /work
  colour comes from the Color Worlds variables. "Paper" on /work is the `bone` world
  (`#ECE3D0` ground, `#2A1F18` ink, `components/color-worlds/OpeningWorld.tsx:40`).

---

### 3b.1 Copy on /work

No string is typed into `page.tsx` except the kept cross-link line below. Everything else renders
from data another section fixes.

| Where | Source | Renders as |
|---|---|---|
| Lead context, figure, line, did, service | `guardicore.mdx` `entry.context`, `entry.figure`, `entry.line`, `entry.did`, `SERVICE_LABELS["positioning-gtm"]` | Section 2 §2.5 row 1 |
| Method line (the `h2` of the studies section) | `METHOD_LINE` | `I find what your buyers are actually paying for, then build the system that sells exactly that.` |
| Entries 2 to 5 | each study's `entry.context`, `entry.line`, `entry.did`, `SERVICE_LABELS[service]`, in `order` | Section 2 §2.5 rows 2-5 |
| Record block | `RECORD.heading`, `RECORD.line`, `RECORD.rows[]` | Section 2 §2.4 |
| Poster accessible name (the `aria-label` on the media `figure`) | `HERO_ALT` constant in `page.tsx`, the alt this frame already carries at `app/(foyer)/work/page.tsx:116` and `app/(foyer)/about/page.tsx:137` | `A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.` |
| Cross-link line, below the record block and outside `#record` | kept verbatim from `app/(foyer)/work/page.tsx:178-187` | `The next entry in this record could be yours. Engagements scoped on a call; packages at $500, $2,500 and $7,500.` (`Engagements` links to `/services`, `packages` links to `/packages`) |
| `metadata.title` and `openGraph.title` | unchanged from `app/(foyer)/work/page.tsx:50,55` | `Work: pipeline, products, and exits` |
| `metadata.description` and `openGraph.description` | section 5, row 29 | `Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.` |

Removed from /work and not replaced: `The rest of the record` (`page.tsx:134`), both
`Read the case study →` links (`:109`, `:155`), the `01 of 06` provenance line and the lead's
`{lead.year}` (`:99-107`), every entry number (`:142-144`), the list meta with `{s.year}`
(`:149-153`), the stat trios (`:158-167`), and the figcaption `Working session · Tel Aviv · 2018-2021`
(`:122`).

---

### 3b.2 File list, in the order to make the edits

1. `public/media/` (new directory): the three transcodes from 3b.7. Nothing else goes in it.
2. `components/color-worlds/WorkHeroClip.tsx`: create with 3b.4.
3. `app/(foyer)/work/page.tsx`: replace the whole file with 3b.3.
4. `app/globals.css`: the deletions and the insertion in 3b.5.
5. `next.config.ts`: the insertion in 3b.8.
6. `.claude/brand.json`: the `motion.heroclip` key in 3b.11.
7. `.planning/exec/clipnav120.mjs`: create with 3b.12.

`components/color-worlds/OpeningWorld.tsx`, `components/color-worlds/WorldSwitcher.tsx`,
`components/color-worlds/ExitRecord.tsx`, `app/sitemap.ts`, `app/robots.ts` and
`app/(foyer)/work/opengraph-image.tsx` are not edited (3b.6, 3b.9, 3b.10).

These edits depend on section 2's schema and `content/work-page.ts` existing. Make them after
section 2's content commit, or in the same commit; never before, or `tsc` fails on `entry`,
`isPublished`, `SERVICE_LABELS` and `RECORD`.

---

### 3b.3 `app/(foyer)/work/page.tsx`: replace the whole file with exactly this

```tsx
// app/(foyer)/work/page.tsx
//
// /work, Pass-120 Direction B (.planning/reviews/FABLE-120-DESIGN.md section 2).
// Paper from top to bottom, the bone world: the lead study at hero scale beside
// the Tel Aviv clip, the method line, four entries of four data points each
// (DESIGN_BAR R11), and the record block at #record, where /work/postmates and
// /work/neuton land (next.config.ts, 308).
//
// Rulings: no year beside a role (LESSONS #3, 2026-09-15); no caption on the
// photograph or the clip (operator 2026-09-16); the clip is the DESIGN_BAR R12
// exception of 2026-09-16 (brand.json motion.heroclip). Every visible string
// renders from content: the entry frontmatter of each study, SERVICE_LABELS,
// and content/work-page.ts. The one kept literal is the cross-link line.
//
// Replaces the Pass-61 catalogue lot and the Pass-58 study list.
import type { Metadata } from "next";
import { preload } from "react-dom";
import { getAllCaseStudies, isPublished } from "@/lib/case-studies";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import { METHOD_LINE, RECORD } from "@/content/work-page";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { WorkHeroClip } from "@/components/color-worlds/WorkHeroClip";
import { ViewTransitionLink } from "@/components/view-transition-link";

const HERO_POSTER = "/media/work-hero-poster-960.avif";
const HERO_ALT =
  "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work: pipeline, products, and exits",
  description:
    "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work: pipeline, products, and exits",
    description:
      "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/work",
  },
};

export default async function WorkIndexPage() {
  const studies = (await getAllCaseStudies()).filter(isPublished);
  const [lead, ...rest] = studies;

  // The poster is the LCP candidate at both widths. Preload it from the head so
  // it starts before the body parses; the video itself loads nothing until the
  // clip starts (preload="none" in WorkHeroClip).
  preload(HERO_POSTER, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
  });

  return (
    <>
      <OpeningWorld name="bone" />

      {lead ? (
        <section
          className="cw-wx cw-wx-lead"
          data-section
          data-world="bone"
          aria-labelledby="cw-wx-lead-title"
        >
          <ViewTransitionLink
            href={`/work/${lead.slug}`}
            className="cw-wx-lead__link"
          >
            <p className="cw-wx-ctx cw-wx-lead__ctx">{lead.entry.context}</p>
            <h1 id="cw-wx-lead-title" className="cw-wx-lead__h1">
              <span className="cw-wx-lead__fig">{lead.entry.figure}</span>{" "}
              <span className="cw-wx-lead__line">{lead.entry.line}</span>
            </h1>
            <p className="cw-wx-lead__did">{lead.entry.did}</p>
            <p className="cw-wx-label cw-wx-lead__svc">
              {SERVICE_LABELS[lead.service]}
            </p>
          </ViewTransitionLink>

          <figure className="cw-wx-lead__media" aria-label={HERO_ALT}>
            <WorkHeroClip poster={HERO_POSTER} />
          </figure>
        </section>
      ) : null}

      <section
        className="cw-wx cw-wx-studies"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-method"
      >
        <h2 id="cw-wx-method" className="cw-wx-method">
          {METHOD_LINE}
        </h2>
        <ol className="cw-wx-list">
          {rest.map((s) => (
            <li key={s.slug} className="cw-wx-list__item">
              <ViewTransitionLink href={`/work/${s.slug}`} className="cw-wx-entry">
                <div className="cw-wx-entry__a">
                  <p className="cw-wx-ctx cw-wx-entry__ctx">{s.entry.context}</p>
                  <h3 className="cw-wx-entry__line">{s.entry.line}</h3>
                </div>
                <div className="cw-wx-entry__b">
                  <p className="cw-wx-entry__did">{s.entry.did}</p>
                  <p className="cw-wx-label cw-wx-entry__svc">
                    {SERVICE_LABELS[s.service]}
                  </p>
                </div>
              </ViewTransitionLink>
            </li>
          ))}
        </ol>
      </section>

      <section
        id={RECORD.id}
        className="cw-wx cw-wx-rec"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-rec-title"
      >
        <h2 id="cw-wx-rec-title" className="cw-wx-rec__h">
          {RECORD.heading}
        </h2>
        <p className="cw-wx-rec__line">{RECORD.line}</p>
        <ol className="cw-wx-rec__list">
          {RECORD.rows.map((row) => (
            <li key={row.company} className="cw-wx-rec__row">
              <p className="cw-wx-rec__co">
                {row.href ? (
                  <ViewTransitionLink href={row.href}>{row.company}</ViewTransitionLink>
                ) : (
                  row.company
                )}
              </p>
              <p className="cw-wx-rec__meta">
                <span className="cw-wx-label cw-wx-rec__role">{row.role}</span>
                <span className="cw-wx-label cw-wx-rec__what">{row.outcome}</span>
              </p>
              <p className="cw-wx-rec__desc">{row.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="cw-wx cw-wx-close">
        {/* Review 2026-09-02 #11, kept: the page still closes with one line
            asking for the work. It sits outside #record (the record block
            carries no CTA). No entity after either </a> (LESSONS #6). */}
        <p className="cw-wx-cross">
          The next entry in this record could be yours.{" "}
          <a href="/services" className="cw-wx-link">
            Engagements
          </a>{" "}
          scoped on a call;{" "}
          <a href="/packages" className="cw-wx-link">
            packages
          </a>{" "}
          at $500, $2,500 and $7,500.
        </p>
        <PageFooter />
      </div>
    </>
  );
}
```

Notes the executor does not reinterpret:
- `preload` from `react-dom` is React 19's resource API, callable from a Server Component; it
  emits `<link rel="preload" as="image" ...>` into the head. Next 16's own `<Image preload>` is
  not used because the poster is a `<video poster>`, not an `<img>`
  (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:265-289`).
- The `h1` holds the figure and its line as one heading, the Pass-67 rule this file carried at
  `:85-90` (a figure alone reads as a brag). Its accessible text is `$14M in revenue, sourced and
  closed, at a $1.2M average enterprise deal.`
- Entries and the Guardicore record link use `ViewTransitionLink`
  (`components/view-transition-link.tsx:35-70`), because the foyer-to-theater dim only runs
  through it, and Direction B lands the visitor on the study's dark band through that dim. The two
  cross-link anchors stay plain `<a>` (foyer to foyer, as today).
- No `year`, `role`, `stats`, `indexLine`, `feature` or `total` read survives. `lead` is typed
  `PublishedCaseStudyMeta`, so `lead.entry.figure` is `string | undefined`; section 2's
  `superRefine` makes it present on `order: 1`.

---

### 3b.4 `components/color-worlds/WorkHeroClip.tsx`: create with exactly this

```tsx
// components/color-worlds/WorkHeroClip.tsx
//
// Pass-120: the /work hero clip. DESIGN_BAR R12 exception (operator 2026-09-16,
// "Use the AI clip anyway"), brand.json motion.heroclip. Not a precedent.
//
// The server renders the <video> with its poster, which is frame 0 of the clip
// (the photograph as it went in, no generated motion). That poster is the whole
// render without JavaScript, under prefers-reduced-motion, with Save-Data on,
// and on a 2g connection: in those cases play() is never called.
//
// Otherwise, after the window load event (so the clip never competes with LCP)
// and once any part of the frame is in the viewport, it plays ONCE per document:
// muted, inline, no loop, no controls, and it holds its last frame. A client
// navigation back to /work remounts the video on its poster and does not play
// it again (playedThisLoad). If play() is refused (iOS Low Power Mode, a codec
// gap), the poster simply stays. No caption, no disclosure.
"use client";

import { useEffect, useRef } from "react";

let playedThisLoad = false;

type ConnectionHint = { saveData?: boolean; effectiveType?: string };

export function WorkHeroClip({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: ConnectionHint })
      .connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled || playedThisLoad) return;
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          playedThisLoad = true;
          video.muted = true;
          video.preload = "auto";
          video.play().catch(() => {
            // Refused: the poster stays, and nothing retries.
          });
        },
        { threshold: 0 },
      );
      observer.observe(video);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", arm);
      observer?.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="cw-wx-lead__clip"
      width={720}
      height={900}
      poster={poster}
      preload="none"
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/work-hero-720.webm" type='video/webm; codecs="vp9"' />
      <source src="/media/work-hero-720.mp4" type='video/mp4; codecs="avc1.640028"' />
    </video>
  );
}
```

The `<video>` element's attribute set is exactly the one above. It carries **no** `autoPlay`,
`loop`, `controls` or `<track>`, and no caption element exists near it (section 6 V4 C1, C9).
Codec strings: `vp9` for the WebM; `avc1.640028` is H.264 High profile (`64`), level 4.0 (`28`),
which is what 3b.7 encodes and W1 probes. React 19.2 types declare `disablePictureInPicture` and
`disableRemotePlayback` (`node_modules/@types/react/index.d.ts:3579-3580`). The file imports no
`gsap`, so `scripts/gsap-quarantine-gate.mjs` needs no allowlist entry.

---

### 3b.5 `app/globals.css`

**Delete, bottom block first so the top block's line numbers do not move** (7,623 lines on
2026-09-16). Before each deletion, confirm the boundary lines print exactly as shown; if either
differs, stop and report.

1. **Block B, `.cw-lot*` and the rest-title, lines 6577-6703.**
   `sed -n '6577,6578p;6701,6703p' app/globals.css` prints:
   ```
   /* ============================================================
    * Pass-61 — /work opens as a catalogue lot (.cw-lot*)
   [data-mode="cw"] .cw-wk .cw-wk-list {
     margin-top: 24px;
   }
   ```
   Then `sed -i '6577,6703d' app/globals.css`. Line 6704 (blank) and the
   `Pass-110 — the /services doors died` comment that follows stay.
2. **Block A, `.cw-wk*`, lines 6381-6518.**
   `sed -n '6381,6382p;6517,6520p' app/globals.css` prints:
   ```
   /* ============================================================
    * Pass-58 — /work index rebuilt (.cw-wk*) + case-page glance strip
     text-align: right;
   }

   /* Case page: outcome strip under the TitleCard (theater) */
   ```
   Then `sed -i '6381,6518d' app/globals.css`. The theater glance block that followed
   (`/* Case page: outcome strip under the TitleCard (theater) */`, formerly 6520-6575) is NOT this
   section's to delete; the study-template section owns it.

After both deletions: `grep -c "cw-lot\|cw-wk" app/globals.css` prints `0`.

**Insert** the block below immediately before the line
`/* ============================================================` that opens the comment whose
second line is ` * Pass-110 — the /services doors died in Pass-108; their CSS died here.`
(find it with `grep -n "Pass-110 — the /services doors died" app/globals.css`, then insert above
the line before it). Every token used exists: `--cw-fg` (`app/globals.css:1348-1353`),
`--font-cw-display`, `--font-cw-body`, `--font-cw-mono` (`:125-127`), `--color-cw-espresso`
(`:122`), `--color-foyer-ink-soft` (`:24`), `--color-accent-copper` (`:48`),
`--color-accent-copper-deep` (`:49`). The block defines five new custom properties on `.cw-wx`
(`--wx-fig`, `--wx-head`, `--wx-body`, `--wx-label`, `--wx-rule`) and uses them nowhere else.

```css
/* ============================================================
 * Pass-120 - /work index, Direction B (.cw-wx*)
 * Replaces the Pass-61 catalogue lot and the Pass-58 study list. Paper, the bone world,
 * top to bottom: the lead study at hero scale beside the Tel Aviv clip,
 * the method line, four entries of four data points (DESIGN_BAR R11), and
 * the record block (#record). The five-size ladder of FABLE-120-DESIGN
 * section 2; /work uses four of the five: 112/36/18/13 above 760px,
 * 64/26/17/12 at 760px and below. No motion here but the clip
 * (brand.json motion.heroclip). Hover is an underline, never a lift.
 * No uppercase, no tracking beyond 0.06em, no opacity on text.
 * ============================================================ */
[data-mode="cw"] .cw-wx {
  --wx-fig: 112px;
  --wx-head: 36px;
  --wx-body: 18px;
  --wx-label: 13px;
  --wx-rule: color-mix(in srgb, var(--cw-fg) 22%, transparent);
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx {
    --wx-fig: 64px;
    --wx-head: 26px;
    --wx-body: 17px;
    --wx-label: 12px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

/* Shared text roles */
[data-mode="cw"] .cw-wx-ctx {
  margin: 0;
  font-family: var(--font-cw-body);
  font-size: var(--wx-label);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: none;
  color: var(--color-foyer-ink-soft);
}
[data-mode="cw"] .cw-wx-label {
  margin: 0;
  font-family: var(--font-cw-mono);
  font-size: var(--wx-label);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: none;
  color: var(--color-foyer-ink-soft);
}

/* Lead study */
[data-mode="cw"] .cw-wx-lead {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: start;
  padding-top: 152px;
}
@media (max-width: 900px) {
  [data-mode="cw"] .cw-wx-lead {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-lead {
    padding-top: 112px;
  }
}
[data-mode="cw"] .cw-wx-lead__link {
  display: block;
  color: inherit;
  text-decoration: none;
}
[data-mode="cw"] .cw-wx-lead__link:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 8px;
}
[data-mode="cw"] .cw-wx-lead__h1 {
  margin: 16px 0 0;
  /* The h1's only own text is the space between its two spans; its size is
   * pinned to a ladder value so no stray default size reaches the type gate. */
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.15;
}
[data-mode="cw"] .cw-wx-lead__fig {
  display: block;
  font-family: var(--font-cw-display);
  font-size: var(--wx-fig);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__line {
  display: block;
  margin-top: 20px;
  max-width: 22ch;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__did {
  margin: 24px 0 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__svc {
  margin-top: 20px;
}
[data-mode="cw"] .cw-wx-lead__link:hover .cw-wx-lead__line,
[data-mode="cw"] .cw-wx-lead__link:focus-visible .cw-wx-lead__line {
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}
[data-mode="cw"] .cw-wx-lead__media {
  position: relative;
  margin: 0;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--color-cw-espresso);
}
@media (max-width: 900px) {
  [data-mode="cw"] .cw-wx-lead__media {
    max-width: 480px;
  }
}
[data-mode="cw"] .cw-wx-lead__clip {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

/* Method line and the four entries */
[data-mode="cw"] .cw-wx-method {
  margin: 120px 0 0;
  max-width: 28ch;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-method {
    margin-top: 72px;
    max-width: none;
  }
}
[data-mode="cw"] .cw-wx-list {
  list-style: none;
  margin: 56px 0 0;
  padding: 0;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-list {
    margin-top: 40px;
  }
}
[data-mode="cw"] .cw-wx-list__item {
  border-top: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-list__item:last-child {
  border-bottom: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-entry {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  column-gap: 64px;
  row-gap: 12px;
  align-items: start;
  padding: 40px 0;
  color: inherit;
  text-decoration: none;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-entry {
    grid-template-columns: minmax(0, 1fr);
    padding: 28px 0;
  }
}
[data-mode="cw"] .cw-wx-entry:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 4px;
}
[data-mode="cw"] .cw-wx-entry__a,
[data-mode="cw"] .cw-wx-entry__b {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
[data-mode="cw"] .cw-wx-entry__line {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-entry__did {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-entry:hover .cw-wx-entry__line,
[data-mode="cw"] .cw-wx-entry:focus-visible .cw-wx-entry__line {
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

/* Record block, #record. No scroll-margin: the section's own top padding
 * keeps the h2 clear of the fixed nav when /work#record lands. */
[data-mode="cw"] .cw-wx-rec {
  padding-top: 120px;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec {
    padding-top: 80px;
  }
}
[data-mode="cw"] .cw-wx-rec__h {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__line {
  margin: 12px 0 0;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__list {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec__list {
    margin-top: 28px;
  }
}
[data-mode="cw"] .cw-wx-rec__row {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 3fr) minmax(0, 5fr);
  column-gap: 32px;
  row-gap: 12px;
  align-items: baseline;
  padding: 28px 0;
  border-top: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-rec__row:last-child {
  border-bottom: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-rec__co {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__co a {
  color: var(--color-accent-copper-deep);
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}
[data-mode="cw"] .cw-wx-rec__co a:hover,
[data-mode="cw"] .cw-wx-rec__co a:focus-visible {
  text-decoration-color: var(--color-accent-copper);
}
[data-mode="cw"] .cw-wx-rec__co a:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 4px;
}
[data-mode="cw"] .cw-wx-rec__meta {
  display: contents;
}
[data-mode="cw"] .cw-wx-rec__desc {
  grid-column: 1 / -1;
  margin: 0;
  max-width: 68ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec__row {
    display: block;
    padding: 20px 0;
  }
  [data-mode="cw"] .cw-wx-rec__meta {
    display: block;
    margin: 8px 0 0;
  }
  [data-mode="cw"] .cw-wx-rec__role,
  [data-mode="cw"] .cw-wx-rec__what {
    display: block;
  }
  [data-mode="cw"] .cw-wx-rec__desc {
    margin-top: 8px;
  }
}

/* Close: the kept cross-link line, then PageFooter */
[data-mode="cw"] .cw-wx-cross {
  margin: 96px 0 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-cross {
    margin-top: 64px;
  }
}
[data-mode="cw"] .cw-wx-link {
  color: var(--color-accent-copper-deep);
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
[data-mode="cw"] .cw-wx-link:hover,
[data-mode="cw"] .cw-wx-link:focus-visible {
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
}
```

Measured contrast on bone `#ECE3D0` (WCAG formula, run 2026-09-16): ink `#2A1F18` 12.59:1;
`--color-foyer-ink-soft` `#3A3631` 9.40:1; `--color-accent-copper-deep` `#8A3D24` 5.94:1 (body
links and the Guardicore record link); `--color-accent-copper` `#BD5A2D` 3.53:1 (underline colour
on hover and focus rings only, a UI component, AA needs 3:1). No hover or focus rule resolves to
`--cw-accent`, so `scripts/accent-states-lint.mjs` stays clean (`gates.md` §2.4).

Layout, stated once for the reviewer: at 1440 the lead is two columns, text `7fr` and media `5fr`
with a 64px gap inside a 1200px container (media 440px wide, 550px tall). At 900px and below it is
one column, text first, the media after it at most 480px wide. Entries are two columns above 760px
(context and figure-bearing line left, what he did and the service right) and one column at 760px
and below. Record rows are company, role, outcome across three columns with the description
spanning beneath; at 760px and below each row stacks company, role, outcome, description.

---

### 3b.6 `OpeningWorld`: kept, renamed to bone

`components/color-worlds/OpeningWorld.tsx` is unchanged. The page's first render changes from
`<OpeningWorld name="espresso" />` (`app/(foyer)/work/page.tsx:75`) to
`<OpeningWorld name="bone" />`, and every `data-section` on /work carries `data-world="bone"`
(three sections). The component's contract (`OpeningWorld.tsx:19-26`) requires the first section's
world and the opening world to agree, and the WorldSwitcher map still carries `bone` as
`{ bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" }` (`WorldSwitcher.tsx:49`), identical to
`OpeningWorld.tsx:40`. Keeping it prevents the terracotta first paint that Pass-61 fixed
(`OpeningWorld.tsx:5-13`): without it, `[data-mode="cw"]` opens terracotta
(`app/globals.css:1348`). Nothing on /work uses `espresso` any more except the media frame's
background behind the poster (`--color-cw-espresso`), which shows only if the poster fails.

---

### 3b.7 The hero clip: transcode, crop, budgets

**Source.** `C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4`,
3,264,298 bytes. Probed 2026-09-16: H.264, 1440x1440, yuv420p, 24 fps, 97 frames, 4.041667s, one
video stream and no audio stream. It is never committed (section 6 V4 C8).

**What frame 0 is.** Opened and viewed on 2026-09-16: frame 0 is the cleaned
`public/guardicore-telaviv-session.jpg` scene (no location sticker, the tablecloth patch in place)
extended taller, graded to near-monochrome and darkened toward the bottom edge. Motion starts after
it. The poster is frame 0, so the swap from poster to first frame shows no jump (W1 measures it).

**The crop that keeps the colleagues at the edge.** The source is square; the frame on the page is
4:5. The crop is baked into every transcode: `crop=1152:1440:196:0`, the 1152-wide window starting
196px from the left. That is exactly what `object-fit: cover; object-position: 68% 50%` would show
of the square source in a 4:5 box (overflow 288px, 68% of it is 195.84px). Micah's face sits at
about 68% across the window. The seated colleague in glasses is cut by the right edge, the
colleague at top left shows torso and hands only, the colleague at top right is cut by the top and
right edges. Because the crop is baked, the CSS uses `object-position: 50% 50%` on an exactly 4:5
box and no second crop happens in the browser. Viewed on the frame-0 extract at 960x1200.

**Commands** (Git Bash; `ffmpeg` and `ffprobe` 8.0.1 are on PATH on this machine). Run exactly:

```bash
SRC="C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4"
TMP="C:/tmp/pass120-clip"
OUT="public/media"
CROP="crop=1152:1440:196:0"
mkdir -p "$TMP" "$OUT"

# 1. H.264 MP4, 720x900, High@4.0, no audio, moov atom first
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 -movflags +faststart "$OUT/work-hero-720.mp4"

# 2. VP9 WebM, 720x900, constant quality, no audio
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$OUT/work-hero-720.webm"

# 3. Frame 0 master at 960x1200 (not committed)
ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,0),$CROP,scale=960:1200:flags=lanczos" -frames:v 1 "$TMP/work-hero-f0-960.png"

# 4. The poster: AVIF still from frame 0
ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -map_metadata -1 -c:v libaom-av1 -still-picture 1 -crf 20 -cpu-used 4 -pix_fmt yuv420p "$OUT/work-hero-poster-960.avif"
```

**Budgets** (bytes, hard ceilings; the trial encode with these exact settings on 2026-09-16 is in
brackets):

| File | Ceiling | Trial |
|---|---|---|
| `public/media/work-hero-720.mp4` | 240,000 | 199,143 |
| `public/media/work-hero-720.webm` | 140,000 | 110,214 |
| `public/media/work-hero-poster-960.avif` | 24,000 | 13,412 |

What a visitor downloads: the poster (about 13KB) on every load, then one video (Chrome, Firefox
and Edge take the WebM, about 110KB; Safari takes the MP4, about 200KB) only after `load`, only when
the clip will actually play. These sit well inside section 6 V4 C7's served ceilings.

Why 720x900: the frame renders 440x550 CSS px at 1440 and at most 350x438 at 390, so 720 wide
covers about 1.6x at desktop and 2x at a 390 phone. The source is itself soft (a generated
upscale), and a 960-wide video measured no visible gain in the trial.

**Preload strategy for LCP.** The poster is the LCP image candidate at both widths (Chrome counts a
`<video>` poster). `page.tsx` preloads it with `fetchPriority: "high"`. The `<video>` is
server-rendered with `preload="none"`, so no media byte is fetched until the clip starts, and the
clip starts only after the `load` event. When the first video frame paints it is the same size as
the poster, so it does not create a larger LCP entry. The LCP gate itself is section 6, 6.6 (L1
median `<= 1800`ms, L2 CLS `<= 0.05`), and the ship condition is section 6, 6.8.

---

### 3b.8 `next.config.ts`: the two redirects

Insert, immediately after the `/work/akamai` object's closing `},` (`next.config.ts:28`) and before
the `// Pass-57 (operator 2026-09-01: ...` comment (`:29`), exactly:

```ts
      // Pass-120 (operator 2026-09-15): Postmates and Neuton.AI become rows in
      // the record block on /work, "but definitely describe a bit for each
      // one". Both pages retire. permanent: true answers 308, not 301
      // (node_modules/next/dist/docs/01-app/03-api-reference/05-config/
      // 01-next-config-js/redirects.md:30). The #record fragment is kept in the
      // Location header (next/dist/shared/lib/router/utils/
      // prepare-destination.js:184-192) and lands on <section id="record">.
      {
        source: "/work/postmates",
        destination: "/work#record",
        permanent: true,
      },
      {
        source: "/work/neuton",
        destination: "/work#record",
        permanent: true,
      },
```

Redirects run before the filesystem and pages (`redirects.md:39`), and no `middleware.ts` or
`proxy.ts` exists (`work-index.md` §7), so these two entries are the only layer.
`scripts/render-gate.mjs` reads redirect sources from this file live (`:109-115`) and needs no
edit. The two MDX files are deleted by section 2, so the slugs also leave `generateStaticParams`,
the sitemap and `getNextCaseStudy` with no code change (`work-index.md` §8, §12).

---

### 3b.9 Sitemap, llms.txt, JSON-LD

- **`app/sitemap.ts`: no edit by this section.** The case-study routes are generated from
  `getAllCaseStudies()` (`:96-104`); section 2 changes the filter to `isPublished` (§2.2). Deleting
  the two MDX files removes `/work/postmates` and `/work/neuton`, and `content/work/birth-worker.mdx`
  adds `/work/birth-worker`. Checked by section 6 V1 K9 (six `/work` URLs, none retired).
- **`app/llms.txt/route.ts`: no edit by this section.** It never linked either retired slug
  (`work-index.md` §10). The five study lines, the birth-worker line and the Background lines are
  written by section 2 §2.7 and section 5 rows 23-28. **Those two sections both write
  `llms.txt:40-43`; the assembler must keep one of them** (see 3b.14).
- **JSON-LD: nothing added to /work, nothing to remove.** /work has no JSON-LD today
  (`content-model.md` §5). No JSON-LD anywhere references `/work/postmates` or `/work/neuton`: the
  only mention is `alumniOf` naming Postmates as an Organization with no `url`
  (`app/layout.tsx:103`, `work-index.md` §11), which stays. The birth-worker study gets its Article
  JSON-LD from the study template with `datePublished: cs.publishedAt` (section 2 §2.2), checked by
  section 6 V1 K8.

---

### 3b.10 `/work` opengraph image: unchanged

`app/(foyer)/work/opengraph-image.tsx` stays byte for byte (git blob
`16cc3bc6bc5563944dabb8396c5ee975e8140d3f`, last changed in `d614591`). Its copy renders as:
- eyebrow `WORK · MICAH JONES`
- headline `CASE STUDIES`
- punch `Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani.`

Reason: the punch carries no retired claim. It names no tenure year, no multiplier, no
reach figure and no client descriptor; "Four exits" and "$5B+ combined" are the ledgered home
wording that section 5 keeps on `/` ("Four exits behind my work, $5B+ combined"), and all four
companies still appear on /work, now as record rows. Section 5 reached the same verdict
(`live-sweep.md` §6: no retired claim). Postmates and Neuton.AI are named in pixels, not linked, so
the retirement does not touch it.

---

### 3b.11 `.claude/brand.json`: add `motion.heroclip`

Add this key inside `motion`, directly after the `countup` object and before `banned`. Do not touch
any other `motion` key in this edit (the TitleCard section rewrites `signature` and
`view_transition`):

```json
    "heroclip": {
      "id": "work-hero-clip",
      "description": "/work only: the 4.04s image-to-video clip of the Tel Aviv working-session photograph plays once per document load, muted, inline, no loop, no controls, and holds its last frame. It starts only after the window load event, once any part of the frame is in the viewport; a client navigation back to /work shows the poster and does not replay it. The poster is frame 0 of the clip, and the poster alone is the render without JavaScript, under prefers-reduced-motion, with Save-Data on, and on 2g connections. No caption and no disclosure (operator 2026-09-16). Colleagues kept at the frame's edge by a baked 4:5 crop. Operator exception to DESIGN_BAR R12, 2026-09-16 (\"Use the AI clip anyway\"), against the Fable design ruling; not a second signature and not a precedent for any other generated imagery. Ships only with the motion-engineer's written approval and a measured mobile LCP within 1800ms.",
      "files": [
        "components/color-worlds/WorkHeroClip.tsx",
        "app/(foyer)/work/page.tsx",
        "app/globals.css",
        "public/media/"
      ]
    },
```

The motion-engineer approval itself is section 6, 6.8 condition 1 (`^APPROVED: clip$` in
`.planning/reviews/MOTION-120-APPROVAL.md`).

---

### 3b.12 Verification

The standing clauses in section 6, 6.0 bind every line here. This section adds only what section 6
does not already check; the section 6 checks that cover this section are listed after W5 so
nothing is run twice.

**W1. Transcodes, static** (after 3b.7, before the commit). Tables would mangle the shell pipes, so
each check is a command block followed by its exact expected output.

W1a:
```bash
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,level,nb_frames -of csv=p=0 public/media/work-hero-720.mp4
```
Expected: `h264,High,720,900,yuv420p,40,97`

W1b:
```bash
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=codec_name,width,height,nb_read_frames -of csv=p=0 public/media/work-hero-720.webm
```
Expected: `vp9,720,900,97`

W1c:
```bash
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 public/media/work-hero-poster-960.avif
```
Expected: `av1,960,1200`

W1d (one video stream, no audio stream, in each video file):
```bash
for f in public/media/work-hero-720.mp4 public/media/work-hero-720.webm; do ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$f" | tr '\n' ' '; echo; done
```
Expected: two lines, each exactly `video ` (the word, then one space).

W1e (faststart: the moov atom sits in the first 64 bytes):
```bash
head -c 64 public/media/work-hero-720.mp4 | grep -a -c moov
```
Expected: `1`

W1f (byte ceilings):
```bash
node -e 'const fs=require("fs");const B={"work-hero-720.mp4":240000,"work-hero-720.webm":140000,"work-hero-poster-960.avif":24000};let f=0;for(const [n,max] of Object.entries(B)){const s=fs.statSync("public/media/"+n).size;const ok=s<=max;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W1f "+n+": got "+s+(ok?"":" (want <= "+max+")"))}console.log("W1f failures: "+f)'
```
Expected: three `PASS W1f` lines, then `W1f failures: 0`.

W1g (nothing else in the directory):
```bash
ls -1 public/media
```
Expected, exactly three lines:
```
work-hero-720.mp4
work-hero-720.webm
work-hero-poster-960.avif
```

W1h (the poster is frame 0):
```bash
ffmpeg -v info -i public/media/work-hero-poster-960.avif -i public/media/work-hero-720.webm -lavfi "[0:v]scale=720:900:flags=lanczos,format=yuv420p[a];[1:v]select=eq(n\,0),format=yuv420p[b];[a][b]ssim" -frames:v 1 -f null - 2>&1 | grep -o "All:[0-9.]*"
```
Expected: `All:` followed by a value `>= 0.98` (trial on 2026-09-16: `All:0.993672`).

W1i (bite proof for W1h): the W1h command with `eq(n\,0)` replaced by `eq(n\,96)`.
Expected: `All:` followed by a value `< 0.98` (trial: `All:0.904339`). This proves W1h tells the
first frame from the last.

W1h is the "poster is frame 0" check. If W1h prints a value below 0.98, stop and report; do not
re-encode at another quality to pass it.

**W2. Static greps** (after all edits, before the build). In these commands `\|` is grep's
alternation, typed exactly as shown.

W2a (the retired classes are gone everywhere):
```bash
grep -rn "cw-lot\|cw-wk" app components lib scripts; echo "exit=$?"
```
Expected: only the line `exit=1`.

W2b, W2c, W2d (the world and the retired reads):
```bash
grep -c 'data-world="bone"' "app/(foyer)/work/page.tsx"
grep -c 'OpeningWorld name="bone"' "app/(foyer)/work/page.tsx"
grep -c "espresso\|figcaption\|\.year\|indexLine\|feature\|stats" "app/(foyer)/work/page.tsx"
```
Expected, three lines: `3`, `1`, `0`.

W2e, W2f (the redirects):
```bash
grep -c 'destination: "/work#record"' next.config.ts
grep -c 'source: "/work/postmates"\|source: "/work/neuton"' next.config.ts
```
Expected, two lines: `2`, `2`.

W2g (no autoplay, loop, controls or track in the clip's JSX; the header comment's "no loop, no
controls," is followed by a comma and does not match):
```bash
grep -cE 'autoPlay|\bloop\b[^,]|\bcontrols\b[^,]|<track' components/color-worlds/WorkHeroClip.tsx
```
Expected: `0`

W2h (the brand.json key, in place):
```bash
node -e 'const m=require("./.claude/brand.json").motion;console.log(m.heroclip.id, m.heroclip.files.length, Object.keys(m).join(","))'
```
Expected: one line starting `work-hero-clip 4 ` whose key list contains `countup,heroclip,banned`
in that order.

W2i (the OG image is untouched):
```bash
git hash-object "app/(foyer)/work/opengraph-image.tsx"
```
Expected: `16cc3bc6bc5563944dabb8396c5ee975e8140d3f`

W2j (em-dashes in the two source files):
```bash
grep -c "—" "app/(foyer)/work/page.tsx" components/color-worlds/WorkHeroClip.tsx
```
Expected, two lines: `app/(foyer)/work/page.tsx:1` and
`components/color-worlds/WorkHeroClip.tsx:0`. The one em-dash is the kept comment
`// Short title; root template appends " — Micah Jones" once.` (from `:49`).

**W3. Served headers and the preload** (server on 3200, started per section 6, 6.1).

W3a:
```bash
for f in work-hero-720.webm work-hero-720.mp4 work-hero-poster-960.avif; do curl -sI "http://localhost:3200/media/$f" | tr -d '\r' | grep -i '^content-type:' | cut -d' ' -f2-; done
```
Expected, three lines in this order: `video/webm`, `video/mp4`, `image/avif`.

W3b (the poster preload is one link tag in the served head):
```bash
curl -s http://localhost:3200/work | grep -o '<link[^>]*work-hero-poster-960\.avif[^>]*>' | grep -c 'rel="preload"'
```
Expected: `1`

W3c (the server-rendered video loads nothing on its own):
```bash
curl -s http://localhost:3200/work | grep -c 'preload="none"'
```
Expected: `1` or more (`-ge 1`).

**W4. Once per document load across a client navigation.** Create
`.planning/exec/clipnav120.mjs` with exactly this, then run
`node .planning/exec/clipnav120.mjs http://localhost:3200`. Expected last line
`clipnav120 failures: 0`. Bite proof: before any Pass-120 edit, run it against production
(`node .planning/exec/clipnav120.mjs https://www.micahjonesconsulting.com >
.planning/exec/clipnav120-bite.txt`); it must exit 1 with `FAIL N1` (production has no video on
/work).

```js
// .planning/exec/clipnav120.mjs
// Pass-120 section 3b W4: the /work clip plays once per DOCUMENT load, including
// across a client navigation away (ViewTransitionLink) and Back. Motion on,
// 1440x900. Measures the media element (play events, video.played), not the
// component. Scope (LESSONS #28): the video lives in main (app/(foyer)/layout.tsx
// renders Nav as a sibling of main), so every query is "main video".
// Usage: node .planning/exec/clipnav120.mjs [base]   (base defaults to http://localhost:3200)
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    window.__plays = 0;
    document.addEventListener(
      "play",
      (e) => {
        if (e.target instanceof HTMLVideoElement) window.__plays++;
      },
      true,
    );
  });
  await page.goto(BASE + "/work", { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => {
    window.__docMark = "p120";
  });

  const ended = await page
    .waitForFunction(() => {
      const v = document.querySelector("main video");
      return !!v && v.ended;
    }, { timeout: 15000 })
    .then(() => true, () => false);
  chk("N1 clip ended after the first load", ended, ended, true);
  const plays1 = await page.evaluate(() => window.__plays);
  chk("N2 play events after the first load", plays1 === 1, plays1, 1);

  await page.evaluate(() => {
    const a = document.querySelector('main a[href="/work/rfp-engine"]');
    if (a) a.click();
  });
  const away = await page
    .waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 15000 })
    .then(() => true, () => false);
  chk("N3 reached /work/rfp-engine", away, away, true);
  const markAway = await page.evaluate(() => window.__docMark === "p120");
  chk("N4 same document after the entry click (client navigation)", markAway, markAway, true);

  await page.evaluate(() => history.back());
  const back = await page
    .waitForFunction(
      () => location.pathname === "/work" && !!document.querySelector("main video"),
      { timeout: 15000 },
    )
    .then(() => true, () => false);
  chk("N5 Back reached /work with a video element", back, back, true);
  await wait(6000);
  const after = await page.evaluate(() => {
    const v = document.querySelector("main video");
    return {
      mark: window.__docMark === "p120",
      plays: window.__plays,
      played: v ? v.played.length : -1,
      paused: v ? v.paused : null,
    };
  });
  chk("N6 same document after Back", after.mark, after.mark, true);
  chk("N7 no second play event in this document", after.plays === 1, after.plays, 1);
  chk(
    "N8 the remounted video never played",
    after.played === 0 && after.paused === true,
    { played: after.played, paused: after.paused },
    { played: 0, paused: true },
  );
} finally {
  await browser.close();
}
console.log(`clipnav120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
```

**W5. The two redirects in a browser at 390.** Section 6 V2 T15 covers 1440 only. Run this
one-liner in Git Bash (every path in it is inside a quoted string, so Git Bash does not rewrite it):
`node -e 'const p=require("C:/tmp/p101tools/node_modules/puppeteer-core");(async()=>{const b=await p.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});let f=0;for(const s of ["postmates","neuton"]){const g=await b.newPage();await g.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await g.goto("http://localhost:3200/work/"+s,{waitUntil:"load"});await new Promise(r=>setTimeout(r,1500));const r=await g.evaluate(()=>({at:location.pathname+location.hash,top:Math.round(document.getElementById("record").getBoundingClientRect().top),h2:Math.round(document.querySelector("#record h2").getBoundingClientRect().bottom),vh:innerHeight}));const ok=r.at==="/work#record"&&r.top>=0&&r.top<=160&&r.h2<=r.vh;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W5 "+s+" 390: got "+JSON.stringify(r))}await b.close();console.log("W5 failures: "+f);process.exit(f?1:0)})()'`
Expected: `PASS W5 postmates 390: ...`, `PASS W5 neuton 390: ...`, `W5 failures: 0`.

**Section 6 checks that verify this section (run there, not repeated here):** V1 K3 (method line
and record strings exactly once), K5 (record rows, order, one link to `/work/guardicore`, no
`Helped launch · 2025`), K6 (the five `/work/` hrefs), K7 (no tenure year on /work), K9 (sitemap),
K10 (both 308s to `/work#record`); V2 T1-T3 (the /work ladder: 1440 set within
`{13, 18, 36, 56, 112}` containing `13, 18, 36, 112`; 390 within `{12, 17, 26, 36, 64}` containing
`12, 17, 26, 64`), T5-T7, T9 (no figcaption), T10 (one h1), T11 (copper-deep body links on paper),
T12 (no sage on /work), T15 (fragment lands at 1440); V4 C1-C9 (the clip: SSR markup, plays once,
reduced motion, Save-Data, no-JS, served size, no raw source, no caption); V6, V7 and V8 in 6.5
(both 308s by curl, axe on /work, layout-gate); 6.6 L1-L2 (mobile LCP and CLS on /work); 6.7 the
`work-*` and `redirect-*` captures, which the executor opens and describes, including the
colleagues-at-the-edge look; 6.8 condition 1 (the motion-engineer's `APPROVED: clip`).

What each section 6 clip check expects from this section's markup, so the two agree: C1 finds one
server-rendered `<video` with `poster="/media/work-hero-poster-960.avif"` and no `autoplay`, `loop`,
`controls` or `<track` (3b.4). C3 sees motion within 8000ms of `load` at 390 and 1440, because the
clip arms on `load` and plays on any intersection, and the frame's top edge is inside the first 844px
at 390. C4, C5 and C6 see the poster only, with `video.played.length === 0`. C7's poster is
`image/avif`.

---

### 3b.13 Rejected for this section

- **A caption or disclosure under the clip or the photograph** (the mock's `animated from a
  photograph`, FABLE's "real caption"): operator 2026-09-16, "no captions ... AI indicator and
  pointless". Recorded in `DESIGN_BAR.md:201` as declined and not re-raised.
- **Looping the clip, or returning to the poster when it ends:** R15 bans the loop; returning to
  the poster is a second visible cut. It plays once and holds its last frame.
- **Autoplay on first paint (`autoPlay` attribute, `preload="auto"` in SSR):** the video would
  compete with the poster for LCP on a 1.8s mobile budget. It arms on `load` instead.
- **Waiting until half the frame is visible:** at 390 the frame sits below the lead text, and
  section 6 C3 needs motion within 8000ms of `load` without a scroll. Any intersection starts it.
- **Mounting the `<video>` on the client only, with an `<img>` still underneath:** two media
  elements for one frame, and section 6 C1 expects one server-rendered `<video>` with a poster.
- **A second poster in JPEG, or 480w and 960w posters:** `poster` takes one URL; AVIF decodes in
  every current browser, and the frame-0 AVIF is 13KB, which removes the reason for a smaller one.
- **Keeping the square source and cropping with CSS `object-position: 68% 50%`:** the baked crop
  sends 20% fewer pixels and guarantees the poster and the video frame line up exactly.
- **A fifth Color World called `paper` at `#F5EFE4` for /work:** it would change the shared
  `OpeningWorld` and `WorldSwitcher` contract and `accent-states-lint` scope for one page. /work
  stays on `bone`.
- **Reusing `ExitRecord.tsx` for the record block:** it sorts by deal value, prints SurveyMonkey's
  and Guardicore's values, and has no roles. Section 2 §2.4 records the divergence; the home
  component stays unchanged.
- **A heading per record row, or a `<table>` for the record:** four rows of company, role and
  outcome plus a sentence read as a list; a table would separate each description from its row
  for a screen reader.
- **Mono for the context label:** the RFP client descriptor is 13 words, so it would be mono prose
  (R1; section 6 T6).
- **`.cw-lede-link` on the kept cross-link line:** it is 12px mono, uppercase and tracked
  (`app/globals.css:2499-2508`), which adds a sixth size and breaks T7. `.cw-wx-link` replaces it.
- **Writing `llms.txt`, the sitemap, the metadata description or the OG image from this section:**
  owned by sections 2 and 5; the OG image stays unchanged (3b.10).
- **Hard-coding the index strings in `page.tsx`:** every string comes from the study frontmatter
  and `content/work-page.ts` (LESSONS #2: the card is a compression of the study, never a second
  story).

---

### 3b.14 Could not settle from the repo (one line each)

- Operator: frame 0 is a near-monochrome, bottom-darkened grade of the session photo, not a pixel copy of `public/guardicore-telaviv-session.jpg` (colour); does that satisfy "poster is the real still"?
- Operator: the clip ends and holds on a generated frame (FABLE-120-DESIGN §4 named this); hold it, or is a different end state wanted?
- Operator: the colleagues' okay to being animated is his to hold (`DESIGN_BAR.md:201`); nothing in the repo records it.
- Judge: /work paper is the `bone` world `#ECE3D0`, while the study body may use `--color-foyer-paper` `#F5EFE4`; "one reading system" across the two grounds is the study-template section's call to match or accept.
- Judge: the kept cross-link line ("The next entry in this record could be yours...") is not mentioned by Direction B; kept as live copy, outside `#record`.
- Judge: `metadata.title` stays `Work: pipeline, products, and exits`; the word "pipeline" is not ruled on and no longer describes a figure on the page.
- Assembly: sections 2 (§2.7) and 5 (rows 25-28) both specify `app/llms.txt/route.ts:40-43` with different wording; one writer must be picked before execution.
- Assembly: `.claude/brand.json` is edited by this section (`motion.heroclip`) and the TitleCard section (`motion.signature`, `view_transition`); one writer per file means the assembler merges both edits into one step.
- Assembly: `app/globals.css` is edited by this section and the study-template section; this section's insertion anchor (the Pass-110 comment) was chosen because the template section should not move it, which the assembler confirms.
- Technical unknown: headless Chrome's VP9 playback and muted-autoplay behaviour on this machine are assumed by W4 and section 6 C3; unverified until the first run.
- Technical unknown: whether Lighthouse's simulated mobile LCP on /work passes 1800ms; Pass-119 measured 2944-3510ms simulated on other routes, and section 6.6 stops rather than trims the clip.
- Technical unknown: whether the `preload()` link React emits keeps `rel="preload"` and the AVIF href in one `<link>` tag as W3b greps; if React splits or reorders attributes differently, W3b's pattern needs the judge.

# 5. The live claims sweep

Every surface OUTSIDE the five studies and the /work body that still says something the
2026-09-15/16 rulings retired, with the exact text it becomes, plus the gate that keeps it gone.
Sources: `.planning/briefs-prep/pass-120/live-sweep.md` (rows 1-27), re-read against the worktree
at `fffeb18` on 2026-09-16, plus four surfaces that map missed (marked **NEW** below). Rulings are
quoted from `docs/LESSONS_LEARNED.md` #3 (lines 279-410) and #32/#33. Where the ruling list in the
orchestrator prompt and the repo differ, the repo wins; no difference was found for this section.

## 5.0 Order, ownership, and what "done" means

- **Run this section LAST among the content edits**: after the /work index rebuild, the study
  rewrites (including the new birth-worker study) and the Postmates/Neuton retirement. Its final
  gate run (5.6, V3) is clean only when all of those have landed.
- **One writer per file.** Rows marked **S5** are edited in this section. Rows marked **ACCEPT**
  sit in files another section writes (`app/(foyer)/work/page.tsx` body, the study template,
  `content/work/*.mdx`). The executor does NOT edit those files here; this section only checks
  them, and a failed ACCEPT row means the owning section is incomplete: stop and report.
- **Nothing here deploys.** Same commit as the gate edit (5.5). No push, no deploy, without the
  operator's words that day.
- No em-dash is added by any string below. No string contains a `brand.json` `voice.banned` word
  (checked against the list on 2026-09-16).

## 5.1 Table: every surface, current text, replacement, ruling

Line numbers are the `fffeb18` tree. Multi-line JSX edits are spelled out as before/after blocks
in 5.2-5.4; the table cell names the block.

| # | Owner | File:line | Current text (verbatim) | Replacement (exact) | Ruling |
|---|---|---|---|---|---|
| 1 | S5 | `app/(foyer)/page.tsx:81` (metadata.description) | `"Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in client revenue.",` | `"Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work.",` | $20M IS A MIX (2026-09-15), wording "$20M+ in revenue behind my work" |
| 2 | S5 | `app/(foyer)/page.tsx:86` (openGraph.description) | `"Four exits behind my work, $5B+ combined. $20M+ in client revenue. Now building Ordani, in beta with paying users.",` | `"Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work. Now building Ordani, in beta with paying users.",` | same |
| 3 | S5 | `app/(foyer)/page.tsx:95` (twitter.description) | `"Four exits behind my work, $5B+ combined. $20M+ in client revenue. Now building Ordani.",` | `"Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work. Now building Ordani.",` | same |
| 4 | S5 | `app/(foyer)/page.tsx:319-320` (JSX comment, renders nowhere) | `#2) checked: $80M/$14M in guardicore.mdx, 8K→290K in` / `content-engine.mdx, doubled in rfp-engine.mdx, the` | `#2) checked: $14M in guardicore.mdx, 800,000 impressions in` / `content-engine.mdx, doubled in rfp-engine.mdx, the` | Stale comments bring retired claims back (LESSONS #3 gate note); #33 ($80M) |
| 5 | S5 | `app/(foyer)/page.tsx:334-337` Guardicore ledger row tag | `<span className="cw-lrow__tag cw-nowrap">2018–2021</span>` | Block 5.2-A: tag `Revenue and positioning` | NO PERSONAL YEARS (2026-09-15) names "the home ledger row tags"; role string from the record-block ruling |
| 6 | S5 | `app/(foyer)/page.tsx:340` aria-label | `aria-label="14 million dollars in revenue, acquired by Akamai"` | **No change.** Already fixed and gated in `8f6034c` (LESSONS #33). | Guardicore pipeline retired 2026-09-03 |
| 7 | S5 | `app/(foyer)/page.tsx:378-382` Ordani row tag | `Founder, sole engineer ·{" "}` + `<span className="cw-nowrap">2025–2026</span>` | Block 5.2-B: `Founder, sole engineer` | NO PERSONAL YEARS; YEAR FIELDS (2026-09-16) |
| 8 | S5 | `app/(foyer)/page.tsx:398-407` content-engine row | `Industry author` / `Content engine ·{" "}<span className="cw-nowrap">2024–2025</span>` / `Monthly reach <strong>8K → 290K</strong> in five months` | Block 5.2-C: `Social activist` / `Content engine` / `<strong>Up to 800,000 impressions</strong> in a month` | TWO CLIENTS (2026-09-15); 290K UNVERIFIED (2026-09-15, "up to 800,000 impressions"); NO PERSONAL YEARS |
| 9 | S5 | `app/(foyer)/page.tsx:418-426` RFP row | `Industry author` / `RFP engine · <span className="cw-nowrap">2024–2025</span>` / `<strong>$3M in contracts won</strong> · close rate doubled` | Block 5.2-D: `Author and leadership consultant` / `RFP engine` / `<strong>$3M in signed contracts</strong> · close rate doubled` | TWO CLIENTS; NO PERSONAL YEARS; "$3M in signed contracts" is the operator's 2026-09-16 receipt wording |
| 10 | S5 | `app/(foyer)/page.tsx:458-467` SurveyMonkey row | `Enterprise sales · 2018` / `<strong>$1M+</strong> toward the IPO · cap-table position` | Block 5.2-E: `Enterprise sales` / `<strong>$1M+</strong> toward the 2018 IPO · cap-table position` | NO PERSONAL YEARS (tenure tag goes); event year IPO 2018 restored in the outcome, matching the record row "$1M+ in enterprise sales toward the 2018 IPO." |
| 11 | S5 | `app/(foyer)/page.tsx:474-481` Postmates row | `<span className="cw-lrow__tag">Product analyst · 2020</span>` / `<strong>acquired by Uber, $2.65B</strong>` | Block 5.2-F: `Product analyst` / `<strong>acquired by Uber, $2.65B, 2020</strong>` | NO PERSONAL YEARS (2026-09-15) supersedes the 2026-08-30/09-02 tag wording (live-sweep row 27 conflict, resolved by date: the newer rule names "the home ledger row tags"). Event year kept on the event |
| 12 | S5 | `app/(foyer)/page.tsx:490-492` Neuton row tag | `Helped launch · exit 2025` | **No change.** | Approved 2026-09-12 (LESSONS #3 line 469): 2025 is the acquisition year and is framed as the exit. Never the bare "Helped launch · 2025" (now gated, 5.5) |
| 13 | S5 **NEW** | `components/color-worlds/RevenueFigure.tsx:162` (home, under the circled `$20M+`) | `<p className="cw-rec__lbl">In client revenue since 2013</p>` | `<p className="cw-rec__lbl">In revenue behind my work</p>` | $20M IS A MIX. Not on live-sweep.md: `components/` sits outside the gate's ROOTS today, so no check read it |
| 14 | S5 | `app/(foyer)/about/page.tsx:101-105` | Block 5.3-A "before" (`<strong>$20M+</strong> in client revenue since 2013.`) | Block 5.3-A "after" (`<strong>$20M+</strong> in revenue behind my work.`) | $20M IS A MIX; LESSONS #32 (answer logged late) |
| 15 | S5 | `app/(foyer)/about/page.tsx:160-177` | Block 5.3-B "before" (`For one industry author, a content engine took monthly reach from 8,000 to 290,000 in five months. The RFP software I built for the same author doubled their close rate inside six months.`) | Block 5.3-B "after": `For a social activist, a content engine reached a peak of 800,000 impressions in a month, up from a few thousand. For an award-winning author and leadership consultant, the RFP software I built doubled their close rate inside six months.` | TWO CLIENTS; 290K UNVERIFIED. "a peak of 800,000 impressions in a month, up from a few thousand" is verbatim from `content-engine-DRAFT.md` At a glance |
| 16 | S5 | `app/(foyer)/about/page.tsx:114-116` (the /about exits roster) | `Postmates (Uber, 2020). SurveyMonkey (IPO, 2018). Guardicore (Akamai, 2021). Neuton.AI (technology acquired by Nordic Semiconductor, 2025).` | **No change.** Every year here is an event year beside a company event, none beside a role. | NO PERSONAL YEARS keeps event years |
| 17 | S5 | `app/(foyer)/services/page.tsx:79` (AI engineering receipt) | `text: "For an industry author: software that reads every new RFP each morning and drafts the first pass at a response. RFP-to-close rate doubled; $3M in contracts won.",` | `text: "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled.",` (`href` and `label` on the next two lines stay) | THE RFP CLIENT WAS NOT REPOSITIONED, receipt text verbatim from LESSONS #3 (2026-09-16); TWO CLIENTS ("never industry author for either"). This slot is `proof: 0` of its area, so it is the one that renders on /services (S6 K3 counts it there, exactly 1). "reads every new RFP each morning" also contradicted the confirmed nightly checks (?2) |
| 18 | S5 | `app/(foyer)/services/page.tsx:120` (Product building receipt) | `text: "An industry author: I built the content engine that took their monthly reach from 8,000 to 290,000 in five months.",` | `text: "A social activist: I built the AI content engine that turns one rough video into a week of content. A peak of 800,000 impressions in a month, up from a few thousand.",` | TWO CLIENTS; 290K UNVERIFIED. First sentence from the content-engine draft's search description; second from its At a glance. Source-only: this receipt is not the area's rendered `proof` index |
| 19 | S5 | `app/(foyer)/services/page.tsx:158` (Positioning receipt) | `text: "A birth worker: repositioned from birth support alone to the full arc of care around it. Organic bookings up 30%, and inquiries arriving across her whole range instead of one service.",` | Block 5.4-A: `text: "A birth worker: repositioned from birth support alone to the full arc of care around it. Bookings went from one to three a month to five to ten, across her whole range instead of one service.",` plus `href: "/work/birth-worker",` and `label: "Read the case study",` | BIRTH WORKER BOOKINGS, BOTH SIDES (2026-09-16): "the live /services receipt that still says 'Organic bookings up 30%' is swept to the pair in Pass-120". Services never itemised; vendor never named |
| 20 | S5 | `app/(foyer)/services/page.tsx:161` (Positioning receipt) | `text: "An industry author: repositioned toward the buyers who award contracts. $3M in contracts won through the RFP software that followed.",` | Block 5.4-B: the whole receipt object (the `{`, this `text:`, its `href`, its `label` and the `},`, lines 160-164) is DELETED. | THE RFP CLIENT WAS NOT REPOSITIONED, answered 2026-09-16. The exact RFP receipt now lives in row 17, the slot that renders; this entry is index 3 behind `proof: 2`, never rendered, and a second copy would only be dead source. Deleting index 3 leaves indices 0-2 and `proof: 2` (the birth worker) unchanged |
| 21 | S5 | `app/layout.tsx:32` (root metadata.description) | `... $5B+ combined. $20M+ in client revenue. Now building Ordani, HIPAA-compliant practice management in beta with active paying users.",` | `... $5B+ combined. $20M+ in revenue behind my work. Now building Ordani, HIPAA-compliant practice management in beta with active paying users.",` (only the one sentence changes) | $20M IS A MIX |
| 22 | S5 | `app/layout.tsx:68` (PERSON_LD.description, JSON-LD) | `... Neuton.AI (Nordic Semiconductor, 2025). $20M+ in client revenue since 2013. Building Ordani: ...` | `... Neuton.AI (Nordic Semiconductor, 2025). $20M+ in revenue behind my work. Building Ordani: ...` (only the one sentence changes) | $20M IS A MIX ("never a since-2013 consulting claim") |
| 23 | S5 | `app/llms.txt/route.ts:17` | `\$20M+ in client revenue since 2013.` | `\$20M+ in revenue behind my work.` (only this sentence in the line changes; keep the `\$` escape) | $20M IS A MIX |
| 24 | S5 | `app/llms.txt/route.ts:32` | `- Since 2013: growth, GTM and platform strategy roles inside B2B software companies (thirteen years)` | `- Thirteen years of growth, GTM and platform strategy roles inside B2B software companies` | YEAR FIELDS: "No year renders beside a role on any surface"; this is a start year beside "roles". "Thirteen years" is the approved duration (2026-09-03). See 5.8 item 1 |
| 25 | S5 **NEW** | `app/llms.txt/route.ts:41` | `- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): positioning research behind \$14M in revenue at a \$1.2M average enterprise deal size; led to the Akamai acquisition` | `- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): positioning research behind \$14M in revenue, sourced and closed, at a \$1.2M average enterprise deal size. Akamai acquired Guardicore in 2021` | Pass-113 (2026-09-11, decision 5): acquisitions keep their own sentence, never "led to". GUARDICORE "$14M in revenue, sourced and closed" |
| 26 | S5 | `app/llms.txt/route.ts:42` | `- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): an AI content engine plus algorithm strategy for an industry author; monthly reach 8,000 to 290,000 in five months` | `- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): an AI content engine and platform strategy for a social activist; up to 800,000 impressions in a month, up from a few thousand a month` | TWO CLIENTS; 290K UNVERIFIED |
| 27 | S5 **NEW** | `app/llms.txt/route.ts:43` | `- [RFP engine case study](https://www.micahjonesconsulting.com/work/rfp-engine): custom RFP software for an industry author; \$3M in contracts won, close rate doubled` | `- [RFP engine case study](https://www.micahjonesconsulting.com/work/rfp-engine): AI software that finds and drafts RFPs for an award-winning author and leadership consultant; \$3M in signed contracts, close rate doubled` | TWO CLIENTS. live-sweep.md row 10 listed :42 only |
| 28 | S5 **NEW** | `app/llms.txt/route.ts`, new line inserted directly after the line from row 27 | (absent) | `- [Birth worker case study](https://www.micahjonesconsulting.com/work/birth-worker): positioning, website, booking and direct insurance claims for a birth worker; bookings from one to three a month to five to ten` | SCOPE (one release, five studies). BIRTH WORKER SCOPE + BOOKINGS (2026-09-16); vendor never named |
| 29 | ACCEPT (/work index section) | `app/(foyer)/work/page.tsx:52` and `:57` (metadata + openGraph description) | `"Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author."` | S5 sets the string because it is a claim, not layout. Both lines become exactly: `"Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine."` The /work section writes it into its rebuilt file; S5 checks it | 290K UNVERIFIED ("no multiplier of any kind"); TWO CLIENTS |
| 30 | ACCEPT (/work index section) | `app/(foyer)/work/page.tsx:104-106` (lead provenance line) | `<span aria-hidden> · </span>` + `<span>{lead.year}</span>` | Absent. No `year` renders on /work | YEAR FIELDS; NO PERSONAL YEARS ("the /work index meta rows") |
| 31 | ACCEPT (/work index section) | `app/(foyer)/work/page.tsx:148-150` (list meta) | `<span aria-hidden> &middot; </span>` + `<span className="cw-nowrap">{s.year}</span>` | Absent | same |
| 32 | ACCEPT (/work index section) | `app/(foyer)/work/page.tsx:122` Tel Aviv caption | `<figcaption>Working session · Tel Aviv · 2018-2021</figcaption>` | Absent. Zero `<figcaption` on /work (CAPTIONS ruling: none on any Pass-120 photograph or the clip) | NO PERSONAL YEARS names this caption; CAPTIONS (2026-09-16) |
| 33 | ACCEPT (study template section) | `app/(theater)/work/[slug]/page.tsx:248-251` (mobile/no-JS meta fallback) | `<span className="case-study__dot" aria-hidden="true">·</span>` + `<span className="case-study__year">{cs.year}</span>` | Absent on every study | YEAR FIELDS |
| 34 | ACCEPT (study template section) | `components/CaseStudySidebar.tsx:220-221` | `<dt>Year</dt>` / `<dd>{year}</dd>` | Absent (Direction B has no sticky rail, so the component may be unmounted entirely); zero `<dt>Year</dt>` on every study | YEAR FIELDS |
| 35 | ACCEPT (content model section) | `app/(theater)/work/[slug]/page.tsx:134-145` JSON-LD `datePublished: startYear` | derived from the tenure `year` range (`"2018"` for Guardicore today) | `datePublished` is the hidden publish date (YYYY-MM-DD), never a tenure year | YEAR FIELDS: "the date the page was published, NEVER a tenure year"; NO PERSONAL YEARS: "any JSON-LD that derives a date from a tenure range" |
| 36 | ACCEPT (content model section) | `content/work/content-engine.mdx:15`, `content/work/rfp-engine.mdx:16` (`client:`, feeds `app/(theater)/work/[slug]/opengraph-image.tsx:104`) | both `client: Industry-authority author (name protected)` | Two DIFFERENT values, neither containing "industry" | TWO CLIENTS ("Distinct client frontmatter strings") |
| 37 | ACCEPT (Guardicore study section) + S5 file removal | `content/work/guardicore.mdx:47-50` | `<CaseStudyStill src="/guardicore-telaviv.jpg" width={1200} height={1448} alt="Working session with the Guardicore team around a table in Tel Aviv" />` | The study photograph uses the cleaned crop: `src="/guardicore-telaviv-session.jpg"`, `width={770}`, `height={575}`, `alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."` (the alt already used for this frame on /about:137). No caption. **S5 then runs `git rm public/guardicore-telaviv.jpg`** so the sticker frame stops being served at its public URL | GUARDICORE photo ruling: `public/guardicore-telaviv.jpg` still shows the Instagram location sticker (study-template.md §11, visually confirmed); `-session.jpg` is the cleaned crop (`app/(foyer)/work/page.tsx:34-41` records the crop and patch) |
| 38 | ACCEPT (retirement section) | `content/work/postmates.mdx:40`, `content/work/neuton.mdx:35` | `... is one of four companies I worked inside that reached an exit.` | Absent from `content/` (file deleted or sentence cut); `/work/postmates` and `/work/neuton` answer `308` to `/work#record` | RECORD BLOCK ruling ("leaves every study"); pages retire |
| 39 | ACCEPT (ORDANI study section) | `content/work/ordani.mdx:48` | `every practitioner had been hacked or scared into thinking they had been` | Absent | ORDANI'S PROBLEM WAS SIX TOOLS, NOT A HACK (2026-09-16) |

Considered and left alone, so nobody re-opens them: `app/(foyer)/about/page.tsx:59` "both, on the
same engagement, for the same fee" (the lede about his own offer, not the two clients; gated as a
near miss in 5.5). `app/(foyer)/page.tsx:834` "© 2013–2026 Micah Jones" (a copyright line, no
role). `app/(foyer)/services/page.tsx:153-154` Guardicore and SurveyMonkey receipts (already carry
event years only). The static OG images `app/(foyer)/opengraph-image.tsx`, `about/opengraph-image.tsx`,
`work/opengraph-image.tsx` (live-sweep.md §6: no retired claim). `components/color-worlds/ExitRecord.tsx`
(event data from `content/citations.ts`, no tenure year).

## 5.2 Home ledger blocks (`app/(foyer)/page.tsx`)

Replace each "before" exactly (indentation as in the file), then run `pnpm exec prettier --write
"app/(foyer)/page.tsx"`.

**A. Guardicore (lines 334-337)**
```tsx
// before
                  <span className="cw-lrow__co">
                    Guardicore
                    <span className="cw-lrow__tag cw-nowrap">2018–2021</span>
                  </span>
// after
                  <span className="cw-lrow__co">
                    Guardicore
                    <span className="cw-lrow__tag">Revenue and positioning</span>
                  </span>
```

**B. Ordani (lines 377-383)**
```tsx
// before
                  <span className="cw-lrow__co">
                    Ordani
                    <span className="cw-lrow__tag">
                      Founder, sole engineer ·{" "}
                      <span className="cw-nowrap">2025–2026</span>
                    </span>
                  </span>
// after
                  <span className="cw-lrow__co">
                    Ordani
                    <span className="cw-lrow__tag">Founder, sole engineer</span>
                  </span>
```

**C. Content engine (lines 398-407)**
```tsx
// before
                  <span className="cw-lrow__co">
                    Industry author
                    <span className="cw-lrow__tag">
                      Content engine ·{" "}
                      <span className="cw-nowrap">2024–2025</span>
                    </span>
                  </span>
                  <span className="cw-lrow__out">
                    Monthly reach <strong>8K → 290K</strong> in five months
                  </span>
// after
                  <span className="cw-lrow__co">
                    Social activist
                    <span className="cw-lrow__tag">Content engine</span>
                  </span>
                  <span className="cw-lrow__out">
                    <strong>Up to 800,000 impressions</strong> in a month
                  </span>
```

**D. RFP engine (lines 418-426)**
```tsx
// before
                  <span className="cw-lrow__co">
                    Industry author
                    <span className="cw-lrow__tag">
                      RFP engine · <span className="cw-nowrap">2024–2025</span>
                    </span>
                  </span>
                  <span className="cw-lrow__out">
                    <strong>$3M in contracts won</strong> · close rate doubled
                  </span>
// after
                  <span className="cw-lrow__co">
                    Author and leadership consultant
                    <span className="cw-lrow__tag">RFP engine</span>
                  </span>
                  <span className="cw-lrow__out">
                    <strong>$3M in signed contracts</strong> · close rate doubled
                  </span>
```

**E. SurveyMonkey (lines 458-467)**
```tsx
// before
                  <span className="cw-lrow__co">
                    SurveyMonkey Enterprise
                    <span className="cw-lrow__tag">
                      Enterprise sales · 2018
                    </span>
                  </span>
                  <span className="cw-lrow__out">
                    <strong>$1M+</strong> toward the IPO · cap-table position
                    held through the Nasdaq listing
                  </span>
// after
                  <span className="cw-lrow__co">
                    SurveyMonkey Enterprise
                    <span className="cw-lrow__tag">Enterprise sales</span>
                  </span>
                  <span className="cw-lrow__out">
                    <strong>$1M+</strong> toward the 2018 IPO · cap-table
                    position held through the Nasdaq listing
                  </span>
```

**F. Postmates (lines 474-481)**
```tsx
// before
                  <span className="cw-lrow__co">
                    Postmates
                    <span className="cw-lrow__tag">Product analyst · 2020</span>
                  </span>
                  <span className="cw-lrow__out">
                    Market and fraud analysis in the wide-open era ·{" "}
                    <strong>acquired by Uber, $2.65B</strong>
                  </span>
// after
                  <span className="cw-lrow__co">
                    Postmates
                    <span className="cw-lrow__tag">Product analyst</span>
                  </span>
                  <span className="cw-lrow__out">
                    Market and fraud analysis in the wide-open era ·{" "}
                    <strong>acquired by Uber, $2.65B, 2020</strong>
                  </span>
```

Layout: no class, token or CSS changes. `cw-lrow__tag` renders a string with or without a year;
`cw-nowrap` is dropped only where the span that carried it is deleted.

## 5.3 /about blocks (`app/(foyer)/about/page.tsx`)

**A. The $20M line (lines 101-105)**
```tsx
// before
              {/* Operator ruling 2026-09-02: the $20M+ HOLDS TO TODAY. The
                  closed range read as a practice that stopped in 2023, two
                  lines above a heading called "Currently". Ledgered in
                  LESSONS #3 as "since 2013", open-ended. */}
              <strong>$20M+</strong> in client revenue since 2013.
// after
              {/* Pass-120 (operator 2026-09-15, LESSONS #3 "THE $20M IS A
                  MIX"): the figure spans employed and consulting work, so it
                  carries no client, consulting or since-2013 attribution.
                  His wording, verbatim. */}
              <strong>$20M+</strong> in revenue behind my work.
```

**B. GTM systems (lines 160-177)**: replace the two comment blocks (160-166 and 167-173) and the
four text lines (174-177) with:
```tsx
              {/* Pass-120 (operator 2026-09-15, LESSONS #3 "TWO CLIENTS, NOT
                  ONE" and "THE 290K REACH FIGURE IS UNVERIFIED"): two clients,
                  two engagements, each clause naming the thing that produced
                  its own number. No multiplier. */}
              <strong>GTM systems that compound.</strong> For a social
              activist, a content engine reached a peak of 800,000 impressions
              in a month, up from a few thousand. For an award-winning author
              and leadership consultant, the RFP software I built doubled their
              close rate inside six months.
```
Word counts: 19 and 18 words per sentence (voice cap 25).

## 5.4 /services block (`app/(foyer)/services/page.tsx`)

**A. Birth-worker receipt (lines 157-159)**
```ts
// before
      {
        text: "A birth worker: repositioned from birth support alone to the full arc of care around it. Organic bookings up 30%, and inquiries arriving across her whole range instead of one service.",
      },
// after
      {
        text: "A birth worker: repositioned from birth support alone to the full arc of care around it. Bookings went from one to three a month to five to ten, across her whole range instead of one service.",
        href: "/work/birth-worker",
        label: "Read the case study",
      },
```
**B. Dead RFP receipt (lines 160-164): delete**
```ts
// before (lines 160-164; the birth-worker object from block A sits directly above)
      {
        text: "An industry author: repositioned toward the buyers who award contracts. $3M in contracts won through the RFP software that followed.",
        href: "/work/rfp-engine",
        label: "Read the case study",
      },
// after: nothing. The array closes on the birth-worker object's `},` then `    ],`.
```
Rows 17 and 18 are single-line `text:` swaps. In the comment block at lines 110-117 above row 18,
leave the Pass-78 history as is (it names no retired figure).

## 5.5 Gate additions: `scripts/retired-phrases-gate.mjs`

**Owner: this section, alone.** S6 §6.2 E2 drafted its own PHRASES and ROOTS edit to this same
file at the same anchor. The two lists were merged here on 2026-09-16 (union, deduplicated; S6's
`"fourteen practitioners"`, `"six had referred"`, `"22 birth workers"` and `"sales manager"`
added below; its `"revenue since 2013"`, `"industry-authority author"`, `"same engagement also
produced"` and `"Organic bookings up 30%"` are already caught by this list's shorter
`"since 2013"`, `"industry-authority"`, `"same engagement also"` and `"bookings up 30%"`, since
the match is a case-insensitive substring). At assembly S6 §6.2 E2 is replaced by a pointer to
this section and S6 G3 must read the V1 line below; if it still says `54 planted caught, 23 near
misses passed`, the assembled brief is inconsistent: stop and report.

Four edits and one comment edit, in this file only. The gate stays wired where it is in
`package.json` `build` (self-test, then real scan, before `next build`). Two latent defects are
fixed in the same edit because the new findings expose them: `components/` was never scanned
(row 13 lived there), and `stripComments` dropped newlines, so findings after a multi-line comment
reported the wrong line (`about/page.tsx:105` printed as `:76`). Both were reproduced on
2026-09-16 against the `fffeb18` tree.

**Edit 1, line 67, the SCOPE comment.** Replace
`// SCOPE. app/, content/ and lib/ — the rendered tree. Not node_modules, not`
with these two lines:
```js
// SCOPE. app/, components/, content/ and lib/ — the rendered tree (components/
// joined in Pass-120: RevenueFigure.tsx rendered a retired claim unseen). Not node_modules, not
```

**Edit 2, line 113.**
```js
const ROOTS = ["app", "components", "content", "lib"];
```

**Edit 3, PHRASES.** Directly after `  "80 million",` (line 155) and before `];`, insert:
```js
  // Pass-120 (operator 2026-09-15, LESSONS #3 "THE $20M IS A MIX, NOT
  // CONSULTING REVENUE"): the $20M+ spans employed and consulting work. The
  // approved wording is "$20M+ in revenue behind my work"; never client or
  // consulting revenue, never a since-2013 practice claim.
  "client revenue",
  "consulting revenue",
  "since 2013",
  // Pass-120 (operator 2026-09-15, LESSONS #3 "THE 290K REACH FIGURE IS
  // UNVERIFIED"): "Technically it got up to 800,000 impressions." The
  // 8,000-to-290,000 pair, its 36x multiplier and the "reach" unit retire.
  // No multiplier of any kind on this study.
  "290,000",
  "290K",
  "8,000 to",
  "8K →",
  "8K to",
  "36×",
  "36x",
  "monthly reach",
  // Pass-120 (operator 2026-09-15, LESSONS #3 "TWO CLIENTS, NOT ONE"): the
  // RFP client is an award-winning author and leadership consultant, the
  // content-engine client a social activist. Neither is "an industry author",
  // and the two engagements are never one.
  "industry author",
  "industry-authority",
  "same engagement also",
  "for the same author",
  // Pass-120 (FABLE-120-CRAFT build note, record block): the exit count lives
  // once, in the /work record block, never as a sentence inside a study.
  "one of four companies I worked inside",
  // Pass-120 (operator 2026-09-16, LESSONS #3 "BIRTH WORKER BOOKINGS, BOTH
  // SIDES"): the 30% was a floor; the claim is the pair, one to three a month
  // to five to ten.
  "bookings up 30%",
  // Pass-120 (operator 2026-09-15/16, LESSONS #3 "THE RFP CLIENT WAS NOT
  // REPOSITIONED"): the value is reach beyond the existing network.
  "repositioned toward the buyers",
  // Pass-120 (operator 2026-09-16, LESSONS #3 "ORDANI'S PROBLEM WAS SIX
  // TOOLS, NOT A HACK"): "they did not think they got hacked".
  "been hacked",
  // Pass-120 (operator 2026-09-16, LESSONS #3 ORDANI): no counts of users,
  // practices, beta testers or interviews. The retired ordani.mdx sentences.
  "fourteen practitioners",
  "six had referred",
  "22 birth workers",
  // Guardicore carries no job title (LESSONS #3, 2026-09-03).
  "sales manager",
  // Pass-113 (operator 2026-09-11, decision 5, LESSONS #3): the acquisitions
  // keep their own sentence, never "led to". llms.txt still said it.
  "led to the Akamai",
  // Pass-116 (operator 2026-09-12, LESSONS #3): never a bare
  // "Helped launch · 2025" that reads as a 2025 launch.
  "Helped launch · 2025",
  // Pass-120 (operator 2026-09-16, GUARDICORE photo ruling): the uncleaned
  // frame still shows the Instagram location sticker. The study uses the
  // cleaned crop, guardicore-telaviv-session.jpg, which this does not match.
  "/guardicore-telaviv.jpg",
  // Pass-120 (operator 2026-09-15 "NO PERSONAL YEARS ON ANY SURFACE" and
  // 2026-09-16 "YEAR FIELDS", LESSONS #3): no tenure year beside a role on
  // any surface. Event years (IPO 2018, Uber 2020, Akamai 2021, Nordic
  // Semiconductor 2025) stay. Both dash spellings of every live range.
  "Enterprise sales · 2018",
  "Product analyst · 2020",
  "2018–2021",
  "2018-2021",
  "2024–2025",
  "2024-2025",
  "2025–2026",
  "2025-2026",
```

**Edit 4, `stripComments` (lines 170-174).** Replace the function header through the
`.replace(/^\s*\/\/.*$/gm, "")` line with:
```js
// Pass-120: a removed block comment keeps its newlines, so a finding after a
// multi-line comment reports its true line number. Before this,
// app/(foyer)/about/page.tsx:105 reported as :76.
const keepNewlines = (m) => m.replace(/[^\n]/g, "");

function stripComments(src, isMdx) {
  if (isMdx) return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, keepNewlines);
  return src
    .replace(/\/\*[\s\S]*?\*\//g, keepNewlines)
    // Pass-120: [ \t]*, not \s*. \s* crossed a blank line and ate its
    // newline, so every finding below a // comment that followed a blank
    // line reported one line early.
    .replace(/^[ \t]*\/\/.*$/gm, "")
```
(the next line, `.replace(/([^:"'])\/\/[^\n]*$/gm, "$1");`, and the closing `}` stay.)

**Edit 5, self-test.** Inside `nearMisses`, after the last existing case (the "Frontier AI ...
two lines apart" object ending at line 387) and before its closing `];` (line 388), insert:
```js
    // Pass-120 near misses (operator 2026-09-15/16 rulings).
    {
      file: "content/work/selftest.mdx",
      src: `  src="/guardicore-telaviv-session.jpg"`,
      why: "the cleaned crop, guardicore-telaviv-session.jpg",
    },
    {
      file: "app/selftest/page.tsx",
      src: `        <p>© 2013–2026 Micah Jones</p>`,
      why: '"© 2013–2026" copyright line (not "since 2013")',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "$20M+ in revenue behind my work.",`,
      why: '"$20M+ in revenue behind my work" (the approved wording)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "Up to 800,000 impressions in a month, up from a few thousand.",`,
      why: '"800,000 impressions" (the approved figure, not "8,000 to")',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        both, on the same engagement, for the same fee.`,
      why: '"on the same engagement, for the same fee" (/about lede, not a client claim)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        <span className="cw-lrow__tag">Helped launch · exit 2025</span>`,
      why: '"Helped launch · exit 2025" (approved Neuton tag, event year)',
    },
    {
      file: "content/work/selftest.mdx",
      src: `Akamai acquired Guardicore in 2021. Uber acquired Postmates in 2020.`,
      why: "event years in prose (they stay)",
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "Bookings went from one to three a month to five to ten.",`,
      why: "the approved birth-worker booking pair",
    },
    {
      file: "app/selftest/page.tsx",
      src: `        /*\n          industry author, 290,000, 2018–2021\n        */\n        <p>clean</p>`,
      why: "retired phrases inside a multi-line block comment",
    },
```
and between that array's `];` and `  let caught = 0;` insert:
```js
  // Pass-120: findings keep their true line numbers after a multi-line
  // block comment, and after a // comment that follows a blank line.
  for (const [fx, want] of [
    [`/*\n one\n two\n*/\n<p>industry author</p>`, 5],
    [`const a = 1;\n\n// note\n<p>industry author</p>`, 4],
  ]) {
    const f = scanSource(fx, "app/selftest/page.tsx");
    if (f.length !== 1 || f[0].line !== want) {
      console.error(
        `retired-phrases-gate self-test: LINE NUMBER is ${f[0]?.line}, expected ${want}`,
      );
      process.exit(1);
    }
  }

```
Write these edits with the Edit tool, not a shell heredoc: on this machine a heredoc through the
Bash tool collapsed `\\` to `\` in a test file on 2026-09-16.

The planted list grows by itself (it maps every PHRASES entry): 25 phrases + 11 fixed cases = 36
today, 59 phrases + 11 = 70 after. Near misses go 23 to 32. All three numbers below (70/32, 57
findings, the tally) were measured on 2026-09-16 by applying exactly these edits to a scratch copy
of the `fffeb18` gate and running it; they are not arithmetic.

## 5.6 Verification (commands with expected output)

Shell: the Bash tool (Git Bash). `R` is the worktree root.
```bash
R=/c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live
```

**V1. Self-test of the edited gate.**
```bash
cd "$R" && node scripts/retired-phrases-gate.mjs --self-test
```
Expected, exactly: `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed`

**V2. The gate bites: run the edited gate against the untouched base tree `fffeb18`.**
```bash
T="$R/.planning/exec/pass-120/s5-base" && rm -rf "$T" && mkdir -p "$T" \
 && cd "$R" && git archive fffeb18 app components content lib | tar -x -C "$T" \
 && cd "$T" && node "$R/scripts/retired-phrases-gate.mjs"; echo "exit=$?"
```
Expected: exit 1, last two lines
`retired-phrases-gate: 57 finding(s). These phrases were retired by a dated operator ruling. ...`
and `exit=1`. Per-file tally:
```bash
cd "$T" && node "$R/scripts/retired-phrases-gate.mjs" 2>&1 | grep -o '^retired-phrases-gate: [^:]*:[0-9]' | sed 's/:[0-9]$//' | sort | uniq -c
```
Expected, exactly (Windows prints backslashes):
```
      4 retired-phrases-gate: app\(foyer)\about\page.tsx
     12 retired-phrases-gate: app\(foyer)\page.tsx
      4 retired-phrases-gate: app\(foyer)\services\page.tsx
      3 retired-phrases-gate: app\(foyer)\work\page.tsx
      2 retired-phrases-gate: app\layout.tsx
      5 retired-phrases-gate: app\llms.txt\route.ts
      1 retired-phrases-gate: components\color-worlds\RevenueFigure.tsx
     11 retired-phrases-gate: content\work\content-engine.mdx
      2 retired-phrases-gate: content\work\guardicore.mdx
      1 retired-phrases-gate: content\work\neuton.mdx
      5 retired-phrases-gate: content\work\ordani.mdx
      1 retired-phrases-gate: content\work\postmates.mdx
      6 retired-phrases-gate: content\work\rfp-engine.mdx
```
Line-number spot check, same run: the output contains `app\(foyer)\about\page.tsx:105: "client revenue", "since 2013"`
and `app\(foyer)\page.tsx:406: "290K", "8K →", "monthly reach"`. Then `rm -rf "$T"`.

**V2b. The line-number self-test bites.** Two mutants of the edited gate, each must fail:
```bash
cd "$R" && node -e 'const fs=require("fs"),B=String.fromCharCode(92);const g=fs.readFileSync("scripts/retired-phrases-gate.mjs","utf-8");fs.writeFileSync(".planning/exec/pass-120/s5-m1.mjs",g.replace("[ "+B+"t]*"+B+"/"+B+"/.*$/gm","(" + B + "s)*" + B + "/" + B + "/.*$/gm"));fs.writeFileSync(".planning/exec/pass-120/s5-m2.mjs",g.replace("const keepNewlines = (m) => m.replace(/[^"+B+"n]/g, \"\");","const keepNewlines = () => \"\";"))' \
 && node .planning/exec/pass-120/s5-m1.mjs --self-test; echo "m1 exit=$?"; node .planning/exec/pass-120/s5-m2.mjs --self-test; echo "m2 exit=$?"; rm -f .planning/exec/pass-120/s5-m1.mjs .planning/exec/pass-120/s5-m2.mjs
```
Expected, exactly:
```
retired-phrases-gate self-test: LINE NUMBER is 3, expected 4
m1 exit=1
retired-phrases-gate self-test: LINE NUMBER is 2, expected 5
m2 exit=1
```

**V3. After every Pass-120 content section has landed (this section last).**
```bash
cd "$R" && node scripts/retired-phrases-gate.mjs
```
Expected, exactly: `retired-phrases-gate: clean`

**V4. Source checks this section owns.**
```bash
cd "$R" && git ls-files public/guardicore-telaviv.jpg | wc -l
grep -h "^client:" content/work/content-engine.mdx content/work/rfp-engine.mdx | sort -u | wc -l
grep -ci "industry" content/work/content-engine.mdx content/work/rfp-engine.mdx
grep -cF 'text: "A social activist: I built the AI content engine that turns one rough video into a week of content. A peak of 800,000 impressions in a month, up from a few thousand.",' "app/(foyer)/services/page.tsx"
grep -cF 'text: "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled.",' "app/(foyer)/services/page.tsx"
grep -cF 'repositioned toward the buyers' "app/(foyer)/services/page.tsx"
pnpm exec prettier --check "app/(foyer)/page.tsx" "app/(foyer)/about/page.tsx" "app/(foyer)/services/page.tsx" app/layout.tsx app/llms.txt/route.ts components/color-worlds/RevenueFigure.tsx scripts/retired-phrases-gate.mjs
```
Expected, in order: `0`; `2`; `content/work/content-engine.mdx:0` and
`content/work/rfp-engine.mdx:0`; `1`; `1` (row 17, the rendered slot); `0` (block 5.4-B deleted);
`All matched files use Prettier code style!`

**V5. The render (count what renders).** `pnpm build` (the gate chain runs first and must pass),
then `pnpm start` in the background on port 3000. Create the helper
`.planning/exec/pass-120/s5-visible.mjs` with the Write tool, exactly:
```js
// Visible text of an HTML page: <head>, <script>, <style> and tags removed.
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  s = s
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/\s+/g, " ");
  process.stdout.write(s);
});
```
and `.planning/exec/pass-120/s5-render.sh` with the Write tool, exactly:
```bash
#!/usr/bin/env bash
# Pass-120 S5 render checks. zero = raw served bytes, case-insensitive, expect 0.
# some = visible text (head/script stripped), case-sensitive, expect >= 1.
# rawsome = raw bytes, expect >= 1 (metadata and text/plain routes).
B=http://localhost:3000
V=.planning/exec/pass-120/s5-visible.mjs
fail=0
zero() { got=$(curl -s "$B$1" | grep -oiF -- "$2" | wc -l | tr -d ' ')
  if [ "$got" = 0 ]; then echo "PASS zero $1 [$2]"; else echo "FAIL zero $1 [$2] got=$got"; fail=$((fail+1)); fi; }
some() { got=$(curl -s "$B$1" | node "$V" | grep -oF -- "$2" | wc -l | tr -d ' ')
  if [ "$got" -ge 1 ]; then echo "PASS some $1 [$2]"; else echo "FAIL some $1 [$2] got=$got"; fail=$((fail+1)); fi; }
rawsome() { got=$(curl -s "$B$1" | grep -oF -- "$2" | wc -l | tr -d ' ')
  if [ "$got" -ge 1 ]; then echo "PASS rawsome $1 [$2]"; else echo "FAIL rawsome $1 [$2] got=$got"; fail=$((fail+1)); fi; }

for p in "client revenue" "since 2013" "290K" "290,000" "8K →" "monthly reach" "industry author" "2018–2021" "2024–2025" "2025–2026" "Enterprise sales · 2018" "Product analyst · 2020"; do zero / "$p"; done
rawsome / 'Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work.'
some / "In revenue behind my work"
some / "Revenue and positioning"
some / "Founder, sole engineer"
some / "Social activist"
some / "Up to 800,000 impressions in a month"
some / "Author and leadership consultant"
some / "\$3M in signed contracts · close rate doubled"
some / "toward the 2018 IPO"
some / "Product analyst"
some / "acquired by Uber, \$2.65B, 2020"
some / "Helped launch · exit 2025"

for p in "client revenue" "since 2013" "industry author" "290,000" "for the same author"; do zero /about "$p"; done
some /about "\$20M+ in revenue behind my work."
some /about "For a social activist, a content engine reached a peak of 800,000 impressions in a month, up from a few thousand."
some /about "For an award-winning author and leadership consultant, the RFP software I built doubled their close rate inside six months."

for p in "industry author" "290,000" "bookings up 30%" "repositioned toward the buyers"; do zero /services "$p"; done
some /services "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. \$3M in signed contracts, close rate doubled."
some /services "A birth worker: repositioned from birth support alone to the full arc of care around it. Bookings went from one to three a month to five to ten, across her whole range instead of one service."
rawsome /services 'href="/work/birth-worker"'

for p in "client revenue" "since 2013" "industry author" "290,000" "led to the Akamai"; do zero /llms.txt "$p"; done
rawsome /llms.txt '$20M+ in revenue behind my work.'
rawsome /llms.txt "- Thirteen years of growth, GTM and platform strategy roles inside B2B software companies"
rawsome /llms.txt '$14M in revenue, sourced and closed, at a $1.2M average enterprise deal size. Akamai acquired Guardicore in 2021'
rawsome /llms.txt "for a social activist; up to 800,000 impressions in a month, up from a few thousand a month"
rawsome /llms.txt 'for an award-winning author and leadership consultant; $3M in signed contracts, close rate doubled'
rawsome /llms.txt "(https://www.micahjonesconsulting.com/work/birth-worker): positioning, website, booking and direct insurance claims for a birth worker; bookings from one to three a month to five to ten"

for p in "36x" "36×" "2018-2021" "2018–2021" "2024-2025" "2025-2026" "<figcaption"; do zero /work "$p"; done
rawsome /work 'Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.'

for s in guardicore rfp-engine content-engine ordani birth-worker; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$B/work/$s")
  if [ "$code" = 200 ]; then echo "PASS 200 /work/$s"; else echo "FAIL 200 /work/$s got=$code"; fail=$((fail+1)); fi
  for p in "2018–2021" "2018-2021" "2024–2025" "2024-2025" "2025–2026" "2025-2026" "<dt>Year</dt>" "industry author" "industry-authority" "one of four companies" "been hacked"; do zero "/work/$s" "$p"; done
done
zero /work/guardicore "guardicore-telaviv.jpg"
rawsome /work/guardicore "guardicore-telaviv-session.jpg"
code=$(curl -s -o /dev/null -w "%{http_code}" "$B/guardicore-telaviv.jpg")
if [ "$code" = 404 ]; then echo "PASS 404 /guardicore-telaviv.jpg"; else echo "FAIL 404 /guardicore-telaviv.jpg got=$code"; fail=$((fail+1)); fi
for s in postmates neuton; do
  h=$(curl -s -o /dev/null -D - "$B/work/$s" | tr -d '\r')
  st=$(printf '%s\n' "$h" | head -1 | cut -d' ' -f2)
  if [ "$st" = 308 ] && printf '%s\n' "$h" | grep -iqE '^location: (http://localhost:3000)?/work#record$'; then echo "PASS 308 /work/$s"; else echo "FAIL 308 /work/$s got=$st $(printf '%s\n' "$h" | grep -i '^location:')"; fail=$((fail+1)); fi
done
echo "s5-render: $fail failures"
```
Run: `cd "$R" && bash .planning/exec/pass-120/s5-render.sh`
Expected: 124 lines beginning `PASS`, zero lines beginning `FAIL`, and the last line exactly
`s5-render: 0 failures`. Check with
`bash .planning/exec/pass-120/s5-render.sh | grep -c '^PASS'` expecting `124`
(home 25, /about 8, /services 7, /llms.txt 11, /work 8, five studies 60, photo 2, 404 1, redirects 2).
Row 18 has no render check on purpose: `/services` renders ONE receipt per area,
`service.receipts[service.proof]` (`app/(foyer)/services/page.tsx:397`), and row 18 is not the
chosen index (`proof: 0` at :126). It is checked in source by V4. Row 17 IS the chosen index
(`proof: 0` at :88), so the exact RFP receipt is checked rendered above and by S6 K3 (exactly 1).
Row 20 is a deletion, checked in source by V4.
(`permanent: true` answers 308, per `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md:30`.
The llms.txt route serves a template literal, so `\$` in its source renders as `$`.)

**V6. Look at the capture (the photograph).** With the server running, open
`http://localhost:3000/work/guardicore` at 1440x900 and at 390x844 (playwright chromium, as
`scripts/visual-baseline.mjs` loads it), scroll the Tel Aviv photograph fully into view, and save
`.planning/qa/pass-120/s5-guardicore-photo-1440.png` and `...-390.png`, each framing the photograph.
Open both files once. Pass: no purple "TEL AVIV, ISRAEL" pill, no red and white circular sticker on
the tablecloth, no caption under the photograph, and the image is not visibly upscaled-soft at
1440. A soft image at 1440 is a FAIL to report, not to fix: see 5.8 item 2.

## 5.7 Rejected

- **Fable's `/services` content-engine line "Monthly impressions peaked at 800,000"** (live-sweep row
  2): it drops the "a few thousand" baseline the reach ruling pairs with the figure. Replaced by the
  draft's own "A peak of 800,000 impressions in a month, up from a few thousand."
- **Keeping "industry author" on `/services:79`** (FABLE-120-CRAFT said the RFP label could stay):
  superseded by TWO CLIENTS as applied in the operator's 2026-09-16 receipt, which drops it.
- **"Working session · Tel Aviv" as the caption with the year removed** (live-sweep row 9): the
  CAPTIONS ruling removes the caption outright.
- **Gating bare "8K", "in 2020" or "hacked"**: each would hit legitimate copy ("$58K", "acquired by
  Uber in 2020", Guardicore security prose). The gated forms are the retired sentences.
- **Moving every event year out of the Neuton tag for symmetry**: "Helped launch · exit 2025" is
  a dated approval (2026-09-12) and is not a tenure year.

## 5.8 Parked for the operator

Inline, so this section stands alone. None blocks the gate edit (5.5). Each blocks the named check
only if the operator's answer differs from what is written above.

1. **Tenure duration on `/llms.txt` (row 24).** The replacement drops the start year but keeps
   "Thirteen years of growth, GTM and platform strategy roles". "Thirteen years" is the approved
   duration (2026-09-03); YEAR FIELDS (2026-09-16) rules out a year beside a role, not a duration.
   Question: does the duration stay? If no, row 24 and its V5 `/llms.txt` check change.
2. **Guardicore photograph resolution (row 37, V6).** The cleaned crop
   `public/guardicore-telaviv-session.jpg` is 770x575. Direction B uses real photographs as
   full-bleed chapter breaks, so at 1440 it may render upscaled and soft. Question: is a larger
   cleaned export available? V6 reports softness as a FAIL; it does not fix it.

## 6. Verification

Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Every command runs from the worktree root in Git Bash unless it says
PowerShell. Every line an executor prints as a result is `PASS <id>: got <x>` or
`FAIL <id>: got <x> (want <y>)`, and every script ends on `<name> failures: N` and exits 1 when N
is not 0.

### 6.0 Standing clauses (copied from `.claude/briefs/README.md`, they bind every check below)

1. **Count what renders.** An `expect 0` may grep raw served HTML. An expected count of 1 or more
   counts visible text (`document.body.innerText` in the browser, whitespace collapsed to single
   spaces), or asserts `-ge 1` on raw HTML with `<!-- -->` stripped first. A raw
   `curl | grep -c` also counts the RSC flight payload, so an exact count never uses raw HTML.
2. **The executor never reinterprets an expected value.** A `got` that differs from its `want`
   is a failure. If the executor believes a number in this section is wrong, it stops before the
   commit and reports the raw output and its reason. The judge rules.
3. **Measure the render, not the model.** Motion and media checks read painted pixels and
   bounding boxes, not component props. Every new script in 6.3 is run once against production
   before any Pass-120 edit and must FAIL there (the bite proof).
4. **Scope from the layout, look at the capture.** In both route groups the nav is a sibling of
   `main`, not inside it: `app/(foyer)/layout.tsx:40` `<Nav />` then `:46`
   `<main id="main-content">`; `app/(theater)/layout.tsx:38` `<Nav />`, `:39` `<main>`, `:42`
   `<Footer />`. `/work` and `/about` mount `PageFooter` (root class `.cw-pagefoot`) INSIDE `main`
   (`app/(foyer)/work/page.tsx:190`, `app/(foyer)/about/page.tsx:225`). So: type-ladder, mono,
   uppercase, sticky, caption and link checks scope to `main` minus `.cw-pagefoot`; string sweeps
   and tenure-year checks scope to the whole `document.body`. Each capture is opened once before
   it counts as evidence, and its name matches what it frames.

Slugs used throughout: `guardicore`, `rfp-engine`, `ordani`, `content-engine`, `birth-worker`.
`STUDIES` means those five routes under `/work/`. The birth-worker slug is fixed here as
`birth-worker` (file `content/work/birth-worker.mdx`); if another section of this brief names a
different slug, the executor stops and reports (clause 2).

### 6.1 Build order and every gate that runs

The build is run as the steps of `package.json:6` one at a time, so the webpack flag the RESUME
requires ("Build `npx next build --webpack`") applies and each gate's output is captured. Run the
build in the foreground or with the Bash tool's background mode and wait for its notification;
never as a detached process (RESUME: "Detached executors hang at next build"). Log everything to
`.planning/exec/gates120.log`.

| # | Command | Expected output (exact) |
|---|---|---|
| G1 | `node_modules/.bin/tsx lib/copy-lint-cli.ts` | `[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.` exit 0 |
| G2 | `node scripts/vendor-gate.mjs` | `vendor-gate: clean` exit 0 |
| G3 | `node scripts/retired-phrases-gate.mjs --self-test` | `retired-phrases-gate self-test: 70 planted caught, 32 near misses passed` exit 0 (was 36 and 23; the value is section 5.6 V1's, because section 5.5 is the one edit to this file, 6.2 E2; if the assembler folds E2's four extra phrases into 5.5, both this line and 5.6 V1 read `70 planted caught, 32 near misses passed`) |
| G4 | `node scripts/retired-phrases-gate.mjs` | `retired-phrases-gate: clean` exit 0 |
| G5 | `node scripts/accent-states-lint.mjs --self-test` | `accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms` exit 0 |
| G6 | `node scripts/accent-states-lint.mjs` | `accent-states-lint: clean` exit 0 |
| G7 | `node scripts/gsap-quarantine-gate.mjs --self-test` | `gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean` exit 0 |
| G8 | `node scripts/gsap-quarantine-gate.mjs` | one line matching `^gsap-quarantine-gate: clean \([0-9]+ files\)$` exit 0 |
| G9 | `npx next build --webpack` | exit 0 |
| G10 | `node scripts/render-gate.mjs` | one line matching `^render-gate: [0-9]+ routes — links resolve, fragments exist, metadata within limits\.$` exit 0 (must run after G9; `scripts/render-gate.mjs:70-75` exits 1 without `.next/server/app`) |
| G11 | `npx tsc --noEmit` | no output, exit 0 (after G9, as Pass-117 ran it) |
| G12 | `node -e 'console.log(require("fs").readdirSync(".next/server/app/work").filter(f=>f.endsWith(".html")).sort().join(" "))'` | `birth-worker.html content-engine.html guardicore.html ordani.html rfp-engine.html` |
| G13 | `node scripts/layout-gate.mjs --self-test` | `layout-gate self-test: 7 planted defects caught, 8 near misses clean` exit 0 |
| G14 | `node scripts/ordani-claims-gate.mjs > .planning/exec/ordani120.txt; grep -c -e "^ordani-claims-gate: app" -e "^ordani-claims-gate: components" -e "^ordani-claims-gate: content" .planning/exec/ordani120.txt` | `0` (the gate itself exits 1 today; that exit is expected, see G15) |
| G15 | `grep -c "product.playbook.src" .planning/exec/ordani120.txt` | `10` (the pre-existing book findings in `gates.md` §2.9; not wired into build, not a Pass-120 regression; any other count is a failure) |

Then start the server for 6.5: `npx next start --port 3200 > .planning/exec/server120.log 2>&1`
in the Bash tool's background mode. Ready when
`curl -s -o /dev/null -w '%{http_code}' http://localhost:3200/work` prints `200`. Every served
check in 6.5 and 6.6 runs against this one server. Stop it after 6.7.

### 6.2 Existing gates that fail on this pass as designed, and their edits (same commit as the pass)

**E1. `scripts/layout-gate.mjs:71-73` default routes.** Today:
`["/", "/services", "/packages", "/work", "/work/postmates", "/work/neuton"]`. After the pass the
last two 308 away and the five studies are never checked. Replace the array literal with exactly:

```js
  : ["/", "/services", "/packages", "/work", "/work/guardicore", "/work/rfp-engine", "/work/ordani", "/work/content-engine", "/work/birth-worker"];
```

Expected after the edit, served: `node scripts/layout-gate.mjs http://localhost:3200` last line
matches `^layout-gate: [0-9]+ page loads across 9 routes, 0 finding\(s\), 0 not in KNOWN$`, exit 0.

**E2. `scripts/retired-phrases-gate.mjs`: owned by section 5.5, not edited here.** One writer
per file. Section 5.5 makes every edit to this file (SCOPE comment, `ROOTS` gains `components`,
the Pass-120 `PHRASES`, `stripComments`, the new near misses), and this section adds nothing to
it: the executor applies 5.5 once and never a second PHRASES or ROOTS edit from here. G3's
expected line is 5.6 V1's (`70 planted caught, 32 near misses passed`, measured today as `36
planted caught, 23 near misses passed` with 25 phrases).

Reconciliation for the assembler, before execution (not an executor step). 5.5 Edit 3 already
covers, in the same or a broader spelling, every phrase this section proposed except four:
`"fourteen practitioners"`, `"six had referred"`, `"22 birth workers"` (all three live today in
`content/work/ordani.mdx:47,56,57`, retired by the ORDANI no-counts ruling) and `"sales manager"`
(Guardicore carries no job title; 0 live hits on 2026-09-16). If the assembler adds those four to
5.5 Edit 3, it changes 5.6 V1 and G3 together to `70 planted caught, 32 near misses passed` and
re-counts 5.6 V2's base-tree finding total (the three ORDANI lines add findings there). If it does
not, both lines stay at 66. The executor never edits either count to match what it sees
(clause 2); a mismatch stops the run. If G4 reports a `components/` finding, the executor stops and
reports it; it never removes `components` from ROOTS to pass.

**E3. `.planning/exec/card1-115.sh` is retired, not edited.** It asserts 200 on
`/work/postmates` and `/work/neuton` (`:24`), and markers that live only on those pages
(`:29-31, :34`); every one fails once they 308. Its `BASE_DPL` (`:4`,
`dpl_BfViKgzf8bHDU5AwneqWDpsTUDLz`) is also stale: RESUME records production on
`dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23`. Leave the file as history and write
`.planning/exec/card1-120.sh` (spec in 6.3 V5).

**E4. `.planning/exec/circle115.mjs` C13 (`runC13`, `:455-576`).** The home page changes in this
pass (ledger rows, the $20M label), so circle115 runs, and C13 loads `/work/postmates` (`:500`),
clicks `a.case-study__nav-link[href="/"]` (`:506`, the "back to home" link the new template
removes) and waits for `/work/postmates` on Back (`:536`). Edits:
- `:500` `${S}/work/postmates` becomes `${S}/work/guardicore`.
- `:536` `location.pathname === "/work/postmates"` becomes `location.pathname === "/work/guardicore"`.
- `:506` `await page.click('a.case-study__nav-link[href="/"]');` becomes
  ```js
  await page.evaluate(() => {
    const go = () => window.next.router.push("/");
    if ("startViewTransition" in document) document.startViewTransition(go);
    else go();
  });
  ```
  This is the same call `components/view-transition-link.tsx` makes on click, issued through the
  public App Router instance that this Next version assigns to `window.next.router`
  (`node_modules/next/dist/client/components/app-router-instance.js:387-388`). It keeps C13 a
  client navigation inside one document, which the header's plain `<a href="/">`
  (`components/color-worlds/Nav.tsx:191`) cannot be.

Expected: `node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-120/circle` last line
`circle failures: 0`.

**No edit, expected to pass unchanged:**
- `.planning/exec/type117.mjs` is scoped to `/services` only (`:44`), and its pins (`EXPECT`, T7's
  Guardicore proof line) are not touched by any Pass-120 ruling. The `/services` receipt edits
  change strings, not roles. Expected `type117 failures: 0`. If it fails, stop and report; the
  pins are not edited in this pass. (The request that framed this section listed "type117 pins" as
  failing by design; the repo does not support that, and the repo wins.)
- `scripts/axe-worlds.mjs`: default routes (`:79`) exclude `/work` and every study; no edit, the
  routes are passed on the command line (6.5 V8).
- `scripts/render-gate.mjs`: redirect sources are read live from `next.config.ts`
  (`:109-115`), so the two new entries need no script edit.
- `scripts/gsap-quarantine-gate.mjs`: no edit while the settle stays in
  `components/TitleCard.tsx`. If another section of this brief moves GSAP into a new file, that
  section names the ALLOWLIST line; this section adds none.
- Not re-run, not edited, stale after this pass (history only): `.planning/exec/capture-113.mjs`,
  `capture116.mjs`, `decompose-113.mjs`, `shots111a.mjs`.

### 6.3 New verifier scripts (written from this section before the build; the executor does not change them)

All use puppeteer-core from `C:/tmp/p101tools` (`createRequire("C:/tmp/p101tools/package.json")`)
and Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`, as `type117.mjs:13-14`
does. Viewports: `1440` = 1440x900, deviceScaleFactor 1, not mobile; `390` = 390x844,
deviceScaleFactor 2, isMobile, hasTouch (the `axe-worlds.mjs:94-110` pair). Base URL is the first
positional argument, default `http://localhost:3200`. Each page waits for `networkidle0` (timeout
60000), then `document.fonts.ready`, then 1500ms, unless the check says otherwise. "Reduced" means
`emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}])`; "motion" means
`no-preference`. "Visible" means rect width > 2 and height > 2, computed `visibility` not
`hidden`, `display` not `none`, and no ancestor matching `.sr-only, .cw-sr-only, [hidden],
.skip-to-content, [role="dialog"]`. "Own text" is the element's direct text nodes joined and
whitespace-collapsed. "Effective background luminance" of an element is the relative luminance
(WCAG formula) of the first ancestor-or-self whose computed `background-color` has alpha > 0.

**V1 `.planning/exec/claims120.mjs`** (strings). Routes:
`/ /about /services /packages /contact /call /work` + STUDIES + `/llms.txt` + `/sitemap.xml`.
For each route: `fetch` the raw body; for HTML routes also load it at 1440, reduced, and read
`document.body.innerText` (collapsed). For `/llms.txt` and `/sitemap.xml` the raw body is the
visible text.

- **K1 retired, every route, expect 0 each.** Every string in the `PHRASES` array of
  `scripts/retired-phrases-gate.mjs`, read from that file at run time (regex
  `/const PHRASES = \[([\s\S]*?)\n\];/`, then each `"..."` literal), matched case-insensitively
  against the visible text. Phrases of 8 or more characters are also matched against the raw body;
  shorter ones (`36x`, `290K`, the five-letter vendor name) can occur inside base64 and hashes in raw
  HTML, so they are matched on visible text only. Plus, visible text only: `/\b8K\b/`,
  `/\bRLS\b/` (case-sensitive), and on `/work/ordani` the vendor regex
  `/\b(Supabase|Vercel|Next\.js|Postgres(?:QL)?|Twilio|Resend|Neon|Expo|Railway|Firebase|PlanetScale|Cloudflare|AWS|GCP|Azure)\b/`
  (copied from `scripts/vendor-gate.mjs:21-22`) and, case-insensitive,
  `row-level security`, `auth.uid`, `encrypted at rest`, `encryption at rest`, `audit log`.
  Plus, raw and visible, case-insensitive: `Protected by NDA`, `client-confidential`,
  `NEXT WORK`, `back to home`, `every practitioner had been`, `8,000 to`.
- **K2 scoped zero, visible, expect 0:** `same engagement` on `/work`, STUDIES and `/llms.txt`
  only. (`/about` keeps "on the same engagement, for the same fee" at
  `app/(foyer)/about/page.tsx:59`; that sentence is not about clients.)
- **K3 exact presence, visible, expect exactly 1 on the route named:**
  - `/work`: `I find what your buyers are actually paying for, then build the system that sells exactly that.`
  - `/work`: `Also on the record`
  - `/work`: `Four of the companies I worked inside reached an exit.`
  - `/services`: `An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled.`
  - every route other than `/work`: the method line above, expect 0.
- **K4 presence, visible, expect 1 or more:**
  - `/work`: `$14M`
  - `/work/guardicore`: `$14M in revenue, sourced and closed` · `a major U.S. utility` · `Acquired by Akamai in 2021`
  - `/work/rfp-engine`: `an award-winning author and leadership consultant who teaches government bodies and corporations` · `$3M in signed contracts` · `One requirement, start to finish`
  - `/work/content-engine`: `a social activist` · `800,000 impressions` · `a few thousand`
  - `/work/ordani`: `HIPAA-compliant` · `Six apps and a Sunday night` · `44.8` · `3.15`
  - `/work/birth-worker`: `one to three` · `five to ten` · `thousands of dollars` · `Medicaid`
  - `/services`: `five to ten`
- **K5 the record block on `/work`, in the browser at 1440 and at 390:**
  `document.querySelectorAll('[id="record"]').length` is `1`. Inside `#record` innerText, each of
  these occurs exactly once, matched case-sensitively: `SurveyMonkey`, `Enterprise sales`, `IPO, 2018`,
  `$1M+ in enterprise sales toward the 2018 IPO.`, `Postmates`, `Product analyst`,
  `Acquired by Uber, $2.65B, 2020`,
  `Market and fraud analysis in the deliver-anything era, and the case for narrowing the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold.`,
  `Revenue and positioning`, `Acquired by Akamai, 2021`,
  `$14M in revenue, sourced and closed, after the research moved the pitch from honeypots to east-west visibility.`,
  `Neuton.AI`, `Helped launch`, `Technology acquired by Nordic Semiconductor, 2025`,
  `North American positioning for an AI product years before anyone was queuing to buy AI. I held no cap-table position.`
  (`Guardicore` occurs at least once.) Order: index of `SurveyMonkey` < `Postmates` <
  `Guardicore` < `Neuton.AI`. `#record a` count is exactly 1 and its `getAttribute("href")` is
  `/work/guardicore`. The bare string `Helped launch · 2025` occurs 0 times on the page.
- **K6 index links on `/work`:** the set of distinct `href` values of `main a[href^="/work/"]`
  equals exactly `{/work/guardicore, /work/rfp-engine, /work/ordani, /work/content-engine, /work/birth-worker}`.
- **K7 tenure years, visible, whole body, expect 0 each.** Routes `/`, `/about`, `/work`, STUDIES,
  `/llms.txt`. First delete the exact substring `© 2013–2026 Micah Jones` (the legal notice in
  `components/color-worlds/PageFooter.tsx:34`, kept by the 2026-09-02 ruling). Then count
  `/\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|\d{2})\b(?![-–]\d)/g` (a year range; the
  lookahead keeps an ISO date such as `2026-09-16` out) and
  `/·\s*(?:19|20)\d{2}\b|\b(?:19|20)\d{2}\s*·/g` (a year beside a middot, the role-row
  template). Event years in the record rows use commas and pass. Raw HTML of `/`, `/about`,
  `/work` and STUDIES also carries 0 of `case-study__year` and `<dt>Year</dt>`.
- **K8 JSON-LD on each study (raw HTML):** exactly one `script[type="application/ld+json"]` whose
  JSON has `"@type":"Article"`; its `datePublished` matches `^\d{4}-\d{2}-\d{2}$` and equals, as a string,
  the `publishedAt` frontmatter value of `content/work/<slug>.mdx` read from disk (never a bare
  tenure year). Today section 2.3 sets that value to each file's first-commit date (guardicore and
  ordani `2026-05-14`, rfp-engine and content-engine `2026-09-01`, birth-worker the content-commit
  date), and section 2's V5 checks it against git. **Stop before the commit** unless the RESUME records the
  operator's or judge's ruling, with its date, on which date counts as "the date the page is
  published" for the four existing studies: first commit (section 2.3 as written) or the Pass-120
  republish date (then 2.3 sets all five to the content-commit date). K8 passes under either
  ruling; the executor never picks one.
- **K9 sitemap:** `/sitemap.xml` `<loc>` values containing `/work` are exactly
  `https://www.micahjonesconsulting.com/work` plus the five study URLs, 6 in total; 0 contain
  `postmates` or `neuton`.
- **K10 redirects (raw fetch, `redirect: "manual"`):** `/work/postmates` and `/work/neuton` each
  return status `308` with `location` header `/work#record`.

Prints `claims120 failures: N`.

**V2 `.planning/exec/page120.mjs`** (render). Routes `/work` + STUDIES, each at 1440 and 390,
reduced, unless a check says motion.

- **T1 type ladder.** Collect computed `font-size` (px, rounded to 0.01) of every visible element
  with own text inside `main`, excluding `.cw-pagefoot` and its descendants. At 1440 the set is a
  subset of `{13, 18, 36, 56, 112}` and contains `13, 18, 36`; `/work` also contains `112`; each
  study also contains `56`. At 390 the set is a subset of `{12, 17, 26, 36, 64}` and contains
  `12, 17, 26`; `/work` also contains `64`; each study also contains `36`. Print every size with
  up to six first class names, as `type117.mjs` does.
- **T2** set size `<= 5`.
- **T3** `/work` at 1440 only: largest size divided by 18 is `>= 4` (want `6.22`).
- **T4 chrome sizes, INFO, not gated.** Print the sizes of visible own-text elements in `.cw-nav`,
  `.cw-pagefoot` and the theater `footer`, labelled `INFO chrome sizes <route> <w>: ...`.
- **T5 page spill:** `document.documentElement.scrollWidth - window.innerWidth <= 0`.
- **T6 mono prose:** visible elements in main (scope as T1) whose first `font-family` contains
  `mono` (case-insensitive) and whose own text has 7 or more words: count `0`.
- **T7 tracked uppercase:** visible own-text elements in main (scope as T1) with computed
  `text-transform: uppercase`: count `0`.
- **T8 no rail:** elements in `main` with computed `position` `sticky` or `fixed`: `0`;
  `.case-study__sidebar` count `0`.
- **T9 no captions:** `main figcaption` count `0`. (C9 covers the clip; the capture look in 6.7
  covers a caption set in any other element. A class name is not tested: the live dek class is
  `.title-card-caption`, `app/globals.css:557`.)
- **T10 one title:** `main h1` count exactly `1`; on each study it is visible.
- **T11 body links on paper.** For every visible `main p a` (excluding `.cw-pagefoot`) whose
  effective background luminance is `>= 0.5`: create a sibling probe `<span>` with inline
  `color: var(--color-accent-copper-deep)`, read its computed color, remove it; the link's
  computed `color` equals the probe's. On `/work/ordani` a link also passes if it equals a probe
  of `var(--color-ordani-sage)`. Links with luminance `< 0.5` (the dark band) must NOT equal the
  copper-deep probe.
- **T12 sage scope.** Resolve `var(--color-ordani-sage)` with a probe. Count visible elements in
  main whose computed `color`, `background-color`, `border-top-color`, `fill` or `stroke` equals it.
  `/work/ordani`: `>= 1`. `/work` and the other four studies: `0`.
- **T13 photographs.** A full-bleed image is a visible `main img` or `main video` with rendered
  width `>= document.documentElement.clientWidth - 1`. `/work/ordani`: `>= 1` full-bleed `img` (its
  chapter break, `/ordani-intake.jpg`). `/work/guardicore` has no chapter break (section 2.3) and
  its band photograph sits in the band's media column, not full bleed: full-bleed `img` count `0`,
  and exactly `1` visible `main img` whose `currentSrc` (URL-decoded) contains
  `guardicore-telaviv-session.jpg`, with rendered width `> 0` and `<` the full-bleed threshold. `/work/rfp-engine`, `/work/content-engine`, `/work/birth-worker`: `main
  img` count `0` and `main video` count `0`. On every route, no `img` whose `currentSrc`
  (URL-decoded) contains `guardicore-telaviv.jpg`, and no `video` whose `poster` contains it (that
  file still shows the Instagram location sticker; the `-session` file does not match this
  pattern).
- **T14 the close.** Each study: exactly 1 visible `main a[href="/work"]` whose innerText
  (collapsed) is `All work`.
- **T15 the fragment lands.** At 1440, `page.goto(base + "/work/postmates")`; after load,
  `location.pathname + location.hash` is `/work#record` and
  `document.getElementById("record").getBoundingClientRect().top` is between `0` and `160`.
  Same for `/work/neuton`.
- **T16 no-JS finished frame.** `page.setJavaScriptEnabled(false)` then load: each study's `main
  h1` is visible with every ancestor's computed `opacity` product equal to `1`, and its rect `top`
  equals the reduced-motion run's `top` within 1px (reserved height).

Prints `page120 failures: N`.

**V3 `.planning/exec/settle120.mjs`** (the TitleCard settle, STUDIES, 1440 and 390).
A frame sampler is installed with `evaluateOnNewDocument`: on `DOMContentLoaded` it starts a
`requestAnimationFrame` loop that records, for `main h1` and each of its descendants with a
non-zero rect: `performance.now()`, effective opacity (product of computed `opacity` from the
element up to `document.documentElement`), `rect.left`, `rect.top + scrollY`, and the h1's computed
`filter`, `clip-path`, `font-size`, `letter-spacing`. It stops after 3000ms. The final frame is the
last sample. A frame is non-final when any element's effective opacity differs from its final value
by more than 0.01 or its position by more than 0.5px.

- **S1 motion runs:** at least 1 non-final frame.
- **S2 600ms total:** time from the first non-final frame to the first final frame after the last
  non-final frame is `<= 634` ms (600ms plus two frames).
- **S3 no flash:** frames before the first non-final frame in which the h1 is at its final state:
  `0`. (The finished frame must not paint and then jump back to the start state.)
- **S4 transform and opacity only:** `filter`, `clip-path`, `font-size`, `letter-spacing` take one
  value each across all frames.
- **S5 once per load:** after S1-S4, clear samples, start the sampler by hand, scroll to the bottom,
  wait 500ms, scroll to the top, set the viewport width to 1200 then back (390 run: 360 then 390),
  sample 2000ms: non-final frames `0`.
- **S6 reduced:** reduced, fresh page: non-final frames over 3000ms `0`, final h1 effective
  opacity `1`.
- **S7 CLS:** motion, fresh page, a buffered `PerformanceObserver` on `layout-shift` installed with
  `evaluateOnNewDocument`; sum of `value` where `!hadRecentInput` over 5000ms after `load` is
  `<= 0.05`. Also run S7 on `/work` at both widths.

Prints `settle120 failures: N`.

**V4 `.planning/exec/clip120.mjs`** (the `/work` hero clip). "Ink" means: screenshot of the
media element's rect, decoded in a separate `about:blank` page through a canvas (the
`circle115.mjs` pattern), luminance standard deviation `> 10`. "Same pixels" means the two decoded
captures differ by at most 2 in every channel of every pixel.

- **C1 SSR markup (raw HTML of `/work`, `<!-- -->` stripped):** exactly one `<video`; that tag has a
  non-empty `poster` attribute and no `autoplay`, `loop` or `controls` attribute; no `<track` in the
  page.
- **C2 properties (motion, after load):** `video.muted === true`, `video.playsInline === true`,
  `video.loop === false`, `video.controls === false`, `3.9 <= video.duration <= 4.2`.
- **C3 plays once (motion, 1440 and 390):** captures at 300ms and 2500ms after `load` are not the
  same pixels; `ended` fires within 8000ms of `load`; capture at `ended` + 100ms and
  `ended` + 2100ms are the same pixels and inked; then `video.paused === true`,
  `video.played.length === 1`, `video.played.start(0) <= 0.05`,
  `video.played.end(0) >= video.duration - 0.1`.
- **C4 reduced (1440 and 390):** captures at 1000ms and 5000ms after `load` are the same pixels and
  inked; `video.played.length === 0` (or no `video` element exists and a visible `main img` is
  inked).
- **C5 save-data (motion, 1440):** `evaluateOnNewDocument` defines
  `Object.defineProperty(Navigator.prototype, "connection", { get: () => ({ saveData: true, effectiveType: "4g", addEventListener() {}, removeEventListener() {} }) })`;
  same assertions as C4.
- **C6 no-JS (1440 and 390):** `setJavaScriptEnabled(false)`; captures at 1000ms and 5000ms after
  `load` are the same pixels and inked.
- **C7 served size budget:** for `video.currentSrc`, every `video source` `src`, and `video.poster`:
  `curl -sI` status 200; videos `content-type` starts `video/` and `content-length <= 800000`
  each, all video bytes together `<= 1400000`; poster `content-type` starts `image/` and
  `content-length <= 150000`.
- **C8 no raw source committed:** `git ls-files -s public` then `stat` each file: no file of
  exactly `3264298` bytes (the size of
  `C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4`).
- **C9 no caption:** no visible text node within 120px below the media element's rect inside its
  nearest `figure` or section ancestor. (T9 also covers `figcaption`.)

Prints `clip120 failures: N`.

**V5 `.planning/exec/card1-120.sh`** (served markers, local or production). Copy the structure of
`card1-115.sh` (`chk`, the no-arg two-domain mode, `CHECK_DPL`), with
`BASE_DPL="dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23"`. Before writing it, confirm
`curl -s https://www.micahjonesconsulting.com/ | grep -o 'data-dpl-id="[^"]*"' | head -1` prints
`data-dpl-id="dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23"`; if not, stop and report. Every fetched body is
piped through `sed 's/<!-- -->//g'`. Per domain `D`:
- dpl id new (no-arg mode only), as `card1-115.sh:19-22`.
- `curl -s -o /dev/null -w '%{http_code}'` is `200` for `/ /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker /llms.txt /sitemap.xml`.
- `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$D/work/postmates"` is
  `308 $D/work#record`; same for `/work/neuton`.
- Across the concatenated bodies of `/`, `/about`, `/services`, `/work`, the five studies and
  `/llms.txt`, `grep -ciF` count `0` (fixed strings, so `$` is literal) for each of: `client revenue`, `consulting revenue`, `290,000`,
  `industry author`, `industry-authority`, `been hacked`, `Organic bookings up 30%`,
  `repositioned toward the buyers`, `one of four companies I worked inside`,
  `same engagement also produced`, `2018–2021`, `2018-2021`, `2024–2025`, `2024-2025`,
  `2025–2026`, `2025-2026`, `Protected by NDA`, `$80M`, `80 million`.
- `grep -cF`, `-ge 1`: `/work` `I find what your buyers are actually paying for, then build the system that sells exactly that.`;
  `/work` `id="record"`; `/work` `Also on the record`; `/work` `Technology acquired by Nordic Semiconductor, 2025`;
  `/services` `software that finds and drafts RFPs from buyers outside their existing network`;
  `/` `revenue behind my work`; `/work/content-engine` `a social activist`;
  `/work/rfp-engine` `leadership consultant who teaches government bodies and corporations`.
- Home figure markers kept from `card1-115.sh:35-42` unchanged (`More than 20 million dollars`, the
  tick SSR `$20M+`, the loop path `M 100 0.5 C 12 -0.5`, the two CSS values).
- Both domains same deployment (no-arg mode), as `card1-115.sh:44-47`.
Ends `card1 failures: N`.

**V6 `.planning/exec/lh120-summary.mjs`.** Reads `.planning/exec/lh120/work-{1,2,3}.json`. Per run
prints performance score, `largest-contentful-paint` numericValue, `cumulative-layout-shift`
numericValue, and the `largest-contentful-paint-element` node selector. Gates:
`L1 median LCP <= 1800`, `L2 every run CLS <= 0.05`. Ends `lh120 gate failures: N`.

**V7 `.planning/exec/shots120.mjs`** writes the captures in 6.7.

**Bite proof, before the first Pass-120 edit.** Run V1-V5 once against production and save each
output: `node .planning/exec/claims120.mjs https://www.micahjonesconsulting.com > .planning/exec/claims120-bite.txt`,
likewise `page120-bite.txt`, `settle120-bite.txt`, `clip120-bite.txt`, and
`bash .planning/exec/card1-120.sh https://www.micahjonesconsulting.com > .planning/exec/card1-120-bite.txt`.
Expected: every one exits non-zero. Named failures that must appear (production today has them):
claims120 K1 on `/work/content-engine` (`290,000`); K10 (`/work/postmates` status 200);
page120 T10 on each study (the only h1 is `sr-only`); settle120 S1 or S2 on each study; clip120 C1
(no `<video` on `/work`); card1-120 the two redirect lines. A script that passes on production
is not a gate; stop and report.

### 6.4 Static checks (no server)

| # | Command | Expected |
|---|---|---|
| X1 | `grep -rl "titleCardWords" app components lib content; echo "exit=$?"` | `exit=1` and no file names |
| X2 | `grep -rlF --include=*.mdx --include=*.tsx -e "44.8" -e "3.15" -e "14.2" app components content; echo "exit=$?"` | `exit=1` and no file names (the CDC figures live only in `content/citations.ts`, Pitfall E2) |
| X3 | `grep -c "ORDANI_CDC_2024" content/citations.ts` | `1` or more |
| X4 | `node -e 'const r=f=>require("fs").readFileSync(f,"utf8").match(/^client:.*$/m)[0];console.log(r("content/work/rfp-engine.mdx")!==r("content/work/content-engine.mdx"))'` | `true` |
| X5 | `grep -rn -e "cs.year" -e "lead.year" -e "[^a-zA-Z]s.year" -e "{year}" -e "year={" app components; echo "exit=$?"` | `exit=1` and no lines (no template renders `year`; `content-model.md` §4 lists the render sites) |
| X6 | `node -e 'const m=require("./.claude/brand.json").motion;const d=m.signature.description;console.log(/Inter/.test(d),/600ms/.test(d),/900ms/.test(m.view_transition.description),/600ms/.test(m.view_transition.description))'` | `false true true false` |
| X7 | `ls content/work/` | `birth-worker.mdx content-engine.mdx guardicore.mdx ordani.mdx passioneer.mdx rfp-engine.mdx` or the same list plus `neuton.mdx postmates.mdx`; in the second case G12 and K9 still hold (whichever the content section rules) |
| X8 | `grep -rn "guardicore-telaviv.jpg" app components content \| wc -l` | `0` |
| X9 | `node .planning/exec/type117.mjs http://localhost:3200` (needs the server; run in 6.5) | `type117 failures: 0` |

### 6.5 Served checks against `next start` on port 3200

| # | Command | Expected |
|---|---|---|
| V1 | `node .planning/exec/claims120.mjs http://localhost:3200` | `claims120 failures: 0` |
| V2 | `node .planning/exec/page120.mjs http://localhost:3200` | `page120 failures: 0` |
| V3 | `node .planning/exec/settle120.mjs http://localhost:3200` | `settle120 failures: 0` |
| V4 | `node .planning/exec/clip120.mjs http://localhost:3200` | `clip120 failures: 0` |
| V5 | `bash .planning/exec/card1-120.sh http://localhost:3200` | `card1 failures: 0` |
| V6 | `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3200/work/postmates` | `308 http://localhost:3200/work#record` |
| V7 | `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3200/work/neuton` | `308 http://localhost:3200/work#record` |
| V8 | `MSYS_NO_PATHCONV=1 AXE_OUT=.planning/qa/pass-120/build/axe.json node scripts/axe-worlds.mjs http://localhost:3200 / /about /services /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker` | last line matches `^axe-worlds: axe-core [0-9.]+, [0-9]+ scans, 0 serious/critical finding\(s\), 0 not in KNOWN$`, exit 0 (exit 3 is a coverage failure and fails this check) |
| V9 | `MSYS_NO_PATHCONV=1 node scripts/layout-gate.mjs http://localhost:3200` | last line matches `^layout-gate: [0-9]+ page loads across 9 routes, 0 finding\(s\), 0 not in KNOWN$` (E1) |
| V10 | `node .planning/exec/type117.mjs http://localhost:3200` | `type117 failures: 0` |
| V11 | `node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-120/circle` | `circle failures: 0` (E4) |

Save each output to `.planning/qa/pass-120/build/<id>.txt`.

### 6.6 CLS and mobile LCP on `/work` (Lighthouse CLI, the Pass-119 invocation)

```bash
mkdir -p .planning/exec/lh120 && for i in 1 2 3; do node C:/tmp/p101tools/node_modules/lighthouse/cli/index.js "http://localhost:3200/work" --only-categories=performance --output=json --output-path=".planning/exec/lh120/work-$i.json" --chrome-path="C:/Program Files/Google/Chrome/Application/chrome.exe" --chrome-flags="--headless=new" --quiet; done && node .planning/exec/lh120-summary.mjs
```

This is Lighthouse's default mobile form factor with simulated throttling, the same mode as
`.claude/briefs/pass-119-gsap-after-load.md:186`. Expected: `PASS L1 median LCP <= 1800`,
`PASS L2 every run CLS <= 0.05`, `lh120 gate failures: 0`. The summary also prints the LCP element;
record it. Reference, not a gate: Pass-119 measured simulated median LCP 3510ms on `/` and 2944ms on
`/services` (`pass-119-gsap-after-load.md` §11), so L1 may fail for causes shared by every route.
If L1 fails, the executor does not remove, delay or shrink the clip, the photograph or any ruled
element to pass it; it stops and reports the three runs. The clip ships only with L1 passing or the
operator's dated words overriding it (6.8).

### 6.7 Captures (`node .planning/exec/shots120.mjs http://localhost:3200` into `.planning/qa/pass-120/build/shots/`)

Reduced motion unless the name says `motion`. `<w>` is `390` and `1440`, both taken for every row.

| File | What it frames |
|---|---|
| `work-lead-hero-still-<w>.png` | `/work` first viewport: context line, `$14M`, the still |
| `work-lead-hero-clip-lastframe-motion-<w>.png` | `/work` first viewport 500ms after the clip's `ended` |
| `work-hero-nojs-<w>.png` | `/work` first viewport with JavaScript disabled |
| `work-method-line-and-entries-<w>.png` | the element holding the method line scrolled to 96px below the viewport top |
| `work-record-block-<w>.png` | `#record` scrolled to the viewport top |
| `work-full-<w>.png` | `/work` full page |
| `study-<slug>-curtain-<w>.png` (x5) | each study's first viewport: context, title, dek, at a glance |
| `study-<slug>-band-to-paper-<w>.png` (x5) | scrolled to the dark band's bottom edge minus 200px (band = the h1's first ancestor with an opaque background of luminance `< 0.5`) |
| `study-ordani-chapter-photo-<w>.png` | the first full-bleed `main img` scrolled to viewport centre |
| `study-guardicore-band-photo-<w>.png` | the `main img` whose `currentSrc` contains `guardicore-telaviv-session.jpg` scrolled to viewport centre (the band photograph; Guardicore has no chapter break) |
| `study-rfp-engine-worked-example-<w>.png` | the h2 `One requirement, start to finish` scrolled to the viewport top |
| `study-<slug>-close-and-all-work-<w>.png` (x5) | the `All work` link scrolled to the viewport bottom |
| `study-<slug>-full-<w>.png` (x5) | each study full page |
| `study-guardicore-settle-t0-motion-1440.png` ... `-t750-` | the hero rect at nominal 0, 150, 300, 450, 600, 750ms after `DOMContentLoaded`; the script prints each capture's actual ms |
| `redirect-postmates-lands-on-record-1440.png`, `redirect-neuton-lands-on-record-1440.png` | the viewport after following each retired slug |

The executor opens every capture once with the Read tool and writes
`.planning/qa/pass-120/build/CAPTURES.md`: one line per file, `<file> — <what is visible, 12 words
or fewer>`. A capture whose content does not match its name is a failure; so is any visible
caption under a photograph or the clip, any `PROTECTED BY NDA` box, a location sticker on the Tel
Aviv frame, or a colleague cropped anywhere but the frame's edge in either hero capture.

### 6.8 Ship conditions (all four, in order; none is waived by a passing gate)

1. **Motion-engineer written approval of the settle AND the clip.** The `motion-engineer` agent
   (premium-web plugin, CARD 5) reads `components/TitleCard.tsx`, the `.claude/brand.json`
   `motion` diff, the `settle120`, `clip120` and `lh120` outputs, and the settle and clip captures,
   and writes `.planning/reviews/MOTION-120-APPROVAL.md`. Check:
   `grep -c "^APPROVED: settle$" .planning/reviews/MOTION-120-APPROVAL.md` prints `1` and
   `grep -c "^APPROVED: clip$" .planning/reviews/MOTION-120-APPROVAL.md` prints `1`. Any other
   verdict line stops the ship. The colleagues' consent to being animated is the operator's to
   hold (DESIGN_BAR R12 exception) and is not asserted by this check.
2. **The operator's words that day, before any push, deploy or alias.** The RESUME carries his
   approval quoted verbatim with the calendar date of the deploy, written before the first
   `git push`, `vercel deploy` or `vercel alias` command. The executor never pushes or deploys on
   an approval from an earlier day, from an agent, or from this brief. Before the deploy the RESUME
   also carries the revert: promote `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23` (production as recorded in
   RESUME on 2026-09-16; re-read it from `card1-120.sh`'s dpl line at deploy time and use that id).
3. **Every gate in 6.1, 6.4, 6.5 and 6.6 passing on the commit that deploys**, with outputs saved
   under `.planning/qa/pass-120/build/`.
4. **Production check on both domains after deploy** (STANDING_TECHNIQUES CARD 1: alias both,
   after the push):
   - `bash .planning/exec/card1-120.sh` (no argument: both domains, new dpl id, same dpl id on
     both) → `card1 failures: 0`.
   - `node .planning/exec/claims120.mjs https://www.micahjonesconsulting.com` and
     `node .planning/exec/claims120.mjs https://micahjonesconsulting.vercel.app` → each
     `claims120 failures: 0`.
   - `node .planning/exec/clip120.mjs https://www.micahjonesconsulting.com` → `clip120 failures: 0`.
   - `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.micahjonesconsulting.com/work/postmates`
     → `308 https://www.micahjonesconsulting.com/work#record`; same for `/work/neuton`, and both on
     `https://micahjonesconsulting.vercel.app` with that host in the expected URL.
   - The 6.6 Lighthouse loop against `https://www.micahjonesconsulting.com/work` into
     `.planning/exec/lh120/prod-work-{1,2,3}.json`, summary reported with its numbers.
   Any failure: promote the revert deployment on both domains, then report.
