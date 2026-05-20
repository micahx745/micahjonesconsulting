// app/v3/page.tsx
//
// v3 Home — Plate 0001 (Setting) + Plate 0002 (Specimens index) +
// Plate 0003 (Practice excerpt). The Colophon foots the page.
//
// Every type element on this page has its actual specification exposed in
// the right-rail TypeMetadata aside. The numbers are real: if metadata
// says "92pt", the type is rendered at 92px. If it says "Tracking −2.8%",
// the letter-spacing value is -0.028em.
import type { Metadata } from "next";
import Link from "next/link";
import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";

export const metadata: Metadata = {
  title: "Micah Jones — Plate 0001 / Setting",
  description:
    "Hand-set marketing site for Micah Jones, Oakland operator. A series of typographic specimens.",
};

const SPECIMENS = [
  {
    plate: "Plate 0002.01",
    href: "/v3/work/ordani",
    title: "ORDANI",
    dek:
      "A new system of record for birth workers. HIPAA-compliant by design. Currently in private development.",
    meta: ["2025–2026", "Solo · research · design · build", "Private beta"],
  },
  {
    plate: "Plate 0002.02",
    href: "/v3/work/gtm",
    title: "Tens of millions in revenue",
    dek:
      "Go-to-market motion built at the seam between sales and product. Anonymized engagement across dozens of clients.",
    meta: ["2019–present", "GTM · positioning · launch", "Ongoing"],
  },
  {
    plate: "Plate 0002.03",
    href: "/v3/work/tech",
    title: "A decade adjacent to product",
    dek:
      "Sales and GTM across Guardicore, Akamai, SurveyMonkey, Flexport, Cuebiq, Postmates, Bell Integrator, Moola.",
    meta: ["2013–2023", "Inside sales · GTM · product input", "Shipped"],
  },
] as const;

export default function V3HomePage() {
  return (
    <>
      {/* ====== PLATE 0001 — SETTING ============================== */}
      <Plate
        number="0001"
        name="Setting"
        aside={
          <TypeMetadata
            plate="Headline"
            font="Inter Display"
            size="92pt (clamp 40–92)"
            tracking="−2.8% (−0.028em)"
            leading="1.04"
            weight="Bold (700)"
            note={
              <>
                The headline wraps at the natural line length of the cream
                column; mobile reflows to 40pt without the wrap. The
                tightening compensates for the screen-pixel render at this
                scale — print would call for slightly looser tracking.
              </>
            }
          />
        }
      >
        <h1 className="v3-hero-text">
          I help operators ship the work the rest of their org keeps stalling
          on.
        </h1>
        <p className="v3-hero-subline">
          product · growth · consulting. Oakland, California — 2026.
        </p>
        <p className="v3-hero-currently">
          <strong>Currently</strong>
          building <em>ORDANI</em> — a HIPAA-compliant CRM for birth workers.
          Q3 2026 paid beta.
        </p>
      </Plate>

      {/* ====== PLATE 0002 — SPECIMENS ============================ */}
      <Plate
        number="0002"
        name="Specimens"
        aside={
          <TypeMetadata
            plate="Specimen card"
            font="Inter Display + Source Serif 4"
            size="48pt / 17pt"
            tracking="−2.5% / 0"
            leading="1.05 / 1.5"
            note={
              <>
                Three specimens follow. Each is a shipped piece of work — the
                full plate is available behind the title. Card title set in
                Inter Display Bold at 48pt; the dek in Source Serif italic
                17pt at narrow measure.
              </>
            }
          />
        }
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {SPECIMENS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="v3-specimen-card">
                <p className="v3-specimen-card__plate">{s.plate}</p>
                <h2 className="v3-specimen-card__title">{s.title}</h2>
                <p className="v3-specimen-card__dek">{s.dek}</p>
                <p className="v3-specimen-card__meta">
                  {s.meta.map((m, i) => (
                    <span key={m}>
                      {m}
                      {i < s.meta.length - 1 ? (
                        <span className="v3-specimen-card__meta-sep">
                          {" · "}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Plate>

      {/* ====== PLATE 0003 — PRACTICE (excerpt) =================== */}
      <Plate
        number="0003"
        name="Practice"
        aside={
          <TypeMetadata
            plate="Practice excerpt"
            font="Source Serif 4"
            size="22pt"
            tracking="0"
            leading="1.5"
            note={
              <>
                Italic Source Serif at 22pt is the workshop's voice for
                first-person prose. Inter handles labels and metadata; Source
                Serif handles attestation.
              </>
            }
          />
        }
      >
        <p
          style={{
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.55,
            color: "var(--color-foyer-ink)",
            margin: "0 0 24px",
            maxWidth: "56ch",
          }}
        >
          I work at the seam between sales and product. Ten years adjacent to
          product, in inside sales and go-to-market. Now solo — half
          consulting, half product. The product half is ORDANI.
        </p>
        <p style={{ margin: 0 }}>
          <Link
            href="/v3/about"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-accent-copper-deep)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "var(--color-accent-copper)",
            }}
          >
            Read the full plate →
          </Link>
        </p>
      </Plate>
    </>
  );
}
