# The 80% Wall — book contents, chapter by chapter

This document maps what is actually inside the 68-page PDF ("The 80% Wall — A
field manual for solo builders," by Micah Jones) and the 26-file companion
package sold alongside it. It is compiled directly from the Typst source files
that generate the PDF (`src/chapter-01.typ` through `chapter-10.typ`,
`src/template.typ`, `src/book.typ`), the 26 files in `companion/`, and the
project's own internal handoff notes (`HANDOFF.md`). Nothing here is
paraphrased marketing copy — it is the source of the product itself.

A note on the book's assembly: the source has two "editions." A **sampler**
edition (used when a chapter is compiled standalone) adds a one-page
next-chapter teaser at the end of chapters 2-9, and appends a two-page sales
pitch ("Path one: the manual / Path two: hire the author") to the end of
chapter 1. The assembled **book** edition suppresses all of these — chapter 2
flows straight into chapter 3, etc., with no upsell anywhere inside it. The
page counts below are for the **book edition** (what a $99 buyer actually
receives), extracted directly from the compiled PDF
(`output/the-80-percent-wall.pdf`, 68 pages total: 1 cover + 1 table of
contents + 10 chapters, each chapter including its own full-bleed
opening/cover page).

---

## Front matter

**Cover page** (dark "espresso" background, centered): kicker "A field manual
for solo builders," then the title stacked in three lines — "The" / "80%" (in
terracotta/orange) / "Wall." — followed by the line: *"Why AI-assisted builds
stall between demo and production, and what it takes for one person to ship a
real company."* Signed "Micah Jones" at the bottom. No price, no edition date,
no other cover copy (the operator explicitly stripped a spine/date/spec-block
version of this cover down to just this).

**Table of contents page**: all ten chapter numbers and titles with page
numbers (auto-generated from the PDF's own internal anchors, so it cannot
drift from the real pagination), and a closing line in small mono type:
*"EVERY BUILD-LOG ENTRY IN THIS MANUAL IS TRUE AND DATED."*

---

## Chapter 1 — Why your build broke at 80%

**Dek (verbatim):** "What happens in the context window when the AI starts
undoing your features. The structural reason, not the vibes."

**Length in book:** 9 pages (the longest chapter; it also doubles as the free
sample PDF given away for an email address).

**What it teaches:** AI coding tools operate inside a fixed "context window"
— a transcript with a hard length limit — and once a project outgrows that
window, the tool stops seeing the whole codebase and starts sampling it. A
working feature is code *plus* the unwritten reasoning behind it (an
"invariant"), and that reasoning lives only in a conversation that gets
dropped once the window fills or the session ends. The chapter argues the
80%-mark stall is not a talent problem but an arithmetic one: unwritten rules
accumulate faster than the window can hold them, so at some point the AI
starts "fixing" one thing by breaking another it can no longer see. It closes
by naming what does NOT fix this (a smarter model, a bigger window, politely
asking the AI to remember, pasting everything) and prescribes the first move:
put anything that must survive a session into a file in the repo, starting
with an "invariants" file.

**Named artifacts:**
- Diagram: `window-diagram()` — a strip of six labeled cells, two shown as
  "dead"/fading ("Tue's fix", "Why it's odd") to represent context falling out
  of the transcript window, versus what the model can still see ("File
  reads," "Your ask," "New diff," "Errors").
- Diagram: `wall-chart()` — the book's signature three-line chart: "What fits
  in the window" (a roughly flat dashed line) crossing "Unwritten rules" (a
  rising line), with the crossing point marked "The wall" and the x-axis
  labeled "Build progress ... 80%."
- Filecard: **`CLAUDE.md — invariants`** — a three-line example invariants
  file (uploads must stream not buffer; dates format server-side; never
  hand-edit `/generated` files).
- Pre-flight card: **"Pre-flight · Five habits"** — write the invariant list;
  point every session at it first; read every diff before accepting; one
  change per commit; write down any rule the AI breaks, the same day.
- War story: **"Entry · 2026-08-11 — The same bug, twice"** — a formatting
  defect (bold text eating the following space) gets fixed and documented
  once, then reintroduced weeks later by a session that never read the
  documentation; fixed permanently only once turned into a grep-based
  pre-release check.
- War story: **"Entry · 2026-08-31 — The demo that lied for weeks"** — three
  lead forms on the author's own site silently failed in production for weeks
  because one environment variable (the email API key) was never installed on
  the live host; every visitor saw "Got it" while nothing was delivered.

---

## Chapter 2 — The spec is the moat

**Dek (verbatim):** "The one page the AI keeps re-reading. Why drift, not
bugs, is what kills your build. Template included."

**Length in book:** 7 pages.

**What it teaches:** The real killer of solo AI-assisted builds isn't visible
defects (which are loud and get found) — it's "drift," the slow gap between
the product you intended and the product each session's best guess actually
built. Because every session re-derives your intent from whatever files it
happens to sample, and fills gaps with the statistically average app, forty
sessions produce forty slightly-off guesses that compound into a very
different product. The fix is a single one-page spec (six short sections —
WHAT, NOT, SHAPE, RULES, NOW, LATER) read at the start of every session,
where the NOT section (an explicit anti-scope) is doing most of the work: it
turns "should I also add..." into a lookup instead of a late-night judgment
call.

**Named artifacts:**
- Diagram: `drift-chart()` — two diverging lines from a shared start point:
  "The app you intend" (steady petrol-blue rise) versus "The app the sessions
  build" (terracotta line that rises then plateaus), with the growing
  distance between them marked "The gap."
- Filecard: **`SPEC.md`** — a full worked example for a fictional "booking
  and payments for independent personal trainers" product, all six sections
  filled in.
- Pre-flight card: **"Pre-flight · The spec ritual"** — write SPEC.md
  tonight; open every session with it; frame asks against NOW; treat every
  "should I also" as a NOT lookup; change the spec only in its own commit.
- War story: **"Entry · 2026-05-19 — Six weeks toward a reference nobody
  locked"** — six weeks spent polishing Ordani's interface toward a quality
  bar that existed only as a feeling, never agreed on paper; fixed by writing
  down, in one evening, what "good" meant.
- War story: **"Entry · 2026-08 — Four redesigns in one week"** — four full
  redesign rounds of the author's own consulting site, all rejected, produced
  by the instruction "make it better"; round five shipped in two passes once
  a locked one-line WHAT and three-item NOT existed.

---

## Chapter 3 — The architecture you didn't draw

**Dek (verbatim):** "The single diagram every solo build needs. Auth, data,
storage, third parties, and where AI tools quietly cut corners."

**Length in book:** 6 pages.

**What it teaches:** Because AI tools build bottom-up (file by file), almost
no solo builder can draw their own app's architecture — and that gap stays
invisible until a security question, a data-export request, or a
cross-service defect forces it. The chapter gives a universal five-box map
(Client, Server, Data, Storage, Third parties) and walks through the specific
corner an AI tool tends to cut in each box: trusting client-side validation,
assuming a server has the laptop's implicit state, forgetting the
row-ownership filter on a database query, making a storage bucket public by
default, and pasting API keys into files instead of environment variables. It
ends by having the reader literally prompt their own AI tool to draw the map
back to them, for verification against the code, not as a fact to trust
outright.

**Named artifacts:**
- Diagram: `arch-diagram()` — the five-box architecture map itself: Client →
  (session token) → Server → (owner filter / signed access / secrets) → Data,
  Storage, Third parties, with a labeled arrow back from Third parties into
  the Server for "verified webhooks."
- Pre-flight card: **"Pre-flight · One lock per arrow"** — the client
  enforces nothing alone; every query filters by owner (ideally via
  row-level security); storage is private by default; secrets live in
  environment variables; money truth comes from verified webhooks.
- War story: **"Entry · 2026-08 — The token that was everywhere"** — an
  anonymized client-project audit found one live API token pasted twelve
  times into tool-configuration files by AI sessions being "helpful"; fixed
  by rotating the key and adding a credential-shape grep to every commit.
- No filecard in this chapter (the closest artifact is a `#callout` block
  giving the exact prompt to hand the AI: *"Read this codebase and produce
  the five-box architecture map..."*).

---

## Chapter 4 — Deploy day

**Dek (verbatim):** "Environment variables, databases, domains, SSL, secrets.
The pre-flight list, in the order things bite you."

**Length in book:** 6 pages.

**What it teaches:** This chapter is explicitly framed as the "autopsy" of
chapter 1's dead-forms story: your laptop is full of invisible help
(logged-in CLIs, a hand-seeded database, localhost URLs, six months of
accumulated local state) that production starts with none of. It walks the
five things that bite, in the actual order they bite: environment variables
(and the trap of env changes not taking effect until the next deploy), the
database (migrations vs. hand-edits, and confirming row-level security is
actually turned on for the hosted instance), domains/SSL/redirect direction,
public callback URLs for third-party integrations, and client-bundle values
baked in at build time. It closes on the idea that "it works" is only ever a
claim about the exact path you tested — testing on localhost proves nothing
about the live site.

**Named artifacts:**
- Diagram: `machines-diagram()` — a two-column comparison box: "Your laptop"
  (`.env` file with every key, logged-in CLIs, a hand-seeded database,
  localhost URLs, files from six months of work) versus "Production" (your
  code ... and nothing else — every value you didn't explicitly provide is
  missing).
- Filecard: **`.env.example`** — a real example ledger of every environment
  variable the code reads, with no values (RESEND_API_KEY, DATABASE_URL,
  STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET).
- Pre-flight card: **"Pre-flight · Deploy day"** — list every variable and
  confirm it exists on the host per environment; env change → redeploy →
  test, in that order; migrate the hosted database and confirm safety rules
  are on; open all three doors (apex/www/platform URL) and check for one
  redirect hop; fire every integration once for real on the live site.
- War story: **"Entry · 2026-08-31 — Installed is not live"** — adding the
  missing email key to the host didn't fix the dead forms until the next
  redeploy, because env variables are read at build time, not when saved in
  a dashboard.
- War story: **"Entry · 2026-08-31 — The redirect loop I shipped this
  afternoon"** — attaching the `www` domain to the project (to fix a manually
  pinned deployment) created a fifty-hop redirect loop with the apex domain,
  taking the site down for two minutes on a Sunday, while the author was
  literally writing this chapter.

---

## Chapter 5 — The security pre-flight

**Dek (verbatim):** "Row-level security done right, the auth pattern that
survives, and the hardcoded keys you left in. Two checks catch most of it."

**Length in book:** 6 pages.

**What it teaches:** Reframes solo-builder security as defense against
automated scanning, not targeted attackers — which reduces most of it to two
honest questions: can the wrong user read someone else's rows, and is
anything secret reachable from public? It distinguishes authentication
(which AI tools wire well, because it comes from a library) from
authorization (which they skip, because it comes from your product's
unwritten rules), and names the resulting defect class plainly: any
logged-in user reading another user's data by changing an ID in the URL (an
IDOR — "the everyone is admin bug"). It then gives a concrete Postgres
row-level-security recipe (turn RLS on, add one ownership policy) as the
structural fix, distinguishes the public "anonymous" key from the private
"service" key, and prescribes a "two-account test" (create data as user A,
try to read it as user B) as the five-minute verification.

**Named artifacts:**
- Filecard: **`migration: lock clients to their trainer`** — an actual SQL
  migration turning on row-level security on a `clients` table and creating
  a policy restricting rows to `trainer_id = auth.uid()`.
- Pre-flight card: **"Pre-flight · Security"** — run the two-account test;
  row-level security on for every table; view-source the deployed site for
  key-shaped strings; grep the repo and its git history for credential
  shapes; hit admin routes logged out.
- War story: **"Entry · 2026-08-31 — The secret I leaked to be helpful"** —
  the author pasted two live credentials (an email API key and a private
  calendar URL) directly into an AI chat session to get a feature wired
  quickly; both credentials are treated as compromised the moment they touch
  a surface outside his control, with rotation logged as a same-day,
  same-week deadline (explicitly not claimed as already done).
- No diagram in this chapter (it leans on a `#callout` two-question frame
  and the filecard/migration instead).

---

## Chapter 6 — Stripe in production

**Dek (verbatim):** "Webhook reliability, refunds, subscription edge cases,
and the test-to-live failures nobody warns you about."

**Length in book:** 6 pages.

**What it teaches:** Frames the whole payments chapter around three rules:
your app never touches money, it only believes Stripe's signed webhooks, and
its own "paid" flag is a mirror of Stripe's truth, never the source of it.
The chapter's central villain is the checkout success page — a page load
proves navigation, not payment, and granting access there is called "the
single most common money bug in AI-built apps." It gives four webhook rules
(verify the signature every time; dedupe by event ID because Stripe retries;
trust the event's queried state, not arrival order; acknowledge fast and do
slow work after), then walks five things that silently do NOT carry over
when flipping from Stripe test mode to live mode (keys, webhook endpoint,
webhook signing secret, price IDs, and the redeploy needed to apply all of
it), and closes on refunds/disputes/subscription edge cases.

**Named artifacts:**
- Diagram: `money-diagram()` — Browser → Stripe (hosted checkout) → (signed
  webhook, labeled "= the truth") → Your server → Database ("paid = true"),
  with a separate dashed line from Browser directly to a crossed-out
  "/success" loaded, labeled "is not proof of payment."
- Pre-flight card: **"Pre-flight · Stripe"** — hosted checkout only; access
  granted only by the verified webhook, never the success page; make the
  five live-mode swaps deliberately; wire the refund echo
  (`charge.refunded`); pay yourself once, live, and watch the whole pipe,
  then refund it.
- War story: **"Entry · 2026-08— The buy button I refused to ship"** — the
  author's own sales page for this book went live for weeks as an
  email-capture waitlist rather than shipping an unverified buy button,
  because "money UI ships last, after the money path is verified end to
  end."
- No filecard in this chapter.

---

## Chapter 7 — Compliance, when it matters

**Dek (verbatim):** "HIPAA, SOC 2, GDPR. When you genuinely need them, when
you don't, and what compliant actually requires."

**Length in book:** 6 pages.

**What it teaches:** Opens with an explicit "this is a field guide from a
builder, not legal advice" disclaimer, then argues solo builders get
compliance wrong in two opposite directions — ignoring it entirely, or
freezing because the acronyms feel unreachable without a legal team. It
gives each of the three big acronyms a one-question test (HIPAA: do you
handle identifiable health data on behalf of providers/plans; GDPR: can EU
residents sign up; SOC 2: is a real deal actually blocked by a
questionnaire), and argues that underneath all three is the same skeleton
already built in chapters 3 and 5 (the architecture map plus the
row-level-security locks) with paperwork attached — chiefly, vendor
agreements (a BAA for HIPAA, a DPA for GDPR) for every vendor touching the
relevant data.

**Named artifacts:**
- Diagram: `compliance-diagram()` — three question/verdict rows: "Do you
  store or move identifiable health data on behalf of providers or plans?"
  → HIPAA · now; "Can EU or UK residents sign up for your public app?" →
  GDPR basics · now; "Is an enterprise buyer's questionnaire blocking a real
  deal?" → SOC 2 · when asked.
- Pre-flight card: **"Pre-flight · Compliance"** — answer the three
  questions in writing; run the vendor sweep (DPA/BAA checkmarks); write an
  honest privacy policy; make deletion a provable query; hold the line on
  SOC 2 until a real contract demands it.
- War story: **"Entry · 2026-08-30 — The stack I stopped naming"** — a
  review of the author's own public case study about his health app
  (Ordani) caught that it named the exact infrastructure vendors by brand;
  every vendor name was removed the same day, on the reasoning that naming
  your stack publicly is a map for an attacker, not a credibility signal.
- No filecard in this chapter.

---

## Chapter 8 — The first ten users

**Dek (verbatim):** "Getting to the first ten people who keep using it.
Where they come from, and why posting stopped working."

**Length in book:** 7 pages.

**What it teaches:** Argues that launch-post distribution is now a lottery
(because AI-built demos flood the same feeds and all look equally
competent), and reframes the goal from "audience" to ten specific people who
return without being reminded ("a user, versus a tourist"). It maps where
those ten actually come from as three trust rings — people who already know
you, people they vouch you to, and strangers who verifiably have the
problem — and gives a four-part anatomy for outreach that gets a reply: real
personal context, proof you actually read/heard them, one concrete
work-shaped offer (not "feedback"), and a one-step ask. It closes by
treating tracking these people the same way chapter 1 treated invariants:
memory goes in a file, not your head.

**Named artifacts:**
- Diagram: `rings-diagram()` — three concentric trust circles centered on
  "You," labeled outward: "People who know you" (trust: inherited, start
  here), "People they vouch you to" (one ask away — your ten live here),
  and "Strangers with the problem" (reachable one at a time, never in
  bulk), with the caption: "broadcast reaches none of these rings.
  conversations reach all three."
- Filecard: **`USERS.md`** — a worked example founder-CRM entry for a
  fictional user "Dana R.," tracking ring, problem, last contact, next
  step, and whether she returned unprompted.
- Pre-flight card: **"Pre-flight · First users"** — write the ten-name
  list tonight; one conversation a day; make one unscalable offer; keep
  USERS.md current; count returns, not signups.
- War story: **"Entry · 2026-08-31 — One email, not a launch"** — an
  anonymized real outreach email the author sent this week for his own
  consulting practice, using the chapter's four-part anatomy (quoting the
  recipient's own website back to her, offering free comparative work,
  asking for one reply).

---

## Chapter 9 — The distribution loop

**Dek (verbatim):** "Turning the first ten into the next hundred. Reply,
don't broadcast. The metric that matters before MRR."

**Length in book:** 6 pages.

**What it teaches:** Argues against the instinct to "scale" via broadcast
(content calendars, newsletters, ads) once you have ten real users, and
instead defines a "distribution loop": a repeatable path from a happy
moment in the product to a new person hearing about it, that costs less
effort each time it runs. It introduces "second-hand users" (users who came
from users, with no push from you) as the one number that matters before
revenue, and gives two concrete mechanisms to move it off zero: firing a
specific referral ask at the exact moment of a value event, and shipping a
"traveling artifact" — something the product produces in normal use that
non-users see (a booking page, an invoice, an export) with a quiet credit
line. It explicitly tells the reader what NOT to build yet: paid ads, SEO
at scale, a growth newsletter.

**Named artifacts:**
- Diagram: `loop-diagram()` — a four-node cycle: "They use it" (returns,
  unprompted) → "Value moment" (a win, a thanks) → "Ask, or artifact" (who
  else? / output travels) → "New person" (arrives vouched) → back to "They
  use it," with a note that joining shortens "each lap needs less of you."
- Filecard: **`LOOP.md — weekly, five lines`** — a worked example weekly
  log (returning users, conversations/asks/intros counts, second-hand
  users, an "artifact check" line).
- Pre-flight card: **"Pre-flight · Distribution"** — count second-hand
  users today; fire the ask at every value moment; ship one traveling
  artifact; reply to everything within a day; keep LOOP.md weekly.
- War story: **"Entry · 2026-08-31 — The book that carries its own
  loop"** — self-referential: this book's own free first chapter, its
  "share it, don't sell it" line, the footer URL on every page, and the
  reply-ask in its delivery email are all presented as the exact loop
  mechanics the chapter just described, applied to itself.

---

## Chapter 10 — When to hand it off

**Dek (verbatim):** "The signals you've outgrown solo. When to hire, when to
rent senior help, when to sell, and when to keep going."

**Length in book:** 7 pages (includes the book's closing back matter — see
below).

**What it teaches:** The closing chapter reframes "handing off" as the same
skill taught in every prior chapter, applied to the builder's own limits
instead of the tool's: taking something that lives only in one person and
handing it to a system that doesn't forget or sleep. It gives five
checkable signals (queue, ceiling, skill, dread, bus-factor) and four
resulting paths (keep going / hire / rent senior help temporarily / sell),
with an explicit disclosed bias (the author's own trade is
fractional/rented senior help). It argues that everything the book had the
reader write down — the spec, the invariants file, the architecture map,
the vendor sweep, USERS.md, LOOP.md — is, incidentally, exactly what an
acquirer's due-diligence process would ask for, whether or not the reader
ever intends to sell.

**Named artifacts:**
- No named diagram function, but a "four roads" decision strip built from
  the same `decide-row()` component as chapter 7's compliance diagram:
  "signals absent, margins strong" → Keep going; "overflow repeatable and
  full-time shaped" → Hire; "gap is senior judgment for a season" → Rent
  it; "appetite gone, or someone values it more" → Sell.
- Pre-flight card: **"Pre-flight · The hand-off"** (labeled "The last
  pre-flight") — score the five signals quarterly; choose on purpose;
  write the job as rules-with-reasons before any hire; rent senior
  judgment by the milestone; keep the repo sale-ready.
- War story: **"Entry · 2026-08-31 — Written the week I chose road
  one"** — the author discloses he is writing this closing chapter in
  the same week he is scoring his own five signals and choosing "keep
  going," on the book's own terms, and commits to following the
  chapter's advice himself when the signals flip.
- No filecard in this chapter.
- **Back matter** (unlabeled, immediately follows the chapter's own
  pre-flight, on the book's final pages): a closing "Build past the
  wall." page thanking the reader, stating the companion files "arrived
  alongside this PDF with your purchase," and pointing to the free
  chapter-one URL; a "Who wrote this" author bio block (SurveyMonkey
  enterprise sales, Postmates/Guardicore/Neuton.AI exits, $20M+ client
  revenue, Ordani); and a dark callout box, "If your build needs a
  second pair of hands," pitching the author's consulting engagements
  with a link and a copyright line.

---

## The 26 companion files

All files live under `companion/` and ship to the buyer as a ZIP alongside
the PDF. Grouped as the folder itself groups them:

### `companion/README.md` (1 file)
A short index explaining the three subfolders and telling the reader to
start with `templates/SPEC-template.md` and `checklists/01`.

### `companion/checklists/` — 10 files
One markdown checklist per chapter, each a literal checkbox version of that
chapter's pre-flight card:
- `01-context-habits.md` — the five habits (ch. 1)
- `02-spec-ritual.md` — the spec ritual (ch. 2)
- `03-architecture-locks.md` — one lock per arrow (ch. 3)
- `04-deploy-day.md` — deploy day (ch. 4)
- `05-security.md` — the security pre-flight (ch. 5)
- `06-stripe.md` — money / Stripe (ch. 6)
- `07-compliance.md` — the paperwork pass (ch. 7)
- `08-first-ten.md` — the first ten users (ch. 8)
- `09-distribution.md` — the loop (ch. 9)
- `10-handoff.md` — the hand-off (ch. 10)

### `companion/prompts/` — 6 files
Ready-to-paste prompt files meant for an AI coding tool (Claude Code,
Cursor, etc.), each tied to a specific chapter technique:
- `architecture-map.md` — has the AI draw the ch. 3 five-box map and list
  every place a secret lives, framed explicitly as claims to verify, not
  facts to trust.
- `diff-review.md` — has the AI check a pending diff against SPEC.md and
  the invariants file before you accept it (three yes/no questions).
- `invariant-extractor.md` — has the AI read an *existing* codebase and
  reverse-engineer an invariants file from it, marking
  inferred-but-unverified rules explicitly.
- `outreach-drafter.md` — drafts a chapter-8-style outreach email around
  specifics the user supplies (mutual context, a quoted sentence, a
  work-shaped offer, a one-step ask), capped at 150 words.
- `session-opener.md` — the literal "read SPEC.md and the invariants file
  before anything else" prompt meant to open every single session.
- `stripe-wiring.md` — has the AI implement Stripe checkout following all
  four chapter-6 webhook rules (signature verification, dedup by event
  ID, read-current-state, ack-fast-then-work), with access granted only
  in the webhook handler.

### `companion/templates/` — 9 files
Blank or worked-example versions of every named file card in the book:
- `SPEC-template.md` — the blank six-section spec template.
- `SPEC-example-booking.md` — the filled trainer-booking example from
  ch. 2 (matches the book's filecard).
- `SPEC-example-gallery.md` — a second worked example not shown in the
  book: a wedding photographer's private client-gallery product.
- `SPEC-example-ops.md` — a third worked example not shown in the book:
  an internal three-person billing-team claims tracker.
- `CLAUDE-invariants-starter.md` — a starter invariants file with
  guidance comments on which tool-specific filename to rename it to
  (CLAUDE.md, `.cursor/rules`, AGENTS.md).
- `USERS.md-template.md` — the blank founder-CRM template from ch. 8.
- `LOOP.md-template.md` — the blank weekly distribution-ledger template
  from ch. 9.
- `ARCHITECTURE-sample.md` — the ch. 3 five-box map rendered as a
  plain-text ASCII diagram with the same arrow/lock structure, plus the
  "never name your vendors publicly" rule from ch. 7.
- `env.example` — a generic `.env.example` starter (email key, database
  URL, the two per-mode Stripe variables), commented for committing to a
  repo.

**Reconciliation note:** the book itself only shows *one* filled SPEC.md
example (the trainer-booking one, ch. 2). The companion pack ships two
additional worked SPEC.md examples (photographer gallery, internal ops
tool) that do not appear anywhere in the 68-page PDF — this is the
companion pack containing more worked examples than the book text does,
not a mismatch.

---

## The book's recurring structures

A reviewer skimming the PDF pages or spread renders should recognize these
recurring elements — all defined once in `src/template.typ` and reused
identically across all ten chapters:

- **The marginalia rail.** Every page has an unusually wide outer margin
  (measure ~62 characters for body text, then a ~132pt rail). Short
  annotations — "field notes," asides, tool-specific notes — are placed
  in that rail rather than interrupting the body column, so the main
  argument reads as an uninterrupted narrow column while asides sit
  alongside it.
- **§ section codes.** Every level-2 heading within a chapter gets a
  small mono-font code in the rail next to it, formatted `§ 0X.Y`
  (chapter number, then a running section counter that resets each
  chapter) — e.g. chapter 3's second heading is `§ 03.2`.
- **Field notes.** A specific rail annotation type, always preceded by
  the small mono kicker "FIELD NOTE" in terracotta. Used for asides,
  tool-specific notes, and — repeatedly — for the recurring Ordani facts
  (HIPAA-compliant, row-level security, two outside security reviews,
  hundreds of paying birth workers) surfaced as supporting evidence
  rather than restated in the main text each time.
- **"From the build log" war stories.** A distinct dark
  (espresso-colored) full-width block, always headed with the kicker
  "FROM THE BUILD LOG" plus a dated code (e.g. "Entry · 2026-08-31"),
  then a bolded title, then two to four short paragraphs. Every one of
  the 13 war stories across the book carries a real date and is
  presented as a true, specific incident from the author's own projects
  (mainly Ordani and his consulting site), not a hypothetical.
- **Pre-flight checklist cards.** A bordered, boxed artifact appearing
  exactly once per chapter (always as the second-to-last element before
  the closing paragraph), headed with a dark bar reading the chapter's
  checklist name plus a small "RUN TONIGHT" kicker, containing 4-5
  numbered items, each a bolded imperative sentence followed by one to
  two sentences of elaboration.
- **Filecards.** A bordered artifact styled as an actual file: a dark
  header bar showing the literal filename (e.g. `CLAUDE.md —
  invariants`, `SPEC.md`, `.env.example`), then the file's contents
  rendered in monospace with straight (non-curly) quotation marks
  specifically so the content can be copy-pasted without breaking code
  or SQL syntax. Not every chapter has one (chapters 3, 6, 7, and 10 do
  not).
- **Line-drawn diagrams.** Native vector diagrams (not screenshots or
  imported images) built from Typst primitives — lines, boxes, circles,
  labels — in a consistent stroke style (petrol-blue for
  structural/trust elements, terracotta for problems/warnings, dashed
  lines for "not the real thing"). Nine of the ten chapters carry a
  named diagram (chapter 5 does not; it substitutes a two-question
  callout and the RLS-migration filecard).
- **Pull quotes.** Short, isolated one-to-two-sentence lines set in
  large display type, preceded by a short terracotta rule, used as the
  emotional or thesis-restating beat of a chapter (see the "quoted
  passages" list below — most of them are pull quotes).
- **`#define()` blocks.** A recurring "term, then indented definition"
  component used to formally name and define the book's core vocabulary
  the first time it's needed: Context window (ch. 1), Drift (ch. 2),
  Authentication vs. authorization (ch. 5), Source of truth (ch. 6), A
  user, versus a tourist (ch. 8), Distribution loop (ch. 9). Chapters 3,
  4, 7, and 10 don't introduce a new term this way.
- **Running footer.** Every content page (not the cover pages) carries
  a three-part mono footer: "THE 80% WALL · FM-0X · REV 2026.08" on the
  left, the page number centered, and
  "MICAHJONESCONSULTING.COM/PLAYBOOK" on the right — "FM" standing for
  "Field Manual," consistent with the book's self-description as a
  "field manual" and each chapter cover page's kicker, "Field manual ·
  Document 0X of 10."

---

## Quoted passages (verbatim, Typst markup stripped)

Chosen to show the book's actual sentence-level voice and the specificity
of its claims, not paraphrased:

1. (Chapter 1, pull quote) — *"Code says what. Only the transcript knew
   why. And the transcript is gone."*

2. (Chapter 1, closing pull quote) — *"The wall is not proof you can't do
   this. It is the point where the tool's memory ran out and yours has
   to take over: on paper, in the repo, where every future session finds
   it."*

3. (Chapter 1, war story "The demo that lied for weeks") — *"No error. No
   bounce. The page told every visitor 'Got it.'"*

4. (Chapter 2, pull quote) — *"Same tools in everyone's hands. The page
   that says what you want is the only part they can't copy."*

5. (Chapter 3, on the client tier) — *"The rule: the client is a
   suggestion box. Anything it enforces is decoration until the server
   enforces it again."*

6. (Chapter 5, section heading and opening) — *"Nobody is targeting you.
   Everything is scanning you."* ... *"You are not defending against
   genius. You are defending against a checklist, which means a
   checklist can defend you."*

7. (Chapter 6, on the payment success page) — *"The single most common
   money bug in AI-built apps is granting access on that page load,
   because it demos perfectly and fails in production in both
   directions."*

8. (Chapter 7, pull quote) — *"Compliance is the napkin, plus the locks,
   plus paperwork. You built the first two chapters ago."*

9. (Chapter 7, war story "The stack I stopped naming," closing lines) —
   *"The architecture napkin is for you, your spec, and your auditors.
   The public version says what the system does and what protects it,
   never which brands it is assembled from. Confidence talks about
   properties. Only carelessness publishes the parts list."*

10. (Chapter 8, on cold outreach) — *"The first ten come from
    conversations, not audiences."* ... *"Everyone can smell
    machine-written outreach now. The specifics are the moat."*

11. (Chapter 9, pull quote) — *"How many of your users came from your
    users? Count the second-hand users. That number is your
    distribution, and before MRR, it is the only growth number that
    isn't noise."*

12. (Chapter 10, closing pull quote) — *"You were never learning to
    build alone. You were learning to build something that survives
    you, and that skill works at every size: a session, a launch, a
    company."*

---

## Observations

(Flagged separately per the task instructions — not part of the factual
map above.)

- **Length is unusually even.** Six of the ten chapters (3, 4, 5, 6, 7, 9)
  are exactly 6 pages in the assembled book; chapters 2, 8, and 10 are 7
  pages; chapter 1 is the outlier at 9 pages (it is also the only
  chapter doing double duty as the free standalone sample, and the only
  one carrying the sales-colophon logic even though that colophon is
  suppressed in the book edition). No chapter reads as sparse relative
  to the others in raw page count.
- **Artifact density is uneven, though.** Four chapters (3, 6, 7, 10)
  have no filecard — the artifact type most directly demonstrated as
  "product," since it is rendered as a literal copy-pasteable file.
  Chapter 5 has no named diagram function (it substitutes a callout and
  the RLS-migration filecard instead). Chapter 10 has neither a filecard
  nor a `#define()` block, and its "diagram" is the same `decide-row()`
  grid component chapter 7 uses, not a new visual.
- **The 26-file companion pack contains two SPEC.md examples that never
  appear in the book itself** (the photographer-gallery and
  internal-ops examples) — the pack is not a strict subset of what is
  shown in the PDF; it has some standalone value beyond re-presenting
  the book's own artifacts.
- **The "ten-minute read" claim on every chapter-opener spec block is
  identical across all ten chapters**, regardless of the fact that
  chapter 1 is 50% longer in page count than the shortest chapters (9
  pages vs. 6). Whether that claimed reading time differs meaningfully
  chapter to chapter is not something this document can verify —
  flagging only that the same claimed time appears on chapters of
  different length.
- **Chapter 3's own war-story count (1) is the lowest, alongside
  chapters 5, 6, 7, 8, 9, and 10, which also each carry exactly one.**
  Only chapters 1, 2, and 4 carry two war stories each. Total across the
  book: 13 war stories, all individually dated.
- Every war story is internally presented as true and specifically
  dated — the book's own internal handoff document (`HANDOFF.md`)
  states this as a deliberate, enforced editorial rule ("EVERY factual
  claim uses the verified ledger phrasings... Never invent numbers,
  roles, dates, or war stories. Every build-log entry in the book is
  TRUE and dated") — this document takes no position on whether that
  claim is itself verifiable from outside the author's own repos, only
  reports that it is the stated intent and that the TOC page repeats
  the same claim to the reader directly.
