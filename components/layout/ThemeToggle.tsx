"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${className ?? ""}`}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex"
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-gold-400" />
        ) : (
          <Sun className="h-5 w-5 text-gold-500" />
        )}
      </motion.span>
    </button>
  );
}
