"use client";

import { useState } from "react";
import { Phone, Ambulance, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AmbulanceModal } from "@/components/shared/AmbulanceModal";
import { site } from "@/lib/site";

export function EmergencyActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Call Emergency Now */}
        <div className="surface flex flex-col gap-3 rounded-3xl border border-red-500/30 p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Call Emergency Now</p>
              <p className="text-muted text-sm">Life-threatening situations</p>
            </div>
          </div>
          <Button
            href={site.emergencyPhoneHref}
            external
            variant="emergency"
            size="lg"
            className="w-full"
          >
            <Phone className="h-5 w-5" />
            {site.emergencyPhone}
          </Button>
        </div>

        {/* Request Ambulance */}
        <div className="surface flex flex-col gap-3 rounded-3xl border border-gold-500/30 p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-brand-950">
              <Ambulance className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Request Ambulance</p>
              <p className="text-muted text-sm">Dispatch to your location</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            variant="gold"
            size="lg"
            className="w-full"
          >
            <Ambulance className="h-5 w-5" />
            Request Ambulance
          </Button>
        </div>

        {/* Call Main Line */}
        <div className="surface flex flex-col gap-3 rounded-3xl border p-6 shadow-soft sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-white dark:bg-brand-600">
              <PhoneCall className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Call Main Line</p>
              <p className="text-muted text-sm">General enquiries &amp; advice</p>
            </div>
          </div>
          <Button
            href={site.mainPhoneHref}
            external
            variant="outline"
            size="lg"
            className="w-full"
          >
            <PhoneCall className="h-5 w-5" />
            {site.mainPhone}
          </Button>
        </div>
      </div>

      <AmbulanceModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
