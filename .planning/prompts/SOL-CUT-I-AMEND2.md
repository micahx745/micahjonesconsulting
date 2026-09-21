# Sol task: Cut I, round 3. The lexicons, not the data, produced the zeros. Rebuild them and PROVE the matcher first.

You are in `C:/Users/micah/Code/reddit-research`. Your amended `cuts/cut_i_blog_titles.py` passes Population E liveness
(good, keep all of that). But its lexicons are defective: intent 1 is
`\blaunched\b.{0,120}\bno users\b|\bshipped\b.{0,120}\bno signups\b|...`, which needs two exact phrases in a fixed order
in one window, so it matches 0 of 16,904 posts, while Cut E's single-phrase family "crickets, no signups, nobody signed
up" matches 4 ASKING posts in the same Population E. Most zeros in the report are artifacts of that construction.

## 1. PROBE PROOF (new, runs right after Population E liveness; stop and report if any row differs)
Recompute these Cut E families (import or copy their patterns verbatim from `cuts/cut_e_answered_ratio.py`, same
matching text and same ASKING set) on Population E and assert (ASKING posts, distinct authors) equals Cut E's published
values: deploy, production, works locally = 59/58 · auth, login = 47/45 · hire, co-founder, contractor = 44/43 ·
landing page = 35/34 · conversion rate, signups = 34/32 · real/first/early users, first customers = 29/29 ·
cold outreach, cold email = 13/12 · crickets, no signups, nobody signed up = 4/4 · hipaa, soc 2, gdpr = 0/0.
Print this as a table "Probe proof: Cut E families reproduced". Do not edit the expected values.

## 2. New lexicon rules (all 15 intents)
- A plain DISJUNCTION of short phrases (1 to 4 words each), 4 to 12 alternations. NO `.{0,N}` windows, no lookaheads,
  no pattern that requires two phrases together. Each alternation must, on its own, signal the reader's problem.
- Where a Cut E family expresses the intent, include its alternations verbatim: 1 <- crickets family and real/first/early
  users family; 3 <- landing page family and conversion rate, signups family; 4 <- cold outreach family; 10 <- hipaa,
  soc 2, gdpr family; 14 <- hire, co-founder, contractor family. Add your own generic phrases around them.
- Written from the reader's problem, generically (never from a blog title). Avoid single words so common they match
  everything (bare "production", "users", "launch", "clients" alone).
- For every intent print a "Top matching alternations" line: the up-to-5 alternations that matched the most ASKING
  posts in Population ALL, with counts, so an over-broad term is visible.

## 3. Everything else unchanged
Both populations, baseline rows, the summary tables with THIN flags, quotes from Population ALL (same privacy rules,
bucket tag only), UTF-8 file write, Limits. Add one Limits line: "Round 3 rebuilt the lexicons after round 2's
two-phrase windows matched almost nothing; the probe-proof table shows the matcher reproduces Cut E."

Run `.venv/Scripts/python.exe cuts/cut_i_blog_titles.py`; report the exit code, the probe-proof table and both summary
tables verbatim. Edit only `cuts/cut_i_blog_titles.py` and its `.md`. No network, no git. Never call a count intended.
