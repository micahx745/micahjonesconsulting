# Cross-review — Passes 97 + 98 (DIFF) — 2026-09-04

Ship checkpoint per `.claude/skills/cross-review/SKILL.md`. Run immediately before the
CARD 1 flow, after `pnpm build` came back green on all five gates.

- **Base:** `origin/main` (`1ab53f7`) → **HEAD** `41de3eb` (13 commits — Pass-97, Pass-98,
  the JUDGE record, and the deploy-approval record).
- **Input:** `qa/xr/xr_input.txt`, 169,243 bytes — under the 200,000 cap, so **nothing was
  truncated**.
- **Raw legs:** `qa/xr/xr_out.txt` (gitignored scratch).

## Exclusions declared in the input header

`pnpm-lock.yaml` · `qa/` · `public/*.png` · **the whole `.planning/` tree**. The last one is
a size cut: the full diff was 423,625 bytes. `.planning/` holds 256KB of planning prose and
raw DOM snapshots, and was verified to contain **zero shipping code** before it was cut:

```
$ git diff origin/main..HEAD --name-only -- .planning | grep -vE '\.(md|json|txt|xml)$'
(none — all md/json/txt)
```

All application code, styles, content, scripts, config, and the `.claude/`
constitution/brief/settings changes were in the review text in full.

## Round 1 — legs

| Leg    | Model                        | Status    | Verdict          |
| ------ | ---------------------------- | --------- | ---------------- |
| Gemini | `gemini-2.5-flash` (REST)    | OK        | **PASS**         |
| Codex  | `openai-codex/gpt-5.4` (CLI) | **ERROR** | —                |
| GLM    | `glm-5.2` (REST, Z.ai)       | OK        | **CONCERNS** (7) |

**This was a PARTIAL round: two of three external legs ran.** The Codex leg is dead at the
account tier, not misconfigured locally. `codex login status` reports `Logged in using
ChatGPT`, and the pinned model is registered by the `llm-openai-via-codex` plugin
(`llm models` lists `openai-codex/gpt-5.4`), but the backend refuses it:

```
$ echo "Reply with the single word: ok" | llm -m openai-codex/gpt-5.4
Error: Error code: 400 - {'detail': "The 'gpt-5.4' model is not supported when using
Codex with a ChatGPT account."}
```

Reproduced standalone on a one-word prompt, so it is an entitlement gap on the ChatGPT
plan, not a size or timeout failure. The script is the model-pin authority and a gate is
the wrong moment to edit it, so the pin was left alone and the leg is reported dead. No
opinion has been invented for it.

**Same-family leg (SKILL step 3) NOT run.** A fresh `code-reviewer` subagent cannot be
spawned from this context — no Agent/Task tool is exposed to it. Named here rather than
quietly dropped. What stands in its place: the two independent Opus verifications already
recorded in the Pass-97 and Pass-98 commits, plus the premise verification below, which
read every cited line in the live tree.

## Disposition protocol — every external finding

Gemini returned PASS with no findings; its notes read the diff as correct and are recorded
in `qa/xr/xr_out.txt`. The seven GLM findings each get exactly one disposition.

### 1. `PRODUCT_LD.brand` typed `Person` — **CONFIRMED / ADVISORY**

Premise true. `app/(foyer)/playbook/page.tsx:237` reads
`brand: { "@type": "Person", name: "Micah Jones" }`. schema.org gives `Product.brand` an
expected range of `Brand` or `Organization`; `Person` is outside it, so a shopping surface
may drop the field. Invisible metadata, one-line fix, no user-facing consequence.
→ **DEFER** to the RESUME queue. Does not block.

### 2. `PreOrder` availability in the OFF state — **CONFIRMED / ADVISORY**

The sharpest of the seven, and the premise is exactly right. On `origin/main` the page
omitted `offers` entirely while the sale was off (`PURCHASE_LIVE = false`, spread-guarded).
The diff replaces that with an always-present `offers` block on both `BOOK_LD` and
`PRODUCT_LD`, carrying `price: "99"` and
`availability: https://schema.org/PreOrder` (lines 184-186, 215-219, 238-242).

In the shipped OFF state the page takes no order of any kind: the CTA is
`Or read chapter one free`, the status row reads `Coming soon`, and `PlaybookBuyButton`
does not mount. schema.org `PreOrder` asserts the item can be ordered now, which this page
cannot honour. The code comment three lines above it — "so nothing here asserts a purchase
the page cannot take" — is the claim the code then makes.

Not block-class, on three grounds: it is machine-readable metadata rather than a promise
shown to a human; it regresses no user-facing surface; and it is reversible with one line
plus a redeploy, well inside the crawl window. Holding eight live Class A defect fixes off
production over a JSON-LD enum is the worse trade.
→ **DEFER** to the RESUME queue, flagged as the first item in it. Does not block.

### 3. `stripComments` can eat a string literal — **CONFIRMED / ADVISORY**

Premise true. `scripts/retired-phrases-gate.mjs:79` is
`.replace(/([^:"'])\/\/[^\n]*$/gm, "$1")`. A `//` inside a string whose preceding character
is not `:`, `"` or `'` — a space, for instance — takes the rest of the line with it.
`https://` is protected by the colon; `"foo // bar"` is not.

The failure direction matters: this can only produce a **false negative** (a retired phrase
hiding after an in-string `//` escapes the gate). It cannot break a build or fail a clean
tree. It also weakens a gate that did not exist at all before this diff, so the net
movement is still forward.
→ **DEFER** to the RESUME queue. Does not block.

### 4. "SurveyMonkey IPO" unledgered — **REFUTED**

The premise is wrong, and the disproof is in a file that was inside the review text. GLM
looked in `RESUME.md`; the facts ledger is LESSONS #3.

```
$ grep -n "SurveyMonkey" docs/LESSONS_LEARNED.md
121:- **CAP TABLE NAMED — operator confirmed 2026-09-03.** SurveyMonkey and Guardicore both
157:- SurveyMonkey: enterprise sales, **$1M+ toward the IPO**. NEVER: ...
161:  ... **EMPLOYER RULED 2026-09-03, operator verbatim: "I worked at SurveyMonkey"**
$ grep -n "SurveyMonkey" content/citations.ts
22: "$2.33B — SurveyMonkey (SVMK) first-day market valuation, Nasdaq IPO, September 26 2018"
$ grep -n "cap-table" app/llms.txt/route.ts
17: ... SurveyMonkey (cap-table position held through the IPO, 2018) ...
```

An operator-confirmed cap-table position held through the 2018 IPO, with the IPO itself
cited in `content/citations.ts`. Dismissed.

### 5. `app/actions/playbook-checkout.ts` imported but absent — **REFUTED**

GLM raised this conditionally and asked for the check. The file is unchanged by this diff,
which is why it does not appear in it, and it exists on both ends:

```
$ git cat-file -e origin/main:app/actions/playbook-checkout.ts && echo EXISTS
EXISTS on origin/main
$ git cat-file -e HEAD:app/actions/playbook-checkout.ts && echo EXISTS
EXISTS on HEAD
```

`pnpm build` also compiled and type-checked clean, which a missing import could not do.
Dismissed.

### 6. `snapshot-live.py` does not decode `&rsquo;` — **CONFIRMED / ADVISORY, and it lands on the next step**

Premise true. `clean()` at `scripts/snapshot-live.py:30-37` decodes fourteen entities and
none of `&rsquo;`, `&lsquo;`, `&ldquo;`, `&rdquo;`, `&apos;`. `grep -c "&rsquo;"` on
`app/(foyer)/playbook/page.tsx` returns **3**.

This is the one finding that touches the work immediately after this gate. The RESUME ship
gate makes the post-deploy `snapshot-live.py` run "the only verification that counts", so a
check string containing an apostrophe will **false-fail** against a page that is actually
correct. The direction is safe — it cannot manufacture a pass — but whoever reads that
output has to know it, or a healthy page gets read as broken.
→ **DEFER** to the RESUME queue, and carry it into the post-deploy step as a known
tooling gap. Does not block the deploy.

### 7. `cw-lp-block--breath` zeroed by `:last-child` — **CONFIRMED (source) / UNVERIFIABLE (rendered)**

The specificity arithmetic checks out. `app/globals.css:5550`
`[data-mode="cw"] .cw-lp-block--breath` scores (0,2,0); `app/globals.css:5555`
`[data-mode="cw"] .cw-lp-page > .cw-lp-block:last-child` scores (0,4,0) and wins, so the
160px breath collapses to 0 wherever a `--breath` block is also a last child. Whether the
block at `page.tsx:407` or `:539` sits in that position is a **rendered-output** question,
and SKILL §5 forbids refuting one of those by reading source.

Cosmetic either way: the shell's own 128px padding stands in for the 160px gap, and the
code comment says handing the bottom edge to the shell was the intent.
→ **DEFER**, and note that the ship gate already sends a human to scroll `/playbook` in a
real browser at step 3 — the one place this is visible.

## What both live legs independently agreed was clean

Recorded because agreement across lineages is the signal the round exists to produce:

- The `/book` → `/call` rename is complete — hrefs, canonicals, sitemap, email links,
  action text, package delivery — with permanent redirects for both paths in
  `next.config.ts`.
- **No function props cross the Server/Client boundary.** `PlaybookBuyButton` takes
  `label: string` and `className?: string` only, carries `"use client"`, and imports the
  server action directly. This is the class the prompt names highest-value, and it is clean.
- `PLAYBOOK_ON_SALE` is read server-side and ships unset, so the OFF state adds no client
  JS at all — the buy button never mounts.
- Contrast fixes all clear 4.5:1 (worst case 5.27:1, up from 3.43:1).
- No GSAP outside `TitleCard.tsx`; no second signature motion; no `noindex` drift.

## CROSS-REVIEW VERDICT: CONCERNS (5)

Five findings CONFIRMED, all advisory; two REFUTED with re-runnable evidence quoted above;
**zero CONFIRMED block-class findings.** The round is partial — Gemini and GLM ran, Codex
is dead at the account tier — and it is reported as partial rather than as a clean sweep.

**The gate does not block the deploy.** All five CONFIRMED findings go to the RESUME queue,
with #2 (`PreOrder`) first and #6 (`&rsquo;`) carried into the post-deploy verification
step as a known tooling gap.
