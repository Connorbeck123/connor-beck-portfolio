import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealObserver } from "@/components/motion/RevealObserver";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 pt-[var(--header-height)] pb-[var(--space-section)]">
        {children}
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
