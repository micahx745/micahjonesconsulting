"""B1.2 live test: tool_use_counts.py against the real ~/.claude/projects transcripts
(default --root/--project), scoped to --days 7 to keep it fast.

Harness v2 run F, written from .claude/briefs/harness-v2-f-counts-diet.md. Checks the script
exits 0, prints all five section headers, and that the MCP SERVERS section -- the one section
this operator's real usage is all but guaranteed to populate -- has at least one row with a
count above 0.
"""

import os
import subprocess
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
TOOL = os.path.join(REPO, "scripts", "harness", "tool_use_counts.py")

HEADERS = (
    "# MCP SERVERS",
    "# SKILLS",
    "# SUBAGENT TYPES",
    "# LONGEST EXEC RUNS",
    "# IMAGES",
)


def section_rows(lines, prefix):
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
    env = dict(os.environ)
    env["PYTHONIOENCODING"] = "utf-8"
    r = subprocess.run(
        [sys.executable, TOOL, "--days", "7"],
        cwd=REPO,
        env=env,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=300,
    )
    out = r.stdout or ""
    lines = out.splitlines()

    if r.returncode != 0:
        print("FAIL B1-live: exit {0} stderr={1!r}".format(r.returncode, (r.stderr or "")[:500]))
        return 1

    missing = [h for h in HEADERS if not any(ln.startswith(h) for ln in lines)]
    if missing:
        print("FAIL B1-live: missing headers {0} (stdout {1} lines)".format(missing, len(lines)))
        return 1

    mcp_rows = section_rows(lines, "# MCP SERVERS") or []
    has_positive = any(len(row) == 2 and row[1].isdigit() and int(row[1]) > 0 for row in mcp_rows)
    if not has_positive:
        print("FAIL B1-live: MCP SERVERS section has no row with a count above 0 ({0} rows)".format(
            len(mcp_rows)))
        return 1

    print("PASS B1-live 5 sections")
    return 0


if __name__ == "__main__":
    sys.exit(main())
