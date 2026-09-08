import ast, collections, hashlib, json, pathlib, re, subprocess, sys, urllib.request
from html.parser import HTMLParser

sys.stdout.reconfigure(encoding='utf8')
OUT=pathlib.Path(__file__).parent
BASE='http://localhost:3104'
class Document(HTMLParser):
    def __init__(self,src):
        super().__init__(); self.skip=0; self.text=[]; self.links=[]; self.robots=[]; self.alts=[]; self.feed(src)
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag in ('script','style'): self.skip+=1
        if tag=='a' and 'href' in d: self.links.append(d['href'])
        if tag=='meta' and d.get('name')=='robots': self.robots.append(d.get('content'))
        if d.get('alt'): self.alts.append(d['alt'])
        if d.get('aria-label'): self.alts.append(d['aria-label'])
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip-=1
    def handle_data(self,data):
        if not self.skip and data.strip(): self.text.append(re.sub(r'\s+',' ',data).strip())

routes=['/','/packages','/about','/call','/call/kickoff','/services','/services/thanks','/contact','/work',
        '/work/ordani','/work/guardicore','/work/rfp-engine','/work/content-engine','/playbook','/playbook/thanks']
report={'routes':{},'checks':{},'errors':[]}
def check(name,ok):
    report['checks'][name]=bool(ok)
    if not ok: report['errors'].append(name)
for route in routes:
    response=urllib.request.urlopen(BASE+route)
    doc=Document(response.read().decode('utf8'))
    text=' '.join(doc.text)
    hits=[t for t in doc.text+doc.alts if re.search(r'80% Wall|chapter one|the manual|playbook',t,re.I)]
    links=[u for u in doc.links if '/playbook' in u or u=='#manual']
    report['routes'][route]={'status':response.status,'robots':doc.robots,'hits':hits,'links':links}
    if route.startswith('/playbook'):
        check(route+' noindex,nofollow',doc.robots==['noindex, nofollow'])
    else:
        check(route+' no book links',not links)
        check(route+' no book copy',not hits or (route=='/work/content-engine' and len(hits)==1 and '25-page playbook' in hits[0]))
    if route=='/packages':
        check('packages exact refund','Full refund any time before the kickoff call. After it, you pay for the work done and nothing more.' in text)
        check('PK15 exact','Each package goes straight to checkout. My kickoff email arrives the moment your card clears. It includes the intake questions and a link to book the call.' in text)
    if route=='/call/kickoff':
        check('kickoff exact refund','Full refund any time before this call. After it, you pay for the work done and nothing more.' in text)
        check('kickoff no book promise',not re.search(r'companion|field manual',text,re.I))
    if route=='/services/thanks': check('package thanks no book promise','companion' not in text and 'The book' not in text)
sitemap=urllib.request.urlopen(BASE+'/sitemap.xml').read().decode('utf8')
check('sitemap no book','/playbook' not in sitemap)
llms=urllib.request.urlopen(BASE+'/llms.txt').read().decode('utf8')
check('llms no book',not re.search(r'80% Wall|chapter one|the manual|playbook',llms,re.I))
head=lambda f:subprocess.check_output(['git','show','HEAD:'+f])
unchanged=['components/room/Manual.tsx','app/(room)/playbook/thanks/page.tsx','app/robots.ts',
           'lib/catalog.ts','lib/stripe.ts','lib/package-delivery.ts','lib/playbook-delivery.ts','lib/playbook-sale.ts',
           'app/api/stripe/webhook/route.ts','app/actions/playbook-checkout.ts','app/actions/playbook-signup.ts',
           'content/citations.ts','content/work/content-engine.mdx','content/work/guardicore.mdx','content/work/rfp-engine.mdx']
for f in unchanged: check('unchanged '+f,pathlib.Path(f).read_bytes()==head(f))
f='app/(room)/playbook/page.tsx'
check('book page robots only',pathlib.Path(f).read_bytes()==head(f).replace(b'export const metadata: Metadata = {',b'export const metadata: Metadata = {\n  robots: { index: false, follow: false },'))
check('assets and delivery unchanged',subprocess.run(['git','diff','--quiet','--','public','product','lib','app/actions','app/api'],capture_output=True).returncode==0)

# All remaining factual numeric tokens are identical, except the expressly removed
# book promotion and sitemap entry. Layout spans and verifier element counts are
# not facts or prices and are covered by the render/screenshot checks.
exceptions={
 'app/(foyer)/services/page.tsx':collections.Counter(['150','5']),
 'app/(room)/about/page.tsx':collections.Counter(['80']),
 'app/(room)/packages/page.tsx':collections.Counter(['80']),
 'components/room/Foot.tsx':collections.Counter(['80','99']),
 'content/work/ordani.mdx':collections.Counter(['80']),
}
def numbers(s):
    s=re.sub(r'/\*[\s\S]*?\*/|^\s*//.*$','',s,flags=re.M)
    s=re.sub(r'&#(?:\d+|x[0-9a-fA-F]+);','',s)
    return collections.Counter(re.findall(r'\d+(?:[.,]\d+)*',s))
files=subprocess.check_output(['git','diff','--name-only','--','app','components','content'],encoding='utf8').splitlines()
for f in files:
    if f in ['app/room.css','app/sitemap.ts']: continue
    old=numbers(head(f).decode('utf8')); new=numbers(pathlib.Path(f).read_text(encoding='utf8'))
    check('no changed numbers '+f,old-new==exceptions.get(f,collections.Counter()) and not new-old)

old=head('components/room/Objections.tsx').decode('utf8')
new=pathlib.Path('components/room/Objections.tsx').read_text(encoding='utf8')
rows=lambda s:re.findall(r'<div className="q">[\s\S]*?</div>',s)
check('remaining objections verbatim',rows(new)==[rows(old)[0],rows(old)[2]])
check('ffmpeg missing and clip present',__import__('shutil').which('ffmpeg') is None and pathlib.Path('public/video/a2-hold-720.mp4').is_file())
ast.parse(pathlib.Path('scripts/verify-room.py').read_text(encoding='utf8'))
check('verifier Python syntax',True)
(OUT/'audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'{len(report["checks"])} checks, {sum(report["checks"].values())} pass, {len(report["errors"])} fail')
for route,data in report['routes'].items():
    print(f'{route}: {len(data["links"])} book links; {len(data["hits"])} matching text runs; robots={data["robots"]}')
for error in report['errors']:print('FAIL',error)
raise SystemExit(bool(report['errors']))
