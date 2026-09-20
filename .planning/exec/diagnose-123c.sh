#!/usr/bin/env bash
set -u
cd "C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live"
echo "== build $(date +%H:%M:%S)"
pnpm build > .planning/exec/build-diag-123c.log 2>&1
echo "build exit=$? $(date +%H:%M:%S)"
tail -3 .planning/exec/build-diag-123c.log
ls .next/static/css/*.css | head -2
echo "== serve 3251"
pnpm start -p 3251 > .planning/exec/server-diag-123c.log 2>&1 &
SRV=$!
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3251/ || true)
  if [ "$code" = "200" ]; then echo "server up after ${i}0s"; break; fi
  sleep 10
done
echo "== probe"
node .planning/exec/probe-actors.mjs http://localhost:3251 > .planning/exec/probe-actors-out.json 2>&1
echo "probe exit=$?"
kill $SRV 2>/dev/null
sleep 2
echo "== done $(date +%H:%M:%S)"
