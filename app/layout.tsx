import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/content/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
};

/**
 * Enables scroll reveals before first paint so revealed content never flashes in. If RevealObserver hasn't
 * started within 3s (e.g. a failed script load), motion is switched off again so nothing stays hidden.
 */
const MOTION_SCRIPT = `(function(){var d=document.documentElement;if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion");setTimeout(function(){if(!("revealReady" in d.dataset))d.classList.remove("motion")},3000)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${spaceGrotesk.variable} ${spaceGrotesk.className}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
