# Drafting leg: two new case studies, Postmates and Neuton.AI

You are a drafter. You write two MDX files as DRAFTS in your reply. You do not edit the repo.
A reviewer checks every sentence against the facts below before anything is committed.

Repo (read-only): C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live
Read first, in this order:
1. lib/case-study-schema.ts, the frontmatter schema every case study must pass.
2. content/work/guardicore.mdx, the template: its frontmatter fields, its section rhythm,
   its sentence length, how it states a number with its mechanism.
3. app/(foyer)/page.tsx, the receipts ledger: search for "Postmates" and "Neuton". Every claim
   the home page makes about either company MUST appear in your case study (LESSONS #2: a
   summary card is a compression of its case study, never a second story).
4. docs/LESSONS_LEARNED.md entry #3, the verified-facts ledger. Obey every NEVER in it.
5. .claude/brand.json voice rules and lib/banned.ts, the banned words.

## The operator asked for these, verbatim (2026-09-11)

"postmates and neuton ai are positioning" and "Yea add it as other case studies and or work".

## Facts you may use. Nothing else.

POSTMATES
- The operator's title: "product analyst at postmates is the title" (operator, 2026-09-02).
  The home ledger renders it as "Product analyst" with the year 2020.
- Joined early (the ledger renders all four exits as "early").
- Acquired by Uber in 2020 for $2.65B (content/citations.ts).
- Umbrella phrasing for the four exits: "worked inside" or "behind my work". NEVER "helped
  build" for Postmates: it was employment, not a build claim.
- The operator's own account, verbatim (2026-09-10): "postmates they sold everything (lots of
  fraud would happen like someone would do a custom order of a hundred gallons of hennessy in
  the Bronx) helped them cut down and focus on a core offerings rather than the promise to
  deliver everything."

NEUTON.AI
- Role: "helped launch". NEVER claim equity or a cap-table position.
- Acquired by Nordic Semiconductor in 2025; the price was never disclosed. The year tag is
  2025 (operator, 2026-09-11: "for neuton 2025").
- Joined early.
- The operator's own account, verbatim (2026-09-10): "neuton ai - foreign company like
  guardicore needing help with North american positioning of an AI product (2020 early AI
  days) that led to them selling this company".

## Voice

First person singular ("I", never "we"). Sentences average 25 words or fewer; none over 35.
Active voice, except for outcomes ("Acquired by Uber in 2020" stays). Named numbers only
where the facts give them. No banned word from lib/banned.ts, and never "load-bearing". No
em-dashes at all. Plain, specific, confident; no hype.

## What to write

For each company, one complete MDX file: frontmatter that passes the schema (title, dek, role,
tools, year, status, titleCardWords of 3 to 6 words, client, order, feature, indexLine, and
any other field the schema requires), then a body that follows guardicore.mdx's section
rhythm but is SHORTER, because there are fewer facts. Build each story as: the situation, the
positioning problem, what I did, what changed, the outcome. Where the facts do not say
something, do not fill it in. A short, true case study beats a long one.

## Then list, separately, for the reviewer

1. Every sentence that restates the operator's own account more strongly than he said it,
   especially any causal claim (for example that the positioning "led to" the sale), with a
   weaker wording that stays true.
2. Every detail that could be sensitive to publish about a former employer, such as the
   Postmates fraud example, flagged for the operator's explicit yes before it ships.
3. Any schema field you could not fill from the facts, with what you put there and why.
4. The exact sentences on the home page about each company, and where each one appears in
   your draft.

Return the two MDX files in fenced code blocks labelled with their target paths
(content/work/postmates.mdx and content/work/neuton.mdx), then the four lists.
