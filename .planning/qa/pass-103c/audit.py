import ast, collections, html, json, pathlib, re, subprocess

OUT=pathlib.Path(__file__).parent
rows=json.loads((OUT/'applied-rows.json').read_text(encoding='utf8'))
before=json.loads((OUT/'before.json').read_text(encoding='utf8'))
after=json.loads((OUT/'after.json').read_text(encoding='utf8'))
report={'source':{},'rendered':{},'errors':[]}
def norm(s):return re.sub(r'\s+',' ',s).strip()
def prose(s):
 s=re.sub(r'/\*[\s\S]*?\*/|^\s*//.*$','',s,flags=re.M)
 s=s.replace('{" "}',' ').replace('**','')
 s=re.sub(r'<[^>]+>','',s)
 return norm(html.unescape(s))
def head(path):return subprocess.check_output(['git','show','HEAD:'+path]).decode('utf8')
def require(ok,label):
 if not ok:report['errors'].append(label)

for path in sorted({r['file'] for r in rows if 'file' in r}):
 old=head(path); new=pathlib.Path(path).read_text(encoding='utf8'); expected=prose(old)
 for r in rows:
  if r.get('file')!=path:continue
  assert expected.count(r['current'])==1,(path,r['row'])
  expected=expected.replace(r['current'],r['proposed'])
  if r['row']==10:
   expected=expected.replace(r['current'].removesuffix(' Oakland, CA.'),r['proposed'].removesuffix(' Oakland, CA.'))
 if path=='app/(room)/about/page.tsx':
  approved=collections.Counter(expected.split())==collections.Counter(prose(new).split())
  attrs=lambda s:sorted(re.findall(r'\b(?:href|id|src|alt|sizes|width|height|variant|label)=(?:"[^"]*"|\{[^}]*\})',s))
  structure=attrs(old)==attrs(new)
 else:
  approved=expected==prose(new)
  structure=re.findall(r'<[^>]+>',old)==re.findall(r'<[^>]+>',new)
 numbers=lambda s: sorted(re.findall(r'\d+(?:[.,]\d+)*',s))
 result={'only_approved_copy':approved,'tags_or_about_protected_attributes_unchanged':structure,
         'numbers_unchanged':numbers(old)==numbers(new)}
 report['source'][path]=result
 require(all(result.values()),path)

expected_css=head('app/room-and-ledger.css').replace('    grid-template-rows: subgrid;\n    grid-row: span 5;\n    row-gap: 0;\n  }',
 '    grid-template-rows: subgrid;\n    grid-row: span 5;\n    row-gap: 0;\n  }\n  #packages .rl-cards > .rl-card > p {\n    align-self: stretch;\n  }')
require(expected_css==pathlib.Path('app/room-and-ledger.css').read_text(encoding='utf8'),'CSS scope')
def gates(s):
 return {n.targets[0].id:ast.literal_eval(n.value) for n in ast.parse(s).body
  if isinstance(n,ast.Assign) and isinstance(n.targets[0],ast.Name) and n.targets[0].id.startswith('PASS_')}
old_gates=gates(head('scripts/verify-room.py'))
new_gates=gates(pathlib.Path('scripts/verify-room.py').read_text(encoding='utf8'))
for name,entries in old_gates.items():
 require([e for e in entries if e[1] not in ('PASS-102 row 12','PASS-103 row 48')]==new_gates[name],name)
report['gate_entries']=len(new_gates['PASS_103_REWORD_COPY'])
require(report['gate_entries']==10,'reword gate count')
require({label for _,label in new_gates['PASS_103_REWORD_COPY']}=={f'PASS-103 reword row {n}' for n in [1,2,3,4,5,6,8,9,10]},'reword citations')

about_order=[0,8,7,9,10,1,5,6,4,2,3]
for key,data in after.items():
 prev=before[key]; route=key.split('@')[0]
 if route=='/about':
  paragraphs=[p['text'] for p in prev['paragraphs']]
  paragraphs=[p.replace(rows[1]['current'],rows[1]['proposed']) for p in paragraphs]
  expected_paragraphs=[paragraphs[i] for i in about_order]
  # Desktop and mobile each expose one responsive version of AB01/AB02.
  approved=expected_paragraphs==[p['text'] for p in data['paragraphs']]
  heading_ok=[x[1] for x in data['headings']]==['Operator, not consultant.','Currently','What I’m known for','RECEIPTS']
  require(heading_ok,key+' heading order')
 else:
  expected=prev['text']
  for r in rows:
   if r.get('file')=={'/packages':'app/(room)/packages/page.tsx','/playbook':'app/(room)/playbook/page.tsx','/call':'app/(room)/call/page.tsx','/work/guardicore':'content/work/guardicore.mdx','/work/rfp-engine':'content/work/rfp-engine.mdx'}.get(route):
    # Block-level What-ships statements have whitespace before their old comma.
    a=r['current']
    require(a in expected,key+f' row {r["row"]} current present')
    expected=expected.replace(a,r['proposed'])
  approved=expected==data['text']
 expected_meta=prev['metadata']
 if route=='/about':
  r=rows[9]
  expected_meta=[[k,v.replace(r['current'],r['proposed']).replace(r['current'].removesuffix(' Oakland, CA.'),r['proposed'].removesuffix(' Oakland, CA.'))] for k,v in expected_meta]
 checks={'approved_rendered_copy':approved,'links_unchanged':sorted(prev['links'])==sorted(data['links']),
  'ids_unchanged':sorted(prev['ids'])==sorted(data['ids']),'metadata_exact':expected_meta==data['metadata'],
  'axe_unchanged':prev['axe']['violations']==data['axe']['violations'],
  'em_dashes_at_most_one':data['emDashes']<=1,'average_at_most_25':data['averageSentenceWords']<=25,
  'average_did_not_rise':data['averageSentenceWords']<=prev['averageSentenceWords'],'no_overflow':data['overflow']==0}
 report['rendered'][key]=checks
 require(all(checks.values()),key)

cards=after['/packages@1440']['cards']
report['cards']=cards
require(len(cards)==3 and all(c['delta']<=1 for c in cards),'card border meets')
require(max(c['descriptionBottom'] for c in cards)-min(c['descriptionBottom'] for c in cards)<=1,'card border shared row')
require(before['/packages@390']['cards']==after['/packages@390']['cards'],'mobile card geometry unchanged')
for width in (390,1440):
 prev=before[f'/about@{width}']['about']; data=after[f'/about@{width}']['about']
 require(prev['images']==data['images'],f'about images {width}')
 require(prev['legacyHasMatches']==data['legacyHasMatches']==0,f'legacy has selector {width}')
 require(prev['film']['width']==data['film']['width'] and prev['film']['height']==data['film']['height'],f'film geometry {width}')
 if width==1440:
  require(data['side']['x']>data['film']['x']+data['film']['width'] and data['side']['y']==data['film']['y'],'intro two columns')
  require(data['portrait']['x']>data['portraitLeft']['x']+data['portraitLeft']['width'] and data['portrait']['y']==data['portraitLeft']['y'],'portrait two columns')
  require(prev['portrait']['width']==data['portrait']['width'] and prev['portrait']['height']==data['portrait']['height'],'portrait size')

report['protected_sources_unchanged']=not subprocess.check_output(['git','diff','--','app/(home)','components','content/citations.ts','lib/catalog.ts','app/globals.css','app/room.css','.planning/copy'])
require(report['protected_sources_unchanged'],'protected sources')
report['all_pass']=not report['errors']
(OUT/'audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(0 if report['all_pass'] else 1)
