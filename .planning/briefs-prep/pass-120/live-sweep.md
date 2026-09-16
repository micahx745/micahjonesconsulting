# Pass-120 live claims sweep

Facet brief for Pass-120 (`/work` rebuild + case-study rebuild, Direction B per
`.planning/reviews/FABLE-120-DESIGN.md`). Read-only sweep of everything that renders in
`app/`, `components/`, `content/`, `lib/` (excluding `lib/book-pdf.ts`, and `lib/companion-zip.ts`
which was also excluded — both carry long embedded binary/base64 lines that make naive greps
balloon; neither file renders site copy). Every row below is a live grep hit, quoted verbatim,
against this worktree as of 2026-09-16. Source rulings: `.planning/reviews/FABLE-120-CRAFT.md`
"Live drift" table, and `docs/LESSONS_LEARNED.md` #3 rows dated 2026-09-15/09-16 plus #32.

Nothing here has been changed. This is the map for whoever writes the Pass-120 execution brief.

---

## 1. Items already on Fable's "Live drift" table — re-verified, with the ruling quoted

| # | File:line | Current text (verbatim) | Must become | Ruling |
|---|---|---|---|---|
| 1 | `app/(foyer)/about/page.tsx:174-176` | `<strong>GTM systems that compound.</strong> For one industry author, a content engine took monthly reach from 8,000 to 290,000 in five months. The RFP software I built for the same author doubled their close rate inside six months.` | Fable's proposed replacement: "For a social activist, a content engine took monthly impressions to a peak of 800,000. For an award-winning author and leadership consultant, RFP software doubled their close rate inside six months." | LESSONS #3 "TWO CLIENTS, NOT ONE" (2026-09-15, verbatim: "well i want to split it up since its two separate contracts... social activist... award winning author/ Leadership consultant") + "THE 290K REACH FIGURE IS UNVERIFIED" (2026-09-15: "Technically it got up to 800,000 impressions"). |
| 2 | `app/(foyer)/services/page.tsx:120` | `text: "An industry author: I built the content engine that took their monthly reach from 8,000 to 290,000 in five months.",` | "A social activist: I built the AI content engine that turns one rough video into a week of content. Monthly impressions peaked at 800,000." | Same two rulings as #1. |
| 3 | `app/(foyer)/page.tsx:399` | `Industry author` (content-engine ledger row, "How I work" §02) | `Social activist` | TWO CLIENTS ruling. |
| 4 | `app/(foyer)/page.tsx:406` | `Monthly reach <strong>8K → 290K</strong> in five months` | `Monthly impressions <strong>up to 800K</strong>` | 290K-unverified ruling. |
| 5 | `app/(foyer)/page.tsx:401-402` | `Content engine ·{" "}<span className="cw-nowrap">2024–2025</span>` | `Content engine` (drop the year span entirely) | LESSONS #3 "NO PERSONAL YEARS ON ANY SURFACE" (2026-09-15) + "YEAR FIELDS" (2026-09-16: "Keep a date behind the scenes, show none... No year renders beside a role on any surface"). |
| 6 | `app/(foyer)/page.tsx:419-421` | `Industry author` / `RFP engine · <span className="cw-nowrap">2024–2025</span>` | `Author and leadership consultant` / `RFP engine` (no year) | TWO CLIENTS + NO PERSONAL YEARS. |
| 7 | `app/(foyer)/page.tsx:380-381` | `Founder, sole engineer ·{" "}<span className="cw-nowrap">2025–2026</span>` | `Founder, sole engineer` (no year) | NO PERSONAL YEARS / YEAR FIELDS. |
| 8 | `app/(foyer)/work/page.tsx:52` (metadata.description) and `:57` (openGraph.description, identical string) | `"Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author."` | "...and an AI content engine for a social activist." | TWO CLIENTS + 290K-unverified (36× is derived from the retired 290K figure). |
| 9 | `app/(foyer)/work/page.tsx:122` | `<figcaption>Working session · Tel Aviv · 2018-2021</figcaption>` | `Working session · Tel Aviv` (no year) | NO PERSONAL YEARS, names this exact caption verbatim: "the Tel Aviv photo caption '2018-2021'". |
| 10 | `app/llms.txt/route.ts:42` | `- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): an AI content engine plus algorithm strategy for an industry author; monthly reach 8,000 to 290,000 in five months` | "...for a social activist; monthly impressions up to 800,000" | TWO CLIENTS + 290K-unverified. |
| 11 | `content/work/guardicore.mdx:10` | `year: 2018–2021` | Per the 2026-09-16 YEAR FIELDS ruling this SUPERSEDES Fable's own proposed "year: 2021": keep a date behind the scenes for sort/JSON-LD only; no visible surface may show it (see §2 below — this value is what four separate templates currently render). | YEAR FIELDS (2026-09-16) answers Fable's own open question 6. |
| 12 | `content/work/content-engine.mdx:9,17,19,48` | `year: "2024-2025"`; `indexLine: "Monthly reach grew from 8,000 to 290,000 in five months: a 36× lift, on less money and fewer hours."`; `- fig: "36×"`; body line 48 "Monthly reach grew from 8,000 to 290,000 in five months, a 36× lift... A 25-page playbook sits with the author's content lead..." | Rewritten wholesale by the approved Pass-120 draft (`.planning/drafts/pass-120/`); year per YEAR FIELDS ruling (date behind the scenes, none shown). | TWO CLIENTS, 290K-unverified, YEAR FIELDS. "Playbook" is also a retired word (LESSONS "book is not mentioned" ban, 2026-09-11) — Fable's craft item 14 flags this same line. |
| 13 | `content/work/rfp-engine.mdx:10` | `year: 2024-2025` | Date behind the scenes only, per YEAR FIELDS. | YEAR FIELDS. |
| 14 | `content/work/ordani.mdx:10,56-57` | `year: 2025-2026`; line 56 `**04. I shipped to a closed beta of fourteen practitioners first.**`; line 57 `Free for the first year in exchange for weekly feedback calls. Six months in, eight were active every week, six had referred a peer, and none had left for a competitor. That beta is where today's paying practitioners started.` | `year:` per YEAR FIELDS (date only, not shown); step 04 and its counts come out entirely — no count of users or practices anywhere on Ordani surfaces. | LESSONS #3 "ORDANI CARRIES NO COUNTS AT ALL" (2026-09-15, verbatim: "Yeah lets not number how many users or paying collectives. Keep it broad." — explicitly extends to "fourteen practitioners", "eight active every week, six had referred a peer"). |
| 15 | `content/work/postmates.mdx:40` | `Postmates is one of four companies I worked inside that reached an exit.` | Page retires; 301s to `/work#record`. If the record block ships this sentence, cut it — Fable's own note. | FABLE-120-DESIGN (retirement) + FABLE-120-CRAFT build note. |
| 16 | `content/work/neuton.mdx:3,18,23,35` | dek: "...positioning its product for buyers here **in 2020**."; indexLine: "Helped launch through North American positioning **in 2020**..."; body: "I joined Neuton.AI **in 2020**, in the early days of AI products."; line 35: "...Neuton.AI **is one of four companies I worked inside that reached an exit**." | Page retires; 301s to `/work#record`. All four "in 2020" instances and the "one of four" sentence come out if the block ever ships this study's row. | NO PERSONAL YEARS (2020 here is when he joined/positioned — a personal tenure year, not the 2025 acquisition event year) + retirement note. |
| 17 | `app/(foyer)/about/page.tsx:105`; `app/(foyer)/page.tsx:81,86,95`; `app/layout.tsx:32,68`; `app/llms.txt/route.ts:17` | `<strong>$20M+</strong> in client revenue since 2013.` / `$20M+ in client revenue.` (×3 on page.tsx) / `$20M+ in client revenue. Now building Ordani...` (layout.tsx:32) / `$20M+ in client revenue since 2013.` (layout.tsx:68 JSON-LD) / `\$20M+ in client revenue since 2013.` (llms.txt:17) | **ANSWERED, not open.** LESSONS #3 records the operator's wording, given 2026-09-15 and logged late per LESSONS #32: **"$20M+ in revenue behind my work."** Fable's craft doc still lists this as its "Question 1, open" — that premise is stale; see §3 below, this is the exact defect LESSONS #32 exists to describe. | "THE $20M IS A MIX, NOT CONSULTING REVENUE" (2026-09-15) + LESSONS #32 (2026-09-16). |

---

## 2. NEW — not on Fable's table: the year renders in four separate templates, not just the frontmatter

Fable's table treats "year" as a content problem (fix the MDX frontmatter value). It is also a
**template** problem: four render sites pull `year`/`lead.year`/`cs.year`/`s.year` straight onto
the page next to the role, for every one of the six case studies, independent of whatever value
frontmatter holds. Changing frontmatter alone (even to Fable's proposed "year: 2021") does not
satisfy "no year renders beside a role on any surface" — the templates have to stop displaying it.

| # | File:line | Current text (verbatim) | What it renders today | Fix |
|---|---|---|---|---|
| 18 | `app/(foyer)/work/page.tsx:104-106` | `<span>{lead.title}</span>` ... `<span>{lead.role}</span>` ... `<span>{lead.year}</span>` (the `/work` hero-lot provenance line) | For the current lead study (Guardicore, `order: 1`): **"01 of 6 · Guardicore (Akamai) · Revenue and positioning · 2018–2021"** — tenure year directly beside the role, live. | Drop the `{lead.year}` span from the provenance line. Keep title/role only, or replace with nothing. |
| 19 | `app/(foyer)/work/page.tsx:148-150` | `<p className="cw-wk-item__meta"><span>{s.role}</span><span aria-hidden> &middot; </span><span className="cw-nowrap">{s.year}</span></p>` (the "rest of the record" list, one per remaining case study) | Renders live for all five non-lead studies: Ordani "Founder, sole engineer · 2025-2026", content engine "... · 2024-2025", RFP engine "... · 2024-2025", Postmates "Product analyst · 2020" (event year, fine), Neuton "Helped launch · 2025" (event year, fine). | Drop `{s.year}` from this meta line for the three anonymous/founder studies; Postmates/Neuton retire per §1 row 15-16 so this becomes moot for them once the block ships. |
| 20 | `app/(theater)/work/[slug]/page.tsx:243-251` | `<p className="case-study__header-meta-fallback case-study__meta"><span className="case-study__role">{cs.role}</span>...<span className="case-study__tools">{cs.tools.join(", ")}</span>...<span className="case-study__year">{cs.year}</span></p>` | Mobile/no-JS fallback meta line on **every** case-study page. Currently shows the same tenure years as the frontmatter (2018–2021 on Guardicore, 2024-2025 on both anonymous studies, 2025-2026 on Ordani). | Drop the `case-study__year` span, or gate it to event-year studies only (Postmates/Neuton, and only if that block ships). |
| 21 | `components/CaseStudySidebar.tsx:216-221` | `<dt>Role</dt><dd>{role}</dd>`...`<dt>Year</dt><dd>{year}</dd>` (desktop sticky sidebar, "Engagement" definition list) | Same as #20 but in the persistent sidebar shown ≥1024px — a **fourth** simultaneous render of the same tenure year, on every case-study page, at all times while scrolling the body. | Remove the "Year" `<dt>/<dd>` pair, or the whole sidebar reads a tenure year next to Role for the life of the page. |

Net: fixing `content/work/*.mdx` frontmatter `year:` values (per Fable's table, rows 11-14) fixes
zero of these four render sites by itself. All four must be edited in the same pass, or the new
copy still ships next to a live tenure year the operator explicitly banned twice (2026-09-15 and
again 2026-09-16, "Keep a date behind the scenes, show none").

---

## 3. NEW — the retired $80M pipeline number still renders, to screen readers only

| # | File:line | Current text (verbatim) | Problem |
|---|---|---|---|
| 22 | `app/(foyer)/page.tsx:340` | `aria-label="80 million dollars in pipeline on 14 million dollars in revenue, acquired by Akamai"` (on the Guardicore ledger row's outcome span) | LESSONS #3: "Guardicore PIPELINE NUMBER RETIRED FROM PUBLIC SURFACES — operator 2026-09-03... it simply no longer renders anywhere public." This aria-label is not visible text, but it IS what a screen-reader user hears — it is a public rendering of the retired $80M figure that no visual sweep would ever catch (Fable's table does not list it). |

Fix: rewrite the `aria-label` to match the visible text — `"$14M in revenue, acquired by Akamai"` — with no pipeline figure at all.

---

## 4. NEW — the two anonymous clients share one frontmatter field, which is what actually renders as "one person"

| # | File:line | Current text (verbatim) | Problem |
|---|---|---|---|
| 23 | `content/work/content-engine.mdx:15` | `client: Industry-authority author (name protected)` | Identical string to row 24. |
| 24 | `content/work/rfp-engine.mdx:16` | `client: Industry-authority author (name protected)` | Identical string to row 23. |

These two identical values feed exactly one live render: `app/(theater)/work/[slug]/opengraph-image.tsx:104`, `{(cs?.client ?? "CASE STUDY").toUpperCase()}` — the saffron eyebrow line on the social-share image for both case-study pages. Anyone who shares either link gets an OG card reading **"INDUSTRY-AUTHORITY AUTHOR (NAME PROTECTED)"**, identical on both. This is the literal mechanism behind Fable's own "the two anonymous studies identified one client jointly" finding (open question 4 in FABLE-120-CRAFT) — Fable named the symptom (identity read as one person) but not this shared field or its one render site. Fix: give each study a distinct `client:` value matching the TWO CLIENTS descriptors ("A social activist (name protected)" / "An award-winning author and leadership consultant (name protected)"), which also fixes the OG cards.

---

## 5. NEW — home ledger rows Fable's table didn't name

Fable's "Live drift" table lists `app/(foyer)/page.tsx` lines 380-381, 399-402, 419-421 only.
Two more rows in the same ledger carry the identical defect and were not listed:

| # | File:line | Current text (verbatim) | Fix |
|---|---|---|---|
| 25 | `app/(foyer)/page.tsx:334-336` | `<span className="cw-lrow__co">Guardicore<span className="cw-lrow__tag cw-nowrap">2018–2021</span></span>` (the "Prove" ledger, §01, Guardicore row) | Drop the year span. Event years (Akamai 2021) are fine to state elsewhere on the page (and are, in the proof line above: "Akamai acquisition, 2021") — this specific tag is a bare tenure range beside the company name in a role-history ledger, exactly what NO PERSONAL YEARS bans. |
| 26 | `app/(foyer)/page.tsx:458-462` | `<span className="cw-lrow__co">SurveyMonkey Enterprise<span className="cw-lrow__tag">Enterprise sales · 2018</span></span>` | Drop the year, or replace with a bare event-year framing that doesn't sit as "role · year" (e.g. state the 2018 IPO in the outcome span, which already exists two lines down: "$1M+ toward the IPO"). |

For contrast, two adjacent rows in the same list are correctly event-year-framed and need no
change: `Postmates ... Product analyst · 2020` is flagged separately below (row 27, it is
ambiguous) and `Neuton.AI ... Helped launch · exit 2025` is explicitly approved by LESSONS #3
("Postmates fraud line carries no example, Neuton row names its year", 2026-09-12: "the home
Neuton row tag is 'Helped launch · exit 2025'... unchanged and still the acquisition year").

| # | File:line | Current text (verbatim) | Note |
|---|---|---|---|
| 27 | `app/(foyer)/page.tsx:473-476` | `<span className="cw-lrow__co">Postmates<span className="cw-lrow__tag">Product analyst · 2020</span></span>` | 2020 is both the Uber acquisition year (event, allowed) and reads as his tenure year (role · year, banned) in the same four characters. LESSONS #3 names this literal string, "Product analyst · 2020", as ledgered and confirmed on 2026-08-30/09-02 — but that ruling predates the 2026-09-15 "NO PERSONAL YEARS" rule, which lists "the home ledger row tags" by name as a surface the new rule reaches. Flagging as a conflict for the operator/Fable, not resolving it myself: the older ruling defends this exact tag; the newer one bans the pattern it's written in. |

---

## 6. Search terms with no live hits, or hits outside scope

- **"800,000 / 800K"** — zero live hits. Not yet written anywhere; it only exists in Fable's and
  the operator's proposed replacement text. Confirms row 1/2/4/10/12 above are pure additions,
  not edits of an existing 800K string.
- **"same engagement" / "same author"** — two hits beyond the ones already tabled: `about/page.tsx:59`
  ("I do both, on the same engagement, for the same fee") and `about/page.tsx:202` ("the page's
  only link to what I sell... same engagement" — build-note prose, not client-identity prose).
  Read both in context: neither claims the RFP and content-engine clients are the same person.
  They are not TWO-CLIENTS violations and need no change under this ruling.
- **"dentists"** — one hit, `content/work/ordani.mdx:31`: "pay $200 a month for software designed
  for dentists." This is live, ledgered market-context copy (not a claim about Ordani's own
  users), unrelated to the counts ban. No change indicated by any ruling searched.
- **"hacked"** — one hit, `content/work/ordani.mdx:48`: "every practitioner had been hacked or
  scared into thinking they had been." LESSONS #3 "ORDANI'S PROBLEM WAS SIX TOOLS, NOT A HACK"
  (2026-09-16, verbatim: "they did not think they got hacked... nobody realized they needed
  platform"). This line is FALSE per the operator's own words and must come out; TRUE replacement
  is the "Six apps and a Sunday night" material in `.planning/drafts/pass-120/four-studies-DRAFT.md`
  (tags O4-O8, confirmed "Yes, as written" 2026-09-16).
- **"Organic bookings up 30%"** — one hit, `app/(foyer)/services/page.tsx:158`: "Organic bookings
  up 30%, and inquiries arriving across her whole range instead of one service." LESSONS #3
  "BIRTH WORKER BOOKINGS, BOTH SIDES" (2026-09-16, verbatim: "bookings and the 5-10 are bookings
  too") SUPERSEDES this: "the live /services receipt that still says 'Organic bookings up 30%' is
  swept to the pair in Pass-120." Replacement pair: bookings went from **one to three a month** to
  **five to ten a month**.
- **"repositioned toward the buyers who award contracts"** — one hit, `app/(foyer)/services/page.tsx:161`:
  "An industry author: repositioned toward the buyers who award contracts. $3M in contracts won
  through the RFP software that followed." LESSONS #3 "THE RFP CLIENT WAS NOT REPOSITIONED"
  (2026-09-15, verbatim: "Nothing really. THey were selling to similar/same folks... it just
  tthose contracts were award via friends... i dont want to say that") answers this exact line,
  2026-09-16: **"An author and leadership consultant: software that finds and drafts RFPs from
  buyers outside their existing network. $3M in signed contracts, close rate doubled."** Note this
  also drops the "industry author" label this line currently carries (see next item).
- **"industry author" at `services/page.tsx:79`** — `"For an industry author: software that reads
  every new RFP each morning..."`. Fable's craft doc explicitly rules this label STAYS ("services/page.tsx:79
  and :161 keep 'an industry author' for the RFP client; the two surfaces must simply never share
  a label"), but the operator's own 2026-09-16 replacement text for line 161 (previous bullet)
  drops "industry author" in favor of "An author and leadership consultant." Flagging the
  inconsistency rather than resolving it: if line 161 changes its label, line 79 two lines above
  it should probably match, or the same page uses two different labels for one client 80 lines
  apart.
- **ORDANI counts (22 / fourteen / eight / six)** — `content/work/ordani.mdx:47` ("I talked to 22
  birth workers before writing a line of code") is the ONE count LESSONS #3 explicitly exempts:
  "The 22 pre-build interviews are research, not users, and remain publishable pending his
  confirmation." Only `:56-57` (fourteen/eight/six) are banned — see row 14 above.
- **"$20M+ in client revenue since 2013" at `app/(foyer)/about/page.tsx:104`** — the HTML comment
  immediately above the live line (row 17) is now stale: `// LESSONS #3 as "since 2013",
  open-ended.` The comment cites the superseded 2026-09-02 ruling, not the 2026-09-15 supersession.
  LESSONS #3's own gate note says comments count ("stale prose is how a corrected claim comes
  back") — worth rewriting alongside the line it annotates.
- **`app/llms.txt/route.ts:32`** — "Since 2013: growth, GTM and platform strategy roles inside B2B
  software companies (thirteen years)." This is adjacent to the $20M search term but is a
  career-length biographical statement, not a revenue attribution — it does not say "$20M" or
  "revenue" in the same sentence. No ruling searched bans stating 2013 as a career-start year on
  its own (the /about page does the equivalent with "thirteen years"). Noting it rather than
  flagging it as a defect, since collapsing it into row 17 would overstate what the ruling
  actually reaches.
- **OG-image punch lines** — `app/(foyer)/opengraph-image.tsx`, `app/(foyer)/about/opengraph-image.tsx`,
  `app/(foyer)/work/opengraph-image.tsx` carry static punch lines ("Four exits... $5B+ combined.
  Now building Ordani.") with no 290K/36x/tenure-year/industry-author content — clean, no change
  needed. The one dynamic OG image, `app/(theater)/work/[slug]/opengraph-image.tsx`, is covered in
  §4 above (the `client` field) and inherits whatever the mdx `dek` says for its caption line, so
  it needs no direct edit beyond the mdx rewrite already scoped in row 12/13.
- **`next.config.ts`** — no `postmates`/`neuton` redirect entries exist yet. Expected: the 301s are
  Pass-120 scope, not current drift. Build note only, already on Fable's list.

---

## Summary for the executor

Twelve items match Fable's own table exactly (§1, rows 1-17, some combined). Ten more do not
appear on that table at all (§2-§5, rows 18-27): four are template render sites that will keep
showing a tenure year next to a role no matter what the MDX frontmatter says, one is a retired
$80M figure surviving in an aria-label, two are frontmatter fields whose duplication is the actual
cause of the "two clients read as one" finding Fable flagged but didn't localize, and two are home
ledger rows carrying the same tenure-year defect as the three rows Fable did list. Every fix in
this file must ship in the same commit as, or before, the first Pass-120 case-study page —
otherwise the new copy contradicts the old copy on the same render.
