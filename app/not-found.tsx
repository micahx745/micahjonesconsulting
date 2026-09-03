// app/not-found.tsx
//
// W4 (P2-6, 2026-08-11) — branded 404. The review found the default
// Next.js "404 — This page could not be found." serving on dead routes
// (contact-404-1440.png). This is the one-line system-styled version:
// terracotta world, Bricolage display, mono links, logistics footer.
//
// Root-level not-found renders inside the root layout only (no route
// group chrome), so it stamps its own data-mode="cw" wrapper to pick up
// the Color Worlds tokens. Static, zero client JS, zero motion.
import { PageFooter } from "@/components/color-worlds/PageFooter";

export default function NotFound() {
  return (
    <div data-mode="cw" className="cw-notfound-root">
      <main className="cw-notfound" data-world="terracotta">
        <p className="cw-notfound__code" aria-hidden>
          404
        </p>
        <h1 className="cw-notfound__line">That page isn&rsquo;t here.</h1>
        <p className="cw-notfound__links">
          <a href="/" className="cw-mlink">
            Back to home <span aria-hidden>→</span>
          </a>
          <a href="/work" className="cw-mlink">
            See the work <span aria-hidden>→</span>
          </a>
        </p>
        <PageFooter />
      </main>
    </div>
  );
}
