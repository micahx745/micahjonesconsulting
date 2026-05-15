# Plan 05-E: Theater Stub Integration + Phase Verify

**Phase:** 05 TitleCard Signature Motion
**Requirements:** all of MOT-01..07 — this plan integrates Phase 5's components into the existing Phase 4 stub theater route and runs the phase verification suite
**Depends on:** 05-A, 05-B, 05-C, 05-D (all four prior plans executed and committed)
**Status:** Ready
**Estimated LOC:** small modification to `app/(theater)/work/[slug]/page.tsx` (~30 line change) + 1 new verify-output document

---

## Goal

Two-part deliverable:

1. **Integration** — replace the Phase 4 stub paragraph in `app/(theater)/work/[slug]/page.tsx` with a real `<TitleCard ...>` render. This makes Phase 5 verification possible: visiting `/work/test-slug` should now render the TitleCard with pin behavior.

2. **Verify** — run the full Phase 5 verification matrix and write `05-VERIFY-OUTPUT.md` documenting:
   - typecheck + build success
   - GSAP quarantine grep result (zero hits outside `components/TitleCard.tsx`)
   - Runtime: visit `/work/test-slug` and confirm pin behavior with Chrome DevTools MCP
   - Reduced-motion: emulate via DevTools Rendering panel, confirm resolved state renders immediately
   - Mobile reflow: emulate 390×844, confirm 64px word stack
   - OG image: visit `/work/test-slug/opengraph-image`, confirm 1200×630 PNG returned
   - Bundle inspection: confirm GSAP appears only in theater bundle, not foyer

---

## File Operations

### MODIFIED: `app/(theater)/work/[slug]/page.tsx`

Phase 4 stub becomes a Phase 5 TitleCard consumer. Stub content kept around as scroll-runway so the user can scroll past the pin.

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Phase 4 stub + Phase 5 TitleCard integration.
//
// Phase 5 replaces the stub paragraph with a real <TitleCard /> render so
// the signature motion is verifiable end-to-end on /work/test-slug. The
// route still uses the stub frontmatter from content/work/test-slug.mdx
// in Phase 7 — for Phase 5 we hard-code the props here as a stand-in.
//
// Phase 7 (MDX Infrastructure) will replace the hard-coded props with a
// frontmatter read of `titleCardWords` + `dek` from the MDX file. Phase 8
// fills in real case studies.
//
// Source: REQUIREMENTS.md MOT-03 (component composes correctly on a real
//         route); ROADMAP Phase 5 success criterion #1 (standalone test
//         route renders <TitleCard words={...} />).
import { TitleCard } from "@/components/TitleCard";
import { ViewTransitionLink } from "@/components/view-transition-link";

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Stub data for Phase 5. Phase 7 replaces this with frontmatter from
  // content/work/[slug].mdx; Phase 8 fills in real case studies.
  const stubData = {
    "test-slug": {
      words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
      caption: "A HIPAA-compliant CRM for birth workers.",
    },
  } as const;

  const data =
    stubData[slug as keyof typeof stubData] ?? {
      words: ["TEST", "ROUTE", "STUB"],
      caption: `Slug: ${slug}`,
    };

  return (
    <article>
      <TitleCard
        words={[...data.words]}
        caption={data.caption}
      />

      {/* Trailing content for scroll runway — needed so the user can scroll
          past the pin and see the resolve. Phase 8 replaces with MDX. */}
      <section style={{ minHeight: "100vh", padding: "128px 32px" }}>
        <p>
          <ViewTransitionLink href="/">back to foyer</ViewTransitionLink>
        </p>
      </section>
    </article>
  );
}
```

---

## Verification Matrix

### V1. Static checks

| # | Command | Expected |
|---|---------|----------|
| V1.1 | `pnpm typecheck` | clean (exit code 0) |
| V1.2 | `pnpm build` | clean — copy-lint passes, next build passes |
| V1.3 | GSAP quarantine grep (see below) | zero matches outside `components/TitleCard.tsx` |

GSAP quarantine grep:

```bash
# Find any GSAP import in TS/TSX, excluding TitleCard, node_modules, .next.
# Expected: zero output lines (besides "no matches" stderr).
grep -rE "import.*gsap|from ['\"]gsap" \
  --include='*.ts' --include='*.tsx' . \
  | grep -v 'node_modules\|\.next\|components[\\/]TitleCard\.tsx'
```

Run from the project root. Any non-empty output is a failure.

### V2. Runtime checks via Chrome DevTools MCP

| # | Action | Expected |
|---|--------|----------|
| V2.1 | Start `pnpm dev` in background | server listening on port 3000 |
| V2.2 | Navigate to `http://localhost:3000/work/test-slug` | TitleCard renders; word stack visible at top with theater background |
| V2.3 | Inspect DOM: `document.querySelector('[data-title-card]')` | exists; `data-phase="stacked"` initial |
| V2.4 | Inspect computed style of `.title-card-word` at desktop width 1440 | `font-size: 96px` |
| V2.5 | Resize to 390px width | `.title-card-word` font-size becomes `64px` |
| V2.6 | Scroll the page slowly | TitleCard pins at viewport top; timeline begins playing |
| V2.7 | Scroll past pin distance (~240px) | TitleCard unpins; resolved caption visible; trailing content scrolls past |
| V2.8 | Enable "Emulate CSS media feature `prefers-reduced-motion: reduce`" in DevTools Rendering panel; refresh | TitleCard renders with caption + hero visible IMMEDIATELY; no pin; scroll moves past component normally |

### V3. OG image check

| # | Action | Expected |
|---|--------|----------|
| V3.1 | `curl -sI http://localhost:3000/work/test-slug/opengraph-image` | `HTTP/1.1 200`; `Content-Type: image/png` |
| V3.2 | `curl -s -o /tmp/og.png http://localhost:3000/work/test-slug/opengraph-image && file /tmp/og.png` | identifies as PNG image |
| V3.3 | Visually inspect /tmp/og.png (Chrome DevTools MCP screenshot of the route) | 1200×630, theater ground bg, "ORDANI INTAKE. SECURE. SHIPPED." word stack, caption below |

### V4. Bundle check (optional but recommended)

| # | Action | Expected |
|---|--------|----------|
| V4.1 | After `pnpm build`, inspect `.next/static/chunks` for files containing GSAP | GSAP chunk present (route bundle for `/work/[slug]`) |
| V4.2 | Inspect chunks loaded for foyer `/` route | NO GSAP chunk present |

This is a sanity check — the GSAP quarantine grep is the primary contract.

---

## Output Artifact: `05-VERIFY-OUTPUT.md`

After running all verification steps, write `.planning/phases/05-titlecard/05-VERIFY-OUTPUT.md` with:

- **Verdict**: PASS / FAIL / PASS-WITH-CAVEATS
- **Requirement coverage table**: MOT-01..07, each with PASS/FAIL + evidence
- **Success criteria coverage**: ROADMAP Phase 5 criteria 1..5, each with PASS/FAIL + evidence
- **Static check results**: typecheck output, build output, grep output (verbatim)
- **Runtime check results**: which DevTools MCP captures were taken; screenshots saved under `.planning/phases/05-titlecard/verification-artifacts/` if any
- **Deviations**: any deviation from the plans documented with rationale
- **Open follow-ups**: pin distance calibration value chosen, any future tuning notes

If FAIL, document the specific failure and create a fix plan inline. Do NOT proceed to commit or roadmap update until PASS or PASS-WITH-CAVEATS.

---

## Acceptance

- `app/(theater)/work/[slug]/page.tsx` modified to render `<TitleCard>` with stub props
- `05-VERIFY-OUTPUT.md` exists with verdict PASS or PASS-WITH-CAVEATS
- All 7 MOT-* requirements have PASS evidence
- All 5 Phase 5 success criteria have PASS evidence
- GSAP quarantine grep returns zero lines
- OG route returns 1200×630 PNG

---

## Notes

### On Chrome DevTools MCP availability

Chrome DevTools MCP is registered via the harness (per PROJECT.md context). If for any reason the MCP is unavailable during verification, fall back to manual `pnpm dev` + browser open + visual confirmation. Document the verification method in 05-VERIFY-OUTPUT.md.

### On the pin distance calibration

PIN_DISTANCE_PX is set to 240 in `components/TitleCard.tsx`. Watch the V2.6 + V2.7 steps for whether the pin feels like ~600ms. If too fast (e.g., the pin barely registers before unpinning), increase to 320 or 400. If too slow (the pin feels stuck), decrease to 160 or 200. Record the final value in 05-VERIFY-OUTPUT.md.

### On the `noUncheckedIndexedAccess` interaction

TypeScript strict + `noUncheckedIndexedAccess` makes `stubData[slug]` return `value | undefined`. The page uses `stubData[slug as keyof typeof stubData]` to satisfy the indexer, plus a fallback with `??`. If TS errors complain about the `as keyof typeof stubData` cast, switch to a discriminated lookup with `if (slug in stubData) ...`. Either pattern is acceptable.

### Stretching past Phase 5

Phase 5 verification needs only `/work/test-slug` to work. It does NOT need:

- `/about`, `/work-with-me`, `/contact`, `/work` to render TitleCards (Phase 6)
- Real case-study MDX content (Phases 7-8)
- The portrait still on `/` (Phase 9)

Keep scope tight.
