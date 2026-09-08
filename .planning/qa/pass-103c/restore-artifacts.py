import hashlib, json, pathlib, subprocess, zipfile

ROOT=pathlib.Path.cwd().resolve()
OUT=ROOT/'.planning/qa/pass-103c'
with zipfile.ZipFile(OUT/'baseline-artifacts.zip') as z:
 previous=OUT/'restored-artifacts.json'
 changed=json.loads(previous.read_text(encoding='utf8')).get('restored',[]) if previous.exists() else []
 for name in z.namelist():
  path=(ROOT/name).resolve()
  assert path.is_relative_to(ROOT)
  data=z.read(name)
  if not path.exists() or path.read_bytes()!=data:
   path.write_bytes(data)
   if name not in changed:changed.append(name)
 assert all((ROOT/name).read_bytes()==z.read(name) for name in z.namelist())
 report={'restored':changed,'backed_up_files':len(z.namelist()),'all_baseline_bytes_match':True}
 pass101=[p for p in (ROOT/'.planning/qa/pass-101').rglob('*') if p.is_file()]
 untracked=[p for p in pass101 if p.relative_to(ROOT).as_posix() not in z.namelist()]
 cutoff=(OUT/'baseline-artifacts.zip').stat().st_mtime
 report['preexisting_untracked_files']=[p.relative_to(ROOT).as_posix() for p in untracked if p.stat().st_mtime<cutoff]
 report['pass101_new_files']=[p.relative_to(ROOT).as_posix() for p in untracked if p.stat().st_mtime>=cutoff]
report['pass101_diff_exit']=subprocess.run(['git','diff','--exit-code','--','.planning/qa/pass-101','next-env.d.ts']).returncode
(OUT/'restored-artifacts.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report,indent=2))
assert report['pass101_diff_exit']==0 and not report['pass101_new_files']
