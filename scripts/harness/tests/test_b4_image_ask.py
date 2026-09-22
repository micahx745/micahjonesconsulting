"""B4 test: run image-open-ask.py as a subprocess for each case in the brief table.

Harness v2 run C, written from .claude/briefs/harness-v2-c-transcript-hooks.md. Each "N prior"
transcript is one human message "go" followed by N Read-a-png tool calls, each followed by a
tool_result carrying one image block, so image_count() sums to exactly N. Every case gets its
own fresh temp HARNESS_STATE_DIR per the brief's C.5 header.
"""

import os
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

HOOK = os.path.join(REPO, ".claude", "hooks", "image-open-ask.py")
MODEL = "claude-opus-5-5"


def new_state():
    return tempfile.mkdtemp(prefix="b4-state-")


def new_transcript():
    fd, path = tempfile.mkstemp(prefix="b4-tr-", suffix=".jsonl")
    os.close(fd)
    return path


def prior_images(n, human_text="go"):
    objs = [fixtures.human(human_text)]
    for i in range(n):
        tid = "img{0:04d}".format(i)
        objs.append(fixtures.assistant_tool("Read", {"file_path": "shot{0}.png".format(i)}, model=MODEL, tid=tid))
        objs.append(fixtures.tool_result(tid, images=1))
    return objs


def call(transcript_path, tool_name, tool_input, permission_mode="default", env_extra=None):
    payload = {
        "session_id": "test-b4",
        "transcript_path": transcript_path,
        "cwd": REPO,
        "hook_event_name": "PreToolUse",
        "tool_name": tool_name,
        "tool_input": tool_input,
        "permission_mode": permission_mode,
        "tool_use_id": "current0001",
    }
    extra = {"HARNESS_STATE_DIR": new_state()}
    if env_extra:
        extra.update(env_extra)
    return fixtures.run_hook(HOOK, payload, extra)


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL B4 case {0}: {1}".format(n, detail))

    # 1: 7 prior image blocks, current Read x.png, permission_mode default -> ask.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, _ = call(path, "Read", {"file_path": "x.png"}, "default")
    check(1, d == "ask", "decision={0} reason={1!r}".format(d, r))

    # 2: As 1 with permission_mode bypassPermissions -> deny.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, _ = call(path, "Read", {"file_path": "x.png"}, "bypassPermissions")
    check(2, d == "deny", "decision={0} reason={1!r}".format(d, r))

    # 3: 6 prior -> allow.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(6))
    d, r, _ = call(path, "Read", {"file_path": "x.png"}, "default")
    check(3, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 4: 7 prior, current Read x.ts -> allow.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, _ = call(path, "Read", {"file_path": "x.ts"}, "default")
    check(4, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 5: 7 prior, latest human "images ok" -> allow.
    path = new_transcript()
    objs = prior_images(7)
    objs.append(fixtures.human("images ok"))
    fixtures.write_transcript(path, objs)
    d, r, _ = call(path, "Read", {"file_path": "x.png"}, "default")
    check(5, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 6: 7 prior, current mcp__Claude_Browser__computer action screenshot -> ask.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, _ = call(path, "mcp__Claude_Browser__computer", {"action": "screenshot"}, "default")
    check(6, d == "ask", "decision={0} reason={1!r}".format(d, r))

    # 7: 7 prior, current mcp__Claude_Browser__computer action left_click -> allow.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, _ = call(path, "mcp__Claude_Browser__computer", {"action": "left_click"}, "default")
    check(7, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 8: HARNESS_ROLE=executor, as 1 -> allow.
    path = new_transcript()
    fixtures.write_transcript(path, prior_images(7))
    d, r, raw = call(path, "Read", {"file_path": "x.png"}, "default", env_extra={"HARNESS_ROLE": "executor"})
    check(8, d == "allow" and raw == "", "decision={0} raw={1!r}".format(d, raw))

    if failures == 0:
        print("PASS B4 8/8")
        return 0
    print("FAIL B4 {0} of 8 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
