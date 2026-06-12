"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, Search, SearchX } from "lucide-react";
import { Section, Container } from "@/components/ui/primitives";
import { StaggerGroup } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { BlogCard } from "@/components/shared/BlogCard";
import { blogPosts, blogCategories } from "@/lib/data/blog";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogBrowser() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [category, query]);

  const isDefaultView = category === "All" && query.trim() === "";
  const featured = isDefaultView ? filtered[0] : undefined;
  const grid = featured ? filtered.slice(1) : filtered;

  return (
    <Section>
      <Container>
        {/* Controls */}
        <div className="mb-10 flex flex-col gap-6">
          <div className="relative max-w-xl">
            <Search
              className="text-muted pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, categories…"
              aria-label="Search health articles"
              className="surface h-12 w-full rounded-full border pl-12 pr-4 text-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus-visible:outline-gold-500"
            />
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter articles by category"
          >
            {blogCategories.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-gold-500",
                    active
                      ? "border-brand-900 bg-brand-900 text-white dark:border-brand-500 dark:bg-brand-600"
                      : "surface text-muted hover:border-brand-500/40 hover:text-current",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-muted text-sm" aria-live="polite">
            {filtered.length === 0
              ? "No articles found"
              : `Showing ${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
            {category !== "All" && ` in ${category}`}
          </p>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="surface flex flex-col items-center gap-4 rounded-3xl border px-6 py-20 text-center shadow-soft">
            <SearchX className="text-muted h-10 w-10" aria-hidden="true" />
            <h3 className="text-xl font-bold">No matching articles</h3>
            <p className="text-muted max-w-md">
              We couldn&apos;t find anything for that search. Try a different
              keyword or browse all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="min-h-[44px] rounded-full border border-brand-900/20 px-5 py-2 text-sm font-semibold transition-colors hover:bg-brand-900/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured hero card */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="surface group mb-12 grid overflow-hidden rounded-3xl border shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg lg:grid-cols-2"
              >
                <div className="relative">
                  <SmartImage
                    src={featured.image}
                    alt={featured.title}
                    width={1000}
                    height={700}
                    wrapperClassName="aspect-[16/11] h-full w-full"
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-950">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
                  <div className="text-muted flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-900/5 px-3 py-1 font-semibold text-brand-700 dark:bg-white/10 dark:text-brand-300">
                      {featured.category}
                    </span>
                    <span>{formatDate(featured.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {featured.readTime} min
                      read
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="text-muted leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            )}

            {/* Grid */}
            <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grid.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </StaggerGroup>
          </>
        )}
      </Container>
    </Section>
  );
}
