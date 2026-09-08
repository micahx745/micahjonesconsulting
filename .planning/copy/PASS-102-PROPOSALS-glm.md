# Pass 102 — Step B, the proposals (GLM 5.3, independent run)

Written 2026-09-08 by the GLM executor, per `.claude/briefs/pass-102-wording-round.md` §3. Basis:
`PASS-102-READING-glm.md` (same directory). CURRENT strings are verbatim from the branch's
rendered DOM on port 3011 (scratch `_extract-*.json`). At most one rewrite per string; KEEP
where the string is already the buyers' words; prices, names, the proof line and ledgered
numbers are never proposed (they sit in the appendix, untouched). Every proposal: first person
where a person speaks, zero em-dashes in rendered copy, no banned words, sentences under the
caps. No new facts, numbers, names, or quotes; buyers' vocabulary is borrowed, never pasted
with attribution. Step C (Astra) judges this table against the Codex table; the operator ticks.

Column key: attestation cites the phrase-bank entry and the thread (`#N` = post number in
`01-APPENDIX-intersection-37.json`, idx N−1). Ledger check names what changed. Voice check
covers words, person, length.

| page | section | CURRENT (verbatim) | PROPOSED | attestation (phrase id + thread) | ledger check | voice check |
|---|---|---|---|---|---|---|
| home | hero · H1 rotation word | `go-to-market.` (rotation: go-to-market. / product. / data platform. / RFP engine.) | `distribution.` | "go-to-market" = NEGATIVE bank entry: 0 occurrences of "go-to-market", "go to market", "gtm" in the measured package. "distribution" = #26 verbatim "My biggest problem right now is distribution." (idx 25, r/SaaS, score 1, comments 0) | fact unchanged: the noun names the same work; no claim added | one word; fits the fixed stem "I build the ___"; see note 1 (width parity) |
| home | hero · hero P | "Strategy and software, shipped by the same pair of hands. I find the gap between what you built and what buyers actually pay for." | "Strategy and software, shipped by the same pair of hands. I work on the part after the build: real users, real payments, repeatable traffic." | "real users" = 10 asking authors, 2.8× lift; "real payments" + "repeatable traffic" = #11 verbatim "I got 3 real payments… Then nothing. No sales. No repeatable traffic." (idx 10, r/SaaS, score 0, comments 6) | no new claim: outcome classes named, no figure quoted | sentences 9 + 14 words; first person; no em-dash; no banned words |
| home | §02 Operator · P | "Most consultants don't ship. Most builders don't sell. I do both, on the same engagement, for the same fee." | "Every builder hits the classic dilemma: build it or sell it first. I do both, on the same engagement, for the same fee." | #8 verbatim "I'm hitting the classic 'build it vs. sell it first' dilemma." (idx 7, r/microsaas, score 2, comments 10) | fact unchanged: same both-sides offer, same fee sentence kept verbatim | sentences 12 + 13 words; first person in sentence two; "vs." rendered "or" for speech |
| home | §03 How I work · 01 Diagnose | "I find the gap between what you built and what buyers actually pay for." | "I figure out what matters to users, what to cut, and what to build next." | #4 verbatim "figuring out what to build, how to scope it, what to cut, what matters to users" (idx 3, r/EntrepreneurRideAlong, score 0, comments 14) | no new claim: same diagnostic service in buyer words | 14 words; first person; their four verbs |
| home | §03 How I work · 02 Build | "Every engagement ships a named artifact in month one." | "Every engagement ships real work in month one." | "real" family: "real users" 10 asking authors 2.8×; "real feedback" #18 verbatim (idx 17, r/SaaS); "real payments" #11 (idx 10) | no new claim: same month-one deliverable promise | 7 words; "real" is the buyer intensifier |
| home | §03 How I work · 03 Position | "I stay until the narrative sells without me." | "I stay until it sells without me." | "sell it" #8 verbatim (idx 7); the system they lack: #29 "zero system for marketing" (idx 28), #26 "distribution" (idx 25) | same promise, same duration claim | 7 words; first person; drops non-buyer "narrative" |
| home | §04 · Unstick card P | "Ninety minutes live on your stuck build." | KEEP | "i'm stuck" = 8 asking authors, lift "only here" (zero showcase usage); the ONE surviving half of the killed split | already buyers' words | unchanged |
| home | §04 · Audit card P | "I go through it top to bottom and hand you the written audit." | "I go through it top to bottom and tell you what's broken, in writing." | #30 verbatim "I need honest feedback on what's broken" (idx 29, r/buildinpublic, score 1, comments 0) | no new claim: same written deliverable | 14 words; first person |
| home | §04 · Sprint card P | "One week on one outcome, shipped." | KEEP | "shipped" is house vocabulary with no buyer conflict on this string | clean as is | unchanged |
| home | §05 · H2 | "The receipts. Every line below is real." | KEEP | "real" family (10 asking authors + #11, #18, #30) | framing line, no claim | unchanged |
| home | §06 · P1 | "The AI handed you the code. Now ship the company." | KEEP | #4 verbatim "The hard part of building software was never really the coding." (idx 3); reply register agrees ("getting to a working prototype was never the hard part", scan report, labeled reply voice) | no claim; the beat is attested | unchanged |
| home | §06 · P2 | "It shipped. Nobody came." | "It shipped. Crickets." | "It shipped. Nobody came." = KILLED (operator wording; §6 falsification: ~9× less prevalent than "crickets"). "crickets" = 29 hits / 8.9% of 325 r/buildinpublic bodies, 0 across 545 dev-room bodies — the ruling's own replacement | no claim; a diagnosis line | 2 + 1 words; slang register flagged for the juror (note 2) |
| home | §06 · P3 | "The demo looked done. Production turned out to be a different machine entirely." | KEEP | no attested alternative exists: the paired claim "stuck between demo and production" is killed and only "i'm stuck" survives; scan keywords ("works locally" 37, "breaks in production" 12) are loose and unclassified | the author's own first-person build-log story carries this beat on /playbook; flagged, not rewritten | unchanged |
| home | §06 · P4 | "You kept running into the same thing. Fixed Tuesday, broken Friday, because the tool forgot." | KEEP | "kept running" = 13 asking authors, 7.3× lift (ledger §3 says 21; reading §5.1); intersection form is present tense #18 "I keep running into the same problem" (idx 17) | no claim | already the attested verb |
| home | §06 · P5 | "Ten chapters on what the AI leaves to you: the first ten users, auth, deploys, payments, compliance. Every chapter ends in a pre-flight card you run the same night." | KEEP | "first users" = 8 asking authors 1.4×; "early users" = 8 asking authors 9.1× (highest distribution lift) | book contents; no claim | unchanged |
| home | §07 · H2 | "The objections, in your words." | KEEP | framing; becomes fully true once the DT below carries their words | none | unchanged |
| home | §07 · DT1 | "Is this for me, if I vibe-coded it?" | "Is this for me if I built it with AI coding tools?" | "vibe coding" = KILLED for market backing (claimed count of 10 not on disk; scan tension: 31 loose unclassified matches — reading §5.2). #4 verbatim "using AI coding tools (Claude Code specifically)" (idx 3) | no new claim: same eligibility question | 12 words; question form kept |
| home | §07 · DD1 | "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works. Nobody is using it yet, or the next change keeps breaking it. Then yes." | KEEP | the model buyer-word string: "Claude Code" = 38 distinct authors (largest term anywhere; intersection #1, #4); "something real" = "real" family; "Nobody is using it yet" = #14 "there are no real users" (idx 13); "the next change keeps breaking it" = #21 (idx 20) | already buyers' words | unchanged |
| home | §08 · H2 / ask | "Name the problem." | KEEP | imperative CTA; the buyers' ask phrase ("reality check", #2, n=1) is proposed on the /call H1 instead | none | unchanged |
| packages | intro P | "For solo builders and small teams who got most of a product out of AI tools and stalled on the last stretch. Pick one, buy it, and the work starts within the week. No scoping call, no proposal, no quote to wait for." | "For founders and small teams who got most of a product out of AI coding tools and stalled on the last stretch. Pick one, buy it, and the work starts within the week. No scoping call, no proposal, no quote to wait for." | "solo builders" = KILLED (zero corpus); "founders" = #2 "experienced founders" (idx 1) + #29 self-description; "AI coding tools" = #4 verbatim (idx 3) | fact unchanged: same audience, same buy flow | sentences 18 + 14 + 8, avg 13.3; two edits only (audience noun, tool noun) |
| packages | Unstick P | "Ninety minutes live on your stuck build. You leave with a written plan the same day." | KEEP | "i'm stuck" = 8 asking authors, only-here | already buyers' words | unchanged |
| packages | Audit P | "Pick one flavor: Build (architecture and code), Production (security and deploy), or Traction (positioning and go-to-market). I go through it top to bottom and hand you the written audit. Not sure which one? Start here: the memo tells you what to fix first, and the fee credits toward what you book next." | "Pick one flavor: Build (architecture and code), Production (security and deploy), or Traction (positioning and distribution). I go through it top to bottom and tell you what's broken, in writing. Not sure which one? Start here: the memo tells you what to fix first, and the fee credits toward what you book next." | "go-to-market" = NEGATIVE (0 occurrences); "distribution" = #26 verbatim (idx 25); "what's broken" = #30 verbatim (idx 29) | no new claim: same three flavors, same deliverable, same credit terms | sentences 15 + 14 + 19, avg 16; two edits only (flavor noun, deliverable phrasing) |
| packages | Sprint P | "One week on one outcome, shipped: the repositioning, the production push, the AI feature. Not a plan. The thing, done." | "One week on one outcome, shipped: the marketing system, the production push, the AI feature. Not a plan. The thing, done." | #29 verbatim "it was that I had zero system for marketing" (idx 28) — the noun pair is theirs | outcome examples reworded, same service; juror check: does "marketing system" stay inside what a repositioning sprint does? (note 3) | sentences 14 + 3 + 3; first example noun only |
| playbook | subtitle label | "A field manual for solo founders" | "A field manual for stuck founders" | "solo founder" = KILLED (zero corpus); "stuck" = "i'm stuck" 8 asking authors, only-here; "founders" = #2, #29 | fact unchanged: same audience | 6-word label; minimal alternative "A field manual for founders" if tone reads harsh (note 4) |
| playbook | H1 | "The AI handed you the code. Now ship the company." | KEEP | #4 (idx 3), the page's spine | no claim | unchanged |
| playbook | If this is you · P1 | "It shipped. Nobody came." | "It shipped. Crickets." | same as home §06 P2: killed line, "crickets" 29 hits / 8.9% r/buildinpublic, 0 dev rooms | no claim | 2 + 1 words; kept identical to the home row so the beat reads one way site-wide |
| playbook | If this is you · P2 | "The demo looked done. Production turned out to be a different machine entirely." | KEEP | same basis as home §06 P3: no attested alternative; the build-log entry below tells it first-person and true | flagged in reading §4, not rewritten | unchanged |
| playbook | If this is you · P3 | "You kept running into the same thing. Fixed Tuesday, broken Friday, because the tool forgot." | KEEP | "kept running" 13 asking authors, 7.3× (ledger 21; reading §5.1) | no claim | already the attested verb |
| playbook | If this is you · P4 | "The wall is not a talent problem. It is arithmetic: the tool's memory runs out, and yours has to take over, on paper, in the repo. This manual is that hand-off, one system per chapter." | KEEP | "the wall / gate" killed as a pain pattern with ONE verbatim exception (#2 "I'm hitting a wall"); here "the wall" names the book's own title — naming is operator prerogative (reading §4) | book thesis; no buyer-facing claim | unchanged |
| playbook | field note 0.1 | "I hit this wall building it, on the tools you are using now." | KEEP | the exception itself: #2 "hitting a wall" n=1 (idx 1); plus "Claude Code" 38 authors for "the tools" | first-person author experience | unchanged |
| playbook | FAQ DT1 | "Is this for me, if I vibe-coded it?" | "Is this for me if I built it with AI coding tools?" | same as home §07 DT1: "vibe coding" killed; #4 "AI coding tools" verbatim (idx 3) | no new claim | 12 words |
| playbook | `<title>` (metadata) | "The 80% Wall: it shipped, nobody came — Micah Jones" | "The 80% Wall: now ship the company — Micah Jones" | removes the killed sentence from metadata; "ship the company" rides the H1's #4-supported beat | metadata only; no claim change | em-dash retained in metadata (not rendered body); the rendered-page budget is untouched |
| playbook | closing H2 | "If your build needs a second pair of hands." | KEEP | no buyer conflict | none | unchanged |
| work | H1 | "The receipts. Every line below is real." | KEEP | "real" family | framing; numbers below are ledgered | unchanged |
| about | intro P1 | "Most consultants don't ship. Most builders don't sell. I do both, on the same engagement, for the same fee." | "Every builder hits the classic dilemma: build it or sell it first. I do both, on the same engagement, for the same fee." | same string as home §02 P; #8 verbatim (idx 7) | same as home §02 row | kept identical to the home row so one string reads one way |
| about | intro P2 | "I've spent thirteen years inside B2B software companies as the person who can sit on either side of the table: GTM strategy in the morning, shipping product in the afternoon." | "I've spent thirteen years inside B2B software companies as the person who can sit on either side of the table: distribution in the morning, shipping product in the afternoon." | "gtm" = NEGATIVE (0 occurrences, all spellings); "distribution" = #26 verbatim (idx 25) | fact unchanged: same thirteen-years fact, same dual role; one noun swapped | 29 words, under the 35 rewrite bar; first person |
| about | known-for 2 | "GTM systems that compound." | "Marketing systems that compound." | #29 verbatim "zero system for marketing" (idx 28) — the noun pair is theirs | no new claim: same known-for area | 4 words |
| call | H1 | "Thirty minutes. Bring the problem." | "Thirty minutes. A reality check." | #2 verbatim "I'm hitting a wall, and I need a reality check from experienced founders." (idx 1, r/SaaS, score 1, comments 47 — the loudest thread in the set; n=1 anchor, reading §5.3) | no new claim: same free call | 2 + 3 words; "Bring the problem" survives in the P below either way |
| call | P | "No deck and no pitch. Bring the problem, and this call is where the work starts. If you have notes, bring them. If not, I will ask." | KEEP | "no deck" matches #2 asking founders, not decks (loose); imperative retained for the H1 either way | none | unchanged |
| call | What you leave with | "a named diagnosis of what is stuck, the shape of the work that would fix it, and a straight answer on whether you need me at all." | KEEP | "stuck" = 8 asking authors; "a straight answer" = #2's "reality check" in site voice | deliverable description; no claim | unchanged |

Supplementary rows — copy NOT in the rendered-DOM extract, found in source during extraction.
If any DOM row above is ticked, these contradict it until they move too:

| page | section | CURRENT (source verbatim) | PROPOSED | attestation | ledger check | voice check |
|---|---|---|---|---|---|---|
| about | meta + OG description | "Thirteen years inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA." | "Thirteen years inside B2B software: distribution in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA." | "go-to-market" NEGATIVE (0); "distribution" #26 (idx 25) | proof line untouched | one noun swap in metadata |
| llms.txt | line 17 | "Builds go-to-market for B2B software companies AND ships his own products." | "Builds distribution for B2B software companies AND ships his own products." | same negative + #26 | fact unchanged | machine-facing; juror weighs keyword value of the term for LLM queries (note 5) |
| llms.txt | line 22 | "Positioning & GTM — customer interviews and sales-call analysis…" | "Positioning & distribution — customer interviews and sales-call analysis…" | same | same | em-dash is pre-existing metadata-style text, untouched beyond the noun |
| llms.txt | line 32 | "growth, GTM and platform strategy roles inside B2B software companies" | "growth, distribution and platform strategy roles inside B2B software companies" | same | same | same |
| llms.txt | line 28 | "Fixed-price packages for solo builders and small teams: $500, $2,500 and $7,500" | "Fixed-price packages for founders and small teams: $500, $2,500 and $7,500" | "solo builders" KILLED; "founders" #2, #29 | prices untouched | one noun swap |

## Never proposed (protected; appendix, not rows)

- **Prices:** $500, $2,500, $7,500, "From $5K a month", "$99" "at launch" / "$149 after",
  "Packages from $500", "Free" (call page), refund terms ("Thirty days, full refund", "30 days,
  no questions").
- **Names:** Micah Jones; Postmates, SurveyMonkey, Guardicore (Akamai), Neuton.AI; Ordani; the
  industry author (never named; "an industry author" stays); "The author, name protected";
  Cursor, Claude Code, Lovable, v0, Bolt; "The 80% Wall" as product name.
- **The proof line and its cousins:** "Four exits, $5B+ combined."; the attributed quote
  "Micah does the work that most strategy decks promise and never deliver."
- **Ledgered numbers and frozen forms:** $20M+ since 2013; $14M / $1.2M average deal; $3M in
  contracts won; close rate doubled; 40% to a measured 91%; 8,000 to 290,000 / 36×; spec rows
  (Pages 69, Chapters 10, cards 10, Diagrams 9, Build-log 13, Companion files 26); Ordani
  descriptors ("HIPAA-compliant", "active paying users", "in beta", "public release coming");
  role rows and dates; "I read every message and reply inside one business day."
- **Furniture with no buyer mismatch:** nav bar, skip link, hero chips, buy buttons, card
  titles, engagements bar, footer, call-page DLs and form labels (the form's "What should we
  talk about?" uses "we" as a genuine two-party plural, not company-we; flagged for the juror,
  no change proposed), section labels, § codes, "Field note", chapter titles, the build-log
  entry (the author's own dated story), the SPEC demo, "Where the ten live", "Run tonight",
  FAQ DDs 2 to 5, title tags other than /playbook's.

## Notes for the juror and applier

1. **Width parity.** `distribution.` is 13 characters, `go-to-market.` is 13. The hero's width
   ladder (`--dw` stops, the §14.7 mobile floor in `app/globals.css`, `scripts/verify-room.py`)
   was measured against `go-to-market.`; the swap is near-isometric in count but letterforms
   differ, so the applier re-runs the width check rather than assuming.
2. **Register.** "Crickets." is r/buildinpublic slang on a site with a measured voice. It is
   the most evidence-backed proposal in the table (the §6 falsification ruling names it as the
   corpus-real wording) and the riskiest tonally. Both facts are the juror's to weigh.
3. **Offer fidelity.** The Sprint row swaps "the repositioning" for "the marketing system"
   (#29's noun pair). If it reads as a wider promise than a positioning sprint, reject the row;
   the string is fine unchanged.
4. **Tone.** "stuck founders" labels the reader with their own attested word ("i'm stuck", 8
   asking authors, zero showcase usage). The minimal fallback is "founders".
5. **llms.txt** targets LLM recommenders, not buyers; "go-to-market" may have query value there
   that the buyer corpus cannot speak to. Flagged, not settled.
6. **Em-dashes.** No proposal adds one to rendered copy. The /playbook title-tag row and two
   llms.txt rows keep pre-existing dashes in metadata surfaces, which the render-gate does not
   count.
7. **Banned words.** No proposal contains any of the 35; "distribution", "marketing",
   "founders", "real", "crickets", "reality check", "what's broken", "AI coding tools" are all
   clean against the list in `02-APPENDIX-voice-rules.json`.

*End of the proposals. Nothing here touches a page until Step D ticks and Step E applies.*
