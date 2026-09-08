// components/room/Foot.tsx — section 09, the foot. ONE foot, both groups.
//
// Pass-101 phase 2, recomposed by §18.
//
// WHAT THIS CLOSES. The branch shipped TWO chrome languages: the home's foot
// was a single thin centred row (email · reply promise · "MICAH JONES"), while
// /about, /work, /playbook, /packages and /call got a different one carrying a
// LinkedIn link and "© 2013–2026 MICAH JONES". Two foots across one site, and
// §18's foot ruling is explicit that the copyright range is not one of the
// devices: "No copyright range (no years)."
//
// §18: "A 1px bone-15% hairline across the top. Three columns on the grid,
// align-items:start: cols 1-4 `Micah Jones` at 24px Hanken 500 + the email at
// 17px 60%; cols 6-8 the four nav labels (`Record` · `Playbook` · `Packages
// from $500` · `Name the problem`) as 17px rows 12px apart; cols 10-12 `The
// 80% Wall` + `$99 at launch` + the chip `Get chapter one free →`."
//
// TWO DEPARTURES, both on the record.
//   1. The LinkedIn link STAYS. §18's three columns do not name it, but it is
//      a live link and this pass does not delete links (brief §0). It joins
//      the nav column as its last row, which is the column links belong to.
//   2. The reply promise. §18 moves it out of the foot and into the copper
//      ask — which exists on the HOME only. The pages under app/(room) have no
//      ask, so dropping it there would lose live copy from five routes. The
//      `promise` prop keeps it in the identity column exactly where those
//      pages already carried it, and the home renders the foot without it
//      because the ask now says it at 19px on copper.
//
// Every string here is live: all five were already rendered by one of the two
// foots this replaces, or by the manual section (the book title, the price
// line and the chip label). Nothing is composed.
//
// Server Component. No motion, no client JS.
import Link from "next/link";

const NAV = [
  { href: "/work", label: "Record" },
  { href: "/playbook", label: "Playbook" },
  { href: "/packages", label: "Packages from $500" },
  { href: "/call", label: "Get a reality check" },
];

export function Foot({
  className = "foot",
  chipClass = "chip",
  promise = false,
}: {
  className?: string;
  chipClass?: string;
  promise?: boolean;
}) {
  return (
    <footer className={className} aria-label="Site footer">
      <div className="row">
        <div className="who">
          <span className="nm">Micah Jones</span>
          <a href="mailto:micah@micahjonesconsulting.com">
            micah@micahjonesconsulting.com
          </a>
          {promise ? (
            <span className="say">
              I read every message and reply inside one business day.
            </span>
          ) : null}
        </div>
        <nav className="nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/micah-j/"
            rel="me noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </nav>
        <div className="book">
          <span className="ttl">The 80% Wall</span>
          <span className="pr">$99 at launch</span>
          <Link className={chipClass} href="/playbook">
            <span className="t">Get chapter one free</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
