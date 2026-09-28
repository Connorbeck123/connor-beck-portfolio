import Link from "next/link";
import { SITE } from "@/content/site";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/cn";

type NavigationProps = {
  currentPath: string;
};

export function Navigation({ currentPath }: NavigationProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-1/2 z-50 hidden h-[var(--header-height)] -translate-x-1/2 items-center md:flex"
    >
      <ul className="flex items-center gap-1 rounded-media border border-white/10 bg-[#1c1c1c]/80 p-1.5 text-white backdrop-blur-md">
        {SITE.nav.map((item) => {
          const active = isActivePath(currentPath, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "type-nav inline-flex min-h-10 items-center rounded-[calc(var(--radius-media)-0.375rem)] px-5 transition-colors",
                  active ? "bg-white/10 text-accent" : "text-white/65 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
