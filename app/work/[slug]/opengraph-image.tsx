import { disciplineLabel, getProjectBySlug, getProjects } from "@/lib/projects";
import { OG_SIZE, ogCard } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return ogCard({
    eyebrow: project?.client ?? "Project",
    title: project?.title ?? "Project",
    subtitle: project
      ? `${project.disciplines.slice(0, 2).map(disciplineLabel).join(" · ")} — ${project.summary}`
      : "",
  });
}
