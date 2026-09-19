# Cross-review, Pass-122 ship diff: reconciliation and dispositions (2026-09-18)

Target: `git diff 92095b7..HEAD -- app components content lib scripts package.json` (92095b7 = production).
Input `qa/xr/xr_input.txt` (81,934 bytes; header lists the excluded surfaces: docs/, .claude/, .planning/,
qa/, public/, PNGs, the lockfile).

## Legs (round r1)

| Leg | Status | Verdict |
|---|---|---|
| Gemini (REST, gemini-2.5-flash) | OK (retry 1) | PASS, no findings (shallow) |
| Codex (CLI) | ERROR: ChatGPT usage limit until 2026-09-19 12:17 | none |
| GLM (REST, glm-5.2) | ERROR: HTTP 429, "Insufficient balance" | none |
| Claude (Fable 5.1, same family, NOT independent) | OK | No BLOCK; F1-F5 FIX-LATER; gaps G1, G2 |
| Rendered checks (Sonnet): axe, Lighthouse, crossfade contrast | OK | see below |

**This round is PARTIAL: one independent external leg ran.** Recorded, not rounded up to a full round.

## Dispositions

| Finding | Source | Disposition | Evidence |
|---|---|---|---|
| Copper current exit value on the petrol crossfade, 2.62:1 (floor 3:1), ~250px of scroll, 390 and 1440 | axe flag (wrong mechanism) + crossfade measurement | **CONFIRMED, BLOCK → ADOPT** (fix A) | `.planning/qa/pass-122/preship/crossfade/summary.json`; worst frame `worst-1-390x844-up-y6847.png`; flip pair `worldflip-390x844-y6838-t0/t800.png` (3.35 → 2.59) |
| axe: copper `$20M+` on terracotta 1.49:1 | axe at page bottom | **REFUTED** for `$20M+` | the crossfade run: `.cw-rec__line` never under 3:1 at any of 522 scroll steps; axe read `--cw-bg` in a state no visitor sees with the figure on screen |
| F1 scoreboard assembles at first pixel, not 35% | Fable | CONFIRMED by code (`ExitScoreboard.tsx` `visible = entry.isIntersecting`, threshold 0.35; spec queues an entry on the isIntersecting flip) → ADOPT (fix B) | code read 2026-09-18 |
| F2 back-navigation lands too far down | Fable | code path CONFIRMED (`ExitScoreboard.tsx` early return when the section is above the fold) → ADOPT (fix C); ordering verified in the fix round's Chrome run | fix-round report |
| F3 WorkFigures never assembles under StrictMode | Fable | dev-only → ADOPT (fix E, cheap) | code read |
| F4 `svh` not feature-gated | Fable | ADOPT (fix D) | code read |
| F5 `100vw` sizing vs classic scrollbars: `+` up to ~9px into the gutter below ~1300px on Windows | Fable | **DEFER** to RESUME queue (arithmetic, not overflow; fix is container units, a sizing change needing its own capture round) | Fable report |
| G1 Safari `mix-blend-mode` on `<video>` | Fable | **UNVERIFIABLE here** (Windows, no WebKit build): surfaced to the operator; a post-deploy iPhone look is the check | — |
| G2 back-nav ordering | Fable | verified in the fix round | fix-round report |

Performance (same machine, same Lighthouse, 3 runs, medians): home 0.90 → 0.90, LCP 3594 → 3654ms (noise);
/work 0.92 → 0.92, LCP 3375 → 3373ms; CLS 0 throughout. No regression.

## Verdict

`CROSS-REVIEW VERDICT: BLOCK (1)` until fix A is in and re-measured at 0 steps under 3:1; then the round is
re-verified by the fix round's measurements (a fix pass is itself a review subject).
