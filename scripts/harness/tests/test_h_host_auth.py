"""H offline test: no desktop-host auth variable reaches a claude child aimed at a third party.

LESSONS #65 (2026-09-22): started from inside the Claude desktop app, a `claude -p` child with a
custom ANTHROPIC_BASE_URL fetched the operator's Claude OAuth token from the host and sent it to
that URL, ignoring ANTHROPIC_AUTH_TOKEN (a local probe saw 7 different 115-character bearers; with
the host variables removed it sent the token it was given). Three checks:
1. Every scripts/**/*.ps1 that sets ANTHROPIC_BASE_URL to a non-Anthropic https host carries the
   scrub (its "LESSONS #65" block).
2. claude-glm.ps1 -Batch, run against a fake claude.cmd that records only the NAMES of its
   environment variables: no host-auth name arrives; ANTHROPIC_AUTH_TOKEN and the launcher's own
   CLAUDE_CODE_SUBAGENT_MODEL do.
3. The same for scripts/harness/measure-prefix.ps1.
The fake never records a value, the keys are dummies, and nothing calls out.
"""

import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
HOST_AUTH = ("CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH", "CLAUDE_CODE_MESSAGING_SOCKET",
             "CLAUDE_CODE_MESSAGING_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_CODE_CHILD_SESSION",
             "USE_LOCAL_OAUTH", "CLAUDECODE")
BASE_URL_RE = re.compile(r'ANTHROPIC_BASE_URL\s*=\s*"(https?://[^"/]+)')
FAKE_CMD = ('@echo off\r\n'
            'for /f "delims==" %%a in (\'set\') do @echo %%a>> "%~dp0names.txt"\r\n'
            'type "%~dp0reply.json"\r\n'
            'exit /b 0\r\n')
REPLY = {"type": "result", "subtype": "success", "is_error": False, "result": "OK",
         "session_id": "h-offline", "usage": {"input_tokens": 10, "cache_creation_input_tokens": 0,
                                               "cache_read_input_tokens": 0, "output_tokens": 1}}


def static_check():
    missing = []
    for path in glob.glob(os.path.join(REPO, "scripts", "**", "*.ps1"), recursive=True):
        text = open(path, encoding="utf-8", errors="replace").read()
        for host in BASE_URL_RE.findall(text):
            if not host.lower().endswith("anthropic.com") and "LESSONS #65" not in text:
                missing.append(os.path.relpath(path, REPO).replace(os.sep, "/"))
    return sorted(set(missing))


def run_with_fake(args):
    fake = tempfile.mkdtemp(prefix="h-fake-")
    with open(os.path.join(fake, "claude.cmd"), "w", encoding="ascii", newline="") as f:
        f.write(FAKE_CMD)
    with open(os.path.join(fake, "reply.json"), "w", encoding="ascii") as f:
        json.dump(REPLY, f)
    env = {k: v for k, v in os.environ.items() if not k.startswith("HARNESS_")}
    env["PATH"] = fake + os.pathsep + env.get("PATH", "")
    env["HARNESS_STATE_DIR"] = tempfile.mkdtemp(prefix="h-state-")
    env["ZAI_CODING_KEY"] = "offline-test-dummy"
    env["DEEPSEEK_API_KEY"] = "offline-test-dummy"
    for name in HOST_AUTH:
        env[name] = "1"
    found = shutil.which("claude", path=env["PATH"]) or ""
    if not os.path.normcase(found).startswith(os.path.normcase(fake)):
        return None, "fake claude.cmd is not first on PATH ({0})".format(found)
    r = subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File"] + args, env=env,
                       capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=120)
    names_file = os.path.join(fake, "names.txt")
    if not os.path.exists(names_file):
        return None, "the fake never ran (exit {0}): {1}".format(r.returncode, (r.stdout or r.stderr)[-200:])
    names = {ln.strip().upper() for ln in open(names_file, encoding="ascii", errors="replace") if ln.strip()}
    return names, ""


def child_check(label, args):
    names, why = run_with_fake(args)
    if names is None:
        return "{0}: {1}".format(label, why)
    leaked = [n for n in HOST_AUTH if n in names]
    lacking = [n for n in ("ANTHROPIC_AUTH_TOKEN", "CLAUDE_CODE_SUBAGENT_MODEL") if n not in names]
    if leaked or lacking:
        return "{0}: leaked {1}, lacking {2}".format(label, leaked, lacking)
    return ""


def main():
    failures = 0
    missing = static_check()
    if missing:
        failures += 1
        print("FAIL H case 1: no host-auth scrub in {0}".format(", ".join(missing)))

    work = tempfile.mkdtemp(prefix="h-work-")
    prompt = os.path.join(work, "p.md")
    with open(prompt, "w", encoding="utf-8") as f:
        f.write("do nothing")
    glm = os.path.join(REPO, "scripts", "claude-glm.ps1")
    why = child_check("claude-glm.ps1", [glm, "-Batch", "-PromptFile", prompt, "-Dir", REPO])
    if why:
        failures += 1
        print("FAIL H case 2: " + why)

    mp = os.path.join(REPO, "scripts", "harness", "measure-prefix.ps1")
    why = child_check("measure-prefix.ps1", [mp, "-Dir", REPO, "-Label", "h-offline"])
    if why:
        failures += 1
        print("FAIL H case 3: " + why)

    if failures == 0:
        print("PASS H 3/3")
        return 0
    print("FAIL H {0} of 3 failed".format(failures))
    return 1


if __name__ == "__main__":
    sys.exit(main())
