/* Regenerates every derived image from the originals in assets/site.
   Run after adding or replacing a source asset:  node build/images.mjs

   Requires ffmpeg with libwebp on PATH. Originals are never modified or
   deleted: the PNG stays as the <picture> fallback. */
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync, statSync } from "node:fs";

const DIR = "assets/site";
const run = a => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...a]);
const kb  = f => (statSync(f).size / 1024).toFixed(1) + "kB";

/* responsive sets for the two large photographs */
const RESPONSIVE = {
  "about-photo.png":     { base: "about-photo", widths: [640, 960, 1280, 1536], jpeg: 1280 },
  "fandaqah-slide-2.png": { base: "slide2",      widths: [640, 960, 1280, 1536] }
};

/* images that are only ever shown small */
const FIXED = { "fandaqah-simple.png": [["logo-150", 150], ["logo-300", 300]] };

/* never derive from these */
const SKIP = new Set(["og-card.jpg", "icon-192.png", "icon-512.png", "icon-180.png"]);

let made = 0;

for (const [src, cfg] of Object.entries(RESPONSIVE)) {
  if (!existsSync(`${DIR}/${src}`)) continue;
  for (const w of cfg.widths) {
    const out = `${DIR}/${cfg.base}-${w}.webp`;
    run(["-i", `${DIR}/${src}`, "-vf", `scale=${w}:-2:flags=lanczos`,
         "-c:v", "libwebp", "-quality", "78", "-compression_level", "6", out]);
    console.log("  webp  ", out, kb(out)); made++;
  }
  if (cfg.jpeg) {
    const out = `${DIR}/${cfg.base}-${cfg.jpeg}.jpg`;
    run(["-i", `${DIR}/${src}`, "-vf", `scale=${cfg.jpeg}:-2:flags=lanczos`, "-c:v", "mjpeg", "-q:v", "5", out]);
    console.log("  jpeg  ", out, kb(out)); made++;
  }
}

for (const [src, sizes] of Object.entries(FIXED)) {
  if (!existsSync(`${DIR}/${src}`)) continue;
  for (const [name, w] of sizes) {
    const out = `${DIR}/${name}.webp`;
    run(["-i", `${DIR}/${src}`, "-vf", `scale=${w}:-1:flags=lanczos`,
         "-c:v", "libwebp", "-quality", "89", "-compression_level", "6", out]);
    console.log("  webp  ", out, kb(out)); made++;
  }
}

/* a same-name .webp beside every other raster, which is what picture() looks for */
for (const f of readdirSync(DIR)) {
  if (!/\.png$/i.test(f) || SKIP.has(f) || RESPONSIVE[f] || FIXED[f]) continue;
  const out = `${DIR}/${f.replace(/\.png$/i, ".webp")}`;
  run(["-i", `${DIR}/${f}`, "-c:v", "libwebp", "-quality", "82", "-compression_level", "6", out]);
  console.log("  webp  ", out, kb(out) + "  (from " + kb(`${DIR}/${f}`) + ")"); made++;
}

/* the 1200x630 social card */
if (existsSync(`${DIR}/about-photo.png`)) {
  run(["-i", `${DIR}/about-photo.png`, "-vf", "scale=1200:-2:flags=lanczos,crop=1200:630",
       "-c:v", "mjpeg", "-q:v", "4", `${DIR}/og-card.jpg`]);
  console.log("  card  ", `${DIR}/og-card.jpg`, kb(`${DIR}/og-card.jpg`)); made++;
}

console.log(`\n${made} derived images written`);
