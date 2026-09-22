"""E3.3: check every changed path in the working tree is on a brief's Files list.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only. Deliberately cwd-relative, not repo-relative by the script's own location: every git
call and the brief path are resolved against the process's current working directory, so this
same file can be pointed at a throwaway git repo in a test as well as at the real worktree.
"Run from the repo root" means the CALLER's cwd, not this file's path on disk.

Allow-list parsing: only backticked tokens that sit on a "- " bullet line inside the brief's
"## Files" section count as allowed paths. A paragraph such as "Read-only inputs you must not
edit: `a.md`, `b.md`" is deliberately NOT a bullet line, so those paths are never
allow-listed by accident.
"""

import fnmatch
import re
import subprocess
import sys

HEADING_RE = re.compile(r"(?m)^##[ \t]+(.*?)[ \t]*$")
BACKTICK_RE = re.compile(r"`([^`]+)`")


def headings(text):
    return [(m.start(), m.end(), m.group(1).strip().lower()) for m in HEADING_RE.finditer(text)]


def files_section(text):
    heads = headings(text)
    idx = next((i for i, (_, _, title) in enumerate(heads) if title.startswith("files")), -1)
    if idx < 0:
        return ""
    start = heads[idx][1]
    end = heads[idx + 1][0] if idx + 1 < len(heads) else len(text)
    return text[start:end]


def allowed_entries(brief_path):
    with open(brief_path, encoding="utf-8") as f:
        text = f.read()
    body = files_section(text)
    entries = []
    for ln in body.splitlines():
        if not ln.strip().startswith("- "):
            continue
        entries.extend(BACKTICK_RE.findall(ln))
    return entries


def matches(changed, entry):
    if entry.endswith("/"):
        return changed == entry.rstrip("/") or changed.startswith(entry)
    if "*" in entry or "?" in entry or "[" in entry:
        return fnmatch.fnmatch(changed, entry)
    return changed == entry


def changed_paths(base):
    diff = subprocess.run(["git", "diff", "--name-only", base], capture_output=True,
                           text=True, encoding="utf-8", errors="replace")
    others = subprocess.run(["git", "ls-files", "--others", "--exclude-standard"],
                             capture_output=True, text=True, encoding="utf-8", errors="replace")
    lines = (diff.stdout or "").splitlines() + (others.stdout or "").splitlines()
    paths = set()
    for ln in lines:
        p = ln.strip()
        if p:
            paths.add(p.replace("\\", "/"))
    return sorted(paths)


def main():
    argv = sys.argv[1:]
    base = "HEAD"
    if "--base" in argv:
        i = argv.index("--base")
        base = argv[i + 1]
        del argv[i:i + 2]
    if len(argv) != 1:
        print("usage: diff_scope.py <brief.md> [--base <rev>]")
        return 1
    brief_path = argv[0]

    entries = allowed_entries(brief_path)
    changed = changed_paths(base)
    outside = [p for p in changed if not any(matches(p, e) for e in entries)]

    if outside:
        print("FAIL diff scope: outside the Files list: {0}".format(", ".join(outside)))
        return 1
    print("PASS diff scope: {0} changed paths, all listed".format(len(changed)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
