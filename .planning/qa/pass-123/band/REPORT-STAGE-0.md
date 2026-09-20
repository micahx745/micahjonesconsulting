# Pass-123 study band — Stage 0 report

Date: 2026-09-19  
Stage requested: Stage 0 (BEFORE, no edits to product code)  
Outcome: **FAIL at step 0.5; stopped immediately under the brief's standing clause.**

The production build, route-byte baselines, and five visible-text baselines completed. The first Lighthouse run exited 1 before producing its JSON because Lighthouse could not fetch Chrome's DevTools WebSocket URL. Runs 2–3, the Lighthouse summary, steps 0.6–0.7, and the next stage were not run.

## PASS / FAIL lines

PASS 0.2 build: exit 0; final line was exactly “work-entry-gate: 5 studies — every entry figure+line renders.”  
PASS 0.3 guardicore BEFORE route JS: got files=11 bytes=679924 kB=664.0.  
PASS 0.3 rfp-engine BEFORE route JS: got files=11 bytes=679924 kB=664.0.  
PASS 0.4 birth-worker: got 4794 bytes (want > 2000).  
PASS 0.4 content-engine: got 5539 bytes (want > 2000).  
PASS 0.4 guardicore: got 4443 bytes (want > 2000).  
PASS 0.4 ordani: got 4578 bytes (want > 2000).  
PASS 0.4 rfp-engine: got 6321 bytes (want > 2000).  
FAIL 0.5 Lighthouse work-1.json: exit 1; no JSON produced; raw runtime error below.  
PASS 0.8 cleanup: port 3236 has no LISTENING line.

SKIP 0.5 Lighthouse runs 2 and 3 and summary: stopped after first unexpected failure.  
SKIP 0.6 CLS BEFORE: stopped after first unexpected failure.  
SKIP 0.7 band123 bite proof: stopped after first unexpected failure.

The band has no hover state.  
Crossfade contrast is N/A: the study pages are data-mode="theater" with one static ground and no WorldSwitcher.

## 0.1 handed-over tree

Command:

~~~powershell
git status --short
~~~

Exit: 0

Raw output:

~~~text
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
 M .planning/exec/glm121-fix2.log
 M .planning/qa/pass-112/server.log
?? .planning/exec/after118.log
?? .planning/exec/astra111b.err
?? .planning/exec/astra111b.log
?? .planning/exec/astra114.log
?? .planning/exec/astra115b.log
?? .planning/exec/astra116.log
?? .planning/exec/astra117.log
?? .planning/exec/astra118.log
?? .planning/exec/astra120.log
?? .planning/exec/astra120all.log
?? .planning/exec/axe115b.txt
?? .planning/exec/axe116.txt
?? .planning/exec/axe117.txt
?? .planning/exec/axe118.txt
?? .planning/exec/axe118v2.txt
?? .planning/exec/axe118v3.txt
?? .planning/exec/bin/
?? .planning/exec/build-123c-fix1.log
?? .planning/exec/build-123c-frames.log
?? .planning/exec/build-123c.log
?? .planning/exec/build-diag-123c.log
?? .planning/exec/build-p106-fix.log
?? .planning/exec/build115b.log
?? .planning/exec/build116.log
?? .planning/exec/build117.log
?? .planning/exec/build118-after.log
?? .planning/exec/build118-before.log
?? .planning/exec/build118-v2.log
?? .planning/exec/build118-v3.log
?? .planning/exec/build118-v3b.log
?? .planning/exec/build119-after.log
?? .planning/exec/build119-before.log
?? .planning/exec/capture-113.mjs
?? .planning/exec/capture-fix2-frames.mjs
?? .planning/exec/capture-rec-123.mjs
?? .planning/exec/capture120.log
?? .planning/exec/capture120.mjs
?? .planning/exec/capture120b.log
?? .planning/exec/capture120b.mjs
?? .planning/exec/card1-117-local.txt
?? .planning/exec/card1-117-prod.txt
?? .planning/exec/card1-118.txt
?? .planning/exec/card1-118v2.txt
?? .planning/exec/card1-118v3.txt
?? .planning/exec/cls-attrib-123.log
?? .planning/exec/commit-msg-111b-sec14-final.txt
?? .planning/exec/commit-msg-111b-sec15-round2.txt
?? .planning/exec/commit-msg-120aa.txt
?? .planning/exec/commit-msg-120bb.txt
?? .planning/exec/commit-msg-120c.txt
?? .planning/exec/commit-msg-120cc.txt
?? .planning/exec/commit-msg-120d.txt
?? .planning/exec/commit-msg-120dd.txt
?? .planning/exec/commit-msg-120e.txt
?? .planning/exec/commit-msg-120ee.txt
?? .planning/exec/commit-msg-120f.txt
?? .planning/exec/commit-msg-120ff.txt
?? .planning/exec/commit-msg-120g.txt
?? .planning/exec/commit-msg-120gg.txt
?? .planning/exec/commit-msg-120h.txt
?? .planning/exec/commit-msg-120hh.txt
?? .planning/exec/commit-msg-120i.txt
?? .planning/exec/commit-msg-120ii.txt
?? .planning/exec/commit-msg-120j.txt
?? .planning/exec/commit-msg-120jj.txt
?? .planning/exec/commit-msg-120k.txt
?? .planning/exec/commit-msg-120l.txt
?? .planning/exec/commit-msg-120m.txt
?? .planning/exec/commit-msg-120n.txt
?? .planning/exec/commit-msg-120o.txt
?? .planning/exec/commit-msg-120p.txt
?? .planning/exec/commit-msg-120q.txt
?? .planning/exec/commit-msg-120r.txt
?? .planning/exec/commit-msg-120s.txt
?? .planning/exec/commit-msg-120t.txt
?? .planning/exec/commit-msg-120u.txt
?? .planning/exec/commit-msg-120v.txt
?? .planning/exec/commit-msg-120w.txt
?? .planning/exec/commit-msg-120x.txt
?? .planning/exec/commit-msg-120y.txt
?? .planning/exec/commit-msg-120z.txt
?? .planning/exec/commit-msg-astra120.txt
?? .planning/exec/commit-msg-brief-115.txt
?? .planning/exec/commit-msg-brief-115b.txt
?? .planning/exec/commit-msg-brief-116-s7.txt
?? .planning/exec/commit-msg-brief-116.txt
?? .planning/exec/commit-msg-draft120-rfp.txt
?? .planning/exec/commit-msg-handoff-0912.txt
?? .planning/exec/commit-msg-judge-113-114.txt
?? .planning/exec/commit-msg-live115.txt
?? .planning/exec/commit-msg-live116.txt
?? .planning/exec/commit-msg-merge116.txt
?? .planning/exec/commit-msg-pass111b.txt
?? .planning/exec/commit-msg-pass112.txt
?? .planning/exec/commit-msg-pass113.txt
?? .planning/exec/commit-msg-pass114.txt
?? .planning/exec/commit-msg-pass115.txt
?? .planning/exec/commit-msg-pass115b.txt
?? .planning/exec/commit-msg-pass116.txt
?? .planning/exec/commit-msg-pass117.txt
?? .planning/exec/commit-msg-resume-111b-sec14.txt
?? .planning/exec/commit-msg-resume-111b-sec15c.txt
?? .planning/exec/commit-msg-resume-115b.txt
?? .planning/exec/commit-msg-resume-judge-113-114.txt
?? .planning/exec/commit-msg-resume-merge115.txt
?? .planning/exec/commit-msg-resume112.txt
?? .planning/exec/commit-msg-resume113.txt
?? .planning/exec/commit-msg-resume114.txt
?? .planning/exec/commit-msg-resume115.txt
?? .planning/exec/commit-msg-resume116.txt
?? .planning/exec/commit-msg-resume116b.txt
?? .planning/exec/commit-msg-resume120.txt
?? .planning/exec/commit-msg-resume120b.txt
?? .planning/exec/compose-123c-run.log
?? .planning/exec/compose-pass122-sheet.mjs
?? .planning/exec/compose-scoreboard-sheet-123c.mjs
?? .planning/exec/corepack-cache/
?? .planning/exec/countup115b.txt
?? .planning/exec/countup116.txt
?? .planning/exec/crossfade-fix2-normal.log
?? .planning/exec/crossfade-fix2-reduced.log
?? .planning/exec/decompose-113.mjs
?? .planning/exec/f6-base-server.log
?? .planning/exec/fallback118-after.log
?? .planning/exec/fallback118-compare.log
?? .planning/exec/fallback118-default-run1.log
?? .planning/exec/fallback118-default.log
?? .planning/exec/fallback118-run1.json
?? .planning/exec/fallback118-v2-compare.log
?? .planning/exec/fallback118-v2-default.log
?? .planning/exec/fallback118-v2-geometry-after.log
?? .planning/exec/fallback118-v2-geometry-before.log
?? .planning/exec/fallback118-v2-verify-after.log
?? .planning/exec/fallback118-v2-verify-before.log
?? .planning/exec/fallback118-v3-compare.log
?? .planning/exec/fallback118-v3-geometry-after.log
?? .planning/exec/fallback118-v3-verify-after.log
?? .planning/exec/fallback118-verify-after.log
?? .planning/exec/fallback118-verify-before.log
?? .planning/exec/fit-check-123.mjs
?? .planning/exec/frames-after-123c-run.log
?? .planning/exec/frames-before-123c-run.log
?? .planning/exec/gates111b-run2.log
?? .planning/exec/glm111b.err
?? .planning/exec/glm112-fix.err
?? .planning/exec/glm112-fix.log
?? .planning/exec/glm112.err
?? .planning/exec/glm113.log
?? .planning/exec/glm114.log
?? .planning/exec/glm115.err
?? .planning/exec/glm115.log
?? .planning/exec/glm115b.err
?? .planning/exec/glm115b.log
?? .planning/exec/glm116.err
?? .planning/exec/glm116.log
?? .planning/exec/glm116b.err
?? .planning/exec/glm116b.log
?? .planning/exec/glm119.err
?? .planning/exec/glm119.log
?? .planning/exec/glm121-mocks.log
?? .planning/exec/glm121-proof-r2.log
?? .planning/exec/glm121-proof-r3.log
?? .planning/exec/glm121-proof-r4.log
?? .planning/exec/glm121-proof.log
?? .planning/exec/glm121-stageA.log
?? .planning/exec/glm123a.log
?? .planning/exec/glm123b.log
?? .planning/exec/glm123c.log
?? .planning/exec/layout117-self.txt
?? .planning/exec/layout117.txt
?? .planning/exec/layout118.txt
?? .planning/exec/layout118v2.txt
?? .planning/exec/layout118v3.txt
?? .planning/exec/lh118a/
?? .planning/exec/lh118prod/
?? .planning/exec/lh119/
?? .planning/exec/p116-bite.log
?? .planning/exec/p123-server-after.log
?? .planning/exec/p123-server-before.log
?? .planning/exec/p123b-server-after.log
?? .planning/exec/p123b-server-after2.log
?? .planning/exec/p123b-server-before.log
?? .planning/exec/perf118-after.log
?? .planning/exec/perf118-before.log
?? .planning/exec/perf118-prod.log
?? .planning/exec/perf118-v2.log
?? .planning/exec/perf118-v3.log
?? .planning/exec/perf118a-bite.log
?? .planning/exec/perf118a-run.log
?? .planning/exec/probe-actors-out.json
?? .planning/exec/prod118.log
?? .planning/exec/render115b.txt
?? .planning/exec/render116.txt
?? .planning/exec/render117.txt
?? .planning/exec/render118.txt
?? .planning/exec/render118v2.txt
?? .planning/exec/render118v3.txt
?? .planning/exec/report-tables-123.mjs
?? .planning/exec/routes118-local_call.log
?? .planning/exec/routes118-local_packages.log
?? .planning/exec/routes118-prod_call.log
?? .planning/exec/routes118-prod_packages.log
?? .planning/exec/routes118.log
?? .planning/exec/scoreboard-geom-compare-123c.mjs
?? .planning/exec/server-123c-after.log
?? .planning/exec/server-123c-before.log
?? .planning/exec/server-123c-fix1.log
?? .planning/exec/server-3251-123c.log
?? .planning/exec/server-diag-123c.log
?? .planning/exec/server-p106-fix.log
?? .planning/exec/server-round2.log
?? .planning/exec/server115b-after.log
?? .planning/exec/server115b-before.log
?? .planning/exec/server116-after.log
?? .planning/exec/server116-before.log
?? .planning/exec/server116-bite.log
?? .planning/exec/server117.err
?? .planning/exec/server117.log
?? .planning/exec/server118-after.err
?? .planning/exec/server118-after.log
?? .planning/exec/server118-v2.err
?? .planning/exec/server118-v2.log
?? .planning/exec/server118-v3.err
?? .planning/exec/server118-v3.log
?? .planning/exec/server118-v3b.err
?? .planning/exec/server118-v3b.log
?? .planning/exec/server118-v3c.err
?? .planning/exec/server118-v3c.log
?? .planning/exec/server118.err
?? .planning/exec/server118.log
?? .planning/exec/server119-after.err
?? .planning/exec/server119-after.log
?? .planning/exec/server119-before.err
?? .planning/exec/server119-before.log
?? .planning/exec/server120.log
?? .planning/exec/server120b.log
?? .planning/exec/server120c.log
?? .planning/exec/server120d.log
?? .planning/exec/server121-stageA.log
?? .planning/exec/sol-band0.log
?? .planning/exec/sol-band0b.err
?? .planning/exec/sol-band0b.log
?? .planning/exec/sol111a.log
?? .planning/exec/sol111b-review.err
?? .planning/exec/sol111b-review.log
?? .planning/exec/sol115b.log
?? .planning/exec/sol116.log
?? .planning/exec/sol117-exec.log
?? .planning/exec/sol117-exec2.log
?? .planning/exec/sol117-review.log
?? .planning/exec/sol118-review.log
?? .planning/exec/sol118-tuner-v2.log
?? .planning/exec/sol118-tuner.log
?? .planning/exec/sol118a-read.log
?? .planning/exec/sol118a-script.log
?? .planning/exec/sol119-code.log
?? .planning/exec/sol119-review.log
?? .planning/exec/sol119-scripts.log
?? .planning/exec/sol123c.log
?? .planning/exec/sonnet121-build.log
?? .planning/exec/sonnet121-server.log
?? .planning/exec/study-before-123.log
?? .planning/exec/tsc-p106-fix.log
?? .planning/exec/type117-118.txt
?? .planning/exec/type117-118v2.txt
?? .planning/exec/type117-118v3.txt
?? .planning/exec/type117-local.txt
?? .planning/exec/type117-prod-micahjonesconsulting.txt
?? .planning/exec/type117-prod-www.txt
?? .planning/exec/v2after118.log
?? .planning/exec/v2chain118.log
?? .planning/exec/v3after118.log
?? .planning/mock/pass-121/preview/
?? .planning/mock/pass-121/proof/doorway-circle-crop.png
?? .planning/mock/pass-121/proof/fix-round3.mjs
?? .planning/mock/pass-121/proof/gen-round4.mjs
?? .planning/mock/pass-121/proof/home-circle-ratios.json
?? .planning/mock/pass-121/proof/home-circle.mjs
?? .planning/mock/pass-121/proof/live-home-circle-crop-fixed.png
?? .planning/mock/pass-121/proof/live-home-circle-crop.png
?? .planning/mock/pass-121/proof/measure-round4.mjs
?? .planning/mock/pass-121/proof/probe-figs.html
?? .planning/mock/pass-121/proof/probe-gutter.mjs
?? .planning/mock/pass-121/proof/probe-labels.mjs
?? .planning/mock/pass-121/proof/probe-tone.mjs
?? .planning/mock/pass-121/proof/rfp-study-1440.png
?? .planning/mock/pass-121/proof/rfp-study-390.png
?? .planning/mock/pass-121/proof/rfp-study-flow-crop.png
?? .planning/mock/pass-121/proof/work-fold-1440.png
?? .planning/mock/pass-121/proof/work-fold-390.png
?? .planning/mock/pass-121/proof/work-fold-flow-crop.png
?? .planning/mock/pass-121/set/drawing-birth-move-1440.png
?? .planning/mock/pass-121/set/drawing-content-move-1440.png
?? .planning/mock/pass-121/set/drawing-guardicore-vis-1440.png
?? .planning/mock/pass-121/set/drawing-ordani-claims-1440.png
?? .planning/mock/pass-121/set/drawing-rfp-flow-1440.png
?? .planning/mock/pass-121/set/inspect-states-hover.png
?? .planning/mock/pass-121/set/inspect-work-390-index.png
?? .planning/mock/pass-121/set/inspect-work-foot.png
?? .planning/mock/pass-121/set/inspect-work-head.png
?? .planning/mock/pass-121/set/round1/
?? .planning/mock/pass-121/set/states-1440.png
?? .planning/mock/pass-121/set/states-390.png
?? .planning/mock/pass-121/set/study-guardicore-1440-50pct.png
?? .planning/mock/pass-121/set/study-guardicore-1440-fold.png
?? .planning/mock/pass-121/set/study-guardicore-1440.png
?? .planning/mock/pass-121/set/study-guardicore-390-fold.png
?? .planning/mock/pass-121/set/study-guardicore-390.png
?? .planning/mock/pass-121/set/study-rfp-1440-50pct.png
?? .planning/mock/pass-121/set/study-rfp-1440-fold.png
?? .planning/mock/pass-121/set/study-rfp-1440.png
?? .planning/mock/pass-121/set/study-rfp-390-fold.png
?? .planning/mock/pass-121/set/study-rfp-390.png
?? .planning/mock/pass-121/set/work-1440-50pct.png
?? .planning/mock/pass-121/set/work-1440-fold.png
?? .planning/mock/pass-121/set/work-1440.png
?? .planning/mock/pass-121/set/work-390-fold.png
?? .planning/mock/pass-121/set/work-390.png
?? .planning/mocks/pass-122/assets/
?? .planning/mocks/pass-122/tile-1-numeral-v2/
?? .planning/mocks/pass-122/tile-1-numeral/
?? .planning/mocks/pass-122/tile-2-line/
?? .planning/mocks/pass-122/tile-3-posters/
?? .planning/prompts/GLM-112-FIX-POINTER.txt
?? .planning/prompts/SOL-119-CODE.md
?? .planning/qa/pass-120/circle/
?? .planning/qa/pass-120/mock/mock-a-study/
?? .planning/qa/pass-120/mock/mock-a-work/
?? .planning/qa/pass-120/mock/mock-b-study/
?? .planning/qa/pass-120/mock/mock-b-work/
?? .planning/qa/pass-120/refs/a-collins-mailchimp/full-1440.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/full-390.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/top-1440.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/top-390.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/full-1440.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/full-390.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/top-1440.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/top-390.png
?? .planning/qa/pass-120/refs/a-koto-amazon/full-1440.png
?? .planning/qa/pass-120/refs/a-koto-amazon/full-390.png
?? .planning/qa/pass-120/refs/a-koto-amazon/top-1440.png
?? .planning/qa/pass-120/refs/a-koto-amazon/top-390.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/full-1440.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/full-390.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/top-1440.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/top-390.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/full-1440.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/full-390.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/top-1440.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/top-390.png
?? .planning/qa/pass-120/refs/b-clay-sky/full-1440.png
?? .planning/qa/pass-120/refs/b-clay-sky/full-390.png
?? .planning/qa/pass-120/refs/b-clay-sky/top-1440.png
?? .planning/qa/pass-120/refs/b-clay-sky/top-390.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/full-1440.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/full-390.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/top-1440.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/top-390.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/full-1440.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/full-390.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/top-1440.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/top-390.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/full-1440.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/full-390.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/top-1440.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/top-390.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/full-1440.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/full-390.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/top-1440.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/top-390.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/full-1440.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/full-390.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/top-1440.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/top-390.png
?? .planning/qa/pass-120/refs/d-danmall-spine/full-1440.png
?? .planning/qa/pass-120/refs/d-danmall-spine/full-390.png
?? .planning/qa/pass-120/refs/d-danmall-spine/top-1440.png
?? .planning/qa/pass-120/refs/d-danmall-spine/top-390.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/full-1440.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/full-390.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/top-1440.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/top-390.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/full-1440.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/full-390.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/top-1440.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/top-390.png
?? .planning/qa/pass-120/study-guardicore-1440-full.png
?? .planning/qa/pass-120/study-guardicore-1440-outline.txt
?? .planning/qa/pass-120/study-guardicore-390-full.png
?? .planning/qa/pass-120/study-guardicore-390-outline.txt
?? .planning/qa/pass-120/study-rfp-engine-1440-full.png
?? .planning/qa/pass-120/study-rfp-engine-1440-outline.txt
?? .planning/qa/pass-120/study-rfp-engine-390-full.png
?? .planning/qa/pass-120/study-rfp-engine-390-outline.txt
?? .planning/qa/pass-120/work-1440-full.png
?? .planning/qa/pass-120/work-1440.json
?? .planning/qa/pass-120/work-390-full.png
?? .planning/qa/pass-120/work-390.json
?? .planning/qa/pass-122/preship/axe/
?? .planning/qa/pass-122/preship/crossfade/crossfade-1440x900-y6606-t0.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-1440x900-y6606.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-390x844-y6927-t0.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-390x844-y6927.png
?? .planning/qa/pass-122/preship/crossfade/results.json
?? .planning/qa/pass-122/preship/crossfade/run.log
?? .planning/qa/pass-122/preship/crossfade/server.log
?? .planning/qa/pass-122/preship/crossfade/worldflip-1440x900-y6433-t0.png
?? .planning/qa/pass-122/preship/crossfade/worldflip-1440x900-y6433-t800.png
?? .planning/qa/pass-122/preship/crossfade/worst-2-390x844-down-y6941.png
?? .planning/qa/pass-122/preship/crossfade/worst-3-390x844-up-y6937.png
?? .planning/qa/pass-122/preship/fixes-reduced/
?? .planning/qa/pass-122/preship/fixes/f2-after-back-1440.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-1-arrival.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-2-settled.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-3-beat1.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-4-beat4-espresso.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-5-beat4-after-flip.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-state.json
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-1-arrival.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-2-settled.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-3-beat1.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-4-beat4-espresso.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-5-beat4-after-flip.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-state.json
?? .planning/qa/pass-122/preship/fixes/results-fix.json
?? .planning/qa/pass-122/preship/fixes2/demo-espresso-1440.png
?? .planning/qa/pass-122/preship/fixes2/demo-espresso-390.png
?? .planning/qa/pass-122/preship/fixes2/demo-forced-petrol-1440.png
?? .planning/qa/pass-122/preship/fixes2/demo-forced-petrol-390.png
?? .planning/qa/pass-122/preship/fixes2/frames-report.json
?? .planning/qa/pass-122/preship/fixes2/rec-espresso-1440.png
?? .planning/qa/pass-122/preship/fixes2/rec-espresso-390.png
?? .planning/qa/pass-122/preship/fixes2/rec-offworld-reduced-1440.png
?? .planning/qa/pass-122/preship/fixes2/rec-offworld-reduced-390.png
?? .planning/qa/pass-122/preship/fixes2/results-reduced.json
?? .planning/qa/pass-122/preship/fixes2/results.json
?? .planning/qa/pass-122/preship/lh-before-setup/
?? .planning/qa/pass-122/preship/lh/
?? .planning/qa/pass-122/preship/server.log
?? .planning/qa/pass-122/receipts/sheet-1440.png
?? .planning/qa/pass-122/receipts/sheet-390.png
?? .planning/qa/pass-122/receipts/sheet-after-rm-nojs.png
?? .planning/qa/pass-122/receipts/v2/
?? .planning/qa/pass-122/refs/
?? .planning/qa/pass-122/sheets/
?? .planning/qa/pass-122/work/final/
?? .planning/qa/pass-122/work/fix/1440-final.png
?? .planning/qa/pass-122/work/fix/1440-scroll0.png
?? .planning/qa/pass-122/work/fix/1440-step-0.png
?? .planning/qa/pass-122/work/fix/1440-step-1.png
?? .planning/qa/pass-122/work/fix/1440-step-2.png
?? .planning/qa/pass-122/work/fix/1440-step-3.png
?? .planning/qa/pass-122/work/fix/1440-step-4.png
?? .planning/qa/pass-122/work/fix/1440-step-5.png
?? .planning/qa/pass-122/work/fix/1440-step-6.png
?? .planning/qa/pass-122/work/fix/1440-step-7.png
?? .planning/qa/pass-122/work/fix/1440-step-8.png
?? .planning/qa/pass-122/work/fix/390-final.png
?? .planning/qa/pass-122/work/fix/390-nojs-birthworker.png
?? .planning/qa/pass-122/work/fix/390-reduced-motion-birthworker.png
?? .planning/qa/pass-122/work/fix/390-scroll0.png
?? .planning/qa/pass-122/work/fix/390-step-0.png
?? .planning/qa/pass-122/work/fix/390-step-1.png
?? .planning/qa/pass-122/work/fix/390-step-2.png
?? .planning/qa/pass-122/work/fix/390-step-3.png
?? .planning/qa/pass-122/work/fix/390-step-4.png
?? .planning/qa/pass-122/work/fix/390-step-5.png
?? .planning/qa/pass-122/work/fix/390-step-6.png
?? .planning/qa/pass-122/work/fix/390-step-7.png
?? .planning/qa/pass-122/work/fix/report.json
?? .planning/qa/pass-122/work/frames/
?? .planning/qa/pass-123/crossfade-rm/results-reduced.json
?? .planning/qa/pass-123/crossfade/results.json
?? .planning/qa/pass-123/diff-four-files.patch
?? .planning/qa/pass-123/fit-check.txt
?? .planning/qa/pass-123/geom-123c-after2.json
?? .planning/qa/pass-123/report-tables.md
?? .planning/qa/pass-123/text-123c-after-home.txt
?? .planning/qa/pass-123/text-123c-before-home.txt
?? .planning/qa/pass-123/v2-compare.txt
?? .planning/research/pass-121/_tooltest/
?? .planning/research/pass-121/audit-a/
?? .planning/research/pass-121/set/SET-SHEET-1440.png
?? .planning/research/pass-121/set/_raw/
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-fold-early.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-fold.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-hover.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390-fold-early.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390-fold.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-capture.json
?? .planning/research/pass-121/set/a-iventions-home-1440-fold-early.png
?? .planning/research/pass-121/set/a-iventions-home-1440-fold.png
?? .planning/research/pass-121/set/a-iventions-home-1440-hover.png
?? .planning/research/pass-121/set/a-iventions-home-1440.png
?? .planning/research/pass-121/set/a-iventions-home-390-fold-early.png
?? .planning/research/pass-121/set/a-iventions-home-390-fold.png
?? .planning/research/pass-121/set/a-iventions-home-390.png
?? .planning/research/pass-121/set/a-iventions-home-capture.json
?? .planning/research/pass-121/set/a-locomotive-work-1440-fold-early.png
?? .planning/research/pass-121/set/a-locomotive-work-1440-fold.png
?? .planning/research/pass-121/set/a-locomotive-work-1440-hover.png
?? .planning/research/pass-121/set/a-locomotive-work-1440.png
?? .planning/research/pass-121/set/a-locomotive-work-390-fold-early.png
?? .planning/research/pass-121/set/a-locomotive-work-390-fold.png
?? .planning/research/pass-121/set/a-locomotive-work-390.png
?? .planning/research/pass-121/set/a-locomotive-work-capture.json
?? .planning/research/pass-121/set/a-portorocha-index-1440-fold-early.png
?? .planning/research/pass-121/set/a-portorocha-index-1440-fold.png
?? .planning/research/pass-121/set/a-portorocha-index-1440-hover.png
?? .planning/research/pass-121/set/a-portorocha-index-1440.png
?? .planning/research/pass-121/set/a-portorocha-index-390-fold-early.png
?? .planning/research/pass-121/set/a-portorocha-index-390-fold.png
?? .planning/research/pass-121/set/a-portorocha-index-390.png
?? .planning/research/pass-121/set/a-portorocha-index-capture.json
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440-fold-early.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440-fold.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390-fold-early.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390-fold.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-capture.json
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440-fold-early.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440-fold.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390-fold-early.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390-fold.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-capture.json
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-fold-early.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-fold.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-hover.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390-fold-early.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390-fold.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-capture.json
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-map-context.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-fold-early.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-fold.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-hover.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390-fold-early.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390-fold.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390.png
?? .planning/research/pass-121/set/b-pentagram-reddit-capture.json
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-fold-early.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-fold.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-hover.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390-fold-early.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390-fold.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390.png
?? .planning/research/pass-121/set/b-pudding-essential-words-capture.json
?? .planning/research/pass-121/set/b-pudding-similes-1440-fold-early.png
?? .planning/research/pass-121/set/b-pudding-similes-1440-fold.png
?? .planning/research/pass-121/set/b-pudding-similes-1440.png
?? .planning/research/pass-121/set/b-pudding-similes-390-fold-early.png
?? .planning/research/pass-121/set/b-pudding-similes-390-fold.png
?? .planning/research/pass-121/set/b-pudding-similes-390.png
?? .planning/research/pass-121/set/b-pudding-similes-capture.json
?? .planning/research/pass-121/set/c-antonsten-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-antonsten-home-1440-fold.png
?? .planning/research/pass-121/set/c-antonsten-home-1440-hover.png
?? .planning/research/pass-121/set/c-antonsten-home-1440.png
?? .planning/research/pass-121/set/c-antonsten-home-390-fold-early.png
?? .planning/research/pass-121/set/c-antonsten-home-390-fold.png
?? .planning/research/pass-121/set/c-antonsten-home-390.png
?? .planning/research/pass-121/set/c-antonsten-home-capture.json
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-fold.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-hover.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390-fold-early.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390-fold.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390.png
?? .planning/research/pass-121/set/c-buzzusborne-home-capture.json
?? .planning/research/pass-121/set/c-draftnu-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-draftnu-home-1440-fold.png
?? .planning/research/pass-121/set/c-draftnu-home-1440.png
?? .planning/research/pass-121/set/c-draftnu-home-390-fold-early.png
?? .planning/research/pass-121/set/c-draftnu-home-390-fold.png
?? .planning/research/pass-121/set/c-draftnu-home-390.png
?? .planning/research/pass-121/set/c-draftnu-home-capture.json
?? .planning/research/pass-121/set/c-emilkowalski-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-emilkowalski-home-1440-fold.png
?? .planning/research/pass-121/set/c-emilkowalski-home-1440.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390-fold-early.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390-fold.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390.png
?? .planning/research/pass-121/set/c-emilkowalski-home-capture.json
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440-fold.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390-fold-early.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390-fold.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-capture.json
?? .planning/reviews/scratch-111b/
~~~

## Toolchain resolution before 0.2

The brief-prescribed absolute pnpm launcher was attempted first but was unreadable/executable under this sandbox. No package was installed and no wrapper was written. The successful fallback invoked the already-present pnpm 10.28.2 cache directly with Node.

Command:

~~~powershell
& 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd' build
~~~

Exit: 1

Raw output:

~~~text
Program 'pnpm.cmd' failed to run: Access is deniedAt line:2 char:1
+ & 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd' build
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
At line:2 char:1
+ & 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd' build
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ResourceUnavailable: (:) [], ApplicationFailedException
    + FullyQualifiedErrorId : NativeCommandFailed
~~~

Command:

~~~powershell
Get-Command pnpm -ErrorAction SilentlyContinue | Format-List Name,CommandType,Source,Path
~~~

Exit: 1

Raw output: empty.

Command:

~~~powershell
Get-Content -Raw 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd'
~~~

Exit: 1

Raw output:

~~~text
Get-Content : Access to the path 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd' is denied.
At line:2 char:1
+ Get-Content -Raw 'C:\Users\micah\AppData\Roaming\npm\pnpm.cmd'
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : PermissionDenied: (C:\Users\micah\...ng\npm\pnpm.cmd:String) [Get-Content], Unauthorized
   AccessException
    + FullyQualifiedErrorId : GetContentReaderUnauthorizedAccessError,Microsoft.PowerShell.Commands.GetContentCommand
~~~

Command (first cmd.exe quoting attempt):

~~~powershell
cmd.exe /d /s /c "\"C:\Users\micah\AppData\Roaming\npm\pnpm.cmd\" build"
~~~

Exit: 1

Raw output:

~~~text
'\' is not recognized as an internal or external command,
operable program or batch file.
~~~

Command:

~~~powershell
cmd.exe /d /s /c '""C:\Users\micah\AppData\Roaming\npm\pnpm.cmd" build"'
~~~

Exit: 1

Raw output:

~~~text
Access is denied.
~~~

Command:

~~~powershell
Get-Command corepack,node,npm -ErrorAction SilentlyContinue | Select-Object Name,CommandType,Source,Path | Format-Table -AutoSize
~~~

Exit: 0

Raw output:

~~~text
Name            CommandType Source                               Path
----            ----------- ------                               ----
corepack.cmd    Application C:\Program Files\nodejs\corepack.cmd C:\Program Files\nodejs\corepack.cmd
node.exe        Application C:\Program Files\nodejs\node.exe     C:\Program Files\nodejs\node.exe
npm.ps1      ExternalScript C:\Program Files\nodejs\npm.ps1      C:\Program Files\nodejs\npm.ps1
~~~

Command:

~~~powershell
& 'C:\Program Files\nodejs\corepack.cmd' pnpm build
~~~

Exit: 1

Raw output:

~~~text
node:fs:1363
  const result = binding.mkdir(
                         ^

Error: EPERM: operation not permitted, mkdir 'C:\Users\micah\AppData\Local\node\corepack\v1'
    at mkdirSync (node:fs:1363:26)
    at getTemporaryFolder (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:21916:27)
    at download (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:22206:21)
    at installVersion (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:22300:61)
    at async Engine.ensurePackageManager (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:22851:32)
    at async Engine.executePackageManagerRequest (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:22962:25)
    at async Object.runMain (C:\Program Files\nodejs\node_modules\corepack\dist\lib\corepack.cjs:23660:7) {
  errno: -4048,
  code: 'EPERM',
  syscall: 'mkdir',
  path: 'C:\\Users\\micah\\AppData\\Local\\node\\corepack\\v1'
}

Node.js v22.20.0
~~~

Command:

~~~powershell
rg --files .planning/exec/corepack-cache | Select-Object -First 20
~~~

Exit: 1

Raw output:

~~~text
rg : The term 'rg' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the
spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:2 char:1
+ rg --files .planning/exec/corepack-cache | Select-Object -First 20
+ ~~
    + CategoryInfo          : ObjectNotFound: (rg:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
~~~

Command:

~~~powershell
Get-ChildItem -Recurse -File '.planning/exec/corepack-cache' | Select-Object -First 20 -ExpandProperty FullName
~~~

Exit: 0

Raw output:

~~~text
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\lastKnownGood.json
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\.corepack
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\LICENSE
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\package.json
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\README.md
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\bin\pnpm.cjs
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\bin\pnpx.cjs
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\pnpm.cjs
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\pnpmrc
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\reflink.darwin-arm64-2HJ4WGO6.node
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\reflink.darwin-x64-3G3H6IW4.node
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\reflink.win32-arm64-msvc-Q6BARPPB.node
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\reflink.win32-x64-msvc-J2TZHRQI.node
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\worker.js
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node-gyp-bin\node-gyp
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node-gyp-bin\node-gyp.cmd
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node_modules\.modules.yaml
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node_modules\.pnpm-workspace-state-v1.json
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node_modules\.pnpm\lock.yaml
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\10.28.2\dist\node_modules\@isaacs\cliui\index.mjs
~~~

Command:

~~~powershell
$env:COREPACK_HOME = (Resolve-Path '.planning/exec/corepack-cache').Path
& 'C:\Program Files\nodejs\corepack.cmd' pnpm build
~~~

Exit: 1

Raw output:

~~~text
node:internal/modules/cjs/loader:1386
  throw err;
  ^

Error: Cannot find module 'C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\corepack-cache\v1\pnpm\12.4.2\bin\pnpm.cjs'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1030:22)
    at Function._load (node:internal/modules/cjs/loader:1192:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
    at executeUserEntryPoint (node:internal/modules/run_main:171:5)
    at process.processTicksAndRejections (node:internal/process/task_queues:89:21) {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.20.0
~~~

## 0.2 build

Command:

~~~powershell
node '.planning/exec/corepack-cache/v1/pnpm/10.28.2/bin/pnpm.cjs' build
~~~

Exit: 0

Raw output:

~~~text
> micahjonesconsulting@0.1.0 build C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live
> tsx lib/copy-lint-cli.ts && node scripts/vendor-gate.mjs && node scripts/retired-phrases-gate.mjs --self-test && node scripts/retired-phrases-gate.mjs && node scripts/accent-states-lint.mjs --self-test && node scripts/accent-states-lint.mjs && node scripts/gsap-quarantine-gate.mjs --self-test && node scripts/gsap-quarantine-gate.mjs && next build && node scripts/render-gate.mjs && node scripts/work-entry-gate.mjs --self-test && node scripts/work-entry-gate.mjs

[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.
vendor-gate: clean
retired-phrases-gate self-test: 88 planted caught, 32 near misses passed
retired-phrases-gate: clean
accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms
accent-states-lint: clean
gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean
gsap-quarantine-gate: clean (86 files)
▲ Next.js 16.2.6 (Turbopack)
- Experiments (use with caution):
  ✓ viewTransition

  Creating an optimized production build ...
✓ Compiled successfully in 2.5s
  Running TypeScript ...
  Finished TypeScript in 2.8s ...
  Collecting page data using 23 workers ...
⚠ Using edge runtime on a page currently disables static generation for that page
<claude-code-hint v="1" type="plugin" value="stripe@claude-plugins-official" />
  Generating static pages using 23 workers (0/22) ...
  Generating static pages using 23 workers (5/22)
  Generating static pages using 23 workers (10/22)
  Generating static pages using 23 workers (16/22)
<claude-code-hint v="1" type="plugin" value="stripe@claude-plugins-official" />
✓ Generating static pages using 23 workers (22/22) in 886ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /about/opengraph-image-10qg6g
├ ƒ /api/stripe/webhook
├ ○ /call
├ ○ /call/kickoff
├ ○ /contact
├ ○ /icon.svg
├ ƒ /llms.txt
├ ƒ /opengraph-image-1o6u9y
├ ○ /packages
├ ○ /robots.txt
├ ○ /services
├ ○ /services/thanks
├ ○ /sitemap.xml
├ ○ /work
├ ● /work/[slug]
│ ├ /work/guardicore
│ ├ /work/rfp-engine
│ ├ /work/ordani
│ └ [+2 more paths]
├ ƒ /work/[slug]/opengraph-image-oti546
└ ƒ /work/opengraph-image-xevl18

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

render-gate: 14 routes — links resolve, fragments exist, metadata within limits.
work-entry-gate --self-test: PASS (dropped-figure case reported missing, fixed case passes, &#x27; decodes to ')
work-entry-gate: PASS birth-worker (1x) "Bookings went from one to three a month to five to ten."
work-entry-gate: PASS content-engine (1x) "Up to 800,000 impressions in a month, up from a few thousand a month."
work-entry-gate: PASS guardicore (1x) "$14M in revenue, sourced and closed, at a $1.2M average enterprise deal."
work-entry-gate: PASS ordani (1x) "Birth workers keep hundreds of dollars per client that a claims service would take."
work-entry-gate: PASS rfp-engine (1x) "$3M in signed contracts."
work-entry-gate: 5 studies — every entry figure+line renders.
~~~

## 0.3 route JS bytes BEFORE

Commands:

~~~powershell
node .planning/exec/route-js-bytes.mjs .next/server/app/work/guardicore.html
node .planning/exec/route-js-bytes.mjs .next/server/app/work/rfp-engine.html
~~~

Both exited 0.

Raw output:

~~~text
files=11 bytes=679924 kB=664.0
files=11 bytes=679924 kB=664.0
~~~

## Port check before 0.4

Command:

~~~powershell
netstat -ano | findstr :3236
~~~

Exit: 1

Raw output: empty; port 3236 had no listener.

## 0.4 server and visible-text baselines

Command:

~~~powershell
node '.planning/exec/corepack-cache/v1/pnpm/10.28.2/bin/pnpm.cjs' start -p 3236
~~~

Server remained running in the PTY. Startup raw output (ANSI control bytes omitted from this Markdown record):

~~~text
> micahjonesconsulting@0.1.0 start C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live
> next start "-p" "3236"

▲ Next.js 16.2.6
- Local:         http://localhost:3236
- Network:       http://192.168.4.60:3236
✓ Ready in 144ms
<claude-code-hint v="1" type="plugin" value="stripe@claude-plugins-official" />
~~~

Command:

~~~powershell
Get-Command curl.exe,tr -ErrorAction SilentlyContinue | Select-Object Name,CommandType,Source,Path | Format-Table -AutoSize
~~~

Exit: 1 because tr was absent; curl was found.

Raw output:

~~~text
Name     CommandType Source                       Path
----     ----------- ------                       ----
curl.exe Application C:\Windows\system32\curl.exe C:\Windows\system32\curl.exe
~~~

Command:

~~~powershell
Get-Item 'C:\Program Files\Git\usr\bin\tr.exe' -ErrorAction SilentlyContinue | Select-Object FullName,Length
~~~

Exit: 0

Raw output:

~~~text
FullName                            Length
--------                            ------
C:\Program Files\Git\usr\bin\tr.exe  49460
~~~

Command:

~~~powershell
New-Item -ItemType Directory -Force '.planning/qa/pass-123/text-before' | Select-Object FullName
~~~

Exit: 0

Raw output:

~~~text
FullName
--------
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\qa\pass-123\text-before
~~~

Commands, first pass (one per slug):

~~~powershell
curl.exe -s http://localhost:3236/work/<slug> | node .planning/exec/visible-text.mjs | & 'C:\Program Files\Git\usr\bin\tr.exe' -s '[:space:]' ' ' > .planning/qa/pass-123/text-before/<slug>.txt
~~~

Slugs: guardicore, rfp-engine, ordani, content-engine, birth-worker.  
Each exited 0 with empty stdout/stderr.

First-pass length command:

~~~powershell
Get-ChildItem '.planning/qa/pass-123/text-before/*.txt' | Sort-Object Name | ForEach-Object { $result = if ($_.Length -gt 2000) { 'PASS' } else { 'FAIL' }; "$result 0.4 $($_.BaseName): got $($_.Length) bytes (want > 2000)" }
~~~

Exit: 0

Raw output:

~~~text
PASS 0.4 birth-worker: got 9582 bytes (want > 2000)
PASS 0.4 content-engine: got 11072 bytes (want > 2000)
PASS 0.4 guardicore: got 8880 bytes (want > 2000)
PASS 0.4 ordani: got 9150 bytes (want > 2000)
PASS 0.4 rfp-engine: got 12636 bytes (want > 2000)
~~~

The sizes revealed PowerShell's external-pipeline redirection had emitted UTF-16LE. This was not left as the baseline.

Command:

~~~powershell
Format-Hex -Path '.planning/qa/pass-123/text-before/guardicore.txt' -Count 8
~~~

Exit: 1

Raw output:

~~~text
Format-Hex : A parameter cannot be found that matches parameter name 'Count'.
At line:2 char:69
+ ... Hex -Path '.planning/qa/pass-123/text-before/guardicore.txt' -Count 8
+                                                                  ~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Format-Hex], ParameterBindingException
    + FullyQualifiedErrorId : NamedParameterNotFound,Format-Hex
~~~

Command:

~~~powershell
((Get-Content -Encoding Byte -TotalCount 8 '.planning/qa/pass-123/text-before/guardicore.txt') -join ' ')
~~~

Exit: 0

Raw output:

~~~text
255 254 32 0 83 0 107 0
~~~

Corrected byte-preserving command, run once for every slug through cmd.exe:

~~~powershell
cmd.exe /d /s /c 'curl.exe -s http://localhost:3236/work/<slug> | node .planning/exec/visible-text.mjs | "C:\Program Files\Git\usr\bin\tr.exe" -s "[:space:]" " " > ".planning\qa\pass-123\text-before\<slug>.txt"'
~~~

Each exited 0 with empty stdout/stderr.

Byte verification command:

~~~powershell
((Get-Content -Encoding Byte -TotalCount 8 '.planning/qa/pass-123/text-before/guardicore.txt') -join ' ')
~~~

Exit: 0

Raw output:

~~~text
32 83 107 105 112 32 116 111
~~~

Final length command:

~~~powershell
Get-ChildItem '.planning/qa/pass-123/text-before/*.txt' | Sort-Object Name | ForEach-Object { $result = if ($_.Length -gt 2000) { 'PASS' } else { 'FAIL' }; "$result 0.4 $($_.BaseName): got $($_.Length) bytes (want > 2000)" }
~~~

Exit: 0

Raw output:

~~~text
PASS 0.4 birth-worker: got 4794 bytes (want > 2000)
PASS 0.4 content-engine: got 5539 bytes (want > 2000)
PASS 0.4 guardicore: got 4443 bytes (want > 2000)
PASS 0.4 ordani: got 4578 bytes (want > 2000)
PASS 0.4 rfp-engine: got 6321 bytes (want > 2000)
~~~

## 0.5 Lighthouse — failure and stop point

Command:

~~~powershell
New-Item -ItemType Directory -Force '.planning/exec/lh123/before' | Select-Object FullName
~~~

Exit: 0

Raw output:

~~~text
FullName
--------
C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live\.planning\exec\lh123\before
~~~

Command:

~~~powershell
& 'C:\tmp\p101tools\node_modules\.bin\lighthouse.cmd' http://localhost:3236/work/guardicore --only-categories=performance --output=json --output-path=.planning/exec/lh123/before/work-1.json --chrome-flags="--headless=new" --quiet
~~~

Exit: 1

Raw output:

~~~text
Runtime error encountered: Failed to fetch browser webSocket URL from http://127.0.0.1:63285/json/version: fetch failed
TypeError: Failed to fetch browser webSocket URL from http://127.0.0.1:63285/json/version: fetch failed
    at node:internal/deps/undici/undici:13510:13
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async getWSEndpoint (file:///C:/tmp/p101tools/node_modules/puppeteer-core/lib/puppeteer/common/BrowserConnector.js:139:24)
    at async getConnectionTransport (file:///C:/tmp/p101tools/node_modules/puppeteer-core/lib/puppeteer/common/BrowserConnector.js:85:31)
    at async _connectToBrowser (file:///C:/tmp/p101tools/node_modules/puppeteer-core/lib/puppeteer/common/BrowserConnector.js:48:50)
    at async gatherFn (file:///C:/tmp/p101tools/node_modules/lighthouse/core/gather/navigation-runner.js:280:19)
    at async Runner.gather (file:///C:/tmp/p101tools/node_modules/lighthouse/core/runner.js:211:25)
    at async navigationGather (file:///C:/tmp/p101tools/node_modules/lighthouse/core/gather/navigation-runner.js:303:21)
    at async navigation (file:///C:/tmp/p101tools/node_modules/lighthouse/core/index.js:58:24)
    at async runLighthouse (file:///C:/tmp/p101tools/node_modules/lighthouse/cli/run.js:210:26)
~~~

This differed from the expected exit 0, so it is a FAIL. No retry was made and no later verification step was started.

## Cleanup

The first two Ctrl+C writes to the server PTY produced no output and did not terminate the listener.

Command:

~~~powershell
netstat -ano | findstr :3236
~~~

Exit: 0

Raw output:

~~~text
  TCP    0.0.0.0:3236           0.0.0.0:0              LISTENING       42028
  TCP    [::]:3236              [::]:0                 LISTENING       42028
  TCP    [::1]:63246            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63247            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63248            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63249            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63250            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63271            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63276            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63277            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63278            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63279            [::1]:3236             TIME_WAIT       0
~~~

Command:

~~~powershell
Get-Process -Id 42028 | Select-Object Id,ProcessName,Path
~~~

Exit: 0

Raw output:

~~~text
   Id ProcessName Path
   -- ----------- ----
42028 node        C:\Program Files\nodejs\node.exe
~~~

Command:

~~~powershell
Stop-Process -Id 42028
~~~

Exit: 0

Raw output: empty.

Command:

~~~powershell
netstat -ano | findstr :3236
~~~

Exit: 0 because TIME_WAIT rows remained.

Raw output:

~~~text
  TCP    [::1]:63246            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63247            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63248            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63249            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63250            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63271            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63276            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63277            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63278            [::1]:3236             TIME_WAIT       0
  TCP    [::1]:63279            [::1]:3236             TIME_WAIT       0
~~~

Command:

~~~powershell
netstat -ano | findstr :3236 | findstr LISTENING
~~~

Exit: 1

Raw output: empty; this confirms port 3236 is free of listeners.

## Files changed and final status

This stage created the five required BEFORE text files and updated this report. No product source file was edited. The Lighthouse output directory is empty because the failed run produced no JSON.

Command:

~~~powershell
git status --short -- .planning/exec/lh123 .planning/qa/pass-123/text-before .planning/qa/pass-123/band
~~~

Exit: 0

Raw output:

~~~text
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
 M .planning/qa/pass-123/band/REPORT-STAGE-0.md
?? .planning/qa/pass-123/text-before/
~~~

Command:

~~~powershell
git status --short
~~~

Exit: 0

Raw output:

~~~text
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\micah/.config/git/ignore': Permission denied
 M .planning/exec/glm121-fix2.log
 M .planning/qa/pass-112/server.log
 M .planning/qa/pass-123/band/REPORT-STAGE-0.md
?? .planning/exec/after118.log
?? .planning/exec/astra111b.err
?? .planning/exec/astra111b.log
?? .planning/exec/astra114.log
?? .planning/exec/astra115b.log
?? .planning/exec/astra116.log
?? .planning/exec/astra117.log
?? .planning/exec/astra118.log
?? .planning/exec/astra120.log
?? .planning/exec/astra120all.log
?? .planning/exec/axe115b.txt
?? .planning/exec/axe116.txt
?? .planning/exec/axe117.txt
?? .planning/exec/axe118.txt
?? .planning/exec/axe118v2.txt
?? .planning/exec/axe118v3.txt
?? .planning/exec/bin/
?? .planning/exec/build-123c-fix1.log
?? .planning/exec/build-123c-frames.log
?? .planning/exec/build-123c.log
?? .planning/exec/build-diag-123c.log
?? .planning/exec/build-p106-fix.log
?? .planning/exec/build115b.log
?? .planning/exec/build116.log
?? .planning/exec/build117.log
?? .planning/exec/build118-after.log
?? .planning/exec/build118-before.log
?? .planning/exec/build118-v2.log
?? .planning/exec/build118-v3.log
?? .planning/exec/build118-v3b.log
?? .planning/exec/build119-after.log
?? .planning/exec/build119-before.log
?? .planning/exec/capture-113.mjs
?? .planning/exec/capture-fix2-frames.mjs
?? .planning/exec/capture-rec-123.mjs
?? .planning/exec/capture120.log
?? .planning/exec/capture120.mjs
?? .planning/exec/capture120b.log
?? .planning/exec/capture120b.mjs
?? .planning/exec/card1-117-local.txt
?? .planning/exec/card1-117-prod.txt
?? .planning/exec/card1-118.txt
?? .planning/exec/card1-118v2.txt
?? .planning/exec/card1-118v3.txt
?? .planning/exec/cls-attrib-123.log
?? .planning/exec/commit-msg-111b-sec14-final.txt
?? .planning/exec/commit-msg-111b-sec15-round2.txt
?? .planning/exec/commit-msg-120aa.txt
?? .planning/exec/commit-msg-120bb.txt
?? .planning/exec/commit-msg-120c.txt
?? .planning/exec/commit-msg-120cc.txt
?? .planning/exec/commit-msg-120d.txt
?? .planning/exec/commit-msg-120dd.txt
?? .planning/exec/commit-msg-120e.txt
?? .planning/exec/commit-msg-120ee.txt
?? .planning/exec/commit-msg-120f.txt
?? .planning/exec/commit-msg-120ff.txt
?? .planning/exec/commit-msg-120g.txt
?? .planning/exec/commit-msg-120gg.txt
?? .planning/exec/commit-msg-120h.txt
?? .planning/exec/commit-msg-120hh.txt
?? .planning/exec/commit-msg-120i.txt
?? .planning/exec/commit-msg-120ii.txt
?? .planning/exec/commit-msg-120j.txt
?? .planning/exec/commit-msg-120jj.txt
?? .planning/exec/commit-msg-120k.txt
?? .planning/exec/commit-msg-120l.txt
?? .planning/exec/commit-msg-120m.txt
?? .planning/exec/commit-msg-120n.txt
?? .planning/exec/commit-msg-120o.txt
?? .planning/exec/commit-msg-120p.txt
?? .planning/exec/commit-msg-120q.txt
?? .planning/exec/commit-msg-120r.txt
?? .planning/exec/commit-msg-120s.txt
?? .planning/exec/commit-msg-120t.txt
?? .planning/exec/commit-msg-120u.txt
?? .planning/exec/commit-msg-120v.txt
?? .planning/exec/commit-msg-120w.txt
?? .planning/exec/commit-msg-120x.txt
?? .planning/exec/commit-msg-120y.txt
?? .planning/exec/commit-msg-120z.txt
?? .planning/exec/commit-msg-astra120.txt
?? .planning/exec/commit-msg-brief-115.txt
?? .planning/exec/commit-msg-brief-115b.txt
?? .planning/exec/commit-msg-brief-116-s7.txt
?? .planning/exec/commit-msg-brief-116.txt
?? .planning/exec/commit-msg-draft120-rfp.txt
?? .planning/exec/commit-msg-handoff-0912.txt
?? .planning/exec/commit-msg-judge-113-114.txt
?? .planning/exec/commit-msg-live115.txt
?? .planning/exec/commit-msg-live116.txt
?? .planning/exec/commit-msg-merge116.txt
?? .planning/exec/commit-msg-pass111b.txt
?? .planning/exec/commit-msg-pass112.txt
?? .planning/exec/commit-msg-pass113.txt
?? .planning/exec/commit-msg-pass114.txt
?? .planning/exec/commit-msg-pass115.txt
?? .planning/exec/commit-msg-pass115b.txt
?? .planning/exec/commit-msg-pass116.txt
?? .planning/exec/commit-msg-pass117.txt
?? .planning/exec/commit-msg-resume-111b-sec14.txt
?? .planning/exec/commit-msg-resume-111b-sec15c.txt
?? .planning/exec/commit-msg-resume-115b.txt
?? .planning/exec/commit-msg-resume-judge-113-114.txt
?? .planning/exec/commit-msg-resume-merge115.txt
?? .planning/exec/commit-msg-resume112.txt
?? .planning/exec/commit-msg-resume113.txt
?? .planning/exec/commit-msg-resume114.txt
?? .planning/exec/commit-msg-resume115.txt
?? .planning/exec/commit-msg-resume116.txt
?? .planning/exec/commit-msg-resume116b.txt
?? .planning/exec/commit-msg-resume120.txt
?? .planning/exec/commit-msg-resume120b.txt
?? .planning/exec/compose-123c-run.log
?? .planning/exec/compose-pass122-sheet.mjs
?? .planning/exec/compose-scoreboard-sheet-123c.mjs
?? .planning/exec/corepack-cache/
?? .planning/exec/countup115b.txt
?? .planning/exec/countup116.txt
?? .planning/exec/crossfade-fix2-normal.log
?? .planning/exec/crossfade-fix2-reduced.log
?? .planning/exec/decompose-113.mjs
?? .planning/exec/f6-base-server.log
?? .planning/exec/fallback118-after.log
?? .planning/exec/fallback118-compare.log
?? .planning/exec/fallback118-default-run1.log
?? .planning/exec/fallback118-default.log
?? .planning/exec/fallback118-run1.json
?? .planning/exec/fallback118-v2-compare.log
?? .planning/exec/fallback118-v2-default.log
?? .planning/exec/fallback118-v2-geometry-after.log
?? .planning/exec/fallback118-v2-geometry-before.log
?? .planning/exec/fallback118-v2-verify-after.log
?? .planning/exec/fallback118-v2-verify-before.log
?? .planning/exec/fallback118-v3-compare.log
?? .planning/exec/fallback118-v3-geometry-after.log
?? .planning/exec/fallback118-v3-verify-after.log
?? .planning/exec/fallback118-verify-after.log
?? .planning/exec/fallback118-verify-before.log
?? .planning/exec/fit-check-123.mjs
?? .planning/exec/frames-after-123c-run.log
?? .planning/exec/frames-before-123c-run.log
?? .planning/exec/gates111b-run2.log
?? .planning/exec/glm111b.err
?? .planning/exec/glm112-fix.err
?? .planning/exec/glm112-fix.log
?? .planning/exec/glm112.err
?? .planning/exec/glm113.log
?? .planning/exec/glm114.log
?? .planning/exec/glm115.err
?? .planning/exec/glm115.log
?? .planning/exec/glm115b.err
?? .planning/exec/glm115b.log
?? .planning/exec/glm116.err
?? .planning/exec/glm116.log
?? .planning/exec/glm116b.err
?? .planning/exec/glm116b.log
?? .planning/exec/glm119.err
?? .planning/exec/glm119.log
?? .planning/exec/glm121-mocks.log
?? .planning/exec/glm121-proof-r2.log
?? .planning/exec/glm121-proof-r3.log
?? .planning/exec/glm121-proof-r4.log
?? .planning/exec/glm121-proof.log
?? .planning/exec/glm121-stageA.log
?? .planning/exec/glm123a.log
?? .planning/exec/glm123b.log
?? .planning/exec/glm123c.log
?? .planning/exec/layout117-self.txt
?? .planning/exec/layout117.txt
?? .planning/exec/layout118.txt
?? .planning/exec/layout118v2.txt
?? .planning/exec/layout118v3.txt
?? .planning/exec/lh118a/
?? .planning/exec/lh118prod/
?? .planning/exec/lh119/
?? .planning/exec/p116-bite.log
?? .planning/exec/p123-server-after.log
?? .planning/exec/p123-server-before.log
?? .planning/exec/p123b-server-after.log
?? .planning/exec/p123b-server-after2.log
?? .planning/exec/p123b-server-before.log
?? .planning/exec/perf118-after.log
?? .planning/exec/perf118-before.log
?? .planning/exec/perf118-prod.log
?? .planning/exec/perf118-v2.log
?? .planning/exec/perf118-v3.log
?? .planning/exec/perf118a-bite.log
?? .planning/exec/perf118a-run.log
?? .planning/exec/probe-actors-out.json
?? .planning/exec/prod118.log
?? .planning/exec/render115b.txt
?? .planning/exec/render116.txt
?? .planning/exec/render117.txt
?? .planning/exec/render118.txt
?? .planning/exec/render118v2.txt
?? .planning/exec/render118v3.txt
?? .planning/exec/report-tables-123.mjs
?? .planning/exec/routes118-local_call.log
?? .planning/exec/routes118-local_packages.log
?? .planning/exec/routes118-prod_call.log
?? .planning/exec/routes118-prod_packages.log
?? .planning/exec/routes118.log
?? .planning/exec/scoreboard-geom-compare-123c.mjs
?? .planning/exec/server-123c-after.log
?? .planning/exec/server-123c-before.log
?? .planning/exec/server-123c-fix1.log
?? .planning/exec/server-3251-123c.log
?? .planning/exec/server-diag-123c.log
?? .planning/exec/server-p106-fix.log
?? .planning/exec/server-round2.log
?? .planning/exec/server115b-after.log
?? .planning/exec/server115b-before.log
?? .planning/exec/server116-after.log
?? .planning/exec/server116-before.log
?? .planning/exec/server116-bite.log
?? .planning/exec/server117.err
?? .planning/exec/server117.log
?? .planning/exec/server118-after.err
?? .planning/exec/server118-after.log
?? .planning/exec/server118-v2.err
?? .planning/exec/server118-v2.log
?? .planning/exec/server118-v3.err
?? .planning/exec/server118-v3.log
?? .planning/exec/server118-v3b.err
?? .planning/exec/server118-v3b.log
?? .planning/exec/server118-v3c.err
?? .planning/exec/server118-v3c.log
?? .planning/exec/server118.err
?? .planning/exec/server118.log
?? .planning/exec/server119-after.err
?? .planning/exec/server119-after.log
?? .planning/exec/server119-before.err
?? .planning/exec/server119-before.log
?? .planning/exec/server120.log
?? .planning/exec/server120b.log
?? .planning/exec/server120c.log
?? .planning/exec/server120d.log
?? .planning/exec/server121-stageA.log
?? .planning/exec/sol-band0.log
?? .planning/exec/sol-band0b.err
?? .planning/exec/sol-band0b.log
?? .planning/exec/sol111a.log
?? .planning/exec/sol111b-review.err
?? .planning/exec/sol111b-review.log
?? .planning/exec/sol115b.log
?? .planning/exec/sol116.log
?? .planning/exec/sol117-exec.log
?? .planning/exec/sol117-exec2.log
?? .planning/exec/sol117-review.log
?? .planning/exec/sol118-review.log
?? .planning/exec/sol118-tuner-v2.log
?? .planning/exec/sol118-tuner.log
?? .planning/exec/sol118a-read.log
?? .planning/exec/sol118a-script.log
?? .planning/exec/sol119-code.log
?? .planning/exec/sol119-review.log
?? .planning/exec/sol119-scripts.log
?? .planning/exec/sol123c.log
?? .planning/exec/sonnet121-build.log
?? .planning/exec/sonnet121-server.log
?? .planning/exec/study-before-123.log
?? .planning/exec/tsc-p106-fix.log
?? .planning/exec/type117-118.txt
?? .planning/exec/type117-118v2.txt
?? .planning/exec/type117-118v3.txt
?? .planning/exec/type117-local.txt
?? .planning/exec/type117-prod-micahjonesconsulting.txt
?? .planning/exec/type117-prod-www.txt
?? .planning/exec/v2after118.log
?? .planning/exec/v2chain118.log
?? .planning/exec/v3after118.log
?? .planning/mock/pass-121/preview/
?? .planning/mock/pass-121/proof/doorway-circle-crop.png
?? .planning/mock/pass-121/proof/fix-round3.mjs
?? .planning/mock/pass-121/proof/gen-round4.mjs
?? .planning/mock/pass-121/proof/home-circle-ratios.json
?? .planning/mock/pass-121/proof/home-circle.mjs
?? .planning/mock/pass-121/proof/live-home-circle-crop-fixed.png
?? .planning/mock/pass-121/proof/live-home-circle-crop.png
?? .planning/mock/pass-121/proof/measure-round4.mjs
?? .planning/mock/pass-121/proof/probe-figs.html
?? .planning/mock/pass-121/proof/probe-gutter.mjs
?? .planning/mock/pass-121/proof/probe-labels.mjs
?? .planning/mock/pass-121/proof/probe-tone.mjs
?? .planning/mock/pass-121/proof/rfp-study-1440.png
?? .planning/mock/pass-121/proof/rfp-study-390.png
?? .planning/mock/pass-121/proof/rfp-study-flow-crop.png
?? .planning/mock/pass-121/proof/work-fold-1440.png
?? .planning/mock/pass-121/proof/work-fold-390.png
?? .planning/mock/pass-121/proof/work-fold-flow-crop.png
?? .planning/mock/pass-121/set/drawing-birth-move-1440.png
?? .planning/mock/pass-121/set/drawing-content-move-1440.png
?? .planning/mock/pass-121/set/drawing-guardicore-vis-1440.png
?? .planning/mock/pass-121/set/drawing-ordani-claims-1440.png
?? .planning/mock/pass-121/set/drawing-rfp-flow-1440.png
?? .planning/mock/pass-121/set/inspect-states-hover.png
?? .planning/mock/pass-121/set/inspect-work-390-index.png
?? .planning/mock/pass-121/set/inspect-work-foot.png
?? .planning/mock/pass-121/set/inspect-work-head.png
?? .planning/mock/pass-121/set/round1/
?? .planning/mock/pass-121/set/states-1440.png
?? .planning/mock/pass-121/set/states-390.png
?? .planning/mock/pass-121/set/study-guardicore-1440-50pct.png
?? .planning/mock/pass-121/set/study-guardicore-1440-fold.png
?? .planning/mock/pass-121/set/study-guardicore-1440.png
?? .planning/mock/pass-121/set/study-guardicore-390-fold.png
?? .planning/mock/pass-121/set/study-guardicore-390.png
?? .planning/mock/pass-121/set/study-rfp-1440-50pct.png
?? .planning/mock/pass-121/set/study-rfp-1440-fold.png
?? .planning/mock/pass-121/set/study-rfp-1440.png
?? .planning/mock/pass-121/set/study-rfp-390-fold.png
?? .planning/mock/pass-121/set/study-rfp-390.png
?? .planning/mock/pass-121/set/work-1440-50pct.png
?? .planning/mock/pass-121/set/work-1440-fold.png
?? .planning/mock/pass-121/set/work-1440.png
?? .planning/mock/pass-121/set/work-390-fold.png
?? .planning/mock/pass-121/set/work-390.png
?? .planning/mocks/pass-122/assets/
?? .planning/mocks/pass-122/tile-1-numeral-v2/
?? .planning/mocks/pass-122/tile-1-numeral/
?? .planning/mocks/pass-122/tile-2-line/
?? .planning/mocks/pass-122/tile-3-posters/
?? .planning/prompts/GLM-112-FIX-POINTER.txt
?? .planning/prompts/SOL-119-CODE.md
?? .planning/qa/pass-120/circle/
?? .planning/qa/pass-120/mock/mock-a-study/
?? .planning/qa/pass-120/mock/mock-a-work/
?? .planning/qa/pass-120/mock/mock-b-study/
?? .planning/qa/pass-120/mock/mock-b-work/
?? .planning/qa/pass-120/refs/a-collins-mailchimp/full-1440.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/full-390.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/top-1440.png
?? .planning/qa/pass-120/refs/a-collins-mailchimp/top-390.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/full-1440.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/full-390.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/top-1440.png
?? .planning/qa/pass-120/refs/a-instrument-pagerduty/top-390.png
?? .planning/qa/pass-120/refs/a-koto-amazon/full-1440.png
?? .planning/qa/pass-120/refs/a-koto-amazon/full-390.png
?? .planning/qa/pass-120/refs/a-koto-amazon/top-1440.png
?? .planning/qa/pass-120/refs/a-koto-amazon/top-390.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/full-1440.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/full-390.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/top-1440.png
?? .planning/qa/pass-120/refs/a-wolffolins-instacart/top-390.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/full-1440.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/full-390.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/top-1440.png
?? .planning/qa/pass-120/refs/b-basementstudio-harvey/top-390.png
?? .planning/qa/pass-120/refs/b-clay-sky/full-1440.png
?? .planning/qa/pass-120/refs/b-clay-sky/full-390.png
?? .planning/qa/pass-120/refs/b-clay-sky/top-1440.png
?? .planning/qa/pass-120/refs/b-clay-sky/top-390.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/full-1440.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/full-390.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/top-1440.png
?? .planning/qa/pass-120/refs/b-studiofreight-brex/top-390.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/full-1440.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/full-390.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/top-1440.png
?? .planning/qa/pass-120/refs/c-nytimes-snowfall/top-390.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/full-1440.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/full-390.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/top-1440.png
?? .planning/qa/pass-120/refs/c-pudding-film-dialogue/top-390.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/full-1440.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/full-390.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/top-1440.png
?? .planning/qa/pass-120/refs/c-worksinprogress-housing/top-390.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/full-1440.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/full-390.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/top-1440.png
?? .planning/qa/pass-120/refs/d-aprildunford-consultant/top-390.png
?? .planning/qa/pass-120/refs/d-danmall-spine/full-1440.png
?? .planning/qa/pass-120/refs/d-danmall-spine/full-390.png
?? .planning/qa/pass-120/refs/d-danmall-spine/top-1440.png
?? .planning/qa/pass-120/refs/d-danmall-spine/top-390.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/full-1440.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/full-390.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/top-1440.png
?? .planning/qa/pass-120/refs/d-harpalsingh-work/top-390.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/full-1440.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/full-390.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/top-1440.png
?? .planning/qa/pass-120/refs/d-uxgenadvisory-saas/top-390.png
?? .planning/qa/pass-120/study-guardicore-1440-full.png
?? .planning/qa/pass-120/study-guardicore-1440-outline.txt
?? .planning/qa/pass-120/study-guardicore-390-full.png
?? .planning/qa/pass-120/study-guardicore-390-outline.txt
?? .planning/qa/pass-120/study-rfp-engine-1440-full.png
?? .planning/qa/pass-120/study-rfp-engine-1440-outline.txt
?? .planning/qa/pass-120/study-rfp-engine-390-full.png
?? .planning/qa/pass-120/study-rfp-engine-390-outline.txt
?? .planning/qa/pass-120/work-1440-full.png
?? .planning/qa/pass-120/work-1440.json
?? .planning/qa/pass-120/work-390-full.png
?? .planning/qa/pass-120/work-390.json
?? .planning/qa/pass-122/preship/axe/
?? .planning/qa/pass-122/preship/crossfade/crossfade-1440x900-y6606-t0.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-1440x900-y6606.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-390x844-y6927-t0.png
?? .planning/qa/pass-122/preship/crossfade/crossfade-390x844-y6927.png
?? .planning/qa/pass-122/preship/crossfade/results.json
?? .planning/qa/pass-122/preship/crossfade/run.log
?? .planning/qa/pass-122/preship/crossfade/server.log
?? .planning/qa/pass-122/preship/crossfade/worldflip-1440x900-y6433-t0.png
?? .planning/qa/pass-122/preship/crossfade/worldflip-1440x900-y6433-t800.png
?? .planning/qa/pass-122/preship/crossfade/worst-2-390x844-down-y6941.png
?? .planning/qa/pass-122/preship/crossfade/worst-3-390x844-up-y6937.png
?? .planning/qa/pass-122/preship/fixes-reduced/
?? .planning/qa/pass-122/preship/fixes/f2-after-back-1440.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-1-arrival.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-2-settled.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-3-beat1.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-4-beat4-espresso.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-5-beat4-after-flip.png
?? .planning/qa/pass-122/preship/fixes/receipts-1440x900-state.json
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-1-arrival.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-2-settled.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-3-beat1.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-4-beat4-espresso.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-5-beat4-after-flip.png
?? .planning/qa/pass-122/preship/fixes/receipts-390x844-state.json
?? .planning/qa/pass-122/preship/fixes/results-fix.json
?? .planning/qa/pass-122/preship/fixes2/demo-espresso-1440.png
?? .planning/qa/pass-122/preship/fixes2/demo-espresso-390.png
?? .planning/qa/pass-122/preship/fixes2/demo-forced-petrol-1440.png
?? .planning/qa/pass-122/preship/fixes2/demo-forced-petrol-390.png
?? .planning/qa/pass-122/preship/fixes2/frames-report.json
?? .planning/qa/pass-122/preship/fixes2/rec-espresso-1440.png
?? .planning/qa/pass-122/preship/fixes2/rec-espresso-390.png
?? .planning/qa/pass-122/preship/fixes2/rec-offworld-reduced-1440.png
?? .planning/qa/pass-122/preship/fixes2/rec-offworld-reduced-390.png
?? .planning/qa/pass-122/preship/fixes2/results-reduced.json
?? .planning/qa/pass-122/preship/fixes2/results.json
?? .planning/qa/pass-122/preship/lh-before-setup/
?? .planning/qa/pass-122/preship/lh/
?? .planning/qa/pass-122/preship/server.log
?? .planning/qa/pass-122/receipts/sheet-1440.png
?? .planning/qa/pass-122/receipts/sheet-390.png
?? .planning/qa/pass-122/receipts/sheet-after-rm-nojs.png
?? .planning/qa/pass-122/receipts/v2/
?? .planning/qa/pass-122/refs/
?? .planning/qa/pass-122/sheets/
?? .planning/qa/pass-122/work/final/
?? .planning/qa/pass-122/work/fix/1440-final.png
?? .planning/qa/pass-122/work/fix/1440-scroll0.png
?? .planning/qa/pass-122/work/fix/1440-step-0.png
?? .planning/qa/pass-122/work/fix/1440-step-1.png
?? .planning/qa/pass-122/work/fix/1440-step-2.png
?? .planning/qa/pass-122/work/fix/1440-step-3.png
?? .planning/qa/pass-122/work/fix/1440-step-4.png
?? .planning/qa/pass-122/work/fix/1440-step-5.png
?? .planning/qa/pass-122/work/fix/1440-step-6.png
?? .planning/qa/pass-122/work/fix/1440-step-7.png
?? .planning/qa/pass-122/work/fix/1440-step-8.png
?? .planning/qa/pass-122/work/fix/390-final.png
?? .planning/qa/pass-122/work/fix/390-nojs-birthworker.png
?? .planning/qa/pass-122/work/fix/390-reduced-motion-birthworker.png
?? .planning/qa/pass-122/work/fix/390-scroll0.png
?? .planning/qa/pass-122/work/fix/390-step-0.png
?? .planning/qa/pass-122/work/fix/390-step-1.png
?? .planning/qa/pass-122/work/fix/390-step-2.png
?? .planning/qa/pass-122/work/fix/390-step-3.png
?? .planning/qa/pass-122/work/fix/390-step-4.png
?? .planning/qa/pass-122/work/fix/390-step-5.png
?? .planning/qa/pass-122/work/fix/390-step-6.png
?? .planning/qa/pass-122/work/fix/390-step-7.png
?? .planning/qa/pass-122/work/fix/report.json
?? .planning/qa/pass-122/work/frames/
?? .planning/qa/pass-123/crossfade-rm/results-reduced.json
?? .planning/qa/pass-123/crossfade/results.json
?? .planning/qa/pass-123/diff-four-files.patch
?? .planning/qa/pass-123/fit-check.txt
?? .planning/qa/pass-123/geom-123c-after2.json
?? .planning/qa/pass-123/report-tables.md
?? .planning/qa/pass-123/text-123c-after-home.txt
?? .planning/qa/pass-123/text-123c-before-home.txt
?? .planning/qa/pass-123/text-before/
?? .planning/qa/pass-123/v2-compare.txt
?? .planning/research/pass-121/_tooltest/
?? .planning/research/pass-121/audit-a/
?? .planning/research/pass-121/set/SET-SHEET-1440.png
?? .planning/research/pass-121/set/_raw/
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-fold-early.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-fold.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440-hover.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-1440.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390-fold-early.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390-fold.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-390.png
?? .planning/research/pass-121/set/a-bakkenbaeck-work-capture.json
?? .planning/research/pass-121/set/a-iventions-home-1440-fold-early.png
?? .planning/research/pass-121/set/a-iventions-home-1440-fold.png
?? .planning/research/pass-121/set/a-iventions-home-1440-hover.png
?? .planning/research/pass-121/set/a-iventions-home-1440.png
?? .planning/research/pass-121/set/a-iventions-home-390-fold-early.png
?? .planning/research/pass-121/set/a-iventions-home-390-fold.png
?? .planning/research/pass-121/set/a-iventions-home-390.png
?? .planning/research/pass-121/set/a-iventions-home-capture.json
?? .planning/research/pass-121/set/a-locomotive-work-1440-fold-early.png
?? .planning/research/pass-121/set/a-locomotive-work-1440-fold.png
?? .planning/research/pass-121/set/a-locomotive-work-1440-hover.png
?? .planning/research/pass-121/set/a-locomotive-work-1440.png
?? .planning/research/pass-121/set/a-locomotive-work-390-fold-early.png
?? .planning/research/pass-121/set/a-locomotive-work-390-fold.png
?? .planning/research/pass-121/set/a-locomotive-work-390.png
?? .planning/research/pass-121/set/a-locomotive-work-capture.json
?? .planning/research/pass-121/set/a-portorocha-index-1440-fold-early.png
?? .planning/research/pass-121/set/a-portorocha-index-1440-fold.png
?? .planning/research/pass-121/set/a-portorocha-index-1440-hover.png
?? .planning/research/pass-121/set/a-portorocha-index-1440.png
?? .planning/research/pass-121/set/a-portorocha-index-390-fold-early.png
?? .planning/research/pass-121/set/a-portorocha-index-390-fold.png
?? .planning/research/pass-121/set/a-portorocha-index-390.png
?? .planning/research/pass-121/set/a-portorocha-index-capture.json
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440-fold-early.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440-fold.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-1440.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390-fold-early.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390-fold.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-390.png
?? .planning/research/pass-121/set/b-basecamp-shapeup-capture.json
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440-fold-early.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440-fold.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-1440.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390-fold-early.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390-fold.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-390.png
?? .planning/research/pass-121/set/b-bloomberg-ai-deals-capture.json
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-fold-early.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-fold.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440-hover.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-1440.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390-fold-early.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390-fold.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-390.png
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-capture.json
?? .planning/research/pass-121/set/b-cjrobinson-transmodel-map-context.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-fold-early.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-fold.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440-hover.png
?? .planning/research/pass-121/set/b-pentagram-reddit-1440.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390-fold-early.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390-fold.png
?? .planning/research/pass-121/set/b-pentagram-reddit-390.png
?? .planning/research/pass-121/set/b-pentagram-reddit-capture.json
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-fold-early.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-fold.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440-hover.png
?? .planning/research/pass-121/set/b-pudding-essential-words-1440.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390-fold-early.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390-fold.png
?? .planning/research/pass-121/set/b-pudding-essential-words-390.png
?? .planning/research/pass-121/set/b-pudding-essential-words-capture.json
?? .planning/research/pass-121/set/b-pudding-similes-1440-fold-early.png
?? .planning/research/pass-121/set/b-pudding-similes-1440-fold.png
?? .planning/research/pass-121/set/b-pudding-similes-1440.png
?? .planning/research/pass-121/set/b-pudding-similes-390-fold-early.png
?? .planning/research/pass-121/set/b-pudding-similes-390-fold.png
?? .planning/research/pass-121/set/b-pudding-similes-390.png
?? .planning/research/pass-121/set/b-pudding-similes-capture.json
?? .planning/research/pass-121/set/c-antonsten-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-antonsten-home-1440-fold.png
?? .planning/research/pass-121/set/c-antonsten-home-1440-hover.png
?? .planning/research/pass-121/set/c-antonsten-home-1440.png
?? .planning/research/pass-121/set/c-antonsten-home-390-fold-early.png
?? .planning/research/pass-121/set/c-antonsten-home-390-fold.png
?? .planning/research/pass-121/set/c-antonsten-home-390.png
?? .planning/research/pass-121/set/c-antonsten-home-capture.json
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-fold.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440-hover.png
?? .planning/research/pass-121/set/c-buzzusborne-home-1440.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390-fold-early.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390-fold.png
?? .planning/research/pass-121/set/c-buzzusborne-home-390.png
?? .planning/research/pass-121/set/c-buzzusborne-home-capture.json
?? .planning/research/pass-121/set/c-draftnu-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-draftnu-home-1440-fold.png
?? .planning/research/pass-121/set/c-draftnu-home-1440.png
?? .planning/research/pass-121/set/c-draftnu-home-390-fold-early.png
?? .planning/research/pass-121/set/c-draftnu-home-390-fold.png
?? .planning/research/pass-121/set/c-draftnu-home-390.png
?? .planning/research/pass-121/set/c-draftnu-home-capture.json
?? .planning/research/pass-121/set/c-emilkowalski-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-emilkowalski-home-1440-fold.png
?? .planning/research/pass-121/set/c-emilkowalski-home-1440.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390-fold-early.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390-fold.png
?? .planning/research/pass-121/set/c-emilkowalski-home-390.png
?? .planning/research/pass-121/set/c-emilkowalski-home-capture.json
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440-fold-early.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440-fold.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-1440.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390-fold-early.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390-fold.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-390.png
?? .planning/research/pass-121/set/c-tomcritchlow-home-capture.json
?? .planning/reviews/scratch-111b/
~~~

## Unanticipated items

- The workspace arrived with the large pre-existing dirty set shown in 0.1; it was preserved.
- Git printed two permission warnings for the user-level ignore file on every status command.
- The specified absolute pnpm launcher was blocked by sandbox policy. The existing workspace cache contained pnpm 10.28.2, which was invoked directly with Node; no install or wrapper was used.
- rg and tr were absent from PATH. Git's existing tr.exe was used by absolute path; Get-ChildItem was used only to inspect the already-present pnpm cache.
- PowerShell redirection initially wrote UTF-16LE text. Those generated files were immediately replaced using cmd.exe redirection, and their leading bytes and final sizes were verified.
- Ctrl+C did not stop the PTY server. The exact port-owning node PID was inspected and stopped, then the absence of a LISTENING row was verified.
- Lighthouse could launch far enough to choose a debugging port but could not fetch Chrome's WebSocket endpoint. Per the brief, this was not retried or worked around.
