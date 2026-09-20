#!/usr/bin/env bash
set -u
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live"
echo "== prettier/tsc $(date +%H:%M:%S)"
pnpm exec prettier --check app/globals.css components/color-worlds/ExitScoreboard.tsx 2>&1 | tail -2
pnpm exec tsc --noEmit 2>&1 | tail -3; echo "tsc exit=$?"
echo "== build $(date +%H:%M:%S)"
pnpm build > .planning/exec/build-123c-fix1.log 2>&1
echo "build exit=$?"; tail -2 .planning/exec/build-123c-fix1.log
echo "== serve 3251 $(date +%H:%M:%S)"
pnpm start -p 3251 > .planning/exec/server-123c-fix1.log 2>&1 &
SRV=$!
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3251/ || true)
  css=$(curl -s http://localhost:3251/ 2>/dev/null | grep -c '/_next/static/css/' || echo 0)
  if [ "$code" = "200" ] && [ "$css" -ge 1 ]; then echo "server up ($i)"; break; fi
  sleep 10
done
echo "== geometry AFTER $(date +%H:%M:%S)"
node .planning/exec/scoreboard-geom-123c.mjs http://localhost:3251 .planning/qa/pass-123/geom-123c-after3.json 2>&1 | tail -4
echo "== compare"
node .planning/exec/scoreboard-geom-compare-123c.mjs .planning/qa/pass-123/geom-123c-before.json .planning/qa/pass-123/geom-123c-after3.json > .planning/qa/pass-123/compare-fix2.txt 2>&1
echo "compare exit=$?"; tail -4 .planning/qa/pass-123/compare-fix2.txt; grep -c "^FAIL" .planning/qa/pass-123/compare-fix2.txt
echo "== CLS $(date +%H:%M:%S)"
node .planning/exec/cls-attrib-123.mjs http://localhost:3251 .planning/qa/pass-123/cls-123c 2>&1 | grep -E "SUMMARY|largest|total" | tail -6
kill $SRV 2>/dev/null; sleep 2
echo "== done $(date +%H:%M:%S)"
