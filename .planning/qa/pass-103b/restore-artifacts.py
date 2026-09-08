import hashlib
import json
import pathlib
import subprocess

root = pathlib.Path.cwd().resolve()
qa = (root / '.planning/qa/pass-101').resolve()
paths = subprocess.check_output(['git', 'ls-files', '-z', '--', '.planning/qa/pass-101']).decode().split('\0')
records = []
for path in filter(None, paths):
    target = (root / path).resolve()
    assert target.is_relative_to(qa) and target.is_relative_to(root), target
    indexed = subprocess.check_output(['git', 'show', ':' + path])
    changed = target.read_bytes() != indexed
    if changed:
        target.write_bytes(indexed)
    assert target.read_bytes() == indexed, path
    records.append({'path': path, 'restored': changed, 'sha256': hashlib.sha256(indexed).hexdigest()})

target = root / 'next-env.d.ts'
indexed = subprocess.check_output(['git', 'show', ':next-env.d.ts'])
assert target.read_bytes() == indexed.replace(b'./.next/dev/types/routes.d.ts', b'./.next/types/routes.d.ts')
target.write_bytes(indexed)
assert target.read_bytes() == indexed

out = root / '.planning/qa/pass-103b'
(out / 'restored-artifacts.json').write_text(json.dumps(records, indent=2) + '\n', encoding='utf8')
print(f'PASS restored {sum(r["restored"] for r in records)} changed Pass 101 artifacts from the index; {len(records)}/{len(records)} tracked files byte-identical')
print('PASS restored build-generated next-env.d.ts to indexed bytes')
for args in [
    ['git', 'diff', '--exit-code', '--', '.planning/qa/pass-101', 'next-env.d.ts'],
    ['git', 'status', '--short', '--', '.planning/qa/pass-101'],
    ['git', 'diff', '--check'],
    ['git', 'diff', '--stat'],
    ['git', 'status', '--short'],
]:
    result = subprocess.run(args, capture_output=True)
    print('$', ' '.join(args))
    print(result.stdout.decode('utf8') + result.stderr.decode('utf8'), end='')
    print('exit:', result.returncode)
    assert result.returncode == 0
