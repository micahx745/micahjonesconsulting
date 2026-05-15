# 10-C — Analytics: `case_study_read_complete` event

**Covers:** ANALY-02, ANALY-03
**Depends on:** Phase 2 (`@vercel/analytics` mounted at root)
**Estimated effort:** 30 minutes
**Files touched:** 2 new + 1 page wire

---

## Pre-flight

1. Confirm `@vercel/analytics` is in package.json (yes — v2.0.1, Phase 2).
2. Confirm `<Analytics />` is mounted in `app/layout.tsx` (yes — line 44).
3. Confirm no third-party analytics (Mixpanel/Segment/PostHog/GA4) are added — keep ANALY-03 invariant.

---

## Changes

### 1. Create `lib/analytics.ts`

Verbatim per 10-RESEARCH.md §3.1. Exports `trackCaseStudyReadComplete(slug: string)` that imports `track` from `@vercel/analytics` and fires `case_study_read_complete` with `{ slug }` as the property.

### 2. Create `components/CaseStudyReadTracker.tsx`

Verbatim per 10-RESEARCH.md §3.2. Client Component (`'use client'`). useEffect-based scroll listener. Threshold 90%. sessionStorage dedupe via `csrc:<slug>` key. Fires once per session.

### 3. Wire into theater page

Edit `app/(theater)/work/[slug]/page.tsx`:
- Add import: `import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";`
- Inside the returned `<article>`, before `<TitleCard>`, render `<CaseStudyReadTracker slug={slug} />`.

---

## Verification

1. `pnpm typecheck` clean.
2. `pnpm build` clean.
3. Manual: run `pnpm dev`, scroll a case study to >90%, check browser DevTools Network panel for a request to `_vercel/insights/event` (or similar) with `event: case_study_read_complete`. (Vercel Analytics may not fire on localhost without Vercel deploy; the event hook is verifiable via console.log instrumentation in the tracker if needed.)
4. Verify sessionStorage `csrc:<slug>` key is set after first fire.
5. ANALY-03 invariant grep: `grep -rE "@mixpanel|@segment|posthog|googletagmanager|GA4_ID" --include='*.ts' --include='*.tsx' --include='*.json' .` — expected zero output.

---

## Rollback

Both files additive; the page edit is a single line. Revert the page edit + delete the two files.
