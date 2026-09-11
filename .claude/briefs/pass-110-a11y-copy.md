# Pass 110: the no-decision fixes. Accessibility the new gate found, and five copy rulings

Executor: GLM 5.3. You IMPLEMENT and VERIFY. You do NOT commit, push or deploy.
Worktree: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live
Branch: design/live-evolve. Read first: .claude/RESUME.md, CLAUDE.md, .claude/CLAUDE.md,
docs/LESSONS_LEARNED.md entries #3 and #19.

NOTE ON THIS FILE. Plain ASCII, no command flags at line starts. Every command with flags
lives in .planning/exec/gates110.sh and .planning/exec/shots110.mjs. Run those.

## The one rule behind sections 1 to 5

The home page and /services cross-fade ONE palette between four worlds. WorldSwitcher
writes --cw-bg, --cw-fg and --cw-accent onto the [data-mode="cw"] root, so every element
sits on whichever world is centred. Worlds: terracotta bg #9E3C25 fg #ECE3D0 accent
#2A1F18; bone bg #ECE3D0 fg #2A1F18 accent #9E3C25; petrol bg #1A4548 fg #ECE3D0 accent
#C9982F; espresso bg #2A1F18 fg #ECE3D0 accent #9E3C25. So: text is inherit or --cw-fg; a
fill that carries text is --cw-fg with a --cw-bg label (see .cw-buy in app/globals.css);
never --cw-accent under or as text; never a fixed fill under inherited text; never opacity
on text. A fixed fill is allowed only with a fixed text colour that passes on that fill.

## 1. Home doors panel (worst finding: 1.38:1)

Markup: the doors-band section near the end of app/(foyer)/page.tsx (.cw-door--build is a
div, .cw-door--sell is an a). CSS: app/globals.css around lines 2058 to 2150.
Cause: three LATER rules written for the old /services doors, which Pass-108 removed,
override the home doors: around line 6628 `[data-mode="cw"] .cw-door { color: inherit; }`,
around 6685 `.cw-door__kicker { opacity: 0.72 }`, around 6713 `.cw-door__body { opacity: 0.9 }`.
With the bone world centred they paint espresso-family text on the petrol and terracotta
door fills. Separately `.cw-door__cta` is saffron: 4.03:1 on petrol, 2.56:1 on terracotta.
Fix:
a. grep app and components for each of .cw-door, .cw-door__kicker, .cw-door__body,
   .cw-door__name, .cw-door__go, .cw-door__receipt. Expected: .cw-door, __kicker, __body only
   in the home doors-band; __name, __go, __receipt nowhere. Delete the leftover rules from the
   Pass-76b block (around 6620 to 6790) that grep proves serve no element. KEEP every
   .cw-door__case rule: /services uses it for its proof card.
b. .cw-door--build and .cw-door--sell: set color to var(--color-cw-bone) in place of the hex
   literals #e9f2f0 and #fbf0e7. Bone on petrol is 8.28:1, bone on terracotta 5.27:1.
c. Remove opacity from .cw-door__kicker and .cw-door__body (around 2073 and 2092).
d. .cw-door__cta: color inherit instead of saffron. Keep the arrow nudge.
e. The panel hover uses filter brightness(1.08). Compute bone on the brightened terracotta in
   Python. If it drops below 4.5:1, replace the filter with an inset ring:
   box-shadow inset 0 0 0 2px currentColor. Report the number either way.

## 2. Ordani beta submit button (2.05:1)

The generic `[data-mode="cw"] .cw-signup button` rule (around line 3711) paints a bone label
on var(--cw-accent), which is saffron in the petrol world. The scoped override
`.cw-ordani .cw-signup button` never matches: the section's class is now cw-ord.
Fix: the generic rule becomes background var(--cw-fg) and color var(--cw-bg). Delete the
dead override. Grep for cw-ordani in app and components; if no element carries it, delete
every `.cw-ordani ...` rule in globals.css. Capture the /playbook signup form too
(PlaybookSignupForm uses the same class) so the report shows it still reads well.

## 3. Accent in hover and focus states (axe cannot see these)

Six rules paint --cw-accent in a state. Fix each; the reference is the Pass-109 .cw-mlink
fix (search globals.css for "Pass-109 (review, contrast lens)").
a. Generic focus ring (around 1350, a, button, input :focus-visible): outline colour
   var(--cw-fg). Update its comment, which says it uses the accent.
b. .cw-work-item:hover .cw-work-item__title (around 1458): keep the colour, underline instead
   (text-decoration underline, thickness 2px, offset 0.15em).
c. .cw-section-cta:hover and :focus-visible (around 2815): color inherit, border-bottom-color
   currentColor, box-shadow 0 1px 0 currentColor.
d. .cw-service__anchor-link:hover and :focus-visible (around 3124): same as c.
e. .cw-pagefoot__row a:hover and :focus-visible (around 3206): color inherit, box-shadow
   0 1px 0 currentColor.
f. .cw-spec-scroll:focus-visible (around 3221): outline colour var(--cw-fg).

## 4. .cw-lede-link (4.4:1 on /services and /packages)

Around line 2540: color var(--cw-accent) and border var(--cw-accent) become color inherit and
border-bottom 1.5px solid currentColor. Its hover sets opacity 0.75 on text: replace with
box-shadow 0 1px 0 currentColor.

## 5. A static lint for accent in states, BLOCKING in the build

Write scripts/accent-states-lint.mjs (Node, no dependencies). Parse app/globals.css rule by
rule. Fail with exit 1, printing line number and selector, for any rule whose selector
contains [data-mode="cw"] (including inside an :is( group) AND contains :hover, :focus,
:focus-visible or :focus-within, and whose declarations set color, background,
background-color, border-color, any border-*-color, outline, outline-color,
text-decoration-color or box-shadow to a value containing --cw-accent. Selectors that are
theater-only are out of scope. Print "accent-states-lint: clean" when clean.
Wire it into package.json "build" right after scripts/retired-phrases-gate.mjs, so pnpm
build and Vercel both run it. Prove it catches the pattern: run it once against a temporary
COPY of globals.css with one bad rule appended, show the failing output, then delete the
copy. Never leave a bad rule in the real file. Add one sentence to the gate paragraph of
LESSONS #19 saying the state lint now exists and blocks the build.

## 6. "load-bearing" is banned everywhere

Operator, 2026-09-11, verbatim: "the term load bearing cannot be used anywhere on this site".
a. lib/banned.ts: add "load-bearing" and "load bearing" (lowercase, per the file's own
   conventions) and update the count in its header. Add both to .claude/brand.json voice.banned.
b. app/(foyer)/page.tsx, the Audit deliverable: "What is load-bearing, what is broken, and what
   to fix first." becomes "What works, what is broken, and what to fix first."
c. app/(foyer)/page.tsx, the Diagnose receipt: "write down what is load-bearing, what is broken,
   and what to fix first." becomes "write down what works, what is broken, and what to fix
   first."
d. app/api/stripe/webhook/route.ts line 3, a comment: "The load-bearing wall" becomes "The wall
   everything rests on". Comment only; change no code in that file.
e. docs/DESIGN_BAR.md line 233: "Load-bearing criteria" becomes "Core criteria".
Expected: the phrase survives only in lib/banned.ts, .claude/brand.json and the LESSONS ledger.

## 7. Name Guardicore in the /services proof card

Operator: "Yes good call on the guardicore thing". In app/(foyer)/services/page.tsx the card
reads "See how I helped a foreign company break into the North American market and get
acquired". It becomes "See how I helped Guardicore, a Tel Aviv security company, break into
the North American market and get acquired by Akamai". Both facts are in
content/work/guardicore.mdx (dek and indexLine). Leave the arrow span as it is.

## 8. Hero: drop the price and duration beside the pill

Operator: "get rid of the pricing and the two weeks besides the start audit bottom
(pointless)". In components/color-worlds/Hero.tsx remove the span with class cw-buy-meta and
unwrap the span with class cw-buy-group, so MagneticArea with the .cw-buy link is the first
child of .cw-cta-row. In the Pass-109 comment above it, add one sentence: Pass-110, operator
2026-09-11, the price and duration beside the pill were cut as pointless. Delete the
.cw-buy-group and .cw-buy-meta CSS rules and the lines in the .cw-buy comment block that
describe them.

## 9. Ledger

In docs/LESSONS_LEARNED.md #3, add two lines to the ledger: the Neuton.AI row tag stays 2025,
the acquisition year (operator 2026-09-11, verbatim: "for neuton 2025"), closing the 2025
versus 2020 question; and NEVER "load-bearing" or "load bearing" anywhere on the site (operator
2026-09-11), enforced by lib/banned.ts. Add both spellings to the #3 NEVER sweep list.

## 10. The gate's KNOWN list

scripts/axe-worlds.mjs carries KNOWN entries for the doors panel, the Ordani submit button and
.cw-lede-link. Delete each entry once its fix is in. Never add an entry. Update the KNOWN
comment block to say which pass cleared them.

## 11. Prove it

Run: bash .planning/exec/gates110.sh
It runs tsc, copy-lint, the vendor, retired-phrases and accent-states gates, prettier on the
touched files, the webpack build, restarts a server on port 3200, the render gate, the world
gate on / /services /packages, then the captures. Expected:
  tsc                 no output
  copy-lint           "Zero banned-word findings, zero schema violations."
  vendor              "vendor-gate: clean"
  retired phrases     "retired-phrases-gate: clean"
  accent states       "accent-states-lint: clean"
  build               "Compiled successfully"
  render-gate         "15 routes"
  axe-worlds          exit code 0, "0 not in KNOWN", KNOWN now empty, no COVERAGE FAIL
If pnpm build fails with a Turbopack font error you ran the wrong command; the script uses the
webpack path. That error is environmental and recorded. If a gate fails on something you
changed, fix it and re-run. If it fails on something you did not change, report and stop.
Then open every capture the script wrote to .planning/qa/pass-110/ and describe what you see.

## 12. Report and stop

Print every gate with its real output, the contrast numbers you computed, the list of files
you changed, and your description of each capture. Do NOT commit. Do NOT push.
