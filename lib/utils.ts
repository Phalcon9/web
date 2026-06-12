import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, de-duping conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with thousands separators (locale-aware). */
export function formatNumber(n: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(n);
}

/** Title-case a slug like "emergency-medicine" -> "Emergency Medicine". */
export function deslugify(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
