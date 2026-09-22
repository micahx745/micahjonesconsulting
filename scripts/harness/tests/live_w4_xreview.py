"""W4 live test: one DeepSeek REST call and one GLM(CC) run through
run_cross_review.py --legs deepseek,glmcc. Harness v2 run D.

While GLM is capped (before 2026-09-22 21:44:53 UTC), this file is written but
not run; the main session runs it after the reset.
"""

import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
RUNNER = os.path.join(REPO, "scripts", "cross-review", "run_cross_review.py")

PLAN_TEXT = """Toy plan: add a --version flag to scripts/harness/status.py.
1. Add ap.add_argument("--version", action="store_true") to the argparse setup.
2. If args.version is set, print the harness version string and return 0 before any subcommand runs.
3. Read the version string from a single VERSION constant at the top of the module.
4. Verify: `python scripts/harness/status.py --version` prints one line and exits 0.
5. No other subcommand's behaviour changes.
"""


def main():
    work = tempfile.mkdtemp(prefix="w4-live-")
    plan_path = os.path.join(work, "plan.md")
    with open(plan_path, "w", encoding="utf-8", newline="") as f:
        f.write(PLAN_TEXT)
    out_path = os.path.join(work, "out.md")

    r = subprocess.run(
        [sys.executable, RUNNER, "--mode", "plan", "--input", plan_path,
         "--legs", "deepseek,glmcc", "--out", out_path],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
        timeout=1800)
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode != 0:
        print("FAIL W4-live: exit {0}: {1!r}".format(r.returncode, out[:800]))
        return 1

    report = out
    if os.path.exists(out_path):
        with open(out_path, encoding="utf-8") as f:
            report = f.read()

    sections = report.split("\n----- ")
    legs = {}
    for sec in sections[1:]:
        header, sep, rest = sec.partition(" -----\n")
        if sep:
            legs[header] = rest

    problems = []
    ds_header = next((h for h in legs if h.startswith("DeepSeek(REST") and h.endswith("[OK]")), None)
    if not ds_header:
        problems.append("no 'DeepSeek(REST ...) [OK]' leg in the report")
    elif len(legs[ds_header].encode("utf-8", "replace")) > 8192:
        problems.append("DeepSeek leg body exceeds 8192 bytes")

    if "GLM(CC) [OK]" not in legs:
        problems.append("no 'GLM(CC) [OK]' leg in the report")
    elif len(legs["GLM(CC) [OK]"].encode("utf-8", "replace")) > 8192:
        problems.append("GLM(CC) leg body exceeds 8192 bytes")

    if problems:
        for p in problems:
            print("FAIL W4-live: " + p)
        print(report[:2000])
        return 1

    print("PASS W4-live 2 legs OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
