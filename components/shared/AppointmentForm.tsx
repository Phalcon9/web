"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Stethoscope,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/providers/ToastProvider";
import { departments, getDepartment } from "@/lib/data/departments";
import { doctors, getDoctor } from "@/lib/data/doctors";
import { cn } from "@/lib/utils";
import { api, ApiError } from "@/lib/api/client";

const STEPS = [
  { id: 1, label: "Specialty" },
  { id: 2, label: "Date & Time" },
  { id: 3, label: "Your Details" },
  { id: 4, label: "Review" },
] as const;

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "11:45 AM",
  "01:15 PM",
  "02:30 PM",
  "04:00 PM",
];

type PatientType = "new" | "returning";

interface FormState {
  department: string;
  doctor: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  patientType: PatientType;
}

const initialState: FormState = {
  department: "",
  doctor: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  reason: "",
  patientType: "new",
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AppointmentForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reference, setReference] = useState("");

  // Preselect from query params
  useEffect(() => {
    const doctorId = searchParams.get("doctor");
    const deptSlug = searchParams.get("department");
    if (doctorId) {
      const doc = getDoctor(doctorId);
      if (doc) {
        setForm((f) => ({
          ...f,
          doctor: doc.id,
          department: doc.departmentSlug,
        }));
        return;
      }
    }
    if (deptSlug && getDepartment(deptSlug)) {
      setForm((f) => ({ ...f, department: deptSlug }));
    }
  }, [searchParams]);

  const availableDoctors = useMemo(() => {
    if (!form.department) return doctors;
    return doctors.filter((d) => d.departmentSlug === form.department);
  }, [form.department]);

  const selectedDoctor = form.doctor ? getDoctor(form.doctor) : undefined;
  const selectedDept = form.department
    ? getDepartment(form.department)
    : undefined;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function handleDepartmentChange(value: string) {
    setForm((f) => {
      // Reset doctor if it no longer belongs to the chosen department
      const stillValid =
        f.doctor &&
        (value === "" || getDoctor(f.doctor)?.departmentSlug === value);
      return { ...f, department: value, doctor: stillValid ? f.doctor : "" };
    });
  }

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};
    if (current === 1) {
      if (!form.department) next.department = "Please choose a department.";
      if (!form.doctor) next.doctor = "Please choose a doctor.";
    }
    if (current === 2) {
      if (!form.date) next.date = "Please select a date.";
      if (!form.time) next.time = "Please select a time slot.";
    }
    if (current === 3) {
      if (!form.name.trim()) next.name = "Please enter your full name.";
      if (!form.email.trim()) next.email = "Please enter your email.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        next.email = "Please enter a valid email address.";
      if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function goBack() {
    setDirection(-1);
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleConfirm() {
    setLoading(true);
    try {
      const res = await api.post<{ reference: string }>("/appointments", {
        department: form.department,
        doctor: form.doctor,
        date: form.date,
        time: form.time,
        name: form.name,
        email: form.email,
        phone: form.phone,
        reason: form.reason || undefined,
        patientType: form.patientType,
      });
      setReference(res.reference);
      setConfirmed(true);
      toast({
        kind: "success",
        title: "Appointment confirmed",
        description: `Reference ${res.reference}. We've sent the details to your email.`,
      });
    } catch (err) {
      toast({
        kind: "error",
        title: "Booking failed",
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setForm(initialState);
    setErrors({});
    setStep(1);
    setConfirmed(false);
    setReference("");
    setDirection(1);
  }

  // Success state
  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400"
        >
          <CheckCircle2 className="h-12 w-12" aria-hidden="true" />
        </motion.span>
        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
          Appointment Requested!
        </h2>
        <p className="text-muted mt-2 max-w-md">
          Thank you, {form.name.split(" ")[0] || "there"}. Your request has been
          received. A confirmation has been sent to your email and phone by SMS.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-5 py-2 text-sm font-semibold text-gold-700 dark:text-gold-300">
          Reference
          <span className="font-mono tracking-wider">{reference}</span>
        </div>

        <dl className="surface-2 mt-8 w-full max-w-md space-y-3 rounded-2xl border p-6 text-left text-sm">
          <SummaryRow
            label="Department"
            value={selectedDept?.name ?? "—"}
          />
          <SummaryRow label="Doctor" value={selectedDoctor?.name ?? "—"} />
          <SummaryRow label="Date" value={formatDate(form.date)} />
          <SummaryRow label="Time" value={form.time || "—"} />
          <SummaryRow label="Patient" value={form.name} />
          <SummaryRow label="Email" value={form.email} />
          <SummaryRow label="Phone" value={form.phone} />
        </dl>

        <div className="mt-8">
          <Button variant="outline" onClick={reset}>
            Book another appointment
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <ol className="mb-10 flex items-center">
        {STEPS.map((s, i) => {
          const isComplete = step > s.id;
          const isActive = step === s.id;
          return (
            <li
              key={s.id}
              className={cn(
                "flex items-center",
                i < STEPS.length - 1 && "flex-1",
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    isComplete &&
                      "border-accent-500 bg-accent-500 text-white",
                    isActive &&
                      "border-brand-900 bg-brand-900 text-white dark:border-brand-500 dark:bg-brand-600",
                    !isComplete &&
                      !isActive &&
                      "border-slate-300 text-slate-400 dark:border-slate-600",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    s.id
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold sm:block",
                    isActive ? "text-brand-900 dark:text-white" : "text-muted",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mx-3",
                    step > s.id
                      ? "bg-accent-500"
                      : "bg-slate-200 dark:bg-slate-700",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Steps */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <StepHeading
                  icon={Stethoscope}
                  title="Department & Doctor"
                  subtitle="Tell us which specialty you need and who you'd like to see."
                />
                <Select
                  label="Department"
                  required
                  value={form.department}
                  error={errors.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                >
                  <option value="">Choose a department…</option>
                  {departments.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Doctor"
                  required
                  value={form.doctor}
                  error={errors.doctor}
                  hint={
                    form.department
                      ? undefined
                      : "Select a department first, or browse all specialists."
                  }
                  onChange={(e) => update("doctor", e.target.value)}
                >
                  <option value="">Choose a doctor…</option>
                  {availableDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <StepHeading
                  icon={CalendarDays}
                  title="Date & Time"
                  subtitle="Pick a day and a time slot that works best for you."
                />
                <Input
                  label="Preferred date"
                  type="date"
                  required
                  min={todayISO()}
                  value={form.date}
                  error={errors.date}
                  onChange={(e) => update("date", e.target.value)}
                />
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Preferred time
                    <span className="ml-0.5 text-red-500">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {TIME_SLOTS.map((slot) => {
                      const active = form.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update("time", slot)}
                          className={cn(
                            "inline-flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-all focus-visible:outline-gold-500",
                            active
                              ? "border-brand-900 bg-brand-900 text-white shadow-soft dark:border-brand-500 dark:bg-brand-600"
                              : "surface text-muted hover:border-brand-900/30 hover:text-brand-900 dark:hover:border-white/30 dark:hover:text-white",
                          )}
                        >
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && (
                    <p role="alert" className="mt-2 text-xs font-medium text-red-500">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <StepHeading
                  icon={User}
                  title="Your Details"
                  subtitle="We'll use these to confirm your appointment and send reminders."
                />
                <Input
                  label="Full name"
                  required
                  autoComplete="name"
                  value={form.name}
                  error={errors.name}
                  placeholder="Jane Doe"
                  onChange={(e) => update("name", e.target.value)}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    error={errors.email}
                    placeholder="jane@example.com"
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    error={errors.phone}
                    placeholder="+1 (800) 555-0142"
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <Select
                  label="Are you a new or returning patient?"
                  value={form.patientType}
                  onChange={(e) =>
                    update("patientType", e.target.value as PatientType)
                  }
                >
                  <option value="new">New patient</option>
                  <option value="returning">Returning patient</option>
                </Select>
                <Textarea
                  label="Reason for visit / symptoms"
                  hint="Optional — a short note helps your doctor prepare."
                  value={form.reason}
                  placeholder="Briefly describe your symptoms or reason for the visit…"
                  onChange={(e) => update("reason", e.target.value)}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <StepHeading
                  icon={CheckCircle2}
                  title="Review & Confirm"
                  subtitle="Please confirm the details below before submitting."
                />
                <dl className="surface-2 space-y-3 rounded-2xl border p-6 text-sm">
                  <SummaryRow
                    label="Department"
                    value={selectedDept?.name ?? "—"}
                    icon={Stethoscope}
                  />
                  <SummaryRow
                    label="Doctor"
                    value={selectedDoctor?.name ?? "—"}
                    icon={User}
                  />
                  <SummaryRow
                    label="Date"
                    value={formatDate(form.date)}
                    icon={CalendarDays}
                  />
                  <SummaryRow
                    label="Time"
                    value={form.time || "—"}
                    icon={Clock}
                  />
                  <SummaryRow label="Name" value={form.name} icon={User} />
                  <SummaryRow label="Email" value={form.email} icon={Mail} />
                  <SummaryRow label="Phone" value={form.phone} icon={Phone} />
                  <SummaryRow
                    label="Patient type"
                    value={
                      form.patientType === "new"
                        ? "New patient"
                        : "Returning patient"
                    }
                  />
                  {form.reason.trim() && (
                    <SummaryRow label="Reason" value={form.reason} />
                  )}
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 1 ? (
          <Button variant="ghost" onClick={goBack} disabled={loading}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}

        {step < STEPS.length ? (
          <Button variant="primary" onClick={goNext}>
            Continue
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button variant="gold" onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Confirming…
              </>
            ) : (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Confirm Appointment
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function StepHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-900/5 text-brand-700 dark:bg-white/5 dark:text-brand-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted mt-1 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-3 last:border-0 last:pb-0 dark:border-white/10">
      <dt className="text-muted flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        {label}
      </dt>
      <dd className="max-w-[60%] text-right font-semibold">{value}</dd>
    </div>
  );
}
