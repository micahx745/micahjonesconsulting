You are the quality juror for one pass on micahjonesconsulting.com. One consolidated look.
Read-only. Working directory: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

WHAT CHANGED (brief .claude/briefs/pass-118-tuned-font-fallbacks.md, §13-§17; branch commit 9ebe88f):
Only the invisible stand-in fonts shown while the web fonts load. next/font's generated Arial
fallbacks were 25-30% too wide for Bricolage Grotesque and Hanken Grotesk, and JetBrains Mono's was
32% too wide, so the home hero reflowed when the real fonts arrived. Each family now has a tuned
fallback (Bricolage Arial 80.75%, Hanken Arial 73%, JetBrains Mono Courier New 100%), layered over
the old metrics so "0" (ch units) and glyphs the real faces lack (the arrow) keep today's size.
Nothing about the fonts-loaded page is meant to change.

Measured on a local production build (mobile 412x823, throttled): layout-shift total on / 0.001 on
10 of 10 loads (production today 0.290); /services 0.000 (was 0.037); /call 0.005 (was 0.091);
/packages 0.030 (was 0.028). Fonts-loaded geometry: 0 differences on / and /services at 390, 412,
768, 1440. LCP on / 1548ms (was 2190), /services 1116ms (was 1628). axe 0 serious/critical.

IMAGES, in attach order, all 412 wide at 1.75x, reduced motion:
1 production /  web fonts BLOCKED (today's stand-in state)
2 this pass /   web fonts BLOCKED (tuned stand-in state)
3 this pass /   fonts loaded (what visitors end on)
4 production /services  fonts BLOCKED
5 this pass /services   fonts BLOCKED
6 this pass /services   fonts loaded

KNOWN AND OUT OF SCOPE: both stand-in captures (1, 2, 4, 5) render some letters with mixed-case
letterforms in this headless capture. It is identical on production, so this pass did not cause it;
it is being investigated separately. Do not score it against this pass, but say if it is severe.

ANSWER, citing image numbers:
1. Does the stand-in state in this pass (2, 5) hold the same line breaks and positions as the loaded
   state (3, 6) more closely than production's stand-in (1, 4) does? Name any element that would still
   visibly jump when fonts arrive.
2. Anything in 3 or 6 that looks wrong or different from the site's normal finished look.
3. Any regression you can see in 2 or 5 against 1 or 4 besides the out-of-scope artifact.
4. Verdict: SHIP or FIX. For FIX, at most 4 items, each specific. Under 30 lines.
