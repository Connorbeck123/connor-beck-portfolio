"use client";

import { useCallback, useRef, useState } from "react";
import type { AspectRatio, MediaAsset } from "@/types/project";
import { LazyVideo } from "@/components/media/LazyVideo";
import { cn } from "@/lib/cn";

type CompareMediaProps = {
  before: MediaAsset;
  after: MediaAsset;
  aspect?: AspectRatio;
  className?: string;
};

const ratio = (value: AspectRatio) => value.replace("/", " / ");

/**
 * Before/after split used on The Kick Off barber shot: the pointer slides a clip
 * so the ungraded (before) plate sits on the left of a white handle, graded on the right.
 */
export function CompareMedia({ before, after, aspect, className }: CompareMediaProps) {
  const frame = useRef<HTMLDivElement>(null);
  const beforeVideo = useRef<HTMLVideoElement>(null);
  const afterVideo = useRef<HTMLVideoElement>(null);
  const [pos, setPos] = useState(50);

  const move = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect?.width) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const sync = useCallback((source: HTMLVideoElement) => {
    const other = source === beforeVideo.current ? afterVideo.current : beforeVideo.current;
    if (!other || Math.abs(other.currentTime - source.currentTime) < 0.08) return;
    other.currentTime = source.currentTime;
  }, []);

  const frameAspect = aspect ?? before.aspect ?? after.aspect ?? "16/9";

  return (
    <div
      ref={frame}
      data-reveal="media"
      role="slider"
      aria-label={`${before.label} compared with ${after.label}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% ${before.label}`}
      tabIndex={0}
      onPointerMove={(event) => move(event.clientX)}
      onPointerDown={(event) => {
        frame.current?.setPointerCapture(event.pointerId);
        move(event.clientX);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPos((value) => Math.max(0, value - 4));
        if (event.key === "ArrowRight") setPos((value) => Math.min(100, value + 4));
      }}
      className={cn(
        "relative w-full cursor-ew-resize touch-none overflow-hidden rounded-media bg-placeholder aspect-[var(--ar)] select-none",
        className,
      )}
      style={{ "--ar": ratio(frameAspect) } as React.CSSProperties}
    >
      <Layer media={after} videoRef={afterVideo} onTime={sync} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Layer media={before} videoRef={beforeVideo} onTime={sync} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
        style={{ left: `${pos}%` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_2px_10px_rgb(0_0_0/0.35)]"
        style={{ left: `${pos}%` }}
      >
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          <path d="M7 1.5 2 6l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 1.5 20 6l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function Layer({
  media,
  videoRef,
  onTime,
}: {
  media: MediaAsset;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTime: (video: HTMLVideoElement) => void;
}) {
  if (!media.src) return null;

  if (media.type === "video") {
    return (
      <LazyVideo
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        label={media.label}
        onTimeUpdate={onTime}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.src} alt={media.label} className="absolute inset-0 size-full object-cover" />
  );
}
