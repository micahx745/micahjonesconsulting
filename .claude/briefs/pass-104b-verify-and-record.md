# Pass 104b — re-verify after the door fix, and write the record
Executor: GLM 5.3 (`scripts/claude-glm.ps1`). Ruler commits; you do not.

## 0. State. Read this before anything.
HEAD is `0ed6f52`. Sections 1-7 of `.claude/briefs/pass-104b-home-rebuild.md` are APPLIED.
That commit fixed two things after the last measurements were taken:
  a. §7 footer — `.foot .nav` right-aligned to the gutter (`align-items:flex-end` +
     `text-align:right`, reset below 900px).
  b. §6 door — `.rl-home .faq .sec` pinned to `grid-row: 1`, so the chip shares the
     head's cell and `align-self:end` lands it on the list's last hairline.
It also applied §6's five named gate edits plus three the brief does not name
(`14.4-heads` q 24->28 / a 17->19, `14.8-renders-with-javascript-off` qs_n 2->3, and
`stacked` inside `18-objections-one-lane-from-the-seam`). All are in `0ed6f52`'s message.

**Every gate number below was measured BEFORE (b) landed. Your whole job is to re-measure
against the current build and write the record. Nothing about the design is open.**

## 1. Do not touch these
- `app/room.css` and `scripts/verify-room.py` — FINISHED. One writer per file; not you.
  If a gate fails, REPORT it. Do not edit a gate to make it pass.
- Any price, fact, ledgered number, or string a Pass 102/103/104a tick table names.
- `.claude/RESUME.md` — the ruler writes it.
- Do NOT commit. Do NOT push. Do NOT deploy.

## 2. The server is already up
`pnpm start` is serving the CURRENT build on **http://localhost:3101/**.
Port 3000 is held by a STALE server — never use it (RESUME standing trap).
Only run `pnpm build` if you change code, and you are not changing code.

## 3. The four gates, with the output each must produce
Run from the worktree root. `python -P` always: the scratchpad's `copy.py` shadows the stdlib.

    python -P scripts/verify-room.py http://localhost:3101/
EXPECT the last line `85 checks, 84 pass, 1 fail`, the single FAIL being
`14.7-sentence-and-chips-share-the-left-edge` — a known ruling, not a defect, left unfixed
on purpose. ANY other FAIL is a finding: quote it in full and stop.
**Immediately afterwards run `git checkout -- .planning/qa/pass-101`** — the verifier
overwrites baselines under `.planning/qa/pass-101/verify/`. This is a standing trap.

    axe-core 4.10.2, already unpacked at
    C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/package/axe.min.js
Scan `/`, `/packages`, `/about` at 1440x900 and 390x844, TWICE each: once at rest, once
after a Lenis wheel walk to the foot. Both traps are real — axe before
`document.fonts.ready` invents contrast failures, and axe without a wheel walk MISSES the
ones a scrolled ground creates. So: `goto` -> `await document.fonts.ready` -> wait 600ms ->
inject axe -> scan -> 40 x `mouse.wheel(0,700)` with 60ms between -> wait 1200ms -> scan again.
EXPECT **0 violations at any impact level, on all 12 scans.** A working script that does
exactly this is at `C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/axe-run.py`; run it, do not rewrite it.

    npx --yes lighthouse http://localhost:3101/ --only-categories=performance \
      --preset=perf --form-factor=mobile --screenEmulation.mobile --output=json \
      --output-path=C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/lh-final.json --chrome-flags="--headless=new --no-sandbox"
EXPECT Performance **>= 86**. It measured 94 before the door fix. A score below 86 is a
return condition: stop and report it.
Write the output path INSIDE the scratchpad. `--output-path=/tmp/...` silently writes
nothing on this machine; that already cost one run.

    python -P C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/shots.py http://localhost:3101/
Captures home full-page, `.faq` and `.foot` at both widths plus the `/packages` foot, all
after `document.fonts.ready` + 3s per brief §8. Files land in `.planning/qa/pass-104b/`.

## 4. The one measurement that proves the door fix
    python -P C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/door.py http://localhost:3101/
EXPECT `gridRows` to be a SINGLE row (`620.969px`, not `48px 620.969px`), `secRow` `1`,
`dcRow` `1`, and **`chipVsLastHairline` 0.0**. Quote all four in the record.

## 5. What you write
Append to `.planning/qa/pass-104b/verification.md` — do not rewrite what is there.

**`## Section 6 — objections: three rows, the door`**, covering: the three rows render with
the operator-approved copy (quote the four strings from brief §6 §"ROW 1"/"ROW 2" and confirm
each appears verbatim); the 28/19 register as measured by `14.4-heads`; the chip appears
TWICE in the served markup — verify with
`curl -s http://localhost:3101/ | grep -o '<span class="t">Book a free intro call</span>' | wc -l`
which must print `2` (**`grep -c` counts LINES, not occurrences, and returns 1 here — that
false reading already misled one session**); the door defect and its fix with the before
numbers (`48px 620.969px`, chip 621px clear) and the after (`chipVsLastHairline` 0.0); and
the five named + three unnamed gate edits, naming the unnamed three as operator-owned.

**`## Section 7 — the footer`**, covering: the before/after geometry at 1440
(ink right edge 886.06 -> 1408.00, empty gutter 521.94px / 37.9% of the row -> 0.00px,
ragged-left spread 0 -> 100.03px) and at 390 (unchanged: links at x=32, gutter 171.94px,
spread 0 — quote that the two runs are identical); why right-alignment was chosen over a
two-track split (the ask's `.promise` at `9/13` already uses `justify-self:end`, and the
receipts arrow's rule defends a straight right margin); that the rule is SHARED with the
five `(room)` routes through `Foot.tsx`, evidenced by `foot-packages-*.png`; and that
`.foot .book` CSS is now DEAD — `Foot.tsx` renders no `.book` element — left in place
because §7 says "no new material" and deleting it is a separate cleanup. Name it as an
open row; do not delete it.

**`## Section 8 — whole-pass gates`**: every command above with its real output.

Every number is real probe output. No number is derived, estimated, or copied from this
brief. If a probe cannot run, write UNVERIFIED and say why — never substitute a weaker one.

## 6. Return conditions — stop and report, do not work around
Any verifier FAIL other than `14.7` · Lighthouse mobile below 86 · any axe serious or
critical · `chipVsLastHairline` not 0 · the chip count not 2 · a gate you would have to edit.

## 7. When you are done
Print a summary block: each gate, its number, PASS or FAIL. List every file you wrote.
Then STOP. You do not commit, and you do not push.
