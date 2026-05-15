// app/layout.tsx
//
// Phase 2 adds: <ViewTransition> from 'react', <LenisProvider>, <Analytics />, <SpeedInsights />.
// Phase 1 contributions retained: fonts, default metadata, suppressHydrationWarning.
//
// Source: ARCHITECTURE.md §4.1 File 2; STACK.md §1 integration note 1.
// Order matters: LenisProvider is outermost (intercepts scroll for the whole doc);
// ViewTransition wraps {children} so cross-fade activates on route navigation.
// Analytics + SpeedInsights mount as siblings of the transition tree (not inside it)
// so they don't get caught in the cross-fade snapshot.
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { RevealMount } from "@/components/RevealMount";
import { EditorialTimestamp } from "@/components/EditorialTimestamp";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them.",
  // Temporary: production domain not yet wired to Vercel. Using the .vercel.app
  // alias so og:image URLs resolve on social link unfurls until DNS lands.
  // Flip back to "https://micahjonesconsulting.com" once the apex resolves.
  metadataBase: new URL("https://micahjonesconsulting.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          <ViewTransition>{children}</ViewTransition>
        </LenisProvider>
        <EditorialTimestamp />
        <RevealMount />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
