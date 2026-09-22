#!/usr/bin/env python3
"""GLM leg 2a, Step 2: tool-use counts by NAME ONLY across project transcripts.

Privacy (leg 1 rules): this script reads .jsonl transcripts; it prints labels and
counts only. No transcript content, no prompt text, no file paths per-entry.
"""
import glob
import json
from collections import Counter

BASE = "C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting*"

mcp_servers = Counter()
skills = Counter()
agent_type = Counter()
agent_model = Counter()
tool_total = 0
n_files = 0
min_ts = None
max_ts = None


def note_ts(obj):
    global min_ts, max_ts
    ts = obj.get("timestamp")
    if isinstance(ts, str) and ts:
        if min_ts is None or ts < min_ts:
            min_ts = ts
        if max_ts is None or ts > max_ts:
            max_ts = ts


for path in glob.glob(BASE + "/**/*.jsonl", recursive=True):
    n_files += 1
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                except Exception:
                    continue
                if not isinstance(obj, dict):
                    continue
                note_ts(obj)
                msg = obj.get("message")
                if not isinstance(msg, dict):
                    continue
                content = msg.get("content")
                if not isinstance(content, list):
                    continue
                for block in content:
                    if not isinstance(block, dict):
                        continue
                    if block.get("type") != "tool_use":
                        continue
                    tool_total += 1
                    name = block.get("name") or "?"
                    inp = block.get("input") if isinstance(block.get("input"), dict) else {}
                    if name.startswith("mcp__"):
                        parts = name.split("__")
                        server = parts[1] if len(parts) > 2 else name
                        mcp_servers[server] += 1
                    elif name == "Skill":
                        skills[str(inp.get("skill", "?"))] += 1
                    elif name in ("Agent", "Task"):
                        st = str(inp.get("subagent_type", "default"))
                        agent_type[st] += 1
                        model = inp.get("model")
                        agent_model[str(model) if model else "<unset/inherited>"] += 1
                    else:
                        pass  # built-in tools: counted in tool_total only
    except Exception:
        continue


def dump(title, counter):
    print(f"\n{title}")
    if not counter:
        print("  [no calls]")
        return
    for key, n in sorted(counter.items(), key=lambda kv: (-kv[1], kv[0])):
        print(f"  {n:6d}  {key}")


print(f"transcript files scanned: {n_files}")
print(f"total tool_use calls: {tool_total}")
print(f"date range: {min_ts or '?'} .. {max_ts or '?'}")
dump("MCP server calls (server in mcp__<server>__<tool>):", mcp_servers)
dump("Skill calls (by 'skill' input):", skills)
dump("Agent/Task calls (by subagent_type):", agent_type)
dump("Agent/Task calls (by model):", agent_model)
