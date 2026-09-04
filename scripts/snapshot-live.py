import urllib.request, re, os, sys, json
BASE=os.environ.get("SNAPSHOT_BASE","https://www.micahjonesconsulting.com")
ROUTES=["/","/about","/services","/packages","/work","/playbook","/contact","/book","/book/kickoff",
        "/work/guardicore","/work/ordani","/work/rfp-engine","/work/content-engine",
        "/services/thanks","/playbook/thanks","/work/passioneer","/robots.txt","/sitemap.xml","/llms.txt"]
OUT=".planning/snapshots/2026-09-04"
os.makedirs(OUT,exist_ok=True)
report={}
for r in ROUTES:
    url=BASE+r
    name=(r.strip("/").replace("/","_") or "home")
    try:
        req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 (snapshot audit)"})
        with urllib.request.urlopen(req,timeout=30) as resp:
            status=resp.status
            final=resp.geturl()
            raw=resp.read().decode("utf-8",errors="replace")
    except urllib.error.HTTPError as e:
        status=e.code; final=url
        raw=e.read().decode("utf-8",errors="replace")
    except Exception as e:
        report[r]={"status":"ERROR","error":str(e)}; continue
    open(f"{OUT}/{name}.raw.html","w",encoding="utf-8",newline="\n").write(raw)
    # strip scripts/styles then extract visible text
    body=re.sub(r"(?is)<script.*?</script>","",raw)
    body=re.sub(r"(?is)<style.*?</style>","",body)
    title=re.search(r"(?is)<title[^>]*>(.*?)</title>",raw)
    desc=re.search(r'(?is)<meta name="description" content="(.*?)"',raw)
    h1s=re.findall(r"(?is)<h1[^>]*>(.*?)</h1>",body)
    def clean(s):
        s=re.sub(r"(?s)<[^>]+>"," ",s)
        s=(s.replace("&amp;","&").replace("&#x27;","'").replace("&#39;","'")
             .replace("&quot;",'"').replace("&nbsp;"," ").replace("&lt;","<").replace("&gt;",">")
             .replace("&mdash;","—").replace("&ndash;","–").replace("&middot;","·")
             .replace("&rarr;","→").replace("&darr;","↓").replace("&larr;","←")
             .replace("&times;","×").replace("&hellip;","…"))
        return re.sub(r"\s+"," ",s).strip()
    text=clean(body)
    open(f"{OUT}/{name}.txt","w",encoding="utf-8",newline="\n").write(text)
    report[r]={"status":status,"final":final,"title":clean(title.group(1)) if title else None,
               "description":clean(desc.group(1)) if desc else None,
               "h1":[clean(h) for h in h1s],
               "text_len":len(text),
               "em_dashes_in_text":text.count("—")}
with open(f"{OUT}/_report.json","w",encoding="utf-8",newline="\n") as fh:
    json.dump(report,fh,indent=2,ensure_ascii=False)
    fh.write("\n")
# prettier owns the committed shape of this artifact; normalize so `prettier --check` passes.
# Best effort: if prettier is unavailable the snapshot still succeeds, just unformatted.
try:
    import subprocess
    subprocess.run(f"pnpm exec prettier --write {OUT}/_report.json",shell=True,check=False,
                   stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=180)
except Exception:
    pass
print(json.dumps(report,indent=1,ensure_ascii=False))
