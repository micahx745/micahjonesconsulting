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
