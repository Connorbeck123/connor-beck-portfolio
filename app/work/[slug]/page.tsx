import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Media } from "@/components/media/Media";
import { RevealText } from "@/components/motion/RevealText";
import { DisciplineTags } from "@/components/project/DisciplineTags";
import { ProjectBlocks } from "@/components/project/ProjectBlocks";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { HyperliquidFoundations } from "@/components/project/hyperliquid/HyperliquidFoundations";
import { HyperliquidWireframe } from "@/components/project/hyperliquid/HyperliquidWireframe";
import { ProjectFooter } from "@/components/project/ProjectFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { getNextProject, getProjectBySlug, getProjects } from "@/lib/projects";
import { projectSchema } from "@/lib/schema";
import type { Project } from "@/types/project";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return createPageMetadata({ title: "Project", description: "Project not found.", noIndex: true });

  return createPageMetadata({
    title: project.title,
    absoluteTitle: project.seo.title,
    description: project.seo.description,
    path: `/work/${slug}`,
    image: { url: `/work/${slug}/opengraph-image`, alt: `${project.title} — ${project.client}` },
  });
}

function TextRow({ label, children, credits }: { label: string; children: React.ReactNode; credits?: Project["credits"] }) {
  return (
    <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-[var(--grid-gap)]">
      <h2 data-reveal className="type-meta text-ink-muted md:col-span-4">
        {label}
      </h2>
      <p data-reveal className="type-lead max-w-3xl md:col-span-8 md:col-start-5">
        {children}
      </p>
      {credits?.length ? (
        <dl data-reveal className="mt-4 space-y-1 text-ink-muted md:col-span-8 md:col-start-5 md:mt-6">
          {credits.map((credit) => (
            <div key={`${credit.role}-${credit.name}`}>
              <dt className="inline">{credit.role}: </dt>
              <dd className="inline">{credit.name}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const next = getNextProject(project.slug);
  const isFull = project.format === "full";

  return (
    <article>
      <JsonLd data={projectSchema(project)} />
      <Container as="header" className="pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" data-reveal className="text-sm text-ink-muted">
          <Link href="/work" className="link-hover">
            Projects
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <div className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12 md:items-end md:gap-[var(--grid-gap)]">
          <div className="md:col-span-8">
            <h1 data-reveal="text" className="type-display">
              <RevealText>{project.title}</RevealText>
            </h1>
            <p data-reveal className="type-lead mt-6 max-w-2xl text-ink-muted">
              {project.summary}
            </p>
          </div>
          <DisciplineTags
            disciplines={project.disciplines}
            concept={project.concept}
            reveal
            className="md:col-span-4 md:justify-end"
          />
        </div>
      </Container>

      <Container className="mt-10 md:mt-14">
        <Media media={project.hero} priority />
      </Container>

      <Container as="section" aria-label="Project details" className="mt-10 md:mt-14">
        <ProjectDetails project={project} />
      </Container>

      <Container as="section" aria-label="Overview" className="mt-[var(--space-block)] flex flex-col gap-[var(--space-block)]">
        <TextRow label={isFull ? "The brief" : "About the project"}>{project.brief}</TextRow>
        {project.approach ? <TextRow label="The approach">{project.approach}</TextRow> : null}
      </Container>

      {project.slug === "hyperliquid" ? (
        <Container className="mt-[var(--space-block)]">
          <div data-reveal="media" className="overflow-hidden rounded-media border border-line bg-[#111111] text-white">
            <HyperliquidWireframe />
          </div>
        </Container>
      ) : null}

      <div className="mt-[var(--space-block)]">
        <ProjectBlocks blocks={project.blocks} />
      </div>

      {project.slug === "hyperliquid" ? (
        <div className="mt-[var(--space-block)]">
          <HyperliquidFoundations />
        </div>
      ) : null}

      {project.outcome ? (
        <Container as="section" aria-label="Outcome" className="mt-[var(--space-block)]">
          <TextRow label="Outcome" credits={project.credits}>
            {project.outcome}
          </TextRow>
        </Container>
      ) : null}

      <ProjectFooter project={project} next={next} />
    </article>
  );
}
