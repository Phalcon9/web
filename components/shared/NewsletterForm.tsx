"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { api, ApiError } from "@/lib/api/client";

export function NewsletterForm() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      setEmail("");
      toast({
        kind: "success",
        title: "You're subscribed!",
        description: "Thank you for joining the LifeCare health newsletter.",
      });
    } catch (err) {
      toast({
        kind: "error",
        title: "Subscription failed",
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("footer.emailPlaceholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("footer.emailPlaceholder")}
        className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/60 focus:border-gold-400 focus:outline-none focus-visible:outline-gold-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-950/40 border-t-brand-950" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {t("cta.subscribe")}
      </button>
    </form>
  );
}
