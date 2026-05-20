// Phase 4 will populate. Cal.com embed pending operator URL.
import type { Metadata } from "next";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";

export const metadata: Metadata = {
  title: "Book a call — Micah Jones",
  description:
    "Schedule a 30-minute intro call. Two-day reply commitment via email.",
};

export default function V2ContactPage() {
  return (
    <Section>
      <Container>
        <p className="text-caption">Contact</p>
        <h1 className="text-display-lg">Book a 30-minute intro call.</h1>
        <p className="text-body-lg text-secondary">
          Cal.com embed lands in Phase 4. For now,{" "}
          <a
            href="mailto:hello@micahjonesconsulting.com"
            className="v2-inline-link"
          >
            email me directly
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
