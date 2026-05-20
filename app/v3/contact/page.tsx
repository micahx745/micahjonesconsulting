import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";

export const metadata = { title: "Plate 0004 — Colophon" };

export default function V3ContactPage() {
  return (
    <Plate
      number="0004"
      name="Colophon"
      aside={
        <TypeMetadata
          plate="Correspondence"
          font="Inter"
          size="17pt"
          tracking="0"
          leading="1.6"
          note="Email is the address of record. Replies within two business days."
        />
      }
    >
      <p style={{ fontFamily: "var(--font-source-serif), serif", fontStyle: "italic", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.4, maxWidth: "36ch", margin: "0 0 32px" }}>
        Send a note. I read every message and reply inside two business days.
      </p>
      <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 17, margin: 0 }}>
        <a
          href="mailto:hello@micahjonesconsulting.com"
          style={{
            color: "var(--color-accent-copper-deep)",
            textDecoration: "underline",
            textDecorationColor: "var(--color-accent-copper)",
            textUnderlineOffset: "6px",
          }}
        >
          hello@micahjonesconsulting.com
        </a>
      </p>
    </Plate>
  );
}
