# RFP engine: draft 2, after Micah's answers and the Astra review

Pass-120. NOT site copy. Nothing moves into `content/work/rfp-engine.mdx` until the open tags are
answered.

**Legend.** Plain text is confirmed by Micah on 2026-09-15 or already in the ledger. **[?#]**
marks what is still unconfirmed. Reply with the number and yes, no, or the real version.

**Client:** an award-winning author and leadership consultant who teaches government bodies and
corporations. Name protected. A different client from the content engine (ruling 2026-09-15), so
the old "the same engagement also produced" line comes out.

**Written for:** an organization that wants custom AI built on its own expertise.

**Search terms:** AI RFP software, RFP response automation, bid/no-bid scoring, custom RAG
software, government RFP responses, compliance matrix. No keyword tool is connected, so no volume
data sits behind this list.

---

## Search title and description

- **Title:** Custom AI RFP software: $3M in signed contracts
- **Description:** I built RFP discovery, scoring and drafting around one expert's own body of
  work. $3M signed, and the close rate doubled from one in eight to one in four.

## Dek

$3M in signed contracts, won through AI software I built for an award-winning author and
leadership consultant. It finds the RFPs worth answering, weighs each one against twenty years of
their own work, and has a drafted response waiting by morning. Their close rate went from one in
eight to one in four.

## At a glance

- **Client:** an award-winning author and leadership consultant who teaches government bodies and
  corporations. Name protected.
- **My role:** strategist and sole builder.
- **First real RFPs delivered:** day three.
- **What I built:** discovery, bid/no-bid scoring, a library of their work with provenance, and
  response drafting.
- **Results:** $3M in signed contracts across eleven awards. Close rate from one in eight to one
  in four inside six months. Responses out per month: two or three, then eight to ten.

## Three responses a month was the ceiling

The client had twenty years of published work behind them: books, keynotes and training programs.
Public buyers were funding exactly that expertise. Most of those requests never reached them.

New opportunities arrived through a single newsletter list and a few personal relationships.
Everything else sat on federal, state and local procurement portals that nobody was watching
**[?1]**.

Every response started from a blank page. One took three to five working days, so two or three
went out a month and the rest were passed. Volume was the ceiling, and each pass was a contract
someone else won.

## Real RFPs by day three

Day three, the software was live and sending real opportunities. Scoring, the library and the
drafting came after that **[?2]**.

**01. Discovery.** It checks federal, state and local procurement portals every night **[?3]** and
pulls each new RFP in the client's field.

**02. One record per solicitation.** Portals repost the same solicitation, and amendments change
it. Duplicates collapse into one record, and an amendment gets flagged for review rather than
quietly replacing what the client already read.

**03. The library, with provenance.** I put more than 300 pieces of the client's work into a
searchable library: books, articles, talks, past proposals and client results **[?4]**. Every
passage keeps its source, its date and how that engagement ended. This is the retrieval layer,
RAG, and the provenance is the point: a draft can name real work instead of describing work in
general.

**04. Bid/no-bid scoring.** Each RFP gets scored before a person reads it: eligibility, deadline,
required certifications, and how far the scope overlaps proven work **[?5]**.

**05. Drafting against the buyer's own criteria.** Each solicitation states how it will be
scored, and evaluation factors differ from one to the next. The draft follows that solicitation's
stated criteria rather than a house template **[?6]**.

**06. Gaps instead of invention.** Where the library cannot support a claim, the draft leaves a
marked gap and says what is missing. It does not write a sentence that merely sounds right.

**07. Outcomes tune the scoring.** Every award and every rejection adjusts the weights, so the
scoring keeps learning from real results.

Nothing submits itself. A person reads and approves every response before it goes out **[?7]**.

## One requirement, start to finish

A buyer asks for proof of similar work delivered in the last five years **[?W1]**. The engine
pulls two engagements out of the library that match the scope, each with its date and how it
ended **[?W2]**, and drafts the answer around them in the client's own language.

The same RFP asks for a credential the client does not hold **[?W3]**. Nothing in twenty years of
their work supports it. The draft leaves a marked gap and names what is missing **[?W4]**, so the
client can answer it honestly, bring in a partner who has it, or skip the bid.

That gap is the part I care about. A model that writes something plausible there costs a client
their credibility with a buyer they wanted for years.

## What the replay found

Before the software scored a live RFP, I ran thirty to fifty of the client's past bids back
through it. The pattern held: every win matched two or more of their proven capabilities, and
every loss matched one or none. Capability overlap became the heaviest weight in the score.

That is also the honest answer to a fair question. A better filter raises a win rate on its own,
so the scoring had to earn its weights against bids whose outcomes were already known.

## What changed

- $3M in signed contracts through the platform, across eleven awards, government contracts among
  them.
- The close rate went from one in eight to one in four of submitted proposals, inside six months.
- Responses out went from two or three a month to eight to ten.
- First drafts arrive in hours instead of days **[?8]**.
- The judgment that used to fire only when I was in the room now fires on every submission.

> "Micah does the work that most strategy decks promise and never deliver." The client, name
> protected

## Questions buyers ask

**What did this RFP engine automate?** Finding relevant solicitations, scoring whether each one
is worth a bid, and drafting a first response from the client's own published work. A person
reviews and submits every response **[?7]**.

**Can AI write a government RFP response?** It can draft one. Here the draft came from the
client's own library and followed that solicitation's stated evaluation criteria **[?6]**, and a
person finished every response. Eligibility, pricing and submission checks stayed human **[?9]**.

**What was working after three days?** Real RFPs arriving, scored for fit. The library, the
drafting and the tuning came after.

## If your firm wins work through proposals

I build custom AI from a team's own source material and decision rules. If your experts have to
read, judge and answer the same kind of document every week, that is the engagement **[?10]**.

---

## Confirmed on 2026-09-15 (no longer in question)

Signed contract value for the $3M. One in eight to one in four, on submitted proposals, inside
six months. Two or three responses a month before, three to five days each; eight to ten a month
now. Eleven awards. More than 300 pieces in the library. Twenty years of published work. Books,
keynotes and training programs. Federal, state and local portals. Day three for the first real
RFPs. Thirty to fifty past bids in the replay, and the capability-overlap pattern that came out
of it. One record per solicitation with amendments flagged. Provenance on every passage. Gaps
instead of invention. Outcomes tuning the scoring. Sole builder. The earlier
multi-million-dollar RFP work in enterprise cybersecurity procurement. The client's quote.

## Still open

| Tag | Detail | Why it is there |
|---|---|---|
| ?1 | Nobody was watching the portals before | The reason the RFPs went unseen |
| ?2 | Scoring, library and drafting came after day three | Order of the build |
| ?3 | The check runs nightly | Frequency; say daily or weekly if that is truer |
| ?4 | Library holds books, articles, talks, past proposals, client results | What went in |
| ?5 | Scores on eligibility, deadline, certifications, scope overlap | The scoring inputs |
| ?6 | Drafts follow each solicitation's own stated criteria | Replaces my wrong claim that committees always score requirements, then past performance, then price. Evaluation factors vary per solicitation (FAR 15.304), and a procurement reader would have caught that |
| ?7 | A person approves every response, nothing auto-submits | Trust |
| ?8 | First drafts in hours instead of days | Needs a real comparison or it goes |
| ?9 | Eligibility, pricing and submission checks stayed human | Astra's request: say what stayed human |
| ?W1 | The requirement is proof of similar work in the last five years | The walkthrough's setup |
| ?W2 | It matched two engagements, with dates and outcomes | The walkthrough's body |
| ?W3 | The same RFP wanted a credential they did not hold | The gap |
| ?W4 | The draft marked the gap and named what was missing | The payoff |
| ?10 | The closing offer sentence | Must match what /services promises |
