"""PostToolUse hook: block right after a write that leaves .claude/RESUME.md over 2500 bytes.

Harness v2 run G (G3), written from .claude/briefs/harness-v2-g-gates.md. Stdlib only. Inert
for an executor session (HARNESS_ROLE=executor) and on any exception, same as every other
harness checkpoint hook. PreToolUse cannot know an Edit's resulting size, so this fires right
after the write instead and asks the (main-session) writer to trim before committing
(LESSONS #64: a RESUME was committed over its cap once already).
"""

import json
import os
import sys


def main():
    raw = sys.stdin.read()
    if os.environ.get("HARNESS_ROLE", "") == "executor":
        return 0
    try:
        payload = json.loads(raw) if raw.strip() else {}
        if not isinstance(payload, dict):
            return 0

        tool_input = payload.get("tool_input") or {}
        if not isinstance(tool_input, dict):
            return 0

        file_path = tool_input.get("file_path")
        if not isinstance(file_path, str) or not file_path:
            return 0

        normalized = file_path.replace("\\", "/").lower()
        if not normalized.endswith(".claude/resume.md"):
            return 0

        try:
            size = os.path.getsize(file_path)
        except OSError:
            return 0

        if size > 2500:
            reason = (
                "resume-size: .claude/RESUME.md is {0} bytes (cap 2500, LESSONS #64). "
                "Trim it before you commit."
            ).format(size)
            print(json.dumps({"decision": "block", "reason": reason}))
        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
