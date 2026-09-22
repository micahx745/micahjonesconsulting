"""E3.2: check a run digest JSON is small, well-formed, and each item is checkable.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only. A digest is what the main session reads instead of an executor's raw transcript, so
every item's evidence must be something a human or a script can go look at: either a
"$ command -> output" line, or a "path:line" reference.
"""

import json
import re
import sys

MAX_BYTES = 8192
CONFIDENCES = ("high", "med", "low")
EVIDENCE_CMD_RE = re.compile(r"^\$ .+ -> .+")
EVIDENCE_LOC_RE = re.compile(r"[A-Za-z0-9_./\\-]+:\d+")


def check(path):
    reasons = []
    try:
        with open(path, "rb") as f:
            raw = f.read()
    except OSError as e:
        return False, ["cannot read file: {0}".format(e)], 0, 0

    n_bytes = len(raw)
    if n_bytes > MAX_BYTES:
        reasons.append("size {0} > {1}".format(n_bytes, MAX_BYTES))

    obj = None
    try:
        obj = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, ValueError):
        reasons.append("not JSON")

    n_items = 0
    if obj is not None:
        if not isinstance(obj, dict):
            reasons.append("not an object")
        else:
            items = obj.get("items")
            if not isinstance(items, list) or not items:
                reasons.append("items missing or empty")
            else:
                n_items = len(items)
                for k, item in enumerate(items):
                    if not isinstance(item, dict):
                        reasons.append("item {0}: not an object".format(k))
                        continue
                    claim = item.get("claim")
                    if not isinstance(claim, str) or not claim.strip():
                        reasons.append("item {0}: claim missing or empty".format(k))
                    evidence = item.get("evidence")
                    ok_evidence = isinstance(evidence, str) and (
                        bool(EVIDENCE_CMD_RE.match(evidence)) or bool(EVIDENCE_LOC_RE.search(evidence))
                    )
                    if not ok_evidence:
                        reasons.append(
                            "item {0}: evidence needs path:line or \"$ cmd -> output\"".format(k)
                        )
                    confidence = item.get("confidence")
                    if confidence not in CONFIDENCES:
                        reasons.append("item {0}: confidence must be high, med or low".format(k))

    return (not reasons), reasons, n_items, n_bytes


def main():
    args = sys.argv[1:]
    if len(args) != 1:
        print("usage: digest_check.py <digest.json>")
        return 1
    path = args[0]
    ok, reasons, n_items, n_bytes = check(path)
    if ok:
        print("PASS {0} ({1} items, {2} bytes)".format(path, n_items, n_bytes))
        return 0
    print("FAIL {0}: {1}".format(path, "; ".join(reasons)))
    return 1


if __name__ == "__main__":
    sys.exit(main())
