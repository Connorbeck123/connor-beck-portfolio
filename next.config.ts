import type { NextConfig } from "next";

/** URLs from the previous Framer site, so old links keep working. */
const FRAMER_SLUGS = {
  bloom: "pl-bloom",
  alma: "alma",
  tko: "the-kick-off",
  pitchlevel: "pitch-level",
  plsocials: "pl-socials",
  hyperliquid: "hyperliquid",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async headers() {
    // Media files keep their names when swapped, so cache for a day rather than marking them immutable.
    const mediaCache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/work/:path*", headers: mediaCache },
      { source: "/hero/:path*", headers: mediaCache },
      { source: "/brand/:path*", headers: mediaCache },
      { source: "/clients/:path*", headers: mediaCache },
      { source: "/tools/:path*", headers: mediaCache },
    ];
  },
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      ...Object.entries(FRAMER_SLUGS).map(([source, slug]) => ({
        source: `/${source}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
