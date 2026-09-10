import json, pathlib, sys
SPECS = pathlib.Path(".planning/design/PASS-108-SPECS.json")
specs = {s["area"]: s for s in json.loads(SPECS.read_text(encoding="utf-8"))}
root = pathlib.Path(".")
fail = 0
for area in sys.argv[1:]:
    print("== %s ==" % area)
    for i, p in enumerate(specs[area]["patches"]):
        f = root / p["file"]
        if not f.exists():
            print("   MISSING FILE %s" % p["file"]); fail += 1; continue
        src = f.read_text(encoding="utf-8")
        n = src.count(p["anchor"])
        if n != 1:
            print("   FAIL [%02d] anchor x%d -> %s" % (i, n, p["file"])); fail += 1; continue
        f.write_text(src.replace(p["anchor"], p["replacement"]), encoding="utf-8", newline="")
        print("   ok   [%02d] %-30s %+d chars" % (i, p["file"].split("/")[-1], len(p["replacement"])-len(p["anchor"])))
print("\nfailures: %d" % fail)
sys.exit(1 if fail else 0)
