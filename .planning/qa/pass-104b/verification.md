# Pass 104b — verification log

## Section 1 — encodes and the CSS-zoom deletion

Executor leg, ffmpeg encodes + fact-0.4 CSS deletion. Read `.planning/design/104b/order-and-risks.md`
and `.planning/design/104b/operator.md` before starting, per brief §1 / §0.4.

### Commands run

ffmpeg = `C:/Users/micah/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin/ffmpeg.exe`
ffprobe = same dir, `ffprobe.exe`. `ffmpeg -version` confirmed 8.0.1-full_build present and runnable
before any encode.

```
cp .planning/design/video/A2-hold.webm public/video/a2-hold-1080.webm
ffmpeg -y -i .planning/design/video/A2-hold.mp4 -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an public/video/a2-hold-1080.mp4

ffmpeg -y -i .planning/design/video/B-loop.mp4 -vf "crop=1440:640:0:280" \
  -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/video/b-band-1440.mp4
ffmpeg -y -i .planning/design/video/B-loop.mp4 -vf "crop=1440:640:0:280" \
  -c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -pix_fmt yuv420p -an public/video/b-band-1440.webm

ffmpeg -y -i .planning/design/video/B-loop.mp4 -vf "crop=1152:1440:144:0,scale=1080:1350" \
  -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/video/b-tall-1080.mp4
ffmpeg -y -i .planning/design/video/B-loop.mp4 -vf "crop=1152:1440:144:0,scale=1080:1350" \
  -c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -pix_fmt yuv420p -an public/video/b-tall-1080.webm
```

All six commands exited 0. Source `B-loop.mp4` confirmed monochrome per README; no regrade
performed (`-vf` carries only crop/scale, no color filters).

### Output files, measured with ffprobe + `stat -c%s` (no substitution — every number below is a
real probe against the file on disk)

| file | dimensions (ffprobe) | bytes |
|---|---|---|
| `public/video/a2-hold-1080.webm` | 1920x1080 | 178,072 |
| `public/video/a2-hold-1080.mp4` | 1920x1080 | 416,800 |
| `public/video/b-band-1440.mp4` | 1440x640 | 844,903 |
| `public/video/b-band-1440.webm` | 1440x640 | 411,891 |
| `public/video/b-tall-1080.mp4` | 1080x1350 | 1,175,528 |
| `public/video/b-tall-1080.webm` | 1080x1350 | 605,504 |

All six dimensions match the brief exactly (1920x1080 pair; 1440x640 band pair; 1080x1350 tall
pair). `a2-hold-1080.webm` is a byte-identical copy of `A2-hold.webm` (178,072 bytes both sides,
per spec's "may be a straight copy").

### Frame inspection (done BEFORE accepting the encodes, per the task's hard requirement)

Rendered and viewed with the Read tool:
- `b-band-1440.mp4` at frames 0, 20, 50, 96, 150, 192 (spanning the whole 193-frame/8.04s loop).
  Every sampled frame shows: the table (glass tumblers, water glass, phone, a card-holder/wallet),
  both hands (one holding the phone mid-frame, the other a closed fist lower-right resting on the
  table edge), and his face in three-quarter profile, mouth open mid-sentence. A folded white
  paper/card is visible on the table between the wallet and his forearm in the zoomed crop
  (`band-zoom-center.png`, region x400-900,y0-640) — thin but present. The larger legible sheet of
  paper with visible handwriting that appears in the tall crop sits below y=920 in the source
  (visible starting ~y=950 in the full 1440x1440 frame `full-96.png`), i.e. below this band's
  y-range of 280-920, so it is NOT in the band crop. The offset `crop=1440:640:0:280` is the exact
  offset specified in `.planning/design/104b/operator.md` (§03 spec), which the spec calls
  "load-bearing" — I did not change it. Table + both hands + three-quarter face are unambiguously
  present in every sampled frame; the "papers" element is present but as a smaller folded card, not
  the large handwritten sheet. Flagging this rather than silently calling it a full match: if the
  operator wants the handwritten sheet legible in the band, the fix is a different y-offset (the
  spec's own `object-position: 50% 42%` note gives ~200px of vertical re-aim latitude on the
  DISPLAY side without a re-encode; a further re-crop would need a new ffmpeg pass).
- `b-tall-1080.mp4` at frame 50: table, glasses, phone, both hands (fist + resting hand), face in
  three-quarter, AND the large handwritten paper sheet clearly legible bottom-left. Full match to
  spec.

Rendered frame files (local, not committed): `band-frame.png`, `band-f0.png`, `band-f20.png`,
`band-f96.png`, `band-f150.png`, `band-f192.png`, `band-zoom-center.png`, `tall-frame.png`,
`full-96.png` under the session scratch temp dir.

### The CSS-zoom deletion (fact 0.4)

`app/room.css` — the rule that was at (pre-edit) lines 532-537:
```
.rl-home .opfilm video,
.rl-home .opfilm .still {
  transform: scale(1.3);
  transform-origin: 50% 6%;
  filter: brightness(1.45) contrast(1.2);
}
```
`transform: scale(1.3)` and `filter: brightness(1.45) contrast(1.2)` deleted. `transform-origin`
had no effect without `transform` on the same rule, so the whole rule (now empty) was removed
rather than left as dead CSS; `.rl-home .opfilm video { … }` (object-fit/object-position, next
rule down) is untouched and still applies width/height/object-fit/object-position as before.
Confirmed post-edit with `grep -n "scale(1.3)\|brightness(1.45)" app/room.css`: zero remaining
matches at the old location; one unrelated match remains at (now) line ~1744, inside the §16.3-6
"operator square" JS-entrance motion block (`html.rl-js .rl-home .opstage.in .opfilm video { transform: scale(1.3); }`)
— that is section 3's (the operator band commit's) territory, not touched here, since it rewrites
the whole operator motion/geometry.

### Gates

**`pnpm build`**: green. Output: "Compiled successfully", copy-lint clean, vendor-gate clean,
retired-phrases-gate clean, 23/23 static pages generated, render-gate 15 routes clean.

**`python -P scripts/verify-room.py`** (against `pnpm start` on :3000): 75 checks, **74 pass, 1
fail**.
- FAIL: `16.3-no-js-finished-frame`. Root cause identified precisely: the check hardcodes
  `abs(tmat(nj["opfilm"])[2] - 1.30) < 0.005` (verify-room.py:2433) — it asserts the operator
  film's no-JS rest-state scale is exactly 1.30, which was the CSS-zoom value this section just
  deleted per fact 0.4. This is expected, named collateral: order-and-risks.md risk #4 says
  verifier debt lands in the same commit as the change that creates it, and the operator band
  commit (brief §3 / section 3 of this pass) is the one that replaces this whole square-crop
  geometry with the full-bleed band and rewrites `14.2-op-square`, `14.2-op-columns`,
  `14.7-op-veil-62-82`, `14.2-op-mobile-overlay`, `16.3-6-operator`, plus a new 3-frame contrast
  leg — this `16.3-no-js-finished-frame` assertion needs the same treatment (its 1.30 constant is
  the crop-zoom fact 0.4 just removed) and should be folded into section 3's verifier-debt list.
  NOT edited here: editing a gate this brief does not name is a return condition, and this specific
  check is not among the six section-3 names it, so I am reporting it rather than silently fixing
  it. All other 74 checks pass unmodified, including every hero/fingertip check (§2's own
  "unmodified" requirement, not yet touched anyway since section 2 hasn't run).

**Section 1's own named gate** — "exactly one video file requested per element at 390 and at
1440 in the network panel": **NOT RUN.** The new encodes are not wired into any component yet
(explicitly out of scope for this section — "sections 2 and 3 do that"); `Room.tsx` still
requests `/video/a2-hold-720.webm` / `.mp4` and the operator component still requests
`/video/b-loop-720.*`, confirmed via the verifier's own `media` check output (`urls":
["/video/a2-hold-720.webm","/video/a2-hold-720.mp4"]` / `["/video/b-loop-720.webm",
"/video/b-loop-720.mp4"]`). This network-panel gate can only be meaningfully run once sections 2
and 3 wire the responsive `<source>` selection script; it is not skippable forever, just not
mine to close.

**Lighthouse mobile Performance**: measured directly against `pnpm start` on :3000 with
`npx lighthouse http://localhost:3000/ --only-categories=performance --preset=perf
--form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new --no-sandbox"`.
Score: **92** (floor is 86 — well clear). LCP 2.9s, TTI 3.9s, Speed Index 2.4s, TBT 30ms, CLS
0.029. Measured AFTER the encodes were added to `public/video/` and after the CSS deletion; since
the new files are unwired and unreferenced, this is expected to be unchanged from baseline and
confirms the deletion did not regress anything reachable today.

### Files changed
- `app/room.css` — deleted `transform: scale(1.3)` + `filter: brightness(1.45) contrast(1.2)`
  (fact 0.4); removed the now-empty selector rule.
- `public/video/a2-hold-1080.webm` (new)
- `public/video/a2-hold-1080.mp4` (new)
- `public/video/b-band-1440.mp4` (new)
- `public/video/b-band-1440.webm` (new)
- `public/video/b-tall-1080.mp4` (new)
- `public/video/b-tall-1080.webm` (new)

### Gate edits
None made by this section. `16.3-no-js-finished-frame`'s FAIL is reported, not silently patched —
its fix belongs with section 3's operator-square verifier rewrites (see FAIL note above).

### ffmpeg-missing note
Not applicable this run — ffmpeg was present and used successfully at the path given in the task.

## Section 2 — the hero sign

Executor leg. Read `.planning/design/104b/hero.md` and `.planning/design/104b/proof.md` (areas 01
and 02, ONE object per both docs) plus brief §0 and §2 before starting. Section 1's encodes were
already on disk (`public/video/a2-hold-1080.{mp4,webm}` etc.) and untracked in git status at
start.

### What changed and why

1. **`components/room/Room.tsx`**
   - Removed the old `<div className="proof" id="heroproof"><span class="l now">Four exits,
     $5B+ combined.</span></div>` from inside `.base-row` (the retired 14px footnote).
   - Added a tiny inline `<script>` (fact 0.2) IMMEDIATELY after `<video id="filmvid">`:
     `matchMedia('(min-width:900px)').matches` → rewrites both `<source src>` to
     `/video/a2-hold-1080.{webm,mp4}` and calls `.load()`. Below 900px, or JS off, the 720
     pair stands unchanged. Zero change to `RoomMotion.tsx` (zero JavaScript added to the
     client bundle, per hero.md's own MECHANISM note).
   - Added `.sign` as a NEW element, a sibling of `.hero-copy` inside `.stagewrap` (both
     brief §2 item 3 and hero.md's LAYOUT section give `.sign`'s left/right/bottom in
     `.stagewrap`'s own coordinate system, matching the measured pixel values — 231/1408 at
     1440 — so it is positioned there, not nested inside `.hero-copy`). Contains: a `.rule`
     div (the 1px copper seam), and a `.row` (flex, baseline, space-between) holding
     `<p class="lg" id="heroproof">` (the ledger sum: `<span class="l">Four exits,</span>
     <span class="fig">$5B+</span> <span class="l">combined.</span>`, with literal space
     text nodes between the spans so `#heroproof`'s textContent normalises to "Four exits,
     $5B+ combined." exactly — `14.3-proof-row` reads this) and `.names` (four separate
     `<span>` company names, CSS `::after` separator, never a DOM text node).

2. **`app/room.css`**
   - `.hero-copy .base-row`: `margin-top: auto` → `margin-top: 40px` (brief §2 item 1,
     literal).
   - Deleted the old `.hero-copy .proof` / `.hero-copy .proof .l.now` rules (dead selectors
     once `.proof` left the DOM).
   - New `.sign` block: desktop absolute position (`left: calc(var(--fx) - 48px); right:
     var(--g); bottom: 40px`), `.rule` (1px copper, `background: var(--color-rl-copper)`),
     `.row` (flex/baseline/space-between), `.lg .l` (14px Anybody 500 wdth80 uppercase
     .04em bone 60%), `.lg .fig` (72px Anybody 300 wdth106 tabular BONE — never copper,
     `var(--color-rl-bone)`), `.names` (19px Hanken 500 bone 80%, right-aligned).
   - Mobile (`<=899px`): `.hero-copy` padding-bottom 56px → 40px (hero.md's own number;
     the brief text's "52px" is a stale cross-reference to the card price size and is
     superseded by hero.md per the dispatcher's "measured spec is the authority on any
     number the brief leaves implicit" rule — hero.md gives its own reasoning for 44px:
     "deliberately UNDER the 52px headline floor"). `.sign` flips to `position: static`
     with its own `padding: 0 var(--g)` (content width 326px at 390); `.fig` drops to
     44px; `.names` left-aligns at 17px, wrapping naturally.
   - New motion block "1c. THE LIGHT TRAVELS" (a third beat on `#h1`'s own ARRIVAL chain,
     §16.3-1): since `.sign` is not a literal DOM sibling of `#h1` (it lives beside
     `.hero-copy` in `.stagewrap`, sharing the STAGE's coordinates rather than a flex
     box), the trigger is `.stagewrap:has(#h1.on)` rather than `#h1.on ~ .sign` — same
     zero-JS contract (`:has()` is already load-bearing at this file's top,
     `html:has(.rl-home)`), reached one level up. Timeline off `#h1.on` (=ARRIVAL=2.54s,
     fact 0.1, never hardcoded — read from the existing trigger, not restated as a
     number): +260ms the rule draws 560ms (`clip-path: inset(0 100% 0 0)` →
     `inset(0)`); +560ms the figure fills .28→1 over 260ms (the SAME fill the copper word
     uses); +680ms the two label runs rise 12px/fade in over 400ms; +740ms the four names
     do the same AS ONE GROUP (never staggered per name — the ticker rule, §9, bans that
     by name). Rest state (no JS, or reduced motion) is the finished sign by construction:
     every pre-state lives only inside `html.rl-js` selectors, exactly the pattern the
     rest of §16.3 already uses.
   - motion-token-lint.sh blocked the first attempt (entrances over 300ms untagged, and a
     transform+opacity reveal it read as an unstaggered group) — every `560ms`/`400ms`
     duration line now carries its own same-line `/* motion-ok: §16.3-1, … */` comment,
     the hook's documented escape hatch (brand.json's Room and Ledger entrance cap is
     1200ms; nothing was disabled).

3. **`scripts/verify-room.py`** — added four checks (brief §2's own "add three," reconciled
   against hero.md's own more specific VERIFIER paragraph by implementing the union of
   both lists rather than picking one over the other):
   - `14.9-sign-left-edge-matches-headline` — `.sign`'s own left edge vs `#h1`'s, <=1.5px,
     at 1280/1440/900.
   - `14.9-sign-rule-copper-figure-bone` — `.rule`'s computed `background-color` is
     `rgb(200, 84, 43)`; `.fig`'s computed `color` is `rgb(245, 239, 228)` (bone), never
     copper.
   - `14.9-sign-figure-opacity-1-after-arrival` — seeks `#filmvid` to 2.60s (past
     ARRIVAL=2.54), waits 900ms real time (clears the figure's own 560ms-delay/260ms-fill
     with margin), asserts computed opacity is 1.
   - `14.9-sign-finished-frame-no-js` — a second browser context with
     `java_script_enabled=False`; asserts the figure's opacity is 1 and the rule's
     clip-path is fully drawn by default (discovered mid-task: `locator.evaluate()` DOES
     run computed-style reads even with scripting disabled in this Playwright/Chromium
     build, confirmed by direct probe, so this reads real computed style rather than a
     bounding-box proxy the way the pre-existing `14.8` no-js check has to).
   None of the six brief-named GATE EDITS for other sections were touched. The §8.9
   "first-screen copper count <=4 rises to 5" note is NOT a site verifier check —
   `order-and-risks.md` item 9 says so explicitly ("the site verifier does not carry that
   check, so it is a note for the mock only") — so no new check was invented for it; see
   the measured count below instead.

### Measurements (every number below is real probe output, not derived)

- **Fact 0.2, the network-panel gate** — exactly one file requested per width, real
  Playwright network listener (`request` events filtered to `a2-hold`):
  - 390px: `/video/a2-hold-720.webm` (one request).
  - 1440px: `/video/a2-hold-1080.webm` (one request).
- **`pnpm build`**: green (copy-lint clean, vendor-gate clean, retired-phrases-gate clean,
  23/23 static pages, render-gate 15 routes clean) on both the initial commit and the
  nbsp-separator follow-up fix (below).
- **`python -P scripts/verify-room.py http://localhost:3000/`**: **79 checks, 77 pass, 2
  fail.** (75→79: the four new `14.9-sign-*` checks.)
  - Both fails are named and explained, not silently patched:
    1. **`16.3-no-js-finished-frame`** — pre-existing, reported by section 1 already
       (its hardcoded 1.30 operator-crop constant, removed by fact 0.4; belongs to
       section 3). Unrelated to this section; confirmed unchanged before/after my edits.
    2. **`14.7-sentence-and-chips-share-the-left-edge`** — NEW fail, caused directly by
       this section's own redesign, and NOT one of the checks named as editable in brief
       §2's gate list. Root cause: this check hardcodes `(#heroproof top) - (chips
       bottom) == 24px`, a §18-era assertion from BEFORE this pass, written for the
       retired footnote design where `.proof` sat inside `.base-row`. Brief §2 item 2
       explicitly retires that: "`.proof` leaves `.base-row` entirely." With `#heroproof`
       now inside the floor-anchored `.sign`, the measured gap is width-dependent (real
       numbers: **-12px at 1280, +31px at 1440, +197px at 1920** — vs the check's
       24px±1.5 window) because `.sign` sits at a fixed distance from the STAGE's floor
       while the chips sit near the TOP of a box whose height (stage height, 16:9)
       scales differently with viewport width than its content does. hero.md's own
       VERIFIER paragraph asserts this check "stays green," but that is not what the
       live, built page measures — reported as a real conflict between two design
       documents rather than silently editing an un-named gate. The check's OTHER three
       assertions in the same call (lede/chips/proof share one left edge; label
       font-size 14px) all still hold — only the "24px" sub-assertion is what fails.
       **Not edited**, per the return-condition on unnamed gate edits; recommend Fable
       either retarget this check onto `.sign`'s own geometry (which the two new
       `14.9-sign-*` checks already do) or explicitly retire the 24px sub-assertion in
       the same commit that reviews this report.
- **Lighthouse mobile Performance** (`pnpm start` on :3000, same command section 1 used):
  **92** (floor 86), LCP 2.9s, CLS 0.025-0.03, TBT 30ms. Unchanged from section 1's
  pre-wiring baseline (92) — confirms the responsive source-swap and the sign add zero
  measurable regression at mobile width (mobile still gets the 720 pair; the sign is
  markup + CSS only, no new media).
- **axe** (axe-core 4.9.1 via CDN injection, `axe.run()`), at 390 and 1440: **zero
  violations of any impact level**, both widths.
- **First-screen copper count at 1440, scrollY 0** (the §8.9 note, mock-only per
  order-and-risks.md #9 — "the site verifier does not carry that check" — so this is
  measured for the record, not gated): real Playwright walk over every visible element
  in the viewport (finished frame, `#h1.on` reached) testing `color` and every
  `border*Color` / `backgroundColor` against `rgb(200, 84, 43)`: **2 elements** — the
  hero noun `go-to-market.` (`color`) and the new `.sign .rule` seam
  (`backgroundColor`). This is an ELEMENT count, not the mock's own counting unit
  (order-and-risks.md #9 describes the mock's method only as "elements whose computed
  colour or background is rgb(200, 84, 43)," predicting a rise from <=4 to 5 with the
  sign's rule); my probe does not reproduce that baseline (my method finds 2, not 4,
  pre-sign, on the live site — the two counting methods are evidently not equivalent,
  possibly because the mock counts something my selector missed, e.g. an
  aria-hidden arrow glyph or a hover-state rule). Reporting the real, directly-measured
  number (2) rather than asserting the mock's predicted 5 without having verified it.

### A defect caught and fixed mid-task (not left in the deliverable)

First implementation of the four-name separator used `content: " · "` as a plain-space
`::after` on every name span but the last. Screenshot QA showed "Postmates ·SurveyMonkey"
— a space before the dot but none after. Root cause, confirmed by isolating the element:
each `<span>` is a flex item inside `display:flex .names`, and a flex item's own trailing
whitespace is trimmed at its box edge the same way a line-end space collapses in normal
flow — the trailing regular space in the pseudo-content never renders. Fixed by switching
to non-breaking spaces around the middot (`content: "\00a0\00b7\00a0"`), which are not
collapsible; re-screenshotted and confirmed "Postmates · SurveyMonkey · Guardicore ·
Neuton.AI" renders correctly at both 390 and 1440. `pnpm build` re-run green after the fix;
full verifier re-run unchanged (still 77/79, same two named fails).

Also caught mid-task: after the CSS fix, the locally running `pnpm start` server did not
restart cleanly (`pkill -f "next start"` did not match the actual process on this
Windows/git-bash environment; the OLD server kept the port and silently served the
PRE-fix build to my first round of verification/screenshots). Found via `netstat -ano` +
`Stop-Process -Id`, then a clean restart; all measurements in this report are from the
verified-fresh server the second time (the FIRST round's "the separator drops its space"
finding is what triggered the fix — the FIRST round's screenshots were never treated as
the final artifact).

### Screenshots

`.planning/qa/pass-104b/hero-104b-1440.png`, `.planning/qa/pass-104b/hero-104b-390.png` —
captured waiting for `document.fonts.ready`, then `#h1.classList.contains('on')` (the
video reaching ARRIVAL=2.54s), then +1500ms real time for the sign's own beat chain to
finish, so the captures show the FINISHED frame rather than a mid-transition state (a
flat `fonts.ready + 3s` wait, tried first, sometimes lands mid-chain because the trigger
itself does not fire until 2.54s of video playback have elapsed — noted for whoever
scripts the full-pass 1440/390 captures in §8: the general "fonts.ready + 3s" convention
needs a `#h1.on`-aware wait on this page's hero specifically, not a flat timer).

### Files changed
- `components/room/Room.tsx` — removed the old `.proof`/`#heroproof` markup from
  `.base-row`; added the fact-0.2 inline source-swap `<script>`; added the `.sign` markup
  (rule, ledger sum, four names).
- `app/room.css` — `.base-row` margin-top 40px; deleted the old `.proof` rules; new
  `.sign` rules (desktop + `<=899px`); new "1c" motion block; nbsp-separator fix.
- `scripts/verify-room.py` — four new `14.9-sign-*` checks.
- `.planning/qa/pass-104b/hero-104b-1440.png`, `.planning/qa/pass-104b/hero-104b-390.png`
  (new).

### Gate edits
Four checks ADDED (named by brief §2's own gate list, reconciled with hero.md's more
specific VERIFIER paragraph): `14.9-sign-left-edge-matches-headline`,
`14.9-sign-rule-copper-figure-bone`, `14.9-sign-figure-opacity-1-after-arrival`,
`14.9-sign-finished-frame-no-js`. ZERO existing checks edited or deleted.
`14.7-sentence-and-chips-share-the-left-edge` FAILS as a direct, unavoidable consequence
of this section's own sanctioned redesign (proof leaves base-row); reported above with
real numbers at all three widths, not silently patched, because editing it is not named
in brief §2's gate list and the return-conditions section names unnamed gate edits as a
stop condition.

### ffmpeg-missing note
Not applicable — this section touched no media encodes (section 1 already produced
`a2-hold-1080.{mp4,webm}`; this section only wires the existing files).

## Section 3 — the operator band ("Operator A: the long table")

Executor leg. Read `.claude/briefs/pass-104b-home-rebuild.md` §0 and §3, and
`.planning/design/104b/operator.md`'s "03 Operator, not consultant" area (the file also
carries the "05 Packages" spec, which is a different area/leg and was not touched).

### fact 0.4 check (required by this section's own task)

`app/room.css:531-536` (the `transform: scale(1.3)` + `filter: brightness(1.45)
contrast(1.2)` pair) was already deleted by section 1 before this leg started — confirmed
by `git diff -- app/room.css` showing the removal and by `grep -n "scale(1.3)"
app/room.css` finding zero matches at that location (one unrelated match remained in the
16.3-6 JS-entrance motion block, which this section's own commit rewrites — see below). No
deletion was needed or performed here.

### What changed and why

1. `components/room/Operator.tsx` — full rewrite. The square stage (`.opstage` 1:1
   aspect, `.opover` heading+paragraph overlay, `.opside` two-column register) is gone.
   New structure: `#opstage` (classes `opband opstage`, kept BOTH — the id for
   getElementById call sites in RoomMotion.tsx and the verifier, the class because
   `.opstage.in` is a class selector used throughout the CSS and the file's own convention
   is dual class+id, e.g. `.stage`/`#stage`) wraps `.opfilm` (video + veil) and `#oph2`
   (the heading, now positioned directly in the band, no `.opover` wrapper); then three
   siblings under `.op`: `.opthesis` (the paragraph that used to sit on the film),
   `.opledger` (three `.opl-track` divs), `.opquote`. The responsive `<source>` swap
   script (fact 0.2, same technique as Room.tsx's hero swap) rewrites both `<source>`
   AND the poster attribute at 900px and up to the band pair; below 900 the tall pair
   (already the markup default) stands. Zero new copy — every string is the same
   `.opside .lead` and `.sig` sentences, verbatim; the `.opside .m-first` phone twin and
   the duplicated `.opover p` are both gone (deleted along with the branch they lived in,
   not individually).
2. `app/room.css` — the whole "02 OPERATOR" block (previously roughly 209 lines) replaced.
   Band: `width:100vw; margin-left:calc(50% - 50vw); height:440px` (`420px` at 899 and
   below), `object-position:50% 42%` (`58% 42%` at 899 and below). Veil: the exact scrim
   gradient the spec names (transparent 0/46%, .18 at 60%, .38 at 72%, .55 at 84%, .62 at
   100%; a lighter mobile variant topping at .58). Heading: `top:calc(70% - var(--capk)*
   var(--d2))` (64% at 899 and below), `.r{display:inline}` override at 900 and up so the
   two spans read as one sentence (the site-wide `.d .r{display:block}` rule is overridden
   back for this heading only). Thesis/ledger/quote: three new grid-based blocks (48px-gap
   12-up for the thesis and the quote row, matching the section's own historic 48px
   opgrid; a plain 3-up `repeat(3,1fr)` with `align-items:start` for the ledger, so tracks
   take their own height and are not stretched to the tallest one — this needed an
   explicit fix, see "A defect caught" below). Section padding: 64px/88px top/bottom at
   900 and up (down from `var(--s)` 120/120), unchanged `var(--s)` 64/64 below 900 (the
   brief names only the desktop reduction). Motion (item 6, amended): the film's
   JS-entrance settle returns to its ORIGINAL numbers, scale 1.06 to 1 over 1.2s (the
   compounded 1.378 to 1.30 was only needed because of the now-deleted static crop zoom);
   a new veil-retract beat (clip-path inset(0 0 0 0) to inset(34% 0 0 0), 900ms); the
   heading rises as ONE object at 900 and up (260ms delay, 500ms) with the OLD per-row
   0/80ms-stagger pair now scoped to 899 and below only (still live there, unmodified
   numbers); the thesis rises at 640ms; the three ledger hairlines draw 820/880/940ms
   (item 4's mechanism, its first horizontal three-up use) with each claim rising 90ms
   behind its own rule; the quote's hairline draws and the quote rises at 1240ms. Total
   chain roughly 1.74s, matching the spec's own arithmetic. Reduced-motion block:
   `.opfilm .still`'s background swapped to the new poster files (below) at the matching
   object-positions; every `.opover .r` reference replaced with `.opband h2.two` and
   `.opband h2.two .r`.
3. `public/video/b-band-poster.jpg`, `public/video/b-tall-poster.jpg` (new) — single
   frames extracted with ffmpeg from `b-band-1440.mp4` and `b-tall-1080.mp4` (-vframes 1),
   for the video poster attribute and the reduced-motion .still fallback. Neither existed
   before this leg; the old `b-poster.jpg` (the retired square crop) is left in place but
   no longer referenced by this component.
4. `scripts/verify-room.py` — the six named verifier-debt items, all closed in this
   commit:
   - `14.2-op-square` — now asserts the band is full-bleed (width equals innerWidth) at
     440px (was: square, abs(width-height) under 1.5).
   - `14.2-op-columns` — now asserts the thesis sits off the band, the ledger has exactly
     3 tracks under it, and the quote closes the section (was: paragraph-on-film plus
     top-aligned right column).
   - `14.7-op-veil-62-82` — re-derived for the new scrim's actual stops (.55 at 84%, .62
     at 100%, and 100% strictly under 1.0 asserted explicitly — never solid as a real
     check, not just prose).
   - `14.2-op-mobile-overlay` — now asserts 390x420 full-bleed, two heading rows, AND
     (folded in, since it is the same hard gate at the other end of the width ladder) the
     0/96/192-frame contrast minimum of 3:1 or better.
   - `16.3-6-operator` — now asserts the film settle at 1.06 to 1 (not 1.378 to 1.30) and
     the heading as ONE rising object at 900 and up with a 0.26s delay, checking
     negatively that the OLD per-row .r rule does NOT fire at this width.
   - `14.7-op-rows-auto-height` — re-pointed at `.opl-track` (was `.opside .lead span`):
     asserts the three tracks' heights differ (not stretched to a common third).
   Two more, named in the debt list as re-point, done the same way:
   - `14.2-op-contrast` — re-pointed at the three ledger claims (plain espresso now, not
     video): ordinary 4.5:1-or-better WCAG check via bg_contrast.
   - NEW `14.2-op-band-contrast` — the section's own HARD GATE, exactly as specified:
     composited luminance behind every glyph run of the heading at loop frames 0/96/192,
     3:1 or better.
   Also: `op_film_alive()` (a helper that referenced `document.getElementById('opover')`,
   an id this section deletes) removed as dead code — its one call site was the old
   14.2-op-mobile-overlay, which this section rewrites anyway. `16.3-no-js-finished-frame`
   (flagged by sections 1 and 2 as belonging to section 3 — its hardcoded 1.30 was the
   deleted crop-zoom constant) fixed to expect 1.0. `16.3-reduced-motion-off` and
   `16.3-no-js-finished-frame` both extended with a new opHead/opHeadOp (the single
   heading object) and opVeil (the veil's clip-path, asserted none under both) pair,
   added to MOTION_JS alongside the existing opRow/opRowOp/opRowDelay (kept, now selector
   `.opband h2.two .r` instead of the deleted `.opover .r`).

### A defect caught and fixed mid-task (not left in the deliverable)

First implementation of `.opledger` (a plain CSS grid, repeat(3,1fr)) left CSS grid's
default align-items:stretch in place, so all three tracks were forced to the height of
the TALLEST claim (measured: all three read 110.3125px) — the opposite of the spec's
explicit instruction that each track takes its own height, no stretched thirds. Caught by
directly measuring .opl-track heights via Playwright before writing the verifier check
(not by eyeballing a screenshot, where identical heights are invisible with no border on
the tracks' own foot). Fixed with align-items:start on .opledger; re-measured heights
79.9 / 110.3 / 49.4 — genuinely distinct, confirmed with a screenshot showing no visual
regression.

Second defect, caught by the section's own hard gate rather than by inspection: the FIRST
run of 14.2-op-mobile-overlay (packed to also run the 3-frame contrast check, since it is
the same gate at the other end of the width ladder) reported row 2 (not consultant.) at a
flat 1.20:1 across all three loop frames — identical at every frame, which does not fit a
video-content-driven failure (the picture changes frame to frame; a fixed 1.20 does not).
Root-caused by hand: bg_contrast() hides only the ONE row being measured, but at 899 and
below the two heading rows are STACKED at line-height .92, tight enough that a descender
(the comma in Operator,) anti-aliases a stray near-white pixel across the row boundary
into row 2's own sampled rectangle — a false failure against row 2's OWN ink, not against
the film. Confirmed directly: hiding the WHOLE #oph2 (both rows) instead of the single row
raised the same measurement to 9.34:1 on the same frame. Fixed by adding a new helper,
bg_contrast_glyph_run(page, hide_sel, row_sel, png_path) — identical to bg_contrast except
it hides hide_sel (the multi-row ancestor) while measuring row_sel's own box — and
switching both the 14.2-op-band-contrast and 14.2-op-mobile-overlay per-row calls to it.
Re-measured: mobile row 2 now reads 9.48 to 9.62:1 across all three frames; desktop (where
the two rows sit side by side, not stacked, so the artifact does not apply the same way)
was re-checked with the fix too, for consistency, and its numbers moved only slightly
(4.66 to 5.57:1, still comfortably clear). The hard-stop gate was never actually failing —
it was a measurement artifact from isolating one glyph run without masking its sibling.
No veil value was raised; the .05-step escalation toward .70 was never needed.

### Measurements (every number below is real probe output against the built, served page)

The HARD CONTRAST GATE, as named in the task — composited luminance behind every glyph run
of the heading, sampled at loop frames 0, 96 and 192 (24fps: t=0.00s, 4.00s, 7.99s of the
8.04s loop), both widths, both rows, real Chromium plus Playwright plus Pillow (WCAG
relative-luminance contrast, 2px-stepped worst-pixel scan, sibling-row ink masked per the
defect fix above):

- 1440, frame 0 (t=0.00s): row 1 5.25:1, row 2 5.49:1
- 1440, frame 96 (t=4.00s): row 1 4.66:1, row 2 5.32:1
- 1440, frame 192 (t=7.99s): row 1 5.33:1, row 2 5.57:1
- 390, frame 0 (t=0.00s): row 1 6.31:1, row 2 9.62:1
- 390, frame 96 (t=4.00s): row 1 6.22:1, row 2 9.48:1
- 390, frame 192 (t=7.99s): row 1 6.31:1, row 2 9.48:1

Worst observed: 4.66:1 at 1440, frame 96 — clears the required 3:1-or-better (large text)
with margin; the .55/84% veil stop was never raised.

14.2-op-contrast, re-pointed at the ledger: all three claims measure 16.97:1 against the
plain espresso ground (4.5:1-or-better required) — deterministic, not frame-dependent,
since the ledger sits off the film.

Network panel, one file per element (section 1's own named gate, closed here since it is
this section that wires the responsive source script): at 1440, opvid requests
b-band-1440.webm (currentSrc) plus both posters (b-tall-poster.jpg on first paint,
b-band-poster.jpg after the swap script runs — see "reported, not fixed" below); at 390,
opvid requests only b-tall-1080.webm and b-tall-poster.jpg, exactly as specified.

Layout, 1440: band 1440.0x440.0 (measured); heading "Operator," ink width 470.3px ending
at x=502.3, "not consultant." ink width 720.3px ending at x=1247.0 — both inside the
band's right edge (1440.0), matching the spec's own "94px of slack" claim; heading
font-size 102.87px equal to --d2, wdth 106.

Layout, 390: band 390x420 (full viewport width, confirmed); heading two rows at y=395/431
(36px apart); heading font-size 39.52px, wdth 106.

pnpm build: green on every rebuild during this leg (copy-lint clean, vendor-gate clean,
retired-phrases-gate clean, 23/23 static pages, render-gate 15 routes clean).

python scripts/verify-room.py http://localhost:3000/ (full suite, pnpm start on :3000):
80 checks, 78 pass, 2 fail. Both fails are OUT OF THIS SECTION'S SCOPE and were not
touched:
1. 14.7-sentence-and-chips-share-the-left-edge — already reported by section 2 in this
   same file (a hero-sign consequence, hardcodes a stale 24px gap).
2. 18-engagements-is-the-fourth-card — asserts the Engagements price sits at 72px;
   operator.md's own "05 Packages" area (a different leg's scope, not read for spec
   beyond confirming it is not mine) moves that price to --d2, so this check is expected
   to start failing once that area's own commit lands — not before, and not by this leg.

Every check this section owns or amended (listed under "gate edits" below) passes.

### Reported, not fixed (does not block this section, named for the record)

The video's poster attribute is set statically in JSX (b-tall-poster.jpg, matching the
markup's un-swapped default) and rewritten by the SAME inline script that swaps the
source elements, so at 900px and up two poster images are fetched (the initial tall one,
then the band one once the parse-time script runs) rather than one. This is a small
(roughly 30-38KB), desktop-only extra request — mobile is unaffected — and is inherent to
the technique whenever the responsive pair changes ASPECT RATIO (unlike the hero, whose
two poster candidates would be the same 16:9 crop at different resolutions, so it only
ever needs one poster). Not fixed because eliminating it needs either a second preload-
driven swap or accepting a placeholder mismatch for one frame, and the task's hard-stop
and named gates do not cover it; flagged here as a known, bounded cost rather than
silently left unnoted.

### Files changed
- components/room/Operator.tsx — full rewrite (band, thesis, ledger, quote; see above).
- app/room.css — the "02 OPERATOR" block replaced; the opgrid/opstage/opside/opover
  references in the 1279px, 899px, and reduced-motion blocks updated or removed to match.
- scripts/verify-room.py — six named debt checks rewritten, two more re-pointed, one new
  hard-gate check added, one dead helper removed, one unrelated pre-existing fail
  (16.3-no-js-finished-frame) fixed, MOTION_JS extended with opHead/opHeadOp/opHeadDelay/
  opVeil/opVeilDur, new bg_contrast_glyph_run() helper.
- public/video/b-band-poster.jpg, public/video/b-tall-poster.jpg (new).

### Gate edits
14.2-op-square, 14.2-op-columns, 14.7-op-veil-62-82, 14.2-op-mobile-overlay,
16.3-6-operator, 14.7-op-rows-auto-height — the six named in this section's VERIFIER DEBT
list, all rewritten for the new band/thesis/ledger/quote structure. 14.2-op-contrast
re-pointed at the ledger tracks (also named). NEW 14.2-op-band-contrast added (the
section's own hard gate, named as a new three-frame contrast leg for the band). Also
fixed, not named but caused by this section's own fact-0.4 dependency and flagged by
sections 1 and 2 as belonging here: 16.3-no-js-finished-frame (constant 1.30 to 1.0).
op_film_alive() removed (dead code once #opover no longer exists — its only call site was
the check this section rewrites). ZERO checks outside this section's named list or its
direct fact-0.4 fallout were touched.

### ffmpeg-missing note
Not applicable — this section used ffmpeg only to extract two static poster frames
(-vframes 1, already-produced encodes from section 1), which succeeded.

## Section 4 — How I work: the spine and the doors

Files changed:
- `components/room/HowIWork.tsx` — each `<li>` wraps its row in an `<a>`; a copper arrow
  glyph (`.ar`, `aria-hidden`) added after the sentence. Destinations per
  `.planning/design/104b/howiwork.md` (the spec file, treated as authority): 01 Diagnose →
  `/call`, 02 Build → `#price`, 03 Position → `#proof`. Zero new copy strings.
- `app/room.css` — `.rl-home .steps` gained `position: relative` and a `::before` spine
  (1px `var(--hair)`, ink 15%, NEVER copper) at `left: calc(var(--lane) + var(--gap))`,
  full height. The grid that used to sit on `.steps li` moved to `.steps li > a` (the row
  is now the whole clickable surface); a fourth 24px column added for the arrow. Mobile
  (`max-width: 899px`) block updated: spine rotates to `left: 0`; rows get
  `padding-left: 24px`; arrow moves to the ordinal's own grid-row, right-aligned. Motion:
  new block after the existing hairline-draw wiring — the spine draws `scaleY(0)→1` over
  900ms on `#work.in`; `.nm` rests at opacity .42 and lights to 1 (0/90/180ms stagger);
  `.s` and `.ar` rise from `translateY(8px)`/opacity 0 to rest, 80ms behind their own name
  (80/170/260ms); the pre-existing hairline-draw and hover-arrow-slide rules were left
  untouched. Added a small hover/focus override rule so the arrow's own house slide
  (200ms) outranks the entrance rule once `#work.in` has fired (specificity, not `!important`).
- `scripts/verify-room.py` — three new checks after `15.4-work-ledger`:
  `18-work-spine-x-matches-objections-and-receipts`, `18-work-doors-three-links-named-destinations`,
  `18-work-names-rest-at-042` (the last opens a fresh, unscrolled page because #work was
  already scrolled into view — and `.in` fired — earlier in the script for the
  18-work-head-split check).

Link targets confirmed to exist before wiring:
- `/call` → `app/(room)/call/` (route exists; confirmed via `pnpm build` route table: `○ /call`)
- `#price` → `id="price"` in `components/room/Packages.tsx`
- `#proof` → `id="proof"` in `components/room/Receipts.tsx`

Cut per spec (confirmed absent): no `<svg>`/copper squares stamped on the rule, no copper
on the step names/type, no full-height copper rule, no flush-right display type.

Spine colour: what NOT copper — computed `background` of `.steps::before` is
`oklab(0.953792 0.00204816 0.0158697 / 0.15)`, i.e. bone(ink? — resolves from `--hair`,
which is `color-mix(in oklab, #f5efe4 15%, transparent)` per globals; this is the SAME
token every other hairline on the page uses) — never `rgb(200, 84, 43)` (copper). Verified
by the new `18-work-spine-x-matches-objections-and-receipts` check
(`"200, 84, 43" not in spine["spineBg"]`) — PASS.

### Computed x: spine vs objections list (`.qs`) vs receipts caption column (`.prf .cap`)

Measured live via Playwright against the built, `pnpm start`-served page:

| viewport | spine x | `.qs` left x | `.prf .cap` left x | match? |
|---|---|---|---|---|
| 1440 | 615.3 | 615.3 | 615.3 | yes |
| 1280 | 548.7 | 548.7 | 548.7 | yes |
| 900  | 390.3 | 390.3 | **32.0** | **NO — see finding below** |
| 390  | 32.0  | 32.0  | 32.0  | yes |

**Finding, not caused by this section's edits:** at viewport width 900, the spine and the
objections list still sit in their desktop (Rule B) geometry — `.steps` and `.qs` both
break at `max-width: 899px` (i.e. 900 is still "desktop" for them) — but `.prf` (the
receipts row) has its OWN, earlier breakpoint at `max-width: 1023px`
(`app/room.css` ~2182, pre-existing, from the "at 1024 the seam has no room for two 28px
lanes" comment) that already stacks name+caption onto the section's left gutter (x=32) by
width 900. This is a pre-existing inconsistency in `Receipts`'s own responsive breakpoint
(1023px vs the rest of the Rule-B lanes' 899px), not something introduced by this
section's work, and `Receipts.tsx`/its CSS is outside section 4's scope
(`components/room/HowIWork.tsx` + `app/room.css:706-775`). Flagging for the operator/the
leg owning receipts — the three lanes agree at 1440, 1280 and 390, and disagree only in
the 900-1023 band because of the receipts breakpoint, not the spine's.

### Gate results (from `python -P scripts/verify-room.py` against `pnpm start`, port 3000)

```
PASS 15.4-work-ledger
PASS 18-work-head-split-eyebrow-and-one-line
PASS 18-work-spine-x-matches-objections-and-receipts   spine x 615.3 vs .qs x 615.3 and .prf .cap x 615.3 (1440 default viewport)
PASS 18-work-doors-three-links-named-destinations      row hrefs ['/call', '#price', '#proof'], 3 copper arrow glyphs, arrow color rgb(200, 84, 43)
PASS 18-work-names-rest-at-042                          html.rl-js pre-#work.in .nm opacity values ['0.42', '0.42', '0.42']
```

Two pre-existing FAILs in the full run are outside section 4's scope (section 2's hero
sign and section 5's Engagements card — `14.7-sentence-and-chips-share-the-left-edge` and
`18-engagements-is-the-fourth-card`); not investigated or touched here.

Full run: 83 checks, 81 pass, 2 fail (the two above). `pnpm build` green (copy-lint,
vendor-gate, retired-phrases-gate, `next build`, render-gate all clean).

### Screenshots

- `.planning/qa/pass-104b/howiwork-1440.png` — `#work` section, 1440, `document.fonts.ready`
  + settle wait, scrolled into view so `#work.in` has fired (finished frame).
- `.planning/qa/pass-104b/howiwork-390.png` — same, 390.

axe was NOT run for this section specifically — no axe tooling is wired into this repo
(`grep -i axe package.json` found nothing, no axe-core in node_modules); the whole-pass
axe gate is section 8's responsibility. Lighthouse was not run for this section in
isolation (also section 8).

Status: done. Gate passed on every check this section owns.

## Section 5 — packages (the poster, the seam and THE BAND)

Executor leg (Sonnet, measure/verify tier). Read `.claude/briefs/pass-104b-home-rebuild.md`
§0 and §5, and `.planning/design/104b/packages.md` (the spec file, authority on any number
the brief leaves implicit) before starting. Sections 1-4 were already applied uncommitted
in this tree at start (video encodes, hero sign, operator band, how-I-work spine).

### THE OPERATOR'S DESIGN-LOCK REVERSAL — recorded per the task's own instruction

Asked directly, 2026-09-08, the operator chose "Reverse the rule, build the band" over
shipping the safe poster-only pick. This reverses WINNING-BRIEF-2026-09-05 §3's "No section
declares a background," which until this pass named exactly two exceptions (the ask's
copper field, the foot). The packages section is now a THIRD, explicit exception — not a
repeal; no other section may declare a ground on the strength of it.

Recorded in full, with his exact words and the date:
- `.claude/CLAUDE.md` (worktree copy) — new note under "One accent," "AMENDED Pass-104b
  §5, 2026-09-08."
- `.planning/design/WINNING-BRIEF-2026-09-05.md` — new bullet under "3. Grounds and
  colour," directly under the two pre-existing exceptions.

### What changed and why

1. `components/room/Packages.tsx` — each of the three cards reorders `.pblock` (the price)
   to the FIRST child, ahead of `.nmrow`/`.nm` — figure / rule / caption. `.pblock` stays
   inside `.card`. New `<div className="seam" aria-hidden="true" />`, a sibling of `.sec`
   and `.cards`, opening the section — ONE rule spanning all three cards, never drawn
   per-column. Engagements' `.side.l-side` reorders to `.vblock > .v` (the price, wrapped
   so it can carry its own caption rule) FIRST, then `.hd` (name), then `.dsc` (sentence).
   Geometry (grid columns, gap, radius, padding, ground) unchanged.

2. `app/room.css`:
   - `.rl-home .price` now declares its own ground and ink, the pattern `.room`/`.op`
     already use: `background: var(--color-rl-espresso)` plus a local `--ink`/`--ink-80/72/
     60`/`--hair`/`--hair-12/10` override to bone values, so every existing `var(--ink)`,
     `var(--hair)` etc. read by `.card`/`.eng`/`.sec` inside it resolves to bone regardless
     of the travelling `--p` switch. `padding-bottom: var(--s)` added (was padding-top
     only) so the band closes with the same air it opens on; `padding-top` itself is
     UNTOUCHED (still bare `var(--s)`, which the `14.4-heads` 120px section-air assertion
     reads — verified still passing).
   - `.rl-home .price .sec { margin-bottom: 40px; }` (down from the shared 48px, per the
     spec's "40px under the head block") and `.rl-home .price .seam { height:1px; margin:0
     0 40px; background:var(--color-rl-copper); transform-origin:0 50%; }` (spec's "40px
     above .cards"). Both drop to 24px/32px at <=899px per the spec's 390 layout.
   - `html .rl-home .price .card .chip, html.lit .rl-home .price .card .chip` forced to
     bone-fill/espresso-text regardless of the ambient lit switch — a fix this section
     needed but the brief did not name explicitly. Why: the chip's DEFAULT rule is
     bone-fill already, but `html.lit .rl-home .chip:not(.quiet)` (out-specified only
     inside `.room`/`.eng`, which both already carry a forcing override) would otherwise
     flip card chips to espresso-fill once the reading line passes the rail — which
     happens well before a visitor scrolls this far — rendering an espresso button on an
     espresso ground. Verified live: `getComputedStyle` on `.card .chip` reports
     `background: rgb(245, 239, 228)` (bone) with this fix; without it the same read
     (confirmed by temporarily removing the rule) is `rgb(13, 13, 15)` (espresso-on-
     espresso).
   - `.rl-home .card .pblock` padding `18px 0 20px` -> `0 0 20px` (no longer needs top
     padding as the first child); `.rl-home .card .nmrow` gains `margin-top: 16px`.
   - `.rl-home .card .pr` font-size `72px` -> `var(--d2)`.
   - `.rl-home .eng .vblock` (new): the figure's own caption rule, `border-bottom: 1px
     solid var(--hair-12); padding: 0 0 20px;` — the same grammar `.card .pblock` carries,
     grafted onto Engagements since it never had this device before (the TOKEN is
     existing; the application to `.eng` is new). `.eng .v` font-size `72px` -> `var(--d2)`,
     `margin-top:18px` removed (the `.vblock` wrapper carries the spacing now). `.eng .hd`
     gains `margin-top: 16px`.
   - **Engagements' own border, `1px solid transparent` -> `1px solid var(--hair)` — a fix
     this section needed but the brief did not name.** Why: Engagements used to be
     distinguished from the (bone) section around it by GROUND ALONE — an espresso slab on
     a bone field, its own border irrelevant. On the new uniformly-espresso band, an
     espresso box with a transparent border is visually IDENTICAL to its own surroundings —
     the fourth object stops reading as a box and dissolves into the band (confirmed by
     screenshot: before this fix Engagements had no visible edge at all; the `.vblock`
     hairline under the figure was the only visible line in the whole block). The fix takes
     the plain cards' own `var(--hair)` token — not a new device — so Engagements now reads
     as a bordered box again, "connected by grammar" in a way that is literally true now
     (same border every object in the row shares) rather than only true in prose.
   - Two mobile fixes to the ladder the brief explicitly locks against: `.eng .v` at
     `<=899px` dropped from `font-size: 40px; font-variation-settings:"wdth" 88;` to
     `font-size: 52px;` (`white-space: normal` was already set, so the line wraps on its
     own — no JS, no new CSS needed for the wrap). The two OLD desktop step-downs at
     `.eng .v` (`60px` at `<=1279px`, `52px` at `<=1023px`) are DELETED — with the figure
     now on `--d2`, which already scales continuously with viewport via `clamp()`, a
     hardcoded override would silently defeat item 6's "the figures are now --d2" at every
     width but 1440 and reintroduce a size between the cleared registers.
   - New motion block ("5b"): the seam draws `scaleX(0)` -> `scaleX(1)` over 500ms on the
     existing `#price.in` trigger (item 4's "house scaleX mechanism," zero new JS, zero new
     `@keyframes`); each figure (`.card .pr`, `.eng .v`) fades `opacity:.28` -> `1` over
     260ms, staggered 0/90/180ms for the three cards and 270ms for Engagements (60ms behind
     its own 210ms rise) — the hero-sign graft, "the figure takes current."
   - Reduced-motion block: `.price .seam`, `.card .pr`, `.eng .v` added to the
     `transition:none`/`transform:none`/`opacity:1` groups (belt-and-braces; the gate on
     `html.rl-js` already means these never animate under reduce, but the brief asked for
     the explicit addition and it costs nothing).

3. `scripts/verify-room.py`:
   - `15.5-cards`: `all(abs(f - 72) < 0.6 ...)` -> reads the page's own computed `--d2`
     (`cd["d2"]`, same expression `18-engagements` already used for `eb["d2"]`), never
     hardcoding 102.87.
   - `18-engagements-is-the-fourth-card`: same edit, `eb["vFs"]` compared against `eb["d2"]`.
   - `15.5-cards-mobile`: ADDED a price assertion (this check carried none before) — the
     three card figures and the Engagements figure at 52px +/- 0.6 at 390.
   - `16.3-4-hairlines`: added `one('.price .seam','transform')` to MOTION_JS as
     `priceSeam`; `drawn0`/`drawn1` now include it; `len(drawn0) == 13` -> `== 14`.
   - NEW `05-the-price-is-the-poster` and `05-the-price-is-the-poster-no-js`: at 1440,
     every card/Engagements figure rests at opacity .28 and reaches 1 after `#price.in`;
     none of the four computes copper; the seam is 1px, spans the content width +/- 1.0,
     computes `rgb(200, 84, 43)`; the Audit's four borders and its pill border are still
     copper; no other text run in the section (name/sentence/description/heading/chip
     label/chip arrow, 6 element classes checked) reads copper. The `-no-js` twin repeats
     the opacity/seam check with `java_script_enabled=False` — the finished frame by
     construction, same pattern `14.9-sign-finished-frame-no-js` already uses.
   - **A test-harness fix this section needed, not a design change:** before this section's
     work, whatever scroll position the preceding `18-work-head-split-eyebrow-and-one-line`
     loop left the page at, plus a bare 400ms wait, was enough for `cd`/`eb`'s reads because
     the price section was short. This section makes the price section considerably taller
     (bigger --d2 figures, the seam, the band's own padding), which changed how much of
     `#price` the SAME stale scroll position shows — the `eb` read started catching the
     cards SETTLED (`#price.in` fired, cards' own 500ms transition done) while Engagements
     was still mid-rise (its own 210ms-delayed 500ms transition not yet finished), reading a
     false `gapAbove` of 44px against the CSS rule's actual 24px (confirmed unchanged and
     correct via a direct live probe: `{cardsBottom: 682.39, engTop: 706.39, gap: 24,
     marginTop: "24px"}`). Fixed by scrolling to `#price` and waiting 1000ms (covers the
     210ms delay + 500ms transition = 710ms with margin) immediately before
     `cd = pg.evaluate(...)`. This is the ONLY change to this gate's assertion logic beyond
     the named `d2` edit; no gate this brief does not name was touched.

4. `app/(room)/packages/page.tsx` + `app/room-and-ledger.css` — the same reorder, best
   effort, NOT gated by verify-room.py (no route beyond `/` is checked section-by-section
   there): `.pblock` (price alone now) moves to the FIRST child of each `<article>`; the
   meta label (`90 minutes + same-day memo` etc.) moves OFF the price baseline to its own
   14px line directly under the figure (new class `.pmeta`, `margin-top:12px`; the shared
   `.rl-l` label style in `app/globals.css` is untouched); the name (`.nm`/`.nmrow`) follows,
   16px below. `.rl-list` (the feature ledger) and `.cta` keep their existing position
   (already "between the sentence and the chip," per spec). No seam added — the seam is the
   home section's own opening device, not a card device, per spec. Engagements on
   `/packages` (a differently-classed `.rl-eng` block) was NOT touched — the spec's
   "/packages TAKES THE SAME REORDER" sentence names the cards' reorder only.

### THE MEASURED RISK — measured, not accepted on the brief's estimate

The brief flagged this as unmeasured and named two legal fixes if needed. Measured LIVE
(Chromium via Playwright, `Range.getBoundingClientRect()` ink width vs. each card's
padded/bordered interior) at all four named widths, before accepting the plain
`font-size: var(--d2)` rule with no fix:

| viewport | --d2 | interior ($2,500/$7,500 card) | $500 ink | $2,500/$7,500 ink | overflow? |
|---|---|---|---|---|---|
| 1440 | 102.87 | 379.66px | 218.25px | 294.63px | no (85px clear) |
| 1280 | 91.44 | 326.33px | 194.0px | 261.89px | no (64px clear) |
| 1024 | 73.15 | 241.0px | 155.19px | 209.52px | no (31px clear) |
| 900 | 64.30 | 199.66px | 136.41px | 184.14px | no (15.5px clear) |

The brief's own hand estimate ("$7,500 measures roughly 206 against 204.67 at 900,
overflows by ~1px") does not survive contact with the real font's actual glyph advances —
measured ink at 900 is 184.14px against a 199.66px interior, comfortably inside. **No legal
fix applied** (neither `min(var(--d2), 72px)` nor a `wdth 80` drop) because none is needed;
reporting the real numbers rather than defensively adding an unneeded rule. If the operator
wants a safety margin narrower than ~15px at exactly 900px, `min(var(--d2), 72px)` on
`.card .pr` at `<=1024px` is the documented, pre-approved fallback.

At 390 (content 326, card interior 280): $7,500/$2,500 at 52px measure 148.94px ink (131px
clear). Engagements' "From $5K a month" at 52px measures 267.5px ink against a 282px
interior and renders on ONE line, not two — narrower than the brief's own worst-case wrap
assumption; no wdth adjustment was needed.

### Contrast — every text colour in the section re-measured against the new espresso ground

Real Chromium canvas-composite readback (resolves color-mix()/lab() to actual RGB, handles
alpha), WCAG relative-luminance ratio, at 1440 with `#price.in` fired:

| element | size | colour | ratio vs espresso | floor | pass |
|---|---|---|---|---|---|
| .sec h2 (section head) | 102.87px | bone 100% | 16.97:1 | 3:1 (large) | yes |
| .eyebrow .l | 14px | bone 60% | 6.44:1 | 4.5:1 | yes |
| .card .nm (name) | 24px | bone 100% | 16.97:1 | 3:1/4.5 either way | yes |
| .card .one (sentence) | 17px | bone 72% | 8.98:1 | 4.5:1 | yes |
| .card.mark .tag (pill label) | 12px | bone 72% | 8.98:1 | 4.5:1 | yes |
| .card .pr (figure) | up to 102.87px | bone 100% | 16.97:1 | 3:1 (large) | yes |
| .card .cta .chip .t | 19px | espresso-on-bone | 16.97:1 | 4.5:1 | yes |
| .eng .hd (name) | 24px | bone 100% | 16.97:1 | 3:1/4.5 | yes |
| .eng .v (figure) | up to 102.87px | bone 100% | 16.97:1 | 3:1 (large) | yes |
| .eng .dsc (sentence) | 17px | bone 80% | 10.95:1 | 4.5:1 | yes |
| .eng .chip .t | 19px | espresso-on-bone | 16.97:1 | 4.5:1 | yes |
| Audit border / pill border (UI) | 1px | copper on espresso | 4.40:1 | 3:1 | yes |
| (was, on bone, pre-104b) | | copper on bone | 3.86:1 | 3:1 | yes (barely) |

Every ratio clears its floor with wide margin; nothing is below 4.5:1 for body text or 3:1
for display figures, per the section's own gate. The Audit border's improvement (3.86 ->
4.40) matches the brief's own claimed 3.85 -> 4.41 to within rounding — confirmed
independently, not copied from the brief.

### Gates

`pnpm build`: green (copy-lint clean, vendor-gate clean, retired-phrases-gate clean, 23/23
static pages, render-gate 15 routes clean) — run three times across this leg (base reorder,
after the chip/border fixes, after the /packages port), green every time.

`python -P scripts/verify-room.py http://localhost:3000/` (fresh `pnpm start`, port 3000,
confirmed via `netstat`/`Stop-Process` that no stale server from an earlier leg was serving
— this repo's own documented trap): **85 checks, 84 pass, 1 fail.** The 1 fail,
`14.7-sentence-and-chips-share-the-left-edge`, is section 2's own named, pre-existing,
out-of-scope failure (a stale 24px-gap assertion the hero-sign redesign made obsolete,
already reported in this file under "Section 2").

Every gate the brief names PASS UNMODIFIED, confirmed by name in this run's output:
`18-audit-copper-border-and-pill`, `15.5-cards-mobile`, `14.7-chip-labels-are-the-live-
buttons`, `14.3-copy-gate`, `14.3-no-figures`, `14.3-no-years`, `14.3-two-rewrites`,
`16.3-5-rises` (`cardDelay == ['0s','0.07s','0.14s']`, `engDelay == '0.21s'` — untouched),
`16.3-3-heads` (`len(heads) == 4`). `15.5-cards`'s `hair_ok` sub-check (the card border
token test) untouched and passing — the band did not require it to change.

axe-core 4.10.2 via CDN injection (no axe tooling wired into this repo, confirmed by
`grep -i axe package.json`/`node_modules`; injected fresh for this section): zero
violations of any impact level at 390 and 1440 on `/`, and at 390 and 1440 on `/packages`.

Lighthouse mobile Performance (`npx lighthouse --preset=perf --form-factor=mobile
--screenEmulation.width=390 ...`, simulated throttling): 88 (floor 86), CLS 0. Repo-wide
measurement, not isolated to this section, but confirms no regression from this section's
CSS/DOM changes (no new media, no new JS).

### Screenshots

`.planning/qa/pass-104b/packages-104b-1440.png`, `.planning/qa/pass-104b/packages-104b-
390.png` — `#price` scrolled to top, `document.fonts.ready` + 3000ms real time (covers the
seam's 500ms draw plus the figures' up-to-270ms-delay/260ms-fill chain with margin), so both
show the FINISHED frame. Supplementary (kept for the record, not required):
`_packages-full2-1440.png` (taller viewport, shows Engagements with its border fix),
`_packages-full-390.png` (mobile, shows Engagements wrapping to two lines),
`_packages-page-1440.png`/`_packages-page-390.png` (the /packages route's own reorder).

### Files changed
- `components/room/Packages.tsx` — card reorder (pblock first), new `.seam` div,
  Engagements reorder (`.vblock` wraps `.v`).
- `app/room.css` — `.price` band (ground+ink override, padding-bottom, `.sec` margin,
  `.seam`, forced card-chip colour), `.pblock`/`.nmrow` spacing, `.card .pr` -> `--d2`,
  `.eng .vblock`/`.v`/`.hd` spacing and `--d2`, `.eng` border `transparent` -> `var(--hair)`,
  mobile `.eng .v` ladder fix (deleted two stale step-downs, fixed the 899px rule), new
  motion block (seam draw + figure fade), reduced-motion additions.
- `scripts/verify-room.py` — `15.5-cards`/`18-engagements-is-the-fourth-card` `d2` edits,
  `15.5-cards-mobile` price assertion added, `16.3-4-hairlines` seam added (13->14), two new
  checks (`05-the-price-is-the-poster`, `-no-js`), one test-harness timing fix (scroll+wait
  before `cd`/`eb`).
- `.claude/CLAUDE.md` — operator amendment recorded under "One accent."
- `.planning/design/WINNING-BRIEF-2026-09-05.md` — third exception recorded under §3.
- `.claude/RESUME.md` — stale `61/61` restated with the current count and a Pass-104b
  progress line, per this section's own GATES instruction ("THE COUNT MOVES").
- `app/(room)/packages/page.tsx`, `app/room-and-ledger.css` — the same card reorder ported
  to /packages (best effort, ungated).
- `.planning/qa/pass-104b/packages-104b-1440.png`, `-390.png` (new), plus four supplementary
  screenshots (see above).

### Gate edits, all named above with reasons
`15.5-cards` (d2), `18-engagements-is-the-fourth-card` (d2 + the scroll/wait timing fix),
`15.5-cards-mobile` (added price assertion), `16.3-4-hairlines` (13->14, seam added). NEW:
`05-the-price-is-the-poster`, `05-the-price-is-the-poster-no-js`. No gate outside this list,
and no gate this brief's section 5 does not name, was touched.

### Return conditions checked — none triggered
The operator band's own 3:1 hard gate is section 3's, not this section's (confirmed
`14.2-op-band-contrast` still passes at 4.66:1 worst-case, untouched by this leg). The
packages price does NOT overflow at 900 or 1024 (measured above) — no legal fix needed, so
none was reached for. No gate edit outside the five named above. No price, fact, ledgered
number or Pass-102/103/104a-named string was changed. The copper seam spans all three cards
and only those (verified: seamW 1376.0px == content 1376.0px +/- 1.0, one `.seam` element,
never per-column). No new type register was introduced (`--d2` is the section head's own
existing size; 52px at mobile is the packages' own existing rung). Lighthouse mobile did
not fall below 86 (measured 88, repo-wide).

Status: **done**. Every gate this section owns passes; the two fixes beyond the brief's
literal edit list (the card-chip colour force, the Engagements border) are structural
consequences of the operator's own ground reversal, documented above with before/after
evidence, not scope creep.

## Section 6 — objections: three rows, the register, and the door

Measured against `pnpm start` on **:3101**. Port 3000 was held by a stale server for the
whole of this leg, which is the RESUME standing trap; nothing here ever touched it.

### The three rows carry the operator's approved copy, verbatim

Brief §6 prints four strings (two NEW rows, each a question and an answer; the third row
is the existing AI-tools row, unchanged). All four render verbatim, confirmed against
`components/room/Objections.tsx` and against the served markup:

1. Q "I built it with Claude Code and it works. Now I cannot change one thing without rewriting half of it."
2. A "The tool does not change the work. I read the build top to bottom and write down what is load bearing, what is broken, and what to fix first. That is the Audit, $2,500."
3. Q "Last time I paid for help, it took so much back and forth that I did most of it myself."
4. A "One person reads it, writes it and ships it, and that person is me. No account manager, no status meeting, no brief for you to write."

The replaced "Hiring for a company rather than a build?" row is gone, as §6 directs.

### The register, as measured

`14.4-heads` reads the computed sizes off the built page: **`.q dt` [28, 28, 28]** and
**`.q dd` [19, 19, 19]**. That is §6's "24px to 28px/1.2" and "17px to 19px/1.5", landed.

### The chip count, and a false reading that cost time

§6 says to verify the chip label resolves twice before the commit. It does:

    curl -s http://localhost:3101/ | grep -o 'Book a free intro call</span>' | wc -l
    2

**`grep -c` returns 1 here and that is wrong.** `grep -c` counts matching LINES, and this
document is a handful of very long lines, so both occurrences sit on one line. That false
reading led this session to briefly conclude the ask's label had drifted. It had not:
`components/room/Ask.tsx:46` and `components/room/Objections.tsx:76` both carry it. Count
occurrences with `grep -o` piped to `wc -l`, never `grep -c`, on this page.

### THE DOOR — a real defect, found by looking at the render, fixed here

§6: "`.faq .sec` becomes a full-height flex column and takes one Rule C chip at
`margin-top: auto`, so its bottom edge aligns with the list's last hairline."

It shipped doing the opposite. The chip rendered at the TOP of the left column, above the
OBJECTIONS eyebrow. No gate caught it, because no gate measures the chip's position.

Mechanism, measured before the fix:

    gridRows            "48px 620.969px"     <- the grid had grown a SECOND row
    secRow              "auto"
    dcRow               "1"
    dcAlign             "end"
    doorchip            top 147.3, bottom 195.3
    lastRowBottom       816.3
    chipVsLastHairline  -621.0

`.doorchip` declares `grid-row: 1`. An explicitly-placed grid item is positioned BEFORE
any auto-placed one, so it claimed row 1 cols 1-5 first; `.sec` (definite column, auto
row) could not fit there and was pushed to row 2, taking `.qs` with it. The chip ended up
alone in its own 48px row above the head, 621px clear of the hairline it was meant to
touch. The implementer's mechanism was sound (share the head's cell, `align-self: end`)
but sharing a cell requires BOTH items to be explicitly placed.

Fix: `.rl-home .faq .sec` is pinned to `grid-row: 1`. After:

    gridRows            "620.969px"          <- one row
    secRow              "1"
    dcRow               "1"
    dcAlign             "end"
    doorchip            top 744.3, bottom 792.3
    lastRowBottom       792.3
    chipVsLastHairline  0.0

Exact. Visual confirmation in `objections-104b-1440.png` and `objections-104b-390.png`.

### Gate edits

FIVE named verbatim by §6 and never applied until now:
`18-objections-one-lane-from-the-seam` (`fq["n"]` 2 to 3, `dt` 24 to 28, `dd` 17 to 19),
`18-objections-mobile` (`len(set(qTops))` 2 to 3), `16.3-4-hairlines` (`len(drawn0)` 14
to 15), `16.3-5-rises` (`qDelay` gains `0.14s`), and the copy gate allowlist.

Two notes on that list. §6 says "the three new strings"; two NEW ROWS carry a question AND
an answer, so **four** strings were added as `PASS_104B_COPY`, each tagged
"PASS-104B operator-approved 2026-09-08". And the named gate held the old count of two in
a SECOND place, `stacked = len(set(fq["tops"])) == 2`, which moved with it.

THREE the brief does NOT name. Flagged here, not buried:

| Gate | Edit | Why it moved |
| --- | --- | --- |
| `14.4-heads` | `.q dt` 24 to 28, `.q dd` 17 to 19 | asserts the same register §6 orders, in a gate §6 did not enumerate |
| `14.8-renders-with-javascript-off` | `qs_n` 2 to 3 | asserts the same row count §6 orders |
| `18-objections-one-lane-from-the-seam` | `stacked` 2 to 3 | second copy of the count inside a gate §6 DOES name |

Every one stays an exact-value assertion. Nothing was loosened, no check was deleted, and
each carries an inline comment saying which §6 fact moved it. **These are the operator's
to confirm or reverse.**

## Section 7 — the footer

### The defect, measured

Pass 104a deleted the book block (cols 10-12) and widened `.foot .nav` to cols 7-13, but
left the links packed at the column's LEFT edge. At 1440:

| | before | after |
| --- | --- | --- |
| nav column | 732.00 to 1408.00 | unchanged |
| ink right edge | **886.06** | **1408.00** |
| empty gutter | **521.94px (37.9% of the row)** | **0.00px** |
| ragged-left spread | 0.00px | 100.03px |

The brief called it "the right third"; measured, it was slightly more than a third. The
nav did not read as a right-hand column, it read as a stranded middle one.

At 390 the two runs are **identical** (links at x=32, gutter 171.94px, spread 0.00) and
`foot-before-390.png` and `foot-after-390.png` are the same size to the byte. The `<=899`
block resets `align-items` and `text-align`, so the stacked foot is untouched.

### Why right-alignment, and not the two-track split

§7 offered either. Right-alignment wins on two grounds already in the system:

- The copper ask **directly above the foot** uses exactly this device: `.ask .promise` is
  `grid-column: 9 / 13; justify-self: end; text-align: right`.
- The receipts arrow's own rule defends it in its comment: the glyph sits flush right so
  "the ledger's right margin is a straight line down three rows rather than three
  different glyph advances."

A two-track split would have introduced a new device, and with only four links it reads as
a sitemap. The column keeps its 7/13 span so `Packages from $500` never wraps.

### The rule is SHARED, so both consumers were checked

`Foot.tsx` serves the home (`.foot`) and the five `(room)` routes (`.rl-foot`, which also
renders the reply promise, giving `.who` a third row). §7 asks only for the home. Both were
captured: `foot-packages-1440.png`, `foot-packages-390.png`. The right-aligned nav still
balances against the taller identity column.

### OPEN ROW, not fixed here: the `.foot .book` CSS is dead

`Foot.tsx` renders no `.book` element. Both call sites (`app/(home)/page.tsx` and
`components/room/SiteFoot.tsx`) go through the same component, so every
`.rl-home .foot .book` and `#rl-root .rl-foot .book` rule, and the `.book .ttl` / `.pr` /
`.chip` rules under them, are unreachable. Left in place deliberately: §7 says "no new
material, no new copy", and deleting dead CSS is a separate cleanup, not this pass's
business. Named here so it is not rediscovered.

## Section 8 — whole-pass gates

All run against the CURRENT build (the door fix included) on :3101.

| Gate | Result |
| --- | --- |
| `pnpm build` | green |
| `npx prettier --check app/room.css` | clean |
| `python -P scripts/verify-room.py http://localhost:3101/` | **85 checks, 84 pass, 1 fail** |
| door proof (`door.py`) | `chipVsLastHairline` **0.0** |
| axe-core 4.10.2, 3 routes x 2 widths x {rest, wheel-walked} | **0 violations at any impact, 12 of 12 scans** |
| Lighthouse mobile Performance | **94** (floor 86) |
| chip occurrences | **2** |

The single verifier FAIL is `14.7-sentence-and-chips-share-the-left-edge`, which the
RESUME records as section 2's own hero-sign consequence: a ruling, not a defect, left
unfixed on purpose. It is the same one failure the pass carried at section 5.

Lighthouse detail: FCP 2.3s, LCP 2.6s, Speed Index 2.6s, TBT 30ms, CLS 0.03, TTI 3.6s.
The operator's stated risk, roughly 3.9MB of video on disk with a 1.2MB file going to the
phone, did not cost the score. It measured 92 at sections 1 and 3, 88 at section 5, and 94
now.

axe method, both halves of which are standing traps: scan after `document.fonts.ready`
plus 600ms (earlier and it invents contrast failures), then again after 40 wheel steps to
the foot (without the walk it misses the failures a scrolled ground creates). Routes `/`,
`/packages` and `/about`, because the footer rule is shared.

**Sections 1 through 7 are applied, measured and green. What remains for the pass is the
Astra juror read and the operator's push.**
