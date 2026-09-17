# RESUME — micahjonesconsulting (2026-09-17)

## READ FIRST
Pass-121 EXECUTE (kickoff .planning/handoff/NEXT-SESSION-KICKOFF.md).
Main = Opus 5; Fable only at G3 (judge mocks) and G4 (read brief). GLM 5.3
executes on z.ai quota. No in-session Sonnet fan-outs unless the operator says.
ChatGPT EMPTY till 09-19 12:17. Worktree p106-live, branch design/live-evolve,
nothing pushed.

## LIVE: main = c525329, dpl_4C69xGq9PfH9ujTHBjqZ2Ecw3tdg BOTH domains
Revert: promote dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23. Push to main deploys; re-alias
both domains (LESSONS #5). Production untouched this pass.

## Pass-121 progress
- Ledger #3 (this session): ORDANI dek; answer-shape = openings only, NO h2
  changes; content-engine + birth-worker deks approved verbatim.
- ROUND 1 (77d3e5f): GLM said all PASS; Opus found 7 defects (hl opacity .6 =
  2.19:1; ORDANI mono prose; clipped label; M14/M13/M15 gamed). PNGs set/round1/.
- GLM CAPPED 16:39 PDT (round 1 ate the 5h window in ~35 min); resets 20:54 PDT
  (server said 09-18 11:54:23 UTC+8). Operator 16:46: "Wait for GLM, draft the
  brief meanwhile". ARMED: .planning/exec/glm121-fix2-when-reset.ps1 smokes from
  20:56 and runs glm-121-mocks-fix2.md once (log glm121-fix2.log, smoke log
  glm121-fix2-smoke.log). If the session died, run that script by hand.
- DRAFTING: .claude/briefs/pass-121-work-and-studies.md (G3-dependent parts marked).
- LESSONS #37 + 4 standing clauses in briefs/README (708865b).
- NEXT: open round-2 captures -> G3 input -> Fable G3 -> operator popup with
  390/1440 captures -> brief -> G4 -> commit.
- For G3/brief: G2's hover grammar (0.6->1) is itself the AA defect; G2 3.1's
  seven sizes conflict with 3.2/3.3/2; sage on /work vs "sage /work/ordani only";
  G2 3.7 heading grep fails a correct page (DOM is sentence case); hand marks
  exist as components/hand/* (HandCircle instant), not a .cw-hand class.
- Brief plumbing: llms.txt is a literal (edit it too); robots named allows;
  sitemap per-file git dates; ORDANI mainEntityOfPage scoped. Copper = #bd5a2d.

## Waiting on operator
- Speed Insights p75 LCP for /work (A4). Colleague okay for the clip.
- Ordani screens · Stripe playbook-99 · 500 test · A4/S3 · §9a.
- Off-site presence (AI lever, unmeasured): a talk, not a brief.

## Traps
LEDGER BEFORE A LEG (#32) · retired figures every spelling (#33) · no grep -iF
(#34) · no parked copy (#35) · GLM prompt on stdin (#36) · no gaming a check,
contrast at rest+hover (#37) · pathspec commits (#23) · MSYS_NO_PATHCONV=1.
