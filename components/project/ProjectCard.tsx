import Link from "next/link";
import type { AspectRatio, Project } from "@/types/project";
import { Media } from "@/components/media/Media";
import { DisciplineTags } from "@/components/project/DisciplineTags";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  aspect?: AspectRatio;
  size?: "default" | "large";
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function ProjectCard({
  project,
  aspect = "16/10",
  size = "default",
  headingLevel: Heading = "h3",
  className,
}: ProjectCardProps) {
  return (
    <article className={className}>
      <Link href={`/work/${project.slug}`} className="group block">
        <Media
          media={project.cover}
          aspect={aspect}
          mobileAspect="16/10"
          sizes={size === "large" ? "(min-width: 1600px) 1520px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        />
        <div data-reveal className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Heading
              className={cn(
                "transition-colors duration-300 group-hover:text-accent",
                size === "large" ? "type-section" : "text-lg font-medium md:text-xl",
              )}
            >
              {project.title}
            </Heading>
            <p className="mt-1 text-ink-muted">{project.client}</p>
          </div>
          <DisciplineTags
            disciplines={project.disciplines}
            concept={project.concept}
            className="sm:justify-end sm:pt-1"
          />
        </div>
      </Link>
    </article>
  );
}
