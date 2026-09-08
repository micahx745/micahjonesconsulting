import json, os, pathlib, re, sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
OUT = pathlib.Path(__file__).parent
STAGE = sys.argv[1]
BASE = 'http://localhost:3104'
AXE = pathlib.Path(os.environ['TEMP']) / 'axe2/node_modules/axe-core/axe.min.js'
ROUTES = {'home': '/', 'packages': '/packages', 'about': '/about', 'call': '/call'}
WALK = '''async () => {
  for (let y=0; y<document.body.scrollHeight; y+=window.innerHeight*.8) {
    window.scrollTo(0,y); await new Promise(r=>setTimeout(r,100));
  }
  window.scrollTo(0,0); await new Promise(r=>setTimeout(r,800));
}'''
report = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(390,844),(1440,900)]:
        page = browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
        for name, route in ROUTES.items():
            page.goto(BASE+route,wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            page.evaluate(WALK)
            page.add_script_tag(path=str(AXE))
            axe = page.evaluate('async () => { const r=await axe.run(); return {version:r.testEngine.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}; }')
            data = page.evaluate('''() => ({
                text:document.body.innerText,
                footer:document.querySelector('footer').innerText,
                bar:[...document.querySelectorAll('nav[aria-label="Site"] a')].map(a=>({text:a.innerText,href:a.getAttribute('href')})),
                sections:[...document.querySelectorAll('#page > section, .rl-home main > section')].map(e=>({id:e.id,text:e.querySelector('h1,h2')?.innerText})),
                links:[...document.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),
                overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
                questions:[...document.querySelectorAll('.q dt')].map(e=>e.innerText),
                footerColumns:[...document.querySelector('footer .row').children].map(e=>({class:e.className,x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width,gridColumn:getComputedStyle(e).gridColumn})),
            })''')
            data['axe']=axe
            report[f'{route}@{width}']=data
            if STAGE == 'after':
                page.screenshot(path=str(OUT/f'{name}-{width}.png'),full_page=True)
                page.locator('footer').screenshot(path=str(OUT/f'{name}-footer-{width}.png'))
                if name == 'home':
                    page.locator('#faq').scroll_into_view_if_needed()
                    page.wait_for_timeout(800)
                    page.locator('#faq').screenshot(path=str(OUT/f'home-objections-{width}.png'))
                    page.locator('#work').scroll_into_view_if_needed()
                    page.wait_for_timeout(800)
                page.locator('nav[aria-label="Site"]').screenshot(path=str(OUT/f'{name}-bar-{width}.png'))
            print(f'{STAGE} {route}@{width}: axe={len(axe["violations"])} violations; overflow={data["overflow"]}px')
        page.close()
    browser.close()
(OUT/f'{STAGE}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
if STAGE == 'after':
    before=json.loads((OUT/'before.json').read_text(encoding='utf8'))
    errors=[]
    for key, data in report.items():
        if data['axe'] != before[key]['axe']: errors.append(f'axe changed: {key}')
        if data['overflow']: errors.append(f'overflow: {key}')
        if any(re.search(r'80% Wall|\$99',data[s],re.I) for s in ['text','footer']): errors.append(f'book copy: {key}')
        if any(re.search(r'/playbook|#manual',a['href']) for a in data['links']): errors.append(f'book link: {key}')
        if key.startswith('/@') and len(data['questions'])!=2: errors.append(f'question count: {key}')
    print('PASS: axe unchanged; no overflow, book copy, or book links; two objections' if not errors else '\n'.join(errors))
    raise SystemExit(bool(errors))
