"use client";

import { HeartPulse, Microscope, Users, Clock } from "lucide-react";
import { Section, Container, Badge } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const pillars = [
  {
    icon: HeartPulse,
    title: "Patient-First Care",
    text: "Every decision centers on your comfort, dignity, and outcomes.",
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    text: "AI-assisted diagnostics and robotic-assisted surgery.",
  },
  {
    icon: Users,
    title: "Expert Specialists",
    text: "240+ internationally trained doctors across every field.",
  },
  {
    icon: Clock,
    title: "Always Available",
    text: "24/7 emergency care and round-the-clock support.",
  },
];

export function Intro() {
  return (
    <Section>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="relative">
            <SmartImage
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80"
              alt="Modern hospital reception and healing environment"
              width={900}
              height={1000}
              wrapperClassName="aspect-[4/4.6] w-full rounded-[2rem] shadow-soft-lg"
              className="h-full w-full"
            />
            <div className="surface absolute -bottom-6 -right-4 max-w-[12rem] rounded-2xl border p-5 shadow-soft-lg sm:right-6">
              <p className="font-display text-4xl font-bold text-brand-900 dark:text-white">
                28<span className="text-accent-500">+</span>
              </p>
              <p className="text-muted mt-1 text-sm">
                Years pioneering specialist care
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Badge>Welcome to LifeCare</Badge>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              A new standard of healing, built entirely around you.
            </h2>
            <p className="text-muted mt-5 text-lg leading-relaxed">
              For nearly three decades, LifeCare Specialist Hospital has united
              world-class medical expertise with genuine human compassion. From
              our calming, light-filled spaces to our most advanced diagnostic
              technology, every detail is designed to help you and your family
              heal with confidence.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-900/8 text-brand-700 dark:bg-white/10 dark:text-brand-200">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-muted mt-1 text-sm">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Button href="/about" variant="primary" className="mt-9">
              Discover Our Story
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
