// components/Footer.tsx
//
// Phase 3 — FOYER-10 + roadmap success criterion #4.
//
// Mode-aware footer carrying the two-business-day reply promise + email
// pointer. Mode awareness comes from ancestor [data-mode="foyer" | "theater"]
// (Phase 4 group layouts). Component carries data-footer-root so the rule
// color and ink color can flip per mode via CSS.
//
// Server Component — no interactivity beyond the mailto: link, which is a
// plain <a> (never goes through the router so no ViewTransitionLink needed).
//
// Source: blueprint §7 (Home footer wireframe), §8 (voice — first person,
//         specific numbers, no banned words), §4b (--rule-foyer / --rule-theater
//         color tokens), REQUIREMENTS.md FOYER-10.
export function Footer() {
  return (
    <footer data-footer-root aria-label="Site footer">
      <p className="footer-promise">
        I read every message and reply inside two business days.
      </p>
      <p className="footer-email">
        Or write to me directly:{" "}
        <a
          href="mailto:micah@micahjonesconsulting.com"
          className="footer-email-link"
        >
          micah@micahjonesconsulting.com
        </a>
      </p>
    </footer>
  );
}
