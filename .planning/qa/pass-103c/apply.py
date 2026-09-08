import ast, html, json, pathlib, re, textwrap

ROOT=pathlib.Path.cwd()
OUT=ROOT/'.planning/qa/pass-103c'
table=(ROOT/'.planning/copy/PASS-103-REWORD-TICK-TABLE.md').read_text(encoding='utf8')
rows=[]
paths={1:'app/(room)/packages/page.tsx',2:'app/(room)/about/page.tsx',3:'content/work/guardicore.mdx',4:'content/work/rfp-engine.mdx',5:'app/(room)/playbook/page.tsx',6:'app/(room)/call/page.tsx',8:'app/(room)/playbook/page.tsx',9:'app/(room)/playbook/page.tsx',10:'app/(room)/about/page.tsx'}
for line in table.splitlines():
 cells=[s.strip() for s in line.strip('|').split('|')]
 if not cells or not cells[0].isdigit(): continue
 n=int(cells[0]); assert cells[1]=='[x]'
 row={'row':n,'status':'applied'}
 if n!=7:
  row.update(file=paths[n],current=cells[4] if n<=6 else cells[3],proposed=cells[5] if n<=6 else cells[4])
 rows.append(row)
assert len(rows)==10

def read(path): return (ROOT/path).read_text(encoding='utf8')
def write(path,s): (ROOT/path).write_text(s,encoding='utf8',newline='')
def swap(source,a,b):
 assert source.count(a)==1, (a,source.count(a))
 return source.replace(a,b)
def normalize(s): return re.sub(r'\s+',' ',html.unescape(s.replace('**',''))).strip()

for r in rows:
 n=r['row']
 if n==7:continue
 s=read(r['file']); a=r['current']; b=r['proposed']
 if n==1:
  old='Each one goes straight to checkout. The moment your card clears you\n          get a kickoff email: the intake questions, a link to book the call,\n          and the manual with its companion files attached.'
  assert normalize(old)==a
  new='Each package goes straight to checkout. My kickoff email arrives the\n          moment your card clears. It includes the intake questions and a link\n          to book the call. The manual and its companion files are attached.'
 elif n==2:
  old='Growth, GTM, and platform strategy roles across thirteen years\n                of enterprise software.'
  new='I plan how enterprise software companies find buyers and grow.\n                I help decide what their platforms should do. This work spans\n                thirteen years.'
 elif n==3: old,new=a,b
 elif n==4:
  old='**01. I built it as real software, not templates.**'+a.split('templates.',1)[1]
  new='**01. I built software around the author\'s own body of work.**'+b.split('work.',1)[1]
 elif n==5:
  old='The wall is not a talent problem. It is arithmetic: the\n              tool&rsquo;s memory runs out, and yours has to take over, on\n              paper, in the repo. This manual is that hand-off, one system per\n              chapter.'
  new='Finding users, production failures, and breaking changes are separate\n              problems. I cover each in this manual, one system per chapter.\n              When the tool&rsquo;s memory runs out, yours has to take over.\n              Write it down on paper, in the repo.'
 elif n==6:
  old='I also tell you whether you need me at\n            all.'
  new='I tell you whether you need me at\n            all.'
 elif n==8: old,new='for Claude Code and Cursor:','For Claude Code and Cursor:'
 elif n==9: old,new=', including three complete SPEC files: a','Three complete SPEC files: a'
 elif n==10:
  s=swap(s,a,b)
  old,new=a.removesuffix(' Oakland, CA.'),b.removesuffix(' Oakland, CA.')
 if n in (1,2,3,4,5):
  assert normalize(old)==a,(n,normalize(old),a)
  assert normalize(new)==b,(n,normalize(new),b)
 s=swap(s,old,new);write(r['file'],s)

# Row 7: move existing blocks, preserving text, labels, images and IDs.
path='app/(room)/about/page.tsx'; s=read(path)
start=s.index('          <div className="rl-opside">')
known=s.index('      <section className="rl-wrap rl-sec-air" aria-labelledby="rl-known-title">')
now=s.index('      <section className="rl-wrap rl-sec-air" aria-labelledby="rl-now-title">')
intro=s[:start]; old_side=s[start:known]; known_section=s[known:now]; now_section=s[now:]
promise=re.search(r'            <p className="m-first">[\s\S]*?</p>',old_side)[0]
ab03=re.search(r'            <p>\s+For thirteen years[\s\S]*?</p>',old_side)[0]
receipts=old_side[old_side.index('            <h2 className="rl-l">Receipts</h2>'):old_side.index('              {/* W3')]
ab06=old_side[old_side.index('              {/* W3'):old_side.index('            </ul>')]
ab09=re.search(r'            <li data-rl="rule">\s+<span className="term">Products I build[\s\S]*?</li>',known_section)[0]
known_section=swap(known_section,ab09+'\n','')
known_section=known_section.replace('        {/* PASS-101 INTEGRATE',ab03.replace('            ','        ')+'\n\n        {/* PASS-101 INTEGRATE',1)
# AB06 becomes a prose paragraph after the existing exhibit, below AB08.
ab06=ab06.replace('<li>','<p className="rl-body rl-seam rl-air-m" data-rl="rise">').replace('</li>','</p>')
known_section=known_section.replace('      </section>',ab06+'      </section>',1)
now_heading=now_section[now_section.index('        <div className="rl-sec'):now_section.index('        {/* PASS-101 polish')]
body_start=now_section.index('            {/* Origin line')
ab10_end=now_section.index('            {/* Pass-83')
ab10=now_section[body_start:ab10_end]
ab11_12=now_section[ab10_end:now_section.index('            <div className="rl-chips')]
closing=now_section[now_section.index('            <div className="rl-chips'):]
receipts=receipts.replace('            <ul className="lead" data-rl-group="register">\n','')
receipts=receipts.replace('<li>','<p className="rl-body rl-air-m" data-rl="rise">').replace('</li>','</p>')
s=(intro+'          <div className="rl-opside">\n'+promise+'\n'+now_heading+ab10+
   '            <ul className="rl-ledger rl-ledger--lane" data-rl-group="currently">\n'+ab09+'\n            </ul>\n'+ab11_12+
   '          </div>\n        </div>\n      </section>\n\n'+known_section+
   '      <section className="rl-wrap rl-sec-air">\n'+
   now_section[now_section.index('        {/* PASS-101 polish'):body_start]+receipts+closing)
write(path,s)

# Section 4: stretch only the description cell in the existing desktop subgrid.
path='app/room-and-ledger.css';s=read(path)
s=swap(s,'    grid-template-rows: subgrid;\n    grid-row: span 5;\n    row-gap: 0;\n  }',
 '    grid-template-rows: subgrid;\n    grid-row: span 5;\n    row-gap: 0;\n  }\n  #packages .rl-cards > .rl-card > p {\n    align-self: stretch;\n  }')
write(path,s)

# Cite each new approval and remove only superseded explicit allow-list entries.
path='scripts/verify-room.py';s=read(path);tree=ast.parse(s)
for node in reversed(tree.body):
 if not isinstance(node,ast.Assign):continue
 if not any(isinstance(t,ast.Name) and t.id in ('PASS_102_COPY','PASS_103_COPY') for t in node.targets):continue
 for entry in reversed(node.value.elts):
  value,label=ast.literal_eval(entry)
  if label not in ('PASS-102 row 12','PASS-103 row 48'):continue
  lines=s.splitlines(keepends=True); del lines[entry.lineno-1:entry.end_lineno]; s=''.join(lines)
gate=[]
for r in rows:
 n=r['row']
 if n==7:continue
 value=r['proposed']
 if n==6: value=value.removeprefix('What you leave with: ')
 gate.append('    ('+json.dumps(value,ensure_ascii=False)+', "PASS-103 reword row '+str(n)+'"),')
 if n==10:gate.append('    ('+json.dumps(value.removesuffix(' Oakland, CA.'),ensure_ascii=False)+', "PASS-103 reword row 10"),')
s=swap(s,'\nRES = []','\n# Operator-ticked cells in PASS-103-REWORD-TICK-TABLE.md; row 7 only moves existing copy.\nPASS_103_REWORD_COPY = [\n'+'\n'.join(gate)+'\n]\n\nRES = []')
s=swap(s,'for approved, row in PASS_102_COPY + PASS_103_COPY:','for approved, row in PASS_102_COPY + PASS_103_COPY + PASS_103_REWORD_COPY:')
write(path,s)
(OUT/'applied-rows.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
print('10/10 rows applied; section 4 applied; superseded PASS-102 row 12 and PASS-103 row 48 removed.')
