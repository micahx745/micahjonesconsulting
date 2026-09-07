// app/(room)/layout.tsx
//
// PASS-101 PHASE 3 — the route group that carries the Room and Ledger system
// on every page that is not the home (WINNING-BRIEF-2026-09-05 §16.4; brief
// §3: packages / playbook / work / call / about).
//
// WHY A NEW GROUP RATHER THAN A FLAG ON (foyer).
//   Mode is route-determined on this site and there is no toggle — that rule
//   is in .claude/CLAUDE.md and it holds here. (foyer) mounts the Color Worlds
//   chrome: <Grain>, the Bricolage <Nav>, <WorldSwitcher>, <ScrollReveal>.
//   None of that belongs on a Room and Ledger page, and none of it can be
//   conditionally removed without giving the layout a mode switch. A second
//   group is the cheaper and more honest move: route groups do not appear in
//   the URL (node_modules/next/dist/docs/01-app/03-api-reference/03-file-
//   conventions/route-groups.md), so /packages, /playbook, /work, /call and
//   /about keep their addresses to the byte. This is NOT a second ROOT layout
//   — app/layout.tsx is still the only one — so navigation between the groups
//   stays a client transition, which is what that doc's first caveat is about.
//
// THE WRAPPER KEEPS data-mode="cw" AND ADDS id="rl-root".
//   The shared client components these pages still render (BookCallForm,
//   BuyButton, PlaybookSignupForm, PortraitImage) carry cw- class names, and
//   their rules are scoped to [data-mode="cw"]. Dropping the attribute would
//   strip a live booking form of every style it has. So the attribute stays as
//   the BASE and app/room-and-ledger.css overrides it from #rl-root, which
//   out-specifies every one of those rules. The variables that stylesheet
//   repoints — including --font-cw-display, which is where Bricolage came
//   from — do the rest in one move.
//
// THE BOOT SCRIPT.
//   Two lines, inline, executed during parse so it lands before the first
//   paint. It is the ONLY thing that turns the motion set on: every pre-state
//   in room-and-ledger.css is behind html.rl-js. With scripting off, or with
//   prefers-reduced-motion: reduce, the class is never set and the page's
//   rest state — the finished frame — is what renders. (§16.3: "Rest states
//   are always the finished frame".)
import type { ReactNode } from "react";
import { SiteBar } from "@/components/room/SiteBar";
import { SiteFoot } from "@/components/room/SiteFoot";
import { SiteMotion } from "@/components/room/SiteMotion";
import "../room-and-ledger.css";

const BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('rl-js')}}catch(e){}`;

export default function RoomLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div id="rl-root" data-mode="cw">
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: BOOT }}
      />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <SiteBar />
      {/* tabIndex={-1} so the skip link can programmatic-focus <main> without
       * making it a tab stop in the regular nav flow. */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFoot />
      <SiteMotion />
    </div>
  );
}
