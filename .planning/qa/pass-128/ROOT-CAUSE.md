# Pass-128: the live home on his phone, root causes (evidence only; no fix shipped)

Report (operator 2026-09-21, LESSONS #3 "LIVE HOME ON HIS PHONE"): "the scrolling animation isnt smooth on mobile.
between the top and to the audit the background color switching doesnt change smoothly, kind of gkitchy. Also the word
loading slow". Live deploy measured: `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`. Method: workflow wf_24b793b4-f2b (10 Sonnet
agents: a calibrated phone probe, three investigators, a clean screencast reproduction, a merge, four sequential A/Bs),
then Sol's style-invalidation trace. Protocol: 390x844, DPR 3, mobile emulation, CPU 4x, a real touch gesture
(CDP synthesizeScrollGesture(touch) is a no-op on Chrome 153; the probe dispatches touchStart/Move/End), top to "The
Audit". Noise floor at n=3: frames over 33 ms spread 1; p95 spread 0.0 ms. Everything below is in this folder.

## 1. "The word loading slow" -- ROOT CAUSE CONFIRMED (A/B T1, causal)
The one heading between the hero and the Audit revealed letter by letter, `#cw-offer-title` ("Two weeks to know what
to fix first.", `components/color-worlds/SplitReveal.tsx`, GSAP SplitText, 0.65 s expo.out + 0.012 s stagger per
character), takes 1,135-1,176 ms from entering to settled (n=3). Every neighbouring heading (plain CSS reveal) settles in
38-74 ms. Switching off only the character animation (`exp-T1.css`) brings it to 67 ms on all three runs: a ~1,070 ms
drop, ~30x the noise floor, zero overlap. SplitReveal is also used on "How I work.", `#cw-ordani-title` and the closing
heading (`app/(foyer)/page.tsx:219, 406, 498`; `components/color-worlds/HowIWork.tsx`).

## 2. "Scrolling isn't smooth" -- NOT ROOT-CAUSED. Leading suspect named, its first A/B inconclusive
Style recalc (UpdateLayoutTree) runs ~150 times per scroll, 600-620 ms total at 4x CPU. Chrome's invalidation tracking
(`invalidation.txt`, n=2) names the most frequent trigger: `DIV.cw-split__char`, reason "Inline CSS style declaration
was mutated", from the GSAP chunk, ~750 invalidations per run: SplitReveal's per-character tween writing inline styles.
NOT a hover-emulation artifact (pointer-events:none left it in place, 540-548 ms, same top groups).
CONFIRMING A/B, NOT CAUSAL AS RUN (`confirm-base.jsonl` vs `confirm-var.jsonl`, n=3 each, cpu 4): with `exp-T1.css`
(the character animation's CSS overridden) frames over 33 ms stayed 45/45/45 vs 45/46/44 and UpdateLayoutTree stayed
488-541 vs 466-503 ms. BUT that neutralizer only overrides what the characters look like; GSAP keeps writing inline
styles to them every frame, so the invalidations still happen and this A/B does not test the suspect. THE RIGHT TEST
(not yet run): before the gesture, replace `#cw-offer-title`'s character DIVs with a plain text node
(`h.textContent = h.textContent` via page.evaluate), so GSAP's writes land on detached nodes; then compare frames over
33 ms and UpdateLayoutTree. Also untested: the four fixed mix-blend grain/vignette layers (S1, one n=1 A/B only), and
the frame budget itself at 4x CPU (p95 sits exactly at two vsyncs, 33.4 ms, on every run). Secondary: "Animation" invalidations on `.cw-exits__val`, `.cw-mlink`, `.cw-section-cta` (colour transitions
tied to the world switch). Ruled out by A/B: blocking the whole GSAP chunk (T3; breaks the page JS, 21x worse) and
`content-visibility` on sections (T4; no change to the recalc shape). Also noted, not tested: `ExitScoreboard.tsx`
attaches a page-wide scroll listener with a getBoundingClientRect read on a normal top-of-page load (its off-screen guard
misfires), a code fix with no CSS neutralizer.

## 3. "The background colour switching is glitchy" -- MECHANISM OBSERVED (screencast), no single-cause A/B
The crossfade itself is even: no banding, no flash, text and ground move together (`switch-1.png`, `switch-2.png`).
What reads as glitchy, measured frame by frame:
- The doors band carries `data-world="bone"` but paints petrol and terracotta itself, between a terracotta hero and a
  terracotta Audit. So the page frame and nav go terracotta -> BONE -> terracotta over content that never shows bone.
- The switch fires when a section crosses mid-screen (`WorldSwitcher.tsx` rootMargin -50%/-50%), so the doors' own
  colours are on screen 640-870 ms before the nav/frame catches up; then an ~82 ms delay before any visible fade.
- At the Audit, three things animate at once: the world fade (~233 ms visible), the PriceBox opacity fade (277 ms) and
  the 1.1 s letter-by-letter heading (section 1).
T2 (syncing nav/link transition timings to the root's) moved the churn only 6-16%: not the driver.

## What a fix pass needs from the operator (do not decide these silently)
1. SplitReveal: shorten it (e.g. by word or line, under ~400 ms, no per-character inline writes), or retire it for the
   site's standard reveal. It is the recorded Pass-111a GSAP exception; its removal/retune is his call.
2. The doors band's world: match what it paints (terracotta = no switch from hero to Audit; or petrol). Decided together
   with the doors build (`.claude/briefs/pass-127c-doors-build.md` section 4b).
3. Whether to stagger the Audit's entrances so the world fade, the PriceBox fade and the heading do not coincide.
Every fix is verified with `scroll-probe.mjs` (framesOver33ms, UpdateLayoutTree) against the numbers above, and ships on
his push words.
