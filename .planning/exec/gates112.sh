#!/usr/bin/env bash
# Pass-112 gate battery. Every flag lives HERE so no prompt ever carries one.
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
Q=.planning/qa/pass-112
mkdir -p "$Q"

echo "=== tsc ==="; npx tsc --noEmit; echo "tsc exit: $?"
echo "=== copy-lint ==="; npx tsx lib/copy-lint-cli.ts; echo "copy-lint exit: $?"
echo "=== vendor ==="; node scripts/vendor-gate.mjs; echo "vendor exit: $?"
echo "=== retired self-test ==="; node scripts/retired-phrases-gate.mjs --self-test; echo "retired self-test exit: $?"
echo "=== retired phrases ==="; node scripts/retired-phrases-gate.mjs; echo "retired exit: $?"
echo "=== accent states ==="; node scripts/accent-states-lint.mjs --self-test; echo "accent self-test exit: $?"; node scripts/accent-states-lint.mjs; echo "accent-states exit: $?"
echo "=== gsap quarantine ==="; node scripts/gsap-quarantine-gate.mjs --self-test; echo "gsap self-test exit: $?"; node scripts/gsap-quarantine-gate.mjs; echo "gsap exit: $?"
echo "=== prettier (touched code files; the three md docs were never prettier-clean, writing them would reformat history) ==="
npx prettier --write "app/(foyer)/page.tsx" "app/(foyer)/about/page.tsx" "app/(foyer)/packages/page.tsx" "app/(foyer)/services/page.tsx" "app/(foyer)/services/thanks/page.tsx" content/work/ordani.mdx components/color-worlds/Nav.tsx app/sitemap.ts lib/package-delivery.ts scripts/retired-phrases-gate.mjs package.json
npx prettier --check "app/(foyer)/page.tsx" "app/(foyer)/about/page.tsx" "app/(foyer)/packages/page.tsx" "app/(foyer)/services/page.tsx" "app/(foyer)/services/thanks/page.tsx" content/work/ordani.mdx components/color-worlds/Nav.tsx app/sitemap.ts lib/package-delivery.ts scripts/retired-phrases-gate.mjs package.json; echo "prettier-check exit: $?"
echo "=== build (webpack; pnpm build FAILS on this machine with a font error) ==="
npx next build --webpack > "$Q/build.log" 2>&1; b=$?
grep -Ei "compiled|error|failed" "$Q/build.log" | head -8; echo "build exit: $b"
echo "playbook mentions in build.log: $(grep -c playbook "$Q/build.log")"
[ $b -ne 0 ] && { echo "BUILD FAILED, stopping before the server and gates"; exit 1; }
echo "=== restart server on 3200 ==="
for pid in $(powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -match '3200' } | ForEach-Object { \$_.ProcessId }" 2>/dev/null); do
  powershell -NoProfile -Command "Stop-Process -Id $pid -Force" 2>/dev/null || true
done
sleep 2
(npx next start --port 3200 > "$Q/server.log" 2>&1 &)
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:3200/ && break; sleep 1; done
echo "=== 404s (expect 404 404) ==="
for r in /playbook /playbook/thanks; do echo "  $r: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3200$r)"; done
echo "=== served mentions (expect 0 on every route) ==="
for r in / /services /packages /about /services/thanks /work/ordani /call /call/kickoff /llms.txt /sitemap.xml; do echo "  $r: $(curl -s http://localhost:3200$r | grep -ciE '80% wall|/playbook|field manual|the playbook')"; done
echo "=== nav items on / (expect 4) ==="
curl -s http://localhost:3200/ | grep -oE 'href="/(services|work|about|contact|playbook)"' | sort -u | wc -l
echo "=== render-gate ==="; node scripts/render-gate.mjs; echo "render-gate exit: $?"
echo "=== axe-worlds on / /services /packages ==="
AXE_OUT="$Q/axe.json" node scripts/axe-worlds.mjs http://localhost:3200 > "$Q/axe.log" 2>&1; a=$?
cat "$Q/axe.log"; echo "axe-worlds exit: $a"
echo "=== layout gate (default routes) ==="
node scripts/layout-gate.mjs --self-test; echo "layout self-test exit: $?"
node scripts/layout-gate.mjs http://localhost:3200 > "$Q/layout.log" 2>&1; l=$?
cat "$Q/layout.log"; echo "layout-gate exit: $l"
echo "=== captures ==="
node .planning/exec/shots112.mjs http://localhost:3200 "$Q"; echo "shots exit: $?"
echo "=== ALL GATES RUN ==="
