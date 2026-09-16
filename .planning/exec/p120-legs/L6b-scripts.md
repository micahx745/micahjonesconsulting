# Leg L6b: section 6 verifier scripts, part B (opus)

`page120.mjs`, `settle120.mjs`, `clip120.mjs`, `shots120.mjs`. Read brief lines 24-114, 5031-5064
(standing clauses), 5173-5187 (shared conventions), 5264-5380 (V2-V4), 5412 (V7), 5413-5422 (bite
proof) and 5471-5497 (6.7 captures).

## YOUR FILES

- `.planning/exec/page120.mjs` (V2), `.planning/exec/settle120.mjs` (V3), `.planning/exec/clip120.mjs`
  (V4), `.planning/exec/shots120.mjs` (V7, the captures table in 6.7).

## OVERRIDES

- **O-k** (brief O5): every check or capture that names `guardicore-telaviv-session.jpg` for the
  Guardicore study band uses `guardicore-band-960.jpg` (for example `study-guardicore-band-photo-<w>.png`
  selects the `main img` whose `currentSrc` contains `guardicore-band-960.jpg`). The band photograph is
  now 960x1200 (portrait), rendered in a ~405px column at 1440 and the band's width below 1024.
- **O-l** (brief O8 and the DESIGN_BAR R3 rulings of 2026-09-16): the study paper ground is the Color
  Worlds bone `#ECE3D0` (`--color-cw-bone`), not `#F5EFE4`; ORDANI's paper links and step numerals are
  ink `#1A1816`; the RFP exhibit panel is `#F5EFE4`. Any contrast or ground check in the spec that
  hardcodes `#F5EFE4` as the study paper uses `#ECE3D0`; thresholds unchanged.
- **O-m** (brief O6): the clip now crossfades back to frame 0 over its last 0.5s and is 98 frames,
  4.083s. clip120's C2 range `3.9 <= duration <= 4.2` already holds; do not change it.

Otherwise follow the spec text exactly: output format, the final `<name> failures: N` line with exit 1
when N is not 0, puppeteer-core via `createRequire("C:/tmp/p101tools/package.json")`, the Chrome path,
viewports, and waits.

## BITE PROOFS (brief lines 5413-5422)

Run `page120`, `settle120` and `clip120` once each against `https://www.micahjonesconsulting.com`,
saving `.planning/exec/page120-bite.txt`, `settle120-bite.txt`, `clip120-bite.txt`. Each must exit
non-zero with the named failures present: page120 T10 on each study (the only h1 is `sr-only`);
settle120 S1 or S2 on each study; clip120 C1 (no `<video` on `/work`). Production has no
`/work/birth-worker` (404): the scripts must report that as a failure, not crash. A script that passes
on production is not a gate: fix YOUR script until it bites for the named reasons, and report what you
changed and why. Run `shots120.mjs` only through `node --check` (it needs the local build). Never run
anything against localhost.
