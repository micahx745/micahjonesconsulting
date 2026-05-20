import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";

export const metadata = { title: "Plate 0002.02 — GTM" };

export default function V3GtmPage() {
  return (
    <Plate
      number="0002.02"
      name="Specimen — GTM"
      aside={
        <TypeMetadata
          plate="GTM specimen"
          font="Inter Display"
          size="56pt"
          tracking="−2.5%"
          leading="1.05"
          note="Anonymized engagement. Numbers attested by the operator."
        />
      }
    >
      <h1 style={{ fontFamily: "var(--font-inter-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: 0, maxWidth: "24ch" }}>
        Tens of millions in revenue, generated at the seam between sales and product.
      </h1>
      <p style={{ marginTop: 32, fontFamily: "var(--font-source-serif), serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.55, maxWidth: "60ch" }}>
        Full plate copy lands next pass.
      </p>
    </Plate>
  );
}
