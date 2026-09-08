# Pass 103 Step A: editor summary

Eight page tables, prepared from branch `design/room-and-ledger`, HEAD `4250905`, on 2026-09-08. These are proposals for the juror and operator. The tables contain 120 rows: 67 proposed edits and 53 KEEP. Site files are unchanged. Nothing was committed, pushed, or deployed.

Read in order: the full Pass 103 brief, `.claude/RESUME.md`, both `PASS-102-READING*.md` files, the Voice rules, the brand file, and the claims ledger §3. Current wording comes from this branch’s source. The Pass 102 reading supplies vocabulary, not replacement facts or extra promises. Passioneer is a stub; the four complete studies are the four reviewed here.

| Page                                                    | Rows | Proposed | KEEP | Avg. before | Avg. after | Words before / after | Sentences before / after |
| ------------------------------------------------------- | ---: | -------: | ---: | ----------: | ---------: | -------------------: | -----------------------: |
| [/packages](PASS-103-EDIT-packages.md)                  |   19 |       10 |    9 |        9.69 |       7.82 |            281 / 258 |                  29 / 33 |
| [/about](PASS-103-EDIT-about.md)                        |   12 |        9 |    3 |       11.25 |       9.71 |            315 / 301 |                  28 / 31 |
| [/work/ordani](PASS-103-EDIT-ordani.md)                 |   12 |        8 |    4 |       15.37 |      12.97 |            538 / 467 |                  35 / 36 |
| [/work/guardicore](PASS-103-EDIT-guardicore.md)         |    8 |        5 |    3 |       10.56 |       9.34 |            380 / 327 |                  36 / 35 |
| [/work/rfp-engine](PASS-103-EDIT-rfp-engine.md)         |    7 |        6 |    1 |       10.77 |      10.26 |            323 / 277 |                  30 / 27 |
| [/work/content-engine](PASS-103-EDIT-content-engine.md) |    7 |        5 |    2 |       12.42 |      11.41 |            447 / 388 |                  36 / 34 |
| [/playbook](PASS-103-EDIT-playbook.md)                  |   45 |       19 |   26 |        8.61 |       7.96 |            749 / 724 |                  87 / 91 |
| [/call](PASS-103-EDIT-call.md)                          |   10 |        5 |    5 |        7.07 |       5.88 |             106 / 94 |                  15 / 16 |

The average measures the reviewed page prose, including unchanged rows and terminal fragments. It excludes navigation, metadata, price furniture, standalone headings, image text, image captions, the dated log label, and the hosted-checkout data rows. For chapter items it measures the tag, excluding the fixed title, number, page, and free marker. Paragraph/list boundaries end a terminal fragment; periods, question marks, and exclamation marks end sentences. Decimal points, Neuton.AI, U.S., a.m., and p.m. do not split sentences. Ordered approach numbers are excluded. Hyphenated words, numerical ranges, alphanumeric names, and contractions count as one word; a numerical expression such as $1.2M or 8,000 counts as one. After substitutes PROPOSED where present and CURRENT for KEEP. This is an editorial comparison, not a newly rendered site measurement.

The call comparison includes both mutually exclusive form states. The playbook comparison includes both sale states. These same scopes are used before and after. An additional check counting every table row in full, including chapter titles, captions, checkout data, and labels, also decreases on every page:

| Page           | All-row average before | All-row average after |
| -------------- | ---------------------: | --------------------: |
| packages       |                   9.62 |                  8.05 |
| about          |                  11.25 |                  9.71 |
| ordani         |                  15.14 |                 12.81 |
| guardicore     |                  10.56 |                  9.34 |
| rfp-engine     |                  10.77 |                 10.26 |
| content-engine |                  12.42 |                 11.41 |
| playbook       |                   8.44 |                  7.86 |
| call           |                   6.59 |                  5.56 |

The three sentences I believe carry the sale on each page follow. Each is verbatim from an effective row, meaning PROPOSED or a KEEP original.

**/packages**

- PK01: Buy a package and I start within the week.
- PK02: I send you a written plan the same day.
- PK16: Every package fee credits toward the next package or an engagement started within 60 days.

**/about**

- AB01: I help you build it and sell it, on the same engagement, for the same fee.
- AB04: $20M+ in client revenue since 2013.
- AB09: I founded Ordani, HIPAA-compliant practice management for birth workers, and I write the code.

**/work/ordani**

- OR06: Intake completion went from a self-reported 40% in beta-zero to a measured 91% in beta-one.
- OR10: Birth workers pay for it today, and none have left for a competitor.
- OR11; testimonial, A beta user, name withheld: It is the first piece of software that treats my practice the way I treat my clients.

**/work/guardicore**

- GC04: The work produced $14M in revenue at a $1.2M average enterprise deal size.
- GC07: From those findings, I ran a microsegmentation pilot with a top-10 North American bank.
- GC08: Trillions in financial assets sit protected behind those deployments.

**/work/rfp-engine**

- RF01: $3M in contracts won through software I built for an industry-authority author, government contracts among them.
- RF01: RFP-to-close rate doubled inside six months.
- RF03: Every morning, the author opens live opportunities with a partial response already drafted for each.

**/work/content-engine**

- CE01: Monthly reach grew from 8,000 to 290,000 in five months.
- CE01: Videos, blogs, newsletters, and digital events cost the author less money and fewer hours to produce.
- CE07: Their content lead has a 25-page playbook to execute without supervision.

**/playbook**

- PB01: Ten chapters on what the AI leaves to you: the first ten users, auth, deploys, payments, compliance.
- PB01: I built Ordani solo with Claude Code and Cursor: HIPAA-compliant, active paying users, in beta.
- PB26: Get the whole first chapter.

**/call**

- CA01: The work starts with your problem.
- CA02: I name what is stuck and what work would fix it.
- CA02: I tell you whether you need me at all.

Verification covers the complete nine-file output: verbatim-source comparison, row accounting, reason length, numerical expressions, quotation preservation, source fingerprints, banned vocabulary, retired-claim phrases, and sentence averages. No proposal introduces an em dash. Names, prices, dates, and citation values were checked against their source context and the ledger. `content/citations.ts` is unchanged; Ordani’s cited sentences retain their literal source figures and attribution. All proposals remain subject to the brief’s juror and operator steps.

Final checks: 120 CURRENT rows matched; 35 vocabulary entries and 24 retired-claim patterns returned zero matches. All nine Markdown files passed Prettier. All 14 source files matched revision 4250905.
