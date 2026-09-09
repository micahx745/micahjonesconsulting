# Pass 106 apply plan - evolving the live home

Produced 2026-09-09 by an 11-agent workflow: five section specs drafted, each handed to a
SEPARATE adversarial checker (anchors verbatim+unique, banned words, em-dash delta,
invented facts, constitution). All five returned FIX with identified fixes; none REJECT.
Checks: [{"section": "credential", "verdict": "FIX"}, {"section": "howiwork", "verdict": "FIX"}, {"section": "order", "verdict": "FIX"}, {"section": "audit", "verdict": "FIX"}, {"section": "hero-opening", "verdict": "FIX"}]

---

# APPLY PLAN — Pass-106 home/packages evolution

## 1. ORDER

**A. `app/(foyer)/page.tsx` — apply in this exact sequence (one file, one pass):**

| # | Patch | Reason for this position |
|---|---|---|
| 1 | `order`/patch2 — delete `CLIENT_OFFERS` const | No dependents. Cut first so nothing downstream references it. |
| 2 | `audit`/patch1 — insert `id="offer"` section before Clients | **Must precede `order`/patch4.** Its anchor ends on the literal `{/* CLIENTS — bone */}` + `<section id="clients"...>` text; `order`/patch4 destroys that exact text. Gated on R4/R5 (§3). |
| 3 | `order`/patch3 — **anchor extended** (see §2, Collision C) — remove old Ledger from between Ordani/Two-doors | Must precede `order`/patch4 per the spec's own stated requirement (patch4's replacement contains a second copy of this anchor). |
| 4 | `order`/patch4 — replace Clients section with deletion-note + relocated Ledger | Depends on 2 (Clients text still intact to match) and 3 (old Ledger already excised, so no duplicate). |
| 5 | `order`/patch5 — fix "Sits between Services...Ordani" comment | Independent text region, any time after 4. |
| 6 | `howiwork`/patch2 — fix Pass-27 comment | Independent text region (different comment than #5). |
| 7 | `howiwork`/patch3 — **content fixed** (see §2/§ "FIX" below) — rewrite the three principle rows | Independent of the section move; must use the mono-safe proof-line rewrite, not the original. |
| 8 | `credential`/patch4 — insert Neuton.AI + `$5B+` summary rows into Ledger | **Must follow 3+4.** Anchor is the Postmates row, which exists only once — at the *new* Ledger location, post-move. Applying earlier hits the old location and the text is lost when patch4 recreates the ledger verbatim without it. |
| 9 | Header comment — **merged** `order`/patch1 base + `howiwork`/patch1's inversion clause (see §2, Collision A) | Apply last: pure documentation, safest once the real structural end-state (1–8) is final. |

Verify after step 9 (§5, "page.tsx pass").

**B. `app/globals.css` — any internal order (anchors are textually disjoint), but do the whole file in one pass:**

| # | Patch |
|---|---|
| 10 | `howiwork`/patch4 — CSS swap + `.cw-principle__proof` |
| 11 | `audit`/patch3 — **fixed** (delete orphaned `.cw-pkg--lead` rules, correct the margin-top narrative) — gated on R5 |
| 12 | `hero-opening`/patch2 — **fixed** (see §2 "FIX") — `.cw-sub-buyer` styles |

**C. `app/(foyer)/packages/page.tsx`:**

| # | Patch |
|---|---|
| 13 | `audit`/patch2 — Audit hero promotion, Unstick/Sprint demotion — gated on R5, pairs with step 11 |

**D. `components/color-worlds/Hero.tsx`:**

| # | Patch |
|---|---|
| 14 | `hero-opening`/patch1 — **fixed** — insert `.cw-sub-buyer` paragraph |
| 15 | `hero-opening`/patch3 — cut "Hire me" CTA — gated on R3 |

**E. Ruling-gated block — only if R1 is approved, all three together or none:**

| # | Patch |
|---|---|
| 16a | `credential`/patch1 (Hero.tsx) — chips → prose credential line |
| 16b | `credential`/patch3 (Hero.tsx) — remove chip-drift `useEffect` |
| 16c | `credential`/patch2 (globals.css) — **fixed** (see §2 "FIX") — chip CSS → `.cw-hero-credential` CSS |

These three are mutually dependent (16a removes the JSX that consumes 16c's CSS and the `--hero-scroll` var 16b stops writing) — apply as one unit, never partially.

**Not a step:** `hero-opening`/patch4 (H1 rotation swap) has no patch text — it's `N/A`. If R2 is approved, that requires a **new** patch spec, out of scope here.

---

## 2. COLLISIONS

**Collision A — `page.tsx` header comment (lines ~7-29).**
`order`/patch1 fully rewrites the block; `howiwork`/patch1 edits a substring of the *same original text* (the "How I work → bone" bullet). Apply both as one merged edit — use `order`/patch1's replacement as the base, and fold this into its "How I work" bullet:
```
//   How I work    → bone   (Pass-21: NEW Operating Principles section
//                           per Claude Chat audit — missing-surface gap.
//                           Three named stages: Diagnose / Build /
//                           Position. Pass-106: now sits between The
//                           receipts and Ordani; Services no longer has
//                           a section of its own on this page. Inverted
//                           so the named artifact leads and the verb
//                           subordinates, each step proved by a deal
//                           already on the page.)
```
Do not apply `howiwork`/patch1 standalone — its anchor won't exist once `order`/patch1 lands, and vice versa.

**Collision B — `page.tsx` CLIENTS section.**
`audit`/patch1 inserts *before* it; `order`/patch4 deletes/replaces it entirely. Not a text merge — a **strict order constraint**: audit patch1 before order patch4 (see §1, Step 2/4).

**Collision C — `page.tsx` the Ledger content itself.**
`order`/patch3's anchor as written stops at the dek's `</p>` (misses the `<div className="cw-ledger">…</div>` and the closing `</section>`) — this is the checker's found bug. **Fix:** extend the anchor to the full original section, ending at the actual closing `</section>` tag (the same block that appears verbatim as the back half of `order`/patch4's replacement text — copy that span). Replacement text is unchanged (the short relocation note). Without this fix, applying patch3 then patch4 leaves a duplicate, unclosed ledger block and the build fails with `TS17015`/`TS1128` (confirmed by the checker).
Then `credential`/patch4 targets the Postmates row *inside* this same Ledger — must run after 3+4 (see §1, Step 8).

No collisions found in `globals.css` (four disjoint blocks: chips, principles, packages, hero-sub) or across `Hero.tsx` vs `page.tsx`/`packages/page.tsx` (different files).

---

## 3. OPERATOR RULINGS NEEDED

1. **Hero credential grammar.** Retire the two-stat floating `.cw-chip`/`.cw-chips` treatment (Pass-7's naked-type grammar, landed after two rejected card versions — "look weak," "look ai") for one plain sentence in the hero's body voice? Gates Step 16 (all of it).
2. **Rotating-word H1.** The research wants the rotating H1 killed and replaced with "Strategy and software, shipped by the same pair of hands." This is the same structural move already tried and reversed twice (Hero.tsx's own header: *"I love the first hero"*). Keep the rotation (default, no patch exists either way) or authorize a new patch?
3. **CTA-row cut.** Remove "Hire me" (→ /services) from the hero's three-button row, keeping "See the work" + "Book a free intro call"? This reverses part of the locked W3/D7 decision (2026-08-11, *"DISCUSSION CLOSED… all 13 decisions locked"*). Gates Step 15.
4. **New home-page price.** Add an "Offer" section directly under the Hero stating "The Audit. $2,500. Two weeks." — the first specific price to appear above the fold (today it's buried in the closing doors section)? Gates Step 2.
5. **Packages hierarchy.** On `/packages`, promote the Audit to a standalone full-width hero card, demoting Unstick ($500) and Sprint ($7,500) into a smaller paired row under "Two other ways to work with me"? No price/deliverable/SKU changes, visual hierarchy only. Gates Steps 11 and 13.
6. **Neuton.AI Ledger row (low-risk, included per the strict "any claim" instruction).** Add a Neuton.AI row + a demoted "$5B+ combined, disclosed value only" summary row to the home Ledger, completing the four-exit claim the site already makes on /about and in metadata? No new fact is disclosed — only relocated into the "ask about any of them" table. Recommend approving; flagging per instruction, not because the checker found risk.

---

## 4. WHAT TO DROP

**Nothing.** All five checks returned `FIX`, none returned `REJECT`, and every FIX has a clear, already-identified fix (below) — so no patch is dropped outright.

The one item that's *effectively* dropped rather than fixed: `howiwork`/patch1 is not applied standalone — it's absorbed into the Collision-A merge (§2). Don't apply it as its own Edit.

**FIX list (must be corrected before use, not shipped as originally written):**
- `credential`/patch2 — opacity rule never applies (`.cw-reveal.is-in` outguns it on specificity, and reduced-motion forces `opacity:1!important`). Fix: `[data-mode="cw"] .cw-hero-credential.is-in { opacity: 0.92; }` (drop the bare-selector opacity line), matching the existing `.cw-rev__exits-line.is-in` pattern.
- `howiwork`/patch3 — steps 01/03 `.cw-principle__proof` render full narrative sentences in JetBrains Mono, violating "mono = labels/data only, never body." Fix: rewrite as `·`-joined data fragments, matching `.cw-lrow__out`'s own convention, e.g.:
  - 01: `<strong>Guardicore</strong>: message/buyer mismatch found · <strong>$14M in revenue</strong>`
  - 03: `<strong>Guardicore</strong>: repositioning carried through · <strong>Akamai acquisition</strong>, 2021`
- `order`/patch3 — anchor truncated, see Collision C. Extend to the full section through the real closing `</section>`.
- `audit`/patch3 — delete the now-orphaned `.cw-pkg--lead` and `.cw-pkg--lead .cw-pkg__cta` rules (patch2 removes their only JSX usage); also correct the "why" claim that no competing `margin-top` rule exists (one does, at the lower-specificity `.cw-pkgs` rule — harmless but the narrative is wrong).
- `hero-opening`/patch1+2 — the new `<p className="cw-sub-buyer">` isn't wired into the sitewide `.cw-reveal` system (every sibling line is). Fix: add `className="cw-sub-buyer cw-reveal"` and an inline `transitionDelay` (e.g. `560ms`, after `.cw-sub`'s own). And opacity `0.72` is unverified against this lighter photo region (the only precedent, `.cw-chip__sub` at 0.72, sits in the *darkest* part of the veil). Fix: default to `0.92` (matching `.cw-sub`'s already-verified floor in the same region) targeted as `.cw-sub-buyer.is-in`, pending a real contrast measurement.

---

## 5. VERIFICATION

Run from repo root (`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`).

**After Steps 1–9 (page.tsx pass):**
```
npx tsc --noEmit
```
Proves: zero output, exit 0 — catches unbalanced JSX from the Collision-C bug if the fix wasn't applied correctly.
```
npx tsx lib/copy-lint-cli.ts
```
Proves: `Zero banned-word findings, zero schema violations.`
```
grep -c 'CLIENT_OFFERS' "app/(foyer)/page.tsx"
grep -c 'id="clients"' "app/(foyer)/page.tsx"
grep -c 'id="products"' "app/(foyer)/page.tsx"
grep -c 'Neuton.AI' "app/(foyer)/page.tsx"
```
Proves: `0`, `0`, `1` (not duplicated), `1` — confirms the cut/move/insert each landed exactly once.
If Step 2 (audit) shipped: `grep -c 'id="offer"'` → `1`.

**After Steps 10–12 (globals.css pass):**
```
npx next build --webpack
```
Proves: build succeeds (catches CSS/PostCSS syntax errors the greps below can't). *(Use this, not `pnpm build` — Turbopack's font-module error fails on untouched `main` too.)*
```
grep -c 'cw-pkg--lead' app/globals.css
grep -c 'cw-sub-buyer' app/globals.css
```
Proves: `0` if audit's dead-CSS cleanup shipped (else pre-existing count minus the cleaned rules); `1`+ for the new hero-opening class.

**After Step 13 (packages/page.tsx):**
```
grep -c 'skuKey="audit-2500"' "app/(foyer)/packages/page.tsx"
grep -c 'skuKey="unstick-500"' "app/(foyer)/packages/page.tsx"
grep -c 'skuKey="sprint-7500"' "app/(foyer)/packages/page.tsx"
```
Proves: each `1` — all three SKUs survive the restructure untouched.

**After Steps 14–15 (Hero.tsx, non-ruling-gated):**
```
npx tsc --noEmit
grep -c 'cw-sub-buyer' components/color-worlds/Hero.tsx
grep -c 'Hire me' components/color-worlds/Hero.tsx
```
Proves: `1` for the new line; `Hire me` count goes `1 → 0` only if R3 was approved and Step 15 ran.

**If Step 16 ships (R1 approved):**
```
grep -c 'cw-chip' components/color-worlds/Hero.tsx app/globals.css
grep -c '\-\-hero-scroll' components/color-worlds/Hero.tsx app/globals.css
```
Proves: all `0` — chip grammar and its scroll var are fully retired, no dangling references.

**Final gate, every time (after any subset of the above):**
```
npx next build --webpack
npx prettier --check .
```
Proves: production build succeeds (this also re-runs the copy-lint gate via `instrumentation.ts` since it's a real `phase-production-build`), and formatting is clean. Zero non-zero exit codes = ship-ready. Follow with the project's own `/premium audit` pass before the CARD 1 ship flow.