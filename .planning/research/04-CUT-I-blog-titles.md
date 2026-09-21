<!-- PROVENANCE. Copied 2026-09-21 from C:/Users/micah/Code/reddit-research/cuts/cut_i_blog_titles.md (script cut_i_blog_titles.py,
written and run by Sol over three rounds; round 3 passes Cut E liveness AND a probe proof reproducing nine Cut E
families exactly). Quotes are public posts, max 25 words, no handles, ids, URLs or subreddit names. INTERNAL RESEARCH:
no rate, share or ratio from this file reaches a site surface (LESSONS #3, the Pass-124 figures row). -->

# Cut I: Blog titles against answered-ratio data

## Population E liveness

| Measure | Expected | Actual | Status |
|---|---:|---:|:---:|
| Raw corpus lines | 5,456 | 5,456 | OK |
| Posts with len(clean(body)) >= 250 | 4,464 | 4,464 | OK |
| Distinct authors of analysed posts | 3,842 | 3,842 | OK |
| ASKING posts (STUCK matched) | 607 | 607 | OK |
| Distinct ASKING authors | 567 | 567 | OK |
| Business ASKING posts | 284 | 284 | OK |
| Distinct business ASKING authors | 261 | 261 | OK |
| Developer ASKING posts | 323 | 323 | OK |
| Distinct developer ASKING authors | 307 | 307 | OK |

## Probe proof: Cut E families reproduced

| Cut E family | Expected ASKING posts | Actual ASKING posts | Expected authors | Actual authors | Status |
|---|---:|---:|---:|---:|:---:|
| deploy, production, works locally | 59 | 59 | 58 | 58 | OK |
| auth, login | 47 | 47 | 45 | 45 | OK |
| hire, co-founder, contractor | 44 | 44 | 43 | 43 | OK |
| landing page | 35 | 35 | 34 | 34 | OK |
| conversion rate, signups | 34 | 34 | 32 | 32 | OK |
| real/first/early users, first customers | 29 | 29 | 29 | 29 | OK |
| cold outreach, cold email | 13 | 13 | 12 | 12 | OK |
| crickets, no signups, nobody signed up | 4 | 4 | 4 | 4 | OK |
| hipaa, soc 2, gdpr | 0 | 0 | 0 | 0 | OK |

## Population E summary

| # | Short intent | Asking posts | Authors | 0c authors / % | Median | Biz/dev authors | Whole-set posts | THIN flag |
|---:|---|---:|---:|---:|---:|---:|---:|:---:|
| Base | All ASKING posts | 607 | 567 | 84/567 (14.8%) | 4 | 261/307 | 4464 |  |
| 3 | Traffic, no conversion | 58 | 56 | 11/56 (19.6%) | 3 | 48/8 | 443 |  |
| 14 | Who to hire | 44 | 43 | 5/43 (11.6%) | 10.5 | 37/6 | 224 |  |
| 1 | Shipped, no users | 33 | 33 | 2/33 (6.1%) | 6 | 29/4 | 207 |  |
| 4 | Builder cannot sell | 14 | 13 | 4/13 (30.8%) | 3 | 13/0 | 86 |  |
| 2 | MVP to production | 3 | 3 | 0/3 (0.0%) | 21 | 0/3 | 11 | THIN |
| 13 | Customer discovery | 2 | 2 | 0/2 (0.0%) | 6.5 | 2/0 | 23 | THIN |
| 5 | Fixed-scope pricing | 1 | 1 | 0/1 (0.0%) | 38 | 1/0 | 3 | THIN |
| 6 | RFPs and proposals | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 1 | THIN |
| 7 | Solo provider clients | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 0 | THIN |
| 8 | Solo insurance billing | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 1 | THIN |
| 9 | Content repurposing | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 5 | THIN |
| 10 | Small-team HIPAA | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 20 | THIN |
| 11 | Unclear security term | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 0 | THIN |
| 12 | Regressions everywhere | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 3 | THIN |
| 15 | AI production readiness | 0 | 0 | 0/0 (0.0%) | 0 | 0/0 | 7 | THIN |

Rows are sorted by distinct authors. Biz/dev is the distinct-author split; an author may appear in both rooms.

## Population ALL denominators (new, not comparable to Cut E)

| Measure | Actual |
|---|---:|
| Raw corpus lines | 20,734 |
| Posts with len(clean(body)) >= 250 | 16,904 |
| Distinct authors of analysed posts | 13,981 |
| ASKING posts (STUCK matched) | 1,539 |
| Distinct ASKING authors | 1,440 |
| ASKING posts — AskHN | 380 |
| ASKING posts — buildinpublic | 61 |
| ASKING posts — ChatGPTCoding | 17 |
| ASKING posts — ClaudeAI | 61 |
| ASKING posts — cursor | 89 |
| ASKING posts — DevTo | 0 |
| ASKING posts — EntrepreneurRideAlong | 40 |
| ASKING posts — forhire | 14 |
| ASKING posts — founder | 56 |
| ASKING posts — GitHub | 24 |
| ASKING posts — micro_saas | 51 |
| ASKING posts — microsaas | 46 |
| ASKING posts — nextjs | 117 |
| ASKING posts — roastmystartup | 51 |
| ASKING posts — SaaS | 78 |
| ASKING posts — SaasDevelopers | 50 |
| ASKING posts — ShowHN | 255 |
| ASKING posts — Solopreneur | 51 |
| ASKING posts — startups | 59 |
| ASKING posts — webdev | 39 |

## Population ALL summary

| # | Short intent | Asking posts | Authors | 0c authors / % | Median | Biz/dev/other authors | Whole-set posts | THIN flag |
|---:|---|---:|---:|---:|---:|---:|---:|:---:|
| Base | All ASKING posts | 1539 | 1440 | 391/1440 (27.2%) | 2 | 261/307/886 | 16904 |  |
| 3 | Traffic, no conversion | 132 | 117 | 32/117 (27.4%) | 2 | 48/8/64 | 1320 |  |
| 14 | Who to hire | 117 | 111 | 21/111 (18.9%) | 3 | 37/6/71 | 1031 |  |
| 1 | Shipped, no users | 75 | 71 | 14/71 (19.7%) | 3 | 29/4/40 | 669 |  |
| 4 | Builder cannot sell | 33 | 32 | 9/32 (28.1%) | 3 | 13/0/19 | 188 |  |
| 2 | MVP to production | 4 | 4 | 0/4 (0.0%) | 18 | 0/3/1 | 38 | THIN |
| 13 | Customer discovery | 4 | 4 | 0/4 (0.0%) | 5.5 | 2/0/2 | 53 | THIN |
| 5 | Fixed-scope pricing | 1 | 1 | 0/1 (0.0%) | 38 | 1/0/0 | 15 | THIN |
| 6 | RFPs and proposals | 1 | 1 | 0/1 (0.0%) | 22 | 0/0/1 | 3 | THIN |
| 10 | Small-team HIPAA | 1 | 1 | 0/1 (0.0%) | 41 | 0/0/1 | 80 | THIN |
| 12 | Regressions everywhere | 1 | 1 | 0/1 (0.0%) | 11 | 0/0/1 | 6 | THIN |
| 7 | Solo provider clients | 0 | 0 | 0/0 (0.0%) | 0 | 0/0/0 | 1 | THIN |
| 8 | Solo insurance billing | 0 | 0 | 0/0 (0.0%) | 0 | 0/0/0 | 5 | THIN |
| 9 | Content repurposing | 0 | 0 | 0/0 (0.0%) | 0 | 0/0/0 | 20 | THIN |
| 11 | Unclear security term | 0 | 0 | 0/0 (0.0%) | 0 | 0/0/0 | 0 | THIN |
| 15 | AI production readiness | 0 | 0 | 0/0 (0.0%) | 0 | 0/0/0 | 15 | THIN |

Rows are sorted by distinct authors. Biz/dev/other is the distinct-author split; an author may appear in more than one bucket.

## 1. Shipped, no users

Reader problem: Launched or shipped a product and got no or almost no users, signups or customers.

Pattern (case-insensitive):

```regex
\bcrickets\b|\bno\s+sign[\s\-]?ups?\b|\bzero\s+sign[\s\-]?ups?\b|\b(?:nobody|no\s+one)\s+signed\s+up\b|\b(?:real|first|early)\s+users?\b|\bfirst\s+customers?\b|\bno traction\b|\bno customers?\b|\blaunch(?:ed)? to silence\b
```

Top matching alternations: `\b(?:real|first|early)\s+users?\b` (51); `\bno\s+sign[\s\-]?ups?\b` (12); `\bfirst\s+customers?\b` (6); `\bno traction\b` (3); `\bcrickets\b` (2)

Question excerpts:

> First small win for my SaaS: one user signed up — how do I attract more early adopters? [business]

> * Any advice on how to validate the idea or reach early users? [business]

> * Did you go cheap to get early users or price higher to filter serious customers? [business]

## 2. MVP to production

Reader problem: The demo or MVP works, but taking it to production (deploy, reliability, scale) is where it fails.

Pattern (case-insensitive):

```regex
\bdeploy(?:ment)? failures?\b|\bproduction failures?\b|\bworks? locally\b|\bworks? on my machine\b|\bdeployment keeps failing\b|\bproduction keeps crashing\b|\bscaling problems?\b|\bnot production ready\b|\bproduction issues?\b
```

Top matching alternations: `\bproduction issues?\b` (2); `\bdeploy(?:ment)? failures?\b` (1); `\bworks? locally\b` (1); `\bproduction failures?\b` (0); `\bworks? on my machine\b` (0)

Question excerpts:

> How did you get better at debugging production issues? [developer]

> Strange Next.js production issue that I can’t reproduce locally – any ideas? [developer]

## 3. Traffic, no conversion

Reader problem: The landing page gets visitors but does not convert.

Pattern (case-insensitive):

```regex
\blanding\s+pages?\b|\bconversion\s+rates?\b|\bsign[\s\-]?ups?\b|\bhigh bounce rate\b|\bnot convert(?:ing)?\b|\blow conversion\b|\btraffic not converting\b|\bvisitors not converting\b
```

Top matching alternations: `\blanding\s+pages?\b` (74); `\bsign[\s\-]?ups?\b` (66); `\bconversion\s+rates?\b` (13); `\bnot convert(?:ing)?\b` (2); `\bhigh bounce rate\b` (0)

Question excerpts:

> I built an AI website generator for high-converting landing pages. Would you use it ? [other]

> Hasn't Corporate America Enshittified Job Searching Enough? [other]

> **What would you do next?** (Sign up? [other]

## 4. Builder cannot sell

Reader problem: A technical founder can build but cannot sell or do sales.

Pattern (case-insensitive):

```regex
\bcold\s+(?:outreach|email(?:s|ing)?)\b|\bcan(?:not|'t) sell\b|\bstruggl(?:e|es|ed|ing) with sales\b|\bno sales experience\b|\bhate selling\b|\bsales feels impossible\b|\bhow to sell\b|\bsales not working\b
```

Top matching alternations: `\bcold\s+(?:outreach|email(?:s|ing)?)\b` (30); `\bcan(?:not|'t) sell\b` (1); `\bstruggl(?:e|es|ed|ing) with sales\b` (1); `\bno sales experience\b` (1); `\bhow to sell\b` (1)

Question excerpts:

> Should I focus on my current users or continue to do outreach and scale? [business]

> Ask HN: How to sell SaaS without AI features in 2026? [other]

> Been building for a while and I'm a little lost. Can you guys help? [business]

## 5. Fixed-scope pricing

Reader problem: Pricing a fixed-scope or productized service when the scope is unclear.

Pattern (case-insensitive):

```regex
\bfixed[\s-]scope\b|\bfixed[\s-]price projects?\b|\bproductized services?\b|\bunclear scope\b|\bpricing a project\b|\bproject quotes?\b|\bestimat(?:e|ing) project fees?\b|\bscope keeps changing\b
```

Top matching alternations: `\bpricing a project\b` (1); `\bfixed[\s-]scope\b` (0); `\bfixed[\s-]price projects?\b` (0); `\bproductized services?\b` (0); `\bunclear scope\b` (0)

Question excerpts:

> Am I doing something unethical here? [business]

## 6. RFPs and proposals

Reader problem: Writing or keeping up with RFPs, proposals or bids; using AI to draft them.

Pattern (case-insensitive):

```regex
\brequests? for proposals?\b|\brfps?\b|\bproposal writing\b|\bproposal deadlines?\b|\bdraft(?:ing)? a proposal\b|\bbid writing\b|\btoo many proposals\b|\bproposal backlog\b|\bresponding to rfps?\b
```

Top matching alternations: `\brfps?\b` (1); `\brequests? for proposals?\b` (0); `\bproposal writing\b` (0); `\bproposal deadlines?\b` (0); `\bdraft(?:ing)? a proposal\b` (0)

Question excerpts:

No qualifying question sentence found.

## 7. Solo provider clients

Reader problem: A solo service provider (practitioner, coach, freelancer) cannot get enough clients or bookings.

Pattern (case-insensitive):

```regex
\bnot enough clients?\b|\bneed more clients?\b|\bno new clients?\b|\bempty calendar\b|\bgetting more bookings?\b|\bstruggling for clients?\b|\bfind coaching clients?\b|\bfreelance work dried up\b
```

Top matching alternations: `\bnot enough clients?\b` (0); `\bneed more clients?\b` (0); `\bno new clients?\b` (0); `\bempty calendar\b` (0); `\bgetting more bookings?\b` (0)

Question excerpts:

No qualifying question sentence found.

## 8. Solo insurance billing

Reader problem: Billing insurance or Medicaid directly as a solo practitioner; claims and billing fees.

Pattern (case-insensitive):

```regex
\bmedicaid billing\b|\binsurance claims?\b|\bclaim denials?\b|\bbilling insurance\b|\breimbursement rates?\b|\bcredentialing with insurance\b|\binsurance billing fees?\b|\bclaims keep getting denied\b|\bsolo practice billing\b
```

Top matching alternations: `\bmedicaid billing\b` (0); `\binsurance claims?\b` (0); `\bclaim denials?\b` (0); `\bbilling insurance\b` (0); `\breimbursement rates?\b` (0)

Question excerpts:

No qualifying question sentence found.

## 9. Content repurposing

Reader problem: Turning one piece of content (a video) into posts for many platforms without a team.

Pattern (case-insensitive):

```regex
\bcontent repurposing\b|\brepurpose a video\b|\bvideo into posts\b|\bmultiple platforms\b|\bcross[\s-]platform content\b|\bturn content into posts\b|\bno content team\b|\bcontent takes too long\b
```

Top matching alternations: `\bcontent repurposing\b` (0); `\brepurpose a video\b` (0); `\bvideo into posts\b` (0); `\bmultiple platforms\b` (0); `\bcross[\s-]platform content\b` (0)

Question excerpts:

No qualifying question sentence found.

## 10. Small-team HIPAA

Reader problem: What HIPAA compliance actually requires for a small or solo team building health software.

Pattern (case-insensitive):

```regex
\bhipaa\b|\bsoc\s?-?\s?2\b|\bgdpr\b|\bhipaa requirements?\b|\bhipaa compliance\b|\bcompliance for startups?\b|\bhandling health data\b|\bprotected health information\b|\bbusiness associate agreements?\b|\bsecurity compliance unclear\b
```

Top matching alternations: `\bsoc\s?-?\s?2\b` (1); `\bhipaa\b` (0); `\bgdpr\b` (0); `\bhipaa requirements?\b` (0); `\bhipaa compliance\b` (0)

Question excerpts:

No qualifying question sentence found.

## 11. Unclear security term

Reader problem: A vendor or security term the asker does not understand (network visibility, internal traffic, zero trust).

Pattern (case-insensitive):

```regex
\bneed network visibility\b|\bcan(?:not|'t) see traffic\b|\bmonitor internal traffic\b|\bunderstand zero trust\b|\bzero trust confusion\b|\bsecurity terminology\b|\bsecurity term meaning\b|\bconfused by security\b
```

Top matching alternations: `\bneed network visibility\b` (0); `\bcan(?:not|'t) see traffic\b` (0); `\bmonitor internal traffic\b` (0); `\bunderstand zero trust\b` (0); `\bzero trust confusion\b` (0)

Question excerpts:

No qualifying question sentence found.

## 12. Regressions everywhere

Reader problem: Every fix breaks something else; regressions; the codebase fights back.

Pattern (case-insensitive):

```regex
\bevery fix breaks\b|\bkeeps breaking things\b|\bnew regressions?\b|\bregression bugs?\b|\bwhack[\s-]a[\s-]mole\b|\bcodebase fights back\b|\btests keep failing\b|\bfix broke something else\b
```

Top matching alternations: `\bwhack[\s-]a[\s-]mole\b` (1); `\bevery fix breaks\b` (0); `\bkeeps breaking things\b` (0); `\bnew regressions?\b` (0); `\bregression bugs?\b` (0)

Question excerpts:

No qualifying question sentence found.

## 13. Customer discovery

Reader problem: Finding or talking to real customers; validating demand; where buyers actually talk.

Pattern (case-insensitive):

```regex
\bcustomer interviews?\b|\bvalidat(?:e|ing) demand\b|\bfind real customers?\b|\bwhere buyers talk\b|\btalk to users?\b|\bcustomer discovery\b|\bvalidate my idea\b|\bfind target customers?\b|\bidentify ideal customers?\b
```

Top matching alternations: `\bvalidat(?:e|ing) demand\b` (2); `\bcustomer interviews?\b` (1); `\bvalidate my idea\b` (1); `\bfind real customers?\b` (0); `\bwhere buyers talk\b` (0)

Question excerpts:

> How do you validate demand when you can’t realistically sell the product without first building a large part of the curriculum? [business]

> How do you know if idea is worth to build? [business]

## 14. Who to hire

Reader problem: Whether to hire a fractional or embedded operator, an agency, a contractor or a full-time hire.

Pattern (case-insensitive):

```regex
\bhir(?:e|es|ed|ing)\b|\bco[\s\-]?founders?\b|\bcontractors?\b|\bfractional operator\b|\bembedded operator\b|\bagency or contractor\b|\bcontractor or employee\b|\boutsource or hire\b|\bfirst employee\b|\bwho to hire\b|\bneed a cofounder\b
```

Top matching alternations: `\bhir(?:e|es|ed|ing)\b` (79); `\bco[\s\-]?founders?\b` (42); `\bcontractors?\b` (3); `\bfractional operator\b` (0); `\bembedded operator\b` (0)

Question excerpts:

> Are you collecting hands or hiring the brain? [other]

> Hasn't Corporate America Enshittified Job Searching Enough? [other]

> Ask HN: How Do You Hire? [other]

## 15. AI production readiness

Reader problem: Whether an AI feature or LLM app is ready for production; evals, reliability, guardrails.

Pattern (case-insensitive):

```regex
\bproduction[\s-]ready ai\b|\bllm production ready\b|\bai reliability\b|\bllm reliability\b|\bai guardrails?\b|\bllm evaluations?\b|\bai evaluations?\b|\bmodel hallucinations?\b|\bproduction ai failures?\b|\bai feature ready\b
```

Top matching alternations: `\bproduction[\s-]ready ai\b` (0); `\bllm production ready\b` (0); `\bai reliability\b` (0); `\bllm reliability\b` (0); `\bai guardrails?\b` (0)

Question excerpts:

No qualifying question sentence found.

## Limits

Counts are public posts, not a census of buyers or problems. "Answered" means the post got one or more replies; no comment bodies exist, so reply quality is unknown. Any intent under 5 distinct authors is labelled THIN and is too small to rank. A zero is weak evidence, not evidence of absence.

Population ALL mixes Hacker News with Reddit; num_comments is the reply count on both.

Round 3 rebuilt the lexicons after round 2's two-phrase windows matched almost nothing; the probe-proof table shows the matcher reproduces Cut E.
