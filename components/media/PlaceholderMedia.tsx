import type { AspectRatio, MediaType } from "@/types/project";
import { cn } from "@/lib/cn";

type PlaceholderMediaProps = {
  label: string;
  type?: MediaType;
  aspect?: AspectRatio;
  /** Crop used below the md breakpoint, so mobile gets a consistent, shorter frame. */
  mobileAspect?: AspectRatio;
  className?: string;
};

const ratio = (value: AspectRatio) => value.replace("/", " / ");

export function PlaceholderMedia({
  label,
  type = "image",
  aspect = "16/9",
  mobileAspect,
  className,
}: PlaceholderMediaProps) {
  return (
    <div
      role="img"
      data-reveal="media"
      aria-label={`${type === "video" ? "Video" : "Image"} placeholder: ${label}`}
      className={cn(
        "relative w-full overflow-hidden rounded-media bg-placeholder aspect-[var(--ar-mobile)] md:aspect-[var(--ar)]",
        className,
      )}
      style={
        {
          "--ar": ratio(aspect),
          "--ar-mobile": ratio(mobileAspect ?? aspect),
        } as React.CSSProperties
      }
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>

      {type === "video" ? (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas md:size-14"
        >
          <span className="ml-1 border-y-[7px] border-l-[12px] border-y-transparent border-l-ink" />
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-3 md:p-4">
        <span className="type-meta bg-canvas/80 px-2 py-1 text-ink-muted">{label}</span>
        <span className="type-meta hidden bg-canvas/80 px-2 py-1 text-ink-muted sm:inline">
          {type === "video" ? "Video" : "Image"} · {aspect.replace("/", ":")}
        </span>
      </div>
    </div>
  );
}
