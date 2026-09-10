#!/usr/bin/env bash
# Pass-108 gate battery. Every flag lives HERE so no prompt ever carries one.
set -u
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live" || exit 1
echo "=== tsc ==="              ; npx tsc --noEmit 2>&1 | head -20
echo "=== copy-lint ==="        ; npx tsx lib/copy-lint-cli.ts 2>&1 | tail -3
echo "=== vendor ==="           ; node scripts/vendor-gate.mjs 2>&1 | tail -2
echo "=== retired phrases ===" ; node scripts/retired-phrases-gate.mjs 2>&1 | tail -2
echo "=== prettier ==="         ; npx prettier --write "app/(foyer)/page.tsx" "app/(foyer)/services/page.tsx" "app/globals.css" 2>&1 | tail -4
echo "=== build (webpack; pnpm build FAILS on this machine, font error) ==="
npx next build --webpack 2>&1 | grep -Ei "compiled|error|failed" | head -6
echo "=== restart server on 3200 ==="
for pid in $(powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -match '3200' } | ForEach-Object { \$_.ProcessId }" 2>/dev/null); do
  powershell -NoProfile -Command "Stop-Process -Id $pid -Force" 2>/dev/null || true
done
sleep 2
(npx next start --port 3200 >/dev/null 2>&1 &)
sleep 12
echo "=== render-gate ==="      ; node scripts/render-gate.mjs 2>&1 | tail -4
echo "=== ALL GATES RUN ==="
