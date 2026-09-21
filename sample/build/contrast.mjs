/* Measures rendered contrast for every visible text run on every page.
   Walks up for the first non-transparent background, so it reports the
   colour the eye actually sees, not the colour the rule declares. */
import { chromium } from "playwright-core";

const BASE = "http://localhost:4700";
const PAGES = ["index.html", "features.html", "pricing.html", "about.html",
               "blog.html", "contact.html", "privacy.html", "terms.html"];

const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fails = 0, checked = 0;
const seen = new Set();

for (const lang of ["", "en/"]) {
  for (const pg of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${lang}${pg}`, { waitUntil: "load" });
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise(r => setTimeout(r, 40));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(350);

    const rows = await page.evaluate(() => {
      const lum = c => {
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
      };
      const parse = s => { const m = s.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : null; };
      const alpha = s => { const m = s.match(/[\d.]+/g); return m && m.length > 3 ? Number(m[3]) : 1; };
      const bgOf = el => {
        let e = el;
        while (e && e !== document.documentElement) {
          const cs = getComputedStyle(e);
          if (alpha(cs.backgroundColor) > 0.85) return parse(cs.backgroundColor);
          if (cs.backgroundImage && cs.backgroundImage !== "none" && e.matches(".sec--forest,.cta,.ftr,.hero")) {
            // gradient grounds: sample their darkest declared stop conservatively
            const m = cs.backgroundImage.match(/rgba?\([^)]+\)/g);
            if (m) { const c = parse(m[m.length - 1]); if (c) return c; }
          }
          e = e.parentElement;
        }
        return [237, 234, 227];
      };
      const out = [];
      document.querySelectorAll("p,h1,h2,h3,h4,a,span,li,label,button,summary,div").forEach(el => {
        if (el.children.length) return;
        /* Text sitting on a photograph has no declared background to climb
           to. Grading it here would compare it against the page default and
           report a failure that is not real. build/photocontrast.mjs measures
           these against the composited pixels instead. */
        if (el.closest(".band, .cta--photo, .shot")) return;
        const t = (el.textContent || "").trim();
        if (t.length < 3) return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") return;
        if (parseFloat(cs.opacity) < 0.6) return;
        const fg = parse(cs.color); const bg = bgOf(el);
        if (!fg || !bg) return;
        const L1 = lum(fg), L2 = lum(bg);
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const px = parseFloat(cs.fontSize);
        const w = parseInt(cs.fontWeight, 10) || 400;
        const large = px >= 24 || (px >= 18.66 && w >= 700);
        const need = large ? 3 : 4.5;
        out.push({ t: t.slice(0, 44), ratio: +ratio.toFixed(2), need, px, w,
                   fg: cs.color, bg: `rgb(${bg.join(",")})`, pass: ratio >= need });
      });
      return out;
    });

    for (const r of rows) {
      checked++;
      if (r.pass) continue;
      const key = `${r.fg}|${r.bg}|${r.need}`;
      if (seen.has(key)) continue;
      seen.add(key);
      fails++;
      console.log(`FAIL ${String(r.ratio).padStart(5)}:1 (need ${r.need})  ${r.px}px/${r.w}  ${r.fg} on ${r.bg}`);
      console.log(`      "${r.t}"   [${lang}${pg}]`);
    }
    await ctx.close();
  }
}
console.log(`\n${checked} text runs measured, ${fails} distinct failing colour pairs`);
await b.close();
