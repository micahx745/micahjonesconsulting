// components/v3/specimen/SpecimenNav.tsx
//
// Minimal nav — plate-numbered links across the top. No wordmark on the
// left, no CTA pill on the right. Just numbered plates: an index strip.
// Sits at top with hairline rule below.
import Link from "next/link";

interface Plate {
  href: string;
  label: string;
  num: string;
  sub?: string;
}

const PLATES: readonly Plate[] = [
  { href: "/v3", label: "Setting", num: "0001" },
  { href: "/v3/work/ordani", label: "Specimen", sub: "Ordani", num: "0002.01" },
  { href: "/v3/work/gtm", label: "Specimen", sub: "GTM", num: "0002.02" },
  { href: "/v3/work/tech", label: "Specimen", sub: "Tech", num: "0002.03" },
  { href: "/v3/about", label: "Practice", num: "0003" },
  { href: "/v3/contact", label: "Colophon", num: "0004" },
];

export function SpecimenNav() {
  return (
    <nav className="v3-nav" aria-label="Plate index">
      <Link href="/v3" className="v3-nav__masthead">
        <span className="v3-nav__masthead-name">Micah Jones</span>
        <span className="v3-nav__masthead-detail">— Set in Oakland, CA</span>
      </Link>
      <ul className="v3-nav__plates">
        {PLATES.map(({ href, label, sub, num }) => (
          <li key={num}>
            <Link href={href} className="v3-nav__plate">
              <span className="v3-nav__plate-num">{num}</span>
              <span className="v3-nav__plate-label">
                {label}
                {sub ? <span className="v3-nav__plate-sub"> {sub}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
