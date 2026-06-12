import Link from "next/link";
import { Home, Phone, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-900/8 text-brand-700 dark:bg-white/10 dark:text-brand-200">
          <Stethoscope className="h-8 w-8" />
        </span>
        <p className="mt-8 font-display text-7xl font-bold text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          This page seems to have checked out
        </h1>
        <p className="text-muted mt-4 max-w-md text-lg">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s get
          you back to care.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" variant="primary">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
          <Button href={site.mainPhoneHref} external size="lg" variant="outline">
            <Phone className="h-5 w-5" />
            Call Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
