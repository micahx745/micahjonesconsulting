You are reviewing an execution brief before it is handed to an executor. Read-only: do not edit any file.

Brief: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/pass-111b-services-boxes-and-rail.md
Repo (worktree): C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Verify the brief's premises against the live files it names before you judge anything. Files to read: app/(foyer)/services/page.tsx, app/(foyer)/packages/page.tsx, app/(foyer)/call/page.tsx, components/color-worlds/BookCallForm.tsx, components/color-worlds/PriceBox.tsx, components/BuyButton.tsx, app/actions/package-checkout.ts, app/api/stripe/webhook/route.ts, lib/package-delivery.ts, lib/catalog.ts, scripts/retired-phrases-gate.mjs, scripts/layout-gate.mjs, scripts/axe-worlds.mjs, .planning/exec/gates112.sh, .planning/exec/shots112.mjs, the .cw-pbox rules in app/globals.css, docs/LESSONS_LEARNED.md entries #19 to #23, and node_modules/next/dist/docs for searchParams and server actions in this Next.js version.

Report, in this order, each item with file and line evidence:
1. PREMISE ERRORS: any claim in the brief about the current code that is false (a line number, a prop, a class, a string that does not exist as quoted).
2. EXECUTION AMBIGUITIES: any instruction an executor could implement two ways; propose the one wording that removes the ambiguity.
3. BREAKAGE RISKS: anything in sections 3 (rail), 4 (CSS) or 7 (battery) that would fail tsc, the build, the gates, or a served check as written. Pay attention to: the retired-phrases self-test near miss "advisory from $5K a month" versus the planted "start at $5K a month"; whether "Scoped" as a term string collides with the served check that expects zero "Scoped" figures; whether the copy-lint banned list (lib/banned.ts) rejects any exact string in section 2; whether the layout gate's number-range rule will flag "6-20 weeks" or "3-8 months" inside a .cw-nowrap span; whether Stripe's checkout.sessions.create accepts a dropdown custom field with no default on every SKU; whether the Next.js version's searchParams is a Promise.
4. COPY: any sentence in section 2 that is not first person, exceeds 25 words, uses an em-dash, or makes a claim the LESSONS #3 ledger does not support.
5. WHAT IS MISSING: a surface that still renders "Frontier AI engineering", "End-to-end product building", "$5K a month" as a blanket claim, or the old Audit flavor names after the brief is executed.

Write the report to the -Out path as markdown with those five headings. Be terse; evidence over opinion. Do not propose design changes.
