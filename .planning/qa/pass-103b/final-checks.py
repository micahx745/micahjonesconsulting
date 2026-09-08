import json
import pathlib
import subprocess

root = pathlib.Path.cwd()
out = root / '.planning/qa/pass-103b'
paths = subprocess.check_output(['git','ls-files','-z','--','.planning/qa/pass-101']).decode().split('\0')
paths = list(filter(None, paths))
assert all((root/p).read_bytes() == subprocess.check_output(['git','show',':'+p]) for p in paths)
print(f'PASS {len(paths)}/{len(paths)} Pass 101 files byte-identical to index')
assert (root/'next-env.d.ts').read_bytes() == subprocess.check_output(['git','show',':next-env.d.ts'])
print('PASS next-env.d.ts byte-identical to index')

before = json.loads((out/'before.json').read_text(encoding='utf8'))['/playbook@1440']
after = json.loads((out/'after.json').read_text(encoding='utf8'))['/playbook@1440']
assert [(h['text'],h['tag']) for h in before['headings']] == [(h['text'],h['tag']) for h in after['headings']]
for phase in ['wallchartBeforeCapture','wallchartAfterCapture']:
    assert len(after[phase]) == 6 and all(a['state']=='finished' for a in after[phase])
print('PASS final WallChart: 6/6 animations finished before and after screenshot')
print('Final playbook capture viewport:',after['captureViewport'])
pngs = sorted(out.glob('*-390.png')) + sorted(out.glob('*-1440.png'))
assert len(pngs) == 12
print('PASS twelve final page PNGs present')

expected = {'app/(room)/packages/page.tsx','app/(room)/playbook/page.tsx','app/room-and-ledger.css',
            'docs/LESSONS_LEARNED.md','scripts/stripe-setup.mjs','scripts/verify-room.py'}
changed = set(subprocess.check_output(['git','diff','--name-only']).decode().splitlines())
assert changed == expected,changed
print('PASS only six intended tracked content changes')
for args in [
    ['git','branch','--show-current'],
    ['git','diff','--exit-code','--','.planning/qa/pass-101','next-env.d.ts'],
    ['git','diff','--check'],
    ['git','diff','--stat'],
    ['git','status','--short'],
]:
    print('$',' '.join(args))
    result = subprocess.run(args,capture_output=True)
    print(result.stdout.decode('utf8') + result.stderr.decode('utf8'),end='')
    print('exit:',result.returncode)
    assert result.returncode==0
