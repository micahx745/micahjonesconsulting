# PREMISE ERRORS

- `#shapes` does not currently have `aria-label="The four engagement shapes"` as claimed. It has `aria-labelledby="cw-sv-shapes-title"` (`app/(foyer)/services/page.tsx:425-429`).
- `.cw-pband--pkgs .cw-pbox__name { min-height: 1.96em; }` is not a new rule; it already exists (`app/globals.css:2882-2884`).
- `SERVICES_LD` will not remain unchanged except for titles: it maps `SERVICES` in array order (`app/(foyer)/services/page.tsx:225-242`), while §6 reorders that array (`brief:304-311`).
- Updating only `lib/catalog.ts` does not update Stripe’s product description. Stripe setup mirrors a separate hard-coded catalog (`scripts/stripe-setup.mjs:9-11,25-26,42-46`) and sends that description on product creation (`scripts/stripe-setup.mjs:70-73`); checkout only uses the lookup key (`app/actions/package-checkout.ts:43-64`).
- There are no fixed self-test counts to “update.” They are calculated from `caught` and `passed` (`scripts/retired-phrases-gate.mjs:245-267`).

# EXECUTION AMBIGUITIES

- Deleting the shapes H2 leaves its current `aria-labelledby` dangling. Replace `brief:43` with: “Replace `aria-labelledby="cw-sv-shapes-title"` with `aria-label="The four engagement shapes"` before deleting the H2.” Evidence: `app/(foyer)/services/page.tsx:425-440`.
- “Markup exactly as DIRECTION” conflicts with the brief’s error behavior: DIRECTION uses populated text plus `hidden` (`.planning/design/DIRECTION-110.md:193-202`); the brief requires initially empty text (`brief:246-251`). Use: “Render `<p className="cw-pick__err" role="alert">{error}</p>` without `hidden`; initialize `error` to `""` and set the exact message in the guard.”
- The brief never explicitly says to pass the selected area into each services-band `BuyButton`. Use: “Each `PackageBand` BuyButton receives `area={area ?? undefined}` and the guard; home and `/packages` BuyButtons omit `area`.” Evidence: `brief:217-220,238-251`.
- Radio `event.currentTarget.value` is `string`, but state is `AreaValue | null` (`brief:244-245`). Use: “Validate `v` with `isAreaValue(v)` before `setArea(v)`.”
- `areaLabel` behavior for an invalid string is unspecified (`brief:205-213`). Use: “Return the matching label, otherwise `null`.”
- Specify the proof indices rather than only naming receipts: AI `0`, Product `0`, Positioning `2`. Evidence: `app/(foyer)/services/page.tsx:84-110,130-147,164-173`.
- “Record each shape box’s height” conflicts with “all seven box heights” (`brief:359-360,376`). Use: “Record and assert all seven `.cw-pbox` heights.”
- “Prettier on every touched file” conflicts with the source battery’s deliberate markdown exclusion (`.planning/exec/gates112.sh:23-25`). Name the supported `.ts`, `.tsx`, and `.mjs` paths explicitly; exclude markdown and `gates111b.sh`.
- Repeated `?shape=` values can produce `string[]` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md:111-120`). Specify that non-string values are rejected.

# BREAKAGE RISKS

- Literal `metadata: { product }` fails TypeScript because the action has no `product` variable (`brief:217-220`; current variables at `app/actions/package-checkout.ts:27-28`). It must be `metadata: { product: sku.lookupKey }`.
- With `set -u` (`.planning/exec/gates112.sh:4`), the double-quoted label `"$5K on /services"` treats `$5` as an unset positional parameter and aborts (`brief:325`). Escape the dollar in the label.
- `curl -s '$S/call?...'` does not expand `$S`, so the advisory prefill check cannot return the expected result (`brief:336-337`).
- The `$5K` served count cannot be `1`: the retained metadata replacement contains `$5K` (`brief:183-185`) and the Advisory box adds another (`brief:74-75`).
- `grep -o 'class=\"cw-pbox '` only matches lead boxes because ordinary boxes render exactly `class="cw-pbox"` (`components/color-worlds/PriceBox.tsx:40-43`). The brief defines only Embedded and Audit as `lead` (`brief:70,155`), not seven matches.
- The capture plan totals 25 PNGs, not 23: the static matrix produces 21 (`brief:345-353`) and the two scripted states at two widths add four (`brief:355-360`).
- A literal “Prettier on every touched file” includes the new `.sh`; Prettier has no shell parser. The source battery limits formatting to supported code paths (`.planning/exec/gates112.sh:23-25`).
- Served checks only print counts; none asserts the expected value or changes the exit status (`brief:323-339`). The battery can finish despite a mismatch.

Verified non-risks:

- `"advisory from $5K a month"` does not contain the planted retired phrase `"start at $5K a month"`; matching is case-insensitive substring matching (`scripts/retired-phrases-gate.mjs:138-143`).
- `"Scoped"` is rendered in `.cw-pbox__term`, not immediately after `.cw-pbox__fig` (`components/color-worlds/PriceBox.tsx:60-68`), so the figure-only grep does not collide.
- No §2 string matches `lib/banned.ts:9-55`; copy-lint uses word boundaries for single words and literal multi-word matching (`lib/copy-lint.ts:20-27`).
- `.cw-nowrap` sets `white-space: nowrap` (`app/globals.css:2240-2242`), so the range detector cannot observe `6-20` or `3-8` on multiple lines (`scripts/layout-gate.mjs:148-177`).
- Stripe accepts the dropdown without a default: `default_value` is optional (`node_modules/.pnpm/stripe@22.6.0_@types+node@22.19.19/node_modules/stripe/cjs/resources/Checkout/Sessions.d.ts:3118-3127`). Omitting `optional` makes the field required because it defaults to `false` (`…/Sessions.d.ts:2484-2488`).
- `searchParams` is a Promise in this Next.js version and must be awaited (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md:67-77,111-120`). Importing and invoking a server action from a client event handler is supported (`node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md:133-155,280-306`).

# COPY

- Non-first-person sentences occur at `brief:78,83,85-90,108-110,112-113,142-151,164,166,170-172,174,179,185-188`.
- The area copy inherited from `SERVICES` also contains non-first-person sentences at `app/(foyer)/services/page.tsx:78-82,103,124-128,132,154,160-166`.
- No §2 sentence exceeds 25 words, and no §2 new-copy string contains an em dash.
- The current #3 ledger does not support the new commercial terms and deliverables in `brief:75-92,143,158-179,185`. Its relevant existing entries cover week-one scoping, month-one shipping, and one-business-day replies (`docs/LESSONS_LEARNED.md:150-163`), plus the cited receipts (`docs/LESSONS_LEARNED.md:100-113,215-238,261-272`). The broad approval record is only proposed for insertion by `brief:191-194`; it is not yet in the live ledger, which currently reaches `**Gate:**` at `docs/LESSONS_LEARNED.md:329`.

# WHAT IS MISSING

- `/work` will still visually state blanket pricing: “Engagements … from $5K a month” (`app/(foyer)/work/page.tsx:178-187`).
- `/llms.txt` will still state all engagements are “from $5K a month” (`app/llms.txt/route.ts:26-28`); §2.8 only changes its area names (`brief:189`).
- `/packages` JSON-LD will still describe the Audit as “build, production, or traction” because `PACKAGES_LD` is explicitly left unchanged (`app/(foyer)/packages/page.tsx:46-76`; `brief:58`).
- Stripe’s setup catalog still carries “Build, Production, or Traction” (`scripts/stripe-setup.mjs:42-46`), and the live Stripe description update is explicitly parked (`brief:410-413`).
- No additional rendered `Frontier AI engineering` or `End-to-end product building` surface remains after the specified `/services` and `/llms.txt` edits; remaining matches are comments (`app/(foyer)/page.tsx:205-215`, `components/color-worlds/Hero.tsx:216-225`).