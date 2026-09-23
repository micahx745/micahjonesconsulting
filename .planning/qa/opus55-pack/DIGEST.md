# DIGEST: opus55-pack captures (brief `.claude/briefs/opus55-pack-captures.md`)

Executor: GLM 5.3, p106-live worktree, 2026-09-22. Live domain only; no site source changed.

## Pre-flight (rerun in this shell before step 1)

- `node --version` -> `v22.20.0` (matches)
- `python -c "import PIL; print(PIL.__version__)"` -> `12.2.0` (matches)
- `node scripts/harness/visual-qa.mjs --selftest` (PLAYWRIGHT_PATH set) printed:
```
frame: home-390-0
frame: home-390-1
frame: about-390-0
frame: about-390-1
frame: home-1440-0
frame: home-1440-1
frame: about-1440-0
frame: about-1440-1
playwright: found
```
- Curl status of the 12 routes: main session only per the brief; not rerun here.

## Capture run (`node .planning/qa/opus55-pack/capture.mjs`)

24/24 entries, exit code 0. 137 frames total.

| route | width | status | H | frames |
|---|---|---|---|---|
| / | 390 | 200 | 6257 | 8 |
| / | 1440 | 200 | 5633 | 7 |
| /about | 390 | 200 | 3181 | 4 |
| /about | 1440 | 200 | 3098 | 4 |
| /work | 390 | 200 | 4168 | 5 |
| /work | 1440 | 200 | 4346 | 5 |
| /services | 390 | 200 | 9635 | 12 |
| /services | 1440 | 200 | 4882 | 6 |
| /packages | 390 | 200 | 2838 | 4 |
| /packages | 1440 | 200 | 2442 | 3 |
| /contact | 390 | 200 | 1522 | 2 |
| /contact | 1440 | 200 | 1256 | 2 |
| /call | 390 | 200 | 1915 | 3 |
| /call | 1440 | 200 | 1304 | 2 |
| /work/guardicore | 390 | 200 | 5457 | 7 |
| /work/guardicore | 1440 | 200 | 4582 | 6 |
| /work/rfp-engine | 390 | 200 | 7051 | 9 |
| /work/rfp-engine | 1440 | 200 | 6356 | 8 |
| /work/ordani | 390 | 200 | 5443 | 7 |
| /work/ordani | 1440 | 200 | 5287 | 6 |
| /work/content-engine | 390 | 200 | 6002 | 8 |
| /work/content-engine | 1440 | 200 | 5332 | 6 |
| /work/birth-worker | 390 | 200 | 5458 | 7 |
| /work/birth-worker | 1440 | 200 | 4885 | 6 |

## Sheets (24; all PNG, none exceeded 4.5 MB, no JPEG fallback)

01-home-phone.png 1552KB, 01-home-desktop.png 998KB, 02-about-phone.png 827KB,
02-about-desktop.png 535KB, 03-work-phone.png 763KB, 03-work-desktop.png 579KB,
04-services-phone.png 1900KB, 04-services-desktop.png 901KB, 05-packages-phone.png 679KB,
05-packages-desktop.png 349KB, 06-contact-phone.png 306KB, 06-contact-desktop.png 184KB,
07-call-phone.png 376KB, 07-call-desktop.png 193KB, 08-work-guardicore-phone.png 849KB,
08-work-guardicore-desktop.png 367KB, 09-work-rfp-engine-phone.png 1006KB,
09-work-rfp-engine-desktop.png 443KB, 10-work-ordani-phone.png 894KB,
10-work-ordani-desktop.png 531KB, 11-work-content-engine-phone.png 930KB,
11-work-content-engine-desktop.png 407KB, 12-work-birth-worker-phone.png 832KB,
12-work-birth-worker-desktop.png 382KB.

## Errors and warnings

None. The capture run printed only the 24 progress lines above; no `error:` lines, no
Playwright warnings, exit code 0. `make_sheets.py` printed the 24 sheet lines, no fallback.

## Verification (exact outputs)

- `ls .planning/qa/opus55-pack/sheets | wc -l` -> `24` (Expected 24: PASS)
- manifest line -> `24 [200] 2` (Expected `24 [200]`, min frames >= 1: PASS)
- `find .planning/qa/opus55-pack/frames -name "*.png" -size -5k` -> no output (PASS)
- `git status --short --untracked-files=no` -> ` M .claude/RESUME.md` (Expected nothing: DEVIATION)

## Deviation note (git status)

`.claude/RESUME.md` was already modified before this executor's first write (mtime
2026-09-22 18:22:50 -0700). `git diff` shows the main session's own RESUME rewrite recording
this job as in flight ("24 sheets IN FLIGHT, GLM brief `opus55-pack-captures.md`"). This
executor wrote only `.planning/qa/opus55-pack/{capture.mjs,make_sheets.py,manifest.json,
frames/,sheets/,DIGEST.md}`; nothing outside that path was touched, and RESUME.md was left
exactly as the main session wrote it. Reported, not fixed.
