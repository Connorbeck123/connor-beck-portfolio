import Link from "next/link";
import type { Project } from "@/types/project";
import { Container } from "@/components/layout/Container";
import { Media } from "@/components/media/Media";
import { SITE } from "@/content/site";

type ProjectFooterProps = {
  project: Project;
  next: Project;
};

export function ProjectFooter({ next }: ProjectFooterProps) {
  return (
    <>
      <Container as="nav" aria-label="More projects" className="site-section">
        <div className="flex items-baseline justify-between border-t border-line pt-6">
          <p className="type-meta text-ink-muted">Next project</p>
          <Link href="/work" className="type-nav link-hover inline-flex min-h-11 items-center">
            ← All projects
          </Link>
        </div>
        <Link href={`/work/${next.slug}`} className="group mt-4 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Media media={next.cover} aspect="16/9" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div data-reveal className="md:col-span-5">
            <p className="text-ink-muted">
              {next.number} · {next.client}
            </p>
            <p className="type-heading mt-2 transition-colors duration-300 group-hover:text-accent">{next.title} →</p>
            <p className="mt-4 max-w-md text-ink-muted">{next.summary}</p>
          </div>
        </Link>
      </Container>

      <Container as="section" aria-label="Work together" className="site-section">
        <div data-reveal className="flex flex-col gap-8 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
          <p className="type-section max-w-2xl">Let’s get started on your next project</p>
          <Link href={SITE.contact.href} className="btn btn-primary self-start md:self-auto">
            {SITE.contact.label}
          </Link>
        </div>
      </Container>
    </>
  );
}
