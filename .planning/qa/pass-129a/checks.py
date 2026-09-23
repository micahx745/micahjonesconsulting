import re
import urllib.request


def get(url):
    with urllib.request.urlopen(url) as r:
        return r.read().decode("utf-8")


def strip(html):
    html = re.sub(r"<head\b.*?</head>", "", html, flags=re.S | re.I)
    html = re.sub(r"<script\b.*?</script>", "", html, flags=re.S | re.I)
    return html


def norm(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()


home_raw = get("http://localhost:3131/")
pkg_raw = get("http://localhost:3131/packages")
home = strip(home_raw)
pkg = strip(pkg_raw)
home_txt = norm(home)
pkg_txt = norm(pkg)

results = []
c1 = home_txt.count("The demo took a weekend in Lovable or Replit.")
results.append(("1 / visible 'The demo took a weekend in Lovable or Replit.'", c1, ">=1", c1 >= 1))
c2 = home_raw.count('<meta name="description" content="AI product stalled on sign-in, deploys, or sales? I get it launched.')
results.append(("2 / raw meta description prefix", c2, "1", c2 == 1))
c3a = home.count('href="/services#packages"')
c3b = home.count('href="/packages"')
results.append(("3a / stripped href=/services#packages", c3a, "0", c3a == 0))
results.append(("3b / stripped href=/packages", c3b, "4", c3b == 4))
c4a = home_txt.count("credits toward the next package, or toward an engagement started within 60 days")
c4b = pkg_txt.count("credits toward the next package, or toward an engagement started within 60 days")
results.append(("4a / fine print comma", c4a, ">=1", c4a >= 1))
results.append(("4b /packages fine print comma", c4b, ">=1", c4b >= 1))
c5 = pkg_txt.count("out of Lovable, Claude Code, or Replit and stalled")
results.append(("5 /packages intro tools", c5, ">=1", c5 >= 1))

nav = re.search(r"<nav\b.*?</nav>", home, flags=re.S)
labels = []
if nav:
    ul = re.search(r'<ul class="cw-navlinks".*?</ul>', nav.group(0), flags=re.S)
    if ul:
        labels = [re.sub(r"<[^>]+>", "", m).strip() for m in re.findall(r"<a\b[^>]*>(.*?)</a>", ul.group(0), flags=re.S)]
got = ", ".join(labels)
results.append(("6 / nav labels", got, "Services, Packages, Work, About, Contact", got == "Services, Packages, Work, About, Contact"))

for name, got_v, exp, ok in results:
    print(f"{'PASS' if ok else 'FAIL'} | {name} -> got: {got_v!r} expected: {exp}")
