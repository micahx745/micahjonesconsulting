"""C1.5 offline test: .claude/settings.json after the C1.3 context diet.

Harness v2 run F, written from .claude/briefs/harness-v2-f-counts-diet.md. Four checks:
1. settings.json parses; still has at least the 22 permissions.allow entries and all the hook
   wiring C1.3's "change nothing else" line named (the four event keys, at least 11 hook
   groups, the 10 hook-script basenames). At least, not exactly: the file may grow later.
2. No `@premium-web` plugin is set to false in enabledPlugins (its hooks and the /premium
   audit agents are gates; C1.3 may only ever set false for zero-usage superpowers or
   voltagent-meta).
3. Every `mcp__X` entry in permissions.deny has its server X on C1.3's own 13-server
   candidate list, and X shows 0 (or is absent, which counts as 0) in
   .planning/harness/c1-counts.tsv's MCP SERVERS section -- a server called even once in
   30 days must never be denied.
4. No deny entry names a keep-list server: any `ccd_*` server, Claude_Browser, visualize,
   terminal, claude-in-chrome, computer-use, or any `plugin_premium-web_*` server.
"""

import json
import os
import re
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SETTINGS = os.path.join(REPO, ".claude", "settings.json")
COUNTS_TSV = os.path.join(REPO, ".planning", "harness", "c1-counts.tsv")

# C1.3's own candidate list, verbatim from the brief.
CANDIDATE_SERVERS = {
    "github", "desktop-commander", "claude-context", "context7", "sequential-thinking",
    "supabase", "chrome-devtools", "mcp-registry", "scheduled-tasks",
    "1a59c906-04da-521d-bda7-7f71b9f9e01c", "326cc715-78b6-42f0-9663-b41db75ef882",
    "d225a347-61d5-43c3-8c0a-876319bd80ca", "6f616b42-0ed8-571e-823f-ee4aca6b7ce9",
}

# The C1.3 keep list: never denied whatever the counts say.
KEEP_EXACT = {"Claude_Browser", "visualize", "terminal", "claude-in-chrome", "computer-use"}
KEEP_PREFIXES = ("ccd_", "plugin_premium-web_")

# The hook wiring as of run E/G, before this run touched settings.json (C1.3 may only
# change permissions.deny and enabledPlugins).
EXPECTED_HOOK_EVENTS = {"PostToolUse", "PreToolUse", "SessionStart", "UserPromptSubmit"}
EXPECTED_HOOK_GROUP_COUNT = 11
EXPECTED_HOOK_SCRIPTS = {
    "hook-gate.py", "resume-size.py", "worktree-write-guard.py", "executor-guard.py",
    "budget-gate.py", "tier-burn-deny.py", "image-open-ask.py", "dispatch-lint.py",
    "routing-reminder.py", "context-size-warn.py",
}

HOOK_SCRIPT_RE = re.compile(r"([A-Za-z0-9_.-]+\.py)")


def load_settings():
    with open(SETTINGS, encoding="utf-8") as f:
        return json.load(f)


def load_counts():
    """server -> calls from the MCP SERVERS section of c1-counts.tsv. A server absent
    from this dict counts as 0 (the brief's own rule)."""
    with open(COUNTS_TSV, encoding="utf-8") as f:
        lines = f.read().splitlines()
    start = next((i for i, ln in enumerate(lines) if ln.startswith("# MCP SERVERS")), None)
    if start is None:
        return {}
    counts = {}
    for ln in lines[start + 2:]:
        if ln.startswith("# "):
            break
        parts = ln.split("\t")
        if len(parts) == 2 and parts[1].strip().isdigit():
            counts[parts[0]] = int(parts[1])
    return counts


def hook_script_names(hooks):
    names = set()
    for groups in hooks.values():
        for group in groups:
            for h in group.get("hooks", []):
                cmd = h.get("command", "")
                names.update(HOOK_SCRIPT_RE.findall(cmd))
    return names


def main():
    failures = 0

    def check(n, ok, detail):
        nonlocal failures
        if not ok:
            failures += 1
            print("FAIL C1 case {0}: {1}".format(n, detail))

    try:
        data = load_settings()
    except Exception as e:  # noqa: BLE001
        print("FAIL C1 case 1: settings.json did not parse: {0!r}".format(e))
        print("FAIL C1 0 of 4 failed")
        return 1

    # 1: the diet kept every allow entry and every hook. Subset checks, not exact shape: the
    # file may grow later (the landing merge adds its blog-lint hook), and an exact count
    # would fail run_all then (main-session review, 2026-09-22; the E4 lesson of b1ab650).
    allow = (data.get("permissions") or {}).get("allow") or []
    hooks = data.get("hooks") or {}
    hook_events_ok = EXPECTED_HOOK_EVENTS.issubset(set(hooks.keys()))
    hook_group_count = sum(len(v) for v in hooks.values())
    scripts = hook_script_names(hooks)
    ok1 = (
        len(allow) >= 22
        and hook_events_ok
        and hook_group_count >= EXPECTED_HOOK_GROUP_COUNT
        and EXPECTED_HOOK_SCRIPTS.issubset(scripts)
    )
    check(
        1, ok1,
        "allow={0} events={1} groups={2} scripts={3}".format(
            len(allow), sorted(hooks.keys()), hook_group_count, sorted(scripts)
        ),
    )

    # 2: no @premium-web plugin is false.
    enabled_plugins = data.get("enabledPlugins") or {}
    premium_false = [k for k, v in enabled_plugins.items() if k.endswith("@premium-web") and v is False]
    check(2, not premium_false, "premium-web plugins set false: {0}".format(premium_false))

    # 3 + 4: every deny entry.
    deny = (data.get("permissions") or {}).get("deny") or []
    counts = load_counts()
    bad_candidate = []
    bad_nonzero = []
    bad_keep = []
    for entry in deny:
        if not entry.startswith("mcp__"):
            bad_candidate.append(entry)
            continue
        server = entry[len("mcp__"):]
        if server not in CANDIDATE_SERVERS:
            bad_candidate.append(entry)
        if counts.get(server, 0) != 0:
            bad_nonzero.append((entry, counts.get(server, 0)))
        if server in KEEP_EXACT or any(server.startswith(p) for p in KEEP_PREFIXES):
            bad_keep.append(entry)

    check(
        3, not bad_candidate and not bad_nonzero,
        "off-candidate-list={0} nonzero-calls={1} (deny={2})".format(bad_candidate, bad_nonzero, deny),
    )
    check(4, not bad_keep, "deny entries naming keep-list servers: {0}".format(bad_keep))

    if failures == 0:
        print("PASS C1 4/4")
        return 0
    print("FAIL C1 {0} of 4 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
