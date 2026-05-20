// Phase 3 will populate.
import type { Metadata } from "next";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";

export const metadata: Metadata = {
  title: "A decade adjacent to product — Micah Jones",
  description:
    "Sales and GTM across Guardicore, Akamai, SurveyMonkey, Flexport, Cuebiq, Postmates.",
};

export default function V2TechPage() {
  return (
    <Section>
      <Container>
        <p className="text-caption">Tech / 2013–2023</p>
        <h1 className="text-display-lg">
          A decade adjacent to product, inside sales, building GTM.
        </h1>
        <p className="text-body-lg text-secondary">Coming in Phase 3.</p>
      </Container>
    </Section>
  );
}
