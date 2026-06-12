import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep blue — trust, medical authority
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bcd2ff",
          300: "#8eb4ff",
          400: "#598bff",
          500: "#3461fb",
          600: "#1f41f0",
          700: "#1a32dc",
          800: "#1c2bb2",
          900: "#0a2e6e",
          950: "#081a45",
        },
        // Soft green — health, calm, vitality
        accent: {
          50: "#eafff5",
          100: "#cdfde6",
          200: "#9ff8d2",
          300: "#62eeba",
          400: "#2fb587",
          500: "#16a374",
          600: "#0b835f",
          700: "#0a684e",
          800: "#0b5240",
          900: "#0a4435",
          950: "#03261e",
        },
        // Subtle gold — luxury accents
        gold: {
          50: "#fbf8ef",
          100: "#f5edd2",
          200: "#ead9a3",
          300: "#dec06d",
          400: "#d3a847",
          500: "#c9a24b",
          600: "#a87d33",
          700: "#875f2c",
          800: "#714d2b",
          900: "#614128",
          950: "#382213",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(10, 46, 110, 0.12)",
        "soft-lg": "0 18px 50px -18px rgba(10, 46, 110, 0.22)",
        glow: "0 0 0 1px rgba(201, 162, 75, 0.25), 0 12px 40px -12px rgba(201, 162, 75, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.215,0.61,0.355,1) infinite",
        shimmer: "shimmer 1.6s infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
