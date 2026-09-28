"use client";

import { useEffect } from "react";

const PENDING = "[data-reveal]:not([data-revealed])";
const MAX_STAGGER_STEPS = 5;

/**
 * Marks [data-reveal] elements with data-revealed as they enter the viewport; the motion itself lives in globals.css.
 * Elements that enter together are staggered in document order, so rows and heading/text pairs cascade naturally.
 * A MutationObserver picks up content added by client-side navigation.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    root.dataset.revealReady = "";

    const compact = window.matchMedia("(max-width: 767px)");

    const observer = new IntersectionObserver(
      (entries) => {
        const step = compact.matches ? 50 : 80;
        const ready = entries
          .filter((entry) => entry.isIntersecting || entry.boundingClientRect.bottom <= 0)
          .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

        let visibleIndex = 0;
        for (const entry of ready) {
          const element = entry.target as HTMLElement;
          const delay = entry.isIntersecting ? Math.min(visibleIndex++, MAX_STAGGER_STEPS) * step : 0;
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          element.dataset.revealed = "";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => document.querySelectorAll(PENDING).forEach((element) => observer.observe(element));
    scan();

    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
