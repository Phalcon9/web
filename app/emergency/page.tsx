import type { Metadata } from "next";
import {
  Phone,
  Ambulance,
  MapPin,
  HeartPulse,
  Wind,
  Brain,
  Droplet,
  Flame,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Stethoscope,
  ClipboardCheck,
  Pill,
} from "lucide-react";
import {
  Section,
  Container,
  Card,
  SectionHeading,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { EmergencyActions } from "@/components/shared/EmergencyActions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "24/7 Emergency & Critical Care",
  description:
    "LifeCare Specialist Hospital's emergency department is open 24/7 with rapid triage, a Level I trauma team and ambulance dispatch. Know when to come to the ER.",
};

const warningSigns = [
  {
    icon: HeartPulse,
    title: "Chest pain or pressure",
    body: "Tightness, pressure or pain in the chest, arm or jaw — possible heart attack.",
  },
  {
    icon: Wind,
    title: "Difficulty breathing",
    body: "Shortness of breath, choking or inability to speak in full sentences.",
  },
  {
    icon: Brain,
    title: "Stroke signs (FAST)",
    body: "Face drooping, Arm weakness, Speech difficulty — Time to call now.",
  },
  {
    icon: Droplet,
    title: "Severe bleeding",
    body: "Bleeding that won't stop with pressure, or a deep or gaping wound.",
  },
  {
    icon: Flame,
    title: "Severe burns",
    body: "Large, deep, or chemical/electrical burns, or burns to the face or hands.",
  },
  {
    icon: Activity,
    title: "Loss of consciousness",
    body: "Fainting, unresponsiveness, seizures or sudden confusion.",
  },
  {
    icon: AlertTriangle,
    title: "Severe allergic reaction",
    body: "Swelling of the face or throat, hives with breathing trouble (anaphylaxis).",
  },
  {
    icon: ShieldAlert,
    title: "Major trauma",
    body: "Serious falls, road accidents, head injuries or suspected fractures.",
  },
];

const steps = [
  {
    icon: HeartPulse,
    title: "Triage within minutes",
    body: "A specialist nurse assesses severity the moment you arrive — the most urgent are seen first.",
  },
  {
    icon: Stethoscope,
    title: "Assessment",
    body: "Rapid diagnostics, vitals and imaging to pinpoint exactly what's happening.",
  },
  {
    icon: Pill,
    title: "Treatment",
    body: "Immediate, expert care from our emergency physicians and trauma team.",
  },
  {
    icon: ClipboardCheck,
    title: "Admission or discharge",
    body: "Admission to the right unit, or discharge with a clear follow-up plan.",
  },
];

const contacts = [
  {
    icon: Phone,
    label: "Emergency Hotline",
    value: site.emergencyPhone,
    href: site.emergencyPhoneHref,
    accent: "bg-red-600 text-white",
  },
  {
    icon: Ambulance,
    label: "Ambulance Dispatch",
    value: site.ambulancePhone,
    href: site.ambulancePhoneHref,
    accent: "bg-gold-500 text-brand-950",
  },
  {
    icon: Phone,
    label: "Main Line",
    value: site.mainPhone,
    href: site.mainPhoneHref,
    accent: "bg-brand-900 text-white dark:bg-brand-600",
  },
  {
    icon: MapPin,
    label: "Our Location",
    value: site.address,
    href: undefined,
    accent: "bg-accent-500 text-white",
  },
];

const stats = [
  { to: 10, prefix: "< ", suffix: " min", label: "Average triage time" },
  { to: 24, suffix: "/7", label: "Always open" },
  { to: 1, prefix: "Level ", suffix: "", label: "Trauma centre" },
  { to: 98, suffix: "%", label: "Patient satisfaction" },
];

export default function EmergencyPage() {
  return (
    <>
      {/* Urgent red hero band */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-red-700 via-red-600 to-red-700 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-400/40 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-red-900/40 blur-3xl" />
        </div>
        <Container className="relative py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                Emergency department open now
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                24/7 Emergency &amp; Critical Care
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/90">
                When every second counts, our Level I trauma team is ready —
                round the clock, every day of the year. If this is a
                life-threatening emergency, call us right now.
              </p>
            </div>

            <div className="lg:justify-self-end">
              <a
                href={site.emergencyPhoneHref}
                className="group block rounded-3xl bg-white p-6 text-brand-950 shadow-soft-lg transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-8"
                aria-label={`Call the emergency hotline at ${site.emergencyPhone}`}
              >
                <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-600">
                  <Phone className="h-4 w-4" /> Emergency Hotline
                </span>
                <span className="mt-2 block font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {site.emergencyPhone}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-red-700">
                  <Phone className="h-4 w-4" /> Tap to call now
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Big action buttons */}
      <Section className="py-12 sm:py-14 lg:py-16">
        <Container>
          <EmergencyActions />
        </Container>
      </Section>

      {/* When to come to the ER */}
      <Section muted className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Know the signs"
              title="When to come to the ER"
              subtitle="If you or someone near you shows any of these warning signs, seek emergency care immediately — don't wait."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {warningSigns.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.08}>
                <Card hover className="h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">
                    {s.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What to expect */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Your care, step by step"
              title="What to expect"
              subtitle="From the moment you arrive, our team works fast and keeps you informed."
            />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) * 0.08} as="li">
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white dark:bg-brand-600">
                      {i + 1}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                      <step.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Emergency contacts */}
      <Section muted className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reach us instantly"
              title="Emergency contacts"
              subtitle="Save these numbers. Tap any number to call straight away."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c, i) => {
              const inner = (
                <>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.accent}`}
                  >
                    <c.icon className="h-6 w-6" />
                  </span>
                  <p className="text-muted mt-4 text-xs font-semibold uppercase tracking-widest">
                    {c.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold leading-snug">
                    {c.value}
                  </p>
                </>
              );
              return (
                <Reveal key={c.label} delay={(i % 4) * 0.08}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="surface block h-full rounded-3xl border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                      aria-label={`Call ${c.label} at ${c.value}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Card className="h-full">{inner}</Card>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Reassurance stats */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="rounded-3xl border bg-gradient-to-br from-brand-950 to-brand-900 p-10 text-white shadow-soft-lg lg:p-14">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={(i % 4) * 0.08}>
                  <p className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">
                    <Counter
                      to={stat.to}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-2 text-sm text-white/75">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
