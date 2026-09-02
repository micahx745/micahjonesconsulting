# Launch plan — "The 80% Wall"

**2026-09-02.** Built from an external audit the operator commissioned, plus an
independent verification pass run here against primary sources. This file records
what survived that check, what did not, and the decisions only the operator can
make.

Rule for this file: a claim is only actionable if it carries a primary source.
The audit was useful and largely careful, but two of its load-bearing pieces did
not survive, and one of those was its pricing foundation.

---

## 1. What is confirmed, from primary sources

**Product Hunt will not feature the page as it stands.** Its featuring
guidelines exclude "Waitlisted products (unless immediate access is provided)"
and state "We only feature products that are currently available."
Source: help.producthunt.com/en/articles/9883485

**Show HN is closed to the book, but a sample chapter is explicitly allowed.**
The official rules say "Show HN is for something you've made that other people
can play with", and that "blog posts, sign-up pages, newsletters, lists, and
other reading material… can't be tried out, so can't be Show HNs." Then the
carve-out that matters: **"For books, a sample chapter is ok."** And the
constraint that matters more: **"Make it easy for users to try your thing out,
ideally without barriers such as signups or emails."**
Source: news.ycombinator.com/showhn.html

**Hacker News tolerates self-promotion in moderation**, not as a primary use:
"It's ok to post your own stuff part of the time, but the primary use of the
site should be for curiosity." Source: news.ycombinator.com/newsguidelines.html

**The positioning collision is real.** See section 3.

**Comparable prices**, fetched live:

| Product                         | Price              | What is in it                                                         |
| ------------------------------- | ------------------ | --------------------------------------------------------------------- |
| Crafting Interpreters (Nystrom) | $39.95 ebook       | Plain technical ebook, no extras, famous author, free web version too |
| Refactoring UI Essentials       | $99                | 218-page PDF **plus three video tutorials**                           |
| Refactoring UI Complete         | $149               | Above plus component gallery, palettes, font showcase, 200 SVG icons  |
| Wizard Zines bundle (Evans)     | $145               | 15 zines, no future-updates promise                                   |
| Joy of React (Comeau)           | $249 / $399 / $599 | Video course, exercises, community                                    |

**"Every future edition included" is well precedented.** It is the platform-wide
default on Leanpub: "Everyone who buys a book on Leanpub gets free updates for
the lifetime of the book." Comeau and Dodds make the same promise on their
courses.

---

## 2. What did NOT survive verification

**The audit's pricing foundation is not credible.** Its Gumroad figures (ebooks
averaging $50.91, software development the top category at $39.95, a $30-49
sweet spot, a $99-149 premium tier tied to community or Q&A) all trace to a
single SEO site republishing itself across near-identical pages. That site's own
methodology admits the numbers are estimated from ratings counts with a ±15-25%
error band, and its figures contradict each other. **Do not plan pricing on
those numbers.** The live comparables in section 1 are the real evidence.

**Every Reddit rule in the audit is unverified.** Reddit is blocked from this
environment entirely, including old.reddit.com and archive mirrors. That means
the two highest-stakes claims could not be checked:

- r/cursor banning "paid content that you yourself own". The exact phrase does
  not appear in any secondary source found either, including blogs that exist
  to catalogue subreddit self-promotion rules.
- r/SideProject forbidding links to a waiting list or email gate. Only an
  undated third-party paraphrase was found.

**Check both in a browser before posting anywhere.** A wrong call here gets an
account banned from the community it most needs.

**The audit conflated two different Indie Hackers.** The "one SHOW IH post per
product" rule it cites belongs to the r/indiehackers subreddit, not to
indiehackers.com. On the platform itself, "Show IH" is just a common title
convention with no documented one-post limit.

---

## 3. The positioning problem, which is the real finding

Addy Osmani published **"The 80% Problem in Agentic Coding"** on 28 January 2026,
building on Karpathy's line about going to "80% agent coding and 20% edits."
His argument: the agent "wrote code that works… did not write code that
survives," and the missing part is rate limiting, observability, retry and
backoff, audit logging, PII handling, input sanitisation.

**That is functionally this book's thesis.** Same mechanism, same gap, same
number.

His earlier "The 70% problem" (December 2024) was a genuine hit: 649 points on
Hacker News, 433 comments, syndicated by Pragmatic Engineer and Zed. The phrase
"stuck at the 80% wall" already appears in marketing content from several
vendors describing this identical phenomenon.

No book holds the title, so there is no legal conflict. The problem is search
adjacency and perception: a buyer searching this space lands on Osmani's
framing plus a swarm of derivative guides, and a $99 book with this title risks
reading as an echo of a famous free essay.

**Three honest ways through, in order of preference:**

1. **Own the operational half.** Osmani names the problem; almost nobody ships
   the runbook. The book's real asset is 26 working files, 13 dated build-log
   entries, and tool-specific procedures. A subtitle that stakes that claim
   turns adjacency into positioning: the essay diagnoses, this is the manual.
2. **Cite him deliberately.** Position the book as extending a conversation the
   reader already knows, and link it. Riding a live term openly beats hoping
   nobody notices.
3. **Change the title.** Most expensive: the cover, the site, the domain
   language and the design system all carry it.

Doing nothing is the only option that is actually risky.

---

## 4. Pricing: the honest read

The operator has decided **$99**, and the live Stripe catalog is built at $99.
This section records the evidence against, so the decision is informed rather
than relitigated.

The comparable at $99 (Refactoring UI Essentials) **includes video**. The
comparable that is a plain PDF from a well-known author (Crafting Interpreters)
is **$39.95, with a free web version alongside it**. This product is a static
68-page PDF plus files, from an author with real credentials but no sales
history and no audience.

What would earn $99 honestly, given that:

- Put the 26 companion files and the lifetime-updates promise at the front of
  the value stack, not in a spec row. They are the difference between a PDF and
  a toolkit, and right now the page under-sells them.
- Or launch nearer $49 and build a genuine $99-129 tier above it with something
  real added, rather than pricing the base on borrowed credibility.

On the "$99 now, $149 later" ladder: **no evidence exists either way** about how
technical buyers react to a pre-announced increase. What is established is that
this audience is unusually sensitive to manufactured urgency. A transparent,
dated increase is defensible; the same line with no intent behind it is not.
That decision is still open and has been for several passes.

---

## 5. What the page needs before any channel will take it

Verified constraint: Product Hunt requires immediate access, and Show HN
requires no signup or email barrier but explicitly permits a book's sample
chapter.

The page today has **no ungated readable artifact**. Every plausible sample URL
returns 404, and the only action is the email form. The raw material is already
there and ungated — a real interior spread, the companion card, a full
build-log entry, and the prompt diff quoting the book's own text — it is simply
not assembled into something a stranger can read end to end.

**This does not require giving up the email gate.** The operator kept it
deliberately. Both can be true: chapter one stays gated as the email offer, and
a separate standalone artifact goes up ungated as the thing that gets posted.
Every documented launch in the audit used exactly that shape.

---

## 6. Sequence

1. Build the ungated artifact. A readable web version of the strongest single
   idea, standing on its own, linking to the book.
2. Confirm the Reddit rules in a browser. Nothing gets posted there until then.
3. Flip the Stripe button. Product Hunt and Show HN both need real availability.
4. Only then: the free-artifact post on Hacker News as content, never as a Show
   HN, and the permissioned community posts.
5. Paid newsletter reach last, and only once something has converted.

---

## 7. Open, operator-owned

1. **The title and subtitle**, given section 3. This is the biggest one.
2. **Price**: hold $99 with the value stack pulled forward, or restructure.
3. **The "$149 after" line**: a real dated increase, or remove it.
4. **What the ungated artifact is.** Chapter one as a web essay, or a narrower
   standalone piece drawn from it.
