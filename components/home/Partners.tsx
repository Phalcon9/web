"use client";

import { Section, Container, SectionHeading } from "@/components/ui/primitives";
import { partners } from "@/lib/data/partners";
import { useLanguage } from "@/providers/LanguageProvider";

export function Partners() {
  const { t } = useLanguage();
  // Duplicate the list for a seamless marquee loop.
  const loop = [...partners, ...partners];

  return (
    <Section muted className="overflow-hidden">
      <Container>
        <SectionHeading eyebrow={t("section.partners")} title="Recognized for excellence" />
      </Container>

      <div className="mask-fade-x relative mt-12 flex overflow-hidden">
        <div className="flex animate-marquee gap-4 pr-4">
          {loop.map((p, i) => (
            <div
              key={i}
              className="surface flex w-52 shrink-0 flex-col items-center justify-center rounded-2xl border px-6 py-7 text-center shadow-soft"
            >
              <span className="font-display text-2xl font-bold text-brand-900 dark:text-white">
                {p.name}
              </span>
              <span className="text-muted mt-1 text-xs uppercase tracking-wide">
                {p.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
