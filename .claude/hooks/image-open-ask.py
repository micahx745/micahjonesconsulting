"""PreToolUse hook: ask (deny in bypass mode) before the 8th raw image in a chat.

Harness v2 run C (B4), written from .claude/briefs/harness-v2-c-transcript-hooks.md. Stdlib
only; imports _transcript from its own directory. Inert for an executor session
(HARNESS_ROLE=executor) and on any exception: this is a checkpoint, not a security gate.
"""

import json
import os
import sys

HOOK_DIR = os.path.dirname(os.path.abspath(__file__))
if HOOK_DIR not in sys.path:
    sys.path.insert(0, HOOK_DIR)
import _transcript as transcript  # noqa: E402

IMAGE_EXTS = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp")
IMAGE_BUDGET = 7


def is_image_call(tool_name, tool_input):
    tool_name = tool_name or ""
    tool_input = tool_input if isinstance(tool_input, dict) else {}
    if tool_name == "Read":
        path = str(tool_input.get("file_path") or "").lower()
        return path.endswith(IMAGE_EXTS)
    if tool_name.startswith("mcp__"):
        low = tool_name.lower()
        if "screenshot" in low:
            return True
        if low.endswith("__computer"):
            return tool_input.get("action") in ("screenshot", "zoom")
    return False


def _respond(decision, reason):
    out = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": decision,
            "permissionDecisionReason": reason,
        }
    }
    print(json.dumps(out))


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
        if not is_image_call(tool_name, tool_input):
            return 0

        objs = transcript.load_tail(payload.get("transcript_path") or "")
        prior = sum(transcript.image_count(o) for o in objs)
        if prior < IMAGE_BUDGET:
            return 0

        human = transcript.latest_human_text(objs).lower()
        if "images ok" in human:
            return 0

        reason = (
            "image-guard: this would be image {0} in this chat (7 raw images is the budget, "
            "AI_ROUTING rule 10). Build one downscaled contact sheet instead (python "
            "scripts/harness/visual_qa.py --sheet <dir> --out <dir>), or say "
            "'images ok'.".format(prior + 1)
        )
        decision = "deny" if payload.get("permission_mode") == "bypassPermissions" else "ask"
        _respond(decision, reason)
        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
