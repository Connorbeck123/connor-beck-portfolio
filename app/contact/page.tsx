import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Container } from "@/components/layout/Container";
import { RevealText } from "@/components/motion/RevealText";
import { SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  absoluteTitle: `Contact — Hire a Multidisciplinary Designer in London | ${SITE.name}`,
  description: `Get in touch with ${SITE.name}, a London-based multidisciplinary designer, about freelance motion, brand, product or UI/UX projects and full-time roles.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container as="section" aria-labelledby="contact-heading" className="pt-16 md:pt-24">
      <p data-reveal className="type-meta text-ink-muted">
        Contact
      </p>
      <h1 id="contact-heading" data-reveal="text" className="type-display mt-8 max-w-[22ch]">
        <RevealText>Let’s get started on your next project</RevealText>
      </h1>

      <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
            {/* Stand-in render; the final panel is the animated liquid-metal CB logo from the Framer site. */}
            <div
              data-reveal="media"
              className="relative aspect-[16/10] overflow-hidden rounded-media bg-[#0b0b0b] lg:aspect-[4/3]"
            >
              <div className="media-zoom size-full">
                <Image
                  src="/brand/cb-logo-render.png"
                  width={2048}
                  height={1152}
                  alt="CB monogram"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div data-reveal className="mt-8 border-t border-line pt-6">
              <h2 className="type-meta text-ink-muted">Prefer email?</h2>
              <div className="mt-4">
                <CopyEmail />
              </div>
            </div>
          </div>
        </div>

        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
