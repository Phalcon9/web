"use client";

import { Ambulance, Phone, X, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AmbulanceModal } from "@/components/shared/AmbulanceModal";
import { site } from "@/lib/site";

export function FloatingEmergencyButton() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[600] flex flex-col items-start gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              className="flex flex-col gap-2"
            >
              <a
                href={site.emergencyPhoneHref}
                className="surface flex items-center gap-3 rounded-full border py-2.5 pl-3 pr-5 shadow-soft-lg transition hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] text-muted">Emergency line</span>
                  <span className="text-sm font-bold">{site.emergencyPhone}</span>
                </span>
              </a>
              <button
                onClick={() => {
                  setModal(true);
                  setOpen(false);
                }}
                className="surface flex items-center gap-3 rounded-full border py-2.5 pl-3 pr-5 shadow-soft-lg transition hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500/15 text-accent-500">
                  <Ambulance className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold">Request Ambulance</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close emergency menu" : "Open emergency menu"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-soft-lg transition hover:bg-red-700"
        >
          {!open && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red-500" />
          )}
          <span className="relative">
            {open ? <X className="h-6 w-6" /> : <Plus className="h-7 w-7" strokeWidth={3} />}
          </span>
        </button>
      </div>

      <AmbulanceModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
