import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

/** The white logo is invisible on light browser chrome, so it sits on the brand accent. */
export async function brandIcon(size: number, radius: number) {
  const logo = await readFile(join(process.cwd(), "public", SITE.logo.src));
  const logoWidth = Math.round(size * 0.7);
  const logoHeight = Math.round((logoWidth * SITE.logo.height) / SITE.logo.width);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6581a",
          borderRadius: radius,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={logoWidth} height={logoHeight} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
