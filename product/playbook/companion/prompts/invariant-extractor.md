# Prompt — extract the invariant list from an existing build

Read this codebase and write an invariants file: one line per
rule-with-a-reason that the code currently depends on but does not
state. Look especially for: oddly-specific implementations (they are
usually load-bearing), validation that exists in only one place,
ordering requirements, and anything a naive rewrite would simplify
away. Format each as:

- <THING> must <BEHAVIOR>: <what breaks otherwise>.

Mark any rule you inferred but could not verify with (UNVERIFIED) so
I can confirm it myself.
