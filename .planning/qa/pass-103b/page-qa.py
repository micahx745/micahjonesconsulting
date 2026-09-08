import json, os, pathlib, sys
from playwright.sync_api import sync_playwright

OUT = pathlib.Path(__file__).parent
MODE = sys.argv[1]
ROUTES = ['/about', '/packages', '/playbook', '/call',
          '/work/guardicore', '/work/content-engine']
AXE = pathlib.Path(os.environ['TEMP']) / 'axe2/node_modules/axe-core/axe.min.js'
PROBE = r'''() => {
 const norm=s=>s.replace(/\s+/g,' ').trim();
 const lines=e=>{
  const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT), words=[];
  while(walker.nextNode()) {
   const node=walker.currentNode;
   for(const m of node.textContent.matchAll(/\S+/g)) {
    const range=document.createRange(); range.setStart(node,m.index);
    range.setEnd(node,m.index+m[0].length);
    const r=[...range.getClientRects()].find(r=>r.width&&r.height);
    if(r) words.push({word:m[0],y:r.y});
   }
  }
  const rows=[];
  for(const w of words) {
   let row=rows.find(r=>Math.abs(r.y-w.y)<2);
   if(!row) rows.push(row={y:w.y,words:[]}); row.words.push(w.word);
  }
  return rows.map(r=>r.words.join(' '));
 };
 const headings=[...document.querySelectorAll('h1,h2,h3,.rl-ledger .term,.case-study-still__spec-title')]
  .filter(e=>e.getBoundingClientRect().width>1).map(e=>({text:norm(e.textContent),
   tag:e.tagName,cls:e.className,wrap:getComputedStyle(e).textWrap,lines:lines(e)}));
 const cards=[...document.querySelectorAll('.rl-cards > article')].map(e=>{
  const rect=e.getBoundingClientRect();
  return {name:e.getAttribute('aria-label'),children:e.children.length,
   display:getComputedStyle(e).display,rows:getComputedStyle(e).gridTemplateRows,
   span:getComputedStyle(e).gridRow,rowGap:getComputedStyle(e).rowGap,
   x:rect.x,y:rect.y,width:rect.width,height:rect.height,
   featureY:e.querySelector('li').getBoundingClientRect().y,
   buttonY:e.querySelector('.rl-buy').getBoundingClientRect().y,
   childRects:[...e.children].map(c=>{const r=c.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})};
 });
 const price=[...document.querySelectorAll('.rl-reg > div')].find(e=>e.querySelector('dt')?.textContent==='Price');
 return {headings,cards,text:norm(document.body.innerText),
  links:[...document.querySelectorAll('a')].map(e=>[e.getAttribute('href'),norm(e.textContent)]),
  overflow:document.documentElement.scrollWidth-innerWidth,
  price:price?.querySelector('dd').innerText};
}'''

report = {}
if len(sys.argv) > 2:
    ROUTES = [sys.argv[2]]
    report = json.loads((OUT/f'{MODE}.json').read_text(encoding='utf8'))
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(390,844), (1440,900)]:
        if len(sys.argv) > 3 and str(width) != sys.argv[3]:
            continue
        page = browser.new_page(viewport={'width':width,'height':height}, device_scale_factor=1)
        for route in ROUTES:
            page.set_viewport_size({'width':width,'height':height})
            page.goto('http://localhost:3000'+route, wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(3000 if width == 1440 else 800)
            previous = -1
            for _ in range(100):
                y = page.evaluate('window.scrollY')
                if y == previous: break
                previous = y
                page.mouse.wheel(0,int(height*.8))
                page.wait_for_timeout(100)
            page.wait_for_timeout(800)
            page.mouse.wheel(0,-100000)
            page.wait_for_timeout(1500)
            page.evaluate('window.scrollTo(0,0)')
            if route == '/playbook' and width == 1440:
                # Let Chromium lay out the entire capture surface BEFORE the
                # font/animation wait. Expanding it inside a full-page screenshot
                # restarts this browser's SVG animations at capture time.
                page.set_viewport_size({'width':1440,
                    'height':page.evaluate('document.documentElement.scrollHeight')})
            # Immediately before every desktop capture: fonts.ready plus 3s.
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(3000 if width == 1440 else 500)
            if route == '/playbook' and width == 1440:
                page.wait_for_function('''() => {
                  const rules=document.querySelector('.cw-wallchart__rules');
                  return getComputedStyle(rules).strokeDashoffset === '0px'
                    && [...document.querySelectorAll('.cw-wallchart *')]
                      .flatMap(e=>e.getAnimations()).every(a=>a.playState==='finished');
                }''')
            data = page.evaluate(PROBE)
            data['captureViewport'] = page.viewport_size
            if route == '/playbook' and width == 1440:
                data['wallchartBeforeCapture'] = page.evaluate('''() =>
                  [...document.querySelectorAll('.cw-wallchart *')]
                    .flatMap(e=>e.getAnimations()).map(a=>({name:a.animationName,
                      state:a.playState,time:a.currentTime}))''')
            folder = OUT / 'before' if MODE == 'before' else OUT
            folder.mkdir(exist_ok=True)
            target = folder/f'{route.strip("/").replace("/","-")}-{width}.png'
            page.screenshot(path=str(target),
                            full_page=not (route == '/playbook' and width == 1440))
            if route == '/playbook' and width == 1440:
                data['wallchartAfterCapture'] = page.evaluate('''() =>
                  [...document.querySelectorAll('.cw-wallchart *')]
                    .flatMap(e=>e.getAnimations()).map(a=>({name:a.animationName,
                      state:a.playState,time:a.currentTime}))''')
                print(json.dumps({'wallchartBeforeCapture':data['wallchartBeforeCapture'],
                  'wallchartAfterCapture':data['wallchartAfterCapture']}),flush=True)
            if route in ROUTES[:4]:
                page.add_script_tag(path=str(AXE))
                data['axe'] = page.evaluate('''async()=>{
                  const r=await axe.run(document,{resultTypes:['violations']});
                  return {version:axe.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,
                    nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))}))};
                }''')
            report[f'{route}@{width}'] = data
            (OUT/f'{MODE}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
            print(f'{MODE} {route}@{width}: overflow={data["overflow"]}, axe={len(data.get("axe",{}).get("violations",[]))}',flush=True)
        page.close()
    browser.close()
