"use client";

import { useMemo, useState } from "react";
import { Search, UserX } from "lucide-react";
import { Section, Container } from "@/components/ui/primitives";
import { StaggerGroup } from "@/components/ui/Reveal";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { doctors } from "@/lib/data/doctors";
import { departments } from "@/lib/data/departments";
import { cn } from "@/lib/utils";

export function DoctorsBrowser() {
  const [activeDept, setActiveDept] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesDept = activeDept === "all" || d.departmentSlug === activeDept;
      const matchesQuery =
        q === "" ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [activeDept, query]);

  return (
    <Section>
      <Container>
        {/* Search */}
        <div className="mx-auto mb-8 max-w-xl">
          <label htmlFor="doctor-search" className="sr-only">
            Search doctors by name or specialty
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="doctor-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialty…"
              className="h-12 w-full rounded-full border bg-transparent pl-12 pr-5 text-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus-visible:outline-gold-500"
            />
          </div>
        </div>

        {/* Department filter pills */}
        <div
          role="tablist"
          aria-label="Filter doctors by department"
          className="-mx-1 mb-10 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
        >
          <FilterPill
            label="All"
            active={activeDept === "all"}
            onClick={() => setActiveDept("all")}
          />
          {departments.map((dept) => (
            <FilterPill
              key={dept.slug}
              label={dept.name}
              active={activeDept === dept.slug}
              onClick={() => setActiveDept(dept.slug)}
            />
          ))}
        </div>

        {/* Count */}
        <p className="text-muted mb-6 text-center text-sm" aria-live="polite">
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "specialist" : "specialists"}
        </p>

        {/* Results */}
        {filtered.length > 0 ? (
          <StaggerGroup
            key={`${activeDept}-${query}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </StaggerGroup>
        ) : (
          <div className="surface mx-auto flex max-w-md flex-col items-center rounded-3xl border p-12 text-center shadow-soft">
            <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-900/5 text-brand-700 dark:bg-white/5 dark:text-brand-300">
              <UserX className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold">No specialists found</h3>
            <p className="text-muted mt-2 text-sm">
              We couldn&apos;t find a match for your search. Try a different
              department or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveDept("all");
                setQuery("");
              }}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-900 px-6 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-gold-500",
        active
          ? "border-brand-900 bg-brand-900 text-white shadow-soft dark:border-brand-500 dark:bg-brand-600"
          : "surface text-muted hover:border-brand-900/30 hover:text-brand-900 dark:hover:border-white/30 dark:hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
