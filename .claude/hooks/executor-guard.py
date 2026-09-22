"""PreToolUse hook: confine a Claude Code EXECUTOR session to its brief.

Harness v2 run A (E1), written from .claude/briefs/harness-v2-a-guard-receipts.md. It is
inert unless the GLM launcher set HARNESS_ROLE=executor, so main-session and operator
sessions never see it. For an executor it denies, fail closed: writes outside the
worktree, writes to the books and the constitution, .claude/** outside harness scope,
reads of secret files, git writes, key printing, Fable spend, subagents, MCP tools and
network tools. Every deny appends one JSON line to <state>/guard.log.
"""

import json
import os
import re
import sys
import tempfile
from datetime import datetime, timezone

WRITE_TOOLS = ("Write", "Edit", "MultiEdit", "NotebookEdit")
READ_TOOLS = ("Read", "NotebookRead", "Grep", "Glob", "LS")
SHELL_TOOLS = ("Bash", "PowerShell")

PROTECTED_BASENAMES = (
    "resume.md",
    "memory.md",
    "lessons_learned.md",
    "agents.md",
    "settings.local.json",
)
PROTECTED_NAMES = (
    "resume.md",
    "memory.md",
    "lessons_learned.md",
    "agents.md",
    "claude.md",
    "settings.local.json",
)
HARNESS_ALLOWLIST = (
    ".claude/settings.json",
    ".claude/ai_routing.md",
    ".claude/claude.md",
    ".claude/briefs/readme.md",
)
SECRET_BASENAMES = (
    ".credentials.json",
    "credentials.json",
    ".netrc",
    ".npmrc",
    ".pypirc",
)
SECRET_KEY_EXTS = (".pem", ".p12", ".pfx", ".key")
ID_PREFIXES = ("id_rsa", "id_ed25519", "id_ecdsa")

SECRET_TEXT_PATTERNS = (
    r"(?:^|[\s'\"=/\\:(])\.env(?:\.(?!example\b|sample\b|template\b)[A-Za-z0-9_-]+)*(?=$|[\s'\";|&)>*])",
    r"\.[A-Za-z0-9]+-key\b",
    r"\bid_(?:rsa|ed25519|ecdsa)\b",
    r"\.credentials\.json\b",
    r"\.(?:pem|p12|pfx)\b",
)
SECRET_ENV_PATTERNS = (
    r"\$\{?[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Za-z0-9_]*\}?",
    r"\$env:[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)",
    r"%[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Za-z_]*%",
    r"^\s*(?:env|printenv|set)\s*(?:$|\|)",
    r"(?:Get-ChildItem|gci|dir|ls)\s+env:",
    r"GetEnvironmentVariable",
)
GIT_WRITE_PATTERN = (
    r"\bgit(?:\s+-C\s+(?:\"[^\"]*\"|'[^']*'|\S+))*(?:\s+-c\s+\S+)*\s+"
    r"(?:commit|push|pull|fetch|stash|reset|clean|checkout|switch|restore|rebase|merge|"
    r"cherry-pick|revert|am|apply|tag|branch|worktree|config|add|rm|mv|gc|prune|"
    r"update-ref|filter-branch|notes|submodule|remote)\b"
)
WRITE_ISH_PATTERN = (
    r"(?<![0-9&>=-])>>?(?![&=])|\btee\b|\bsed\s+-i|\bset-content\b|\badd-content\b|"
    r"\bout-file\b|\bcopy-item\b|\bmove-item\b|\bremove-item\b|\bnew-item\b|"
    r"\brename-item\b|\brm\b|\bmv\b|\bcp\b|\bdel\b|\berase\b|\bwritealltext\b|"
    r"\bappendalltext\b|\bwritealllines\b|\btruncate\b"
)

SECRET_TEXT_RES = tuple(re.compile(p, re.IGNORECASE) for p in SECRET_TEXT_PATTERNS)
SECRET_ENV_RES = tuple(re.compile(p, re.IGNORECASE) for p in SECRET_ENV_PATTERNS)
GIT_WRITE_RE = re.compile(GIT_WRITE_PATTERN, re.IGNORECASE)
WRITE_ISH_RE = re.compile(WRITE_ISH_PATTERN, re.IGNORECASE)
REDACT_RE = re.compile(r"(sk-|gho_|ghp_|re_)[A-Za-z0-9_\-]{8,}")

HINTS = {
    "outside-worktree": "Executors write only inside HARNESS_WORKTREE.",
    "dot-git": "Never write inside .git.",
    "secret-file": "Secret files never enter an executor's context.",
    "protected-file": "The main session keeps the books and the constitution; report instead.",
    "claude-dir": "Files under .claude/ need harness scope and the harness allow-list.",
    "read-outside": "Executors read only inside the worktree, the state dir and the temp dir.",
    "git-write": "Git is read-only for executors; the main session commits.",
    "secret-env": "Never print environment variables that hold keys.",
    "fable-spend": "Executors never spend Fable; use -DryRun.",
    "no-subagents": "No subagents in executor runs.",
    "no-mcp": "No MCP tools in executor runs.",
    "no-network": "No network tools in executor runs; the brief carries the facts.",
    "readonly-scope": "Readonly scope: Read, Grep and Glob only.",
    "internal-error": "The guard failed closed.",
}


def state_dir():
    d = os.environ.get("HARNESS_STATE_DIR") or ""
    if not d:
        base = os.environ.get("LOCALAPPDATA") or tempfile.gettempdir()
        d = os.path.join(base, "harness", "micahjonesconsulting")
    return d


def to_win(p):
    m = re.match(r"^/([A-Za-z])(/.*)?$", p or "")
    if m:
        return m.group(1).upper() + ":" + (m.group(2) or "/")
    return p


def norm(p, base):
    p = to_win(p)
    if not os.path.isabs(p):
        p = os.path.join(to_win(base), p)
    return os.path.normcase(os.path.abspath(p))


def inside(p, root):
    r = norm(root, "")
    return p == r or p.startswith(r + os.sep)


def rel_of(p, worktree_norm):
    r = os.path.relpath(p, worktree_norm)
    return r.replace(os.sep, "/").lower()


def secret_name(basename):
    b = (basename or "").lower()
    if b in (".env.example", ".env.sample", ".env.template"):
        return False
    if b == ".env" or b.startswith(".env."):
        return True
    if b.endswith(SECRET_KEY_EXTS):
        return True
    if re.match(r"^\.[a-z0-9]+-key$", b):
        return True
    if b.startswith(ID_PREFIXES):
        return True
    return b in SECRET_BASENAMES


def protected(rel, scope):
    base = rel.rsplit("/", 1)[-1]
    if base in PROTECTED_BASENAMES:
        return True
    if base == "claude.md":
        return not (scope == "harness" and rel == ".claude/claude.md")
    return False


def harness_allowed(rel):
    if rel.startswith(".claude/hooks/"):
        return True
    return rel in HARNESS_ALLOWLIST


def any_match(regexes, text):
    return any(r.search(text) for r in regexes)


def decide_write(tool_input, base, wt_norm, scope):
    raw = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
    p = norm(raw, base)
    if scope == "readonly":
        return "readonly-scope", p
    if not inside(p, wt_norm):
        return "outside-worktree", p
    rel = rel_of(p, wt_norm)
    if rel == ".git" or rel.startswith(".git/"):
        return "dot-git", p
    if secret_name(os.path.basename(p)):
        return "secret-file", p
    if protected(rel, scope):
        return "protected-file", p
    if rel.startswith(".claude/"):
        if scope == "harness" and harness_allowed(rel):
            return None, p
        return "claude-dir", p
    return None, p


def decide_read(tool, tool_input, base, wt_norm):
    raw = tool_input.get("file_path") or tool_input.get("notebook_path") or tool_input.get("path")
    p = norm(raw, base)
    if secret_name(os.path.basename(p)):
        return "secret-file", p
    # The pattern text is Glob.pattern and Grep.glob: the file-SELECTION text, not the
    # search text. Looking FOR the string ".env" is fine; selecting .env FILES is not.
    pattern_text = ""
    if tool == "Glob":
        pattern_text = tool_input.get("pattern") or ""
    elif tool == "Grep":
        pattern_text = tool_input.get("glob") or ""
    if any_match(SECRET_TEXT_RES, pattern_text):
        return "secret-file", p
    roots = (wt_norm, state_dir(), tempfile.gettempdir())
    if not any(inside(p, r) for r in roots):
        return "read-outside", p
    return None, p


def decide_shell(tool_input, scope):
    cmd = tool_input.get("command") or ""
    low = cmd.lower()
    rule = None
    if scope == "readonly":
        rule = "readonly-scope"
    elif GIT_WRITE_RE.search(cmd):
        rule = "git-write"
    elif any_match(SECRET_TEXT_RES, cmd):
        rule = "secret-file"
    elif any_match(SECRET_ENV_RES, cmd):
        rule = "secret-env"
    elif "fable-gate.ps1" in low and "-dryrun" not in low:
        rule = "fable-spend"
    elif any(n in low for n in PROTECTED_NAMES) and WRITE_ISH_RE.search(cmd):
        rule = "protected-file"
    elif scope != "harness" and (".claude/" in low or ".claude\\" in low) and WRITE_ISH_RE.search(cmd):
        rule = "claude-dir"
    if rule is None:
        return None, ""
    return rule, redact(cmd)[:120]


def decide(payload, base, wt_norm, scope):
    tool = payload.get("tool_name") or ""
    tool_input = payload.get("tool_input") or {}
    if not isinstance(tool_input, dict):
        raise ValueError("tool_input is not an object")
    if tool in WRITE_TOOLS:
        rule, p = decide_write(tool_input, base, wt_norm, scope)
        return rule, (p.replace(os.sep, "/") if rule else "")
    if tool in READ_TOOLS:
        rule, p = decide_read(tool, tool_input, base, wt_norm)
        return rule, (p.replace(os.sep, "/") if rule else "")
    if tool in SHELL_TOOLS:
        return decide_shell(tool_input, scope)
    if tool in ("Agent", "Task"):
        return "no-subagents", tool
    if tool.startswith("mcp__"):
        return "no-mcp", tool
    if tool in ("WebFetch", "WebSearch"):
        return "no-network", tool
    return None, ""


def redact(s):
    return REDACT_RE.sub(r"\1<redacted>", s)


def log_deny(session_id, tool, rule, target):
    d = state_dir()
    os.makedirs(d, exist_ok=True)
    entry = {
        "utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "session_id": session_id,
        "tool": tool,
        "rule": rule,
        "target": target,
    }
    with open(os.path.join(d, "guard.log"), "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")


def deny(session_id, tool, rule, target):
    reason = "executor-guard: " + rule + ": " + target + ". " + HINTS[rule]
    out = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }
    print(json.dumps(out))
    try:
        log_deny(session_id, tool, rule, target)
    except Exception:
        pass
    return 0


def main():
    data = sys.stdin.read()
    if os.environ.get("HARNESS_ROLE", "") != "executor":
        return 0
    session_id = ""
    tool = ""
    try:
        payload = json.loads(data)
        session_id = str(payload.get("session_id") or "")
        tool = str(payload.get("tool_name") or "")
        cwd = str(payload.get("cwd") or "")
        worktree = os.environ.get("HARNESS_WORKTREE") or ""
        if not worktree:
            raise ValueError("HARNESS_WORKTREE is not set")
        scope = os.environ.get("HARNESS_EXECUTOR_SCOPE") or "default"
        base = cwd or worktree
        wt_norm = norm(worktree, base)
        rule, raw = decide(payload, base, wt_norm, scope)
        if rule:
            return deny(session_id, tool, rule, raw)
        return 0
    except Exception:
        return deny(session_id, tool, "internal-error", "")


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        # The inert-role path must exit 0 silently whatever happens.
        sys.exit(0)
