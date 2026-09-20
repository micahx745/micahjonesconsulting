# Prompt for a Claude chat (Fable, research + extended thinking on): the voice, the site copy, and the blog

Written 2026-09-20, after the operator read the live site and said the wording is **"very AI, wordy, and
not enticing to want to do work with me."**

Three things shape this prompt, and they are the reason it is not just "rewrite my copy":

1. **He delegated the hardest question.** Asked how the page should handle an audience that runs from a
   solo birth worker to an enterprise security company, he answered: *"i want claude to research and
   ultrathink on this one to figure out the direction here."* So the audience ruling is deliverable #1,
   not an input.
2. **The scope grew in his own words.** *"research some of the best online business writers. look at
   sub stacks and posts. consider the reddit scrapping data we have too. think about SEO - want to get
   lots of impressions and be top search results for things. ANother thing that should be apart of this
   is blogs. We need to write some blogs and i want to have a perfect voice too."*
3. **There is a third buyer nobody had written for.** Asked what a convinced visitor should do, he said:
   *"pay for an engagements (email me), pay for the cheaper packages, and/or contact me for a coporrate
   job."* A hiring manager is a different reader from a founder buying a $500 session, and the site has
   never been written with that reader in mind.

**The discuss lock (playbook non-negotiable #1) is satisfied for anti-patterns and the ask, and
deliberately NOT satisfied for audience and reference voice — he handed both to the research.** Do not
treat that as licence to skip the question; treat it as the question.

**Why this prompt withholds the current copy's framings.** The Reddit research package
(`.planning/research/01-REDDIT-EVIDENCE.md` section 0) records a methodological failure worth not
repeating: an earlier pass searched Reddit for the operator's own sentences and reported that strangers
used them. "The book became the site copy, the site copy became the search patterns, and the patterns
found the book." So this prompt tells the chat to read the live site as a *suspect*, and seeds it with
no framing from that site that has not survived independent evidence.

---

## Before you paste: attach these four files to the chat

They are the evidence base and the rule source, and the prompt refers to them by name.

- `.claude/brand.json` — carries the enforced banned-word list under `voice.banned`, the audience
  field, and the preferred verbs. **Attached rather than copied, on purpose:** a banned list pasted
  into a prompt is a second copy that goes stale, and this repo has been bitten by exactly that.
- `.planning/research/01-REDDIT-EVIDENCE.md` — 5,456 posts, ten subreddits, twelve months
- `.planning/research/04-CUT-C-would-pay-revealed.md` — what people revealed they would pay for
- `.planning/research/04-CUT-E-answered-ratio.md` — answered vs unanswered questions, i.e. open SEO slots

If the chat wants a cut of the corpus that does not exist yet, it should say so — the corpus is local
(`C:/Users/micah/Code/reddit-research/data/corpus.jsonl`) and a new cut takes seconds and costs nothing.

---

# PROMPT 1 — paste this first

I need you to research hard and then rule on the voice, positioning and copy for my consulting website,
**micahjonesconsulting.com**. Please read the live site first. I think the writing on it is wordy,
generic, and reads like it was written by an AI. I do not want you to defend it or gently tighten it. I
want you to tell me what is actually wrong and what should replace it.

Use extended thinking. Do real research — read actual writers and actual sites, not what you already
assume about consulting copy.

## Who I am, and what is true

Micah Jones, an independent operator in Oakland, California. Thirteen years inside B2B software. I do
three things for companies: **AI engineering** (building AI systems that survive production, not
notebooks), **product building** (I build the whole thing: strategy, design, code, security, launch),
and **positioning and go-to-market**. I also founded and built **ORDANI**, a HIPAA-compliant CRM for
birth workers (doulas, midwives).

**Everything below is verified and approved. Use only these. Do not invent, embellish, round, combine,
or "improve" a single number, client, quote or outcome. If a sentence you want to write needs a fact
that is not on this list, ask me for it instead of writing it.** These have been through a long
verification process and several earlier versions were retired for being wrong. A nicer-sounding
statistic is the single most damaging thing you could hand me.

**About me, across clients**
- $20M+ in revenue behind my work. (Exact wording. Not "consulting revenue" — it spans employed work
  and consulting. Never close the range with dates.)
- Thirteen years in enterprise software. (Never "a decade.")
- Four companies I worked inside reached an exit: SurveyMonkey (Nasdaq IPO, 2018), Postmates (acquired
  by Uber, $2.65B, 2020), Guardicore (acquired by Akamai, 2021, $600M), Neuton.AI (technology acquired
  by Nordic Semiconductor, 2025). The umbrella verb is "worked inside" — never "helped build," because
  Postmates was employment.
- $5B+ combined across the disclosed deals. Neuton's price is undisclosed and contributes nothing.
- SurveyMonkey and Guardicore carried my name on the cap table.
- SurveyMonkey: enterprise sales, $1M+ toward the IPO.
- Postmates: product analyst, market and fraud analysis.

**Guardicore** (real name, may be used)
- $14M in revenue, sourced and closed. $1.2M average enterprise deal.
- The pitch led with honeypots. Buyers could not see the east-west traffic between their own workloads,
  and seeing inside the environment was what they signed for. I found that, moved the story, and sat in
  the deals.
- Built in Tel Aviv; buyers were North American enterprises, describable as a top-10 North American
  bank, a globally systemic bank, a federal research agency, a white-shoe Wall Street law firm, a major
  U.S. utility. Never name a real customer beyond these descriptors.
- Trillions in financial assets sit protected behind those deployments.

**An award-winning author and leadership consultant** (anonymous, "name protected")
- I built RFP software: it finds the RFPs worth answering, weighs each against twenty years of their own
  published work, and has a drafted response waiting by morning.
- $3M in signed contracts. **Never state a count of contracts or awards.**
- Close rate from about one in eight to one in four of submitted proposals, inside six months.
- Responses out per month: two or three, then eight to ten.
- First real RFPs delivered on day three. (Day three was arrival — never say the software "scored"
  anything by day three.)
- First drafts in hours instead of days.
- Contracts now come from buyers outside their existing network and outside their home state. This
  client was **not** repositioned; do not say that.
- Their quote, exact, attributed to "The client, name protected": *"Micah does the work that most
  strategy decks promise and never deliver."*

**A social activist** (anonymous; never name the cause or industry)
- An AI content engine: one rough video becomes the week's work, meaning finished videos, the blog post,
  and the marketing flow for the idea it argues. Eight platforms.
- A peak of 800,000 impressions in a month, up from a few thousand a month. **"800,000" is one peak
  month, never a recurring rate.**
- One income stream became four: books, services, speaking, courses.
- A 25-page platform strategy their content lead now runs without me.

**A birth worker** (anonymous)
- Bookings went from one to three a month to five to ten. (Both sides are bookings, not inquiries.)
- Requests now come across her whole range instead of one service. **Never itemize the range.**
- Thousands of dollars kept that used to go to claims-processing fees, because I set up direct Medicaid
  claims. **Medicaid, never Medicare.**

**ORDANI** (my own company)
- "Birth workers keep hundreds of dollars per client that a claims service would take." Per *client*,
  never per claim.
- Active paying users, in beta, public release coming, none lost to a competitor. **No user counts or
  practice counts, ever.**
- HIPAA-compliant. Built with birth workers and security experts.
- It puts claims inside the calendar they already keep: it builds the claim from visits already on the
  calendar and checks it before it goes out, so fewer come back rejected. Filing comes with the
  subscription — never say "free."
- The mission behind it: lower infant mortality by giving the people who care for mothers and babies
  better tools than paperwork. CDC 2024: 44.8 maternal deaths per 100,000 live births for non-Hispanic
  Black women against 14.2 for non-Hispanic white women, a rate ratio of about 3.15.

## What I sell

**Fixed-price packages, no call needed:** The Unstick Session, $500 — 90 minutes live on your stuck
build, you leave with a written plan the same day. The Audit, $2,500 — two weeks, an 8-10 page memo on
what works, what is broken and what to fix first, plus a prioritized fix sequence and a debrief call.
The Sprint, $7,500 — one week on one outcome, shipped.

**Engagements, scoped on a call:** Advisory from $5K a month. Project, 6-20 weeks. Retainer, six months
then month to month. Embedded, 3-8 months at 3+ days a week, acting as head of GTM, product or AI
engineering.

Every package fee credits toward a bigger engagement started within 60 days.

## The three things I want a visitor to do

Ranked how I think about them, though part of your job is to tell me if this ranking is wrong:
1. Buy a package, self-serve, no call.
2. Email me about an engagement.
3. **Contact me about a full-time corporate role.** This is real, and the site has never been written
   with that reader in mind. A hiring manager reading a page built to sell $500 sessions is a different
   problem, and I want your ruling on whether one page can serve all three or whether something has to
   move.

## What makes me close a consultant's tab

I was asked which voices I cannot stand, and picked two:
- **Humble-brag storytelling.** Long personal narrative arcs, "here's what I learned," the LinkedIn
  essay that takes four paragraphs to reach a point.
- **Jargon-dense insider writing.** Precise but a wall to anyone outside the niche. My own case studies
  are guilty of this: "east-west microsegmentation," "bid/no-bid scoring."

I did not object to plain confidence or to directness. I object to padding and to walls.

## THE QUESTION I MOST WANT YOU TO ANSWER

My five clients run from a solo birth worker to a Tel Aviv enterprise security company. My own brand
file names the audience as *"Founders of $5-50M companies who care about how their brand actually
looks; and Black HR consultants, doulas, birth workers, and equity practitioners — the people my work
serves."* An older internal doc set the bar as: *"A primary-audience visitor — a Black HR consultant, a
doula, a birth worker — feels welcomed in the first ten seconds. That is the only test that matters."*

I was offered four ways to handle that range: lead with one buyer, lead with the shared problem, put
two doors near the top, or keep addressing everyone. I did not want to pick from a list. **I want you
to research it and think hard, then rule.** Add the full-time-role reader to the problem. Tell me what
the page should actually do, why, and what it costs me.

## Evidence you should use, and one warning

I have attached real research: 5,456 Reddit posts from ten subreddits over twelve months (September 2025
to August 2026), plus two analysis cuts. Please use it, and read its section 0 first — it is honest
about what the numbers can and cannot support. The findings that bear on copy:

- **The pain and the money are in different rooms.** In business subreddits 52% of people asking for
  help mention money, but they are stuck on distribution. In developer subreddits 35% hit an engineering
  wall and only 14% mention money at all.
- **"It shipped. Nobody came." is roughly nine times more prevalent than the regression loop** — and
  the regression loop is what my current copy leads with. The word `crickets` appears in 8.9% of
  r/buildinpublic asking-posts; a phrasing-free proximity test for the "everything I fix breaks
  something else" pattern found 1.0%. My homepage currently says *"The demo took a weekend. The last
  20% is eating your month."* The data says that is not the sentence in people's heads.
- **The beat is real but the wording is not mine.** `kept running` and `keep running` carry the two
  highest lift scores in the whole dataset (7.3× and 13.4×). People say *"I kept running into…"*
- **"landing page" is the single largest distinctive business term** (27 distinct authors). It sits
  exactly between building and selling, which is exactly where I sit.
- **The buyer writes quiet posts.** The 37 posts where someone is stuck AND names an engineering blocker
  AND talks about money scored 27, 0 and 1 while drawing 13, 14 and 47 comments. Any sampling that ranks
  by popularity misses them entirely.

**The warning:** an earlier research pass searched Reddit for my own sentences and reported back that
strangers used them. That was confirmation by construction. Do not validate my existing copy against
the corpus. Start from what people actually say.

## Voice constraints that are mechanically enforced

My build fails on these, so copy that breaks them cannot ship:

- First person singular. "I", never "we" — I am one person.
- Average sentence length at or under 25 words; anything over 35 gets rewritten.
- **At most one em-dash per page.** Em-dashes are an AI tell.
- Named numbers, never vague impact language.
- A list of 37 banned words and phrases, in the attached `brand.json` under `voice.banned`. Read it and
  treat every entry as unusable. It is mostly consultant filler and AI tells. The same file's
  `voice.preferred_verbs` gives the seven verbs I like: build, ship, rewrite, cut, tune, bet, show.

Worth knowing: the automated checks are already clean on every page. No banned words, consistent first
person. **So whatever reads as machine-written is not something a word list can catch.** My own reading
is that it is rhythm and structural sameness: numbered "01 / 02 / 03" principles, a repeated "Ask about
X →" formula, stacked bullet sections, and headings like "Operating principles" and "Every engagement
includes" that sound like a template rather than a person. Test that reading. You may find something
better.

Also off the table on the sales pages, by standing decision: no client logo wall, no "trusted by" bar,
no newsletter signup in the nav, no Calendly link in the first exchange, no budget dropdown on the
contact form, no stock photography or illustration.

## What I want back from this first round

1. **Your research on voice.** Who is actually writing well for business readers right now: Substacks,
   essays, product and consulting sites, anyone. Fifteen to twenty-five named sources with links, and
   for each, one line on the specific move that makes it work. I want to be able to go read them. Do not
   give me a list of famous marketers; give me writing you have actually assessed.

2. **Your diagnosis of my site.** Read the live pages. Quote the ten worst sentences and say exactly
   what is wrong with each: padding, abstraction, hedging, template rhythm, jargon wall, whatever it is.
   Be blunt. If a whole section should not exist, say so.

3. **Your ruling on the audience question**, including the full-time-role reader. What the page does,
   why, what it costs, and what would make it the wrong call.

4. **Three genuinely different voices.** For each, write **the same two things** so I can compare by
   ear: my homepage opening (headline plus the first short paragraph) and one paragraph of the
   Guardicore case study. Make them actually different, not three temperatures of one voice. Name each
   one and say who it wins and who it loses.

5. **The blog and SEO plan.** I want to publish and I want to rank.
   - Which questions should I write for? Ground it in the corpus: an unanswered question is an open slot,
     an answered one has an incumbent. The attached answered-ratio cut is the place to start.
   - Ten to fifteen specific pieces, each with its title, the search intent behind it, and the one thing
     only I can say about it that a generic post cannot.
   - What the blog voice is, and whether it differs from the site voice. Be explicit if it should.
   - What actually works for ranking in 2026 for a one-person site with real first-hand experience and
     no domain authority. Say plainly if some of it is slow or not worth doing.

6. **What would make your recommendation fail.** Honestly.

Do not write the full site rewrite yet. I want to pick the voice first.

---

# PROMPT 2 — after he picks a voice

Paste this once he has chosen, naming the chosen voice and pasting his reactions verbatim.

> I picked voice **[NAME]**. Here is exactly what I said about the three: **[paste his words]**.
>
> Now write the real copy in that voice, holding to every constraint from the first prompt, especially
> the fact list. Invent nothing. Where you want a fact I have not given you, write `[ASK MICAH: …]`
> inline instead of guessing.
>
> Write, in this order:
> 1. The homepage, top to bottom, every block labelled by what it is.
> 2. The About page.
> 3. The Services page, including how the three packages and the four engagements are described.
> 4. One case study in full, Guardicore, as the pattern for the other four, plus a short note on what
>    changes for the anonymous clients.
> 5. Every call to action on the site, and where each one sits.
> 6. The page or section that serves the full-time-role reader, per your ruling.
> 7. Titles and meta descriptions for each page, 130-155 characters, leading with the noun.
> 8. The first three blog posts in full.
>
> For each page, list the facts you used so I can check them against my ledger before anything ships.
> Then tell me which single change you expect to matter most, and how I would know within a month if you
> were wrong.

---

## Notes for the session that runs the result

- **Nothing from this comes back into the repo unverified.** Every number in returned copy is checked
  against `docs/LESSONS_LEARNED.md` item 3 before a single file is edited.
  `scripts/retired-phrases-gate.mjs` carries about 80 dated retirements and will fail the build on a
  reintroduced figure. Treat a gate hit as the writer reaching for a nicer stat, which is exactly the
  failure the fact lock exists to stop.
- **A voice change is a Pass, not an edit.** Scope it, get the direction ruling, brief it, then build.
  The operator rejects on sight, so he sees new copy in the real page before it ships, never only in a
  document.
- The em-dash cap only blocks the build on `.mdx` and `.md`. A `.tsx` page can carry two em-dashes past
  the gate and still be wrong; count them by hand.
- `content/site.ts` does not exist, despite `.claude/CLAUDE.md` naming it as the home of global copy.
  That copy lives inline in `app/(foyer)/page.tsx`, `components/color-worlds/Hero.tsx`, `Nav.tsx` and
  `PageFooter.tsx`. Correct the doc when the copy pass lands.
- The copy-lint hook rejects a file that merely *lists* the banned words, which is why this prompt
  points at `brand.json` instead of inlining them. That is the better design anyway: one source, no
  second copy to drift.
