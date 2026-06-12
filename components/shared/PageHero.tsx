import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-brand-950 to-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      </div>
      <Container className="relative py-16 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-300">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-gold-300"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-white/75">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
