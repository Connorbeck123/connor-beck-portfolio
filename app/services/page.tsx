import { Container } from "@/components/layout/Container";
import { RevealText } from "@/components/motion/RevealText";
import { ServiceJumpNav } from "@/components/services/ServiceJumpNav";
import { ServiceShowcase } from "@/components/services/ServiceShowcase";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROCESS, SERVICES, SERVICES_INTRO } from "@/content/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Motion design, brand design, product design and UI/UX design for freelance clients and teams.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Container as="section" aria-labelledby="services-heading" className="pt-16 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-x-[var(--grid-gap)] md:gap-y-6">
          <h1 id="services-heading" data-reveal="text" className="type-display md:col-span-7">
            <RevealText>Services</RevealText>
          </h1>
          <p data-reveal className="type-lead max-w-2xl text-ink-muted md:col-span-7 md:row-start-2">
            {SERVICES_INTRO}
          </p>
          <ServiceJumpNav />
        </div>
      </Container>

      {SERVICES.map((service) => (
        <Container
          key={service.slug}
          as="section"
          aria-labelledby={`${service.slug}-heading`}
          className="site-section"
        >
          <div id={service.slug} className="border-t border-line pt-10 md:pt-12">
            <p data-reveal className="text-sm text-ink-muted">
              {service.number}
            </p>
            <div className="mt-2 grid items-start gap-6 md:grid-cols-2">
              <h2 id={`${service.slug}-heading`} data-reveal="text" className="type-heading">
                <RevealText>{service.title}</RevealText>
              </h2>
              <p data-reveal className="type-lead md:-mt-[calc((1lh-1cap)/2)]">
                {service.description}
              </p>
            </div>
          </div>

          <ul
            data-reveal
            aria-label={`${service.title} services`}
            className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            {service.offerings.map((item) => (
              <li
                key={item}
                className="flex min-h-14 items-center rounded-media border border-line px-4 py-3 text-sm text-ink-muted transition-[border-color,color] duration-300 ease-[var(--ease-soft)] hover:border-accent hover:text-ink"
              >
                {item}
              </li>
            ))}
          </ul>

          <ServiceShowcase title={service.title} items={service.showcase} />
        </Container>
      ))}

      <Container as="section" aria-label="Process" className="site-section">
        <SectionHeader eyebrow="Process" heading="What working together looks like" />
        <ol className="mt-12 grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <li key={step.number} data-reveal className="rounded-media border border-line bg-canvas p-6 md:p-8">
              <p className="text-sm text-ink-muted">{step.number}</p>
              <h3 className="type-section mt-10">
                {step.title}
              </h3>
              <p className="mt-3 text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
