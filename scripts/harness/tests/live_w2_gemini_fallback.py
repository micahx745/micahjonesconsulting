"""W2 live test: gemini-exec.ps1's fallback chain against the real Gemini API
(free tier: two small calls). Harness v2 run D.
"""

import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT = os.path.join(REPO, "scripts", "gemini-exec.ps1")
POWERSHELL = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT]


def run(extra_args):
    return subprocess.run(POWERSHELL + extra_args, capture_output=True,
                          text=True, encoding="utf-8", errors="replace", timeout=180)


def main():
    failures = 0
    work = tempfile.mkdtemp(prefix="w2-live-")
    prompt = os.path.join(work, "prompt.md")
    with open(prompt, "w", encoding="utf-8", newline="") as f:
        f.write("Reply with the single word OK.")

    # Check 1: an unknown -Model falls back through the default chain to a real one.
    r1 = run(["-Model", "gemini-nonexistent-test", "-PromptFile", prompt, "-MaxTokens", "2000"])
    stderr1 = r1.stderr or ""
    stdout1 = r1.stdout or ""
    ok1 = (r1.returncode == 0 and "gemini-nonexistent-test ->" in stderr1
           and "MODEL-USED: gemini-" in stderr1 and "OK" in stdout1)
    if not ok1:
        failures += 1
        print("FAIL W2-live check 1: exit {0} stderr {1!r} stdout {2!r}".format(
            r1.returncode, stderr1[:400], stdout1[:400]))

    # Check 2: -Model and -Chain both unknown -> the whole chain fails.
    r2 = run(["-Model", "gemini-nonexistent-a", "-Chain", "gemini-nonexistent-b",
              "-PromptFile", prompt])
    out2 = (r2.stdout or "") + (r2.stderr or "")
    ok2 = (r2.returncode == 4 and "every model in the chain failed" in out2)
    if not ok2:
        failures += 1
        print("FAIL W2-live check 2: exit {0} out {1!r}".format(r2.returncode, out2[:400]))

    if failures == 0:
        print("PASS W2-live 2/2")
        return 0
    print("FAIL W2-live {0} of 2 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
