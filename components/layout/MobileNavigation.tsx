"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { SITE } from "@/content/site";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/cn";

type MobileNavigationProps = {
  currentPath: string;
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
};

export function MobileNavigation({ currentPath, open, setOpen }: MobileNavigationProps) {
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [currentPath, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  // Portalled to <body> so no ancestor's filter or transform can trap this fixed panel.
  const panel = (
    <div id={panelId} className="fixed inset-0 z-40 overflow-y-auto bg-canvas md:hidden">
      <nav
        aria-label="Mobile"
        className="site-container flex min-h-full flex-col pt-[calc(var(--header-height)+1.5rem)] pb-10"
      >
        <ul>
          {SITE.nav.map((item) => {
            const active = isActivePath(currentPath, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "type-heading block border-b border-line py-4",
                    active ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto space-y-4 pt-12">
          <a href={`mailto:${SITE.email}`} className="type-section block break-all">
            {SITE.email}
          </a>
          <ul className="flex gap-6">
            {SITE.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="type-nav inline-flex min-h-11 items-center text-ink-muted">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="fixed top-0 right-[max(var(--site-gutter),calc((100vw-var(--site-max-width))/2+var(--site-gutter)))] z-50 flex h-[var(--header-height)] items-center md:hidden">
      <button
        type="button"
        className="type-nav inline-flex min-h-11 items-center rounded-media border border-white/10 bg-[#1c1c1c]/80 px-5 text-white backdrop-blur-md"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? createPortal(panel, document.body) : null}
    </div>
  );
}
