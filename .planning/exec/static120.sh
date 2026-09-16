#!/usr/bin/env bash
# Pass-120 static checks (no server), run by the main session after every writer leg landed.
# Brief §2.8 V3/V4/V6/V8, §3-4 C1-C13, §3b.12 W2a-W2j, §6.4 X1-X8, §5.6 V3. Expected values are the
# brief's, except where section 1 changed them (named inline). Ends `static120 failures: N`.
set -u
export MSYS_NO_PATHCONV=1
cd /c/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live || exit 9
F=0
chk() { # id want got
  if [ "$3" = "$2" ]; then echo "PASS $1: got $3"; else echo "FAIL $1: got [$3] (want [$2])"; F=$((F+1)); fi
}

chk V3 0 "$(grep -rnE "titleCardWords|heroStill|indexLine|CaseStudySidebar|cs\.year|cs\.tools|cs\.role|\.stats\b|\.feature\b" app components lib content mdx-components.tsx | wc -l | tr -d ' ')"
chk V4a "birth-worker.mdx content-engine.mdx guardicore.mdx ordani.mdx passioneer.mdx rfp-engine.mdx" "$(ls content/work | tr '\n' ' ' | sed 's/ $//')"
chk V4b 1 "$(ls public/guardicore-telaviv.jpg 2>&1 | grep -c "No such file")"
chk V4c 0 "$(grep -rn "guardicore-telaviv.jpg" app components content | wc -l | tr -d ' ')"
chk V6a 0 "$(grep -rniE "industry author|industry-authority|the same engagement|290,000|290K|\b8K\b|8,000|36×|36x|every practitioner had been hacked|one of four companies I worked inside|Helped launch · 2025|client revenue|consulting revenue|anti.racism|repositioned toward|organic bookings" content lib/case-study-schema.ts | wc -l | tr -d ' ')"
chk V6b 0 "$(grep -rnE "(19|20)[0-9]{2} ?[-–] ?(19|20)[0-9]{2}" content | wc -l | tr -d ' ')"
chk V6c "0 0 0 0 0 0" "$(grep -c "—" content/work/guardicore.mdx content/work/rfp-engine.mdx content/work/ordani.mdx content/work/content-engine.mdx content/work/birth-worker.mdx content/work-page.ts | sed 's/.*://' | tr '\n' ' ' | sed 's/ $//')"
chk V6d 0 "$(grep -ciE "caption" content/work/*.mdx | grep -v ":0" | wc -l | tr -d ' ')"
chk V6e "vendor-gate: clean" "$(node scripts/vendor-gate.mjs 2>&1 | tail -1)"
chk V6f 0 "$(node scripts/ordani-claims-gate.mjs 2>&1 | grep -ci "content")"
chk V8a 0 "$(grep -cE "44\.8|14\.2|3\.15|100,000" content/work/ordani.mdx)"
chk V8b 1 "$(grep -c "{CDC.blackRate}" content/work/ordani.mdx)"
chk "S5-V3 gate" "retired-phrases-gate: clean" "$(node scripts/retired-phrases-gate.mjs 2>&1 | tail -1)"
chk "S5-V1 selftest" "retired-phrases-gate self-test: 70 planted caught, 32 near misses passed" "$(node scripts/retired-phrases-gate.mjs --self-test 2>&1 | tail -1)"

chk C1a "gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean" "$(node scripts/gsap-quarantine-gate.mjs --self-test 2>&1 | tail -1)"
c1b=$(node scripts/gsap-quarantine-gate.mjs 2>&1 | tail -1); if printf '%s' "$c1b" | grep -Eq '^gsap-quarantine-gate: clean \([0-9]+ files\)$'; then echo "PASS C1b: got $c1b"; else echo "FAIL C1b: got $c1b"; F=$((F+1)); fi
chk C2 0 "$(grep -nE '"gsap|@gsap/|ScrollTrigger|PIN_DISTANCE_PX|useLenis|useGSAP|use client' components/TitleCard.tsx | wc -l | tr -d ' ')"
chk C3 5 "$(ls components/TitleCardComposition.tsx components/CaseStudySidebar.tsx components/CaseStudyStill.tsx components/Dek.tsx components/CopperRule.tsx 2>&1 | grep -c "No such file")"
chk C4 0 "$(grep -rlE "CaseStudyStill|CaseStudySidebar|TitleCardComposition|titleCardWords|PIN_DISTANCE_PX|components/Dek|CopperRule|pin: true" app components lib mdx-components.tsx | wc -l | tr -d ' ')"
chk C5 0 "$(grep -cE 'data-title-card|\.title-card|data-tc-|\.case-study__|\.case-study-(dek|still|copper-rule)|\.case-study \{' app/globals.css)"
# C6 and C10 follow prettier's formatting (judge F4, .planning/reviews/FABLE-120-FIRST-PREVIEW.md):
# old C6 "0 6 1" -> "0 5 1" (the data-in-view underline selector now wraps, starting `.cs-body` alone);
# old C10 literal `^\.cw-area { scroll-margin-top: 96px; }$` -> the three-line rule, matched by -A1.
chk C6 "0 5 1" "$(grep -c 'data-mode="theater"\] \.case-study-pull-quote' app/globals.css) $(grep -c '^\.cs-body \.case-study-pull-quote' app/globals.css) $(grep -c '^  \.cs-body \.case-study-pull-quote__underline path {$' app/globals.css)"
chk C7 "2 1 1" "$(grep -c "cs-settle" app/globals.css) $(grep -c "(prefers-reduced-motion: no-preference) and (scripting: enabled)" app/globals.css) $(awk '/PASS-120 STUDY TEMPLATE \(Direction B/,/END PASS-120 STUDY TEMPLATE/' app/globals.css | grep -c "animation:")"
chk C8 0 "$(git diff "$(cat .planning/exec/p120-base.txt)" -- app/globals.css components/view-transition-link.tsx | grep -cE '^[-+][^-+].*(duration-mode-fade|view-transition-(old|new|group)|startViewTransition)')"
chk C9 "title-card components/TitleCard.tsx,app/globals.css false false true true" "$(node -e "const m=require('./.claude/brand.json').motion;console.log(m.signature.id,m.signature.files.join(','),/Inter Display/.test(JSON.stringify(m)),/600ms ease-in-out/.test(JSON.stringify(m)),m.view_transition.description.startsWith('900ms ease-in-out'),m.signature.description.includes('settles in once when the study page renders'))")"
chk C10 "1 1" "$(grep -c 'id={service.slug}' "app/(foyer)/services/page.tsx") $(grep -A1 '^\.cw-area {$' app/globals.css | grep -c '^  scroll-margin-top: 96px;$')"
chk C11 0 "$(grep -nE "figcaption|caption" components/study/StudyBlocks.tsx | wc -l | tr -d ' ')"
chk C12 "0 5" "$(grep -cE "TitleCard|Dek|CaseStudyStill|CopperRule" mdx-components.tsx) $(grep -cE "^    (Step|Exhibit|ExhibitRow|ChapterBreak|PullQuote),$" mdx-components.tsx)"
chk C13 1 "$(grep -c 'var(--cs-accent, var(--color-accent-copper))' components/PullQuote.tsx)"

chk W2a "exit=1" "$(grep -rn "cw-lot\|cw-wk" app components lib scripts; echo "exit=$?")"
chk W2bcd "3 1 0" "$(grep -c 'data-world="bone"' "app/(foyer)/work/page.tsx") $(grep -c 'OpeningWorld name="bone"' "app/(foyer)/work/page.tsx") $(grep -c "espresso\|figcaption\|\.year\|indexLine\|feature\|stats" "app/(foyer)/work/page.tsx")"
chk W2ef "2 2" "$(grep -c 'destination: "/work#record"' next.config.ts) $(grep -c 'source: "/work/postmates"\|source: "/work/neuton"' next.config.ts)"
chk W2g 0 "$(grep -cE 'autoPlay|\bloop\b[^,]|\bcontrols\b[^,]|<track' components/color-worlds/WorkHeroClip.tsx)"
w2h=$(node -e 'const m=require("./.claude/brand.json").motion;console.log(m.heroclip.id, m.heroclip.files.length, Object.keys(m).join(","))'); if printf '%s' "$w2h" | grep -q '^work-hero-clip 4 ' && printf '%s' "$w2h" | grep -q 'countup,heroclip,banned'; then echo "PASS W2h: got $w2h"; else echo "FAIL W2h: got $w2h"; F=$((F+1)); fi
chk W2i 16cc3bc6bc5563944dabb8396c5ee975e8140d3f "$(git hash-object "app/(foyer)/work/opengraph-image.tsx")"
chk W2j "app/(foyer)/work/page.tsx:1 components/color-worlds/WorkHeroClip.tsx:0" "$(grep -c "—" "app/(foyer)/work/page.tsx" components/color-worlds/WorkHeroClip.tsx | tr '\n' ' ' | sed 's/ $//')"

chk X1 "exit=1" "$(grep -rl "titleCardWords" app components lib content; echo "exit=$?")"
chk X2 "exit=1" "$(grep -rlF --include=*.mdx --include=*.tsx -e "44.8" -e "3.15" -e "14.2" app components content; echo "exit=$?")"
x3=$(grep -c "ORDANI_CDC_2024" content/citations.ts); if [ "$x3" -ge 1 ]; then echo "PASS X3: got $x3"; else echo "FAIL X3: got $x3"; F=$((F+1)); fi
chk X4 true "$(node -e 'const r=f=>require("fs").readFileSync(f,"utf8").match(/^client:.*$/m)[0];console.log(r("content/work/rfp-engine.mdx")!==r("content/work/content-engine.mdx"))')"
chk X5 "exit=1" "$(grep -rn -e "cs.year" -e "lead.year" -e "[^a-zA-Z]s.year" -e "{year}" -e "year={" app components; echo "exit=$?")"
chk X6 "false true true false" "$(node -e 'const m=require("./.claude/brand.json").motion;const d=m.signature.description;console.log(/Inter/.test(d),/600ms/.test(d),/900ms/.test(m.view_transition.description),/600ms/.test(m.view_transition.description))')"
chk X8 0 "$(grep -rn "guardicore-telaviv.jpg" app components content | wc -l | tr -d ' ')"
chk "O-a publishedAt x5" 5 "$(grep -l '^publishedAt: "2026-09-16"$' content/work/*.mdx | wc -l | tr -d ' ')"
chk "accent-states selftest" "accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms" "$(node scripts/accent-states-lint.mjs --self-test 2>&1 | tail -1)"
chk "accent-states" "accent-states-lint: clean" "$(node scripts/accent-states-lint.mjs 2>&1 | tail -1)"
chk "layout-gate selftest" "layout-gate self-test: 7 planted defects caught, 8 near misses clean" "$(node scripts/layout-gate.mjs --self-test 2>&1 | tail -1)"
echo "static120 failures: $F"
[ "$F" = 0 ] || exit 1
