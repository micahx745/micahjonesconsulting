# Quality read: the scroll fix on the home page (Pass-128c), before the owner sees it on his phone

You are one of three independent readers; the others do not see your answer. What changed, by the owner's rulings
(settled; do not re-litigate them): (1) the band with the two "you are probably here" doors, right under the hero,
keeps the page's terracotta ground instead of switching to bone and back, so the nav stays terracotta over it and the
Audit section arrives already on its colour; (2) four headings (the Audit's "Two weeks to know what to fix first.",
"How I work.", "Ordani", and the closing "Name the problem" link) lose their letter-by-letter reveal (about 1.1 s) and
take the site's standard heading fade (0.55 s). The copy is unchanged, character for character. The Audit's price box
keeps its short fade.

Images, in order:
1. BEFORE: the live page's scroll contact sheet (390 px wide, 4x CPU slowdown, every 4th frame, timings in ms).
2. AFTER: the same sheet from the fixed build.
3. The fixed build, the doors at 390x844, normal motion, settled.
4. The fixed build, the doors at 1440x900, normal motion, settled.
5. The fixed build, the Audit at 1440x900, normal motion, settled.
6. The fixed build, the doors at 390x844, reduced motion.

Measured, live vs fixed (390 px, 4x CPU, median of 3), for context only: frames slower than 33 ms 45 -> 2; main-thread
frame time at the 95th percentile 33.4 -> 16.8 ms; style recalculation 589 -> 31 ms; compositor dropped frames 74 -> 49;
transition events per swipe 868 -> 37. Layout shift 0.019 at 390 and 0.007 at 1440. Served-page checks: 0 failures.

Look for: anything in AFTER that reads broken, unfinished or wrong and is not in BEFORE; a heading or panel caught
invisible or half-drawn in a settled shot; the doors panels losing contrast or legibility on terracotta; the nav, the
price box or a link looking wrong against terracotta; a colour flash or a washed crossfade in the AFTER sheet; reduced
motion not showing the finished frame.

Hand back, plain text:
VERDICT: SHOW HIM AS IS | ONE MORE FIX (name it) | REWORK
Then at most four numbered findings, most important first: where (image number, and frame or area), what, why, fix.
No preamble.
