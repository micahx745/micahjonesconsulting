"""C1.5 live test: the C1.2 measurement command, run once more after the diet, must read
below .planning/harness/c1-measure.json's before_prefix.

Harness v2 run F, written from .claude/briefs/harness-v2-f-counts-diet.md. Runs
scripts/harness/measure-prefix.ps1 exactly as C1.2 defines it (label c1-live), with a fresh
temp HARNESS_STATE_DIR per the common brief's state-directory rule. The DeepSeek key is
resolved by the script itself; this test never reads or prints it.
"""

import json
import os
import re
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT = os.path.join(REPO, "scripts", "harness", "measure-prefix.ps1")
MEASURE_JSON = os.path.join(REPO, ".planning", "harness", "c1-measure.json")

FIELD_RE = re.compile(r"(\w+)=(\S+)")


def parse_fields(line):
    return dict(FIELD_RE.findall(line))


def main():
    try:
        with open(MEASURE_JSON, encoding="utf-8") as f:
            measured = json.load(f)
        before_prefix = int(measured["before_prefix"])
    except Exception as e:  # noqa: BLE001
        print("FAIL C1-live: could not read before_prefix from c1-measure.json: {0!r}".format(e))
        return 1

    state = tempfile.mkdtemp(prefix="c1-live-state-")
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state

    try:
        r = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT,
             "-Dir", REPO, "-Label", "c1-live"],
            cwd=REPO, env=env, capture_output=True, text=True, encoding="utf-8",
            errors="replace", timeout=180,
        )
    except subprocess.TimeoutExpired:
        print("FAIL C1-live: measure-prefix.ps1 timed out after 180 s")
        return 1

    out = (r.stdout or "").strip()
    line = next((ln for ln in out.splitlines() if ln.startswith("PREFIX=")), "")
    if r.returncode != 0 or not line:
        print("FAIL C1-live: exit {0} stdout={1!r} stderr={2!r}".format(
            r.returncode, out[:500], (r.stderr or "")[:500]))
        return 1

    fields = parse_fields(line)
    if fields.get("is_error") != "False" or fields.get("exit") != "0" or "PREFIX" not in fields:
        print("FAIL C1-live: unexpected measurement line: {0!r}".format(line))
        return 1

    now_prefix = int(fields["PREFIX"])
    if now_prefix >= before_prefix:
        print("FAIL C1-live: prefix did not shrink: before={0} now={1}".format(before_prefix, now_prefix))
        return 1

    print("PASS C1-live prefix {0} -> {1}".format(before_prefix, now_prefix))
    return 0


if __name__ == "__main__":
    sys.exit(main())
