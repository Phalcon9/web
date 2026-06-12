import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  CalendarPlus,
  ArrowRight,
} from "lucide-react";
import {
  Section,
  Container,
  Badge,
  Card,
} from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageHero } from "@/components/shared/PageHero";
import { BlogCard } from "@/components/shared/BlogCard";
import { blogPosts, getPost } from "@/lib/data/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return {
      title: "Article | LifeCare Specialist Hospital",
      description: site.description,
    };
  }
  return {
    title: `${post.title} | LifeCare Specialist Hospital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const shareLinks = [
    { label: "Share on Facebook", icon: Facebook, href: site.socials[0]?.href },
    { label: "Share on Twitter", icon: Twitter, href: site.socials[1]?.href },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: site.socials[3]?.href,
    },
    { label: "Copy link", icon: LinkIcon, href: `${site.url}/blog/${post.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[
          { label: "Health Tips", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Section>
        <Container>
          {/* Meta row */}
          <Reveal className="mx-auto max-w-3xl">
            <div className="text-muted flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Badge>{post.category}</Badge>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readTime}{" "}
                min read
              </span>
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal className="mx-auto mt-8 max-w-4xl">
            <SmartImage
              src={post.image}
              alt={post.title}
              width={1280}
              height={720}
              wrapperClassName="aspect-[16/9] w-full rounded-3xl shadow-soft"
              className="h-full w-full"
            />
          </Reveal>

          {/* Body */}
          <article className="mx-auto mt-12 max-w-3xl">
            {post.content.map((para, i) => (
              <p
                key={i}
                className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300"
              >
                {para}
              </p>
            ))}
          </article>

          {/* Share + author footer */}
          <div className="mx-auto mt-12 max-w-3xl space-y-8">
            <div className="flex flex-wrap items-center gap-3 border-y py-5">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Share2 className="h-4 w-4" aria-hidden="true" /> Share this
                article
              </span>
              <div className="flex flex-wrap gap-2">
                {shareLinks.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="surface flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-brand-500/40 hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-accent-600 text-lg font-bold text-white"
                aria-hidden="true"
              >
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-muted text-xs font-semibold uppercase tracking-widest">
                  Written by
                </p>
                <p className="text-lg font-bold">{post.author}</p>
                <p className="text-muted text-sm">
                  Specialist physician at {site.name}, dedicated to clear,
                  compassionate, evidence-based care.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Related articles */}
      {related.length > 0 && (
        <Section muted>
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Related articles
              </h2>
            </Reveal>
            <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <Container>
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl border px-6 py-12 text-center sm:px-12 sm:py-16">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Have a question about your health?
              </h2>
              <p className="text-muted mx-auto mt-3 max-w-xl text-lg">
                Our specialists are here to help. Book a consultation and take
                the first step toward feeling your best.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/appointments" size="lg">
                  <CalendarPlus className="h-5 w-5" />
                  Book an appointment
                </Button>
                <Button href="/blog" variant="outline" size="lg">
                  More health tips
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
