"""W1 offline test: codex-exec.ps1's codex.lock (Harness v2 run D).

Three checks, each with -Review -Prompt <temp> -Out <temp> -DryRun so no Codex
process ever starts: the lock is the only thing under test. Each check gets a
fresh temp HARNESS_STATE_DIR.
"""

import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT = os.path.join(REPO, "scripts", "codex-exec.ps1")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT]


def run(state, extra_args):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    return subprocess.run(POWERSHELL + extra_args, env=env, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", timeout=60)


def lock_path(state):
    return os.path.join(state, "codex.lock")


def main():
    failures = 0
    work = tempfile.mkdtemp(prefix="w1-work-")
    prompt = os.path.join(work, "prompt.md")
    with open(prompt, "w", encoding="utf-8", newline="") as f:
        f.write("review this")
    out = os.path.join(work, "out.md")

    # Check 1: no lock -> exit 0; output contains DRY RUN; no lock file afterwards.
    state1 = tempfile.mkdtemp(prefix="w1-state1-")
    r1 = run(state1, ["-Review", "-Prompt", prompt, "-Out", out, "-DryRun"])
    out1 = (r1.stdout or "") + (r1.stderr or "")
    ok1 = (r1.returncode == 0 and "DRY RUN" in out1 and not os.path.exists(lock_path(state1)))
    if not ok1:
        failures += 1
        print("FAIL W1 check 1: exit {0} out {1!r} lock_exists {2}".format(
            r1.returncode, out1[:400], os.path.exists(lock_path(state1))))

    # Check 2: a lock naming the PID of a live child -> exit 3; "holds the lock"
    # and that PID appear in the output; the lock file is unchanged.
    state2 = tempfile.mkdtemp(prefix="w1-state2-")
    child = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"])
    try:
        lock_text = (
            '{"pid": %d, "started_utc": "2026-09-22T00:00:00Z", "mode": "review", '
            '"dir": "C:/x"}' % child.pid
        )
        with open(lock_path(state2), "w", encoding="utf-8", newline="") as f:
            f.write(lock_text)
        before = open(lock_path(state2), encoding="utf-8").read()
        r2 = run(state2, ["-Review", "-Prompt", prompt, "-Out", out, "-DryRun"])
        out2 = (r2.stdout or "") + (r2.stderr or "")
        after = open(lock_path(state2), encoding="utf-8").read() if os.path.exists(lock_path(state2)) else None
        ok2 = (r2.returncode == 3 and "holds the lock" in out2 and str(child.pid) in out2
               and after == before)
        if not ok2:
            failures += 1
            print("FAIL W1 check 2: exit {0} out {1!r} unchanged {2}".format(
                r2.returncode, out2[:400], after == before))
    finally:
        child.kill()
        try:
            child.wait(timeout=10)
        except subprocess.TimeoutExpired:
            pass

    # Check 3: a lock naming PID 999999 (not running) -> exit 0; "reclaimed a
    # stale lock" and DRY RUN in the output; no lock file afterwards.
    state3 = tempfile.mkdtemp(prefix="w1-state3-")
    os.makedirs(state3, exist_ok=True)
    stale_text = (
        '{"pid": 999999, "started_utc": "2026-09-22T00:00:00Z", "mode": "review", '
        '"dir": "C:/x"}'
    )
    with open(lock_path(state3), "w", encoding="utf-8", newline="") as f:
        f.write(stale_text)
    r3 = run(state3, ["-Review", "-Prompt", prompt, "-Out", out, "-DryRun"])
    out3 = (r3.stdout or "") + (r3.stderr or "")
    ok3 = (r3.returncode == 0 and "reclaimed a stale lock" in out3 and "DRY RUN" in out3
           and not os.path.exists(lock_path(state3)))
    if not ok3:
        failures += 1
        print("FAIL W1 check 3: exit {0} out {1!r} lock_exists {2}".format(
            r3.returncode, out3[:400], os.path.exists(lock_path(state3))))

    if failures == 0:
        print("PASS W1 3/3")
        return 0
    print("FAIL W1 {0} of 3 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
