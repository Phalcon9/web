import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ShieldCheck,
  Clock,
  CalendarCheck,
  Phone,
  Siren,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, Container } from "@/components/ui/primitives";
import { AppointmentForm } from "@/components/shared/AppointmentForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your visit at LifeCare Specialist Hospital in minutes. Choose your department and doctor, pick a date and time, and confirm — all online.",
};

const expectations = [
  {
    icon: CalendarCheck,
    title: "Instant confirmation",
    body: "Receive an appointment reference immediately, with email and SMS reminders before your visit.",
  },
  {
    icon: Clock,
    title: "Save time at reception",
    body: "Your details are pre-registered, so check-in is quick and seamless when you arrive.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    body: "Your information is encrypted and shared only with your care team. We never sell your data.",
  },
];

export default function AppointmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Appointment"
        title="Schedule your visit in minutes"
        subtitle="Select your specialty, choose a doctor and a convenient time, and we'll take care of the rest."
        crumbs={[{ label: "Appointments" }]}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
            {/* Form */}
            <div className="surface rounded-3xl border p-6 shadow-soft sm:p-8 lg:p-10">
              <Suspense fallback={null}>
                <AppointmentForm />
              </Suspense>
            </div>

            {/* Aside */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="surface rounded-3xl border p-6 shadow-soft">
                <h2 className="text-lg font-bold">Why book online</h2>
                <ul className="mt-5 space-y-5">
                  {expectations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-muted mt-0.5 text-sm leading-relaxed">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Emergency note */}
              <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600 text-white">
                    <Siren className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
                    Medical emergency?
                  </h2>
                </div>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  Do not wait for an appointment. Our emergency department is
                  open 24/7 with rapid triage and trauma care.
                </p>
                <a
                  href="/emergency"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700 transition hover:gap-2 dark:text-red-400"
                >
                  Go to Emergency Care
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {/* Contact */}
              <div className="surface rounded-3xl border p-6 shadow-soft">
                <h2 className="text-lg font-bold">Prefer to call?</h2>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  Our patient coordinators are happy to help you book over the
                  phone.
                </p>
                <a
                  href={site.mainPhoneHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 transition hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.mainPhone}
                </a>
                <p className="text-muted mt-3 text-xs">{site.hours}</p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
