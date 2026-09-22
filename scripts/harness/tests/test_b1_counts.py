"""B1.2 offline test: tool_use_counts.py against a synthetic transcript root.

Harness v2 run F, written from .claude/briefs/harness-v2-f-counts-diet.md. Builds a synthetic
root with _fixtures.py: project dir C--Users-micah-Code-micahjonesconsulting holding one
session (3 mcp__github__search, 1 mcp__supabase__list_tables, 2 Skill calls
superpowers:brainstorming, 1 Agent general-purpose, an Opus run of 5 Bash calls, a human
message, 3 Edit calls carrying 2 image blocks total), a subagent file under
<session>/subagents/agent-1.jsonl with 1 mcp__context7__query, and a decoy project dir
C--Users-micah-other with 4 mcp__github__search calls that must NOT count (its name does not
contain the "micahjonesconsulting" project substring used below).

Five checks, one per output section: MCP SERVERS (github 3, supabase 1, context7 1), SKILLS
(superpowers:brainstorming 2), SUBAGENT TYPES (general-purpose 1), LONGEST EXEC RUNS
(5 -- the Bash run; the human message resets it before the 3 Edit calls, so 3 never beats it),
IMAGES (2).
"""

import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
TOOL = os.path.join(REPO, "scripts", "harness", "tool_use_counts.py")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _fixtures as fixtures  # noqa: E402

OPUS = "claude-opus-5-5"
SONNET = "claude-sonnet-5"


def build_root():
    root = tempfile.mkdtemp(prefix="b1-root-")

    main_dir = os.path.join(root, "C--Users-micah-Code-micahjonesconsulting")
    os.makedirs(main_dir, exist_ok=True)
    sid = "b1main01-0000"
    main_path = os.path.join(main_dir, sid + ".jsonl")

    objs = []
    for i in range(3):
        tid = "gh{0:04d}".format(i)
        objs.append(fixtures.assistant_tool("mcp__github__search", {"query": "x"}, model=OPUS, tid=tid))
        objs.append(fixtures.tool_result(tid))
    objs.append(fixtures.assistant_tool("mcp__supabase__list_tables", {}, model=OPUS, tid="sb0001"))
    objs.append(fixtures.tool_result("sb0001"))
    for i in range(2):
        tid = "sk{0:04d}".format(i)
        objs.append(
            fixtures.assistant_tool("Skill", {"skill": "superpowers:brainstorming"}, model=OPUS, tid=tid)
        )
        objs.append(fixtures.tool_result(tid))
    objs.append(
        fixtures.assistant_tool(
            "Agent",
            {"subagent_type": "general-purpose", "description": "x", "prompt": "y"},
            model=OPUS,
            tid="ag0001",
        )
    )
    objs.append(fixtures.tool_result("ag0001"))
    for i in range(5):
        tid = "bx{0:04d}".format(i)
        objs.append(fixtures.assistant_tool("Bash", {"command": "ls"}, model=OPUS, tid=tid))
        objs.append(fixtures.tool_result(tid))
    objs.append(fixtures.human("continue"))
    for i in range(3):
        tid = "ed{0:04d}".format(i)
        objs.append(fixtures.assistant_tool("Edit", {"file_path": "x.ts"}, model=OPUS, tid=tid))
        objs.append(fixtures.tool_result(tid, images=2 if i == 2 else 0))
    fixtures.write_transcript(main_path, objs)

    sub_dir = os.path.join(main_dir, sid, "subagents")
    os.makedirs(sub_dir, exist_ok=True)
    sub_objs = [
        fixtures.assistant_tool("mcp__context7__query", {"q": "x"}, model=SONNET, tid="cx0001"),
        fixtures.tool_result("cx0001"),
    ]
    fixtures.write_transcript(os.path.join(sub_dir, "agent-1.jsonl"), sub_objs)

    decoy_dir = os.path.join(root, "C--Users-micah-other")
    os.makedirs(decoy_dir, exist_ok=True)
    decoy_objs = []
    for i in range(4):
        tid = "dg{0:04d}".format(i)
        decoy_objs.append(fixtures.assistant_tool("mcp__github__search", {"query": "x"}, model=OPUS, tid=tid))
        decoy_objs.append(fixtures.tool_result(tid))
    fixtures.write_transcript(os.path.join(decoy_dir, "decoy0001.jsonl"), decoy_objs)

    return root


def run(root):
    env = dict(os.environ)
    env["PYTHONIOENCODING"] = "utf-8"
    r = subprocess.run(
        [sys.executable, TOOL, "--root", root, "--project", "micahjonesconsulting", "--days", "30"],
        cwd=REPO,
        env=env,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=60,
    )
    return r.returncode, (r.stdout or ""), (r.stderr or "")


def section_rows(lines, prefix):
    """Rows (each split on tab) under the first "# " line starting with prefix, skipping
    that header line and the column-name line beneath it, stopping at the next "# " line.
    None if no such header is present.
    """
    start = None
    for i, ln in enumerate(lines):
        if ln.startswith(prefix):
            start = i
            break
    if start is None:
        return None
    rows = []
    for ln in lines[start + 2:]:
        if ln.startswith("# "):
            break
        if ln.strip():
            rows.append(ln.split("\t"))
    return rows


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL B1 case {0}: {1}".format(n, detail))

    root = build_root()
    code, out, err = run(root)
    lines = out.splitlines()

    if code != 0:
        check(0, False, "exit={0} stderr={1!r} stdout={2!r}".format(code, err[:500], out[:500]))
        print("FAIL B1 0 of 5: script exited {0}".format(code))
        return 1

    # 1: MCP SERVERS -- github 3, supabase 1, context7 1 (decoy's 4 github calls excluded).
    mcp_rows = section_rows(lines, "# MCP SERVERS")
    mcp = {r[0]: int(r[1]) for r in (mcp_rows or []) if len(r) == 2}
    check(
        1,
        mcp.get("github") == 3 and mcp.get("supabase") == 1 and mcp.get("context7") == 1,
        "mcp_rows={0}".format(mcp_rows),
    )

    # 2: SKILLS -- superpowers:brainstorming 2.
    skill_rows = section_rows(lines, "# SKILLS")
    skills = {r[0]: int(r[1]) for r in (skill_rows or []) if len(r) == 2}
    check(2, skills.get("superpowers:brainstorming") == 2, "skill_rows={0}".format(skill_rows))

    # 3: SUBAGENT TYPES -- general-purpose 1.
    sat_rows = section_rows(lines, "# SUBAGENT TYPES")
    sats = {r[0]: int(r[1]) for r in (sat_rows or []) if len(r) == 2}
    check(3, sats.get("general-purpose") == 1, "sat_rows={0}".format(sat_rows))

    # 4: LONGEST EXEC RUNS -- one row, longest_run 5 (the human message resets before the
    # 3 Edit calls, so that later run of 3 never overtakes the Bash run of 5).
    exec_rows = section_rows(lines, "# LONGEST EXEC RUNS")
    exec_ok = bool(exec_rows) and len(exec_rows) == 1 and len(exec_rows[0]) == 3 and int(exec_rows[0][2]) == 5
    check(4, exec_ok, "exec_rows={0}".format(exec_rows))

    # 5: IMAGES -- one row, 2 image blocks.
    img_rows = section_rows(lines, "# IMAGES")
    img_ok = bool(img_rows) and len(img_rows) == 1 and len(img_rows[0]) == 2 and int(img_rows[0][1]) == 2
    check(5, img_ok, "img_rows={0}".format(img_rows))

    if failures == 0:
        print("PASS B1 5/5")
        return 0
    print("FAIL B1 {0} of 5 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
