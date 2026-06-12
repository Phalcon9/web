"use client";

import { ArrowRight } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/ui/primitives";
import { StaggerGroup, Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/lib/data/blog";
import { useLanguage } from "@/providers/LanguageProvider";

export function BlogPreview() {
  const { t } = useLanguage();
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={t("section.blog")}
            title="Health insights from our experts"
            className="mx-0"
          />
          <Reveal>
            <Button href="/blog" variant="outline">
              {t("cta.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
