"""SessionStart / PreToolUse hook: print the budget line, and deny a Claude fan-out over budget.

Harness v2 run B (B2.4), written from .claude/briefs/harness-v2-b-lint-routing-governor.md. It
is inert for an executor session (HARNESS_ROLE=executor), on SessionStart it prints the budget
line as additionalContext, and on a PreToolUse for Agent or Task it denies a new Claude
fan-out once the tracked usage crosses a threshold in AI_ROUTING rule 5, unless the claude
block is missing/stale (over 6 hours old) or the operator said "budget ok". A budget gate is a
checkpoint, not a security boundary: any exception prints nothing and exits 0, same as run A's
tier-burn-style hooks, because a broken gate must never be the reason work stops.
"""

import json
import os
import sys

HOOK_DIR = os.path.dirname(os.path.abspath(__file__))
if HOOK_DIR not in sys.path:
    sys.path.insert(0, HOOK_DIR)
import _transcript as transcript  # noqa: E402

REPO = os.path.dirname(os.path.dirname(HOOK_DIR))
STATUS_DIR = os.path.join(REPO, "scripts", "harness")
if STATUS_DIR not in sys.path:
    sys.path.insert(0, STATUS_DIR)
import status  # noqa: E402


def _pct(v):
    return int(round(v or 0))


def _deny(reason):
    out = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }
    print(json.dumps(out))


def _deny_reason(claude, model, human):
    """The first budget-gate deny reason that applies, or None (AI_ROUTING rule 5, in order)."""
    weekly = claude.get("weekly_pct", 0.0)
    five_hour = claude.get("five_hour_pct", 0.0)
    fable = claude.get("fable_pct", 0.0)

    if weekly >= 75:
        return (
            "budget-gate: weekly all-models {0}% is at or over 75%: Claude narrows to the "
            "ledger, ship calls, diff review and the taste gate (AI_ROUTING rule 5). Route "
            "this leg to GLM, DeepSeek, Gemini or Sol, or say 'budget ok'."
        ).format(_pct(weekly))

    if five_hour >= 80 and (model == "" or "opus" in model or "fable" in model):
        # No weekly fallback: the weekly reset is days away and would misstate this window's.
        reset_s = claude.get("five_hour_resets_utc") or ""
        try:
            reset_text = status.fmt_minute(status.parse_iso(reset_s)) + "Z" if reset_s else "unknown"
        except ValueError:
            reset_text = "unknown"
        return (
            "budget-gate: the 5-hour window is at {0}%: no new Opus or Fable spawns until it "
            "rolls off (resets {1}). Say 'budget ok' to override."
        ).format(_pct(five_hour), reset_text)

    if fable >= 90 and "fable" in model:
        return (
            "budget-gate: weekly Fable is at {0}%: no Fable (AI_ROUTING rule 5). Say "
            "'budget ok' to override."
        ).format(_pct(fable))

    if fable >= 70 and "fable" in model and "fable ok" not in human:
        return (
            "budget-gate: weekly Fable is at {0}%: Fable only for phase-changing verdicts; "
            "say 'fable ok' if this is one."
        ).format(_pct(fable))

    return None


def _claude_is_stale_or_missing(claude, now):
    if not isinstance(claude, dict):
        return True
    try:
        updated = status.parse_iso(claude.get("updated_utc", ""))
    except ValueError:
        return True
    return (now - updated).total_seconds() / 60.0 > 360


def main():
    raw = sys.stdin.read()
    if os.environ.get("HARNESS_ROLE", "") == "executor":
        return 0
    try:
        payload = json.loads(raw) if raw.strip() else {}
        if not isinstance(payload, dict):
            return 0

        event = payload.get("hook_event_name") or ""
        now = status.now_utc()
        stat = status.load_status()

        if event == "SessionStart":
            print(json.dumps({
                "hookSpecificOutput": {
                    "hookEventName": "SessionStart",
                    "additionalContext": status.tier_output(stat, now),
                }
            }))
            return 0

        if event == "PreToolUse" and payload.get("tool_name") in ("Agent", "Task"):
            claude = stat.get("claude")
            if _claude_is_stale_or_missing(claude, now):
                return 0
            objs = transcript.load_tail(payload.get("transcript_path") or "")
            human = transcript.latest_human_text(objs).lower()
            if "budget ok" in human:
                return 0
            tool_input = payload.get("tool_input") or {}
            model = str(tool_input.get("model") or "").lower()
            reason = _deny_reason(claude, model, human)
            if reason:
                _deny(reason)
            return 0

        return 0
    except Exception:
        return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
