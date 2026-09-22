"""E2 live test: one tiny GLM call through the recorded launcher (network, ~1 turn).

Harness v2 run A (E2.6). Runs scripts/claude-glm.ps1 -Smoke with a fresh HARNESS_STATE_DIR
and checks the whole E2 trail: exit 0, a RECEIPT stdout line, one dispatch line whose mode
is smoke, exactly one receipt, is_error false, num_turns >= 1, and the archived result
answering OK. On failure the tail of the .err and .out.md files is printed so a z.ai
refusal body lands in the captured output (run A return condition).
"""

import glob
import json
import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
LAUNCHER = os.path.join(REPO, "scripts", "claude-glm.ps1")
STATE = tempfile.mkdtemp(prefix="e2-live-")


def tail(path, limit=1500):
    try:
        with open(path, encoding="utf-8", errors="replace") as f:
            return f.read()[-limit:]
    except OSError:
        return "<missing " + path + ">"


def main():
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = STATE
    try:
        r = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", LAUNCHER,
             "-Smoke", "-Dir", REPO],
            env=env, capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=300)
    except subprocess.TimeoutExpired:
        print("FAIL E2-live smoke: launcher exceeded 300 s")
        return 1

    problems = []
    if r.returncode != 0:
        problems.append("exit code {0}".format(r.returncode))
    lines = [ln for ln in (r.stdout or "").splitlines() if ln.strip()]
    if not any(ln.startswith("RECEIPT: ") for ln in lines):
        problems.append("no stdout line starts 'RECEIPT: '")

    dispatch_path = os.path.join(STATE, "dispatch.jsonl")
    dispatch = None
    if not os.path.exists(dispatch_path):
        problems.append("dispatch.jsonl missing")
    else:
        with open(dispatch_path, encoding="utf-8") as f:
            dlines = [ln for ln in f.read().splitlines() if ln.strip()]
        if len(dlines) != 1:
            problems.append("dispatch.jsonl has {0} lines, want 1".format(len(dlines)))
        else:
            dispatch = json.loads(dlines[0])
            if dispatch.get("mode") != "smoke":
                problems.append("dispatch mode {0!r}, want 'smoke'".format(dispatch.get("mode")))

    receipts = sorted(glob.glob(os.path.join(STATE, "receipts", "*.json")))
    if len(receipts) != 1:
        problems.append("receipts/ holds {0} json files, want 1".format(len(receipts)))
        receipt = None
    else:
        with open(receipts[0], encoding="utf-8") as f:
            receipt = json.load(f)
        if receipt.get("is_error") is not False:
            problems.append("is_error {0!r}, want false".format(receipt.get("is_error")))
        num_turns = receipt.get("num_turns") or 0
        if not (isinstance(num_turns, (int, float)) and num_turns >= 1):
            problems.append("num_turns {0!r}, want >= 1".format(receipt.get("num_turns")))
        out_text = tail(receipt.get("out_file") or "")
        if "OK" not in out_text:
            problems.append("out_file has no OK: " + out_text[:200].replace("\n", " "))

    if problems:
        for p in problems:
            print("FAIL E2-live smoke: " + p)
        err_tail = ""
        for err in sorted(glob.glob(os.path.join(STATE, "runs", "*.err"))):
            err_tail += "\n--- " + err + " ---\n" + tail(err)
        for out in sorted(glob.glob(os.path.join(STATE, "runs", "*.out.md"))):
            err_tail += "\n--- " + out + " ---\n" + tail(out)
        if err_tail:
            print(err_tail)
        return 1

    run_id = receipt.get("run_id") or os.path.basename(receipts[0])[:-5]
    print("PASS E2-live smoke receipt {0}".format(run_id))
    return 0


if __name__ == "__main__":
    sys.exit(main())
