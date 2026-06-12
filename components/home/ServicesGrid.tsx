"use client";

import { ArrowRight } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/primitives";
import { StaggerGroup, Reveal } from "@/components/ui/Reveal";
import { DepartmentCard } from "@/components/shared/DepartmentCard";
import { Button } from "@/components/ui/Button";
import { departments } from "@/lib/data/departments";
import { useLanguage } from "@/providers/LanguageProvider";

export function ServicesGrid() {
  const { t } = useLanguage();
  return (
    <Section muted>
      <Container>
        <SectionHeading
          eyebrow={t("section.services")}
          title="Specialist care across every discipline"
          subtitle={t("section.servicesSub")}
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {departments.slice(0, 8).map((dept) => (
            <DepartmentCard key={dept.slug} dept={dept} />
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/departments" variant="outline" size="lg">
            {t("cta.viewAll")} Departments
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
