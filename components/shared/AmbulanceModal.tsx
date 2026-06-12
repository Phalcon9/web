"use client";

import { Ambulance, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { api, ApiError } from "@/lib/api/client";
import { useToast } from "@/providers/ToastProvider";

interface DispatchResult {
  unit: string;
  etaMinutes: number;
  crew: string;
}

export function AmbulanceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [stage, setStage] = useState<"form" | "dispatched">("form");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DispatchResult | null>(null);

  const dispatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await api.post<DispatchResult>("/ambulance", {
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        address: String(fd.get("address") ?? ""),
        description: String(fd.get("description") ?? "") || undefined,
      });
      setResult(res);
      setStage("dispatched");
    } catch (err) {
      toast({
        kind: "error",
        title: "Dispatch failed",
        description: err instanceof ApiError ? err.message : "Please call us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after the close animation.
    setTimeout(() => setStage("form"), 300);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={stage === "form" ? "Request an Ambulance" : "Ambulance Dispatched"}
      description={
        stage === "form"
          ? "Share your location and we'll dispatch the nearest unit immediately."
          : undefined
      }
    >
      {stage === "form" ? (
        <form onSubmit={dispatch} className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-2xl bg-red-500/10 p-4 text-sm">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <p>
              For immediate help, call{" "}
              <a
                href={site.ambulancePhoneHref}
                className="font-bold text-red-600 underline dark:text-red-400"
              >
                {site.ambulancePhone}
              </a>
              . This form dispatches a unit to your location.
            </p>
          </div>
          <Input label="Full name" name="name" required placeholder="Your name" />
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+1 (___) ___-____"
          />
          <Input
            label="Pickup address / location"
            name="address"
            required
            placeholder="Street, building, landmark"
          />
          <Input
            label="Emergency description (optional)"
            name="description"
            placeholder="Briefly describe the situation"
          />
          <Button
            type="submit"
            variant="emergency"
            size="lg"
            disabled={loading}
            className="mt-2"
          >
            <Ambulance className="h-5 w-5" />
            {loading ? "Dispatching…" : "Dispatch Ambulance Now"}
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/15">
            <CheckCircle2 className="h-9 w-9 text-accent-500" />
          </span>
          <div>
            <p className="text-lg font-bold">Help is on the way</p>
            <p className="text-muted mt-1 text-sm">
              Unit #{result?.unit ?? "A-14"} has been dispatched to your location.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            <div className="rounded-2xl surface-2 p-4">
              <p className="text-muted text-xs uppercase tracking-wide">
                Estimated arrival
              </p>
              <p className="text-2xl font-bold text-accent-500">
                {result?.etaMinutes ?? 8} min
              </p>
            </div>
            <div className="rounded-2xl surface-2 p-4">
              <p className="text-muted text-xs uppercase tracking-wide">
                Crew
              </p>
              <p className="text-2xl font-bold">{result?.crew ?? "2 paramedics"}</p>
            </div>
          </div>
          <p className="text-muted flex items-center gap-1.5 text-sm">
            <MapPin className="h-4 w-4 text-red-500" /> Live tracking sent via SMS
          </p>
          <Button onClick={handleClose} variant="outline" className="mt-1 w-full">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}
