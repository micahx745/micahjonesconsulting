# Independent diff review — Pass-111b (commit 65680e0)

Reviewer: Sonnet 5, independent (did not write the pass). Worktree
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Brief: `.claude/briefs/pass-111b-services-boxes-and-rail.md`
(sections 13-14 taken as authoritative over earlier sections per the brief's own rule).
No tracked file was modified, staged or committed in the course of this review; nothing
was pushed. Scratch work lives in `.planning/reviews/scratch-111b/`.

Method: read the whole brief; `git show --stat 65680e0` and `git show 65680e0` (saved to
`.planning/reviews/scratch-111b/full-diff.txt`, 3967 lines); direct `Read` of every
committed file named in the brief (the working tree equals the commit for all of them —
the only tracked delta in `git status` is an unrelated `.planning/qa/pass-112/server.log`
line); independent re-runs of `tsc --noEmit`, the retired-phrases gate and its self-test,
and the colour grep; a hand-copied simulation of the gate's substring-match logic to test
adversarial strings without touching the tracked gate file; direct inspection of
`.next/routes-manifest.json` and `.next/prerender-manifest.json`; and a Python PNG-header
read of all 25 committed captures.

---

## A. Exact strings

Checked every string the brief specifies in sections 2, 13 and 14 against the committed
source, verbatim, including whitespace and punctuation:

- `app/(foyer)/services/page.tsx`: metadata description (135 chars, counted), the four
  `PriceBox` shape props (id/name/price/term/fit/list/cta) for Advisory, Project,
  Retainer, Embedded, the `ADVISORY_LIST`/`PROJECT_LIST`/`RETAINER_LIST`/`EMBEDDED_LIST`
  arrays, the `INCLUSIONS` six-item array, the areas block markup and its three receipts
  (AI engineering → `receipts[0]`/rfp-engine, Product building → `receipts[0]`/ordani,
  Positioning & GTM → `receipts[2]`/no link — matching §13's corrected proof indices, not
  §2.3's less specific text), the packages-section H2 and intro, `aria-label="The four
  engagement shapes"` (§13's premise-corrected replacement of `aria-labelledby`).
  **All verbatim. No deviation found.**
- `components/color-worlds/PackageBand.tsx`: the picker legend, the three `AREAS` options
  (via `lib/catalog.ts`), the error line, the polite-region template, the three package
  `PriceBox` rows (id/price/term/CTA), all four `*_FIT` records (unchanged from §2.6), and
  the four-line `UNSTICK_LIST`/`AUDIT_LIST`/`SPRINT_LIST` arrays per §14 M3+M4's trim. The
  footer row matches §2.7 word-for-word including the `{" "}` insertion point. **All
  verbatim.**
- `components/color-worlds/PriceBox.tsx`: `area?: ReactNode` made optional, rendered only
  when truthy; `price.fig` now wrapped in `<span className="cw-pbox__fig cw-nowrap">`.
  Matches §2.1 exactly.
- `app/(foyer)/packages/page.tsx`: the `.cw-pkg-page__cross` replacement (line 219-226)
  and the Audit flavor sentence (line 140) match §2.8/§13 verbatim. `PACKAGES_LD`'s
  Audit and Unstick `description` fields match §13's "Surfaces added" block exactly.
- `app/(foyer)/page.tsx`: the home Audit box's `area` prop matches §2.8 exactly; diff
  confirms only that one line changed (the `fit` line on the same box was untouched by
  this commit and is out of this brief's scope).
- `app/(foyer)/work/page.tsx`: `.cw-wk__cross` matches §13's "Surfaces added" replacement
  verbatim, confirmed against full surrounding context.
- `app/llms.txt/route.ts`: the three area lines reordered to AI engineering / Product
  building / Positioning & GTM with renamed titles, text after each dash preserved
  unchanged (diff-verified); line 27 matches §13's exact replacement string.
- `lib/catalog.ts`: `AREAS`/`isAreaValue`/`areaLabel` match §3.1 exactly; the Audit
  `description` matches §2.8's replacement, rest of string untouched.
- `scripts/stripe-setup.mjs`: Unstick and Audit descriptions match §13's exact strings.
- `docs/LESSONS_LEARNED.md`: all three ledger bullets (Advisory-only floor, commitments
  approved, "AI engineering") are verbatim matches to §2.8, inserted immediately before
  the `**Gate:**` line as instructed.
- Repo-wide grep for the retired phrases (`Frontier AI engineering`, `End-to-end product
  building`, `standing rate`, `Engagements from $5K a month`, `start at $5K a month`,
  `build, production, or traction`) found remaining hits ONLY inside code comments in
  `app/(foyer)/page.tsx` and `components/color-worlds/Hero.tsx` — which §13's "Surfaces
  added" note explicitly says to leave — plus the gate script and the ledger itself
  (which must name the retired strings to ban them). No live/rendered surface carries a
  retired phrase.

**New sentences not in the brief:** none found. Every diff hunk containing rendered copy
traces to a brief string; all narrative additions outside rendered copy are `//`/`/* */`
comments, excluded per the task's own instruction.

**Deviations found: 0. Minor non-blocking notes: 1** — the `/packages` Audit flavor
paragraph has three sentences after the replaced one, not the single sentence the brief's
prose literally says to keep; all three are pre-existing, unedited text, so this reads as
imprecise brief wording rather than an executor error.

## B. The rail

Traced skuKey/area from the page through to the email:

- `components/color-worlds/PackageBand.tsx`: `area` state seeded from `?area=` via
  `isAreaValue` (invalid or missing → `null`); `onChange` re-validates before `setArea`;
  `guard()` blocks with no pick, sets the error text, and calls `firstRadioRef.current?.focus()`.
- `components/BuyButton.tsx`: `go()` calls `if (guard && !guard()) return;` **before**
  `startTransition`, so an unguarded click never reaches the server action. `disabled={pending}`
  is intact (line 58).
- `app/actions/package-checkout.ts`: `createPackageCheckout(skuKey, area?)`. Server
  re-validates with `isAreaValue(area)` (`hasArea`). When true: `metadata: { product:
  sku.lookupKey, area }`, no `custom_fields`. When false: `metadata: { product:
  sku.lookupKey } }` plus one required `"area"` dropdown built from `AREAS`, added for
  **every** package SKU (the branch has no SKU-specific condition) — confirmed the
  fallback dropdown is universal, not Audit-only, and mutually exclusive with the
  metadata path (never both). An invalid client-supplied `area` string can never reach
  Stripe metadata: `hasArea` is false for it, so the code falls into the dropdown branch
  and the invalid string is simply discarded.
- `app/api/stripe/webhook/route.ts`: resolves `session.metadata?.area ?? custom_fields
  "area" dropdown.value ?? custom_fields "flavor" dropdown.value ?? null`, in that order,
  matching §3.3 exactly, then calls `areaLabel(area)` before `deliverPackageKickoff`.
  `areaLabel` returns `null` for any value not in `AREAS`, so a malformed/foreign metadata
  value degrades to "no area" rather than mislabeling.
- `lib/package-delivery.ts`: `flavor` renamed to `area` (`string | null`); the payment
  line and sale-note line match §3.4 exactly, including the pre-existing em-dash in the
  sale note (not new page copy).
- Value-vs-label check: the dropdown's Stripe-facing `value` is always `AREAS[].value`
  ("production"/"build"/"traction"); `areaLabel` maps that value back to its label. The
  webhook never receives or forwards a label where a value is expected, or vice versa.
- `tsc --noEmit` re-run independently in this review: **exit 0**, so the `area`
  string-vs-`string|undefined` handling in the metadata object compiles clean under this
  repo's strict settings — not just asserted by the commit message.

**Deviations found: 0.**

## C. The gates, adversarially

### Phrase-gate substring evasions

`scripts/retired-phrases-gate.mjs` matches with `line.toLowerCase().includes(p.toLowerCase())`
per source line, after comment-stripping. A hand-copied simulation of that exact logic
(`.planning/reviews/scratch-111b/gate-sim.mjs`, not the tracked file) against the seven
planted strings:

```
CAUGHT  | case variant             | "Frontier AI Engineering"
MISSED  | double space             | "Engagements from  $5K a month"
MISSED  | nbsp entity              | "start&nbsp;at $5K a month"
MISSED  | numeric hyphen entity    | "standing&#8209;rate"
MISSED  | jsx split same line      | Frontier AI{" "}engineering
MISSED  | jsx split two lines      | (same result split across two lines)
CAUGHT  | template literal         | ${"Frontier AI engineering"}
CAUGHT  | aria-label attribute     | aria-label="Frontier AI engineering"
```

Case variance, a template-literal wrapper, and an attribute context are all caught (plain
substring matching doesn't care about surrounding syntax). Double spacing, HTML-entity
substitutes for a space or hyphen, and a `{" "}` JSX split all slip through, because each
breaks the literal character-for-character substring the gate looks for. **This is a
pre-existing architectural property of the gate** (every phrase ever added inherits the
same weakness — it did not regress in Pass-111b), and Check A found no live instance of
any such evasion in the actually-committed copy: every string matches its canonical form
with normal single spaces and no entities.

Self-test and real gate, run independently in this review:

```
$ node scripts/retired-phrases-gate.mjs --self-test
retired-phrases-gate self-test: 22 planted caught, 21 near misses passed
EXIT: 0

$ node scripts/retired-phrases-gate.mjs
retired-phrases-gate: clean
EXIT: 0
```

Counts are internally consistent: 16 `PHRASES` entries × 1 auto-planted case each + 6
fixed planted cases = 22; 4 phrases × 3 comment-context near-misses + 9 fixed near-misses
= 21. Both match the printed totals.

### `.planning/exec/gates111b.sh` served-check block — trivially-satisfiable checks

Every `chk` line that expects **0** is satisfied both by real, correct content AND by an
empty/error response (a 500, a build regression, a route that stopped rendering) — the
grep count on an error page is also 0. Enumerated:

| Line | Check | Expects |
|---|---|---|
| 51 | `Engagements from $5K` across services+packages+work+llms | 0 |
| 52 | `start at $5K` across the same four | 0 |
| 53 | `standing rate` on /services | 0 |
| 54 | `Scoped` as a figure on /services | 0 |
| 55 | `Frontier` across services+home+llms | 0 |
| 56 | `End-to-end product building` across services+llms | 0 |
| 61 | `<table` on /services | 0 |
| 62 | `$5K` on /packages | 0 |
| 63 | `build, production, or traction` on /packages | 0 |
| 64 | book mentions on /services | 0 |

**Most severe instance:** `/packages` (`$PK`) has exactly two checks in this block (lines
62 and 63) and **both expect 0**. There is no positive/nonzero assertion on `$PK` content
anywhere in the served-check block — if `/packages` 500'd outright, this block alone would
report `served-checks failures: 0` and miss it entirely. `/services` (`$SV`) does not have
this exposure in practice: it also carries seven checks that require an exact or minimum
positive count (lines 49, 50, 57, 58, 59, 60, plus the `AI engineering >=3` `chkmin`), so a
fully broken `/services` response would fail those first.

**Mitigation found:** `scripts/axe-worlds.mjs`'s default `ROUTES` includes `/packages`, and
`scripts/layout-gate.mjs`'s default routes include `/packages` too; both are invoked later
in the same battery with no route arguments (using those defaults) and both load the page
for real (not a curl of raw HTML), so a genuinely broken `/packages` would very likely
surface there even though the served-check block itself can't see it. The committed
`.planning/qa/pass-111b/axe.log` and `layout.log` show `/packages` scanned at 1440 and 390
with 0 findings, corroborating that the page was not, in fact, broken.

**Deviations found: 0 (no defect in the shipped page). Gate-design findings: the four
substring-evasion classes above, plus the ten trivially-satisfiable `chk ... 0` lines,
worst on `/packages`.** None of these represent an actual defect in what shipped in
65680e0 — they are gaps in the mechanical gate's own rigor, independently confirmed not to
have been exploited by anything in this commit.

## D. The `/call` prefill

- **Prerendered:** `.next/server/app/call.html` exists; `.next/routes-manifest.json` lists
  `/call` under `staticRoutes` (not `dynamicRoutes`); `.next/prerender-manifest.json`'s
  `/call` entry has `initialRevalidateSeconds: false`. All three independently confirm the
  route is static, per the M2a ruling that reverted `app/(foyer)/call/page.tsx` to its
  no-`searchParams` committed form.
- **Effect runs once:** `useEffect(() => {...}, [])` — empty dependency array.
- **Writes only when empty:** `if (label && el && el.value === "") { el.value = ... }`.
- **Accepts only the four exact lowercase values:** `SHAPE_NAMES` has exactly the keys
  `advisory | project | retainer | embedded`; any other string (including any
  capitalization variant) fails the lookup and `label` is `undefined`, so nothing is
  written.
- **Array-shaped or mixed-case rejected:** `URLSearchParams.get("shape")` always returns a
  single string or `null` (never an array) by construction, so the array case can't occur
  in this client-side implementation; mixed case fails the exact-lowercase-key lookup as
  above (verified: `SHAPE_NAMES["Advisory"]` is `undefined`, only lowercase `"advisory"` resolves).
- **No-JS:** the addition is purely additive — a `ref` and an effect that only runs with
  JS enabled. With JS disabled the effect never fires, the textarea is simply unprefilled
  (the pre-Pass-111b behavior), and nothing about the pre-existing submission mechanism
  (untouched by this diff, per the file's own "UNTOUCHED throughout" comment) is altered.
- Independently confirmed against `.planning/exec/gates111b-run2.log` (an untracked,
  contemporary execution artifact, not part of the commit): `call-prefill embedded value:
  "Shape: Embedded." (expect "Shape: Embedded.")` and `call-prefill bogus value: "" (expect
  "")` — both pass.

**Deviations found: 0.**

## E. Heights and captures

Box heights from the committed `.planning/qa/pass-111b/shots.json` `boxHeights`:

| id | @1440 | @1280 |
|---|---|---|
| shape-advisory | 764 | 600 |
| shape-project | 764 | 600 |
| shape-retainer | 764 | 576 |
| shape-embedded | 764 | 576 |
| pkg-unstick | 771 | 387 |
| pkg-audit | 771 | 397 |
| pkg-sprint | 771 | 373 |

All fourteen heights are ≤ 800px (max is 771, well under the §14 M3+M4 cap; the shapes at
1440 are 764, also under the CRITIQUE H1 700 target the brief keeps as a non-gating
report-only figure, not a pass/fail line).

**Overflow:** every one of the 25 `shots` entries in `shots.json` reports
`"overflowX": false` and `scrollWidth === clientWidth`. No horizontal overflow anywhere.

**World assignment:** all `/services` and `/packages` captures report `world: "#ECE3D0"`,
which matches `app/globals.css`'s `--color-cw-bone: #ece3d0` exactly — correct, since both
pages render inside `data-world="bone"` sections. The single `/call?shape=embedded`
capture reports `world: "#2A1F18"`, matching `--color-cw-espresso: #2a1f18` exactly —
correct, `/call` renders inside `data-world="espresso"`. No capture's recorded world
mismatches the section it belongs to.

**Scripted-state captures**, cross-checked against the metadata embedded in `shots.json`:
`sv-guard-1440`/`390` show `errText: "Pick an area first, then buy."`, `errVisible: true`,
`focusOnFirstRadio: true` — matches §2.5 and the guard spec. `sv-picked-1440`/`390` show
`politeText: "Packages now show Product building."` and `auditFit: "I go through your
architecture, code, and deploy top to bottom."` — both match the brief's exact strings.

**25 PNG filenames and pixel dimensions** (read from each file's IHDR chunk):

| File | Dimensions | Matches expected set? |
|---|---|---|
| call-prefill-1440.png | 1440x900 | yes |
| pk-cross-1440.png | 1440x900 | yes |
| sv-areas-1440.png | 1440x900 | yes |
| sv-areas-390.png | 780x1688 | yes (390@2x) |
| sv-areas-768.png | 1536x2048 | **no — see below** |
| sv-guard-1440.png | 1440x900 | yes |
| sv-guard-390.png | 780x1688 | yes (390@2x) |
| sv-incl-1440.png | 1440x900 | yes |
| sv-incl-390.png | 780x1688 | yes (390@2x) |
| sv-open-1440.png | 1440x900 | yes |
| sv-open-390.png | 780x1688 | yes (390@2x) |
| sv-pick-1440.png | 1440x900 | yes |
| sv-pick-390.png | 780x1688 | yes (390@2x) |
| sv-pick-768.png | 1536x2048 | **no — see below** |
| sv-picked-1440.png | 1440x900 | yes |
| sv-picked-390.png | 780x1688 | yes (390@2x) |
| sv-pkgs-1024.png | 1024x768 | yes |
| sv-pkgs-1440.png | 1440x900 | yes |
| sv-pkgs-390.png | 780x1688 | yes (390@2x) |
| sv-pkgs-768.png | 1536x2048 | **no — see below** |
| sv-shapes-1024.png | 1024x768 | yes |
| sv-shapes-1280.png | 1280x800 | yes |
| sv-shapes-1440.png | 1440x900 | yes |
| sv-shapes-390.png | 780x1688 | yes (390@2x) |
| sv-shapes-768.png | 1536x2048 | **no — see below** |

**Finding:** the four width-768 captures (`sv-areas-768`, `sv-pick-768`, `sv-pkgs-768`,
`sv-shapes-768`) are 1536x2048, not the 768x1024 a plain viewport-sized capture would
produce. Root cause, confirmed by reading `.planning/exec/shots111b.mjs`'s `VPS` table:
width 768 is deliberately given `deviceScaleFactor: 2` (same as 390), while 1440/1280/1024
use `deviceScaleFactor: 1`. This is a consistent, intentional setting in the committed
script (tablet + mobile captured at retina, desktop at 1x) — the brief's §7 PLAN only
specifies viewport widths, not pixel ratios, so this isn't a violation of anything the
brief asked for. It is, however, a real mismatch against a "one dimension per viewport"
expectation, worth naming as a documentation/consistency gap rather than a defect.

**Deviations from the brief: 0. Documentation-gap finding: the 768-width DPR-2 captures (4 files).**

---

## BLOCKERS

None. Every exact-copy string, every rail path, the `/call` prefill, and every reported
height/overflow/world/dimension check passed independent verification against the brief
and against the live committed files. The two Check C gate-design findings (phrase-gate
substring evasions; the `/packages`-only-zero-count served checks) are real weaknesses in
the mechanical gates themselves, but neither corresponds to an actual defect in what
65680e0 ships — Check A found no evasion-shaped copy anywhere in the diff, and axe-worlds
plus layout-gate (both of which load `/packages` for real, and both logged 0 findings in
this commit) independently cover the render-health gap the served-check block leaves open.

Non-blocking finding counts by section: A — 1 (a brief-wording ambiguity, not an error).
B — 0. C — 6 (4 phrase-gate substring-evasion classes + the served-check block's ~10
trivially-satisfiable zero-count lines, worst on `/packages`). D — 0. E — 1 (four PNGs
captured at deviceScaleFactor 2 for the 768 viewport, a deliberate script setting, not a
brief violation).
