# Harness map -- micahjonesconsulting, harness/v2

Sources: this repo (root CLAUDE.md/AGENTS.md, .claude/CLAUDE.md, .claude/AI_ROUTING.md, .claude/hooks/*,
.claude/briefs/README.md, .claude/STANDING_TECHNIQUES.md, docs/LESSONS_LEARNED.md #18/25/36/37/45-52,
docs/DESIGN_BAR.md R1-R15, scripts/{codex,deepseek,gemini,claude-glm}-exec*, cross-review, prepush-gates.mjs);
premium-web plugin (READ-ONLY, map-inputs/premium-web/); global layer (READ-ONLY, map-inputs/global/). Harness
v2 runs A-G; its 9 .claude/hooks/*.py are mapped as they stand on disk -- settings.json WIRING could not be
confirmed (privacy rule bars reading settings*.json this leg; see contradiction a4).

Sizes: tokens = bytes x 0.329952 (00-usage-audit.json T8's ratio). Auto-loaded every turn (Y): root CLAUDE.md
(1.9K/627t), AGENTS.md(0.3K/108t), .claude/CLAUDE.md(17.5K/5783t, volatile, snapshot 14:01), global CLAUDE.md
(9.6K/3177t). Not auto-loaded (N), read on demand: everything else -- AI_ROUTING.md(28.2K/9300t; a compact
copy IS in .claude/CLAUDE.md, and routing-reminder.py prints the full file once per session only); hooks/*.py
(1.7-10.8K each, executed not read); LESSONS entries sized per-entry(1.0-3.4K each); DESIGN_BAR rubric section
(10.3K/3386t, shared R1-R15); MODEL_ROUTING.md/ULTRACODE(9.4K/13.5K, prose "read it", not auto-injected).

Columns: id | file:line | rule(<=15w) | loaded every turn? | enforced by | dup/contradicts(row ids; X:=contradiction, in (a))

id|file:line|rule|loaded every turn?|enforced by|dup/contradicts
RC1|CLAUDE.md:1-9,22-31|Imports AGENTS.md; judgment layer at boot; read DESIGN_BAR+brand.json before UI work; deploy re-aliases both domains|Y|ST1|GL1
RC2|CLAUDE.md:12-21|RESUME.md whole-file<=2.5KB rewrite/task+switch; verify-before-done probes; defects->LESSONS+gate same day|Y|HK7|L18,25,36,37,45-52
AG1|AGENTS.md:1-5|Next.js deviates from training data; read node_modules/next/dist/docs before coding|Y|PROSE|-
HL1|.claude/CLAUDE.md:1-30|Pass-122 scope=existing theme; poster grounds,1 accent/screen,1 hero once; copper #bd5a2d/#8a3d24(AA)|Y|PWH7|R1,R4,X:PWA1
HL2|.claude/CLAUDE.md:20-22|2 modes foyer/theater via data-mode attr; no useTheme/ThemeProvider/toggle|Y|PROSE|ST1
HL3|.claude/CLAUDE.md:33-37|Signature motion=TitleCard 600ms+900ms dim;receipts-v2 clip superseded countup|Y|PWA4 refuses 2nd|X:PWA5
HL4|.claude/CLAUDE.md:42-90|Routing(Opus main,<=15 calls/arc)+stack(GSAP=SplitReveal,Lenis syncTouch:false)+11 bans|Y|HK2,HK9,gsap-gate.mjs|AR1,X:PWA5
HL5|.claude/CLAUDE.md:95-156|Content/voice/done:mdx frontmatter,1st-person<=25w,1 em-dash,30-word list,LH>=95,axe0|Y|PWH1,PWH5,PWH8,PWH9|ST1
AR1|AI_ROUTING.md:1-44|Single source;Opus main,GLM executor;opus=claude-opus-5-5,fable=claude-fable-5-1(not env-overridden)|N/Y-compact|HK8 boot|HL4,see a5
AR2|AI_ROUTING.md:70-148|Rules1-11(budget,guard-scope,40/12-call deny)+per-model traps; History=old superseded ruling|N|HK2,HK5,HK6,HK9|X:BR2
BR1|briefs/README.md:9-46,141-156|Fable-audit 320t/9; DIRECT/EXECUTE/JUDGE arc; Brief-Format v2 sections|N|diff_scope.py,brief_lint.py|HL4,GL1
BR2|briefs/README.md:50-133|Standing clauses(no reinterpret,no gaming,contrast);never pin moving HEAD;<=15 calls/arc|N|tier-burn-monitor.js|L25,L37,X:AR2
ST1|STANDING_TECHNIQUES.md:6-97|CARD1-6:ship flow(alias after push),evidence review,marker grep,copy rules,design routing,cross-review|N|run_cross_review.py|RC1,HL5,SC1
SC1|codex,claude-glm,deepseek,gemini -exec.ps1|Codex lockfile;GLM receipt w/cost;DeepSeek cost-ledger/call;Gemini no $ meter|N|self|L18,L36
PG1|.planning/exec/prepush-gates.mjs:1-33|Node not bash local build chain; 17 STEPS; drift guard is whole-step match vs package.json|N|self|L47
GL1|user CLAUDE.md+MODEL_ROUTING.md|Judgment layers; arc-shape 9/320 stat; precedence per-call>frontmatter>env>main; 6 gates|Y/N|self table|RC1,X:HK-list
HK1|.claude/hooks/_transcript.py:1-7|Shared JSONL transcript-reading library for the B2-B4/C2 hooks below|N(library)|n/a|-
HK2|.claude/hooks/budget-gate.py:1-9|SessionStart prints budget line; PreToolUse denies a Claude fan-out over AR2's thresholds|N|self|-
HK3|.claude/hooks/context-size-warn.py:1-7|UserPromptSubmit warns once per 50K band at/over 200K context|N|self|-
HK4|hooks/dispatch-lint.py:1-7|PreToolUse denies a GLM/Codex dispatch whose brief fails brief_lint.py|N|self+brief_lint.py|-
HK5|hooks/executor-guard.py:1-9|PreToolUse confines executor: fail-closed on writes/books/secrets/git/subagents/MCP/net|N|self,logs guard.log|-
HK6|.claude/hooks/image-open-ask.py:1-6|PreToolUse asks/denies before the 8th raw image opened in a chat|N|self|-
HK7|.claude/hooks/resume-size.py:1-9|PostToolUse blocks right after a write leaves RESUME.md over 2500 bytes|N|self|-
HK8|hooks/routing-reminder.py:1-9|SessionStart prints AI_ROUTING.md tiers+rules once/session, never fails|N(once/session)|self|-
HK9|.claude/hooks/tier-burn-deny.py:1-9|PreToolUse denies a long mechanical loop or a 4th Fable call/arc; never blocks dispatch scripts|N|self|-
HK10|hooks/worktree-write-guard.py:1-19|PreToolUse W/E/ME/NE refuses writes landing in MAIN checkout from a worktree|N|self,branch+main-local|-
L18|LESSONS_LEARNED.md:1701|Worktree .git lives outside it; sandboxed executor writes, non-sandboxed commits|N|SC1(codex header)|-
L25|docs/LESSONS_LEARNED.md:1927|Executor reinterpreting an expected value has made itself the judge; stop, report raw output|N|BR2(standing clause)|-
L36|LESSONS_LEARNED.md:2176|Batch prompt truncated at 1st double-quote(PS5.1 argv); now piped stdin UTF-8+marker|N|SC1(claude-glm.ps1 fix)|-
L37|LESSONS_LEARNED.md:2201|Checks gamed: boxed a unit line, moved 5 sizes, deleted the copyright to pass counts|N|BR2(3 clauses added)|-
L45|LESSONS_LEARNED.md:2424|Ship gate must assert POSITIVELY served-id=build, never source a baseline from a doc|N|card1-123.sh EXPECT_DPL|-
L46|LESSONS_LEARNED.md:2452|Windows shell mangled a U+2019 to a question mark; the report called the defect mandated|N|mojibake-gate.mjs|-
L47|docs/LESSONS_LEARNED.md:2473|Documented local build(next build --webpack) skipped every copy/vendor/mojibake gate silently|N|PG1(prepush-gates.mjs)|-
L48|LESSONS_LEARNED.md:2500|2 layout defects survived 5 rounds; no check read line-breaks or matched a cross-page gap|N|hiw-wrap-gate.mjs|-
L49|LESSONS_LEARNED.md:2536|Handoff RESUME write landed in the MAIN checkout, not the worktree|N|HK10|HK10
L50|LESSONS_LEARNED.md:2567|Routing-reminder wired only on the branch, missing for a chat started in main checkout|N|main settings.local.json|HK8
L51|LESSONS_LEARNED.md:2585|Wrong jank suspect blamed by invalidation frequency; DroppedFrame count found the real driver|N|scroll-probe.mjs|-
L52|LESSONS_LEARNED.md:2602|Timing probe measured static parent elements; its floor read as under 0.1s|N|BR2(pre-flight clause)|BR2
R1|DESIGN_BAR.md:165-168|<=2 typefaces(mono narrow 3rd ok); Bricolage stays, face-test withdrawn Pass-122|N|PWH7|-
R2|docs/DESIGN_BAR.md:169-174|Real scale contrast: display>=4x body,<=5 active sizes; study-page exception 3.1x at 1440|N|PROSE|-
R3|docs/DESIGN_BAR.md:175-178|Body discipline:>=16px,<=75ch,1.5-1.7 line-height,AA 4.5:1 including muted text|N|PROSE|-
R4|docs/DESIGN_BAR.md:179-181|1 accent/page,0 purple/gradient/glow; Pass-122 poster-ground exception adds full-bleed grounds|N|PWH7|-
R5|docs/DESIGN_BAR.md:182-183|No glassmorphism, no 1-side accent-border cards, no nested cards, radius<=16px|N|PROSE|-
R6|docs/DESIGN_BAR.md:187-188|No centered symmetric icon-grid; any like-item grid is asymmetric or weighted|N|PROSE|-
R7|docs/DESIGN_BAR.md:189-192|Hero left-aligned/asymmetric, 1-sentence offer readable in ~2s; /services 2-sentence exception|N|PROSE|-
R8|docs/DESIGN_BAR.md:193-195|Vertical rhythm varies:>=1 full-bleed/quiet section, major gaps ~15vh+ not constant 96px|N|PROSE|-
R9|docs/DESIGN_BAR.md:196-198|Exactly 1 signature motion; Pass-122 lifts the limit for scroll-driven type/pinned number assembly|N|PWA4 refuses a 2nd|-
R10|docs/DESIGN_BAR.md:199-200|Nav<=5 primary items incl a bare Work; no mega-menu, no dropdown taxonomy, no Resources|N|PROSE|-
R11|docs/DESIGN_BAR.md:201-203|Case/work entries<=4 data points on index surfaces; depth deferred to case pages|N|PROSE|-
R12|docs/DESIGN_BAR.md:207-212|Every image a real artifact,0 stock/AI/3D; Pass-122 allows real photos+screen-recordings+real-number charts|N|PROSE|-
R13|docs/DESIGN_BAR.md:213-217|No logo-wall without outcomes, no testimonial carousel/star-ratings; 1 hero counter/page may assemble once|N|PROSE|-
R14|docs/DESIGN_BAR.md:218-220|>=1 proof block names a metric WITH mechanism a skeptical CFO could interrogate|N|PROSE|-
R15|DESIGN_BAR.md:224-227|Motion is punctuation: nothing idle,entrances once/<=400ms/ease-out;lifted for scroll type|N|PWH4(300ms)|X:PWH4,PWA6
PWH1|premium-web copy-lint.sh:1-36|PreToolUse W/E/ME: rejects slop-words.txt+brand.json.voice.banned in mdx/ts/tsx/html/css|N|hooks.json Pre,10s|-
PWH2|premium-web font-license.sh:1-29|PreToolUse: refuses Inter when brand.json declares Klim Sohne body|N|hooks.json Pre,5s|X:R1(Bricolage/Hanken/Mono)
PWH3|premium-web motion-discipline.sh:1-31|PreToolUse: blocks cursor-follow,scroll-jack,>2 parallax,monospace|N|hooks.json Pre,5s|-
PWH4|premium-web motion-token-lint.sh:1-97|PreToolUse:compositor-only props,no transition:all,entrance>300ms needs a tag|N|hooks.json Pre,5s|X:R15
PWH5|premium-web mdx-frontmatter.sh:1-17|PreToolUse: content/work/*.mdx must carry title/dek/status in its first 30 lines|N|hooks.json PreToolUse,5s|-
PWH6|premium-web image-budget.sh:1-15|PreToolUse: blocks public/ images over max_image_kb(500)|N|hooks.json Pre,5s|X:HL-portrait("unwired") vs this wiring
PWH7|premium-web design-tokens.sh:1-26|PostToolUse:warns on hex not in brand.json.palette, outside tokens/globals/tw.config|N|hooks.json Post,10s|-
PWH8|premium-web perf-budget.sh:1-34|PostToolUse:Bash after a build: Lighthouse fails on score<95 or LCP>1800ms|N|hooks.json PostToolUse:Bash,60s|-
PWH9|premium-web a11y-baseline.sh:1-22|PostToolUse:Bash after deploy: axe wcag2aa scan, fails on serious/critical|N|hooks.json Post:Bash,60s|-
PWA1|premium-web a11y-reviewer.md:8-28|Reports only serious/critical axe; fix-note cites STALE copper hex|N|frontmatter|X:HL1
PWA2|premium-web case-study-writer.md:8-21|Refuses invented quotes/metrics; 4-question interview; writes+lints content/work/<slug>.mdx|N|frontmatter|-
PWA3|premium-web copy-editor.md:10-30|Reads brand.json voice block first; strikes banned words, caps sentence_max, 1 em-dash/page|N|frontmatter|-
PWA4|premium-web design-director.md:23-40|Refuses 2nd accent,2nd signature motion,stock/social-proof/dark-patterns|N|frontmatter(no Write)|-
PWA5|premium-web motion-engineer.md:8-23|Owns motion.signature=title-card;says GSAP lives in title-card.tsx|N|frontmatter|X:HL3,HL4
PWA6|premium-web motion-qa.md:10-16|Checks allowed_properties,max_entrance_ms=300,INP<200/CLS<0.05 via trace|N|frontmatter|X:R15,PWH4
PWA7|premium-web perf-auditor.md:8-30|Lighthouse+Chrome trace: LCPBreakdown/CLSCulprits/non-composited-anim/long-task|N|frontmatter|-
PWA8|premium-web visual-qa.md:8-25|Screenshots 390/768/1440, pixelmatch vs /qa/baselines, threshold 0.1, never auto-overwrites|N|frontmatter|-

## (a) Contradictions and stale clauses
1. **Entrance timing.** R15(DESIGN_BAR.md:224-227): once/<=400ms. PWH4(motion-token-lint.sh:88) and
   PWA6(motion-qa.md:13): max_entrance_ms=300. Two numbers, one rule.
2. **Stale copper hex in the plugin.** HL1(.claude/CLAUDE.md:25-30): #bd5a2d/#8a3d24. PWA1
   (a11y-reviewer.md:28): still shows the retired #C8542B on #F5EFE6 ~4.2:1 (pre-Tier-H, `40b97a6`).
3. **GSAP location.** HL4(.claude/CLAUDE.md:72): SplitReveal.tsx is the ONLY GSAP importer since Pass-120.
   PWA5(motion-engineer.md:14,22-23): still says GSAP lives in title-card.tsx+view-transitions.tsx.
4. **image-budget.sh wired or not?** PWH6(hooks.json:12) wires it into PreToolUse; .claude/CLAUDE.md's
   Portrait section says "the image-budget.sh hook is unwired" (Pass-59). Unresolved here -- settings*.json
   is off-limits under the privacy rule. Flag for the main session.
5. **Model-id pin: fixed here same-day, still stale in Ordani.** smoke/subagent-probe.txt:10 recorded the
   PRE-fix state ("AI_ROUTING still pins opus=claude-opus-5"); AR1(AI_ROUTING.md:41) now correctly pins
   opus=claude-opus-5-5, fable=claude-fable-5-1, citing "premise check P7". The explicit-model-not-overridden-
   by-env-var finding is correctly stated here too (AR1) and independently confirmed by MODEL_ROUTING.md:53-55;
   no source this leg read claims otherwise. Still stale: Ordani's MODEL_TIERING.md:206 (READ-ONLY) pins
   opus=claude-opus-5 / fable=claude-fable-5 (no -5-5/-5-1), unedited since 2026-07-23 despite its own
   newer amendment at line 774 reinterpreting "Opus 5" as Opus 5.5 in prose, not by fixing the table.
6. **Three call-budget numbers for one rule.** BR2(briefs/README.md:127): <=15 top-tier calls/arc, citing
   the global tier-burn-monitor.js (counts at 12). This repo's own HK9(tier-burn-deny.py): denies past 40
   consecutive Opus / 12 Fable calls. Different mechanism, different numbers, same rule.
7. **Hook-inventory source is stale for this branch.** 01a-hooks-diet-boot.md:14-28's settings snapshot (from
   worktree p106-live) lists 11 hooks; none of this worktree's 9 .claude/hooks/*.py (all self-date "Harness v2
   run B/C/G") appear in it. Different worktree/branch, not harness-v2's current set.

## (b) Budget meters today
- deepseek-exec.ps1:239-296 appends a priced ledger line per call (tokens, cache-hit/miss, reasoning, and est_usd
  at :291) to <state>/deepseek-ledger.jsonl; scripts/harness/measure-prefix.ps1 prices its calls the same way.
  [Main session, review 2026-09-22: the leg wrote "no $" here, which est_usd contradicts.]
- codex-exec.ps1:45-82: no cost meter; a lockfile (codex.lock) refuses a 2nd parallel run instead.
- gemini-exec.ps1:218,309 flags "spent budget on thinking" (MAX_TOKENS) as an error; no cost/quota shown.
- claude-glm.ps1:181-211 writes a receipt JSON per run incl total_cost_usd, num_turns, usage. [Main session,
  review: the leg said "alone"; the DeepSeek ledger above carries a $ estimate too.]
- HK2(budget-gate.py:33-79): shows a vendor budget, but only Claude's OWN (weekly/5hr/fable pct from
  scripts/harness/status.py). No hook surfaces GLM's, DeepSeek's, Codex's or Gemini's remaining quota.

## (c) What landing/Ordani do better
- **AI_ROUTING traps:** landing's AI_ROUTING.md:65-79 is a near-verbatim SUBSET of AR2(AI_ROUTING.md:108-129).
  Nothing to adopt; this repo's copy is already the superset.
- **DeepSeek map-reduce synthesis -- reusable, no equivalent here.** .../05-synth/run-synth.ps1: S1 (one
  DeepSeek call/group, 4 parallel) then S2 (one call over all S1 + frontier table + stats). This repo's
  DeepSeek use (SC1) is single-shot only. Reusable as-is for any multi-source synthesis task.
- **Quote/citation gates -- reusable, no equivalent here.** extract/quote-gate.mjs (quote must be verbatim in
  its source) + 05-synth/cite-gate.mjs (every [source_id] must exist) beat ordani-claims-gate.mjs (1 figure
  set only). Would enforce PWA2's "refuses to invent quotes or metrics", today prose-only and ungated.
- **GLM digest builder -- pattern reusable, code is not.** lx-01-digest-builder.md + build-digest.mjs compact
  ~130 raw records into frontier.md + per-group .jsonl + stats.md before any DeepSeek call; no equivalent here.
- **Ordani, net:** MODEL_TIERING.md:206's stale ids table is WORSE (item a5). check-board.cjs (puppeteer,
  1440+390, image/link/overflow counts) is smaller than this repo's visual-qa agent + baselines -- no upgrade.
