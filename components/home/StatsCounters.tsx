"use client";

import { Section, Container, SectionHeading } from "@/components/ui/primitives";
import { StaggerGroup, staggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { motion } from "framer-motion";
import { stats } from "@/lib/data/stats";
import { useLanguage } from "@/providers/LanguageProvider";

export function StatsCounters() {
  const { t } = useLanguage();
  return (
    <Section className="relative overflow-hidden bg-brand-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
      </div>
      <Container className="relative">
        <SectionHeading
          eyebrow={t("section.stats")}
          title="Numbers that reflect our commitment"
          className="[&_p]:text-accent-300 [&_h2]:text-white"
        />
        <StaggerGroup className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold text-gold-400 sm:text-5xl">
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
