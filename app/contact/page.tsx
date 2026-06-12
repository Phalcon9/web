import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Siren,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { ReviewsCarousel } from "@/components/shared/ReviewsCarousel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | LifeCare Specialist Hospital",
  description:
    "Reach LifeCare Specialist Hospital by phone, email or in person. Open 24/7 for emergencies. Find our address, hours, live chat, online bill payment and directions.",
};

const socialIcons: Record<string, LucideIcon> = {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

const infoCards: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}[] = [
  {
    icon: MapPin,
    label: "Visit us",
    value: site.address,
    href: site.mapEmbed,
    external: true,
  },
  {
    icon: Phone,
    label: "Main line",
    value: site.mainPhone,
    href: site.mainPhoneHref,
  },
  {
    icon: Siren,
    label: "24/7 Emergency",
    value: site.emergencyPhone,
    href: site.emergencyPhoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  { icon: Clock, label: "Opening hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We're here for you, day & night"
        subtitle="Questions, appointments, feedback or emergencies — our team is ready to help around the clock."
        crumbs={[{ label: "Contact" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: contact info */}
            <Reveal className="space-y-4">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Contact information
              </h2>
              <p className="text-muted">
                Prefer to reach out directly? Use any of the channels below.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {infoCards.map(({ icon: Icon, label, value, href, external }) => {
                  const inner = (
                    <Card
                      hover={!!href}
                      className="flex h-full items-start gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-900/5 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="text-muted block text-xs font-semibold uppercase tracking-widest">
                          {label}
                        </span>
                        <span className="mt-0.5 block font-medium leading-snug">
                          {value}
                        </span>
                      </span>
                    </Card>
                  );

                  if (!href) return <div key={label}>{inner}</div>;
                  return external ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-3xl focus-visible:outline-gold-500"
                    >
                      {inner}
                    </a>
                  ) : (
                    <a
                      key={label}
                      href={href}
                      className="block rounded-3xl focus-visible:outline-gold-500"
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>

              {/* Socials */}
              <div className="pt-2">
                <p className="text-muted mb-3 text-xs font-semibold uppercase tracking-widest">
                  Follow us
                </p>
                <div className="flex flex-wrap gap-2">
                  {site.socials.map((s) => {
                    const Icon = socialIcons[s.name];
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="surface flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-brand-500/40 hover:text-brand-700 dark:hover:text-brand-300"
                      >
                        {Icon ? (
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <span className="text-xs font-semibold">
                            {s.name[0]}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Right: form + live chat + pay-a-bill (client) */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section muted className="!py-0">
        <iframe
          src={site.mapEmbed}
          title={`Map showing the location of ${site.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[400px] w-full border-0"
          allowFullScreen
        />
      </Section>

      {/* Reviews */}
      <ReviewsCarousel />
    </>
  );
}
