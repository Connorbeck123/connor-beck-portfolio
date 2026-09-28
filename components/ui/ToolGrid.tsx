import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";

type ToolGridProps = {
  eyebrow?: string;
  className?: string;
};

export function ToolGrid({ eyebrow = "Tools I use", className }: ToolGridProps) {
  return (
    <Container as="section" aria-label={eyebrow} className={cn("site-section", className)}>
      <SectionHeader eyebrow={eyebrow} />
      <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-[var(--grid-gap)]">
        {SITE.tools.map((tool) => (
          <li
            key={tool.name}
            data-reveal
            className="flex items-center gap-4 rounded-media border border-line bg-canvas-elevated/60 p-3 pr-5"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-[calc(var(--radius-media)-0.25rem)] border border-dashed border-line bg-canvas md:size-16">
              <Image src={tool.icon} width={64} height={64} alt="" className="size-9 object-contain md:size-10" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium">{tool.name}</span>
              <span className="block text-sm text-ink-muted">{tool.use}</span>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
