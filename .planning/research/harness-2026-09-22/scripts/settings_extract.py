#!/usr/bin/env python3
"""GLM leg 2a, Step 1: settings inventory. Prints allow-listed fields ONLY.

Privacy: never prints a permission entry, an env value outside the allow-list,
a URL, mcp args/env/headers, or anything matching the secret regex. Permissions
are reported as COUNTS only.
"""
import json
import re
from pathlib import Path

SETTINGS_PATHS = [
    Path("C:/Users/micah/.claude/settings.json"),
    Path("C:/Users/micah/.claude/settings.local.json"),
    Path("C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/settings.json"),
    Path("C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/settings.local.json"),
    Path("C:/Users/micah/Code/micahjonesconsulting/.claude/settings.json"),
    Path("C:/Users/micah/Code/micahjonesconsulting/.claude/settings.local.json"),
]

CLAUDE_JSON = Path("C:/Users/micah/.claude.json")

SECRET_RE = re.compile(
    r"(gho_|ghp_|github_pat_|sk-[A-Za-z0-9]|sk_[A-Za-z0-9]|re_[A-Za-z0-9]{8}"
    r"|AKIA[0-9A-Z]{12}|xox[bp]-)"
)


def env_value_printable(name):
    return (
        name.startswith("CLAUDE_CODE_")
        or name.startswith("ANTHROPIC_DEFAULT_")
        or name == "ANTHROPIC_MODEL"
    )


def mask_if_secret(value):
    value = str(value)
    if SECRET_RE.search(value):
        return "<value-hidden-matches-secret-pattern>"
    return value


def load_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as exc:  # unreadable file: say so, print nothing from it
        print(f"  [unreadable: {type(exc).__name__}: {exc}]")
        return None


def print_file(path):
    print(f"\n=== {path} ===")
    if not path.is_file():
        print("  [missing]")
        return
    data = load_json(path)
    if data is None:
        return
    if not isinstance(data, dict):
        print("  [not a JSON object; skipped]")
        return

    # --- hooks: event, matcher, command, timeout ---
    hooks = data.get("hooks") or {}
    if isinstance(hooks, dict) and hooks:
        for event, entries in sorted(hooks.items()):
            if not isinstance(entries, list):
                continue
            for entry in entries:
                matcher = entry.get("matcher", "") if isinstance(entry, dict) else ""
                inner = entry.get("hooks", []) if isinstance(entry, dict) else []
                if isinstance(inner, dict):
                    inner = [inner]
                for h in inner:
                    if not isinstance(h, dict):
                        continue
                    cmd = h.get("command", "")
                    timeout = h.get("timeout", "")
                    print(f"  hook | {event} | matcher={matcher!r} | "
                          f"timeout={timeout if timeout != '' else 'default'} | {cmd}")
    else:
        print("  hooks: [none]")

    # --- env names; values only for the allow-list ---
    env = data.get("env") or {}
    if isinstance(env, dict) and env:
        for name in sorted(env):
            if env_value_printable(name):
                print(f"  env | {name} = {mask_if_secret(env[name])}")
            else:
                print(f"  env | {name} = <set>")
    else:
        print("  env: [none]")

    # --- enabledPlugins ---
    plugins = data.get("enabledPlugins") or {}
    if isinstance(plugins, dict) and plugins:
        for name in sorted(plugins):
            print(f"  enabledPlugins | {name}: {plugins[name]}")
    else:
        print("  enabledPlugins: [none]")

    # --- statusLine / model ---
    status = data.get("statusLine")
    if isinstance(status, dict):
        print(f"  statusLine | type={status.get('type', '?')} | "
              f"command={mask_if_secret(status.get('command', ''))}")
    else:
        print("  statusLine: [none]")
    print(f"  model: {data.get('model', '[unset]')}")

    # --- permissions: counts only ---
    perms = data.get("permissions") or {}
    if isinstance(perms, dict):
        total_secret = 0
        parts = []
        for bucket in ("allow", "ask", "deny"):
            entries = perms.get(bucket) or []
            n_secret = sum(1 for e in entries if SECRET_RE.search(str(e)))
            total_secret += n_secret
            parts.append(f"{bucket}={len(entries)}")
        print(f"  permissions.count | {' | '.join(parts)} | "
              f"secret-pattern-matches={total_secret}")
    else:
        print("  permissions: [none]")


def server_type(srv):
    if not isinstance(srv, dict):
        return "unknown"
    t = srv.get("type")
    if t in ("stdio", "http", "sse"):
        return t
    if "command" in srv:
        return "stdio"
    if "url" in srv:
        return "http"
    return "unknown"


def print_claude_json():
    print(f"\n=== {CLAUDE_JSON} (mcpServers names/types ONLY) ===")
    if not CLAUDE_JSON.is_file():
        print("  [missing]")
        return
    data = load_json(CLAUDE_JSON)
    if data is None:
        return
    top = data.get("mcpServers") or {}
    if isinstance(top, dict) and top:
        for name in sorted(top):
            print(f"  mcpServer[user] | {name} : {server_type(top[name])}")
    else:
        print("  mcpServers[user]: [none]")
    projects = data.get("projects") or {}
    if isinstance(projects, dict):
        for key in sorted(projects):
            if "micahjonesconsulting" not in key:
                continue
            servers = (projects[key] or {}).get("mcpServers") or {}
            if isinstance(servers, dict) and servers:
                for name in sorted(servers):
                    print(f"  mcpServer[project {key}] | {name} : "
                          f"{server_type(servers[name])}")
            else:
                print(f"  mcpServers[project {key}]: [none]")


def main():
    for p in SETTINGS_PATHS:
        print_file(p)
    print_claude_json()


if __name__ == "__main__":
    main()
