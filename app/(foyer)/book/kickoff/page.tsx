// app/(foyer)/book/kickoff/page.tsx
//
// The kickoff call a PACKAGE BUYER has already paid for. Reached from
// /services/thanks and from the package delivery email. See
// components/color-worlds/BookPageBody.tsx for why this is a separate static
// route rather than a ?kickoff=1 search param.
//
// noindex: this is a post-purchase page. It should never appear in a search
// result offering a "kickoff call" to someone who has not bought anything.
// The render-gate skips META limits on noindex pages by design.
import type { Metadata } from "next";
import { BookPageBody } from "@/components/color-worlds/BookPageBody";

export const metadata: Metadata = {
  title: "Book the kickoff call",
  description:
    "Put the kickoff call for your package on the calendar. Thirty minutes, Tue to Thu, Pacific.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book/kickoff",
  },
};

export default function BookKickoffPage() {
  return <BookPageBody kickoff />;
}
