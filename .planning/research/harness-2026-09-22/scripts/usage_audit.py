#!/usr/bin/env python3
# usage_audit.py — GLM leg 1: the usage audit (harness research 2026-09-22)
#
# PRIVACY (absolute): the transcript .jsonl files hold the operator's own words and at
# least one exposed key. This script is the ONLY thing that reads them. Everything it
# writes (JSON values, and every dynamic token interpolated into the MD) must be:
#   numbers, dates, 8-char session-id prefixes, project-dir suffixes, model ids,
#   tool names, subagent_type values, the fixed class names, or the literals
#   "unset"/"main"/"unknown"/"pending". The assert_allowlist() at the end enforces
#   this and fails loudly (without echoing the offending value) if one is not.
#   Script-authored template literals (section headers, JSON keys) are constants
#   written by this file, not data, and are exempt by construction.
# Schema discovery: `python usage_audit.py --schema <file.jsonl>` prints the sorted
#   set of JSON key paths with VALUE TYPES only, for the first 300 lines. Never values.
#
# Stages (edit STAGE below): 1 = T1/T2/T10, 2 = +T3/T7/loops/top-burn, 3 = +T4/T5/T6/T8.

import os, re, sys, json, glob, base64, statistics, datetime, collections

STAGE = 3

BASE = "C:/Users/micah/.claude/projects"
PREFIX = "C--Users-micah-Code-micahjonesconsulting"
WORKTREE = "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live"
MAINCO = "C:/Users/micah/Code/micahjonesconsulting"
OUT_DIR = WORKTREE + "/.planning/research/harness-2026-09-22"

N_SESSIONS = 7
MIN_MSGS = 50
RECENT_MIN = 15

# eq weights (API list-price ratios; an ASSUMPTION about how plan limits weigh tokens)
W_IN, W_CW5, W_CW1H, W_OUT = 1.0, 1.25, 2.0, 5.0
R_FABLE, R_OPUS55, R_OTHER = 0.025, 0.05, 0.1
IMG_EXTS = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp")

NOW = datetime.datetime.now()
CUTOFF = NOW - datetime.timedelta(minutes=RECENT_MIN)

CLASSES = ["image_read", "text_read", "bash", "search", "write_edit", "agent",
           "browser_shot", "browser_other", "popup", "usage", "workflow", "skill",
           "other_mcp", "other_tool", "reply"]
TARGETS = ["handoff", "lessons", "site", "planning", "harness", "other"]

# ---------------------------------------------------------------- allow-list
ALLOWED = set(CLASSES) | set(TARGETS) | {"unset", "main", "unknown", "pending",
                                         "present", "absent", "none", "n/a"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}")
NUM_RE = re.compile(r"^-?[\d,]+(\.\d+)?%?$")
ID8_RE = re.compile(r"^[0-9a-zA-Z]{8}$")
CHECKED = [0]

# Script-authored prose constants (assumption notes, pending markers). These are
# written by this file, never derived from transcript data, so they cannot leak;
# they are declared here so assert_json_tree can hold everything else strict.
AUTHORED = set()

def authored(s):
    AUTHORED.add(s)
    return s

def S(x, kind="str"):
    """Validate one dynamic string token before it reaches an output file."""
    if isinstance(x, (int, float)):
        return x
    s = str(x)
    CHECKED[0] += 1
    if s in ALLOWED or DATE_RE.match(s) or NUM_RE.match(s) or ID8_RE.match(s):
        return s
    sys.stderr.write("ALLOW-LIST VIOLATION kind=%s len=%d (value suppressed)\n" % (kind, len(s)))
    sys.exit(2)

def assert_json_tree(o, path="$"):
    if isinstance(o, dict):
        for k, v in o.items():
            assert_json_tree(v, path + "." + str(k))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            assert_json_tree(v, path + "[%d]" % i)
    elif isinstance(o, str):
        if o not in AUTHORED:
            S(o, "json" + path)

# ---------------------------------------------------------------- helpers
def model_R(m):
    n = (m or "").replace(".", "-")
    if n.startswith("claude-fable"):
        return R_FABLE
    if n.startswith("claude-opus-5-5"):
        return R_OPUS55
    return R_OTHER

def parse_ts(s):
    try:
        return datetime.datetime.fromisoformat((s or "").replace("Z", "+00:00"))
    except Exception:
        return None

def short_ts(s):
    return (s or "")[:16]

# ---------------------------------------------------------------- schema mode
def schema_mode(path):
    keys = collections.OrderedDict()

    def tname(v):
        if isinstance(v, bool): return "bool"
        if isinstance(v, int): return "int"
        if isinstance(v, float): return "float"
        if isinstance(v, str): return "str"
        if isinstance(v, list): return "list"
        if isinstance(v, dict): return "dict"
        if v is None: return "null"
        return "?"

    def walk(o, p):
        if isinstance(o, dict):
            for k in sorted(o):
                walk(o[k], p + "." + k if p else k)
        elif isinstance(o, list):
            keys.setdefault(p + "[]", set()).add(tname(o[0]) if o else "empty")
            for v in o[:1]:
                walk(v, p + "[]")
        else:
            keys.setdefault(p, set()).add(tname(o))

    n = 0
    with open(path, encoding="utf-8", errors="replace") as fh:
        for ln in fh:
            n += 1
            if n > 300:
                break
            try:
                o = json.loads(ln)
            except ValueError:
                continue
            walk(o, "")
    for k in sorted(keys):
        print(k, ":", ",".join(sorted(keys[k])))

# ---------------------------------------------------------------- selection
TS_RE = re.compile(r'"timestamp":"([^"]+)"')
MID_RE = re.compile(r'"message":\{"id":"(msg_[^"]+)"')
MID2_RE = re.compile(r'"id":"(msg_[0-9A-Za-z_-]{8,})"')
MODEL_RE = re.compile(r'"model":"([^"]*)"')

def select_sessions():
    rows, excluded_recent = [], 0
    for d in sorted(glob.glob(os.path.join(BASE, PREFIX + "*"))):
        if not os.path.isdir(d):
            continue
        for f in glob.glob(os.path.join(d, "*.jsonl")):
            last_ts, ids = None, set()
            with open(f, encoding="utf-8", errors="replace") as fh:
                for ln in fh:
                    m = TS_RE.search(ln)
                    if m and (last_ts is None or m.group(1) > last_ts):
                        last_ts = m.group(1)
                    if '"type":"assistant"' in ln and '"usage":{"' in ln:
                        mm = MID_RE.search(ln) or MID2_RE.search(ln)
                        mo = MODEL_RE.search(ln)
                        if mm and mo and mo.group(1) != "<synthetic>":
                            ids.add(mm.group(1))
            mtime = datetime.datetime.fromtimestamp(os.stat(f).st_mtime)
            rows.append(dict(path=f.replace("\\", "/"), dir=os.path.basename(d),
                             n_unique=len(ids), last_ts=last_ts,
                             recent=mtime > CUTOFF))
    cands = [r for r in rows if r["last_ts"]]
    excluded_recent = sum(1 for r in cands if r["recent"])
    cands = [r for r in cands if not r["recent"] and r["n_unique"] >= MIN_MSGS]
    cands.sort(key=lambda r: r["last_ts"], reverse=True)
    return cands[:N_SESSIONS], excluded_recent, len(rows)

# ---------------------------------------------------------------- stream parse
def new_msg(mid, ts, side):
    return dict(mid=mid, ts=ts, side=side, model=None,
                tin=0, cw=0, cw5=0, cw1=0, cr=0, out=0,
                tools=[], agent_calls=[], img_tuids=set(),
                boundary_before=False)

def parse_stream(path, stream_key, side_default=False):
    """Parse one transcript file into an ordered list of unique assistant messages.
    Returns (msgs, info). Never keeps text/thinking/tool-result content."""
    msgs, seen = [], {}
    info = dict(lines=0, json_errors=0, assistant_lines=0, lines_with_usage=0,
                side_lines=0, compact_markers=0, cwd_seq=[], session_ids=set(),
                agent_ids=set(), first_ts=None, last_ts=None)
    pending_compact = False
    cur_run = None  # current inline-sidechain run (list of msgs) or None
    runs = []
    tuid_imgs = {}  # tool_use_id -> [count, est_tokens]
    agent_results = {}  # agent tool_use_id -> result ts
    agent_tuids_seen = set()

    def handle_assistant(e, ts, side):
        nonlocal pending_compact
        msg = e.get("message") or {}
        mid = msg.get("id") or e.get("requestId") or e.get("messageId") or e.get("promptId")
        if mid is None:
            return
        u = msg.get("usage") or {}
        model = msg.get("model")
        target = msgs
        if side and not side_default:
            if cur_run is None:
                cur_run = []
                runs.append(cur_run)
            target = cur_run
        else:
            cur_run = None
        m = seen.get(mid)
        if m is None:
            m = new_msg(mid, ts, side)
            m["model"] = model if model and model != "<synthetic>" else None
            if pending_compact:
                m["boundary_before"] = True
                pending_compact = False
            seen[mid] = m
            target.append(m)
        # usage: take once, from the first line that carries it
        if u and not m.get("_u_done"):
            m["_u_done"] = True
            m["tin"] = u.get("input_tokens", 0) or 0
            m["cw"] = u.get("cache_creation_input_tokens", 0) or 0
            cc = u.get("cache_creation") or {}
            m["cc_split"] = bool(cc)
            if cc:
                m["cw5"] = cc.get("ephemeral_5m_input_tokens", 0) or 0
                m["cw1"] = cc.get("ephemeral_1h_input_tokens", 0) or 0
                leftover = m["cw"] - m["cw5"] - m["cw1"]
                if leftover > 0:
                    m["cw5"] += leftover
            else:
                m["cw5"] = m["cw"]
                m["cw1"] = 0
            m["cr"] = u.get("cache_read_input_tokens", 0) or 0
            m["out"] = u.get("output_tokens", 0) or 0
        # tool_use blocks: union across duplicate lines, dedup by block id
        content = msg.get("content")
        if isinstance(content, list):
            seen_tuids = set(t[0] for t in m["tools"])
            for b in content:
                if not isinstance(b, dict) or b.get("type") != "tool_use":
                    continue
                tuid = b.get("id")
                if tuid is not None and tuid in seen_tuids:
                    continue
                if tuid is not None:
                    seen_tuids.add(tuid)
                inp = b.get("input") if isinstance(b.get("input"), dict) else {}
                rec = dict(name=b.get("name") or "unknown",
                           file_path=inp.get("file_path") or inp.get("notebook_path"),
                           model_req=inp.get("model"),
                           satype=inp.get("subagent_type"),
                           tuid=tuid, ts=ts)
                m["tools"].append((tuid, rec))
                ALLOWED.add(str(rec["name"]))
                if rec["satype"]:
                    ALLOWED.add(str(rec["satype"]))
                if rec["model_req"]:
                    ALLOWED.add(str(rec["model_req"]))
                if rec["name"] in ("Agent", "Task"):
                    m["agent_calls"].append(rec)
                    if tuid:
                        agent_tuids_seen.add(tuid)
                if rec["file_path"]:
                    rec["_fp_norm"] = str(rec["file_path"]).replace("\\", "/").lower()

    with open(path, encoding="utf-8", errors="replace") as fh:
        for ln in fh:
            info["lines"] += 1
            if not ('"type":"assistant"' in ln or '"type":"user"' in ln
                    or '"type":"summary"' in ln or "isCompactSummary" in ln):
                continue
            try:
                e = json.loads(ln)
            except ValueError:
                info["json_errors"] += 1
                continue
            ts = e.get("timestamp")
            if ts:
                if info["first_ts"] is None:
                    info["first_ts"] = ts
                info["last_ts"] = ts
            if e.get("sessionId"):
                info["session_ids"].add(e["sessionId"])
            if e.get("agentId"):
                info["agent_ids"].add(e["agentId"])
            cwd = e.get("cwd")
            if cwd:
                info["cwd_seq"].append((ts, str(cwd).replace("\\", "/")))
            etype = e.get("type")
            side = bool(e.get("isSidechain")) or side_default
            if side:
                info["side_lines"] += 1
            if etype == "summary" or e.get("isCompactSummary"):
                info["compact_markers"] += 1
                pending_compact = True
                continue
            if etype == "assistant":
                info["assistant_lines"] += 1
                msg = e.get("message") or {}
                if msg.get("usage"):
                    info["lines_with_usage"] += 1
                if msg.get("model") == "<synthetic>":
                    continue
                handle_assistant(e, ts, side)
            elif etype == "user":
                msg = e.get("message") or {}
                content = msg.get("content")
                if isinstance(content, list):
                    for b in content:
                        if not isinstance(b, dict) or b.get("type") != "tool_result":
                            continue
                        tid = b.get("tool_use_id")
                        if tid in agent_tuids_seen and tid not in agent_results:
                            agent_results[tid] = ts
                        bc = b.get("content")
                        if isinstance(bc, list):
                            for ib in bc:
                                if isinstance(ib, dict) and ib.get("type") == "image":
                                    est = img_tokens(ib)
                                    slot = tuid_imgs.setdefault(tid, [0, 0])
                                    slot[0] += 1
                                    slot[1] += est
    # attach image info + agent result ts to the messages that made the calls
    allm = list(msgs)
    for r in runs:
        allm.extend(r)
    for m in allm:
        for rec in m["agent_calls"]:
            if rec.get("tuid") in agent_results:
                rec["result_ts"] = agent_results[rec["tuid"]]
        for tuid, rec in m["tools"]:
            if tuid in tuid_imgs:
                m["img_tuids"].add(tuid)
    return msgs, runs, info, tuid_imgs

def img_tokens(ib):
    src = ib.get("source") or {}
    data = src.get("data") or ""
    w = h = 0
    try:
        raw = base64.b64decode(data[:87380] + "====")  # ~64KB of header is enough
        if raw[:8] == b"\x89PNG\r\n\x1a\n" and len(raw) >= 24:
            w = int.from_bytes(raw[16:20], "big")
            h = int.from_bytes(raw[20:24], "big")
        elif raw[:2] == b"\xff\xd8":
            i = 2
            while i + 9 < len(raw):
                if raw[i] != 0xFF:
                    i += 1
                    continue
                mk = raw[i + 1]
                if mk in (0xC0, 0xC2):
                    h = int.from_bytes(raw[i + 5:i + 7], "big")
                    w = int.from_bytes(raw[i + 7:i + 9], "big")
                    break
                seg = int.from_bytes(raw[i + 2:i + 4], "big")
                i += 2 + seg
    except Exception:
        pass
    if not w or not h:
        w = h = 28  # unknown -> 1 tile
    est = ((w + 27) // 28) * ((h + 27) // 28)
    return min(est, 4784)

# ---------------------------------------------------------------- main run
def main():
    os.makedirs(OUT_DIR + "/scripts", exist_ok=True)
    chosen, excluded_recent, total_files = select_sessions()
    print("selection: %d files scanned, %d excluded as modified <15min, chosen %d"
          % (total_files, excluded_recent, len(chosen)))

    sessions = []
    for c in chosen:
        sid = os.path.splitext(os.path.basename(c["path"]))[0]
        d_suffix = c["dir"][len(PREFIX):] or "-main"
        ALLOWED.add(d_suffix)
        ALLOWED.add(sid[:8])
        main_msgs, inline_runs, info, tuid_imgs = parse_stream(c["path"], sid)
        # (tuid_imgs for the MAIN file also covers its inline sidechain runs)
        subs = []
        sub_dir = os.path.join(os.path.dirname(c["path"]), sid, "subagents")
        for sf in sorted(glob.glob(os.path.join(sub_dir, "*.jsonl"))):
            s_msgs, s_runs, s_info, s_timgs = parse_stream(sf, sf, side_default=True)
            agent_type = None
            meta = sf[:-6] + ".meta.json"
            if os.path.exists(meta):
                try:
                    mo = json.load(open(meta, encoding="utf-8", errors="replace"))
                    if isinstance(mo, dict) and mo.get("agentType"):
                        agent_type = str(mo["agentType"])
                        ALLOWED.add(agent_type)
                except Exception:
                    pass
            subs.append(dict(path=sf, msgs=s_msgs, info=s_info, tuid_imgs=s_timgs,
                             agent_id=(list(s_info["agent_ids"]) or [None])[0],
                             agent_type=agent_type,
                             stem=os.path.basename(sf)[:-6]))
        for r in inline_runs:
            subs.append(dict(path=None, msgs=r, run_id=len(subs) + 1))
        sessions.append(dict(sid=sid, id8=sid[:8], dir_suffix=d_suffix,
                             msgs=main_msgs, info=info, subs=subs,
                             tuid_imgs=tuid_imgs,
                             n_unique_sel=c["n_unique"]))

    # ---- per-message derived numbers
    cw_split_absent = 0
    for s in sessions:
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                if not m.get("_eq_done"):
                    m["_eq_done"] = True
                    m["ctx"] = m["tin"] + m["cw"] + m["cr"]
                    R = model_R(m["model"])
                    m["R"] = R
                    m["eq"] = (m["tin"] * W_IN + m["cw5"] * W_CW5
                               + m["cw1"] * W_CW1H + m["cr"] * R
                               + m["out"] * W_OUT)
                if m["cw"] and not m.get("cc_split"):
                    cw_split_absent += 1
                if not m.get("model"):
                    m["model"] = "unknown"

    # ---- classification + carry (stage 2)
    def write_target(rec):
        norm = rec.get("_fp_norm") or ""
        if "lessons" in norm:
            return "lessons"
        if any(k in norm for k in ("resume", "kickoff", "handoff")) or "/briefs/" in norm:
            return "handoff"
        if ".planning" in norm:
            return "planning"
        segs = ("/app/", "/components/", "/content/", "/lib/", "/public/", "/styles/")
        starts = ("app/", "components/", "content/", "lib/", "public/", "styles/")
        if any(x in norm for x in segs) or norm.startswith(starts):
            return "site"
        if ("/.claude/" in norm or "/scripts/" in norm
                or norm.startswith((".claude/", "scripts/"))):
            return "harness"
        return "other"

    def tool_class(rec):
        name = rec["name"]
        ln = name.lower()
        if name == "Read":
            fp = rec.get("_fp_norm") or ""
            return "image_read" if fp.endswith(IMG_EXTS) else "text_read"
        if name in ("Bash", "PowerShell"):
            return "bash"
        if name in ("Grep", "Glob", "ToolSearch"):
            return "search"
        if name in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
            return "write_edit:" + write_target(rec)
        if name in ("Agent", "Task"):
            return "agent"
        if name == "AskUserQuestion":
            return "popup"
        if "get_usage" in ln:
            return "usage"
        if name == "Workflow":
            return "workflow"
        if name == "Skill":
            return "skill"
        if "mcp__" in ln:
            fam = any(k in ln for k in ("browser", "chrome", "playwright"))
            shot = any(k in ln for k in ("screenshot", "zoom"))
            if fam and shot:
                return "browser_shot"
            if fam:
                return "browser_other"
            return "other_mcp"
        return "other_tool"

    def classify_msg(m):
        cs = set()
        for tuid, rec in m["tools"]:
            c = tool_class(rec)
            ALLOWED.add(c)
            cs.add(c)
        return cs or {"reply"}

    def compute_carry(stream):
        """Boundaries, deltas, carry. Returns (compactions, negatives)."""
        n = len(stream)
        B = set(i for i, m in enumerate(stream) if m.get("boundary_before"))
        for i in range(1, n):
            if i not in B and stream[i]["ctx"] < 0.6 * max(stream[i - 1]["ctx"], 1):
                B.add(i)
        negatives = 0
        b_list = sorted(B)
        for i, m in enumerate(stream):
            m["carry"] = 0.0
            if i + 1 >= n or (i + 1) in B:
                continue
            raw = stream[i + 1]["ctx"] - m["ctx"] - m["out"]
            if raw < 0:
                negatives += 1
                continue
            nxt = next((b for b in b_list if b > i), n)
            count = nxt - 1 - i
            if count > 0:
                m["carry"] = raw * count * m["R"]
        return len(B), negatives

    negatives_total = 0
    for s in sessions:
        comp_main, ng = compute_carry(s["msgs"])
        s["compactions_main"] = comp_main
        negatives_total += ng
        for x in s["subs"]:
            _, ng = compute_carry(x["msgs"])
            negatives_total += ng
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                m["classes"] = classify_msg(m)

    # ---- T1 per session
    t1 = []
    for s in sessions:
        mm = s["msgs"]
        models = collections.Counter(m["model"] for m in mm)
        main_model = models.most_common(1)[0][0] if models else "unknown"
        ALLOWED.add(main_model)
        peak = max((m["ctx"] for m in mm), default=0)
        compacts = s["compactions_main"]
        sums = dict(tin=sum(m["tin"] for m in mm), cw=sum(m["cw"] for m in mm),
                    cr=sum(m["cr"] for m in mm), out=sum(m["out"] for m in mm))
        eq_main = sum(m["eq"] for m in mm)
        eq_sub = sum(m["eq"] for x in s["subs"] for m in x["msgs"])
        t1.append(dict(id8=s["id8"], dir=s["dir_suffix"],
                       first=short_ts(s["info"]["first_ts"]),
                       last=short_ts(s["info"]["last_ts"]),
                       model=main_model, msgs=len(mm), peak_ctx=peak,
                       compactions=compacts, **sums,
                       eq_main=round(eq_main), eq_sub=round(eq_sub),
                       eq_total=round(eq_main + eq_sub),
                       assistant_lines=s["info"]["assistant_lines"],
                       lines_with_usage=s["info"]["lines_with_usage"],
                       json_errors=s["info"]["json_errors"],
                       subagent_msgs=sum(len(x["msgs"]) for x in s["subs"])))

    # ---- T2 by model (all streams)
    by_model = collections.defaultdict(lambda: collections.Counter())
    for s in sessions:
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                c = by_model[m["model"]]
                c["msgs"] += 1
                c["tin"] += m["tin"]; c["cw"] += m["cw"]
                c["cr"] += m["cr"]; c["out"] += m["out"]
                c["eq"] += m["eq"]
    grand_eq = sum(c["eq"] for c in by_model.values())
    t2 = []
    for mod in sorted(by_model, key=lambda k: -by_model[k]["eq"]):
        ALLOWED.add(mod)
        c = by_model[mod]
        t2.append(dict(model=mod, msgs=c["msgs"], tin=c["tin"], cw=c["cw"],
                       cr=c["cr"], out=c["out"], eq=round(c["eq"]),
                       share=round(100.0 * c["eq"] / grand_eq, 1) if grand_eq else 0))

    # ---- T3 by tool class (main sessions only)
    t3 = collections.defaultdict(lambda: dict(calls=0.0, eq=0.0, carry=0.0))
    for s in sessions:
        for m in s["msgs"]:
            cs = sorted(m["classes"])
            share = 1.0 / len(cs)
            for c in cs:
                row = t3[c]
                row["calls"] += share
                row["eq"] += m["eq"] * share
                row["carry"] += m["carry"] * share
    t3_list = [dict(class_name=c, calls=round(v["calls"], 1), direct_eq=round(v["eq"]),
                    carry=round(v["carry"]),
                    share_direct=round(100.0 * v["eq"] / grand_eq, 1) if grand_eq else 0,
                    share_with_carry=round(100.0 * (v["eq"] + v["carry"]) / grand_eq, 1)
                    if grand_eq else 0)
               for c, v in sorted(t3.items(), key=lambda kv: -(kv[1]["eq"] + kv[1]["carry"]))]

    # ---- T7 long context (all streams)
    def t7stats(threshold):
        eqs = calls = 0
        for s in sessions:
            for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
                for m in stream:
                    if m["ctx"] > threshold:
                        eqs += m["eq"]
                        calls += 1
        return dict(calls=calls, eq=round(eqs),
                    share=round(100.0 * eqs / grand_eq, 1) if grand_eq else 0)
    t7 = dict(gt200k=t7stats(200000), gt400k=t7stats(400000))

    # ---- loops (verify/exec runs)
    LOOPSET = {"bash", "browser_shot", "browser_other", "search", "text_read"}
    loops = []
    for s in sessions:
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            run = []
            for m in list(stream) + [None]:
                if m is not None and m["classes"] and m["classes"] <= LOOPSET:
                    run.append(m)
                    continue
                if len(run) >= 5:
                    loops.append(dict(id8=s["id8"], length=len(run),
                                      eq=round(sum(x["eq"] for x in run)),
                                      carry=round(sum(x["carry"] for x in run))))
                run = []
    loops_eq = sum(l["eq"] for l in loops)
    loops_out = dict(count=len(loops),
                     lengths=sorted((l["length"] for l in loops), reverse=True),
                     eq=round(loops_eq),
                     share=round(100.0 * loops_eq / grand_eq, 1) if grand_eq else 0)

    # ---- top burn patterns: (session, class) by direct+carry
    burn = collections.defaultdict(lambda: dict(eq=0.0, carry=0.0))
    for s in sessions:
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                cs = sorted(m["classes"])
                share = 1.0 / len(cs)
                for c in cs:
                    b = burn[(s["id8"], c)]
                    b["eq"] += m["eq"] * share
                    b["carry"] += m["carry"] * share
    top_burn = [dict(id8=k[0], class_name=k[1], direct_eq=round(v["eq"]),
                     carry=round(v["carry"]), total=round(v["eq"] + v["carry"]),
                     share=round(100.0 * (v["eq"] + v["carry"]) / grand_eq, 1)
                     if grand_eq else 0)
                for k, v in sorted(burn.items(),
                                   key=lambda kv: -(kv[1]["eq"] + kv[1]["carry"]))[:10]]

    # ---- T4 images per session (stage 3)
    t4 = []
    for s in sessions:
        cnt = est = 0
        for mp in [s["tuid_imgs"]] + [x.get("tuid_imgs") or {} for x in s["subs"]]:
            for cimg, eimg in mp.values():
                cnt += cimg
                est += eimg
        carry_img = 0.0
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                if m["img_tuids"]:
                    carry_img += m["carry"]
        t4.append(dict(id8=s["id8"], images=cnt, est_tokens=est,
                       carry=round(carry_img)))

    # ---- T5 subagents (stage 3): requested vs actual model
    def alias_match(requested, actual):
        if requested in (None, "unset"):
            return True
        r = str(requested).replace(".", "-").lower()
        for a in actual:
            n = a.replace(".", "-").lower()
            if n == r or n.startswith("claude-" + r) or r in n:
                return True
        return False

    def match_agent_call(s, run_first, run_last):
        cands = []
        for m in s["msgs"]:
            for rec in m["agent_calls"]:
                c0 = rec.get("ts")
                r0 = rec.get("result_ts")
                if c0 and c0 <= run_first and (not r0 or r0 >= run_last):
                    cands.append((c0, rec))
        return max(cands, key=lambda x: x[0])[1] if cands else None

    t5, unmatched_subs = [], 0
    for s in sessions:
        for x in s["subs"]:
            msgs = [m for m in x["msgs"] if m.get("ts")]
            if not msgs:
                continue
            first = min(m["ts"] for m in msgs)
            last = max(m["ts"] for m in msgs)
            rec = match_agent_call(s, first, last)
            requested = (rec or {}).get("model_req") or "unset"
            satype = (rec or {}).get("satype") or x.get("agent_type") or "unset"
            actual = sorted(set(m["model"] for m in msgs))
            t5.append(dict(parent=s["id8"], requested=requested, actual=actual,
                           subagent_type=satype, messages=len(msgs),
                           tool_calls=sum(len(m["tools"]) for m in msgs),
                           images=sum(v[0] for v in (x.get("tuid_imgs") or {}).values()),
                           sum_ctx=sum(m["ctx"] for m in msgs),
                           last_ctx=msgs[-1]["ctx"],
                           eq=round(sum(m["eq"] for m in msgs)),
                           mismatch=not alias_match(requested, actual)))
            if rec is None:
                unmatched_subs += 1
    t5.sort(key=lambda r: -r["eq"])

    # ---- T6 fixed prefix (stage 3)
    t6 = []
    for s in sessions:
        ctxs = [m["ctx"] for m in s["msgs"][:3]]
        t6.append(dict(id8=s["id8"], first_ctx=ctxs[0] if ctxs else 0,
                       median_first3=int(statistics.median(ctxs)) if ctxs else 0))

    # ---- T8 instruction files + double load (stage 3)
    def fsize(p):
        try:
            return os.path.getsize(p)
        except OSError:
            return 0
    g_path = "C:/Users/micah/.claude/CLAUDE.md"
    wt_paths = [WORKTREE + n for n in ("/CLAUDE.md", "/AGENTS.md", "/.claude/CLAUDE.md")]
    mc_paths = [MAINCO + n for n in ("/CLAUDE.md", "/AGENTS.md", "/.claude/CLAUDE.md")]
    mem_path = BASE + "/" + PREFIX + "/memory/MEMORY.md"
    b_global, b_wt = fsize(g_path), sum(fsize(p) for p in wt_paths)
    b_mc, b_mem = sum(fsize(p) for p in mc_paths), fsize(mem_path)
    calib_bytes = b_global + b_wt + b_mem
    tpb = 9660.0 / calib_bytes if calib_bytes else 0.0
    main_stack_tokens = round(b_mc * tpb)
    MLC = (MAINCO + "/").replace("\\", "/").lower()
    t8 = dict(bytes=dict(global_=b_global, worktree=b_wt, main_checkout=b_mc,
                         memory=b_mem),
              calibration=authored("app Memory-files reading 9,660 tokens = global + worktree stack + MEMORY.md"),
              tokens_per_byte=round(tpb, 6),
              main_checkout_est_tokens=main_stack_tokens,
              double_load=[])
    t1_by_id8 = {r["id8"]: r for r in t1}
    for s in sessions:
        seq = s["info"]["cwd_seq"]
        move_ts = None
        for i in range(1, len(seq)):
            a = seq[i - 1][1].rstrip("/").lower()
            b = seq[i][1].rstrip("/").lower()
            if a == MLC.rstrip("/") and b.startswith(MLC + ".claude/worktrees"):
                move_ts = seq[i][0]
                break
        if move_ts:
            calls_after = sum(1 for m in s["msgs"] if m["ts"] and m["ts"] > move_ts)
            Rmain = model_R(t1_by_id8[s["id8"]]["model"])
            t8["double_load"].append(dict(
                id8=s["id8"], moved_at=short_ts(move_ts), calls_after=calls_after,
                R=Rmain, extra_cache_read_eq=round(main_stack_tokens * calls_after * Rmain)))

    # ---- anchors (stage 3)
    anchors = dict(fable_jurors=[])
    for r in t5:
        if any(a.startswith("claude-fable") for a in r["actual"]):
            anchors["fable_jurors"].append(r)

    # ---- T10 checks
    # exact reconciliation via raw messages
    raw_in = raw_cw = raw_cr = raw_out = 0
    for s in sessions:
        for stream in [s["msgs"]] + [x["msgs"] for x in s["subs"]]:
            for m in stream:
                raw_in += m["tin"]; raw_cw += m["cw"]
                raw_cr += m["cr"]; raw_out += m["out"]
    recon = (raw_in == sum(c["tin"] for c in by_model.values())
             and raw_cw == sum(c["cw"] for c in by_model.values())
             and raw_cr == sum(c["cr"] for c in by_model.values())
             and raw_out == sum(c["out"] for c in by_model.values()))
    t10 = dict(session_vs_model_reconciles=bool(recon),
               grand=dict(tin=raw_in, cw=raw_cw, cr=raw_cr, out=raw_out,
                          eq=round(grand_eq)),
               cw_split_absent=cw_split_absent,
               carry_negatives_clamped=negatives_total if STAGE >= 2 else None,
               subagents_total=len(t5) if STAGE >= 3 else None,
               subagents_unmatched_to_agent_call=unmatched_subs if STAGE >= 3 else None,
               anchors=anchors if STAGE >= 3 else None,
               json_errors_total=sum(r["json_errors"] for r in t1),
               stage=STAGE)

    # ---- outputs
    out = collections.OrderedDict()
    out["stage"] = STAGE
    out["assumptions"] = authored(
        "eq weights are API list-price ratios (in x1, cw5m x1.25, cw1h x2, out x5, "
        "cr x R with R=0.025 fable / 0.05 opus-5-5 / 0.1 other) — an assumption "
        "about plan-limit weighting, not an invoice")
    out["selection"] = dict(files_scanned=total_files,
                            excluded_recent=excluded_recent,
                            min_msgs=MIN_MSGS, n_chosen=len(sessions))
    out["T1_sessions"] = t1
    out["T2_by_model"] = t2
    out["T3_by_tool_class"] = t3_list if STAGE >= 2 else authored("pending (stage 2)")
    out["T4_images"] = t4 if STAGE >= 3 else authored("pending (stage 3)")
    out["T5_subagents"] = t5 if STAGE >= 3 else authored("pending (stage 3)")
    out["T6_fixed_prefix"] = t6 if STAGE >= 3 else authored("pending (stage 3)")
    out["T7_long_context"] = t7 if STAGE >= 2 else authored("pending (stage 2)")
    out["T8_instruction_files"] = t8 if STAGE >= 3 else authored("pending (stage 3)")
    out["top_burn"] = top_burn if STAGE >= 2 else authored("pending (stage 2)")
    out["loops"] = loops_out if STAGE >= 2 else authored("pending (stage 2)")
    out["T10_checks"] = t10

    with open(OUT_DIR + "/00-usage-audit.json", "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=1)

    md = []
    md.append("# 00 usage audit (harness research 2026-09-22, GLM leg 1)")
    md.append("")
    md.append("Stage %d. eq = list-price weighting (assumption, see JSON). " % STAGE
              + "Sessions: the %d most recent with >=%d unique assistant messages; "
              "files modified <15min excluded (%d)." % (N_SESSIONS, MIN_MSGS, excluded_recent))
    md.append("")
    md.append("## 1. TOP BURN PATTERNS")
    md.append("")
    if STAGE < 2:
        md.append("pending (stage 2)")
    else:
        md.append("10 largest (session x tool class) by eq = direct + carry. "
                  "Share = total / grand direct eq (carry is an attribution of cost "
                  "already inside later calls' cr, so shares can exceed the direct sum).")
        md.append("")
        md.append("| # | session | class | direct eq | carry | total | share |")
        md.append("|---|---|---|---|---|---|---|")
        for i, r in enumerate(top_burn, 1):
            md.append("| %d | %s | %s | %s | %s | %s | %s%% |" % (
                i, S(r["id8"], "id8"), S(r["class_name"], "class"),
                S("{:,}".format(r["direct_eq"]), "num"),
                S("{:,}".format(r["carry"]), "num"),
                S("{:,}".format(r["total"]), "num"),
                S("%.1f" % r["share"], "num")))
    md.append("")
    md.append("## 2. T1 sessions")
    md.append("")
    md.append("| id8 | dir | first | last | model | msgs | peak ctx | compact | in | cw | cr | out | eq main | eq sub |")
    md.append("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for r in t1:
        md.append("| %s | %s | %s | %s | %s | %d | %s | %d | %s | %s | %s | %s | %s | %s |" % (
            S(r["id8"], "id8"), S(r["dir"], "dir"), S(r["first"], "date"),
            S(r["last"], "date"), S(r["model"], "model"), r["msgs"],
            S("{:,}".format(r["peak_ctx"]), "num"), r["compactions"],
            S("{:,}".format(r["tin"]), "num"), S("{:,}".format(r["cw"]), "num"),
            S("{:,}".format(r["cr"]), "num"), S("{:,}".format(r["out"]), "num"),
            S("{:,}".format(r["eq_main"]), "num"), S("{:,}".format(r["eq_sub"]), "num")))
    md.append("")
    md.append("## 3. T3 by tool class (main sessions)")
    md.append("")
    if STAGE < 2:
        md.append("pending (stage 2)")
    else:
        md.append("| class | calls | direct eq | carry | share (direct) | share (+carry) |")
        md.append("|---|---|---|---|---|---|")
        for r in t3_list:
            md.append("| %s | %s | %s | %s | %s%% | %s%% |" % (
                S(r["class_name"], "class"), S("%.1f" % r["calls"], "num"),
                S("{:,}".format(r["direct_eq"]), "num"),
                S("{:,}".format(r["carry"]), "num"),
                S("%.1f" % r["share_direct"], "num"),
                S("%.1f" % r["share_with_carry"], "num")))
    md.append("")
    md.append("## 4. T4 images per session")
    md.append("")
    if STAGE < 3:
        md.append("pending (stage 3)")
    else:
        md.append("| session | image blocks | est tokens (28px tiles, cap 4784) | carry of image-bearing results |")
        md.append("|---|---|---|---|")
        for r in t4:
            md.append("| %s | %d | %s | %s |" % (
                S(r["id8"], "id8"), r["images"],
                S("{:,}".format(r["est_tokens"]), "num"),
                S("{:,}".format(r["carry"]), "num")))
    md.append("")
    md.append("## 5. T5 subagents")
    md.append("")
    if STAGE < 3:
        md.append("pending (stage 3)")
    else:
        md.append("%d subagent runs; %d not matched to a parent Agent call by "
                  "timestamp window. All requested/actual mismatches, then the 12 "
                  "largest by eq. (requested = Agent input.model; actual = models "
                  "in the subagent transcript.)" % (len(t5), unmatched_subs))
        mm = [r for r in t5 if r["mismatch"]]
        md.append("")
        md.append("MISMATCHES: %d" % len(mm))
        for r in mm:
            md.append("- parent %s type=%s requested=%s actual=%s" % (
                S(r["parent"], "id8"), S(r["subagent_type"], "satype"),
                S(str(r["requested"]), "model"),
                S(",".join(r["actual"]), "model")))
        md.append("")
        md.append("| parent | type | requested | actual | msgs | tools | imgs | sum ctx | last ctx | eq |")
        md.append("|---|---|---|---|---|---|---|---|---|---|")
        for r in t5[:12]:
            md.append("| %s | %s | %s | %s | %d | %d | %d | %s | %s | %s |" % (
                S(r["parent"], "id8"), S(r["subagent_type"], "satype"),
                S(str(r["requested"]), "model"), S(",".join(r["actual"]), "model"),
                r["messages"], r["tool_calls"], r["images"],
                S("{:,}".format(r["sum_ctx"]), "num"),
                S("{:,}".format(r["last_ctx"]), "num"),
                S("{:,}".format(r["eq"]), "num")))
    md.append("")
    md.append("## 6. T6 fixed prefix")
    md.append("")
    if STAGE < 3:
        md.append("pending (stage 3)")
    else:
        md.append("| session | first assistant ctx | median of first three |")
        md.append("|---|---|---|")
        for r in t6:
            md.append("| %s | %s | %s |" % (
                S(r["id8"], "id8"),
                S("{:,}".format(r["first_ctx"]), "num"),
                S("{:,}".format(r["median_first3"]), "num")))
        med = [r["median_first3"] for r in t6]
        md.append("")
        md.append("median across sessions of the first-three median: %s"
                  % S("{:,}".format(int(statistics.median(med))) if med else "0", "num"))
    md.append("")
    md.append("## 7. T7 long context")
    md.append("")
    if STAGE < 2:
        md.append("pending (stage 2)")
    else:
        for k, lab in (("gt200k", "ctx > 200K"), ("gt400k", "ctx > 400K")):
            md.append("- %s: %d calls, eq %s (%s%% of grand eq)" % (
                lab, t7[k]["calls"], S("{:,}".format(t7[k]["eq"]), "num"),
                S("%.1f" % t7[k]["share"], "num")))
    md.append("")
    md.append("## 8. T8 instruction files")
    md.append("")
    if STAGE < 3:
        md.append("pending (stage 3)")
    else:
        md.append("Calibration: global + worktree stack + MEMORY.md = %s bytes = "
                  "9,660 tokens (the app's Memory-files reading) -> %s tokens/byte."
                  % (S("{:,}".format(calib_bytes), "num"), S("%.6f" % tpb, "num")))
        md.append("Stack bytes: global %s · worktree %s · main checkout %s · memory %s."
                  % tuple(S("{:,}".format(x), "num")
                          for x in (b_global, b_wt, b_mc, b_mem)))
        md.append("Main-checkout stack estimate: %s tokens (vs worktree stack %s)."
                  % (S("{:,}".format(main_stack_tokens), "num"),
                     S("{:,}".format(round(b_wt * tpb)), "num")))
        if t8["double_load"]:
            md.append("Double-load sessions (cwd moved main -> worktree mid-session):")
            for r in t8["double_load"]:
                md.append("- %s at %s: %d calls after the move x main-stack %s tokens "
                          "x R=%.3f = %s extra eq" % (
                              S(r["id8"], "id8"), S(r["moved_at"], "date"),
                              r["calls_after"],
                              S("{:,}".format(main_stack_tokens), "num"), r["R"],
                              S("{:,}".format(r["extra_cache_read_eq"]), "num")))
        else:
            md.append("No selected session moved main -> worktree mid-session.")
    md.append("")
    md.append("## 9. Loops (verify/exec)")
    md.append("")
    if STAGE < 2:
        md.append("pending (stage 2)")
    else:
        md.append("- %d loops of >=5 consecutive exec/verify-only messages; eq %s "
                  "(%s%% of grand eq); lengths (desc): %s" % (
                      loops_out["count"], S("{:,}".format(loops_out["eq"]), "num"),
                      S("%.1f" % loops_out["share"], "num"),
                      S(",".join(str(x) for x in loops_out["lengths"][:25]), "num")))
    md.append("")
    md.append("## 10. Checks (T10)")
    md.append("")
    md.append("- session-vs-model totals reconcile: %s" % ("YES" if recon else "NO"))
    md.append("- grand: in=%s cw=%s cr=%s out=%s eq=%s" % tuple(
        S("{:,}".format(x), "num") for x in (raw_in, raw_cw, raw_cr, raw_out, round(grand_eq))))
    md.append("- cache_creation 5m/1h split absent on %d messages (all cw weighted 1.25)"
              % cw_split_absent)
    if STAGE >= 2:
        md.append("- carry deltas clamped at 0: %d negative deltas counted" % negatives_total)
    if STAGE >= 3:
        vals = ", ".join("%s %s" % (S(r["id8"], "id8"),
                                    S("{:,}".format(r["first_ctx"]), "num")) for r in t6)
        md.append("- anchor first-call ctx 70-80K: first-ctx values %s" % vals)
        imgs = ", ".join("%s %d" % (S(r["id8"], "id8"), r["images"]) for r in t4)
        md.append("- anchor about 23 images opened (Pass-128c): per-session counts %s"
                  % imgs)
        best_img = min(t4, key=lambda r: abs(r["images"] - 23)) if t4 else None
        if best_img:
            pk = t1_by_id8[best_img["id8"]]["peak_ctx"]
            md.append("- anchor peak about 456K (Pass-128c): best image-count match %s "
                      "peak ctx %s vs anchor 456,000 (%s%% over)"
                      % (S(best_img["id8"], "id8"), S("{:,}".format(pk), "num"),
                         S("%.0f" % (100.0 * (pk - 456000) / 456000), "num")))
        fj_anchor = [r for r in anchors["fable_jurors"]
                     if r["tool_calls"] == 7
                     or abs(r["last_ctx"] - 134828) <= 134828 * 0.05
                     or abs(r["sum_ctx"] - 134828) <= 134828 * 0.05]
        for r in fj_anchor:
            verdict = ("sum-of-ctx" if abs(r["sum_ctx"] - 134828) <= 134828 * 0.05
                       else "last-ctx" if abs(r["last_ctx"] - 134828) <= 134828 * 0.05
                       else "neither")
            ALLOWED.add(verdict)
            md.append("- anchor fable juror 134,828 tokens / 7 tool uses: parent %s "
                      "type %s actual %s sum_ctx %s last_ctx %s tools %d -> matches %s"
                      % (S(r["parent"], "id8"), S(r["subagent_type"], "satype"),
                         S(",".join(r["actual"]), "model"),
                         S("{:,}".format(r["sum_ctx"]), "num"),
                         S("{:,}".format(r["last_ctx"]), "num"), r["tool_calls"],
                         verdict))
        md.append("- (%d more fable subagent rows in the JSON, none with 7 tool uses "
                  "or a 134,828 match)" % (len(anchors["fable_jurors"]) - len(fj_anchor)))
        md.append("- subagent runs: %d total, %d unmatched to a parent Agent call"
                  % (len(t5), unmatched_subs))
    md.append("- assistant lines vs unique messages (main, per session): "
              + "; ".join("%s %d/%d" % (S(r["id8"], "id8"), r["assistant_lines"], r["msgs"])
                          for r in t1))
    md.append("- json parse errors: %d" % t10["json_errors_total"])
    md.append("")
    with open(OUT_DIR + "/00-usage-audit.md", "w", encoding="utf-8") as fh:
        fh.write("\n".join(md) + "\n")

    # ---- final allow-list assertion
    assert_json_tree(json.load(open(OUT_DIR + "/00-usage-audit.json", encoding="utf-8")))
    print("wrote 00-usage-audit.md + .json; allow-list assertion passed (%d dynamic strings checked)"
          % CHECKED[0])
    for r in t1:
        print("T1 %s %s %s msgs=%d peak=%s eq_total=%s" % (
            r["id8"], r["dir"], r["model"], r["msgs"],
            "{:,}".format(r["peak_ctx"]), "{:,}".format(r["eq_total"])))
    print("T2 " + "; ".join("%s %s (%.1f%%)" % (r["model"], "{:,}".format(r["eq"]), r["share"])
                            for r in t2))
    print("T10 reconcile=%s grand_eq=%s split_absent=%d json_errors=%d"
          % (recon, "{:,}".format(round(grand_eq)), cw_split_absent,
             t10["json_errors_total"]))
    if STAGE >= 2:
        print("top burn (session x class):")
        for i, r in enumerate(top_burn, 1):
            print("  %d. %s %s direct=%s carry=%s total=%s share=%.1f%%" % (
                i, r["id8"], r["class_name"], "{:,}".format(r["direct_eq"]),
                "{:,}".format(r["carry"]), "{:,}".format(r["total"]), r["share"]))
        print("T7 gt200k %s%% gt400k %s%% | loops n=%d eq=%s | negatives=%d"
              % (t7["gt200k"]["share"], t7["gt400k"]["share"], loops_out["count"],
                 "{:,}".format(loops_out["eq"]), negatives_total))
    if STAGE >= 3:
        print("fixed-prefix: %s" % "; ".join(
            "%s %s" % (r["id8"], "{:,}".format(r["median_first3"])) for r in t6))
        print("first-ctx: %s" % "; ".join(
            "%s %s" % (r["id8"], "{:,}".format(r["first_ctx"])) for r in t6))
        if t8["double_load"]:
            for r in t8["double_load"]:
                print("double-load %s at %s: calls_after=%d extra_eq=%s"
                      % (r["id8"], r["moved_at"], r["calls_after"],
                         "{:,}".format(r["extra_cache_read_eq"])))
        else:
            print("double-load: none of the selected sessions moved main -> worktree")
        mm = [r for r in t5 if r["mismatch"]]
        print("requested/actual model mismatches: %d" % len(mm))
        for r in mm:
            print("  parent %s type=%s requested=%s actual=%s"
                  % (r["parent"], r["subagent_type"], r["requested"],
                     ",".join(r["actual"])))
        print("images per session: %s" % "; ".join(
            "%s %d" % (r["id8"], r["images"]) for r in t4))
        for r in anchors["fable_jurors"]:
            if r["tool_calls"] == 7 or (abs(r["last_ctx"] - 134828) <= 134828 * 0.05
                                        or abs(r["sum_ctx"] - 134828) <= 134828 * 0.05):
                print("fable-juror anchor parent=%s actual=%s sum_ctx=%s last_ctx=%s tools=%d"
                      % (r["parent"], ",".join(r["actual"]),
                         "{:,}".format(r["sum_ctx"]), "{:,}".format(r["last_ctx"]),
                         r["tool_calls"]))

if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "--schema":
        schema_mode(sys.argv[2])
    else:
        main()
