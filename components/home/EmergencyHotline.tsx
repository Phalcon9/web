"use client";

import { Phone, Ambulance, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { useLanguage } from "@/providers/LanguageProvider";

export function EmergencyHotline() {
  const { t } = useLanguage();
  return (
    <section className="py-10">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-red-700 via-red-600 to-rose-600 p-8 text-white shadow-soft-lg sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-black/10 blur-2xl" />

            <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="flex items-center gap-5">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-white/30" />
                  <Ambulance className="relative h-8 w-8" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/80">
                    <Clock3 className="h-4 w-4" /> {t("section.emergency")}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    Need urgent medical help?
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <a href={site.emergencyPhoneHref} className="text-center sm:text-right">
                  <span className="block text-xs uppercase tracking-widest text-white/70">
                    Emergency Hotline
                  </span>
                  <span className="font-display text-3xl font-bold">
                    {site.emergencyPhone}
                  </span>
                </a>
                <Button
                  href={site.emergencyPhoneHref}
                  external
                  size="lg"
                  className="bg-white text-red-600 hover:bg-white/90"
                >
                  <Phone className="h-5 w-5" />
                  {t("cta.callNow")}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
