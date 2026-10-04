import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { RevealText } from "@/components/motion/RevealText";
import { SITE } from "@/content/site";

type ContactCTAProps = {
  heading?: string;
};

export function ContactCTA({
  heading = "Let’s get started on your next project",
}: ContactCTAProps) {
  return (
    <Container as="section" aria-label="Contact" className="site-section">
      <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-12">
        <p data-reveal className="type-meta text-ink-muted md:col-span-3">
          Contact
        </p>
        <div className="md:col-span-9">
          <h2 data-reveal="text" className="type-heading max-w-3xl">
            <RevealText>{heading}</RevealText>
          </h2>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Link href={SITE.contact.href} className="btn btn-primary">
              {SITE.contact.label}
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
              Email me
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
