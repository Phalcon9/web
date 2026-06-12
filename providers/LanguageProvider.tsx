"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  dictionaries,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/dictionaries";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lc-locale") as Locale | null;
      if (stored && (stored === "en" || stored === "fr")) setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("lc-locale", l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  };

  const t = (key: TranslationKey) => dictionaries[locale][key] ?? key;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
