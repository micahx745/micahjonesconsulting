"""C3 test: the three verification checks from the brief, run as subprocesses.

Harness v2 run E, written from .claude/briefs/harness-v2-e-visualqa-fablegate.md. Exercises
visual_qa.py's own --selftest (6 fixture checks), visual-qa.mjs's --selftest (no browser, no
network: just the planned frame names and a playwright found/missing line), and a real
--sheet-only run against the pass-106 QA captures already tracked in the repo.
"""

import math
import os
import subprocess
import sys
import tempfile

from PIL import Image

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
VISUAL_QA_PY = os.path.join(REPO, "scripts", "harness", "visual_qa.py")
VISUAL_QA_MJS = os.path.join(REPO, "scripts", "harness", "visual-qa.mjs")
PASS_106 = os.path.join(REPO, ".planning", "qa", "pass-106")

LONG_EDGE_MAX = 2576
TOKENS_MAX = 4784


def run(cmd, env_extra=None):
    env = dict(os.environ)
    env["PYTHONIOENCODING"] = "utf-8"
    if env_extra:
        env.update(env_extra)
    r = subprocess.run(cmd, cwd=REPO, env=env, capture_output=True, text=True,
                        encoding="utf-8", errors="replace", timeout=120)
    return r.returncode, r.stdout, r.stderr


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL C3 case {0}: {1}".format(n, detail))

    # 1: visual_qa.py --selftest -> last line SELFTEST PASS (6 checks).
    code1, out1, err1 = run([sys.executable, VISUAL_QA_PY, "--selftest"])
    lines1 = [ln for ln in out1.splitlines() if ln.strip()]
    last1 = lines1[-1] if lines1 else ""
    check(1, code1 == 0 and last1 == "SELFTEST PASS (6 checks)",
          "exit={0} last_line={1!r} stderr={2!r}".format(code1, last1, err1[:300]))

    # 2: visual-qa.mjs --selftest -> exit 0; 8 "frame: " lines; one "playwright: " line.
    code2, out2, err2 = run(["node", VISUAL_QA_MJS, "--selftest"])
    lines2 = [ln for ln in out2.splitlines() if ln.strip()]
    frame_lines = [ln for ln in lines2 if ln.startswith("frame: ")]
    pw_lines = [ln for ln in lines2 if ln.startswith("playwright: ")]
    check(2, code2 == 0 and len(frame_lines) == 8 and len(pw_lines) == 1,
          "exit={0} frame_lines={1} pw_lines={2} stderr={3!r}".format(
              code2, len(frame_lines), len(pw_lines), err2[:300]))

    # 3: visual_qa.py --sheet .planning/qa/pass-106 --out <temp> -> exit 0; sheet.png exists;
    # long edge <= 2576px; ceil(w/28)*ceil(h/28) <= 4784.
    out_dir = tempfile.mkdtemp(prefix="c3-sheet-")
    code3, out3, err3 = run([sys.executable, VISUAL_QA_PY, "--sheet", PASS_106, "--out", out_dir])
    sheet_path = os.path.join(out_dir, "sheet.png")
    sheet_exists = os.path.isfile(sheet_path)
    long_edge_ok = tokens_ok = False
    dims = (0, 0)
    if sheet_exists:
        with Image.open(sheet_path) as im:
            dims = im.size
        w, h = dims
        long_edge_ok = max(w, h) <= LONG_EDGE_MAX
        tokens_ok = (math.ceil(w / 28) * math.ceil(h / 28)) <= TOKENS_MAX
    check(3, code3 == 0 and sheet_exists and long_edge_ok and tokens_ok,
          "exit={0} sheet_exists={1} dims={2} long_edge_ok={3} tokens_ok={4} stderr={5!r}".format(
              code3, sheet_exists, dims, long_edge_ok, tokens_ok, err3[:300]))

    if failures == 0:
        print("PASS C3 3/3")
        return 0
    print("FAIL C3 {0} of 3 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
