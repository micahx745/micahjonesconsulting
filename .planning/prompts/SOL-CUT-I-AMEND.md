# Sol task: Cut I, amended. The liveness gate caught a real change; fix the population, not the denominators.

You are in `C:/Users/micah/Code/reddit-research`. You wrote `cuts/cut_i_blog_titles.py`; its liveness check failed
correctly: `data/corpus.jsonl` was re-scanned on 2026-09-06 and now holds 20,734 lines from 20 sources. The main session
measured: the ten sources Cut E analysed (`compare_rooms.BUSINESS` + `compare_rooms.DEV`, matched on each row's `sub`
field) hold exactly 5,456 lines, Cut E's raw count. The other ten sources (ShowHN, AskHN, micro_saas, roastmystartup,
SaasDevelopers, founder, Solopreneur, forhire, GitHub, DevTo) were added after Cut E.

## Change the script to run TWO populations, in this order
1. POPULATION E (comparable to Cut E): keep only rows whose `sub` is in BUSINESS or DEV, THEN run the unchanged
   liveness check against Cut E's denominators (5,456 / 4,464 / 3,842 / 607 / 567 / 284 / 261 / 323 / 307). If ANY
   still differs, stop and report exactly as before. Do NOT edit the expected values.
2. POPULATION ALL (every source): the same pipeline over all 20,734 lines. No expected values exist; PRINT its own
   denominators (raw lines, analysed posts, distinct authors, ASKING posts, distinct ASKING authors, and ASKING posts
   per source) as a table titled "Population ALL denominators (new, not comparable to Cut E)". For the biz/dev split
   column in ALL, use three buckets: business (BUSINESS), developer (DEV), other (the ten added sources).
3. For each population: the baseline row, the 15-intent summary table and the THIN flag, as specified before. Quotes
   (max three per intent, same rules, no handles/ids/URLs/source names beside a quote) come from POPULATION ALL, and
   each quote may be followed by one bracket naming only its population bucket: [business], [developer] or [other].
4. Keep everything else from the original brief (lexicons unchanged, patterns printed, UTF-8 file write, Limits). Add
   one Limits line: "Population ALL mixes Hacker News with Reddit; num_comments is the reply count on both."

Run `.venv/Scripts/python.exe cuts/cut_i_blog_titles.py` and report: exit code, the Population E liveness table, both
summary tables, verbatim. Edit only `cuts/cut_i_blog_titles.py` and its `.md` output. No network, no git.
