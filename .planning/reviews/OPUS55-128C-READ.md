# Pass-128c: the fourth read, Opus 5.5 (operator's request, 2026-09-22)

His popup answer to the edge/fade question, verbatim: "can we include opus 5.5 in this. its new and i want to see
its thoughts on this". One Opus 5.5 subagent (`model: "opus"`, general-purpose), same six images and the same prompt
as Astra and Fable (`.planning/prompts/PASS-128C-QUALITY-READ.md`), Part 1 blind (written to the session scratchpad
before Part 2), then Part 2 after reading `PASS-128C-JURY-DISPOSITION.md` and the fix-ab evidence. 50 tool uses,
271,972 subagent tokens, 18 min. Its return, verbatim:

MODEL: claude-opus-5-5
PART 1:
VERDICT: ONE MORE FIX (an edge on the sell door)
1. Image 4 right half; image 3 y 423-760. The sell door's fill now equals the ground around it (#903722 vs #8e3621, grain noise) while the teal door ends hard at y 643: at 1440 one teal card plus loose text, as if a panel failed to paint; at 390 "SEE THE ENGAGEMENTS" runs 117 px of bare terracotta into the Audit title and reads as its intro. BEFORE's bone ground gave that edge (image 1, #68-#116). Fix: the Audit box's thin bone rule around the sell door.
2. Image 2, #60-#100: by its own stamps ~34 ms/frame (#88-#92: 38 ms) against ~23 ms over the same content in image 1; both heroes run 16-17 ms, so capture keeps up. At least 7 frames there exceed 33 ms against the "2" claimed; it fits compositor drops still at 49. Fix: trace raster/composite on that stretch before his phone check.
3. Images 4-5 nav, image 3 MENU: glyphs peak #c5b9a9 on #8c3621, ~4.1:1 (MENU 4.3), under AA 4.5 for 12 px mono; the door CTAs reach 5.7. It now also sits over the doors, where BEFORE had ink on bone. Fix: full bone.
4. Images 3 and 6 are pixel-identical (both settled), so image 6 cannot prove reduced motion skips the new fade. Fix: shoot it on arrival. No colour flash: nav and ground hold terracotta in all 30 AFTER frames.
PART 2: PICK: E0 -- wording corrected.
1. Missed by all: 49 and 36 are software-compositor counts (--disable-gpu, scroll-probe.mjs:423; all fix-ab logs: "Microsoft Basic Render Driver"). By hasPartialUpdate, LIVE's 74 is 20 full + 54 partial; PREVIEW's 49 is 38 full + 11. Full drops, which hitch a scroll, rose (image 2, #60-#100). A --gpu run needs no build (RTX 4080, detach-ab/Agpu.jsonl).
2. The fade costs there: P puts 12 full drops in the 1250-1750 ms window where the title fades mid-scroll, N none (attrib/traces); will-change arms stay 49-52 (willchange/, not in the disposition). Hold E2 for a catch he feels. DeepSeek is right item 5 fails; it cannot speak for his phone. Tie-break attribution holds.
3. Against E1: Fable and I found the edge, Astra missed it (images 3-4). But a bone rule, my Part 1 fix included, re-cards doors he refused as cards, "No cards, no borders" (globals.css:1923-1924), and the Audit rule is 2 px solid bone (image 5, y 197-198); no deeper terracotta token exists (globals.css:119-123).
4. E0 says 127c fixes it; that brief has no edge must-fix and ends terracotta on terracotta (pass-127c-doors-build.md:29-31, 57-58). Add one, form his call; tell him the flat door is known before his phone check.

## Premise status (main session, 2026-09-22; the rest is for the next session, see its kickoff)
See the kickoff `.planning/handoff/NEXT-SESSION-KICKOFF.md`, section 2, for which claims were checked here and which
wait for a measurement. Nothing in this read is adopted or dismissed until its premise is checked.

LEGS: fable=0 astra=0 dspro=0 dsflash=0 gemini=0 sol=0 glm=0 sonnet=0 opus=1
