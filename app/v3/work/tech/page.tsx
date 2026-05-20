import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";

export const metadata = { title: "Plate 0002.03 — Tech" };

export default function V3TechPage() {
  return (
    <Plate
      number="0002.03"
      name="Specimen — Tech"
      aside={
        <TypeMetadata
          plate="Tech bundle"
          font="Inter Display"
          size="48pt"
          tracking="−2%"
          leading="1.05"
          note="Logo wall + narrative. Eight companies, ten years. Specific attributions available under NDA."
        />
      }
    >
      <h1 style={{ fontFamily: "var(--font-inter-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.022em", margin: 0, maxWidth: "26ch" }}>
        A decade adjacent to product, inside sales, building GTM.
      </h1>
      <p style={{ marginTop: 32, fontFamily: "var(--font-source-serif), serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.55, maxWidth: "60ch" }}>
        Full plate copy lands next pass.
      </p>
    </Plate>
  );
}
