import type { DisciplineSlug } from "@/types/project";
import { disciplineLabel } from "@/lib/projects";
import { cn } from "@/lib/cn";

type DisciplineTagsProps = {
  disciplines: DisciplineSlug[];
  concept?: boolean;
  /** Fade and rise into view on scroll. */
  reveal?: boolean;
  className?: string;
};

export function DisciplineTags({ disciplines, concept, reveal, className }: DisciplineTagsProps) {
  return (
    <ul
      data-reveal={reveal || undefined}
      className={cn("flex flex-wrap gap-1.5", className)}
      aria-label="Disciplines"
    >
      {disciplines.map((discipline) => (
        <li key={discipline} className="rounded-full border border-line px-2.5 py-1 text-xs leading-none">
          {disciplineLabel(discipline)}
        </li>
      ))}
      {concept ? (
        <li className="rounded-full bg-accent px-2.5 py-1 text-xs leading-none text-canvas">Concept</li>
      ) : null}
    </ul>
  );
}
