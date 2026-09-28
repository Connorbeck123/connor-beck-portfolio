import type { Project } from "@/types/project";
import { disciplineLabel } from "@/lib/projects";

export function ProjectDetails({ project }: { project: Project }) {
  const items: { label: string; value: React.ReactNode }[] = [
    { label: "Client", value: project.concept ? `${project.client} (concept)` : project.client },
    { label: "Role", value: project.role },
    {
      label: "Disciplines",
      value: (
        <span className="flex flex-col">
          {project.disciplines.map((discipline) => (
            <span key={discipline}>{disciplineLabel(discipline)}</span>
          ))}
        </span>
      ),
    },
    {
      label: "Deliverables",
      value: (
        <span className="flex flex-col">
          {project.deliverables.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      ),
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-3 lg:flex lg:justify-between">
      {items.map((item) => (
        <div key={item.label} data-reveal className="min-w-0">
          <dt className="type-meta text-ink-muted">{item.label}</dt>
          <dd className="mt-3">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
