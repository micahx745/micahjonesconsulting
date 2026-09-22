"""E2 offline test: the launcher refuses bad input before dispatching anything.

Harness v2 run A (E2.6). Each launcher call gets HARNESS_STATE_DIR pointing at a fresh
temp dir, so "nothing was dispatched" is observable as "no dispatch.jsonl exists there".
No network, no claude process: case 1 exits at the length gate, case 2 at parameter
binding, case 3 only reads the script text.
"""

import json
import os
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
LAUNCHER = os.path.join(REPO, "scripts", "claude-glm.ps1")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", LAUNCHER]
SCRIPT_TEXT = open(LAUNCHER, encoding="utf-8", errors="replace").read()

NEEDLES = ("--output-format", "HARNESS_ROLE", "HARNESS_EXECUTOR_SCOPE",
           "dispatch.jsonl", "receipts", "RECEIPT:", "30000")


def run_launcher(state, extra_args, env_extra=None):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["HARNESS_STATE_DIR"] = state
    if env_extra:
        env.update(env_extra)
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

    # Case 4 (E2.7, LESSONS #59): is_error comes from the exit code and the 429
    # flag, not just whether the child's JSON parsed. A fake "claude" on PATH
    # prints a canned reply.json and exits with a chosen code, so the launcher
    # never reaches a real network. Two halves, one check.
    def run_case4_half(label, reply_obj, exit_code, want_launcher_exit,
                        want_receipt_exit, want_glm429, want_is_error):
        fake_dir = tempfile.mkdtemp(prefix="e2-fake-{0}-".format(label))
        with open(os.path.join(fake_dir, "reply.json"), "w", encoding="utf-8", newline="") as f:
            f.write(json.dumps(reply_obj))
        cmd_path = os.path.join(fake_dir, "claude.cmd")
        with open(cmd_path, "w", encoding="utf-8", newline="\r\n") as f:
            f.write("@echo off\r\ntype \"%~dp0reply.json\"\r\nexit /b {0}\r\n".format(exit_code))
        new_path = fake_dir + os.pathsep + os.environ.get("PATH", "")
        resolved = shutil.which("claude", path=new_path)
        if not resolved or os.path.normcase(os.path.dirname(os.path.abspath(resolved))) != os.path.normcase(os.path.abspath(fake_dir)):
            return False, "half {0} precondition: shutil.which('claude') -> {1!r}, want inside {2}".format(
                label, resolved, fake_dir)
        env_extra = {"PATH": new_path, "ZAI_CODING_KEY": "offline-test-dummy"}
        state = tempfile.mkdtemp(prefix="e2-state4-{0}-".format(label))
        prompt = os.path.join(work, "case4-{0}.md".format(label))
        with open(prompt, "w", encoding="utf-8", newline="") as f:
            f.write("do nothing")
        r = run_launcher(state, ["-Batch", "-PromptFile", prompt, "-Dir", REPO], env_extra=env_extra)
        out = (r.stdout or "") + (r.stderr or "")
        receipt_path = None
        for ln in (r.stdout or "").splitlines():
            if ln.startswith("RECEIPT: "):
                receipt_path = ln[len("RECEIPT: "):].strip()
        if r.returncode != want_launcher_exit:
            return False, "half {0}: launcher exit {1}, want {2}. out={3!r}".format(
                label, r.returncode, want_launcher_exit, out[:400])
        if not receipt_path or not os.path.exists(receipt_path):
            return False, "half {0}: no RECEIPT file. out={1!r}".format(label, out[:400])
        with open(receipt_path, encoding="utf-8") as f:
            receipt = json.load(f)
        if receipt.get("exit_code") != want_receipt_exit:
            return False, "half {0}: receipt exit_code {1!r}, want {2!r}".format(
                label, receipt.get("exit_code"), want_receipt_exit)
        if receipt.get("glm_429") != want_glm429:
            return False, "half {0}: receipt glm_429 {1!r}, want {2!r}".format(
                label, receipt.get("glm_429"), want_glm429)
        if receipt.get("is_error") != want_is_error:
            return False, "half {0}: receipt is_error {1!r}, want {2!r}".format(
                label, receipt.get("is_error"), want_is_error)
        return True, ""

    ok4a, detail4a = run_case4_half(
        "4a",
        {"type": "result", "subtype": "success", "is_error": False,
         "result": "API Error: 429 [1308][Usage limit reached for 5 hour. Your limit will reset at 2026-09-22 14:44:53]",
         "session_id": "e2-offline-4a"},
        1, 1, 1, True, True)
    ok4b, detail4b = run_case4_half(
        "4b",
        {"type": "result", "subtype": "success", "is_error": False,
         "result": "OK", "session_id": "e2-offline-4b"},
        0, 0, 0, False, False)
    ok4 = ok4a and ok4b
    if not ok4:
        failures += 1
        detail = "; ".join(d for d in (detail4a, detail4b) if d)
        print("FAIL E2-offline case 4: {0}".format(detail))

    if failures == 0:
        print("PASS E2-offline 4/4")
        return 0
    print("FAIL E2-offline {0} of 4 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
