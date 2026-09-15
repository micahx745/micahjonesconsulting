# RFP engine: dramatized draft for Micah's fact check

Pass-120. NOT site copy. Nothing here moves into `content/work/rfp-engine.mdx` until Micah has
answered every tag below.

**How to read it.** Untagged text is already on the live page. **[C#]** marks a detail I added to
make the story land; it may be wrong. **[L#]** marks something already live that was never
recorded in the facts ledger. Reply with the number and yes, no, or the real version, for
example "C4 no, it was more like 20 a month".

**Written for:** an organization that wants AI built on its own expertise (the AI engineering
area on /services).

**Search terms it aims at:** AI RFP software, RFP response automation, custom RAG software,
government RFP responses, AI proposal writing, bid/no-bid decisions. Chosen from the subject:
no keyword tool is connected, so there is no search-volume data behind this list.

---

## Search title and description

- **Title:** AI RFP software that won $3M in contracts
- **Description:** Custom AI RFP software for an industry author: it weighs every new RFP against
  their body of work and drafts the response. $3M won, close rate doubled.

## Dek

$3M in contracts won through AI software I built for an industry author. It finds the RFPs worth
answering, weighs each one against the author's own body of work, and has a drafted head start
waiting every morning. The close rate doubled.

## At a glance

- **Client:** an industry-authority author, name protected
- **My role:** strategist and sole builder **[L1]**
- **Build time:** live and sending RFPs in three days **[C1 answered 2026-09-15]**
- **What I built:** RFP discovery, bid/no-bid scoring, a searchable library of the author's
  work, and response drafting **[C2]**
- **Results:** $3M in contracts won. RFP-to-close rate doubled, from about one in eight to one in
  four **[C3]**. First drafts in hours instead of days **[C4]**.

## The contract nobody saw

The project started with a contract the author never saw. A public buyer awarded work squarely in
the author's field to someone else, and the author heard about it after the deadline **[C5]**.
The expertise was there. The RFP had never reached anyone who could answer it.

The author had spent twenty years **[C6]** building a body of work buyers trusted: books,
keynotes and training programs **[C7]**. New opportunities still arrived through a single
newsletter list and a few personal relationships. Everything else sat on procurement portals and
bid boards nobody checked **[C8]**.

The RFPs that did arrive started from a blank page. One response took three to five working
days **[C9]**, so the author could answer two or three a month **[C10]** and passed on the rest.
Volume was the bottleneck, and every pass was a contract someone else could win.

## The product is the judgment

The hard part was never the retrieval. Earlier in my career I ran complex, multi-million-dollar
RFPs in enterprise cybersecurity procurement **[L2]**. I know what a buyer's evaluation committee
actually reads. They score against the requirements first, then past performance, then price
**[C11]**. A strong expert loses when the committee has to hunt for the answer.

A strategy deck would have described that judgment. I wrote it into the software, so it fires on
every submission, not only the ones I touch.

## What I built

It was live in three days. Day three, it was finding real RFPs and sending them to us **[C1]**.
The scoring, the library and the drafting came after that **[T1]**.

**01. Discovery.** Every night the software checks federal, state and local procurement portals
**[C12]** and pulls each new RFP in the author's field.

**02. A library of the author's own work.** I turned more than 300 pieces of the author's work
**[C13]** into a searchable library: books, articles, talks, past proposals and client results
**[C14]**. This is the retrieval layer, known as RAG. The drafts quote what the author has
actually done instead of what a language model guesses.

**03. Bid/no-bid scoring.** Every RFP gets a score before anyone reads it: eligibility, deadline,
required certifications, and how closely the scope matches past work **[C15]**. The author sees
the few worth chasing, not the hundred that are not.

**04. The requirements checklist.** The software pulls every requirement out of the RFP document
into a checklist, so nothing the committee scores for goes missing **[C16]**.

**05. The morning report.** Every morning the author opens a report of live opportunities, each
with a partial response already drafted in the author's voice **[C17]** and mapped to how that
buyer will score it **[C18]**.

**06. The handoff.** I trained the author's team to review and finish each draft **[C19]**. For
the first year I tuned the scoring after every win and every loss **[C20]**.

## How it works, without the blueprint

The specifics stay with the client. Here is the shape of it.

- **One opportunity, one record.** Portals repost the same solicitation with amendments and new
  deadlines. The engine folds reposts and amendments into one record, so the author never reads
  the same RFP twice **[T2]**.
- **The requirements come out before anything is written.** The engine extracts the submission
  instructions and the evaluation criteria first: what to send, in what order, and how each
  section is scored **[T3]**.
- **Hard gates before soft judgment.** Eligibility is a filter, not a score. Certifications,
  set-asides, bonding, deadlines: anything disqualifying ends the opportunity before a person
  spends a minute on it **[T4]**.
- **Every passage carries its provenance.** The library is indexed by argument rather than by
  page, and each passage keeps its source, its date and its outcome. A draft can state what the
  author did and point at where it happened **[T5]**.
- **The model may not invent a credential.** Where the library cannot support a claim, the draft
  leaves the gap and lists it for the author instead of writing something plausible **[T6]**.
- **Past bids are the test set.** The author's own wins and losses became the evaluation set:
  would the scorer have flagged the winners, and would the drafts have answered every scored
  requirement? That harness is how I tuned it, and it runs again whenever the prompts change
  **[T7]**.
- **The loop closes on outcomes.** Every award and every rejection feeds back into the scoring
  **[T8]**.

The hard part was never the writing. Any model writes fluent proposal prose. The hard part was
making it refuse: refuse to bid where the author could not win, and refuse to claim what the
author had not done **[T9]**.

## The calls I made

- **Nothing submits itself.** A person reads and approves every response before it goes out
  **[C21]**. A committee can tell when nobody read the proposal.
- **One expert, not a generic tool.** The software knows one body of work deeply, which is why
  the drafts sound like the author **[C22]**.
- **Winnable, not every.** The goal was never to answer every RFP. It was to answer every RFP
  the author could win **[C23]**.

## What changed

- $3M in contracts won through the platform, across eleven contracts **[C24]**, government
  contracts among them **[L3]**.
- RFP-to-close rate doubled inside six months **[L4]**.
- The author now answers eight to ten RFPs a month, up from two or three **[C25]**.
- The judgment that used to fire only when I was in the room now fires on every submission.

> "Micah does the work that most strategy decks promise and never deliver." The author, name
> protected **[L5]**

## If your team lives on proposals

If your firm wins work through RFPs and every response still starts from a blank page, this is
the kind of system I build in an AI engineering engagement **[C26]**.

## Questions buyers ask

**What is AI RFP software?** Software that finds relevant requests for proposals, scores whether
each one is worth a bid, and drafts a first response from your own past work. A person still
reviews and submits every response **[C21]**.

**Can AI write a government RFP response?** It can draft one. Here the software drafted from the
author's own library, and a person finished every response **[C21]**. Committees score against
the requirements, so each draft follows them in order **[C16]**.

**How long does custom RFP software take to build?** This one was live and sending real RFPs in
three days **[C1]**. Scoring, the library and drafting followed **[T1]**.

---

## Identity check

On 2026-09-01 you cut "a top university and a county government" from this study because the
detail narrowed down who the author is. These tags carry the same risk, even if they are true:
**C6** (twenty years), **C7** (books, keynotes, training), **C12** (federal, state and local
portals), **C24** (eleven contracts) and **L3** (government). Tell me for each one: true and
publishable, true but private, or false.

## Your answers

| Tag | Detail | Why it is there | Happened? |
|---|---|---|---|
| L1 | "Sole builder" | Shows the whole build was yours | |
| L2 | Ran multi-million-dollar RFPs in enterprise cybersecurity | The reason the judgment is real | |
| L3 | Government contracts among the $3M | Search term; the stakes | |
| L4 | Close rate doubled "inside six months" | Speed of result | |
| L5 | The author's quote | Social proof | |
| C1 | Live and sending RFPs in three days | Answers "how long", a common search | ANSWERED: three days |
| T1 | Scoring, library and drafting came after those three days | Sequence of the build | |
| T2 | Reposts and amendments fold into one record | Depth: a real portal problem | |
| T3 | Requirements and evaluation criteria extracted first | Depth: the expert move | |
| T4 | Eligibility is a hard filter, not a score | Depth: certifications, set-asides, bonding | |
| T5 | Library indexed by argument, each passage keeps source, date, outcome | Depth: why drafts can cite | |
| T6 | The model leaves a gap rather than invent a credential | Depth: the trust guarantee | |
| T7 | Past wins and losses used as an evaluation set for tuning | Depth: the part experts respect | |
| T8 | Awards and rejections feed back into scoring | Depth: it improves | |
| T9 | "The hard part was making it refuse" | The closing line of the section | |
| C2 | Four parts: discovery, scoring, library, drafting | Makes the work visible | |
| C3 | Close rate from one in eight to one in four | Gives "doubled" a baseline | |
| C4 | First drafts in hours instead of days | Shows the time saved | |
| C5 | The missed contract that started it | Opening scene | |
| C6 | Twenty years of work | The stakes; identity risk | |
| C7 | Books, keynotes, training programs | What the library held; identity risk | |
| C8 | Portals and bid boards nobody checked | Why RFPs went unseen | |
| C9 | Three to five days per response | The pain, in numbers | |
| C10 | Two or three responses a month before | The baseline | |
| C11 | Committees score requirements, then past performance, then price | Your expertise, stated | |
| C12 | Federal, state and local portals, checked nightly | Search terms; identity risk | |
| C13 | More than 300 pieces in the library | Scale of the work | |
| C14 | Books, articles, talks, proposals, client results | What went into the library | |
| C15 | Scoring on eligibility, deadline, certifications, fit | Search term "bid/no-bid" | |
| C16 | Requirements pulled into a checklist | Search term; your judgment | |
| C17 | Drafts in the author's voice | The drafts sound human | |
| C18 | Drafts mapped to how the buyer scores | Your judgment, visible | |
| C19 | You trained the author's team | More of your work | |
| C20 | A year of tuning after every win and loss | More of your work | |
| C21 | A person approves every response | Trust; answers the AI-writing worry | |
| C22 | Built for one expert, not a generic tool | Why it works | |
| C23 | Winnable RFPs, not every RFP | Your call, stated | |
| C24 | Eleven contracts | Makes $3M concrete; identity risk | |
| C25 | Eight to ten responses a month now | The after, in numbers | |
| C26 | "If your team lives on proposals" close | Points the buyer to AI engineering | |
