// components/color-worlds/PageFooter.tsx
//
// W3 (P1-7/R18, 2026-08-11) — the logistics footer for CW subpages.
// The review found /about, /work, /playbook, /hire-me ended on a bare
// back-link (no contact, no ©) and /services carried a sales pitch
// inside <footer>. This is the standard block: the reply promise
// (modeled on the case-page footer line the review praised), then
// contact · LinkedIn · location · © with a date range (DESIGN_BAR §3.6:
// time-depth as specific numbers).
//
// Server component. No motion, no client JS.
//
// Pass-125 (operator 2026-09-20, LESSONS #3 "PASS-124 FIRST MOVE AND THE
// AUDIENCE RULING"): the "Work with me full-time" page is linked from the
// footers and once from /about, never the primary nav. /full-time itself
// passes fullTimeLink={false} so its footer does not link to itself.
import { FULL_TIME } from "@/content/full-time";

export function PageFooter({
  fullTimeLink = true,
}: { fullTimeLink?: boolean } = {}) {
  return (
    <footer className="cw-pagefoot" aria-label="Site footer">
      <p className="cw-pagefoot__promise">
        I read every message and reply inside one business day.
      </p>
      <p className="cw-pagefoot__row">
        <a href="mailto:micah@micahjonesconsulting.com">
          micah@micahjonesconsulting.com
        </a>
        <span aria-hidden>·</span>
        <a
          href="https://www.linkedin.com/in/micah-j/"
          rel="me noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        {fullTimeLink ? (
          <>
            <span aria-hidden>·</span>
            <a href={FULL_TIME.path}>{FULL_TIME.linkLabel}</a>
          </>
        ) : null}
        {/* Pass-84, operator 2026-09-02: "Oakland, CA ... in many places that
            is irrelevant". The city chip came off; the copyright line below
            keeps his name because that is a legal notice, not decoration. */}
        <span aria-hidden>·</span>
        <span>© 2013–2026 Micah Jones</span>
      </p>
    </footer>
  );
}
