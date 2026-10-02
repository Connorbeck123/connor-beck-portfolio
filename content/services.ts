import type { MediaAsset, Service } from "@/types/project";

function work(slug: string, file: string, label: string): MediaAsset {
  const withExtension = file.includes(".") ? file : `${file}.png`;
  return {
    type: withExtension.endsWith(".mp4") ? "video" : "image",
    label,
    src: `/work/${slug}/${withExtension}`,
  };
}

function serviceMedia(file: string, label: string): MediaAsset {
  return {
    type: file.endsWith(".mp4") ? "video" : "image",
    label,
    src: `/services/${file}`,
  };
}

export const SERVICES_INTRO =
  "I’m a Creative Designer with 10+ years of experience across branding, motion, product and UI/UX. I’ve worked with sports, entertainment, fashion and technology brands such as Premier League, Indeed and Entain. I take a considered approach to create distinctive, visually engaging work that’s built to convert.";

/** Order used on Home, Services and the project filters. */
export const SERVICES: Service[] = [
  {
    slug: "motion",
    number: "01",
    title: "Motion Design",
    summary: "Animation and moving image for brands, broadcast, social and live events.",
    description:
      "Bringing ideas and brands to life through animation and movement. From launch promos and social content to large broadcasts and billboards.",
    offerings: [
      "Motion Graphics",
      "Brand Animation Systems",
      "Logo Animation",
      "Promos & Campaign Films",
      "Social Content",
      "Broadcast Graphics",
      "Event & Large-Format Screens",
      "Video Editing",
    ],
    showcase: [
      work("pl-bloom", "02.mp4", "Bloom — motion sequence"),
      work("the-kick-off", "01-hero.mp4", "The Kick Off — season promo"),
    ],
  },
  {
    slug: "branding",
    number: "02",
    title: "Brand Identity",
    summary: "The look, feel and visual style that make a brand recognisable and shape how customers perceive your brand.",
    description:
      "The look, feel and visual style that make a brand recognisable and shape how customers perceive your brand.",
    offerings: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Art Direction",
      "Typography & Colour",
      "Brand Guidelines",
      "Event Branding",
      "Social Branding",
    ],
    showcase: [
      serviceMedia("logo-branding-guide-v2.jpg", "CB — logo branding guide"),
      serviceMedia("pitch-level-guidelines-v3.jpg", "Pitch Level — brand guidelines"),
    ],
  },
  {
    slug: "product",
    number: "03",
    title: "Product Design",
    summary: "End-to-end product work, from concept and structure to launch-ready design.",
    description:
      "Taking a product from concept to launch. This involves defining the concept, structure and features, designing the user experience and preparing it for development and handover.",
    offerings: [
      "Product Strategy",
      "Discovery & Research",
      "User Flows",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Developer Handover",
    ],
    showcase: [
      work("hyperliquid", "00-cover-4x3.mp4", "Hyperliquid — product film"),
      work("alma", "08.mp4", "Alma AI — interviews"),
    ],
  },
  {
    slug: "ui-ux",
    number: "04",
    title: "UI/UX Design",
    summary: "Designing clear, useable and engaging interfaces for websites and apps that are user friendly and built to convert.",
    description:
      "Designing clear, useable and engaging interfaces for websites and apps that are user friendly and built to convert.",
    offerings: [
      "Website Design",
      "Web App & Dashboard UI",
      "Mobile App Design",
      "Responsive Design",
      "Interaction Design",
      "UX Audits",
      "Accessibility Reviews",
      "Framer Development",
    ],
    showcase: [
      serviceMedia("pitch-level-website-v4.jpg", "Pitch Level — website"),
      { type: "mark-button", label: "CB mark button" },
    ],
  },
];

export const PROCESS = [
  {
    number: "01",
    title: "Discover",
    body: "A short introduction call to understand your business, your goals, your audience, timeline and what you want to achieve.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "Defining a clear scope, creative direction, approach and what success looks like.",
  },
  {
    number: "03",
    title: "Design",
    body: "Concepts, iteration and bringing ideas to life through thoughtful design. We take a collaborative approach ensuring there are check-ins and refinements at multiple stages.",
  },
  {
    number: "04",
    title: "Deliver",
    body: "Once everything is approved we will deliver final assets, guidelines or build-ready files for handover, plus support after launch.",
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
