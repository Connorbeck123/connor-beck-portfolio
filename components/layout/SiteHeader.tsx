"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { SITE } from "@/content/site";

export function SiteHeader() {
  const currentPath = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Link
        href="/"
        aria-label={`${SITE.name}, home`}
        className="fixed top-0 left-[max(var(--site-gutter),calc((100vw-var(--site-max-width))/2+var(--site-gutter)))] z-50 flex h-[var(--header-height)] items-center"
      >
        <Image
          src={SITE.logo.src}
          width={SITE.logo.width}
          height={SITE.logo.height}
          alt=""
          priority
          className="h-9 w-auto [filter:drop-shadow(0_1px_2px_rgb(0_0_0/0.5))_drop-shadow(0_2px_10px_rgb(0_0_0/0.35))] md:h-10"
        />
      </Link>
      <Navigation currentPath={currentPath} />
      <MobileNavigation currentPath={currentPath} open={menuOpen} setOpen={setMenuOpen} />
    </header>
  );
}
