"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  label: string;
  poster?: string;
  className?: string;
  onTimeUpdate?: (video: HTMLVideoElement) => void;
};

/** Muted looping video that only downloads once it nears the viewport, and pauses while off screen. */
export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { src, label, poster, className, onTimeUpdate },
  forwardedRef,
) {
  const localRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = localRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (video.currentSrc && !reducedMotion) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      src={active ? src : undefined}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      autoPlay={!reducedMotion}
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      onTimeUpdate={onTimeUpdate ? (event) => onTimeUpdate(event.currentTarget) : undefined}
      className={className}
    />
  );
});
