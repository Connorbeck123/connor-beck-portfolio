import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };

type OgCardInput = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

/** 1200×630 social share card on the dark canvas with the orange logo. */
export async function ogCard({ eyebrow, title, subtitle }: OgCardInput) {
  const logo = await readFile(join(process.cwd(), "public", "brand", "cb-logo-orange.png"));
  const logoWidth = 120;
  const logoHeight = Math.round((logoWidth * SITE.logo.height) / SITE.logo.width);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111111",
          color: "#f2f2ef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={logoWidth} height={logoHeight} alt="" />
          <div style={{ fontSize: 26, color: "#f6581a", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 32, lineHeight: 1.3, color: "rgba(242,242,239,0.65)", maxWidth: 960 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(242,242,239,0.65)" }}>
          <span>connorbeck.co.uk</span>
          <span>{SITE.location}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
