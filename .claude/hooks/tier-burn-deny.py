"""PreToolUse hook: deny a long mechanical execution loop, or a 4th Fable call in one arc.

Harness v2 run C (B3), written from .claude/briefs/harness-v2-c-transcript-hooks.md. Stdlib
only; imports _transcript from its own directory. Inert for an executor session
(HARNESS_ROLE=executor) and on any exception: this is a checkpoint, not a security gate. It
never acts in an executor session, and it never denies Grep/Glob or a dispatch to another
model (claude-glm.ps1, deepseek-exec.ps1, gemini-exec.ps1, codex-exec.ps1, fable-gate.ps1,
run_cross_review.py) - those are cheap and are exactly the escape hatch this hook points to.
"""

import json
import os
import re
import sys

HOOK_DIR = os.path.dirname(os.path.abspath(__file__))
if HOOK_DIR not in sys.path:
    sys.path.insert(0, HOOK_DIR)
import _transcript as transcript  # noqa: E402

EXEC_TOOLS = ("Bash", "PowerShell", "Edit", "Write", "MultiEdit", "NotebookEdit", "Read")
MCP_EXEC_SUBSTRINGS = ("claude_browser", "chrome", "playwright", "computer-use")
DELEGATION_NAMES = ("Agent", "Task", "Skill", "AskUserQuestion")
DELEGATION_CMD_RE = re.compile(
    r"claude-glm\.ps1|deepseek-exec\.ps1|gemini-exec\.ps1|codex-exec\.ps1|"
    r"fable-gate\.ps1|run_cross_review\.py"
)
FABLE_COUNT_LIMIT = 3


def _command(tool_input):
    return str((tool_input or {}).get("command") or "").lower()


def is_exec_tool(name):
    name = name or ""
    if name in EXEC_TOOLS:
        return True
    if name.startswith("mcp__"):
        low = name.lower()
        return any(s in low for s in MCP_EXEC_SUBSTRINGS)
    return False


def is_delegation(name, tool_input):
    name = name or ""
    if name in DELEGATION_NAMES:
        return True
    if name in ("Bash", "PowerShell"):
        return bool(DELEGATION_CMD_RE.search(_command(tool_input)))
    return False


def is_fable_call(name, tool_input):
    name = name or ""
    tool_input = tool_input if isinstance(tool_input, dict) else {}
    if name in ("Agent", "Task"):
        return "fable" in str(tool_input.get("model") or "").lower()
    if name in ("Bash", "PowerShell"):
        cmd = _command(tool_input)
        return "fable-gate.ps1" in cmd and "-dryrun" not in cmd
    return False


def _deny(reason):
    out = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }
    print(json.dumps(out))


def _fable_count(objs, current_id):
    count = 0
    for obj in objs:
        for tid, name, inp in transcript.tool_uses(obj):
            if current_id and tid == current_id:
                continue
            if is_fable_call(name, inp):
                count += 1
    return count


def _consecutive_exec_total(objs, current_id):
    """1 (the current call) plus every EXEC tool_use since the operator's last message,
    walking backward and stopping at the first human message or the first delegation call
    (whichever comes first).
    """
    total = 1
    for obj in reversed(objs):
        if not isinstance(obj, dict):
            continue
        if obj.get("type") == "user" and transcript.is_human(obj):
            break
        if obj.get("type") != "assistant":
            continue
        stopped = False
        for tid, name, inp in reversed(transcript.tool_uses(obj)):
            if current_id and tid == current_id:
                continue
            if is_delegation(name, inp):
                stopped = True
                break
            if is_exec_tool(name):
                total += 1
        if stopped:
            break
    return total


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
        current_id = payload.get("tool_use_id")

        objs = transcript.load_tail(payload.get("transcript_path") or "")
        human = transcript.latest_human_text(objs).lower()

        if is_fable_call(tool_name, tool_input):
            count = _fable_count(objs, current_id)
            if count >= FABLE_COUNT_LIMIT and "fable ok" not in human:
                _deny(
                    "tier-burn: this would be Fable call {0} in this arc (limit 3, "
                    "AI_ROUTING rule 11). Say 'fable ok' to allow it.".format(count + 1)
                )
                return 0

        model = transcript.session_model(objs).lower()
        if "fable" in model:
            n = int(os.environ.get("HARNESS_TIER_BURN_FABLE") or 12)
        elif "opus" in model:
            n = int(os.environ.get("HARNESS_TIER_BURN_OPUS") or 40)
        else:
            return 0

        if is_exec_tool(tool_name) and not is_delegation(tool_name, tool_input):
            total = _consecutive_exec_total(objs, current_id)
            if total >= n:
                _deny(
                    "tier-burn: {0} consecutive execution calls on {1} since the operator's "
                    "last message (limit {2}, AI_ROUTING rule 11). Write the rest as a brief "
                    "and run it on GLM (scripts/claude-glm.ps1 -Batch -PromptFile <pointer>), "
                    "or ask the operator to continue.".format(total, model, n)
                )
        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
