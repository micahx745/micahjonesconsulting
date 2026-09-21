# Briefs — the DIRECT → EXECUTE handoff

A brief is what a top tier (Fable) leaves behind so a cheaper tier (Opus, Sonnet) can
implement its judgment without re-deriving it.

## Why this directory exists

On 2026-09-01 a Fable session on this repo was audited turn by turn. Of 320 assistant
turns, **9 contained a decision no command could settle. 311 were execution** — 151 file
reads, 143 shell calls, 82 edits, and browser screenshot loops, including one unbroken
125-turn stretch. The model choice was right for the work. The arc shape was wrong: the
ruling never became a file, so the expensive tier had to stay resident to remember its own
judgment.

A brief is the fix. Write the judgment down once and a cheap tier executes it faithfully.

## The three segments

1. **DIRECT (Fable)** — decide what is true and what is worth doing. The segment is not
   finished until a brief exists here and is committed. Not before.
2. **EXECUTE (Opus / Sonnet)** — `/clear`, `/model opus`, run the brief verbatim.
3. **JUDGE (Fable)** — return at the checkpoints the brief names, look once, append a
   fix-list to the same brief, leave. Do not stay to watch the fix land.

## Naming

`<pass>-<slug>.md` — e.g. `pass-60-playbook-cro.md`. Same "Pass-N" numbering as commits, so
a brief and the commit that executes it are greppable together.

## Required contents, in this order

1. **The ruling** — one paragraph, with its one-line reason.
2. **Final copy as exact strings.** Never "something like". The executing model places
   words; it does not write them. This is the section that most often gets skipped and it
   is the one that carries the quality.
3. **Layout spec** — in tokens and classes that already exist in `brand.json` and
   `globals.css`. Do not invent a token in a brief.
4. **Motion** — what is allowed, what is forbidden, timings. Default: nothing new.
5. **Verification** — as commands **with their expected output**, so the executor can
   pass/fail without taste.
6. **The rejected list** — what was considered and killed, and why. Without this, the next
   session re-proposes it and the ruling is re-litigated.
7. **Return conditions** — which routes, which viewports, which ledger bring Fable back.
8. **Parked operator decisions** — facts only the human has (a ship date, a photo, a price).

A brief missing (2) or (6) is a note, not a brief, and the handoff will lose the quality.

### Standing clauses in every Verification section (LESSONS #24, #25, #26, #28)

- **Count what renders.** `expect 0` may grep raw served HTML. `expect N>=1` must count
  visible DOM text with `<head>` and every `<script>` stripped first, or assert `-ge 1`.
  A raw `curl | grep -c` also counts the RSC flight payload, so a correct page fails.
- **The executor never reinterprets an expected value.** A chk line whose `got` differs
  from its `expect` is a failure. If the executor believes the brief's number is wrong, it
  stops before the commit and reports the raw output plus its reason; the judge rules.
- **Measure the render, not the model** (LESSONS #26). Any check on a drawn mark confirms ink
  in a screenshot of the finished frame, and is run once on the broken code first to prove it
  bites. Pass-115 passed ten geometric checks on a loop the browser never painted.
- **Scope from the layout, look at the capture** (LESSONS #28). A DOM gate's scope is read off
  the route's group layout (the nav here is a sibling of `main`) and stated in the script. A
  capture is opened once before it counts as evidence, and its name matches what it frames.
- **No `grep -i` with `-F` in a check** (LESSONS #34). Git Bash's GNU grep 3.0 aborts on that
  pair (exit 134, no output), and `| wc -l` then prints `0`, so every `expect 0` passes without
  looking. Lowercase both sides (`tr '[:upper:]' '[:lower:]'`) and use `grep -F`, or use
  `grep -i` on an escaped pattern. `node .planning/exec/grep-if-gate.mjs` finds the pair.
- **No copy defect is parked** (LESSONS #35). A draft sentence that anyone flags as reading wrong
  (grammar, sense, a stray comma) goes to the operator by popup in the DIRECT session, with
  rewrites to pick from, before the brief commits. A brief's parked list may hold facts only the
  operator has; it never holds a sentence the executor must place verbatim while knowing it is bad.

- **No check is passed by editing the work to fit it** (LESSONS #37). A floor, a count or a zero is a
  test the work can fail, never a target. If a check cannot pass without adding, removing, reboxing or
  restyling content, the executor stops and reports the raw numbers; the judge rules. Pass-121 round 1
  met three checks this way: a unit line boxed to reach a box count, five type sizes moved to reach a
  size count, and the site's copyright deleted to zero a year grep.
- **Contrast is measured at rest and hovered** (LESSONS #37). Any pass touching a colour, an opacity or a
  hover state computes the composited colour against its real ground, per ground it appears on, and
  asserts text >= 4.5 and graphical strokes >= 3.0 in both states. Pass-121 round 1 shipped a 0.6 rest
  opacity at 2.19:1 and no check looked.
- **Overlap is measured on both axes** (LESSONS #37), from a bounding box read off the render
  (`getBBox()` mapped through `getScreenCTM()`), with a margin on all four sides. A one-axis check called
  a label "clear" whose ink ran past both edges of its frame.
- **The tenure-year grep excludes the copyright line.** The pattern `(19|20)[0-9]{2}[-–](19|20)?[0-9]{2}`
  matches the live footer's `© 2013–2026 Micah Jones` (`components/color-worlds/PageFooter.tsx`). Strip
  that literal before the pattern runs, or the check tells the executor to delete the copyright.
- **A design direction is never picked without its scope** (LESSONS #39). Before any popup asks the
  operator to pick a design direction, the scope is settled and ledgered: which pages and sections change,
  and whether the direction REPLACES the existing theme or FEEDS it. If LESSONS #3 holds no scope row for
  the pass, the scope is its own popup, asked first. Every mock, tile or brief names its scope in its first
  lines. Pass-122 built a complete redesign tile for a direction the operator meant as themes for the
  existing site ("i didnt want to change the entire site").
- **Scroll reveals are captured before and after their trigger** (LESSONS #40). Every scroll-triggered
  reveal gets frames before and after it fires at 390 and 1440, and a check that it reached its done state
  after a slow scroll past it. A waiting state is never empty.
- **Accent colour on a WorldSwitcher page is measured while scrolling** (LESSONS #19, recurrence
  2026-09-18). Before CARD 1, any pass that adds or moves an accent colour runs
  `node .planning/exec/crossfade-contrast.mjs` (down and up, normal and reduced motion, 390 and 1440). A
  resting axe scan cannot see a pinned or late element crossing a world boundary. Pass = 0 steps under
  the floor.

- **CLS is measured while scrolling** (LESSONS #41). Any pass that adds or changes an element whose layout
  follows scroll position runs `node .planning/exec/cls-attrib-123.mjs <url>` at 390 and 1440 before CARD 1.
  Pass = the largest session window at or under 0.05 (the Definition of done). Pass-122's scoreboard shipped
  0.33 on a phone because every check it had was taken at rest or at load.

- **A brief never pins HEAD to a hash its own commit will move** (Pass-125b, 2026-09-21). The first 125b
  brief said "branch at `98ead18`"; committing the brief made HEAD `cbde884`, and Sol stopped on the
  mismatch, as it should. Pin with a check that survives the commit:
  `git log -1 --format=%h -- <this brief>` equals `git rev-parse --short HEAD`, and name the code commit
  separately. Also list any untracked files that pre-date the round in the expected `git status`.
- **Full-page captures of a Color Worlds page lie about colour.** The WorldSwitcher recolours the page per
  section on scroll, so a full-page screenshot freezes every section in the first section's world (Pass-125
  round 1 showed an espresso section on bone). Any capture a juror or the operator judges for design is a
  set of VIEWPORT frames taken while scrolling (model: `.planning/qa/pass-125/scroll-sheet.mjs` in the
  Pass-125 preview branch), not a full-page shot.

## Budget this enforces

≤15 top-tier tool calls per arc: DIRECT ≤10, each JUDGE return ≤5. Read-only shell is free
(`git log`/`diff`/`status`, `sed -n`, `grep`, `curl -s | grep`). Builds, deploys, playwright,
lighthouse, and screenshot loops do not belong in a DIRECT segment.

A `PostToolUse` hook (`~/.claude/hooks/tier-burn-monitor.js`) counts consecutive execution
calls and says so at 12 on Fable. It cannot switch the model — no hook can — it only makes
the moment visible. The full policy is `~/.claude/MODEL_ROUTING.md` §6.

## Briefs are not planning documents

They are not roadmaps, not status, not a second RESUME. `.claude/RESUME.md` remains the only
current-state source. A brief is written once, executed, appended to at checkpoints, and
then it is history like any other doc.
