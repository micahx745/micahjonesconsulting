# Prompt — review a diff before accepting it

Before I accept this diff, check it against SPEC.md and the
invariants file and answer three questions:

1. Does any change violate a listed invariant? Name the line.
2. Does it touch any file the stated task had no business touching?
3. Does it add anything that belongs in NOT or LATER?

Answer with the specific lines, not a summary. If all three are
clean, say so in one line.
