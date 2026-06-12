import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "emergency" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-900 text-white hover:bg-brand-800 shadow-soft hover:shadow-soft-lg dark:bg-brand-600 dark:hover:bg-brand-500",
  emergency:
    "bg-red-600 text-white hover:bg-red-700 shadow-soft hover:shadow-soft-lg",
  gold: "bg-gold-500 text-brand-950 hover:bg-gold-400 shadow-soft hover:shadow-glow",
  outline:
    "border border-brand-900/20 text-brand-900 hover:bg-brand-900/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10",
  ghost:
    "text-brand-900 hover:bg-brand-900/5 dark:text-white dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-gold-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap";

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { external, href } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
