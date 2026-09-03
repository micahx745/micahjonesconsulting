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
export function PageFooter() {
  return (
    <footer className="cw-pagefoot" aria-label="Site footer">
      <p className="cw-pagefoot__promise">
        I read every message and reply inside two business days.
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
        {/* Pass-84, operator 2026-09-02: "Oakland, CA ... in many places that
            is irrelevant". The city chip came off; the copyright line below
            keeps his name because that is a legal notice, not decoration. */}
        <span aria-hidden>·</span>
        <span>© 2013–2026 Micah Jones</span>
      </p>
    </footer>
  );
}
