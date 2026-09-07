// app/(room)/page.tsx — the home, in the Room and Ledger system.
//
// Pass-101 phase 2 (brief §2). The verified template
// (.planning/design/winning/room-and-ledger.template.html, seven rounds) ported
// section by section into components/room/*. Nine sections in the template's
// own order: the bar (in the layout), the room, the operator, how I work,
// packages, the record, the manual, the objections, the ask, the foot.
//
// RETIRED HERE: <Hero> (the rolling word and the pointer drift), and with it
// the six Color Worlds sections the ruling dropped — the revenue-and-exits
// strip, the three-service teaser, the four operating principles, the Ordani
// block with its beta form, the shipped grid and the SplitReveal footer. §4 of
// the winning brief settles the page's order; sections the ruling dropped are
// not re-added.
//
// The metadata below is unchanged from the page this replaces: same title,
// same description, same canonical, same OG and Twitter cards. Nothing in this
// pass touches a live string, a price, a fact or a link.
import type { Metadata } from "next";
import { Room } from "@/components/room/Room";
import { Operator } from "@/components/room/Operator";
import { HowIWork } from "@/components/room/HowIWork";
import { Packages } from "@/components/room/Packages";
import { Receipts } from "@/components/room/Receipts";
import { Manual } from "@/components/room/Manual";
import { Objections } from "@/components/room/Objections";
import { Ask } from "@/components/room/Ask";
import { Foot } from "@/components/room/Foot";
import { RoomMotion } from "@/components/room/RoomMotion";

export const metadata: Metadata = {
  // Absolute title prevents the root template ("%s — Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute: "Micah Jones — Strategy and software, shipped by one person",
  },
  description:
    "Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in client revenue.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title: "Micah Jones — Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $20M+ in client revenue. Now building Ordani, in beta with paying users.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micah Jones — Strategy and software, shipped by one person",
    description:
      "Four exits behind my work, $5B+ combined. $20M+ in client revenue. Now building Ordani.",
  },
};

export default function Home() {
  return (
    <>
      {/* The light half of the page. The ask and the foot sit OUTSIDE it
          because they paint their own grounds and must stack above the sheet. */}
      <div className="page" id="page">
        <Room />
        <Operator />
        {/* the seam: the light travels here */}
        <HowIWork />
        <Packages />
        <Receipts />
        <Manual />
        <Objections />
      </div>
      <Ask />
      <Foot />
      <RoomMotion />
    </>
  );
}
