"""PreToolUse hook: deny a dispatch to an executor whose pointed-to brief fails brief_lint.py.

Harness v2 run G (G2), written from .claude/briefs/harness-v2-g-gates.md. Stdlib only; imports
_transcript from its own directory. Inert for an executor session (HARNESS_ROLE=executor) and
on any exception: this is a checkpoint, not a security gate, same as run A/B/C's hooks. Only
looks at an Agent/Task call, or a Bash/PowerShell call whose command names claude-glm.ps1 or
codex-exec.ps1 -- those are the dispatch surfaces (LESSONS #60).
"""

import json
import os
import re
import subprocess
import sys

HOOK_DIR = os.path.dirname(os.path.abspath(__file__))
if HOOK_DIR not in sys.path:
    sys.path.insert(0, HOOK_DIR)
import _transcript as transcript  # noqa: E402

REPO = os.path.dirname(os.path.dirname(HOOK_DIR))
BRIEF_LINT = os.path.join(REPO, "scripts", "harness", "brief_lint.py")

DISPATCH_CMD_RE = re.compile(r"claude-glm\.ps1|codex-exec\.ps1")
POINTER_RE = re.compile(r"\.planning/harness/prompts/[A-Za-z0-9_.-]+\.md")
BRIEF_REF_RE = re.compile(r"\.claude/briefs/[A-Za-z0-9_.-]+\.md")


def _deny(reason):
    out = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }
    print(json.dumps(out))


def _dispatch_text(tool_name, tool_input):
    """The text to scan for brief pointers, or None when this call is not a dispatch."""
    if tool_name in ("Agent", "Task"):
        return str(tool_input.get("prompt") or "")
    if tool_name in ("Bash", "PowerShell"):
        command = str(tool_input.get("command") or "")
        if DISPATCH_CMD_RE.search(command):
            return command
        return None
    return None


def _base_dir(payload):
    cwd = payload.get("cwd")
    if isinstance(cwd, str) and os.path.isdir(cwd):
        return cwd
    return REPO


def _briefs_in(text, base_dir):
    """[full_path, ...]: brief paths referenced by text (directly or via a prompt pointer
    file), first-seen order, deduped, kept only when they exist under base_dir.
    """
    text_norm = text.replace("\\", "/")
    candidates = []

    for ptr in POINTER_RE.findall(text_norm):
        ptr_path = os.path.join(base_dir, ptr)
        if not os.path.isfile(ptr_path):
            continue
        try:
            with open(ptr_path, encoding="utf-8") as f:
                ptr_text = f.read()
        except OSError:
            continue
        candidates.extend(BRIEF_REF_RE.findall(ptr_text.replace("\\", "/")))

    candidates.extend(BRIEF_REF_RE.findall(text_norm))

    seen = set()
    briefs = []
    for ref in candidates:
        if ref in seen:
            continue
        full = os.path.join(base_dir, ref)
        if not os.path.isfile(full):
            continue
        seen.add(ref)
        briefs.append(full)
    return briefs


def main():
    raw = sys.stdin.read()
    if os.environ.get("HARNESS_ROLE", "") == "executor":
        return 0
    try:
        payload = json.loads(raw) if raw.strip() else {}
        if not isinstance(payload, dict):
            return 0

        tool_name = payload.get("tool_name") or ""
        tool_input = payload.get("tool_input") or {}
        if not isinstance(tool_input, dict):
            tool_input = {}

        text = _dispatch_text(tool_name, tool_input)
        if not text:
            return 0

        base_dir = _base_dir(payload)
        briefs = _briefs_in(text, base_dir)
        if not briefs:
            return 0

        r = subprocess.run([sys.executable, BRIEF_LINT] + briefs, cwd=base_dir,
                            capture_output=True, text=True, encoding="utf-8",
                            errors="replace", timeout=20)
        fail_line = None
        for line in (r.stdout or "").splitlines():
            if line.startswith("FAIL"):
                fail_line = line
                break

        if fail_line is None:
            return 0

        objs = transcript.load_tail(payload.get("transcript_path") or "")
        human = transcript.latest_human_text(objs).lower()
        if "lint ok" in human:
            return 0

        _deny(
            "dispatch-lint: {0} (LESSONS #60). Fix the brief and commit it, or say "
            "'lint ok' to dispatch anyway.".format(fail_line)
        )
        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
