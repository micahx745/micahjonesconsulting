# Fable re-read of /full-time round 4 (2026-09-21), verbatim, and what the main session did

Input: `.planning/prompts/PASS-125-FULLTIME-RECONFIRM.md` + r4 sheets (p124-cuts `.planning/qa/pass-125/sheets/*-r4.png`).
Same round: Astra SHOW HIM AS IS (`ASTRA-125-FULLTIME-RECONFIRM.md`), DeepSeek v4-pro SHOW HIM AS IS
(`DSPRO-125-FULLTIME-RECONFIRM.md`). LEGS this round: fable=1 astra=1 dspro=1.

DISPOSITION: finding 1 FIXED in `e7eea36` (text-wrap: pretty under 760px; checked in round 5 by a new
`artifactSingleWordLine` measure). Finding 2 FIXED in `e7eea36` (/about "Alongside it" takes the same 1.25em gap).
Finding 3 PARKED to the inner-pages pass (kickoff item 2): it changes live /about copy outside this page's scope; also
recorded as the round-1 finding 9 that the first disposition missed.

---

VERDICT: ONE MORE FIX. The fix is the 390 Code headline break (finding 1); it is one CSS rule, no copy, no ledger. Findings 2 and 3 can ride on the same round or be struck on the record; neither should hold the page.

1. Where: /full-time at 390, the Code headline, first principle, frame scrollY 0. What: it now breaks "I WRITE THE CODE / AND PUT WORKING / SOFTWARE / IN USERS' HANDS." The third line is one word at under half the measure. Why: the round-2b widow fix moved the hole rather than closing it. The string carries exactly one no-break space, between "users'" and "hands." (checked the bytes in content/full-time.ts line 34), so "in" is free to move; what strands "SOFTWARE" is `text-wrap: balance` on `.cw-principles--ft .cw-principle__artifact` (app/globals.css line 2970), written for the 1440 case and applied at every width. At 1440 all four headlines now sit clean; at 390 the first headline a phone reader meets has a gap in it, and that is the width he is most likely to open first. Fix, CSS only: keep balance for 1440 and, inside the existing `max-width: 760px` block, set `.cw-principles--ft .cw-principle__artifact { text-wrap: pretty; }`. Re-capture 390 scrollY 0; expected four lines "I WRITE THE CODE / AND PUT WORKING / SOFTWARE IN / USERS' HANDS.", no line shorter than half the measure, and the other three headlines at 390 unchanged from r4. If pretty still strands "SOFTWARE", fall back to `text-wrap: wrap` at that width: by the glyph widths greedy puts "SOFTWARE IN" on line 3.

2. Where: /about "Currently", 1440 capture. What: "the babies." runs straight into "Alongside it:" with line spacing only, then the seat paragraph gets 1.25em above and below (the inline style on that one <p>, app/(foyer)/about/page.tsx line 207), then the link gets another gap. Three sibling paragraphs, two rhythms. Why: the seat line reads as inserted rather than set; the first two thoughts read as one stanza while the third floats. My round-2b finding 3 asked for the gap between all three; it landed on one. Fix: the same 1.25em top margin on the "Alongside it" paragraph, or one class on all three "Currently" paragraphs in place of the inline style. Layout only. The "also" does the ordering work I asked for; the seat sentence third is fine as a fresh read.

3. Where: /about "Product builds" bullet (about/page.tsx lines 172-173) against the /full-time Code body. What: /about says "Ordani, HIPAA-compliant practice management for birth workers"; /full-time, one click away through the seat link, says "ORDANI, a HIPAA-compliant CRM for birth workers." This was my round-2b finding 9 and it has no line in the disposition, adopted or struck. Why: one product, two nouns, on the two pages a hiring reader moves between. Fix: /about's bullet takes the study's noun, "Ordani, a HIPAA-compliant CRM for birth workers." Ledger: LESSONS #3 carries "HIPAA-compliant CRM" as the study's approved wording (lines 514, 565, 597) and no "practice management" phrase; /full-time stays as is. If "practice management" is ruled wording somewhere I did not find, strike this and record the strike. Casing can stay ("Ordani" in prose, "ORDANI" as the study title, both in the ledger's own MDX).

The Result headline works. "I build software that helps close deals." is the plainest of the three and the only one a founder repeats back without thinking; "helps" is the honest verb under a page that refuses "led to", and the body proves the headline exactly (an RFP engine, one in eight to one in four). Its one cost: it names an output where the other three name a method, so under "How I think." it is the least principle-shaped of the four. The close-rate number under it carries that, and I would not reopen it.

The order works. Code, Positioning, Result, Scope runs in the H1's order, build then sell, then the two together in Result, and leaves the numberless block last, where "The record." and its $5B+ pick up immediately. A founder does not read the order as a flaw.

Landed from my round-2b read: 1, 2, 4, 7, 10, 11 at 1440, 12, 14. Partly landed: 3 (finding 2 above). Not dispositioned: 9 (finding 3 above). Not re-raised: 5, 8, 13 (struck or his to rule).

Checked on the rendered text: no banned-list word, zero em dashes, "worked inside" present, no "led to", no "head of", the only title is product analyst at Postmates, nothing on ORDANI's future, the Neuton.AI line verbatim as approved pending his ruling, the six months bound to the close rate only.
