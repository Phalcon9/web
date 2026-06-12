import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { DoctorsBrowser } from "@/components/shared/DoctorsBrowser";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the consultants and specialists behind world-class care at LifeCare Specialist Hospital. Filter by department, search by name or specialty, and book an appointment in minutes.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Specialists"
        title="Meet the doctors behind world-class care"
        subtitle="A multidisciplinary team of consultants, surgeons and clinicians — internationally trained, deeply experienced, and committed to compassionate, evidence-based medicine."
        crumbs={[{ label: "Doctors" }]}
      />
      <DoctorsBrowser />
    </>
  );
}
