#!/usr/bin/env bash
# Pass-110 gate battery. Every flag lives HERE so no prompt ever carries one.
# Real exit codes are printed per gate; nothing is piped away before it is read.
set -u
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live" || exit 1
export MSYS_NO_PATHCONV=1
mkdir -p .planning/qa/pass-110

echo "=== tsc ==="
npx tsc --noEmit; echo "tsc exit: $?"
echo "=== copy-lint ==="
npx tsx lib/copy-lint-cli.ts; echo "copy-lint exit: $?"
echo "=== vendor ==="
node scripts/vendor-gate.mjs; echo "vendor exit: $?"
echo "=== retired phrases ==="
node scripts/retired-phrases-gate.mjs; echo "retired exit: $?"
echo "=== accent states ==="
node scripts/accent-states-lint.mjs; echo "accent-states exit: $?"
echo "=== load-bearing sweep (expect only banned.ts, brand.json, LESSONS) ==="
grep -rniE "load[- ]bearing" app content components lib public docs .claude/brand.json | cut -c1-140
echo "=== prettier (write, then check) ==="
npx prettier --write app/globals.css "app/(foyer)/page.tsx" "app/(foyer)/services/page.tsx" components/color-worlds/Hero.tsx scripts/axe-worlds.mjs scripts/accent-states-lint.mjs lib/banned.ts app/api/stripe/webhook/route.ts
npx prettier --check app/globals.css "app/(foyer)/page.tsx" "app/(foyer)/services/page.tsx" components/color-worlds/Hero.tsx scripts/axe-worlds.mjs scripts/accent-states-lint.mjs lib/banned.ts; echo "prettier-check exit: $?"
echo "=== build (webpack; pnpm build FAILS on this machine with a font error) ==="
npx next build --webpack > .planning/qa/pass-110/build.log 2>&1; b=$?
grep -Ei "compiled|error|failed" .planning/qa/pass-110/build.log | head -8; echo "build exit: $b"
[ $b -ne 0 ] && { echo "BUILD FAILED, stopping before the server and gates"; exit 1; }
echo "=== restart server on 3200 ==="
for pid in $(powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -match '3200' } | ForEach-Object { \$_.ProcessId }" 2>/dev/null); do
  powershell -NoProfile -Command "Stop-Process -Id $pid -Force" 2>/dev/null || true
done
sleep 2
(npx next start --port 3200 > .planning/qa/pass-110/server.log 2>&1 &)
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:3200/ && break; sleep 1; done
echo "=== render-gate ==="
node scripts/render-gate.mjs; echo "render-gate exit: $?"
echo "=== axe-worlds on / /services /packages (the world gate) ==="
AXE_OUT=.planning/qa/pass-110/axe.json node scripts/axe-worlds.mjs http://localhost:3200 > .planning/qa/pass-110/axe.log 2>&1; a=$?
cat .planning/qa/pass-110/axe.log; echo "axe-worlds exit: $a"
echo "=== captures ==="
node .planning/exec/shots110.mjs http://localhost:3200 .planning/qa/pass-110; echo "shots exit: $?"
echo "=== ALL GATES RUN ==="
