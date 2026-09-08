import json, pathlib
from playwright.sync_api import sync_playwright

OUT=pathlib.Path(__file__).parent
with sync_playwright() as p:
 browser=p.chromium.launch()
 page=browser.new_page(viewport={'width':1440,'height':900})
 page.goto('http://localhost:3000/packages',wait_until='networkidle')
 page.evaluate('document.fonts.ready')
 page.locator('#packages').scroll_into_view_if_needed()
 page.wait_for_timeout(1800)
 data=page.evaluate('''() => [...document.querySelectorAll('#packages .rl-cards > .rl-card')].map(c=>{
   const p=c.querySelector(':scope > p'), list=c.querySelector(':scope > ul'), li=list.firstElementChild;
   const style=(e,pseudo)=>{const s=getComputedStyle(e,pseudo);return {borderTop:s.borderTopWidth,borderBottom:s.borderBottomWidth,
    content:s.content,top:s.top,bottom:s.bottom,height:s.height,boxShadow:s.boxShadow,background:s.backgroundColor};};
   return {name:c.getAttribute('aria-label'),descriptionBottom:p.getBoundingClientRect().bottom+scrollY,
    listTop:list.getBoundingClientRect().top+scrollY,firstFeatureTop:li.getBoundingClientRect().top+scrollY,
    description:style(p),list:style(list),firstFeature:style(li),descriptionBefore:style(p,'::before'),descriptionAfter:style(p,'::after')};
 })''')
 browser.close()
assert all(abs(c['descriptionBottom']-c['firstFeatureTop'])<=1 for c in data)
assert max(c['firstFeatureTop'] for c in data)-min(c['firstFeatureTop'] for c in data)<=1
assert all(c['firstFeature']['borderTop']=='1px' for c in data)
(OUT/'borders.json').write_text(json.dumps(data,indent=2),encoding='utf8')
print(json.dumps(data,indent=2))
