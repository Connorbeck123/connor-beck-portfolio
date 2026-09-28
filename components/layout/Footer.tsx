import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="pt-12 pb-8 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="font-medium">
              {SITE.name}
            </Link>
            <p className="mt-2 max-w-xs text-ink-muted">{SITE.role}</p>
          </div>

          <div className="col-span-2 md:col-span-4">
            <p className="type-meta text-ink-muted">Email</p>
            <a href={`mailto:${SITE.email}`} className="link-hover mt-3 inline-block break-all">
              {SITE.email}
            </a>
          </div>

          <div className="md:col-span-2">
            <p className="type-meta text-ink-muted">Elsewhere</p>
            <ul className="mt-3 space-y-1">
              {SITE.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="link-hover inline-flex min-h-9 items-center">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="type-meta text-ink-muted">Based in</p>
            <p className="mt-3">{SITE.location}</p>
            <p className="text-ink-muted">{SITE.timezone}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <Link href="/privacy" className="link-hover w-fit">
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
