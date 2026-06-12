"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
} from "lucide-react";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { navLinks, site } from "@/lib/site";
import { departments } from "@/lib/data/departments";
import { useLanguage } from "@/providers/LanguageProvider";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn: Linkedin,
    YouTube: Youtube,
  };

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-950 text-white/80">
      <div className="container-px grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        {/* Brand + newsletter */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500">
              <Plus className="h-5 w-5 text-white" strokeWidth={3} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-white">
                LifeCare
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Specialist Hospital
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            {t("footer.tagline")}
          </p>

          <div className="mt-8">
            <p className="font-display text-base font-semibold text-white">
              {t("footer.newsletter")}
            </p>
            <p className="mb-4 mt-1 text-sm text-white/55">
              {t("footer.newsletterSub")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">
            {t("footer.quickLinks")}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ...navLinks,
              { href: "/appointments", key: "nav.appointments" as const },
              { href: "/emergency", key: "nav.emergency" as const },
              { href: "/portal", key: "nav.portal" as const },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 transition-colors hover:text-gold-300"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold text-white">
            {t("footer.services")}
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {departments.slice(0, 7).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/departments/${d.slug}`}
                  className="text-white/60 transition-colors hover:text-gold-300"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-base font-semibold text-white">
            {t("nav.contact")}
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
              <span className="text-white/60">{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
              <a
                href={site.mainPhoneHref}
                className="text-white/60 transition-colors hover:text-gold-300"
              >
                {site.mainPhone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
              <a
                href={`mailto:${site.email}`}
                className="break-all text-white/60 transition-colors hover:text-gold-300"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
              <span className="text-white/60">{site.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p className="text-white/50">
            © {2026} {site.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gold-500 hover:text-brand-950"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
          </div>
          <div className="flex gap-5 text-white/50">
            <Link href="#" className="transition-colors hover:text-gold-300">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="transition-colors hover:text-gold-300">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
