# Pass-123a report — three small fixes, measured before and after

Executor: GLM batch (Pass-123a brief, marker `pass123a-lantern-58`). Date 2026-09-19.
Tree: worktree `p106-live`, branch `design/live-evolve`. No commit/push/deploy/stash performed.
Edits applied: exactly the four source files named in the brief (Fix A, B, C).

## Gates before measuring (step 0, 2.5)

- Pre-flight `git status --short -- app components lib content`: empty. Port 3250 free at start.
- Build BEFORE: exit 0, `Compiled successfully in 2.6s`, all gates PASS (`build-before.log`).
- Classic-run validity: sb=15 at every width (12–20 band) — valid.
- Defect premise: `recOver` BEFORE classic = +9.03 / +7.20 / +6.08 / +4.97 / +5.52 / +4.97 / +3.58 / +3.58 / +1.83 / −2.02 / −3.95 px at 390→1440 — >0 at every width 600–1024. Premise TRUE.

## E1–E8

- **E1 PASS** — hidden-scrollbar AFTER vs BEFORE: `recFs` and per-beat `curFs` identical at every width and beat. Max |delta| = 0 (all 11 widths × recFs, 44 beats × curFs).
- **E2 PASS** — classic scrollbar sb=15 at every width, both BEFORE and AFTER runs (15 ∈ [12,20]).
- **E3 FAIL — one cell.** `recOver` ≤ 0.5 at every width AFTER classic: PASS (max −5.72; worst BEFORE +9.03). `allOver` ≤ 0.5 at every beat of every width: FAIL at **W=390 classic beat3 = 1.39** (all other 43 cells ≤ 0.5; max otherwise −9.67). Raw: BEFORE classic same cell = **15.08**; hidden BEFORE = hidden AFTER = 0.08. Reading: the cqi change cut the disclosed-value overflow ~11× but the "Undisclosed" word at 390 still lands 1.39px past `.cw-exits`' right edge. Reaching ≤0.5 needs the 3.05 divisor ~0.3% tighter — outside the specified edits, NOT applied (brief rule: no changes beyond the list).
- **E4 PASS** — AFTER classic, every width: beats 0–3 distinct (`cur=[0,1,2,3]`), `stageTop` == `navH` exactly (69 at ≤760, 81 at ≥761; max diff 0.0px). BEFORE identical: `cur=[0,1,2,3]`, same stageTop values, diff 0.
- **E5 FAIL at literal 4-decimal equality** — BEFORE: 390=0.3318, 1440=0.2035. AFTER: 390=0.3322, 1440=0.2037. Determinism re-run on the UNCHANGED after tree (`cls-after-rerun.txt`): 390=0.3298, 1440=0.1992 — two same-tree runs differ by 0.0024 / 0.0045, an order of magnitude more than the before/after delta (0.0004 / 0.0002). Reading: the probe (sum of every layout-shift entry across scroll animations, LESSONS #29) is nondeterministic at the 4th decimal; the edit delta sits inside the metric's own same-tree noise band. Reported unmet at literal precision for the main session to rule; probe untouched.
- **E6 PASS** — `diff text-before-home.txt text-after-home.txt`: no output (4405 bytes both). `diff text-before-work.txt text-after-work.txt`: no output (2753 bytes both).
- **E7 PASS** — both crossfade SUMMARY blocks: `"stepsUnder3to1": 0` (normal minRatio 3.5359; reduced minRatio 3.1434). Both pasted verbatim below.
- **E8 PARTIAL** — greps PASS: `grep -n "as any" "app/(foyer)/work/page.tsx"` prints nothing; `grep -rn "secttitle--sub" app components` prints nothing. `git diff --stat` lists the four source files **plus two pre-existing dirty logs** (`.planning/exec/glm121-fix2.log`, `.planning/qa/pass-112/server.log`) that were modified BEFORE this batch began (present in the session-start git-status snapshot; this batch never wrote to either — its logs are all new untracked files). Source-file diff = exactly the four files. Not literally "exactly four" in `--stat`.

## Route JS bytes and anchor grep

| route | BEFORE | AFTER |
|---|---|---|
| `/` | files=12 bytes=808864 (789.9 kB) | files=12 bytes=808864 (789.9 kB) — identical |
| `/work` | files=11 bytes=666594 (651.0 kB) | files=11 bytes=666594 (651.0 kB) — identical |

`cw-wx-feat` grep, BEFORE and AFTER (identical): `<a class="cw-wx-feat" aria-label="Guardicore, acquired by Akamai" href="/work/guardicore">` — contains the required aria-label.

## CLS (LESSONS #29 every-entry sum)

| viewport | BEFORE | AFTER | AFTER re-run (same tree) |
|---|---|---|---|
| 390x844 | 0.3318 | 0.3322 | 0.3298 |
| 1440x900 | 0.2035 | 0.2037 | 0.1992 |

## Build / type / format gates (AFTER)

`prettier --check` (four files): `All matched files use Prettier code style!` · `tsc --noEmit`: exit 0, no output · `pnpm build`: exit 0, zero gate failures (`build-after.log`).

## Captures (classic scrollbar, reduced motion, .cw-rec centred)

- `.planning/qa/pass-123/rec-before-classic-600.png` / `-1300.png` / `-1440.png`
- `.planning/qa/pass-123/rec-after-classic-600.png` / `-1300.png` / `-1440.png`

(Not described; the main session opens them.)

## Fit table (BEFORE/AFTER × hidden/classic; beat cells: cur/curFs/curOver/allOver/stageTop)

| W | run | sb | recFs | recOver | beat: cur/curFs/curOver/allOver/stageTop |
|---|---|---|---|---|---|
| 390 | BEFORE hidden | 0 | 213.415 | -5.97 | 0/114.754/-10.45/-10.45/69<br>1/114.754/-10.45/-10.45/69<br>2/114.754/-10.11/-10.11/69<br>3/66.5574/0.08/0.08/69 |
| 390 | AFTER hidden | 0 | 213.415 | -5.97 | 0/114.754/-10.45/-10.45/69<br>1/114.754/-10.45/-10.45/69<br>2/114.754/-10.11/-10.11/69<br>3/66.5574/0.08/0.08/69 |
| 390 | BEFORE classic | 15 | 213.415 | 9.03 | 0/114.754/4.55/4.55/69<br>1/114.754/4.55/4.55/69<br>2/114.754/4.89/4.89/69<br>3/66.5574/15.08/15.08/69 |
| 390 | AFTER classic | 15 | 204.268 | -5.72 | 0/109.836/-10/-10/69<br>1/109.836/-10/-10/69<br>2/109.836/-9.67/-9.67/69<br>3/63.7049/1.39/1.39/69 |
| 600 | BEFORE hidden | 0 | 195.122 | -7.8 | 0/166.2/-68.2/-68.2/69<br>1/166.2/-68.2/-68.2/69<br>2/166.2/-67.7/-67.7/69<br>3/96.396/-75.08/-75.08/69 |
| 600 | AFTER hidden | 0 | 195.122 | -7.8 | 0/166.2/-68.2/-68.2/69<br>1/166.2/-68.2/-68.2/69<br>2/166.2/-67.7/-67.7/69<br>3/96.396/-75.08/-75.08/69 |
| 600 | BEFORE classic | 15 | 195.122 | 7.2 | 0/166.2/-53.2/-53.2/69<br>1/166.2/-53.2/-53.2/69<br>2/166.2/-52.7/-52.7/69<br>3/96.396/-60.08/-60.08/69 |
| 600 | AFTER classic | 15 | 189.895 | -7.59 | 0/166.2/-53.2/-53.2/69<br>1/166.2/-53.2/-53.2/69<br>2/166.2/-52.7/-52.7/69<br>3/96.396/-60.08/-60.08/69 |
| 680 | BEFORE hidden | 0 | 222.997 | -8.92 | 0/166.2/-148.2/-148.2/69<br>1/166.2/-148.2/-148.2/69<br>2/166.2/-147.7/-147.7/69<br>3/96.396/-155.08/-155.08/69 |
| 680 | AFTER hidden | 0 | 222.997 | -8.92 | 0/166.2/-148.2/-148.2/69<br>1/166.2/-148.2/-148.2/69<br>2/166.2/-147.7/-147.7/69<br>3/96.396/-155.08/-155.08/69 |
| 680 | BEFORE classic | 15 | 222.997 | 6.08 | 0/166.2/-133.2/-133.2/69<br>1/166.2/-133.2/-133.2/69<br>2/166.2/-132.7/-132.7/69<br>3/96.396/-140.08/-140.08/69 |
| 680 | AFTER classic | 15 | 217.77 | -8.7 | 0/166.2/-133.2/-133.2/69<br>1/166.2/-133.2/-133.2/69<br>2/166.2/-132.7/-132.7/69<br>3/96.396/-140.08/-140.08/69 |
| 760 | BEFORE hidden | 0 | 250.871 | -10.03 | 0/166.2/-228.2/-228.2/69<br>1/166.2/-228.2/-228.2/69<br>2/166.2/-227.7/-227.7/69<br>3/96.396/-235.08/-235.08/69 |
| 760 | AFTER hidden | 0 | 250.871 | -10.03 | 0/166.2/-228.2/-228.2/69<br>1/166.2/-228.2/-228.2/69<br>2/166.2/-227.7/-227.7/69<br>3/96.396/-235.08/-235.08/69 |
| 760 | BEFORE classic | 15 | 250.871 | 4.97 | 0/166.2/-213.2/-213.2/69<br>1/166.2/-213.2/-213.2/69<br>2/166.2/-212.7/-212.7/69<br>3/96.396/-220.08/-220.08/69 |
| 760 | AFTER classic | 15 | 245.645 | -9.81 | 0/166.2/-213.2/-213.2/69<br>1/166.2/-213.2/-213.2/69<br>2/166.2/-212.7/-212.7/69<br>3/96.396/-220.08/-220.08/69 |
| 761 | BEFORE hidden | 0 | 237.282 | -9.48 | 0/163.8/-196.31/-196.31/81<br>1/163.8/-196.31/-196.31/81<br>2/163.8/-195.81/-195.81/81<br>3/95.004/-202.3/-202.3/81 |
| 761 | AFTER hidden | 0 | 237.282 | -9.48 | 0/163.8/-196.31/-196.31/81<br>1/163.8/-196.31/-196.31/81<br>2/163.8/-195.81/-195.81/81<br>3/95.004/-202.3/-202.3/81 |
| 761 | BEFORE classic | 15 | 237.282 | 5.52 | 0/163.8/-181.31/-181.31/81<br>1/163.8/-181.31/-181.31/81<br>2/163.8/-180.81/-180.81/81<br>3/95.004/-187.3/-187.3/81 |
| 761 | AFTER classic | 15 | 232.056 | -9.28 | 0/163.8/-181.31/-181.31/81<br>1/163.8/-181.31/-181.31/81<br>2/163.8/-180.81/-180.81/81<br>3/95.004/-187.3/-187.3/81 |
| 800 | BEFORE hidden | 0 | 250.871 | -10.03 | 0/163.8/-235.31/-235.31/81<br>1/163.8/-235.31/-235.31/81<br>2/163.8/-234.81/-234.81/81<br>3/95.004/-241.3/-241.3/81 |
| 800 | AFTER hidden | 0 | 250.871 | -10.03 | 0/163.8/-235.31/-235.31/81<br>1/163.8/-235.31/-235.31/81<br>2/163.8/-234.81/-234.81/81<br>3/95.004/-241.3/-241.3/81 |
| 800 | BEFORE classic | 15 | 250.871 | 4.97 | 0/163.8/-220.31/-220.31/81<br>1/163.8/-220.31/-220.31/81<br>2/163.8/-219.81/-219.81/81<br>3/95.004/-226.3/-226.3/81 |
| 800 | AFTER classic | 15 | 245.645 | -9.81 | 0/163.8/-220.31/-220.31/81<br>1/163.8/-220.31/-220.31/81<br>2/163.8/-219.81/-219.81/81<br>3/95.004/-226.3/-226.3/81 |
| 899 | BEFORE hidden | 0 | 285.366 | -11.42 | 0/163.8/-334.31/-334.31/81<br>1/163.8/-334.31/-334.31/81<br>2/163.8/-333.81/-333.81/81<br>3/95.004/-340.3/-340.3/81 |
| 899 | AFTER hidden | 0 | 285.366 | -11.42 | 0/163.8/-334.31/-334.31/81<br>1/163.8/-334.31/-334.31/81<br>2/163.8/-333.81/-333.81/81<br>3/95.004/-340.3/-340.3/81 |
| 899 | BEFORE classic | 15 | 285.366 | 3.58 | 0/163.8/-319.31/-319.31/81<br>1/163.8/-319.31/-319.31/81<br>2/163.8/-318.81/-318.81/81<br>3/95.004/-325.3/-325.3/81 |
| 899 | AFTER classic | 15 | 280.139 | -11.22 | 0/163.8/-319.31/-319.31/81<br>1/163.8/-319.31/-319.31/81<br>2/163.8/-318.81/-318.81/81<br>3/95.004/-325.3/-325.3/81 |
| 900 | BEFORE hidden | 0 | 285.714 | -11.42 | 0/182.82/-279.06/-279.06/81<br>1/182.82/-279.06/-279.06/81<br>2/182.82/-278.52/-278.52/81<br>3/106.035/-286.58/-286.58/81 |
| 900 | AFTER hidden | 0 | 285.714 | -11.42 | 0/182.82/-279.06/-279.06/81<br>1/182.82/-279.06/-279.06/81<br>2/182.82/-278.52/-278.52/81<br>3/106.035/-286.58/-286.58/81 |
| 900 | BEFORE classic | 15 | 285.714 | 3.58 | 0/182.82/-264.06/-264.06/81<br>1/182.82/-264.06/-264.06/81<br>2/182.82/-263.52/-263.52/81<br>3/106.035/-271.58/-271.58/81 |
| 900 | AFTER classic | 15 | 280.488 | -11.23 | 0/179.475/-273.94/-273.94/81<br>1/179.475/-273.94/-273.94/81<br>2/179.475/-273.41/-273.41/81<br>3/104.096/-281.33/-281.33/81 |
| 1024 | BEFORE hidden | 0 | 328.92 | -13.17 | 0/210.466/-321.25/-321.25/81<br>1/210.466/-321.25/-321.25/81<br>2/210.466/-320.61/-320.61/81<br>3/122.07/-329.88/-329.88/81 |
| 1024 | AFTER hidden | 0 | 328.92 | -13.17 | 0/210.466/-321.25/-321.25/81<br>1/210.466/-321.25/-321.25/81<br>2/210.466/-320.61/-320.61/81<br>3/122.07/-329.88/-329.88/81 |
| 1024 | BEFORE classic | 15 | 328.92 | 1.83 | 0/210.466/-306.25/-306.25/81<br>1/210.466/-306.25/-306.25/81<br>2/210.466/-305.61/-305.61/81<br>3/122.07/-314.88/-314.88/81 |
| 1024 | AFTER classic | 15 | 323.693 | -12.94 | 0/207.121/-316.13/-316.13/81<br>1/207.121/-316.13/-316.13/81<br>2/207.121/-315.5/-315.5/81<br>3/120.13/-324.64/-324.64/81 |
| 1300 | BEFORE hidden | 0 | 425.087 | -17.02 | 0/272/-415.14/-415.14/81<br>1/272/-415.14/-415.14/81<br>2/272/-414.33/-414.33/81<br>3/157.76/-426.38/-426.38/81 |
| 1300 | AFTER hidden | 0 | 425.087 | -17.02 | 0/272/-415.14/-415.14/81<br>1/272/-415.14/-415.14/81<br>2/272/-414.33/-414.33/81<br>3/157.76/-426.38/-426.38/81 |
| 1300 | BEFORE classic | 15 | 425.087 | -2.02 | 0/272/-400.14/-400.14/81<br>1/272/-400.14/-400.14/81<br>2/272/-399.33/-399.33/81<br>3/157.76/-411.38/-411.38/81 |
| 1300 | AFTER classic | 15 | 419.861 | -16.78 | 0/268.656/-410.06/-410.06/81<br>1/268.656/-410.06/-410.06/81<br>2/268.656/-409.25/-409.25/81<br>3/155.82/-421.09/-421.09/81 |
| 1440 | BEFORE hidden | 0 | 473.868 | -18.95 | 0/303.213/-462.8/-462.8/81<br>1/303.213/-462.8/-462.8/81<br>2/303.213/-461.89/-461.89/81<br>3/175.864/-475.27/-475.27/81 |
| 1440 | AFTER hidden | 0 | 473.868 | -18.95 | 0/303.213/-462.8/-462.8/81<br>1/303.213/-462.8/-462.8/81<br>2/303.213/-461.89/-461.89/81<br>3/175.864/-475.27/-475.27/81 |
| 1440 | BEFORE classic | 15 | 473.868 | -3.95 | 0/303.213/-447.8/-447.8/81<br>1/303.213/-447.8/-447.8/81<br>2/303.213/-446.89/-446.89/81<br>3/175.864/-460.27/-460.27/81 |
| 1440 | AFTER classic | 15 | 468.641 | -18.73 | 0/299.869/-457.7/-457.7/81<br>1/299.869/-457.7/-457.7/81<br>2/299.869/-456.81/-456.81/81<br>3/173.924/-470.03/-470.03/81 |

## Crossfade SUMMARY (normal motion) — verbatim

```json
{
  "totalSamplesWithCopperVisible": 354,
  "stepsUnder3to1": 0,
  "minRatio": 3.5358621677095745,
  "minRatioDetail": {
    "vp": "390x844",
    "pass": "up",
    "label": "up#32",
    "scrollY": 6677,
    "cls": "cw-exits__val cw-exits__val--undisclosed is-assembled",
    "text": "Undisclosed",
    "rect": {
      "x": 20,
      "y": 362.421875,
      "width": 350.078125,
      "height": 59.90625
    },
    "mode": "text",
    "sampleColor": "rgb(189, 90, 45)",
    "textRgb": [
      189,
      90,
      45
    ],
    "groundRgb": [
      42,
      32,
      25
    ],
    "ratio": 3.5358621677095745
  },
  "worst5": [
    {
      "vp": "390x844",
      "pass": "up",
      "label": "up#32",
      "scrollY": 6677,
      "ratio": 3.5358621677095745,
      "text": "Undisclosed",
      "cls": "cw-exits__val cw-exits__val--undisclosed is-assembled"
    },
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#34",
      "scrollY": 6289,
      "ratio": 3.5446921956083988,
      "text": "Undisclosed",
      "cls": "cw-exits__val cw-exits__val--undisclosed is-assembled"
    },
    {
      "vp": "1440x900",
      "pass": "down",
      "label": "down#0",
      "scrollY": 2675,
      "ratio": 3.5668448138297686,
      "text": "$20",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "down",
      "label": "down#0",
      "scrollY": 2675,
      "ratio": 3.5668448138297686,
      "text": "M+",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "down",
      "label": "down#1",
      "scrollY": 2735,
      "ratio": 3.5668448138297686,
      "text": "$20",
      "cls": "cw-rec__line"
    }
  ]
}
```

## Crossfade SUMMARY (reduced motion) — verbatim

```json
{
  "totalSamplesWithCopperVisible": 158,
  "stepsUnder3to1": 0,
  "minRatio": 3.143359461921532,
  "minRatioDetail": {
    "vp": "1440x900",
    "pass": "up",
    "label": "up#32",
    "scrollY": 3990,
    "cls": "cw-rec__line",
    "text": "$20",
    "rect": {
      "x": 40,
      "y": -457.828125,
      "width": 763.875,
      "height": 569
    },
    "mode": "text",
    "sampleColor": "rgb(189, 90, 45)",
    "textRgb": [
      189,
      90,
      45
    ],
    "groundRgb": [
      36,
      45,
      42
    ],
    "ratio": 3.143359461921532
  },
  "worst5": [
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#32",
      "scrollY": 3990,
      "ratio": 3.143359461921532,
      "text": "$20",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#32",
      "scrollY": 3990,
      "ratio": 3.143359461921532,
      "text": "M+",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#33",
      "scrollY": 3930,
      "ratio": 3.456483409147979,
      "text": "$20",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#33",
      "scrollY": 3930,
      "ratio": 3.456483409147979,
      "text": "M+",
      "cls": "cw-rec__line"
    },
    {
      "vp": "1440x900",
      "pass": "up",
      "label": "up#34",
      "scrollY": 3870,
      "ratio": 3.5358621677095745,
      "text": "$20",
      "cls": "cw-rec__line"
    }
  ]
}
```

## Full git diff of the four source files

```diff
diff --git a/app/(foyer)/page.tsx b/app/(foyer)/page.tsx
index a9e9224..0ff68b7 100644
--- a/app/(foyer)/page.tsx
+++ b/app/(foyer)/page.tsx
@@ -520,12 +520,6 @@ export default function ColorWorldsHome() {
             whole record. Otherwise unchanged from
             Pass-2/Pass-18; only the heading level moved (h2 → h3), since
             "How I work." above is now the section's one accessible name. */}
-        {/* DENSITY FIX (home-pace pass, 2026-09-10): was 56px -- the same
-            unit .cw-exits uses below for its own internal break.
-            Doubled so the shift out of the three-stage loop into the
-            closing tally reads as a full pause, not a half one; paired
-            with cw-secttitle--sub above so the register change is
-            visible in both space and size, not space alone. */}
         {/* Pass-122 (operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS
             VERDICT AND THE FIRST CUT"): "The receipts." is cut from the
             screen and kept for screen readers, same text, so the outline
diff --git a/app/(foyer)/work/page.tsx b/app/(foyer)/work/page.tsx
index d430868..7b2552a 100644
--- a/app/(foyer)/work/page.tsx
+++ b/app/(foyer)/work/page.tsx
@@ -159,13 +159,7 @@ export default async function WorkIndexPage() {
             <ViewTransitionLink
               href={`/work/${featured.slug}`}
               className="cw-wx-feat"
-              // ViewTransitionLinkProps only widens next/link's LinkProps
-              // (href/replace/scroll/etc.), not AnchorHTMLAttributes, so
-              // aria-label isn't in its declared prop type even though the
-              // component forwards ...rest straight onto <Link>, which does
-              // accept it. Spread-as-any is the scoped fix: this file may not
-              // touch view-transition-link.tsx (Pass-122 ship-gate fix 4).
-              {...({ "aria-label": featured.entry.context } as any)}
+              aria-label={featured.entry.context}
             >
               <span className="cw-wx-feat__media" aria-hidden="true">
                 <WorkHeroClip poster={HERO_POSTER} />
diff --git a/app/globals.css b/app/globals.css
index 08cf6c0..6c46903 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -2316,20 +2316,6 @@ body {
   margin: 0;
 }
 
-/* DENSITY FIX (home-pace pass, 2026-09-10): .cw-secttitle is a class-
- * based scale, not a tag-based one (see the fuse-pass comment at
- * app/(foyer)/page.tsx L280) -- so "The receipts." (h3) was rendering
- * exactly as large as "How I work." (h2), two headline-scale words
- * inside one <section>. This modifier gives a closing subhead its own
- * smaller step on the same display face, so only one element per
- * section reads as THE headline. Semantics (h2 vs h3, aria-labelledby)
- * are untouched -- this only changes size, never the tag or the
- * accessible name. */
-[data-mode="cw"] .cw-secttitle--sub {
-  font-size: clamp(26px, 3.6vw, 46px);
-  max-width: 20ch;
-}
-
 /* Clients hover-reveal list */
 [data-mode="cw"] .cw-worklist {
   margin-top: 64px;
@@ -3699,7 +3685,10 @@ body {
  * $20M+ at poster size, fitted to the content column. Under 600px it
  * runs two lines ("$20" / "M+"); above, one line. The divisors are the measured
  * Bricolage 800 advances at -0.035em tracking: "$20" 1.612em, "$20M+" 2.830em,
- * each with a little slack so the ink never meets the gutter. Copper on
+ * each with a little slack so the ink never meets the gutter. Where container
+ * units exist the size comes from the column (cqi), so a classic scrollbar no
+ * longer pushes the "+" into the gutter; the vw lines are the fallback
+ * (Pass-123, cross-review F5). Copper on
  * espresso is large text only (3:1 floor). The Pass-115 HandCircle is gone: at
  * edge-to-edge size a loop has nowhere to go but out of the column, and the
  * clip's settle is this figure's one arrival.
@@ -3710,6 +3699,7 @@ body {
 [data-mode="cw"] .cw-rec {
   --cw-rec-size: calc((100vw - 40px) / 1.64);
   margin-top: 112px;
+  container-type: inline-size;
 }
 @media (min-width: 600px) {
   [data-mode="cw"] .cw-rec {
@@ -3721,6 +3711,16 @@ body {
     --cw-rec-size: calc((100vw - 80px) / 2.87);
   }
 }
+@supports (width: 1cqi) {
+  [data-mode="cw"] .cw-rec {
+    --cw-rec-size: calc(100cqi / 1.64);
+  }
+  @media (min-width: 600px) {
+    [data-mode="cw"] .cw-rec {
+      --cw-rec-size: calc(100cqi / 2.87);
+    }
+  }
+}
 [data-mode="cw"] .cw-rec__num {
   margin: 0;
   font-family: var(--font-cw-display);
@@ -4001,6 +4001,7 @@ body {
   --cw-p: min(calc((100vw - 40px) / 3.05), calc(var(--cw-stage-h) * 0.2));
   --cw-s: min(calc((100vw - 40px) / 5.6), calc(var(--cw-stage-h) * 0.085));
   height: calc(var(--cw-stage-h) + var(--cw-beats, 4) * 50svh);
+  container-type: inline-size;
 }
 [data-mode="cw"] .cw-exits.is-live .cw-exits__stage {
   position: sticky;
@@ -4204,6 +4205,24 @@ body {
     max-width: 22ch;
   }
 }
+@supports (width: 1cqi) {
+  [data-mode="cw"] .cw-exits.is-live {
+    --cw-p: min(calc(100cqi / 3.05), calc(var(--cw-stage-h) * 0.2));
+    --cw-s: min(calc(100cqi / 5.6), calc(var(--cw-stage-h) * 0.085));
+  }
+  @media (min-width: 761px) and (max-width: 899px) {
+    [data-mode="cw"] .cw-exits.is-live {
+      --cw-p: min(calc((100cqi + 40px) / 3.05), calc(var(--cw-stage-h) * 0.2));
+      --cw-s: min(calc((100cqi + 40px) / 5.6), calc(var(--cw-stage-h) * 0.085));
+    }
+  }
+  @media (min-width: 900px) {
+    [data-mode="cw"] .cw-exits.is-live {
+      --cw-p: min(calc(100cqi * 0.68 / 3.05), calc(var(--cw-stage-h) * 0.4));
+      --cw-s: min(calc(5.2cqi + 4.16px), calc(var(--cw-stage-h) * 0.085));
+    }
+  }
+}
 
 @media (max-width: 760px) {
   [data-mode="cw"] .cw-lrow {
diff --git a/components/view-transition-link.tsx b/components/view-transition-link.tsx
index 25579ea..9ec97bd 100644
--- a/components/view-transition-link.tsx
+++ b/components/view-transition-link.tsx
@@ -15,12 +15,14 @@
 
 import Link, { type LinkProps } from "next/link";
 import { useRouter } from "next/navigation";
-import type { MouseEvent, ReactNode } from "react";
+import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
 
-type ViewTransitionLinkProps = LinkProps & {
-  children: ReactNode;
-  className?: string;
-};
+// Anchor attributes (aria-label and the rest) reach <Link> through ...rest.
+type ViewTransitionLinkProps = LinkProps &
+  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
+    children: ReactNode;
+    className?: string;
+  };
 
 /**
  * Wraps next/link so the navigation occurs inside document.startViewTransition()
```
