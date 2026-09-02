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
