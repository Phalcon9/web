"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { staggerItem } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/data/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      variants={staggerItem}
      className="surface group flex h-full flex-col overflow-hidden rounded-3xl border shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
    >
      <Link href={`/blog/${post.slug}`} className="relative block">
        <SmartImage
          src={post.image}
          alt={post.title}
          width={800}
          height={500}
          wrapperClassName="aspect-[16/10] w-full"
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-muted flex items-center gap-3 text-xs">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readTime} min read
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brand-700 dark:hover:text-brand-300"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300"
        >
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
