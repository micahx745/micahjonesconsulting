# Astra quality gate: the RFP engine story (Pass-120, micahjonesconsulting)

Read `.planning/drafts/pass-120/rfp-engine-DRAFT.md` in this repo. It is a DRAFT case study for a
solo consultant's site. It is not live. Read also the live version it replaces,
`content/work/rfp-engine.mdx`, and the site's copy rules in `.claude/CLAUDE.md` (Voice section)
and `docs/DESIGN_BAR.md` R14 and R16.

## Who the page is for

One buyer: an organization that wants custom AI built on its own expertise. The operator's words
for what he wants from this page, verbatim: "want to entice people to hire me but I want people
who are domain experts to read it and find it extremely intelligent piece of software i built/AI
rfp engine". Two readers must both be served: a buyer deciding whether to hire him, and a domain
expert (a proposal lead, an AI engineer) judging whether the software is real and clever.

## What the tags mean

`[C#]` and `[T#]` mark details the writer proposed that the operator has not yet confirmed. Judge
them as claims that MIGHT be true. Where a claim would carry the page, say so, and say what it
must be worth for the page to work. Do not treat an untagged sentence as more reliable; flag
anything that reads invented.

## Judge, in this order

1. **The domain-expert test.** Section "How it works, without the blueprint" exists to make an
   expert respect the build. Which bullets earn that respect, and which read as things any
   consultant would say? Name the weakest three and what would replace them. Is there a hard part
   of building an RFP engine that the page fails to mention, and that an expert would notice
   missing?
2. **The buyer test.** After one read, does a buyer know what they would be buying and what it
   would do for them? Where does attention drop? What question is left unanswered at the close?
3. **Trust.** Which claims would a skeptical reader disbelieve or want a source for? Which
   details narrow down the anonymous client too far (the client must stay unidentifiable)?
4. **Craft.** Voice is first person, average sentence under 25 words, named numbers, at most one
   em dash on the page, no hype vocabulary. Name every violation with the sentence.
5. **Search.** Judge the proposed title and description, and the three "Questions buyers ask".
   Would this page be a credible answer for someone searching how to build or buy AI RFP
   software? What single term is missing? Do not invent search-volume figures; there is no
   keyword tool connected.
6. **The shape.** This draft is the candidate template for six case studies (a $14M security
   repositioning, a HIPAA product, a content engine, two acquisitions). Does the section order
   hold for all six, or does it only fit this one? Name the sections to keep, cut or make
   optional.

## Output

A numbered fix-list, most important first, at most 15 items. Each item: the problem in one line,
then the exact replacement wording or the specific thing to add. End with one line: SHIP, REVISE
or REBUILD, and the one change that matters most. Be blunt; flattery is worthless here.
