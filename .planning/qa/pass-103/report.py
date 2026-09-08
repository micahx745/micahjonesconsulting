import json, pathlib, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')

out=pathlib.Path(__file__).parent
rows=json.loads((out/'applied-rows.json').read_text(encoding='utf-8'))
before=json.loads((out/'before.json').read_text(encoding='utf-8'))
after=json.loads((out/'after.json').read_text(encoding='utf-8'))
lines=[
'Pass 103 Step D: 57/57 ticked rows applied verbatim. No not-found rows. No commit or push.',
'',
'**Return condition: `/work/rfp-engine` average sentence length rises**, contrary to brief §5. '
'390px: 11.83 → 11.88 (426 words / 36 sentences → 392 / 33). '
'1440px: 12.33 → 12.42 (444 / 36 → 410 / 33). '
'Rows #28–32 remain applied exactly as ticked; no replacement wording was composed.',
'',
'Only approved source changes were found across 10 copy files. Tags, attributes, comments, numbers, '
'links, unticked prose, and `content/citations.ts` are unchanged. Home source and rendered text are unchanged. '
'Ordani’s cited figures were already literal prose; their wording, emphasis, and citation record are preserved.',
'',
'The copy gate has 57 `PASS-103 row N` entries. The superseded `PASS-102 row 7` entry was removed. '
'Generated metadata matches the existing description-clamping behavior, including approved row #25.',
'',
'| # | ID | File | Line | Status |',
'|---:|---|---|---:|---|'
]
for r in rows:
 status='applied; return-condition on page average' if 28<=r['row']<=32 else 'applied'
 lines.append(f'| {r["row"]} | {r["id"]} | `{r["file"]}` | {r["line"]} | {status} |')
lines += ['',
'Production build: `pnpm build` **exit 0** (pnpm 10.12.1 from the existing temporary Corepack installation). '
'Copy-lint: zero banned words and schema violations; vendor and retired-phrases gates clean. '
'The unchanged copy-lint scanner also found zero banned words in all 57 proposals and 18 rendered samples.',
'', 'Build tail:', '', '```text']
lines += (out/'build.txt').read_text(encoding='utf-8').splitlines()[-7:]
lines += ['```','',
'Built site started with `pnpm start --port 3013`; verifier invoked as '
'`python -P scripts/verify-room.py http://localhost:3013/` using the existing temporary Python/Playwright installation.',
'', '```text','61 checks, 61 pass, 0 fail','```','',
'Sentence averages follow Pass 102: English `Intl.Segmenter` over whitespace-normalized rendered body `innerText`. '
'Body text excludes browser titles. Both before and after use the same widths, viewport heights, fonts, and scroll procedure. '
'The call page captures its idle form; approved conditional messages #56–57 were verified in source. '
'Every measured page is under 25 words and has zero em-dashes. Only the RFP page rises.',
'', '| Page | Em-dashes 390 / 1440 | Avg. 390 before → after | Avg. 1440 before → after |',
'|---|---:|---:|---:|']
for route in ['/packages','/about','/work/ordani','/work/guardicore','/work/rfp-engine','/work/content-engine','/playbook','/call']:
 a,b=after[f'{route}@390'],after[f'{route}@1440']
 pa,pb=before[f'{route}@390'],before[f'{route}@1440']
 lines.append(f'| `{route}` | {a["emDashes"]} / {b["emDashes"]} | {pa["averageSentenceWords"]:.2f} → {a["averageSentenceWords"]:.2f} | {pb["averageSentenceWords"]:.2f} → {b["averageSentenceWords"]:.2f} |')
assert len(list(out.glob('*.png')))==16
lines += ['', '16 full-page PNGs at 390 and 1440 were captured and visually inspected in '
'`.planning/qa/pass-103/`; no horizontal overflow. Names use `packages`, `about`, '
'`work-ordani`, `work-guardicore`, `work-rfp-engine`, `work-content-engine`, `playbook`, and `call` '
'followed by `-390.png` or `-1440.png`. Evidence: `build.txt`, `verify-room.txt`, `copy-diff.json`, '
'`copy-lint.json`, `before.json`, `after.json`, and `applied-rows.json`.',
'', '`git diff --check`: clean. Existing Pass 101 verifier artifacts and generated `next-env.d.ts` restored to their original bytes.',
'', '`git status --short`:', '', '```text']
lines += subprocess.check_output(['git','status','--short'],stderr=subprocess.DEVNULL).decode('utf-8').splitlines()
lines += ['```','','`git diff --stat` (untracked QA artifacts are not included):','','```text']
lines += subprocess.check_output(['git','diff','--stat']).decode('utf-8').splitlines()
lines += ['```','']
report='\n'.join(lines)
(out/'verification.md').write_text(report,encoding='utf-8')
print(report)
