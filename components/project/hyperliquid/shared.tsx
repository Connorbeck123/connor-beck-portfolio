import { Inter } from "next/font/google";

export const hyperliquidInter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const asset = (file: string) => `/work/hyperliquid/system/${file}`;

/** Mint stroke from the selected nav export: bright at the top-left, fading as it turns. */
export function mintStroke(fill: string) {
  return {
    border: "1px solid transparent",
    background: `linear-gradient(${fill}, ${fill}) padding-box, linear-gradient(145deg, #97FCE4 0%, rgba(151, 252, 228, 0.22) 72%, rgba(151, 252, 228, 0.55) 100%) border-box`,
  };
}

export function Glyph({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${asset(`${name}.png`)})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${asset(`${name}.png`)})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
