import { PROJECTS, PROJECT_SLUGS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import type { DisciplineSlug, Project } from "@/types/project";

export function getProjects(): Project[] {
  return PROJECT_SLUGS.map((slug) => {
    const project = PROJECTS.find((item) => item.slug === slug);
    if (!project) {
      throw new Error(`Missing project for slug: ${slug}`);
    }
    return project;
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectsByDiscipline(discipline?: DisciplineSlug): Project[] {
  const projects = getProjects();
  return discipline ? projects.filter((project) => project.disciplines.includes(discipline)) : projects;
}

export function getNextProject(slug: string): Project {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  return projects[(index + 1) % projects.length];
}

export function isDiscipline(value: unknown): value is DisciplineSlug {
  return SERVICES.some((service) => service.slug === value);
}

export function disciplineLabel(slug: DisciplineSlug): string {
  return SERVICES.find((service) => service.slug === slug)?.title ?? slug;
}
