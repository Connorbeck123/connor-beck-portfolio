import type { Metadata } from "next";
import { SITE } from "@/content/site";

type PageMetaInput = {
  /** Used as `<title>` with the site name appended, unless `absoluteTitle` is set. */
  title: string;
  absoluteTitle?: string;
  description: string;
  path?: string;
  /** Defaults to the site-wide share card. */
  image?: { url: string; alt: string };
  noIndex?: boolean;
};

const DEFAULT_IMAGE = { url: "/opengraph-image", alt: `${SITE.name} — Multidisciplinary Designer, London` };

export function createPageMetadata({
  title,
  absoluteTitle,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex,
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE.url).toString();
  const fullTitle = absoluteTitle ?? `${title} — ${SITE.name}`;
  const ogImage = { url: image.url, alt: image.alt, width: 1200, height: 630 };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "en_GB",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
