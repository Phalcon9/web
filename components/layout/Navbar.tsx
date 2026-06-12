"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, CalendarHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/lib/site";
import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-brand-950 text-white/90 lg:block">
        <div className="container-px flex h-10 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-400" />
            {site.hours}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.mainPhoneHref}
              className="link-underline inline-flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" /> {site.mainPhone}
            </a>
            <a href={site.email && `mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-[500] transition-all duration-300",
          scrolled
            ? "glass border-b shadow-soft"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-brand-700 dark:text-white"
                      : "text-muted hover:text-current",
                  )}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-900/8 dark:bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Button
              href="/appointments"
              size="sm"
              variant="gold"
              className="hidden sm:inline-flex"
            >
              <CalendarHeart className="h-4 w-4" />
              {t("cta.book")}
            </Button>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="glass overflow-hidden border-t lg:hidden"
            >
              <ul className="container-px flex flex-col gap-1 py-4">
                {[...navLinks, { href: "/emergency", key: "nav.emergency" as const }, { href: "/portal", key: "nav.portal" as const }].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-brand-900/8 text-brand-700 dark:bg-white/10 dark:text-white"
                          : "hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 flex items-center justify-between gap-3 px-1">
                  <Button href="/appointments" variant="gold" className="flex-1">
                    <CalendarHeart className="h-4 w-4" />
                    {t("cta.book")}
                  </Button>
                  <ThemeToggle />
                  <LanguageSwitcher />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
