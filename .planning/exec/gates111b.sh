#!/usr/bin/env bash
# Pass-111b gate battery (from gates112.sh). Every flag lives HERE so no prompt
# ever carries one. Each gate prints its own real exit code; nothing is piped
# away before it is read. The served-check block is the §13 replacement in full.
set -u
# bash reads a running script from disk by byte offset, so an edit made while it
# runs re-executes whatever lands at the old offset (Pass-111a: an edit during the
# shots step re-ran axe-worlds). Always run from a private copy.
if [ -z "${GATES_COPY:-}" ]; then
  c="$(mktemp)"; cp "$0" "$c"; GATES_COPY=1 exec bash "$c" "$@"
fi
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live" || exit 1
export MSYS_NO_PATHCONV=1
Q=.planning/qa/pass-111b
mkdir -p "$Q"

echo "=== tsc ==="; npx tsc --noEmit; echo "tsc exit: $?"
echo "=== copy-lint ==="; npx tsx lib/copy-lint-cli.ts; echo "copy-lint exit: $?"
echo "=== vendor ==="; node scripts/vendor-gate.mjs; echo "vendor exit: $?"
echo "=== retired self-test ==="; node scripts/retired-phrases-gate.mjs --self-test; echo "retired self-test exit: $?"
echo "=== retired phrases ==="; node scripts/retired-phrases-gate.mjs; echo "retired exit: $?"
echo "=== accent states ==="; node scripts/accent-states-lint.mjs --self-test; echo "accent self-test exit: $?"; node scripts/accent-states-lint.mjs; echo "accent-states exit: $?"
echo "=== gsap quarantine ==="; node scripts/gsap-quarantine-gate.mjs --self-test; echo "gsap self-test exit: $?"; node scripts/gsap-quarantine-gate.mjs; echo "gsap exit: $?"
echo "=== colour grep over every NEW selector (.cw-pband/.cw-pick/.cw-areas/.cw-area and children; 1 = no findings) ==="
# The Pass-111b block is the appended tail of globals.css; capture it from its
# header comment to EOF and grep it for hex, palette tokens, accent, opacity.
sed -n '/Pass-111b — \/services as boxes/,$p' app/globals.css > "$Q/newsel.css"
grep -nE '#[0-9a-fA-F]{3,8}|--color-cw-|--cw-accent|opacity' "$Q/newsel.css"; echo "colour grep exit: $? (expect 1)"
echo "=== prettier (the Pass-111b touched list only; never markdown, never the .sh) ==="
npx prettier --write "app/(foyer)/services/page.tsx" "app/(foyer)/packages/page.tsx" "app/(foyer)/page.tsx" "app/(foyer)/work/page.tsx" "app/(foyer)/call/page.tsx" app/llms.txt/route.ts components/color-worlds/PriceBox.tsx components/color-worlds/PackageBand.tsx components/color-worlds/BookCallForm.tsx components/BuyButton.tsx app/actions/package-checkout.ts app/api/stripe/webhook/route.ts lib/package-delivery.ts lib/catalog.ts scripts/retired-phrases-gate.mjs scripts/stripe-setup.mjs app/globals.css .planning/exec/shots111b.mjs
npx prettier --check "app/(foyer)/services/page.tsx" "app/(foyer)/packages/page.tsx" "app/(foyer)/page.tsx" "app/(foyer)/work/page.tsx" "app/(foyer)/call/page.tsx" app/llms.txt/route.ts components/color-worlds/PriceBox.tsx components/color-worlds/PackageBand.tsx components/color-worlds/BookCallForm.tsx components/BuyButton.tsx app/actions/package-checkout.ts app/api/stripe/webhook/route.ts lib/package-delivery.ts lib/catalog.ts scripts/retired-phrases-gate.mjs scripts/stripe-setup.mjs app/globals.css .planning/exec/shots111b.mjs; echo "prettier-check exit: $?"
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
echo "=== served checks (brief §13, replaced in full) ==="
sf=0
chk () { echo "  $1: got $2, expect $3"; [ "$2" = "$3" ] || sf=$((sf+1)); }
chkmin () { echo "  $1: got $2, expect >=$3"; [ "$2" -ge "$3" ] || sf=$((sf+1)); }
S=http://localhost:3200
SV=$(curl -s "$S/services"); PK=$(curl -s "$S/packages"); WK=$(curl -s "$S/work"); HM=$(curl -s "$S/"); LL=$(curl -s "$S/llms.txt")
chk "box figures showing \$5K on /services"      "$(printf '%s' "$SV" | grep -o 'class="cw-pbox__fig cw-nowrap">\$5K' | wc -l | tr -d ' ')" 1
chk "cw-pbox__from spans on /services"           "$(printf '%s' "$SV" | grep -o 'class="cw-pbox__from"' | wc -l | tr -d ' ')" 1
chk "Engagements from \$5K (services+packages+work+llms)" "$(printf '%s%s%s%s' "$SV" "$PK" "$WK" "$LL" | grep -ci 'Engagements from \$5K')" 0
chk "start at \$5K anywhere"                     "$(printf '%s%s%s%s' "$SV" "$PK" "$WK" "$LL" | grep -ci 'start at \$5K')" 0
chk "standing rate on /services"                 "$(printf '%s' "$SV" | grep -ci 'standing rate')" 0
chk "Scoped as a figure on /services"            "$(printf '%s' "$SV" | grep -o 'cw-pbox__fig[^>]*>Scoped' | wc -l | tr -d ' ')" 0
chk "Frontier on /services + / + llms"           "$(printf '%s%s%s' "$SV" "$HM" "$LL" | grep -c Frontier)" 0
chk "End-to-end product building (services+llms)" "$(printf '%s%s' "$SV" "$LL" | grep -c 'End-to-end product building')" 0
chkmin "AI engineering on /services"             "$(printf '%s' "$SV" | grep -o 'AI engineering' | wc -l | tr -d ' ')" 3
chk "cw-pbox articles on /services"              "$(printf '%s' "$SV" | grep -oE 'class="cw-pbox["  ]' | wc -l | tr -d ' ')" 7
chk "pkg-area radios on /services"               "$(printf '%s' "$SV" | grep -o 'name="pkg-area"' | wc -l | tr -d ' ')" 3
chk "Ask about links on /services"               "$(printf '%s' "$SV" | grep -o 'href="/call?shape=' | wc -l | tr -d ' ')" 4
chk "tables left on /services"                   "$(printf '%s' "$SV" | grep -c '<table')" 0
chk "\$5K on /packages"                          "$(printf '%s' "$PK" | grep -c '\$5K')" 0
chk "build, production, or traction on /packages" "$(printf '%s' "$PK" | grep -ci 'build, production, or traction')" 0
chk "book mentions on /services"                 "$(printf '%s' "$SV" | grep -ciE '80% wall|/playbook|field manual')" 0
# Pass-111b §14 M2a: the /call?shape= prefill is client-side now (BookCallForm
# useEffect), so a curl of the prerendered HTML cannot see it. The two prefill
# assertions moved to shots111b.mjs's browser check on call-prefill-1440.
echo "served-checks failures: $sf"
echo "=== render-gate ==="; node scripts/render-gate.mjs; echo "render-gate exit: $?"
echo "=== axe-worlds on / /services /packages ==="
AXE_OUT="$Q/axe.json" node scripts/axe-worlds.mjs http://localhost:3200 > "$Q/axe.log" 2>&1; a=$?
cat "$Q/axe.log"; echo "axe-worlds exit: $a"
echo "=== layout gate (default routes already include /services) ==="
node scripts/layout-gate.mjs --self-test; echo "layout self-test exit: $?"
node scripts/layout-gate.mjs http://localhost:3200 > "$Q/layout.log" 2>&1; l=$?
cat "$Q/layout.log"; echo "layout-gate exit: $l"
echo "=== captures ==="
node .planning/exec/shots111b.mjs http://localhost:3200 "$Q"; echo "shots exit: $?"
echo "=== helper checks (expect: true false AI engineering null) ==="
npx tsx -e 'import { isAreaValue, areaLabel } from "./lib/catalog"; console.log(isAreaValue("build"), isAreaValue("Build"), areaLabel("production"), areaLabel(null));'
echo "helper-check exit: $?"
echo "=== ALL GATES RUN ==="
