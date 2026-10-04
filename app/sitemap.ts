import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ].map(({ path, priority }) => ({ url: new URL(path, SITE.url).toString(), priority }));

  const projects = getProjects().map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    priority: 0.8,
  }));

  return [...pages, ...projects];
}
