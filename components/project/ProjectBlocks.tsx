import type { ContentBlock } from "@/types/project";
import { Container } from "@/components/layout/Container";
import { CompareMedia } from "@/components/media/CompareMedia";
import { Media } from "@/components/media/Media";
import { RevealText } from "@/components/motion/RevealText";
import { ChapterReel } from "@/components/project/ChapterReel";
import { cn } from "@/lib/cn";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal className="mt-3 text-sm text-ink-muted">
      {children}
    </p>
  );
}

function BlockIntro({ heading, body }: { heading?: string; body?: string }) {
  if (!heading && !body) return null;

  return (
    <div className="mb-6 grid gap-4 border-t border-line pt-6 md:mb-8 md:grid-cols-12 md:gap-[var(--grid-gap)]">
      {heading ? (
        <h3 data-reveal className="type-meta text-ink-muted md:col-span-4">
          {heading}
        </h3>
      ) : null}
      {body ? (
        <p data-reveal className="type-lead max-w-3xl md:col-span-8 md:col-start-5">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "compare":
      return (
        <Container>
          <figure>
            <CompareMedia before={block.before} after={block.after} />
            {block.caption ? (
              <figcaption>
                <Caption>{block.caption}</Caption>
              </figcaption>
            ) : null}
          </figure>
        </Container>
      );

    case "media":
      return (
        <Container bleed={block.bleed}>
          <BlockIntro heading={block.heading} body={block.body} />
          <figure>
            <Media media={block.media} />
            {block.caption ? (
              <figcaption className={cn(block.bleed && "site-container")}>
                <Caption>{block.caption}</Caption>
              </figcaption>
            ) : null}
          </figure>
        </Container>
      );

    case "media-grid":
      return (
        <Container>
          <BlockIntro heading={block.heading} body={block.body} />
          <figure>
            <div
              className={cn(
                "grid gap-x-[var(--grid-gap)] gap-y-[var(--space-block)] md:gap-[var(--grid-gap)]",
                block.columns === 3 ? "grid-cols-2 md:grid-cols-3" : "md:grid-cols-2",
              )}
            >
              {block.items.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(block.columns === 3 && index === 2 && "col-span-2 md:col-span-1")}
                >
                  <Media
                    media={item}
                    sizes={block.columns === 3 ? "(min-width: 768px) 33vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
                  />
                </div>
              ))}
            </div>
            {block.caption ? (
              <figcaption>
                <Caption>{block.caption}</Caption>
              </figcaption>
            ) : null}
          </figure>
        </Container>
      );

    case "media-text":
      return (
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-[var(--grid-gap)]">
            <div className={cn("md:col-span-7", block.reverse && "md:order-2")}>
              <Media media={block.media} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <div data-reveal className={cn("md:col-span-4", block.reverse ? "md:order-1" : "md:col-start-9")}>
              <h3 className="type-section">{block.heading}</h3>
              <p className="mt-4 text-ink-muted">{block.body}</p>
            </div>
          </div>
        </Container>
      );

    case "text":
      return (
        <Container>
          <div className="grid gap-4 md:grid-cols-12 md:gap-[var(--grid-gap)]">
            {block.heading ? (
              <h3 data-reveal className="type-meta text-ink-muted md:col-span-4">
                {block.heading}
              </h3>
            ) : null}
            <p data-reveal className="type-lead max-w-3xl md:col-span-8 md:col-start-5">
              {block.body}
            </p>
          </div>
        </Container>
      );

    case "chapter":
      return (
        <Container as="section" aria-label={block.heading}>
          <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-[var(--grid-gap)]">
            <h3 data-reveal className="type-section md:col-span-4">
              {block.heading}
            </h3>
            <p data-reveal className="max-w-xl text-ink-muted md:col-span-6 md:col-start-7">
              {block.body}
            </p>
          </div>
          <ChapterReel items={block.items} />
        </Container>
      );

    case "quote":
      return (
        <Container>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p data-reveal="text" className="type-heading">
              <RevealText>{`“${block.quote}”`}</RevealText>
            </p>
            <footer data-reveal className="mt-6 text-ink-muted">
              {block.attribution}
            </footer>
          </blockquote>
        </Container>
      );

    case "stats":
      return (
        <Container>
          <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {block.items.map((item) => (
              <div key={item.label} data-reveal className="py-8 sm:px-6 sm:first:pl-0">
                <dt className="text-ink-muted">{item.label}</dt>
                <dd className="type-heading mt-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      );
  }
}

export function ProjectBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-block)]">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}
