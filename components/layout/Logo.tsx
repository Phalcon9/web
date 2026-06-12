import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="LifeCare Specialist Hospital — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-900 to-brand-700 shadow-soft transition-transform group-hover:scale-105">
        <Plus className="h-5 w-5 text-white" strokeWidth={3} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-white dark:ring-[rgb(var(--bg))]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight">
            LifeCare
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Specialist Hospital
          </span>
        </span>
      )}
    </Link>
  );
}
