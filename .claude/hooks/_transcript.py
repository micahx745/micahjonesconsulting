"""Shared transcript reading for the B2, B3, B4 and C2 hooks.

Harness v2 run B (B2.3), written from .claude/briefs/harness-v2-b-lint-routing-governor.md.
Stdlib only. Claude Code writes one JSON line per content block, so a single assistant
message with several tool calls spans several lines; the helpers here walk the file once and
hand back plain dicts, never re-deriving the JSONL framing at each call site.
"""

import json
import os

NON_HUMAN_PREFIXES = (
    "<command-name>",
    "<command-message>",
    "<command-args>",
    "<local-command",
    "<system-reminder>",
    "[Request interrupted",
    "Caveat:",
    "<bash-input>",
    "<bash-stdout>",
    "<bash-stderr>",
    "<cross-session-message",
    "<task-notification",
)


def load_tail(path, max_bytes=4000000):
    """The parsed JSON objects from the last max_bytes of path. [] when missing or empty."""
    if not path:
        return []
    try:
        size = os.path.getsize(path)
    except OSError:
        return []
    if size == 0:
        return []
    skip_first = size > max_bytes
    try:
        with open(path, "rb") as f:
            f.seek(size - max_bytes if skip_first else 0)
            data = f.read()
    except OSError:
        return []
    lines = data.decode("utf-8", errors="replace").split("\n")
    if skip_first and lines:
        lines = lines[1:]
    objs = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        try:
            objs.append(json.loads(line))
        except ValueError:
            continue
    return objs


def human_text(obj):
    """The text of a message object: string content, or its text blocks joined with '\\n'."""
    if not isinstance(obj, dict):
        return ""
    message = obj.get("message")
    content = message.get("content") if isinstance(message, dict) else None
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        texts = [b.get("text", "") for b in content if isinstance(b, dict) and b.get("type") == "text"]
        return "\n".join(texts)
    return ""


def is_human(obj):
    """A real operator message: type user, not meta, not a sidechain, with non-tool text."""
    if not isinstance(obj, dict) or obj.get("type") != "user":
        return False
    if obj.get("isMeta") or obj.get("isSidechain"):
        return False
    text = human_text(obj)
    if not text:
        return False
    stripped = text.lstrip()
    if any(stripped.startswith(p) for p in NON_HUMAN_PREFIXES):
        return False
    return True


def latest_human_text(objs):
    for obj in reversed(objs):
        if is_human(obj):
            return human_text(obj)
    return ""


def session_model(objs):
    """message.model of the last assistant object with a real (non-synthetic) model."""
    for obj in reversed(objs):
        if isinstance(obj, dict) and obj.get("type") == "assistant":
            message = obj.get("message") or {}
            model = message.get("model")
            if model and model != "<synthetic>":
                return model
    return ""


def tool_uses(obj):
    """[(id, name, input), ...] for an assistant object's tool_use blocks."""
    if not isinstance(obj, dict) or obj.get("type") != "assistant":
        return []
    content = (obj.get("message") or {}).get("content")
    if not isinstance(content, list):
        return []
    return [(b.get("id"), b.get("name"), b.get("input"))
            for b in content if isinstance(b, dict) and b.get("type") == "tool_use"]


def image_count(obj):
    """The number of image blocks inside a user object's tool_result blocks."""
    if not isinstance(obj, dict) or obj.get("type") != "user":
        return 0
    content = (obj.get("message") or {}).get("content")
    if not isinstance(content, list):
        return 0
    count = 0
    for b in content:
        if isinstance(b, dict) and b.get("type") == "tool_result":
            inner = b.get("content")
            if isinstance(inner, list):
                count += sum(1 for x in inner if isinstance(x, dict) and x.get("type") == "image")
    return count


def last_usage(objs):
    """message.usage of the last assistant object that carries one, else {}."""
    for obj in reversed(objs):
        if isinstance(obj, dict) and obj.get("type") == "assistant":
            message = obj.get("message")
            if isinstance(message, dict) and isinstance(message.get("usage"), dict):
                return message["usage"]
    return {}
