# Scratch: rank the 30 attested phrases by frequency across the 37-post intersection set.
# Pass-102 Step A. Not committed.
import json, re, io

BASE = r"C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p101-integrate\.planning\research"
with io.open(BASE + r"\01-APPENDIX-intersection-37.json", encoding="utf-8") as f:
    posts = json.load(f)
with io.open(BASE + r"\01-APPENDIX-phrase-bank-attested.json", encoding="utf-8") as f:
    bank = json.load(f)

def norm(s):
    s = s.lower()
    s = s.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
    return s

# searchable text per post: title + excerpt, normalized
texts = []
for i, p in enumerate(posts):
    t = norm((p.get("title") or "") + " \n " + (p.get("excerpt") or ""))
    texts.append(t)

# match keys: for verbatim sentences use a distinctive normalized substring
def key_for(phrase):
    n = norm(phrase)
    if n.startswith("my biggest problem"):
        return ["my biggest problem right now is distribution"]
    if n.startswith("i built a tiny saas"):
        return ["i built a tiny saas", "3 real payments"]
    if n.startswith("the honest reason"):
        return ["zero system for marketing"]
    if n.startswith("the hard part"):
        return ["the hard part of building software"]
    if n.startswith("every update"):
        return ["every update risked breaking it", "rewriting everything from scratch"]
    if n.startswith("i'm hitting a wall"):
        return ["hitting a wall"]
    if n.startswith("but instead of marketing"):
        return ["instead of marketing it"]
    if n.startswith("i'm hitting the classic"):
        return ["build it vs. sell it first"]
    if n == "love to hear / honest feedback / happy to answer":
        return ["love to hear", "honest feedback", "happy to answer"]
    return [n]

rows = []
for e in bank["attested"]:
    phrase = e["phrase"]
    keys = key_for(phrase)
    post_hits = []  # (post_number, which_key)
    total = 0
    for i, t in enumerate(texts):
        hits = [k for k in keys if k in t]
        if hits:
            post_hits.append((i + 1, hits))
            total += len(hits)
    rows.append((total, phrase, post_hits))

rows.sort(key=lambda r: -r[0])
print("RANK | INTERSECTION-HITS | PHRASE | POSTS")
for rank, (total, phrase, post_hits) in enumerate(rows, 1):
    ph = ", ".join(f"#{n}" for n, _ in post_hits)
    print(f"{rank:2d} | {total:2d} | {phrase[:80]} | {ph}")

print()
print("--- killed-list sweep over the 37 excerpts (expect operator wording to appear only in live copy, not corpus) ---")
for e in bank["killed"]:
    k = norm(e["phrase"].split(" (")[0].split(" (the")[0])
    # for family entries use a core substring
    core = {
        "it shipped. nobody came.": ["it shipped"],
        "every change broke something that worked yesterday": ["every change broke"],
        "solo builders": ["solo builder"],
        "solo founder": ["solo founder"],
        "vibe coding": ["vibe coding", "vibe coded"],
        "the wall / gate": ["the wall", "the gate"],
        "80% / the 80% wall": ["80%", "80 percent"],
        "stuck between demo and production": ["stuck between demo"],
    }.get(k, [k])
    hits = []
    for i, t in enumerate(texts):
        for c in core:
            if c in t:
                hits.append((i + 1, c))
    print(f"{e['phrase'][:60]:60s} -> {hits if hits else '0 in intersection'}")
