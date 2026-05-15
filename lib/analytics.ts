// lib/analytics.ts
//
// Phase 10 — ANALY-02. Thin typed wrapper around @vercel/analytics for the
// project's custom events. Only one event today: case_study_read_complete.
//
// The wrapper exists so:
//   1. Event names are typed (no string drift across call sites).
//   2. Properties are constrained per event.
//   3. Test environments can short-circuit by checking
//      `typeof window === 'undefined'` (track() is a no-op on server anyway,
//      but the explicit guard makes intent obvious).
//
// ANALY-03 invariant: no third-party analytics (Mixpanel/Segment/PostHog/GA4).
// This file imports only @vercel/analytics, which is already mounted at the
// root layout via <Analytics /> (Phase 2).
//
// Source: REQUIREMENTS.md ANALY-02; @vercel/analytics track() docs.
import { track } from "@vercel/analytics";

/**
 * Fires the `case_study_read_complete` event. Called by
 * components/CaseStudyReadTracker.tsx when scroll depth on a /work/* route
 * crosses 90% for the first time in a session.
 *
 * Per ANALY-02, this fires AT MOST ONCE PER SESSION per slug. The component
 * uses sessionStorage to dedupe — this function does not need to track that
 * state itself (keeps the wrapper simple).
 */
export function trackCaseStudyReadComplete(slug: string): void {
  if (typeof window === "undefined") return;
  track("case_study_read_complete", { slug });
}
