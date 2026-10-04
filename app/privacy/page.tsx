import { Container } from "@/components/layout/Container";
import { SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: `How ${SITE.name} handles information sent through this website.`,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <Container as="section" className="site-section">
      <h1 className="type-heading">Privacy</h1>
      <div className="mt-10 max-w-2xl space-y-6 text-ink-muted">
        <p>[Placeholder — short, plain-English privacy note to be written before launch.]</p>
        <p>
          When you use the contact form, your name, email and message are used only to reply to your enquiry. They
          are not shared or used for marketing.
        </p>
        <p>
          To ask for your details to be deleted, email{" "}
          <a href={`mailto:${SITE.email}`} className="text-ink underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
