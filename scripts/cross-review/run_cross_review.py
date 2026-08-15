#!/usr/bin/env python3
"""
run_cross_review.py - cross-model review helper (ported from the Ordani harness, 2026-08-15).

Shells out to an EXTERNAL second/third model (Google Gemini CLI, OpenAI Codex
CLI) to review either a PLAN (before execution) or a DIFF (before the CARD 1 ship flow) --
an INDEPENDENT check-and-balance that breaks the Claude-verifies-Claude
monoculture.

DESIGN PRINCIPLES (honest + dormant-safe):
  - Detects each CLI on PATH (incl. Windows .cmd/.exe shims). If a model is not
    installed, it is reported "NOT INSTALLED" -- NEVER a fabricated review.
  - If a CLI runs but errors (wrong flag, auth, timeout), the stderr is reported
    verbatim under "ERROR" -- again never fabricated. The most likely cause is a
    wrong invocation; CLI_INVOCATIONS below is operator-tunable.
  - Exit code is ALWAYS 0 (this is a data-gathering helper). The caller (the
    /cross-review command or Claude) decides PASS/CONCERNS/BLOCK from the output.
  - If NEITHER model is available, prints a clear NO-MODELS banner so the caller
    falls back to a Claude-only review and tells the operator to install per
    docs/CROSS_MODEL_REVIEW.md.

CLI INVOCATIONS -- VERIFY BEFORE FIRST REAL USE.
  The exact headless flags below are best-effort and were NOT web-verified at
  authoring time. After installing, smoke-test each (docs/CROSS_MODEL_REVIEW.md
  step), and if your CLI differs, correct the templates here. The combined
  prompt+content is delivered on STDIN (diffs exceed Windows' ~8KB argv limit),
  with a short instruction also passed as an arg where the CLI supports it.

Usage:
  python run_cross_review.py --mode plan|diff --input <file> [--out <file>]
                             [--timeout SEC] [--max-bytes N]
  (if --input omitted, reads the review target from stdin)

Ref: docs/CROSS_MODEL_REVIEW.md
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_TIMEOUT = 120          # seconds per model (Gemini/Codex legs)
DEFAULT_GLM_TIMEOUT = 600      # GLM leg only (the mechanism-before-retry rule): now a per-chunk
                               # INACTIVITY bound on the SSE stream, not a
                               # wall-clock read timeout -- generous on purpose.
DEFAULT_MAX_BYTES = 200000     # truncate the review target to protect budget/limits
                               # (was 60000, which silently cut large
                               # plans/diffs and made the models report the missing
                               # tail as a defect. Raised; truncation now also injects
                               # a visible banner into the model input.)

# Gemini REST leg (preferred over a CLI -- the key authenticates directly, no
# install / login / Windows .cmd-shim risk). Key resolution: env GEMINI_API_KEY,
# then .claude/.gemini-key (gitignored), resolved from CLAUDE_PROJECT_DIR or the
# script's own repo root so it works regardless of the shell's cwd.
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent"
)


def _repo_root():
    pd = os.environ.get("CLAUDE_PROJECT_DIR")
    if pd and os.path.isdir(pd):
        return pd
    # scripts/cross-review/run_cross_review.py -> repo root is three dirs up.
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _gemini_key():
    k = os.environ.get("GEMINI_API_KEY", "").strip()
    if k:
        return k
    for path in (
        os.path.join(_repo_root(), ".claude", ".gemini-key"),
        # Machine-level fallback: keys live OUTSIDE any repo, so one rotation
        # site serves every project and no working tree can stage a secret.
        os.path.join(os.path.expanduser("~"), ".claude", ".gemini-key"),
    ):
        try:
            with open(path, encoding="utf-8") as fh:
                k = fh.read().strip()
                if k:
                    return k
        except Exception:
            continue
    return ""


def _run_gemini_rest_once(prompt_text, timeout):
    """One Gemini REST call. Returns (status, body, http_code). Never raises.
    http_code is the HTTPError status when one occurred, else None — the retry
    decision above is STRUCTURED on this code (a body-regex
    transient classifier was considered and disproven — ERROR bodies embed
    model-visible text, so a regex over them can misfire)."""
    key = _gemini_key()
    if not key:
        return ("NOT CONFIGURED", "", None)
    url = (GEMINI_ENDPOINT % GEMINI_MODEL) + "?key=" + urllib.parse.quote(key)
    body = json.dumps(
        {"contents": [{"parts": [{"text": SHORT_INSTRUCTION + "\n\n" + prompt_text}]}]}
    ).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, headers={"Content-Type": "application/json"}, method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        detail = ""
        try:
            detail = e.read().decode("utf-8", "replace")[:300]
        except Exception:
            pass
        return ("ERROR", "HTTP %s: %s" % (e.code, detail or e.reason), e.code)
    except Exception as e:
        return ("ERROR", "request failed: %s" % e, None)
    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception:
        return ("ERROR", "unexpected response shape: %s" % json.dumps(data)[:300], None)
    return ("OK", text if text else "(empty output)", None)


def _run_gemini_rest(prompt_text, timeout):
    """Gemini REST with ONE retry on a structured HTTP 5xx (
    the 260 plan round 1 leg died on a transient 503 and the mandated solo
    retry had to be hand-rolled via module import). Only a server-side 5xx
    retries: 4xx (bad key, quota) and local failures re-run identically, and
    a timeout retry would violate mechanism-before-retry. Returns (status,
    body); a recovered leg reports 'OK (retry 1)' so the round file shows
    the flake instead of masking it."""
    status, body, code = _run_gemini_rest_once(prompt_text, timeout)
    if status == "ERROR" and code is not None and 500 <= code < 600:
        time.sleep(5)
        r_status, r_body, _ = _run_gemini_rest_once(prompt_text, timeout)
        if r_status == "OK":
            return ("OK (retry 1)", r_body)
        return ("ERROR", "%s\n[retry on HTTP 5xx also failed] %s" % (body, r_body))
    return (status, body)


# GLM-5.2 (Z.ai / Zhipu) REST leg -- a THIRD independent lineage (Zhipu) alongside
# Gemini (Google) + Codex (OpenAI), per the deep-leg rule. OpenAI-compatible chat-
# completions, so it mirrors the Gemini REST leg (direct key auth, no CLI / no
# Windows .cmd-shim risk). Key resolution: env GLM_API_KEY / ZAI_API_KEY, then
# .claude/.zai-key (gitignored). Provider is AUTO-DETECTED from the key prefix so
# the operator just pastes whichever key they obtained:
#   - key starts with "sk-or-"  -> OpenRouter   (model "z-ai/glm-5.2")
#   - otherwise                 -> Z.ai direct  (model "glm-5.2")
# Uses the STANDARD pay-as-you-go endpoint only. The cheap GLM Coding Plan's ToS
# forbids "SDK-based access or other third-party integrations"
# (docs.z.ai/devpack/usage-policy), so a scripted cross-review call must NOT use a
# Coding-Plan key -- pay-go ($1.40/M in, $4.40/M out) is the compliant path.
GLM_ZAI_ENDPOINT = "https://api.z.ai/api/paas/v4/chat/completions"
GLM_ZAI_MODEL = "glm-5.2"
GLM_OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"
GLM_OPENROUTER_MODEL = "z-ai/glm-5.2"


def _glm_key():
    k = os.environ.get("GLM_API_KEY", "").strip() or os.environ.get("ZAI_API_KEY", "").strip()
    if k:
        return k
    for path in (
        os.path.join(_repo_root(), ".claude", ".zai-key"),
        os.path.join(os.path.expanduser("~"), ".claude", ".zai-key"),
    ):
        try:
            with open(path, encoding="utf-8") as fh:
                k = fh.read().strip()
                if k:
                    return k
        except Exception:
            continue
    return ""


def _glm_provider(key):
    """Auto-detect (endpoint, model, label) from the key prefix."""
    if key.startswith("sk-or-"):
        return (GLM_OPENROUTER_ENDPOINT, GLM_OPENROUTER_MODEL,
                "GLM(REST openrouter %s)" % GLM_OPENROUTER_MODEL)
    return (GLM_ZAI_ENDPOINT, GLM_ZAI_MODEL, "GLM(REST zai %s)" % GLM_ZAI_MODEL)


def _run_glm_rest(prompt_text, timeout):
    """Call GLM-5.2 via an OpenAI-compatible endpoint using SSE STREAMING.

    the old non-streaming call read the WHOLE response with one
    urlopen(timeout=...) socket read, so on a >55KB input the server buffered the
    entire (slow) generation and the first recv() blew past the fixed 120s read
    timeout -- 10 of 11 GLM rounds died with "The read operation timed out".
    Streaming (stream:true) converts that WALL-CLOCK read timeout into an
    INACTIVITY one: urllib's socket timeout applies per-chunk read, the server
    emits a delta every few hundred ms, so the timeout only fires on a genuine
    stall, not on total generation length. Returns (status, body). Never raises.
    """
    key = _glm_key()
    if not key:
        return ("NOT CONFIGURED", "")
    endpoint, model, _label = _glm_provider(key)
    # OpenAI chat-completions shape (works for both Z.ai-direct and OpenRouter).
    # No provider-specific extensions (e.g. Z.ai's "thinking") -- keep the body
    # portable so the same call works on either endpoint.
    body = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": SHORT_INSTRUCTION},
            {"role": "user", "content": prompt_text},
        ],
        "temperature": 0.2,
        "stream": True,
    }).encode("utf-8")
    req = urllib.request.Request(
        endpoint, data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key,
            "Accept": "text/event-stream",
        },
        method="POST",
    )
    chunks = []
    saw_done = False          # explicit `data: [DONE]` sentinel
    finish_reason = None      # a choices[].finish_reason (stop/length/...) also marks a clean end
    stream_err = ""           # a non-fatal parse issue on some SSE line, kept for the raw detail
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            for raw in resp:  # iterates line-by-line; socket timeout applies per read
                line = raw.decode("utf-8", "replace").strip()
                if not line or line.startswith(":"):
                    continue  # blank event separator / keep-alive comment
                if not line.startswith("data:"):
                    continue  # ignore other SSE fields (event:/id:/retry:)
                payload = line[len("data:"):].strip()
                if payload == "[DONE]":
                    saw_done = True
                    break
                try:
                    obj = json.loads(payload)
                except Exception:
                    stream_err = "non-JSON SSE data line: %s" % payload[:200]
                    continue
                # An error object can arrive mid-stream in place of a choices delta.
                if isinstance(obj, dict) and obj.get("error"):
                    return ("ERROR", "stream error: %s" % json.dumps(obj["error"])[:300])
                try:
                    choice0 = obj["choices"][0]
                except (KeyError, IndexError, TypeError):
                    continue  # e.g. a lone usage/heartbeat frame with no choices
                fr = choice0.get("finish_reason")
                if fr:
                    finish_reason = fr
                delta = choice0.get("delta") or {}
                piece = delta.get("content")
                if piece:
                    chunks.append(piece)
    except urllib.error.HTTPError as e:
        detail = ""
        try:
            detail = e.read().decode("utf-8", "replace")[:300]
        except Exception:
            pass
        return ("ERROR", "HTTP %s: %s" % (e.code, detail or e.reason))
    except Exception as e:
        # Includes socket timeout (genuine inactivity stall) + mid-stream resets.
        partial = "".join(chunks)
        note = " (%d partial chars discarded)" % len(partial) if partial else ""
        return ("ERROR", "stream read failed: %s%s" % (e, note))

    text = "".join(chunks).strip()
    if not text:
        # Malformed/empty stream: report ERROR with the raw detail, never OK.
        extra = "; " + stream_err if stream_err else ""
        return ("ERROR", "empty stream (saw_done=%s finish=%s%s)" % (
            saw_done, finish_reason, extra))
    if not saw_done and not finish_reason:
        # Ended without either completion marker -> the connection was cut
        # mid-generation. Surface a truncation ERROR (with the tail) rather than
        # passing a partial review off as a complete one.
        return ("ERROR", "stream truncated: no [DONE]/finish_reason after %d chars; tail=%r"
                % (len(text), text[-200:]))
    return ("OK", text)


# Operator-tunable. Each entry: how to invoke the CLI headlessly. The combined
# prompt is piped on stdin. {short} is a one-line instruction passed as an arg
# where supported. VERIFY these against the installed CLIs and edit if needed.
CLI_INVOCATIONS = {
    "gemini": {
        "names": ["gemini", "gemini.cmd", "gemini.exe"],
        # Best-effort: gemini reads the prompt from -p; we also pipe content on
        # stdin. If your build wants the whole prompt on stdin only, drop ["-p", ...].
        "argv": lambda short: ["-p", short],
        "stdin": True,
    },
    # ChatGPT via simonw/llm-openai-via-codex: `llm -m openai-codex/<model>`.
    # Prompt goes fully on stdin (no arg) so large diffs are not blocked by Windows argv
    # limits. Needs `codex` to be ChatGPT-authenticated (codex login) -- else llm returns
    # an auth error, reported as [ERROR], never fabricated.

    # MODEL PIN — re-verified 2026-07-09 (codex-cli 0.144.0). Operator directive: Sol is
    # the Codex leg for this repo. Tested THROUGH this harness (`llm -m openai-codex/X`):
    #   gpt-5.6-sol    harness OK  <- PINNED
    #   gpt-5.6-terra  harness OK  <- fallback if sol regresses
    #   gpt-5.6-luna   direct OK but harness 404 "Model not found" (llm plugin can't route it)
    #   gpt-5.5        works; older fallback.

    # Sol's availability REVERSED. Earlier the same day (codex-cli 0.135.0) sol returned
    # 400 "not supported when using Codex with a ChatGPT account", and this file recorded it
    # as requiring API-key auth. It now answers on the same $20 ChatGPT plan. A model verdict
    # written here is a snapshot, not a law -- re-probe before trusting any line above.

    # RULE: never bump this pin without smoke-testing THROUGH the harness (a direct-CLI OK
    # does not imply the llm plugin can route it -- luna proves that).
    "codex": {
        "names": ["llm", "llm.cmd", "llm.exe"],
        "argv": lambda short: ["-m", "openai-codex/gpt-5.6-sol"],
        "stdin": True,
        "instruction_via_stdin": True,
        # Deep-leg contract (operator directive 2026-07-23): Sol walks the whole
        # artifact under CODEX_DEEP_INSTRUCTION (assigned below the instruction
        # constants -- they are defined after this dict) and gets --codex-timeout.
    },
}

SHORT_INSTRUCTION = (
    "You are an INDEPENDENT cross-model reviewer. Read the content on stdin "
    "(a PLAN or a code DIFF for micahjonesconsulting.com -- a Next.js 16.2.6 "
    "App Router marketing/portfolio site: React 19, Tailwind v4 CSS-first "
    "tokens in app/globals.css, MDX case studies, GSAP quarantined to "
    "components/TitleCard.tsx, Lenis smooth scroll, a Resend contact route, "
    "deployed on Vercel behind TWO domains. There is NO auth, NO database and "
    "NO payments -- do not invent them). Reply terse and concrete. Start with "
    "a verdict line: VERDICT: PASS | CONCERNS | BLOCK. Then bullet the "
    "specific issues you would block on: correctness bugs; Server/Client "
    "component boundary errors (function props across the boundary break SSG "
    "and are invisible to tsc and lint); WCAG AA failures (contrast, focus, "
    "keyboard, heading order); Core Web Vitals regressions (added client JS, "
    "blocking fonts, layout shift); prose claims the repo cannot support; "
    "SEO/metadata/robots drift; deploy and domain-alias hazards. Cite "
    "file/section. Do NOT invent issues; if it looks fine, say so."
)

# Operator directive 2026-07-23: the Codex (gpt-5.6-sol) leg is the DEEP leg --
# it consistently finds real blockers the fast legs miss, so it gets a longer,
# more demanding instruction and its own generous timeout (--codex-timeout).
CODEX_DEEP_INSTRUCTION = SHORT_INSTRUCTION + (
    "\n\nDEPTH CONTRACT (this leg is the designated deep reviewer -- spend the "
    "effort):\n"
    "1. WALK THE WHOLE ARTIFACT, do not sample. Diff mode: every hunk, in order; "
    "for each state (a) what it changes, (b) whether it is correct IN CONTEXT of "
    "the surrounding unchanged code you can infer, (c) what could break. Plan "
    "mode: every task/verify/guard section; mentally EXECUTE each verify command "
    "and each script contract against the described repo state -- flag any check "
    "that can false-green (passes when the work is wrong) or false-red (fails on "
    "a healthy tree).\n"
    "2. For EVERY finding: one-line PREMISE (what must be true for the finding "
    "to be real) + the exact evidence line/section. Separate VERIFIED-from-the-"
    "content claims from ASSUMED-about-the-repo claims; list your assumptions "
    "explicitly at the end.\n"
    "3. Hunt second-order effects: interactions between separate hunks/sections, "
    "cascade/precedence issues, ordering hazards, state that a later step relies "
    "on an earlier step having created, concurrency with other actors on shared "
    "files.\n"
    "4. Rank findings most-severe-first. Close with a one-paragraph summary of "
    "what you verified clean (be specific -- name the sections/hunks), so a "
    "silent skip is distinguishable from a clean pass."
)

CLI_INVOCATIONS["codex"]["instruction"] = CODEX_DEEP_INSTRUCTION


def _which(names):
    for n in names:
        p = shutil.which(n)
        if p:
            return p
    return None


def _run_one(cli_key, prompt_text, timeout):
    spec = CLI_INVOCATIONS[cli_key]
    path = _which(spec["names"])
    if not path:
        return ("NOT INSTALLED", "")
    instr = spec.get("instruction") or SHORT_INSTRUCTION
    if spec.get("instruction_via_stdin"):
        # llm path: no prompt arg; the whole instruction+content goes on stdin.
        argv = [path] + spec["argv"](None)
        prompt_text = instr + "\n\n" + prompt_text
    else:
        argv = [path] + spec["argv"](instr)
    try:
        r = subprocess.run(
            argv,
            input=prompt_text.encode("utf-8", "replace") if spec["stdin"] else None,
            capture_output=True,
            timeout=timeout,
            # Force the (Python-based) llm/gemini CLIs to treat stdin/stdout as UTF-8.
            # On a Windows cp1252 locale they default to surrogateescape, which turns a
            # benign byte into a lone surrogate and crashes the CLI's OWN utf-8 encode
            # (the "'utf-8' codec can't encode '\\udc90': surrogates not allowed" diff-
            # review failure, Phase 235.1). encode(...,"replace") guards the script side too.
            env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
        )
    except subprocess.TimeoutExpired:
        return ("ERROR", "timed out after %ds" % timeout)
    except Exception as e:
        return ("ERROR", "invocation failed: %s" % e)
    out = (r.stdout or b"").decode("utf-8", "replace").strip()
    err = (r.stderr or b"").decode("utf-8", "replace").strip()
    if r.returncode != 0 and not out:
        return ("ERROR", "exit %d: %s" % (r.returncode, err[:800] or "(no stderr)"))
    return ("OK", out if out else "(empty output)")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", choices=["plan", "diff"], default="diff")
    ap.add_argument("--input", default="")
    ap.add_argument("--out", default="")
    ap.add_argument("--timeout", type=int, default=DEFAULT_TIMEOUT)
    # the GLM leg gets its own, larger timeout. Now that it STREAMS,
    # this bounds inactivity between chunks (not total generation), so a generous
    # default is safe -- it only fires on a genuine stall. Gemini/Codex keep the
    # shared --timeout.
    ap.add_argument("--glm-timeout", type=int, default=DEFAULT_GLM_TIMEOUT)
    # Deep-leg budget (2026-07-23): Sol's DEPTH CONTRACT produces much longer
    # generations than the 120s shared default tolerates.
    ap.add_argument("--codex-timeout", type=int, default=600)
    ap.add_argument("--max-bytes", type=int, default=DEFAULT_MAX_BYTES)
    # mid-arc solo re-run of one leg (e.g. after a Gemini 503)
    # previously required importing the module by hand. Comma-separated; the
    # known set is validated — an unknown name prints an UNKNOWN-LEG banner and
    # runs nothing, never a silent zero-leg "pass". Omitting gemini prints an
    # explicit skip banner: the leg is MANDATED (2026-05-31) and a ledger must
    # never record a partial round as full silently.
    ap.add_argument("--legs", default="gemini,codex,glm",
                    help="comma-separated subset of: gemini,codex,glm")
    args = ap.parse_args()

    KNOWN_LEGS = ("gemini", "codex", "glm")
    legs = [x.strip().lower() for x in args.legs.split(",") if x.strip()]
    unknown_legs = [x for x in legs if x not in KNOWN_LEGS]
    legs = [x for x in legs if x in KNOWN_LEGS]

    if os.environ.get("SKIP_CROSS_REVIEW") == "1":
        print("cross-review SKIPPED (SKIP_CROSS_REVIEW=1).")
        return 0

    if args.input:
        try:
            target = open(args.input, encoding="utf-8", errors="replace").read()
        except Exception as e:
            print("cross-review: cannot read --input %s: %s" % (args.input, e))
            return 0
    else:
        target = sys.stdin.read()

    if not target.strip():
        print("cross-review: empty review target; nothing to do.")
        return 0

    truncated = len(target.encode("utf-8")) > args.max_bytes
    if truncated:
        target = target.encode("utf-8")[: args.max_bytes].decode("utf-8", "ignore")
        # the models must SEE that the input was cut — otherwise they
        # report the omitted tail as a gap/defect ("plan incomplete / T5 missing").
        target += (
            "\n\n==========================================================\n"
            "[INPUT TRUNCATED to %d bytes by the review harness. Content beyond this\n"
            "point was OMITTED HERE, NOT missing from the actual artifact. Do NOT\n"
            "report truncated/cut-off content as a gap, omission, or defect.]\n"
            "==========================================================\n"
        ) % args.max_bytes

    header = "MODE=%s  bytes=%d%s\n" % (
        args.mode, len(target.encode("utf-8")), " (TRUNCATED)" if truncated else "")
    prompt_text = (
        "REVIEW MODE: " + args.mode.upper() + "\n\n"
        "--- CONTENT TO REVIEW ---\n" + target + "\n--- END CONTENT ---\n"
    )

    parts = ["=== CROSS-MODEL REVIEW ===", header.rstrip()]
    available = 0
    for name in unknown_legs:
        parts.append(
            "\n----- UNKNOWN LEG '%s' [NOT RUN] -----\n"
            "Not one of %s. Nothing was executed for it — an unknown leg is "
            "never a silent pass." % (name, ",".join(KNOWN_LEGS)))
    # Gemini: prefer the REST leg (key-authenticated, no CLI). Fall back to the
    # gemini CLI only if no key is configured AND the CLI is on PATH.
    if "gemini" not in legs:
        parts.append(
            "\n----- GEMINI [SKIPPED] -----\n"
            "GEMINI LEG SKIPPED BY FLAG (--legs=%s). The Gemini leg is MANDATED "
            "(2026-05-31): a round without it is PARTIAL and the ledger must "
            "say so." % args.legs)
    else:
        if _gemini_key():
            g_status, g_body = _run_gemini_rest(prompt_text, args.timeout)
            g_label = "GEMINI(REST %s)" % GEMINI_MODEL
        else:
            g_status, g_body = _run_one("gemini", prompt_text, args.timeout)
            g_label = "GEMINI(CLI)"
        if g_status.startswith("OK"):
            available += 1
        parts.append("\n----- %s [%s] -----\n%s" % (g_label, g_status, g_body))
    # Codex: CLI path (ChatGPT-via-Codex). Installed + authed (verified 2026-06-09).
    if "codex" not in legs:
        parts.append("\n----- CODEX [SKIPPED] -----\nCODEX LEG SKIPPED BY FLAG (--legs=%s)." % args.legs)
    else:
        c_status, c_body = _run_one("codex", prompt_text, args.codex_timeout)
        if c_status == "OK":
            available += 1
        parts.append("\n----- CODEX(CLI) [%s] -----\n%s" % (c_status, c_body))
    # GLM-5.2 (Z.ai/Zhipu): REST leg, a 3rd independent lineage. Dormant until a
    # key is present (.claude/.zai-key or GLM_API_KEY/ZAI_API_KEY) -- self-disables
    # exactly like the Gemini leg, so the harness stays safe with no key configured.
    glm_key = _glm_key() if "glm" in legs else None
    if "glm" not in legs:
        parts.append("\n----- GLM [SKIPPED] -----\nGLM LEG SKIPPED BY FLAG (--legs=%s)." % args.legs)
    elif not glm_key:
        # Ported 2026-08-15 — this arm did not exist upstream. When glm WAS in
        # --legs but no key was configured, NEITHER branch fired and the GLM
        # section vanished silently: a two-leg round rendered as a three-leg
        # round with nothing saying otherwise. That is the exact failure every
        # other banner in this file exists to prevent, so a missing key now
        # announces itself.
        parts.append(
            "\n----- GLM [NOT CONFIGURED] -----\nNo GLM/Z.ai key found "
            "(.claude/.zai-key, ~/.claude/.zai-key, or GLM_API_KEY/ZAI_API_KEY). "
            "This round ran WITHOUT the GLM leg — report it as partial."
        )
    if glm_key:
        glm_status, glm_body = _run_glm_rest(prompt_text, args.glm_timeout)
        if glm_status == "ERROR":
            # Mechanism-before-retry (the mechanism-before-retry rule): the streaming rewrite above is the
            # fix for the chronic read-timeout; retrying the OLD non-streaming 120s
            # call verbatim was banned. This single retry now covers only a transient
            # network blip / mid-stream reset, not the always-timeout path. One retry.
            r_status, r_body = _run_glm_rest(prompt_text, args.glm_timeout)
            if r_status == "OK":
                glm_status, glm_body = r_status, r_body
            else:
                glm_body = "%s\n[retry also failed] %s" % (glm_body, r_body)
        _, _, glm_label = _glm_provider(glm_key)
        if glm_status == "OK":
            available += 1
        parts.append("\n----- %s [%s] -----\n%s" % (glm_label, glm_status, glm_body))

    if available == 0 and legs:
        parts.append(
            "\n----- NO CROSS-MODEL OUTPUT -----\n"
            "None of gemini, codex, or glm produced a review (not installed/keyed, "
            "or the invocation in CLI_INVOCATIONS needs correcting -- see "
            "docs/CROSS_MODEL_REVIEW.md). FALL BACK to a Claude-only review and "
            "tell the operator to install/verify the CLIs. Do NOT fabricate a "
            "second-model opinion."
        )

    report = "\n".join(parts) + "\n"
    if args.out:
        try:
            open(args.out, "w", encoding="utf-8", newline="\n").write(report)
        except Exception as e:
            sys.stderr.write("cross-review: cannot write --out: %s\n" % e)
    # Write stdout as UTF-8 bytes. A model's review can contain non-cp1252 chars
    # (smart quotes, the U+FFFD replacement char); a plain sys.stdout.write would
    # raise UnicodeEncodeError on a Windows cp1252 console AFTER the work is done,
    # turning a successful review into a non-zero exit. Encode defensively.
    try:
        sys.stdout.buffer.write(report.encode("utf-8", "replace"))
        sys.stdout.buffer.flush()
    except Exception:
        # last-resort: ASCII-only so the caller still sees the verdict
        sys.stdout.write(report.encode("ascii", "replace").decode("ascii"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
