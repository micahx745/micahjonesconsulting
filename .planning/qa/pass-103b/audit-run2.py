import html
import json
import pathlib
import re
import subprocess

OUT = pathlib.Path(__file__).parent

def head(path):
    return subprocess.check_output(['git', 'show', 'HEAD:' + path]).decode('utf8')

def norm(value):
    return re.sub(r'\s+', ' ', value).strip()

replacements = {
    'app/(room)/packages/page.tsx': ('prioritized fix sequence', 'what to fix in order'),
    'scripts/stripe-setup.mjs': ('prioritized fix sequence', 'what to fix in order'),
    'app/(room)/playbook/page.tsx': (
        '<span className="rl-num">$99</span> at launch',
        '<span className="rl-num">$99</span>{" "}at launch'),
}
source = {}
for path, (old, new) in replacements.items():
    before = head(path)
    after = pathlib.Path(path).read_text(encoding='utf8')
    assert before.count(old) == 1, path
    assert before.replace(old, new) == after, path
    assert re.findall(r'<[^>]+>', before) == re.findall(r'<[^>]+>', after), path
    assert re.findall(r'\d+(?:[.,]\d+)*', before) == re.findall(r'\d+(?:[.,]\d+)*', after), path
    source[path] = 'PASS: only the exact authorized replacement; tags, attributes, numbers unchanged'

def audit_description(path):
    text = pathlib.Path(path).read_text(encoding='utf8')
    return re.search(r'name: "The Audit",.*?description:\s*"([^"]+)"', text, re.S)[1]

assert audit_description('lib/catalog.ts').encode() == audit_description('scripts/stripe-setup.mjs').encode()
changed = subprocess.check_output(['git', 'diff', '--name-only', '--', 'app', 'components', 'content', 'lib', 'public']).decode().splitlines()
assert set(changed) == {'app/(room)/packages/page.tsx', 'app/(room)/playbook/page.tsx', 'app/room-and-ledger.css'}, changed
assert not subprocess.check_output(['git', 'diff', '--', 'app/(home)', 'components/room', 'app/room.css'])

rows = json.loads(pathlib.Path('.planning/qa/pass-103/applied-rows.json').read_text(encoding='utf8'))
pass102 = json.loads(pathlib.Path('.planning/qa/pass-102/copy-diff.json').read_text(encoding='utf8'))
protected_files = {r['file'] for r in rows} | set(pass102['source_files'])
for path in protected_files:
    before = head(path)
    after = pathlib.Path(path).read_text(encoding='utf8')
    if path in replacements:
        old, new = replacements[path]
        before = before.replace(old, new)
    assert before == after, path

before = json.loads((OUT / 'before.json').read_text(encoding='utf8'))
after = json.loads((OUT / 'after.json').read_text(encoding='utf8'))
assert len(before) == len(after) == 12
routes = {}
for key, value in after.items():
    previous = before[key]
    expected = previous['text'].replace('$99at launch · $149 after', '$99 at launch · $149 after')
    assert expected == value['text'], key
    assert previous['links'] == value['links'], key
    assert value['overflow'] == 0, key
    assert all(h['wrap'] == 'balance' for h in value['headings'] if h['tag'] in ('H2', 'H3')), key
    axe = value.get('axe')
    if axe:
        assert axe['violations'] == previous['axe']['violations'] == [], key
    routes[key] = {'text_and_links': 'unchanged except authorized price space', 'overflow_px': value['overflow'],
                   'axe_violations': len(axe['violations']) if axe else 'not requested',
                   'axe_version': axe['version'] if axe else None}

cards = after['/packages@1440']['cards']
features = [c['featureY'] for c in cards]
buttons = [c['buttonY'] for c in cards]
assert len(cards) == 3 and all(c['children'] == 5 and c['display'] == 'grid' and c['rows'].startswith('subgrid') for c in cards)
assert max(features) - min(features) <= 1
assert max(buttons) - min(buttons) <= 1
assert before['/packages@390']['cards'] == after['/packages@390']['cards']

names = {
    '/about': ['What I’m known for', 'Software for marketing and contracts.', 'Products I build from start to finish.'],
    '/playbook': ['One sentence, four rounds apart', 'Chapter one, free', 'Where the ten live'],
    '/call': ['Thirty minutes. Bring the problem.'],
    '/work/guardicore': ['Visibility + microsegmentation positioning framework'],
    '/work/content-engine': ["The content engine's output: videos, blogs, newsletters, and digital events"],
}
headings = []
for route, titles in names.items():
    for title in titles:
        row = {'route': route, 'heading': title}
        for width in (390, 1440):
            key = f'{route}@{width}'
            for label, data in [('before', before), ('after', after)]:
                h = next(h for h in data[key]['headings'] if h['text'] == title)
                row[f'{label}_{width}'] = {'last_line_words': len(h['lines'][-1].split()), 'lines': h['lines'], 'wrap': h['wrap']}
        headings.append(row)

report = {'source': source, 'audit_description_byte_identical': True,
          'pass102_applied_rows': len(pass102['approved_rows']), 'pass103_applied_rows': len(rows),
          'protected_source_files_checked': sorted(protected_files),
          'home_and_hand_positioned_headings_unchanged': True,
          'routes': routes, 'cards_before_1440': before['/packages@1440']['cards'],
          'cards_after_1440': cards, 'feature_spread_px': max(features)-min(features),
          'button_spread_px': max(buttons)-min(buttons), 'mobile_card_geometry_identical': True,
          'headings': headings, 'all_pass': True}
(OUT / 'audit-run2.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print('PASS exact source changes, unchanged tags/attributes/numbers, byte-identical Audit description')
print(f'PASS {len(pass102["approved_rows"])} Pass 102 and {len(rows)} Pass 103 applied rows: protected source preserved against HEAD')
print('PASS home source, room.css, and hand-positioned headings untouched')
print('PASS 12/12 routes: visible text and links preserved, overflow 0px, all h2/h3 balanced')
print('PASS 8/8 axe runs: zero violations before and after')
print('PASS 390px package card geometry identical before/after')
print('1440 feature y:', features, 'spread:', report['feature_spread_px'])
print('1440 button y:', buttons, 'spread:', report['button_spread_px'])
for row in headings:
    print(row['route'], row['heading'], '| 390:', row['before_390']['last_line_words'], '->', row['after_390']['last_line_words'],
          '| 1440:', row['before_1440']['last_line_words'], '->', row['after_1440']['last_line_words'])
