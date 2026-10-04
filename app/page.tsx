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
  absoluteTitle: SITE.seo.title,
  description: SITE.seo.description,
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
        <Container as="section" aria-labelledby="about-heading" className="site-section">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 id="about-heading" data-reveal className="type-meta text-ink-muted md:col-span-3">
              About
            </h2>
            <p data-reveal className="type-lead max-w-3xl md:col-span-9">
              I’m a multidisciplinary designer specialising in motion, branding, product and UI/UX design, with
              experience across sports, entertainment, fintech and digital. I create clean, intuitive digital
              experiences that balance strong visuals with thoughtful, user-focused design.
            </p>
          </div>
        </Container>

        <Container as="section" id="projects" aria-label="Selected projects" className="pt-10 md:pt-14">
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
