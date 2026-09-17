#!/usr/bin/env bash
# Pass-120 release, STANDING_TECHNIQUES CARD 1 after the push to main (operator 2026-09-16,
# "Override, release today"). Waits for the named production deployment (the auto-deploy of the
# pushed main SHA) to be Ready, aliases BOTH domains to it (LESSONS #5: www is a per-deploy alias,
# and the alias must come after the push), and proves both domains serve that deployment id.
# Usage: bash .planning/exec/release120.sh <deployment-url> <dpl_id>
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting || exit 9   # the main checkout carries .vercel/project.json
URL="$1"; DPL="$2"
echo "== waiting for $DPL ($URL) to be Ready"
ok=""
for i in $(seq 1 60); do
  st=$(npx vercel inspect "$URL" --scope passioneer 2>&1 | grep -iE 'status' | head -1 | tr -s ' ')
  echo "  [$i] $st"
  if printf '%s' "$st" | grep -qi 'ready'; then ok=1; break; fi
  if printf '%s' "$st" | grep -qiE 'error|canceled'; then echo "STOP: deployment failed"; exit 1; fi
  sleep 15
done
[ -n "$ok" ] || { echo "STOP: not Ready after 15 minutes"; exit 1; }
echo "== aliasing both domains to $URL"
npx vercel alias set "$URL" micahjonesconsulting.vercel.app --scope passioneer 2>&1 | tail -2
npx vercel alias set "$URL" www.micahjonesconsulting.com --scope passioneer 2>&1 | tail -2
sleep 5
a=$(curl -s https://www.micahjonesconsulting.com/ | grep -o 'data-dpl-id="[^"]*"' | head -1)
b=$(curl -s https://micahjonesconsulting.vercel.app/ | grep -o 'data-dpl-id="[^"]*"' | head -1)
echo "www:    $a"
echo "vercel: $b"
if [ "$a" = "data-dpl-id=\"$DPL\"" ] && [ "$b" = "$a" ]; then echo "PASS both domains serve $DPL"; else echo "FAIL domains do not both serve $DPL"; exit 1; fi
