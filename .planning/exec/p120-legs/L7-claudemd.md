# Leg L7: `.claude/CLAUDE.md` prose (opus)

Brief O14 (lines 95-101). Read brief lines 1-156, 218-347 (the schema, for field names) and 2496-2680
(motion, for the facts).

## YOUR FILE

`.claude/CLAUDE.md` in THIS worktree only (never the main checkout's copy at
`C:/Users/micah/Code/micahjonesconsulting/.claude/CLAUDE.md`).

## WHAT TO REWRITE (four places, using only the facts O14 lists)

1. The "One signature motion" paragraph (the first paragraph under `## One signature motion`): the
   TitleCard is a 600ms settle entrance on a hero that names the client and the result; the
   foyer-to-theater dim is 900ms. Keep the sentences that remain true (nothing else pins, sticks,
   parallax-scrolls or follows the cursor without the motion-engineer agent's written approval). The
   "No figure animation is mounted" paragraph, the count-up exception paragraph and the
   motion-discipline line stay unchanged.
2. The `## Content` bullet's required frontmatter fields, to match `lib/case-study-schema.ts` as brief
   §2.1 defines it. Published studies: `title`, `titleLines`, `description`, `dek`, `client`,
   `clientNameProtected`, `atAGlance`, `results`, `entry`, `service`, `publishedAt`, `status`, `order`,
   `hero?`. Stubs: `title`, `dek`, `status`. (The harness hook `mdx-frontmatter.sh` now requires
   `title`, `dek`, `status`.)
3. The CDC sentence in `## Content`: it is now true that ORDANI's CDC figures render from
   `content/citations.ts` (`ORDANI_CDC_2024.FIGURES`).
4. Definition of done #1: the settle entrance and the 900ms dim.

Also read the `## Stack` GSAP bullet and the `## What not to do` gsap line: after Pass-120,
`components/TitleCard.tsx` imports no GSAP. Do NOT edit them (O14 does not list them); report whether
each is now stale and quote it.

Voice: no em-dashes added, no word from `.claude/brand.json` `voice.banned`. Do not touch any other
line.

## CHECKS

Paste `git diff -- .claude/CLAUDE.md` in full.
