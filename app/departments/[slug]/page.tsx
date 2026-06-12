import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Ambulance,
  CalendarPlus,
} from "lucide-react";
import {
  Section,
  Container,
  Badge,
  Card,
  SectionHeading,
} from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageHero } from "@/components/shared/PageHero";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { departments, getDepartment } from "@/lib/data/departments";
import { getDoctorsByDepartment } from "@/lib/data/doctors";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) {
    return {
      title: "Department | LifeCare Specialist Hospital",
      description: site.description,
    };
  }
  return {
    title: `${dept.name} | LifeCare Specialist Hospital`,
    description: dept.description,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  const Icon = dept.icon;
  const docs = getDoctorsByDepartment(slug);

  return (
    <>
      <PageHero
        eyebrow={dept.tagline}
        title={dept.name}
        crumbs={[
          { label: "Departments", href: "/departments" },
          { label: dept.name },
        ]}
      />

      {/* Overview */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${dept.accent} text-white shadow-soft`}
              >
                <Icon className="h-8 w-8" />
              </span>
              <Badge className="mt-6">{dept.tagline}</Badge>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                About our {dept.name} department
              </h2>
              <p className="text-muted mt-5 text-lg leading-relaxed">
                {dept.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`/appointments?department=${dept.slug}`} variant="primary">
                  <CalendarPlus className="h-5 w-5" />
                  Book in {dept.name}
                </Button>
                <Button href="/departments" variant="outline">
                  All departments
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal direction="left">
              <SmartImage
                src={dept.image}
                alt={`${dept.name} at LifeCare Specialist Hospital`}
                width={900}
                height={700}
                wrapperClassName="aspect-[4/3] w-full rounded-3xl shadow-soft-lg"
                className="h-full w-full"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Why this department"
            title="What sets our care apart"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dept.highlights.map((highlight, i) => (
              <Reveal key={highlight} direction="up" delay={(i % 3) * 0.06}>
                <Card hover className="flex h-full items-start gap-4">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" />
                  <p className="font-medium leading-relaxed">{highlight}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Procedures & services */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Procedures & services"
            title={`Treatments offered in ${dept.name}`}
            subtitle="A comprehensive range of procedures delivered by our specialist team."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {dept.procedures.map((procedure, i) => (
              <Reveal key={procedure} direction="up" delay={(i % 2) * 0.06}>
                <Card hover className="flex h-full items-center gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${dept.accent} text-white shadow-soft`}
                  >
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <p className="font-semibold">{procedure}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Specialists */}
      {docs.length > 0 && (
        <Section muted>
          <Container>
            <SectionHeading
              eyebrow="Meet the team"
              title="Our specialists"
              subtitle={`Experienced consultants dedicated to ${dept.name.toLowerCase()} care.`}
              align="center"
            />
            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {docs.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-brand-950 to-brand-900 p-10 text-center text-white shadow-soft-lg sm:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
                Book an appointment in {dept.name}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
                Schedule a consultation with our {dept.name.toLowerCase()} team
                and take the next step toward better health.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  href={`/appointments?department=${dept.slug}`}
                  variant="gold"
                  size="lg"
                >
                  <CalendarPlus className="h-5 w-5" />
                  Book an appointment
                </Button>
                <Button href="/emergency" variant="emergency" size="lg">
                  <Ambulance className="h-5 w-5" />
                  Emergency care
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                24/7 Emergency Hotline: {site.emergencyPhone}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
