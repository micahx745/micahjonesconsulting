# Book research-to-action map

Fable, 2026-09-04. DIRECT segment of the book arc. No Typst has been touched.

**The ruling this map serves, verbatim:** *"rework the playbook and the pitch of the
playbook … focusing on GTM stuff instead of engineering … really help this book sell to
more people."* How far the balance shifts is not ruled. That decision is section 0.

**What this map is.** Per chapter, and for the candidate eleventh chapter: the market
evidence by distinct authors; the chapter's current opening and its pre-flight card,
verbatim from `Code/the-80-percent-wall/src/` with file and line; the proposed change; and
whether it needs the operator's ruling. Then the decisions, numbered. Nothing here is book
copy. Exact strings for the book belong in the brief that follows the rulings.

**Where every number comes from.** Seven corpus cuts, run today against the cached 5,456
posts in `Code/reddit-research/data/corpus.jsonl`, each written by an Opus agent, refuted by
a Sonnet skeptic that re-ran the script and checked every quotation against the corpus, and
corrected. They sit beside this file as `../research/04-CUT-*.md`, with their scripts in
`Code/reddit-research/cuts/`. Denominators, reproduced by every script before it counted
anything: 4,464 posts with real bodies from 3,842 authors; 607 asking posts from 567
authors; of those, 284 posts from 261 authors in the five business subreddits. A count of
public posts is evidence about language, not market size, and a zero is weak evidence of
absence. Every quotation from the book below was checked mechanically against `src/` by
`Code/the-80-percent-wall/scripts/map-quote-gate.py`.

---

## 0. The decision first: how far the balance shifts

The three options, as you framed them:

- **Light touch, as ruled C.** Sample moves to chapter 8, chapter 10 ships an artifact,
  chapter 1's opener is re-pitched, the strays are fixed.
- **Plus one chapter.** The landing page for the AI-built app.
- **A rebalance toward GTM.** Distribution chapters move forward or grow, engineering
  chapters compress. Your own trigger: only if cut (c) says the money is there.

### What the seven cuts say, in six lines

1. **The market asks for chapters 8, 9 and the unwritten 11, and for nothing else at that
   level.** Business-asking authors of 261, two independent methods: chapter 9 at 105 and 42,
   chapter 8 at 66 and 49, candidate 11 at 48 and 33. Fourth place is chapter 10 at 45 and 3.
   The title chapter, chapter 1, is the one subject nobody in the business room asked about:
   2 authors and 0, and neither of the two survived reading. (Cut A)
2. **The engineering chapters are asked about in the other room, where money is not.**
   Chapter 4 reaches 57 of 307 developer-asking authors against 27 of 261 business; chapter 1
   reaches 19 against 2. Money words appear in 14% of developer-room asking posts and 52% of
   business-room ones. (Cut A, section 7)
3. **The engineering subjects already have a free incumbent; the GTM subjects do not.**
   Chapters 3, 4 and 5 sit at or below the 15% unanswered baseline, answered in the developer
   rooms at a 2% to 6% miss rate. Chapters 8, 9, 10 and 11 sit above it, at 17% to 22%, and
   the business slice carries the whole rate. (Cut E)
4. **The landing-page falsifier fires in the chapter's favour.** Of 34 asking authors who say
   "landing page", 18 want conversion or first-users help and 4 want building help. In the
   business subs it is 18 against 2. Nobody asked which tool to use. (Cut B)
5. **Nobody in 4,464 posts reports buying a book or a course about shipping software.** Of 95
   authors who name a completed purchase, 54 paid for an AI coding subscription, 23 for
   distribution, 4 for engineering help, 1 for a course, 0 for a book. The two real
   book-or-course purchases found without an amount are both about getting customers. (Cut C)
6. **The $99 to $149 band is nearly empty, and the free tier owns production.** Only
   Refactoring UI sits at the price. Supabase, RaftLabs and Clarista give the production
   checklist away and stop exactly where chapter 7 stops. A Wiley paperback, *The Vibe Coding
   Playbook*, now sells AI-built-plus-business at $21 to $35, weighted to building. 0.4% of
   this audience names any teacher; 66 authors name Product Hunt, and 7 write it up as a
   failure. (Cut D)

### Recommendation: plus one chapter, with the light touch as its floor

**Take the second option.** Add the landing-page chapter, keep the ten engineering and
distribution chapters as they are in substance, and move the book's front door to
distribution: the sample, the opener, the cover noun and the sales page. Reject the
rebalance.

**Why plus one and not light touch alone.** The landing page is the third-strongest subject in
the book under both methods and the only strong one the book does not have. Its case is the
conversion half: seven authors in seven separate posts say the page does not explain the
product, and only one of two hundred bought traffic to tell a traffic failure from a
conversion failure. That is procedural material, which is the only form this book teaches in.
It is also the Pass 99 offer and the sales page's own subject, so the book, the page and the
package become one argument instead of three. The light-touch items are still required; they
are the floor, not the alternative.

**Why not the rebalance.** Your trigger was cut (c), and cut (c) does not fire. The revealed
money is a $200-a-month subscription habit and small ad spend, not books. Engineering help is
declined at every price in the corpus, and the stated willingness to pay for it (5 of 10
stated authors, median $4,000) is talk that nobody is observed converting. Nothing in the
corpus shows anyone paying $99 for a manual about anything, so a rewrite of seven chapters
would be a bet placed before a single reader has said a word. Cut D adds the second reason:
the way to sell the engineering half against free checklists is depth, and compressing it
removes the depth. Cut E adds the third: the engineering subjects have real asking volume
(chapters 4 and 5 at 69 and 66 authors); they are crowded, not unwanted. The refund-spike
falsifier you named cannot be tested before launch, and the title, cover and first seven
chapters all promise engineering. The honest move is to change what the buyer meets first,
not what they paid for.

**What the corpus hands the title.** In r/buildinpublic, unprompted, with 62 comments:
"building the app is like 20% of the battle. the other 80%? trying to get literally anyone to
even SEE it exists" (cut F, Table 3, permalink there). The book's 80% is the share of the
build the AI finishes. That author's 80% is distribution. The title survives a GTM pitch
without a rewrite: the wall has two faces, and the book can say so on its first page.

**Cost of plus one.** About seven pages and one pre-flight card, written by Fable in the
brief. Two companion files. The chapter numbering shifts for three chapters, and every
"ten chapters" string moves with it (section 3). Page numbers on the TOC and the sales page
move; they were going to move anyway.

**The honesty guardrail, restated for the new shape.** Chapters 8 and 9 are pages 50 to 62
of 69 today, 13 pages. With the new chapter the distribution third is about 20 of about 76
pages. The promise the book can keep is "ship it, get the first ten users, and build the page
they land on". It is still not a marketing book.

---

## 1. The evidence base

| Cut | File | Question | Headline | Skeptic |
| --- | --- | --- | --- | --- |
| A | `04-CUT-A-chapter-demand-map.md` (+ `.json`) | Which chapters is the market asking for? | 09, 08, 11 on top under both methods; 01 is the "nobody asks" chapter | FIX, one non-verbatim fragment and one overclaim, both corrected; 57 quotes checked |
| B | `04-CUT-B-landing-page-posts.md` | Do the landing-page authors want building help or conversion help? | 18 conversion or first-users to 4 building; 9 to 1 in business subs | FIX, three rates added from rounded columns, recomputed; 68 quotes checked |
| C | `04-CUT-C-would-pay-revealed.md` | Where is the revealed money? | Tools and ads; 0 books; engineering help declined | FIX, one dropped word in a quote, three overclaims softened; 126 quotes checked |
| D | `04-CUT-D-competitive-set.md` | What is a $99 manual up against? | No canon; channels named 6x more than teachers; the band is nearly empty | FIX, the book's own tagline had leaked into a lexicon (it matched zero posts); corrected |
| E | `04-CUT-E-answered-ratio.md` | Which subjects are open slots? | GTM chapters open in the business room; engineering chapters incumbented | FIX, denominators added, one headline reordered against its own table |
| F | `04-CUT-F-launch-rooms.md` | Where does the ungated chapter go? | Show HN permits a sample chapter and forbids the email gate; business rooms only | FIX, one sentence paired non-matching numbers; five subreddit rules stay UNVERIFIED |
| G | `04-CUT-G-reattest-vibe-solo.md` | Are "vibe coding" and "solo founder" attested? | Both kills overturned; solo founder at the bar, business-only; vibe coding misses it in the business room | FIX, two floating denominators; 37 quotes checked, 0 failed |

Cut (h), the 19 sameness posts, did not run: none of the three options adds a positioning
chapter. No new crawl was warranted; the one gap a crawl could close is comment bodies, which
would turn cut E's "received replies" into "was answered".

The book-materials handoff the prompt cites, `04-BOOK-MATERIALS.md`, does not exist anywhere
in this repo. The facts it would have carried survive in `.claude/briefs/pass-98-playbook-landing.md`
section 8 and were re-verified against `src/` below.

---

## 2. Per chapter

Column key for the evidence lines. **A** is cut A, business-asking authors of 261 under
method 1 and method 2, then developer-asking of 307 under method 1, then the discounted
figure after the 75-post hand read. **E** is cut E, asking authors matched by the chapter
lexicon across both rooms and the share whose every post drew no reply, then the business
and developer split. The two cuts use different lexicons, so their counts differ; both are
printed with their denominators in the files.

### Chapter 01, "Why your build broke at 80%" (pages 3 to 11)

**Evidence.** A: 2 and 0 of 261; 19 of 307 developer; discounted 0.0. Neither business
candidate survived reading. E: 7 authors, 14% unanswered, 2 business and 5 developer. The
thinnest subject measured. Cut G: the method word "vibe coding" reaches 7 of 261 business
asking authors, one short of the bar, and 4 of the 19 asking posts that use it use it to
dismiss.

**Current text, src/chapter-01.typ:22-23**
> "Why your build broke at 80%",
> "What happens in the context window when the AI starts undoing your features. The structural reason, not the vibes.",

**Current text, src/chapter-01.typ:36-51**
> == The moment it turns
>
> Everything in this manual comes from builds I shipped. Mostly Ordani: a HIPAA-compliant SaaS I built alone with Claude Code and Cursor, in beta now with active paying users. Same stack you're using. Same wall.
>
> You asked for something small. Move a button. Fix a date format. The diff was four lines. It compiled. You shipped it.
>
> Then you clicked around. Uploads are broken. Uploads. The feature you finished Tuesday. The one that already worked.
>
> So you tell the AI to fix uploads. It fixes uploads. Now the date format is wrong again.
>
> Somewhere around the third loop, everyone has the same thought: _this thing has turned on me._

**Current text, src/chapter-01.typ:108**
> The wall is the point where the invisible rules outnumber what fits in the window. It is not a talent problem. It is arithmetic, and arithmetic can be beaten with a system.

**Pre-flight card, src/chapter-01.typ:193-212**
> "Pre-flight · Five habits",
>
> *Write the invariant list.* One file in the repo root, named whatever your tool reads on its own (see the file card below). One line per rule-with-a-reason: "Uploads stream, never buffer: 500MB videos kill the function." Thirty minutes, tonight.
>
> *Point every session at it first.* "Read the invariants file before you touch anything." Ten seconds that stands in for every session that came before this one.
>
> *Read every diff before accepting.* The moment you stop reading is the moment drift starts compounding. If a diff touches a file your change had no business touching, stop and ask why.
>
> *One change per commit, committed when it works.* Small commits are restore points. Rolling back beats an apology prompt, every single time.
>
> *Caught the AI breaking a rule? Write the rule down, same day.* Fix the code, add the rule to the file, and where you can, turn it into a check a machine runs. Nothing in this manual pays back more per minute.

**Proposed change.** Ruling C.3 stands: re-pitch the opening beat, lines 45 to 51, onto the
attested wording. "I kept running into the same thing" is the corpus form (13 and 6 authors,
the two highest lifts in the dataset); the uploads-and-dates loop stays as the worked example
because it is the mechanism, but the sentence that carries the reader in changes. Add one
sentence to the opener that names the other face of the wall, using the r/buildinpublic
inversion as the author's observation, not as a quotation from a stranger. The mechanism
sections, the two build-log entries and the pre-flight card do not move. Chapter 1 stops
being the sample, so its `#sampler-only` colophon at lines 240 to 269 becomes dormant; leave
it, it is suppressed in the book.

**Needs ruling?** No. Ruled 2026-09-04 (C.3). Fable writes the strings in the brief.

### Chapter 02, "The spec is the moat" (pages 12 to 18)

**Evidence.** A: 10 and 5 of 261; 2 of 307; discounted 6.0. E: 12 authors, 33% unanswered,
the highest share of any chapter but on the smallest substantial base; 6 and 6.

**Current text, src/chapter-02.typ:14-15**
> "The spec is the moat",
> "The one page the AI keeps re-reading. Why drift, not bugs, is what kills your build. Template included.",

**Current text, src/chapter-02.typ:28-34**
> == The killer isn't bugs
>
> Bugs are loud. They throw errors, fail the build, break the demo in front of your friend. You find bugs because bugs want to be found.
>
> What kills builds is quieter. Somewhere around the fortieth session, you open your app the way a stranger would, and you feel it: everything works, and this is not the product you meant to build. Settings has eleven screens. There's a dashboard you never asked for, grown from a "while I'm here" suggestion you approved on a tired Tuesday. The one flow that had to be effortless takes four taps.
>
> Nothing is broken. That is exactly the problem.

**Pre-flight card, src/chapter-02.typ:173-189**
> "Pre-flight · The spec ritual",
>
> *Write SPEC.md tonight.* Six sections, one page, hard cap. If it spills past a page, NOT and LATER are where the excess goes.
>
> *Open every session with it.* "Read SPEC.md and the invariants file, then the task." Ten seconds. Direction and defense, loaded before any code.
>
> *Frame asks against NOW.* "Per the NOW milestone, build X" beats "build X." It tells the tool what to optimize for and, just as useful, what not to gold-plate.
>
> *Treat every "should I also…" as a NOT lookup.* If it's in NOT, the answer is no and costs nothing. If it's genuinely new, it goes to LATER, deliberately, not into the diff.
>
> *Change the spec only in its own commit.* The spec is allowed to evolve; it is not allowed to drift. A spec edit that rides along inside a feature diff is drift with paperwork.

**Proposed change.** None. The spec's WHAT line ("one sentence: the product, who it's for,
and the behavior that means it's winning", line 66) is the same sentence the landing-page
authors cannot write (cut B, Table 8). The new chapter should point back to it rather than
duplicate it.

**Needs ruling?** No.

### Chapter 03, "The architecture you didn't draw" (pages 19 to 24)

**Evidence.** A: 18 and 6 of 261; 23 of 307; discounted 6.0. E: 48 authors, 15% unanswered;
business 15 at 33%, developer 33 at 6%. Incumbented in the developer room.

**Current text, src/chapter-03.typ:15-16**
> "The architecture you didn't draw",
> "The single diagram every solo build needs. Auth, data, storage, third parties, and where AI tools quietly cut corners.",

**Current text, src/chapter-03.typ:29-31**
> == The napkin test
>
> Here is a test that takes ten seconds. Can you draw your app on a napkin? Not the screens. The machinery: where the data lives, what talks to what, and who is allowed to ask for what.

**Pre-flight card, src/chapter-03.typ:136-152**
> "Pre-flight · One lock per arrow",
>
> *The client enforces nothing alone.* Every rule the browser applies exists on the server too. Pick your most sensitive action and trace where it's actually checked.
>
> *Every query filters by owner.* Better: ownership lives in the database (row-level security), so a forgetful query returns nothing, not everything.
>
> *Storage is private by default.* Copy a file URL from your app, open it logged out. If it loads, that's tonight's work.
>
> *Secrets live in environment variables on the host.* Grep the repo for anything key-shaped; rotate whatever you find. Then make the grep a pre-release check.
>
> *Money truth comes from verified webhooks.* The provider's signature, checked on the server, is the only "it's paid" your app believes.

**Proposed change.** None.

**Needs ruling?** No.

### Chapter 04, "Deploy day" (pages 25 to 30)

**Evidence.** A: 27 and 4 of 261; 57 of 307 developer, the largest developer-room subject;
discounted 3.4, the lowest on-subject rate of any chapter (1 of 8 read was a person stuck
deploying; the rest describe a finished product). E: 69 authors, 13% unanswered; business 24
at 33%, developer 45 at 2%. The strongest incumbent in the set.

**Current text, src/chapter-04.typ:13-14**
> "Deploy day",
> "Environment variables, databases, domains, SSL, secrets. The pre-flight list, in the order things bite you.",

**Current text, src/chapter-04.typ:27-29**
> == Production is a different machine
>
> Chapter one told you about my two lead forms that said "Got it" to every visitor for weeks while delivering nothing, because the sending domain behind them had never been verified. This chapter is that story's autopsy, generalized: why the demo lies, and the exact order in which production bites.

**Pre-flight card, src/chapter-04.typ:124-140**
> "Pre-flight · Deploy day",
>
> *List every variable the code reads,* and confirm each exists on the host for _each_ environment. Your `.env.example` is the checklist; the AI can generate it by searching the code for every environment read.
>
> *Env change → redeploy → test.* In that order, every time. Installed is not live until the next build.
>
> *Migrate the hosted database and confirm its safety rules are on.* Your laptop's database is not evidence.
>
> *Open all three doors:* apex, www, and the platform URL. Confirm one redirect hop at most and the same build behind each.
>
> *Fire every integration once, for real, on the live site.* Submit each form and watch the artifact arrive: the email in the inbox, the row in the database, the webhook in the log. Ten minutes that would have saved my forms three weeks of silence.

**Proposed change.** None to the chapter. Note for the sales page, not the book: this is the
chapter the free checklists cover, so it should never be the proof shown to a buyer.

**Needs ruling?** No.

### Chapter 05, "The security pre-flight" (pages 31 to 36)

**Evidence.** A: 20 and 0 of 261; 27 of 307; discounted 4.0. Not one security phrase reaches
three distinct authors in the top 400. E: 66 authors, 12% unanswered, the most incumbented
subject; business 23 at 26%, developer 43 at 5%.

**Current text, src/chapter-05.typ:13-14**
> "The security pre-flight",
> "Row-level security done right, the auth pattern that survives, and the hardcoded keys you left in. Two checks catch most of it.",

**Current text, src/chapter-05.typ:27-29**
> == Nobody is targeting you. Everything is scanning you.
>
> The chapter-four ritual ended with strangers able to reach your app. Here is the uncomfortable arithmetic of that: within hours of your domain going live, automated scanners found it. Not hackers who care about you. Scripts that knock on every door on the internet, all day, forever, looking for the same handful of unlocked ones.

**Pre-flight card, src/chapter-05.typ:125-141**
> "Pre-flight · Security",
>
> *Run the two-account test.* Create as A, snoop as B, through the app and through edited IDs. Anything visible is tonight's work.
>
> *Row-level security on and forced, on every table a user session can reach.* Deny by default, one policy per pattern. Run each user's request as that user; the bypass key is for admin and system jobs only. Write down any table you skip.
>
> *Search everything the deployed site downloads.* The Sources panel, every loaded script, not view-source alone. The browser bundle is public forever.
>
> *Grep the repo and its history for credential shapes.* Anything found gets rotated, never just deleted.
>
> *Hit your admin routes logged out.* Cold, in an incognito window. Hidden buttons are not authorization, and scanners don't use buttons.

**Proposed change.** None. The chapter is the one place the book's HIPAA credential earns
its keep, and the claims gate is clean here.

**Needs ruling?** No.

### Chapter 06, "Stripe in production" (pages 37 to 43)

**Evidence.** A: 20 and 2 of 261; 16 of 307; discounted 8.0. E: 71 authors, 20% unanswered,
above baseline; business 37 at 38%, the worst business-room rate of any substantial chapter,
developer 34 at 0%. The same question is answered in one room and ignored in the other.

**Current text, src/chapter-06.typ:13-14**
> "Stripe in production",
> "Webhook reliability, refunds, subscription edge cases, and the test-to-live failures nobody warns you about.",

**Current text, src/chapter-06.typ:27-29**
> == The stakes change here
>
> Every failure in this book so far cost you embarrassment or a weekend. This chapter's failures cost money and trust, in public, one customer at a time. A broken upload annoys someone. A customer who paid and got nothing tells everyone.

**The price anchor, src/chapter-06.typ:118-122**
> The sales page for this manual went live weeks before its checkout existed. The temptation was strong to ship the \$149 button anyway, wired to nothing or to something untested, because a page without a buy button feels unfinished.

**Pre-flight card, src/chapter-06.typ:139-153**
> "Pre-flight · Stripe",
>
> *Hosted checkout only.* Your server never sees a card number, and the AI's beautiful custom card form stays in the parking lot.
>
> *Access is granted by the verified webhook, never by the success page.* Signature checked, event IDs deduped, retries welcomed.
>
> *Make the five live-mode swaps deliberately:* live keys, live endpoint, its new secret, live price IDs, then redeploy. Each is an env change, and installed is not live.
>
> *Wire the refund echo.* `charge.refunded` revokes what payment granted. Test it with a real refund to yourself.
>
> *Pay yourself once, live, and watch the whole pipe:* checkout, webhook, database, email. Then refund it. The fee is the cheapest audit you will ever buy.

**Proposed change.** None to the teaching. The "$149 button" at line 120 is a dated build-log
entry and stays true as history; it is coupled to the $149 line on the sales page and to
chapter 1's colophon only if the $149 tier is removed rather than dated.

**Needs ruling?** Only through decision 7, the $149 trigger.

### Chapter 07, "Compliance, when it matters" (pages 44 to 49)

**Evidence.** A: 12 and 7 of 261; 3 of 307; discounted 4.8. E: the hipaa, soc 2, gdpr family
matches 0 of 607 asking posts, the only phrase in 78 that matches nothing; the wider lexicon
finds 6 authors. These communities do not raise compliance in public, in either room.

**Current text, src/chapter-07.typ:15-16**
> "Compliance, when it matters",
> "HIPAA, SOC 2, GDPR. When you genuinely need them, when you don't, and what compliant actually requires.",

**Current text, src/chapter-07.typ:29-39**
> == The two ways builders get this wrong
>
> Honesty first: this chapter is a field guide from a builder, not legal advice. When real money or real patient data is on the line, one hour with a healthcare or privacy attorney is cheap insurance, and this chapter makes that hour ten times more productive.
>
> Compliance breaks solo builders in opposite directions. Half ignore it entirely and ship health data through consumer tooling with a shrug. The other half freeze: they have a genuinely good idea near a regulated space and never build it, because the acronyms feel like a wall only companies with lawyers climb.

**Pre-flight card, src/chapter-07.typ:102-120**
> "Pre-flight · Compliance",
>
> *Answer the three questions* in the diagram, in writing, in your spec's NOT or NOW section: health data for providers, EU users, enterprise questionnaires. Most readers get one yes, not three.
>
> *Run the vendor sweep.* Every vendor on your chapter-three map gets a DPA checkmark, plus a BAA checkmark if health data is in play. Any X becomes a replacement or an upgrade, this week.
>
> *Write the honest privacy policy:* what you collect, why, how long you keep it, and how a user gets it exported or deleted. Plain language beats borrowed legalese you don't actually do.
>
> *Make deletion a query, and prove it.* On a test account, delete one user's everything: rows, files, logs that identify them. Chapter three's owner column is why this is an evening, not a quarter.
>
> *Hold the SOC 2 line.* Keep a one-page security summary for questionnaires, and buy the audit the day a real contract makes it worth it, not the day the anxiety does.

**Proposed change.** None. The zero is the strongest zero in the cuts, and it argues for
keeping the chapter short and never leading with it, which is already true. The chapter's
closing line, "where do the first ten people who pay for it actually come from?" (line 122),
is the hinge into the distribution third and stays.

**Needs ruling?** No.

### Chapter 08, "The first ten users" (pages 50 to 56)

**Evidence.** A: 66 and 49 of 261; 4 of 307; discounted 52.8, first after the hand read
(80% on subject). E: 48 authors, 17% unanswered; business 44 at 18%, developer 4 at 0%.
Cut F: the eight hand-confirmed launch-silence posts are all in the business rooms and only
two of them were caught as asking posts; people describing a dead launch do not phrase it as
a question, so the asking corpus undercounts this chapter's reader.

**Current text, src/chapter-08.typ:15-21**
> "The first ten users",
> "Getting to the first ten people who keep using it. Where they come from, and why posting stopped working.",
>
> ("Status", "Chapter eight of ten"),

**Current text, src/chapter-08.typ:29-31**
> == It shipped. Nobody came.
>
> The sales page of this manual opens with three sentences of pain, and this chapter is the third one. The app works. The deploy held. The security checks passed. You posted it where builders post things, refreshed the analytics, and watched a spike of visitors arrive, click twice, and never return.

**Current text, src/chapter-08.typ:41**
> Selling has been my trade longer than building: enterprise software inside SurveyMonkey on the way to its IPO, and \$20M+ in client revenue since. Every expensive thing I know about finding the first customers compresses into one sentence: _the first ten come from conversations, not audiences._

**Current text, src/chapter-08.typ:59**
> Cold or warm, the anatomy of outreach that works has not changed in twenty years of selling. Four parts, in order.

**Current text, src/chapter-08.typ:61-66**
> Ordani opened as a private beta with several birth practices, found through the rings, not through a launch. It has active paying users today, and at the six-month mark none had been lost to a competitor. Retention was the plan, not the reward.

**Current text, src/chapter-08.typ:95-97**
> == Track ten people like you track invariants
>
> You will not hold a hundred conversations in your head. Chapter one's answer applies to humans too: memory goes in a file, in the repo.

**Pre-flight card, src/chapter-08.typ:117-132**
> "Pre-flight · First users",
>
> *Write the ten-name list tonight.* Inner ring first: people who would answer a text, who touch the problem or know someone who does. The list is usually easier to write than it felt.
>
> *One conversation a day.* Personal, specific, no blast. A no that ends in "but talk to..." is a win; log the introduction.
>
> *Make one unscalable offer.* Set it up for them, migrate the data, run the first week. Effort you spend is trust they don't have to.
>
> *Keep USERS.md current.* One block per person, updated after every conversation. What they ask about twice goes to the spec.
>
> *Count returns, not signups.* Someone who comes back unprompted, twice, is one of your ten. Ten of those, and the next chapter's loop has fuel.

**Does it stand alone as a first read?** Yes, after six edits, none of which touches the
argument. (1) Line 21: the Status row must use `edition-status()` the way chapter 1 does at
`chapter-01.typ:28`, so the standalone build says free chapter and the book says chapter
eight. (2) Line 31: "the third one" is false since Pass 98 put "It shipped. Nobody came."
first on the page; it becomes "the first one". Nobody sees the mismatch until the book is on
sale, so it is fixed in the same pass as the swap. (3) Line 62: a first-time reader has never
met Ordani; the field note needs the ledger's own introduction, "the HIPAA-compliant SaaS I
built alone on these tools", with nothing about how its protections work. (4) Line 95: the
heading's "invariants" is chapter 1's word; line 97 explains the idea inline, so the reader
survives, but the heading changes to plain language. (5) Chapter 8 has a teaser for chapter 9
at lines 137 to 152 and no sales colophon; it needs the `#sampler-only` two-paths block that
chapter 1 carries at lines 240 to 269, with the chapter list and count updated. (6) The
teaser text itself changes once the next chapter is the landing page.

**Proposed change.** Chapter 8 becomes the sample (ruled C.1, condition now met). The six
edits above. Line 59's "twenty years of selling" is unledgered: decision 5. Line 41's
"Selling has been my trade longer than building" is a qualitative claim the ledger neither
carries nor contradicts; it stays unless you object.

**Needs ruling?** Decision 3 (the sample, and whether it is gated) and decision 5.

### Chapter 09, "The distribution loop" (pages 57 to 62)

**Evidence.** A: 105 and 42 of 261, first under method 1; 22 of 307; discounted 42.0, second.
One rejected term alone, "promote", would have added 48 more authors, almost all of them the
r/SaaS boilerplate "I will not promote". E: 40 authors, 22% unanswered, the highest-ranked
substantial open slot; business 37 at 24%, developer 3 at 0%. Cut D: 66 authors name Product
Hunt and 7 write it up as a failure; channels are named six times as often as any teacher.

**Current text, src/chapter-09.typ:12-13**
> "The distribution loop",
> "Turning the first ten into the next hundred. Reply, don't broadcast. The metric that matters before MRR.",

**Current text, src/chapter-09.typ:26-30**
> == The instinct to resist
>
> You have ten users who return without being reminded. You know their names. And right on schedule, the old instinct comes back: _now_ we scale. Now comes the content calendar, the newsletter, maybe some ads. Now we broadcast.
>
> Resist it. Broadcasting did not find your first ten, and it will not find your next ninety. What finds them is the same machinery from chapter eight, upgraded in one specific way: it has to start running _without you pushing every lap._

**Coupled to the sample, src/chapter-09.typ:73-76**
> #warstory("Entry · 2026-08-31", "The book that carries its own loop")[
> You are holding this chapter's example. The first chapter of this manual is free, and it ships with its loop built in: the copyright line reads "share it, don't sell it," because a shared chapter is the artifact doing its job.

**Pre-flight card, src/chapter-09.typ:110-126**
> "Pre-flight · Distribution",
>
> *Count your second-hand users, today.* Users who came from users. Zero is normal and temporary; it is also the number everything below exists to move.
>
> *Fire the ask at every value moment.* A thanks, a win, a renewal: one specific who-else question. One name is a win; log it and run chapter eight on it.
>
> *Ship one traveling artifact.* Find the output non-users already see, or should see, and make it excellent for the recipient, with a quiet credit line that knows the way home.
>
> *Reply to everything within a day.* Privately to users, publicly where they gather. Support is marketing at your scale, and public answers compound.
>
> *Keep LOOP.md, five lines a week.* Ads, SEO, and newsletters wait until the loop runs without you pushing every lap.

**Proposed change.** The chapter is the market's first ask and it stays as written. Two
mechanical couplings: line 74's "The first chapter of this manual is free" must say which
chapter is free after the swap, and if the new chapter lands before this one, "chapter eight"
at line 30 and in the pre-flight's second item becomes the new number. The "What not to build
yet" section (line 91) already says paid ads and SEO wait; cut C's ad-spend rows ($20 for 83
visits and no conversions, $85 for zero signups, $8,000 for maybe twelve customers) are the
evidence for that paragraph if a build-log note is ever wanted, but no new copy is proposed.

**Needs ruling?** Only through decision 2, the new chapter's position.

### Chapter 10, "When to hand it off" (pages 63 to 69)

**Evidence.** A: 45 and 3 of 261; 10 of 307; discounted 16.9. The gap between methods is
readable: "hire", "hiring" and "freelance" mostly describe the poster's own working life. E:
71 authors, 18% unanswered; business 61 at 21%. The hire, co-founder, contractor family is
43 asking authors, 37 of them business.

**Current text, src/chapter-10.typ:16-17**
> "When to hand it off",
> "The signals you've outgrown solo. When to hire, when to rent senior help, when to sell, and when to keep going.",

**Current text, src/chapter-10.typ:30-32**
> == The question arrives disguised
>
> Nobody wakes up and asks "have I outgrown solo?" The question shows up wearing work clothes: support answered at midnight again. A feature you know exactly how to build, waiting three weeks for your hours. LOOP.md logging introductions you never followed up, because the loop now produces more than one person can catch.

**The artifact ruling C.2 asked for already exists, src/chapter-10.typ:119-123**
> #define("Data room")[
> The files someone reads before the price is real. What does it do? Who can see whose data? Where does the money truth come from? What runs when you stop? Not polish. Legibility without you in the room.

**src/chapter-10.typ:127-130**
> #filecard("DATA-ROOM.md: ten questions, one line each")[
> \# Asked in this order. Right: what you keep.
>
> #text(weight: 700)[What is it, and what is it not?] -> SPEC.md

**Coupled to the sample, src/chapter-10.typ:189-191**
> They arrived alongside this PDF with your purchase. Chapter one is free for anyone at micahjonesconsulting.com/playbook: send the builder you know who is stuck at 80%.

**Pre-flight card, src/chapter-10.typ:155-171**
> "Pre-flight · The hand-off",
>
> *Score the five signals quarterly, in writing.* Queue, ceiling, skill, dread, bus-factor. Two or more, persisting, means the question is live.
>
> *Choose on purpose.* "Keep going" is a decision with a date on it, recorded in the spec's NOW, not a default you drift into.
>
> *Before any hire, write the job as rules-with-reasons.* If a file and a check can do it, ship those instead. What remains is the real job.
>
> *Rent senior judgment by the milestone.* The season, the outcome, and what done means, defined before the search, reviewed at the end like any engagement.
>
> *Fill in DATA-ROOM.md, even if you never sell.* Ten questions, one line each. Then hand it to one person you trust and take a week off: every message you get is a line it is missing.

**Proposed change.** Ruling C.2 is already satisfied: Pass-78 gave the chapter the data-room
definition, the DATA-ROOM.md file card, a pre-flight item that fills it in, and the companion
file `templates/DATA-ROOM.md-template.md`, which a buyer receives today (the site's embedded
ZIP hash matches this repo's build). The thesis recap at line 111 precedes the pre-flight at
line 153, so the ordering complaint is a non-finding. Two mechanical couplings remain: line
190 names chapter one as the free chapter, and the chapter renumbers to 11 if decision 2 goes
as recommended. No new artifact is proposed; the page is full and a new card costs a page.

**Needs ruling?** No. C.2 closed; report only.

### Candidate chapter 11, the landing page for the AI-built app

**Evidence.** A: 48 and 33 of 261, third under both methods, ahead of eight written chapters;
8 of 307; discounted 19.2. "landing page" is used by 32 of the 567 asking authors, second only
to a tool's name. "pricing page" is used by zero of 567. E: 57 authors, 19% unanswered;
business 49 at 22%, developer 8 at 0%. Cut B, read post by post: of 34 asking authors, 18
want conversion or first-users help, 4 want building help, 5 are validating an idea with a
page. Seven authors say the page does not explain the product. Only 7 of 200 posts state both
a traffic number and a conversion number for their own page, and one author bought traffic
to separate the two ($20, 83 visits, zero conversions). Cut A's overlap table: 33 business
asking posts match this subject and chapter 9 together, 20 match it and chapter 8; in the
reader's head, no users, a page that does not convert and not knowing which channel works
are one problem.

**Current text.** None. The book's nearest material is chapter 2's WHAT line at
`chapter-02.typ:66` and chapter 9's traveling artifact at `chapter-09.typ:69`.

**What the chapter would have to contain**, in the authors' own words (cut B, the closing
section, permalinks there): a way to tell traffic failure from conversion failure before
spending more; the one-sentence statement of what the product does, which seven authors
cannot write; a stranger's read of the page, which they currently get by asking Reddit for
one; and a first channel that is not posting everywhere and hoping. The first-channel half is
chapters 8 and 9. The other three are the chapter.

**Proposed change.** Write it, as chapter 9, between the first ten users and the loop: the
ten come from conversations (8), the stranger the loop brings lands on a page (9), the loop
runs (10), the hand-off (11). Subject, not copy: the diagnostic that splits traffic from
conversion; the one-sentence line, pointing back to SPEC.md's WHAT; the stranger's read as a
procedure the reader runs on their own page; the AI-generic look as a conversion problem
(cut G's r/SaaS post "How to make your UI not look vibe coded?" is the evidence, in the
business room). One pre-flight card. Two companion files: a page-read checklist and a
one-sentence template. Title without the method word in the reader's face; "AI-built" in the
dek is fine (cut G).

**Needs ruling?** Decision 1 and decision 2.

---

## 3. Cross-chapter items the evidence touches

- **The reader noun.** The cover kicker at `src/template.typ:526` reads "A field manual for
  solo builders"; `src/book.typ:14` carries the same phrase in the document title; all ten
  chapter-open spec rows read ("Reader", "Solo builders on AI tools"). The sales page moved to
  "solo founders" in Pass 98. Cut G: "solo founder" reaches 8 of 567 asking authors, all in
  the business room, and beats every rival; "solo builder" reaches 1. Propose: the twelve
  reader-facing strings say founders; "solo build", "solo scale" and "solo-builder security"
  describe the work and stay. Decision 4.
- **The sample delivery chain.** `package.json` build:sample compiles `src/chapter-01.typ`;
  `scripts/publish-to-site.mjs` JOBS[2] writes `lib/chapter1-pdf.ts`. Site side, from the
  Pass 98 brief section 8.4: `page.tsx:83` free flag, `:288`, `:470`, `:490`, `:495-497`,
  `:616`; `app/actions/playbook-signup.ts:62, 63-79, 106, 108` (the email's subject line is
  "Chapter 1 of The 80% Wall"); `PlaybookSignupForm.tsx:58, 77`. Book side: chapter 8's six
  edits, `chapter-09.typ:74`, `chapter-10.typ:190`. Two repos, one brief each.
- **Gated or ungated.** Cut F fetched the Show HN rules at source: "For books, a sample
  chapter is ok", while sign-up pages are off topic and makers are asked to drop barriers
  such as signups or emails. The email-gated chapter fails Show HN twice; an ungated chapter
  passes on its face. Product Hunt's bar is cleared by the 27-file companion pack, not by a
  chapter. Decision 3.
- **The count strings.** "Ten chapters" and "of ten" appear in every chapter-open Status row,
  in chapter 1's colophon ("Nine more chapters"), on the cover, and on the sales page and its
  metadata ("Ten chapters, 69 pages, 26 files"). "69 pages" appears on the page three times.
  A new chapter moves all three numbers. The brief carries the grep and the expected count.
- **The companion count is wrong on the site, and the site's correction was made against the
  wrong artifact.** Decoded from the site's own `lib/companion-zip.ts`, the ZIP a buyer
  receives today has 27 entries: a README, 10 checklists, 6 prompts and 10 templates,
  including `DATA-ROOM.md-template.md`. The site's LESSONS #3 entry dated 2026-09-04 says 26
  entries and nine templates; its probe ran against `product/playbook/output/`, the frozen
  ZIP from August 31, which predates Pass-78. The page says 26 and "Nine templates".
  Decision 6.
- **The $149 anchor.** `chapter-06.typ:120`, `chapter-01.typ:260`, and the site's spec card.
  Decision 7.
- **The frozen copy.** `product/playbook/src/` in this repo is stale; the site's claims gate
  finds 10 findings in it that the book repo does not have. Nobody edits it. `npm run
  publish:site` from the book repo refreshes it after the book changes, then the site builds
  and deploys on your approval.

---

## 4. Decisions, numbered

Rule on these before any Typst is touched. Each carries the recommendation and the evidence
line it rests on.

1. **How far the balance shifts.** Light touch, plus one chapter, or rebalance.
   Recommendation: plus one chapter, light touch as its floor, rebalance rejected. Section 0.
2. **Where the new chapter sits and what that costs.** Recommendation: as chapter 9, "the page
   they land on", which renumbers the loop to 10 and the hand-off to 11 and moves every "ten
   chapters" string. The cheaper alternative, folding the conversion material into chapter 8
   as a section plus one companion file, keeps the count at ten but weakens the coupling to
   the Pass 99 offer and gives Show HN no artifact of its own.
3. **The sample: chapter 8, gated or not.** Recommendation: chapter 8 is the sample; the
   emailed PDF stays for the list, and an ungated copy of the same chapter is published for
   Show HN and search. Site-side, so it is the other session's build; the book side only
   needs the standalone edits.
4. **The reader noun.** "solo builders" to "solo founders" on the cover, the document title
   and the ten spec rows. Follows ruling B; the book should not contradict its own sales page.
5. **"twenty years of selling", `chapter-08.typ:59`.** Unledgered. Either supply the number,
   which then enters both ledgers with today's date, or accept a no-number rewrite ("since I
   first carried a quota" uses a phrase already at line 90). NEEDS OPERATOR INPUT.
6. **The companion count, both repos.** 27 entries and ten templates ship today. Rule what the
   page counts, and correct the site's LESSONS #3 entry of 2026-09-04 in the site session,
   noting that its probe read the stale frozen ZIP.
7. **The $149 trigger.** A date or an interval after launch, or remove the tier. Moves
   `chapter-06.typ:120`, `chapter-01.typ:260` and the site's spec card together.
8. **An early-reader program, because the book has never sold and cut C found nobody who
   reports buying one.** Recommendation: the full manuscript to a small number of people who
   already asked for the sample, in exchange for a reply; quotes only with written consent;
   nothing invented. Whether, how many, and when are yours.
9. **The phrase bank.** Cut G's two entries, printed in its file in the bank's own shape,
   replace the two kills in `../research/01-APPENDIX-phrase-bank-attested.json`. Site session.
10. **Ten minutes with a browser.** Cut F could not fetch any subreddit's rules (Reddit refused
    every fetch), so the five business-room rules are UNVERIFIED and they decide the launch
    ranking. Read the five sidebars before any launch motion; then the cut's script re-runs
    with corrected gates.

---

## 5. Not proposed, and why, so it is not re-added

- **Compressing or reordering chapters 1 to 7.** Cut C does not fire the trigger; cut D says
  the engineering half sells on depth or not at all; cut E says the subjects are crowded, not
  unwanted; every chapter cross-references the ones before it, so reordering is a rewrite.
- **Renaming the book.** "The 80% Wall" collides with Addy Osmani's "80% problem" as a search
  term (the Fable leg), but the r/buildinpublic inversion gives the title a second face for
  free. Leave it.
- **"Vibe coding" in the title or as the reader noun.** 7 of 261 in the business room, one
  short of the bar, and one asking post in five uses it to dismiss. The word may describe the
  work in a dek; it never describes the reader.
- **A pricing chapter or a pricing-page section.** Zero of 567 asking authors say "pricing
  page". Bare "pricing" is 21 of 261 and is a what-to-charge question, a different book.
- **A page-builder or tool chapter.** 4 of 34 asking authors wanted building help; nobody asked
  which tool; Framer, Webflow and Carrd are named by zero asking authors.
- **A new chapter-10 artifact.** DATA-ROOM.md already ships; the page is full.
- **Reader quotes, user counts, benchmarks.** None exist. Decision 8 is the only path to the
  first one.
- **"It shipped. Nobody came." presented as market language.** It is the author's sentence,
  attested nowhere in the corpus (the phrase bank killed it correctly). It stays as chapter
  8's heading, which is the author speaking. The attested beats are "crickets", "kept running
  into" and "landing page".
- **Softening "HIPAA-compliant", naming a vendor, describing how Ordani's protections work.**
  Standing rules; the claims gate is green at 38 files and stays that way.
- **Cut (h) and a new crawl.** No positioning chapter in any option; the only crawl worth
  running would fetch comment bodies for the 284 business asking posts.

---

## 6. The arc after the rulings

One brief per pass in `Code/the-80-percent-wall/.claude/briefs/`, exact strings and a
rejected list, executed by Opus, judged by Fable at three checkpoints.

- **Pass A, the light touch.** Chapter 8's six standalone edits; chapter 1's opener; the
  reader noun on twelve strings; `chapter-09.typ:74` and `chapter-10.typ:190`; build:sample
  and JOBS[2] re-pointed; the count strings if decision 2 adds a chapter. Gates: `check.py` on
  every touched chapter, `npm run gate`, `check:companion`, `check:footers`, `check:layout`,
  `check:filecards`, the TOC-versus-sales-page page sweep with expected output.
- **Pass B, the new chapter.** Chapter 9 and its two companion files, written as strings in
  the brief. Same gates, plus the companion ZIP rebuild and the page count restated
  everywhere it appears.
- **Fable checkpoints.** The built PDF walked page by page as pixels, not text; the sample
  chapter rendered and emailed to you through the live path; the claims gate green.
- **Cross-review** of the assembled PDF with the Codex leg now on gpt-6-astra at ultra, via
  the harness in both repos. A CONFIRMED block-class finding blocks the ship, not the build.
- **Publish.** `npm run publish:site` from the book repo, then the site's build and deploy on
  your written approval, quoted with its date in the resume before the command runs.
