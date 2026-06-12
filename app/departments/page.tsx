import type { Metadata } from "next";
import {
  Award,
  Clock,
  HeartPulse,
  ShieldCheck,
  Ambulance,
  CalendarPlus,
} from "lucide-react";
import { Section, Container, SectionHeading, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { DepartmentCard } from "@/components/shared/DepartmentCard";
import { departments } from "@/lib/data/departments";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Departments | LifeCare Specialist Hospital",
  description:
    "Explore LifeCare Specialist Hospital's centers of excellence — from cardiology and neurology to oncology, pediatrics and 24/7 emergency medicine.",
};

const reasons = [
  {
    icon: Award,
    title: "Board-certified specialists",
    text: "Care led by experienced, internationally trained consultants across every discipline.",
  },
  {
    icon: HeartPulse,
    title: "Advanced technology",
    text: "From robotic surgery to AI-assisted imaging, we bring the latest medicine to every department.",
  },
  {
    icon: ShieldCheck,
    title: "Accredited & safe",
    text: "JCI-accredited protocols safeguard your wellbeing at every step of your treatment.",
  },
  {
    icon: Clock,
    title: "Care around the clock",
    text: "Emergency and critical services are available 24 hours a day, every day of the year.",
  },
];

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Centers of Excellence"
        title="Specialist departments for every need"
        subtitle="Ten dedicated centers of excellence bring together expert teams, advanced technology and compassionate care — all under one roof."
        crumbs={[{ label: "Departments" }]}
      />

      {/* Departments grid */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Browse our specialties"
            title="Find the right care for you"
            subtitle="Select a department to learn more about its services, procedures and specialist team."
            align="center"
          />
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {departments.map((d) => (
              <DepartmentCard key={d.slug} slug={d.slug} />
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* Why choose us */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Why LifeCare"
            title="Care you can trust, across every specialty"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} direction="up" delay={(i % 4) * 0.06}>
                  <Card hover className="h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-soft">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">
                      {r.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Emergency / appointment CTA */}
      <Section>
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-brand-950 to-brand-900 p-10 text-white shadow-soft-lg sm:p-14">
              <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Not sure which department you need?
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-white/75">
                    Our care coordinators will help you find the right
                    specialist. For life-threatening emergencies, our team is
                    ready 24/7.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <Button
                    href="/appointments"
                    variant="gold"
                    size="lg"
                    className="w-full"
                  >
                    <CalendarPlus className="h-5 w-5" />
                    Book an appointment
                  </Button>
                  <Button
                    href="/emergency"
                    variant="emergency"
                    size="lg"
                    className="w-full"
                  >
                    <Ambulance className="h-5 w-5" />
                    Emergency care
                  </Button>
                </div>
              </div>
              <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
                24/7 Emergency Hotline: {site.emergencyPhone}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
