# Pass 112: the book comes off the site

Executor: GLM 5.3 via `scripts/claude-glm.ps1` (z.ai bucket). Sol only if GLM is capped, and
then only sections 1-4; Sol cannot build, run a server, run Chrome, or commit from this
worktree (LESSONS #18), so sections 5-7 wait for GLM or the main session.
Worktree: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy.

## 0. The ruling

Operator, 2026-09-11, verbatim: "the book should not be mentioned or shown on the site yet.
im still working on it". Clarified the same day, by choice from three options each:
(a) ALL1 ("The 80% Wall included with every engagement") is dropped AND the kickoff email
stops attaching the PDF and companion ZIP; (b) `/playbook` is removed entirely, a 404 with
no redirect, and every internal link to it goes; (c) this is its own pass, before the
`/services` rebuild (Pass-111b). Reason, one line: a site that sells a book it is still
writing makes a claim the operator cannot stand behind today.

What stays: the Stripe SKU `playbook-99` in `lib/catalog.ts`, `lib/stripe.ts`,
`lib/playbook-delivery.ts`, `lib/book-pdf.ts`, `lib/companion-zip.ts` and the `book` branch
of `app/api/stripe/webhook/route.ts`. Nothing renders them, and a refund of a past $99 sale
still arrives at the webhook. Deactivating the live product is the operator's (section 10).

## 1. Files to delete (whole files, `git rm`)

- `app/(foyer)/playbook/page.tsx`, `app/(foyer)/playbook/thanks/page.tsx`,
  `app/(foyer)/playbook/opengraph-image.tsx` (the directory goes)
- `components/PlaybookBuyButton.tsx`
- `components/color-worlds/PlaybookSignupForm.tsx`, `PlaybookHeroMedia.tsx`,
  `PromptDiff.tsx`, `WallChart.tsx`
- `app/actions/playbook-checkout.ts`, `app/actions/playbook-signup.ts`
- `lib/chapter1-pdf.ts`, `lib/playbook-sale.ts`
- `public/playbook/` (all nine PNGs; only the deleted files reference them)

Before deleting, prove each is unreferenced outside the set:

```
grep -rn "PlaybookBuyButton\|PlaybookSignupForm\|PlaybookHeroMedia\|PromptDiff\|WallChart\|playbook-checkout\|playbook-signup\|chapter1-pdf\|playbook-sale\|/playbook/" app components lib --include=*.ts --include=*.tsx
```

Expected: every hit is inside a file in the list above, or is a comment.

## 2. Exact copy (place these strings; do not write others)

Rule for comments: do not rewrite history. Delete a comment only when it describes the exact
line you delete. Add one dated comment per touched file, at the first edit:
`// Pass-112 (operator 2026-09-11): the book is off the site until it ships.`

**`app/(foyer)/page.tsx`, the Audit box list, line ~181.** Replace the whole string
`"A kickoff email the moment you buy: intake questions, a link to book the debrief, and The 80% Wall, my field manual, attached."`
with
`"A kickoff email the moment you buy: the intake questions and a link to book the debrief."`

**`app/(foyer)/page.tsx`, the build door, lines ~747-757.** The body paragraph becomes exactly:
`That last 20% is my daily work. Want me on your build? Three fixed prices start at $500.`
Delete the `<a href="/playbook" className="cw-door__cta">Read the playbook ...</a>` element. The
`/packages` anchor stays as the only child of `.cw-door__ctas`. In the doors comment above the
section, delete the sentence run from "NOTE: the playbook door touches the Pass-30 lock" through
"Flagged to the operator either way." The rest of that comment stays.

**`app/(foyer)/about/page.tsx`, lines ~214-223.** Delete the comment block beginning
"Internal link added 2026-09-02" and the `<p>` that follows it ("I also wrote ..."). Nothing
replaces them; the `<p>` holding "See the case studies" now follows the engagements paragraph.

**`app/(foyer)/packages/page.tsx`, `.cw-pkg-page__next`.** The paragraph becomes exactly:
`Each one goes straight to checkout. The moment your card clears you get a kickoff email: the intake questions and a link to book the call.`

**Same file, `.cw-pkgs__fine`.** The paragraph becomes exactly:
`The rules, in plain terms: every package fee credits toward the next package or an engagement started within 60 days. Full refund any time before kickoff. None after, because by then the work has started.`

Line 13's header comment: change "the book included with all three" to "the book no longer
included (Pass-112)".

**`app/(foyer)/services/page.tsx`, lines ~474-484.** Delete the Pass-67 comment and the whole
`<p className="cw-sv-shapes__foot">Pre-production and working solo? ...</p>`. Nothing replaces
it.

**Same file, the packages foot under the price table.** The text becomes exactly:
`Full details and the refund terms.` followed by the existing `{" "}` and the unchanged
`<a href="/packages" className="cw-mlink">See the packages ...</a>`.

**`app/(foyer)/services/thanks/page.tsx`, `.cw-pb-sect__lede` (the first one).** The paragraph becomes exactly:
`The email has two steps: a few intake questions to answer by reply, and the link to put the kickoff call on my real calendar. Work starts at kickoff, and the refund rule holds until then: full refund any time before the call.`
Keep `className="cw-services cw-playbook"`; the class is styling, not a mention.

**`content/work/ordani.mdx`.** Delete the final line `The manual I wrote from this build: [The 80% Wall](/playbook).` and the blank line above it. The file ends after `</PullQuote>` with one newline.

**`components/color-worlds/Nav.tsx`.** Delete `{ href: "/playbook", label: "Playbook" },`.
Four items remain in this order: Services, Work, About, Contact.

**`app/sitemap.ts`.** Delete the `/playbook` entry object (url, lastModified, changeFrequency,
priority). Leave the Pass-22 comment.

**`lib/package-delivery.ts`.** Remove the two imports from `@/lib/book-pdf` and
`@/lib/companion-zip`. In the email body array delete the three entries `""`,
`"Attached: The 80% Wall (my field manual) and its companion",` and
`"files — included with every package.",` so that "within 60 days." is followed by `""` and
then `"— Micah"`. Delete the whole `attachments: [ ... ]` property. Change the sale-note line
`"Kickoff email sent (intake + /book link + book/ZIP).",` to
`"Kickoff email sent (intake + /call/kickoff link).",`. In the header comment (lines 7-10)
append: `// Pass-112 (operator 2026-09-11): the book and ZIP are no longer attached.`

**`docs/PACKAGES-RUNBOOK.md`.** Lines 5-6: replace "All three include The 80% Wall (book +
companion ZIP)." with "No attachments (the book left the site in Pass-112, operator
2026-09-11)." Line 33 becomes `4. (Removed Pass-112: nothing is attached to the kickoff.)`.
Line 50: change "attached)" to "no attachment)". Line 58: change ", book + companion attached"
to " (no attachment)".

**`.claude/CLAUDE.md`, the paragraph beginning "**One FIGURE animation exists" (lines 23-31).** Replace
the whole paragraph with:

`**No figure animation is mounted.** The one that existed, `<WallChart />` in the `/playbook` hero, left with the book in Pass-112 (operator 2026-09-11: the book is not shown on the site yet). `motion.figure` in `brand.json` stays as the record of the 2026-09-01 approval. A new animated figure is the second-signature line; the answer there is no.`

**`.claude/brand.json`, `motion.figure`.** Add one key after `"files"`:
`"removed": "2026-09-11 Pass-112: WallChart.tsx deleted with the book. Kept as the record of the approval."`

**`docs/LESSONS_LEARNED.md`, the #3 ledger.** Append this bullet at the END of the ledger
bullet list (immediately before the `**Gate:**` line):

`- **The book is not mentioned or shown on the site** (operator 2026-09-11, verbatim: "the book should not be mentioned or shown on the site yet. im still working on it"). Same day: no line about it on any page, /playbook removed (404, no redirect), the kickoff email no longer attaches the PDF or ZIP. NEVER: "The 80% Wall", "field manual", "the playbook", or a link to /playbook on any rendered surface, metadata, share image or llms.txt, until a new dated ruling here. Gate: scripts/retired-phrases-gate.mjs (Pass-112).`

## 3. The gate (same day as the ruling, LESSONS #21 shape)

`scripts/retired-phrases-gate.mjs`:

- Add to `PHRASES`: `"80% Wall"`, `"/playbook"`, `"field manual"`, `"the playbook"`. Add a
  comment block in the header, same shape as the others, citing the 2026-09-11 ruling.
- Add `const EXEMPT_FILES = new Set(["lib/catalog.ts", "lib/playbook-delivery.ts"]);` and skip
  those paths in the walk (normalise separators the way `applyExemptions` does). Header
  comment: they are the money path for past $99 buyers and render nowhere.
- Add `--self-test`, wired in `package.json` `build` BEFORE the real scan exactly as
  `accent-states-lint.mjs` is: `node scripts/retired-phrases-gate.mjs --self-test && node scripts/retired-phrases-gate.mjs`.
  The self-test runs the same `stripComments` + `applyExemptions` + exempt-file skip + phrase
  scan over an in-memory fixture list of `{file, src}` and asserts:
  - PLANTED (must hit, one each): every phrase in `PHRASES` on a tsx string line; `/playbook`
    as an href attribute; `The 80% Wall` in mdx prose; `FIELD MANUAL` upper-case; `a decade
    inside` in a `.ts` template literal.
  - NEAR MISSES (must not hit): each of the four new phrases inside a `//` comment, inside
    `/* */`, and inside `{/* */}` in mdx; the line `A 25-page playbook sits with the author`
    (no hit for "the playbook" or "/playbook"); `The 80% Wall` in a file whose path is in
    `EXEMPT_FILES`; `alumniOf: ["Flexport"]` in `app/layout.tsx`.
  - Print `retired-phrases-gate self-test: N planted caught, M near misses passed` and exit 0;
    on any miss print which case and exit 1.

## 4. Layout and motion

No new classes, tokens or CSS. `.cw-door__ctas` renders one child. `.cw-playbook`, `.cw-pb-*`,
`.cw-lp*`, `.cw-wallchart` and `.cw-diff` CSS stays in `globals.css` (dead rules are a later,
measured purge). No motion change. Nothing new animates.

## 5. Battery: write `.planning/exec/gates112.sh` from `gates111a.sh`

Keep the `GATES_COPY` guard, `export MSYS_NO_PATHCONV=1`, `Q=.planning/qa/pass-112`, every
gate's own exit code echoed, never read through a pipe. Changes from 111a: drop the new-block
colour python block and the load-bearing sweep; add
`node scripts/retired-phrases-gate.mjs --self-test; echo "retired self-test exit: $?"` before
the real gate; prettier the touched files (list them explicitly); the served-copy checks become
the three blocks below, placed after the server is up and before render-gate:

```
echo "=== 404s (expect 404 404) ==="
for r in /playbook /playbook/thanks; do echo "  $r: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3200$r)"; done
echo "=== served mentions (expect 0 on every route) ==="
for r in / /services /packages /about /services/thanks /work/ordani /call /call/kickoff /llms.txt /sitemap.xml; do echo "  $r: $(curl -s http://localhost:3200$r | grep -ciE '80% wall|/playbook|field manual|the playbook')"; done
echo "=== nav items on / (expect 4) ==="
curl -s http://localhost:3200/ | grep -oE 'href="/(services|work|about|contact|playbook)"' | sort -u | wc -l
```

Then render-gate, axe-worlds on `/ /services /packages`, layout-gate (default routes), and
`node .planning/exec/shots112.mjs http://localhost:3200 "$Q"; echo "shots exit: $?"`.

`shots112.mjs`: copy `shots111a.mjs`, replace PLAN with:

```
["/", "home-nav", null, ["1440", "390"]],
["/", "home-doors", "#doors", ["1440", "390"]],
["/services", "services-foot", ".cw-sv-shapes__foot", ["1440", "390"]],
["/packages", "packages-fine", ".cw-pkgs__fine", ["1440", "390"]],
["/about", "about-links", "a[href='/work']", ["1440", "390"]],
["/services/thanks", "thanks", null, ["1440", "390"]],
["/work/ordani", "ordani-end", "blockquote", ["1440"]],
```

Add one capture of the OPEN mobile menu on `/` at 390 (click the nav toggle button, settle
600ms) named `home-nav-open-390`. Viewport captures only, never full-page. Drop the 111a
measurements that name elements no longer in the plan.

## 6. Expected results (pass/fail without taste)

| Check | Expected |
|---|---|
| section 1 grep after deletion | 0 lines outside comments |
| tsc, copy-lint, vendor, retired self-test, retired gate, accent x2, gsap x2 | exit 0 each; retired gate prints `retired-phrases-gate: clean` |
| `npx next build --webpack` | exit 0; `grep -c playbook "$Q/build.log"` prints `0` |
| 404s | `/playbook: 404` and `/playbook/thanks: 404` |
| served mentions | `0` on all ten routes |
| nav items | `4` |
| render-gate | exit 0 (no dead internal links) |
| axe-worlds, layout-gate | exit 0, nothing outside KNOWN |
| shots | 14 PNGs in `$Q`, each no larger than its viewport |

## 7. Commit (GLM or main session only)

Stage by explicit path (`git add -A` is not allowed; `git rm` the deleted files). Message via
`git commit -F` with an absolute message-file path. Subject:
`Pass-112: the book comes off the site (operator 2026-09-11)`. Body: the deleted files, the
copy surfaces touched, and the gate additions (four phrases, two exempt files, self-test).
Then rewrite `.claude/RESUME.md` (whole file, at most 2500 bytes, measured with `wc -c`) and
commit it separately. Do not push.

## 8. Rejected

- A `/playbook` redirect to `/` or `/services`. Ruling: remove entirely; a redirect keeps the
  URL alive in link graphs.
- A "book coming" line anywhere. Ruling: not mentioned.
- Deleting `lib/catalog.ts`'s SKU, `lib/playbook-delivery.ts`, `lib/book-pdf.ts`,
  `lib/companion-zip.ts` or the webhook's `book` branch: refunds of past sales and any
  checkout session opened before deactivation still need them.
- Purging the playbook CSS blocks: `/services/thanks` uses `.cw-playbook` and `.cw-pb-*`;
  a purge is its own measured pass.
- Bundling ruling 9's rename ("AI engineering") or any 111b work: separate pass.
- Editing `content/work/content-engine.mdx` ("A 25-page playbook"): a different playbook,
  the client deliverable, not the book.
- Touching `scripts/stripe-setup.mjs`: not rendered; the live product is the operator's.
- An Astra look for this pass: a removal with two small layout consequences; the judge look
  covers them. Spend nothing from the ChatGPT bucket unless the judge asks.

## 9. Return conditions (judge, at most 5 calls)

After the battery: `home-doors-390`, `home-doors-1440`, `home-nav-open-390`, `home-nav-1440`,
the served-mention counts, the retired-phrases self-test line, and `git diff --stat`. Any
non-zero mention, a 200 on `/playbook`, or a gate exit other than 0 stops the pass before
commit.

## 10. Parked (operator)

Deactivate `playbook-99` in LIVE and TEST Stripe. Remove `PLAYBOOK_ON_SALE` from the Vercel
env. Push. Merge to `main`. Pass-111b: the A4 and S3 wording.

## 11. Fix-list (judge look 1, 2026-09-11)

Two findings from the first run. Do only these, then section 7.

**F1. The gate flags an import specifier.** `app/api/stripe/webhook/route.ts:28` is
`import { deliverPlaybook, notifyRefund } from "@/lib/playbook-delivery";`. A module
specifier never renders. Ruling: blank module specifiers before matching, the way comments
are blanked.

- In `scripts/retired-phrases-gate.mjs` add `stripSpecifiers(src)` and call it inside
  `scanSource` right after `stripComments`. It replaces the quoted string that follows
  `from`, a side-effect `import`, a dynamic `import(` or a `require(` with an empty quoted
  string, keeping the line count:
  `src.replace(/(\b(?:from|import|require)\s*\(?\s*)(["'])[^"'\n]*\2/g, "$1$2$2")`.
  A one-line header comment says why: specifiers are code, not copy.
- Self-test, NEAR MISSES added (must not hit):
  `import { deliverPlaybook, notifyRefund } from "@/lib/playbook-delivery";`,
  `export * from "@/lib/playbook-delivery";`,
  `const m = await import("@/lib/playbook-delivery");`,
  `const n = require("@/lib/playbook-delivery");`.
  PLANTED added (must still hit): `` `${BASE_URL}/playbook` `` in a `.ts` template literal,
  and `href: "/playbook"` in a `.tsx` object literal. Update the printed counts.
- Rerun and read each exit code directly:
  `node scripts/retired-phrases-gate.mjs --self-test` prints
  `retired-phrases-gate self-test: N planted caught, M near misses passed` (N = 17, M = 19)
  and exits 0; `node scripts/retired-phrases-gate.mjs` prints `retired-phrases-gate: clean`
  and exits 0; `npx tsc --noEmit` exits 0;
  `npx prettier --write scripts/retired-phrases-gate.mjs` then `--check` exits 0.
  The build, server and browser gates already passed on this exact tree and the gate script
  is not in the served output: do NOT rerun them.

**F2. The deletions are already on origin.** While the first run was staging its `git rm`,
the main session committed `.claude/RESUME.md` and the shared index carried the nineteen
deletions into `ec84b07`, which was then pushed. So the Pass-112 commit contains the edits,
not the deletions. Record the incident as LESSONS #23 with exactly this text, appended after
#22:

```
## #23 — A shared index commits what another process staged (2026-09-11)

**What happened.** Pass-112 ran on the GLM executor while the main session, on the
operator's "push it", staged `.claude/RESUME.md` by explicit path and committed. The
executor had already `git rm`'d nineteen book files into the same index, so the RESUME
commit (`ec84b07`) carried the deletions and was pushed. The preview at that commit has no
`/playbook` route and still links to it from the nav, the sitemap and four pages;
`render-gate` fails that build. Production was not touched.

**Root cause.** `git add <path>` scopes the add; `git commit` commits the whole index. Two
processes on one worktree share one index, so "stage by explicit path" (MODEL_ROUTING §6)
protects the add and not the commit.

**The rule.** While an executor shares the worktree, the main session commits only with an
explicit pathspec (`git commit -F <msg> -- <paths>`) after reading
`git diff --cached --name-only`, and an unexpected staged entry stops the commit. An
executor stages nothing until its own commit step.

**The gate.** This entry and the RESUME trap line. On recurrence: a PreToolUse hook that
refuses a bare `git commit` when `git diff --cached --name-only` lists a path the command
did not name.
```

**Commit (section 7, amended).** `git add` these explicit paths and nothing else:
`.claude/CLAUDE.md .claude/brand.json "app/(foyer)/about/page.tsx" "app/(foyer)/packages/page.tsx" "app/(foyer)/page.tsx" "app/(foyer)/services/page.tsx" "app/(foyer)/services/thanks/page.tsx" app/sitemap.ts components/color-worlds/Nav.tsx content/work/ordani.mdx docs/LESSONS_LEARNED.md docs/PACKAGES-RUNBOOK.md lib/package-delivery.ts package.json scripts/retired-phrases-gate.mjs .planning/exec/gates112.sh .planning/exec/shots112.mjs .planning/exec/glm112.log .planning/prompts/GLM-112-POINTER.txt .planning/qa/pass-112 .claude/briefs/pass-112-book-off-the-site.md`.
Print `git diff --cached --name-only` and confirm it lists only those paths (the qa folder
expands to its files). Commit with `git commit -F <absolute message file>`; subject as in
section 7; body notes that the file deletions landed in `ec84b07`. Then rewrite
`.claude/RESUME.md` (whole file, at most 2500 bytes, `wc -c` printed) adding one Traps line:
`shared index: commit with an explicit pathspec after reading git diff --cached (#23)`, and
commit it as `git commit -F <msg> -- .claude/RESUME.md`. Do not push.
