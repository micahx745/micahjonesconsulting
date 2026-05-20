import { Plate } from "@/components/v3/specimen/Plate";
import { TypeMetadata } from "@/components/v3/specimen/TypeMetadata";

export const metadata = { title: "Plate 0003 — Practice" };

export default function V3AboutPage() {
  return (
    <Plate
      number="0003"
      name="Practice"
      aside={
        <TypeMetadata
          plate="Practice"
          font="Source Serif 4"
          size="22pt"
          tracking="0"
          leading="1.55"
          note="First-person prose set in italic Source Serif at 22pt. The seam thesis lives here in its full version."
        />
      }
    >
      <p style={{ fontFamily: "var(--font-source-serif), serif", fontStyle: "italic", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.55, maxWidth: "56ch", margin: 0 }}>
        Full plate copy lands next pass.
      </p>
    </Plate>
  );
}
