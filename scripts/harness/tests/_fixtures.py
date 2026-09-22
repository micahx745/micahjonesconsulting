"""Transcript-shaped fixture builders shared by the B2, B3, B4 and C2 tests.

Harness v2 run B (B2.6), written from .claude/briefs/harness-v2-b-lint-routing-governor.md.
Each builder returns one dict in the real transcript shape: Claude Code writes one JSON line
per content block, so an assistant turn with several tool calls becomes several dicts in a row,
not one dict with several tool_use blocks. write_transcript keeps that: one json.dumps() per
line.
"""

import json
import os
import subprocess
import sys

_tool_id_counter = [0]


def _next_tool_id():
    _tool_id_counter[0] += 1
    return "toolu_{0:06d}".format(_tool_id_counter[0])


def human(text):
    return {
        "type": "user",
        "isMeta": False,
        "isSidechain": False,
        "message": {"role": "user", "content": text},
    }


def usage(inp=0, cr=0, cw=0, out=0):
    return {
        "input_tokens": inp,
        "cache_read_input_tokens": cr,
        "cache_creation_input_tokens": cw,
        "output_tokens": out,
    }


def assistant_tool(name, inp, model="claude-opus-5-5", tid=None, usage=None):
    tid = tid or _next_tool_id()
    message = {
        "role": "assistant",
        "model": model,
        "content": [{"type": "tool_use", "id": tid, "name": name, "input": inp}],
    }
    if usage is not None:
        message["usage"] = usage
    return {"type": "assistant", "message": message}


def assistant_text(text, model="claude-opus-5-5", usage=None):
    message = {
        "role": "assistant",
        "model": model,
        "content": [{"type": "text", "text": text}],
    }
    if usage is not None:
        message["usage"] = usage
    return {"type": "assistant", "message": message}


def tool_result(tid, images=0):
    content = [
        {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": ""}}
        for _ in range(images)
    ]
    block = {"type": "tool_result", "tool_use_id": tid, "content": content}
    return {
        "type": "user",
        "isMeta": False,
        "isSidechain": False,
        "message": {"role": "user", "content": [block]},
    }


def write_transcript(path, objs):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        for obj in objs:
            f.write(json.dumps(obj))
            f.write("\n")


def run_hook(hook_path, payload, env_extra=None):
    """Runs a hook as a subprocess; returns (decision, reason, stdout).

    decision is "allow" (empty stdout), "deny"/"ask" (from a PreToolUse permissionDecision),
    or "context" (a SessionStart/UserPromptSubmit additionalContext string as the reason).
    """
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    if env_extra:
        env.update(env_extra)
    stdin_text = payload if isinstance(payload, str) else json.dumps(payload)
    r = subprocess.run([sys.executable, hook_path], input=stdin_text, env=env,
                        capture_output=True, text=True, encoding="utf-8",
                        errors="replace", timeout=30)
    out = (r.stdout or "").strip()
    if not out:
        return "allow", "", r.stdout
    try:
        data = json.loads(out)
    except ValueError:
        return "allow", "", r.stdout
    block = data.get("hookSpecificOutput") or {}
    event = block.get("hookEventName")
    if event in ("SessionStart", "UserPromptSubmit"):
        return "context", block.get("additionalContext", ""), r.stdout
    decision = block.get("permissionDecision")
    if decision in ("deny", "ask"):
        return decision, block.get("permissionDecisionReason", ""), r.stdout
    return "allow", "", r.stdout
