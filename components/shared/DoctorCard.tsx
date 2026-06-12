"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, CalendarPlus, Stethoscope } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { staggerItem } from "@/components/ui/Reveal";
import { getDepartment } from "@/lib/data/departments";
import type { Doctor } from "@/lib/data/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const dept = getDepartment(doctor.departmentSlug);
  return (
    <motion.div
      variants={staggerItem}
      className="surface group flex h-full flex-col overflow-hidden rounded-3xl border shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
    >
      <div className="relative">
        <SmartImage
          src={doctor.image}
          alt={`Portrait of ${doctor.name}`}
          width={600}
          height={600}
          wrapperClassName="aspect-[4/5] w-full"
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-900 shadow-soft backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
          {doctor.rating.toFixed(1)}
        </span>
        {dept && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Stethoscope className="h-3.5 w-3.5" />
            {dept.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{doctor.name}</h3>
        <p className="text-sm font-medium text-accent-600 dark:text-accent-400">
          {doctor.specialty}
        </p>
        <p className="text-muted mt-1 text-xs">{doctor.credentials}</p>

        <div className="text-muted mt-3 flex items-center gap-3 text-xs">
          <span>{doctor.experience}+ yrs exp.</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span>{doctor.languages.join(", ")}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.availability.slice(0, 5).map((day) => (
            <span
              key={day}
              className="rounded-md bg-accent-500/10 px-2 py-0.5 text-[11px] font-semibold text-accent-700 dark:text-accent-300"
            >
              {day}
            </span>
          ))}
        </div>

        <Link
          href={`/appointments?doctor=${doctor.id}`}
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-900 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
        >
          <CalendarPlus className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
}
