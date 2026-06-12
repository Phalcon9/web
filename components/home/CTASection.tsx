"use client";

import { CalendarHeart, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/lib/site";
import { useLanguage } from "@/providers/LanguageProvider";

export function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft-lg">
            <SmartImage
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
              alt="Caring medical professional"
              fill
              wrapperClassName="absolute inset-0"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/60" />

            <div className="relative px-8 py-16 text-white sm:px-14 lg:py-20">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
                  Your health, our priority
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Ready to experience world-class care?
                </h2>
                <p className="mt-5 text-lg text-white/80">
                  Book an appointment with a specialist today, or speak with our
                  care team — we&apos;re here for you, day and night.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/appointments" size="lg" variant="gold">
                    <CalendarHeart className="h-5 w-5" />
                    {t("cta.book")}
                  </Button>
                  <Button
                    href={site.mainPhoneHref}
                    external
                    size="lg"
                    className="bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"
                  >
                    <Phone className="h-5 w-5" />
                    {site.mainPhone}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
