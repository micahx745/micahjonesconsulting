#!/usr/bin/env bash
# Pass-111a gate battery. Every flag lives HERE so no prompt ever carries one.
# Each gate prints its own real exit code; nothing is piped away before it is read.
set -u
# bash reads a running script from disk by byte offset, so an edit made while it
# runs re-executes whatever lands at the old offset (Pass-111a: an edit during the
# shots step re-ran axe-worlds). Always run from a private copy.
if [ -z "${GATES_COPY:-}" ]; then
  c="$(mktemp)"; cp "$0" "$c"; GATES_COPY=1 exec bash "$c" "$@"
fi
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live" || exit 1
export MSYS_NO_PATHCONV=1
Q=.planning/qa/pass-111a
mkdir -p "$Q"

echo "=== tsc ==="; npx tsc --noEmit; echo "tsc exit: $?"
echo "=== copy-lint ==="; npx tsx lib/copy-lint-cli.ts; echo "copy-lint exit: $?"
echo "=== vendor ==="; node scripts/vendor-gate.mjs; echo "vendor exit: $?"
echo "=== retired phrases ==="; node scripts/retired-phrases-gate.mjs; echo "retired exit: $?"
echo "=== accent states ==="; node scripts/accent-states-lint.mjs --self-test; echo "accent self-test exit: $?"; node scripts/accent-states-lint.mjs; echo "accent-states exit: $?"
echo "=== gsap quarantine ==="; node scripts/gsap-quarantine-gate.mjs --self-test; echo "gsap self-test exit: $?"; node scripts/gsap-quarantine-gate.mjs; echo "gsap exit: $?"
echo "=== new-block colour grep (expect NO lines) ==="
python -P - <<'PY'
import re
css = open("app/globals.css", encoding="utf-8").read()
bad = 0
for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
    sel = " ".join(m.group(1).split())
    if not re.search(r'\.cw-(pbox|rec|exits|ord-grid|ord-lead|ord-copy|ord-strip|offer)', sel):
        continue
    for decl in m.group(2).split(";"):
        d = decl.strip()
        if not d or ":" not in d: continue
        prop, val = [x.strip() for x in d.split(":", 1)]
        hit = None
        if re.search(r'#[0-9a-fA-F]{3,8}\b', val): hit = "hex"
        elif "--color-cw-" in val: hit = "fixed palette token"
        elif "--cw-accent" in val: hit = "--cw-accent"
        elif prop == "opacity": hit = "opacity"
        if hit:
            bad += 1
            line = css[:m.start()].count("\n") + 1
            print(f"  {line}: {sel[:80]} :: {d[:70]}  [{hit}]")
print(f"new-block colour findings: {bad}")
PY
echo "=== load-bearing sweep (expect only banned.ts, brand.json, LESSONS, briefs) ==="
grep -rniE "load[- ]bearing" app content components lib public | cut -c1-140
echo "=== prettier ==="
npx prettier --write app/globals.css "app/(foyer)/page.tsx" components/color-worlds/Hero.tsx components/color-worlds/PriceBox.tsx components/color-worlds/RevenueFigure.tsx components/color-worlds/ExitRecord.tsx components/hand/HandCircle.tsx content/citations.ts scripts/gsap-quarantine-gate.mjs scripts/layout-gate.mjs package.json
npx prettier --check app/globals.css "app/(foyer)/page.tsx" components/color-worlds/Hero.tsx components/color-worlds/PriceBox.tsx components/color-worlds/RevenueFigure.tsx components/color-worlds/ExitRecord.tsx components/hand/HandCircle.tsx content/citations.ts scripts/gsap-quarantine-gate.mjs scripts/layout-gate.mjs package.json; echo "prettier-check exit: $?"
echo "=== build (webpack; pnpm build FAILS on this machine with a font error) ==="
npx next build --webpack > "$Q/build.log" 2>&1; b=$?
grep -Ei "compiled|error|failed" "$Q/build.log" | head -8; echo "build exit: $b"
[ $b -ne 0 ] && { echo "BUILD FAILED, stopping before the server and gates"; exit 1; }
echo "=== restart server on 3200 ==="
for pid in $(powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -match '3200' } | ForEach-Object { \$_.ProcessId }" 2>/dev/null); do
  powershell -NoProfile -Command "Stop-Process -Id $pid -Force" 2>/dev/null || true
done
sleep 2
(npx next start --port 3200 > "$Q/server.log" 2>&1 &)
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:3200/ && break; sleep 1; done
echo "=== render-gate ==="; node scripts/render-gate.mjs; echo "render-gate exit: $?"
echo "=== served copy checks (expect 0 for each) ==="
for s in "Every line below is real" "Stated on this site" "conservative floor" "load-bearing" "See the three engagements"; do
  n=$(curl -s http://localhost:3200/ | grep -c "$s"); echo "  '$s' on /: $n"
done
echo "  \$20M+ on /: $(curl -s http://localhost:3200/ | grep -c '\$20M+')   \$5.58B on /: $(curl -s http://localhost:3200/ | grep -c '5.58B')"
echo "=== axe-worlds on / /services /packages ==="
AXE_OUT="$Q/axe.json" node scripts/axe-worlds.mjs http://localhost:3200 > "$Q/axe.log" 2>&1; a=$?
cat "$Q/axe.log"; echo "axe-worlds exit: $a"
echo "=== layout gate (words split across lines, pricing boxes vs viewport, grid fill) ==="
node scripts/layout-gate.mjs --self-test; echo "layout self-test exit: $?"
node scripts/layout-gate.mjs http://localhost:3200 > "$Q/layout.log" 2>&1; l=$?
cat "$Q/layout.log"; echo "layout-gate exit: $l"
echo "=== captures + measurements ==="
node .planning/exec/shots111a.mjs http://localhost:3200 "$Q"; echo "shots exit: $?"
echo "=== ALL GATES RUN ==="
