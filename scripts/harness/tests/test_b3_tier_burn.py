"""B3 test: run tier-burn-deny.py as a subprocess for each case in the brief table.

Harness v2 run C, written from .claude/briefs/harness-v2-c-transcript-hooks.md. "k prior" means
a transcript of one human message "go" followed by k assistant tool calls of the kind named
(each followed by its tool_result); the current call is not in the transcript and carries a
fresh tool_use_id ("current0001") that never collides with a transcript entry. Every case gets
its own fresh temp HARNESS_STATE_DIR (the hook itself keeps no state, but every hook call in
this run gets one per the brief's C.5 header).
"""

import os
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

HOOK = os.path.join(REPO, ".claude", "hooks", "tier-burn-deny.py")

OPUS = "claude-opus-5-5"
FABLE = "claude-fable-5-1"
SONNET = "claude-sonnet-5"
CURRENT_ID = "current0001"


def new_state():
    return tempfile.mkdtemp(prefix="b3-state-")


def new_transcript():
    fd, path = tempfile.mkstemp(prefix="b3-tr-", suffix=".jsonl")
    os.close(fd)
    return path


def bash_pair(tid, model, command="ls"):
    return [
        fixtures.assistant_tool("Bash", {"command": command}, model=model, tid=tid),
        fixtures.tool_result(tid),
    ]


def n_prior(model, n, command="ls", start=0, prefix="p"):
    objs = []
    for i in range(start, start + n):
        objs.extend(bash_pair("{0}{1:04d}".format(prefix, i), model, command))
    return objs


def agent_pair(tid, model, agent_model):
    return [
        fixtures.assistant_tool(
            "Agent", {"description": "x", "prompt": "y", "model": agent_model}, model=model, tid=tid
        ),
        fixtures.tool_result(tid),
    ]


def build(path, objs):
    fixtures.write_transcript(path, objs)
    return path


def call(transcript_path, tool_name, tool_input, env_extra=None, session="test-b3"):
    payload = {
        "session_id": session,
        "transcript_path": transcript_path,
        "cwd": REPO,
        "hook_event_name": "PreToolUse",
        "tool_name": tool_name,
        "tool_input": tool_input,
        "tool_use_id": CURRENT_ID,
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
            print("FAIL B3 case {0}: {1}".format(n, detail))

    # 1: Opus, 38 prior Bash, current Bash -> allow (total 39).
    objs = [fixtures.human("go")] + n_prior(OPUS, 38)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(1, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 2: Opus, 39 prior Bash, current Bash -> deny; reason contains "40 consecutive".
    objs = [fixtures.human("go")] + n_prior(OPUS, 39)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(2, d == "deny" and "40 consecutive" in r, "decision={0} reason={1!r}".format(d, r))

    # 3: As 2, but a human message "continue" after the 20th -> allow.
    objs = [fixtures.human("go")] + n_prior(OPUS, 20) + [fixtures.human("continue")] + n_prior(OPUS, 19, start=20)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(3, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 4: As 2, but an Agent call after the 20th -> allow.
    objs = (
        [fixtures.human("go")]
        + n_prior(OPUS, 20)
        + agent_pair("agent0001", OPUS, "sonnet")
        + n_prior(OPUS, 19, start=20)
    )
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(4, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 5: As 2, but a Bash running claude-glm.ps1 after the 20th -> allow.
    objs = (
        [fixtures.human("go")]
        + n_prior(OPUS, 20)
        + bash_pair(
            "glm0001", OPUS, "powershell -File scripts/claude-glm.ps1 -Batch -PromptFile p.md"
        )
        + n_prior(OPUS, 19, start=20)
    )
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(5, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 6: Model claude-sonnet-5, 60 prior -> allow.
    objs = [fixtures.human("go")] + n_prior(SONNET, 60)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(6, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 7: Model claude-fable-5-1, 11 prior, current Edit -> deny; reason contains "limit 12".
    objs = [fixtures.human("go")] + n_prior(FABLE, 11)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Edit", {"file_path": "src/x.ts"})
    check(7, d == "deny" and "limit 12" in r, "decision={0} reason={1!r}".format(d, r))

    # 8: Model claude-fable-5-1, 10 prior -> allow.
    objs = [fixtures.human("go")] + n_prior(FABLE, 10)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"})
    check(8, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 9: Opus, 50 prior Bash, current Grep -> allow.
    objs = [fixtures.human("go")] + n_prior(OPUS, 50)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Grep", {"pattern": "x", "path": REPO})
    check(9, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 10: Opus, 3 prior Agent calls model fable, current Agent model fable, human "go" -> deny;
    # reason contains "Fable call 4".
    objs = [fixtures.human("go")]
    for i in range(3):
        objs.extend(agent_pair("fable{0:04d}".format(i), OPUS, "fable"))
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Agent", {"description": "x", "prompt": "y", "model": "fable"})
    check(10, d == "deny" and "Fable call 4" in r, "decision={0} reason={1!r}".format(d, r))

    # 11: As 10 with the human message "fable ok" -> allow.
    objs = [fixtures.human("fable ok")]
    for i in range(3):
        objs.extend(agent_pair("fable{0:04d}".format(i), OPUS, "fable"))
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Agent", {"description": "x", "prompt": "y", "model": "fable"})
    check(11, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 12: Opus, 2 prior Fable Agent calls, current Fable Agent -> allow.
    objs = [fixtures.human("go")]
    for i in range(2):
        objs.extend(agent_pair("fable{0:04d}".format(i), OPUS, "fable"))
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Agent", {"description": "x", "prompt": "y", "model": "fable"})
    check(12, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 13: Opus, 3 prior Bash calls running fable-gate.ps1 ... -DryRun, current Fable Agent -> allow.
    objs = [fixtures.human("go")]
    for i in range(3):
        objs.extend(bash_pair(
            "dry{0:04d}".format(i), OPUS,
            "powershell -File scripts/fable-gate.ps1 -Digest d.json -Question q.md -Out o.md -DryRun",
        ))
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Agent", {"description": "x", "prompt": "y", "model": "fable"})
    check(13, d == "allow", "decision={0} reason={1!r}".format(d, r))

    # 14: HARNESS_ROLE=executor, as 2 -> allow.
    objs = [fixtures.human("go")] + n_prior(OPUS, 39)
    path = build(new_transcript(), objs)
    d, r, raw = call(path, "Bash", {"command": "ls"}, env_extra={"HARNESS_ROLE": "executor"})
    check(14, d == "allow" and raw == "", "decision={0} raw={1!r}".format(d, raw))

    # 15: HARNESS_TIER_BURN_OPUS=15, Opus, 14 prior Bash, current Bash -> deny; reason contains
    # "limit 15".
    objs = [fixtures.human("go")] + n_prior(OPUS, 14)
    path = build(new_transcript(), objs)
    d, r, _ = call(path, "Bash", {"command": "ls"}, env_extra={"HARNESS_TIER_BURN_OPUS": "15"})
    check(15, d == "deny" and "limit 15" in r, "decision={0} reason={1!r}".format(d, r))

    if failures == 0:
        print("PASS B3 15/15")
        return 0
    print("FAIL B3 {0} of 15 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
