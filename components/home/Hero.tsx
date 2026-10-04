"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";

const REVEAL_IMAGES = [
  { src: "/hero/pl-bloom.png", width: 623, height: 351 },
  { src: "/hero/alma.png", width: 1024, height: 576 },
  { src: "/hero/pitch-level.png", width: 1024, height: 614 },
  { src: "/hero/pl-socials.png", width: 1024, height: 1024 },
  { src: "/hero/cb-brand.png", width: 1024, height: 576 },
];

/** Pointer travel (px) between trail images, how long each lives (ms, matches .hero-trail-item), and the cap on screen. */
const SPAWN_DISTANCE = 110;
const TRAIL_LIFETIME = 1100;
const MAX_TRAIL = 8;
const REEL_INTERVAL = 1600;

/** Matches Tailwind's `lg` breakpoint, where the single-line wordmark and cursor trail take over. */
const DESKTOP_QUERY = "(min-width: 1024px) and (pointer: fine)";

type TrailItem = { id: number; x: number; y: number; image: number };

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function Hero() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const trailEnabled = desktop && !reducedMotion;
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSpawn = useRef<{ x: number; y: number } | null>(null);
  const nextId = useRef(0);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [reelIndex, setReelIndex] = useState(0);

  useEffect(() => {
    if (desktop || reducedMotion) return;
    const timer = window.setInterval(
      () => setReelIndex((index) => (index + 1) % REVEAL_IMAGES.length),
      REEL_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [desktop, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else void video.play().catch(() => {});
  }, [reducedMotion]);

  useEffect(() => {
    if (!trailEnabled) {
      setTrail([]);
      return;
    }
    for (const image of REVEAL_IMAGES) new window.Image().src = image.src;
  }, [trailEnabled]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !trailEnabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const last = lastSpawn.current;
    if (last && Math.hypot(x - last.x, y - last.y) < SPAWN_DISTANCE) return;

    lastSpawn.current = { x, y };
    const id = nextId.current++;
    setTrail((items) => [...items.slice(-(MAX_TRAIL - 1)), { id, x, y, image: id % REVEAL_IMAGES.length }]);
    window.setTimeout(() => setTrail((items) => items.filter((item) => item.id !== id)), TRAIL_LIFETIME);
  };

  return (
    <section
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      onPointerLeave={() => (lastSpawn.current = null)}
      className="sticky top-0 -mt-[var(--header-height)] flex h-[100svh] min-h-[36rem] items-center justify-center overflow-hidden bg-[#0b0b0b] text-white"
    >
      <video
        ref={videoRef}
        src="/hero/cb-pattern.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hero-video absolute inset-0 size-full object-cover"
      />

      <h1 className="sr-only">
        {SITE.name} — Multidisciplinary Designer in London. Motion, brand identity, product and UI/UX design.
      </h1>

      <div aria-hidden="true" className="relative z-10 w-full">
        <Image
          src="/brand/wordmark-white.png"
          width={2048}
          height={254}
          alt=""
          priority
          sizes="64vw"
          className="hero-name mx-auto hidden h-auto w-[min(64vw,1240px)] lg:block"
        />

        {/* Both images are cropped to the letters, so BECK at 216/337 of CONNOR's width gives matching cap heights. */}
        <div className="hero-name mx-auto flex w-[min(86vw,40rem)] flex-col items-center gap-2 lg:hidden">
          <Image
            src="/brand/wordmark-connor-white.png"
            width={1024}
            height={216}
            alt=""
            priority
            sizes="86vw"
            className="h-auto w-full"
          />
          {/* Opens from zero height, so CONNOR is pushed up and BECK down around the image. */}
          <div className="hero-reveal grid w-full">
            <div className="min-h-0 overflow-hidden">
              <div className="py-[3%]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-media bg-white/5">
                  {REVEAL_IMAGES.map((image, index) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt=""
                      sizes="86vw"
                      className="absolute inset-0 size-full object-cover transition-opacity duration-500"
                      style={{ opacity: index === reelIndex ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/brand/wordmark-beck-white.png"
            width={1024}
            height={337}
            alt=""
            priority
            sizes="56vw"
            className="h-auto w-[64.1%]"
          />
        </div>
      </div>

      {trailEnabled ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          {trail.map((item) => {
            const image = REVEAL_IMAGES[item.image];
            return (
              <Image
                key={item.id}
                src={image.src}
                width={image.width}
                height={image.height}
                alt=""
                unoptimized
                className="hero-trail-item absolute aspect-[16/9] rounded-media w-[clamp(10rem,16vw,17.5rem)] object-cover"
                style={{ left: item.x, top: item.y }}
              />
            );
          })}
        </div>
      ) : null}

      <div className="site-container type-meta absolute inset-x-0 bottom-0 z-10 flex justify-between gap-6 pb-6 text-white/70 md:pb-8">
        <p>
          {SITE.role}
        </p>
        <p className="hidden sm:block">Motion · Brand · Product · UI/UX</p>
      </div>
    </section>
  );
}
