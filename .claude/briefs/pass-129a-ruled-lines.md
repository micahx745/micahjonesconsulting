# Pass-129a: the ruled lines, the Packages nav item, the packages link and the terms comma

Brief-Format: v2
Executor: GLM 5.3 (`scripts/claude-glm.ps1 -Batch`), in `.claude/worktrees/p106-live` on `design/live-evolve`.
Written by the main session (Opus 5.5) 2026-09-23. No commits, no push, no deploy: the main session commits after
the diff review, and nothing goes live without the operator's push words.

## Ruling
Operator 2026-09-23 (LESSONS #3 "THE LINES SHIP FIRST; THE 60 DAYS LIMIT ONLY THE ENGAGEMENT CREDIT"): the three
ruled lines and the Packages nav item ship on their own, ahead of the Pass-129 design arc. Lines 1A, 2A, 4A are
verbatim from LESSONS #3 "THE FIVE LINES, ROUND 1"; the nav item from "THE OPUS 5.5 SITE REVIEW, ROUND 2" (order:
Services, Packages, Work, About, Contact). The terms take the /services comma because a package fee credits toward
the next package with no time limit (his fact, W2). Both home "packages" links go to /packages (main session ruling).
Reason: every string here is ruled and none depends on the design arc.

## Files
- `app/(foyer)/page.tsx`
- `app/(foyer)/packages/page.tsx`
- `lib/package-delivery.ts`
- `components/color-worlds/Nav.tsx`
- `.planning/qa/pass-129a/`
- `.planning/exec/pass-129a-digest.json`

## Pre-flight
Run from the worktree root; print each again first and STOP on any difference.
- `grep -c 'The demo took a weekend. The last 20% is eating your month.' 'app/(foyer)/page.tsx'` -> 1
- `grep -c 'Strategy and software from one operator in Oakland. Four exits' 'app/(foyer)/page.tsx'` -> 1
- `grep -c 'href="/services#packages"' 'app/(foyer)/page.tsx'` -> 1
- `grep -c 'next package or an engagement started within 60 days' 'app/(foyer)/page.tsx'` -> 1
- `grep -c 'most of a product out of AI$' 'app/(foyer)/packages/page.tsx'` -> 1
- `grep -c 'package or an engagement started within 60 days' 'app/(foyer)/packages/page.tsx'` -> 1
- `grep -c 'credits toward the next package or an engagement started' lib/package-delivery.ts` -> 1
- `grep -c 'href: "/packages", label: "Packages"' components/color-worlds/Nav.tsx` -> 0

## Final copy (exact strings; place them, do not write them)
- E1 `page.tsx` build-door h2 (L142). OLD `The demo took a weekend. The last 20% is eating your month.`
  NEW `The demo took a weekend in Lovable or Replit. The last 20% is eating your month.`
- E2 `page.tsx` `metadata.description` (L80-81 only; openGraph and twitter descriptions stay). NEW
  `AI product stalled on sign-in, deploys, or sales? I get it launched. Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work.`
- E3 `page.tsx` the `fine=` prop (L246): replace only `credits toward the next package or an engagement started within 60 days.`
  with `credits toward the next package, or toward an engagement started within 60 days.` The rest stays.
- E4 `page.tsx` L251: `href="/services#packages"` becomes `href="/packages"`. Label unchanged.
- E5 `packages/page.tsx` intro (L118-119): the sentence becomes
  `For solo builders and small teams who got most of a product out of Lovable, Claude Code, or Replit and stalled on the last stretch.`
  The sentences after it stay.
- E6 `packages/page.tsx` rules (L212-213): same replacement as E3.
- E7 `lib/package-delivery.ts` L61-62 become the two lines `"credits toward the next package, or toward an engagement",`
  and `"started within 60 days.",`. Touch no other line (the file holds non-ASCII characters; leave them byte-identical).
- E8 `Nav.tsx`: insert `{ href: "/packages", label: "Packages" },` directly after the Services item (L43).

## Layout
None new. Existing classes only. The longer E1 heading wraps inside the existing door styles.

## Motion
Nothing new.

## Steps
1. Pre-flight. 2. E1-E8 with exact-string edits. 3. `pnpm exec prettier --write` on the four source files.
4. The Verification blocks in order. 5. The digest.

## Verification
```
pnpm build
```
Expected: exit 0 (the copy-lint gate runs first and passes).
```
grep -c 'in Lovable or Replit. The last 20%' 'app/(foyer)/page.tsx'; grep -c 'services#packages' 'app/(foyer)/page.tsx'; grep -c 'package or an engagement started' 'app/(foyer)/page.tsx' 'app/(foyer)/packages/page.tsx' lib/package-delivery.ts
```
Expected: `1`, `0`, then `0` for each of the three files.
Then `pnpm start -p 3131` in the background. For each check, fetch the page, strip `<head>` and every `<script>`
EXCEPT for the meta check, and count:
- `/` visible text `The demo took a weekend in Lovable or Replit.` -> Expected >= 1
- `/` raw head `<meta name="description" content="AI product stalled on sign-in, deploys, or sales? I get it launched.` -> Expected 1
- `/` stripped HTML `href="/services#packages"` -> Expected 0; `href="/packages"` -> Expected 4 (nav, menu, door, offer)
- `/` and `/packages` visible text `credits toward the next package, or toward an engagement started within 60 days` -> Expected >= 1 each
- `/packages` visible text `out of Lovable, Claude Code, or Replit and stalled` -> Expected >= 1
- `/` first `nav` link labels in order -> Expected `Services, Packages, Work, About, Contact`
- `/` and `/packages` at 390: `document.documentElement.scrollWidth <= innerWidth` -> Expected true
Stop the server. Captures with Playwright into `.planning/qa/pass-129a/`: the build door at 390 and 1440, the nav at
1440, the menu open at 390, the /packages intro at 390; then ONE labelled `SHEET.png`, 2000px wide at most.
```
python scripts/harness/diff_scope.py .claude/briefs/pass-129a-ruled-lines.md
```
Expected: pass (no path outside Files).

## Rejected
- New openGraph or twitter descriptions: 4A ruled the meta description only.
- Cursor in any line: he replaced it with Replit (LESSONS #3 "THE TOOL NAMES").
- Removing /services#packages or PackageBand: it stays for readers already on /services.
- Rewording the home fine print further: line 5 is folded into the Pass-129 design arc.
- Any change to the doors' design: Pass-127c owns it.

## Digest
`.planning/exec/pass-129a-digest.json`, at most 8 KB, one item per E-edit and per Verification check (claim,
evidence as `path:line` or `$ command -> first line`, confidence); `python scripts/harness/digest_check.py` passes.

## Return conditions
The main session reads the digest, the diff and SHEET.png, then runs the copy checkpoint (Fable, Astra, deepseek-v4-pro
reported dead while its balance is $-0.01) and puts the push to the operator by popup.

## Parked operator decisions
Push timing (his words, quoted in RESUME with a date, before any push).
