// Phase 3 will populate. Stub keeps the route reachable.
import type { Metadata } from "next";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";

export const metadata: Metadata = {
  title: "ORDANI — Micah Jones",
  description: "A new system of record for birth workers. HIPAA-compliant by design.",
};

export default function V2OrdaniPage() {
  return (
    <Section>
      <Container>
        <p className="text-caption">Case study / 01</p>
        <h1 className="text-display-xl">ORDANI</h1>
        <p className="text-body-lg text-secondary">Coming in Phase 3.</p>
      </Container>
    </Section>
  );
}
