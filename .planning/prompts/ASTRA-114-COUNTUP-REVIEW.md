# Astra juror look: Pass-114, the home $20M+ count-up

You are the quality juror for one design moment on micahjonesconsulting.com. You judge; you do
not edit files. Answer in at most 250 words.

## Context

The operator approved one exception to the site's own design bar: on the home page only, the
`$20M+` revenue figure counts once from `$0M` to `$20M+` over 1.2 seconds when it is half in
view, and a hand-drawn circle closes around it afterwards, finishing at 2.65 seconds. It runs
once per page load, never loops, never couples to scroll after it starts, and is skipped under
reduced motion (the finished frame is also what no-JS and a deep link render). The label under
it reads "In client revenue since 2013". The bar it overrides bans animated counters (R13)
because they read as a SaaS stat ticker.

## The three attached captures

1. `home-rec-mid-1440.png`: about 600ms into the count, desktop 1440 wide.
2. `home-rec-done-1440.png`: the settled frame at 3.2s, desktop 1440 wide.
3. `home-rec-done-390.png`: the settled frame, phone 390 wide at 2x.

## Answer exactly these two questions

1. Does the moment read as **authored proof** (a single deliberate reveal of a real number) or
   as a **stat ticker** (generic SaaS dashboard motion)? Name the specific visual evidence in the
   captures that decides it either way.
2. Does the drawn circle **land on the settled number**: does it enclose `$20M+` without
   clipping a glyph, colliding with the label, or sitting visibly off-centre, at both 1440 and
   390?

End with one line: `VERDICT: PASS` or `VERDICT: FAIL: <the one change that would fix it>`.
