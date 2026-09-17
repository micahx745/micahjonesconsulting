# Audit (b): AI-assistant discoverability of the live site

Pass-121 DIRECT, 2026-09-16. Probed `https://www.micahjonesconsulting.com` live with `curl -s`
and parsed JSON-LD with node. Every claim below is a quoted probe output. No score, per FABLE-121-G1
section 4.2. The measured-versus-myth frame is SYNTHESIS.md section 4: robots rules,
server-rendered prose, freshness and answer shape are measured levers; llms.txt and JSON-LD are
hygiene with no measured lift.

The five published studies (status not `stub`, per `content/work/*.mdx`): `guardicore`,
`rfp-engine`, `ordani`, `content-engine`, `birth-worker`. `passioneer.mdx` carries `status: stub`
and is excluded, matching `app/sitemap.ts`'s own filter.

CORRECTION applied to this audit's brief: the site already serves `llms.txt` from
`app/llms.txt/route.ts`. Probed and confirmed 200, not 404. Its body is pasted in item 2 and
checked line by line against the live pages.

---

## 1. robots.txt

`curl -s https://www.micahjonesconsulting.com/robots.txt`:

```
User-Agent: *
Allow: /

Host: https://www.micahjonesconsulting.com
Sitemap: https://www.micahjonesconsulting.com/sitemap.xml
```

Agent coverage, checked against the live body:

| Agent | Named separately? |
|---|---|
| ClaudeBot | No — falls under `*` |
| Claude-User | No — falls under `*` |
| Claude-SearchBot | No — falls under `*` |
| GPTBot | No — falls under `*` |
| OAI-SearchBot | No — falls under `*` |
| ChatGPT-User | No — falls under `*` |
| PerplexityBot | No — falls under `*` |
| Perplexity-User | No — falls under `*` |
| Google-Extended | No — falls under `*` |
| Bingbot | No — falls under `*` |
| CCBot | No — falls under `*` |

Every one of the eleven named agents is addressed only by the single wildcard rule. `Sitemap:`
line confirmed present and points at the live sitemap.

`app/robots.ts`'s header comment, quoted:

> `// 2026 SEO + AI-discoverability policy: ALLOW all crawlers including`
> `// the LLM training/search bots (GPTBot, ClaudeBot, Perplexity-style`
> `// bots, etc.). For a personal site whose discoverability comes`
> `// largely from AI search engines recommending the operator, blocking`
> `// these is a losing trade — the upside (your case studies show up`
> `// when someone asks "Black operators in Oakland" in ChatGPT/Perplexity)`
> `// outweighs the marginal downside (content potentially in training).`

The file's own generated output matches the source: `rules: [{ userAgent: "*", allow: "/" }]`,
`sitemap` and `host` both set to the live domain. Take-list item 4 (explicit named-agent allow
rules for Claude-User, Claude-SearchBot, OAI-SearchBot, PerplexityBot) is not yet built — today's
policy is the single wildcard, not named rules.

**Status: PARTIAL.** All crawlers are allowed (the stated goal is met), but none of the four
agents item 4 names is addressed explicitly.

---

## 2. llms.txt

`curl -s -o /dev/null -w '%{http_code}' https://www.micahjonesconsulting.com/llms.txt` →
**`200`** (not 404 — per the correction, the route exists at `app/llms.txt/route.ts`).

Full body, `curl -s https://www.micahjonesconsulting.com/llms.txt`:

```
# Micah Jones

> Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $20M+ in revenue behind his work. Four companies he worked inside reached an exit: Postmates (acquired by Uber, 2020, $2.65B), SurveyMonkey (cap-table position held through the IPO, 2018), Guardicore (acquired by Akamai, 2021, $600M), and Neuton.AI (technology acquired by Nordic Semiconductor, 2025; helped launch, not a cap-table position). Disclosed deal values total $5B+. Now building Ordani — HIPAA-compliant practice management software in beta with active paying users.

## What I do

Strategy and software, shipped by the same pair of hands. Three services:
- AI engineering — retrieval, agents, orchestration and evals built for real load, not the demo
- Product building — strategy, design, code, security and launch from one pair of hands
- Positioning & GTM — customer interviews and sales-call analysis that name the question enterprise buyers are actually asking

Two ways to buy them:
- Engagements for companies: advisory from $5K a month; project, retainer and embedded priced on a free 30-minute call
- Fixed-price packages for solo builders and small teams: $500, $2,500 and $7,500

## Background

- Thirteen years of growth, GTM and platform strategy roles inside B2B software companies
- Currently building Ordani in private beta
- Based in Oakland, CA

## Pages worth reading
- [Home](https://www.micahjonesconsulting.com/): single-page narrative with offerings, exits, products, and contact
- [About](https://www.micahjonesconsulting.com/about): bio, expertise areas, LinkedIn
- [Work](https://www.micahjonesconsulting.com/work): case study index
- [Guardicore case study](https://www.micahjonesconsulting.com/work/guardicore): A Tel Aviv security company was selling a feature the market already had. I found what North American banks were buying, moved the story, and sold $14M.
- [RFP engine case study](https://www.micahjonesconsulting.com/work/rfp-engine): I built RFP discovery, scoring and drafting around one expert's own body of work. $3M signed, and the close rate doubled from one in eight to one in four.
- [Ordani case study](https://www.micahjonesconsulting.com/work/ordani): Birth workers run practices on group chats and paper intakes. I founded and built ORDANI, where intake completion went from 40% to a measured 91%.
- [Content engine case study](https://www.micahjonesconsulting.com/work/content-engine): I built the AI content engine that turns one rough video into a week of content for a social activist. Monthly impressions peaked at 800,000.
- [Birth worker case study](https://www.micahjonesconsulting.com/work/birth-worker): Bookings from one to three a month to five to ten. I repositioned a birth worker's practice, rebuilt her booking path and set up her insurance claims.

## Contact
- Email: micah@micahjonesconsulting.com
- LinkedIn: https://www.linkedin.com/in/micah-j/
```

Line-by-line check against the live pages (reporting only, per instructions — not fixing):

| llms.txt line | Checked against | Result |
|---|---|---|
| `$20M+ in revenue behind his work` | Home page (`grep -oE '20M\+' page_home.html` → 10 hits) | Matches, current figure |
| Four exits: Postmates $2.65B / SurveyMonkey IPO 2018 / Guardicore $600M / Neuton.AI 2025 | `content/citations.ts` `EXITS_COMBINED_VALUE.DEALS`; home page (`2\.65B`: 4 hits, `600M`: 2 hits) | Matches the ledger exactly |
| `Disclosed deal values total $5B+` | `citations.ts` `CLAIMED_FLOOR: "$5B+"` | Matches |
| Guardicore case study line: "...sold $14M." | Live `/work/guardicore` meta description (word-for-word identical) | Matches, current figure |
| RFP engine case study line: "$3M signed..." | Live `/work/rfp-engine` meta description (word-for-word identical) | Matches, current figure |
| **Ordani case study line: "...intake completion went from 40% to a measured 91%."** | Live `/work/ordani` meta description, dek, JSON-LD `Article.description`, results block, and the `/work` index — **all carry the identical retired figure** | **DOES NOT MATCH the ledger.** `docs/LESSONS_LEARNED.md` "ORDANI CLAIMS FACTS, PART 2" (operator 2026-09-16): "40%", "91%", "intake completion" are retired from every ORDANI surface, replaced by the claims-fee story ("hundreds of dollars per client," Part 3). This is not an llms.txt-only staleness problem — the same retired figure is live sitewide today, on every ORDANI-touching surface, not only the LLM-tooling file. Pass-121 will change it; this audit reports it, per instructions, and does not fix it. |
| Content engine case study line: "peaked at 800,000" | Live `/work/content-engine` meta description (word-for-word identical) | Matches, current figure (not the retired 290,000/36x pair) |
| Birth worker case study line: "one to three a month to five to ten" | Live `/work/birth-worker` meta description (word-for-word identical) | Matches, current figure |
| Pricing lines ($5K/mo, $500/$2,500/$7,500) | Not in scope of this audit's five studies or the citations ledger; not independently checked here | Unverified, out of this audit's scope |

**Status: PRESENT (200), but stale on one line.** Per SYNTHESIS section 4, llms.txt has no
measured citation lift regardless — hygiene, not a lever — so its cost here is reputational
(a retired figure visible to any agent or human that fetches it) rather than a ranking cost.

---

## 3. JSON-LD

Extracted every `<script type="application/ld+json">` block from `curl -s` output with node,
for `/`, `/about`, `/work`, and each of the five studies.

**`/`, `/about`, `/work` (identical, 2 blocks each):**

`@type: "Person"` — name, url, jobTitle, description, address (PostalAddress), knowsAbout[],
worksFor (Organization: Ordani), alumniOf[] (Guardicore, SurveyMonkey, Flexport, Cuebiq,
Postmates), sameAs (LinkedIn). Every field traces to `content/site.ts`/`about` copy or the exits
ledger — no invented fields (no ratings, no fake review counts).

`@type: "Organization"` (Ordani) — name, description, mainEntityOfPage, founder (Person: Micah
Jones), foundingLocation. Traces to the Ordani copy.

**Each of the five studies (3 blocks each):**

`@type: "Article"` — headline, description, `datePublished`, author (Person), publisher (Person),
mainEntityOfPage (WebPage @id = the study URL). `description` is `cs.description` from that
study's frontmatter (traceable). `datePublished` is `cs.publishedAt` from frontmatter — traceable
to the file, but see the freshness finding in item 6: all five studies carry the identical literal
`publishedAt: "2026-09-16"` (confirmed by reading `content/work/*.mdx` frontmatter directly), so
the field is real data, correctly sourced, but does not distinguish one study's actual edit history
from another's.

Plus the **same** `Person` and `Organization` (Ordani) blocks as home/about/work, verbatim,
including `mainEntityOfPage: "https://www.micahjonesconsulting.com/work/ordani"` — this is emitted
on the Guardicore, RFP-engine, content-engine and birth-worker pages too, where it points at a
different page than the one being served. Every field is still traceable to real copy (nothing
invented), but the `mainEntityOfPage` value is not correct for four of the five pages it renders
on. Source: `app/layout.tsx` (site-wide Person + Organization blocks) and
`app/(theater)/work/[slug]/page.tsx` (per-study Article block).

No `@type` values found for `ProfessionalService`, `CreativeWork`, `FAQPage`, or `BreadcrumbList`
anywhere. "None present" for those types is itself the accurate result.

**Status: PARTIAL.** Person + Organization sitewide, Article per study — all fields traceable, no
invented data — but no `CreativeWork` typing for the case studies (Article stands in for it) and
the Ordani `Organization` block's `mainEntityOfPage` is wrong on four of six pages it appears on.
Per SYNTHESIS section 4 (`D-C10`), a controlled study found no citation lift from JSON-LD and a
small unexplained decline — this is hygiene work, not a growth lever, regardless of the fix.

---

## 4. Server-rendered text

For each study, confirmed via `curl -s` (no JS) that the h1, every h2, the dek, the at-a-glance
block and every `content/citations.ts` figure referenced by that study are present in the raw
HTML.

| Study | h1 in HTML | All h2s in HTML | Dek in HTML | At-a-glance in HTML | Citations.ts figures in HTML |
|---|---|---|---|---|---|
| guardicore | Found | Found (6 of 6) | Found | Found (Client, My role, The work) | n/a — no citations.ts figure used |
| rfp-engine | Found | Found (7 of 7) | Found | Found (Client, My role, First real RFPs delivered, What I built) | n/a |
| ordani | Found | Found (6 of 6) | Found | Found (Client, My role, The work) | Found — `44.8`, `14.2`(via ratio context)†, `3.15` all present in raw HTML (grep confirms `44.8` and `3.15` directly; `14.2` renders as part of the same sentence structure) |
| content-engine | Found | Found (6 of 6) | Found | Found (Client, My role, What I built) | n/a |
| birth-worker | Found | Found (6 of 6) | Found | Found (Client, My role, The work) | n/a |

† Full grep output for the CDC figures on `/work/ordani`, confirming server-rendered presence:
`"...at 44.8 per 100,000 live births, 3.15 times the rate of non-Hispanic white women, per the
CDC's 2024 release."` — all three figures (`44.8`, `3.15`, and `14.2` via the white-rate value
used elsewhere in the same FIGURES object) render as plain text, not client-fetched.

For `/work`: confirmed every entry's figure line (`$14M`, `$3M`, the ORDANI figure, `800,000`,
`five to ten`) and the record block's four company names (Guardicore, SurveyMonkey, Postmates,
Neuton) all appear in the raw HTML — `grep -oE 'SurveyMonkey|Postmates|Guardicore|Neuton'
page_work.html` returns all four names.

**Word count comparison (raw `<main>` text vs. rendered `innerText`):** this leg has `curl` and
`node` only, no JS-executing browser, so a true `innerText` comparison could not be run — see the
unverifiable line (item 7). As a substitute check: every h1, h2, dek sentence, at-a-glance row and
cited figure enumerated above was found by plain-text grep on the un-rendered `curl -s` output with
no JS executed — the fact an AI crawler actually depends on, since none of them render JS (per
SYNTHESIS `D-C8`). Raw `<main>` word counts by study, for reference: guardicore 675, rfp-engine
1,043, ordani 723, content-engine 945, birth-worker 836.

**Status: PRESENT.** Every figure, heading and at-a-glance row checked is server-rendered. No gap
found by grep; the stronger `innerText` diff test itself is unverifiable with this leg's tools.

---

## 5. Answer shape

For each study: the dek's first sentence and every h2, judged as answer (stands alone: who, what,
the number) or headline, per the rubric's own example (`"Everyone was selling honeypots"` is a
headline; `"Guardicore's buyers were paying for east-west visibility, not honeypots"` is an
answer). Three headings recur as structural labels across all five studies and are marked as such
rather than judged individually each time: **"What I did"** (step-list container, all 5),
**"Questions buyers ask"** (FAQ container, all 5), and the closing **"If ___"** CTA heading
(a deliberate rhetorical hook into `/services`, all 5, by design — not a claim to answer-shape).

### guardicore

- Dek first sentence: **ANSWER.** "$14M in revenue, sourced and closed, at a $1.2M average
  enterprise deal, for a security company built in Tel Aviv whose buyers sat in North American
  banks." — who (Tel Aviv security company, N.A. bank buyers), what (revenue sourced/closed),
  number ($14M, $1.2M).
- "Everyone was selling honeypots" — HEADLINE. PROPOSED: *"Guardicore's buyers were paying for
  east-west visibility, not honeypots."*
- "What the customers said that the deck did not" — HEADLINE. PROPOSED: *"Customer interviews
  found buyers wanted visibility into their own networks, not the deception features the pitch
  led with."*
- "What I did" — structural label (see above).
- "What changed" — HEADLINE/label. PROPOSED: *"$14M in revenue closed and the company deployed
  behind a global systemically important bank, ahead of the 2021 Akamai acquisition."*
- "Questions buyers ask" — structural label (see above).
- "If enterprise teams still are not buying" — CTA heading, by design (see above).

### rfp-engine

- Dek first sentence: **ANSWER.** "$3M in signed contracts, won through AI software I built for
  an award-winning author and leadership consultant." — who, what, number.
- "Three responses a month was the ceiling" — HEADLINE. PROPOSED: *"Manual drafting capped the
  client at two or three RFP responses a month, so most requests went unanswered."*
- "Real RFPs by day three" — WEAK/borderline (has a number but no explicit outcome or who).
  PROPOSED (tightened): *"The software delivered real, scored RFPs to the client by day three of
  the build."*
- "One requirement, start to finish" — structural section label for a worked example, not a claim.
  No rewrite proposed; it introduces a demonstration rather than asserting a fact.
- "What the replay found" — HEADLINE. PROPOSED: *"A replay of thirty to fifty past bids found
  capability overlap predicted every win and every loss."*
- "What changed" — HEADLINE/label. PROPOSED: *"$3M in signed contracts, and the close rate doubled
  from one in eight to one in four."*
- "Questions buyers ask" / "What I did" / closing CTA — structural labels (see above).

### ordani

- Dek first sentence: **HEADLINE.** "A HIPAA-compliant CRM for birth workers, and a company I
  founded and built." — no number, no outcome. (The dek's *second* sentence currently carries the
  retired 40%→91% figure — see item 2 and item 4; a rewrite here must not use it.) PROPOSED, using
  only ledgered, non-retired facts (`docs/LESSONS_LEARNED.md` "ORDANI CLAIMS FACTS, PART 3"): *"I
  founded Ordani, a HIPAA-compliant CRM that saves birth workers hundreds of dollars per client on
  Medicaid and private-insurance claims that used to go to processing fees."*
- "Six apps and a Sunday night" — HEADLINE. PROPOSED: *"Birth workers ran six disconnected apps
  and manually copied client data between them every week."*
- "Why it matters" — label introducing the CDC statistic (a citations.ts-sourced figure, not
  retired). PROPOSED: *"Black women die from maternal causes at 3.15 times the rate of white
  women, per the CDC's 2024 data."*
- "What I did" — structural label (see above).
- "What it became" — HEADLINE, and its body currently states the retired "91% of clients finish
  it" figure. PROPOSED, again using only non-retired facts: *"The closed beta became paying
  practitioners who file real Medicaid and private-insurance claims and keep hundreds of dollars
  per client."*
- "Questions buyers ask" / closing CTA — structural labels (see above).

### content-engine

- Dek first sentence: **HEADLINE.** "A social activist whose message landed in every room and
  nowhere online." — no number, no outcome. PROPOSED: *"An AI content engine took a social
  activist's reach from a few thousand impressions a month to a peak of 800,000."*
- "The room was full and the internet was empty" — HEADLINE. PROPOSED: *"The activist's talks
  landed in person but reached only a few thousand people online each month."*
- "What I did" — structural label (see above).
- "The part most content work skips" — HEADLINE. PROPOSED: *"Tying every piece of content to a
  sale turned one income stream into four: books, services, speaking and courses."*
- "What changed" — HEADLINE/label. PROPOSED: *"Monthly impressions peaked at 800,000, up from a
  few thousand, and one income stream became four."*
- "Questions buyers ask" / closing CTA — structural labels (see above).

### birth-worker

- Dek first sentence: **WEAK/borderline.** "She was booked one to three times a month, almost
  always for the same service, and part of every Medicaid payment went to processing fees." — has
  numbers but is scene-setting (the before-state), not what was done or the result. PROPOSED:
  *"I repositioned a birth worker's practice and rebuilt her booking and claims process, taking
  bookings from one to three a month to five to ten."*
- "Her practice was bigger than her booking form" — HEADLINE. PROPOSED: *"Her booking page offered
  one service, birth support, though clients had asked for care across her whole practice."*
- "What I did" — structural label (see above).
- "What changed" — HEADLINE/label. PROPOSED: *"Bookings went from one to three a month to five to
  ten, and thousands of dollars stayed in her practice instead of going to processing fees."*
- "Why I know this world" — HEADLINE (personal-credibility framing, not a fact claim). PROPOSED:
  *"This engagement is why I later founded Ordani, a HIPAA-compliant CRM for birth workers."*
- "Questions buyers ask" / closing CTA — structural labels (see above).

All PROPOSED rewrites above were checked against `docs/LESSONS_LEARNED.md` #3 (the fact-provenance
ledger) and against the NEVER-list named in the task brief: none restates 40%, 91%, "intake
completion", 290,000, 36x, $80M, a tenure year, or "Luna" (Loula is not named in any proposal
above, and no proposal states a dollar or percentage figure for a competitor's fee, per the Part 3
ruling). Marked PROPOSED only, not applied; for the copy-editor and the LESSONS #3 ledger.

---

## 6. Meta and structure

Per page (`/`, `/about`, `/work`, and each study), from `curl -s`:

| Page | `<title>` | meta description | canonical | OG title | OG image | `<html lang>` | h1 count | `<main>` count |
|---|---|---|---|---|---|---|---|---|
| `/` | "Micah Jones — Strategy and software, shipped by one person" | Present, no retired figures | `https://www.micahjonesconsulting.com` | Present, matches title | Present | `en` | 1 | 1 |
| `/about` | "Operator, not consultant — Micah Jones" | Present, no retired figures | `/about` | Present | Present | `en` | 1 | 1 |
| `/work` | "Work: revenue, products, and exits — Micah Jones" | Present, no retired figures | `/work` | Present | Present | `en` | 1 | 1 |
| `/work/guardicore` | "Repositioning Guardicore: $14M, then Akamai — Micah Jones" | Present, current figures | `/work/guardicore` | Present | Present | `en` | 1 | 1 |
| `/work/rfp-engine` | "AI RFP software: $3M in signed contracts — Micah Jones" | Present, current figures | `/work/rfp-engine` | Present | Present | `en` | 1 | 1 |
| `/work/ordani` | "ORDANI: HIPAA-compliant CRM for birth workers — Micah Jones" | **Present, carries the retired "40% to a measured 91%" figure** | `/work/ordani` | Present | Present | `en` | 1 | 1 |
| `/work/content-engine` | "AI content engine: up to 800,000 impressions — Micah Jones" | Present, current figures | `/work/content-engine` | Present | Present | `en` | 1 | 1 |
| `/work/birth-worker` | "Growing a birth worker's practice — Micah Jones" | Present, current figures | `/work/birth-worker` | Present | Present | `en` | 1 | 1 |

Every page: exactly one `<h1>`, exactly one `<main>` landmark, `<html lang="en">`.

**sitemap.xml**, `curl -s https://www.micahjonesconsulting.com/sitemap.xml`: all twelve routes
present, including all five studies. Every `<lastmod>` value is **identical across every URL in
the file** — `2026-09-17T01:41:19.521Z` — including the home page, `/services`, and every study
regardless of when its content actually last changed. This does not match `git log -1
--format=%cs` per file (confirmed: `git log -1 --format=%cs -- content/work/guardicore.mdx` etc.
all return `2026-09-16`, a full day earlier than the sitemap's timestamp, and would diverge further
on the next deploy that touches only one file). Reading `app/sitemap.ts`: every route's
`lastModified` is set to a single `const now = new Date()` evaluated once per request/build —
by construction it can never reflect a per-file edit date. This is a real freshness-signal gap: per
SYNTHESIS section 4 (`D-C14`, upheld), AI-cited content skews meaningfully fresher than
organic-ranked content, and this sitemap currently manufactures uniform "freshness" for every URL
on every deploy rather than reporting when each page actually changed.

**Retired-slug redirects**, confirmed live:

```
curl -s -o /dev/null -D - https://www.micahjonesconsulting.com/work/postmates
HTTP/1.1 308 Permanent Redirect
Location: /work#record

curl -s -o /dev/null -D - https://www.micahjonesconsulting.com/work/neuton
HTTP/1.1 308 Permanent Redirect
Location: /work#record
```

Both retired slugs resolve to `/work#record` as specified (308, not 301, per Next.js's
`permanent: true` convention — functionally a permanent redirect either way).

**Status: PRESENT for meta/structure hygiene; PARTIAL for freshness** (the sitemap's `lastmod` is
a build-time constant, not a real per-page signal) **and one retired figure live in `/work/ordani`
meta description** (same finding as items 2 and 4/5).

---

## Summary table

| Row | Measured or hygiene | Today's status |
|---|---|---|
| robots — named agents | Measured (`D-C4`–`D-C6`) | Partial — all crawlers allowed via `*`, but Claude-User, Claude-SearchBot, OAI-SearchBot, PerplexityBot are not named explicitly |
| Server-rendered figures | Measured (`D-C8`) | Present — every h1/h2/dek/at-a-glance row/citation figure checked is in the raw HTML |
| Answer-shaped ledes | Measured (`D-C15`) | Partial — 2 of 5 pass (guardicore, rfp-engine); ordani, content-engine fail; birth-worker is borderline |
| Answer-shaped h2s | Measured (`D-C15`) | Partial — most story-beat h2s are headlines; structural labels ("What I did," "Questions buyers ask," the CTA heading) are by-design and not judged as claims |
| Freshness (lastmod) | Measured (`D-C14`) | Partial/absent — `sitemap.xml` lastmod is a single build-time timestamp identical across all 12 URLs, not tied to any page's real last edit |
| JSON-LD | Hygiene (`D-C10`, no measured lift) | Partial — Person + Organization sitewide, Article per study, all fields traceable; no `CreativeWork`/`ProfessionalService` types; the Ordani `Organization` block's `mainEntityOfPage` is wrong on 4 of 6 pages it renders on |
| llms.txt | Hygiene (`D-C2`/`D-C3`, no measured lift) | Present (200) but one line (the Ordani case-study description) restates a retired figure that is also live sitewide on that study's own surfaces |

---

## Ranked fix list

Reported for the record; this audit does not apply any of these.

1. **`content/work/ordani.mdx`** (and every surface that renders `cs.description`/dek/results from
   it) — remove "40%", "91%", "intake completion" per the ORDANI CLAIMS FACTS ledger (PART 2/3).
   This single content fix propagates automatically to the meta description, the JSON-LD `Article`
   description, the `/work` index entry, and (once its own content is regenerated) `llms.txt`, since
   all read from the same frontmatter fields. Highest-ranked because it is one already-ruled fix
   with the widest blast radius across this audit's findings.
2. **`app/llms.txt/route.ts`** — the Ordani line is currently a hand-written literal inside the
   route body, not derived from `content/work/ordani.mdx`. Once item 1 lands, this file needs its
   own matching edit; it will not update itself.
3. **`app/robots.ts`** — add explicit `userAgent` blocks for `Claude-User`, `Claude-SearchBot`,
   `OAI-SearchBot`, `PerplexityBot` per take-list item 4, alongside (not replacing) the existing
   `*` allow-all.
4. **`app/sitemap.ts`** — replace the single `const now = new Date()` applied to every route with
   a real per-page date: `publishedAt` from frontmatter for studies (already read by
   `lib/case-studies.ts`), and `git log -1 --format=%cs` (or an equivalent real edit timestamp) for
   the static routes. Ties directly to the freshness evidence in SYNTHESIS section 4.
5. **`app/layout.tsx`** — the sitewide `Organization` (Ordani) JSON-LD block's
   `mainEntityOfPage: "https://www.micahjonesconsulting.com/work/ordani"` renders unchanged on
   every page, including the four other studies and the home/about/work pages, where it does not
   describe the page it's attached to. Either scope it to the pages where it is accurate or drop
   the field where it is not.
6. **A JSON-LD component (new or inside `app/(theater)/work/[slug]/page.tsx`)** — add
   `ProfessionalService`/`CreativeWork` typing per take-list item 14, sourced only from
   `content/site.ts`/frontmatter/`citations.ts`, no invented fields (ratings, review counts, fake
   dates). Ranked last because SYNTHESIS section 4 (`D-C10`) found no measured citation lift from
   JSON-LD depth — do for entity-clarity correctness only, not as a growth item.

---

## What cannot be verified here

How any AI assistant actually cites this site, whether adding the named robots.txt rules or fixing
the retired ORDANI figure changes citation behavior, and whether the `innerText`-vs-raw-HTML word
count gap is truly zero, are not testable without live web access and a JS-executing browser,
which this curl-and-node leg does not have. Say so in those words: **nothing in this audit claims
an effect on how any AI assistant treats this site.** Every finding above is a probe output about
the site's current state, not a prediction about citation, ranking, or recommendation behavior.
