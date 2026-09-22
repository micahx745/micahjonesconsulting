"""W4 offline test: the glmcc leg is wired into run_cross_review.py (Harness v2
run D). Static checks only -- no network, no GLM/Claude process launched.
"""

import os
import subprocess
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
CROSS_REVIEW_DIR = os.path.join(REPO, "scripts", "cross-review")
RUNNER = os.path.join(CROSS_REVIEW_DIR, "run_cross_review.py")


def main():
    failures = 0

    sys.path.insert(0, CROSS_REVIEW_DIR)
    import run_cross_review as rc  # noqa: E402

    instr = rc._instruction_for("glmcc")
    ok1 = isinstance(instr, str) and bool(instr.strip())
    if not ok1:
        failures += 1
        print("FAIL W4 check 1: _instruction_for('glmcc') -> {0!r}".format(instr))

    r = subprocess.run([sys.executable, RUNNER, "--help"], capture_output=True,
                        text=True, encoding="utf-8", errors="replace", timeout=30)
    help_text = (r.stdout or "") + (r.stderr or "")
    has_flag = "--glmcc-timeout" in help_text
    ok2 = (r.returncode == 0 and has_flag)
    if not ok2:
        failures += 1
        print("FAIL W4 check 2: exit {0}, --glmcc-timeout in help: {1}".format(
            r.returncode, has_flag))

    if failures == 0:
        print("PASS W4 2/2")
        return 0
    print("FAIL W4 {0} of 2 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
