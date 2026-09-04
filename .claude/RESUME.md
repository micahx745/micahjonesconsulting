# RESUME — micahjonesconsulting (2026-09-04, evening)

## READ THIS FIRST
Main model is **Fable 5.1**; **Opus is the default subagent** (`.claude/settings.json`,
ruled 2026-09-04). Fable rules and writes briefs; Opus executes them. No build, deploy
or screenshot loop runs on Fable. Constitution prose was corrected today to match live
code on fonts (Bricolage/Hanken/JetBrains Mono, R1 narrow third), the mono rule, and
robots.txt (allows all crawlers, deliberately).

**The direction is ruled.** `.planning/PHASE-MAP-2026-09-04.md` — eight rulings, the
arc (Passes 97–100 + a book arc), the parked list. Read it before anything.
The defect catalogue it folds in: `.planning/RESEARCH-TO-ACTION-MAP-2026-09-04.md`.
All three research packages are on disk in `.planning/research/` (01 Reddit, 02 business
context, 03 Fable leg). The claims ledger (`docs/LESSONS_LEARNED.md` #3) outranks memory.

## In flight
Workflow `wf_64ddc31b-88a` (all Opus) is building the Pass 98 brief materials: attested
phrase bank, page inventory graded R1–R20, claim verification, book artifacts, chapter 8
read. **Next Fable act: write `.claude/briefs/pass-98-playbook-landing.md` from those
materials**, then hand to Opus. Do not write the brief without them.

## Next passes
97 (Opus, today): the eight Class A defects — `/book` "You have paid" (`book/page.tsx:53`),
llms.txt "2013–2023" + Flexport/Cuebiq (`llms.txt/route.ts:32`), "email me" on /packages
AND /services, "A decade" in /about meta AND share image, /work share image employer
list, /book meta "we", content-engine Scope 5→8. One commit. Verify: rerun
`scripts/snapshot-live.py`, retired-phrase grep = 0.
98: the playbook page, from the brief. 99: the landing-page offer + services/packages
reframe. 100: home spear + SEO structure. Book: other repo, parallel to 99.

## Blocked on the operator (in order)
1. Stripe webhook registered + `whsec_` in Vercel Production + one live buy/refund.
   **No buy button ships before this.** Live buttons on /packages are exposed today.
2. Google his own name: does a superseded v0 page show? (Fable leg claim, unverifiable here.)
3. Search Console verification. 4. Offer name/price; replace Unstick or add. 5. A portrait
or named receipt for the page. 6. Launch date, at the 98 ship gate. 7. Ch8 as sample.

## Standing traps
Stripe prefixes `sk_`/`pk_`/`mk_` · Vercel env applies only on a NEW deploy · `grep -oiF`
false zeroes, use python utf-8 · strip `<script>` before counting · the copy-lint hook
rejects docs that QUOTE banned words · snapshot `.txt` fakes spaces at tag boundaries ·
a review is a reader, not an oracle · two sessions share this tree: stage by path.
