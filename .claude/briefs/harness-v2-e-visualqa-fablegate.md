# Harness v2, run E: C3 visual QA chain + C4 Fable gate wrapper

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch` (default scope). Run after run B (C4 calls
`scripts/harness/digest_check.py`). Read `.claude/briefs/harness-v2-00-common.md` first. Amended 2026-09-22 by the
main session (kickoff): a Sonnet subagent stands in for GLM while GLM is capped; the executor guard does not cover
an in-session subagent, so the common brief's hard rules bind as instructions. Two more rules bind this run: never
run `scripts/fable-gate.ps1` without `-DryRun` (the operator said no Fable calls in this arc), and never open an
image with the Read tool: measure images with PIL (LESSONS #36; the image hook denies the 8th raw image).

## Ruling
C3 takes the mechanical half of visual QA off every model: blank frames, pixel drift against a baseline,
horizontal overflow, axe and Lighthouse results become PASS, CHANGED or FAIL lines plus ONE downscaled contact
sheet. Only the sheet reaches a model (Opus 5.5 pre-screens it; Fable judges it at a gate). C4 makes a Fable gate a
single, counted, lean call: digest in, images before text, several judgments per call, at most three per arc. Its
live use needs the operator's `claude` CLI login, which had expired on 2026-09-22; the dry run needs nothing.
Reason: a Fable juror cost 134,828 tokens for six screenshots (78K of that was a subagent's boot), and a gate
nobody counts drifts past three.

## Files
This run may create or modify only these:
- `scripts/harness/visual_qa.py` (new)
- `scripts/harness/visual-qa.mjs` (new)
- `scripts/fable-gate.ps1` (new)
- `scripts/harness/tests/test_c3_visual_qa.py` (new)
- `scripts/harness/tests/test_c4_fable_gate.py` (new)
- `.planning/harness/digests/run-e.json` (new)

## Pre-flight
Main session, 2026-09-22 19:36 UTC, after runs B, D and C were committed (`545a28f`); all three held (actual
values), and `ls scripts/harness/tests/test_*.py | wc -l` -> `11`:
- `git ls-files ".planning/qa/*.png" ".planning/qa/**/*.png" | wc -l` -> `522`
- `git ls-files .planning/qa/pass-106/after-1440-band01.png` -> `.planning/qa/pass-106/after-1440-band01.png`
- `test -e scripts/harness/digest_check.py; echo $?` -> `0` (after run B)
Executor pre-flight, printed before any edit:
- `python -c "from PIL import Image;im=Image.open('.planning/qa/pass-106/after-1440-band01.png');print(im.size, im.mode)"` -> record it.
- `claude --help` piped to `grep -E -- "--input-format|--strict-mcp-config|--setting-sources|--max-turns|--model"` ->
  record which flags exist. C4 passes only flags that exist; name any missing one in `deviations`.

## Steps

### C3.1 `scripts/harness/visual_qa.py` (Python 3.14 with PIL and numpy)
Modes:
- `--captures DIR --out DIR [--baseline DIR] [--axe-json F] [--lighthouse-json F] [--overflow-json F]`
- `--sheet DIR --out DIR` (the contact sheet only)
- `--selftest`
Per PNG in `--captures` (sorted by name):
- Blank frame: grayscale (`convert("L")`), numpy standard deviation under 2.0 -> FAIL `blank frame (std <x.xx>)`.
- Drift, when the baseline dir has a file of the same name: both as RGB; a size mismatch resizes the capture to the
  baseline's size (LANCZOS) and notes `size changed`; a pixel is changed when its largest channel difference is
  over 16; ratio = changed / total. Over 0.005 -> CHANGED `drift <ratio as %>` (a flag for the pre-screen, not a
  failure); else SAME.
- `--axe-json`: walk the JSON; every object with `impact` of `serious` or `critical` counts. Any -> FAIL.
- `--lighthouse-json`: `categories.performance.score` under 0.95 -> FAIL.
- `--overflow-json`: a list of `{"name", "scrollWidth", "clientWidth"}`; `scrollWidth > clientWidth + 1` -> FAIL
  `horizontal overflow`.
Outputs in `--out`:
- `sheet.png`: each image scaled to 360 px wide (aspect kept) and cropped to at most 640 px tall; a grid of up to 4
  columns; a 24 px label strip under each thumbnail with the file name (`ImageFont.load_default()`); white
  background. If the long edge is over 2576 px, or `ceil(w/28) * ceil(h/28)` is over 4784 visual tokens, scale the
  whole sheet down until both hold.
- `digest.json`, in the E3 digest schema: one item per FAIL or CHANGED, for example
  `{"claim": "home-390-0.png is a blank frame", "evidence": "$ visual_qa.py blank-check home-390-0.png -> std 0.00 < 2.0", "confidence": "high"}`,
  plus one summary item; top-level keys `verdict` (`FAIL`, `CHANGED` or `PASS`), `sheet`, `sheet_tokens`.
- Print one line per image (`<name>: PASS|CHANGED|FAIL <detail>`), then
  `sheet: <w>x<h>, <tokens> visual tokens, <n> images`, then `verdict: <verdict>`.
- Exit 1 when any FAIL, else 0.
`--selftest` (fixtures in a temp dir; prints each check, then `SELFTEST PASS (6 checks)` or
`SELFTEST FAIL (<k> of 6)`):
1. Synthetic `good.png` (390x844, deterministic content from `numpy.random.default_rng(7)`) against an identical
   baseline -> SAME.
2. Synthetic `blank.png` (390x844, uniform RGB 245,239,228) -> FAIL blank frame.
3. `shift.png` = `good.png` with a 120x120 region inverted, against `good.png` as its baseline -> CHANGED, ratio
   over 0.005.
4. The contact sheet of those fixtures exists; its long edge is at most 2576 px and it is at most 4784 visual
   tokens; its `digest.json` passes `python scripts/harness/digest_check.py`.
5. The real capture `.planning/qa/pass-106/after-1440-band01.png` against itself as baseline -> SAME, not blank.
6. A copy of that capture blanked to its own mean colour -> FAIL blank frame.

### C3.2 `scripts/harness/visual-qa.mjs` (Node 22, ESM, no new dependencies)
`node scripts/harness/visual-qa.mjs --base-url URL --routes "/,/about" --widths "390,1440" --out DIR [--baseline DIR] [--frames 6]`
- Playwright: import from `process.env.PLAYWRIGHT_PATH` when set, else `import("playwright")`. When neither
  resolves, print `visual-qa: playwright not found (see scripts/visual-baseline.mjs for setup). Image checks still run on existing captures: python scripts/harness/visual_qa.py --captures <dir> --out <dir>`
  and exit 2. Never install anything.
- For each route and width: viewport `width x (width <= 500 ? 844 : 900)`; `goto` and wait for `networkidle`; take
  VIEWPORT screenshots (never full-page: Color Worlds recolours sections on scroll, briefs README) at scroll offsets
  0, 1, 2 ... times the viewport height, up to `--frames` or the page end, into
  `<out>/frames/<route slug>-<width>-<i>.png` (`/` becomes `home`, other slashes become `-`). Record
  `{"name": "<slug>-<width>", "scrollWidth", "clientWidth"}` per route and width into `<out>/overflow.json`.
- Lighthouse only when `node_modules/.bin/lighthouse` exists locally; otherwise print
  `lighthouse: not installed locally (skipped)`. Never fetch it with npx.
- Then run `python scripts/harness/visual_qa.py --captures <out>/frames --out <out> --overflow-json <out>/overflow.json`
  (plus `--baseline` when given) and exit with its code.
- `--selftest`: no browser and no network. Print the planned frame names for routes `/,/about`, widths `390,1440`
  and 2 frames, one per line as `frame: <name>` (8 lines), then `playwright: found` or `playwright: missing`; exit 0.

### C4 `scripts/fable-gate.ps1` (Windows PowerShell 5.1)
Parameters: `-Digest <file>` (required), `-Question <file>` (required), `-Out <file>` (required),
`-Images <comma-separated paths>` (optional, at most 4), `-Arc <id>` (default: the git branch name, a dash, and
the UTC date `yyyyMMdd`), `[switch]-DryRun`, `-OperatorOk <his words>`.
1. `python scripts/harness/digest_check.py <Digest>` must pass; else
   `Write-Output "fable-gate: the digest fails digest_check (<its output line>)"`, exit 7.
2. Each image must exist, be PNG or JPEG, and have a long edge of at most 2576 px (read the size with
   `python -c` and PIL); more than 4 images, or one too large:
   `Write-Output "fable-gate: downscale first: python scripts/harness/visual_qa.py --sheet <dir> --out <dir>"`, exit 8.
3. Counter `<state>\fable-gates.json` = `{"<arc>": {"count": n, "calls": [{"utc", "out", "operator_ok"}]}}`. When
   count is 3 or more and `-OperatorOk` is empty:
   `Write-Output "fable-gate: arc <arc> has used 3 of 3 Fable gates (AI_ROUTING rule 11). Pass -OperatorOk with his words to run another."`, exit 6. This check runs in dry runs too.
4. The request is ONE stream-json line, `{"type": "user", "message": {"role": "user", "content": [...]}}`, whose
   content is every image first (`{"type": "image", "source": {"type": "base64", "media_type": "image/png" or
   "image/jpeg", "data": "<base64>"}}`), then one text block: the question file's text, a blank line,
   `DIGEST (json):`, the digest text, a blank line, and
   `Answer every question above. For each, start a line with VERDICT: PASS, FIX or FAIL, then at most 12 lines of reasons, each citing a digest item number or an image number.`
   Write it to `<state>\runs\fable-<UTC yyyyMMdd-HHmmss>.request.jsonl` (UTF-8 without BOM).
5. `-DryRun`: write `<Out>.request-preview.json`, the same message with each image's `data` replaced by
   `<base64, N bytes>`. Print `DRY RUN: blocks = <types in order, comma-joined>; arc <arc> count <n>/3; would run: claude -p --model claude-fable-5-1 --input-format stream-json --output-format json --max-turns 1 <the lean flags that exist> (in an empty temp dir)`.
   With `-OperatorOk`, also print `operator OK noted (dry run: not recorded)`. Do not touch the counter. Exit 0.
6. Live: in a fresh empty temp dir (no CLAUDE.md, no .mcp.json), with these env vars REMOVED for the child:
   `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`,
   `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`,
   `ANTHROPIC_DEFAULT_FABLE_MODEL`, `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_MAX_CONTEXT_TOKENS`, `HARNESS_ROLE`,
   `HARNESS_WORKTREE`, `HARNESS_EXECUTOR_SCOPE`. Run
   `claude -p --model claude-fable-5-1 --input-format stream-json --output-format json --max-turns 1` plus
   `--strict-mcp-config` and `--setting-sources project` when the pre-flight found them, with the request file on
   stdin (Start-Process with redirects, as the GLM launcher does), timeout 15 minutes. When the output mentions an
   expired or missing login, print `fable-gate: the claude CLI login has expired; he runs claude once and logs in.`
   and exit 9 without counting. Otherwise write the `result` text to `-Out`, add the call to the counter (with
   `operator_ok`), write `<state>\receipts\fable-<stamp>.json` (`arc`, `count_after`, `session_id`, `usage`,
   `verdict_lines`, `exit_code`), print the result, exit 0.

### Tests
`scripts/harness/tests/test_c3_visual_qa.py`, three checks:
1. `python scripts/harness/visual_qa.py --selftest` -> last line `SELFTEST PASS (6 checks)`.
2. `node scripts/harness/visual-qa.mjs --selftest` -> exit 0; 8 lines starting `frame: `; one line starting
   `playwright: `.
3. `python scripts/harness/visual_qa.py --sheet .planning/qa/pass-106 --out <temp>` -> exit 0; `sheet.png` exists;
   its long edge is at most 2576 px; `ceil(w/28) * ceil(h/28)` is at most 4784.
Last line `PASS C3 3/3`.

`scripts/harness/tests/test_c4_fable_gate.py`, five checks (fresh temp `HARNESS_STATE_DIR`; two 64x64 PNG fixtures
made with PIL; a digest that passes digest_check; a two-line question file):
1. `-DryRun -Images a.png,b.png` -> exit 0; output contains `blocks = image,image,text`; the preview file exists
   and its content block types are `image`, `image`, `text`; no counter file.
2. A counter file holding count 3 for arc `test-arc`, then `-DryRun -Arc test-arc` -> exit 6; output contains
   `3 of 3`.
3. As 2 with `-OperatorOk "test ok"` -> exit 0; output contains `operator OK noted`.
4. A digest padded past 9000 bytes, with `-DryRun` -> exit 7.
5. An image 3000x100, with `-DryRun` -> exit 8; output contains `downscale first`.
Every check passes `-DryRun`: the digest and image checks run before the dry-run branch, so the exits are the same,
and a gate that wrongly fell through could never reach the live Fable call.
Last line `PASS C4 5/5`.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/visual_qa.py --selftest
```
Expected last line: `SELFTEST PASS (6 checks)`
```
python scripts/harness/tests/test_c3_visual_qa.py
```
Expected last line: `PASS C3 3/3`
```
python scripts/harness/tests/test_c4_fable_gate.py
```
Expected last line: `PASS C4 5/5`
```
python scripts/harness/tests/run_all.py
```
Expected: every line `PASS`, then `ALL PASS (<n> files)` where n is the number of `scripts/harness/tests/test_*.py`
files present.
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-e-visualqa-fablegate.md
```
Expected: a line starting `PASS diff scope:`.

## Rejected
- Full-page captures for judging: they freeze every Color Worlds section in the first section's colour.
- pixelmatch or BackstopJS: new downloads; PIL and numpy are already here.
- Gemini or any single model as the visual juror: the research puts vision judges near 72% agreement; the sheet
  goes to Opus 5.5 first and to Fable only at a gate.
- A persistent warm Fable session: a resumed subagent reused about 47% of its cache and only within 5 minutes
  (MJCONSULT 13, 2026-09-22); batching several judgments into one lean call saves more.
- A live Fable call in this arc: the operator said no Fable calls here, and the CLI login is expired.

## Digest
`.planning/harness/digests/run-e.json`; run `"e"`; tests `C3-selftest`, `C3`, `C4`, `run_all`, `diff_scope`.

## Return conditions
The common list, plus: stop if the real capture in the pre-flight is missing, blank, or larger than 2576 px on its
long edge.

## Parked operator decisions
- The first live Fable gate needs him to run `claude` once and log in. That gate is also premise check P8's
  measurement (never taken, GLM capped, `f8538ce`): its receipt's `usage` (input + cache_creation + cache_read)
  is the lean boot, compared with the 78,250-token subagent boot (the subagent probe, `b2bfbf9`).
- Installing Lighthouse locally (a download): his call; until then the chain records it as skipped.
