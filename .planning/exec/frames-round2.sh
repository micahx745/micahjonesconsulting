#!/usr/bin/env bash
set -u
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live"
echo "== serve 3251 $(date +%H:%M:%S)"
pnpm start -p 3251 > .planning/exec/server-round2.log 2>&1 &
SRV=$!
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3251/ || true)
  if [ "$code" = "200" ]; then echo "server up"; break; fi
  sleep 5
done
echo "== frames after (exact) $(date +%H:%M:%S)"
node .planning/exec/scoreboard-frames-123c.mjs http://localhost:3251 after .planning/qa/pass-123/scoreboard 2>&1 | tail -12
echo "== compose"
node .planning/exec/compose-pass123c-sheets.mjs 2>&1 | tail -6
echo "== per-beat pixel diff before vs after"
for w in 390 1440; do for b in b0 b1 b2 b3; do
  printf "%s %s: " "$w" "$b"
  node .planning/exec/png-diff-123c.mjs ".planning/qa/pass-123/scoreboard/before-$w-$b.png" ".planning/qa/pass-123/scoreboard/after-$w-$b.png" 2>&1 | tr -d '\n ' | sed 's/.*"meanAbsDiffPerChannel":\[\([0-9.,]*\)\].*"pixelsOver8":\([0-9]*\),"pixelsOver8Pct":\([0-9.]*\).*/mean \1 | over8 \2 (\3%)/'
  echo
done; done
kill $SRV 2>/dev/null; sleep 2
echo "== done $(date +%H:%M:%S)"
