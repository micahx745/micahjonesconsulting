# Pass-123 study bands: the Fable judge gate (input, 2026-09-19)

You wrote the brief for this (`.planning/mocks/pass-123/STUDY-BRIEF.md`) and the cuts list
(`CUTS-PROPOSED.md`). It is built. This is the judge look your own §7 asks for: one call, look once,
rule, leave. Do not edit code, run builds or captures, or touch git.

## What shipped into the branch (not pushed)
- Stage 1: the one title line carrying a figure renders it as `.cs-num` at /work's poster size in copper,
  the title's other words in ink around it. Guardicore "$14M," / "then Akamai"; RFP "$3M" / "in signed
  contracts"; content engine "up to" / "800,000" / "impressions". The h1's text is unchanged, character for
  character (check B1, 10/10).
- Stage 2: birth worker's Results lead moved under the title as the poster block ("Bookings from one to
  three a month to" + "five to ten."); its Results row now renders `results.rest` only. ORDANI: no poster,
  band untouched (its band height is identical to 0.00px).
- Stage 3: the Guardicore band photo plays the Tel Aviv clip once, layered over the preloaded `<Image>`,
  armed on the window load event, never before 1200ms after mount, fading back to the photo at `ended`.
  Reduced motion, Save-Data and 2g get the photo. +1363 bytes of route JS (limit 6144).
- Cuts (operator ticked them on the built sheets, LESSONS #3 "PASS-123 CUTS TICKED"): guardicore G1+G2,
  RFP R1+R2, content engine C1+C2, birth worker B1, template T1b (the at-a-glance Client row goes; "Name
  protected" moves under the context line). NOT ticked: G3 (so "built in Tel Aviv" and the "those buyers"
  antecedent survive), G4, R3, R5, R6, C3-C6, B2-B6, and all of ORDANI including O6.

## Evidence to open (all under `.planning/qa/pass-123/`)
- `sheets/study-final-390.png` and `sheets/study-final-1440.png` — BEFORE (row 1) vs FINAL (row 2), five
  studies. These are the frames the operator judges on.
- `sheets/study-assembly-390.png`, `study-assembly-1440.png` — the poster's entrance at 0/150/400/800/1500ms.
- `sheets/study-clip-390.png`, `study-clip-1440.png` — the Guardicore clip: before play, +100ms, +2000ms,
  +3500ms, after `ended`, reduced motion, no JS.
- `sheets/study-rm-nojs-390.png` — the five reduced-motion frames and the five JS-disabled frames.
- `band/stage3-band123.txt` — every check line. `bite-band123.txt` — the same checks against the unchanged
  site, for what they were before.

## The numbers already established (do not re-derive)
- band123: every B check 10/10 PASS on all five studies at 390 and 1440. One failure, K5 at 390, traced to
  a race between the CHECK's own `scrollIntoView` and Lenis (reproduced 3/3 with polling, 0/5 on a page with
  no video, no product code calls `scrollIntoView`); K5 at 1440 passes with maxDiff 1.
- CLS: 0.00000 on all five studies at both widths, before and after.
- Lighthouse mobile on /work/guardicore: median LCP 3375.8ms after vs 3389.8ms before; no run's LCP element
  is the video; desktop LCP element is `img.cs-band__img`, score 100, LCP 704ms. The mobile LCP has been
  ~3.4s since before this pass (text LCP, `p.cs-band__dek`); it is not this pass's doing and is queued
  separately.
- Copper is `#bd5a2d` (the docs' #C8542B was stale; the operator ruled on 2026-09-19). On the theater band
  it computes 4.22:1, above the 3:1 large-text floor.

## What I need you to rule on
1. **The 390 first screen, per study, against your own bar:** would a skeptical founder scrolling on a phone
   stop? Name any band that is merely tasteful.
2. **The ink gap under the comma posters.** Your brief expected 12-32px at 1440; guardicore measures 39.0px
   and content engine 40.0px (both carry `.cs-num--comma`'s extra 0.16em). rfp-engine, with no comma, is
   31.0px. Keep, or specify the exact change.
3. **"Name protected" in its new home** under the context line, on rfp-engine, content-engine and birth
   worker. It moved out of a definition list; judge its size, weight and spacing where it now sits.
4. **The poster's entrance** in the assembly sheets, including the first frames: if the fallback face shows
   a different letterform before Bricolage swaps in, say so and specify the fix.
5. **The clip beat** in the clip sheets: the fade in, the rest back onto the photo, and whether the band
   reads as one thing while it plays.
6. Anything else that would fail a buyer read of these five pages.

## Rules for your verdict
- Copy is closed: the operator ruled on every cut today. If a line still reads wrong, say so and give
  rewrites for me to put to him; do not assume a change.
- No new copy, no second signature motion, no new colour or face. Existing tokens only.
- A fix must name the file, the selector or the string, and the exact value. "Tighten it" is not a fix.
- Return: a one-word verdict (SHIP / FIX / STOP), then the fix list in priority order, then anything for the
  operator with rewrites to choose from.
