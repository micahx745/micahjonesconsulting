// v2 Footer — minimal. Copyright + mailto. No newsletter. No socials.
// Per spec §6: "Reject... a separate /services page... a blog."
export function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer__inner">
        <p className="v2-footer__copy">
          © {new Date().getFullYear()} Micah Jones · Oakland, CA · Issue 01
        </p>
        <a
          href="mailto:hello@micahjonesconsulting.com"
          className="v2-footer__mailto"
        >
          hello@micahjonesconsulting.com
        </a>
      </div>
    </footer>
  );
}
