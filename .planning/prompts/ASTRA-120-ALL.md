# Astra quality gate: seven case studies as one record (Pass-120)

Read these drafts in this repo:

- `.planning/drafts/pass-120/four-studies-DRAFT.md` (Guardicore, ORDANI, Postmates, Neuton)
- `.planning/drafts/pass-120/rfp-engine-DRAFT.md`
- `.planning/drafts/pass-120/content-engine-DRAFT.md`
- `.planning/drafts/pass-120/birth-worker-DRAFT.md`

Then the surfaces they live on: `app/(foyer)/work/page.tsx` (the index), the live studies in
`content/work/*.mdx`, `app/(foyer)/services/page.tsx` (each study's close must match the block
that carries it), `.claude/CLAUDE.md` (Voice), `docs/DESIGN_BAR.md` (R11, R13, R14, R16), and the
verified-facts ledger in `docs/LESSONS_LEARNED.md` #3.

Your earlier review of the RFP draft is `.planning/reviews/ASTRA-120-RFP.md`. It was applied. Do
not repeat items already fixed there.

## Context

These seven studies are the whole record of a solo consultant's work. The operator's goals,
verbatim: "Each story is compelling, enticing to a potential user. Great SEO... Some of the
unnamed work stories need to be amped up... i did alot of work for those jobs that arent really
highlighted there right now." Bracketed tags mark details the writer proposed that the operator
has not yet confirmed. Judge them as claims that might be true.

Two studies are deliberately thin because earlier rulings stripped them: Postmates carries no
fraud example, and Neuton carries no causal link between the work and the acquisition.

## Judge, in this order

1. **The set.** Read all seven as one body of work, the way a buyer would. What does this record
   say this person does? Where does it contradict itself, repeat itself, or trail off? Which two
   studies are weakest, and for each: cut, merge, or the one change that saves it.
2. **Each study's buyer.** Each closes into one block on /services. Does the story actually prove
   what that block promises? Name any study whose proof and whose close do not match.
3. **The two thin ones.** Postmates and Neuton, under the constraints above: are they worth
   pages, or are they exit-record rows with no page? Argue both sides, then rule.
4. **Amplification without invention.** The operator says he did far more on the unnamed jobs
   than the pages show. Where does each draft still undersell the work, and what question should
   he be asked to fill it? Give the questions, one line each.
5. **Honesty and identity.** Every number or client detail a skeptical reader would challenge.
   Which details, across pages, still let a reader identify an anonymous client.
6. **Search.** Judge the title and description of each study. Where two studies compete for the
   same query, say which should own it. No invented volume data; no keyword tool is connected.
7. **Craft.** Voice is first person, average sentence under 25 words, named numbers, at most one
   em dash per page, no hype vocabulary. Name violations with the sentence.

## Output

A numbered fix-list, most important first, at most 18 items, each naming the study it applies to.
Each item: the problem in one line, then the exact replacement wording or the specific thing to
add. Then one line per study: SHIP, REVISE or REBUILD. Then the single change that matters most
across the whole record. Be blunt.
