/* Derives the responsive WebP sets for the editorial photography from the
   originals in lab/photo. Card art is cropped 3:2; the wide bands are
   cropped 21:9 so the crop is decided here, not by the browser.

   Sources are Pexels, free for commercial use, no attribution required.
   Provenance is recorded in assets/site/photos/CREDITS.md.

   Run: node build/photos.mjs   (needs ffmpeg with libwebp) */
import { execFileSync } from "node:child_process";
import { statSync, existsSync } from "node:fs";

const run = a => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...a]);
const kb = f => (statSync(f).size / 1024).toFixed(1) + "kB";

/* name, aspect, widths, focus
   `focus` is where the crop window sits vertically, 0 = top, .5 = centre,
   1 = bottom. It is set per photograph because a centred crop threw away
   the subject in two of them: the Kingdom Centre's arch sits high in a
   portrait frame, and the resort's waterline sits below middle. */
/* name, aspect, widths, focus, webp quality

   `focus` is where the crop window sits vertically, 0 = top, .5 = centre,
   1 = bottom. It is per photograph because a centred crop threw away the
   subject in two of them: the Kingdom Centre's arch sits high in a portrait
   frame, and the resort's waterline sits below the middle.

   `quality` is lower for the wide bands: they sit under a heavy scrim, so
   detail beneath the copy is never read at full fidelity and encoding them
   softer costs nothing visible. */
const SETS = [
  ["hotel-reception-lobby",       "3:2",  [480, 720, 1040],  0.50, 76],
  ["serviced-apartment-corridor", "3:2",  [480, 720, 1040],  0.42, 76],
  ["chalet-pool-terrace",         "3:2",  [480, 720, 1040],  0.52, 72],
  ["riyadh-skyline",              "21:9", [960, 1440, 1920], 0.20, 72],
  ["gulf-resort-pool",            "21:9", [960, 1440, 1920], 0.46, 62],
  ["jeddah-albalad",              "21:9", [960, 1440, 1920], 0.30, 60]
];

let n = 0;
const vf = (w, h, focus) =>
  `scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,` +
  `crop=${w}:${h}:(iw-ow)/2:'min(max((ih-oh)*${focus},0),ih-oh)'`;

for (const [name, aspect, widths, focus, q] of SETS) {
  const src = `lab/photo/src-${name}.jpg`;
  if (!existsSync(src)) { console.log("  skip  ", name, "(no source)"); continue; }
  const [aw, ah] = aspect.split(":").map(Number);
  for (const w of widths) {
    const h = Math.round(w * ah / aw);
    const out = `assets/site/photos/${name}-${w}.webp`;
    run(["-i", src, "-vf", vf(w, h, focus),
         "-c:v", "libwebp", "-quality", String(q || 76), "-compression_level", "6", out]);
    console.log("  webp  ", out, kb(out)); n++;
  }
  /* one JPEG fallback at the middle width */
  const w = widths[1], h = Math.round(w * ah / aw);
  const out = `assets/site/photos/${name}-${w}.jpg`;
  run(["-i", src, "-vf", vf(w, h, focus), "-c:v", "mjpeg", "-q:v", "5", out]);
  console.log("  jpeg  ", out, kb(out)); n++;
}
console.log(`\n${n} files written`);
