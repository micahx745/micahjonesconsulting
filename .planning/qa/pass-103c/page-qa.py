import json, os, pathlib, sys
from playwright.sync_api import sync_playwright

OUT = pathlib.Path(__file__).parent
MODE = sys.argv[1]
ROUTES = ['/packages', '/about', '/work/guardicore', '/work/rfp-engine', '/playbook', '/call']
AXE = pathlib.Path(os.environ['TEMP']) / 'axe2/node_modules/axe-core/axe.min.js'
PROBE = r'''() => {
 const norm=s=>s.replace(/\s+/g,' ').trim();
 const text=document.body.innerText, normalized=norm(text);
 const sentences=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(normalized)].length;
 const words=[...new Intl.Segmenter('en',{granularity:'word'}).segment(normalized)].filter(w=>w.isWordLike).length;
 const visible=e=>!!(e.getBoundingClientRect().width && e.getBoundingClientRect().height);
 const rect=e=>{if(!e)return null; const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height};};
 const paragraphs=[...document.querySelectorAll('main p, main li')].filter(visible)
   .filter(e=>!e.closest('nav,footer') && !e.querySelector('p,li')).map(e=>({tag:e.tagName,text:norm(e.innerText),firstSix:norm(e.innerText).split(' ').slice(0,6).join(' ')}));
 const cards=[...document.querySelectorAll('#packages .rl-cards > .rl-card')].map(e=>{
  const p=e.querySelector(':scope > p'), ul=e.querySelector(':scope > ul');
  const a=p.getBoundingClientRect(),b=ul.getBoundingClientRect();
  return {name:e.getAttribute('aria-label'),display:getComputedStyle(e).display,
    descriptionAlign:getComputedStyle(p).alignSelf,descriptionBottom:a.bottom,
    descriptionBorder:parseFloat(getComputedStyle(p).borderBottomWidth),featuresTop:b.top,
    featuresBorder:parseFloat(getComputedStyle(ul).borderTopWidth),delta:Math.abs(a.bottom-b.top)};
 });
 const op=document.querySelector('.rl-opgrid');
 const two=document.querySelector('.rl-two:has(.cw-portrait)');
 return {text:normalized,words,sentences,averageSentenceWords:words/sentences,
  emDashes:(text.match(/\u2014/g)||[]).length,overflow:document.documentElement.scrollWidth-innerWidth,
  paragraphs,cards,headings:[...document.querySelectorAll('main h1,main h2')].filter(visible).map(e=>[e.tagName,norm(e.innerText),e.id]),
  links:[...document.querySelectorAll('a')].map(e=>[e.getAttribute('href'),norm(e.textContent)]),
  ids:[...document.querySelectorAll('[id]')].map(e=>e.id),
  metadata:[...document.querySelectorAll('meta[name],meta[property]')].map(e=>[e.name||e.getAttribute('property'),e.content]),
  about:{opGrid:rect(op),film:rect(document.querySelector('.rl-opstage')),side:rect(document.querySelector('.rl-opside')),
    portraitGrid:rect(two),portrait:rect(document.querySelector('.cw-portrait')),portraitLeft:rect(two?.querySelector('.rl-two__l')),
    legacyHasMatches:document.querySelectorAll('.cw-about-intro:has(.cw-portrait)').length,
    images:[...document.querySelectorAll('main img')].map(e=>[e.getAttribute('src'),e.alt,e.naturalWidth])}};
}'''

report={}
if len(sys.argv)>2:
 ROUTES=[sys.argv[2]]
 report=json.loads((OUT/f'{MODE}.json').read_text(encoding='utf8'))
with sync_playwright() as p:
 browser=p.chromium.launch()
 for width,height in [(390,844),(1440,900)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  for route in ROUTES:
   page.set_viewport_size({'width':width,'height':height})
   response=page.goto('http://localhost:3000'+route,wait_until='networkidle')
   page.evaluate('document.fonts.ready')
   page.wait_for_timeout(3000 if width==1440 else 800)
   previous=-1
   for _ in range(100):
    y=page.evaluate('window.scrollY')
    if y==previous: break
    previous=y
    page.mouse.wheel(0,int(height*.8))
    page.wait_for_timeout(100)
   page.wait_for_timeout(800)
   page.mouse.wheel(0,-100000)
   page.wait_for_timeout(1500)
   page.evaluate('window.scrollTo(0,0)')
   if route=='/playbook' and width==1440:
    page.set_viewport_size({'width':width,'height':page.evaluate('document.documentElement.scrollHeight')})
   page.evaluate('document.fonts.ready')
   page.wait_for_timeout(3000 if width==1440 else 500)
   if route=='/playbook' and width==1440:
    page.wait_for_function("() => [...document.querySelectorAll('.cw-wallchart *')].flatMap(e=>e.getAnimations()).every(a=>a.playState==='finished')")
   data=page.evaluate(PROBE)
   data['httpStatus']=response.status
   page.add_script_tag(path=str(AXE))
   data['axe']=page.evaluate("""async()=>{const r=await axe.run(document,{resultTypes:['violations']});
    return {version:axe.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,
      nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))}))};} """)
   folder=OUT/'before' if MODE=='before' else OUT
   folder.mkdir(exist_ok=True)
   page.screenshot(path=str(folder/f'{route.strip("/").replace("/","-")}-{width}.png'),full_page=not(route=='/playbook' and width==1440))
   report[f'{route}@{width}']=data
   (OUT/f'{MODE}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
   print(f'{MODE} {route}@{width}: HTTP={response.status}, axe={len(data["axe"]["violations"])}, em-dashes={data["emDashes"]}, words={data["words"]}, sentences={data["sentences"]}, average={data["averageSentenceWords"]:.4f}, overflow={data["overflow"]}',flush=True)
  page.close()
 browser.close()
