import { cn } from "@/lib/utils";

/** Page section with consistent vertical rhythm. */
export function Section({
  children,
  className,
  id,
  muted,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        muted && "surface-2",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-px", className)}>{children}</div>;
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  hover,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface rounded-3xl border p-6 shadow-soft",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted mt-4 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
