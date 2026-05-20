// Phase 2 will populate. Stub keeps the route reachable.
import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";
import { MultiSizeSpecimen } from "@/components/v3/specimen/MultiSizeSpecimen";

export const metadata = {
  title: "Plate 0002.01 — ORDANI",
};

export default function V3OrdaniPage() {
  return (
    <Plate
      number="0002.01"
      name="Specimen — ORDANI"
      aside={
        <TypeMetadata
          plate="Cascade"
          font="Inter Display"
          size="144 / 72 / 36 / 18 pt"
          tracking="−4% at display"
          leading="1.0"
          note="The title at four sizes shows the cascade — how the same letterforms scale from display through caption."
        />
      }
    >
      <MultiSizeSpecimen text="ORDANI" />
      <p style={{ marginTop: 32, fontFamily: "var(--font-source-serif), serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.55, maxWidth: "60ch" }}>
        Full plate copy lands next pass.
      </p>
    </Plate>
  );
}
