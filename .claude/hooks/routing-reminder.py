"""SessionStart hook: put the AI routing in front of every session in this repo.

Operator 2026-09-21: "Make sure the new chat permanetly has the deepseek in our ai routing ... We are
using lots of claude while we need to use deepseek alot, chatgpt, chatgpt, and gemeini to cut down on
how much claude we use." A routing table that lives only in a doc was skipped in practice (the Pass-124
session routed nothing to DeepSeek until told), so this prints the table and the rules into the session
context at start. It reads them from .claude/AI_ROUTING.md, the single source, so there is no second copy
to go stale. Repo-scoped by design: the operator ruled out global changes on 2026-09-20.

Never fails a session: any error prints a one-line pointer and exits 0.
"""

import io
import os
import sys


def section(text, start_heading, stop_headings):
    i = text.find(start_heading)
    if i < 0:
        return ""
    j = len(text)
    for h in stop_headings:
        k = text.find(h, i + len(start_heading))
        if 0 <= k < j:
            j = k
    return text[i:j].strip()


def main():
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    except Exception:
        pass
    # The project dir first, then this script's own tree. A desktop chat can start in the main checkout,
    # whose files lag this branch and may have no AI_ROUTING.md; the main checkout's untracked
    # settings.local.json runs this script from the worktree for exactly that case (LESSONS #49).
    here = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    roots = [os.environ.get("CLAUDE_PROJECT_DIR") or "", here]
    path = next((os.path.join(r, ".claude", "AI_ROUTING.md") for r in roots
                 if r and os.path.isfile(os.path.join(r, ".claude", "AI_ROUTING.md"))), "")
    try:
        text = open(path, encoding="utf-8").read()
    except Exception:
        print("AI ROUTING: read .claude/AI_ROUTING.md before any Agent or Workflow call "
              "(DeepSeek, Sol, Gemini first; Fable + Astra + deepseek-v4-pro confirm quality).")
        return 0
    tiers = section(text, "## The tiers: who does what", ["## Model ids", "## Commands"])
    rules = section(text, "## The rules", ["## Per-model traps", "## History"])
    print("AI ROUTING for this repo (from .claude/AI_ROUTING.md, the single source). "
          "Non-Claude models are the default for every leg they can do.")
    print()
    if tiers:
        print(tiers)
        print()
    if rules:
        print(rules)
        print()
    print("Commands, model ids and per-model traps: .claude/AI_ROUTING.md. "
          "Run get_usage now and say the numbers before any Claude fan-out.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        print("AI ROUTING: read .claude/AI_ROUTING.md before any Agent or Workflow call.")
        sys.exit(0)
