import Image from "next/image";
import type { AspectRatio, MediaAsset } from "@/types/project";
import { LazyVideo } from "@/components/media/LazyVideo";
import { PlaceholderMedia } from "@/components/media/PlaceholderMedia";
import { cn } from "@/lib/cn";

type MediaProps = {
  media: MediaAsset;
  /** Overrides the asset's own ratio, e.g. to crop covers into a grid slot. */
  aspect?: AspectRatio;
  mobileAspect?: AspectRatio;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Skip zoom/drift so the full export stays in frame. */
  locked?: boolean;
};

const ratio = (value: AspectRatio) => value.replace("/", " / ");

/** Real image or video when the asset has a src; a labelled placeholder until then. */
export function Media({ media, aspect, mobileAspect, sizes = "(min-width: 1600px) 1520px, 100vw", priority, className, locked }: MediaProps) {
  const frame = aspect ?? media.aspect ?? "16/9";

  if (!media.src) {
    return (
      <PlaceholderMedia
        label={media.label}
        type={media.type}
        aspect={frame}
        mobileAspect={mobileAspect}
        className={className}
      />
    );
  }

  const content =
    media.type === "video" ? (
      <LazyVideo
        src={media.src}
        poster={media.poster}
        label={media.label}
        className="absolute inset-0 size-full object-cover"
      />
    ) : (
      <Image src={media.src} alt={media.label} fill sizes={sizes} quality={90} priority={priority} className="object-cover" />
    );

  return (
    <div
      data-reveal="media"
      className={cn(
        "relative w-full overflow-hidden rounded-media bg-placeholder aspect-[var(--ar-mobile)] md:aspect-[var(--ar)]",
        className,
      )}
      style={
        {
          "--ar": ratio(frame),
          "--ar-mobile": ratio(mobileAspect ?? frame),
        } as React.CSSProperties
      }
    >
      {locked ? (
        <div className="absolute inset-0">{content}</div>
      ) : (
        <div className="media-drift absolute inset-0">
          <div className="media-zoom absolute inset-0">{content}</div>
        </div>
      )}
    </div>
  );
}
