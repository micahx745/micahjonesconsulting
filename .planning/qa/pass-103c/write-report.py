import json, pathlib

OUT=pathlib.Path(__file__).parent
def load(name):return json.loads((OUT/name).read_text(encoding='utf8'))
def log(name):
 data=(OUT/name).read_bytes()
 return data.decode('utf-16' if data.startswith(b'\xff\xfe') else 'utf8').replace('\r\n','\n').replace('\r','\n').rstrip()
before=load('before.json');after=load('after.json');audit=load('audit.json');restored=load('restored-artifacts.json')
verifier=load('verify-room-result.json');rows=load('applied-rows.json')
assert audit['all_pass'] and restored['all_baseline_bytes_match'] and restored['pass101_diff_exit']==0
assert len(verifier['checks'])==62 and [r['id'] for r in verifier['checks'] if not r['pass']]==['16.2-arrival']
out=[
'Pass 103c verification report',
'Branch: `design/room-and-ledger`. Date: 2026-09-08. Worktree: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p101-integrate`.',
'All ten operator-ticked rows and the packages description stretch are applied. **The build is not green:** row 10 is applied verbatim, but its `/about` description is **176 characters**, exceeding the unchanged render gate’s **160-character** limit by **16**. OpenGraph is the approved text without the trailing ` Oakland, CA.` and is **163 characters**. The render gate checks the standard description, not OpenGraph length. No wording was shortened and no gate was bypassed. This is the outstanding return condition for Fable/operator resolution.',
'`pnpm build` completed copy-lint, vendor and retired-phrase checks, compilation, TypeScript, and static generation; its final render gate returned exit 1 solely for that description. `python -P scripts/verify-room.py` returned **62 checks, 61 pass, 1 fail**: only `16.2-arrival`, “ffmpeg missing or clip absent.” The clip exists; missing ffmpeg is the permitted sandbox limitation. Fable owns the outside-sandbox arrival rerun.',
'No commit, push, deployment, hook bypass, price/fact/link change, or unticked copy change occurred. The initial working tree was clean. Exactly eight source files changed; all new evidence is under `.planning/qa/pass-103c/`. `content/citations.ts`, the catalog, home, components, both earlier tick tables, and shared legacy styles are unchanged.',
'| Row | ID / change | File | Status |\n|---:|---|---|---|'
]
ids={1:'PK15',2:'AB06',3:'GC08',4:'RF03',5:'PB05',6:'CA02',7:'/about order',8:'Six prompt files statement',9:'Nine templates statement',10:'/about metadata + OpenGraph'}
for r in rows:
 status='applied; return-condition: 176 > 160' if r['row']==10 else 'applied'
 out[-1]+=f'\n| {r["row"]} | {ids[r["row"]]} | `{r.get("file","app/(room)/about/page.tsx")}` | {status} |'
out += [
'Not-found rows: **0**. All nine wording/metadata rows match their approved cells, including JSX/entity and MDX splits. RF03 retains bold emphasis around its opening sentence. Section 4 adds only `align-self: stretch` to `#packages .rl-cards > .rl-card > p` inside the existing `min-width: 900px` rule. The copy gate has **10 exact entries** covering the **9 wording/metadata rows**, each cited `PASS-103 reword row N`; row 10 has both descriptions. Superseded explicit entries `PASS-102 row 12` and `PASS-103 row 48` were removed. Row 7 needs no new copy approval.',
'The rendered `/about` paragraph sequence at 390 follows. List-item statements are counted as paragraphs; the responsive AB01/AB02 promise appears once at each width. The labels travel with AB07–AB09.',
'| Position | Before: first six words | After: first six words |\n|---:|---|---|'
]
for i,(b,a) in enumerate(zip(before['/about@390']['paragraphs'],after['/about@390']['paragraphs']),1):
 out[-1]+=f'\n| {i} | {b["firstSix"]} | {a["firstSix"]} |'
out += [
'Approved after order: **AB01/AB02 → AB10 → AB09 → AB11 → AB12 → AB03 → AB07 → AB08 → AB06 → AB04 → AB05**. All 11 reading positions are present; all paragraphs except separately approved AB06 retain their wording. The Guardicore image remains in the AB07 exhibit. The case-studies CTA and closing portrait retain their contents, attributes, and order.',
'Heading outline before: `h1 Operator, not consultant. → h2 Receipts → h2 What I’m known for → h2 Currently`. After, at both widths: `h1 Operator, not consultant. → h2 Currently → h2 What I’m known for → h2 Receipts`. No heading was renamed. IDs `rl-about-title`, `rl-now-title`, and `rl-known-title`, and every other existing page ID and link, are preserved.',
'The first desktop capture exposed a 52.25px film stretch caused by the moved heading’s old section margin and the engagement paragraph’s old spacing. Removing those redundant spacing wrappers/classes within row 7 restored the original square using existing styles. The final source and rendered audits pass. No film, image, or global layout CSS changed.',
'| /about geometry at 1440 | Before | Final |\n|---|---:|---:|\n| Film x / y | 32 / 160 | 32 / 160 |\n| Film width / height | 782.65625 / 782.65625 | 782.65625 / 782.65625 |\n| Intro text x / y | 862.65625 / 160 | 862.65625 / 160 |\n| Portrait width / height | 545.328125 / 681.65625 | 545.328125 / 681.65625 |\n| Closing text width | 664 | 664 |',
'Both desktop column pairs remain aligned; mobile stacks without overflow. The brief’s legacy `.cw-about-intro:has(.cw-portrait)` selector matched **0 elements before and after**: this worktree already uses `.rl-opgrid` for the opening and a `.rl-two` block containing `.cw-portrait` for the closing photograph. Those actual layouts and the untouched legacy selector are verified. Both rendered photograph sources and alt strings are unchanged.',
'Packages at 1440: coordinates are document CSS pixels. The actual painted hairline belongs to the first feature `<li>` (`border-top: 1px`); the description `<p>` and `<ul>` themselves have 0px borders. The measured equivalent of the brief’s seam is the description bottom coinciding with that painted feature border.',
'| Card | Description bottom | Feature-list / first-feature top | Gap |\n|---|---:|---:|---:|'
]
for c in load('borders.json'):
 out[-1]+=f'\n| {c["name"]} | {c["descriptionBottom"]} | {c["firstFeatureTop"]} | {abs(c["descriptionBottom"]-c["firstFeatureTop"])} |'
out += [
'Across-card spread: **0px**; each gap: **0px**, within ±1px. In this Chromium baseline, `align-self: auto` already measured the same seam; the final CSS explicitly computes `stretch` in all three cards as requested. At 390, all recorded card geometry and computed layout values are unchanged.',
'All six changed pages return HTTP 200 at 390 × 844 and 1440 × 900. Axe **4.13.0** reports **0 → 0 violations in all 12 samples**. Each has **0 em-dashes** and **0px horizontal overflow**. Sentence counts use English `Intl.Segmenter` over normalized rendered body `innerText`, matching Pass 103. Every average falls and remains below 25.',
'| Page / width | Words before → after | Sentences before → after | Average before → after |\n|---|---:|---:|---:|'
]
for key,a in after.items():
 b=before[key]
 out[-1]+=f'\n| `{key}` | {b["words"]} → {a["words"]} | {b["sentences"]} → {a["sentences"]} | {b["averageSentenceWords"]:.4f} → {a["averageSentenceWords"]:.4f} |'
out += [
'Twelve final full-page screenshots were captured and visually inspected: `packages`, `about`, `work-guardicore`, `work-rfp-engine`, `playbook`, and `call`, each suffixed `-390.png` and `-1440.png` in this directory. Baselines are in `before/`. Desktop captures wait for fonts plus three seconds. The playbook desktop capture uses the existing Pass 103b method: expand to document height before the font/animation wait, then capture the full viewport so the SVG chart remains finished. The call form was inspected idle; no form was submitted.',
f'Cleanup restored **{len(restored["restored"])} overwritten files**: **12** Pass 101 verifier artifacts and `next-env.d.ts`. All **134** backed-up tracked files match their original bytes, including all **133** tracked Pass 101 files. `git diff --exit-code -- .planning/qa/pass-101 next-env.d.ts` returns **0**. The **40** ignored arrival frames predate this run; their timestamps and the verifier’s early return before touching them confirm they were not generated here. The initial cleanup helper incorrectly classified them as new; its corrected check passes. No new Pass 101 files remain. Temporary servers were stopped.',
'Verification commands and expected outputs are listed below. Bare `pnpm` is unavailable; every `pnpm` command used the existing unchanged CLI via `node C:/Users/micah/AppData/Local/Temp/pass-102-corepack/v1/pnpm/10.12.1/bin/pnpm.cjs`. Browser Python commands used `C:/Users/micah/AppData/Local/Temp/pass-102-python/Scripts/python.exe`, with `PYTHONIOENCODING=utf-8` and `PLAYWRIGHT_BROWSERS_PATH=C:/Users/micah/AppData/Local/Temp/pass-102-browsers`. Other Python commands used `C:/Python314/python.exe`.',
'| Verification command | Expected | Actual / evidence |\n|---|---|---|\n'
'| `git branch --show-current` | `design/room-and-ledger` | Matched |\n'
'| `git status --short` (initial) | Clean | No entries; `initial-status.txt` |\n'
'| `pnpm start --port 3000` | Production server ready | Ready for baseline and both builds; all three stopped afterward |\n'
'| `python -P .planning/qa/pass-103c/page-qa.py before` | 12 HTTP 200 samples, baseline axes/order/metrics | Exit 0; `before.json`, `page-qa-before.txt` |\n'
'| `pnpm exec prettier --check "app/(room)/about/page.tsx"` | All matched files use Prettier code style | Initial check flagged formatting; final check exit 0 after `prettier --write` |\n'
'| `pnpm build` (initial and final) | Exit 0; all package gates pass | Both exit 1 solely for `/about` description 176 > 160; `build-initial.txt`, `build.txt` |\n'
'| `python -P scripts/verify-room.py` (initial and final) | 62 pass, allowing only missing-ffmpeg arrival exception | Both exit 1: 61 pass, 1 permitted sandbox failure; `verify-room.txt`, `verify-room-final.txt`, `verify-room-result.json` |\n'
'| `python -P .planning/qa/pass-103c/page-qa.py after` | 12 screenshots; axe unchanged; dashes ≤1; average ≤25; no overflow | Exit 0; `after-initial.json`, `page-qa-after.txt`; about superseded by final capture |\n'
'| `python -P .planning/qa/pass-103c/page-qa.py after /about` | Exact paragraph order, original film square, axe 0 at both widths | Exit 0; final `after.json`, `page-qa-about-final.txt`, both about PNGs |\n'
'| `python -P .planning/qa/pass-103c/borders.py` | Each seam gap ≤1px and across-card spread ≤1px | Exit 0; all gaps and spread 0px; `borders.json`, `borders.txt` |\n'
'| `python -P .planning/qa/pass-103c/audit.py` | `all_pass: true`; no unauthorized copy, numeric, link, ID, CSS or gate changes | Initial audit caught film stretch; final exit 0, errors `[]`; `audit-initial.json`, `audit.json`, `audit.txt` |\n'
'| `pnpm exec tsx .planning/qa/pass-103c/check-lint.ts` | Zero findings in 9 proposals and 12 rendered samples | Exit 0, findings `[]`; `copy-lint.json`, `copy-lint.txt` |\n'
'| `python -P .planning/qa/pass-103c/restore-artifacts.py` | All baseline bytes match, no new Pass 101 files, content diff 0 | Final exit 0; `restored-artifacts.json`, `restore-artifacts.txt` |\n'
'| `git diff --exit-code -- .planning/qa/pass-101 next-env.d.ts` | Exit 0, no output | Matched; `pass101-diff.txt` |\n'
'| `git diff --check` | Exit 0, no whitespace errors | Matched; `diff-check.txt` |\n'
'| `git status --short` / `git diff --stat` (final) | Only 8 authorized source files plus Pass 103c evidence | Matched; `final-status.txt`, `final-stat.txt` |',
'The initial source-location search attempted `rg`, which is unavailable here; PowerShell reads and Git file lists were used instead. Git emits a read-only warning for the inaccessible global ignore file; source and restoration checks still return the recorded results.',
'Final build output:\n\n```text\n'+log('build.txt')+'\n```',
'Final room-verifier output, preserving every check and measured number:\n\n```text\n'+log('verify-room-final.txt')+'\n```',
'Final Git status:\n\n```text\n'+log('final-status.txt')+'\n```',
'Final diff statistics:\n\n```text\n'+log('final-stat.txt')+'\n```',
'Fable handoff: resolve the approved row-10 description versus the 160-character gate, rerun arrival outside the sandbox, and own any commit. The requested changes remain uncommitted in this worktree.'
]
report='\n\n'.join(out)+'\n'
(OUT/'verification.md').write_text(report,encoding='utf8',newline='')
print(report)
