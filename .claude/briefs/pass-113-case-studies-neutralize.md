# Pass 113: the two case studies, neutralized

Executor: Sonnet (Claude, either account) per MODEL_ROUTING §9e. Worktree
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage by
explicit path; commit with `git commit -F <abs msg> -- <paths>` after reading
`git diff --cached --name-only` (LESSONS #23).

## 0. The ruling

Operator, 2026-09-11, decision 5, chosen from four options: **Neutralize.** Remove the
Hennessy example from Postmates; describe Neuton.AI's North American positioning need
without the word "foreign"; keep the acquisition wording non-causal (the work and the sale
stay separate sentences; "led to" is not published). Reason, one line: both studies name
former employers, and the page should carry the supported work without a detail that reads
as an anecdote about a named company or a causal claim the ledger does not make.

Ledger facts that do not move (LESSONS #3): Postmates, product analyst, acquired by Uber
2020 for $2.65B; Neuton.AI, "helped launch", no cap-table position, technology acquired by
Nordic Semiconductor 2025, price undisclosed, row tag 2025.

## 1. Exact copy

**`content/work/postmates.mdx`, line 26.** Replace the whole line
`That promise invited fraud. One custom order asked for 100 gallons of Hennessy in the Bronx.`
with
`That promise invited fraud. Some of the custom orders were never meant to be delivered.`

**`content/work/neuton.mdx`, frontmatter `dek` (line 3).** Replace the whole value with
`I helped launch an AI company in North America, positioning its product for buyers here in 2020. Nordic Semiconductor acquired the technology in 2025; the price was never disclosed.`

**Same file, line 23.** Replace the whole line
`I joined Neuton.AI early, in 2020, in the early days of AI products. A foreign company, it needed its product positioned for North American buyers.`
with
`I joined Neuton.AI in 2020, in the early days of AI products. It was entering North America and needed its product positioned for buyers here.`

Nothing else in either file changes. The Outcome sections already keep the sale in its own
sentence; leave them. `app/(foyer)/page.tsx` line ~520 uses "foreign" inside a JSX comment
that never renders; leave it.

**`docs/LESSONS_LEARNED.md`, the #3 ledger, appended immediately before the `**Gate:**`
line:**
`- **Postmates and Neuton.AI neutralized** (operator 2026-09-11, decision 5: "Neutralize"). The Hennessy order is off the Postmates study; Neuton.AI is described as entering North America, not as "foreign"; the acquisitions stay in their own sentence, never "led to". NEVER: "Hennessy", "foreign company", "foreign AI company", or a causal link between the positioning work and either sale. Gate: retired-phrases-gate (Pass-113).`

## 2. The gate (same day)

`scripts/retired-phrases-gate.mjs`: add to `PHRASES`: `"Hennessy"`, `"foreign company"`,
`"foreign AI company"`. Not the bare word "foreign" (it has legitimate uses in code). Add a
header comment block for the ruling. The self-test auto-plants each phrase; add one near
miss: `foreign key` on a `.ts` line must not hit. Print the counts.

## 3. Verification (Git Bash, `MSYS_NO_PATHCONV=1`, exit codes read directly)

- `node scripts/retired-phrases-gate.mjs --self-test` → counts line, exit 0.
- `node scripts/retired-phrases-gate.mjs` → `retired-phrases-gate: clean`, exit 0.
- `npx tsx lib/copy-lint-cli.ts` exit 0. `npx prettier --check scripts/retired-phrases-gate.mjs` exit 0 (never prettier the `.mdx` or `.md`).
- `npx next build --webpack` exit 0; `npx next start --port 3200`; then:

```
sf=0; chk () { echo "  $1: got $2, expect $3"; [ "$2" = "$3" ] || sf=$((sf+1)); }
S=http://localhost:3200
PM=$(curl -s "$S/work/postmates"); NE=$(curl -s "$S/work/neuton"); WK=$(curl -s "$S/work"); LL=$(curl -s "$S/llms.txt")
chk "postmates status" "$(curl -s -o /dev/null -w '%{http_code}' "$S/work/postmates")" 200
chk "neuton status" "$(curl -s -o /dev/null -w '%{http_code}' "$S/work/neuton")" 200
chk "Hennessy anywhere" "$(printf '%s%s%s%s' "$PM" "$NE" "$WK" "$LL" | grep -ci hennessy)" 0
chk "foreign on neuton + index + llms" "$(printf '%s%s%s' "$NE" "$WK" "$LL" | grep -ci foreign)" 0
chk "new postmates line" "$(printf '%s' "$PM" | grep -c 'never meant to be delivered')" 1
chk "new neuton line" "$(printf '%s' "$NE" | grep -c 'entering North America')" 1
chk "led to on neuton" "$(printf '%s' "$NE" | grep -ci 'led to')" 0
chk "neuton price undisclosed" "$(printf '%s' "$NE" | grep -c 'never disclosed')" 1
chk "postmates 2.65B" "$(printf '%s' "$PM" | grep -c '2.65B')" 1
echo "served-checks failures: $sf"
```

- `node scripts/render-gate.mjs` exit 0 (the dek feeds metadata; the description cap holds).
- Captures (viewport, settled): `work-neuton-1440` at the top of `/work/neuton` and
  `work-postmates-body-1440` centred on the first `h2`, into `.planning/qa/pass-113/`.

## 4. Rejected

- Rewriting the Outcome sentences: already non-causal.
- Banning the bare word "foreign": false positives in code.
- Touching the home page comment: comments do not render.
- Fixing "case-study body starts low under the rail" (Astra d, OPEN): a layout pass, not this one.

## 5. Commit

`Pass-113: Postmates and Neuton.AI neutralized (operator 2026-09-11, decision 5)` with the
two MDX files, the gate, LESSONS, `.planning/qa/pass-113/`; then `.claude/RESUME.md` alone
(≤2500 bytes, `wc -c` printed). Do not push.

## 6. Return (judge, ≤3 calls)

The served block and `work-neuton-1440`.
