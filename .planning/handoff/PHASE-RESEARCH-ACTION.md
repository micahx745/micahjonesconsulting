# Phase brief — act on the research

Written 2026-09-03 at session handoff. This is the brief; `.claude/RESUME.md` is
state. Read both, then read the artifacts named below before proposing anything.

**The phase change is real.** Everything before this was building and correcting
the site on judgement. From here the work is driven by research that now exists.
The failure mode for this phase is doing another instinct-led pass and calling it
research-led.

---

## 1. Read these first, in this order

| # | Artifact | What it is |
| --- | --- | --- |
| 1 | `.planning/research/02-BUSINESS-CONTEXT.md` (39KB) | Every offer, every H1, title, meta description, CTA and problem statement **verbatim**; the claims ledger's operative rules; what evidence exists and what conspicuously does not; the funnel and its unknowns; eight operator priors labelled BELIEF |
| 2 | `.planning/research/02-APPENDIX-voice-rules.json` | The 35 forbidden words, sentence caps, preferred verbs, em-dash rule, as data. Separate file because the copy-lint write gate rejects a document that merely *quotes* the list |
| 3 | `.planning/reviews/PERSONA-REVIEW-2026-09-03.md` | Six personas against the live site. Scores, entry points, ranked findings, and what each one became |
| 4 | `.planning/research/reddit-seed.md` | The crawl SEED — subreddits and search terms by lane. **Not findings.** |
| 5 | **The Reddit findings package — NOT IN THIS REPO** | See §2 |
| 6 | `docs/LESSONS_LEARNED.md` §3 | The claims ledger. Outranks any memory of what the site says |

### The persona scores, as the baseline to beat

| Persona | Score |
| --- | --- |
| B2B founder, $5K/mo | 6/10 |
| Solo builder, $99–$7,500 | 7/10 |
| Technical recruiter | 2/10 (by design — ruled) |
| Hiring manager / VP | 6/10 |
| Procurement / security | 5/10 |
| Peer operator / referrer | 7/10 |

---

## 2. What is MISSING from this repo, and must be brought in

**The Reddit evidence package.** The operator described it as a year measured
bottom-up: 5,456 posts across ten subreddits, what people say they are stuck on,
and which rooms the pain and the money live in. **It was produced in a different
chat and is not on disk here.** `reddit-seed.md` is the seed I wrote, not the
findings.

Ask for it before starting. Without it this phase has the business half and none
of the market half, and any recommendation is instinct wearing a research label.

Expected filename by convention: `.planning/research/01-REDDIT-EVIDENCE.md`.

**The Fable research that came in.** The operator referred to a third package
arriving. If it is not in `.planning/research/`, ask. Do not proceed on a summary
of it given in conversation — put it on disk first. The persona review was nearly
lost exactly that way and had to be transcribed from a transcript.

---

## 3. The fact that reframes every recommendation

**Zero revenue has ever passed through this website.** No package has been
bought. The book has never been on sale.

**Traffic, corrected 2026-09-04.** An earlier version of this brief said no
traffic data had ever been collected. That was WRONG — `@vercel/analytics/next`
injects client-side, so a curl of the HTML cannot see it, and the API 404 was a
token-scope problem. Analytics has been running since ~2026-08-30.

Last 7 days: **26 visitors, 146 page views, 35% bounce.** Top pages `/` 19,
`/playbook` 15, `/services` 9, `/about` 7, `/book` 6. Referrers: `google.com` 1
and `checkout.stripe.com` 1 — the latter is the operator's own checkout test.

Three things follow, and they matter more than the headline numbers:

1. **`/playbook` is the second most-visited page**, ahead of `/services`. On 26
   visitors that is directional, not conclusive, but it is the only behavioural
   signal this business has ever had, and it points at the book.
2. **Organic search is bringing nobody.** One Google referrer in a week, against
   a well-built SEO surface. That is a gap, not a failure of the surface.
3. **26 visitors cannot evaluate copy.** Every copy, layout and funnel decision
   in this repo was still made without a measured conversion, and none has been
   tested. Treat them as untested — but no longer as unmeasurable. There is now a
   baseline to move.

When the research contradicts a current page, the research is the better
evidence: the page is only somebody's judgement, usually mine.

## 4. Open decisions the operator has NOT made

Do not resolve these unilaterally. Each needs his ruling.

| Decision | State |
| --- | --- |
| The VA-hiring lane | One real prospect paying $1,500/mo for a VA producing AI content. **N of 1.** Wedge is sharp — she is buying AI output with a human middleman — but no market validation. Researched as "Lane C" in the seed, not committed |
| Playbook launch date | "$99 at launch · $149 after · coming soon", no date. Open since 2026-09-01 |
| `/playbook` price raise timing | The $149 tier has no trigger |
| Chapter 10 | Three independent reviewers found it visibly thinner than the other nine. Fix or merge into ch9 |
| Site-wide role policy | Guardicore has no title; Postmates keeps "Product analyst" (his own ledger entry). Ask before any further title sweep |
| Naming the birth worker's service list | Currently described by breadth, not itemised. Deliberate — see §6 |

---

## 5. What is owed and unfinished

1. **A completed live purchase + refund.** Checkout authenticates and reaches
   Stripe. Nothing past the card is tested: webhook, kickoff email, attachments,
   `success_url`, refund echo. Runbook: `docs/MONEY-RAIL-TEST.md`.
2. **The live Stripe webhook destination may still be unregistered**, and
   `STRIPE_WEBHOOK_SECRET` may not be set in Vercel Production. If so, a real
   purchase takes the money and sends nothing. **Verify before promoting the
   packages anywhere.**
3. **Three stale artifacts**, recorded in the business context and deliberately
   left for the operator:
   - `/packages` still says "Pick one, email me" beside Buy buttons
   - `/about`'s meta says "A decade"; the page says thirteen years
   - `.claude/brand.json` declares an audience the positioning moved away from
4. **The book's chapter 10** — see §4.

---

## 6. Traps this phase will walk into

- **Verbatim means verbatim.** The business-context package quotes exact
  sentences because the research compares *his* language against *the market's*.
  A recommendation that paraphrases his copy cannot be evaluated.
- **Never publish a fact the ledger does not carry.** If a recommendation needs a
  number, a client name, a title or a date that is not in `LESSONS_LEARNED.md`
  §3, mark it NEEDS OPERATOR INPUT. Do not invent it, and do not promote a
  conversation aside into site copy without dating it in the ledger.
- **The industry author is never named**, on any surface, ever. The operator
  named them privately on 2026-09-03. That does not license publishing it.
- **The birth worker's service list is not itemised.** Abortion, pre-pregnancy
  and miscarriage care are her clinical practice; naming them on a consulting
  marketing page creates exposure for her that the proof does not need. Breadth
  only, unless he says otherwise.
- **A review is a reader, not an oracle.** Two of the six-persona findings
  inverted under checking. Verify every claim against the live DOM before acting,
  per LESSONS #1.
- **Two sessions run this tree.** Check `git status` and `git log` before the
  first write; stage by explicit path; never `git add -A`. This handoff itself
  collided once — a resume rewrite from another session was moved by mistake and
  had to be restored.
- **The build gate is the safety net.** copy-lint, vendor-gate, `next build`,
  then render-gate (LINKS / META / GLUE / DASH). Never bypass it. A change that
  breaks a voice or claims rule fails the build rather than shipping, which is
  the point.

---

## 7. How to run this phase

**Route by work class** (`C:/Users/micah/.claude/MODEL_ROUTING.md`). Copy,
positioning and claim-honesty calls are Fable. A locked plan, a known repro,
builds and deploys are Opus. Sweeps, formatting and probes are Sonnet.

**Arc shape.** The top tier's value is the ruling, not the loop. A Fable segment
ends by committing a brief to `.claude/briefs/<pass>-<slug>.md`, not by starting
the build. Budget 15 top-tier tool calls per arc.

**Suggested first move.** Do not start editing. Read the three packages, then
produce ONE document — a research-to-action map listing, per finding: the market
evidence, the site's current verbatim copy, the proposed change, and whether it
needs an operator ruling. Get that ruled on before touching a page. The whole
point of this phase is that the research decides, not the next opinion.

**Deploy is operator-owned.** Quote his approval verbatim with a date in the
resume before any push that reaches production.
