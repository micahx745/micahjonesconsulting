"""E4.5: check the spliced routing files and the routing-reminder hook, against the real repo.

Harness v2 run B. Unlike most tests here, this one deliberately reads the real
.claude/AI_ROUTING.md and .claude/CLAUDE.md: E4.2 and E4.3 already spliced them (splice_block.py
refuses on any marker trouble, so if this test runs at all, the splice already happened). The
hashes are the same ones the main session pre-flighted before dispatch (LESSONS #52): if a
byte outside the replaced block moved, the hash catches it here rather than downstream.
"""

import hashlib
import os
import subprocess
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
ROUTING_HOOK = os.path.join(REPO, ".claude", "hooks", "routing-reminder.py")
AI_ROUTING = os.path.join(REPO, ".claude", "AI_ROUTING.md")
CLAUDE_MD = os.path.join(REPO, ".claude", "CLAUDE.md")
ROUTING_POINTER = os.path.join(REPO, ".planning", "harness", "ROUTING.md")

HISTORY_MARK = b"## History (the dated routing rulings"
HISTORY_LEN = 14737
HISTORY_HASH = "ae235b9091d2da7e5a129f81729fe4ffe1899dbda028c14ffb10f98e528481b0"

MODEL_ROUTING_MARK = b"## Model routing (full table"
ARC_SHAPE_MARK = b"**Arc shape (MODEL_ROUTING"
BEFORE_HASH = "811dd038fcedb17dd3871f834674be1e5fc5975413c0640e66d8c3e055d30a3d"
AFTER_HASH = "0a8477bf9a61558782477e64c030fc47fcb31d19dbee71e605e1b44ab31b2303"

SPLICE_COMMIT = "567e719"  # Harness v2 E4: the commit that spliced AI_ROUTING.md and CLAUDE.md


def _have_commit():
    r = subprocess.run(["git", "cat-file", "-e", SPLICE_COMMIT + "^{commit}"], cwd=REPO,
                       capture_output=True)
    return r.returncode == 0


def _show(path):
    """The bytes of path as committed at SPLICE_COMMIT (a raw blob: no line-ending conversion)."""
    return subprocess.run(["git", "show", SPLICE_COMMIT + ":" + path], cwd=REPO,
                          capture_output=True).stdout


def main():
    failures = 0

    # 1: the routing-reminder hook prints the post-reset table.
    env = dict(os.environ)
    env["CLAUDE_PROJECT_DIR"] = REPO
    r1 = subprocess.run([sys.executable, ROUTING_HOOK], env=env, capture_output=True,
                         text=True, encoding="utf-8", errors="replace", timeout=30)
    needles = ("Opus 5.5", "at most 3 gates per arc", "GLM 5.3 in a worktree", "Mechanical loops")
    missing = [n for n in needles if n not in r1.stdout]
    if missing:
        failures += 1
        print("FAIL E4 case 1: routing-reminder missing {0!r} (exit {1})".format(missing, r1.returncode))

    # 2: the model id line is present, and the old two-part id is not.
    with open(AI_ROUTING, encoding="utf-8") as f:
        ai_routing_text = f.read()
    has_new_id = "`opus` = `claude-opus-5-5`" in ai_routing_text
    has_old_id = "(claude-opus-5)" in ai_routing_text
    if not has_new_id or has_old_id:
        failures += 1
        print("FAIL E4 case 2: has_new_id={0} has_old_id={1}".format(has_new_id, has_old_id))

    # Cases 3 and 4 verify the splice as committed at SPLICE_COMMIT, not the working files:
    # the flanks they hash are meant to be edited after the splice (a new ruling in History,
    # any CLAUDE.md change), and pinning the live files would fail run_all at the first such
    # edit (2026-09-22 cross-review, DeepSeek finding B2-3). A history without the commit
    # (a squash merge) prints a NOTE; the splice was verified when it landed.
    if not _have_commit():
        print("NOTE E4 cases 3-4: splice commit {0} is not in this history; they were verified "
              "when it landed".format(SPLICE_COMMIT))
        ai_routing_bytes = None
    else:
        ai_routing_bytes = _show(".claude/AI_ROUTING.md")

    # 3: the History section onward is untouched, and the file ends with the entry file's bytes.
    if ai_routing_bytes is not None:
        i = ai_routing_bytes.find(HISTORY_MARK)
        segment = ai_routing_bytes[i:i + HISTORY_LEN] if i >= 0 else b""
        seg_hash = hashlib.sha256(segment).hexdigest()
        entry_bytes = _show(".planning/harness/e4/ai-routing-entry.md")
        ends_with_entry = ai_routing_bytes.endswith(entry_bytes)
        if i < 0 or seg_hash != HISTORY_HASH or not ends_with_entry:
            failures += 1
            print("FAIL E4 case 3: found={0} hash={1} ends_with_entry={2}".format(
                i >= 0, seg_hash, ends_with_entry))

    # 4: CLAUDE.md's untouched flanks match, and the middle equals the replacement file.
    if ai_routing_bytes is not None:
        claude_bytes = _show(".claude/CLAUDE.md")
        s = claude_bytes.find(MODEL_ROUTING_MARK)
        e = claude_bytes.find(ARC_SHAPE_MARK)
        before_hash = hashlib.sha256(claude_bytes[:s]).hexdigest() if s >= 0 else ""
        after_hash = hashlib.sha256(claude_bytes[e:]).hexdigest() if e >= 0 else ""
        replacement_bytes = _show(".planning/harness/e4/claude-md-routing.md")
        middle_ok = (s >= 0 and e >= 0 and claude_bytes[s:e] == replacement_bytes)
        if before_hash != BEFORE_HASH or after_hash != AFTER_HASH or not middle_ok:
            failures += 1
            print("FAIL E4 case 4: before_hash={0} after_hash={1} middle_ok={2}".format(
                before_hash, after_hash, middle_ok))

    # 5: the routing pointer file exists and names the single source.
    pointer_ok = False
    if os.path.isfile(ROUTING_POINTER):
        with open(ROUTING_POINTER, encoding="utf-8") as f:
            pointer_ok = ".claude/AI_ROUTING.md" in f.read()
    if not pointer_ok:
        failures += 1
        print("FAIL E4 case 5: {0} missing or lacks .claude/AI_ROUTING.md".format(ROUTING_POINTER))

    # 6: both edited spans are pure ASCII.
    ai_top_ascii = i >= 0 and all(b < 128 for b in ai_routing_bytes[:i])
    claude_block_ascii = s >= 0 and e >= 0 and all(b < 128 for b in claude_bytes[s:e])
    if not ai_top_ascii or not claude_block_ascii:
        failures += 1
        print("FAIL E4 case 6: ai_top_ascii={0} claude_block_ascii={1}".format(
            ai_top_ascii, claude_block_ascii))

    if failures == 0:
        print("PASS E4 6/6")
        return 0
    print("FAIL E4 {0} of 6 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
