"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/types/project";
import { Media } from "@/components/media/Media";
import { cn } from "@/lib/cn";

type ChapterReelProps = {
  items: MediaAsset[];
};

/** Horizontal finger travel (px) before a swipe counts, so taps and vertical scrolls are ignored. */
const SWIPE_THRESHOLD = 40;

function visibleCountFor(width: number) {
  return width < 768 ? 2 : 4;
}

/** Four-up (two-up on small screens) reel. Arrows and touch swipes step one clip at a time. */
export function ChapterReel({ items }: ChapterReelProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const sync = () => {
      const next = visibleCountFor(window.innerWidth);
      setVisibleCount(next);
      setStart((current) => Math.min(current, Math.max(0, items.length - next)));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [items.length]);

  const maxStart = Math.max(0, items.length - visibleCount);
  const columns = maxStart === 0 ? Math.min(visibleCount, items.length) : visibleCount;
  const visible = items.slice(start, start + visibleCount);
  const step = (delta: number) => setStart((current) => Math.min(maxStart, Math.max(0, current + delta)));

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const origin = touchStart.current;
    touchStart.current = null;
    if (!origin) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  };

  return (
    <div className="mt-8">
      <ul
        onTouchStart={maxStart > 0 ? onTouchStart : undefined}
        onTouchEnd={maxStart > 0 ? onTouchEnd : undefined}
        className={cn(
          "grid touch-pan-y gap-[var(--grid-gap)]",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
        )}
      >
        {visible.map((item) => (
          <li key={item.src ?? item.label}>
            <Media media={item} locked sizes={visibleCount === 2 ? "50vw" : "25vw"} />
          </li>
        ))}
      </ul>

      {maxStart > 0 ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous clip"
            disabled={start === 0}
            onClick={() => step(-1)}
            className="grid size-11 place-items-center rounded-full border border-line transition-[border-color,color,opacity] duration-300 ease-[var(--ease-soft)] hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 md:size-12"
          >
            <Arrow direction="prev" />
          </button>
          <button
            type="button"
            aria-label="Next clip"
            disabled={start >= maxStart}
            onClick={() => step(1)}
            className="grid size-11 place-items-center rounded-full border border-line transition-[border-color,color,opacity] duration-300 ease-[var(--ease-soft)] hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 md:size-12"
          >
            <Arrow direction="next" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {direction === "prev" ? (
        <path d="M12 7H2m0 0 4.5-4.5M2 7l4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <path d="M2 7h10m0 0L7.5 2.5M12 7 7.5 11.5" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  );
}
