"""E1 test: run the executor guard hook as a subprocess for each case in the brief table.

Harness v2 run A (E1.8). The fake worktree is a fresh mkdtemp; OUT sits under the home
dir on purpose, outside the temp dir and the worktree. Every payload carries cwd = WT.
Case 37 checks that guard.log holds exactly one line per deny case above it: the table
in the brief has 25 deny rows (its inline "(21)" gloss does not count the four platform
denies and the internal-error deny; E1.6 logs every deny), so the expected count is
computed from the table itself, never hardcoded.
"""

import json
import os
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
HOOK = os.path.join(REPO, ".claude", "hooks", "executor-guard.py")

WT = tempfile.mkdtemp(prefix="e1-wt-")
OUT = os.path.join(os.path.expanduser("~"), "harness-guard-test-outside")
STATE = tempfile.mkdtemp(prefix="e1-state-")
BASE_ENV = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}

DRIVE, REST = os.path.splitdrive(OUT)
OUT_POSIX = "/" + DRIVE[0].lower() + REST.replace(os.sep, "/")
HOME = os.path.expanduser("~")

FABLE_CMD = "powershell -File scripts/fable-gate.ps1 -Digest d.json -Question q.md -Out o.md"

# (number, role, scope, tool, tool_input, expect, stdin_override)
# role: "exec" = HARNESS_ROLE=executor + HARNESS_WORKTREE=WT; "none" = no HARNESS_* vars.
CASES = [
    (1, "none", None, "Write", {"file_path": os.path.join(WT, ".claude", "RESUME.md")}, "allow", None),
    (2, "exec", "default", "Write", {"file_path": os.path.join(WT, "app", "page.tsx")}, "allow", None),
    (3, "exec", "default", "Write", {"file_path": os.path.join(OUT, "x.txt")}, "deny outside-worktree", None),
    (4, "exec", "default", "Write", {"file_path": "..\\escape.txt"}, "deny outside-worktree", None),
    (5, "exec", "default", "Write", {"file_path": "src/b.ts"}, "allow", None),
    (6, "exec", "default", "Write", {"file_path": OUT_POSIX + "/y.txt"}, "deny outside-worktree", None),
    (7, "exec", "default", "Write", {"file_path": os.path.join(WT, ".claude", "RESUME.md")}, "deny protected-file", None),
    (8, "exec", "default", "Edit", {"file_path": os.path.join(WT, "docs", "LESSONS_LEARNED.md")}, "deny protected-file", None),
    (9, "exec", "default", "Write", {"file_path": os.path.join(WT, "CLAUDE.md")}, "deny protected-file", None),
    (10, "exec", "default", "Edit", {"file_path": os.path.join(WT, ".claude", "hooks", "x.py")}, "deny claude-dir", None),
    (11, "exec", "harness", "Edit", {"file_path": os.path.join(WT, ".claude", "hooks", "x.py")}, "allow", None),
    (12, "exec", "harness", "Edit", {"file_path": os.path.join(WT, ".claude", "settings.json")}, "allow", None),
    (13, "exec", "harness", "Write", {"file_path": os.path.join(WT, ".claude", "settings.local.json")}, "deny protected-file", None),
    (14, "exec", "harness", "Write", {"file_path": os.path.join(WT, ".claude", "briefs", "harness-v2-a-guard-receipts.md")}, "deny claude-dir", None),
    (15, "exec", "harness", "Edit", {"file_path": os.path.join(WT, ".claude", "briefs", "README.md")}, "allow", None),
    (16, "exec", "default", "Write", {"file_path": os.path.join(WT, ".git", "config")}, "deny dot-git", None),
    (17, "exec", "default", "Read", {"file_path": os.path.join(WT, ".env.local")}, "deny secret-file", None),
    (18, "exec", "default", "Read", {"file_path": os.path.join(WT, ".env.example")}, "allow", None),
    (19, "exec", "default", "Read", {"file_path": os.path.join(HOME, ".claude", ".zai-key")}, "deny secret-file", None),
    (20, "exec", "default", "Read", {"file_path": os.path.join(OUT, "notes.md")}, "deny read-outside", None),
    (21, "exec", "default", "Grep", {"pattern": "x", "path": WT, "glob": "**/.env*"}, "deny secret-file", None),
    (22, "exec", "default", "Bash", {"command": "git commit -m x"}, "deny git-write", None),
    (23, "exec", "default", "Bash", {"command": "git -C . status --short"}, "allow", None),
    (24, "exec", "default", "Bash", {"command": "cat .env.local"}, "deny secret-file", None),
    (25, "exec", "default", "Bash", {"command": "echo $ZAI_CODING_KEY"}, "deny secret-env", None),
    (26, "exec", "default", "Bash", {"command": "echo done > .claude/RESUME.md"}, "deny protected-file", None),
    (27, "exec", "default", "PowerShell", {"command": FABLE_CMD}, "deny fable-spend", None),
    (28, "exec", "default", "PowerShell", {"command": FABLE_CMD + " -DryRun"}, "allow", None),
    (29, "exec", "default", "Agent", {"description": "x", "prompt": "y", "model": "sonnet"}, "deny no-subagents", None),
    (30, "exec", "default", "mcp__supabase__execute_sql", {"query": "select 1"}, "deny no-mcp", None),
    (31, "exec", "default", "WebFetch", {"url": "https://example.com", "prompt": "x"}, "deny no-network", None),
    (32, "exec", "readonly", "Write", {"file_path": os.path.join(WT, "a.txt")}, "deny readonly-scope", None),
    (33, "exec", "readonly", "Bash", {"command": "ls"}, "deny readonly-scope", None),
    (34, "exec", "readonly", "Read", {"file_path": os.path.join(WT, "app", "page.tsx")}, "allow", None),
    (35, "exec", "default", "", {}, "deny internal-error", "not json"),
    (36, "none", None, "", {}, "allow", "not json"),
]


def payload_text(tool, tool_input):
    return json.dumps({
        "session_id": "test-e1",
        "transcript_path": "",
        "cwd": WT,
        "hook_event_name": "PreToolUse",
        "tool_name": tool,
        "tool_input": tool_input,
    })


def env_for(role, scope):
    env = dict(BASE_ENV)
    if role == "exec":
        env["HARNESS_ROLE"] = "executor"
        env["HARNESS_WORKTREE"] = WT
        env["HARNESS_STATE_DIR"] = STATE
        if scope and scope != "default":
            env["HARNESS_EXECUTOR_SCOPE"] = scope
    return env


def run_case(case):
    n, role, scope, tool, tool_input, expect, stdin_raw = case
    env = env_for(role, scope)
    stdin = stdin_raw if stdin_raw is not None else payload_text(tool, tool_input)
    try:
        r = subprocess.run([sys.executable, HOOK], input=stdin, env=env,
                           capture_output=True, text=True, encoding="utf-8",
                           errors="replace", timeout=20)
    except subprocess.TimeoutExpired:
        return n, expect, "timeout", "", False
    out = (r.stdout or "").strip()
    if r.returncode != 0:
        return n, expect, "exit " + str(r.returncode), out[:200], False
    if not out:
        got, reason = "allow", ""
    else:
        try:
            data = json.loads(out)
            block = data["hookSpecificOutput"]
            got = block["permissionDecision"]
            reason = block.get("permissionDecisionReason", "")
        except Exception:
            return n, expect, "unparseable", out[:200], False
    if expect == "allow":
        ok = got == "allow"
    else:
        rule = expect.split(" ", 1)[1]
        ok = got == "deny" and reason.startswith("executor-guard: " + rule + ":")
    return n, expect, got, reason, ok


def main():
    failures = 0
    for case in CASES:
        n, expect, got, reason, ok = run_case(case)
        if not ok:
            failures += 1
            print("FAIL E1 case {0}: expected {1} got {2} [{3}]".format(n, expect, got, reason))
    # Case 37: one guard.log line per deny case above (see module docstring).
    lines = 0
    guard_log = os.path.join(STATE, "guard.log")
    if os.path.exists(guard_log):
        with open(guard_log, encoding="utf-8") as f:
            lines = sum(1 for line in f if line.strip())
    expected_denies = sum(1 for c in CASES if c[5] != "allow")
    if lines != expected_denies:
        failures += 1
        print("FAIL E1 case 37: expected {0} deny lines got {1}".format(expected_denies, lines))
    if failures == 0:
        print("PASS E1 37/37")
        return 0
    print("FAIL E1 {0} of 37 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
