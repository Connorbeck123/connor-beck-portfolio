import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container as="section" className="site-section">
      <p className="type-meta text-ink-muted">404</p>
      <h1 className="type-heading mt-6">This page doesn’t exist.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/work" className="btn btn-primary">
          View projects
        </Link>
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </div>
    </Container>
  );
}
