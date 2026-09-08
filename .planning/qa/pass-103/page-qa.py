import json, os, pathlib, sys
from playwright.sync_api import sync_playwright

OUT = pathlib.Path(__file__).parent
MODE = sys.argv[1]
ROUTES = ['/packages', '/about', '/work/ordani', '/work/guardicore',
          '/work/rfp-engine', '/work/content-engine', '/playbook', '/call', '/']
PROBE = r'''() => {
 const text=document.body.innerText;
 const normalized=text.replace(/\s+/g,' ').trim();
 const sentences=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(normalized)];
 const words=[...new Intl.Segmenter('en',{granularity:'word'}).segment(normalized)].filter(w=>w.isWordLike).length;
 return {text,title:document.title,emDashes:(text.match(/\u2014/g)||[]).length,
  words,sentences:sentences.length,averageSentenceWords:words/sentences.length,
  scrollWidth:document.documentElement.scrollWidth,width:innerWidth,
  links:[...document.querySelectorAll('a')].map(a=>[a.getAttribute('href'),a.textContent]),
  metadata:[...document.querySelectorAll('meta[name],meta[property]')].map(e=>[e.name||e.getAttribute('property'),e.content])};
}'''

report={}
with sync_playwright() as p:
 browser=p.chromium.launch()
 for width,height in [(390,844),(1440,900)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  for route in ROUTES:
   page.goto('http://localhost:3013'+route,wait_until='networkidle')
   page.evaluate('document.fonts.ready')
   page.wait_for_timeout(600)
   previous=-1
   for _ in range(100):
    y=page.evaluate('window.scrollY')
    if y==previous: break
    previous=y
    page.mouse.wheel(0,int(height*0.8))
    page.wait_for_timeout(100)
   page.wait_for_timeout(700)
   page.mouse.wheel(0,-100000)
   page.wait_for_timeout(1500)
   page.evaluate('window.scrollTo(0,0)')
   page.wait_for_timeout(500)
   data=page.evaluate(PROBE)
   report[f'{route}@{width}']=data
   if MODE=='after' and route!='/':
    page.screenshot(path=str(OUT/f'{route.strip("/").replace("/","-")}-{width}.png'),full_page=True)
   print(f'{MODE} {route}@{width}: em-dashes={data["emDashes"]}, average={data["averageSentenceWords"]:.2f}, overflow={data["scrollWidth"]-width}',flush=True)
  page.close()
 browser.close()
(OUT/f'{MODE}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
