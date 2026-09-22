"""C4 test: run scripts/fable-gate.ps1 -DryRun as a subprocess for each case in the brief.

Harness v2 run E, written from .claude/briefs/harness-v2-e-visualqa-fablegate.md. Every case
passes -DryRun: the digest and image checks (steps 1-2) and the counter check (step 3) all run
before the dry-run branch (step 5), so a gate that wrongly fell through on a bad digest, a bad
image or an exhausted arc could never reach the live Fable call. Each case gets its own fresh
temp HARNESS_STATE_DIR.
"""

import json
import os
import subprocess
import sys
import tempfile

from PIL import Image

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
PS1 = os.path.join(REPO, "scripts", "fable-gate.ps1")


def new_state():
    return tempfile.mkdtemp(prefix="c4-state-")


def run_gate(args, state_dir):
    cmd = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", PS1] + args
    env = dict(os.environ)
    env["HARNESS_STATE_DIR"] = state_dir
    r = subprocess.run(cmd, cwd=REPO, env=env, capture_output=True, text=True,
                        encoding="utf-8", errors="replace", timeout=120)
    return r.returncode, r.stdout, r.stderr


def make_png(path, w, h, color=(120, 130, 140)):
    Image.new("RGB", (w, h), color).save(path)


def make_valid_digest(path):
    digest = {
        "run": "c4-test",
        "items": [
            {"claim": "c4 fixture claim", "evidence": "$ echo fixture -> ok", "confidence": "high"},
        ],
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(digest, f)


def make_question(path):
    with open(path, "w", encoding="utf-8") as f:
        f.write("Does the hero read clean at 390 and 1440?\nAny WCAG AA violations visible?\n")


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL C4 case {0}: {1}".format(n, detail))

    fixtures = tempfile.mkdtemp(prefix="c4-fixtures-")
    digest_path = os.path.join(fixtures, "digest.json")
    make_valid_digest(digest_path)
    question_path = os.path.join(fixtures, "question.md")
    make_question(question_path)
    a_png = os.path.join(fixtures, "a.png")
    b_png = os.path.join(fixtures, "b.png")
    make_png(a_png, 64, 64, (100, 120, 140))
    make_png(b_png, 64, 64, (140, 120, 100))

    # 1: -DryRun -Images a.png,b.png -> exit 0; output contains "blocks = image,image,text";
    # the preview file exists with content block types image, image, text; no counter file.
    state1 = new_state()
    out1 = os.path.join(fixtures, "out1.md")
    code1, stdout1, stderr1 = run_gate(
        ["-Digest", digest_path, "-Question", question_path, "-Out", out1,
         "-Images", a_png + "," + b_png, "-DryRun"],
        state1)
    preview1 = out1 + ".request-preview.json"
    preview_types = None
    if os.path.isfile(preview1):
        try:
            with open(preview1, encoding="utf-8") as f:
                pdata = json.load(f)
            preview_types = [b.get("type") for b in pdata["message"]["content"]]
        except (OSError, ValueError, KeyError):
            preview_types = None
    counter1 = os.path.join(state1, "fable-gates.json")
    check(1,
          code1 == 0 and "blocks = image,image,text" in stdout1
          and preview_types == ["image", "image", "text"]
          and not os.path.isfile(counter1),
          "exit={0} stdout={1!r} preview_types={2} counter_exists={3} stderr={4!r}".format(
              code1, stdout1.strip(), preview_types, os.path.isfile(counter1), stderr1[:300]))

    # 2: a counter file holding count 3 for arc test-arc, then -DryRun -Arc test-arc -> exit 6;
    # output contains "3 of 3".
    state2 = new_state()
    with open(os.path.join(state2, "fable-gates.json"), "w", encoding="utf-8") as f:
        json.dump({"test-arc": {"count": 3, "calls": []}}, f)
    out2 = os.path.join(fixtures, "out2.md")
    code2, stdout2, stderr2 = run_gate(
        ["-Digest", digest_path, "-Question", question_path, "-Out", out2,
         "-Arc", "test-arc", "-DryRun"],
        state2)
    check(2, code2 == 6 and "3 of 3" in stdout2,
          "exit={0} stdout={1!r} stderr={2!r}".format(code2, stdout2.strip(), stderr2[:300]))

    # 3: as 2 with -OperatorOk "test ok" -> exit 0; output contains "operator OK noted".
    state3 = new_state()
    with open(os.path.join(state3, "fable-gates.json"), "w", encoding="utf-8") as f:
        json.dump({"test-arc": {"count": 3, "calls": []}}, f)
    out3 = os.path.join(fixtures, "out3.md")
    code3, stdout3, stderr3 = run_gate(
        ["-Digest", digest_path, "-Question", question_path, "-Out", out3,
         "-Arc", "test-arc", "-DryRun", "-OperatorOk", "test ok"],
        state3)
    check(3, code3 == 0 and "operator OK noted" in stdout3,
          "exit={0} stdout={1!r} stderr={2!r}".format(code3, stdout3.strip(), stderr3[:300]))

    # 4: a digest padded past 9000 bytes, with -DryRun -> exit 7.
    state4 = new_state()
    big_items = [
        {"claim": "padding claim number {0} to grow this digest past the size budget".format(i),
         "evidence": "$ pad -> line {0} of the padding sequence for size testing".format(i),
         "confidence": "high"}
        for i in range(120)
    ]
    big_digest_path = os.path.join(fixtures, "big_digest.json")
    with open(big_digest_path, "w", encoding="utf-8") as f:
        json.dump({"run": "c4-test-big", "items": big_items}, f)
    assert os.path.getsize(big_digest_path) > 9000, "fixture digest must exceed 9000 bytes"
    out4 = os.path.join(fixtures, "out4.md")
    code4, stdout4, stderr4 = run_gate(
        ["-Digest", big_digest_path, "-Question", question_path, "-Out", out4, "-DryRun"],
        state4)
    check(4, code4 == 7, "exit={0} stdout={1!r} stderr={2!r}".format(code4, stdout4.strip(), stderr4[:300]))

    # 5: an image 3000x100, with -DryRun -> exit 8; output contains "downscale first".
    state5 = new_state()
    big_png = os.path.join(fixtures, "big.png")
    make_png(big_png, 3000, 100, (10, 20, 30))
    out5 = os.path.join(fixtures, "out5.md")
    code5, stdout5, stderr5 = run_gate(
        ["-Digest", digest_path, "-Question", question_path, "-Out", out5,
         "-Images", big_png, "-DryRun"],
        state5)
    check(5, code5 == 8 and "downscale first" in stdout5,
          "exit={0} stdout={1!r} stderr={2!r}".format(code5, stdout5.strip(), stderr5[:300]))

    if failures == 0:
        print("PASS C4 5/5")
        return 0
    print("FAIL C4 {0} of 5 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
