import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/content/site";

type ClientMarqueeProps = {
  eyebrow?: string;
};

/** Logos are trimmed to their bounds; scaling height by aspect keeps wide and compact marks at a similar visual weight. */
function logoHeight(width: number, height: number) {
  return `calc(var(--logo-size) * ${Math.min(1, Math.sqrt(2.4 / (width / height))).toFixed(3)})`;
}

export function ClientMarquee({ eyebrow = "Selected clients" }: ClientMarqueeProps) {
  const logos = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[clamp(3rem,7vw,7rem)] pr-[clamp(3rem,7vw,7rem)]"
    >
      {SITE.clients.map((client) => (
        <li key={client.name} className="flex h-[var(--logo-size)] items-center">
          <Image
            src={client.logo}
            width={client.width}
            height={client.height}
            alt={hidden ? "" : client.name}
            className="w-auto opacity-75"
            style={{ height: logoHeight(client.width, client.height) }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <Container as="section" aria-label={eyebrow} className="site-section">
      <SectionHeader eyebrow={eyebrow} />
      <div data-reveal className="marquee mt-12 overflow-hidden [--logo-size:2.75rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[--logo-size:3.5rem]">
        <div className="marquee-track flex w-max">
          {logos(false)}
          {logos(true)}
        </div>
      </div>
    </Container>
  );
}
