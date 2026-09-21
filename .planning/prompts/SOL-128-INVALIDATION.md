# Sol task: WHY does style recalc run on every scroll frame? Chrome invalidation tracking. Evidence only. ASCII only.

Context: `.planning/qa/pass-128/scroll-probe.mjs` (read it) scrolls the LIVE home page from the top to the Audit
section with a manual touch gesture at 390x844 DPR3, mobile emulation, CPU throttle 4. Traces show UpdateLayoutTree
(style recalc) near-constant at 11-15 ms on almost every frame, about 500 ms per scroll. Nothing obvious writes styles
per frame (Hero's parallax is pointer-fine only; Nav only flips a flag at 40px). We need the CAUSE of each recalc.

Write `.planning/qa/pass-128/invalidation-probe.mjs` (copy scroll-probe.mjs's setup and gesture exactly) that records a
trace with categories: devtools.timeline, disabled-by-default-devtools.timeline,
disabled-by-default-devtools.timeline.invalidationTracking, disabled-by-default-devtools.timeline.stack. During the
scroll window only, aggregate:
1. Every ScheduleStyleRecalculation / StyleRecalcInvalidationTracking / StyleInvalidatorInvalidationTracking event:
   group by (reason, invalidated node's nodeName + id/class if present, and the top JS stack frame url:function:line if
   present). Print the top 20 groups by count with counts.
2. For each UpdateLayoutTree event over 5 ms: the elementCount, and the nearest preceding invalidation reason.
3. Separately, the same run with `--no-hover-emulation`: before the gesture, call CDP Emulation.setEmitTouchEventsForMouse
   {enabled:false} is NOT what we want; instead run a SECOND variant where you inject CSS `* { pointer-events: none !important; }`
   AFTER load (this removes hover matching during the gesture; if the per-frame recalc disappears, the cause is hover
   emulation, an artifact of the test, not of a real phone). Report UpdateLayoutTree total ms for baseline vs this variant.
Run each condition 2 times (n=2). Write all raw summaries to `.planning/qa/pass-128/invalidation.txt`.
Report verbatim: the top-20 invalidation groups for baseline run 1, the UpdateLayoutTree totals for all 4 runs, and your
one-paragraph reading of what is invalidating style every frame (name the element and the reason). Do not edit anything
outside `.planning/qa/pass-128/`. No git, no bash. Never call a surprising number intended.
