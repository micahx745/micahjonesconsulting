"""UserPromptSubmit hook: tell the reader once per 50K band once a chat is at or over 200K.

Harness v2 run C (C2), written from .claude/briefs/harness-v2-c-transcript-hooks.md. Stdlib
only; imports _transcript from its own directory. Inert for an executor session
(HARNESS_ROLE=executor) and on any exception: this is a checkpoint, not a security gate.
State (the last band warned per session_id) lives in HARNESS_STATE_DIR, default
%LOCALAPPDATA%/harness/micahjonesconsulting, same rule as every other harness state file.
"""

import json
import os
import sys
import tempfile

HOOK_DIR = os.path.dirname(os.path.abspath(__file__))
if HOOK_DIR not in sys.path:
    sys.path.insert(0, HOOK_DIR)
import _transcript as transcript  # noqa: E402

THRESHOLD = 200000
BAND_SIZE = 50000


def state_dir():
    d = os.environ.get("HARNESS_STATE_DIR") or ""
    if d:
        return d
    base = os.environ.get("LOCALAPPDATA") or tempfile.gettempdir()
    return os.path.join(base, "harness", "micahjonesconsulting")


def state_path():
    return os.path.join(state_dir(), "context-warn.json")


def load_state():
    try:
        with open(state_path(), encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def save_state(data):
    d = state_dir()
    os.makedirs(d, exist_ok=True)
    with open(state_path(), "w", encoding="utf-8") as f:
        json.dump(data, f)


def context_tokens(objs):
    u = transcript.last_usage(objs)
    if not isinstance(u, dict):
        return 0
    return (
        int(u.get("input_tokens") or 0)
        + int(u.get("cache_read_input_tokens") or 0)
        + int(u.get("cache_creation_input_tokens") or 0)
    )


def main():
    raw = sys.stdin.read()
    if os.environ.get("HARNESS_ROLE", "") == "executor":
        return 0
    try:
        payload = json.loads(raw) if raw.strip() else {}
        if not isinstance(payload, dict):
            return 0

        objs = transcript.load_tail(payload.get("transcript_path") or "")
        ctx = context_tokens(objs)
        if ctx < THRESHOLD:
            return 0

        band = (ctx // BAND_SIZE) * BAND_SIZE
        session_id = str(payload.get("session_id") or "")
        state = load_state()
        stored = state.get(session_id)
        if isinstance(stored, (int, float)) and band <= stored:
            return 0

        state[session_id] = band
        try:
            save_state(state)
        except OSError:
            pass

        out = {
            "hookSpecificOutput": {
                "hookEventName": "UserPromptSubmit",
                "additionalContext": (
                    "CONTEXT {0}K (at or over 200K, AI_ROUTING rule 9): finish the unit in "
                    "hand, rewrite .claude/RESUME.md, write the kickoff in .planning/handoff/, "
                    "then /clear. Open the next chat inside its worktree, not the main "
                    "checkout.".format(round(ctx / 1000))
                ),
            }
        }
        print(json.dumps(out))
        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
