#!/usr/bin/env bash
# Judge F6 (.planning/reviews/FABLE-120-FIRST-PREVIEW.md section 4): L1b re-measured in ONE environment.
# 1. Lighthouse x3 on the fixed build at :3200 -> .planning/exec/lh120/ (the page changed since the first run).
# 2. Stop :3200. Build the base commit 73dde08 in a temporary detached worktree with the same build
#    command as the branch (`npx next build --webpack`; the gates are not part of a measurement), serve it
#    on :3201, Lighthouse x3 -> .planning/exec/lh120-base/, stop it, remove the worktree.
# 3. Print `L1b-local: build <median>ms vs base-local <median>ms; LCP element build=<sel> base=<sel>`
#    and PASS/FAIL (build median <= base median). Never trims the clip or poster.
set -u
export MSYS_NO_PATHCONV=1
R=/c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live
cd "$R" || exit 9
LH=C:/tmp/p101tools/node_modules/lighthouse/cli/index.js
CH="C:/Program Files/Google/Chrome/Application/chrome.exe"
lh3() { # url outdir
  mkdir -p "$2"
  for i in 1 2 3; do
    node $LH "$1" --only-categories=performance --output=json --output-path="$2/work-$i.json" --chrome-path="$CH" --chrome-flags="--headless=new" --quiet
    echo "  lighthouse $1 run $i rc=$?"
  done
}
killport() {
  powershell -NoProfile -Command "\$c=Get-NetTCPConnection -LocalPort $1 -State Listen -ErrorAction SilentlyContinue; if(\$c){\$c|Select-Object -ExpandProperty OwningProcess -Unique|ForEach-Object{Stop-Process -Id \$_ -Confirm:\$false}; 'stopped '+$1}else{'none on '+$1}"
}

echo "== 1. build at :3200"
[ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3200/work)" = 200 ] || { echo "STOP: :3200 not serving"; exit 1; }
lh3 http://localhost:3200/work .planning/exec/lh120
killport 3200

echo "== 2. base 73dde08 at :3201"
B=C:/tmp/p120-base
git worktree remove --force "$B" 2>/dev/null
git worktree add --detach "$B" 73dde08 || { echo "STOP: worktree add failed"; exit 1; }
( cd "$B" && pnpm install --frozen-lockfile --prefer-offline > "$R/.planning/exec/f6-base-install.log" 2>&1; echo "  install rc=$?" )
( cd "$B" && npx next build --webpack > "$R/.planning/exec/f6-base-build.log" 2>&1; echo "  base build rc=$?" )
( cd "$B" && npx next start --port 3201 > "$R/.planning/exec/f6-base-server.log" 2>&1 & )
for i in $(seq 1 60); do c=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3201/work); [ "$c" = 200 ] && break; sleep 1; done
echo "  base :3201 /work $c"
if [ "$c" = 200 ]; then lh3 http://localhost:3201/work .planning/exec/lh120-base; fi
killport 3201
sleep 2
git worktree remove --force "$B" && echo "  worktree removed"
git worktree list

echo "== 3. comparison"
node -e '
const fs=require("fs");
const read=(d)=>[1,2,3].map(i=>{try{const j=JSON.parse(fs.readFileSync(`${d}/work-${i}.json`,"utf8"));const a=j.audits;
 const items=a["lcp-breakdown-insight"]?.details?.items??[];const node=items.find(x=>x.type==="node");
 return {lcp:a["largest-contentful-paint"].numericValue,fcp:a["first-contentful-paint"].numericValue,cls:a["cumulative-layout-shift"].numericValue,score:j.categories.performance.score,el:node?.selector??a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.selector??"?"}}catch(e){return null}}).filter(Boolean);
const med=(v)=>v.length===3?[...v].sort((x,y)=>x-y)[1]:NaN;
const b=read(".planning/exec/lh120"),s=read(".planning/exec/lh120-base");
for(const [n,v] of [["build",b],["base-local",s]]) v.forEach((r,i)=>console.log(`  ${n} run ${i+1}: score ${r.score} FCP ${Math.round(r.fcp)} LCP ${Math.round(r.lcp)} CLS ${r.cls} el ${r.el}`));
const bm=med(b.map(r=>r.lcp)),sm=med(s.map(r=>r.lcp));
console.log(`L1b-local: build ${bm.toFixed(1)}ms vs base-local ${sm.toFixed(1)}ms; LCP element build=${b[0]?.el} base=${s[0]?.el}`);
console.log((bm<=sm?"PASS":"FAIL")+` L1b-local: got ${bm.toFixed(1)} (want <= ${sm.toFixed(1)})`);
'
