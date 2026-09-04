# Persona review — micahjonesconsulting.com, 2026-09-03

External Fable run, six personas, executed from an account with no repo access
against the live site. Delivered in chat and transcribed here verbatim on
2026-09-03 so it survives the session. Prompt used:
`.planning/prompts/persona-review-STANDALONE.md`.

**Status: ACTED ON.** Passes 89–96 applied or ruled on every finding. Outcomes
are annotated inline in the ranked list at the foot. Kept because the persona
scores and the entry-point analysis are the baseline any future review measures
against.

---

## Fetch proof and method (reviewer's own words)

`curl -s https://www.micahjonesconsulting.com/` returned HTTP 200 with
`<title>Micah Jones — Strategy and software, shipped by one person</title>`.

All 15 routes fetched live and decoded as UTF-8. Every quote from the visible
DOM with scripts stripped, never the RSC payload.

| Route | Status |
| --- | --- |
| `/`, `/about`, `/services`, `/packages`, `/work`, `/playbook`, `/contact`, `/book/kickoff`, `/services/thanks`, `/playbook/thanks`, `/work/guardicore`, `/work/ordani`, `/work/rfp-engine`, `/work/content-engine` | 200 |
| `/book` | 308 → `/contact` *(since reversed — see Pass-93)* |
| `/work/akamai` | 308 → `/work/guardicore` |
| `/work/passioneer` | 404 |

Voice check across all 14 live pages: **zero em-dashes in body text on every
page** (only the mobile nav "Menu —"). Average sentence length 11–17 words per
page. Reviewer's note: *"The voice rules are being held. Protect that."*

---

## Scores

| # | Persona | Score | Reviewer's summary |
| --- | --- | --- | --- |
| 1 | B2B founder / CEO, $5K a month | **6/10** | Will send the note, but cannot find consulting proof |
| 2 | Solo builder, packages + playbook | **7/10** | Page does its job; both exits are about money changing hands |
| 3 | Technical recruiter, 30 seconds | **2/10** | "largely by design" — the site sends them to LinkedIn |
| 4 | Hiring manager / VP | **6/10** | Case studies reward a read; scope evidence missing |
| 5 | Procurement / security reviewer | **5/10** | Nothing false, but they leave with a list of questions |
| 6 | Peer operator who might refer | **7/10** | One-sentence test passes; availability unclear |

---

## What the reviewer called genuinely good

Kept verbatim, because this is what to protect when changing things.

1. **`/playbook`, the build-log entry "The demo that lied for weeks".**
   *"No error. No bounce. The page told every visitor 'Got it.'"* — "This is the
   best copy on the site. It proves the author has the reader's failure, on the
   author's own site, dated. Nothing else on the site does as much work per word."
   *(Note: the CAUSE in that entry was unverifiable and was rewritten in Pass-85.)*
2. **`/work/guardicore` attribution.** "The repositioning was a team effort." — "A
   hiring manager reads that as honesty, which makes the $80M line more believable,
   not less."
3. **`/work/ordani` on security.** *"How the protections actually work is not
   something a HIPAA product publishes, so this case study does not."* — "exactly
   the right answer to a procurement reviewer."
4. **The CDC figures verify.** 44.8 and 14.2 per 100,000, ratio 3.15 — checked
   against CDC NCHS Health E-Stat 113. "Externally checkable and correct."
5. **`/services` "On the price" and "Why one person".** *"No proposal theatre and
   no discovery fee."*
6. **`/packages` mailto CTAs** — prefilled subject and body, "zero friction for a
   price-sensitive buyer." *(Since replaced by Stripe checkout, Pass-92.)*
7. **`/work/akamai` 308s to `/work/guardicore`** — the imaginary URL from an
   earlier bad review now resolves to the real page.
8. **Internal arithmetic holds.** $14M at $1.2M average is ~12 deals against $80M
   pipeline. 8,000 → 290,000 is 36.25×.

---

## Per-persona findings

### 1. B2B founder / CEO — 6/10
Entry: `/` from a referral → ledger row → `/work/guardicore` → `/services` 01 →
shapes table → `/contact`.

**Where they leave:** `/services` section 01 "Positioning & GTM" proof block.
Both receipts are from EMPLOYMENT. The consulting receipt is
*"Consulting · All clients · since 2013 · $20M+ in client revenue"*, which names
no client and links to no case study. "A founder buying positioning at $5K a
month sees one positioning proof, from a job that ended in 2021."

Secondary: Advisory reads as roughly $1,000/hour and the copy never frames why.
And the founder asked "what happens in week one" — the site answers month one.

### 2. Solo builder — 7/10
Entry: `/playbook` from a link.

**Where they leave — two places, both about money:**
- "Status · Coming soon" with no date. "The builder who is stuck this week cannot
  buy the thing this page just sold them."
- `/packages` never says how or when they pay, yet `/services/thanks` says "Once
  the payment clears" — "so the buyer learns that only after they have already paid."
- Related: `/packages` promises the book; `/playbook` says "Coming soon".

### 3. Technical recruiter — 2/10, "largely by design"
Entry: `/about` from LinkedIn, 30 seconds.

Concludes: no job title, no level, no stack, no location on the page, and
"Currently · Building Ordani" reads as not open. The only concrete titles on the
site are five years old and individual-contributor level. "Hire me →" lands on
consulting pricing.

Reviewer explicitly refused to resolve the tension and listed the cost both ways.
**Operator ruled: do not serve recruiters.**

### 4. Hiring manager / VP — 6/10

**Where they leave:** `/work/guardicore` "What I did 01" — *"I generated $80M in
pipeline and $14M in revenue"* one line above *"so the account executives spent
their time on real deals."* "A VP asking 'what did HE do versus his team' cannot
tell whether $80M and $14M are his originated pipeline that AEs closed, his own
closed quota, or the team's number. This is the one place on the site where the
strongest number is the least attributed."

Second gap: every case is IC or solo. No people managed, no budget owned.

Small defect: the "Engagement" block labels activities as **Tools**. "A VP reads
'Tools' and finds one tool."

### 5. Procurement / security reviewer — 5/10
Eleven questions they would send, lettered a–k. The substantive ones:

- **(a)** One exit named four ways across `/`, `/about`, `/playbook`, `/services`
  (SurveyMonkey vs TechValidate).
- **(b)** *"Two carried my name on the cap table"* — only one is named.
- **(c)** Ordani dates disagree: `/` says 2026, `/work` says 2025-2026.
- **(d)** Content-engine platform lists do not reconcile: five planned including
  YouTube, seven shipped without it, tools list includes it.
- **(e)** Companion files 26 vs 25 itemised.
- **(f)** *"The two largest engagements that closed were both six-figure
  retainers"* — unledgered, unverifiable.
- **(g)** Ordani beta counts let a reader derive ~8 active users despite the
  no-user-count rule. Awareness only; narrative is operator-locked.
- **(h)** "$20M+ in client revenue" names no client anywhere.
- **(i)** "$80M pipeline on $14M revenue" — "on" reads as a ratio.
- **(j)** `/work/passioneer` serves a body of `<div hidden>` — the 404 copy renders
  only with JavaScript, and the served title is an "Oakland operator" leftover.
- **(k)** Three different reply-time promises.

### 6. Peer operator — 7/10
One-sentence test passes: *"Most consultants don't ship. Most builders don't sell.
I do both, on the same engagement, for the same fee."*

**Soft doubt:** availability. "A referrer wants to know he is taking new
engagements this quarter, not just in principle."

---

## Ranked list, with what actually happened

| Rank | Finding | Outcome |
| --- | --- | --- |
| 1 | No consulting-era positioning receipt | **FIXED, Pass-94.** Two anonymous receipts added: a birth worker (organic bookings +30%) and the industry author ($3M) |
| 2 | Package payment step and book delivery unstated | **FIXED, Pass-92.** Stripe checkout wired; copy states what happens after the card clears; book ships bundled |
| 3 | Guardicore $80M / $14M attribution | **RULED, Pass-90.** Operator dropped the pipeline number site-wide rather than attribute it |
| 4 | SurveyMonkey vs TechValidate | **FIXED, Pass-91.** One exit, one name |
| 5 | Content-engine platform lists | **FIXED, Pass-94.** YouTube did ship; now eight platforms |
| 6 | "Two carried my name on the cap table" | **FIXED, Pass-95.** Named: SurveyMonkey and Guardicore |
| 7 | Ordani 2026 vs 2025-2026 | **FIXED, Pass-95.** 2025–2026 |
| 8 | Companion files 26 vs 25 | **INVERTED.** Counted the shipped ZIP: 10 checklists + 6 prompts + TEN templates = 26. The TOTAL was right; "Nine templates" was the error |
| 9 | Recruiter posture | **RULED.** Site does not serve recruiters |
| 10 | "Six-figure retainers" | **CUT, Pass-94** |
| 11 | Capacity line for referrers | **FIXED, Pass-96.** "I am taking new engagements now", no number |
| 12 | Week one for engagements | **FIXED, Pass-96.** Scoping session + audit |
| 13 | "Tools" label lists activities | **FIXED, Pass-89.** Renamed "Scope" |

**Polish tail** — all resolved in Pass-89 and Pass-96 except where noted: the "on"
ratio wording *(resolved by removing $80M entirely)*; three reply-time promises
*(standardised to one business day)*; en-dash vs hyphen year ranges *(normalised)*;
Oakland in meta descriptions *(operator ruled KEEP, local SEO)*; the 404 blank
without JavaScript *(fixed — but see below)*; arrow spacing *(fixed)*; "a decade"
against "since 2013" *(fixed to thirteen years)*.

---

## Two findings that inverted under checking

Recorded because the pattern matters more than either finding.

1. **"The 404 page is blank without JavaScript."** The branded 404 page was always
   fine — `_not-found.html` has always carried full content. The empty body
   belonged to `/work/[slug]`, a different route, because `generateStaticParams`
   included stubs and `dynamicParams` was true. Fixed the real one.
2. **"Companion files: 26 vs 25 itemised — correct the total."** Counting the
   shipped ZIP showed the total was right and the itemised line was wrong.
   Applying the reviewer's proposal would have published a NEWLY incorrect number.

The review is a careful reader working from the live DOM, and it earned its
findings. It is not an oracle. Verify before applying, every time.
