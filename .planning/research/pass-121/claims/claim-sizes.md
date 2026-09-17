# Claim sizes and rejections — research for Pass-121 (ORDANI claims leg)

Read date for all web facts below: 2026-09-16. `competitors.md` did not exist in this
research folder at write time, so leg 2 uses the common published range for percentage-based
medical billing fees instead of a locked competitor number.

## 1. State Medicaid doula fee schedules — published rates

| State | Prenatal visit | Postpartum visit | Labor & delivery support | Total per pregnancy (typical path) | Label / source |
|---|---|---|---|---|---|
| California (Medi-Cal FFS) | $162.11 | $162.11 (extended 3-hr: $486.36) | Vaginal: $685.07 · C-section: $795.73 | Initial visit $197.98 + prenatal/postpartum visits + delivery support; DHCS does not publish one fixed per-pregnancy total (visit count varies) | published-pricing — [DHCS Doula Billing Codes Chart](https://www.dhcs.ca.gov/providers-partners/medi-cal-ffs-doula-billing-codes-chart/) / [FierceHealthcare summary of the DHCS rate](https://www.fiercehealthcare.com/regulatory/medi-cal-will-cover-doulas-more-twice-californias-initial-proposed-rate) (rates effective Jan 1, 2024, set at 87.5% of the lowest statewide Medicare rate) |
| New York (Medicaid FFS) | $93.75/visit NYC, $84.37/visit ROS (up to 8 visits) | included in the same per-visit rate above | $750 NYC / $675 ROS (one encounter) | Up to $750 NYC ($675 ROS) prenatal+postpartum + $750 NYC ($675 ROS) labor & delivery, roughly $1,500 NYC / $1,350 ROS max | published-pricing — [NYS Medicaid Doula Services Benefit](https://www.health.ny.gov/health_care/medicaid/program/doula/index.htm) / [eMedNY Doula Policy Guidelines](https://www.emedny.org/ProviderManuals/Doula/PDFS/Doula_Policy_Guidelines.pdf) (MMC benefit add effective April 1, 2025) |
| New Jersey (Medicaid) | included in bundled visit rate | included in bundled visit rate | included in bundled visit rate | Standard care (8 visits + L&D): $800.08; Enhanced care (age 19 or younger, 12 visits + L&D): $1,066; plus $100 postpartum follow-up incentive both tiers | published-pricing — [NASHP: NJ Medicaid maternal health policies](https://nashp.org/new-jersey-medicaid-implements-new-policies-to-improve-maternal-health/) |
| Oregon (OHP FFS) | $215/visit (up to 8, bundled as "global package") | same $215/visit | $645 (day-of-delivery) | Global package: $1,505 total (4 support visits + delivery support) | published-pricing — [OHA Birth Doula Fee-for-Service Billing Guide, Jan 2025](https://www.oregon.gov/oha/EI/THW%20Documents/Doula%20Billing%20Guide%20Jan%202025.pdf) |
| Minnesota (Medicaid) | $47/visit (2019 published rate; state has since raised the aggregate cap) | $47/visit (2019) | $488 (2019) | Program aggregate reported at up to $3,200 in current CCF/NACPM tracking, but no 2025/2026 per-visit breakdown was found in this pass | published-pricing (2019 line items) plus vendor-claim/inference (current $3,200 aggregate, not visit-itemized) — [MN DHS doula topic sheet](https://www.health.state.mn.us/docs/people/wic/localagency/topicmonth/doulacare.pdf) / [CCF state tracker](https://ccf.georgetown.edu/2025/06/03/doula-medicaid-reimbursement-rates-by-state/) — flagged for follow-up, do not cite the $3,200 figure as visit-itemized |
| Michigan (Medicaid) | $100/visit | $100/visit | $1,500 | Up to 12 visits x $100 plus $1,500 delivery, roughly $2,700 max (effective Oct 1, 2024) | published-pricing — [MI Blue Cross Complete: MDHHS doula rate update, March 2025](https://www.mibluecrosscomplete.com/amslibs/content/dam/microsites/blue-cross-complete/provider/bcc-doula-update-march-2025.pdf) |
| Virginia (Medicaid) | bundled | bundled | bundled | $859 total for up to 8 prenatal/postpartum visits (90 minutes or less each) through labor and delivery, plus $100 linkage-to-care incentive ($50 x 2) | published-pricing — [NASHP: Virginia doula investment](https://nashp.org/virginia-invests-in-doulas-to-improve-maternal-health-outcomes/) (rate as of Jan 2025) |
| Illinois (Medicaid) | rate schedule exists but exact dollar figures were not extractable in this pass | — | — | not confirmed this pass | inference — [IL HFS Doula Fee Schedule page](https://hfs.illinois.gov/medicalproviders/medicaidreimbursement/doula.html) confirms a schedule exists (2026 version effective 05/01/2026) but line-item rates need a direct PDF pull; do not cite an IL dollar figure without re-verifying |
| Florida | no published statewide Medicaid doula benefit found in this pass | — | — | — | inference — no primary-doc found; Florida does not appear on the confirmed-benefit list in the sources checked |

Private insurance (non-Medicaid): most private plans still do not cover doula care as a
standard benefit. Only a handful of states mandate it: Virginia (effective Jan 1, 2025),
Colorado (effective July 1, 2025), Illinois (effective Jan 1, 2026), plus earlier mandates in
California, Louisiana, and Rhode Island. Louisiana caps insurer liability at $1,500 per
pregnancy; Virginia's mandate requires coverage of at least 8 visits plus labor and delivery
support (dollar rate not separately published from the Medicaid rate above). Label:
published-pricing (LA cap) plus vendor-claim (mandate existence, sourced to advocacy trackers,
not a payer fee schedule). Source: [National Health Law Program, Private Insurance Coverage of Doula Care — Spring 2025 State of the States](https://healthlaw.org/private-insurance-coverage-of-doula-care-spring-2024-state-of-the-states/).

## 2. Would a percentage-based billing fee run "hundreds of dollars per claim"?

`competitors.md` was not present in `.planning/research/pass-121/claims/` when this file was
written, so this uses the commonly published range for percentage-of-collections medical
billing services rather than a single named competitor's locked rate.

Published range: percentage-based medical billing services commonly charge 4 percent to 10
percent of collections, with 5 percent to 8 percent cited as the most common band, and 2025
market data putting the average nearer 5.5 percent to 7.2 percent. Label: published-pricing.
Sources: [PRCP MD, Medical Billing Company Rates with Percentage-Based Model](https://www.prcpmd.com/post/medical-billing-company-rates); [Best Medical Billing, Guide to Medical Billing Services Cost in 2025](https://bestmedicalbilling.com/blogs/medical-billing-services-cost-pricing/); [Pharmbills, How Much Does Medical Billing Service Cost in 2025](https://pharmbills.com/blog/how-much-does-medical-billing-service-cost-in-2025).

Arithmetic, applying 5 percent to 8 percent to the published claim sizes above:

| Claim unit | Claim value | Fee at 5% | Fee at 8% | "Hundreds of dollars"? |
|---|---|---|---|---|
| CA prenatal/postpartum visit | $162.11 | $8.11 | $12.97 | No, single dollars |
| CA vaginal delivery support | $685.07 | $34.25 | $54.81 | No, tens of dollars |
| CA cesarean delivery support | $795.73 | $39.79 | $63.66 | No, tens of dollars |
| NY full episode (NYC max) | $1,500 | $75.00 | $120.00 | Borderline, low hundreds only at the top of the range and only on the full-episode total, not a single claim |
| NJ enhanced care full episode | $1,066 | $53.30 | $85.28 | No |
| MI full pregnancy (12 visits plus delivery) | $2,700 | $135.00 | $216.00 | Yes, at the high end, but only on the whole-pregnancy total, not a single claim |
| OR global package (whole pregnancy) | $1,505 | $75.25 | $120.40 | Borderline, whole-pregnancy total only |

Conclusion on plausibility: "Hundreds of dollars per claim" is not plausible for a single
line-item claim (a prenatal visit, a postpartum visit, even one delivery-support claim) at
published doula Medicaid rates. Those run from about $8 to $65 in billing-fee terms even at
the top of the published percentage range. It becomes plausible only when "per claim" is read
as the whole-pregnancy bundle (Michigan's $2,700 max, or a private-pay cash doula fee in the
$1,500-$3,000-plus range, which this leg did not cover) and even then it clears "hundreds"
only in the upper half of the published fee range (7-8 percent), not at the low end (4-5
percent). Label: inference (arithmetic applied to labeled published-pricing inputs).

Recommendation for the case-study copy: the claim as written ("hundreds of dollars per
claim") needs either a defined "claim" that means the whole-pregnancy Medicaid bundle (and
even then only holds at percentage rates of 7 percent or higher), or a different comparison
basis entirely, such as a flat per-claim fee some billing services charge rather than
percentage-based, which this leg did not find published pricing for. This is a discrepancy for
the owner or copy ruling, not resolved by this research pass.

## 3. Claim rejection and denial evidence, 2025-2026

- Initial denial rate trend: climbed from 10.2 percent (2020) to 11.8 percent (2024)
  industry-wide. Label: measured (aggregated industry survey and claims data). Source: cited
  via [gomedicalbilling.com industry benchmarks summary](https://www.gomedicalbilling.com/medical-billing-denial-statistics-2026), referencing Experian and CAQH tracking. Treat this
  10.2-to-11.8-percent trend line as secondary until traced to its primary table; the directly
  fetched Experian figure below is the confirmed one.
- Directly verified (Experian 2025 State of Claims Report, published Oct 10, 2025, survey of
  250 healthcare revenue-cycle leaders): 41 percent of respondents report "at least one in ten
  claims is denied" (a 10 percent or higher denial rate at those organizations); 54 percent of
  providers say denials are increasing; 26 percent of denials trace to inaccurate or
  incomplete data collected at intake, and the top three denial causes are missing or
  inaccurate data, authorization issues, and incomplete patient info. Label: measured
  (survey-based). Source: [Experian Health, Healthcare Claim Denials Statistics — State of Claims Report 2025](https://www.experian.com/blogs/healthcare/healthcare-claim-denials-statistics-state-of-claims-report/) (read 2026-09-16; article dated Oct 10, 2025).
- Payer-type breakdown (secondary, not independently re-verified against a primary table this
  pass): Medicare Advantage plans denying roughly 15.7 percent of initial claims; ACA
  marketplace plans denying roughly 19.1 percent of in-network claims. Label: vendor-claim
  (aggregator blog summarizing CAQH and Experian data; flagged for primary-source verification
  before use in copy).
- CAQH Index 2025 (referenced but not directly fetched; the direct URL 301-redirected to a
  mirror not re-fetched this pass): headline claim is that the industry avoided $258 billion
  via automation; denial-rate figures from this specific report were not independently
  confirmed in this pass. Label: vendor-claim, unverified this pass. Do not cite specific CAQH
  percentages without a follow-up fetch of the primary report. Source (unverified redirect
  target): [CAQH blog, 2025 CAQH Index](https://www.caqh.org/blog/2025-caqh-index-shows-u.s.-healthcare-avoided-258-billion-and-accelerated-automation-interoperability-and-ai-adoption).
- Front-end and preventable share: commonly cited that 60-70 percent of denials trace to
  front-end errors (eligibility, patient data issues), and real-time eligibility verification
  can reduce eligibility-related denials by 60-80 percent. HFMA's acceptable benchmark is a
  5-10 percent denial rate; MGMA data shows an aggregate first-submission denial rate near 8
  percent, with under 5 percent considered strong performance. Label: vendor-claim (RCM
  industry blogs: Riveth Health, MD Clarity, and an i-Conic industry rates page, none
  independently cross-checked against a primary HFMA or MGMA document this pass). Sources: [Rivethealth, front-end issues cause about half of denials](https://www.rivethealth.com/blog/front-end-issues-cause-about-half-of-denials); [MD Clarity, Front-End Denial Rate](https://www.mdclarity.com/rcm-metrics/front-end-denial-rate).
- Cost to rework a denied claim: commonly cited range of $25 to $181 per claim depending on
  denial complexity and provider size (an industry average figure of $57.23 is also cited, up
  from $43.84 in 2022); medical practices average roughly $25 per claim to rework, hospitals up
  to $181 per claim for complex appeals. American Hospital Association estimate: hospitals
  spent roughly $43 billion in 2025 trying to collect from insurers, including roughly $18
  billion overturning denials. Label: vendor-claim (RCM industry blogs) for the per-claim
  range; measured (AHA estimate, methodology not independently reviewed this pass) for the
  $43B and $18B figures. Sources: [Enter.Health, What Does a Denied Claim Really Cost](https://www.enter.health/post/denied-claim-cost-denial-management-roi); [Aptarro, 50+ US Healthcare Denial Rates and Reimbursement Statistics for 2026](https://www.aptarro.com/insights/us-healthcare-denial-rates-reimbursement-statistics).

Bottom line for "fewer rejected claims" copy: there is solid measured evidence that denial
rates run roughly 8-12 percent industry-wide with wide payer variance, that a majority of
denials are front-end or preventable (eligibility, data-entry, authorization), and that
reworking a denied claim costs real money ($25-$181-plus per claim, industry average near
$57). This supports a directional "front-end eligibility checks reduce rejected claims" claim,
but none of the sources found this pass measure Ordani's own rejection rate against a
baseline. Any Ordani-specific rejection-rate number needs its own measured source, not this
general industry data.

## Flags for the copy owner

1. Minnesota's $3,200 figure is an aggregate cap reported by trackers, not an itemized rate.
   Don't quote it as a per-visit number.
2. Illinois and Florida rates were not confirmed with dollar figures this pass. Do not cite
   specific IL or FL numbers without a follow-up fetch.
3. "Hundreds of dollars per claim" only holds arithmetically against a whole-pregnancy bundle
   at the top of the published billing-fee range (7-8 percent), not against any single
   line-item claim. The case-study claim needs either a redefined unit or the owner's explicit
   basis.
4. CAQH Index 2025 denial-rate specifics were not independently fetched (redirect not
   followed). Treat any CAQH percentage as unverified until re-pulled from the primary report.
