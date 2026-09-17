#!/usr/bin/env bash
# Pass-120 discriminating run for the Vercel L1b result (evidence only, no page change): the same
# Lighthouse loop on the preview's /work with the clip's two video files BLOCKED
# (--blocked-url-patterns), so the <video> can never fetch or paint a frame and only the poster remains.
# If simulated LCP falls back to production's ~2.71s, the 600ms preview penalty is Lighthouse's
# simulation charging LCP to the post-load video download, not a later poster paint.
# Token handling as preview-lcp120.sh: share URL read from a scratchpad file, headers passed as a file.
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
SHARE_FILE="$1"; PREVIEW="$2"
SCR="$(dirname "$SHARE_FILE")"
JAR="$SCR/preview.cookies"; HDR="$SCR/preview-headers.json"
LH=C:/tmp/p101tools/node_modules/lighthouse/cli/index.js
CH="C:/Program Files/Google/Chrome/Application/chrome.exe"
OUT=.planning/exec/lh120-vercel/preview-novideo; mkdir -p "$OUT"
rm -f "$JAR"
curl -s -o /dev/null -c "$JAR" -L --max-redirs 5 "$(cat "$SHARE_FILE")"
node -e '
const fs=require("fs");const jar=fs.readFileSync(process.argv[1],"utf8").split(/\r?\n/);
const c=jar.filter(l=>l&&!l.startsWith("# ")).map(l=>l.split("\t")).filter(p=>p.length>=7).map(p=>`${p[5]}=${p[6]}`);
if(!c.length){console.log("no cookies captured");process.exit(1)}
fs.writeFileSync(process.argv[2],JSON.stringify({Cookie:c.join("; ")}));console.log("cookie ok");' "$JAR" "$HDR" || exit 1
for i in 1 2 3; do
  node $LH "$PREVIEW/work" --extra-headers="$HDR" --blocked-url-patterns="*work-hero-720.webm" --blocked-url-patterns="*work-hero-720.mp4" --only-categories=performance --output=json --output-path="$OUT/work-$i.json" --chrome-path="$CH" --chrome-flags="--headless=new" --quiet; echo "preview-novideo run $i rc=$?"
done
rm -f "$JAR" "$HDR" "$SHARE_FILE"
node -e '
const fs=require("fs");
const v=[1,2,3].map(i=>{const j=JSON.parse(fs.readFileSync(`.planning/exec/lh120-vercel/preview-novideo/work-${i}.json`,"utf8"));const a=j.audits;const m=a.metrics.details.items[0];
 const vids=(a["network-requests"]?.details?.items??[]).filter(r=>/work-hero-720/.test(r.url)).map(r=>`${r.url.replace(/.*\//,"")}:${r.statusCode}`);
 const node=(a["lcp-breakdown-insight"]?.details?.items??[]).find(x=>x.type==="node");
 return {lcp:m.largestContentfulPaint,obs:m.observedLargestContentfulPaint,fcp:m.firstContentfulPaint,el:node?.selector??"?",vids}});
v.forEach((x,i)=>console.log(`  preview-novideo run ${i+1}: simLCP ${Math.round(x.lcp)} obsLCP ${Math.round(x.obs)} simFCP ${Math.round(x.fcp)} el ${x.el} video requests ${JSON.stringify(x.vids)}`));
const med=[...v.map(x=>x.lcp)].sort((a,b)=>a-b)[1];console.log(`preview-novideo median simulated LCP ${med.toFixed(1)}ms (production 2710.8ms, preview with video 3310.7ms)`);'
