import { ContactCTA } from "@/components/contact/ContactCTA";
import { Container } from "@/components/layout/Container";
import { RevealText } from "@/components/motion/RevealText";
import { ProjectCard } from "@/components/project/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Selected projects across motion, branding, product and UI/UX design.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();

  return (
    <>
      <Container as="section" aria-labelledby="projects-heading" className="pt-16 md:pt-24">
        <h1 id="projects-heading" data-reveal="text" className="type-display">
          <RevealText>Projects</RevealText>
        </h1>
        <p data-reveal className="type-lead mt-6 max-w-2xl text-ink-muted">
          Selected projects across motion, branding, product and UI/UX.
        </p>

        <div className="mt-12 grid gap-x-[var(--grid-gap)] gap-y-14 md:grid-cols-2 md:gap-y-20">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
