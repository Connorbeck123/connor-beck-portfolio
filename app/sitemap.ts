import { SITE } from "@/content/site";
import { getProjects } from "@/lib/projects";

export default function sitemap() {
  const pages = ["", "/work", "/services", "/contact", "/privacy"].map((path) => ({
    url: `${SITE.url}${path || "/"}`,
    lastModified: new Date(),
  }));

  const projects = getProjects().map((project) => ({
    url: `${SITE.url}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...projects];
}
