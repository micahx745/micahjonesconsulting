# Pass 108: apply the two verified specs, fix one violation, run the gates

Executor: GLM 5.3. You apply and verify. You do NOT commit and you do NOT push.

NOTE ON THIS FILE. It is plain ASCII and contains no command flags. The launcher passes
this whole prompt as argv, so a single dash-dash token anywhere in the text kills the run.
That happened twice. Every command you need is inside two files in the repo.

## 0. What you are applying

Two specs, already drafted and adversarially checked, in
`.planning/design/PASS-108-SPECS.json`:

  home-pace  5 patches, verdict ACCEPT. Anchors verified, no banned words, no invented
             facts, no colour or opacity on text.
  services  11 patches, verdict FIX. Anchors verified and mechanically applied to a
             scratch copy with tsc passing. One violation to correct, see section 2.

Both were checked against the live repo at HEAD. Do not redesign anything. Your job is to
land them, correct the one named violation, and prove the result.

## 1. Apply

From the repo root:

    python -P .planning/exec/apply108.py home-pace services

It applies every patch by exact anchor and prints one line each. It exits non-zero if any
anchor is missing or not unique. If that happens, STOP and report which patch and which
file. Do not hand-edit an anchor to make it match.

## 2. The one violation you must fix

The services spec adds this rule:

    [data-mode="cw"] .cw-sv-svc-group__lead {
      font-family: var(--font-cw-mono);
      ...
      text-transform: uppercase;
    }

It styles this sentence:

    "Three areas of work, inside Engagements. Pick one, or run all three together."

That is thirteen words of connective prose in uppercase monospace. `.claude/CLAUDE.md` is
explicit: monospace is for labels, section codes and data only, and mono body copy is
banned. Every other mono use on this page is a two to five word eyebrow.

Fix: in `app/globals.css`, change that rule's `font-family` to `var(--font-cw-body)` and
remove its `text-transform: uppercase`. Size it like `.cw-sv-svc__pain` or
`.cw-sv-open__body`, which are the page's own body-prose rules. Leave every other
declaration in that rule alone.

## 3. Prove it

    bash .planning/exec/gates108.sh

That runs tsc, copy-lint, the vendor gate, the retired-phrases gate, prettier, the build,
restarts the server on port 3200, and runs the render gate. Every flag is inside that
script. Expected:

  tsc               no output
  copy-lint         "Zero banned-word findings, zero schema violations."
  vendor            "vendor-gate: clean"
  retired phrases   "retired-phrases-gate: clean"
  build             "Compiled successfully"
  render-gate       "15 routes"

If the build fails on a Turbopack font error, you ran the wrong command: `pnpm build`
fails on this machine and also on untouched main. The script uses the webpack path, which
works. Do not try to fix that font error; it is environmental and already recorded.

If a gate fails on something you changed, fix it and re-run. If it fails on something you
did not change, report it and stop.

## 4. The accessibility check that matters most here

After the gates pass, run axe against the two changed pages. Use the script the repo
already has if one exists, otherwise fetch axe-core 4.10.2 and inject it. Scan `/` and
`/services` at 1440 by 900 and 390 by 844, twice each: once at rest and once after
scrolling to the foot.

THIS IS NOT OPTIONAL AND IT IS NOT ROUTINE. The home page cross-fades its palette as
sections pass the viewport centre, so the same element sits on terracotta at one moment
and bone at another. Any fixed colour or any opacity applied to text will pass a static
look and fail axe. That exact mistake produced nineteen serious contrast failures earlier
in this project, then three more the same day. Expect zero serious or critical findings in
anything the specs touched. The pre-existing site-wide finding on the door panel and the
Ordani figcaptions also fails on main; that one is not yours.

## 5. Report and stop

Print: every gate with its real output, the axe result per page and width, and a list of
every file you changed. Then STOP. Do not commit. Do not push. Do not deploy.
