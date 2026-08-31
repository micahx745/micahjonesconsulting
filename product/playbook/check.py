# product/playbook/check.py — the chapter gate battery, mechanical.
#
# Chapter 1's own thesis applied to its production: rules a machine can
# run beat rules a writer must remember. Run on every chapter before
# operator review:
#   python product/playbook/check.py src/chapter-NN.typ
#
# Checks:
#   1. Banned words (site brand.json voice.banned), comments excluded.
#   2. Em-dash count in prose (warn > 2).
#   3. fieldnote-before-heading: a #fieldnote[...] block whose next
#      content line is a heading collides with the heading's rail
#      section code (caught by eye in ch.2, ch.4, ch.7, ch.9 — four
#      times is a gate).
import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
BRAND = r"C:\Users\micah\Code\micahjonesconsulting\.claude\brand.json"

def main(path: str) -> int:
    src = open(path, encoding="utf-8").read()
    lines = src.splitlines()
    prose = "\n".join(l for l in lines if not l.strip().startswith("//"))
    failures = []

    banned = json.load(open(BRAND, encoding="utf-8"))["voice"]["banned"]
    hits = sorted({w for w in banned if re.search(r"(?i)\b" + re.escape(w) + r"\b", prose)})
    if hits:
        failures.append(f"banned words: {hits}")

    dashes = prose.count("\u2014")
    if dashes > 2:
        failures.append(f"em-dashes: {dashes} (cap 2)")

    # fieldnote/side block immediately followed by a heading.
    depth = 0
    in_note = False
    for i, line in enumerate(lines):
        s = line.strip()
        if re.match(r"#(fieldnote|side)\[", s):
            in_note = True
            depth = line.count("[") - line.count("]")
            continue
        if in_note:
            depth += line.count("[") - line.count("]")
            if depth <= 0:
                in_note = False
                for j in range(i + 1, min(i + 4, len(lines))):
                    nxt = lines[j].strip()
                    if not nxt:
                        continue
                    if nxt.startswith("== "):
                        failures.append(
                            f"line {i + 1}: fieldnote/side sits directly before "
                            f"heading '{nxt}' — rail collision. Anchor it a "
                            "paragraph earlier."
                        )
                    break

    if failures:
        print(f"GATE FAILED — {path}")
        for f in failures:
            print(" -", f)
        return 1
    print(f"gate clean — {path} (em-dashes: {dashes})")
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
