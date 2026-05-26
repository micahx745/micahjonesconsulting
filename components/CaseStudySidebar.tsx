// components/CaseStudySidebar.tsx
//
// Pass-22 (CW-18 Slice 1) — sticky sidebar for case-study pages.
//
// Solves the "40% void" problem Marcus called out in Pass-19: the
// centered 64ch body left empty space on both sides of the column
// at >=1024px viewports. This component fills the right-column void
// with a designed editorial sidebar that does useful work:
//
//   - Auto-built table of contents (from .case-study__body h2 nodes
//     scanned at mount). Click any TOC link to scroll-jump to that
//     section. IntersectionObserver highlights the active section.
//   - Reading-progress indicator (vertical bar to the left of the
//     TOC, scales from 0 → 1 as the body scrolls through view).
//   - Meta line (role / tools / year). Moved here from the header
//     where it previously sat as a horizontal line beneath the Dek.
//
// Mobile (<1024px): sidebar hides entirely via CSS. The header
// re-shows the meta line via a fallback selector — see globals.css
// `.case-study__header-meta-fallback` rule.
//
// No-JS / pre-hydration: server renders the sidebar element with
// empty TOC and progress (data-render="server"). The header's
// fallback meta line is visible by default and only hides when
// JS confirms the sidebar is wired (data-render="client").
//
// Reduced-motion: scrollspy IntersectionObserver still fires but TOC
// link clicks jump instantly. Reading-progress bar still updates
// (transform: scaleY is a property change, not a kinetic animation).
"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/LenisProvider";

interface CaseStudySidebarProps {
  role: string;
  tools: readonly string[] | string[];
  year: string | number;
}

interface TocEntry {
  id: string;
  text: string;
}

/**
 * Generate a URL-safe id from a heading's text. Simple slugify; no
 * lookup of an existing utility — three lines aren't worth a shared
 * module here.
 */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function CaseStudySidebar({ role, tools, year }: CaseStudySidebarProps) {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [toc, setToc] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Build TOC from h2 nodes on mount. Inject id attributes if missing
  // so the anchor links resolve. Defer to next animation frame so the
  // MDX body has finished hydrating into the DOM.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raf = requestAnimationFrame(() => {
      const headings = document.querySelectorAll<HTMLHeadingElement>(
        ".case-study__body h2",
      );

      const entries: TocEntry[] = [];
      const seen = new Set<string>();

      headings.forEach((h) => {
        const text = h.textContent?.trim() ?? "";
        if (!text) return;
        let id = h.id || slugify(text);
        // De-duplicate ids in case two headings produce the same slug.
        let counter = 2;
        while (seen.has(id)) {
          id = `${slugify(text)}-${counter++}`;
        }
        seen.add(id);
        if (!h.id) h.id = id;
        entries.push({ id, text });
      });

      setToc(entries);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // Scrollspy via IntersectionObserver. The rootMargin biases toward
  // the upper third of the viewport — a heading needs to scroll past
  // ~30% from the top to register as "active." Avoids the active
  // state flickering between two adjacent sections at boundary.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (toc.length === 0) return;

    const headings = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost intersecting heading. If none is currently
        // intersecting (e.g., between sections), keep the last active.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (intersecting[0]) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [toc]);

  // Reading progress through the body. Lenis lerps scroll, so we use
  // the useLenis subscriber to recompute on every scroll tick. Falls
  // back to a no-op when Lenis is short-circuited (reduced-motion).
  useLenis(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const body = document.querySelector<HTMLElement>(".case-study__body");
    if (!body) return;

    const rect = body.getBoundingClientRect();
    const vh = window.innerHeight;
    // start: top of body at bottom of viewport (rect.top = vh) -> 0
    // end:   bottom of body at top of viewport (rect.bottom = 0) -> 1
    const total = rect.height + vh;
    const scrolled = vh - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / total));
    sidebar.style.setProperty("--read-progress", String(progress));
  });

  function handleTocClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    // Update URL hash without firing a navigation (so the user can
    // copy-paste the deep link to a specific section).
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <aside
      ref={sidebarRef}
      className="case-study__sidebar"
      data-render="client"
      aria-label="Case study navigation"
    >
      {toc.length > 0 ? (
        <nav className="case-study__sidebar-section" aria-label="On this page">
          <p className="case-study__sidebar-label">On this page</p>
          <div className="case-study__sidebar-toc-frame">
            <div className="case-study__sidebar-progress" aria-hidden />
            <ol className="case-study__sidebar-toc">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="case-study__sidebar-toc-link"
                    data-active={activeId === entry.id ? "true" : undefined}
                    onClick={(e) => handleTocClick(e, entry.id)}
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      ) : null}

      <div className="case-study__sidebar-section">
        <p className="case-study__sidebar-label">Engagement</p>
        <dl className="case-study__sidebar-meta">
          <dt>Role</dt>
          <dd>{role}</dd>
          <dt>Tools</dt>
          <dd>{tools.join(", ")}</dd>
          <dt>Year</dt>
          <dd>{year}</dd>
        </dl>
      </div>
    </aside>
  );
}
