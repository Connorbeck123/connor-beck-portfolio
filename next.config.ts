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
