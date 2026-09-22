"""W3 live test: one real DeepSeek -Smoke call, checking the cost ledger
records matching token counts and a plausible cost. Harness v2 run D.
"""

import json
import os
import re
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT = os.path.join(REPO, "scripts", "deepseek-exec.ps1")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT]
TOKENS_RE = re.compile(r"tokens_in=(\d+)\s+tokens_out=(\d+)")


def main():
    state = tempfile.mkdtemp(prefix="w3-live-")
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    r = subprocess.run(POWERSHELL + ["-Smoke"], env=env, capture_output=True,
                       text=True, encoding="utf-8", errors="replace", timeout=120)
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode != 0:
        print("FAIL W3-live: exit {0}: {1!r}".format(r.returncode, out[:500]))
        return 1

    m = TOKENS_RE.search(out)
    if not m:
        print("FAIL W3-live: no tokens_in=/tokens_out= line found: {0!r}".format(out[:500]))
        return 1
    want_in, want_out = int(m.group(1)), int(m.group(2))

    ledger_path = os.path.join(state, "deepseek-ledger.jsonl")
    if not os.path.exists(ledger_path):
        print("FAIL W3-live: no ledger file at {0}".format(ledger_path))
        return 1
    lines = [ln for ln in open(ledger_path, encoding="utf-8").read().splitlines() if ln.strip()]
    if len(lines) != 1:
        print("FAIL W3-live: ledger has {0} lines, want 1".format(len(lines)))
        return 1
    row = json.loads(lines[0])

    problems = []
    if row.get("label") != "smoke":
        problems.append("label={0!r} want 'smoke'".format(row.get("label")))
    if row.get("prompt_tokens") != want_in:
        problems.append("prompt_tokens={0!r} want {1!r}".format(row.get("prompt_tokens"), want_in))
    if row.get("completion_tokens") != want_out:
        problems.append("completion_tokens={0!r} want {1!r}".format(row.get("completion_tokens"), want_out))
    est_usd = row.get("est_usd")
    if not (isinstance(est_usd, (int, float)) and 0 < est_usd < 0.01):
        problems.append("est_usd={0!r} want a number in (0, 0.01)".format(est_usd))

    if problems:
        for p in problems:
            print("FAIL W3-live: " + p)
        return 1

    print("PASS W3-live ledger {0}".format(est_usd))
    return 0


if __name__ == "__main__":
    sys.exit(main())
