#!/usr/bin/env bash
# Pass-120 build, brief §6.1 exactly: the package.json:6 gates one at a time (G1-G8), stopping at the
# first failure as the && chain would, then `npx next build --webpack` (G9), then G10-G15.
# Every line is PASS/FAIL <id>: got <x> (want <y>); ends `build120 failures: N`, exit 1 when N != 0.
# Run from the Bash tool (foreground or run_in_background), never detached. Never while a server runs.
set -u
# G3 expects 72 (was O12's 70): two phrases added at the ship gate from the operator's 2026-09-16 rulings
# (Medicare; the retired ORDANI opening), LESSONS #3 PASS-120 SHIP ANSWERS and ORDANI OPENING, PICKED.
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
LOG=.planning/exec/gates120.log
: > "$LOG"
F=0

exact() { # id want cmd...
  local id="$1" want="$2"; shift 2
  local out rc
  out=$("$@" 2>&1); rc=$?
  printf '== %s: %s\n%s\n(rc=%s)\n' "$id" "$*" "$out" "$rc" >> "$LOG"
  local last; last=$(printf '%s\n' "$out" | tail -1)
  if [ "$last" = "$want" ] && [ "$rc" = 0 ]; then echo "PASS $id: got $last"; else echo "FAIL $id: got '$last' rc=$rc (want '$want' rc=0)"; F=$((F+1)); return 1; fi
}
regex() { # id regex cmd...
  local id="$1" re="$2"; shift 2
  local out rc
  out=$("$@" 2>&1); rc=$?
  printf '== %s: %s\n%s\n(rc=%s)\n' "$id" "$*" "$out" "$rc" >> "$LOG"
  local last; last=$(printf '%s\n' "$out" | tail -1)
  if printf '%s' "$last" | grep -Eq "$re" && [ "$rc" = 0 ]; then echo "PASS $id: got $last"; else echo "FAIL $id: got '$last' rc=$rc (want /$re/ rc=0)"; F=$((F+1)); return 1; fi
}

pre() {
  exact G1 "[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations." node_modules/.bin/tsx lib/copy-lint-cli.ts || return 1
  exact G2 "vendor-gate: clean" node scripts/vendor-gate.mjs || return 1
  exact G3 "retired-phrases-gate self-test: 72 planted caught, 32 near misses passed" node scripts/retired-phrases-gate.mjs --self-test || return 1
  exact G4 "retired-phrases-gate: clean" node scripts/retired-phrases-gate.mjs || return 1
  exact G5 "accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms" node scripts/accent-states-lint.mjs --self-test || return 1
  exact G6 "accent-states-lint: clean" node scripts/accent-states-lint.mjs || return 1
  exact G7 "gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean" node scripts/gsap-quarantine-gate.mjs --self-test || return 1
  regex G8 '^gsap-quarantine-gate: clean \([0-9]+ files\)$' node scripts/gsap-quarantine-gate.mjs || return 1
  return 0
}

if pre; then
  echo "== G9: npx next build --webpack" >> "$LOG"
  npx next build --webpack >> "$LOG" 2>&1; rc=$?
  if [ "$rc" = 0 ]; then echo "PASS G9: got exit 0"; else echo "FAIL G9: got exit $rc (want 0) — see $LOG"; F=$((F+1)); fi
  if [ "$rc" = 0 ]; then
    regex G10 '^render-gate: [0-9]+ routes — links resolve, fragments exist, metadata within limits\.$' node scripts/render-gate.mjs
    out=$(npx tsc --noEmit 2>&1); rc=$?; printf '== G11: npx tsc --noEmit\n%s\n(rc=%s)\n' "$out" "$rc" >> "$LOG"
    if [ -z "$out" ] && [ "$rc" = 0 ]; then echo "PASS G11: got no output, exit 0"; else echo "FAIL G11: got rc=$rc, $(printf '%s' "$out" | wc -l) lines (want none, 0)"; F=$((F+1)); fi
    exact G12 "birth-worker.html content-engine.html guardicore.html ordani.html rfp-engine.html" node -e 'console.log(require("fs").readdirSync(".next/server/app/work").filter(f=>f.endsWith(".html")).sort().join(" "))'
    exact G13 "layout-gate self-test: 7 planted defects caught, 8 near misses clean" node scripts/layout-gate.mjs --self-test
    node scripts/ordani-claims-gate.mjs > .planning/exec/ordani120.txt 2>&1
    g14=$(grep -c -e "^ordani-claims-gate: app" -e "^ordani-claims-gate: components" -e "^ordani-claims-gate: content" .planning/exec/ordani120.txt)
    if [ "$g14" = 0 ]; then echo "PASS G14: got 0"; else echo "FAIL G14: got $g14 (want 0)"; F=$((F+1)); fi
    g15=$(grep -c "product.playbook.src" .planning/exec/ordani120.txt)
    if [ "$g15" = 10 ]; then echo "PASS G15: got 10"; else echo "FAIL G15: got $g15 (want 10)"; F=$((F+1)); fi
  fi
else
  echo "STOP: a pre-build gate failed; next build not run (package.json && order). See $LOG"
fi
echo "build120 failures: $F"
[ "$F" = 0 ] || exit 1
