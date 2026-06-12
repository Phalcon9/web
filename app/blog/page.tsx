import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BlogBrowser } from "@/components/shared/BlogBrowser";

export const metadata: Metadata = {
  title: "Health Tips & Insights | LifeCare Specialist Hospital",
  description:
    "Wellness, prevention and expert medical advice from the specialists at LifeCare Specialist Hospital — heart health, nutrition, mental wellbeing, pediatrics and more.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Tips & Insights"
        title="Wellness, prevention & expert advice"
        subtitle="Practical, evidence-based guidance from our doctors and specialists to help you and your family live well."
        crumbs={[{ label: "Health Tips" }]}
      />
      <BlogBrowser />
    </>
  );
}
