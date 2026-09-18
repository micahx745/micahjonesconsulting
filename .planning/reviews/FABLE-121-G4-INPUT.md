# FABLE-121-G4-INPUT: read the Pass-121 brief before it commits as final

For Fable 5.1, gate G4 of Pass-121. Written 2026-09-18 by the Opus 5 main session. One call, at most five
tool calls (briefs README: a judge return is five or fewer). Read `.claude/briefs/pass-121-work-and-studies.md`
in full. Write your ruling to `.planning/reviews/FABLE-121-G4.md`. No other edits, no builds, no captures.
Plain markdown, no emoji, no em-dashes.

## What changed since your G3 look

- Your G3 ruling is folded in; every placement cites R1 to R14 or N1 to N10.
- Opus verified three of its premises against the repo before folding: `home-circle-ratios.json`
  (widthRatio 1.1885 of the figure's text width; the height basis is the JSON's own `svgStyle`, 1.243em of
  font-size, not cap height, so the brief uses the JSON's bases as you said it should); `--cs-accent` is
  declared only under `[data-mode="theater"] .cs`, so R4's fallback resolves to copper on /work; the re-lifted
  §01 note is verbatim. `bookings a month` had no ledger provenance, so it went to the operator.
- The operator, 2026-09-18, after the round-2 captures at 390 and 1440: approved building C with your
  fixes; approved every drawing string as written, including the birth-worker second row and its unit
  line; picked the claims did-line for ORDANI; picked the period on `Also on the record.` All in LESSONS #3.
  ORDANI's DRAFT mark therefore retires.

## Rule on

1. **The circle's stroke** (brief 3.3, "The circle"). Your R7 asks for the stroke to scale with the path.
   Your PROOF §2 item 3 ruled one stroke weight for every hand mark on a page, circle included. The brief
   keeps PROOF's rule (2px at 1440, 1.5px at 390, non-scaling) and flags it here. Confirm, or reverse with
   the numbers.
2. **Executable verbatim?** Could GLM run each stage without taste: every string placed from a named file
   and field, every size and position given, every verification line a command with its expected output,
   every stop condition named? Name any line that would force the executor to judge.
3. **Anything wrong** against G2, PROOF or G3 as folded.

## Output

Verdict first: COMMIT (the brief commits as final as it stands), or FIX FIRST with a numbered list of
exact replacements (section, old text, new text) that Opus applies without re-asking you. Then three
plain lines for the operator.
