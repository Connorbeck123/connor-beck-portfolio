import Link from "next/link";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  heading?: string;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({ eyebrow, heading, action, as: Heading = "h2", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4 border-t border-line pt-6",
        className,
      )}
    >
      <div className="max-w-4xl">
        {heading ? (
          <>
            <p data-reveal className="type-meta text-ink-muted">
              {eyebrow}
            </p>
            <Heading data-reveal="text" className="type-heading mt-4">
              <RevealText>{heading}</RevealText>
            </Heading>
          </>
        ) : (
          <Heading data-reveal className="type-meta text-ink-muted">
            {eyebrow}
          </Heading>
        )}
      </div>
      {action ? (
        <Link
          href={action.href}
          data-reveal
          className="type-nav link-hover inline-flex min-h-11 shrink-0 items-center"
        >
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}
