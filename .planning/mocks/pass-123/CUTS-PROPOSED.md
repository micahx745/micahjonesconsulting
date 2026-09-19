# Pass-123 "Fewer words": the proposed cuts (Fable, 2026-09-19)

Scope: FEEDS the existing theme. These are proposals for the five study pages (`/work/[slug]`) only. Nothing
below is cut until the operator ticks it (LESSONS #3 "PASS-123 STUDY PAGES SCOPE": "I list each sentence I'd
cut on each study and you tick the ones to go. Nothing is reworded.").

Rules of this list
- Straight removals only. Every string is quoted verbatim from the working tree at the `file:line` given; the
  cut removes exactly that string and nothing else. No word is changed or added anywhere.
- Best first, at most six per study. The word count is what the page loses.
- FACT LOST marks a cut that removes a fact found nowhere else on that page's visible text. Everything else
  survives elsewhere on the same page; the reason line says where.
- READS: a note on how the surrounding text reads after the cut. Two cuts leave a pronoun without its
  antecedent (G3, B1); one changes nothing but is his 2026-09-16 "lead with it" line (O6). Those are flagged,
  not decided.
- The band today says each study's figure three times (title, dek, Results row). The build brief puts the
  figure once at poster size inside the title; the cuts marked REPEAT are the copies that then read twice.
- Schema floors after any combination of ticks: `dek`, `results.lead` and `results.rest` stay non-empty;
  `atAGlance` keeps at least one row (each study keeps "My role"). No tick below breaks a floor.

## T. The template (every study): `app/(theater)/work/[slug]/page.tsx:156-167`

- **T1** Cut the `Client` row of the at-a-glance list. It repeats the context line above the title word for
  word (`cs.client` renders twice in the same band: "Guardicore, acquired by Akamai" at the top and again
  as `Client`, 600px lower at 390). Two forms, one tick:
  - **T1a** the row goes, and with it the mono label "Name protected" on the three anonymous studies. Nothing
    reworded. Note: the protection label leaves the band.
  - **T1b** (recommended) the row goes; "Name protected" moves up to sit directly under the context line, same
    words, same mono style, on the same three studies. No word added.
  Words saved per study: the client string (6 to 15 words) and, on three studies, "Name protected".

## Guardicore: `content/work/guardicore.mdx`

1. **G1** REPEAT. Line 7 (dek), sentence 3: "Akamai acquired the company in 2021." (6 words). The band already
   says it twice: the title's "then Akamai" and the Results row's "Acquired by Akamai in 2021."; the body says
   it at line 65. No fact lost.
2. **G2** REPEAT. Line 17 (results.rest), sentence 2: "Acquired by Akamai in 2021." (5 words). Same fact, third
   time on the band; the year stays at line 65 ("Akamai acquired Guardicore in 2021, ..."). No fact lost.
   Results row after: "$1.2M average enterprise deal." G1 and G2 can both be ticked.
3. **G3** REPEAT. Line 7 (dek), sentence 1: "$14M in revenue, sourced and closed, at a $1.2M average enterprise
   deal, for a security company built in Tel Aviv whose buyers sat in North American banks." (27 words). The
   poster says $14M; the Results row says "$14M in revenue, sourced and closed." and "$1.2M average enterprise
   deal."; Step 05 says "a top-10 North American bank". FACT LOST: "built in Tel Aviv" appears nowhere else in
   the page's visible text (only in the photo's alt). READS: the next sentence then opens "I ran the research
   that found what those buyers were actually signing for" with no earlier "buyers" in the dek. Goes to him as
   a question (see the final report), not a straight tick.
4. **G4** Lines 13-14 (the "The work" row): "Customer research and data analysis, the repositioning, target
   accounts and outbound, executive briefings, managed-security partners, and a microsegmentation pilot"
   (19 words, plus the label). Steps 01 to 05 (lines 50-58) say each item one screen down. No fact lost.
5. **G5** Line 46: "I brought that to leadership with the analysis behind it, and the story moved: visibility
   first, then east-west microsegmentation." (19 words). Step 02 ("Two anchors, in order: see the traffic, then
   segment it.") and Step 03 ("Once leadership backed the new focus") carry it. No fact lost. The section then
   ends on line 44.
6. **G6** Line 54 (Step 03), sentence 3: "That is the part of positioning nobody puts in a deck: the story has
   to hold in a live deal while the roadmap catches up." (25 words). A reflection; sentence 2 keeps the fact
   (selling microsegmentation before the product was finished). No fact lost.

## RFP engine: `content/work/rfp-engine.mdx` (working tree, the contract count already cut)

1. **R1** REPEAT. Line 7 (dek), sentence 3: "Their close rate went from one in eight to one in four." (12
   words). The Results row says "Close rate from one in eight to one in four inside six months."; What changed
   says it at line 78. No fact lost.
2. **R2** REPEAT. Line 7 (dek), sentence 1: "$3M in signed contracts, won through AI software I built for an
   award-winning author and leadership consultant." (17 words). The poster and title say "$3M in signed
   contracts"; the context line names the client; "I built" survives as "Strategist and sole builder". No
   fact lost. READS: the dek then opens "It finds the RFPs worth answering, ..." where "It" is the title's
   software; reads clean. With R1 and R2 both ticked the dek is one sentence, a caption under the number.
3. **R3** Lines 15-16 (the "What I built" row): "Discovery, bid/no-bid scoring, a library of their work with
   provenance, and response drafting" (13 words, plus the label). Steps 01, 03, 04 and 05 (lines 43-51) say
   each item. No fact lost.
4. **R4** Line 91, the whole FAQ: "**What was working after three days?** Real RFPs arriving, scored for fit.
   The library, the drafting and the tuning came after." (21 words). Line 41 says it ("Day three, the software
   was live and sending real opportunities. Scoring, the library and the drafting came after that.") and the
   glance row says "First real RFPs delivered: Day three". No fact lost. NOTE: "scored for fit" on day three
   CONTRADICTS line 41 and the ledger ("day three was discovery only", LESSONS #3 PASS-120 DRAFT DETAILS
   CONFIRMED). This one is a defect, not only a repeat; it goes to him with options (final report).
5. **R5** Line 72: "That is also the honest answer to a fair question. A better filter raises a win rate on its
   own, so the scoring had to earn its weights against bids whose outcomes were already known." (36 words). A
   reflection on the replay; line 70 keeps the fact (thirty to fifty past bids replayed, wins matched two or
   more proven capabilities). No fact lost.
6. **R6** Line 33, sentence 3: "Most of those requests never reached them." (7 words). Line 35 says it
   ("Everything else sat on federal, state and local procurement portals that nobody was watching."). No fact
   lost.

## ORDANI: `content/work/ordani.mdx`

1. **O1** Line 39, sentences 1-2: "Nobody I spoke to was shopping for a platform. Nobody had ever offered them
   one built for their work, so they did not know to want it." (27 words). Step 01 says it ("Nobody asked for a
   platform, because nobody had been offered one that understood their work."). No fact lost. READS: the
   paragraph then opens "And HIPAA is the law for all of it: ..." after line 37's "a system nobody had
   designed."; reads as intended.
2. **O2** Line 37, sentence 1: "Each one did its own job." (6 words). The next sentence carries the point
   ("None of them talked to the others"). No fact lost.
3. **O3** Line 51 (Step 03), sentence 4: "How the protections work is not something a HIPAA product publishes,
   so this page does not." (16 words). The page talking about itself. No fact lost.
4. **O4** Line 59, sentence 3: "The screens hold real client data, so this page describes them rather than shows
   them." (15 words). Same class as O3. No fact lost.
5. **O5** Lines 13-14 (the "The work" row): "Practitioner interviews, a progressive intake flow, a
   HIPAA-compliant build shaped with birth workers and cyber security experts, and a closed beta" (21 words,
   plus the label). Steps 01, 03 and 04 say the interviews, the build shaped with birth workers and security
   people, and the closed beta. FACT LOST: "a progressive intake flow" as a thing built is named nowhere else
   on the page (Step 01 only says intake was eating their Sundays).
6. **O6** REPEAT. Line 7 (dek), sentence 2: "Birth workers keep hundreds of dollars per client that a claims
   service would take." (14 words). The Results row says it verbatim, in bold, 600px lower on the same band.
   No fact lost. READS: the dek would then lead with "A HIPAA-compliant CRM for birth workers, and a company
   I founded and built." and the money line stands alone in the Results row. His 2026-09-16 wish was to LEAD
   with the claims line; this tick is his call, not a recommendation.

## Content engine: `content/work/content-engine.mdx`

1. **C1** REPEAT. Line 7 (dek), sentence 4: "One income stream became four." (5 words). The Results row says
   "One income stream became four: books, services, speaking and courses."; lines 57 and 63 say it again. No
   fact lost.
2. **C2** REPEAT. Line 7 (dek), sentence 1: "Monthly impressions went from a few thousand to a peak of 800,000."
   (12 words). The poster says 800,000 inside the title; the Results row says "A peak of 800,000 impressions
   in a month, up from a few thousand, across eight platforms."; line 61 says it again. No fact lost. READS:
   the dek then opens "A social activist's message had been landing in every room and nowhere online."
3. **C3** Lines 13-14 (the "What I built" row): "The platform strategy, the AI content engine, the video
   pipeline, and the handoff to their content lead" (17 words, plus the label). Steps 02, 04 and 07 say each
   item. No fact lost.
4. **C4** Line 57: "That is what changed the business. Before, the income came from one stream. After, four:
   books, services, speaking and courses." (21 words). Line 63 and the Results row say it. No fact lost. The
   section then ends on line 55 ("...a page that asks for the sale.").
5. **C5** Line 41 (Step 02), sentence 5: "It became the operating system their content lead still runs." (10
   words). Sentence 4 ("I wrote it so their content lead could run it without supervision.") and line 65 say
   it. No fact lost.
6. **C6** Line 64 (What changed): "More content at a higher quality, with less money and fewer hours going into
   producing it." (16 words). The one unnumbered bullet in a numbered list (DESIGN_BAR R16). FACT LOST: the
   after-state "less money and fewer hours" is stated nowhere else (line 33 only says the old way cost money
   and hours).

## Birth worker: `content/work/birth-worker.mdx`

1. **B1** REPEAT. Line 7 (dek), sentence 1: "Bookings went from one to three a month to five to ten." (12
   words). The build brief lifts the Results lead ("Bookings from one to three a month to five to ten.") to the
   poster position directly above the dek, so this sentence would sit 100px under the same words; line 55 says
   it again. No fact lost. READS: the dek then opens "She had been booked almost always for the same service,
   ..." where "She" is the birth worker of the context line and title; reads clean.
2. **B2** REPEAT. Line 7 (dek), sentence 4: "Thousands of dollars stopped going to fees." (7 words). The Results
   row says "Thousands of dollars kept that used to go to claims-processing fees."; Step 07 and line 57 say it.
   No fact lost.
3. **B3** Lines 13-14 (the "The work" row): "Reading her own inquiries, talking to past clients, naming the
   range, rebuilding her website and booking path, the marketing that carried it, and direct insurance claims"
   (26 words, plus the label). Steps 01 to 07 say each item in order. No fact lost.
4. **B4** Line 35, sentence 3: "Every booking she won cost her a fee she never saw on a bill." (14 words).
   Sentence 2 says it ("a slice of every claim went to whoever processed it"). No fact lost.
5. **B5** Line 43 (Step 03), sentences 3-4: "A menu asks a stranger to diagnose themselves. A named arc tells
   them they are in the right place." (19 words). A reflection; sentences 1-2 keep the fact. No fact lost.
6. **B6** Line 33, the paragraph: "This is a positioning problem I see again and again in a practice of one.
   The market's picture of you is narrower than your skill, and it stays that way until you change what a
   stranger reads first." (37 words). The FAQs at lines 66 and 68 say both halves ("What a stranger reads
   first", "a practice of one"). No fact lost.

## How ticks land (for the main session)

- Each tick is one straight deletion in the named file at the named line; frontmatter strings stay valid YAML
  (a sentence cut inside a quoted value keeps the quotes).
- After the ticks: `pnpm build` (every gate), then the visible-text diff per study
  (`curl -s <url> | node .planning/exec/visible-text.mjs`) shows exactly the ticked strings and nothing else.
- T1b moves "Name protected" in the template, so its check is the string count per page: unchanged (1 on
  rfp-engine, content-engine, birth-worker; 0 elsewhere), now inside `.cs-band__head`.
- G3 and R4 are not straight ticks until he answers the questions in the final report (antecedent; the
  day-three contradiction).
