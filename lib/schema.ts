import { SITE } from "@/content/site";
import { disciplineLabel } from "@/lib/projects";
import type { Project } from "@/types/project";

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

const absolute = (path: string) => new URL(path, SITE.url).toString();

export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE.name,
        url: SITE.url,
        email: `mailto:${SITE.email}`,
        image: absolute("/opengraph-image"),
        jobTitle: SITE.seo.jobTitles[0],
        hasOccupation: SITE.seo.jobTitles.map((name) => ({ "@type": "Occupation", name })),
        description: SITE.seo.description,
        knowsAbout: [...SITE.seo.knowsAbout, ...SITE.seo.sectors],
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        workLocation: { "@type": "Place", name: "London, UK" },
        sameAs: SITE.social.filter((link) => link.href.startsWith("http")).map((link) => link.href),
        brand: SITE.seo.notableClients.map((name) => ({ "@type": "Organization", name })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE.url,
        name: SITE.name,
        description: SITE.seo.description,
        inLanguage: "en-GB",
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

export function projectSchema(project: Project) {
  const url = absolute(`/work/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        headline: project.seo.title,
        description: project.seo.description,
        abstract: project.summary,
        url,
        image: absolute(`/work/${project.slug}/opengraph-image`),
        inLanguage: "en-GB",
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        genre: project.disciplines.map(disciplineLabel),
        keywords: [...project.disciplines.map(disciplineLabel), ...project.deliverables].join(", "),
        ...(project.client !== project.title && project.client !== "Crypto Platform"
          ? { sourceOrganization: { "@type": "Organization", name: project.client } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: absolute("/work") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
