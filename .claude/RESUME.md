# RESUME — micahjonesconsulting (2026-09-02)

## Pass-81 (ebe736e) + Pass-82 (51d0c05) — PUSHED. Booking retired, Medicaid claim down.
81: three links to /book behaved like outbound ones (two with target="_blank", two with the
↗ glyph this site reserves for "leaves the site"). Internal links, corrected.
82, OPERATOR RULING "booking behind the purchase everywhere": all SIX remaining CTAs now go
to /contact (hero, home big-link, home footrow, /playbook foot, both /services CTAs).
**/book IS RETIRED** — body folded into /book/kickoff (now self-contained),
components/BookPageBody.tsx deleted, next.config.ts 301s /book -> /contact. /book/kickoff is
NOT caught by that redirect (Next matches `source` exactly, not as a prefix) — verified, it
still builds and the gate still sees it. The booking FORM contract is untouched.
Copy followed the buttons: the Engagements door, the shapes-table foot, the /packages
cross-link, and the /services closing section whose title was "A free 30-minute call comes
first." That intro also opened on "We name the shape" — the one banned pronoun on a solo
page — now first person.
82, OPERATOR RULING "soften it to what's defensible" (Medicaid): BOTH claims off the home
page. "processing Medicaid claims fee-free" = a regulated billing function on a HIPAA
product with no ledger sentence behind it (it was supplied via a CODE COMMENT, which is not
provenance). "hundreds of dollars" = vaguest figure on a page of named numbers, wearing the
same shape as the user count retired 2026-08-31. Replaced by the framing this surface never
had: active paying users, in beta, public release coming. **"Medicaid" now renders ZERO
times on the home page.** Mission line ("lower infant mortality") is purpose-framed, stays.
To restore the money claim: one sentence on the real mechanism + a named figure, ledgered
with a date. The requirement is written into the source comment.
Verified: 15 routes (was 16 — /book is a redirect, not a page), gate green, tsc clean, no
dangling imports, zero href="/book" in source.

STILL OPEN (operator): 9 of the 11 review rulings — #5 Guardicore job-title scope, #23
Postmates role HOLD, #33 build-log root cause, #35 photo year, #36/#37 case-study copy, #44
the 2013–2023 range, #8-adjacent /playbook price date. Artifact:
`.planning/reviews/SITE-COPY-REVIEW-2026-09-02.md`.
QUEUED: flip Resend routing to micah@ after ONE live send test (LESSONS #8 — silent failure).
QUEUED: `prettier --check` fails on 30 files, PRE-EXISTING CRLF drift, its own pass.

## Pass-80 (7457086) — PUSHED. The shipped book stops carrying the retired claim.
Operator 2026-09-02: "Fix the book, then republish" + "micah@ everywhere".
THE BOOK WAS ALREADY FIXED AT SOURCE by the other session in the-80-percent-wall
(ordani-claims-gate CLEAN, 39 files; ch10 reads "across the four"). What had NEVER run was
`npm run publish:site`, so THIS repo still carried and SHIPPED the old bytes.
Not theoretical: lib/package-delivery.ts attaches lib/book-pdf.ts to EVERY package
purchase's kickoff email, and /packages says "All three include The 80% Wall". The PDF this
repo was serving had "hundreds of birth workers" x3, "$5B+ in combined value" with "across
the four" x0, and "active paying users" x0. The FREE sampler emailed to every waitlist
signup carried the retired count twice.
Ran publish:site; VERIFIED by decoding both modules back to PDF and extracting text:
  book    517051B sha 9b8b063b -> retired 0, across the four 1, active paying users 3
  sampler 112197B sha 66a3e431 -> retired 0, across the four 1, active paying users 2
LESSON: a claim fix in the book repo reaches NOBODY until publish:site + site deploy. The
book repo being green is not the customer being safe.
INBOX: all 13 PRINTED addresses -> micah@ (home footer, both thanks pages, PageFooter,
theater Footer, llms.txt, two contact error messages).
NOT CHANGED ON PURPOSE — Resend routing: contact.ts `from:`/`to:` and NOTIFICATION_TO in
beta-signup, playbook-signup, package-delivery, playbook-delivery. `from` must match a
Resend-VERIFIED identity or sends fail SILENTLY (LESSONS #8, how contact email died before).
Site now PRINTS micah@ while notifications ROUTE to hello@; both reach the operator so
nothing drops. QUEUED FOR OPERATOR: flip the routing after one live send test.

## Pass-79 (c96028b) — five review findings applied. Committed, NOT pushed, NOT deployed.
Operator 2026-09-02: "Push and deploy" (done for Pass-78, deploy dpl_8Ayud6wBNNF1Xwj6JxmPD3AKPUi7,
both aliases verified, apex 308) and "All of it" for the work. Pass-79 is the work; its push
is NOT covered by that approval and is queued for the operator.
1. THE ENGAGEMENTS DOOR PAID OFF NOTHING. His own button sells "a foreign company breaking
   into the North American market"; /work/guardicore rendered "Israel"/"foreign" ZERO times,
   "Tel Aviv" once (photo caption), "North American" once (a CUSTOMER). The story was already
   in the Outcome (bank, federal agency, Wall Street firm, U.S. utility) and never framed.
   Now framed. Geography LEDGERED in #3 with three sources + the surfaces that move with it.
   Also killed the dek's "honeypot-lead" typo and the "saturated PLATFORM" category error.
2. THE $3M RECEIPT LINKED TO A PAGE WITHOUT IT (home ledger fused two engagements; $3M is on
   /work/rfp-engine). Under "Ask about any of them." Split into two rows. Same fact fixed on
   /services (a "website" claim appearing ZERO times in either study; receipt was also the
   only one with a live study and no link) and /about (credited content engine with the RFP
   engine's close rate).
3. PACKAGES DOOR SAID "SOLO", /work/ordani SAYS "SMALL TEAM" (Pass-63 ruling, KEPT). Button
   now claims what the ledger licenses; ordani role -> "Founder and sole engineer".
4. /book TOLD A PAYING BUYER "Cost: Free". NEW static route /book/kickoff (noindex), shared
   body via a `kickoff` prop; /services/thanks + package email repointed. NOT ?kickoff=1 —
   searchParams forces dynamic rendering, /book would stop emitting .html, and render-gate
   builds its route map from those files, so all six links to /book would fail as "no such
   route". Form contract untouched (operator-verified).
5. NEWEST CASE STUDY'S ONLY FORWARD LINK WAS A 404: getNextCaseStudy walked the unfiltered
   list while getCaseStudyBySlug 404s stubs. Now filters stubs. LESSONS #13 class again.
Verified in BUILT BYTES: 16 routes, gate green, next-work -> /work/guardicore, kickoff title +
"Included with your package" + noindex, Tel Aviv opener, two ledger rows.
NOT DONE, and why: `prettier --check` fails on 30 files REPO-WIDE and it is PRE-EXISTING —
CRLF counts identical before/after my edits (65/65, 139/139) and untouched files fail too.
Mass-reformatting would collide with the other session. Its own pass.
11 REVIEW ITEMS NEED AN OPERATOR RULING, none touched — listed in the review artifact.
TIER NOTE: Pass-79 was ~30 execution calls on Opus. The rulings were already locked by the
review; this belonged on Sonnet after a brief.

## Pass-78 (4761a9f + aad2b53) — TWO LIVE TYPOS FIXED. Committed, NOT pushed.
Operator redirected here from the book ("back to the site instead"), which was lucky: the
book had just moved out and a playbook fix would have edited the frozen copy.
CORRECTION to the Pass-76 heading below: 76/76b WERE pushed and auto-deployed. The last
session froze during verification, not before it. Doors live and correct on both domains,
dpl_G3wo83A9qoAybW16J29KvgJrFuMQ, apex 308 -> www.
FOUND LIVE, both now fixed: `/about` served `<strong>$20M+</strong>in client revenue` (the
page's FIRST receipt) and home served `<em>So I built Ordani.</em>It's in active use`.
LESSONS #6, fourth recurrence, first one to actually ship.
THREE THINGS OUR OWN NOTES HAD WRONG, all recorded in #6 RECURRENCE 4:
- the documented grep was CORRECT and would have caught both (verified against the pre-fix
  commit: 2 hits). It was NEVER RUN. A gate living as prose in a markdown file is not a
  gate. "Candidate for a hook if it recurs" was written at recurrence 1 and was still a
  candidate at recurrence 4.
- prettier COLLAPSES the prescribed `{" "}` join back to a literal space when the line
  fits, so the documented fix silently un-applies itself. Watched it revert.
- the entity can sit ANYWHERE in the text node, not beside the tag. Fixing `It&rsquo;s`
  did nothing; the trigger was `workers&rsquo; pockets` four lines on.
FIX = remove the trigger (literal – and ’ characters), not re-add the space.
GATE = `render-gate.mjs` third check GLUE, blocks `pnpm build`, reads rendered bytes.
Proved it FAILS first per #13: wired before the fix, it named both. `span` excluded (label
spans butt correctly, 7 on /playbook). Probed all 12 live routes: 2 real, 0 false.

## SITE COPY REVIEW — 44 verified findings, NOTHING APPLIED except the two above.
`.planning/reviews/SITE-COPY-REVIEW-2026-09-02.md`. 11 surface readers (fable) on the LIVE
pages + one adversarial verifier each (sonnet, default REFUTED, must re-fetch and confirm
the quote renders). 135 agents. Ranked by what costs a sale; the tail is polish.
**#1 is the operator's own door sentence failing at the click.** The Engagements button
says "helped a foreign company break into the North American market and get acquired";
`/work/guardicore` never tells that story — verified: "Israel"/"foreign" 0, "Tel Aviv" 1
(a photo caption), "North American" 1 (describing a CUSTOMER, "a top-10 North American
bank"). It opens on honeypots. Biggest receipt on the site, $5K+ lane.
#2 the $3M receipt on home links to /work/content-engine, which does not carry it (it is
on /work/rfp-engine) — under "Every line below is real. Ask about any of them."
#3 the Packages button promises "solo"; /work/ordani's only who-built-it line says "small
team". #4 /book still says "free intro call · Cost: Free" to someone who just paid.
#7 /work/content-engine "next work" -> /work/passioneer, a confirmed 404 (stub in the list,
404 on the route). 11 findings need an operator ruling and were NOT touched.
GOTCHA: `grep -oiF` under git-bash gave FALSE ZEROES on this tree (said "Tel Aviv" absent
when it is present). Verify page content with Python, decoding UTF-8 explicitly.
WORKFLOW GOTCHA: verifier agents do not echo the finding id back; pair verdicts
POSITIONALLY. Keying by returned id silently discarded all 70 findings on the first run.

## THE BOOK MOVED OUT — 2026-09-02. This repo is the WEBSITE now.
New home: `https://github.com/micahx745/the-80-percent-wall` (private), checked
out at `Code/the-80-percent-wall`. 39 commits of history went with it via
`git subtree split`. Reason: two sessions on one tree, shared files, one git
index, two budgets on one 5-hour window — and a real cost, see Pass-77 below.

`product/playbook/` is still here and is now a FROZEN COPY; its README carries a
MOVED banner. Do not edit it — the book repo will not see the change and the two
will drift. Deleting it is safe for the build (nothing reads it at build or
runtime) and is the right end state; it was left only because another session
was live at the split. When it goes, drop `product/playbook/src` from
`scripts/ordani-claims-gate.mjs` ROOTS — until then that gate reports the book's
10 findings and is not wired into `pnpm build`.

WHAT THE SITE STILL OWNS, unchanged: the /playbook sales page, the Stripe rail,
and the three GENERATED deliverable modules `lib/book-pdf.ts`,
`lib/companion-zip.ts`, `lib/chapter1-pdf.ts`. Those are what a buyer actually
receives, they are checked in, and the site builds standalone.

A book change reaches a customer ONLY via: build in the book repo →
`npm run publish:site` (writes those three modules here) → `pnpm build` →
operator-approved deploy, both domains re-aliased. Rebuilding the book alone
changes nothing a buyer sees. The old `product/playbook/embed-*.mjs` are
superseded by the book repo's `scripts/publish-to-site.mjs`.


## PLAYBOOK Pass-77 (0ea96d0) — cross-review of the BOOK. VERDICT: BLOCK. NOT FIXED YET.
First independent cold read the manuscript has ever had. Harness `--mode manuscript` added;
target is the shipped PDF (69pp, 95KB extracted, page-marked, no truncation), not the .typ
source, because the buyer receives the PDF. Legs: Gemini PASS, GLM CONCERNS, Codex(deep)
CONCERNS. Same-family Claude leg deliberately SKIPPED (usage window + least independent).
Full artifact: `.planning/reviews/CROSS-REVIEW-PLAYBOOK-MANUSCRIPT-2026-09-02.md`.

TWO HARNESS DEFECTS found and fixed first — round 1 was discarded because of the first:
- manuscript mode reached only the CLI leg; both REST legs read a book under the Next.js
  instruction and Gemini returned a baseless PASS. All legs now go through `_instruction_for`.
- the Codex pin was DEAD (`Unknown model: gpt-5.6-sol`) and so was every fallback beside it.
  The deep leg had been silently absent from rounds since the plugin rotated. Now gpt-5.4,
  smoke-tested through the harness.

THREE BLOCK-CLASS FINDINGS, none fixed — they came from checking the legs against LESSONS #3,
which the legs could not see. Two operator rulings from 2026-09-01 were swept across the site
and NEVER applied to the book, which no sweep walks because it is a different toolchain:
1. Retired user count ("hundreds of birth workers") in 4 source places — ch1:33, ch1:240,
   ch8:61, ch10:165. ch1:240 is `#sampler-only`, so it ships in the FREE chapter. Approved
   phrasing is "active paying users", in beta, public release coming.
2. Ordani's authorization design named in 3 field notes (ch3, ch5, ch7) — ch5's sits directly
   under a working RLS policy. SECURITY-DETAIL GATE bans exactly this. Teaching RLS is fine;
   the defect is Ordani's NAME beside it. Cut the name, keep the teaching.
3. "$5B+ in combined value" hangs off Postmates+Guardicore+Neuton = ~$3.25B. True only across
   all four. THE FIX IS ALREADY WRITTEN: ch1:238 (sampler) says "across the four"; ch10:162
   dropped those three words. Propagate, no decision needed.
CORRECTION to the Pass-57..62 line below: "every surface re-probed clean for user counts" was
true of the SITE only. The book was never in scope and carries three of the four.

NEW GATE `scripts/ordani-claims-gate.mjs` — counts anywhere, mechanism language within 8 lines
of an Ordani mention, across app/ components/ content/ AND product/playbook/src/. Clean on the
site, 10 findings in the book. NOT wired into `pnpm build` on purpose: it fails today, and
wiring it before the fix would block the other session's builds. Wire it in the fix commit.
Its first cut matched per line and MISSED ch7 (the phrase wraps mid-sentence); now matches
flattened text. LESSONS #14.

IMPROVEMENT-CLASS, unanimous: chapter 10 is thin and visibly so — no file card, no definition
block, no artifact, and §10.4 recaps AFTER the pre-flight so the manual ends on an essay. Both
critical legs independently proposed the same fix (a template + file card) and the same
fallback (merge into ch9). Also: "RLS on every table" over-broad; `auth.uid()` is one
platform's helper and the book names no platform (do NOT fix by naming the vendor — the VENDOR
GATE covers this book); "every environment variable... until a rebuild" over-generalises;
3 of 13 build-log entries are month-only against a cover claim of "TRUE AND DATED".
REFUTED with evidence: softening "HIPAA-compliant" (operator confirmed, hedge banned); the
"$149" on p42 (the live page says "$99 at launch · $149 after", so it is consistent — but it
is COUPLED to the open $149 decision: remove that line and p42 orphans).

NEXT: the fix pass is itself a review subject — re-render, re-extract, re-run before ship.
The operator's own end-to-end read is still the last human gate and is still open.


## HARNESS Pass-61: arc-shape gate LIVE — full policy `MODEL_ROUTING.md` §6
Audit: 9 of 320 Fable turns were taste calls, 311 execution. DIRECT (Fable) now ends by
committing a brief (`.claude/briefs/README.md`); EXECUTE runs it verbatim; JUDGE returns 3x.
Global gates, all tested: statusline `5h NN%`; tier-burn-monitor (12 Fable / 30 Opus / 75+90%,
silent on Sonnet); secret-literal-gate DENIES token literals (proven live); agent-model-gate
WARNS (advisory) on unnamed Agent model; concurrent-session-guard (SessionStart). Card §4
corrected: 31 hook events exist. TWO SESSIONS ran this tree tonight, two budgets on one 5h
window; three collisions -> LESSONS #12.

## SITE — Pass-76 + 76b COMMITTED, NOT YET PUSHED OR DEPLOYED (operator interrupted the push).
Six operator items in one pass:
1. /playbook title 60/60 -> 58/60. It had zero headroom; one added character would fail the gate.
2. /services doors "not even": columns were equal-height with the foot bottom-pinned, so bottoms
   aligned and tops did not — "For companies" is one line, "For solo builders and small teams" is
   two, pushing PACKAGES a line below ENGAGEMENTS at up to 92px. Subgrid now shares all four row
   tracks. A kicker min-height would have worked at exactly one viewport width.
3. /work hero showed a hand on a tablecloth — the old crop was framed to exclude every other face.
   New wider frame (guardicore-telaviv-session.jpg): location sticker cropped out, a second IG
   sticker on the cloth patched with adjacent cloth. ON THE RECORD: this one DOES show part of a
   colleague's face in profile. Cost of showing the room; operator asked for the room.
4. /about: cap portrait -> portrait-desk.jpg, plus the Tel Aviv frame beside the Guardicore bullet.
   PortraitImage hardcoded "Oakland - 2026" under whatever file was dropped in; neither is
   verifiable for the shipped photo, so the caption is gone. /about also never stamped an
   OpeningWorld — it opened on the root default colour until the scroll observer fired.
5. /contact NEW. A complete contactAction had sat unmounted since an early phase; nav "Contact"
   pointed at /book, so reaching Micah cost a calendar slot. TWO LIVE DEFECTS in that action:
   no email field, and replyTo: undefined — every note would have arrived unanswerable.
6. Booking moved behind the purchase: /services/thanks offers the kickoff call directly.

76b: the door proof lines ("Guardicore: $80M in pipeline...") were inert stats above the CTA.
Now buttons into /work/guardicore and /work/ordani. Forced the card from a single wrapping <a>
to a div with three explicit links — a link inside a link is invalid HTML.

OPERATOR DECISION STILL OPEN: home, /services and /playbook still show "Book a free intro call"
-> /book. If booking is post-purchase only, those become notes and the engagements copy
("begin with a free call") changes with them. NOT touched — that changes how the $5K+ lane sells.

LESSONS #6 RECURRED (third time): the new /about figcaption rendered "TEL AVIV -2018-2021" with no
space, because Next 16 RSC drops the space after an inline element when the following text holds
an entity (&ndash;). Caught in preview, fixed with explicit {" "}. STILL NO MECHANICAL GATE — the
render-gate reads prerendered HTML and is the natural place for one.

## SITE — Pass-68/69/70 LIVE (deploy 9bzvmcf6v). Review groups A/D/E done, B/C part-done.
Pass-68: home ticker removed (markup, const, CSS, and the [data-scroll-track] effect that drove
it). Also a real bug the review never named: the h1's two lines are separate block spans, so
they read as "I build thego-to-market" to every crawler. One trailing space.
Pass-69: the rotating h1 KEPT (operator asked for it by name in Pass-9) and fixed properly.
The stack held all four words plus a duplicate, so the h1 text was 112 chars of repetition.
Now ONE word is server-rendered; each step appends the next below the 1em window, translates
1em with the same 600ms easing, then drops the consumed word and resets with no transition.
The roll's width eases alongside, or the inline-block snaps at cleanup. The sr-only line now
CONTINUES the visible word instead of preceding it, so the heading reads as prose:
"I build the go-to-market. Also product, data platforms, and RFP engines." (72 chars).
Verified live: 1 child at rest, 2 only inside a step, lands back on the first word.
The review's screen-reader claim was FALSE — the stack was always aria-hidden.
Pass-70: /packages split out with its own opening, cards, rules, OfferCatalog + Breadcrumb LD
and a cross-link back; /services door points at the page, sitemap gains it, Stripe cancel_url
repointed (it would have dropped a cancelled buyer on a page with no packages). /services
gained two objection blocks: "On the price" and "Why one person".

OPERATOR HELD, do not re-litigate: rotating h1 stays · "See the work" stays the primary hero
CTA (D7 receipts-first) · hero keeps the four-exits framing · Ordani narrative and the
operating-principles block stay as they are (Pass-64 approved; principles were ADDED on a
prior audit).
NOT INVENTED: the review wanted a published "5K to 25K" engagement range. That ceiling is not
in the ledger. /services now says WHEN the number arrives, not what it is. A real range is
stronger and is the operator's to set.
Pass-74 (59ed751, deploy db7nj5mbs): the playbook's "Fixed-price packages" link followed the
packages to /packages. It had pointed at /services#packages since Pass-70, landing a reader
who clicked it on a page with no packages. It RESOLVED, so no 404, no build error and no
link check ever saw it -- only the destination was wrong. Swept app/ components/ lib/
content/: it was the only one. I took the file because the other session had closed and the
tree was clean, so the one-writer rule had nothing left to protect.
Pass-75 (f2448c8, deploy az5v41t01): scripts/render-gate.mjs, last step of pnpm build.
Reads the PRERENDERED HTML in .next/server/app -- the bytes a reader gets -- so it needs no
guess about route resolution and nothing a component injects can hide. Checks every internal
href names a real route, every fragment (same-page and cross-page) names an id that actually
renders, and title <=60 / description <=160 entity-decoded. 301 sources are parsed out of
next.config.ts so it cannot drift from the redirect table. Metadata checks SKIP noindex
pages: both thanks pages and the passioneer stub inherit the 242-char site fallback and are
noindex -- three permanent false positives is how a gate gets switched off.
PROVED IT FAILS before trusting it: reintroduced the Pass-70 bug into the built HTML and it
named it, plus a link to a nonexistent route. A gate that has never failed is untested.
Also fixed: /playbook rendered a 61-char title and 204-char description. The root layout
appends " -- Micah Jones" (14 chars), so the SOURCE string is always 14 shorter than what
ships -- measure the rendered <title>, never the literal. Em-dash to colon bought the char
and dropped the title to one em-dash (LESSONS #11 cap). Live title 60/60, desc 153/160,
verified on BOTH aliases. LESSONS #13 written.

STILL OPEN from the review: nine vibe-coding articles + a hub, and the funnel (email
sequences, second lead magnet, launch sequence). Both need operator input: an email platform
and a launch date.
GOTCHA EARNED: a long `git commit -m` containing literal double quotes closed the shell string
early and git took the rest as a pathspec — the commit silently did not happen and only the
prior pass deployed. Long messages go through `git commit -F <file>`.

## SITE (non-playbook lane) — Pass-57..67 ALL LIVE (deploy djhfh3a43, verified on www)
Pass-67 executed the external deep review, minus what the operator kept and what verification
killed. LIVE + probed: /about's retired "$150K" -> $1.2M (the case study was swept the same
morning, this page was missed); /about's "HR consultant... 4x" -> the case study's own 8,000
to 290,000 (sector leak AND a metric that contradicted 36x); /work h1 is now a sentence, not
the bare string "$80M"; /services/ai-engineering RETIRED 301 -> /services with its
production-grade definition folded into service 03; /book gained "what you leave with";
titles + descriptions rewritten on the five owned pages (every description had been 177-260
against a ~155 limit, now 146-150); llms.txt advertised FOUR services that do not exist,
rewritten to the real three plus both buying paths.
GAP FOUND while consolidating: /services had linked to /playbook ZERO times since Pass-56
removed the header. Bridge restored.
OPERATOR KEPT (do not "fix"): "four exits" framing, and "joined early".
REVIEW FINDINGS VERIFIED FALSE — do not re-apply: content-engine IS in the sitemap; the
"under $150" playbook price is correct ($149 < $150); the home image alt="" is a decorative
hero photo, which is right; and the em-dash cap is NOT broken — every page has exactly ONE
(the nav's "Menu —"). That last one I reported as broken first: my measurement decoded curl
output as latin-1, so ↗ and × became U+2014. Decode UTF-8 explicitly when counting glyphs.
STILL OPEN from the review, none started: home restructure (rotating H1, marquee, dual-door
routing above the fold), a split-out /packages page, nine vibe-coding-to-production articles,
and the funnel (email sequences, second lead magnet, launch sequence). Operator decisions
needed for the funnel: an email platform and a launch date.
MEDICAID CLAIM: still live on the home page, deliberately untouched. Operator-supplied
2026-08-30 per the code comment but never ledgered, and "processing Medicaid claims" carries
billing-agent weight. Operator owes one sentence on the real mechanism, then ledger it.

## /playbook — Pass-61/65..69 (last: ce4949b). Builds green. 65 IS LIVE; 66-69 ARE NOT.
Brief: `.claude/briefs/pass-61-playbook-cro.md`. Email capture 76/100; **$99 purchase 68/100
LOW, NOT ready to flip** — purchase layout HELD in brief §8 behind 3 gates: prod
RESEND_API_KEY probe, Stripe account split, one live-mode buy+refund with a real card.
Operator said **Stripe is last**.
- **65 (live):** H1 "The AI handed you the code. Now ship the company." Cover re-rendered from
  Typst: edition stamp + spec box + spine wording GONE, all centred, title leading -48pt,
  author name added at the foot (operator has not ruled on that addition).
- **66:** byline under the sub (four exits / $5B+ / $20M+ / Guardicore-Akamai). Prompt diff
  from ch.2 warstory, both sentences quoted verbatim ("make it better." vs the locked
  sentence); the redesign it describes produced THIS site, and the page says so.
- **67:** `<WallChart />` — book's page-6 figure drawn once on load in the hero. Motion-engineer
  APPROVED in writing as a FIGURE animation, not a third signature; logged as `motion.figure`
  in brand.json + `.claude/CLAUDE.md`. Saffron not terracotta (terracotta on espresso = 2.39:1).
  Motion only ≥900px + no reduced-motion. Replaced the AI "factory loop", declined under R12.
- **68:** hero pill (`.cw-lp-object__cta`) replaces the text link — saffron on espresso 6.13:1,
  65px. WAITLIST: it says "Get chapter one free"; at Stripe go-live it becomes "Buy the manual ·
  $99" and the email path demotes (brief §8). It first rendered espresso-on-espresso (1.00,
  invisible) because the saffron `--cw-accent` override is scoped to `.cw-playbook` and this page
  is `.cw-lp`; fill+label now set explicitly.
- **69:** hero paragraph rewritten — history moved INTO the sub (he does not read the byline as
  "the paragraph"). 75 -> 56 words. Companies named with joining stage and NO job title anywhere,
  which is what makes "remove the sales part" honest. Byline shrank to name + `/work` link
  (underline saffron; `--cw-accent` is terracotta here = 2.39:1). Cut: $20M+ (still in footer +
  /about), page/file counts (spec card has them). LEDGER updated with both operator instructions.
- **70:** RULED — flat "early" for all four (he: "just say early for all those companies
  mentioned"), after the flag that Guardicore ships 2018-2021 against a 2015 founding. Ledger
  separates the fact from the public rendering. Sub+byline now 53 words. HANDOFF's "generate
  the animation assets" item struck: the factory loop is declined and closed, not queued.
- **SHIPPED TO PRODUCTION 2026-09-02 — deploy k05cwwk29** (operator verbatim: "keep the name on
  the cover, deploy 66 through 70"). Author name STAYS at the cover foot, his ruling. Pass-66..70
  are LIVE. CARD 1 run in full: pushed c07c77d, both domains re-aliased to the newest
  (push-triggered) deployment, **data-dpl-id MATCHES across both** (dpl_4qCoHbyQL2DJ6Tkm...),
  apex 308 -> www. Markers verified live on BOTH domains: new paragraph, "early" (no "very
  early"), /work link, wall chart, CTA pill, prompt diff, "Coming soon". New cover is
  byte-identical on prod and disk (sha 5a1127ec, 263121 bytes).
- **CLOSED:** "early-stage startup" is no longer owed — he gave per-company stage 2026-09-02 and
  it is ledgered. Guardicore no longer renders any job title, so the *sales* wording is retired
  from this page; the ledger records why it was there and what replaced it.
- Gotcha: the browser pane throttles animation clocks to 0 and caches images; seek via the Web
  Animations API and re-fetch to verify, never trust the pane.

## SHIPPED TO PRODUCTION 2026-09-01 (deploy 1uhmpp7nf, operator "push it")
Everything through Pass-62 is LIVE on both domains, verified: www 200, apex 308->www.
Pass-57..62 all shipped in one deploy. **The retired "hundreds of birth workers" claim is GONE
from production** — every surface re-probed clean for user counts, HIPAA-grade, the biomedical
descriptor, the equity sector wording, and Ordani security mechanisms. Redirects live:
/hire-me -> /services, /work/hr-equity-author -> /work/rfp-engine. Four case studies 200.
Ledger moves that must not be reverted: Guardicore $1.2M average deal size SUPERSEDES the
$150K delta, and the Trillions line is RESTORED on operator confirmation; Ordani is "active
paying users", in beta, public release coming.

## Pass-64 SHIPPED — Ordani section is a picture edit on petrol (deploy besnxw59v)
Operator: "feels bare". Section now runs PETROL (already Ordani's world in the WorldSwitcher
map, and the only mapped world the site never used) and carries four photos: lead frame is a
doula taking notes beside a pregnant client (the paper intake the product replaces), then a
three-up band. PHOTO PROVENANCE: operator's own licensed birth-work shoot, lemandjune frames
ONLY. The 342 Pexels + Getty + AdobeStock _Preview files in that collection stay unused
(constitution bans stock; a Preview is not a licensed asset). Captions describe birth work in
general and never imply these people are Ordani customers. Verified live: petrol resolves,
all four images 200, no overflow at 390.
Note: WorldSwitcher uses IntersectionObserver, so a programmatic scrollIntoView does NOT
trigger the world change; nudge the scroll or you will read a stale background.

## Pass-63 SHIPPED — all three openings live (deploy nouvaltkt)
Brief `.claude/briefs/pass-61-page-openings.md` executed in full.
/work = catalogue lot ($80M at hero scale, Tel Aviv crop as exhibit, provenance line, order
hand-set so Guardicore leads). /services = the two doors ARE the page: full-height columns
split by one rule, each ending on a receipt; header deleted, h1 now sr-only; dead
.cw-sv-door CSS removed. /book = espresso, offer + terms left, form in a bordered card right,
slot label "Slots I hold open". OpeningWorld puts the opening colour in <head>, so no page
paints terracotta first. Verified live at 1440 + 390: no overflow, 52px tap target, all five
booking fields intact.
NOT BUILT ON PURPOSE: the brief's /book timetable grid rewrites the operator-verified booking
path and needs calendar sync first. Its own unit.
Ordani (Pass-62/63): no security mechanisms anywhere, and no "hired reviewers" — it says a
small team exists and nothing about what it does. /about's "Built and shipped by one person"
contradicted that and now reads "I founded it and I write the code".

## OPEN OPERATOR QUESTIONS
CLOSED 2026-09-01: deploy (done), photo rights (owned; only lemandjune used, stock stays
unused), Jerusalem photo (rejected), Tel Aviv sticker (cropped out, with a colleague's face),
Ordani encryption-vs-RLS (mechanism detail removed entirely, Pass-62).
CLOSED by operator 2026-09-01 PM, shipped in Pass-63 (922b746, NOT yet deployed): ship month
= "Coming soon"; portrait = public/hero-context.jpg (him at a laptop) in the § 0.1 rail.
OPEN: 3. Real early-reader quotes, attributed only. 4. "$149 after" needs a real raise date
(operator says Stripe is LAST, so this can wait). 5. Price lock?
6. SECRET ROTATION overdue (Resend, ICS, Stripe test). 7. Stripe go-live. 8. tsx em-dash debt:
6 files / 13 over cap. 9. Wire `page-cro` into /premium audit. 10. Settings prune: ~21 of 460
redundant, ZERO credentials. 11. Ordani section on home still feels bare; birth-worker photos
now cleared for use (lemandjune set only).

## Gotchas
- Windows heredocs mangle backslashes: write regex-bearing TS/JS with Edit, not python.
- Python writes CRLF -> prettier --write before commit. Screenshots return black below the
  fold on this machine; verify layout by computed geometry instead.
- Secrets never inline (gate enforces). Ordani never names vendors. HIPAA-compliant, not -grade.
