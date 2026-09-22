# LESSONS #53 gate: watch a GLM batch's transcript for liveness. Prints counts and tool names only, never content.
# A GLM-5.3 think writes nothing to the transcript and uses no local CPU until it ends (measured 2026-09-22: 8 min 20 s,
# 31,065 output tokens, before the first action). So this reports SILENT, never "hung", and only after STALL_S seconds
# (default 900) with no new GLM message. Silence is a reason to look, not a reason to kill: check the brief's first
# action (a pointer prompt should produce one within seconds) before stopping anything.
# Usage: PYTHONIOENCODING=utf-8 python glm_watchdog.py [STALL_S] [PROJECT_DIR]
import glob, json, os, sys, time

STALL_S = int(sys.argv[1]) if len(sys.argv) > 1 else 900
PROJ = sys.argv[2] if len(sys.argv) > 2 else \
    "C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting--claude-worktrees-p106-live"
SINCE = time.time() - 300   # sessions active in the last five minutes
MAX_S = 7200                # matches the order of Harness v2's wall-clock timeout (E2, default 120 min)


def glm_counts():
    out = {}
    for p in glob.glob(PROJ + "/*.jsonl"):
        if os.path.getmtime(p) < SINCE and os.path.getctime(p) < SINCE:
            continue
        n, last_tool, is_glm = 0, "", False
        for line in open(p, encoding="utf-8", errors="replace"):
            try:
                e = json.loads(line)
            except Exception:
                continue
            m = e.get("message") if isinstance(e.get("message"), dict) else {}
            if e.get("type") == "assistant" and m and str(m.get("model", "")).lower().startswith("glm"):
                is_glm = True
                n += 1
                for b in m.get("content") or []:
                    if isinstance(b, dict) and b.get("type") == "tool_use":
                        last_tool = b.get("name")
        if is_glm or n == 0:
            out[os.path.basename(p)[:8]] = (n, last_tool)
    return out


start = time.time(); seen = {}; last_change = time.time()
while time.time() - start < MAX_S:
    for sid, (n, tool) in glm_counts().items():
        if seen.get(sid) != n:
            seen[sid] = n; last_change = time.time()
            print(time.strftime("%H:%M:%S"), sid, "glm message lines:", n, "last tool:", tool, flush=True)
    if time.time() - last_change > STALL_S:
        print("SILENT: no new GLM message for", STALL_S, "s. A think is invisible; confirm before stopping anything.",
              {k: v[0] for k, v in seen.items()}, flush=True)
        sys.exit(0)
    time.sleep(30)
print("DONE-QUIET: watchdog max time reached", flush=True)
