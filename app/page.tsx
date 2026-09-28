import Link from "next/link";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ClientMarquee } from "@/components/ui/ClientMarquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolGrid } from "@/components/ui/ToolGrid";
import { SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
import { cn } from "@/lib/cn";

export const metadata = createPageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

/** Editorial rhythm for the selected work grid: wide, pair, pair, wide. */
const LAYOUT = [
  { span: "md:col-span-12", aspect: "21/9", size: "large" },
  { span: "md:col-span-6", aspect: "4/3", size: "default" },
  { span: "md:col-span-6", aspect: "4/3", size: "default" },
  { span: "md:col-span-6", aspect: "4/3", size: "default" },
  { span: "md:col-span-6", aspect: "4/3", size: "default" },
  { span: "md:col-span-12", aspect: "21/9", size: "large" },
] as const;

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <Hero />

      {/* Scrolls up over the sticky hero; the negative margin takes over <main>'s bottom padding so the hero never peeks out below. */}
      <div className="relative z-10 -mb-[var(--space-section)] bg-canvas pb-[var(--space-section)]">
        <Container as="section" id="projects" aria-label="Selected projects" className="site-section">
          <SectionHeader eyebrow="Selected projects" action={{ href: "/work", label: "View all projects" }} />
          <div className="mt-8 grid gap-x-[var(--grid-gap)] gap-y-14 md:grid-cols-12 md:gap-y-20">
            {projects.map((project, index) => {
              const layout = LAYOUT[index % LAYOUT.length];

              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  aspect={layout.aspect}
                  size={layout.size}
                  className={cn(layout.span)}
                />
              );
            })}
          </div>
          <div className="mt-16 flex justify-center">
            <Link href="/work" className="btn btn-secondary">
              View all projects
            </Link>
          </div>
        </Container>

        <ClientMarquee />

        <ToolGrid />

        <ServicesSection />

        <ContactCTA />
      </div>
    </>
  );
}
