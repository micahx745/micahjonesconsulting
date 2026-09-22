"""B2.7 live: one free GET against the real DeepSeek balance endpoint.

Harness v2 run B. The only network call this run makes outside its own subprocesses: status.py
deepseek resolves the key itself (env DEEPSEEK_API_KEY, else ~/.claude/.deepseek-key, else
.claude/.deepseek-key) and this test never reads or prints it.
"""

import json
import os
import re
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
STATUS_PY = os.path.join(REPO, "scripts", "harness", "status.py")
BALANCE_RE = re.compile(r"^\d+(\.\d+)?$")


def main():
    state = tempfile.mkdtemp(prefix="b2-live-")
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    r = subprocess.run([sys.executable, STATUS_PY, "deepseek"], env=env, capture_output=True,
                        text=True, encoding="utf-8", errors="replace", timeout=30)
    if r.returncode != 0:
        print("FAIL B2-live deepseek balance: exit {0}: {1}".format(r.returncode, (r.stderr or "")[:500]))
        return 1

    with open(os.path.join(state, "status.json"), encoding="utf-8") as f:
        data = json.load(f)
    ds = data.get("deepseek") or {}
    total_balance = str(ds.get("total_balance", ""))
    currency = ds.get("currency", "")
    is_available = ds.get("is_available")

    problems = []
    if not BALANCE_RE.match(total_balance):
        problems.append("total_balance {0!r} does not match ^\\d+(\\.\\d+)?$".format(total_balance))
    if currency not in ("USD", "CNY"):
        problems.append("currency {0!r} is not USD or CNY".format(currency))
    if not isinstance(is_available, bool):
        problems.append("is_available {0!r} is not a boolean".format(is_available))

    if problems:
        for p in problems:
            print("FAIL B2-live deepseek balance: " + p)
        return 1

    print("PASS B2-live deepseek balance {0} {1}".format(currency, total_balance))
    return 0


if __name__ == "__main__":
    sys.exit(main())
