#!/usr/bin/env bash
# Pass-120 served checks against the ONE `next start` on :3200 (brief §6.1). Sequential, so no two
# Chrome-driving scripts share the machine. Each output lands in .planning/qa/pass-120/build/<id>.txt.
# Expected values are the brief's; where section 1 or LESSONS #34 changed one, the line says so.
# Prints one PASS/FAIL line per check id and ends `served120 failures: N`.
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
S=http://localhost:3200
Q=.planning/qa/pass-120/build
mkdir -p "$Q" .planning/qa/pass-120/template
F=0
pf() { if [ "$2" = ok ]; then echo "PASS $1: $3"; else echo "FAIL $1: $3"; F=$((F+1)); fi; }
lastline() { # id file regex  -> PASS when the file's last line matches
  local l; l=$(tail -1 "$2" | tr -d '\r')
  if printf '%s' "$l" | grep -Eq "$3"; then pf "$1" ok "$l"; else pf "$1" no "$l (want /$3/)"; fi
}
T=.planning/exec/p120-text.mjs

# §2.8 V9: presence (-ge 1) and two expect-0 lines per route
{
  n=0
  ge1() { local g; g=$(node $T "$S$1" "$2"); if [ "$g" -ge 1 ]; then echo "PASS V9 $1 [$2]: $g"; else echo "FAIL V9 $1 [$2]: $g"; n=$((n+1)); fi; }
  ge1 /work/ordani "at 44.8 per 100,000 live births, 3.15 times the rate of non-Hispanic white women, per the CDC's 2024 release."
  ge1 /work "I find what your buyers are actually paying for, then build the system that sells exactly that."
  ge1 /work "Four of the companies I worked inside reached an exit."
  ge1 /work "Technology acquired by Nordic Semiconductor, 2025"
  ge1 /work "An award-winning author and leadership consultant who teaches government bodies and corporations"
  ge1 /work/birth-worker "Bookings went from one to three a month to five to ten."
  ge1 /work/rfp-engine "What the engine did"
  for r in /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker; do
    a=$(node $T "$S$r" --re "(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}"); b=$(node $T "$S$r" "Helped launch · 2025")
    if [ "$a" = 0 ] && [ "$b" = 0 ]; then echo "PASS V9 $r zeros: $a $b"; else echo "FAIL V9 $r zeros: $a $b"; n=$((n+1)); fi
  done
  echo "V9 failures: $n"
} > "$Q/V9-s2.txt" 2>&1
lastline "S2-V9" "$Q/V9-s2.txt" '^V9 failures: 0$'

# §2.8 V10 (datePublished follows O1: the release date, not 2026-05-14)
g=$(curl -s "$S/work/guardicore" | grep -o '"datePublished":"[^"]*"' | head -1); echo "$g" > "$Q/V10-s2.txt"
[ "$g" = '"datePublished":"2026-09-16"' ] && pf S2-V10 ok "$g" || pf S2-V10 no "$g (want \"datePublished\":\"2026-09-16\", O1)"

# §3-4 C14 OG images, C15 anchors
for s in guardicore rfp-engine ordani content-engine birth-worker; do curl -s -o .planning/qa/pass-120/template/og-$s.png -w "$s %{http_code} %{content_type}\n" "$S/work/$s/opengraph-image"; done > "$Q/C14.txt" 2>&1
c14=$(tr -d '\r' < "$Q/C14.txt" | tr '\n' '|')
[ "$c14" = "guardicore 200 image/png|rfp-engine 200 image/png|ordani 200 image/png|content-engine 200 image/png|birth-worker 200 image/png|" ] && pf C14 ok "5 x 200 image/png (open each PNG)" || pf C14 no "$c14"
c15=$(curl -s "$S/services" | grep -oE 'id="(ai-engineering|product-building|positioning-gtm)"' | sort | tr '\n' ' ')
echo "$c15" > "$Q/C15.txt"
[ "$c15" = 'id="ai-engineering" id="positioning-gtm" id="product-building" ' ] && pf C15 ok "$c15" || pf C15 no "[$c15]"

# §3b W3
w3a=$(for f in work-hero-720.webm work-hero-720.mp4 work-hero-poster-960.avif; do curl -sI "$S/media/$f" | tr -d '\r' | grep -i '^content-type:' | cut -d' ' -f2-; done | tr '\n' '|'); echo "$w3a" > "$Q/W3.txt"
[ "$w3a" = "video/webm|video/mp4|image/avif|" ] && pf W3a ok "$w3a" || pf W3a no "$w3a"
w3b=$(curl -s "$S/work" | grep -o '<link[^>]*work-hero-poster-960\.avif[^>]*>' | grep -c 'rel="preload"'); echo "W3b $w3b" >> "$Q/W3.txt"
[ "$w3b" = 1 ] && pf W3b ok "$w3b" || pf W3b no "$w3b (want 1)"
w3c=$(curl -s "$S/work" | grep -c 'preload="none"'); echo "W3c $w3c" >> "$Q/W3.txt"
[ "$w3c" -ge 1 ] && pf W3c ok "$w3c" || pf W3c no "$w3c (want >=1)"

# §6.5 V6/V7 redirects by curl
v6=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$S/work/postmates"); v7=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$S/work/neuton")
printf '%s\n%s\n' "$v6" "$v7" > "$Q/V6V7.txt"
[ "$v6" = "308 $S/work#record" ] && pf V6 ok "$v6" || pf V6 no "$v6"
[ "$v7" = "308 $S/work#record" ] && pf V7 ok "$v7" || pf V7 no "$v7"

# §5.6 V5 render sweep (B=:3200, LESSONS #34 zero(); brief expects 124 PASS lines, 0 FAIL)
B=$S bash .planning/exec/pass-120/s5-render.sh > "$Q/S5-V5.txt" 2>&1
p=$(grep -c '^PASS' "$Q/S5-V5.txt"); f=$(grep -c '^FAIL' "$Q/S5-V5.txt"); l=$(tail -1 "$Q/S5-V5.txt")
[ "$p" = 124 ] && [ "$f" = 0 ] && [ "$l" = "s5-render: 0 failures" ] && pf S5-V5 ok "124 PASS, 0 FAIL" || pf S5-V5 no "$p PASS, $f FAIL, last [$l]"

# Chrome-driven scripts, one at a time
node .planning/exec/claims120.mjs $S > "$Q/V1-claims120.txt" 2>&1; lastline V1-claims120 "$Q/V1-claims120.txt" '^claims120 failures: 0$'
node .planning/exec/page120.mjs $S > "$Q/V2-page120.txt" 2>&1; lastline V2-page120 "$Q/V2-page120.txt" '^page120 failures: 0$'
node .planning/exec/settle120.mjs $S > "$Q/V3-settle120.txt" 2>&1; lastline V3-settle120 "$Q/V3-settle120.txt" '^settle120 failures: 0$'
node .planning/exec/clip120.mjs $S > "$Q/V4-clip120.txt" 2>&1; lastline V4-clip120 "$Q/V4-clip120.txt" '^clip120 failures: 0$'
bash .planning/exec/card1-120.sh $S > "$Q/V5-card1-120.txt" 2>&1; lastline V5-card1-120 "$Q/V5-card1-120.txt" '^card1 failures: 0$'
node .planning/exec/template120.mjs $S --shots .planning/qa/pass-120/template > "$Q/C16-template120.txt" 2>&1; lastline C16-template120 "$Q/C16-template120.txt" '^template120 failures: 0$'
node .planning/exec/clipnav120.mjs $S > "$Q/W4-clipnav120.txt" 2>&1; lastline W4-clipnav120 "$Q/W4-clipnav120.txt" '^clipnav120 failures: 0$'
node -e 'const p=require("C:/tmp/p101tools/node_modules/puppeteer-core");(async()=>{const b=await p.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});let f=0;for(const s of ["postmates","neuton"]){const g=await b.newPage();await g.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await g.goto("http://localhost:3200/work/"+s,{waitUntil:"load"});await new Promise(r=>setTimeout(r,1500));const r=await g.evaluate(()=>({at:location.pathname+location.hash,top:Math.round(document.getElementById("record").getBoundingClientRect().top),h2:Math.round(document.querySelector("#record h2").getBoundingClientRect().bottom),vh:innerHeight}));const ok=r.at==="/work#record"&&r.top>=0&&r.top<=160&&r.h2<=r.vh;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W5 "+s+" 390: got "+JSON.stringify(r))}await b.close();console.log("W5 failures: "+f);process.exit(f?1:0)})()' > "$Q/W5.txt" 2>&1
lastline W5 "$Q/W5.txt" '^W5 failures: 0$'
AXE_OUT=$Q/axe.json node scripts/axe-worlds.mjs $S / /about /services /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker > "$Q/V8-axe.txt" 2>&1; echo "(rc=$?)" >> "$Q/V8-axe.txt"
lastline V8-axe <(grep -v '^(rc=' "$Q/V8-axe.txt") '^axe-worlds: axe-core [0-9.]+, [0-9]+ scans, 0 serious/critical finding\(s\), 0 not in KNOWN$'
node scripts/layout-gate.mjs $S > "$Q/V9-layout.txt" 2>&1; lastline V9-layout "$Q/V9-layout.txt" '^layout-gate: [0-9]+ page loads across 9 routes, 0 finding\(s\), 0 not in KNOWN$'
node .planning/exec/type117.mjs $S > "$Q/V10-type117.txt" 2>&1; lastline V10-type117 "$Q/V10-type117.txt" '^type117 failures: 0$'
node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-120/circle > "$Q/V11-circle115.txt" 2>&1; lastline V11-circle115 "$Q/V11-circle115.txt" '^circle failures: 0$'
echo "served120 failures: $F"
[ "$F" = 0 ] || exit 1
