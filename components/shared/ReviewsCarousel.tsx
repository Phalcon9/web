"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section, Container, Card } from "@/components/ui/primitives";
import { googleReviews, testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(rating)
              ? "fill-gold-500 text-gold-500"
              : "text-slate-300 dark:text-slate-600",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const active = testimonials[index];

  return (
    <Section muted>
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr,1.4fr]">
          {/* Aggregate summary */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-semibold shadow-soft dark:bg-white/10">
              <svg
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                />
                <path
                  fill="#EA4335"
                  d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                />
              </svg>
              Google Reviews
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-5xl font-bold leading-none">
                {googleReviews.rating}
              </span>
              <div className="pb-1">
                <Stars rating={googleReviews.rating} />
                <p className="text-muted mt-1 text-sm">
                  Based on{" "}
                  <span className="font-semibold">
                    {googleReviews.total.toLocaleString()}
                  </span>{" "}
                  reviews
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-2" aria-label="Rating breakdown">
              {googleReviews.breakdown.map((row) => (
                <li key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="text-muted inline-flex w-10 items-center gap-1 tabular-nums">
                    {row.stars}
                    <Star
                      className="h-3.5 w-3.5 fill-gold-500 text-gold-500"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <span
                      className="block h-full rounded-full bg-gold-500"
                      style={{ width: `${row.percent}%` }}
                    />
                  </span>
                  <span className="text-muted w-10 text-right tabular-nums">
                    {row.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Review carousel */}
          <div>
            <div className="relative min-h-[19rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="h-full">
                    <Quote
                      className="h-8 w-8 text-brand-500/40"
                      aria-hidden="true"
                    />
                    <Stars rating={active.rating} className="mt-4" />
                    <blockquote className="mt-4 text-lg leading-relaxed">
                      “{active.quote}”
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={active.image}
                        alt={active.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{active.name}</p>
                        <p className="text-muted text-sm">{active.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="surface flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-brand-500/40 focus-visible:outline-gold-500"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="surface flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-brand-500/40 focus-visible:outline-gold-500"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex gap-2" role="tablist" aria-label="Choose review">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Review ${i + 1} of ${count}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      i === index
                        ? "w-6 bg-brand-700 dark:bg-brand-400"
                        : "w-2.5 bg-black/20 hover:bg-black/40 dark:bg-white/20 dark:hover:bg-white/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
