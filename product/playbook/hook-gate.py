# product/playbook/hook-gate.py — PostToolUse write-boundary gate.
#
# Wired in .claude/settings.json (Pass-45). Reads the hook payload from
# stdin; when the written file is a playbook chapter source, runs
# check.py on it and exits 2 on failure so the gate output feeds back
# to the model as a blocking error. Deliberately jq-free: the hook
# shell's PATH may lack the scoop shims, and a missing extractor would
# make the gate silently inert.
import json
import os
import re
import subprocess
import sys

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

path = (data.get("tool_input") or {}).get("file_path") or ""
if not re.search(r"product[\\/]playbook[\\/]src[\\/][^\\/]+\.typ$", path):
    sys.exit(0)

check = os.path.join(os.path.dirname(os.path.abspath(__file__)), "check.py")
r = subprocess.run([sys.executable, check, path], capture_output=True, text=True)
if r.returncode != 0:
    sys.stderr.write(r.stdout + r.stderr)
    sys.exit(2)
sys.exit(0)
