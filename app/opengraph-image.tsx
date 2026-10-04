import { SITE } from "@/content/site";
import { OG_SIZE, ogCard } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${SITE.name} — Multidisciplinary Designer, London`;

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "Portfolio",
    title: SITE.name,
    subtitle: "Multidisciplinary Designer — Motion, Brand Identity, Product and UI/UX Design.",
  });
}
