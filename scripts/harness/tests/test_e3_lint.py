"""E3.5: exercise brief_lint.py, digest_check.py and diff_scope.py in one file (E3.1-E3.3).

Harness v2 run B. Fixtures are written to a fresh temp dir by this test itself: a minimal
valid Brief-Format: v2 brief, then two broken variants (no Pre-flight, no Expected line), then
a non-v2 file. Checks 6-8 exercise digest_check.py with small fixture JSON files. Check 9
builds a throwaway git repo and proves diff_scope.py is cwd-relative, not tied to this real
repo's path (see diff_scope.py's own module docstring).
"""

import glob
import json
import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
BRIEF_LINT = os.path.join(REPO, "scripts", "harness", "brief_lint.py")
DIGEST_CHECK = os.path.join(REPO, "scripts", "harness", "digest_check.py")
DIFF_SCOPE = os.path.join(REPO, "scripts", "harness", "diff_scope.py")

TMP = tempfile.mkdtemp(prefix="e3-lint-")

VALID_BRIEF = """# Minimal test brief

Brief-Format: v2

## Ruling
One paragraph, one reason.

## Files
This run may create or modify only these:
- `a.txt` (new)

## Pre-flight
- `echo hi` -> `hi`

## Steps
Do the one thing.

## Verification
```
echo hi
```
Expected: `hi`

## Rejected
Nothing considered and killed.

## Digest
Write digest.json.

## Return conditions
None.
"""

NO_PREFLIGHT_BRIEF = """# Minimal test brief, no pre-flight

Brief-Format: v2

## Ruling
One paragraph, one reason.

## Files
This run may create or modify only these:
- `a.txt` (new)

## Steps
Do the one thing.

## Verification
```
echo hi
```
Expected: `hi`

## Rejected
Nothing considered and killed.

## Digest
Write digest.json.

## Return conditions
None.
"""

NO_EXPECTED_BRIEF = """# Minimal test brief, no Expected line

Brief-Format: v2

## Ruling
One paragraph, one reason.

## Files
This run may create or modify only these:
- `a.txt` (new)

## Pre-flight
- `echo hi` -> `hi`

## Steps
Do the one thing.

## Verification
```
echo hi
```
It prints hi.

## Rejected
Nothing considered and killed.

## Digest
Write digest.json.

## Return conditions
None.
"""

NOT_V2_BRIEF = """# An old-style brief

No format marker here, just prose about what to do.
"""


def write(name, text):
    path = os.path.join(TMP, name)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return path


def run_py(script, args, cwd=None):
    return subprocess.run([sys.executable, script] + list(args), cwd=cwd,
                           capture_output=True, text=True, encoding="utf-8",
                           errors="replace", timeout=60)


def last_line(text):
    lines = [ln for ln in (text or "").splitlines() if ln.strip()]
    return lines[-1] if lines else ""


def main():
    failures = 0

    # 1: a minimal valid v2 brief -> PASS.
    valid_path = write("valid.md", VALID_BRIEF)
    r1 = run_py(BRIEF_LINT, [valid_path])
    ok1 = r1.returncode == 0 and last_line(r1.stdout).startswith("PASS " + valid_path)
    if not ok1:
        failures += 1
        print("FAIL E3 case 1: brief_lint on a valid brief -> exit {0} out {1!r}".format(
            r1.returncode, r1.stdout))

    # 2: the same without Pre-flight -> FAIL, reason contains "pre-flight".
    no_pf_path = write("no_preflight.md", NO_PREFLIGHT_BRIEF)
    r2 = run_py(BRIEF_LINT, [no_pf_path])
    ok2 = r2.returncode == 1 and "pre-flight" in r2.stdout
    if not ok2:
        failures += 1
        print("FAIL E3 case 2: brief_lint missing pre-flight -> exit {0} out {1!r}".format(
            r2.returncode, r2.stdout))

    # 3: the same without an Expected line -> FAIL, reason contains "Expected".
    no_exp_path = write("no_expected.md", NO_EXPECTED_BRIEF)
    r3 = run_py(BRIEF_LINT, [no_exp_path])
    ok3 = r3.returncode == 1 and "Expected" in r3.stdout
    if not ok3:
        failures += 1
        print("FAIL E3 case 3: brief_lint missing Expected -> exit {0} out {1!r}".format(
            r3.returncode, r3.stdout))

    # 4: a brief without the marker line -> SKIP.
    not_v2_path = write("not_v2.md", NOT_V2_BRIEF)
    r4 = run_py(BRIEF_LINT, [not_v2_path])
    ok4 = last_line(r4.stdout).startswith("SKIP " + not_v2_path)
    if not ok4:
        failures += 1
        print("FAIL E3 case 4: brief_lint on a non-v2 file -> exit {0} out {1!r}".format(
            r4.returncode, r4.stdout))

    # 5: brief_lint.py over every real harness-v2-*.md brief -> every line PASS, exit 0.
    real_briefs = sorted(glob.glob(os.path.join(REPO, ".claude", "briefs", "harness-v2-*.md")))
    r5 = run_py(BRIEF_LINT, real_briefs)
    out_lines = [ln for ln in r5.stdout.splitlines() if ln.strip()]
    ok5 = (r5.returncode == 0 and len(out_lines) == len(real_briefs) and len(real_briefs) > 0
           and all(ln.startswith("PASS ") for ln in out_lines))
    if not ok5:
        failures += 1
        print("FAIL E3 case 5: brief_lint over real briefs -> exit {0} out {1!r}".format(
            r5.returncode, r5.stdout))

    # 6: a digest with two good items -> PASS.
    good_digest = {
        "run": "e3-fixture",
        "items": [
            {"claim": "a", "evidence": "$ echo hi -> hi", "confidence": "high"},
            {"claim": "b", "evidence": "scripts/harness/brief_lint.py:1", "confidence": "med"},
        ],
    }
    good_path = os.path.join(TMP, "good_digest.json")
    with open(good_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(good_digest, f)
    r6 = run_py(DIGEST_CHECK, [good_path])
    ok6 = r6.returncode == 0 and last_line(r6.stdout).startswith("PASS " + good_path)
    if not ok6:
        failures += 1
        print("FAIL E3 case 6: digest_check on a good digest -> exit {0} out {1!r}".format(
            r6.returncode, r6.stdout))

    # 7: a digest padded past 9000 bytes -> FAIL, reason contains "8192".
    big_digest = {
        "run": "e3-fixture",
        "pad": "x" * 9000,
        "items": [{"claim": "a", "evidence": "$ echo hi -> hi", "confidence": "high"}],
    }
    big_path = os.path.join(TMP, "big_digest.json")
    with open(big_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(big_digest, f)
    r7 = run_py(DIGEST_CHECK, [big_path])
    ok7 = r7.returncode == 1 and "8192" in r7.stdout
    if not ok7:
        failures += 1
        print("FAIL E3 case 7: digest_check oversized -> exit {0} out {1!r}".format(
            r7.returncode, r7.stdout))

    # 8: a digest item with evidence "trust me" -> FAIL, reason contains "evidence".
    bad_evidence_digest = {
        "run": "e3-fixture",
        "items": [{"claim": "a", "evidence": "trust me", "confidence": "high"}],
    }
    bad_ev_path = os.path.join(TMP, "bad_evidence_digest.json")
    with open(bad_ev_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(bad_evidence_digest, f)
    r8 = run_py(DIGEST_CHECK, [bad_ev_path])
    ok8 = r8.returncode == 1 and "evidence" in r8.stdout
    if not ok8:
        failures += 1
        print("FAIL E3 case 8: digest_check bad evidence -> exit {0} out {1!r}".format(
            r8.returncode, r8.stdout))

    # 9: diff_scope.py in a throwaway git repo.
    repo9 = tempfile.mkdtemp(prefix="e3-diffscope-")
    git_env = ["-c", "user.email=test@example.com", "-c", "user.name=test"]

    def git(args):
        return subprocess.run(["git"] + git_env + args, cwd=repo9, capture_output=True,
                               text=True, encoding="utf-8", errors="replace", timeout=30)

    init = git(["init"])
    with open(os.path.join(repo9, "a.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write("one\n")
    brief9_text = "# Test brief\n\n## Files\n- `a.txt`\n"
    with open(os.path.join(repo9, "brief.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write(brief9_text)
    # brief.md is committed too, so it never shows up as a changed path itself: only
    # a.txt's later edit (case 9a) and b.txt's later addition (case 9b) should count.
    git(["add", "a.txt", "brief.md"])
    commit = git(["commit", "-m", "init"])

    ok9 = init.returncode == 0 and commit.returncode == 0

    # 9a: modify the listed file -> PASS.
    with open(os.path.join(repo9, "a.txt"), "a", encoding="utf-8", newline="\n") as f:
        f.write("two\n")
    r9a = run_py(DIFF_SCOPE, ["brief.md"], cwd=repo9)
    ok9a = r9a.returncode == 0 and last_line(r9a.stdout).startswith("PASS diff scope:")
    ok9 = ok9 and ok9a
    if not ok9a:
        print("FAIL E3 case 9a: diff_scope after listed change -> exit {0} out {1!r}".format(
            r9a.returncode, r9a.stdout))

    # 9b: add an unlisted file -> FAIL, line contains b.txt.
    with open(os.path.join(repo9, "b.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write("new\n")
    r9b = run_py(DIFF_SCOPE, ["brief.md"], cwd=repo9)
    ok9b = r9b.returncode == 1 and "b.txt" in r9b.stdout
    ok9 = ok9 and ok9b
    if not ok9b:
        print("FAIL E3 case 9b: diff_scope after unlisted add -> exit {0} out {1!r}".format(
            r9b.returncode, r9b.stdout))

    if not ok9:
        failures += 1
        print("FAIL E3 case 9: diff_scope temp-repo check failed")

    if failures == 0:
        print("PASS E3 9/9")
        return 0
    print("FAIL E3 {0} of 9 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
