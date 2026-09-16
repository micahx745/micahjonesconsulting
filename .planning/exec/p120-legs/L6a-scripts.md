# Leg L6a: section 6 verifier scripts, part A (opus)

`claims120.mjs`, `card1-120.sh`, `lh120-summary.mjs`, and the two existing-gate edits E1
(`scripts/layout-gate.mjs`) and E4 (`.planning/exec/circle115.mjs`). Read brief lines 24-114,
5031-5263 (standing clauses, build order, E1-E4, shared conventions, V1), 5381-5424 (V5-V7 and the
bite proof) and 5424-5523.

## YOUR FILES

- `.planning/exec/claims120.mjs` — new, spec V1 (brief line 5188).
- `.planning/exec/card1-120.sh` — new, spec V5 (line 5381); model it on `.planning/exec/card1-115.sh`.
- `.planning/exec/lh120-summary.mjs` — new, spec V6 (line 5407), with O-j.
- `scripts/layout-gate.mjs` — E1 (line 5098).
- `.planning/exec/circle115.mjs` — E4 (line 5134).

## OVERRIDES

- **O-j** (brief A4 and O3: Lighthouse numbers are REPORTED, not gated, with one hard limit).
  `lh120-summary.mjs [runsDir] [baselineDir]` (defaults `.planning/exec/lh120` and
  `.planning/exec/lh120-prod`; each holds `work-1.json`, `work-2.json`, `work-3.json`). It prints the
  per-run lines V6 specifies for runsDir; prints L1 as
  `INFO L1: median LCP <x>ms (reference 1800, not gated, brief A4)`; gates
  `L1b: median LCP <= production median` as `PASS L1b: got <x> (production <y>)` or
  `FAIL L1b: got <x> (want <= <y>)`; keeps `L2 every run CLS <= 0.05` gated; ends
  `lh120 gate failures: N` counting only L1b and L2, exit 1 when N is not 0. The production baseline
  (three runs of `https://www.micahjonesconsulting.com/work`) is being recorded into
  `.planning/exec/lh120-prod/` by the main session; if those three files exist when you finish, test
  with `node .planning/exec/lh120-summary.mjs .planning/exec/lh120-prod .planning/exec/lh120-prod`
  (expect L1b PASS); otherwise say the test was skipped.
- **O-k** (brief O5): any check that names `guardicore-telaviv-session.jpg` for the Guardicore study
  band names `guardicore-band-960.jpg` instead.
- **O-l** (brief O8 and the DESIGN_BAR R3 rulings of 2026-09-16): the study paper ground is the Color
  Worlds bone `#ECE3D0`, not `#F5EFE4`; ORDANI's paper links and step numerals are ink `#1A1816`; the
  RFP exhibit panel is `#F5EFE4`. Any check that hardcodes the old study paper uses `#ECE3D0`, same
  thresholds.

Every other detail follows the spec text exactly, including `PASS <id>: got <x>` /
`FAIL <id>: got <x> (want <y>)` lines, the final `<name> failures: N` line with exit 1 when N is not 0,
puppeteer-core via `createRequire("C:/tmp/p101tools/package.json")`, and Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`.

## BITE PROOFS (standing clause 3; brief lines 5413-5422)

Run `claims120.mjs` and `card1-120.sh` once each against `https://www.micahjonesconsulting.com`, saving
to `.planning/exec/claims120-bite.txt` and `.planning/exec/card1-120-bite.txt`. Each must exit non-zero
with the named failures present: claims120 K1 on `/work/content-engine` (`290,000`) and K10
(`/work/postmates` status 200); card1-120 the two redirect lines. Do the V5 dpl-id confirmation before
writing `card1-120.sh`; if it differs, stop and report. A script that passes on production is not a
gate: fix YOUR script until it bites for the named reasons, and report what you changed and why.

Never run anything against localhost (no server is up). Do not run layout-gate or circle115 (they need
the local server): run `node --check` on both and paste
`git diff -- scripts/layout-gate.mjs .planning/exec/circle115.mjs`.
