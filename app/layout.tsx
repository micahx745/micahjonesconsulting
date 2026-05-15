// Phase 1 scope: <html> + <body>, fonts attached, default metadata.
//
// PHASE 2 will add to this file (TRANS-01..05, LENIS-01..05, ANALY-01):
//   - <ViewTransition name="root"> wrapping {children} (import from 'react')
//   - <LenisProvider> client component wrapping the ViewTransition
//   - <Analytics /> + <SpeedInsights /> from @vercel/analytics/next and /speed-insights/next
//
// Phase 1 leaves slots empty so Phase 2 can drop them in without restructuring.
import type { Metadata } from "next";
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them.",
  metadataBase: new URL("https://micahjonesconsulting.com"),
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
      <body>{children}</body>
    </html>
  );
}
