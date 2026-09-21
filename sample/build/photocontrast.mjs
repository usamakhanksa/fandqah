/* Contrast for text that sits on a photograph.

   contrast.mjs climbs the DOM for an opaque background colour. A
   photographic section has none: the real background is whatever the
   composited image happens to be behind each glyph. So this harness
   screenshots each photographic section, decodes it with the browser's own
   canvas, and measures the ACTUAL pixels under every text run, taking the
   worst sample rather than an average, then grades that against AA. */
import { chromium } from "playwright-core";

const B = "http://localhost:4700";
const SECTIONS = [".band", ".cta--photo", ".shot"];
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fails = 0, checked = 0;

/* a scratch page used only as a pixel reader */
const probeCtx = await b.newContext();
const probe = await probeCtx.newPage();
await probe.goto("about:blank");

const measure = (b64, runs) => probe.evaluate(async ({ b64, runs }) => {
  const img = new Image();
  await new Promise(res => { img.onload = res; img.src = "data:image/png;base64," + b64; });
  const c = document.createElement("canvas");
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;

  const lum = (r, gg, bb) => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(bb);
  };
  const out = [];
  for (const r of runs) {
    const lf = lum(r.c[0], r.c[1], r.c[2]);
    let worst = Infinity, worstPx = null;
    for (let y = r.y; y < r.y + r.h; y += 2) {
      for (let x = r.x; x < r.x + r.w; x += 2) {
        if (x < 0 || y < 0 || x >= c.width || y >= c.height) continue;
        const o = (y * c.width + x) * 4;
        const lb = lum(d[o], d[o + 1], d[o + 2]);
        const ra = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
        if (ra < worst) { worst = ra; worstPx = [d[o], d[o + 1], d[o + 2]]; }
      }
    }
    out.push({ ...r, worst: worst === Infinity ? null : worst, worstPx });
  }
  return out;
}, { b64, runs });

for (const [lang, url] of [["ar", "/index.html"], ["en", "/en/index.html"],
                           ["ar", "/features.html"], ["en", "/en/features.html"],
                           ["ar", "/about.html"], ["en", "/en/about.html"]]) {
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(B + url, { waitUntil: "load" });
    await page.evaluate(async () => {
      const s = innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += s) { scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 70)); }
      scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(500);

    for (const sel of SECTIONS) {
      const n = await page.locator(sel).count();
      for (let i = 0; i < n; i++) {
        const el = page.locator(sel).nth(i);
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(320);

        const runs = await el.evaluate(root => {
          const box = root.getBoundingClientRect();
          const out = [];
          root.querySelectorAll("h1,h2,h3,h4,p,span,a,b,li").forEach(e => {
            if (e.children.length) return;
            const t = (e.textContent || "").trim();
            if (t.length < 2) return;
            const r = e.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const cs = getComputedStyle(e);
            if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.6) return;
            /* An element with its own opaque background sits on that, not on
               the photograph. contrast.mjs already grades those, and sampling
               a rounded button's corners would read the backdrop instead. */
            const ba = (cs.backgroundColor.match(/[\d.]+/g) || []);
            if (ba.length && (ba.length < 4 || Number(ba[3]) > 0.85)) return;
            const c = (cs.color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
            if (c.length < 3) return;
            out.push({ t: t.slice(0, 38), c,
                       px: parseFloat(cs.fontSize), fw: parseInt(cs.fontWeight, 10) || 400,
                       x: Math.round(r.left - box.left), y: Math.round(r.top - box.top),
                       w: Math.round(r.width), h: Math.round(r.height) });
          });
          return out;
        });
        if (!runs.length) continue;

        /* Make the glyphs transparent before the screenshot, or the darkest
           pixel under a text box is the text itself. Hiding the elements
           instead would also hide the scrim spans, which carry no text and
           would leave the bare photograph being measured. */
        await el.evaluate(root => {
          root.classList.add("pc-probe");
          if (!document.getElementById("pc-probe-style")) {
            const st = document.createElement("style");
            st.id = "pc-probe-style";
            st.textContent = ".pc-probe, .pc-probe *{color:transparent !important;text-shadow:none !important;-webkit-text-fill-color:transparent !important;}";
            document.head.appendChild(st);
          }
        });
        await page.waitForTimeout(60);
        const b64 = (await el.screenshot()).toString("base64");
        await el.evaluate(root => root.classList.remove("pc-probe"));

        const res = await measure(b64, runs);
        for (const r of res) {
          if (r.worst == null) continue;
          checked++;
          const large = r.px >= 24 || (r.px >= 18.66 && r.fw >= 700);
          const need = large ? 3 : 4.5;
          if (r.worst < need) {
            fails++;
            console.log(`FAIL ${r.worst.toFixed(2)}:1 (need ${need})  ${r.px}px/${r.fw}  ${lang} ${vp.width}px  ${sel}`);
            console.log(`      "${r.t}"  ink rgb(${r.c}) on worst pixel rgb(${r.worstPx})`);
          }
        }
      }
    }
    await ctx.close();
  }
}
console.log(`\n${checked} text runs measured on real pixels, ${fails} failing`);
await b.close();
process.exit(fails ? 1 : 0);
