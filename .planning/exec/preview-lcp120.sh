#!/usr/bin/env bash
# Pass-120 speed check on Vercel, operator 2026-09-16 "Preview deploy test (Recommended)" (LESSONS #3,
# PASS-120 FIRST-PREVIEW ANSWERS): the preview deployment of design/live-evolve against production /work,
# by the same Lighthouse loop (simulated mobile, performance only), runs INTERLEAVED
# production/preview x3 so both see the same network and machine conditions.
# The preview is behind Vercel Authentication. Access uses a temporary share link that the session
# stored in a scratchpad file; the script exchanges it for the cookie and hands Lighthouse a headers
# FILE, so no token appears on a command line, in the repo, or in any log this script writes.
# Usage: bash .planning/exec/preview-lcp120.sh <share-url-file> <preview-origin>
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
SHARE_FILE="$1"; PREVIEW="$2"
SCR="$(dirname "$SHARE_FILE")"
JAR="$SCR/preview.cookies"; HDR="$SCR/preview-headers.json"
LH=C:/tmp/p101tools/node_modules/lighthouse/cli/index.js
CH="C:/Program Files/Google/Chrome/Application/chrome.exe"
OUT=.planning/exec/lh120-vercel; mkdir -p "$OUT/preview" "$OUT/prod"

rm -f "$JAR"
curl -s -o /dev/null -c "$JAR" -L --max-redirs 5 "$(cat "$SHARE_FILE")"
node -e '
const fs=require("fs");const jar=fs.readFileSync(process.argv[1],"utf8").split(/\r?\n/);
const c=jar.filter(l=>l&&!l.startsWith("# ")).map(l=>l.split("\t")).filter(p=>p.length>=7).map(p=>`${p[5]}=${p[6]}`);
if(!c.length){console.log("no cookies captured");process.exit(1)}
fs.writeFileSync(process.argv[2],JSON.stringify({Cookie:c.join("; ")}));
console.log(`cookies captured: ${c.map(x=>x.split("=")[0]).join(", ")}`);' "$JAR" "$HDR" || { echo "STOP: no preview cookie"; exit 1; }
code=$(curl -s -o /dev/null -w '%{http_code}' -b "$JAR" "$PREVIEW/work")
echo "preview /work with cookie: $code"
[ "$code" = 200 ] || { echo "STOP: preview not reachable with cookie"; exit 1; }
dpl=$(curl -s -b "$JAR" "$PREVIEW/work" | grep -o 'data-dpl-id="[^"]*"' | head -1); echo "preview $dpl"
echo "production $(curl -s https://www.micahjonesconsulting.com/work | grep -o 'data-dpl-id="[^"]*"' | head -1)"

for i in 1 2 3; do
  node $LH "https://www.micahjonesconsulting.com/work" --only-categories=performance --output=json --output-path="$OUT/prod/work-$i.json" --chrome-path="$CH" --chrome-flags="--headless=new" --quiet; echo "prod run $i rc=$?"
  node $LH "$PREVIEW/work" --extra-headers="$HDR" --only-categories=performance --output=json --output-path="$OUT/preview/work-$i.json" --chrome-path="$CH" --chrome-flags="--headless=new" --quiet; echo "preview run $i rc=$?"
done
rm -f "$JAR" "$HDR"

node -e '
const fs=require("fs");
const read=(d)=>[1,2,3].map(i=>{const j=JSON.parse(fs.readFileSync(`${d}/work-${i}.json`,"utf8"));const a=j.audits;
 const items=a["lcp-breakdown-insight"]?.details?.items??[];const node=items.find(x=>x.type==="node");
 return {url:j.finalDisplayedUrl||j.finalUrl,status:a["largest-contentful-paint"]?.numericValue==null?"?":"ok",lcp:a["largest-contentful-paint"].numericValue,fcp:a["first-contentful-paint"].numericValue,cls:a["cumulative-layout-shift"].numericValue,score:j.categories.performance.score,el:node?.selector??"?"}});
const med=(v)=>[...v].sort((x,y)=>x-y)[1];
const p=read(".planning/exec/lh120-vercel/prod"),v=read(".planning/exec/lh120-vercel/preview");
for(const [n,r] of [["production",p],["preview",v]]) r.forEach((x,i)=>console.log(`  ${n} run ${i+1}: ${x.url.replace(/\?.*/,"")} score ${x.score} FCP ${Math.round(x.fcp)} LCP ${Math.round(x.lcp)} CLS ${x.cls} el ${x.el}`));
const pm=med(p.map(x=>x.lcp)),vm=med(v.map(x=>x.lcp));
console.log(`L1b-vercel: preview ${vm.toFixed(1)}ms vs production ${pm.toFixed(1)}ms`);
console.log((vm<=pm?"PASS":"FAIL")+` L1b-vercel: got ${vm.toFixed(1)} (want <= ${pm.toFixed(1)})`);
const cl=v.every(x=>x.cls<=0.05);console.log((cl?"PASS":"FAIL")+` L2 preview CLS: got ${v.map(x=>x.cls).join(", ")}`);'
