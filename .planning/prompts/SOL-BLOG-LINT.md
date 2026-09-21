# Sol task: write the blog AI-tell lint (a same-day gate for LESSONS #3 "BLOG 1 REJECTED AS AI-SOUNDING"). ASCII only.

Write `.planning/exec/blog-lint.mjs` (Node, no dependencies). Usage: `node .planning/exec/blog-lint.mjs <post.md>`;
`--self-test` runs the fixtures below. Read the file as UTF-8. Ignore fenced code blocks, tables and link URLs.
Checks (each prints PASS/FAIL with the offending lines, quoted, max 5 per check):
1. FRAMEWORK NOUNS: any of (case-insensitive, whole phrase): "qualified visit", "useful result", "first useful result",
   "request to continue", "path to value", "segment evidence", "north star", "leverage", "unlock", "game-changer",
   "at the end of the day", "the bottom line", "in today's", "journey", "seamless", "robust", "delve". FAIL on any.
2. BRAND BANNED WORDS: every word in `.claude/brand.json` -> `voice.banned` (whole word, case-insensitive). FAIL on any.
3. FRAGMENTS IN THREES: three consecutive sentences each of 4 words or fewer. FAIL on any.
4. MORAL ENDING: the last paragraph starts with "The lesson", "In the end", "Ultimately", "The takeaway", "Remember". FAIL.
5. BULLET DENSITY: bullet or numbered-list lines over 30% of non-empty prose lines. FAIL.
6. SENTENCE LENGTH: average words per sentence over 22, or any sentence over 40 words. FAIL.
7. LENGTH: more than 1,500 words of prose (excluding headings). FAIL.
8. EM-DASH (U+2014) anywhere, or the words "we", "our", "us" outside quoted lines. FAIL.
9. UNTICKED TAGS: any "[TAG" left in the text. FAIL (tags must be ticked or struck before a post ships).
Exit 0 only if every check passes. Last line: `BLOG-LINT: <n> failures`.
SELF-TEST (must print `BLOG-LINT SELF-TEST: PASS`): (a) the rejected draft
`.planning/drafts/blog-01/POST-blog-01.md` must FAIL check 1 and check 5 (it uses "qualified visit" and is list-heavy);
(b) a built-in clean fixture of three plain paragraphs (write one, ASCII, about 120 words, no lists) must pass all checks.
Run `node .planning/exec/blog-lint.mjs --self-test` and `node .planning/exec/blog-lint.mjs .planning/drafts/blog-01/POST-blog-01.md`;
report both outputs verbatim. Create only that one script. No git, no bash. Never call a failure expected.
