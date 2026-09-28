"use client";

import { useEffect } from "react";
import { SERVICES } from "@/content/services";

let scrollFrame = 0;

function easeOut(t: number) {
  return 1 - (1 - t) ** 4;
}

function scrollToService(slug: string, smooth = true) {
  const el = document.getElementById(slug);
  if (!el) return;

  const styles = getComputedStyle(document.documentElement);
  const header = Number.parseFloat(styles.getPropertyValue("--header-height")) || 4.5;
  const root = Number.parseFloat(styles.fontSize) || 16;
  const logo = document.querySelector<HTMLElement>('a[aria-label$="home"]');
  const nav = document.querySelector<HTMLElement>('[aria-label="Primary"] ul');
  const underHeader = Math.max(
    logo?.getBoundingClientRect().bottom ?? 0,
    nav?.getBoundingClientRect().bottom ?? 0,
    header * root,
  );
  const offset = underHeader + 8;
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.cancelAnimationFrame(scrollFrame);
  html.style.scrollBehavior = "auto";

  if (!smooth || reduce || Math.abs(top - window.scrollY) < 2) {
    window.scrollTo({ top, behavior: "auto" });
    html.style.scrollBehavior = previous;
    return;
  }

  const start = window.scrollY;
  const delta = top - start;
  const duration = Math.min(1100, Math.max(560, Math.abs(delta) * 0.32));
  const origin = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - origin) / duration);
    window.scrollTo({ top: start + delta * easeOut(t), behavior: "auto" });
    if (t < 1) {
      scrollFrame = window.requestAnimationFrame(step);
      return;
    }
    html.style.scrollBehavior = previous;
  };

  scrollFrame = window.requestAnimationFrame(step);
}

export function ServiceJumpNav() {
  useEffect(() => {
    const slug = window.location.hash.replace(/^#/, "");
    if (!SERVICES.some((item) => item.slug === slug)) return;

    const jump = () => scrollToService(slug, false);
    const frame = window.requestAnimationFrame(jump);
    const timer = window.setTimeout(jump, 80);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <nav aria-label="Jump to service" data-reveal className="md:col-span-4 md:col-start-9 md:row-start-2">
      <ul className="border-t border-line">
        {SERVICES.map((service) => (
          <li key={service.slug} className="border-b border-line">
            <a
              href={`#${service.slug}`}
              className="flex min-h-12 items-center justify-between gap-4"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                window.history.pushState(null, "", `#${service.slug}`);
                scrollToService(service.slug);
              }}
            >
              <span>
                <span className="mr-4 text-sm text-ink-muted">{service.number}</span>
                {service.title}
              </span>
              <span aria-hidden="true">↓</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
