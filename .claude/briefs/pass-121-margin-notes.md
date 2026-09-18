# Pass-121 margin notes: the list the executor places (brief 2.4, G4 fix 4)

Written by the Opus 5 main session, 2026-09-18. The executor places exactly these notes and chooses none.
Each note is the section's § number, a mono middle dot, and a phrase that occurs in that h2 section's own
MDX text (compared case-insensitively). Case per G3 N3: the first letter is lowercase unless the first
word is a proper noun, an acronym or a figure. 1440 only; at 390 the § number stays as the h2's mono
prefix and the note is omitted. `scripts/margin-notes-check.mjs` (Stage D, D2) reads this file and fails
on any note that is not a substring of its own section.

Turns (brief 3.3, G4 fix 15): Guardicore's bracket spans the paragraph from `I interviewed customers` to
`visibility was the thing they signed for.`; the RFP engine's arrow points at the comparison table's one
row containing `gap`. ORDANI, the content engine and the birth worker name no turn and carry the circle
and the underline only. That is deliberate: none has a single paragraph where the story turns that a
bracket would clarify.

## guardicore

| § | h2 | note | lifted from |
|---|---|---|---|
| 01 | Everyone was selling honeypots | east-west traffic between workloads | "The lateral east-west traffic between workloads was a blind spot" |
| 02 | What the customers said that the deck did not | visibility was the thing they signed for | "They could not see anything inside their own environments, and visibility was the thing they signed for." |
| 03 | What I did | the story has to hold in a live deal | "the story has to hold in a live deal while the roadmap catches up" |
| 04 | What changed | Akamai acquired Guardicore in 2021 | "Akamai acquired Guardicore in 2021, and the positioning carried into the product" |
| 05 | Questions buyers ask | signing the contracts for an outcome | "buyers were signing the contracts for an outcome" |
| 06 | If enterprise teams still are not buying | the gap is positioning, not features | "and the gap is positioning, not features" |

## rfp-engine

| § | h2 | note | lifted from |
|---|---|---|---|
| 01 | Three responses a month was the ceiling | volume was the ceiling | "Volume was the ceiling, and each pass was a contract someone else won." |
| 02 | Real RFPs by day three | the software was live | "Day three, the software was live and sending real opportunities." |
| 03 | One requirement, start to finish | a marked gap | "the draft leaves a marked gap and names what is missing" |
| 04 | What the replay found | every win matched two or more of their proven capabilities | "every win matched two or more of their proven capabilities" |
| 05 | What changed | $3M in signed contracts | "$3M in signed contracts through the platform, across eleven awards." |
| 06 | Questions buyers ask | a person reviews and submits every response | "A person reviews and submits every response." |
| 07 | If your experts read the same document every week | production is a different stack | "Production is a different stack, and I run that stack." |

## ordani

§03 and §04 lift from the Stage A replacement text (LESSONS #3, ORDANI STEP 02 AND "WHAT IT BECAME"); the
check runs after Stage A lands. §02 renders from `ORDANI_CDC_2024.FIGURES` (Pitfall E2): the note's
figure is `{CDC.ratio}`, never a typed number.

| § | h2 | note | lifted from |
|---|---|---|---|
| 01 | Six apps and a Sunday night | the practitioner became the integration | "None of them talked to the others, so the practitioner became the integration" |
| 02 | Why it matters | `{CDC.ratio}` times the rate of non-Hispanic white women | "{CDC.ratio} times the rate of non-Hispanic white women, per the CDC's {CDC.releaseYear} release" |
| 03 | What I did | filing comes with the subscription | Step 02 body: "Filing comes with the subscription." |
| 04 | What it became | real Medicaid and private-insurance claims | "Practitioners in the beta file real Medicaid and private-insurance claims from Ordani" |
| 05 | Questions buyers ask | one person can write the code | "One person can write the code." |
| 06 | If you have the idea and no team | with nothing handed to a second team | "with nothing handed to a second team" |

## content-engine

| § | h2 | note | lifted from |
|---|---|---|---|
| 01 | The room was full and the internet was empty | a few thousand people a month | "the same message reached a few thousand people a month across every platform combined" |
| 02 | What I did | the work went out on eight platforms | "The work went out on eight platforms" |
| 03 | The part most content work skips | reach is not the product | "Reach is not the product. Revenue is." |
| 04 | What changed | a peak of 800,000 in a month | "grew from a few thousand a month to a peak of 800,000 in a month" |
| 05 | Questions buyers ask | a person approves each piece | "A person approves each piece." |
| 06 | If your message is stuck in the room | strategy, design, code, security and launch, all mine | "strategy, design, code, security and launch, all mine" |

## birth-worker

| § | h2 | note | lifted from |
|---|---|---|---|
| 01 | Her practice was bigger than her booking form | a slice of every claim went to whoever processed it | "a slice of every claim went to whoever processed it" |
| 02 | What I did | one service, over and over | "The pattern was the diagnosis: one service, over and over." |
| 03 | What changed | one to three a month to five to ten | "Bookings went from one to three a month to five to ten." |
| 04 | Why I know this world | it exists because of engagements like this one | "and it exists because of engagements like this one" |
| 05 | Questions buyers ask | there is no committee between the decision and the page | "there is no committee between the decision and the page" |
| 06 | If your buyers only ask for one of the things you do | name the offer they are actually buying | "and name the offer they are actually buying" |
