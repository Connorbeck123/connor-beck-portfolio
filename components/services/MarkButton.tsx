"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

/** Bespoke CB mark control from the original site, shown as a UI component on a designed surface. */
export function MarkButton() {
  return (
    <div
      data-reveal="media"
      className="relative flex w-full flex-col overflow-hidden rounded-media border border-line bg-[#0b0b0b] aspect-[16/10] md:aspect-[4/3]"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
        <p className="type-meta text-ink-muted">Component</p>
        <p className="type-meta text-ink-muted">Hover</p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 top-11 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative flex flex-1 items-center justify-center px-6">
        <Link
          href="/"
          aria-label={`${SITE.name}, home`}
          className="group inline-flex items-center rounded-full bg-ink text-canvas shadow-[0_18px_40px_rgba(0,0,0,0.4)] ring-2 ring-transparent transition-[background-color,padding,box-shadow,ring-color] duration-300 ease-[var(--ease-soft)] hover:bg-accent hover:px-12 hover:py-5 hover:ring-ink active:bg-accent active:px-12 active:py-5 active:ring-ink"
        >
          <span className="grid grid-cols-[1fr_auto] items-center gap-4 px-7 py-3.5 text-[0.95rem] font-medium tracking-[0.14em] transition-[grid-template-columns,padding,gap] duration-300 ease-[var(--ease-soft)] group-hover:grid-cols-[0fr_auto] group-hover:gap-0 group-hover:px-3 group-hover:py-1 group-active:grid-cols-[0fr_auto] group-active:gap-0 group-active:px-3 group-active:py-1">
            <span className="min-w-0 overflow-hidden">
              <span className="block whitespace-nowrap">CONNOR BECK</span>
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-canvas transition-[background-color,width,height] duration-300 ease-[var(--ease-soft)] group-hover:size-[4.5rem] group-hover:bg-transparent group-active:size-[4.5rem] group-active:bg-transparent">
              <Image
                src={SITE.logo.src}
                alt=""
                width={SITE.logo.width}
                height={SITE.logo.height}
                className="h-5 w-auto transition-[height] duration-300 ease-[var(--ease-soft)] group-hover:h-11 group-active:h-11"
              />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
