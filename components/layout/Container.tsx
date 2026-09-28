import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "main" | "header" | "footer" | "article" | "nav";
  bleed?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

export function Container({
  children,
  as: Tag = "div",
  bleed = false,
  className,
  id,
  "aria-label": ariaLabel,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(bleed ? "w-full" : "site-container", className)}
    >
      {children}
    </Tag>
  );
}
