# Sol task: Cut I, the blog titles against the answered-ratio data. Offline, local, no network.

You are in `C:/Users/micah/Code/reddit-research` (the corpus repo). Python: `.venv/Scripts/python.exe`.
Model everything on `cuts/cut_e_answered_ratio.py` (read it first): its loading, its `clean()`, its `STUCK` asking
filter, its denominators, its answered definition (`num_comments > 0`), and its business/developer sub split.

## Why
A research memo proposed 15 blog posts for a one-person consultancy site and marked every title [CHECK CUT]: an
unanswered question is an open slot, an answered one has an incumbent. Your cut answers, per title: do askers in this
corpus raise that problem, and do they get replies?

## Write exactly two files
1. `cuts/cut_i_blog_titles.py` (plain ASCII source).
2. `cuts/cut_i_blog_titles.md`, WRITTEN BY THE SCRIPT with `open(..., "w", encoding="utf-8")`, never by shell
   redirection (the Windows shell corrupts non-ASCII).

## The script must
1. LIVENESS: reproduce Cut E's denominators and exit non-zero if any differs: 5,456 raw lines; 4,464 posts with
   `len(clean(body)) >= 250`; 607 ASKING posts; 567 distinct ASKING authors; 284 business / 323 developer ASKING posts.
2. For each of the 15 INTENTS below, one case-insensitive regex lexicon WRITTEN FROM THE READER'S PROBLEM as stated,
   generically, the way Cut E's "Families" were. Do not use any phrase from a title. Print every pattern in the .md.
   Allow 2 to 6 alternations per lexicon; prefer plain words an asker would type.
3. Match against `clean(title + '. ' + body)` over the 607 ASKING posts. Per intent report: matched posts; distinct
   authors; authors whose every matched post got 0 comments / authors (and that as %); median num_comments;
   business/developer author split. Also: matched posts in the WHOLE 4,464-post analysed set (demand context).
4. Baseline row: the same measures for all 607 ASKING posts, so each intent's 0-comment % reads against it.
5. Per intent, up to THREE verbatim question sentences from matched ASKING posts: the post title if it ends in "?",
   else the first body sentence ending in "?" that matches the lexicon. At most 25 words each (cut with "..."). NO
   author handles, NO post ids, NO URLs, NO subreddit names next to a quote. Prefer three different authors.
6. A "Limits" section: counts are public posts, "answered" means got replies (no comment bodies exist), and any intent
   under 5 distinct authors is labelled THIN, meaning too few to rank. A zero is weak evidence, not absence.

## The 15 intents (the reader's problem, in order; keep these numbers)
1. Launched or shipped a product and got no or almost no users, signups or customers.
2. The demo or MVP works, but taking it to production (deploy, reliability, scale) is where it fails.
3. The landing page gets visitors but does not convert.
4. A technical founder can build but cannot sell or do sales.
5. Pricing a fixed-scope or productized service when the scope is unclear.
6. Writing or keeping up with RFPs, proposals or bids; using AI to draft them.
7. A solo service provider (practitioner, coach, freelancer) cannot get enough clients or bookings.
8. Billing insurance or Medicaid directly as a solo practitioner; claims and billing fees.
9. Turning one piece of content (a video) into posts for many platforms without a team.
10. What HIPAA compliance actually requires for a small or solo team building health software.
11. A vendor or security term the asker does not understand (network visibility, internal traffic, zero trust).
12. Every fix breaks something else; regressions; the codebase fights back.
13. Finding or talking to real customers; validating demand; where buyers actually talk.
14. Whether to hire a fractional or embedded operator, an agency, a contractor or a full-time hire.
15. Whether an AI feature or LLM app is ready for production; evals, reliability, guardrails.

## Output shape of the .md
Title; the liveness table; one summary table (intent number, short intent name, asking posts, authors, 0c authors/%,
median, biz/dev, whole-set posts, THIN flag), sorted by distinct authors; then per intent: its pattern and its quotes;
then Limits.

## Report
Run: `.venv/Scripts/python.exe cuts/cut_i_blog_titles.py`. Report the exit code, the liveness table and the summary
table verbatim. If liveness fails, stop and report; do not adjust the denominators. Do not reinterpret a surprising
count as intended. Do not edit any other file, do not use the network, do not run git.
