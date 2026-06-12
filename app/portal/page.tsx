import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Section, Container } from "@/components/ui/primitives";
import { PatientPortal } from "@/components/shared/PatientPortal";

export const metadata: Metadata = {
  title: "Patient Portal",
  description:
    "Sign in to the LifeCare Specialist Hospital patient portal to view your medical records, prescriptions, test results and appointments — securely in one place.",
};

export default function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Portal"
        title="Your health records, securely in one place"
        subtitle="Access your medical records, prescriptions, test results and appointments anytime, on any device."
        crumbs={[{ label: "Patient Portal" }]}
      />
      <Section>
        <Container>
          <PatientPortal />
        </Container>
      </Section>
    </>
  );
}
