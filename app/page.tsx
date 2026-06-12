import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { EmergencyHotline } from "@/components/home/EmergencyHotline";
import { StatsCounters } from "@/components/home/StatsCounters";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <EmergencyHotline />
      <StatsCounters />
      <Testimonials />
      <Partners />
      <BlogPreview />
      <CTASection />
    </>
  );
}
