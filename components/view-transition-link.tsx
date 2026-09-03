// components/view-transition-link.tsx
//
// Phase 2 — TRANS-04. A drop-in wrapper around next/link that wraps the
// router push in document.startViewTransition() with a feature-detect
// fallback to instant navigation on browsers that don't support it
// (Safari <18, Firefox <144 as of May 2026).
//
// Phase 2 ships the file. Phase 3's <Nav> and Phase 6's foyer pages will
// import it. Until then, it's dormant and adds zero bytes to the bundle
// if nothing imports it.
//
// Source: PITFALLS.md C3 (SSR safety) + D1 (browser-compat gaps);
//         Vercel Labs react-view-transitions-demo reference impl.
"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type ViewTransitionLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps next/link so the navigation occurs inside document.startViewTransition()
 * when supported, falling through to plain router.push() on Safari <18 and
 * Firefox <144. The transition handler is set up to be a no-op DOM swap;
 * the actual cross-fade comes from the ::view-transition-old/new(root) CSS
 * keyframes in globals.css.
 *
 * Usage (Phase 3+):
 *   <ViewTransitionLink href="/work/ordani">ORDANI ↗</ViewTransitionLink>
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modifier-clicks (open-in-new-tab, etc.) pass through to next/link.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.button !== 0) return; // not a left-click

    e.preventDefault();

    const target =
      typeof href === "string"
        ? href
        : ((href as { pathname?: string }).pathname ?? "/");

    // PITFALLS.md C3 + D1 — feature-detect.
    // SSR guard (typeof document) is belt-and-suspenders; this is a
    // 'use client' component so document is always defined at handler
    // call time — but the type-narrow keeps strict-mode TS happy.
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Note: startViewTransition is now typed in TS 6.0.3+ lib.dom.d.ts.
      // Earlier versions required @ts-expect-error here; the type now exists natively.
      document.startViewTransition(() => router.push(target));
    } else {
      // Safari <18, Firefox <144 — instant nav, no cross-fade.
      router.push(target);
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
