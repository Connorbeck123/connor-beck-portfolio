import versions from "@/lib/media-versions.json";

const map: Record<string, string> = versions;

/** Appends the file's content fingerprint, so a swapped export always loads fresh. */
export function versioned(src: string) {
  const version = map[src];
  return version ? `${src}?v=${version}` : src;
}
