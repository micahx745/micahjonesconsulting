"""B2.7: exercise status.py and budget-gate.py together, offline, against real time.

Harness v2 run B. Every check gets its own fresh temp HARNESS_STATE_DIR, except where the
brief's own wording chains checks onto "that state" (1-3, 5-6, 7-8): those share one state dir,
the way an operator's session would accumulate status.py calls. Agent/Task payloads carry a
transcript_path built from _fixtures.human(), matching what budget-gate.py reads through
_transcript.latest_human_text.
"""

import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timedelta, timezone

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

STATUS_PY = os.path.join(REPO, "scripts", "harness", "status.py")
BUDGET_GATE = os.path.join(REPO, ".claude", "hooks", "budget-gate.py")


def new_state():
    return tempfile.mkdtemp(prefix="b2-state-")


def iso(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def run_status(state, args):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    return subprocess.run([sys.executable, STATUS_PY] + args, env=env, capture_output=True,
                           text=True, encoding="utf-8", errors="replace", timeout=30)


def status_json(state):
    with open(os.path.join(state, "status.json"), encoding="utf-8") as f:
        return json.load(f)


def set_claude(state, five_hour, weekly, fable, resets, window_start=None, five_hour_resets=None):
    args = ["claude", "--five-hour", str(five_hour), "--weekly", str(weekly),
            "--fable", str(fable), "--resets", iso(resets)]
    if window_start is not None:
        args += ["--window-start", iso(window_start)]
    if five_hour_resets is not None:
        args += ["--five-hour-resets", iso(five_hour_resets)]
    return run_status(state, args)


def agent_call(state, model, human_text, extra_env=None):
    transcript_path = os.path.join(state, "transcript-{0}.jsonl".format(len(human_text)))
    fixtures.write_transcript(transcript_path, [fixtures.human(human_text)])
    payload = {
        "session_id": "test-b2",
        "transcript_path": transcript_path,
        "cwd": REPO,
        "hook_event_name": "PreToolUse",
        "tool_name": "Agent",
        "tool_input": {"description": "x", "prompt": "y", "model": model},
    }
    env_extra = {"HARNESS_STATE_DIR": state}
    if extra_env:
        env_extra.update(extra_env)
    return fixtures.run_hook(BUDGET_GATE, payload, env_extra)


def main():
    failures = 0
    now = datetime.now(timezone.utc)

    # 1-3 share one state: weekly 76 crosses the 75% deny threshold.
    state123 = new_state()
    r1 = set_claude(state123, 5, 76, 10, now + timedelta(days=2))
    data1 = status_json(state123) if r1.returncode == 0 else {}
    ok1 = r1.returncode == 0 and data1.get("claude", {}).get("weekly_pct") == 76
    if not ok1:
        failures += 1
        print("FAIL B2 case 1: exit {0} status={1!r}".format(r1.returncode, data1))

    d2, reason2, _ = agent_call(state123, "sonnet", "go")
    ok2 = d2 == "deny" and "75%" in reason2
    if not ok2:
        failures += 1
        print("FAIL B2 case 2: decision={0} reason={1!r}".format(d2, reason2))

    d3, reason3, _ = agent_call(state123, "sonnet", "budget ok please")
    ok3 = d3 == "allow"
    if not ok3:
        failures += 1
        print("FAIL B2 case 3: decision={0} reason={1!r}".format(d3, reason3))

    # 4: weekly 40, fresh state -> allow.
    state4 = new_state()
    set_claude(state4, 5, 40, 10, now + timedelta(days=2))
    d4, reason4, _ = agent_call(state4, "sonnet", "go")
    ok4 = d4 == "allow"
    if not ok4:
        failures += 1
        print("FAIL B2 case 4: decision={0} reason={1!r}".format(d4, reason4))

    # 5-6 share one state: 5h 85 denies opus/fable, not sonnet.
    state56 = new_state()
    set_claude(state56, 85, 40, 10, now + timedelta(days=2), five_hour_resets=now + timedelta(hours=2))
    d5, reason5, _ = agent_call(state56, "opus", "go")
    ok5 = d5 == "deny" and "5-hour" in reason5
    if not ok5:
        failures += 1
        print("FAIL B2 case 5: decision={0} reason={1!r}".format(d5, reason5))

    d6, reason6, _ = agent_call(state56, "sonnet", "go")
    ok6 = d6 == "allow"
    if not ok6:
        failures += 1
        print("FAIL B2 case 6: decision={0} reason={1!r}".format(d6, reason6))

    # 7-8 share one state: fable 72 needs 'fable ok'.
    state78 = new_state()
    set_claude(state78, 5, 40, 72, now + timedelta(days=2))
    d7, reason7, _ = agent_call(state78, "fable", "go")
    ok7 = d7 == "deny" and "fable ok" in reason7
    if not ok7:
        failures += 1
        print("FAIL B2 case 7: decision={0} reason={1!r}".format(d7, reason7))

    d8, reason8, _ = agent_call(state78, "fable", "fable ok")
    ok8 = d8 == "allow"
    if not ok8:
        failures += 1
        print("FAIL B2 case 8: decision={0} reason={1!r}".format(d8, reason8))

    # 9: a 7-hour-old claude block with weekly 90 still allows (stale beats the threshold),
    # and status.py tier says STALE instead of an age.
    state9 = new_state()
    set_claude(state9, 5, 90, 10, now + timedelta(days=2))
    data9 = status_json(state9)
    data9["claude"]["updated_utc"] = iso(now - timedelta(hours=7))
    with open(os.path.join(state9, "status.json"), "w", encoding="utf-8") as f:
        json.dump(data9, f)
    d9, reason9, _ = agent_call(state9, "opus", "go")
    tier9 = run_status(state9, ["tier"])
    ok9 = d9 == "allow" and "STALE" in (tier9.stdout or "")
    if not ok9:
        failures += 1
        print("FAIL B2 case 9: decision={0} reason={1!r} tier={2!r}".format(d9, reason9, tier9.stdout))

    # 10: glm-429 with code 1310 -> weekly window, UTC reset (Shanghai minus 8h).
    state10 = new_state()
    r10 = run_status(state10, ["glm-429", "--message",
                                "[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-09-04 18:30:53]"])
    glm10 = status_json(state10).get("glm", {}) if r10.returncode == 0 else {}
    ok10 = (r10.returncode == 0 and glm10.get("reset_utc") == "2026-09-04T10:30:53Z"
            and glm10.get("window") == "weekly")
    if not ok10:
        failures += 1
        print("FAIL B2 case 10: exit {0} glm={1!r}".format(r10.returncode, glm10))

    # 11: same message shape with code 1308 -> five_hour window.
    state11 = new_state()
    r11 = run_status(state11, ["glm-429", "--message",
                                "[1308][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-09-04 18:30:53]"])
    glm11 = status_json(state11).get("glm", {}) if r11.returncode == 0 else {}
    ok11 = r11.returncode == 0 and glm11.get("window") == "five_hour"
    if not ok11:
        failures += 1
        print("FAIL B2 case 11: exit {0} glm={1!r}".format(r11.returncode, glm11))

    # 12: deepseek --balance-json under $5 -> tier shows the HOLD line.
    state12 = new_state()
    balance_path = os.path.join(state12, "balance.json")
    with open(balance_path, "w", encoding="utf-8") as f:
        json.dump({"is_available": True, "balance_infos": [{"currency": "USD", "total_balance": "4.00"}]}, f)
    r12 = run_status(state12, ["deepseek", "--balance-json", balance_path])
    tier12 = run_status(state12, ["tier"])
    ok12 = r12.returncode == 0 and "DeepSeek $4.00 HOLD" in (tier12.stdout or "")
    if not ok12:
        failures += 1
        print("FAIL B2 case 12: exit {0} tier={1!r}".format(r12.returncode, tier12.stdout))

    # 13: a 3.6-day window, 1 day elapsed -> f = 1/3.6, target round(85*f) = 24, weekly 1 <= 14 -> ahead.
    state13 = new_state()
    set_claude(state13, 5, 1, 1, now + timedelta(days=2, hours=14, minutes=24),
               window_start=now - timedelta(days=1))
    tier13 = run_status(state13, ["tier"])
    ok13 = "(ahead, target 24% now," in (tier13.stdout or "")
    if not ok13:
        failures += 1
        print("FAIL B2 case 13: tier={0!r}".format(tier13.stdout))

    # 14: a SessionStart payload returns additionalContext starting with "BUDGET ".
    state14 = new_state()
    payload14 = {"session_id": "test-b2", "hook_event_name": "SessionStart"}
    d14, reason14, raw14 = fixtures.run_hook(BUDGET_GATE, payload14, {"HARNESS_STATE_DIR": state14})
    ok14 = d14 == "context" and reason14.startswith("BUDGET ")
    if not ok14:
        failures += 1
        print("FAIL B2 case 14: decision={0} reason={1!r} raw={2!r}".format(d14, reason14, raw14))

    # 15: an executor session is invisible to the gate even at weekly 90.
    state15 = new_state()
    set_claude(state15, 5, 90, 10, now + timedelta(days=2))
    d15, reason15, raw15 = agent_call(state15, "sonnet", "go", extra_env={"HARNESS_ROLE": "executor"})
    ok15 = d15 == "allow" and raw15 == ""
    if not ok15:
        failures += 1
        print("FAIL B2 case 15: decision={0} raw={1!r}".format(d15, raw15))

    if failures == 0:
        print("PASS B2 15/15")
        return 0
    print("FAIL B2 {0} of 15 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
