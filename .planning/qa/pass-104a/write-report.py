from pathlib import Path
import json

out=Path(__file__).parent
hits=json.loads((out/'remaining-source-hits.json').read_text(encoding='utf8'))
report=r'''Pass 104a — book blackout and refund policy. Branch: `design/room-and-ledger`. Reviewed against `.claude/briefs/pass-104a-book-blackout.md` and base `7f4c27dc5d029a18feb1fdc3242132716687a1c3`.

The requested website changes are complete. Production build passes. Room verifier: **75 checks, 74 pass, 1 allowed sandbox failure**. Axe remains **zero violations** on `/`, `/packages`, `/about`, `/call` at both 390 and 1440. The independent source/render audit passes **69/69**. No commit, push, deployment, hook bypass, Stripe script, checkout, form submission, or external message was performed.

The preserved package-delivery email still promises the book and contains the old refund wording. This is not rendered website copy; `lib/package-delivery.ts` and all delivery code were explicitly left intact under §0. This report does not claim the email flow was corrected.

**Scope and layout (§§0–2).** The book page, components, server actions, SKU, delivery code, assets, and sale flag remain on disk and buildable. `/playbook` still responds to a direct URL, as the brief requires; every on-site entry link is removed, and both book routes emit `noindex, nofollow`. Nothing in Stripe changed.

| Surface | Before | After and layout treatment |
|---|---|---|
| Home bar | Micah Jones · Record · Playbook · Packages from $500 · Get a reality check → | Micah Jones · Record · Packages from $500 · Get a reality check →. Existing `auto / flexible / auto` grid retains identity and CTA at the edges; the middle flex track re-centers its two remaining links with the existing gap. |
| Other Room pages' bar | Same five labels | Same four surviving labels. Existing `justify-content: space-between` redistributes the links; no vacant slot. |
| Both bars at 390 | Identity and call CTA visible; secondary links hidden by existing breakpoints | Same composed identity/CTA row; home retains its compact CTA pill. |
| Legacy navigation | Services · Work · Playbook · About · Contact | Services · Work · About · Contact. `components/color-worlds/Nav.tsx` also required removal because `/services` and `/contact` still use it. |
| Shared footer | Identity/email (cols 1–4); Record, Playbook, Packages from $500, Get a reality check, LinkedIn (cols 6–8); The 80% Wall / $99 at launch / Get chapter one free → (cols 10–12) | Identity/email (cols 1–6); Record, Packages from $500, Get a reality check, LinkedIn (cols 7–12). `SiteFoot` uses the same component; its reply promise remains. The obsolete chip prop and book column markup are removed. |
| Footer geometry | Three occupied columns | At 1440: two occupied spans, each 676px wide, at x=32 and x=732. At 390: both occupy the same 326px full-width lane, stacked with the existing gap. No empty third column or clipping. |
| Home order | Room → Operator → HowIWork → Packages → Receipts → Manual → Objections → Ask → Foot | Room → Operator → HowIWork → Packages → Receipts → Objections → Ask → Foot. Manual import and render removed; `Manual.tsx` unchanged. |

No remaining home section or eyebrow renders a section ordinal, so no visible renumbering was necessary. The HowIWork steps retain their intact 01/02/03 sequence; the derived Record count remains unchanged. Historical component comments are not displayed ordinals.

**Removed copy (§§1–4, 6).** These are all removed visitor-facing strings or complete text blocks, with repeated occurrences grouped:

- `Playbook` from both Room bars, the shared footer, and legacy navigation; their `/playbook` or `#manual` destinations are gone.
- Footer: `The 80% Wall`, `$99 at launch`, `Get chapter one free` and its arrow/link. The corresponding third-column markup is gone.
- Home Manual section, including its accessible label `The field manual`; cover alt `The 80% Wall, book cover`; `the-80-percent-wall.pdf`; `PDF + ZIP · every future edition`; eyebrow `The 80% Wall`; heading `The 80% Wall.`; `The AI handed you the code. Now ship the company.`; `It shipped. Nobody came.`; `The demo looked done. Production turned out to be a different machine entirely.`; `You kept running into the same thing. Fixed Tuesday, broken Friday, because the tool forgot.`; `Ten chapters on what the AI leaves to you: the first ten users, auth, deploys, payments, compliance. Every chapter ends in a pre-flight card you run the same night.`; `Get chapter one free`; `$99`; `at launch`; `PDF + ZIP`; `every future edition`; and the book link/arrow. These strings remain in the dormant component on disk.
- `/services`: `Pre-production and working solo? The playbook covers most of what the advisory shape does, for under $150 rather than $5K a month.` The complete paragraph existed to carry the book link, so it was cut.
- `/packages` terms: `All three include The 80% Wall, my field manual for people building on their own, and its companion files. They arrive attached to the kickoff email the moment you buy.`
- `/packages` PK15: `The manual and its companion files are attached.` Only that last sentence was cut.
- `/services/thanks`: `The book and its companion files ride along, included with every package.` Found by the wider sweep and removed as a live package promise. The surrounding intake/call and pre-call refund sentences still read coherently.
- `/about` AB12: `I also wrote The 80% Wall, a field manual on what AI leaves to you once the demo works.` Its paragraph and link were removed entirely.
- Ordani closing line: `The manual I wrote from this build: The 80% Wall.` Its linked title was removed with the line.
- Old package refund copy: `Full refund any time before kickoff. None after, because the work has started.`
- Old kickoff Refund value: `Full refund any time before this call, none after.`
- Entire objection: `What if it does not help?` / `Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.`
- The `/playbook` sitemap entry was removed, including its own metadata record; no other sitemap values were changed.

The kickoff page contained no rendered manual/companion promise to remove. Its historical comments were not visitor copy.

AB12 was a standalone paragraph. Before, the preceding paragraph read: “I also take engagements with teams whose sales and product sides have stopped talking. I work on both sides until they do. I am taking new engagements now.” It was followed by: “I also wrote The 80% Wall, a field manual on what AI leaves to you once the demo works.” After, the first paragraph is unchanged and closes the Currently section; the book-only paragraph is absent. No fragment or dangling punctuation remains.

The other three published case studies were checked: Guardicore and RFP engine have no matching phrase or book link; content-engine retains “Their content lead has a 25-page playbook to execute without supervision.” That is the client's marketing deliverable, not The 80% Wall, and is a protected factual claim. The additional Passioneer stub also has no matching phrase. Ordani now has no matching phrase or book link.

**Search and policy (§§5–6).** `/playbook` adds only `robots: { index: false, follow: false }` to metadata. `/playbook/thanks` already had the same setting and is byte-for-byte unchanged. `/sitemap.xml` and `/llms.txt` contain no book path or mention. `app/robots.ts` is unchanged; no global rule was added.

The package terms now read: “Every package fee credits toward the next package or an engagement started within 60 days. Full refund any time before the kickoff call. After it, you pay for the work done and nothing more.” PK15 now reads: “Each package goes straight to checkout. My kickoff email arrives the moment your card clears. It includes the intake questions and a link to book the call.” The kickoff Refund row reads: “Full refund any time before this call. After it, you pay for the work done and nothing more.” Built HTML verifies each exact string.

The two surviving objections are byte-for-byte unchanged. At 1440, the heading occupies the left lane and two stacked question/answer rows occupy the right lane from the existing column seam; both rows finish on hairlines. At 390, the heading sits above two full-width rows, with no gap between their closing/opening edges. Neither width looks like a missing third column or a clipped list. No FAQ styling change was necessary.

Added a verified-facts entry to `docs/LESSONS_LEARNED.md` §3, recording the operator in chat on 2026-09-08 and his exact words: “im not doing any refunds and that shouldnt be a question (only refund is given if paid before a kick off call - if kick off call happens and no work is done afterwards there is a prorated charge)”. It records the pre-call/full-refund and post-call/prorated-work policy, names the package, kickoff and home surfaces, and forbids a thirty-day refund, money-back guarantee or “no questions asked” for any package or engagement.

**Verification commands and expected outputs (§7).** Commands ran in this worktree. Bare pnpm is absent, so `pnpm` below was a PowerShell function invoking the existing CLI. Browser commands used the repository's previously installed temporary Python/browser environment:

```powershell
function pnpm { & node "$env:TEMP/pass-102-corepack/v1/pnpm/10.12.1/bin/pnpm.cjs" @args }
$env:PYTHONIOENCODING='utf-8'
$env:PATH="$env:TEMP/pass-102-python/Scripts;$env:PATH"
$env:PLAYWRIGHT_BROWSERS_PATH="$env:TEMP/pass-102-browsers"
```

| Command | Expected output | Observed result / record |
|---|---|---|
| `git branch --show-current` | `design/room-and-ledger` | Matched. |
| `pnpm build` before changes | Exit 0; copy/vendor/retired-phrase gates clean; render gate metadata/links pass | Passed; `build-before.txt`. |
| `pnpm start --port 3104` | Production server Ready | Ready; used for baseline and restarted after final build. |
| `python -P .planning/qa/pass-104a/capture.py before` | Eight axe/overflow baselines | Axe 4.13.0: zero violations and zero overflow on all eight; `before.json`, `capture-before.txt`. |
| `python -P -` (inline `check_book_blackout` probe against the original build) | All three new blackout checks FAIL before removal | Three expected failures, followed by `RED CONFIRMED`; `blackout-red.txt`. |
| `pnpm build` after removals | Exit 0; all build gates pass | Both post-edit runs passed. The final run includes `/services/thanks`; `build.txt`. `render-gate: 15 routes — links resolve, fragments exist, metadata within limits.` |
| `python -P scripts/verify-room.py http://localhost:3104/` | All applicable checks pass; missing-ffmpeg arrival failure allowed | Exit 1: `75 checks, 74 pass, 1 fail`. Only failure: `FAIL 16.2-arrival  the arrival could not be measured (ffmpeg missing or clip absent)`. The clip exists and ffmpeg is absent. `verify-room.txt`, `verify-room-result.json`. |
| `python -P .planning/qa/pass-104a/capture.py after` | Axe identical to baseline; no overflow/book copy/book links; two objections | Exit 0; all eight axe results remain empty; all overflow measurements 0px. `after.json`, `capture-after.txt`, 26 PNGs. |
| `git grep -n -i -E "80% Wall\|chapter one\|the manual\|playbook" -- .` | Inventory all tracked-tree hits for classification | 3,142 matching lines including comments, paths, history, tests and product sources. `whole-tree-grep-summary.json`; classified rendered strings below. `rg` was unavailable, so Git grep and PowerShell search were used. |
| `node .planning/qa/pass-104a/source-sweep.cjs` | Every remaining source text hit classified; no `REVIEW` | Exit 0; 43 candidate string occurrences classified in `remaining-source-hits.json` and `source-sweep.txt`. Comments, identifiers, file paths and CSS attributes excluded. |
| `python -P .planning/qa/pass-104a/audit.py` | No site book paths; exact policy; no changed facts/prices; protected files intact | Exit 0; `69 checks, 69 pass, 0 fail`; `audit.json`, `audit.txt`. Covers 15 HTML routes plus sitemap and llms, source comparisons, both surviving objections and Python syntax. |
| `pnpm exec prettier --check <changed app/components/content/docs files>` | Clean formatting, or baseline-confirmed pre-existing differences | Exit 1, only `app/(room)/packages/page.tsx` and `app/(room)/playbook/page.tsx`. Both also fail `prettier.check` on `git show HEAD:<file>`; `prettier.txt`, `prettier-baseline.json`. Existing wraps and the protected explicit book-price separator were left untouched. |
| `node -` (Prettier current/HEAD comparison) | Establish whether warnings predate this pass | Both files: `headPass: false`, `currentPass: false`. Previewed format differences were in pre-existing lines; no formatter write was applied. |
| Inline native PowerShell restoration, preserved as `restore.ps1` | Original Pass 101 and next-env hashes match | Restored 11 overwritten files; removed 0 new files; all 173 Pass 101 files and pre-existing next-env match original SHA-256 hashes. `restoration.txt`, `restore-manifest.json`. |
| `git diff --quiet -- .planning/qa/pass-101` | Exit 0 | Exit 0. |
| `git diff --check` | Exit 0, no whitespace errors | Passed; `diff-check.txt`. |
| `pnpm exec prettier --write '.planning/qa/pass-104a/*.json' .planning/qa/pass-104a/verification.md` | Normalize generated record formatting without changing values | Completed; QA text logs also normalized to UTF-8/LF. |
| `pnpm exec prettier --check '.planning/qa/pass-104a/*.json' .planning/qa/pass-104a/verification.md docs/LESSONS_LEARNED.md` | `All matched files use Prettier code style!` | Matched. |
| `python -P -` (final artifact/hash assertions) | Complete screenshot set, expected audit/verifier results, exact restored hashes | Passed: 26 PNGs, 69/69 audit, only allowed ffmpeg failure, all 173 original Pass 101 file hashes and next-env preserved. |
| `git status --short`; `git diff --stat` | Only this pass's changes plus preserved pre-existing/concurrent work | `git-status.txt`, `diff-stat.txt`. Existing `next-env.d.ts` modification retained. Unrelated `.planning/design/PASS-104B-SYNTHESIS.md`, which appeared during execution, was not touched. |

Initial tooling attempts are recorded honestly: the default user-cache Chromium launch failed with `spawn EPERM`; the established temporary browser installation worked. The first source sweep mistakenly classified a CSS class attribute as prose; the parser now excludes code attributes. The first numeric audit counted the removed arrow's `&#8594;` entity as a number; the audit now excludes numeric character entities and passes. A `.ps1` invocation was blocked by the local script execution policy; the same native restoration commands ran inline, without changing that policy. None was a website defect or a skipped gate.

The copy gate retires superseded package terms, PK15 attachment copy and AB12; it retains the approved copy for the still-buildable book page. Removed three Manual-specific layout checks and their screenshot/motion probes; updated the surviving section-head, objection, navigation and hairline counts. Added home/footer absence checks for `80% Wall` and `$99`, book-link checks, and an absent Manual/refund-question check. Existing surviving geometry, motion, no-JS, contrast, copy and retained book-price checks remain active. All of them pass except the expressly allowed ffmpeg probe. No hook was bypassed and no check was weakened to hide a site failure.

Screenshots in this directory: `home`, `packages`, `about`, `call`, each with `-390.png`, `-1440.png`, `-footer-390.png`, `-footer-1440.png`, `-bar-390.png`, `-bar-1440.png`; also `home-objections-390.png` and `home-objections-1440.png`. Full-page screenshots, bar/footer details and objection details were visually inspected. The home's full-page captures freeze its viewport-driven travelling background; the objection detail captures show that section at its actual scroll position. Independent read-only code review found no introduced defect.

**Every remaining text hit (§4).** The tree-wide search also covers non-shipping planning/history, QA, scripts and `product/` authoring files. Those are not website routes or rendered website strings; product sources/assets are expressly retained. The table lists all 43 actual text-string candidates in runtime/source surfaces after excluding comments, paths and identifiers. Repeated entries retain their individual source line. Full original strings are also in `remaining-source-hits.json`.

Judgments: **B** = retained book route/metadata, reachable by direct URL only and not linked by any other site page; the two HTML book routes are noindex/nofollow. **O** = retained book OG image, discoverable only through the hidden book route's metadata or its known image URL. **D** = dormant component with no importer, unreachable. **F** = only inside the retained direct-URL book signup form; not submitted. **C** = unrelated client playbook, public and intentionally unchanged. **S** = server-only retained SKU. **E** = retained email/delivery text, not website-rendered and not invoked. **P** = preserved package-purchase email; still delivered by the unchanged purchase flow, with the book promise and old refund wording, outside this website-only change.

| Source | Matching text | Judgment |
|---|---|---|
'''
for hit in hits:
    f=hit['file']; text=hit['text']
    if f.endswith('/opengraph-image.tsx'): code='O'
    elif f.startswith('app/(room)/playbook/'): code='B'
    elif f in ['components/room/Manual.tsx','components/color-worlds/PlaybookHeroMedia.tsx']: code='D'
    elif f=='components/color-worlds/PlaybookSignupForm.tsx': code='F'
    elif f=='content/work/content-engine.mdx':
        code='C'; text='Their content lead has a 25-page playbook to execute without supervision.'
    elif f=='lib/catalog.ts': code='S'
    elif f=='lib/package-delivery.ts': code='P'
    else: code='E'
    report+=f'| `{f}:{hit["line"]}` | {text.replace("|", "&#124;").replace("<", "&lt;").replace(">", "&gt;")} | {code} |\n'
report+='''
The built-route sweep finds zero book links on all 15 checked HTML routes. Outside the retained book pages, the only matching visible text is the unrelated client playbook sentence on `/work/content-engine`. The hidden book page has 12 matching rendered text/alt runs and its thanks page has two; metadata/dormant conditional branches explain the additional source occurrences above.

**Return conditions (§8) and handoff.** No still-linked book destination remains, the bars and footer are composed within the existing layout system, no Stripe/webhook change is needed for the requested site scope, no surviving price/fact/number was changed, and the build passes metadata limits. Only expressly removed book promotions lose their own numerical strings; layout grid spans and verifier counts reflect the requested removals. The original book price row still passes its exact `$99 at launch · $149 after` check.

Fable commits; this executor did not. Required future commit-message note: **“The operator's 2026-09-08 blackout ruling supersedes the Pass 103 package book-inclusion promises (PK16 and PK15).”** Keep the current branch/worktree and all uncommitted changes for that handoff. All verifier overwrites under `.planning/qa/pass-101/` have been restored.
'''
(out/'verification.md').write_text(report,encoding='utf8',newline='\n')
print(f'Wrote {out / "verification.md"}: {len(report.split())} words, {len(hits)} classified source occurrences.')
