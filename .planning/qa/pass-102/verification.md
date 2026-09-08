# Pass 102 Step E verification

Applied rows 1-5 and 7-12 of `.planning/copy/PASS-102-TICK-TABLE.md`; row 6 was not applied.
23 approved source substitutions across 14 TSX files. No style, layout, behavior, fact or number edits.

- Production build: exit 0, including copy-lint, vendor gate, retired-phrases gate and render gate (15 routes). See `build.txt`.
- Server: `pnpm start --port 3012` (invoked through Corepack pnpm 10.12.1).
- `python -P scripts/verify-room.py http://localhost:3012/`: 61 checks, 61 pass, 0 fail. See `verify-room.txt`.
- Copy gate: 87 distinct text nodes, zero misses; each new accepted string is cited by PASS-102 row.
- Source and rendered diff: zero unticked changes; metadata and accessible labels also match. See `copy-diff.json`.
- The unchanged `scanString` copy-lint function found zero banned words in all twelve rendered page/width samples.
- axe-core 4.10.2: zero violations before and after, on six routes at both widths, after fonts.ready, 600 ms and a Lenis wheel walk.
- Twelve full-page PNGs captured and visually inspected; no horizontal overflow at either width.
- All 17 built HTML pages were scanned: no remaining old call label. `llms.txt` did not contain that label.
- `git diff --check`: clean. Existing pass-101 verifier artifacts and generated `next-env.d.ts` restored to their original bytes.
- No commit, push or deployment.

The first verifier run lacked FFmpeg on PATH. A temporary FFmpeg installation restored frame extraction; the full verifier rerun passed. Python, Playwright, Chromium and pnpm tooling were also isolated in temporary directories. No project dependencies changed.

## Per-page copy metrics

Sentence averages use Intl.Segmenter for English sentences and words over whitespace-normalized rendered body innerText. Em-dash counts below are body text; each browser title carries one em-dash.

| Page | Em-dashes (390 / 1440) | Average words (390 / 1440) |
|---|---|---|
| / | 0 / 0 | 10.76 / 10.86 |
| /packages | 0 / 0 | 16.39 / 16.61 |
| /playbook | 0 / 0 | 12.12 / 12.17 |
| /work | 0 / 0 | 14.08 / 14.46 |
| /about | 0 / 0 | 12.00 / 12.17 |
| /call | 0 / 0 | 14.77 / 15.15 |

## Changed source files and rows

| File | Rows |
|---|---|
| `app/(room)/about/page.tsx` | 2 |
| `app/(room)/call/page.tsx` | 12 |
| `app/(room)/packages/page.tsx` | 7, 8 |
| `app/(room)/playbook/page.tsx` | 5, 9, 10 |
| `app/(room)/work/page.tsx` | 1, 11 |
| `components/room/Ask.tsx` | 1 |
| `components/room/Bar.tsx` | 1 |
| `components/room/Foot.tsx` | 1 |
| `components/room/HowIWork.tsx` | 3 |
| `components/room/Objections.tsx` | 5 |
| `components/room/Operator.tsx` | 2 |
| `components/room/Packages.tsx` | 1, 4 |
| `components/room/Room.tsx` | 1 |
| `components/room/SiteBar.tsx` | 1 |
| `scripts/verify-room.py` | 1-5, 7-12 (allowlist); 1 (bar and ask expectations) |

## QA artifacts and rows

All paths below are relative to `.planning/qa/pass-102/`. The screenshots carry the visible rows on each route; row 10 is metadata and appears in the JSON evidence.

| File | Rows verified |
|---|---|
| `home-390.png` | 1, 2, 3, 4, 5 |
| `home-1440.png` | 1, 2, 3, 4, 5 |
| `packages-390.png` | 1, 7, 8 |
| `packages-1440.png` | 1, 7, 8 |
| `playbook-390.png` | 1, 5, 9 |
| `playbook-1440.png` | 1, 5, 9 |
| `work-390.png` | 1, 11 |
| `work-1440.png` | 1, 11 |
| `about-390.png` | 1, 2 |
| `about-1440.png` | 1, 2 |
| `call-390.png` | 1, 12 |
| `call-1440.png` | 1, 12 |
| `build.txt` | 1-5, 7-12 |
| `copy-diff.json` | 1-5, 7-12 |
| `page-qa.json` | 1-5, 7-12 |
| `verification.md` | 1-5, 7-12 |
| `verify-room.txt` | 1-5 (home copy), 1 (bar and ask); shared chip contrast |
