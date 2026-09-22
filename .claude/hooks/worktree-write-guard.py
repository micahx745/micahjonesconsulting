"""PreToolUse hook: refuse a file-tool write that lands in the MAIN checkout from a worktree session.

LESSONS #49 (2026-09-21): writing the end-of-session RESUME, the main session typed the main checkout's
absolute path instead of the worktree's, and the Write tool replaced a tracked file on `main` with the word
"placeholder". This gate makes that write impossible through the file tools.

The rule. The session works in a worktree when the payload's `cwd` OR CLAUDE_PROJECT_DIR sits under
<root>/.claude/worktrees/<name>. In that session, a Write, Edit, MultiEdit or NotebookEdit whose target
resolves under <root> but not under <root>/.claude/worktrees/ is denied, and the message names the
worktree and the same file inside it. Writes inside any worktree, and anywhere outside <root>, pass. A
session that works in the main checkout itself is not touched.

Wired twice (operator popup 2026-09-21: "Main local settings too"):
  - this branch's .claude/settings.json, for chats that start in a worktree;
  - the main checkout's untracked .claude/settings.local.json, because a desktop-app chat can start in
    the main checkout and be moved into the worktree afterwards, and then the branch settings never load.
`--source <name>` tags the message with the settings file that ran it.

It fails open, never shut. The deny is JSON (permissionDecision "deny") on exit 0; unreadable input
passes; a crash exits 1, which Claude Code treats as non-blocking; the settings commands skip a missing
script. A guard that blocks every write is worse than the incident it prevents.

Not covered: Bash and PowerShell redirects (`> file`). The incident was the Write tool; a deliberate
main-checkout write the operator asked for goes through a shell command, with his words in RESUME.

Bite test, both ways: python .claude/hooks/worktree-write-guard.py --self-test
"""

import json
import os
import re
import subprocess
import sys

WRITE_TOOLS = {"Write", "Edit", "MultiEdit", "NotebookEdit"}
MARK = "/.claude/worktrees/"


def norm(path, base=""):
    """Absolute, forward-slash form of a Windows, Git Bash (/c/...), WSL (/mnt/c/...) or relative path."""
    if not path:
        return ""
    p = str(path).strip().replace("\\", "/")
    m = re.match(r"^/mnt/([a-zA-Z])(/.*)?$", p) or re.match(r"^/([a-zA-Z])(/.*)?$", p)
    if m:
        p = m.group(1).upper() + ":" + (m.group(2) or "/")
    if not re.match(r"^[a-zA-Z]:/", p) and not p.startswith("/") and base:
        p = norm(base) + "/" + p
    p = os.path.normpath(p).replace("\\", "/")
    return p.rstrip("/") if len(p) > 3 else p


def within(path, folder):
    p, d = path.lower(), folder.lower().rstrip("/")
    return p == d or p.startswith(d + "/")


def worktree_of(path):
    """(root, worktree) when path sits inside <root>/.claude/worktrees/<name>, else None."""
    i = path.lower().find(MARK)
    if i < 0:
        return None
    name = path[i + len(MARK):].split("/", 1)[0]
    if not name:
        return None
    return path[:i], path[: i + len(MARK)] + name


def decide(payload, env, source=""):
    """The deny reason for a write that must not happen, else None."""
    tool = payload.get("tool_name") or ""
    if tool not in WRITE_TOOLS:
        return None
    tool_input = payload.get("tool_input") or {}
    raw = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
    if not raw:
        return None
    cwd = norm(payload.get("cwd") or os.getcwd())
    project = norm(env.get("CLAUDE_PROJECT_DIR") or "")
    session = worktree_of(cwd) or (worktree_of(project) if project else None)
    if not session:
        return None
    root, tree = session
    target = norm(raw, base=cwd)
    if within(target, root + "/.claude/worktrees") or not within(target, root):
        return None
    same_file = tree + "/" + target[len(root):].lstrip("/")
    tag = " [" + source + "]" if source else ""
    return (
        "worktree-write-guard" + tag + " (LESSONS #49): refused " + tool + " to " + target + ". That path "
        "is in the MAIN checkout (" + root + "), and this session works in the worktree " + tree + ". The "
        "same file in the worktree is " + same_file + ". Copy absolute paths from `pwd` output, never type "
        "them. A main-checkout write the operator asked for goes through a shell command, with his words "
        "quoted in RESUME."
    )


def self_test():
    root = "C:/Users/micah/Code/micahjonesconsulting"
    tree = root + "/.claude/worktrees/p106-live"
    w = lambda path, tool="Write": {"tool_name": tool, "tool_input": {"file_path": path}}
    cases = [
        # (name, payload, cwd, CLAUDE_PROJECT_DIR, expect deny)
        ("the LESSONS #49 write itself", w(root + "/.claude/RESUME.md"), tree, "", True),
        ("the same file in the worktree", w(tree + "/.claude/RESUME.md"), tree, "", False),
        ("relative path from the worktree", w(".claude/RESUME.md"), tree, "", False),
        ("Git Bash /c/ form into main", w("/c/Users/micah/Code/micahjonesconsulting/app/page.tsx"), tree, "", True),
        ("backslashes and other case into main", w("c:\\users\\micah\\code\\MicahJonesConsulting\\next-env.d.ts", "Edit"), tree, "", True),
        ("dot-dot out of the worktree into main", w(tree + "/../../RESUME.md"), tree, "", True),
        ("another worktree", w(root + "/.claude/worktrees/p124-cuts/.planning/x.md"), tree, "", False),
        ("outside the repo", w("C:/Users/micah/AppData/Local/Temp/claude/x.txt"), tree, "", False),
        ("a sibling folder sharing the prefix", w(root + "-other/x.txt"), tree, "", False),
        ("a main-checkout session writing main", w(root + "/.claude/RESUME.md"), root, root, False),
        ("started in main, moved into the worktree", w(root + "/.claude/RESUME.md", "MultiEdit"), tree, root, True),
        ("started in the worktree, cwd moved to main", w(root + "/.claude/RESUME.md"), root, tree, True),
        ("NotebookEdit into main", {"tool_name": "NotebookEdit", "tool_input": {"notebook_path": root + "/n.ipynb"}}, tree, "", True),
        ("a Read is not a write", {"tool_name": "Read", "tool_input": {"file_path": root + "/.claude/RESUME.md"}}, tree, "", False),
        ("no path at all", {"tool_name": "Write", "tool_input": {}}, tree, "", False),
    ]
    failures = 0
    for name, payload, cwd, project, expect in cases:
        payload = dict(payload, cwd=cwd)
        got = decide(payload, {"CLAUDE_PROJECT_DIR": project} if project else {}) is not None
        ok = got == expect
        failures += not ok
        print(("PASS" if ok else "FAIL") + "  " + ("deny " if expect else "allow") + "  " + name)
    # End to end through stdin and stdout, the way Claude Code calls it, with non-ASCII content
    # (a UTF-8 "I-acute" carries byte 0x8D, which cp1252 cannot decode).
    for name, target, expect in [
        ("stdin: the LESSONS #49 write", root + "/.claude/RESUME.md", True),
        ("stdin: the worktree write", tree + "/.claude/RESUME.md", False),
    ]:
        body = json.dumps({"tool_name": "Write", "cwd": tree, "tool_input": {"file_path": target, "content": "\u00cd \u2014 \u2019"}})
        env = {k: v for k, v in os.environ.items() if k != "CLAUDE_PROJECT_DIR"}
        run = subprocess.run([sys.executable, os.path.abspath(__file__), "--source", "self-test"],
                             input=body.encode("utf-8"), capture_output=True, env=env, timeout=30)
        out = run.stdout.decode("utf-8", "replace").strip()
        denied = bool(out) and json.loads(out)["hookSpecificOutput"]["permissionDecision"] == "deny"
        ok = run.returncode == 0 and denied == expect
        failures += not ok
        print(("PASS" if ok else "FAIL") + "  " + ("deny " if expect else "allow") + "  " + name
              + ("" if ok else "  (exit " + str(run.returncode) + ", stdout " + out[:200] + ")"))
    failures += wiring_check()
    print("worktree-write-guard self-test: " + ("PASS" if not failures else str(failures) + " FAILED"))
    return 1 if failures else 0


def wiring_check():
    """Both settings files still run the guard, and the main checkout's also runs the reminder (LESSONS #50).

    The routing reminder was committed on the branch and never loaded in a chat that started in the main
    checkout; a gate that is not wired where the session reads settings cannot bite.
    """
    tree = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    session = worktree_of(norm(tree))
    checks = [(os.path.join(tree, ".claude", "settings.json"), ["PreToolUse:worktree-write-guard.py"], True)]
    if session:
        checks.append((os.path.join(session[0], ".claude", "settings.local.json"),
                       ["PreToolUse:worktree-write-guard.py", "SessionStart:routing-reminder.py"], False))
    failures = 0
    for path, needs, required in checks:
        try:
            hooks = json.load(open(path, encoding="utf-8")).get("hooks") or {}
        except (OSError, ValueError):
            print(("FAIL" if required else "SKIP") + "  wiring  " + path + " unreadable")
            failures += required
            continue
        for need in needs:
            event, script = need.split(":")
            found = any(script in (h.get("command") or "")
                        for group in hooks.get(event) or [] for h in group.get("hooks") or [])
            failures += not found
            print(("PASS" if found else "FAIL") + "  wiring  " + event + " runs " + script + " in " + path)
    return failures


def main(argv):
    if "--self-test" in argv:
        return self_test()
    source = argv[argv.index("--source") + 1] if "--source" in argv[:-1] else ""
    try:
        raw = sys.stdin.buffer.read().decode("utf-8", "replace")
        payload = json.loads(raw) if raw.strip() else {}
    except ValueError:
        return 0
    if not isinstance(payload, dict):
        return 0
    reason = decide(payload, os.environ, source)
    if reason:
        sys.stdout.write(json.dumps({"hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }}))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
