"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  LogOut,
  CalendarClock,
  Pill,
  FlaskConical,
  FileText,
  Download,
  RefreshCw,
  CalendarPlus,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { api, ApiError } from "@/lib/api/client";
import type {
  PortalAppointment,
  PortalDashboard,
  PortalPrescription,
  PortalRecord,
  PortalResult,
} from "@/lib/api/types";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function errMessage(e: unknown) {
  return e instanceof ApiError ? e.message : "Something went wrong.";
}

function StatusBadge({
  tone,
  children,
}: {
  tone: "green" | "amber" | "neutral";
  children: React.ReactNode;
}) {
  const tones: Record<typeof tone, string> = {
    green:
      "border-accent-500/30 bg-accent-500/10 text-accent-700 dark:text-accent-300",
    amber:
      "border-gold-500/40 bg-gold-500/10 text-gold-700 dark:text-gold-300",
    neutral:
      "border-brand-900/15 bg-brand-900/5 text-brand-900 dark:border-white/15 dark:bg-white/10 dark:text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Auth (logged out)                                                          */
/* -------------------------------------------------------------------------- */

const trustPoints = [
  { icon: ShieldCheck, label: "256-bit encryption" },
  { icon: Lock, label: "HIPAA-style privacy" },
  { icon: KeyRound, label: "Secure session sign-in" },
];

function AuthCard() {
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast({ kind: "success", title: "Welcome back" });
    } catch (err) {
      toast({ kind: "error", title: "Sign in failed", description: errMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signup(name, email, password);
      toast({ kind: "success", title: "Account created" });
    } catch (err) {
      toast({ kind: "error", title: "Sign up failed", description: errMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-7 sm:p-8">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Authentication"
          className="surface-2 grid grid-cols-2 gap-1 rounded-full p-1"
        >
          {(
            [
              { id: "signin", label: "Sign In" },
              { id: "signup", label: "Sign Up" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-10 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                tab === t.id
                  ? "bg-brand-900 text-white dark:bg-brand-600"
                  : "text-muted hover:text-current"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "signin" ? (
            <form onSubmit={onSignIn} className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">
                  Sign in to your account
                </h2>
                <p className="text-muted mt-1 text-sm">
                  Access your records, prescriptions and results.
                </p>
              </div>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="Demo: patient@lifecare.test / Password123!"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={busy}
                className="mt-1 w-full"
              >
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          ) : (
            <form onSubmit={onSignUp} className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">
                  Create your account
                </h2>
                <p className="text-muted mt-1 text-sm">
                  Join the LifeCare patient portal in seconds.
                </p>
              </div>
              <Input
                label="Full name"
                autoComplete="name"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="At least 8 characters"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={busy}
                className="mt-1 w-full"
              >
                {busy ? "Creating…" : "Create account"}
              </Button>
            </form>
          )}
        </div>

        {/* Trust row */}
        <div className="mt-7 border-t pt-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
            {trustPoints.map((p) => (
              <li
                key={p.label}
                className="text-muted flex items-center gap-1.5 text-xs font-medium"
              >
                <p.icon className="h-4 w-4 text-accent-500" />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard (logged in)                                                      */
/* -------------------------------------------------------------------------- */

const TABS = [
  { id: "records", label: "Medical Records", icon: FileText },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "results", label: "Test Results", icon: FlaskConical },
  { id: "appointments", label: "Appointments", icon: CalendarClock },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("records");
  const [data, setData] = useState<PortalDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const d = await api.get<PortalDashboard>("/portal/dashboard");
      setData(d);
    } catch (err) {
      toast({ kind: "error", title: "Could not load portal", description: errMessage(err) });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const onRefill = async (id: string) => {
    try {
      await api.post(`/portal/prescriptions/${id}/refill`);
      toast({
        kind: "success",
        title: "Refill requested",
        description: "Your pharmacy will be notified shortly.",
      });
      void load();
    } catch (err) {
      toast({ kind: "error", title: "Refill failed", description: errMessage(err) });
    }
  };

  const onDownload = async (id: string) => {
    try {
      const res = await api.get<{ message: string }>(
        `/portal/results/${id}/download`,
      );
      toast({ kind: "info", title: "Download", description: res.message });
    } catch (err) {
      toast({ kind: "error", title: "Download failed", description: errMessage(err) });
    }
  };

  const onReschedule = async (id: string) => {
    try {
      await api.patch(`/portal/appointments/${id}/reschedule`, {});
      toast({
        kind: "info",
        title: "Reschedule requested",
        description: "Our team will reach out to confirm a new time.",
      });
      void load();
    } catch (err) {
      toast({ kind: "error", title: "Reschedule failed", description: errMessage(err) });
    }
  };

  const onCancel = async (id: string) => {
    try {
      await api.del(`/portal/appointments/${id}`);
      toast({ kind: "success", title: "Appointment cancelled" });
      void load();
    } catch (err) {
      toast({ kind: "error", title: "Cancel failed", description: errMessage(err) });
    }
  };

  const onLogout = async () => {
    await logout();
    toast({ kind: "info", title: "Signed out" });
  };

  if (!user) return null;

  const stats = [
    {
      icon: CalendarClock,
      label: "Upcoming Appointments",
      value: data?.stats.appointments ?? 0,
    },
    { icon: Pill, label: "Active Prescriptions", value: data?.stats.prescriptions ?? 0 },
    { icon: FlaskConical, label: "Recent Results", value: data?.stats.results ?? 0 },
    { icon: FileText, label: "Medical Records", value: data?.stats.records ?? 0 },
  ];

  return (
    <div>
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-white dark:bg-brand-600">
            <UserRound className="h-7 w-7" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold">
              Welcome back, {user.name}
            </h2>
            <p className="text-muted mt-0.5 text-sm">
              Patient ID:{" "}
              <span className="font-semibold text-accent-600 dark:text-accent-400">
                {user.patientId}
              </span>
            </p>
          </div>
        </div>
        <Button type="button" onClick={onLogout} variant="outline" size="md">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <s.icon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold leading-none">
                {s.value}
              </p>
              <p className="text-muted mt-1 text-sm">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Portal sections"
        className="mt-10 flex flex-wrap gap-2"
      >
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                active
                  ? "border-transparent bg-brand-900 text-white dark:bg-brand-600"
                  : "surface text-muted hover:text-current"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {loading ? (
          <div className="surface h-64 animate-pulse rounded-3xl border" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === "records" && (
                <RecordsTab records={data?.records ?? []} />
              )}
              {activeTab === "prescriptions" && (
                <PrescriptionsTab
                  prescriptions={data?.prescriptions ?? []}
                  onRefill={onRefill}
                />
              )}
              {activeTab === "results" && (
                <ResultsTab results={data?.results ?? []} onDownload={onDownload} />
              )}
              {activeTab === "appointments" && (
                <AppointmentsTab
                  appointments={data?.appointments ?? []}
                  onReschedule={onReschedule}
                  onCancel={onCancel}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Tab panels --------------------------------- */

function RecordsTab({ records }: { records: PortalRecord[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {records.map((r) => (
        <li key={r.id}>
          <Card hover className="h-full">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900/5 text-brand-900 dark:bg-white/10 dark:text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {r.title}
                  </h3>
                  <p className="text-muted mt-0.5 text-sm">{r.department}</p>
                </div>
              </div>
              <StatusBadge tone="green">{r.status}</StatusBadge>
            </div>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              {r.summary}
            </p>
            <div className="text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Stethoscope className="h-4 w-4" /> {r.doctor}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4" /> {formatDate(r.date)}
              </span>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

function PrescriptionsTab({
  prescriptions,
  onRefill,
}: {
  prescriptions: PortalPrescription[];
  onRefill: (id: string) => void;
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {prescriptions.map((p) => (
        <li key={p.id}>
          <Card className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                  <Pill className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {p.medication}
                  </h3>
                  <p className="text-muted mt-0.5 text-sm">{p.dosage}</p>
                </div>
              </div>
              {p.active ? (
                <StatusBadge tone="green">Active</StatusBadge>
              ) : (
                <StatusBadge tone="neutral">Inactive</StatusBadge>
              )}
            </div>
            <div className="text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="flex items-center gap-1.5">
                <Stethoscope className="h-4 w-4" /> {p.prescribedBy}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4" /> {formatDate(p.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" /> {p.refills} refills left
              </span>
            </div>
            {p.active && (
              <div className="mt-4 border-t pt-4">
                <Button
                  type="button"
                  onClick={() => onRefill(p.id)}
                  variant="outline"
                  size="sm"
                  disabled={!!p.refillStatus}
                >
                  <RefreshCw className="h-4 w-4" />
                  {p.refillStatus ? "Refill requested" : "Request refill"}
                </Button>
              </div>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}

function ResultsTab({
  results,
  onDownload,
}: {
  results: PortalResult[];
  onDownload: (id: string) => void;
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {results.map((r) => {
        const attention = r.status === "Attention";
        return (
          <li key={r.id}>
            <Card className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900/5 text-brand-900 dark:bg-white/10 dark:text-white">
                    <FlaskConical className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {r.test}
                    </h3>
                    <p className="text-muted mt-0.5 text-sm">
                      {formatDate(r.date)}
                    </p>
                  </div>
                </div>
                <StatusBadge tone={attention ? "amber" : "green"}>
                  {r.status}
                </StatusBadge>
              </div>
              <p className="mt-4 text-sm font-medium">{r.value}</p>
              <div className="mt-4 border-t pt-4">
                <Button
                  type="button"
                  onClick={() => onDownload(r.id)}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

function AppointmentsTab({
  appointments,
  onReschedule,
  onCancel,
}: {
  appointments: PortalAppointment[];
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold">Your appointments</h3>
        <Button href="/appointments" variant="primary" size="sm">
          <CalendarPlus className="h-4 w-4" />
          Book new appointment
        </Button>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {appointments.map((a) => {
          const pending = a.status !== "Confirmed";
          return (
            <li key={a.id}>
              <Card className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900/5 text-brand-900 dark:bg-white/10 dark:text-white">
                      <CalendarClock className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold leading-tight">
                        {a.type}
                      </h4>
                      <p className="text-muted mt-0.5 text-sm">
                        {a.doctor} • {a.department}
                      </p>
                    </div>
                  </div>
                  <StatusBadge tone={pending ? "amber" : "green"}>
                    {a.status}
                  </StatusBadge>
                </div>
                <div className="text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> {formatDate(a.date)}
                  </span>
                  <span>{a.time}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                  <Button
                    type="button"
                    onClick={() => onReschedule(a.id)}
                    variant="outline"
                    size="sm"
                  >
                    Reschedule
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onCancel(a.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root                                                                       */
/* -------------------------------------------------------------------------- */

export function PatientPortal() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="mx-auto max-w-md">
        <div className="surface h-[420px] animate-pulse rounded-3xl border" />
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthCard />;
}
