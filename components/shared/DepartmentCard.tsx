"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getDepartment, type Department } from "@/lib/data/departments";
import { staggerItem } from "@/components/ui/Reveal";

// Accepts either a full department object (client callers) or a slug
// (server callers) — the latter avoids passing the icon function across
// the server/client boundary, which is not serializable.
export function DepartmentCard({
  dept,
  slug,
}: {
  dept?: Department;
  slug?: string;
}) {
  const department = dept ?? (slug ? getDepartment(slug) : undefined);
  if (!department) return null;
  const Icon = department.icon;
  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/departments/${department.slug}`}
        className="surface group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
      >
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${department.accent} text-white shadow-soft transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold">{department.name}</h3>
        <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
          {department.tagline}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300">
          {"Explore"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-500/0 transition-colors duration-300 group-hover:bg-gold-500/5" />
      </Link>
    </motion.div>
  );
}
