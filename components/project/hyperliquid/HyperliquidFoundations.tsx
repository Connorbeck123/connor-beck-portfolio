import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Media } from "@/components/media/Media";
import { cn } from "@/lib/cn";
import { Glyph, asset, hyperliquidInter, mintStroke } from "./shared";

const TONES = [
  { name: "Void", hex: "#001111", span: "col-span-12 md:col-span-7", height: "min-h-[10.5rem] md:min-h-[13.5rem]" },
  { name: "Canvas", hex: "#000D0D", span: "col-span-12 md:col-span-5", height: "min-h-[10.5rem] md:min-h-[13.5rem]" },
  { name: "Surface", hex: "#0F2323", span: "col-span-12 sm:col-span-8", height: "min-h-[8.5rem] md:min-h-[10.5rem]" },
  { name: "White", hex: "#FFFFFF", span: "col-span-12 sm:col-span-4", height: "min-h-[8.5rem] md:min-h-[10.5rem]" },
  { name: "Mint", hex: "#97FCE4", span: "col-span-4", height: "min-h-[7.25rem] md:min-h-[8.5rem]" },
  { name: "Gain", hex: "#01D66C", span: "col-span-4", height: "min-h-[7.25rem] md:min-h-[8.5rem]" },
  { name: "Loss", hex: "#FF0000", span: "col-span-4", height: "min-h-[7.25rem] md:min-h-[8.5rem]" },
] as const;

const ICONS = [
  "house-simple",
  "circles-three-plus",
  "bank",
  "wallet",
  "cardholder",
  "sliders",
  "trend-up",
  "arrows-left-right",
  "arrows-out-simple",
  "bell-simple",
  "chat",
  "user",
  "push-pin",
  "gear",
  "headset",
  "command",
  "usb",
  "sign-out",
] as const;

const NAV_BOX =
  "box-border flex h-[52px] w-full max-w-[300px] items-center gap-3 rounded-[10px] border px-5 text-[15px] font-medium";

function Editorial({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-[var(--grid-gap)]">
      <h2 data-reveal className="type-meta text-ink-muted md:col-span-4">
        {label}
      </h2>
      <p data-reveal className="type-lead max-w-3xl md:col-span-8 md:col-start-5">
        {children}
      </p>
    </div>
  );
}

function Board({ children, className = "bg-[#364747]" }: { children: ReactNode; className?: string }) {
  return (
    <div data-reveal="media" className={cn("overflow-hidden rounded-media text-white", className)}>
      {children}
    </div>
  );
}

function TypeRow({
  name,
  sample,
  size,
  use,
  className,
}: {
  name: string;
  sample: string;
  size: string;
  use: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-1 py-5 md:grid md:grid-cols-[5.5rem_minmax(0,1fr)_auto_auto] md:items-baseline md:gap-x-4">
      <p className="text-[11px] text-white/40">{name}</p>
      <p className={className}>{sample}</p>
      <div className="flex gap-3 text-[11px] text-white/40 md:contents">
        <p className="whitespace-nowrap font-mono">{size}</p>
        <p className="whitespace-nowrap">{use}</p>
      </div>
    </div>
  );
}

function QuietLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[11px] tracking-[0.04em] text-white/35 uppercase">{children}</p>;
}

function rgbFromHex(hex: string) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)).join(" ");
}

function Swatch({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className?: string;
}) {
  const light = hex === "#FFFFFF" || hex === "#97FCE4";
  const edged = hex === "#001111" || hex === "#000D0D" || hex === "#FFFFFF";

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6",
        light ? "text-[#001111]" : "text-white",
        className,
      )}
      style={{
        background: hex,
        boxShadow: edged ? "inset 0 0 0 1px rgba(255,255,255,0.1)" : undefined,
      }}
    >
      <p className="text-[17px] font-medium leading-tight md:text-[19px]">{name}</p>
      <dl
        className={cn(
          "mt-4 space-y-0.5 font-mono text-[10px] leading-relaxed tracking-[0.02em]",
          light ? "text-[#001111]/50" : "text-white/50",
        )}
      >
        <div className="flex gap-2">
          <dt className="w-7 shrink-0">HEX</dt>
          <dd className="m-0">{hex.replace("#", "")}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-7 shrink-0">RGB</dt>
          <dd className="m-0 whitespace-nowrap">{rgbFromHex(hex)}</dd>
        </div>
      </dl>
    </div>
  );
}

function NavItem({ state }: { state: "rest" | "hover" | "selected" }) {
  return (
    <div
      className={cn(
        NAV_BOX,
        state === "selected" && "text-[#97FCE4]",
        state === "hover" && "border-transparent bg-[#0F2323] text-[#97FCE4]",
        state === "rest" && "border-transparent text-white/70",
      )}
      style={state === "selected" ? mintStroke("#001111") : undefined}
    >
      <Glyph name="circles-three-plus" size={20} />
      Dashboard
      {state === "selected" ? <span className="ml-auto h-5 w-0.5 rounded-full bg-[#97FCE4]" /> : null}
    </div>
  );
}

function Segment({ state }: { state: "rest" | "hover" | "selected" }) {
  const active = state === "selected" ? "Buy" : state === "hover" ? "Sell" : null;

  return (
    <div className="flex h-[36px] w-full items-center rounded-[10px] bg-[#0F2323] p-0.5 text-[13px]">
      {(["Buy", "Sell", "Swap"] as const).map((item) => {
        const on = item === active;

        return (
          <span
            key={item}
            className={cn(
              "flex h-full flex-1 items-center justify-center rounded-[8px]",
              on && state === "hover" && "bg-[#001111] font-medium text-white",
              on && state === "selected" && "font-medium text-white",
              !on && "text-white/45",
            )}
            style={on && state === "selected" ? mintStroke("#001111") : undefined}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <QuietLabel>{label}</QuietLabel>
      {children}
    </div>
  );
}

function KitGroup({
  title,
  children,
  row,
}: {
  title: string;
  children: ReactNode;
  row?: boolean;
}) {
  return (
    <div>
      <p className="type-meta text-white/40">{title}</p>
      <div
        className={cn(
          "mt-6 grid gap-8",
          row ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-3",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function HyperliquidFoundations() {
  return (
    <Container as="section" aria-label="Design system" className="flex flex-col gap-[var(--space-block)]">
      <div className="flex flex-col gap-6 md:gap-8">
        <Editorial label="Design system">
          Colour, typography, iconography and components documented as one system. Inter at Regular and Medium. Navigation, actions and status specified across rest, hover and selected.
        </Editorial>
        <Board>
          <div className={cn(hyperliquidInter.className, "px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12")}>
            <div className="grid grid-cols-12 gap-3">
              {TONES.map((tone) => (
                <div key={tone.hex} className={tone.span}>
                  <Swatch name={tone.name} hex={tone.hex} className={tone.height} />
                </div>
              ))}
            </div>
          </div>
        </Board>
      </div>

      <Board>
        <div className={cn(hyperliquidInter.className, "px-6 py-10 md:px-12 md:py-14")}>
          <div className="divide-y divide-white/10">
            <TypeRow name="Display" sample="Welcome Back" size="32 / 500 / −0.04" use="Page titles" className="text-[2rem] font-medium leading-none tracking-[-0.04em]" />
            <TypeRow name="Price" sample="$109,687.23" size="28 / 500 / −0.03" use="Key figures" className="text-[1.75rem] font-medium leading-none tracking-[-0.03em]" />
            <TypeRow name="Title" sample="Live Crypto Updates" size="20 / 500 / −0.03" use="Sections" className="text-[1.25rem] font-medium tracking-[-0.03em]" />
            <TypeRow name="Body" sample="Advanced trading tool" size="13 / 400 / 0" use="UI copy" className="text-[13px] font-normal" />
            <TypeRow name="Meta" sample="Last login: 10 hours ago" size="10 / 400 / 0.04" use="Eyebrows" className="text-[10px] font-normal tracking-[0.04em] text-white/45" />
          </div>
        </div>
      </Board>

      <Board>
        <div className="px-6 py-10 md:px-12 md:py-14">
          <div className="grid grid-cols-6 gap-3 sm:grid-cols-9">
            {ICONS.map((name) => (
              <div key={name} className="grid aspect-square place-items-center rounded-2xl bg-[#0F2323] text-white">
                <Glyph name={name} size={30} />
              </div>
            ))}
          </div>
        </div>
      </Board>

      <div>
        <Board>
          <div className="p-3 md:p-4">
            <div className={cn(hyperliquidInter.className, "rounded-[1.25rem] bg-[#001111] px-6 py-10 md:px-12 md:py-14")}>
              <div className="flex flex-col gap-16">
                <KitGroup title="Navigation">
                  <Specimen label="Rest">
                    <NavItem state="rest" />
                  </Specimen>
                  <Specimen label="Hover">
                    <NavItem state="hover" />
                  </Specimen>
                  <Specimen label="Selected">
                    <NavItem state="selected" />
                  </Specimen>
                </KitGroup>

                <KitGroup title="Actions">
                  <Specimen label="Rest">
                    <Segment state="rest" />
                  </Specimen>
                  <Specimen label="Hover">
                    <Segment state="hover" />
                  </Specimen>
                  <Specimen label="Selected">
                    <Segment state="selected" />
                  </Specimen>
                </KitGroup>

                <KitGroup title="Status" row>
                  <Specimen label="Gain">
                    <Image
                      src={asset("delta-up.png")}
                      alt="Positive change"
                      width={300}
                      height={126}
                      className="h-8 w-auto object-contain"
                    />
                  </Specimen>
                  <Specimen label="Loss">
                    <Image
                      src={asset("delta-down.png")}
                      alt="Negative change"
                      width={300}
                      height={126}
                      className="h-8 w-auto object-contain"
                    />
                  </Specimen>
                  <Specimen label="Chip">
                    <span className="inline-flex h-[25px] items-center rounded-[8px] bg-[#0F2323] px-3 text-[12px] text-white/70">
                      Favourites
                    </span>
                  </Specimen>
                </KitGroup>
              </div>
            </div>
          </div>
        </Board>
        <figure className="mt-[var(--space-block)] border-t border-line pt-[var(--space-block)]">
          <Media
            media={{
              type: "video",
              src: "/work/hyperliquid/06.mp4",
              label: "Hyperliquid — interface film",
              aspect: "16/9",
            }}
          />
        </figure>
      </div>
    </Container>
  );
}
