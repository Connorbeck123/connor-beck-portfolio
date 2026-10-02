"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Shrinks a fixed-width desktop layout to fit narrower frames. Safari can't divide lengths in CSS, so this measures instead. */
export function ScaleToFit({ width, below, children }: { width: number; below: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const outerEl = outer.current;
    const innerEl = inner.current;
    if (!outerEl || !innerEl) return;

    const query = window.matchMedia(below);
    const update = () => {
      const scale = outerEl.clientWidth / width;
      setFit(query.matches && scale < 1 ? { scale, height: innerEl.offsetHeight * scale } : null);
    };

    const observer = new ResizeObserver(update);
    observer.observe(outerEl);
    observer.observe(innerEl);
    query.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, [width, below]);

  return (
    <div ref={outer} className="overflow-hidden" style={fit ? { height: fit.height } : undefined}>
      <div
        ref={inner}
        style={fit ? { width, transform: `scale(${fit.scale})`, transformOrigin: "top left" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
