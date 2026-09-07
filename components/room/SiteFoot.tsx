// components/room/SiteFoot.tsx
//
// PASS-101 PHASE 3 — the Room and Ledger foot (WINNING-BRIEF §4 "10",
// template lines 566-570 and 1009-1017).
//
// Espresso, one row in the label style, nothing over 24px. The template's
// three items are the reply promise, the email and the name; the LinkedIn
// link and the copyright range come from the block this replaces
// (components/color-worlds/PageFooter.tsx), so nothing the live foot carried
// is dropped and no string is composed. Every one of these five is a live
// string moved, not rewritten.
//
// Server Component. No motion, no client JS.
export function SiteFoot() {
  return (
    <footer className="rl-foot" aria-label="Site footer">
      <div className="row">
        <a href="mailto:micah@micahjonesconsulting.com">
          <span className="rl-l now">micah@micahjonesconsulting.com</span>
        </a>
        <span className="rl-l">
          I read every message and reply inside one business day.
        </span>
        <a
          href="https://www.linkedin.com/in/micah-j/"
          rel="me noopener noreferrer"
          target="_blank"
        >
          <span className="rl-l">LinkedIn</span>
        </a>
        <span className="rl-l">© 2013–2026 Micah Jones</span>
      </div>
    </footer>
  );
}
