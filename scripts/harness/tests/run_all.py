"""Harness v2 test runner (run A, E2.6): run every offline test file, and the live ones
only with --live. Each file runs as `python <file>` from the repo root with
PYTHONIOENCODING=utf-8 and a 600 s cap; this script prints each file's last non-empty
stdout line. Exit 0 only when every file exits 0.
"""

import glob
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))


def main():
    live = "--live" in sys.argv[1:]
    files = sorted(glob.glob(os.path.join(HERE, "test_*.py")))
    if live:
        files += sorted(glob.glob(os.path.join(HERE, "live_*.py")))
    env = dict(os.environ)
    env["PYTHONIOENCODING"] = "utf-8"
    failed = 0
    for path in files:
        rel = os.path.relpath(path, REPO).replace(os.sep, "/")
        try:
            r = subprocess.run([sys.executable, path], cwd=REPO, env=env,
                               capture_output=True, text=True, encoding="utf-8",
                               errors="replace", timeout=600)
        except subprocess.TimeoutExpired:
            failed += 1
            print("FAIL {0}: timeout after 600 s".format(rel))
            continue
        lines = [ln for ln in (r.stdout or "").splitlines() if ln.strip()]
        line = lines[-1] if lines else "<no output>"
        if r.returncode != 0 and not line.startswith("FAIL"):
            print("FAIL {0}: exit {1}: {2}".format(rel, r.returncode, line))
        else:
            print(line)
        if r.returncode != 0:
            failed += 1
    total = len(files)
    if failed == 0:
        print("ALL PASS ({0} files)".format(total))
        return 0
    print("FAILURES: {0} of {1}".format(failed, total))
    return 1


if __name__ == "__main__":
    sys.exit(main())
