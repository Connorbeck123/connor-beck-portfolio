import type { Metadata } from "next";
import { SITE } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE.url).toString();
  const isRoot = path === "/";
  const fullTitle = isRoot ? `${SITE.name} — ${SITE.role}` : `${title} — ${SITE.name}`;

  return {
    title: isRoot ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
