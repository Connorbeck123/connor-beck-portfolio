import type { AspectRatio, MediaAsset, Project } from "@/types/project";

/** Canonical order for homepage, index and next-project links. Do not reorder. */
export const PROJECT_SLUGS = [
  "pl-bloom",
  "alma",
  "pitch-level",
  "hyperliquid",
  "the-kick-off",
  "pl-socials",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Real asset from /public/work/<slug>/. Images are .png unless the file name says otherwise. */
function asset(slug: ProjectSlug, file: string, label: string, aspect: AspectRatio = "16/9"): MediaAsset {
  const withExtension = file.includes(".") ? file : `${file}.png`;
  return {
    type: withExtension.endsWith(".mp4") ? "video" : "image",
    label,
    aspect,
    src: `/work/${slug}/${withExtension}`,
  };
}

const bloom = (file: string, label: string, aspect?: AspectRatio) => asset("pl-bloom", file, label, aspect);
const alma = (file: string, label: string, aspect?: AspectRatio) => asset("alma", file, label, aspect);
const pitch = (file: string, label: string, aspect?: AspectRatio) => asset("pitch-level", file, label, aspect);
const hyper = (file: string, label: string, aspect?: AspectRatio) => asset("hyperliquid", file, label, aspect);
const tko = (file: string, label: string, aspect?: AspectRatio) => asset("the-kick-off", file, label, aspect);
const socials = (file: string, label: string, aspect?: AspectRatio) => asset("pl-socials", file, label, aspect);

export const PROJECTS: Project[] = [
  {
    number: "01",
    slug: "pl-bloom",
    title: "PL Bloom",
    summary: "A natural, immersive visual direction for the Premier League Broadcaster Workshop.",
    client: "Premier League",
    disciplines: ["motion", "branding"],
    role: "Motion Designer",
    deliverables: ["Visual direction", "Motion system", "Large-format screens", "Event content"],
    format: "full",
    cover: bloom("00-cover-21x9.mp4", "PL Bloom — hero film", "21/9"),
    hero: bloom("01-hero.mp4", "PL Bloom — hero film"),
    brief:
      "For the Premier League Broadcaster Workshop, Bloom explored a visual direction inspired by the English countryside and the idea of the Premier League Lion emerging through nature.",
    approach:
      "The concept reimagined the Premier League brand through a more natural and considered visual language, using colour, texture and movement to create a strong sense of place. Organic forms and tactile details came together to create a visual system designed to move seamlessly between the physical and digital worlds.",
    blocks: [
      { type: "media", media: bloom("02.mp4", "Bloom — motion sequence") },
      {
        type: "media-grid",
        columns: 2,
        items: [bloom("03", "Bloom — style frame", "1/1"), bloom("04.mp4", "Bloom — square loop", "1/1")],
      },
      { type: "media", media: bloom("05.mp4", "Bloom — lion emerging through nature") },
      {
        type: "media-grid",
        columns: 2,
        items: [bloom("06.mp4", "Bloom — detail loop 01", "1/1"), bloom("07.mp4", "Bloom — detail loop 02", "1/1")],
      },
      { type: "media", media: bloom("08", "Bloom — workshop environment") },
      { type: "media", media: bloom("09.mp4", "Bloom — screens in situ") },
    ],
    outcome:
      "The final visual system brought the Bloom concept to life across the workshop environment, from large-format screens and physical installations to supporting event content. The combination of motion, colour and texture created a cohesive experience that connected the Premier League brand with its natural surroundings.",
  },
  {
    number: "02",
    slug: "alma",
    title: "Alma AI",
    summary: "Bringing Alma’s AI-powered platform to life through motion, technology and event experience.",
    client: "Indeed",
    disciplines: ["product", "motion"],
    role: "Designer",
    deliverables: ["Event branding", "Motion visuals", "Supporting assets"],
    format: "full",
    cover: alma("01-hero.mp4", "Alma — hero film"),
    hero: alma("01-hero.mp4", "Alma — hero film"),
    brief:
      "FutureWorks is Indeed’s global event series exploring the future of work, hiring and technology. For their 2025 event, Alma’s AI-powered platform was brought to the forefront through a visual experience designed to make the technology feel engaging, contemporary and accessible.",
    approach:
      "The creative language combined event branding, motion-led visuals and supporting assets to translate the platform into a cohesive physical and digital experience.",
    blocks: [
      { type: "media", media: alma("02.mp4", "Alma — brand animation", "15/8") },
      {
        type: "media-grid",
        columns: 2,
        items: [alma("03", "Alma — event asset 01", "1/1"), alma("04", "Alma — event asset 02", "1/1")],
      },
      { type: "media", media: alma("05.mp4", "Alma — stage visuals") },
      {
        type: "media-grid",
        columns: 2,
        items: [alma("06", "Alma — event asset 03", "1/1"), alma("07.mp4", "Alma — motion loop", "1/1")],
      },
      { type: "media", media: alma("08.mp4", "Alma — screen content") },
      { type: "media", media: alma("09.jpg", "Alma — event environment") },
    ],
    outcome:
      "The visual system extended Alma beyond the product itself, creating a consistent presence throughout the event experience. Motion and branded content helped communicate the platform’s technology in a way that felt dynamic, approachable and connected to the wider FutureWorks environment.",
  },
  {
    number: "03",
    slug: "pitch-level",
    title: "Pitch Level",
    summary: "A complete brand and digital experience built for the world of premium events.",
    client: "Pitch Level",
    disciplines: ["branding", "ui-ux"],
    role: "Designer",
    deliverables: ["Brand strategy", "Visual identity", "Website design", "Web build"],
    format: "full",
    cover: pitch("01-hero.mp4", "Pitch Level — hero film"),
    hero: pitch("01-hero.mp4", "Pitch Level — hero film"),
    brief:
      "Pitch Level is an events company delivering experiences across some of the UK’s most recognisable venues, including Wembley.",
    approach:
      "The brand identity was developed as a flexible system designed to work seamlessly across physical and digital touchpoints. A confident visual language combines bold typography, considered layouts and a distinctive graphic system to reflect the scale and energy of the experiences Pitch Level delivers.",
    blocks: [
      { type: "media", media: pitch("02", "Pitch Level — identity") },
      { type: "media", media: pitch("03", "Pitch Level — brand system overview", "1519/2824") },
      { type: "media", media: pitch("04", "Pitch Level — brand in use", "1519/911") },
      { type: "media", media: pitch("05", "Pitch Level — website pages", "1519/2229") },
      { type: "media", media: pitch("06.mp4", "Pitch Level — website walkthrough") },
    ],
    outcome:
      "The identity was extended into a fully responsive digital experience, creating a website that showcases Pitch Level’s events while giving the brand a clear and confident presence online. Brand strategy, visual identity, digital design and web development came together as one cohesive system, creating a consistent experience across every touchpoint.",
  },
  {
    number: "04",
    slug: "hyperliquid",
    title: "Hyperliquid",
    summary: "Rethinking the trading experience for Hyperliquid.",
    client: "Crypto Platform",
    disciplines: ["ui-ux", "product"],
    role: "Designer",
    deliverables: ["UX audit", "Information architecture", "Interface design", "Prototype"],
    format: "full",
    cover: hyper("00-cover-4x3.mp4", "Hyperliquid — dashboard film", "4/3"),
    hero: hyper("01-hero.mp4", "Hyperliquid — hero film"),
    brief:
      "A UI/UX design exploring how a complex trading platform can be made clearer and more intuitive through thoughtful product design and information hierarchy.",
    blocks: [
      {
        type: "media",
        media: hyper("02", "Hyperliquid — live price cards"),
      },
      {
        type: "media-grid",
        columns: 2,
        items: [hyper("03", "Hyperliquid — sidebar navigation", "1/1"), hyper("04", "Hyperliquid — exchange panel", "1/1")],
      },
      {
        type: "media",
        media: hyper("05", "Hyperliquid — full interface"),
      },
    ],
    outcome:
      "Market data, charts and trading actions are structured into a more considered interface, balancing the needs of experienced traders with a more accessible and cohesive product experience.",
  },
  {
    number: "05",
    slug: "the-kick-off",
    title: "The Kick Off",
    summary: "Building anticipation for the return of the Premier League.",
    client: "Premier League",
    disciplines: ["motion", "creative-direction"],
    role: "Motion Designer",
    deliverables: ["Season launch promo", "Edit", "Motion graphics"],
    format: "short",
    cover: tko("01-hero.mp4", "The Kick Off — promo"),
    hero: tko("01-hero.mp4", "The Kick Off — full promo"),
    brief:
      "A high-energy promo created to drum up excitement ahead of the new Premier League season, bringing together players, clubs and the moments that make the league so memorable.",
    blocks: [
      {
        type: "compare",
        before: tko("02-ungraded.mp4", "Ungraded", "1920/1336"),
        after: tko("02.mp4", "Graded", "1920/1336"),
      },
      {
        type: "media-grid",
        columns: 2,
        items: [tko("03", "The Kick Off — sticker artwork", "1/1"), tko("04.jpg", "The Kick Off — artwork 02", "1/1")],
      },
      { type: "media", media: tko("05.mp4", "The Kick Off — sequence 01") },
      { type: "media", media: tko("06.mp4", "The Kick Off — sequence 02") },
      { type: "media", media: tko("07", "The Kick Off — key frame") },
      { type: "media", media: tko("08.mp4", "The Kick Off — sequence 03") },
    ],
    outcome:
      "Fast-paced editing, motion and graphic design unite to create an energetic visual piece that builds momentum towards kick-off and the return of Premier League football.",
  },
  {
    number: "06",
    slug: "pl-socials",
    title: "PL Socials",
    summary: "Social formats and a flexible branding toolkit for Premier League content.",
    client: "Premier League",
    disciplines: ["motion", "branding"],
    role: "Designer",
    deliverables: ["Social formats", "Branding toolkit", "Motion templates"],
    format: "short",
    cover: socials("00-cover-21x9.mp4", "PL Socials — format montage", "21/9"),
    hero: socials("01-hero.mp4", "PL Socials — format montage"),
    brief:
      "A series of social formats and a bespoke branding toolkit for Premier League content, working across static and motion.",
    blocks: [
      {
        type: "chapter",
        heading: "Elevated Moments",
        body: "Making the moment bigger. A fast-paced social format built around standout moments from Premier League matches, combining footage, graphic design and motion to transform key moments and individual performances into engaging visual stories.",
        items: [
          socials("em-1.mp4", "Elevated Moments — Haaland", "9/17"),
          socials("em-2.mp4", "Elevated Moments — Havertz", "9/17"),
          socials("em-3.mp4", "Elevated Moments — Maguire", "9/17"),
          socials("em-4.mp4", "Elevated Moments — Doku", "9/17"),
          socials("em-5.mp4", "Elevated Moments — Chelsea v United", "9/17"),
          socials("em-7.mp4", "Elevated Moments — Ødegaard", "9/17"),
          socials("em-8.mp4", "Elevated Moments — Elanga", "9/17"),
          socials("em-9.mp4", "Elevated Moments — Bruno", "9/17"),
          socials("em-10.mp4", "Elevated Moments — Nico", "9/17"),
          socials("em-11.mp4", "Elevated Moments — United v City", "9/17"),
        ],
      },
      { type: "media", media: socials("em-6.mp4", "Elevated Moments — landscape cut") },
      {
        type: "chapter",
        heading: "Social Branding",
        body: "A flexible visual system for social. A bespoke branding toolkit for Premier League social content across static and motion formats, creating a consistent visual language while giving editors the flexibility to adapt the system across different content and platforms.",
        items: [
          socials("sb-5.mp4", "Social Branding — Arsenal v Newcastle", "9/16"),
          socials("sb-1.mp4", "Social Branding 01", "9/16"),
          socials("sb-2.mp4", "Social Branding 02", "9/16"),
          socials("sb-3.mp4", "Social Branding 03", "9/16"),
          socials("sb-4.mp4", "Social Branding 04", "9/16"),
          socials("sb-6.mp4", "Social Branding 06", "9/16"),
        ],
      },
      {
        type: "media-grid",
        columns: 2,
        items: [socials("sb-7", "Social Branding — toolkit", "1/1"), socials("sb-8.mp4", "Social Branding — toolkit in motion", "1/1")],
      },
      {
        type: "chapter",
        heading: "Hall of Fame: “In my own words”",
        body: "Letting the story lead the design. Former Premier League players enter the Hall of Fame, revisiting their careers and describing how they played the game in their own words. Typography, rotoscoped footage and motion bring each player’s story to life, creating a visual connection between the player, their words and their journey through the Premier League.",
        items: [
          socials("hof-1.mp4", "Hall of Fame 01", "9/16"),
          socials("hof-2.mp4", "Hall of Fame 02", "9/16"),
          socials("hof-3.mp4", "Hall of Fame 03", "9/16"),
        ],
      },
      {
        type: "media-grid",
        columns: 2,
        items: [socials("hof-4", "Hall of Fame — artwork", "1/1"), socials("hof-5.mp4", "Hall of Fame — square cut", "1/1")],
      },
      {
        type: "chapter",
        heading: "Matchweek Roundup",
        body: "A fast-paced visual recap bringing together key moments from a Premier League matchweek. The video consolidates multiple fixtures, results and highlights giving viewers an immediate overview of the weekend’s matches.",
        items: [
          socials("mr-1.mp4", "Matchweek Roundup — goal", "9/17"),
          socials("mr-2.mp4", "Matchweek Roundup — Tyne-Wear", "9/17"),
          socials("mr-3.mp4", "Matchweek Roundup — Matchweek 24", "9/17"),
          socials("mr-4.mp4", "Matchweek Roundup — Matchweek 23", "9/17"),
        ],
      },
    ],
  },
];
