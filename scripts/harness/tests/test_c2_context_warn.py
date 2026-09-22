"""C2 test: run context-size-warn.py as a subprocess for each case in the brief table.

Harness v2 run C, written from .claude/briefs/harness-v2-c-transcript-hooks.md. Cases 1, 2 and 4
all name session "s1" and case 2 is explicitly "again" at a higher token count: that only tests
anything if the state file persists between them, so those three share one HARNESS_STATE_DIR
(the same reading test_b2_governor.py gave its own chained cases: "share one state dir, the way
an operator's session would accumulate status.py calls"). Every other case gets its own fresh
temp HARNESS_STATE_DIR per the brief's C.5 header.
"""

import os
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

HOOK = os.path.join(REPO, ".claude", "hooks", "context-size-warn.py")
MODEL = "claude-opus-5-5"


def new_state():
    return tempfile.mkdtemp(prefix="c2-state-")


def new_transcript():
    fd, path = tempfile.mkstemp(prefix="c2-tr-", suffix=".jsonl")
    os.close(fd)
    return path


def write_usage_transcript(input_tokens, with_usage=True):
    path = new_transcript()
    objs = [fixtures.human("go")]
    if with_usage:
        objs.append(fixtures.assistant_text(
            "done", model=MODEL, usage=fixtures.usage(inp=input_tokens, cr=0, cw=0, out=200)
        ))
    else:
        objs.append(fixtures.assistant_text("done", model=MODEL))
    fixtures.write_transcript(path, objs)
    return path


def call(transcript_path, session_id, state_dir, env_extra=None):
    payload = {
        "session_id": session_id,
        "transcript_path": transcript_path,
        "cwd": REPO,
        "hook_event_name": "UserPromptSubmit",
        "prompt": "continue",
    }
    extra = {"HARNESS_STATE_DIR": state_dir}
    if env_extra:
        extra.update(env_extra)
    return fixtures.run_hook(HOOK, payload, extra)


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL C2 case {0}: {1}".format(n, detail))

    # 1-2-4 share one state dir: session s1 crosses 200K, then stays in the same 50K band
    # (nothing), then crosses into the next band (warns again).
    state_s1 = new_state()

    # 1: last assistant usage totalling 210,000 (session s1) -> CONTEXT 210K.
    path1 = write_usage_transcript(210000)
    d1, r1, _ = call(path1, "s1", state_s1)
    check(1, d1 == "context" and "CONTEXT 210K" in r1, "decision={0} reason={1!r}".format(d1, r1))

    # 2: session s1 again at 212,000 -> nothing (same 200K-250K band as case 1).
    path2 = write_usage_transcript(212000)
    d2, r2, _ = call(path2, "s1", state_s1)
    check(2, d2 == "allow", "decision={0} reason={1!r}".format(d2, r2))

    # 3: session s2 at 150,000 -> nothing (its own fresh state).
    path3 = write_usage_transcript(150000)
    d3, r3, _ = call(path3, "s2", new_state())
    check(3, d3 == "allow", "decision={0} reason={1!r}".format(d3, r3))

    # 4: session s1 at 251,000 -> CONTEXT 251K (new band, same shared state as 1-2).
    path4 = write_usage_transcript(251000)
    d4, r4, _ = call(path4, "s1", state_s1)
    check(4, d4 == "context" and "CONTEXT 251K" in r4, "decision={0} reason={1!r}".format(d4, r4))

    # 5: HARNESS_ROLE=executor at 300,000 (session s3) -> nothing.
    path5 = write_usage_transcript(300000)
    d5, r5, raw5 = call(path5, "s3", new_state(), env_extra={"HARNESS_ROLE": "executor"})
    check(5, d5 == "allow" and raw5 == "", "decision={0} raw={1!r}".format(d5, raw5))

    # 6: a transcript with no usage (session s4) -> nothing.
    path6 = write_usage_transcript(0, with_usage=False)
    d6, r6, _ = call(path6, "s4", new_state())
    check(6, d6 == "allow", "decision={0} reason={1!r}".format(d6, r6))

    if failures == 0:
        print("PASS C2 6/6")
        return 0
    print("FAIL C2 {0} of 6 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
