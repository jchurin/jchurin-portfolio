import sharp from "sharp";
import { readFileSync } from "fs";

const svg = readFileSync("public/favicon.svg");

await sharp(svg)
  .resize(32, 32)
  .png()
  .toFile("public/favicon.ico");

console.log("✓ Generated favicon.ico from favicon.svg");
