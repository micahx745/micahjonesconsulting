# Pass 104b: re-verify after the door fix, and write the record

Executor: GLM 5.3. The ruler commits; you do not commit and you do not push.

NOTE ON THIS FILE. It is deliberately plain ASCII and contains no command flags.
An earlier version embedded a shell command with flags in it, and the launcher
parsed them as its own options (it died on "unknown option --no-sandbox"), which
killed the run. Every command you need lives in ONE script. Do not retype flags.

## 0. State

HEAD is 21f123a. Sections 1 to 7 of the home rebuild are APPLIED and committed.
Commit 0ed6f52 changed two things AFTER the last measurements were taken:
  a. the footer nav is right-aligned to the gutter;
  b. the objections door chip now shares the head's grid cell, so it lands on the
     list's last hairline.
It also applied five gate edits the home-rebuild brief names, plus three it does
not name. All of that is spelled out in 0ed6f52's commit message.

EVERY published gate number predates change (b). Your whole job is to re-measure
against the current build and write the record. No design question is open.

## 1. Do not touch

app/room.css and scripts/verify-room.py are FINISHED. One writer per file, and it
is not you. If a gate fails, REPORT it; never edit a gate to make it pass.
Do not touch .claude/RESUME.md, any price, any ledgered number, or any string a
Pass 102, 103 or 104a tick table names. Do not commit. Do not push. Do not deploy.

## 2. The server is already running

The current build is served on http://localhost:3101/ and that is what you use.
Port 3000 is held by a STALE server; never point anything at 3000. You are not
changing code, so you do not need to build.

## 3. Run the gates

One command. It runs all six gates in order, with every flag baked in:

    bash C:/Users/micah/AppData/Local/Temp/claude/C--Users-micah-Code-the-80-percent-wall/9033e21b-ea02-47e9-a688-4737de8f4c16/scratchpad/run-gates.sh

What each gate must produce:

GATE 1, the room verifier. The last line must read "85 checks, 84 pass, 1 fail",
and the single FAIL must be 14.7-sentence-and-chips-share-the-left-edge, a known
ruling left unfixed on purpose. ANY other FAIL is a finding: quote it in full and
stop. The script restores the pass-101 baselines afterwards because the verifier
overwrites them. That restore is a standing trap; do not remove it.

GATE 2, the door fix. gridRows must be a SINGLE row of 620.969px, and NOT
"48px 620.969px". secRow must be 1, dcRow must be 1, chipVsLastHairline must be
0.0. Quote all four numbers in the record.

GATE 3, axe-core 4.10.2. Three routes at two widths, scanned twice each: once at
rest, once after a wheel walk to the foot. Expect ZERO violations at any impact
level across all 12 scans. Both halves matter: axe run before fonts are ready
invents contrast failures, and axe run without the wheel walk misses the failures
that a scrolled ground creates.

GATE 4, Lighthouse mobile Performance. Must be 86 or higher. It measured 94 before
the door fix. Below 86 is a return condition: stop and report it.

GATE 5, the door chip must appear exactly TWICE in the served markup. The script
counts occurrences, not lines. Record that "grep -c" counts LINES and returns 1
here, and that the false reading already misled one session.

GATE 6, screenshots into .planning/qa/pass-104b/ at both widths.

## 4. What you write

Append to .planning/qa/pass-104b/verification.md. Do not rewrite what is there.

Section 6, the objections and the door. Confirm the three rows render the
operator-approved copy verbatim, quoting the four strings. Give the 28 and 19
register as measured. Give the chip count from GATE 5. Give the door defect with
its before numbers (the grid computed "48px 620.969px" and the chip sat 621px
clear of the hairline) and its after number (chipVsLastHairline 0.0). List the
five named gate edits and the three unnamed ones, and say plainly that the three
unnamed ones are the operator's to confirm or reverse.

Section 7, the footer. At 1440 the ink right edge moved from 886.06 to 1408.00,
the empty gutter from 521.94px (37.9 percent of the row) to 0.00px, and the
ragged-left spread from 0 to 100.03px. At 390 the two runs are identical: links at
x=32, gutter 171.94px, spread 0. Record why right-alignment beat a two-track
split: the copper ask directly above already right-aligns its promise to the
gutter, and the receipts arrow's own rule defends a straight right margin. Record
that the rule is SHARED with the five room routes through Foot.tsx, evidenced by
foot-packages-1440.png and foot-packages-390.png. Record that the .foot .book CSS
is now DEAD, because Foot.tsx renders no book element, and that it was left in
place because section 7 says "no new material" and deleting it is a separate
cleanup. Name it as an open row. Do not delete it.

Section 8, whole-pass gates: every gate above with its real output.

Every number must be real probe output. Nothing derived, nothing estimated,
nothing copied out of this brief. If a probe cannot run, write UNVERIFIED and say
why. Never substitute a weaker probe and report success.

## 5. Return conditions: stop and report, do not work around

Any verifier FAIL other than 14.7. Lighthouse mobile below 86. Any axe serious or
critical finding. chipVsLastHairline not 0. The chip count not 2. Any gate you
would have to edit in order to get a pass.

## 6. When you are done

Print a summary block naming each gate, its number, and PASS or FAIL. List every
file you wrote. Then STOP.
