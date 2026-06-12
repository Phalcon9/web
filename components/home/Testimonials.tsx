"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Section, Container, SectionHeading } from "@/components/ui/primitives";
import { testimonials } from "@/lib/data/testimonials";
import { useLanguage } from "@/providers/LanguageProvider";

export function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("section.testimonials")}
          title="What our patients say"
          subtitle="Real stories from the people at the heart of everything we do."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto h-12 w-12 text-gold-500/30" />
          <div className="relative min-h-[16rem] sm:min-h-[14rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={active.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="font-display text-xl font-medium leading-relaxed sm:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-500/40"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{active.name}</p>
                    <p className="text-muted text-sm">{active.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-500" : "w-2 bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
