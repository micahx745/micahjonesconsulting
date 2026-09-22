"""B1.1: tool-use counts across Claude Code session transcripts.

Harness v2 run F, written from .claude/briefs/harness-v2-f-counts-diet.md. Stdlib only,
read-only. This is what C1 diets .claude/settings.json against: calls per MCP server, per
skill and per subagent type over the last N days, plus the longest mechanical-execution run
per top-tier session and image blocks per session.

Privacy: it prints only structural names (MCP server, skill, subagent_type, model id),
8-character session-id prefixes, and numbers -- never message text, tool inputs, commands
or file contents. It reads whole JSON lines (it has to, to find those fields), but nothing
read is ever written back out except through the narrow fields listed above.

Self-contained: the EXEC-tool / delegation / human-message classification below mirrors
.claude/hooks/tier-burn-deny.py and .claude/hooks/_transcript.py (run C) closely enough to
share behavior ("the same EXEC set and resets"), but is duplicated rather than imported, so
this script has no dependency outside the stdlib and outside scripts/harness/.

Usage: python tool_use_counts.py [--root DIR] [--project SUBSTR] [--days N]
Defaults: --root C:/Users/micah/.claude/projects, --project micahjonesconsulting, --days 30.
"""

import argparse
import collections
import glob
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

DEFAULT_ROOT = "C:/Users/micah/.claude/projects"
DEFAULT_PROJECT = "micahjonesconsulting"
DEFAULT_DAYS = 30

# ---------------------------------------------------------------- classification (mirrors
# .claude/hooks/tier-burn-deny.py + .claude/hooks/_transcript.py; duplicated, not imported)
EXEC_TOOLS = ("Bash", "PowerShell", "Edit", "Write", "MultiEdit", "NotebookEdit", "Read")
MCP_EXEC_SUBSTRINGS = ("claude_browser", "chrome", "playwright", "computer-use")
DELEGATION_NAMES = ("Agent", "Task", "Skill", "AskUserQuestion")
DELEGATION_CMD_RE = re.compile(
    r"claude-glm\.ps1|deepseek-exec\.ps1|gemini-exec\.ps1|codex-exec\.ps1|"
    r"fable-gate\.ps1|run_cross_review\.py"
)
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
MCP_SERVER_RE = re.compile(r"^mcp__(.+?)__")


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


def mcp_server(name):
    m = MCP_SERVER_RE.match(name or "")
    return m.group(1) if m else None


def _message_text(obj):
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
    text = _message_text(obj)
    if not text:
        return False
    stripped = text.lstrip()
    if any(stripped.startswith(p) for p in NON_HUMAN_PREFIXES):
        return False
    return True


def tool_uses(obj):
    """[(id, name, input_dict), ...] for an assistant object's tool_use blocks."""
    if not isinstance(obj, dict) or obj.get("type") != "assistant":
        return []
    content = (obj.get("message") or {}).get("content")
    if not isinstance(content, list):
        return []
    out = []
    for b in content:
        if not isinstance(b, dict) or b.get("type") != "tool_use":
            continue
        inp = b.get("input")
        out.append((b.get("id"), b.get("name"), inp if isinstance(inp, dict) else {}))
    return out


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


def parse_ts(s):
    """An aware (UTC) datetime for an ISO-ish timestamp string, or None."""
    if not s:
        return None
    try:
        dt = datetime.fromisoformat(str(s).replace("Z", "+00:00"))
    except Exception:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


# ---------------------------------------------------------------- file discovery
def find_project_dirs(root, project):
    out = []
    try:
        entries = os.listdir(root)
    except OSError:
        return out
    for name in sorted(entries):
        full = os.path.join(root, name)
        if project in name and os.path.isdir(full):
            out.append(full)
    return out


def find_main_files(project_dir):
    return sorted(glob.glob(os.path.join(project_dir, "*.jsonl")))


def find_subagent_files(project_dir):
    return sorted(glob.glob(os.path.join(project_dir, "*", "subagents", "*.jsonl")))


def session_stem(path):
    return os.path.splitext(os.path.basename(path))[0]


def parent_session_stem(subagent_path):
    """<project_dir>/<session_stem>/subagents/<file>.jsonl -> <session_stem>."""
    subagents_dir = os.path.dirname(subagent_path)
    session_dir = os.path.dirname(subagents_dir)
    return os.path.basename(session_dir)


# ---------------------------------------------------------------- per-file walk
def load_lines(path, cutoff):
    """Parsed JSON objects from path, in file order. A line older than cutoff (by its own
    "timestamp") is skipped; a line without one is kept. cutoff=None keeps everything.
    """
    if cutoff is not None:
        try:
            mtime = datetime.fromtimestamp(os.path.getmtime(path), tz=timezone.utc)
        except OSError:
            mtime = None
        if mtime is not None and mtime < cutoff:
            return  # nothing in this file can be newer than its own last write
    try:
        fh = open(path, encoding="utf-8", errors="replace")
    except OSError:
        return
    with fh:
        for raw in fh:
            raw = raw.strip()
            if not raw:
                continue
            try:
                obj = json.loads(raw)
            except ValueError:
                continue
            if not isinstance(obj, dict):
                continue
            if cutoff is not None:
                ts = parse_ts(obj.get("timestamp"))
                if ts is not None and ts < cutoff:
                    continue
            yield obj


def process_file(path, cutoff, mcp_counts, skill_counts, subagent_counts, seen_ids):
    """Walk one transcript file once: update the three global Counters (tool uses
    de-duplicated by id across the whole run via the shared seen_ids set), and return
    (last_model, longest_exec_run, image_total) for this file alone.
    """
    last_model = None
    current_run = 0
    longest_run = 0
    image_total = 0

    for obj in load_lines(path, cutoff):
        etype = obj.get("type")
        if etype == "assistant":
            message = obj.get("message") or {}
            model = message.get("model")
            if model and model != "<synthetic>":
                last_model = model
            for tid, name, inp in tool_uses(obj):
                if tid is not None:
                    if tid in seen_ids:
                        continue
                    seen_ids.add(tid)
                server = mcp_server(name)
                if server:
                    mcp_counts[server] += 1
                elif name == "Skill":
                    skill = inp.get("skill") or inp.get("name") or "unset"
                    skill_counts[str(skill)] += 1
                elif name in ("Agent", "Task"):
                    satype = inp.get("subagent_type") or "unset"
                    subagent_counts[str(satype)] += 1
                if is_delegation(name, inp):
                    current_run = 0
                elif is_exec_tool(name):
                    current_run += 1
                    if current_run > longest_run:
                        longest_run = current_run
        elif etype == "user":
            if is_human(obj):
                current_run = 0
            else:
                image_total += image_count(obj)

    return last_model, longest_run, image_total


def sorted_counter(counter):
    """[(name, count), ...] for count > 0, sorted count descending then name ascending."""
    return sorted(((k, v) for k, v in counter.items() if v > 0), key=lambda kv: (-kv[1], kv[0]))


# ---------------------------------------------------------------- main
def main(argv=None):
    parser = argparse.ArgumentParser(description="Tool-use counts across session transcripts.")
    parser.add_argument("--root", default=DEFAULT_ROOT)
    parser.add_argument("--project", default=DEFAULT_PROJECT)
    parser.add_argument("--days", type=int, default=DEFAULT_DAYS)
    args = parser.parse_args(argv)

    cutoff = datetime.now(timezone.utc) - timedelta(days=args.days) if args.days is not None else None

    mcp_counts = collections.Counter()
    skill_counts = collections.Counter()
    subagent_counts = collections.Counter()
    seen_ids = set()
    exec_runs = []  # [(id8, model, longest_run), ...] for qualifying main sessions
    images_by_session = collections.Counter()  # id8 -> image blocks (main file + its subagents)

    for project_dir in find_project_dirs(args.root, args.project):
        for path in find_main_files(project_dir):
            id8 = session_stem(path)[:8]
            last_model, longest_run, image_total = process_file(
                path, cutoff, mcp_counts, skill_counts, subagent_counts, seen_ids
            )
            images_by_session[id8] += image_total
            model_l = (last_model or "").lower()
            if longest_run > 0 and ("opus" in model_l or "fable" in model_l):
                exec_runs.append((id8, last_model, longest_run))

        for sub_path in find_subagent_files(project_dir):
            parent_id8 = parent_session_stem(sub_path)[:8]
            _, _, image_total = process_file(
                sub_path, cutoff, mcp_counts, skill_counts, subagent_counts, seen_ids
            )
            images_by_session[parent_id8] += image_total

    exec_runs.sort(key=lambda r: (-r[2], r[0]))
    images_rows = sorted_counter(images_by_session)

    print("# MCP SERVERS (calls, {0}d, project={1})".format(args.days, args.project))
    print("server\tcalls")
    for name, n in sorted_counter(mcp_counts):
        print("{0}\t{1}".format(name, n))

    print("# SKILLS (calls)")
    print("skill\tcalls")
    for name, n in sorted_counter(skill_counts):
        print("{0}\t{1}".format(name, n))

    print("# SUBAGENT TYPES (calls)")
    print("subagent_type\tcalls")
    for name, n in sorted_counter(subagent_counts):
        print("{0}\t{1}".format(name, n))

    print("# LONGEST EXEC RUNS (top 10 sessions on opus or fable)")
    print("session\tmodel\tlongest_run")
    for id8, model, n in exec_runs[:10]:
        print("{0}\t{1}\t{2}".format(id8, model, n))

    print("# IMAGES (top 10 sessions)")
    print("session\timage_blocks")
    for id8, n in images_rows[:10]:
        print("{0}\t{1}".format(id8, n))

    return 0


if __name__ == "__main__":
    sys.exit(main())
