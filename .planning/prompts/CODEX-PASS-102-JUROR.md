You are the JUROR for Pass 102, the wording round of a one-person go-to-market consultancy
site (micahjonesconsulting.com), on branch `design/room-and-ledger`. Two drafters produced
proposal tables independently from the same evidence; you judge both as the buyer and as an
editor, and you do not write copy of your own.

## Read first
- The brief: `.claude/briefs/pass-102-wording-round.md` (§0 rules, §4 your step).
- Table 1 (GLM 5.3): `.planning/copy/PASS-102-PROPOSALS-glm.md`, with its reading
  `.planning/copy/PASS-102-READING-glm.md`.
- Table 2 (Codex, earlier run): `.planning/copy/PASS-102-PROPOSALS.md`, with its reading
  `.planning/copy/PASS-102-READING.md`.
- The evidence they drew on: `.planning/research/01-REDDIT-EVIDENCE.md`,
  `.planning/research/01-APPENDIX-phrase-bank-attested.json` (attested and killed phrases).
- The voice rules: `.claude/brand.json` (voice.banned), `.claude/CLAUDE.md` § Voice; the
  claims ledger `docs/LESSONS_LEARNED.md` §3 (NEVER-phrases).
- The pages as they stand: the 390-wide screenshots attached to this prompt (home, packages,
  work, about, call, playbook).

## Constraints that are NOT up for review
No new facts, numbers, names or quotes. The industry author is never named. Prices, the
proof line and ledgered numbers do not change. First person. The banned words are banned.

## What I want, in this order, as Markdown to stdout
1. THE BUYER READ, per page, thirty seconds, with the CURRENT copy and then with each
   table's proposals applied: what they know, believe and do; where they lose the thread.
2. THE VERDICT TABLE: one row per proposal across BOTH tables (dedupe identical proposals,
   note where the two drafters disagree): `page · CURRENT · proposal (which table) ·
   verdict (ACCEPT / REJECT / REWORD-NEEDED) · reason in one sentence · risk (fact / voice /
   register / none)`. Reject anything that reads as marketing rather than the buyer's own
   words, anything that adds a claim, anything that weakens a ledgered fact.
3. THE THREE STRINGS PER PAGE that decide the click, and whether either table improves them.
4. THE HEADLINE QUESTION, answered plainly: the corpus shows buyers do not say
   "go-to-market"; the site's headline is "I build the go-to-market." One table proposes
   alternatives. Is changing the headline word right for a buyer arriving from those threads,
   or does the headline name what he sells while the body speaks the buyer's words? Give
   the argument each way and your call.
5. THE KILLED PHRASES still live ("It shipped. Nobody came.", "solo builders", "solo
   founders", "vibe-coded"): for each, the proposed replacement and whether it holds the
   sentence's meaning and the voice.
6. WHAT NOT TO TOUCH: strings both tables mark KEEP that you would also keep, in one list.
Cite thread ids and phrase ids from the readings. Be specific; no restating the brief.
