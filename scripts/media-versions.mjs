// Fingerprints every video and poster so swapped files get a new URL and skip stale browser caches.
// Runs before `next dev` and `next build`; output is lib/media-versions.json.
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = join(import.meta.dirname, "..");
const publicDir = join(root, "public");
const dirs = ["work", "hero"].map((dir) => join(publicDir, dir));
const pattern = /\.(mp4|poster\.jpg)$/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (pattern.test(entry.name)) yield path;
  }
}

const hash = (path) =>
  new Promise((resolve, reject) => {
    const md5 = createHash("md5");
    createReadStream(path)
      .on("data", (chunk) => md5.update(chunk))
      .on("end", () => resolve(md5.digest("hex").slice(0, 8)))
      .on("error", reject);
  });

const versions = {};
for (const dir of dirs) {
  for await (const path of walk(dir)) {
    versions[`/${relative(publicDir, path).split(sep).join("/")}`] = await hash(path);
  }
}

const sorted = Object.fromEntries(Object.entries(versions).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(join(root, "lib", "media-versions.json"), `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`media-versions: ${Object.keys(sorted).length} files`);
