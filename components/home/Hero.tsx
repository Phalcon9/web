"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Ambulance, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { SmartImage } from "@/components/ui/SmartImage";
import { useLanguage } from "@/providers/LanguageProvider";
import { heroStats } from "@/lib/data/stats";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="container-px grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-300"
          >
            <ShieldCheck className="h-4 w-4" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{t("hero.title")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-muted mt-6 text-lg leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/appointments" size="lg" variant="primary">
              <CalendarHeart className="h-5 w-5" />
              {t("cta.book")}
            </Button>
            <Button href="/emergency" size="lg" variant="emergency">
              <Ambulance className="h-5 w-5" />
              {t("cta.emergency")}
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              {t("cta.contact")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Hero stats */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t pt-8"
          >
            {heroStats.map((s, i) => (
              <div key={i}>
                <dd className="font-display text-3xl font-bold text-brand-900 dark:text-white">
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="text-muted mt-1 text-sm">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <SmartImage
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80"
              alt="Doctors attending to a patient at LifeCare Specialist Hospital"
              width={1000}
              height={1100}
              priority
              wrapperClassName="aspect-[4/4.4] w-full rounded-[2rem] shadow-soft-lg"
              className="h-full w-full"
            />

            {/* Floating accreditation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="surface absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl border p-3 shadow-soft-lg sm:flex"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-500">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div className="pr-2">
                <p className="text-sm font-bold">JCI Accredited</p>
                <p className="text-muted text-xs">Gold Seal of Approval</p>
              </div>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="surface absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl border p-3 shadow-soft-lg sm:-right-5"
            >
              <div className="flex -space-x-2">
                {[31, 24, 52].map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/80?img=${n}`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover dark:border-slate-800"
                  />
                ))}
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>
                <p className="text-muted mt-0.5 text-xs">
                  <span className="font-bold text-current">4.9</span> from 3,200+
                  reviews
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
