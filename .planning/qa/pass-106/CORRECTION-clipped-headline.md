# Correction: the live site's headline is NOT clipped. I was wrong, twice.

2026-09-09. I told the operator twice that `www.micahjonesconsulting.com` renders its
hero headline with "PLATFORM" cut off, called it a serious defect live on production,
and put it in RESUME's operator-owned list. **It is not true.** Retracted here with the
measurements that retract it.

## What is actually true

At rest, at 1440, measured against production after `document.fonts.ready` plus 11s
(long enough for the rotation's 4 steps at 1900ms each to finish):

    .cw-h1 line 2 text : "GO-TO-MARKET."
    .cw-roll           : clientHeight 180px, scrollHeight 185px

That 5px is descender overflow inside a `height: 1em` box, not a lost word. The viewport
screenshot `hero-1440-t12000.png` shows the headline complete and correct. So does a
frame captured mid-rotation (`rot-clip-1.png`). At 390 the roll measures 43/44px.

**No word is clipped, at rest or in motion.**

## Where my false claim came from

`OLD-live-1440.png`, the capture I made for the Astra comparison, used
`full_page=True` after a scroll walk with a short settle. Two artifacts of that method:

1. **Full-page capture renders below-fold sections in their PRE-REVEAL state.** This
   site's sections animate in on intersection, so a naive full-page shot of an
   un-scrolled page is mostly empty ground — visible in `cap-fullpage.png`, where
   everything under the hero is blank terracotta.
2. **The rotation was still running.** The hero cycles four words over ~7.6s. Caught
   mid-step on `data platform.` — the longest word — the 1em mask shows a partial glyph
   row, which in a still frame reads exactly like a clipped word.

I read that still frame as a layout defect instead of a paused animation.

## The consequence I care about most

**Astra's old-vs-new review judged MY captures.** Its line "A's headline is visibly
clipped in both finished frames; that is a serious defect, not something to preserve"
is therefore an artifact of my method, not a finding about the site. **That one item of
`ASTRA-105-OLD-VS-NEW.md` should be discarded.**

Its other findings are unaffected, because they do not depend on that frame: the
type-weight charge is independently confirmed by a computed-style sweep of the rebuild
(300/400/500 in use, nothing above 500 — `pass-105-devtools-verification.md`), and the
colour, hierarchy and density findings are judgments about composition that survive a
paused animation.

## The fix I wrote, and why it is reverted

I diagnosed the phantom clip as the rotation word overflowing its line, and added a
`min()` cap to `.cw-h1`'s font-size in `app/globals.css`. Tested by injecting the exact
rule against production at 1440 / 1280 / 1024: **it changed the font size and fixed
nothing**, because there was nothing to fix. Reverted. `app/globals.css` on
`design/live-evolve` is unmodified from `main`.

The diagnosis was also wrong on its own terms. `wordWidth` measured 1179.9px against a
1360px line — never wider than the line. The width I was measuring is an inline
`width` the rotation script LOCKS onto `.cw-roll` (`Hero.tsx`, `runSequence`), so
substituting a longer word by hand wraps it inside a box sized for a different word.
My probe manufactured the very defect it then reported.

## Method note for anything that captures this site again

Use **viewport** screenshots, not `full_page`, and wait out the hero rotation (11s is
safe) before capturing the top of the page. Scroll-walk first to trigger the reveals,
then return to top and settle. The band captures in `.planning/qa/pass-105-compare/`
are viewport-sized, which is why they are the better evidence — but `OLD-1440-band01`
was taken on the same short settle, so the hero band may show a mid-rotation frame too.
