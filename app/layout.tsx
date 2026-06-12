import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import { ThemeProvider, themeInitScript } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingEmergencyButton } from "@/components/layout/FloatingEmergencyButton";
import { ChatbotWidget } from "@/components/layout/ChatbotWidget";
import { site } from "@/lib/site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Advanced Healthcare With Compassion`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "hospital",
    "specialist hospital",
    "healthcare",
    "cardiology",
    "emergency care",
    "doctors",
    "medical center",
    "patient portal",
  ],
  openGraph: {
    type: "website",
    title: site.name,
    description: site.description,
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230a2e6e'/><path d='M50 26v48M26 50h48' stroke='white' stroke-width='12' stroke-linecap='round'/></svg>",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060c1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <a
                  href="#main"
                  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
                >
                  Skip to main content
                </a>
                <Navbar />
                <main id="main">{children}</main>
                <Footer />
                <FloatingEmergencyButton />
                <ChatbotWidget />
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
