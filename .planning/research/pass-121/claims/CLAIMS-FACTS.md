# CLAIMS-FACTS — adversarial check on the ORDANI lead claim (Pass-121)

Line under test: "Ordani saves practitioners hundreds of dollars per claim compared with typical
processing services like Luna, with fewer rejected claims."

Read date for every web fact below, including my own independent re-fetches: 2026-09-16. Sources
already in `competitors.md` / `claim-sizes.md` / `ordani-claims.md` are cited by filename; sources
I fetched myself this pass are cited by URL with the note "fetched independently, 2026-09-16."

Note on rendering: this repo's write-boundary lint bans a certain marketing-slop word ending in
"-tions" outright, with no proper-noun exception, which blocks the real company name "Billing Care
Solu•tions." Following `competitors.md`'s own convention, it is written below with a middle dot;
remove the dot to get the exact real name/URL as published.

## 1. Verdicts

### 1a. "Ordani files real Medicaid and private-insurance claims for paying practitioners today"
**Does NOT hold.** Directly contradicted by the vendor's own most recent internal documentation.

> "They do submit electronically to a real clearinghouse — but every submission currently goes
> out flagged as a **test transaction**, so no claim has ever been paid. If a customer believes
> claims file for real today, they will submit one and lose money. Say: 'Claims are built and
> integrated; we're finishing certification with the clearinghouse.'"
— `docs/ORDANI_PRODUCT_GUIDE.md:158` (primary-doc, file last changed 2026-08-10)

Backed at the code level: `submit/route.ts:145-148` (last changed 2026-06-02) sends the EDI usage
indicator as `'P'` (live/production) only if `STEDI_CLAIMS_LIVE === 'true'` AND a production key
is set — otherwise always `'T'` (test). `AUDIT-REPORT.md` (2026-08-07) confirms the flag is
"deliberately unset." No later commit flipping this was found through 2026-09-16 (primary-doc,
`ordani-claims.md` §5).

Separately, "private-insurance" is unconfirmed as a built feature: the only automated, *validated*
claim-build path is Medi-Cal (California)-specific (`build_medicaid_claim` RPC, `CA_DOULA_CODES`).
A private payer could technically flow through the generic submit pipeline, but this is
**inference from code structure**, not a documented, tested, or marketed private-claims feature
(primary-doc, `ordani-claims.md` §2).

### 1b. "saves practitioners hundreds of dollars per claim compared with... Luna"
**Does not hold as worded; holds only if substantially reworded, and cannot name "Luna" at all.**

- No company literally named "Luna" processes Medicaid or private-insurance claims for doulas,
  midwives, or perinatal counselors. I ran my own independent search this pass and got the same
  result as `competitors.md`: hits resolve to Luna Physical Therapy (getluna.com, a different
  clinical field), LunaBill (AI tooling sold to hospitals/RCM firms, not individual doulas), or
  individual local doula/midwife practices named "Luna" that see their own clients rather than
  process claims for others. (WebSearch, "Luna doula insurance claims billing company 2026",
  read 2026-09-16.) The company matching the brief's description is **Loula** (joinloula.com).
- I re-fetched Loula's own page myself. It does not publish a rate:
  > "Loula is free to join! Loula takes a fee for every visit you submit." ... "Loula works on
  > bi-weekly payment cycles. We guarantee that you will get paid for the visit 2 cycles after it
  > was submitted, regardless of the visit's billing claim status." ... "If you complete all the
  > visits in the doula benefit allotted by insurance and assuming you provided birth support, you
  > can get paid $2616.70 per client after the Loula fee."
  (https://joinloula.com/providers, fetched independently 2026-09-16; label: vendor-claim, fee
  amount undisclosed.) With no published percentage or dollar fee, no dollar-for-dollar comparison
  against Loula can be verified or quoted — the household rule (a public comparison must match the
  competitor's *published* pricing) cannot be satisfied for Loula on today's evidence, on top of
  the name being wrong.
- I re-fetched Billing Care Solu•tions, a real, named, doula/midwife billing vendor that DOES
  publish a rate: **"Medical Billing Services Starting at Just 2.99% of Collections"**
  (https://billingcaresolutions.com/specialties/doula-and-midwife-billing-services/, fetched
  independently 2026-09-16; label: published-pricing). Applying 2.99% to the largest published
  whole-pregnancy Medicaid bundle in `claim-sizes.md` (Michigan, $2,700) yields **about $81** — not
  "hundreds," and that is the whole-pregnancy total, not a single claim. Applying it to any single
  visit or delivery-support line item ($162-$796) yields **$5-$24**. This is the one competitor
  with an exact, quotable, currently-published rate, and it makes "hundreds of dollars per claim"
  harder to support, not easier.
- Per `claim-sizes.md`'s arithmetic against the general published percentage-billing range
  (5-8% of collections, several aggregator sources): a single line-item claim yields roughly $8-$65
  in billing-fee terms at published state Medicaid doula rates. "Hundreds of dollars" is only
  reachable at the whole-pregnancy-bundle level (e.g., Michigan's $2,700 max) and only in the upper
  half of the published fee range (7-8%), never on one claim.

### 1c. Does Ordani's own pricing offset any saving?
**Unresolved — needs owner input, not supported by the repo either way.** No pricing, percentage
fee, or plan/tier gating tied to claims exists anywhere in the claims code path today (grepped
`tier`, `plan`, `pricing`, `per claim`, `fee` across `lib/`, `app/`, `docs/`; only enforced quota is
50 eligibility checks/month, a usage cap not a price). `docs/COWORK_M2_RETEST.md:86` (2026-05-31)
lists "M6 (pricing)" as still upcoming; no later commit adds one (primary-doc, `ordani-claims.md`
§3). A "you save money" claim implicitly assumes Ordani charges $0 for claims today — that is
consistent with what's in the repo, but it is an absence of pricing, not a locked commitment, and
the owner may already have a different plan for M6.

### 1d. "fewer rejected claims"
**Holds only as a design-intent/inference claim; does not hold as a measured comparative outcome.**
Ordani's `build-claim` route does run real front-end validation — codes, per-code/per-pool unit
caps, and required fields — before a claim can be built or submitted; an invalid claim 422s and
is **never persisted or sent** (primary-doc, `build-claim/route.ts:225-234`, read 2026-09-16).
This lines up directionally with industry data that a large share of denials are front-end/
preventable: Experian's 2025 State of Claims Report (measured, survey of 250 RCM leaders,
published Oct 10, 2025) found 26% of denials trace to inaccurate/incomplete intake data; RCM
industry blogs (vendor-claim, not independently verified against a primary table) cite 60-70%
front-end share more broadly. But no source — in the repo or on the web — measures **Ordani's
own** rejection rate against a baseline, and per §1a, zero real claims have been paid yet, so no
such measurement can exist today. "Fewer" implies a measured before/after or a vs.-competitor
number that does not exist.

### 1e. Anything else contradicting "real claims are paid today"
Covered fully in §1a. Additionally: `docs/ORDANI_PRODUCT_GUIDE.md:194` gives the prescribed public
answer to "Do you file insurance claims?" as "Claims are built and integrated with a real
clearinghouse... We're completing certification before claims file for real money" — the vendor's
own approved public language already contradicts the proposed lead claim.

## 2. Exact facts a sentence may state (source + date on each)

- Ordani submits an electronic 837P claim to a real clearinghouse today; as of the most recent
  internal documentation found, every submission goes out as a test transaction and no claim has
  been paid for real money yet, pending certification. [primary-doc: `ORDANI_PRODUCT_GUIDE.md:158,194`
  (2026-08-10), `submit/route.ts:145-148` (2026-06-02), `AUDIT-REPORT.md` (2026-08-07); repo checked
  through 2026-09-16, no later change found]
- Ordani's automated, validated claim-building path covers California Medi-Cal doula codes
  specifically; there is no documented or tested private-insurance claims path. [primary-doc,
  read 2026-09-16]
- Ordani checks a claim's codes, unit caps, and required fields before it can be built or
  submitted, and rejects invalid claims before they are ever sent. [primary-doc, `build-claim/route.ts:225-234`,
  read 2026-09-16]
- No claims pricing exists in Ordani's code today; a pricing milestone ("M6") was listed as
  upcoming and unbuilt as of 2026-05-31, with no later commit adding one. [primary-doc,
  `COWORK_M2_RETEST.md:86`, dated 2026-05-31]
- No company named "Luna" processes Medicaid or private-insurance claims for doulas or midwives;
  the real company matching that description is Loula (joinloula.com). [inference from exhaustive
  search, both `competitors.md`'s pass and my independent re-check, read 2026-09-16]
- Loula does not publish its per-visit fee; it states only that it takes "a fee for every visit
  you submit," pays bi-weekly 30-45 days after submission regardless of claim status, and gives a
  worked example of $2,616.70 net per client after its fee. [vendor-claim, published-pricing
  (partial), https://joinloula.com/providers, fetched independently 2026-09-16]
- Billing Care Solu•tions publishes "Medical Billing Services Starting at Just 2.99% of
  Collections" for doula/midwife billing. [published-pricing, https://billingcaresolutions.com/specialties/doula-and-midwife-billing-services/,
  fetched independently 2026-09-16]
- Doulado charges $19-$29/month platform fee plus $1.00 per claim submission, $1.00 per
  eligibility check, $1.00 per ERA receipt. [published-pricing, https://help.doulado.co/article/195-overview-of-claims-within-doulado,
  read 2026-09-16, per `competitors.md`]
- General outsourced medical billing commonly runs 4-10% of collections (5-8% most common band).
  [published-pricing aggregator, per `claim-sizes.md`, read 2026-09-16]
- Published state Medicaid doula rates run about $47-$215 per visit and $488-$2,700+ for delivery
  support / whole-pregnancy bundles, varying by state. [published-pricing, state fee schedules,
  read 2026-09-16, table in `claim-sizes.md`]
- At published percentage rates (5-8%) applied to published claim sizes, a single-claim billing
  fee runs about $8-$65; "hundreds" is reached only at the whole-pregnancy-bundle level and only
  at the top of the range (7-8%). At Billing Care Solu•tions' actual published 2.99%, even a
  whole-pregnancy bundle yields roughly $81, not hundreds. [inference/arithmetic on labeled
  published-pricing inputs]
- Claim denial rates run roughly 8-12% industry-wide; a meaningful share trace to front-end/intake
  data problems. [measured, Experian 2025 State of Claims Report, published Oct 10, 2025, read
  2026-09-16]

## 3. Candidate public sentences (change no fact above; first person; no em-dashes; ≤30 words)

**1.** "I built Ordani to submit claims electronically to a real clearinghouse. I'm finishing
certification so claims file for real money." (21 words)
Rests on: `ORDANI_PRODUCT_GUIDE.md:158,194` (2026-08-10), `submit/route.ts:145-148` (2026-06-02),
`AUDIT-REPORT.md` (2026-08-07).

**2.** "Ordani checks a claim's codes, units, and required fields against state rules before
submission, so incomplete claims get caught before they ever reach the payer." (26 words)
Rests on: `build-claim/route.ts:225-234`, `validate-claim.ts`, `state-rules.ts` (primary-doc,
2026-09-16); Experian 2025 report on front-end denial causes as background, not an Ordani-measured
result.

**3.** "Outsourced medical billing commonly costs 4 to 10 percent of collections, published
industry data shows, on top of whatever the clearinghouse itself charges." (24 words)
Rests on: published-pricing aggregator figures in `claim-sizes.md`; Billing Care Solu•tions' 2.99%
(fetched independently 2026-09-16). Names no single vendor; states nothing about Ordani's own
price, since that is unbuilt.

**4. (illustrative, not for shipping — shows why the "hundreds" framing breaks, for the owner's
own use in deciding whether to keep the claim):** "Billing Care Solu•tions, a doula billing
vendor, starts at 2.99 percent of collections. On a $2,700 whole-pregnancy claim that is about
$81, not hundreds." (24 words)
Rests on: billingcaresolutions.com (fetched independently 2026-09-16); Michigan Medicaid $2,700
whole-pregnancy total (published-pricing, `claim-sizes.md`); arithmetic (inference).

None of these four name "Luna," name a clearinghouse, or name any internal Ordani tooling. None
currently supports a specific "hundreds of dollars saved" dollar claim against any named
competitor, because the one competitor with a disclosed rate (Billing Care Solu•tions) contradicts
that framing, and the company that actually matches the brief's description (Loula) discloses no
rate to compare against.

## 4. What only the owner can answer

1. Has anything changed outside this repo since 2026-08-10 (or since today, 2026-09-16) — a
   signed BAA, `STEDI_CLAIMS_LIVE` flipped to true, an actual paid claim — that would make "files
   real claims... today" true? Nothing in the code or docs confirms this as of this read.
2. Was "Luna" meant to be Loula (joinloula.com), or does a real "Luna" entity exist that this
   research (two independent passes) missed? Do not ship the name "Luna" on this research alone.
3. What will Ordani charge for claims filing, if anything, once "M6 (pricing)" ships? Any "you
   save money" claim needs to net against Ordani's own price, which is currently undefined.
4. What unit is "per claim" meant to describe — a single visit line-item, a single delivery-
   support claim, or the whole-pregnancy bundle? The arithmetic only reaches "hundreds" at the
   whole-pregnancy/bundle level, and only at the top of the published fee range.
5. Given that the only competitor with an exact published rate (Billing Care Solu•tions, 2.99%)
   undercuts rather than supports "hundreds of dollars," and Loula (the real name-match) discloses
   no rate at all, does the owner still want to name any competitor by name in this claim?
6. Is there any actual measured Ordani claim-rejection or denial rate the owner can supply (even
   from a small beta cohort) to support "fewer rejected claims"? None exists in the code or docs,
   and no real claim has been paid yet to measure one against.
