import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { departments } from "@/lib/data/departments";
import { blogPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes = [
    "/",
    "/about",
    "/departments",
    "/doctors",
    "/appointments",
    "/emergency",
    "/portal",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const departmentRoutes = departments.map((d) => ({
    url: `${base}/departments/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...departmentRoutes, ...blogRoutes];
}
