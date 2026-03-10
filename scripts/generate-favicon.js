import sharp from "sharp";
import { readFileSync } from "fs";

// Read the SVG
const svg = readFileSync("public/favicon.svg");

// Generate 32x32 PNG and save as .ico (ICO format compatible)
await sharp(svg)
  .resize(32, 32)
  .png()
  .toFile("public/favicon.ico");

console.log("✓ Generated favicon.ico from favicon.svg");
