"""E2 offline test: the launcher refuses bad input before dispatching anything.

Harness v2 run A (E2.6). Each launcher call gets HARNESS_STATE_DIR pointing at a fresh
temp dir, so "nothing was dispatched" is observable as "no dispatch.jsonl exists there".
No network, no claude process: case 1 exits at the length gate, case 2 at parameter
binding, case 3 only reads the script text.
"""

import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
LAUNCHER = os.path.join(REPO, "scripts", "claude-glm.ps1")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", LAUNCHER]
SCRIPT_TEXT = open(LAUNCHER, encoding="utf-8", errors="replace").read()

NEEDLES = ("--output-format", "HARNESS_ROLE", "HARNESS_EXECUTOR_SCOPE",
           "dispatch.jsonl", "receipts", "RECEIPT:", "30000")


def run_launcher(state, extra_args):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    return subprocess.run(POWERSHELL + extra_args, env=env, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", timeout=120)


def dispatch_exists(state):
    return os.path.exists(os.path.join(state, "dispatch.jsonl"))


def main():
    failures = 0

    # Case 1: a 30001-character prompt is refused, exit 2, nothing dispatched.
    work = tempfile.mkdtemp(prefix="e2-off-")
    state1 = tempfile.mkdtemp(prefix="e2-state1-")
    long_prompt = os.path.join(work, "too-long.md")
    with open(long_prompt, "w", encoding="utf-8", newline="") as f:
        f.write("a" * 30001)
    r1 = run_launcher(state1, ["-Batch", "-PromptFile", long_prompt, "-Dir", REPO])
    out1 = (r1.stdout or "") + (r1.stderr or "")
    ok1 = (r1.returncode == 2 and "limit 30000" in out1 and "LESSONS #36" in out1
           and not dispatch_exists(state1))
    if not ok1:
        failures += 1
        print("FAIL E2-offline case 1: exit {0} out {1!r} dispatch_exists {2}".format(
            r1.returncode, out1[:300], dispatch_exists(state1)))

    # Case 2: a bogus -Scope dies at binding, exit non-zero, nothing dispatched.
    state2 = tempfile.mkdtemp(prefix="e2-state2-")
    short_prompt = os.path.join(work, "short.md")
    with open(short_prompt, "w", encoding="utf-8", newline="") as f:
        f.write("do nothing")
    r2 = run_launcher(state2, ["-Batch", "-PromptFile", short_prompt, "-Dir", REPO,
                               "-Scope", "bogus"])
    out2 = (r2.stdout or "") + (r2.stderr or "")
    ok2 = (r2.returncode != 0 and "Scope" in out2 and not dispatch_exists(state2))
    if not ok2:
        failures += 1
        print("FAIL E2-offline case 2: exit {0} out {1!r} dispatch_exists {2}".format(
            r2.returncode, out2[:300], dispatch_exists(state2)))

    # Case 3: the script text carries every E2 marker.
    missing = [n for n in NEEDLES if n not in SCRIPT_TEXT]
    ok3 = not missing
    if not ok3:
        failures += 1
        print("FAIL E2-offline case 3: script text missing {0!r}".format(missing))

    if failures == 0:
        print("PASS E2-offline 3/3")
        return 0
    print("FAIL E2-offline {0} of 3 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
