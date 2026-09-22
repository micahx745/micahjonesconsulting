"""G test: brief_lint.py's new count check (G1), dispatch-lint.py (G2) and resume-size.py (G3).

Harness v2 run G, written from .claude/briefs/harness-v2-g-gates.md. Checks 1-4 run
brief_lint.py as a plain subprocess against a "counted brief" fixture (the minimal valid v2
brief of test_e3_lint.py's first check, with a stated-count line, a numbered list and a
`Last line` PASS marker added to its Steps section). Checks 5-9 run dispatch-lint.py (a
PreToolUse hook) through _fixtures.run_hook. Check 10 runs resume-size.py (a PostToolUse hook)
as a plain subprocess whose stdout is parsed as JSON directly, since run_hook only recognizes
the hookSpecificOutput shape PreToolUse/SessionStart/UserPromptSubmit hooks use, not the flat
{"decision": "block", ...} shape a PostToolUse hook prints. Every hook call gets its own fresh
temp HARNESS_STATE_DIR, even where the hook under test never reads it, per the common brief's
state-directory rule.
"""

import json
import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

BRIEF_LINT = os.path.join(REPO, "scripts", "harness", "brief_lint.py")
DISPATCH_HOOK = os.path.join(REPO, ".claude", "hooks", "dispatch-lint.py")
RESUME_HOOK = os.path.join(REPO, ".claude", "hooks", "resume-size.py")

COUNTED_BRIEF_TEMPLATE = """# Minimal test brief

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

{count_line}
{items}
{last_line}

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


def counted_brief(word="fifteen", last_a=15, last_b=15, quote_word=False):
    count_line = "A test, `{0} checks`:".format(word) if quote_word else "A test, {0} checks:".format(word)
    items = "\n".join("{0}. x".format(k) for k in range(1, 16))
    last_line = "Last line `PASS T {0}/{1}`.".format(last_a, last_b)
    return COUNTED_BRIEF_TEMPLATE.format(count_line=count_line, items=items, last_line=last_line)


def new_state():
    return tempfile.mkdtemp(prefix="g-state-")


def last_line_of(text):
    lines = [ln for ln in (text or "").splitlines() if ln.strip()]
    return lines[-1] if lines else ""


TMPB = tempfile.mkdtemp(prefix="g-brief-")


def write_brief(name, text):
    path = os.path.join(TMPB, name)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return path


def run_lint(path):
    return subprocess.run([sys.executable, BRIEF_LINT, path], capture_output=True,
                           text=True, encoding="utf-8", errors="replace", timeout=30)


def make_dispatch_base(brief_text):
    """A fresh temp dir holding .planning/harness/prompts/run-t.md (a pointer to
    .claude/briefs/t.md) and .claude/briefs/t.md itself (brief_text).
    """
    base = tempfile.mkdtemp(prefix="g-dispatch-")
    prompts_dir = os.path.join(base, ".planning", "harness", "prompts")
    briefs_dir = os.path.join(base, ".claude", "briefs")
    os.makedirs(prompts_dir)
    os.makedirs(briefs_dir)
    with open(os.path.join(prompts_dir, "run-t.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write("Read .claude/briefs/t.md.\n")
    with open(os.path.join(briefs_dir, "t.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write(brief_text)
    return base


def dispatch_transcript(human_text):
    fd, path = tempfile.mkstemp(prefix="g-tr-", suffix=".jsonl")
    os.close(fd)
    fixtures.write_transcript(path, [fixtures.human(human_text)])
    return path


def call_dispatch(base_dir, tool_name, tool_input, human_text="go", env_extra=None):
    transcript_path = dispatch_transcript(human_text)
    payload = {
        "hook_event_name": "PreToolUse",
        "session_id": "test-g",
        "transcript_path": transcript_path,
        "cwd": base_dir,
        "tool_name": tool_name,
        "tool_input": tool_input,
        "tool_use_id": "current0001",
    }
    extra = {"HARNESS_STATE_DIR": new_state()}
    if env_extra:
        extra.update(env_extra)
    return fixtures.run_hook(DISPATCH_HOOK, payload, extra)


DISPATCH_PROMPT = "Read .planning/harness/prompts/run-t.md and do exactly what it says."


def agent_input():
    return {"description": "x", "prompt": DISPATCH_PROMPT, "model": "sonnet"}


def make_file(path, size):
    d = os.path.dirname(path)
    if d and not os.path.isdir(d):
        os.makedirs(d)
    with open(path, "wb") as f:
        f.write(b"x" * size)


def run_post_hook(hook_path, payload, env_extra=None):
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    if env_extra:
        env.update(env_extra)
    r = subprocess.run([sys.executable, hook_path], input=json.dumps(payload), env=env,
                        capture_output=True, text=True, encoding="utf-8",
                        errors="replace", timeout=30)
    out = (r.stdout or "").strip()
    if not out:
        return None, r.stdout
    try:
        return json.loads(out), r.stdout
    except ValueError:
        return None, r.stdout


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL G case {0}: {1}".format(n, detail))

    # 1: brief_lint.py on a counted brief -> PASS.
    p1 = write_brief("counted1.md", counted_brief())
    r1 = run_lint(p1)
    ok1 = r1.returncode == 0 and last_line_of(r1.stdout).startswith("PASS " + p1)
    check(1, ok1, "exit={0} out={1!r}".format(r1.returncode, r1.stdout))

    # 2: the same with "fourteen" in place of "fifteen" -> FAIL, reason contains
    # "says 14, lists 15, expects 15/15".
    p2 = write_brief("counted2.md", counted_brief(word="fourteen"))
    r2 = run_lint(p2)
    ok2 = r2.returncode == 1 and "says 14, lists 15, expects 15/15" in r2.stdout
    check(2, ok2, "exit={0} out={1!r}".format(r2.returncode, r2.stdout))

    # 3: a counted brief whose last line is "Last line `PASS T 14/14`." -> FAIL, reason
    # contains "count mismatch".
    p3 = write_brief("counted3.md", counted_brief(last_a=14, last_b=14))
    r3 = run_lint(p3)
    ok3 = r3.returncode == 1 and "count mismatch" in r3.stdout
    check(3, ok3, "exit={0} out={1!r}".format(r3.returncode, r3.stdout))

    # 4: a counted brief whose stated line quotes the count in backticks -> PASS.
    p4 = write_brief("counted4.md", counted_brief(word="fourteen", quote_word=True))
    r4 = run_lint(p4)
    ok4 = r4.returncode == 0 and last_line_of(r4.stdout).startswith("PASS " + p4)
    check(4, ok4, "exit={0} out={1!r}".format(r4.returncode, r4.stdout))

    # 5: dispatch-lint over the brief of check 2 (FAIL), human text "go" -> deny; reason
    # contains "dispatch-lint" and "count mismatch".
    base5 = make_dispatch_base(counted_brief(word="fourteen"))
    d5, r5, _ = call_dispatch(base5, "Agent", agent_input(), human_text="go")
    ok5 = d5 == "deny" and "dispatch-lint" in r5 and "count mismatch" in r5
    check(5, ok5, "decision={0} reason={1!r}".format(d5, r5))

    # 6: as 5 with the brief of check 1 (PASS) -> allow.
    base6 = make_dispatch_base(counted_brief())
    d6, r6, _ = call_dispatch(base6, "Agent", agent_input(), human_text="go")
    ok6 = d6 == "allow"
    check(6, ok6, "decision={0} reason={1!r}".format(d6, r6))

    # 7: as 5 with the human text "lint ok" -> allow.
    base7 = make_dispatch_base(counted_brief(word="fourteen"))
    d7, r7, _ = call_dispatch(base7, "Agent", agent_input(), human_text="lint ok")
    ok7 = d7 == "allow"
    check(7, ok7, "decision={0} reason={1!r}".format(d7, r7))

    # 8: as 5 but tool Bash with a command that only reads the pointer file -> allow
    # (not a dispatch: the command names neither claude-glm.ps1 nor codex-exec.ps1).
    base8 = make_dispatch_base(counted_brief(word="fourteen"))
    d8, r8, _ = call_dispatch(
        base8, "Bash", {"command": "cat .planning/harness/prompts/run-t.md"}, human_text="go"
    )
    ok8 = d8 == "allow"
    check(8, ok8, "decision={0} reason={1!r}".format(d8, r8))

    # 9: HARNESS_ROLE=executor, as 5 -> allow.
    base9 = make_dispatch_base(counted_brief(word="fourteen"))
    d9, r9, _ = call_dispatch(
        base9, "Agent", agent_input(), human_text="go", env_extra={"HARNESS_ROLE": "executor"}
    )
    ok9 = d9 == "allow"
    check(9, ok9, "decision={0} reason={1!r}".format(d9, r9))

    # 10: resume-size, three halves on one temp dir's .claude/RESUME.md (and a notes.md).
    tmp10 = tempfile.mkdtemp(prefix="g-resume-")
    resume_path = os.path.join(tmp10, ".claude", "RESUME.md")
    edit_payload = {
        "hook_event_name": "PostToolUse",
        "tool_name": "Edit",
        "tool_input": {"file_path": resume_path},
        "cwd": tmp10,
    }

    make_file(resume_path, 2501)
    out10a, raw10a = run_post_hook(RESUME_HOOK, edit_payload, {"HARNESS_STATE_DIR": new_state()})
    ok10a = (isinstance(out10a, dict) and out10a.get("decision") == "block"
             and "2501 bytes" in str(out10a.get("reason", "")))

    make_file(resume_path, 2500)
    out10b, raw10b = run_post_hook(RESUME_HOOK, edit_payload, {"HARNESS_STATE_DIR": new_state()})
    ok10b = out10b is None

    notes_path = os.path.join(tmp10, "notes.md")
    make_file(notes_path, 3000)
    notes_payload = {
        "hook_event_name": "PostToolUse",
        "tool_name": "Edit",
        "tool_input": {"file_path": notes_path},
        "cwd": tmp10,
    }
    out10c, raw10c = run_post_hook(RESUME_HOOK, notes_payload, {"HARNESS_STATE_DIR": new_state()})
    ok10c = out10c is None

    check(10, ok10a and ok10b and ok10c,
          "a={0!r} raw_a={1!r} b={2!r} raw_b={3!r} c={4!r} raw_c={5!r}".format(
              out10a, raw10a, out10b, raw10b, out10c, raw10c))

    if failures == 0:
        print("PASS G 10/10")
        return 0
    print("FAIL G {0} of 10 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
