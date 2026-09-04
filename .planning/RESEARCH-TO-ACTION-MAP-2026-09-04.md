# Research-to-action map — 2026-09-04

The one document to rule on before any page changes. Per finding: **(a)** what
the evidence shows, **(b)** your current copy verbatim, **(c)** the proposed
change, **(d)** whether it needs your ruling.

**Nothing has been edited.** Every item below is a proposal.

---

## 0. What this is built from, and the hole in it

| Package | State |
| --- | --- |
| `.planning/research/02-BUSINESS-CONTEXT.md` | Read in full |
| `.planning/reviews/PERSONA-REVIEW-2026-09-03.md` | Read in full |
| **The Reddit evidence package** | **NOT ON DISK.** Still missing |

`.planning/research/reddit-seed.md` is the seed you wrote, not the findings.
So the **market half of this map does not exist yet**. Six findings below are
marked **NEEDS REDDIT** and left as open slots rather than guessed at. Everything
else stands on evidence that is already here: the live DOM, the claims ledger,
the traffic, and the persona review.

Drop the package at `.planning/research/01-REDDIT-EVIDENCE.md` and the market
rows get filled.

### Method, and what it cannot judge

Ground truth is `.planning/snapshots/2026-09-04/` — 19 routes fetched live,
scripts stripped, UTF-8 decoded, committed. Every quote below was checked against
it or against the source file named. Never `grep -oiF`; that returns false zeroes
on this tree.

Two dead verification legs, stated rather than papered over:

1. **Share images cannot be verified from the snapshot.** They render as PNG
   pixels. Findings A4 and A5 are verified against the *source file*, and the
   deployed `og:image` URL confirms that file ships — but nobody has looked at the
   picture.
2. **Stripe and Vercel live state cannot be read from here.** B1 rests on the
   repo's own state file, not on the dashboard.

Also: the snapshot's `.txt` turns every tag into a space, so `<strong>Ten
templates</strong>,` reads as `Ten templates ,`. That is the extractor. Judge
spacing from `.raw.html` only.

---

## 1. What is holding. Protect this; do not "fix" it

Checked across all 19 routes before proposing anything, because the most
expensive mistake available here is breaking something that works.

- **Retired ledger claims: zero survivors.** Tested the actual phrases from
  LESSONS #3, not loose keywords — the pipeline figures, the sales-team and
  channel claims, the earlier exit counts, the birth-worker user counts, the
  churn claim, the former employer name, the retainer claim, the four banned
  enterprise customer names, the Medicaid claim, the superlative phrasings.
  **All zero.**
- **All 35 machine-listed marketing words: zero hits** in live copy.
- **Body copy em-dashes: zero on every page.** The two per page are the `<title>`
  and the nav. The rule is holding.
- **Reply-time promises agree everywhere:** one business day. That sweep landed.
- The Retainer contradiction and the week-one question the research flags as open
  are **already fixed live**. See D2, D3.

Two false alarms I generated and killed, recorded so nobody repeats them: the
bare word "pipeline" appears 8 times, all legitimate (your ruling was to drop the
*number* and keep the work description). "Row-level security" on `/playbook`
teaches the mechanism generically, which the security gate permits.

---

## 2. Index

| # | Finding | Sev | Ruling? |
| --- | --- | --- | --- |
| **A1** | `/book` tells free-call visitors "You have paid" | critical | no |
| **A2** | `llms.txt` re-closes the 2013–2023 range the ledger forbids | critical | no |
| **A3** | The "email me" path is live in **two** places, not one | high | no |
| **A4** | `/about` share image still says "A decade" | high | no |
| **A5** | `/work` share image names an unledgered employer | high | no |
| **A6** | `/about` meta still says "A decade" | high | no |
| **A7** | `/book` meta says "we" | medium | no |
| **A8** | `/work/content-engine` Scope lists 5 platforms, page says 8 | low | no |
| **B1** | Stripe webhook unregistered; live buttons can take money and send nothing | critical | **yes** |
| **B2** | The 60-day credit promise has zero implementation | high | **yes** |
| **B3** | The book's checkout is built and no button calls it | critical | **yes** |
| **B4** | The $149 tier has no trigger, and the number is printed in the book | medium | **yes** |
| **C1** | The engagements-lane proof gap is softened, not closed | critical | **yes** |
| **C2** | The same $3M is proof for two different services | medium | **yes** |
| **C3** | Advisory implies ~$1,000/hour and never says so | medium | **yes** |
| **C4** | Chapter 10 | medium | **yes** |
| **C5** | `brand.json` declares the old audience | medium | **yes** |
| **S1** | No Search Console. Indexation is unknowable, not unknown | high | **yes** |
| **S2** | Your own target phrase appears nowhere on the site | high | **yes** |
| **S3** | No informational page exists at all | high | **yes** |
| **S4** | `robots.txt` contradicts your own written rule | medium | **yes** |
| **S5** | `/work/ordani` title and H1 carry no descriptive text | medium | **yes** |
| **S6** | "Oakland" is in metadata only, never in visible copy | medium | **yes** |
| **S7** | `sitemap.xml` stamps every URL with the request time | low | no |
| **D1–D4** | Where the research packages are wrong | — | no |
| **R1–R6** | Open slots, need the Reddit package | — | **yes** |

---

## 3. Class A — live defects, no ruling needed

These contradict something you already decided. No new facts, no judgment calls.

### A1. `/book` tells a free-call visitor they have already paid — CRITICAL

**(a) Evidence.** `/book` is the engagements lane's *only* conversion, linked
from `/` (hero and footer), `/services` twice, and `/playbook`. It took 6 of 26
visitors last week, the #5 page. No research package caught this: the persona
review's own fetch table records `/book | 308 → /contact`, so the review ran
while this page did not exist, and the business context recorded its H1 and meta
but never its body.

**(b) Current, verbatim** — `app/(foyer)/book/page.tsx:53`, the paragraph
directly under the H1 "Thirty minutes. Bring the problem.":

> No deck and no pitch. You have paid, so this call is where the work starts.
> Bring your intake answers if you have them. If not, bring the problem and I
> will ask.

Line 30 of the same file renders `Cost · Free`.

The identical sentence is **correct** on `/book/kickoff`, where the card reads
`Cost · Included with your package`. Kickoff copy leaked in when `/book` was
restored on 2026-09-03.

**(c) Proposed.** Delete the false clause on `/book` only. Leave `/book/kickoff`
untouched. Suggested: *"No deck and no pitch. Bring the problem, and this call is
where the work starts."* Zero banned words, zero em-dash, first person, no new
fact.

**(d) Ruling.** No. This is a page contradicting itself.

> **This one is live and costing you leads now.** I held off editing because you
> said no page changes before you rule. Say the word and it is a two-line fix.

### A2. `llms.txt` re-closes a range the ledger forbids — CRITICAL

**(a) Evidence.** The ledger, LESSONS #3, verbatim: *"Consulting revenue $20M+,
SINCE 2013 and OPEN-ENDED … SUPERSEDES every closed '(2013–2023)' rendering …
Swept 2026-09-02 to /about, the home ledger row, the JSON-LD in layout.tsx and
llms.txt. NEVER re-close the range."*

The sweep is recorded as covering `llms.txt`. **It did not.** Also, Flexport and
Cuebiq appear nowhere in the ledger and nowhere else on the site.

**(b) Current, verbatim** — `app/llms.txt/route.ts:32`:

> 2013–2023: Growth, GTM, and platform strategy roles at Guardicore, SurveyMonkey, Flexport, Cuebiq, Postmates

The same file's opening paragraph says *"Four companies he worked inside reached
an exit: Postmates …, SurveyMonkey …, Guardicore …, and Neuton.AI …"*. The file
contradicts itself.

**(c) Proposed.** Bring the Background line to the open-ended, four-exit framing
`/about` already uses. Drop Flexport and Cuebiq: unledgered, and on no other
surface.

**(d) Ruling.** No — you already ruled this on 2026-09-02. This is an incomplete
execution of it.

> **Worth its own lesson entry:** the ledger recorded a sweep as done that was
> not done. "Swept to X" needs a probe, or it is just an intention with a date on
> it.

### A3. The "email me" path is live in TWO places — HIGH

**(a) Evidence.** The research recorded one instance. There are two. Zero mailto
links remain anywhere on the site; all three package CTAs go to Stripe.

**(b) Current, verbatim.**

`/packages` intro:
> Pick one, email me, and the work starts within the week. No scoping call, no
> proposal, no quote to wait for.

Contradicted about 1,200 characters later on the *same page*:
> Each one goes straight to checkout. The moment your card clears you get a
> kickoff email: the intake questions, a link to book the call, and the manual
> with its companion files attached.

`/services`, the packages door — **not previously flagged**:
> Three fixed prices. Pick one, email me, and the work starts this week.

**(c) Proposed.** Replace the instruction on both. The `/packages` version can
simply defer to the checkout sentence already on the page.

**(d) Ruling.** No.

### A4. `/about` share image still says "A decade" — HIGH

**(a) Evidence.** Ledger: *"THIRTEEN YEARS, not 'a decade' — operator 2026-09-03
… SUPERSEDES 'a decade' everywhere."* This is what shows in the link preview when
`/about` is shared — the referrer's surface, and the referrer persona scored 7/10.

**(b) Current, verbatim** — `app/(foyer)/about/opengraph-image.tsx:17`:
> punch="A decade of B2B GTM + product. Four exits, $5B+ combined. Receipts that hold up."

**(c) Proposed.** "A decade" becomes "Thirteen years".

**(d) Ruling.** No. **But see the dead leg in §0** — verify by opening the
rendered PNG, not by grepping.

### A5. `/work` share image names an unledgered employer — HIGH

**(a) Evidence.** This is a *third* variant of the career history. It keeps
Flexport, drops Cuebiq, drops Neuton.AI, and adds Ordani as though it were a past
employer. `app/(foyer)/opengraph-image.tsx:18` already gets it right.

**(b) Current, verbatim** — `app/(foyer)/work/opengraph-image.tsx:16`:
> punch="Guardicore, SurveyMonkey, Flexport, Postmates — and Ordani."

The correct reference, home share image line 18:
> punch="Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani."

**(c) Proposed.** Match the home page's pattern.

**(d) Ruling.** No.

> **A2, A4 and A5 are one problem.** Your career history renders four different
> ways across the site, and three of them break a ledger rule. Worth fixing as
> one pass with one grep, not four.

### A6. `/about` meta still says "A decade" — HIGH

**(b) Current, verbatim** — live meta description on `/about`:
> A decade inside B2B software: go-to-market in the morning, shipping product in
> the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA.

The page body says "thirteen years" twice. **(c)** Same fix as A4. **(d)** No ruling.

### A7. `/book` meta breaks the first-person rule — MEDIUM

**(b) Current, verbatim** — `app/(foyer)/book/page.tsx:23`:
> Thirty minutes, no deck, no pitch. Bring the problem; we name the shape of the
> work and whether I am the right person for it. Tue to Thu, Pacific.

"we" is a defect by your own rule, and the same sentence then says "I".
**(c)** Rewrite in first person. **(d)** No ruling.

### A8. `/work/content-engine` Scope contradicts its own page — LOW

**(b) Current, verbatim** — the Engagement sidebar:
> Scope: AI content engine, Algorithm strategy, TikTok, Instagram, YouTube, LinkedIn, X

Five platforms. The same page's stat card says *"Eight platforms carried the
work"* and section 02 names all eight. Pass-94 fixed the count but not this field.

**(c)** Expand to eight, or generalise to "eight-platform distribution".
**(d)** No ruling.

---

## 4. Class B — the money rail

### B1. A live purchase today can take money and send nothing — CRITICAL

**(a) Evidence.** The webhook *code* is complete and correct: signature-verified
via `constructEventAsync`, handling `checkout.session.completed`,
`checkout.session.async_payment_succeeded`, `charge.refunded`, idempotent, and it
filters foreign events from the shared Stripe account. Nothing to build.

The gap is operational. Per this repo's own state file the live destination is
unregistered and `STRIPE_WEBHOOK_SECRET` is not in Vercel Production.
**I cannot verify that from here** — no dashboard access. It rests on your file.

The exposure is **live right now**, not hypothetical: the `/packages` buy buttons
are wired to real checkout with your live key as of 2026-09-03. Any visitor who
reaches that page can trigger a real, undelivered charge.

**(c) Proposed.** Register the destination, set the secret in **Production**,
redeploy (Vercel env vars only apply to a *new* deployment), then run the live
buy-and-refund on the $500 Unstick Session per `docs/MONEY-RAIL-TEST.md`.

**(d) Ruling — RULING 1.** Yours: it is a dashboard action and a live charge.
Alternative if you would rather not do it today: pull the three buy buttons until
you can. Leaving live buttons over an unregistered webhook is the one option with
no upside.

### B2. The 60-day credit promise has no implementation — HIGH

**(a) Evidence.** Searched `app/`, `lib/`, `scripts/` for coupon, discount or
promo logic: zero hits. `scripts/stripe-setup.mjs` creates flat prices only.
`docs/PACKAGES-RUNBOOK.md` says the credit is tracked in "the pipeline file" and
"the ledger" — **neither file exists in the repo.**

**(b) Current, verbatim** — `/packages`:
> The rules, in plain terms: every package fee credits toward the next package or
> an engagement started within 60 days. Full refund any time before kickoff. None
> after, because by then the work has started.

**(c) Proposed.** Before a sale relies on it: either a Stripe coupon generated and
emailed at kickoff with a 60-day expiry, or — cheaper and probably right at this
volume — actually create the ledger file the runbook already assumes, and keep it.

**(d) Ruling — RULING 2.** Build it, write it down, or soften the promise.

> Related, low: the "none after kickoff" half is also operator-enforced only.
> Nothing in code gates a late refund. Fine at this scale; worth one line in the
> runbook so a chargeback is not a surprise.

### B3. The book's checkout is built, and no button calls it — CRITICAL

**(a) Evidence.** This is the biggest single item on the map.
`/playbook` took **15 of 26 visitors** — the #2 page, ahead of `/services`. It is
the only behavioural signal this business has ever had, and it points at the book.

The rail is finished: `playbook-99` in `lib/catalog.ts`,
`app/actions/playbook-checkout.ts`, `lib/playbook-delivery.ts`, end-to-end
verified in test mode per `product/playbook/HANDOFF.md`. The action's own comment:
> Not yet linked from the page: the /playbook buy-button flip is a launch-gate
> decision … Wired and verified ahead of it.

`app/(foyer)/playbook/page.tsx` contains zero references to it.

Meanwhile `/services` already sells the book: *"The playbook covers most of what
the advisory shape does, for under $150 rather than $5K a month."*

**(b) Current, verbatim** — `/playbook`, twice:
> $99 at launch · $149 after · coming soon

and in the spec card: `Price $99 at launch · $149 after` / `Status Coming soon`.
The card also promises `Refund 30 days, no questions` for something not on sale.

**(c) Proposed.** No copy rewrite needed. Wire the existing action to a button
once you name a date. **Precondition: B1.** Do not open a second purchase path
over an unregistered webhook.

**(d) Ruling — RULING 3.** A launch date, or a trigger.

> One defect on that path regardless: `app/actions/playbook-checkout.ts` returns
> an error string containing an em-dash, twice. It renders into the page if the
> error fires, and the render gate cannot catch a dynamic string.

### B4. The $149 tier has no trigger, and the number is inside the book — MEDIUM

**(a) Evidence.** Open since 2026-09-01. The cross-review found the same $149
anchor printed in the manuscript at p42. So removing it from the site alone would
create a new mismatch.

**(b) Current, verbatim:** `$99 at launch · $149 after · coming soon`

**(c) Proposed.** Set a real trigger, or drop the anchor. Either way the book's
closing pages move in the same pass — that is the *other* repo, then
`publish:site`, then a build here.

**(d) Ruling — RULING 4.**

---

## 5. Class C — positioning calls that are yours

### C1. The engagements proof gap is softened, not closed — CRITICAL

**(a) Evidence.** This was the persona review's #1 finding. Pass-94 added two
receipts. The block now carries four:

1. Guardicore — **employment**, ended 2021
2. SurveyMonkey — **employment**, 2018
3. A birth worker — consulting, anonymous
4. An industry author — consulting, anonymous

The door this sits behind says *"For companies … Enterprise teams still aren't
buying."* **Not one receipt is a B2B software company that hired you from
outside.** The two consulting receipts are a birth worker and an author; the two
that match the buyer's shape are jobs you held. The business context says this
plainly in §6 and it is still true.

**(b) Current, verbatim** — `/services`, the Positioning & GTM proof block:
> Proof Guardicore: $14M in revenue at a $1.2M average enterprise deal size.
> Acquired by Akamai in 2021. … SurveyMonkey Enterprise: $1M+ in enterprise sales
> toward the 2018 IPO. A birth worker: repositioned from birth support alone to
> the full arc of care around it. Organic bookings up 30%, and inquiries arriving
> across her whole range instead of one service. An industry author: repositioned
> toward the buyers who award contracts. $3M in contracts won through the RFP
> software that followed.

**(c) Proposed.** **No copy change without a new fact from you.** Either a real
B2B software consulting engagement, anonymised, with a number, folded into this
block — or an explicit decision to accept the gap for now.

**(d) Ruling — RULING 5.** Do you have a B2B software consulting client whose
outcome could be published anonymously with one number? If yes, it needs a ledger
entry with a date before it can ship. If no, say so and the gap stays open
deliberately rather than by accident.

### C2. The same $3M is proof for two different services — MEDIUM

**(a) Evidence.** `$3M in contracts won` appears under service **01 Positioning &
GTM** ("through the RFP software that followed") and again under service **03
Frontier AI engineering** ("RFP-to-close rate doubled; $3M in contracts won") on
the same page. The `/work/rfp-engine` case study attributes it causally to the
software. Your sentence is honest about the chain. A procurement reader — the
persona that scored 5/10 and already flagged attribution ambiguity — can still
ask whether one number is being counted twice.

**(c) Proposed.** Either differentiate what each service claims from the same
engagement, or let 01 claim the repositioning and 03 claim the software outcome.

**(d) Ruling — RULING 6.** Same class as the $80M call you already made: this is
the site's second-least-attributed number.

### C3. Advisory implies about $1,000/hour and never says so — MEDIUM

**(b) Current, verbatim** — the shapes table publishes both halves and never does
the division:
> Advisory | You want a second operator in the room for the big decisions, a few
> hours a month. | 4-6 hours a month, ongoing | From $5K a month

$5K over 4–6 hours is $833–$1,250/hour. "On the price" explains why Advisory has a
standing rate but never frames the number. The founder persona noticed.

**(c)/(d) RULING 7.** State it and defend it as senior-operator pricing, or leave
it implicit. Both defensible. Not my call.

### C4. Chapter 10 — MEDIUM

**(a) Evidence.** Unanimous across three independent reviewers. **Not a length
problem** — at 1,619 words it is the second longest of the ten. Codex: *"no
handoff checklist, no due-diligence prep beyond metaphor, no hiring scorecard."*
GLM: *"after nine chapters that each ship a file, a template, or a code snippet,
the final chapter ships prose and a recap, and it's the last thing I read."*

**(c)/(d) RULING 8.** Write it an artifact, fold it into ch9, or ship as-is.
**This is decidable independently of the launch date.** It is content work in
`Code/the-80-percent-wall` — never the frozen copy here.

### C5. `brand.json` declares an audience you moved away from — MEDIUM

**(b) Current, verbatim** — `.claude/brand.json` `.audience.primary`:
> Founders of $5-50M companies who care about how their brand actually looks; and
> Black HR consultants, doulas, birth workers, and equity practitioners — the
> people Micah's work serves.

No live page targets that. Birth workers appear only as **Ordani's** customers,
never as buyers of your consulting.

**(c)/(d) RULING 9.** Confirm the two lanes are the real audience and I update the
file. It steers every design and copy agent that reads it, so a stale value here
propagates.

---

## 6. Class S — why organic search brings nobody

One Google referrer in seven days against a well-built surface. The surface is not
the problem; **nothing points at a query.**

### S1. There is no Search Console. Indexation is unknowable — HIGH

No verification tag anywhere in `app/layout.tsx` or the tree; the rendered `<head>`
carries none. So nobody can tell whether "organic is near zero" is a *targeting*
problem or a *not-yet-crawled* problem. Every other item in this section is a
guess until this exists.

**RULING 10** — or just: add `metadata.verification.google`, one line, and pull the
coverage report. **Do this first; it is the cheapest item on the map.**

### S2. Your own target phrase appears nowhere on the site — HIGH

**(a) Evidence.** This is not market guesswork and needs no Reddit data — it is
your own documented intent, unfulfilled.

`app/sitemap.ts:64`:
> // Buyer-B "vibe coder" query space; /book is the site-wide CTA.

`app/(foyer)/page.tsx:606` quotes you directly:
> (Pass-5, operator ask: "something to preach to the vibe coders and something to
> preach to small businesses")

Scanned every snapshot file, `.txt` and `.raw.html`: **"vibe" appears zero times.**

**(b) Current, verbatim** — `/playbook` H1: *"The AI handed you the code. Now ship
the company."*

**(c) Proposed.** Work the phrase into visible, crawlable copy on `/playbook` — a
subhead or an FAQ answer. Not a banned word, not a new fact, already your language.

**(d) RULING 11.** Only because it touches the page's voice.

### S3. No informational page exists at all — HIGH

Every one of the 12 sitemap URLs sells something, states a case study, or states a
bio fact. There is no route that answers a question someone types *before* they
know your name. You already own the two best hooks:
*"why the wall is arithmetic, not skill"* and *"The gap is positioning, not features."*

**RULING 12.** Whether to stand up a small number of standalone pieces. Note this
cuts against the "no dev-Twitter tells" rule, so it is a genuine positioning call,
not an obvious yes. **Which topics is NEEDS REDDIT.**

### S4. `robots.txt` contradicts your own written rule — MEDIUM

Live, as served: `User-Agent: *` / `Allow: /`. Nothing blocked.

`app/robots.ts` carries an explicit, reasoned decision to allow all crawlers
including the AI bots, on the argument that AI-search recommendation beats the
training-data downside.

But `.claude/CLAUDE.md` instructs the opposite, and the business context §7 states
the block as fact. **Both documents are wrong about the shipped site.**

**RULING 13.** Keep the permissive policy and correct the two documents, or restore
the block. Someone has to pick — right now a future session reading the
constitution would "fix" this and silently reverse a deliberate decision.

### S5. `/work/ordani` title and H1 carry no descriptive text — MEDIUM

`<title>ORDANI — Micah Jones</title>` and `<h1>ORDANI</h1>`. Bare brand name. The
page's own meta description does all the work. Titles outweigh descriptions. The
other three case studies are all fine.

**Proposed:** built from words already on the page —
`ORDANI: HIPAA-compliant CRM for birth workers — Micah Jones` (59 chars, inside
the 60-char gate). **RULING 14**, because it touches an Ordani surface.

### S6. "Oakland" is metadata only — MEDIUM

Zero hits in visible copy across all 16 HTML routes. It is in every meta
description and the JSON-LD, per your 2026-09-03 ruling to keep it there. Visible
copy weighs more for geographic relevance.

**RULING 15.** Only if local search is a real goal. The city strapline was
deliberately removed on 2026-09-02, so adding it back visibly reverses a design
call you made.

### S7. `sitemap.xml` stamps every URL with the request time — LOW

`app/sitemap.ts` assigns `new Date()` to all 12 entries. The snapshot shows every
URL carrying the identical `2026-09-04T19:03:55.290Z` — the second I hit it.
Google ignores an unreliable `lastmod` rather than penalising it, so this costs
nothing today, but it can never help either. No ruling.

---

## 7. Class D — where the research itself is wrong

The packages are readers, not oracles. Four corrections, so nobody "fixes"
something that is already right.

- **D1. `robots.txt`.** Business context §7 and `.claude/CLAUDE.md` both claim
  GPTBot and Google-Extended are blocked. They are not. See S4.
- **D2. The Retainer row.** The research flags *"Month to month, 6-month minimum"*
  as internally contradictory. **Live copy now reads "6 months, then month to
  month."** Already fixed. Do not re-apply.
- **D3. Week one.** The persona objection that the site answers "month one" is
  **already closed** (Pass-96): *"Week one is the scoping session and the audit."*
  The business context quote is stale.
- **D4. The "email me" instance count.** Recorded as one; there are two. See A3.

And one correction to the ledger itself: **it records the 2026-09-02 sweep as
having covered `llms.txt`, and it had not.** See A2.

---

## 8. Class R — open slots. These need the Reddit package

Left deliberately empty rather than filled with instinct wearing a research label.

| # | Question the market evidence has to answer |
| --- | --- |
| **R1** | **Do the two lanes overlap?** [BELIEF 1] The whole two-door IA rests on this and nothing tests it. Reddit can show whether the same populations carry both languages — topical overlap only, not buyer overlap. |
| **R2** | **Is "the gap is positioning, not features" the founder's own language?** [BELIEF 3] The engagements lane's central diagnostic, never checked against how founders actually phrase it. |
| **R3** | **Are solo builders stuck at 80% a reachable market?** [BELIEF 2] The book and the whole packages lane rest on it. |
| **R4** | **The VA lane.** [BELIEF 6, N of 1] Three things must be true first: volume beyond your one prospect; people who *already paid and are unhappy*, not still shopping; and the wedge holding as "the finished version of what you're already buying" rather than "cheaper than a VA". **Asymmetric risk:** the premium positioning is load-bearing for every other lane's pricing. A surface that reads cheap damages all of it. Decide the surface and the offer *before* any copy. |
| **R5** | **Which informational topics** (S3) and **which queries** the pages should target. |
| **R6** | **Whether your problem statements match market wording** — the five verbatim sentences in business context §3 are the comparison targets. |

**Untestable by Reddit, recorded so they are not confused with the above:**
[BELIEF 4] receipts-first beats pitch-first, [BELIEF 5] premium positioning
requires suppressing price signals, [BELIEF 7] do not serve recruiters (ruled),
[BELIEF 8] the voice rules reduce the AI-written read. Only a live test or your
own call settles these.

---

## 9. The ruling sheet

Answerable in one pass. Numbers match the sections above.

| # | Question | If you say nothing |
| --- | --- | --- |
| 0 | **A1 `/book`.** Fix the "You have paid" line now, separately from everything else? | It stays live |
| 1 | **B1.** Register the webhook, or pull the buy buttons until you can? | Live buttons over a dead webhook |
| 2 | **B2.** Build the 60-day credit, write the ledger file, or soften the promise? | An unenforceable promise, live |
| 3 | **B3.** The book's launch date or trigger. | The #2 page cannot sell |
| 4 | **B4.** A trigger for $149, or drop the anchor? (Moves the book too.) | Stays undated |
| 5 | **C1.** Is there a B2B software consulting receipt you can publish anonymously? | The lane's #1 gap stays open |
| 6 | **C2.** How should 01 and 03 split the $3M? | One number proves two things |
| 7 | **C3.** State the Advisory hourly rate, or leave it implicit? | Implicit |
| 8 | **C4.** Chapter 10: artifact, fold into ch9, or ship as-is? | Ships as flagged |
| 9 | **C5.** Confirm the two lanes so I can update `brand.json`? | Stale, and it steers every agent |
| 10 | **S1.** Add Search Console verification? *(cheapest item here)* | Indexation stays unknowable |
| 11 | **S2.** Put "vibe coding" into visible `/playbook` copy? | Your own target phrase stays absent |
| 12 | **S3.** Stand up informational pages at all? | No pre-awareness entry point |
| 13 | **S4.** Keep the permissive `robots.txt` and fix the docs, or restore the block? | Docs contradict the site |
| 14 | **S5.** Rewrite `/work/ordani`'s title? | Bare brand name |
| 15 | **S6.** Put "Oakland" in visible copy? | Metadata only |

**Class A (A1–A8) needs no ruling** and can go in one pass whenever you say go.

---

## 10. What I did not do

- **No page was edited.** Nothing in `app/`, `components/`, `content/` or
  `lib/` was touched. Commits this session: the snapshot, its README, the resume,
  and this file.
- **No new fact was invented.** Every number here traces to the ledger, the
  snapshot, or your own source files. Where a proposal needed a fact you have not
  given, it says so (C1) rather than filling it in.
- **The industry author is not named**, and the birth worker's service list is not
  itemised.
- **Two verification legs are dead** and are reported as dead, not worked around:
  the share images (PNG, verified from source only) and the Stripe/Vercel live
  state (no dashboard access — B1 rests on your own state file).
- **Deploy is yours.** Nothing ships without your approval quoted with a date.
