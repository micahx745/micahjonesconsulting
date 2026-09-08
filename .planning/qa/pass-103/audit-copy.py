import ast, difflib, html, json, pathlib, re, subprocess, sys

OUT=pathlib.Path(__file__).parent
rows=json.loads((OUT/'applied-rows.json').read_text(encoding='utf-8'))
tags={41:('Drift, not bugs','When the build drifts'),
42:('Auth, data, storage, the arrows','Auth, data, storage, and how they connect'),
43:('Env vars, migrations, domains','Environment variables, migrations, domains'),
44:('HIPAA, GDPR, SOC 2, and when','HIPAA, GDPR, SOC 2: when each matters'),
45:('Second-hand users, the loop','Users who bring more users')}
def norm(s):
 return re.sub(r'\s+([,.;:?!])',r'\1',re.sub(r'\s+',' ',s)).strip()
def prose(s):
 s=s.replace('{" "}',' ')
 s=re.sub(r'<[^>]+>','',s)
 s=s.replace('**','')
 s=re.sub(r'(?<!\w)_(?=\w)|(?<=\w)_(?!\w)','',s)
 return norm(html.unescape(s))
def comments(s):return re.findall(r'/\*[\s\S]*?\*/|^\s*//.*$',s,re.M)
def locate(source,value):
 chars=[]; spans=[]
 for m in re.finditer(r'\{" "\}|<[^>]+>|&(?:#\d+|#x[\da-fA-F]+|\w+);|\*\*|(?<!\w)_(?=\w)|(?<=\w)_(?!\w)|\s+|.',source,re.S):
  token=m[0]
  if token.startswith('<') or token in ('**','_'):continue
  text=' ' if token=='{" "}' or token.isspace() else html.unescape(token)
  for char in text:
   if char.isspace():char=' '
   if char==' ' and chars and chars[-1]==' ':continue
   if char in ',.;:?!' and chars and chars[-1]==' ':
    chars.pop();spans.pop()
   chars.append(char);spans.append(m.start())
 index=''.join(chars).index(value)
 return source.count('\n',0,spans[index])+1
def clamp(dek):
 # Existing generateMetadata behavior, app/(theater)/work/[slug]/page.tsx:58.
 if len(dek)<=155:return dek
 end=dek[:156].rfind('. ')
 if end>=100:return dek[:end+1]
 cut=dek[:152];end=cut.rfind(' ')
 return re.sub(r'[,;:]+$','',cut[:end if end>0 else 152])+'...'
report={'source':{},'rendered':{},'errors':[]}
for path in sorted(set(row['file'] for row in rows)):
 old=subprocess.check_output(['git','show','HEAD:'+path]).decode('utf-8')
 new=pathlib.Path(path).read_text(encoding='utf-8')
 expected=prose(old)
 for row in rows:
  if row['file']!=path:continue
  a,b=tags.get(row['row'],(row['current'],row['proposed']))
  assert expected.count(a)==1,(row['row'],a)
  expected=expected.replace(a,b)
  row['line']=locate(new,b)
 matches=expected==prose(new)
 tags_same=re.findall(r'<[^>]+>',old)==re.findall(r'<[^>]+>',new)
 comments_same=comments(old)==comments(new)
 numbers_same=sorted(re.findall(r'\d+(?:[.,]\d+)*',old))==sorted(re.findall(r'\d+(?:[.,]\d+)*',new))
 report['source'][path]={'only_approved_changes':matches,'tags_attributes_unchanged':tags_same,
   'comments_unchanged':comments_same,'numbers_unchanged':numbers_same}
 if not all([matches,tags_same,comments_same,numbers_same]):report['errors'].append(path)
tree=ast.parse(pathlib.Path('scripts/verify-room.py').read_text(encoding='utf-8'))
allow=next(ast.literal_eval(node.value) for node in tree.body if isinstance(node,ast.Assign)
           and any(isinstance(t,ast.Name) and t.id=='PASS_103_COPY' for t in node.targets))
assert allow==[(r['proposed'],f'PASS-103 row {r["row"]}') for r in rows]
report['gate_entries']=len(allow)
report['citations_unchanged']=not subprocess.check_output(['git','diff','--','content/citations.ts'])
report['home_source_unchanged']=not subprocess.check_output(['git','diff','--','app/(home)','components/room'])
if (OUT/'after.json').exists():
 before=json.loads((OUT/'before.json').read_text(encoding='utf-8'))
 after=json.loads((OUT/'after.json').read_text(encoding='utf-8'))
 for key,data in after.items():
  prev=before[key]; route=key.split('@')[0]
  expected=norm(prev['text']); applied=[]
  for row in rows:
   if row['page']!=route:continue
   a,b=tags.get(row['row'],(row['current'],row['proposed']))
   pattern=re.compile(re.escape(a),re.I)
   count=len(pattern.findall(expected))
   expected=pattern.sub(lambda m: b.upper() if m[0].isupper() else b,expected)
   applied.append({'row':row['row'],'visible_occurrences':count})
  matches=expected==norm(data['text'])
  links_same=prev['links']==data['links']
  expected_metadata=json.dumps(prev['metadata'],ensure_ascii=False)
  for row in rows:
   if row['page']==route:
    expected_metadata=expected_metadata.replace(row['current'],row['proposed'])
    if row['row'] in (17,25,28):
     expected_metadata=expected_metadata.replace(clamp(row['current']),clamp(row['proposed']))
  metadata_same=expected_metadata==json.dumps(data['metadata'],ensure_ascii=False)
  average_decreased=data['averageSentenceWords']<=prev['averageSentenceWords']
  result={'only_approved_changes':matches,'links_unchanged':links_same,'metadata_matches':metadata_same,'rows':applied,
   'em_dashes':data['emDashes'],'average_before':prev['averageSentenceWords'],
   'average_after':data['averageSentenceWords'],'average_did_not_rise':average_decreased,
   'no_overflow':data['scrollWidth']==data['width']}
  if not matches:result['diff']=[d for d in difflib.ndiff(expected.split(),norm(data['text']).split()) if not d.startswith(' ')]
  if not all([matches,links_same,metadata_same,average_decreased,data['emDashes']<=1,
              data['averageSentenceWords']<=25,result['no_overflow']]):report['errors'].append(key)
  report['rendered'][key]=result
report['all_pass']=not report['errors'] and report['citations_unchanged'] and report['home_source_unchanged']
(OUT/'applied-rows.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'copy-diff.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(0 if report['all_pass'] else 1)
