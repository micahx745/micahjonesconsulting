"""W3 offline test: deepseek-exec.ps1's cost ledger and the $5 hold (Harness v2
run D). All three checks use -LedgerFixture, so no network call is made.
"""

import json
import os
import subprocess
import sys
import tempfile
import time

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT = os.path.join(REPO, "scripts", "deepseek-exec.ps1")
RATES_PATH = os.path.join(REPO, "scripts", "harness", "deepseek-rates.json")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT]

FIXTURE_OBJ = {
    "model": "deepseek-flash",
    "choices": [{"message": {"content": "OK"}, "finish_reason": "stop"}],
    "usage": {
        "prompt_tokens": 1000,
        "prompt_cache_hit_tokens": 400,
        "prompt_cache_miss_tokens": 600,
        "completion_tokens": 200,
        "completion_tokens_details": {"reasoning_tokens": 150},
    },
}


def run(state, extra_args):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    return subprocess.run(POWERSHELL + extra_args, env=env, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", timeout=60)


def ledger_path(state):
    return os.path.join(state, "deepseek-ledger.jsonl")


def expected_est_usd(rates, model, peak, cache_hit, cache_miss, completion_tokens):
    per_million = rates["per_million"]
    entry = per_million.get(model, per_million["deepseek-v4-pro"])
    tier = entry["peak" if peak else "offpeak"]
    raw = (cache_hit * tier["cache_hit"] + cache_miss * tier["input"]
           + completion_tokens * tier["output"]) / 1000000.0
    return round(raw, 6)


def main():
    failures = 0
    work = tempfile.mkdtemp(prefix="w3-work-")
    fixture_path = os.path.join(work, "fixture.json")
    with open(fixture_path, "w", encoding="utf-8", newline="") as f:
        f.write(json.dumps(FIXTURE_OBJ))
    prompt_path = os.path.join(work, "prompt.md")
    with open(prompt_path, "w", encoding="utf-8", newline="") as f:
        f.write("say ok")

    with open(RATES_PATH, encoding="utf-8") as f:
        rates = json.load(f)

    # Check 1: exit 0; one ledger line with the fixture's token split and a
    # matching est_usd (recomputed from deepseek-rates.json and the line's own
    # peak flag).
    state1 = tempfile.mkdtemp(prefix="w3-state1-")
    r1 = run(state1, ["-PromptFile", prompt_path, "-Model", "deepseek-flash",
                       "-LedgerFixture", fixture_path])
    out1 = (r1.stdout or "") + (r1.stderr or "")
    ok1 = True
    detail1 = ""
    if r1.returncode != 0:
        ok1 = False
        detail1 = "exit {0}: {1!r}".format(r1.returncode, out1[:400])
    else:
        lp = ledger_path(state1)
        if not os.path.exists(lp):
            ok1 = False
            detail1 = "no ledger file at {0}".format(lp)
        else:
            lines = [ln for ln in open(lp, encoding="utf-8").read().splitlines() if ln.strip()]
            if len(lines) != 1:
                ok1 = False
                detail1 = "ledger has {0} lines, want 1".format(len(lines))
            else:
                row = json.loads(lines[0])
                want_est = expected_est_usd(rates, row.get("model", "deepseek-flash"),
                                             bool(row.get("peak")), 400, 600, 200)
                checks = {
                    "cache_hit": (row.get("cache_hit"), 400),
                    "cache_miss": (row.get("cache_miss"), 600),
                    "completion_tokens": (row.get("completion_tokens"), 200),
                    "reasoning_tokens": (row.get("reasoning_tokens"), 150),
                }
                bad = ["{0}={1!r} want {2!r}".format(k, a, b) for k, (a, b) in checks.items() if a != b]
                got_est = row.get("est_usd")
                if got_est is None or abs(float(got_est) - want_est) > 1e-9:
                    bad.append("est_usd={0!r} want {1!r}".format(got_est, want_est))
                if bad:
                    ok1 = False
                    detail1 = "; ".join(bad)
    if not ok1:
        failures += 1
        print("FAIL W3 check 1: {0}".format(detail1))

    # Check 2: a status.json whose deepseek block holds (balance under $5,
    # updated now) -> exit 6; output contains "under $5".
    state2 = tempfile.mkdtemp(prefix="w3-state2-")
    status_block = {
        "deepseek": {
            "total_balance": "4.00",
            "currency": "USD",
            "is_available": True,
            "updated_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
    }
    with open(os.path.join(state2, "status.json"), "w", encoding="utf-8", newline="") as f:
        f.write(json.dumps(status_block))
    r2 = run(state2, ["-PromptFile", prompt_path, "-Model", "deepseek-flash",
                       "-LedgerFixture", fixture_path])
    out2 = (r2.stdout or "") + (r2.stderr or "")
    ok2 = (r2.returncode == 6 and "under $5" in out2)
    if not ok2:
        failures += 1
        print("FAIL W3 check 2: exit {0} out {1!r}".format(r2.returncode, out2[:400]))

    # Check 3: the same status.json, but -Force -> exit 0.
    state3 = tempfile.mkdtemp(prefix="w3-state3-")
    with open(os.path.join(state3, "status.json"), "w", encoding="utf-8", newline="") as f:
        f.write(json.dumps(status_block))
    r3 = run(state3, ["-PromptFile", prompt_path, "-Model", "deepseek-flash",
                       "-LedgerFixture", fixture_path, "-Force"])
    out3 = (r3.stdout or "") + (r3.stderr or "")
    ok3 = (r3.returncode == 0)
    if not ok3:
        failures += 1
        print("FAIL W3 check 3: exit {0} out {1!r}".format(r3.returncode, out3[:400]))

    if failures == 0:
        print("PASS W3 3/3")
        return 0
    print("FAIL W3 {0} of 3 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
