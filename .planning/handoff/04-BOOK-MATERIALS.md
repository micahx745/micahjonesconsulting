# 04-BOOK-MATERIALS — Opus reads of the manuscript, 2026-09-04

Extracted from workflow wf_64ddc31b-88a (five Opus reads, read-only). Every quote is from
the BOOK repo `C:/Users/micah/Code/the-80-percent-wall/src/`, not the stale frozen copy in
the site repo. Saved here so the book session does not re-derive it.

## Chapter 8 vs chapter 1 — the sample-swap read

The biggest finding is not about chapter 8: product/playbook/ in this repo is a STALE frozen copy, and the live book source is C:/Users/micah/Code/the-80-percent-wall/src/ — chapter-08.typ differs between them, and the site's own claims gate reports 10 findings against the frozen copy while the book repo scans clean. Every quote below is from the BOOK repo. Chapter 8 is 1,397 words over 7 pages (pp. 50-56) against chapter 1's 2,118 words over 9 pages (pp. 3-11), so the swap trades a ten-minute read for a six-minute one. It stands alone better than expected — no file or setup dependency, and both backreferences restate their point inline — but it has four concrete gaps: it names Ordani without ever saying what Ordani is, its §08.4 heading uses "invariants" undefined, its Status row hardcodes "Chapter eight of ten" instead of chapter 1's edition-status() "Free chapter of ten", and its sampler-only block is a next-chapter teaser with no author bio, no price and no CTA, where chapter 1's is a full two-paths sales colophon. The swap is not a one-file change: build:sample, publish-to-site.mjs JOBS[2], lib/chapter1-pdf.ts, the signup action's subject and body, the form's two strings, the delivery email's line 51, and eight anchors on the /playbook page all hardcode chapter one.

### CRITICAL — the source you must read is not in this repo
Source: `product/playbook/README.md#⚠ MOVED (lines 1-5) + sha compare of both src/ trees`

product/playbook/ is a frozen, STALE copy. README: "As of 2026-09-02, this directory is a frozen copy. Do not edit it." The live manuscript is C:/Users/micah/Code/the-80-percent-wall/src/. chapter-08.typ differs between them (frozen 9,003 chars sha 47e0c110a4be; book repo 9,160 chars sha 72f088ab8a8c). chapter-01, chapter-09 and template.typ also differ; only book.typ is identical. Every verbatim string in this report is from the BOOK repo.

Note: A brief that quotes the frozen copy will quote text that was already corrected. The frozen ch8 fieldnote still says "Hundreds of birth workers pay for it today"; the book repo says "It has active paying users today."

### Proof of the drift, mechanical
Source: `scripts/ordani-claims-gate.mjs (run 2026-09-04, both repos)`

Running the site repo's own gate: `node scripts/ordani-claims-gate.mjs` → "10 finding(s)", ALL in product/playbook/src/, including "product\playbook\src\chapter-08.typ:61: \"Hundreds of birth workers\" — retired user count". Running the same gate in the book repo → "ordani-claims-gate: clean (39 files scanned)".

Note: The gate's own header says it is "NOT YET WIRED INTO `pnpm build`. It fails today, by design." The ten findings are stale-copy artifacts, not live defects. LESSONS #14 is the entry that created this gate.

### Chapter 8 word count
Source: `the-80-percent-wall/output/the-80-percent-wall.pdf pp.50-56, text-extracted with running footers stripped; src/chapter-08.typ:22`

1,397 words across 7 pages (book pp. 50-56). Spec card says "A six-minute read".

Note: The standalone sampler compile adds an 8th page — the sampler-only "Next · Chapter 09" teaser.

### Chapter 1 word count
Source: `the-80-percent-wall/output/the-80-percent-wall.pdf pp.3-11 and output/the-80-percent-wall-ch1.pdf (10 pp, built 2026-09-03); src/chapter-01.typ:29`

2,118 words across 9 pages (book pp. 3-11). As the shipped 10-page sampler including the sales colophon page: 2,290 words. Spec card says "A ten-minute read".

Note: Chapter 8 is 66% of chapter 1's length. Same extraction method for both, footers stripped.

### Chapter 8 — opening paragraph 1, VERBATIM
Source: `the-80-percent-wall/src/chapter-08.typ:31`

The sales page of this manual opens with three sentences of pain, and this chapter is the third one. The app works. The deploy held. The security checks passed. You posted it where builders post things, refreshed the analytics, and watched a spike of visitors arrive, click twice, and never return.

Note: Section heading immediately above it is `== It shipped. Nobody came.` (chapter-08.typ:29).

### Chapter 8 — opening paragraph 2, VERBATIM
Source: `the-80-percent-wall/src/chapter-08.typ:33`

Here is the part that should comfort you, and then the part that should change your week. The comfort: this is not evidence your product is bad. The launch-post lottery was always a lottery, and it has gotten worse, because the feeds are now full of AI-built demos that all look competent. A working app is no longer rare enough to be news. The change: you were never actually playing for a crowd. You were playing for ten people, and ten people have never been reachable by broadcast.

Note: Zero em-dashes; one colon-led construction per sentence pair. Reads clean against the voice rules as-is.

### Chapter 1 — opening paragraph 1, VERBATIM
Source: `the-80-percent-wall/src/chapter-01.typ:45`

You asked for something small. Move a button. Fix a date format. The diff was four lines. It compiled. You shipped it.

Note: The first RENDERED element of ch1 is not this paragraph — it is a rail field note at chapter-01.typ:38-43 introducing Ordani. Chapter 8 has no equivalent opening field note.

### Chapter 1 — opening paragraph 2, VERBATIM
Source: `the-80-percent-wall/src/chapter-01.typ:47`

Then you clicked around. Uploads are broken. Uploads. The feature you finished Tuesday. The one that already worked.

Note: This is the regression beat measured at 1.0% by phrasing-free proximity — the beat the research leg proposes demoting.

### Does chapter 8 stand alone? Verdict
Source: `the-80-percent-wall/src/chapter-08.typ:29-134 (full read)`

YES on structure, with four fixable gaps. It introduces every artifact it uses: the three rings are defined by an in-chapter diagram plus prose (chapter-08.typ:45-55), USERS.md is created fresh in-chapter (chapter-08.typ:99-111), and the four-part outreach anatomy is self-contained (chapter-08.typ:68-74). No earlier chapter's file, prompt, or setup is required to run any of it.

Note: It is a more self-contained artifact than chapter 1, which spends its first half building the context-window mechanism before it can act.

### Standalone gap 1 — Ordani is named, never introduced
Source: `the-80-percent-wall/src/chapter-08.typ:61-66; chapter-01.typ:38-43`

The only field note reads: "Ordani opened as a private beta with several birth practices, found through the rings, not through a launch. It has active paying users today, and at the six-month mark none had been lost to a competitor. Retention was the plan, not the reward." Nothing in chapter 8 says what Ordani is. Chapter 1's first field note does that job: "Mostly Ordani: a HIPAA-compliant SaaS I built alone with Claude Code and Cursor, in beta now with active paying users."

Note: This is the one true standalone defect. A cold reader meets a proper noun with no referent inside the chapter's only credibility block.

### Standalone gap 2 — 'invariants' used undefined, in a heading
Source: `the-80-percent-wall/src/chapter-08.typ:95; chapter-01.typ:78`

Section heading at chapter-08.typ:95 reads `== Track ten people like you track invariants`. The term is defined only in chapter 1, italicised in prose: "Engineers call a rule like this an _invariant_: something that must stay true no matter what changes around it."

Note: It is a heading, so it is unavoidable on the page. Either gloss it in ch8 or accept it reads as jargon to a first-time reader.

### Standalone gap 3 — Status row hardcodes the book edition
Source: `the-80-percent-wall/src/chapter-08.typ:21; chapter-01.typ:28; src/template.typ (edition-status definition)`

chapter-08.typ:21 is `("Status", "Chapter eight of ten")` — a plain string. Chapter 1 uses the edition switch: `("Status", edition-status("Free chapter of ten", "Chapter one of ten"))`. The helper exists and works: `#let edition-status(sampler-txt, book-txt) = context { upper(if edition.get() == "sampler" { sampler-txt } else { book-txt }) }`.

Note: Verified in output: the ch1 sampler spec card renders "STATUS FREE CHAPTER OF TEN"; the ch8 opener renders "STATUS CHAPTER EIGHT OF TEN". A one-line change, but it is a change.

### Standalone gap 4 — chapter 8's sampler block sells nothing
Source: `the-80-percent-wall/src/chapter-08.typ:137-150; chapter-01.typ:240-269; output/the-80-percent-wall-ch1.pdf p.10`

chapter-08.typ:137-150 renders only a "Next · Chapter 09" teaser and the footer "© 2026 MICAH JONES · THE 80% WALL". Chapter 1's sampler-only block is the full two-paths colophon: author bio, "PATH ONE · THE MANUAL" with "Launch price $99, then $149" and micahjonesconsulting.com/playbook, "PATH TWO · THE OPERATOR" with micahjonesconsulting.com/book, and the footer "© 2026 MICAH JONES · FREE CHAPTER · SHARE IT, DON'T SELL IT".

Note: This is the largest CRO cost of a naive swap. The free sample currently ends on a price and two CTAs; chapter 8 would end on a teaser for a chapter the reader cannot buy yet. The share licence line also disappears.

### Backreferences to earlier chapters — both survive standalone
Source: `the-80-percent-wall/src/chapter-08.typ:93, :97`

Two exist and both restate their own point inline, so neither strands a cold reader. chapter-08.typ:93: "...is chapter two's lesson wearing a sales hat: the part the AI cannot generate is the part that works." chapter-08.typ:97: "Chapter one's answer applies to humans too: memory goes in a file, in the repo."

Note: Read as advertisements for the paid chapters rather than as gaps. Arguably an asset in a free sample.

### Chapter 8's first sentence is COUPLED to the /playbook page
Source: `the-80-percent-wall/src/chapter-08.typ:31; app/(foyer)/playbook/page.tsx:307-317`

"The sales page of this manual opens with three sentences of pain, and this chapter is the third one." That is true today: the "If this is you" block renders exactly three paragraphs, the third being "It shipped. Nobody came."

Note: Load-bearing for the brief: if the rework changes that three-line block — reorders it, adds a fourth line, promotes the distribution beat to first — chapter 8's opening sentence becomes false in a PDF that is already in strangers' inboxes. Rewrite the page and the chapter in the same pass, or cut the reference.

### Chapter 8's pre-flight card — full contents VERBATIM
Source: `the-80-percent-wall/src/chapter-08.typ:117-132; "Run tonight" kicker from src/template.typ (preflight helper)`

Header: title "Pre-flight · First users", right kicker "Run tonight". Five items:
1. "*Write the ten-name list tonight.* Inner ring first: people who would answer a text, who touch the problem or know someone who does. The list is usually easier to write than it felt."
2. "*One conversation a day.* Personal, specific, no blast. A no that ends in "but talk to..." is a win; log the introduction."
3. "*Make one unscalable offer.* Set it up for them, migrate the data, run the first week. Effort you spend is trust they don't have to."
4. "*Keep USERS.md current.* One block per person, updated after every conversation. What they ask about twice goes to the spec."
5. "*Count returns, not signups.* Someone who comes back unprompted, twice, is one of your ten. Ten of those, and the next chapter's loop has fuel."

Note: Renders on book page 56 as "PRE-FLIGHT · FIRST USERS / RUN TONIGHT". Item 5 forward-references chapter 9; the other four are fully actionable with nothing bought.

### Ledger claim 1 — the field note (the one that matters)
Source: `the-80-percent-wall/src/chapter-08.typ:62-65; docs/LESSONS_LEARNED.md:218-229 (#3, Ordani entry)`

"Ordani opened as a private beta with several birth practices... It has active paying users today, and at the six-month mark none had been lost to a competitor." This is ledger-CLEAN in the book repo. The approved phrasing is "active paying users", framed as in beta with a public release coming (operator 2026-09-01: "drop the user amounts across the website for ordani"). "None lost to a competitor" explicitly survives; "Zero churn" is a NEVER.

Note: The frozen copy's version of this same field note is NOT clean. Do not copy it.

### Ledger claim 2 — the six-month qualifier has weak provenance
Source: `the-80-percent-wall/src/chapter-08.typ:64; docs/LESSONS_LEARNED.md:224-231`

"at the six-month mark none had been lost to a competitor". The ledger's approved phrase carries no time qualifier: "none lost to a competitor". The six-month framing traces to a SUPERSEDED entry — "fourteen practices / eight active weekly at six months" — which #3 records as describing the closed beta and having "gone stale on the live site".

Note: Not a NEVER-phrase, so no gate fires. But it is a derived value inherited from a retired claim, and it would be sitting in the most-read free artifact. Worth an operator confirm or a cut before the swap.

### Ledger claim 3 — the SurveyMonkey / $20M+ line
Source: `the-80-percent-wall/src/chapter-08.typ:41; docs/LESSONS_LEARNED.md:85-89, :158-164`

"Selling has been my trade longer than building: enterprise software inside SurveyMonkey on the way to its IPO, and \$20M+ in client revenue since." Ledger-compliant: employer ruled "I worked at SurveyMonkey" (2026-09-03, never TechValidate); consulting revenue is "$20M+, SINCE 2013 and OPEN-ENDED" and the word "since" keeps the range open.

Note: The ledger's SurveyMonkey figure is "$1M+ toward the IPO" — chapter 8 does not state a figure, so it makes no claim to check. Safe as written.

### Ledger claim 4 — 'twenty years of selling' is UNLEDGERED
Source: `the-80-percent-wall/src/chapter-08.typ:59; docs/LESSONS_LEARNED.md:147-149`

"Cold or warm, the anatomy of outreach that works has not changed in twenty years of selling." No entry in section 3 supports a twenty-year selling career. The nearest ledgered duration is "THIRTEEN YEARS, not 'a decade'" (operator 2026-09-03), which covers the consulting practice since 2013.

Note: Thirteen years consulting plus the earlier enterprise-sales years could total twenty, but the ledger does not carry the start of the sales career. Flag for the operator rather than assume.

### Exposure item — the 2026-08-31 build-log entry
Source: `the-80-percent-wall/src/chapter-08.typ:76-91`

The war story "One email, not a launch" describes a live consulting prospect: "It opened with her week, not my services. It quoted the best sentence from her own website back to her... take a week of what her current provider produces, remake all of it in my style, free, judged side by side." No name, no business identified.

Note: Not a ledger issue — it is an exposure judgment. In the paid PDF this reaches buyers; as the FREE sample it reaches everyone including, plausibly, her and her current provider. Chapter 1's two war stories are both about the operator's own repo and carry no third party.

### Ledger surface: chapter 8 is far LIGHTER than chapter 1
Source: `the-80-percent-wall/src/chapter-01.typ:248-267 vs chapter-08.typ:41, :59, :62-65`

Chapter 8 carries three checkable claims (Ordani field note, SurveyMonkey/$20M+, twenty years). Chapter 1's sampler carries those plus its colophon: "$5B+ in combined value across the four", the four company names, "HIPAA-compliant SaaS I built alone", "in beta with active paying users and a public release coming", and "Launch price $99, then $149".

Note: Cuts both ways. Fewer claims to maintain, but the colophon's claims are the ones doing the selling. Moving the colophon to ch8 moves its ledger load with it.

### Exact page spans per the TOC
Source: `the-80-percent-wall/output/the-80-percent-wall.pdf p.2 (CONTENTS), text-extracted; mirrored in app/(foyer)/playbook/page.tsx:79-133`

08 The first ten users — P. 50; 09 The distribution loop — P. 57; 10 When to hand it off — P. 63. So ch08 spans pp. 50-56 (7 pages) and ch09 spans pp. 57-62 (6 pages). Ch01 spans pp. 3-11 (9 pages). Book total: 69 pages.

Note: The site's CHAPTERS array already carries these exact page numbers, so the on-page TOC needs no numeric change for a swap.

### Correction to the research leg's page arithmetic
Source: `.planning/research/03-FABLE-RESEARCH-LEG.md:63; the-80-percent-wall/output/the-80-percent-wall.pdf (69 pages); .planning/snapshots/2026-09-04/playbook.txt ("Pages 69")`

The Fable leg states "ch 8-9 = 13 of 68 pages". The 13 is right (7 + 6). The denominator is 69, not 68 — the site itself renders "Pages 69" and the PDF has 69 pages.

Note: Trivial, but the honesty guardrail sentence in the brief will quote this ratio, so it should be 13 of 69 (19%).

### Market evidence that actually backs the swap — cite these, not vibes
Source: `.planning/research/01-REDDIT-EVIDENCE.md#3 (lines 99-119) and #6 (lines 181-195)`

From the asking-vocab table ranked by DISTINCT AUTHORS with lift vs showcasers: landing page 27 authors / 2.2x; real users 10 / 2.8x; cold outreach 9 / 2.5x; first users 8 / 1.4x; early users 8 / 9.1x; conversion rate 6 / 3.3x; paid ads 6 / 2.2x; user base 6 / 6.7x. "Eight of the top sixteen are distribution." Against that, the regression beat: phrasing-free proximity 17 hits / 1.0%, versus `crickets` in r/buildinpublic at 29 / 8.9%.

Note: IMPORTANT: "It shipped. Nobody came." is the OPERATOR'S OWN sentence, not measured market language — the evidence file names it as his and uses `crickets` at 8.9% as the market-side proxy. "first users" (8 authors, 1.4x) is the weakest-lift phrase on that list; "early users" (8 authors, 9.1x) is far stronger. Chapter 8's title is "The first ten users".

### How the free chapter is delivered today — the whole chain
Source: `the-80-percent-wall/package.json (scripts.build:sample); the-80-percent-wall/scripts/publish-to-site.mjs (JOBS[2]); lib/chapter1-pdf.ts:1-9; app/actions/playbook-signup.ts:23, :81`

1) Book repo `npm run build:sample` = `typst compile src/chapter-01.typ output/the-80-percent-wall-ch1.pdf --font-path fonts`. 2) `npm run publish:site` writes base64 into the SITE repo's lib/chapter1-pdf.ts (exports CHAPTER1_PDF_BASE64 + CHAPTER1_FILENAME = "the-80-percent-wall-ch1.pdf"). 3) app/actions/playbook-signup.ts imports those and attaches the PDF via Resend. 4) Site build + deploy. The site does NOT read product/playbook/ at build or runtime.

Note: publish-to-site.mjs calls itself "THE DRIFT SEAM": "Rebuilding the book here changes nothing a buyer receives until this script runs and the site is redeployed."

### Book-repo edits a swap requires
Source: `the-80-percent-wall/package.json; the-80-percent-wall/scripts/publish-to-site.mjs (JOBS array)`

package.json scripts.build:sample hardcodes src/chapter-01.typ and the ch1 output filename. publish-to-site.mjs JOBS[2] hardcodes src "output/the-80-percent-wall-ch1.pdf", out "lib/chapter1-pdf.ts", constName CHAPTER1_PDF_BASE64, fileConst CHAPTER1_FILENAME, filename "the-80-percent-wall-ch1.pdf", what "the free sample chapter". Plus chapter-08.typ needs edition-status() on Status and a sales colophon.

Note: Cheapest path that avoids renaming the generated module everywhere: keep the constant names and the lib/chapter1-pdf.ts filename, change only the typst source and the emitted PDF filename. Ugly but a two-line diff instead of a rename across three files.

### Site-repo edits a swap requires — the eight /playbook anchors
Source: `app/(foyer)/playbook/page.tsx:83, :278, :288, :351-362, :470, :490, :495-497, :616`

page.tsx:83 `free: true` on the "01" entry (move to the "08" entry at :116-121); :288 hero CTA "Get chapter one free"; :470 renders "· free, below" off that flag; :490 h2 "Chapter one, free"; :495-497 "The whole first chapter, not an excerpt..."; :616 "Leave your email for chapter one now"; :351-362 the spread <Image src="/playbook/spread-wallchart.png"> with caption "§ 01.4 · Why it hits at 80% and not sooner · page 6 of 69"; :278 <WallChart /> in the hero with its "Page 6 · why the wall is arithmetic, not skill" meta line.

Note: The hero WallChart is chapter 1's page-6 diagram and is the page's ONE approved figure animation (.claude/CLAUDE.md, motion-engineer approval 2026-09-01). Swapping the free chapter does not require touching it, but it does mean the hero's signature figure now illustrates a chapter the visitor has to pay for.

### Site-repo edits — the email surfaces
Source: `app/actions/playbook-signup.ts:62, :63-79, :106, :108; components/color-worlds/PlaybookSignupForm.tsx:58, :77; lib/playbook-delivery.ts:51`

app/actions/playbook-signup.ts:62 subject "Chapter 1 of The 80% Wall — why your build broke at 80%"; :63-79 body describes chapter 1's contents verbatim ("what the context window actually remembers, why the break hits at 80% and not sooner, and the five habits"); :106 owner subject "Chapter 1 delivered"; :108 "New playbook sampler signup. Chapter 1 was emailed to them." PlaybookSignupForm.tsx:58 success text "Chapter one is on its way from micah@micahjonesconsulting.com" and :77 button "Send me chapter one →". lib/playbook-delivery.ts:51 (the PAID email) says "Start with chapter 1 even if you have read the free copy".

Note: playbook-delivery.ts:51 is the easiest line to miss — it is in the purchase email, not the sample flow, and it silently becomes wrong the moment the free chapter is not chapter 1.

### An asset for the swap already exists, unused
Source: `public/playbook/ listing; app/ scan for "spread-" returns only page.tsx:353; the-80-percent-wall/output/the-80-percent-wall.pdf p.52`

public/playbook/spread-rings.png is present and referenced by NOTHING in app/. It is chapter 8's rings diagram, which renders on book page 52 (§ 08.2 "Where the ten actually live"). The only spread wired into the page today is spread-wallchart.png.

Note: So the "Read a page" section can switch to the rings spread with an existing image and a caption of "§ 08.2 · Where the ten actually live · page 52 of 69". No new render needed.

### The paragraph that most directly answers 'it shipped, nobody came'
Source: `the-80-percent-wall/src/chapter-08.typ:33`

"Here is the part that should comfort you, and then the part that should change your week. The comfort: this is not evidence your product is bad. The launch-post lottery was always a lottery, and it has gotten worse, because the feeds are now full of AI-built demos that all look competent. A working app is no longer rare enough to be news. The change: you were never actually playing for a crowd. You were playing for ten people, and ten people have never been reachable by broadcast."

Note: This is the diagnosis-plus-reframe in one move: it absolves, explains why the old play stopped working, and redefines the target from crowd to ten. It sits on book page 51, immediately under the heading that is already the page's third pain line.

### Strongest pull-quote candidate in chapter 8
Source: `the-80-percent-wall/src/chapter-08.typ:53`

"This is where most of your ten live, and the arithmetic is humbling and freeing at once: ten users at a plausible hit rate is somewhere around a hundred conversations. A hundred conversations is a month of mornings. No audience required."

Note: Named numbers, no em-dash, converts the complaint into a bounded task. "No audience required" is the four-word answer to the dominant measured pain. If the brief needs one line from chapter 8 to put on the page, this is it — and it is the book's own sentence, so it needs no ledger entry.

### UNVERIFIED — possible filecard rendering artifact on ch8's page 55
Source: `the-80-percent-wall/output/the-80-percent-wall.pdf p.55 vs product/playbook/output/the-80-percent-wall-ch8.pdf p.6; the-80-percent-wall/src/chapter-08.typ:102`

Text extraction of the current book PDF renders the USERS.md card's second line as "-# Dana R. — ring 2, via Marcus"; the source is `\#\# Dana R. — ring 2, via Marcus` and the older (2026-09-02) standalone ch8 PDF extracted it as "## Dana R.". Both PDFs were built from the same filecard code — template.typ's diff does not touch filecard.

Note: I could not distinguish a real glyph regression from a pypdf extraction difference between two builds — no visual probe available in a read-only text pass. Reported as UNVERIFIED, not as a defect. Cheap to settle by opening page 55; it lands inside the candidate free sample, so settle it before shipping.

## Artifact inventory — what the book contains that a page or a launch can show

The book carries far more shippable proof than the page uses: six page-renders at 180ppi already sit in public/playbook/ unreferenced by any file (window p.5, arch p.20, money p.39, rings p.51, pre-flight card p.10, chapter-02 opener), so four of the nine diagrams and the book's own pre-flight card can be mounted with zero render work. The site currently shows only four images (book cover, spread-wallchart p.6, companion-card, hero-context photo) plus two authored HTML/SVG pieces (WallChart, PromptDiff), and PlaybookHeroMedia is dead code not mounted on this page. Every one of the 26 companion files is plain Markdown, short enough to render whole, and marketing/companion-card.typ is a working recipe for turning any checklist into a book-grammar PNG. Two claim traps: chapter 8's opening section and chapter 1's 2026-08-11 build-log entry both carry "$20M+ in client revenue" and a selling role, which the operator deliberately stripped from THIS page on 2026-09-02, so those passages cannot be excerpted verbatim without reversing his edit. Two count defects found: the page's "Ten templates" is really nine templates plus a README, and the assembled PDF mixes A4 (12 pages) with US Letter (57), so opener renders have a different aspect ratio from interior pages.

### diagram-01-wall-chart
Source: `product/playbook/src/template.typ:166`

Chapter 01, page 6. Three-curve line chart: a nearly flat dashed petrol line 'What fits in the window' crossed by 'Unwritten rules' rising in four increasingly steep terracotta segments; crossing marked 'The wall'; x-axis 'Build progress ... 80%'. Format: Typst-native #place line drawing on a 340x168pt canvas. Renderable (already is, at public/playbook/spread-wallchart.png, 1530x1980). ALREADY USED TWICE on the page — as the page-6 render in 'Read a page' AND hand-transcribed as the inline SVG <WallChart/>. Do not add a third instance.

Note: Call site: product/playbook/src/chapter-01.typ:92. This is the book's signature figure and the one the page already leans on hardest.

### diagram-02-window
Source: `product/playbook/src/template.typ:396`

Chapter 01, page 5. A strip of six labelled cells: the first two dashed and greyed ('TUE'S FIX', 'WHY IT'S ODD') under the caption 'FELL OUT OF THE WINDOW', the next four solid petrol ('FILE READS', 'YOUR ASK', 'NEW DIFF', 'ERRORS') under 'WHAT THE MODEL CAN SEE NOW'. Format: Typst stack of stroked boxes. ALREADY RENDERED and unused: public/playbook/spread-window.png (1530x1980, 800KB). Page 5 also carries the §01.3 'Features are more than their code' prose and the terracotta pull-quote 'Code says what. Only the transcript knew why. And the transcript is gone.' Serves: the 'If this is you' block, as the picture of the mechanism the page currently only asserts in prose.

Note: Call site chapter-01.typ:70. Strongest unused asset on the whole list: it is the book's premise, rendered, sitting in public/ with zero importers.

### diagram-03-drift-chart
Source: `product/playbook/src/template.typ:192`

Chapter 02 (chapter starts p.12). Two lines diverging from a shared origin: 'The app you intend' (petrol, steady rise) versus 'The app the sessions build' (terracotta, rises then plateaus), the widening distance marked 'The gap', x-axis 'Sessions'. Format: Typst #place line drawing, 340x150pt. NOT rendered to PNG anywhere in this repo — would need a typst compile run in the book repo. Serves: the section on drift, next to PromptDiff.

Note: Call site chapter-02.typ:48. Same chapter PromptDiff already quotes, so mounting both would double up on chapter two.

### diagram-04-arch
Source: `product/playbook/src/template.typ:236`

Chapter 03, page 20. The five-box architecture map: CLIENT (browser/phone) --session token--> SERVER (your rules run here) --owner filter / signed access / secrets--> DATA (who sees what), STORAGE (files/media), 3RD PARTIES (pay/mail/sms), with a return arrow labelled VERIFIED WEBHOOKS and the note 'back into the server, never the client'. ALREADY RENDERED and unused: public/playbook/spread-arch.png (1530x1980, 651KB). The rendered page also carries §03.1 'The napkin test' prose and a field note. Serves: a 'what it teaches' section — this is the page that proves the book teaches, not asserts.

Note: Call site chapter-03.typ:47. Verified by reading product/playbook/review-package/page-renders/spread-arch.jpg — footer reads 'THE 80% WALL · FM-03 · REV 2026.08 · 20'.

### diagram-05-machines
Source: `product/playbook/src/template.typ:254`

Chapter 04. Two-column comparison box, no lines: 'Your laptop' in petrol (.env file with every key / logged-in CLIs / database you seeded by hand / localhost URLs everywhere / files from six months of work) beside 'Production' in terracotta (your code ... and nothing else. Every value you didn't explicitly provide is missing.). Format: Typst grid of two stroked boxes, mono type inside. NOT rendered to PNG. Excerptable as text instead — the two columns are short enough to rebuild in HTML, but that would be a second card system, which the design-director already ruled against for the companion card.

Note: Call site chapter-04.typ:33. Directly illustrates the build-log entry the page already runs ('the demo that lied for weeks'), so it is the most on-message unrendered diagram.

### diagram-06-money
Source: `product/playbook/src/template.typ:285`

Chapter 06, page 39. BROWSER --sent to pay--> STRIPE (hosted checkout) --signed webhook = THE TRUTH--> YOUR SERVER (webhook endpoint) --> DATABASE (paid = true), plus a dashed terracotta line from Browser labelled '"/SUCCESS" LOADED / IS NOT PROOF OF PAYMENT'. Footer note: 'money state flows one way: stripe, then server, then db'. ALREADY RENDERED and unused: public/playbook/spread-money.png (1530x1980, 770KB), which also carries the §06.3 'Webhooks, the load-bearing wall' prose.

Note: Call site chapter-06.typ:50. Verified by reading review-package/page-renders/spread-money.jpg — footer 'FM-06 ... 39'.

### diagram-07-compliance
Source: `product/playbook/src/template.typ:329`

Chapter 07. Three question/verdict rows built from decide-row(): 'Do you store or move identifiable health data on behalf of providers or plans?' -> HIPAA · now; 'Can EU or UK residents sign up for your public app?' -> GDPR basics · now; 'Is an enterprise buyer's questionnaire blocking a real deal?' -> SOC 2 · when asked. Format: Typst grid, not a line drawing. NOT rendered to PNG.

Note: Call site chapter-07.typ:46. Text is short and quotable verbatim; the three question strings are the useful part.

### diagram-08-rings
Source: `product/playbook/src/template.typ:351`

Chapter 08, page 51. Three concentric circles centred on 'YOU' with leader lines: 'PEOPLE WHO KNOW YOU / trust: inherited. start here.', 'PEOPLE THEY VOUCH YOU TO / one ask away. your ten live here.', 'STRANGERS WITH THE PROBLEM / reachable one at a time, never in bulk', under the caption 'broadcast reaches none of these rings. conversations reach all three.' ALREADY RENDERED and unused: public/playbook/spread-rings.png (1530x1980, 771KB), which also carries the §08.2 'Where the ten actually live' prose.

Note: Call site chapter-08.typ:43. The most visually distinct of the nine (circles, not boxes or axes) and it answers the page's own third pain line, 'It shipped. Nobody came.'

### diagram-09-loop
Source: `product/playbook/src/template.typ:373`

Chapter 09. Four-node clockwise cycle: 'They use it' (returns, unprompted) -> 'Value moment' (a win · a thanks) -> 'Ask, or artifact' (who else? · output travels) -> 'New person' (arrives vouched) -> back, with the centre label 'each lap needs less of you' and an arrow tag 'joins the ten'. Format: Typst boxes plus placed arrows, 340x216pt. NOT rendered to PNG.

Note: Call site chapter-09.typ:39.

### diagram-count-is-exact
Source: `product/playbook/review-package/02-book-contents.md:436`

Nine is the true count of named diagram functions and each is used exactly once: wall-chart and window-diagram in ch01, drift-chart ch02, arch ch03, machines ch04, money ch06, compliance ch07, rings ch08, loop ch09. Chapters 05 and 10 have no named diagram — ch10's 'four roads' strip reuses ch07's decide-row() component and is not counted. The page's field note 'Nine line-drawn diagrams, each drawn for this book' is accurate and can be repeated verbatim.

Note: Independently confirmed by grepping all nine #<name>() call sites across product/playbook/src/chapter-*.typ.

### unused-render-window-p5
Source: `public/playbook/spread-window.png`

public/playbook/spread-window.png — 1530x1980 PNG, 800KB, US Letter at 180ppi, page 5. Already deployed to the CDN, referenced by NO file in app/, components/, lib/ or content/. Mountable today with the existing <figure className="cw-lp-spread"> pattern and zero new production work.

Note: Verified unused: grep for 'spread-window' across app components lib content returns nothing.

### unused-render-arch-p20
Source: `public/playbook/spread-arch.png`

public/playbook/spread-arch.png — 1530x1980 PNG, 651KB, page 20 (the five-box map plus §03.1/§03.2 prose). Deployed, unreferenced, mountable today.

Note: Same grep result — no importer.

### unused-render-money-p39
Source: `public/playbook/spread-money.png`

public/playbook/spread-money.png — 1530x1980 PNG, 770KB, page 39 (money flow plus §06.3 prose). Deployed, unreferenced, mountable today.

Note: Same grep result — no importer.

### unused-render-rings-p51
Source: `public/playbook/spread-rings.png`

public/playbook/spread-rings.png — 1530x1980 PNG, 771KB, page 51 (trust rings plus §08.2 prose). Deployed, unreferenced, mountable today.

Note: Same grep result — no importer.

### unused-render-preflight-p10
Source: `public/playbook/spread-preflight.png`

public/playbook/spread-preflight.png — 1530x1980 PNG, 569KB, page 10: the book's own PRE-FLIGHT · FIVE HABITS card with the saffron 'RUN TONIGHT' tag, five checkboxes, and the follow-on line 'So you don't have to guess what habit one produces, here is the shape of the file, three rules in. Yours will grow past twenty.' This is the CHAPTER version of checklists/01-context-habits.md, with fuller prose than the companion file. Deployed, unreferenced.

Note: Verified by reading review-package/page-renders/spread-preflight.jpg — footer 'FM-01 ... 10'. Note it is a second pre-flight card: the page already shows the security card, so mounting both needs a reason.

### unused-render-opener-ch02
Source: `public/playbook/spread-opener-02.png`

public/playbook/spread-opener-02.png — 1488x2105 PNG, 226KB. The full-bleed chapter-02 opening page on espresso ground: 'THE 80% WALL' / 'FIELD MANUAL · DOCUMENT 02 OF 10', a giant terracotta '02', the title 'The spec is the moat', the dek, and a spec block (SUBJECT/AUTHOR/TIME/READER/STATUS/REV) in saffron-labelled mono. Serves: a world-shift divider between the bone paper section and the espresso back cover, or the top of the Contents block.

Note: ASPECT WARNING: this is A4 (0.707), while every interior render is US Letter (0.773). It cannot sit in the same grid as a spread render without a different aspect box.

### preflight-cards-ten-files
Source: `product/playbook/companion/checklists/`

Ten Markdown files, one per chapter, five checkbox lines each, 7 lines per file: 01-context-habits, 02-spec-ritual, 03-architecture-locks, 04-deploy-day, 05-security, 06-stripe, 07-compliance, 08-first-ten, 09-distribution, 10-handoff. All plain text, all quotable verbatim, all short enough to render whole in the book's preflight() grammar.

Note: The site already renders 05-security as public/playbook/companion-card.png. The other nine have never been rendered.

### preflight-card-render-recipe
Source: `product/playbook/marketing/companion-card.typ:1`

marketing/companion-card.typ is a working, reusable recipe: it imports the book's own template, sets a 420pt-wide auto-height page on cw-paper, and calls preflight() with the verbatim contents of checklists/05-security.md. Its header carries the exact command: typst compile marketing/companion-card.typ ../../public/playbook/companion-card.png --format png --ppi 220 --font-path fonts --root .. — swap the filename and the five item strings and any other checklist becomes a PNG in the same grammar.

Note: The header records the design-director's ruling: 'the book's grammar, never a third HTML card system'. Any new card must go through this path, not through HTML.

### preflight-card-04-deploy-day
Source: `product/playbook/companion/checklists/04-deploy-day.md:1`

checklists/04-deploy-day.md — the strongest second card. Five lines: list every variable and confirm each exists per environment; 'Env change, then redeploy, then test. In that order, every time. Installed is not live.'; migrate the hosted database and confirm safety rules are on; open all three doors (apex, www, platform URL) with one redirect hop at most; fire every integration once, for real, on the live site. Serves: directly beneath the build-log entry the page already runs, because that entry IS this failure.

Note: 'Installed is not live' is also the title of a build-log entry in chapter 4, so card and story reinforce each other.

### preflight-card-03-architecture-locks
Source: `product/playbook/companion/checklists/03-architecture-locks.md:1`

checklists/03-architecture-locks.md — the natural pairing for the arch diagram. Five lines: the client enforces nothing alone; every query filters by owner (better, row-level security); 'Storage is private by default: copy a file URL, open it logged out. If it loads, that's tonight's work.'; secrets live in host environment variables, grep the repo for anything key-shaped; money truth comes from verified webhooks.

Note: One card per arrow of the five-box map — pairs with spread-arch.png as a diagram-plus-action unit.

### preflight-card-06-stripe
Source: `product/playbook/companion/checklists/06-stripe.md:1`

checklists/06-stripe.md — pairs with the money diagram. Five lines: hosted checkout only, your server never sees a card number; access granted by the verified webhook, never the success page; make the five live-mode swaps deliberately; wire the refund echo (charge.refunded revokes what payment granted); 'Pay yourself once, live, and watch the whole pipe. Then refund it.'

Note: Relevant to the page's own state: the $99 button is not live yet, and chapter 6's build-log entry is about refusing to ship it.

### spec-file-booking
Source: `product/playbook/companion/templates/SPEC-example-booking.md:1`

templates/SPEC-example-booking.md — 27 lines, six sections filled end to end for a solo-trainer booking product. WHAT: 'Booking and payments for independent personal trainers. One trainer, their clients, their calendar. Winning = a client books and pays in under a minute on a phone.' NOT: 'Not a marketplace. Not multi-trainer gyms. No social feed, no chat, no meal plans.' Plus SHAPE, RULES, NOW, LATER. Excerptable whole or as a WHAT/NOT pair.

Note: This is the one worked SPEC that DOES appear in a chapter (chapter 2's filecard). The other two do not.

### spec-file-gallery
Source: `product/playbook/companion/templates/SPEC-example-gallery.md:1`

templates/SPEC-example-gallery.md — 27 lines, photographer client galleries. WHAT: 'Private photo galleries a wedding photographer sends each couple. Winning = the couple views, favorites, and downloads without ever emailing her for help.' RULES: 'Storage is never public. A gallery link expires in 90 days. Original files are never mutated; downloads are generated copies.'

Note: Appears in no chapter — the page's §0.7 field note already makes this its selling point, so showing the file itself would cash that note.

### spec-file-ops
Source: `product/playbook/companion/templates/SPEC-example-ops.md:1`

templates/SPEC-example-ops.md — 27 lines, internal claims tracker. WHAT: 'An internal tool where a three-person billing team tracks insurance claims from submitted to paid. Winning = no claim silently ages past 30 days.' NOT: 'Not a CRM. Not accounting. No client-facing surface at all.'

Note: Also appears in no chapter. Three SPECs side by side would show range — booking, creative, internal ops — in one screenful.

### spec-template-blank
Source: `product/playbook/companion/templates/SPEC-template.md:1`

templates/SPEC-template.md — 25 lines, the blank six-section form with its own instruction comment: 'Six sections. One page, hard cap. If it spills, NOT and LATER take the excess. Read at the start of every session.' Renders as a filecard the way the book does it.

Note: Blank-form-beside-worked-example is a strong two-up: the template and SPEC-example-booking at the same size.

### prompt-session-opener
Source: `product/playbook/companion/prompts/session-opener.md:1`

prompts/session-opener.md — 9 lines, the shortest of the six and the most instantly usable. Full text is a single instruction block: read SPEC.md and the invariants file before anything else, then today's task, framed against the NOW milestone, and stop rather than build anything touching the NOT list. Short enough to render as a whole file card at readable size.

Note: Format: plain Markdown with a # title line and one paragraph block. No code fences, so it renders as prose in the book's filecard grammar.

### prompt-diff-review
Source: `product/playbook/companion/prompts/diff-review.md:1`

prompts/diff-review.md — 11 lines, three numbered questions to ask before accepting a diff: does any change violate a listed invariant (name the line); does it touch any file the stated task had no business touching; does it add anything that belongs in NOT or LATER. Closes 'Answer with the specific lines, not a summary.'

Note: The numbered structure makes it the best-looking of the six as a rendered card.

### prompt-architecture-map
Source: `product/playbook/companion/prompts/architecture-map.md:1`

prompts/architecture-map.md — 9 lines. 'Read this codebase and produce the five-box architecture map: client, server, data, storage, third parties. For every arrow between boxes, tell me what stops the wrong person from using it. Then list every place a secret lives, with file paths.' Ends: 'Verify nothing for me. Output the map as claims I will check against the code, arrow by arrow.'

Note: The first paragraph is quoted verbatim inside chapter 3 as a #callout (chapter-03.typ:124), so prompt file and chapter agree word for word — the file is a receipt for the chapter.

### prompt-invariant-extractor
Source: `product/playbook/companion/prompts/invariant-extractor.md:1`

prompts/invariant-extractor.md — 13 lines. Asks the tool to write an invariants file, one line per rule-with-a-reason the code depends on but does not state, formatted '- <THING> must <BEHAVIOR>: <what breaks otherwise>.', with anything inferred-but-unverified marked (UNVERIFIED).

Note: Carries a literal format line, which reads as engineering rather than marketing.

### prompt-stripe-wiring
Source: `product/playbook/companion/prompts/stripe-wiring.md:1`

prompts/stripe-wiring.md — 15 lines, four numbered webhook rules (verify signature, dedupe event IDs, read current state from the API rather than trusting event order, acknowledge fast then do slow work) plus the access rule: granted ONLY in the webhook handler.

Note: Rendered as a filecard inside chapter 6 (chapter-06.typ:70), so it is the one prompt already shown in the book.

### prompt-outreach-drafter
Source: `product/playbook/companion/prompts/outreach-drafter.md:1`

prompts/outreach-drafter.md — 17 lines, the longest. Four-part outreach anatomy with three angle-bracket placeholders the user fills (who they are, the mutual context, their own words being quoted), and the instruction that the specifics must appear unchanged.

Note: Longest of the six; would need trimming or a scroll box to render whole.

### build-log-thirteen-entries
Source: `product/playbook/src/chapter-01.typ:128`

Thirteen #warstory blocks, all dated, spread across nine chapters: ch01 2026-08-11 'The same bug, twice' and 2026-08-31 'The demo that lied for weeks'; ch02 2026-05-19 'Six weeks toward a reference nobody locked' and 2026-08 'Four redesigns in one week'; ch03 2026-08 'The token that was everywhere'; ch04 2026-08-31 'Installed is not live' and 2026-08-31 'The redirect loop I shipped this afternoon'; ch05 2026-08-31 'The secret I leaked to be helpful'; ch06 2026-08 'The buy button I refused to ship'; ch07 2026-08-30 'The stack I stopped naming'; ch08 2026-08-31 'One email, not a launch'; ch09 2026-08-31 'The book that carries its own loop'; ch10 2026-08-31 'Written the week I chose road one'. The page's claim of thirteen is exact.

Note: Counted by grepping '#warstory(' across product/playbook/src/*.typ — thirteen hits. Format: espresso-filled block with a mono code line and a title, i.e. the same visual the page's .cw-lp-log card already imitates.

### build-log-redirect-loop
Source: `product/playbook/src/chapter-04.typ:90`

ch04, 'Entry · 2026-08-31 — The redirect loop I shipped this afternoon'. Verbatim opening: 'While writing this very chapter, I made the classic move.' The www domain was pinned to a specific deployment; attaching www to the project created a default redirect to the apex while the apex already redirected to www, 'fifty hops deep, and my site was down for two minutes on a Sunday while I unwound it.' Closes: 'Redirects have two ends, and you check both directions before and after touching either.' Fully excerptable — no employer, no number, no role, no ledger exposure.

Note: The cleanest second entry: it is about this exact website, it is self-incriminating rather than self-promoting, and it carries zero claims-ledger risk.

### build-log-leaked-secret
Source: `product/playbook/src/chapter-05.typ:101`

ch05, 'Entry · 2026-08-31 — The secret I leaked to be helpful'. He pasted two live credentials, an email API key and a private calendar URL, into an AI chat session to wire a feature. 'And the moment they hit the chat, both stopped being secrets. Not because anyone malicious was watching, but because they had touched a surface I don't control, and "probably fine" is not a security model.' Closes: 'The question is never "did it leak?" It is "can I afford to assume it didn't?"' No ledger exposure.

Note: Deliberately does NOT claim rotation was completed — it says rotation went on that day's list with a deadline. That honesty is itself the proof, and it must not be tidied up in an excerpt.

### build-log-token-everywhere
Source: `product/playbook/src/chapter-03.typ:100`

ch03, 'Entry · 2026-08 — The token that was everywhere'. Auditing a client project, one live API token appeared twelve times, pasted into tool-configuration files by AI sessions being helpful. 'Twelve copies of a live key accumulated one convenient moment at a time, in files nobody reads, synced to wherever the repo goes.' Fix took an evening: rotate, move to an environment variable, add a credential-shape grep to every commit. Client is unnamed.

Note: Has a hard number (twelve) and a client-work frame, which is the only entry that shows him auditing someone else's build.

### build-log-same-bug-twice
Source: `product/playbook/src/chapter-01.typ:128`

ch01, 'Entry · 2026-08-11 — The same bug, twice'. The renderer eats the space after bold text; a session fixed it and documented it; weeks later a different session reintroduced it. Contains a literal shell line rendered in mono: grep -rn "+in client" app/ && echo "SPACE BUG IS BACK" && exit 1. Closes 'Rules a machine can run beat rules a reader must remember.'

Note: CLAIM TRAP: the entry's example string is '$20M+ in client revenue' shipping as '$20M+in client revenue'. That number was deliberately removed from /playbook on 2026-09-02 (see app/(foyer)/playbook/page.tsx:305 comment). Excerpting this entry verbatim restores it. The grep line alone is safe to show.

### chapter-01-opening-verbatim
Source: `product/playbook/src/chapter-01.typ:37`

Chapter 01 opening, after the heading '== The moment it turns', four paragraphs verbatim: 'You asked for something small. Move a button. Fix a date format. The diff was four lines. It compiled. You shipped it.' / 'Then you clicked around. Uploads are broken. Uploads. The feature you finished Tuesday. The one that already worked.' / 'So you tell the AI to fix uploads. It fixes uploads. Now the date format is wrong again.' / 'Somewhere around the third loop, everyone has the same thought: this thing has turned on me.' (the last clause is italic in the source). Zero banned words, zero em-dashes, zero ledger claims. Serves: a 'read the opening' block, or as the free-chapter proof directly above the email form.

Note: Note the field note that sits alongside it (chapter-01.typ:29) DOES carry Ordani claims: 'a HIPAA-compliant SaaS I built alone with Claude Code and Cursor, that hundreds of birth workers pay for'. If the opening is excerpted, take the four body paragraphs and leave the field note, or re-check that phrasing against LESSONS #3.

### chapter-08-opening-verbatim
Source: `product/playbook/src/chapter-08.typ:29`

Chapter 08 opening, after the heading '== It shipped. Nobody came.', first paragraph verbatim: 'The sales page of this manual opens with three sentences of pain, and this chapter is the third one. The app works. The deploy held. The security checks passed. You posted it where builders post things, refreshed the analytics, and watched a spike of visitors arrive, click twice, and never return.' The second paragraph runs 'Here is the part that should comfort you, and then the part that should change your week...' and ends 'You were playing for ten people, and ten people have never been reachable by broadcast.'

Note: This paragraph explicitly points back at the landing page's own three pain lines, which the page already runs verbatim in .cw-lp-lines. Quoting it closes a loop the page opened. STOP AT THE SECOND PARAGRAPH — see the next item.

### chapter-08-claim-trap
Source: `app/(foyer)/playbook/page.tsx:305`

CLAIM TRAP, four paragraphs into chapter 08: 'Selling has been my trade longer than building: enterprise software inside SurveyMonkey on the way to its IPO, and $20M+ in client revenue since.' This states a selling role and the $20M+ figure. Both were deliberately removed from THIS page on 2026-09-02 — the operator's words were 'remove the sales part too', and the resolution recorded in the page is that companies are named as places he JOINED, with no job title anywhere. Excerpting past the second paragraph reverses his edit.

Note: $20M+ IS a live ledger fact (docs/LESSONS_LEARNED.md:85, 'SINCE 2013 and OPEN-ENDED'), so this is not a ledger violation — it is an operator page-scope decision, which is why it needs flagging rather than silent obedience.

### site-already-renders-book-cover
Source: `app/(foyer)/playbook/page.tsx:242`

public/playbook/book-cover.png (1819x2572) — mounted twice in the hero object block, priority-loaded, sizes '(max-width: 900px) 88vw, 520px', inside .cw-lp-book with a .cw-lp-book__spine div. The cover itself: espresso ground, mono kicker 'A FIELD MANUAL FOR SOLO BUILDERS', a rule, the title stacked 'The / 80% (terracotta) / Wall.', the subtitle 'Why AI-assisted builds stall between demo and production, and what it takes for one person to ship a real company.', signed MICAH JONES.

Note: Confirmed served on the live page: the 2026-09-04 snapshot requests /_next/image?url=%2Fplaybook%2Fbook-cover.png.

### site-already-renders-spread-wallchart
Source: `app/(foyer)/playbook/page.tsx:353`

public/playbook/spread-wallchart.png — mounted in the 'Read a page' section with figcaption '§ 01.4 · Why it hits at 80% and not sooner · page 6 of 69', sizes '(max-width: 1000px) 92vw, 640px'. This is the ONLY interior page currently shown.

Note: Confirmed live in the snapshot. Its rail field note reads 'Nine line-drawn diagrams, each drawn for this book. No stock art anywhere in it.' — a claim the page currently backs with one example out of nine.

### site-already-renders-companion-card
Source: `app/(foyer)/playbook/page.tsx:517`

public/playbook/companion-card.png (1283x1150) — mounted in the 'Run tonight' section with figcaption 'checklists/05-security.md · one of ten pre-flight cards, as shipped', beside a three-item .cw-lp-files list itemising the 26 companion files.

Note: Confirmed live in the snapshot.

### site-already-renders-hero-context-photo
Source: `app/(foyer)/playbook/page.tsx:329`

public/hero-context.jpg — a real photograph of Micah at a laptop in front of a whiteboard covered in service architecture, mounted small in the §0.1 marginalia rail as .cw-lp-author__img, sizes '(max-width: 999px) 40vw, 210px'. The only photograph on the page.

Note: Confirmed live in the snapshot. Also used elsewhere on the site, so it is not exclusive to this page.

### site-already-renders-wallchart-svg
Source: `components/color-worlds/WallChart.tsx:32`

<WallChart /> — an inline SVG on a 340x168 viewBox whose every coordinate is transcribed from wall-chart() in template.typ: static axes, a dashed 'window' path revealed by an espresso curtain rect wiping left to right, a four-segment 'rules' path drawn via pathLength, a crossing circle at (243.5, 55.1), five text labels, and figcaption 'Page 6 · why the wall is arithmetic, not skill'. It carries a <desc> for screen readers. Motion runs once on load, only at >=900px, only without prefers-reduced-motion; the base CSS is the finished frame.

Note: Mounted in the hero, directly under the byline (page.tsx:284). Approved in writing by the motion-engineer 2026-09-01 as a FIGURE animation and granted an explicit exception to the DESIGN_BAR R15 400ms entrance cap. A SECOND animated figure would be the second-signature line — the brief must not add one.

### site-already-renders-promptdiff
Source: `components/color-worlds/PromptDiff.tsx:20`

<PromptDiff /> — pure HTML/CSS, no image. A caption block ('From chapter two · The spec is the moat' plus 'The redesign that produced the page you are reading. Same tool. Same week. The sentence was the difference.') over a two-column grid: BEFORE 'Four rounds. All rejected.' with the blockquote 'make it better.', AFTER 'Round five. Shipped in two passes.' with the blockquote 'nicer than what exists, no cheap gimmicks, photos of real work, keep what already worked.' Both blockquotes are quoted word for word from chapter two's 2026-08 war story.

Note: Mounted at page.tsx:384 under the heading 'One sentence, four rounds apart'. Its rail note says 'Both sentences are quoted from chapter two, word for word.' Do not duplicate chapter two elsewhere without a reason.

### component-playbook-signup-form
Source: `components/color-worlds/PlaybookSignupForm.tsx:26`

<PlaybookSignupForm /> — client component, email input plus a 'Send me chapter one →' button, posts to the submitPlaybookSignup server action, swaps to a confirmation reading 'Chapter one is on its way from micah@micahjonesconsulting.com. Nothing in a few minutes? Check spam.' Takes a `plain` prop that strips the cw-reveal fade. Mounted TWICE on /playbook, both times with plain: in the '#pb-free' section and in the back-cover grid.

Note: Same regex validates client and server side. The component's own header still says 'there is no Lemon Squeezy checkout yet' while the page comments say Stripe — a stale comment, not a functional defect.

### component-scroll-reveal
Source: `components/color-worlds/ScrollReveal.tsx:11`

<ScrollReveal /> — a client component that adds a class to [data-mode="cw"], observes every .cw-reveal element at an 18% threshold, adds .is-in and unobserves, and treats anything already within 82% of the viewport height at mount as already in. Renders null. It is NOT imported by app/(foyer)/playbook/page.tsx, and every PlaybookSignupForm on the page passes plain, so /playbook currently has no reveal behaviour at all.

Note: Consistent with the Pass-55 header note that this page shipped with zero reveals. If the brief wants entrance motion on new artifact blocks, this is the existing mechanism and it needs mounting; but see the WallChart motion-engineer condition first.

### component-playbook-hero-media-is-dead-code
Source: `components/color-worlds/PlaybookHeroMedia.tsx:14`

<PlaybookHeroMedia /> — renders the book cover inside .cw-pb-hero-media__stage with a static perspective tilt (<=8 degrees, never mouse-tracked, never idling) and one edge light, and takes an optional videoSrc that mounts a muted autoplay loop in the same stage using the cover as poster with zero reflow. IT IS NOT IMPORTED BY /playbook — the page inlines its own <Image src="/playbook/book-cover.png"> in .cw-lp-book instead.

Note: Grep for PlaybookHeroMedia across app/ returns no importer. Its videoSrc socket was built for the AI-generated 'vibe coding factory' loop that was DECLINED under DESIGN_BAR R12 and the illustration ban — so the socket must stay empty. Either mount it or leave it; do not fill the video slot.

### design-bar-r12-text
Source: `docs/DESIGN_BAR.md:197`

R12, verbatim scope: 'Every image is a real artifact — actual screenshot, document, photograph, or hand-made graphic tied to the work. Zero stock photos, stock 3D, Undraw-style figures, AI-generated imagery. Hand-drawn SVG accents pass only as one consistent authored voice, used sparingly.' R12 is one of five load-bearing criteria (R1, R4, R6, R12, R20): failing any TWO caps the grade at template tier regardless of total.

Note: Every asset in this inventory is a page of a document the operator wrote and typeset, so all of it passes R12 by construction. The risk is not R12 — it is R15 (motion) and the second-signature rule.

### companion-zip-is-exactly-26
Source: `product/playbook/output/the-80-percent-wall-companion.zip`

output/the-80-percent-wall-companion.zip contains exactly 26 files: README.md, 10 checklists, 6 prompts, and 9 templates (ARCHITECTURE-sample.md, CLAUDE-invariants-starter.md, LOOP.md-template.md, SPEC-example-booking.md, SPEC-example-gallery.md, SPEC-example-ops.md, SPEC-template.md, USERS.md-template.md, env.example). The page's '26 companion files' is exact.

Note: Verified by listing the zip with python zipfile — 26 entries, no directories counted.

### defect-ten-templates-count
Source: `app/(foyer)/playbook/page.tsx:531`

The page's file list says 'Ten templates, including three worked SPEC files written end to end'. The ZIP holds NINE files in templates/; the tenth item in that bucket is the top-level README.md. The arithmetic (10 + 6 + 10 = 26) only works if README is counted as a template. A buyer who unzips and counts finds nine.

Note: Same defect class as the page numbers the file already warns about: 'a promise a buyer can check in seconds, and a stale one is the cheapest possible way to look careless.' Cheapest fix is 'Nine templates ... plus a README' or 'Ten files of templates and instructions'.

### defect-mixed-paper-sizes
Source: `product/playbook/src/template.typ:439`

The assembled PDF mixes two page sizes: 12 pages at A4 (595.2756 x 841.8898) and 57 at US Letter (612 x 792). The A4 pages are the cover, the contents page, and the ten chapter openers — chapter-open() calls page() before the manual() show rule sets paper: "us-letter", so the openers inherit Typst's A4 default. Practical consequence for the landing page: opener renders are 0.707 aspect while interior renders are 0.773, so they cannot share a grid cell.

Note: Counted from /MediaBox entries in output/the-80-percent-wall.pdf. Out of scope to fix here (product/playbook is frozen) but it constrains the layout spec.

### page-count-69-confirmed
Source: `product/playbook/output/the-80-percent-wall.pdf`

The assembled PDF is 69 pages (69 /Type /Page objects, /Count 69), which matches the page's 'Pages 69' spec row, its metadata description, and the JSON-LD numberOfPages. The review package's 02-book-contents.md says 68 and is stale — do not use that document as the count source.

Note: The free chapter-1 sample PDF is 10 pages, 112,228 bytes, byte-identical to review-package/the-book/chapter-1-free-sample.pdf, and is embedded for delivery at lib/chapter1-pdf.ts.

### frozen-copy-constraint
Source: `lib/chapter1-pdf.ts:1`

product/playbook/ is a synced copy, not the source: lib/chapter1-pdf.ts's generated header states 'Source of truth is the BOOK repo (the-80-percent-wall), not this one' and names scripts/publish-to-site.mjs as its writer — a script that does not exist in this repo's scripts/ directory. Any NEW page render (drift-chart, machines, compliance, loop, or additional pre-flight cards) requires a typst compile in the book repo, not an edit here.

Note: Practical read for the brief: assets already in public/playbook/ are free; anything not already rendered is an operator-side task in another repo, with the pipeline at product/playbook/HANDOFF.md:37 (edit .typ -> check.py -> compile -> rasterize and LOOK at every changed page -> embed -> commit).

### layout-tokens-that-exist
Source: `app/globals.css:5336`

The page already has the CSS to mount another book page with no new classes: .cw-lp-spread img (block, width 100%, height auto, 1px border in color-mix currentColor 28%), .cw-lp-cap (mono, 10px, 0.12em tracking, uppercase, opacity 0.6), .cw-lp-block (main column plus .cw-lp-block__rail marginalia), .cw-lp-files, .cw-lp-log, .cw-lp-toc, .cw-lp-lines, .cw-lp-body (max-width 60ch). Two world grounds exist as data-world="espresso" and data-world="bone" on section wrappers.

Note: A brief that adds artifact blocks in the existing .cw-lp-block / .cw-lp-spread grammar needs no new CSS at all, which keeps the change inside the page file.

### review-package-site-screenshots
Source: `product/playbook/review-package/screenshots/`

product/playbook/review-package/screenshots/ holds 21 JPGs of THIS SITE (desktop-01..08, mobile-01..12, og-share-card), captured 2026-09-02. They are real artifacts but they are pictures of the page the buyer is already standing on, so they prove nothing a scroll does not. Listed here only so the brief does not rediscover them and mistake them for book pages.

Note: page-renders/ in the same directory holds the JPG twins of the nine public/playbook PNGs at ~1/3 the file size — useful for reading and describing, not for shipping (public/ already has the PNGs).
