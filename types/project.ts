/** The first four are services; the rest are project-only tags with no service page. */
export type DisciplineSlug =
  | "motion"
  | "branding"
  | "product"
  | "ui-ux"
  | "creative-direction"
  | "visual-development"
  | "art-direction"
  | "digital-design"
  | "design-systems"
  | "print-design"
  | "social-design";

export type MediaType = "image" | "video";

/** Width/height, e.g. "16/9". Tall one-off artwork can use its pixel size, e.g. "1519/2824". */
export type AspectRatio = `${number}/${number}`;

export type MediaAsset = {
  type: MediaType;
  label: string;
  aspect?: AspectRatio;
  /** Without a src the asset renders as a labelled placeholder. */
  src?: string;
  poster?: string;
};

export type ContentBlock =
  | { type: "media"; media: MediaAsset; caption?: string; bleed?: boolean; heading?: string; body?: string }
  | { type: "compare"; before: MediaAsset; after: MediaAsset; caption?: string }
  | { type: "media-grid"; items: MediaAsset[]; columns: 2 | 3; caption?: string; heading?: string; body?: string }
  | { type: "media-text"; media: MediaAsset; heading: string; body: string; reverse?: boolean }
  | { type: "text"; heading?: string; body: string }
  | { type: "chapter"; heading: string; body: string; items: MediaAsset[] }
  | { type: "quote"; quote: string; attribution: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export type ProjectFormat = "full" | "short";

export type Project = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  client: string;
  disciplines: DisciplineSlug[];
  role: string;
  deliverables: string[];
  format: ProjectFormat;
  concept?: boolean;
  cover: MediaAsset;
  hero: MediaAsset;
  brief: string;
  approach?: string;
  blocks: ContentBlock[];
  outcome?: string;
  /** Collaborators listed under the outcome. */
  credits?: { role: string; name: string }[];
  /** Search title and description. Not shown on the page. */
  seo: { title: string; description: string };
};

export type Service = {
  slug: DisciplineSlug;
  number: string;
  title: string;
  summary: string;
  description: string;
  /** The individual services offered under this discipline (5–10). */
  offerings: string[];
  /** Two frames used as the service showcase on /services. */
  showcase: [ShowcasePiece, ShowcasePiece];
};

export type ShowcasePiece =
  | MediaAsset
  | { type: "mark-button"; label: string };
