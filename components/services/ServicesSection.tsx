import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/content/services";

type ServicesSectionProps = {
  eyebrow?: string;
  heading?: string;
};

/** Compact accordion used on Home. The full detail lives on /services. */
export function ServicesSection({ eyebrow = "What I do", heading }: ServicesSectionProps) {
  return (
    <Container as="section" aria-label={eyebrow} className="site-section">
      <SectionHeader eyebrow={eyebrow} heading={heading} action={{ href: "/services", label: "All services" }} />
      <div className="mt-10 border-t border-line">
        {SERVICES.map((service) => (
          <details key={service.slug} name="services" data-reveal className="group border-b border-line">
            <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:gap-8 md:py-8 [&::-webkit-details-marker]:hidden">
              <span className="text-sm text-ink-muted md:col-span-1">{service.number}</span>
              <span className="type-section col-start-1 md:col-span-4 md:col-start-2">{service.title}</span>
              <span className="col-start-1 text-ink-muted md:col-span-5 md:col-start-6">{service.summary}</span>
              <span
                aria-hidden="true"
                className="col-start-2 row-span-3 row-start-1 flex size-11 items-center justify-center justify-self-end rounded-full border border-line transition-[rotate,translate,background-color,border-color,color] duration-300 group-open:rotate-180 group-open:border-accent group-open:bg-accent group-open:text-canvas group-hover:border-accent md:col-span-2 md:col-start-11 md:row-span-1 md:size-12"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12m0 0L1.5 7.5M7 13l5.5-5.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </summary>

            <div className="grid gap-6 pb-8 md:grid-cols-12 md:gap-8 md:pb-10">
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:col-span-7 md:col-start-6">
                {service.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex min-h-14 items-center rounded-media border border-line px-4 py-3 text-sm text-ink-muted transition-[border-color,color] duration-300 ease-[var(--ease-soft)] hover:border-accent hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </Container>
  );
}
