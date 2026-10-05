"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/types/project";
import { Media } from "@/components/media/Media";
import { cn } from "@/lib/cn";

type ChapterReelProps = {
  items: MediaAsset[];
};

/** Finger travel (px) before a drag locks to an axis, and before a horizontal drag counts as a swipe. */
const AXIS_LOCK = 8;
const SWIPE_THRESHOLD = 40;
/** How much a drag past the first or last clip moves the track, so the ends feel elastic. */
const EDGE_RESISTANCE = 0.3;

function visibleCountFor(width: number) {
  return width < 768 ? 2 : 4;
}

/** Four-up (two-up on small screens) reel on a sliding track. Arrows step one clip; drags follow the finger. */
export function ChapterReel({ items }: ChapterReelProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [start, setStart] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const gesture = useRef<{ x: number; y: number; axis: "x" | "y" | null } | null>(null);

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
  const step = (delta: number) => setStart((current) => Math.min(maxStart, Math.max(0, current + delta)));

  /** Distance between the left edges of neighbouring clips. */
  const stepWidth = () => {
    const track = trackRef.current;
    if (!track) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (track.clientWidth + gap) / columns;
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    gesture.current = { x: touch.clientX, y: touch.clientY, axis: null };
  };

  const onTouchMove = (event: React.TouchEvent) => {
    const current = gesture.current;
    if (!current) return;
    const touch = event.touches[0];
    const dx = touch.clientX - current.x;
    const dy = touch.clientY - current.y;
    if (!current.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_LOCK) return;
      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (current.axis === "x") setDragging(true);
    }
    if (current.axis !== "x") return;
    const pastEdge = (start === 0 && dx > 0) || (start === maxStart && dx < 0);
    setDrag(pastEdge ? dx * EDGE_RESISTANCE : dx);
  };

  const endGesture = (event: React.TouchEvent) => {
    const current = gesture.current;
    gesture.current = null;
    if (current?.axis === "x") {
      const dx = event.changedTouches[0].clientX - current.x;
      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        const clips = Math.max(1, Math.round(Math.abs(dx) / stepWidth()));
        step(dx < 0 ? clips : -clips);
      }
    }
    setDragging(false);
    setDrag(0);
  };

  const touchHandlers =
    maxStart > 0
      ? { onTouchStart, onTouchMove, onTouchEnd: endGesture, onTouchCancel: endGesture }
      : undefined;

  return (
    <div data-reveal className="mt-8">
      <div className="overflow-hidden">
        <ul
          ref={trackRef}
          {...touchHandlers}
          className={cn(
            "flex touch-pan-y gap-[var(--grid-gap)] will-change-transform",
            !dragging && "transition-transform duration-500 ease-[var(--ease-premium)] motion-reduce:transition-none",
          )}
          style={{
            transform: `translate3d(calc(${-start} * (100% + var(--grid-gap)) / ${columns} + ${drag}px), 0, 0)`,
          }}
        >
          {items.map((item, index) => (
            <li
              key={item.src ?? item.label}
              aria-hidden={index < start || index >= start + visibleCount || undefined}
              className="shrink-0"
              style={{ width: `calc((100% - ${columns - 1} * var(--grid-gap)) / ${columns})` }}
            >
              <Media media={item} locked reveal={false} sizes={visibleCount === 2 ? "50vw" : "25vw"} />
            </li>
          ))}
        </ul>
      </div>

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
