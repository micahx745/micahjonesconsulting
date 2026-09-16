# Pass-120 facet map: the content model

Read-only survey of the current frontmatter schema, its validators, its consumers, and the gap
between what exists today and what Direction B (FABLE-120-DESIGN.md, recommended, §3 + §7) needs.
Every claim below carries file:line and verbatim current text.

---

## 1. The schema files

### `lib/case-study-schema.ts` — the Zod source of truth (39 lines of comment + schema, 106 total)

`caseStudyFrontmatterSchema` (`lib/case-study-schema.ts:37-104`), exported type
`CaseStudyFrontmatter` (`lib/case-study-schema.ts:106`).

| Field | Line(s) | Zod type | Required? | Notes |
|---|---|---|---|---|
| `title` | `case-study-schema.ts:39` | `z.string().min(1)` | **required** | "Display title rendered in the page `<title>` + chrome" (comment `case-study-schema.ts:38`) |
| `dek` | `case-study-schema.ts:42` | `z.string().min(1)` | **required** | "Source Serif 4 italic subtitle below the TitleCard" (comment `:41`) — comment is stale; Source Serif 4 was removed from the font system (see §5 below) |
| `role` | `case-study-schema.ts:45` | `z.string().min(1)` | **required** | |
| `tools` | `case-study-schema.ts:48` | `z.array(z.string().min(1)).min(1)` | **required** | at least one entry |
| `year` | `case-study-schema.ts:51` | `z.union([z.string().min(1), z.number().int()])` | **required** | string allows ranges ("2025-2026") |
| `status` | `case-study-schema.ts:54` | `z.enum(CASE_STUDY_STATUSES)` | **required** | enum defined `case-study-schema.ts:29-34`: `shipped \| in-flight \| archived \| stub` |
| `titleCardWords` | `case-study-schema.ts:57-60` | `z.array(z.string().min(1)).min(3).max(6)` | **required** | 3–6 words for the pinned vertical stack — **Direction B retires this** (design doc §2, §7: "TitleCard settle... `titleCardWords` removed from the frontmatter schema and the Zod validator") |
| `heroStill` | `case-study-schema.ts:63` | `z.string().optional()` | optional | path to hero still |
| `client` | `case-study-schema.ts:66` | `z.string().optional()` | optional | "Omit if solo" |
| `indexLine` | `case-study-schema.ts:72` | `z.string().optional()` | optional | added later ("W3 (P1-5/R11)" comment `:68-71`); "the ONE figure-bearing line for index surfaces... falls back to the dek's first sentence" |
| `stats` | `case-study-schema.ts:77-85` | `z.array(z.object({fig: z.string().min(1), lbl: z.string().min(1)})).max(3).optional()` | optional | "Pass-58"; up to 3 `{fig, lbl}` pairs |
| `order` | `case-study-schema.ts:92` | `z.number().int().positive().optional()` | optional | "Pass-61"; hand-set /work index position, ascending; unset sorts last |
| `feature` | `case-study-schema.ts:98-103` | `z.object({fig: z.string().min(1), line: z.string().min(1)}).optional()` | optional | "Pass-61"; only the study with `order: 1` uses it — the /work hero lot |

No `email`, `service`, `atAGlance`, `results`, or `publishDate`-shaped field exists anywhere in
this schema today.

### `lib/title-card-schema.ts` — the `<TitleCard>` component prop schema (32 lines)

`titleCardSchema` (`lib/title-card-schema.ts:16-31`), type `TitleCardProps` (`:33`). This is a
**separate** schema from the frontmatter one, imported and `.parse()`d at render time in
`app/(theater)/work/[slug]/page.tsx:198-204` (see §3). Fields:

- `words` — `z.array(z.string().min(1)).min(3).max(6)` (`title-card-schema.ts:18-21`) — fed from
  `cs.titleCardWords` (page.tsx:200)
- `caption` — `z.string().min(1)` (`:24`) — fed from `cs.indexLine ?? cs.dek.split(". ")[0] + "."`
  (page.tsx:201)
- `heroSrc` — `z.string().optional()` (`:27`) — fed from `cs.heroStill` (page.tsx:202)
- `heroAlt` — `z.string().optional()` (`:30`) — fed from `cs.title` (page.tsx:203)

Both schemas import nothing from each other; they happen to share the 3–6 bound by hand-written
duplication, not a shared const. If Direction B's frontmatter change retires `titleCardWords`,
`title-card-schema.ts`'s `words` field either goes with it or the settle-entrance component takes
a differently-shaped prop — this file is in scope for the same brief.

### `lib/case-studies.ts` — the reader (152 lines)

`getAllCaseStudies()` (`:42-103`) reads every `content/work/*.mdx` via `readdir`/`readFile`
(`:46,56`), parses frontmatter with `gray-matter` (`:58`), and **throws** on
`caseStudyFrontmatterSchema.safeParse` failure (`:60-68`) — the error lists every Zod issue with
its path (`:62-64`). Sort (`:87-102`): explicit `order` wins over everything
(`:88-89`); otherwise `status` rank (shipped=0, in-flight=1, archived=2, stub=3, `:73-78`) then
`year` descending, parsed via regex fallback for range strings (`:93-100`).

- `getSelectedWork(limit = 3)` (`:109-112`) — filters `status !== "stub"`, slices to `limit`. Not
  called anywhere in `app/` or `components/` today (grep found zero call sites outside this file
  — see §4, "consumers of the reader functions").
- `getCaseStudyBySlug(slug)` (`:120-128`) — returns `null` for unknown slug or `status === "stub"`.
- `getNextCaseStudy(slug)` (`:144-152`) — excludes stubs, wraps to index 0.

---

## 2. `mdx-components.tsx` (repo root, 44 lines)

Required at repo root per Next.js App-Router MDX convention (moving it into `app/` is a silent
render failure — stated in its own header comment `mdx-components.tsx:4-6` and repeated in
`.claude/CLAUDE.md` "What not to do"). `useMDXComponents()` (`:35-43`) maps five names available
inside every `content/work/*.mdx` body with no import statement:

| MDX tag | Component | Import line |
|---|---|---|
| `<TitleCard>` | `components/TitleCard.tsx` | `mdx-components.tsx:29` |
| `<Dek>` | `components/Dek.tsx` | `:30` |
| `<CaseStudyStill>` | `components/CaseStudyStill.tsx` | `:31` |
| `<PullQuote>` | `components/PullQuote.tsx` | `:32` |
| `<CopperRule>` | `components/CopperRule.tsx` | `:33` |

No default-HTML-primitive remaps (h1/h2/p/blockquote aren't overridden here; per the file's own
comment `:24-27` that's deliberate — theater CSS in `app/globals.css` styles the raw MDX headings
by attribute selector).

**Direction B implication:** none of these five names is itself frontmatter-driven, so a body-side
change (e.g. an RFP "worked example" two-column block, design doc §2/§7) is a new component to add
to this map, not a schema change.

---

## 3. `content/citations.ts` (98 lines) — and how ORDANI's CDC figures actually render

Two entries under `CITATIONS` (`content/citations.ts:10-98`): `EXITS_COMBINED_VALUE` (`:14-83`)
and `ORDANI_CDC_2024` (`:84-97`).

`ORDANI_CDC_2024` (`:84-97`) carries `quotedStatistics` (`:91-95`: the 44.8/100k, 14.2/100k,
~3.15x figures) and `citedIn: ["content/work/ordani.mdx (Why it matters)"]` (`:96`).

**Finding — the citation object is NOT wired to the page that cites it.** `content/work/ordani.mdx:43`
contains the CDC figures as **literal prose**:

> "non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births. That is 3.15
> times the rate of non-Hispanic white women (14.2), per the CDC's..."

A repo-wide grep for `ORDANI_CDC_2024` and `CITATIONS.` (outside `citations.ts` itself) turns up
**zero** import or reference in `content/work/ordani.mdx`, any `app/` file, or any `components/`
file. The only live consumer of the `CITATIONS` object anywhere in the codebase is
`components/color-worlds/ExitRecord.tsx:3` (`const EXITS = CITATIONS.EXITS_COMBINED_VALUE;`),
which reads the *other* entry (`EXITS_COMBINED_VALUE.DEALS`, `:41-78`) for the home-page exit
record. So:

- `EXITS_COMBINED_VALUE` — genuinely rendered from the citations object (`ExitRecord.tsx`).
- `ORDANI_CDC_2024` — exists only as a documentation/citation record. The MDX body does not import
  it; the numbers are typed twice (once in the citation object, once as prose) with nothing
  enforcing they stay in sync. **This contradicts `.claude/CLAUDE.md`'s "Content" section**
  ("Numbers in case studies render from this object, NOT as literals in prose (Pitfall E2)") for
  this specific figure — the rule is true for the exits count, not for the CDC stat. Pass-120's
  brief should either wire ORDANI's body to read `CITATIONS.ORDANI_CDC_2024.quotedStatistics`
  (or a derived field) or correct the CLAUDE.md claim; right now neither the schema nor any
  component enforces Pitfall E2 for this entry.

---

## 4. Every consumer of every frontmatter field, file:line

Grepped across `app/`, `components/`, `lib/` for each of: `titleCardWords`, `indexLine`, `stats`,
`feature`, `year`, `order`, `status`, `dek`, `role`, `tools`, `client`, `heroStill`, `title`.

### `title`
- `app/(theater)/work/[slug]/page.tsx:87` — `const title = cs.title;` → passed to `generateMetadata`'s return (`:92`, page `<title>`)
- `app/(theater)/work/[slug]/page.tsx:96` — OG `title: \`${cs.title} — Micah Jones\``
- `app/(theater)/work/[slug]/page.tsx:104` — Twitter `title:` same pattern
- `app/(theater)/work/[slug]/page.tsx:143` — JSON-LD `headline: cs.title`
- `app/(theater)/work/[slug]/page.tsx:180` — `<h1 className="sr-only">{cs.title}</h1>` (a11y doc outline; TitleCard word-stack spans are decorative)
- `app/(theater)/work/[slug]/page.tsx:203` — `heroAlt: cs.title` (fed into `titleCardSchema.parse`)
- `app/(theater)/work/[slug]/page.tsx:259` — `alt={\`${cs.title} — hero still\`}` on `<CaseStudyStill>`
- `app/(foyer)/work/page.tsx:93` — lead-lot fallback: `lead.feature?.fig ?? lead.stats?.[0]?.fig ?? lead.title`
- `app/(foyer)/work/page.tsx:102` — lead lot `<span>{lead.title}</span>` in the provenance line
- `app/(foyer)/work/page.tsx:145` — rest-of-record `<h3 className="cw-wk-item__title">{s.title}</h3>`

### `dek`
- `app/(theater)/work/[slug]/page.tsx:58-66` — `clampDescription(dek)` helper: ≤155 chars verbatim, else sentence-boundary cut at ≥100 chars, else word-boundary cut + ellipsis (never mid-word — comment `:55-57` cites a live SERP bug from a prior slice cut)
- `app/(theater)/work/[slug]/page.tsx:88` — `const description = clampDescription(cs.dek);`
- `app/(theater)/work/[slug]/page.tsx:144` — JSON-LD `description: cs.dek` (full, unclamped)
- `app/(theater)/work/[slug]/page.tsx:201` — TitleCard `caption: cs.indexLine ?? \`${cs.dek.split(". ")[0]}.\`` (dek used only as the fallback when `indexLine` is absent)
- `app/(theater)/work/[slug]/opengraph-image.tsx:40` — OG `caption = cs ? \`${cs.dek.split(". ")[0]}.\` : FALLBACK.caption`
- `app/(foyer)/work/page.tsx:96` — lead lot: `lead.feature?.line ?? lead.indexLine ?? lead.dek` (dek is the third fallback)
- `app/(foyer)/work/page.tsx:147` — rest-of-record: `s.indexLine ?? \`${s.dek.split(". ")[0]}.\`` (dek first-sentence is the fallback when no `indexLine`)

### `role`
- `app/(theater)/work/[slug]/page.tsx:243` — mobile/no-JS meta-fallback `<span className="case-study__role">{cs.role}</span>`
- `app/(theater)/work/[slug]/page.tsx:274` — `<CaseStudySidebar role={cs.role} tools={cs.tools} year={cs.year} />`
- `components/CaseStudySidebar.tsx:36,60,212` — prop type, destructure, `<dd>{role}</dd>`
- `app/(foyer)/work/page.tsx:104` — lead lot provenance line `<span>{lead.role}</span>`
- `app/(foyer)/work/page.tsx:150` — rest-of-record meta `<span>{s.role}</span>`

### `tools`
- `app/(theater)/work/[slug]/page.tsx:247` — meta-fallback `<span className="case-study__tools">{cs.tools.join(", ")}</span>`
- `app/(theater)/work/[slug]/page.tsx:274` — passed to `<CaseStudySidebar>`
- `components/CaseStudySidebar.tsx:37,60,216,219` — prop type `readonly string[] | string[]`, `<dd>{tools.join(", ")}</dd>` (comment `:216` notes label wording may differ from the key name)
- **Not used anywhere on `/work` index** (`app/(foyer)/work/page.tsx` never reads `.tools`).

### `year`
- `app/(theater)/work/[slug]/page.tsx:134,139` — `yearStr`/`startYear` extraction (regex `\d{4}` match, falls back to raw string) feeding JSON-LD `datePublished` (`:145`)
- `app/(theater)/work/[slug]/page.tsx:251` — visible `<span className="case-study__year">{cs.year}</span>`
- `app/(theater)/work/[slug]/page.tsx:260` — `<CaseStudyStill date={...cs.year...}>`
- `app/(theater)/work/[slug]/page.tsx:274` — passed to `<CaseStudySidebar year={cs.year}>`
- `components/CaseStudySidebar.tsx` — rendered as `<dd>` (meta line)
- `app/(foyer)/work/page.tsx:106` — lead lot `<span>{lead.year}</span>`
- `app/(foyer)/work/page.tsx:152` — rest-of-record `<span className="cw-nowrap">{s.year}</span>`
- `lib/case-studies.ts:93-100` — sort key (year-descending) when no explicit `order`

**Design-doc conflict:** FABLE-120-DESIGN.md is explicit — "No stat trios, no `read the case
study` link duplicated... no years of any kind" (index entries, §2) and "NO tenure years anywhere"
/ "year never rendered" (§7: "Frontmatter for the new spine... `year` never rendered"). Every
`year` render site listed above is a **live consumer that Pass-120 must remove or repurpose**:
5 render sites on the study page (`:251`, `:260`, sidebar `dd`, meta-fallback via role/tools/year
line `:242-252`) + 2 on `/work` (`:106`, `:152`), plus the sort dependency in `lib/case-studies.ts`
(which can keep using year internally for the record-block year even if it stops rendering
per-study, since the four-row record block explicitly DOES show exit years — draft
`four-studies-DRAFT.md:214-219` table columns are Company/Role/What happened, with the year folded
into the "what happened" text, e.g. "IPO, 2018" — not a separate rendered `year` field). JSON-LD
`datePublished` (`:145`) is a `<script>` payload, not visible text, so it is not in conflict with
"no years render" in the visible-page sense, but it currently derives from the same `year` field
the brief plans to stop showing — see §6 "hidden publish date" below.

### `status`
- `lib/case-studies.ts:73-78,91` — sort rank
- `lib/case-studies.ts:111` — `getSelectedWork` filters `!== "stub"`
- `lib/case-studies.ts:126` — `getCaseStudyBySlug` returns `null` for `"stub"`
- `lib/case-studies.ts:147` — `getNextCaseStudy` filters `!== "stub"`
- `app/(foyer)/work/page.tsx:67` — index page filters `!== "stub"`
- `app/(theater)/work/[slug]/page.tsx:43` — `generateStaticParams` filters `!== "stub"`
- `app/sitemap.ts:97` — filters `!== "stub"` before mapping to sitemap entries

### `client`
- `app/(theater)/work/[slug]/opengraph-image.tsx:104` — `{(cs?.client ?? "CASE STUDY").toUpperCase()}` (OG eyebrow line)
- **Not rendered anywhere on the study page itself or on `/work`** — the only live consumer of
  `client` today is the OG image. The design doc's `client` (string or `"Name protected"`) at-a-
  glance row (§7) is a **new render site**, not a wiring of an existing one.

### `heroStill`
- `app/(theater)/work/[slug]/page.tsx:202` — `heroSrc: cs.heroStill` (fed into TitleCard)
- `app/(theater)/work/[slug]/page.tsx:256-261` — conditional `<CaseStudyStill src={cs.heroStill} ...>` render, gated on truthiness

### `titleCardWords`
- `app/(theater)/work/[slug]/opengraph-image.tsx:37` — `const words = cs?.titleCardWords ?? FALLBACK.words;`
- `app/(theater)/work/[slug]/page.tsx:200` — `words: cs.titleCardWords` (fed into `titleCardSchema.parse`)
- No other consumer. Retiring it (Direction B) touches exactly these 2 call sites plus the two
  schema files (`lib/case-study-schema.ts:57-60`, `lib/title-card-schema.ts:18-21`) plus every
  `content/work/*.mdx` frontmatter block (all 7 files currently declare it — `content/work/*.mdx`
  frontmatter, confirmed by reading `ordani.mdx`, `postmates.mdx`, `neuton.mdx`, `passioneer.mdx`
  above; `guardicore.mdx`, `content-engine.mdx`, `rfp-engine.mdx` not individually quoted here but
  match the same required-field shape or the build already throws per `case-studies.ts:65-67`).

### `indexLine`
- `app/(foyer)/work/page.tsx:96` — lead lot: `lead.feature?.line ?? lead.indexLine ?? lead.dek`
- `app/(foyer)/work/page.tsx:147` — rest-of-record: `s.indexLine ?? \`${s.dek.split(". ")[0]}.\``
- `app/(theater)/work/[slug]/page.tsx:201` — study-page TitleCard caption: `cs.indexLine ?? \`${cs.dek.split(". ")[0]}.\``

### `stats`
- `app/(foyer)/work/page.tsx:93` — lead lot fig fallback chain (third priority after `feature.fig`)
- `app/(foyer)/work/page.tsx:158-166` — rest-of-record: conditional `<ul className="cw-wk-stats">` per entry, mapped `{fig, lbl}` pairs
- `app/(theater)/work/[slug]/page.tsx:219-233` — study page "Outcome at a glance" section: conditional `<section aria-label="Outcome at a glance">`, mapped `<li><strong>{fig}</strong><span>{lbl}</span></li>`

**Design-doc conflict:** §2 says "No stat trios... " for **index** entries specifically (the
`/work` list items), replacing them with the 4-point shape (context/figure-line/what-he-did/
service). It does NOT ban `stats` on the **study page** itself — in fact §7's `atAGlance` rows and
a `results` value look like a renamed/reshaped superset of the existing `stats` array plus
`indexLine`, scoped to the study page's at-a-glance definition list (design doc §2: "the
`Results` value in at-a-glance" at 36px). So `stats` as it exists today is a likely deletion
target on `/work` (both lead lot and rest-of-record) and a likely rename/reshape target on the
study page.

### `feature`
- `app/(foyer)/work/page.tsx:93,96` — lead-lot-only fig/line, first-priority fallback in both
  chains. Only the `order: 1` study uses it (per schema comment `case-study-schema.ts:96`).
- No other consumer. Direction B's /work hero (§2, §7) keeps a hero-scale lead entry in the same
  fig+line shape, so `feature` likely survives, possibly renamed to align with the new `results`/
  `atAGlance` naming — the brief should say explicitly whether it is kept, renamed, or merged into
  `results`.

### `order`
- `lib/case-studies.ts:88-89` — sort key, wins over status/year when set on either side of a
  comparison
- No render consumer — purely a sort directive.

---

## 5. Other places case-study content surfaces (OG, sitemap, llms.txt, JSON-LD — exhaustive)

- **OG image** — `app/(theater)/work/[slug]/opengraph-image.tsx` (full file read). Consumes
  `titleCardWords` (`:37`), `dek` (`:40`), `client` (`:104`). Hardcoded hex tokens
  (`GROUND`/`INK`/`INK_SOFT`/`SAFFRON`, `:44-47`) because Satori can't resolve CSS variables
  (comment `:10-15`) — these are a second, undocumented-in-brand.json color set ("espresso ground
  + bone ink + saffron eyebrow", header comment `:4-5`) that exists only for this one file.
- **Sitemap** — `app/sitemap.ts` (full file read). Imports `getAllCaseStudies` (`:24`), filters
  `status !== "stub"` (`:97`), maps each to `{url, lastModified: now, changeFrequency: "yearly",
  priority: 0.7}` (`:99-104`). **`lastModified` is always `new Date()` at build time for every
  study** (`:29,101`) — no frontmatter field sets it; there is no per-study last-modified or
  publish-date value anywhere in the schema.
- **`llms.txt`** — `app/llms.txt/route.ts` (full file read). Entirely hand-written static template
  string (`:15-48`). Lists four case studies by hardcoded markdown links + hand-typed one-line
  descriptions (`:40-43`: ordani, guardicore, content-engine, rfp-engine) — **does not import
  `lib/case-studies.ts` or read frontmatter at all**. Postmates and Neuton are not listed here
  today, so their retirement doesn't require an `llms.txt` edit, but this file will silently drift
  from whatever the new spine's five/four studies actually say unless Pass-120's brief either
  wires it to the data or hand-edits it as a copy task.
- **JSON-LD** — only on the study page (`app/(theater)/work/[slug]/page.tsx:128-160`, quoted
  above). `@type: "Article"`; fields: `headline` (`title`), `description` (`dek`, unclamped),
  `datePublished` (`year`, first 4-digit token via regex `:139`), `author`/`publisher` both a
  hardcoded `Person` "Micah Jones" object (`:146-155`, not frontmatter-driven), `mainEntityOfPage`
  (`:156-159`, built from `slug`). No JSON-LD exists on `/work` itself.
- **No RSS/Atom feed file exists** (no `app/**/feed.xml`, `app/**/rss` route found).

---

## 6. Fields the new spine needs that do not exist today

Per FABLE-120-DESIGN.md §7 ("Frontmatter for the new spine") plus the cross-checks above:

1. **`client` reshaped to allow `"Name protected"` as a real, renderable value** — the field
   already exists (`case-study-schema.ts:66`, optional `z.string()`) and already accepts any
   string, so `"Name protected"` fits the current type with zero schema change. What's new is a
   **render site**: today `client` renders nowhere but the OG image (§4 above); the design doc
   wants it in a visible at-a-glance row on the study page. This is a template/consumer change,
   not a schema change — but every currently-`client`-less study (the three drafted new/anonymous
   ones, per `.planning/drafts/pass-120/*-DRAFT.md`) will need to set `client: "Name protected"`
   explicitly for that row to read correctly, rather than leaving it `undefined` and depending on
   a fallback string baked into the component (worth deciding: schema-level default vs.
   component-level fallback vs. required-when-status-is-X).

2. **`atAGlance` — genuinely new.** No field carries a labeled 4-row definition-list shape today.
   Closest existing analog is `stats` (`{fig, lbl}` pairs, max 3, no labels beyond `lbl`) — the
   design doc's at-a-glance block (§2: "four-row definition list (mono keys, Hanken values, the
   `Results` value at 36)") wants named keys (e.g. "Client", "My role", "The work", "Results" —
   matching the drafts' own "At a glance" headings, e.g. `birth-worker-DRAFT.md:38-44`: Client /
   My role / The work / Results). This does not exist in `case-study-schema.ts` in any form.

3. **`results` — genuinely new, or a rename of one `atAGlance` row.** Design doc calls out "the
   `Results` value in at-a-glance" (§2) as its own typographic tier (36px), distinct from the
   other at-a-glance rows — worth deciding whether it's a top-level `results: string` field or
   just the `atAGlance` row whose key is literally `"Results"`.

4. **`service` (slug) for the close — genuinely new.** No field points a study's closing CTA to a
   specific `/services` block/anchor today; the current close is hand-written prose per MDX body
   with a manually typed link (confirmed by absence of any such field in `case-study-schema.ts`).
   Design doc §6 Q7 flags this is still an open operator question ("should the link land on the
   block anchor or on /contact with the block named?") — the field's exact value space (a slug
   string like `"ai-engineering"` vs. a full href) is undecided pending that answer.

5. **`hero` optional — likely a rename of `heroStill`, not a new concept.** Design doc §7 writes
   "`hero` optional" in the same sentence as `client`/`atAGlance`/`results`/`service`. The schema
   already has `heroStill` (`:63`) serving exactly this role (path to a hero image, optional). This
   reads as a naming/shape simplification (`hero` vs `heroStill`) rather than new functionality —
   worth confirming with the operator/brief whether it is a straight rename (2 render-site edits,
   §4 above) or intended to carry more (e.g. `{src, alt}` object instead of a bare path string).
   Note also that `.claude/CLAUDE.md`'s own "Content" section already documents the field as
   `hero?` (not `heroStill`) — the project's own memory doc is already out of sync with the live
   schema on this exact field name, which the Pass-120 brief should correct in one direction or
   the other.

6. **A hidden publish date — genuinely new.** No field in the schema carries an actual ISO date or
   ships a stable "when this was published" value. Today:
   - `year` (visible, required) doubles as the JSON-LD `datePublished` source, via a lossy regex
     that extracts the first 4-digit token from a possibly-range string (`page.tsx:134-139`).
   - `sitemap.ts:101` sets `lastModified: now` for every study on every build — never a real
     per-study value.
   Since Direction B retires `year` from every visible render (§2, §7: "year never rendered"),
   `datePublished` in JSON-LD would otherwise silently start reading a field the page no longer
   shows, decoupling the schema's only remaining source of a date from the page's visible content
   entirely (a reader could see no date, but view-source would show one, sourced from the same
   `year` field that also feeds the record-block row text like "IPO, 2018" — still consistent
   today, but fragile once `year` stops being a directly-rendered, directly-checked field). A
   dedicated hidden field (e.g. `publishedAt: string` in strict ISO form, not rendered, feeding
   only `datePublished` and optionally `sitemap.ts`'s `lastModified`) would separate "the date a
   crawler is told" from "the year folded into record-block/at-a-glance prose," and is the kind of
   field the design doc's "Frontmatter for the new spine" line implicitly needs but does not name
   outright — flagged here as a gap the brief should close explicitly rather than let JSON-LD
   silently keep reading a field the page no longer shows.

---

## 7. Existing fields that would break a consumer if removed

Checked every field against §4's consumer table for anything with exactly one consumer whose
removal-without-replacement would break a render path (not just "this field becomes unused," which
is fine, but "code still calls `.field` and gets `undefined` where a non-optional read was
assumed"):

- **`titleCardWords`** — required (min 3). Both consumers (`opengraph-image.tsx:37`,
  `page.tsx:200`) have safe fallbacks or a Zod `.parse()` that would throw on `undefined`
  (`title-card-schema.ts:18-21` requires min 3 non-empty strings) — so simply deleting the field
  from `content/work/*.mdx` without also editing `page.tsx:198-205` and
  `opengraph-image.tsx:30-41` would **throw at render** (Zod parse failure) rather than degrade
  gracefully. This is exactly why design doc §7 lists it as a named brief item ("`titleCardWords`
  removed from the frontmatter schema and the Zod validator") — both schema files and both call
  sites must move together.
- **`dek`** — required, and is the *fallback* for `indexLine` in three places (`page.tsx:201`,
  `opengraph-image.tsx:40`, `work/page.tsx:96,147`) and the *sole* source for the SEO/OG/Twitter/
  JSON-LD description (`page.tsx:88,144`, `opengraph-image.tsx` caption). It cannot be dropped even
  if the visible on-page dek line is redesigned away, because `clampDescription` (`page.tsx:58-66`)
  and the JSON-LD `description` field read it directly with no fallback chain of their own.
- **`role` / `tools` / `year`** — all three are passed as required (non-optional) props into
  `<CaseStudySidebar role={cs.role} tools={cs.tools} year={cs.year} />` (`page.tsx:274`,
  `CaseStudySidebar.tsx:36-38` typed as non-optional `string`/`string[]`/`string|number`). Design
  doc §2 kills the sticky rail entirely ("No sticky rail on studies... the rail today exists
  mostly to print `Role / Scope / Year`, which the at-a-glance block now carries") — so
  `<CaseStudySidebar>` itself is slated for removal, and `role`/`tools`/`year` dropping out of that
  one call site is expected and safe **only if the sidebar component's import/usage is deleted in
  the same change**; leaving the import while removing the frontmatter fields would break the
  `page.tsx:274` call with TypeScript errors (non-optional props). `role` and `tools` still have
  the meta-fallback render (`page.tsx:242-252`) and `year` still feeds JSON-LD `datePublished`
  (`:134-145`) and the record-block year text — so none of the three can be deleted from the
  schema outright even after the sidebar goes; they're consumed elsewhere too (see §4/§6).
- **`stats`** — optional, every consumer already null-checks (`s.stats && s.stats.length > 0`,
  `work/page.tsx:158`, `page.tsx:219`). Safe to drop from the schema with no crash; the three
  render sites (§4) would just need to be deleted in the same brief, or the field repurposed into
  `atAGlance`/`results` as discussed in §6.
- **`feature`** — optional, both consumers use `?.` optional chaining (`work/page.tsx:93,96`).
  Safe to remove without a crash, but the lead-lot hero would silently fall back to
  `stats?.[0]?.fig ?? title` / `indexLine ?? dek` — likely not the intended Direction B hero
  shape, so this is a "won't crash but will silently regress visually" case, not a safe no-op.
- **`indexLine`** — optional with dek-derived fallbacks everywhere it's read (§4). Safe to remove
  without a crash; every call site already degrades to `dek.split(". ")[0]`.
- **`order`** — optional, `lib/case-studies.ts:88-89` checks `!== undefined` on both sides before
  using it. Safe to remove without a crash (sort falls back to status+year).
- **`client`** — optional, only consumer already null-coalesces (`cs?.client ?? "CASE STUDY"`,
  `opengraph-image.tsx:104`). Safe to remove without a crash.
- **`heroStill`** — optional, both consumers are conditional (`cs.heroStill ?` gate at
  `page.tsx:256`; `heroSrc: cs.heroStill` is itself an optional prop on `titleCardSchema`). Safe.

**Summary: the only field whose removal requires a coordinated multi-file edit to avoid a hard
throw is `titleCardWords`** (via the `title-card-schema.ts` Zod `.parse()` call), which the design
doc already flags explicitly. Every other existing optional field degrades gracefully; every
required field besides `titleCardWords` (`title`, `dek`, `role`, `tools`, `year`, `status`) is
still read by at least one consumer that Direction B does not plan to remove (JSON-LD, metadata,
meta-fallback line, or the sort), so none of them can be silently dropped from the schema without
also editing every read site listed in §4.
