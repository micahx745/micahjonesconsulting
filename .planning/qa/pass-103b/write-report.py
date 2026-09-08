import json
import pathlib
import subprocess

OUT = pathlib.Path(__file__).parent

def read(name):
    raw = (OUT / name).read_bytes()
    return raw.decode('utf-16' if raw.startswith((b'\xff\xfe', b'\xfe\xff')) else 'utf-8-sig').replace('\r\n', '\n')

# PowerShell Tee-Object uses UTF-16; keep the review artifacts portable.
for path in OUT.iterdir():
    if path.suffix in ('.txt', '.json') and path.read_bytes().startswith((b'\xff\xfe', b'\xfe\xff')):
        path.write_text(read(path.name), encoding='utf8', newline='\n')

audit = json.loads(read('audit-run2.json'))
after = json.loads(read('after.json'))
before_compiler = json.loads(read('compiler-run2-before.json'))
after_compiler = json.loads(read('compiler-after.json'))
restored = json.loads(read('restored-artifacts.json'))
chart = after['/playbook@1440']
assert all(x['state'] == 'finished' for x in chart['wallchartBeforeCapture'])
assert all(x['state'] == 'finished' for x in chart['wallchartAfterCapture'])

parts = [f'''Pass 103b, run 2 — implementation and verification report

Branch: `design/room-and-ledger`. Worktree: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate`. Date: 2026-09-08.

Sections 1–6 have been executed. The build passed. The 62-check room verifier returned **61 pass, 1 fail**, solely the amended section 7 sandbox exception: `16.2-arrival` could not measure because “ffmpeg missing or clip absent.” Every measured fingertip check passed, and the retained Price-row regression check now passes. Fable must run the final verify-room outside this sandbox. No commit, push, hook bypass, Stripe setup execution, price/fact/link change, or Pass 102/103 ticked-string change occurred.

Section 1: the two derived Audit descriptions now use “what to fix in order.” The Stripe setup description is byte-identical to `lib/catalog.ts`; the catalog itself is unchanged. Required grep counts are **0, 0, 0**. GNU grep exits 1 when no matches exist, which is the intended result for this negative search.

Section 2: the explicit JSX `{{" "}}` preserves the separator after the `$99` span. The existing run-1 `103b-playbook-price-space` check remains in `scripts/verify-room.py`. LESSONS **#19** records the demonstrated mechanism and exact rendered-text gate.

The installed Next 16.2.6 SWC compiler loses the leading space of the entity-bearing multiline JSX text run before browser rendering. The isolated control cases demonstrate the interaction:

| Compiler probe | Rendered text after the span |
|---|---|
| Entity, multiline | `at launch · $149 after` — space lost |
| Entity, single line | ` at launch · $149 after` — space retained |
| Plain slash, multiline | ` at launch / $149 after` — space retained |
| Explicit JSX space, entity, multiline | ` at launch · $149 after` — space retained |

Original built fragment:

```html
{before_compiler['builtPrice']}
```

Rebuilt fragment:

```html
{after_compiler['builtPrice']}
```

The HTML comment is React's text-node separator; the real space immediately after `</span>` and the rendered row are correct. The required inline GNU grep pattern returned no output through this Windows argument path. Supplying the exact same 22 pattern bytes through `-f` succeeded and returned `'$99</span> \\n'`, including the space. The raw pattern and output are retained in `compiled-price.pattern` and `compiled-price-pattern-file.txt`.

Section 3: CSS subgrid applies only to `#packages .rl-cards > .rl-card` at `min-width: 900px`. Each card has **five direct children**, so it uses `display: grid; grid-template-rows: subgrid; grid-row: span 5`. `row-gap: 0` keeps existing interior spacing instead of inheriting the parent's inter-card gap. No markup, class, token, or hex value was added.

| Card | First feature y before | First feature y after | Buy button y before | Buy button y after |
|---|---:|---:|---:|---:|''']
for old, new in zip(audit['cards_before_1440'], audit['cards_after_1440']):
    parts.append(f"| {new['name']} | {old['featureY']} | {new['featureY']} | {old['buttonY']} | {new['buttonY']} |")

parts.append('''
Feature spread: **102px → 0px**. Button spread: **0px → 0px**. Both meet the ±1px target. At 390px every recorded package card rectangle, child rectangle, display mode, row setting, feature position, and button position is identical before and after.

Section 4: balanced wrapping covers every h2/h3 in the ported room and theater wrappers, the ledger/card title classes, and the named /call h1. The home wrapper, hero/copper rows, and hand-positioned operator headings are excluded. `app/room.css`, home source, and room components are unchanged. All captured h2/h3 elements compute to `text-wrap: balance`. No manual breaks were inserted.

Last-line word counts use DOM Range rectangles for whitespace-delimited words, with a 2px tolerance when grouping a line:

| Page and named heading | 390 before → after | 1440 before → after |
|---|---:|---:|''')
for h in audit['headings']:
    parts.append(f"| {h['route']}: {h['heading']} | {h['before_390']['last_line_words']} → {h['after_390']['last_line_words']} | {h['before_1440']['last_line_words']} → {h['after_1440']['last_line_words']} |")

parts.append('''
Two widows remain under `balance` at the existing measure and typography: /playbook “One sentence, four rounds apart” at 1440 still ends with `apart`; the /work/guardicore NDA title at 390 still ends with `framework`. Their final lines are recorded in `audit-run2.json`. The brief explicitly allows reporting this limit without manual breaks.

Section 5: twelve final full-page PNGs were captured and visually inspected. Every 1440 capture waited for `document.fonts.ready` plus 3 seconds. Normal animation and full-page scrolling were used to expose the page's finished content. All 12 baseline pages were captured in run 2, including the two missing desktop case studies.

The desktop WallChart needed an additional capture correction. A fresh viewport probe showed its animations naturally finish by 1660ms, but this browser's full-page capture restarted its SVG animations and painted an empty or early chart. An animation-finished wait, capture-time finite-animation handling, a taller partial viewport, and direct CDP full-page capture did not produce the correct pixels; all diagnostic outputs are retained. The final procedure expands the capture viewport to the document's full height *before* waiting for fonts plus 3 seconds, then takes a normal viewport screenshot. It uses the same 1440px width, no animation overrides, and no site-code change. All six animations are finished both before and after capture; the final PNG's full chart was visually checked.
''')
parts.append(f"Final /playbook desktop capture viewport: **{chart['captureViewport']['width']} × {chart['captureViewport']['height']}**. Heading wrapping, visible text, links, and overflow were re-audited after the capture correction. The other desktop captures use 1440 × 900; mobile captures use 390 × 844.\n")
parts.append('''
| Page | 390 screenshot | 1440 screenshot | Axe before → after, both widths | Horizontal overflow |
|---|---|---|---|---|''')
for route in ['/about','/packages','/playbook','/call','/work/guardicore','/work/content-engine']:
    stem = route.strip('/').replace('/', '-')
    axe = '0 → 0' if route in ['/about','/packages','/playbook','/call'] else 'Not requested'
    parts.append(f'| {route} | [{stem}-390.png]({stem}-390.png) | [{stem}-1440.png]({stem}-1440.png) | {axe} | 0px at both widths |')

parts.append(f'''
Section 6: `pnpm build` passed all package-script gates, including TypeScript and the 15-route render gate. Axe {after['/about@390']['axe']['version']} found zero violations in all eight requested runs, unchanged from baseline. Exact-source audits preserve the applied **11 Pass 102 rows and 57 Pass 103 rows** against HEAD, allow only the two authorized derived-string replacements and the explicit price separator, and verify unchanged tags, attributes, numeric values, visible text, and links.

Cleanup: the exact requested `git checkout -- .planning/qa/pass-101` was attempted and failed with exit 128 because the sandbox cannot create the Git worktree's `index.lock`. The fallback reads each tracked artifact from the existing index and restores only workspace file bytes. **{len(restored)}/{len(restored)} tracked Pass 101 files match the index byte for byte**; the build-generated `next-env.d.ts` was also restored. `git diff --exit-code -- .planning/qa/pass-101 next-env.d.ts` returns 0, and `git diff --check` returns 0.

Git's read-only index retains stale size/stat records for two restored JSON files, so `git status` can still display them as modified despite an empty content diff and exact indexed bytes. No index metadata or permissions were changed. `git diff --stat` contains only the six intended tracked source/document changes: packages page, playbook page, room-and-ledger CSS, LESSONS, Stripe setup mirror, and verify-room. New QA evidence is confined to `.planning/qa/pass-103b/`.

Section 7 disposition: continue and hand off under Fable's amended sandbox exception. No measured fingertip failure, ticked-string change, unapproved markup change, or undemonstrated whitespace mechanism occurred. Fable owns the final outside-sandbox verifier run and any commit. The temporary production server was stopped.

The run-1 report is preserved as `verification-run1.md`. `before.json`, `after.json`, `audit-run2.json`, compiler probes, and `verify-room-after.json` contain the structured evidence. The room-verifier JSON retains its original Pass 101 screenshot paths; those tracked artifacts have been restored as instructed.

Commands and outputs follow. Python browser commands use this existing accessible environment (no installation or permission changes):

```powershell
$env:PATH='C:/Users/micah/AppData/Local/Temp/pass-102-python/Scripts;'+$env:PATH
$env:PYTHONIOENCODING='utf-8'
$env:PLAYWRIGHT_BROWSERS_PATH='C:/Users/micah/AppData/Local/Temp/pass-102-browsers'
```

Bare `pnpm` was absent from PATH. Its existing 10.12.1 CLI was invoked through Node, running the unchanged package scripts and all gates. `grep` resolves to `C:/Program Files/Git/usr/bin/grep.exe`. PowerShell's captured stderr wrappers are preserved below.
''')

def block(command, filename, code):
    parts.append(f'`{command}` — exit {code}; complete output ({filename}):\n\n```text\n{read(filename).rstrip()}\n```\n')

parts.append('''Initial checks: `git branch --show-current` returned `design/room-and-ledger`; `git status --short` showed the retained verify-room edit, the run-1 QA directory, and twelve existing dirty Pass 101 artifacts. The pre-fix phrase command was:

```text
$ grep -c "prioritized fix sequence" "app/(room)/packages/page.tsx" lib/catalog.ts scripts/stripe-setup.mjs
app/(room)/packages/page.tsx:1
lib/catalog.ts:0
scripts/stripe-setup.mjs:1
```

The pre-fix browser regression was invoked with `python -P -` using the same locator and exact-string assertion as the retained verify-room check. Its complete stdout/stderr is below.
''')
block('node .planning/qa/pass-103b/compiler-probe.cjs', 'compiler-run2-before.json', 0)
block('python -P - (pre-fix Price-row assertion)', 'price-run2-before.txt', 1)
block('python -P .planning/qa/pass-103b/page-qa.py before', 'page-qa-run2-before.txt', 0)
block('grep -c "prioritized fix sequence" "app/(room)/packages/page.tsx" lib/catalog.ts scripts/stripe-setup.mjs', 'retired-phrase.txt', 1)
block('node C:/Users/micah/AppData/Local/Temp/pass-102-corepack/v1/pnpm/10.12.1/bin/pnpm.cjs build', 'build.txt', 0)
parts.append('''`node C:/Users/micah/AppData/Local/Temp/pass-102-corepack/v1/pnpm/10.12.1/bin/pnpm.cjs start --port 3000` served the baseline build (ready in 145ms), then was stopped before building. The same command served the rebuilt app (ready in 146ms); its complete output is retained in `server-after.txt`. Both servers were stopped with Ctrl-C after their work.

```text
$ grep -o '$99</span>[^<]\\{0,12\\}' .next/server/app/playbook.html
(no stdout; exit 1)

The exact-pattern Python subprocess invocation also returned exit 1.
Argument-isolation probes:
grep -oF '$99</span>' -> '$99</span>\\n', exit 0
grep -o '$99</span>' -> '$99</span>\\n', exit 0
grep -o '99</span>[^<]\\{0,12\\}' -> no stdout, exit 1
grep -o '\\$99</span>[^<]\\{0,12\\}' -> no stdout, exit 1
grep --version -> GNU grep 3.0

Exact pattern bytes in compiled-price.pattern:
[36, 57, 57, 60, 47, 115, 112, 97, 110, 62, 91, 94, 60, 93, 92, 123, 48, 44, 49, 50, 92, 125]
$ grep -o -f .planning/qa/pass-103b/compiled-price.pattern .next/server/app/playbook.html
$99</span> 
(exit 0; the line has a real trailing space)
```
''')
block('node .planning/qa/pass-103b/compiler-probe.cjs (rebuilt page)', 'compiler-after.json', 0)
block('python -P -u scripts/verify-room.py', 'verify-room-after.txt', 1)
block('python -P .planning/qa/pass-103b/page-qa.py after', 'page-qa-after.txt', 0)
block('python -P .planning/qa/pass-103b/audit-run2.py (initial final-page audit)', 'audit-run2.txt', 0)
block('python -P - (WallChart natural-finish and viewport-capture diagnostic)', 'wallchart-probe.txt', 0)
for filename, command in [
    ('playbook-recapture.txt', 'python -P .planning/qa/pass-103b/page-qa.py after /playbook (finished-animation wait)'),
    ('playbook-recapture-final.txt', 'python -P .planning/qa/pass-103b/page-qa.py after /playbook 1440 (finite-animation capture trial)'),
    ('playbook-recapture-viewport.txt', 'python -P .planning/qa/pass-103b/page-qa.py after /playbook 1440 (1450px viewport trial)'),
    ('playbook-recapture-cdp.txt', 'python -P .planning/qa/pass-103b/page-qa.py after /playbook 1440 (CDP full-page trial)'),
    ('playbook-recapture-surface.txt', 'python -P .planning/qa/pass-103b/page-qa.py after /playbook 1440 (final full-height capture surface)'),
]:
    block(command, filename, 0)
block('python -P .planning/qa/pass-103b/audit-run2.py (after final capture)', 'audit-run2-final.txt', 0)
block('git checkout -- .planning/qa/pass-101', 'restore-pass-101.txt', 128)
block('python -P .planning/qa/pass-103b/restore-artifacts.py', 'restore-artifacts.txt', 0)
block('python -P .planning/qa/pass-103b/final-checks.py', 'final-checks.txt', 0)

report = '\n'.join(parts)
target = OUT / 'verification.md'
archive = OUT / 'verification-run1.md'
if not archive.exists():
    archive.write_bytes(target.read_bytes())
target.write_text(report, encoding='utf8', newline='\n')
print(report)
