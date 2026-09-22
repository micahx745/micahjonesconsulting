"""B2.1/B2.2: the one status file that paces the Claude bars, GLM and DeepSeek to a budget line.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only (urllib, no requests). State lives in HARNESS_STATE_DIR (default
%LOCALAPPDATA%/harness/micahjonesconsulting), file status.json, one top-level block per
subcommand (claude / deepseek / glm), written under a lock file so two writers never
interleave. budget-gate.py imports this module directly for the SessionStart and PreToolUse
text, rather than shelling out.

Subcommands:
  status.py claude --five-hour P --weekly P --fable P --resets ISO
    [--five-hour-resets ISO] [--window-start ISO] [--source S]
  status.py deepseek [--balance-json FILE]
  status.py glm-429 (--file PATH | --message TEXT)
  status.py glm-ok
  status.py tier
  status.py show
"""

import json
import os
import re
import sys
import tempfile
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

DEEPSEEK_BALANCE_URL = "https://api.deepseek.com/user/balance"
GLM_429_RE = re.compile(r"\[(1308|1310)\].*?reset at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})", re.DOTALL)
LOCK_RETRY_SECONDS = 5.0
LOCK_RETRY_INTERVAL = 0.1
LOCK_STALE_SECONDS = 10.0


# --- state dir / file, locked read-modify-write -----------------------------------------

def state_dir():
    d = os.environ.get("HARNESS_STATE_DIR") or ""
    if d:
        return d
    base = os.environ.get("LOCALAPPDATA") or tempfile.gettempdir()
    return os.path.join(base, "harness", "micahjonesconsulting")


def status_path(state=None):
    return os.path.join(state or state_dir(), "status.json")


def _acquire_lock(state):
    lock_path = os.path.join(state, "status.json.lock")
    deadline = time.time() + LOCK_RETRY_SECONDS
    while True:
        try:
            fd = os.open(lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            os.close(fd)
            return lock_path
        except FileExistsError:
            try:
                age = time.time() - os.path.getmtime(lock_path)
            except OSError:
                age = LOCK_STALE_SECONDS + 1
            if age > LOCK_STALE_SECONDS:
                try:
                    os.remove(lock_path)
                except OSError:
                    pass
                continue
            if time.time() >= deadline:
                # Single-machine dev tool: steal a lock that outlasted the retry window
                # rather than hang. A crashed writer must never wedge every later run.
                try:
                    os.remove(lock_path)
                except OSError:
                    pass
                try:
                    fd = os.open(lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                    os.close(fd)
                except OSError:
                    pass
                return lock_path
            time.sleep(LOCK_RETRY_INTERVAL)


def _release_lock(lock_path):
    try:
        os.remove(lock_path)
    except OSError:
        pass


def load_status(state=None):
    path = status_path(state)
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def write_block(key, value, state=None):
    """Read-modify-write one top-level block of status.json, under the lock file."""
    state = state or state_dir()
    os.makedirs(state, exist_ok=True)
    lock_path = _acquire_lock(state)
    try:
        data = load_status(state)
        data[key] = value
        path = status_path(state)
        fd, tmp_path = tempfile.mkstemp(prefix="status-", suffix=".json.tmp", dir=state)
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, sort_keys=True)
            os.replace(tmp_path, path)
        except Exception:
            try:
                os.remove(tmp_path)
            except OSError:
                pass
            raise
    finally:
        _release_lock(lock_path)
    return data


# --- time helpers -------------------------------------------------------------------------

def now_utc():
    return datetime.now(timezone.utc)


def parse_iso(s):
    """Accepts ...Z and ...000Z (fractional seconds) forms; returns an aware UTC datetime."""
    s = (s or "").strip()
    if s.endswith("Z"):
        s = s[:-1]
    if "." in s:
        s = s.split(".", 1)[0]
    dt = datetime.strptime(s, "%Y-%m-%dT%H:%M:%S")
    return dt.replace(tzinfo=timezone.utc)


def fmt_iso(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def fmt_minute(dt):
    return dt.strftime("%Y-%m-%d %H:%M")


# --- claude ---------------------------------------------------------------------------

def cmd_claude(argv):
    args = _parse_flags(argv, {
        "--five-hour": "five_hour", "--weekly": "weekly", "--fable": "fable",
        "--resets": "resets", "--five-hour-resets": "five_hour_resets",
        "--window-start": "window_start", "--source": "source",
    })
    for required in ("five_hour", "weekly", "fable", "resets"):
        if required not in args:
            sys.stderr.write("status.py claude: --{0} is required\n".format(required.replace("_", "-")))
            return 2

    resets_dt = parse_iso(args["resets"])
    if "window_start" in args:
        window_start_dt = parse_iso(args["window_start"])
    else:
        window_start_dt = resets_dt - timedelta(days=7)

    block = {
        "five_hour_pct": float(args["five_hour"]),
        "weekly_pct": float(args["weekly"]),
        "fable_pct": float(args["fable"]),
        "weekly_resets_utc": fmt_iso(resets_dt),
        "five_hour_resets_utc": fmt_iso(parse_iso(args["five_hour_resets"])) if "five_hour_resets" in args else "",
        "window_start_utc": fmt_iso(window_start_dt),
        "updated_utc": fmt_iso(now_utc()),
        "source": args.get("source", "get_usage"),
    }
    write_block("claude", block)
    print("status.py claude: weekly_pct={0}".format(block["weekly_pct"]))
    return 0


# --- deepseek ---------------------------------------------------------------------------

def _deepseek_key():
    """env DEEPSEEK_API_KEY, else ~/.claude/.deepseek-key, else <repo>/.claude/.deepseek-key.

    Mirrors scripts/deepseek-exec.ps1's Get-DeepSeekKey. Never printed, never logged.
    """
    env_key = os.environ.get("DEEPSEEK_API_KEY")
    if env_key:
        return env_key.strip()
    repo = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    for candidate in (
        os.path.join(os.path.expanduser("~"), ".claude", ".deepseek-key"),
        os.path.join(repo, ".claude", ".deepseek-key"),
    ):
        try:
            with open(candidate, encoding="utf-8") as f:
                text = f.read().strip()
            if text:
                return text
        except OSError:
            continue
    return ""


def _select_balance_entry(response):
    infos = response.get("balance_infos")
    if not isinstance(infos, list) or not infos:
        return None
    for entry in infos:
        if isinstance(entry, dict) and entry.get("currency") == "USD":
            return entry
    first = infos[0]
    return first if isinstance(first, dict) else None


def cmd_deepseek(argv):
    args = _parse_flags(argv, {"--balance-json": "balance_json"})
    if "balance_json" in args:
        with open(args["balance_json"], encoding="utf-8") as f:
            response = json.load(f)
    else:
        key = _deepseek_key()
        if not key:
            sys.stderr.write(
                "status.py deepseek: no DeepSeek key (DEEPSEEK_API_KEY, ~/.claude/.deepseek-key "
                "or .claude/.deepseek-key)\n")
            return 2
        req = urllib.request.Request(
            DEEPSEEK_BALANCE_URL,
            headers={"Authorization": "Bearer " + key, "Accept": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                response = json.loads(resp.read().decode("utf-8"))
        except urllib.error.URLError as e:
            sys.stderr.write("status.py deepseek: request failed: {0}\n".format(e))
            return 3

    entry = _select_balance_entry(response)
    if entry is None:
        sys.stderr.write("status.py deepseek: no balance_infos in the response\n")
        return 4

    block = {
        "total_balance": str(entry.get("total_balance", "")),
        "currency": entry.get("currency", ""),
        "is_available": bool(response.get("is_available", False)),
        "updated_utc": fmt_iso(now_utc()),
    }
    write_block("deepseek", block)
    print("status.py deepseek: total_balance={0} {1}".format(block["total_balance"], block["currency"]))
    return 0


# --- glm ---------------------------------------------------------------------------

def cmd_glm_429(argv):
    args = _parse_flags(argv, {"--file": "file", "--message": "message"})
    if "file" in args:
        with open(args["file"], encoding="utf-8", errors="replace") as f:
            text = f.read()
    elif "message" in args:
        text = args["message"]
    else:
        sys.stderr.write("status.py glm-429: --file or --message is required\n")
        return 2

    m = GLM_429_RE.search(text)
    if not m:
        sys.stderr.write("status.py glm-429: no [1308]/[1310] reset stamp found\n")
        return 3

    code, stamp = m.group(1), m.group(2)
    shanghai = datetime.strptime(stamp, "%Y-%m-%d %H:%M:%S")
    reset_utc = shanghai - timedelta(hours=8)
    window = "five_hour" if code == "1308" else "weekly"
    block = {
        "state": "429",
        "window": window,
        "reset_utc": fmt_iso(reset_utc.replace(tzinfo=timezone.utc)),
        "updated_utc": fmt_iso(now_utc()),
    }
    write_block("glm", block)
    print("status.py glm-429: window={0} reset_utc={1}".format(window, block["reset_utc"]))
    return 0


def cmd_glm_ok(argv):
    block = {"state": "ok", "updated_utc": fmt_iso(now_utc())}
    write_block("glm", block)
    print("status.py glm-ok")
    return 0


# --- pace / bands / tier -----------------------------------------------------------------

def pace_fraction(now, window_start, resets):
    total = (resets - window_start).total_seconds()
    if total <= 0:
        return 1.0
    elapsed = (now - window_start).total_seconds()
    return max(0.0, min(1.0, elapsed / total))


def target_pct(f):
    return int(round(85 * f))


def band(used_pct, target):
    if used_pct <= target - 10:
        return "ahead"
    if used_pct >= target + 10:
        return "behind"
    return "on-pace"


def tier_of(weekly_pct):
    if weekly_pct >= 90:
        return "hard-containment"
    if weekly_pct >= 75:
        return "containment"
    return "normal"


def glm_state_text(status, now):
    glm = status.get("glm")
    if not isinstance(glm, dict):
        return "unknown"
    state = glm.get("state")
    if state == "ok":
        return "ok"
    if state == "429":
        try:
            reset_dt = parse_iso(glm.get("reset_utc", ""))
        except ValueError:
            return "unknown"
        if reset_dt > now:
            return "429 until {0}Z".format(fmt_minute(reset_dt))
        return "unknown"
    return "unknown"


def glm_is_429_active(status, now):
    glm = status.get("glm")
    if not isinstance(glm, dict) or glm.get("state") != "429":
        return False
    try:
        reset_dt = parse_iso(glm.get("reset_utc", ""))
    except ValueError:
        return False
    return reset_dt > now


def deepseek_balance_float(status):
    ds = status.get("deepseek")
    if not isinstance(ds, dict):
        return None
    try:
        return float(ds.get("total_balance"))
    except (TypeError, ValueError):
        return None


def deepseek_text(status):
    val = deepseek_balance_float(status)
    if val is None:
        return "unknown"
    money = "${0:.2f}".format(val)
    return money + (" HOLD" if val < 5 else " ok")


def deepseek_is_hold(status):
    val = deepseek_balance_float(status)
    return val is not None and val < 5


def budget_line(status, now):
    prefix = "BUDGET {0}Z".format(fmt_minute(now))
    claude = status.get("claude")
    glm_text = glm_state_text(status, now)
    ds_text = deepseek_text(status)

    if not isinstance(claude, dict):
        mid = "Claude bars UNKNOWN: run get_usage, then status.py claude"
        return "{0} | {1} | GLM {2} | DeepSeek {3}".format(prefix, mid, glm_text, ds_text)

    weekly = claude.get("weekly_pct", 0.0)
    five_hour = claude.get("five_hour_pct", 0.0)
    fable = claude.get("fable_pct", 0.0)
    window_start = parse_iso(claude.get("window_start_utc", ""))
    resets = parse_iso(claude.get("weekly_resets_utc", ""))
    f = pace_fraction(now, window_start, resets)
    target = target_pct(f)
    weekly_band = band(weekly, target)
    fable_band = band(fable, target)
    tier = tier_of(weekly)

    mid = (
        "Claude 5h {0}% | weekly {1}% ({2}, target {3}% now, reset {4}Z) | "
        "Fable {5}% ({6}) | tier {7}"
    ).format(
        int(round(five_hour)), int(round(weekly)), weekly_band, target, fmt_minute(resets),
        int(round(fable)), fable_band, tier,
    )
    line = "{0} | {1} | GLM {2} | DeepSeek {3}".format(prefix, mid, glm_text, ds_text)

    updated = parse_iso(claude.get("updated_utc", ""))
    age_minutes = (now - updated).total_seconds() / 60.0
    if age_minutes > 360:
        hours = int(age_minutes // 60)
        line += " | STALE {0}h: run get_usage, then status.py claude".format(hours)
    else:
        line += " | age {0}m".format(int(age_minutes))
    return line


def rules_now(status, now):
    sentences = []
    claude = status.get("claude") or {}
    weekly = claude.get("weekly_pct")
    fable = claude.get("fable_pct")
    five_hour = claude.get("five_hour_pct")
    have_claude = isinstance(status.get("claude"), dict)

    if have_claude and weekly is not None and weekly >= 90:
        sentences.append("hard containment: in-flight production containment only.")
    if have_claude and weekly is not None and weekly >= 75:
        sentences.append("Claude only for ledger, ship, diff review and taste; Claude subagent spawns are denied.")
    if have_claude and fable is not None and fable >= 90:
        sentences.append("no Fable.")
    if have_claude and fable is not None and fable >= 70:
        sentences.append("Fable only for phase-changing verdicts.")
    if have_claude and five_hour is not None and five_hour >= 80:
        sentences.append("no new Opus or Fable spawns until the 5-hour window rolls off.")
    if deepseek_is_hold(status):
        sentences.append("DeepSeek volume held (balance under $5).")
    if glm_is_429_active(status, now):
        sentences.append("GLM capped: route volume to DeepSeek.")
    return sentences


def tier_output(status, now):
    line = budget_line(status, now)
    sentences = rules_now(status, now)
    if sentences:
        line += "\nRULES NOW: " + " ".join(sentences)
    return line


def cmd_tier(argv):
    status = load_status()
    print(tier_output(status, now_utc()))
    return 0


def cmd_show(argv):
    status = load_status()
    print(json.dumps(status, indent=2, sort_keys=True))
    print(tier_output(status, now_utc()))
    return 0


# --- arg parsing --------------------------------------------------------------------------

def _parse_flags(argv, flag_map):
    """flag_map: {"--foo": "foo_key"}. Returns {"foo_key": "value", ...} for flags present."""
    out = {}
    i = 0
    while i < len(argv):
        flag = argv[i]
        if flag in flag_map and i + 1 < len(argv):
            out[flag_map[flag]] = argv[i + 1]
            i += 2
        else:
            i += 1
    return out


COMMANDS = {
    "claude": cmd_claude,
    "deepseek": cmd_deepseek,
    "glm-429": cmd_glm_429,
    "glm-ok": cmd_glm_ok,
    "tier": cmd_tier,
    "show": cmd_show,
}


def main():
    argv = sys.argv[1:]
    if not argv or argv[0] not in COMMANDS:
        sys.stderr.write("usage: status.py <claude|deepseek|glm-429|glm-ok|tier|show> [options]\n")
        return 2
    return COMMANDS[argv[0]](argv[1:])


if __name__ == "__main__":
    sys.exit(main())
