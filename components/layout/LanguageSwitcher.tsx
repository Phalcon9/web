"use client";

import { Globe, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { LOCALES } from "@/lib/i18n/dictionaries";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="surface absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border shadow-soft-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <span>{l.label}</span>
              {locale === l.code && (
                <Check className="h-4 w-4 text-accent-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
