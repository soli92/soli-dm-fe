import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public/brand/d20-icon.svg");
const outDir = join(root, "public/icons");

const targets = [
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
];

await mkdir(outDir, { recursive: true });
for (const { size, name } of targets) {
  await sharp(svgPath)
    .resize(size, size, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 1 } })
    .png()
    .toFile(join(outDir, name));
}
console.log("PWA icons:", targets.map((t) => `icons/${t.name}`).join(", "));
