import type { MediaAsset, ShowcasePiece } from "@/types/project";
import { Media } from "@/components/media/Media";
import { MarkButton } from "@/components/services/MarkButton";

type ServiceShowcaseProps = {
  title: string;
  items: [ShowcasePiece, ShowcasePiece];
};

function isMedia(item: ShowcasePiece): item is MediaAsset {
  return item.type === "image" || item.type === "video";
}

/** Two-frame editorial pair used under each service on /services. */
export function ServiceShowcase({ title, items }: ServiceShowcaseProps) {
  return (
    <div aria-label={`${title} projects`} className="mt-12 grid gap-[var(--grid-gap)] md:grid-cols-2">
      {items.map((item) => {
        if (item.type === "mark-button") return <MarkButton key={item.label} />;
        if (isMedia(item)) {
          return (
            <Media
              key={item.src ?? item.label}
              media={item}
              aspect="4/3"
              mobileAspect="16/10"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          );
        }
        return null;
      })}
    </div>
  );
}
