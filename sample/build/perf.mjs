/* Weighs what the home page actually downloads, and reports the LCP
   element and time. Headless Chrome on localhost is not a field
   measurement; it is a like-for-like comparison against the same page
   before the image work. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [tag, url] of [["ar home", "/index.html"], ["en home", "/en/index.html"],
   ["features", "/features.html"], ["about", "/about.html"], ["contact", "/contact.html"]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const bytes = {}; let total = 0;
  page.on("response", async r => {
    try {
      const len = Number((await r.allHeaders())["content-length"] || 0);
      const t = (r.request().resourceType() || "other");
      bytes[t] = (bytes[t] || 0) + len; total += len;
    } catch {}
  });
  await page.goto(B + url, { waitUntil: "networkidle" });
  const firstLoad = total;
  const lcp = await page.evaluate(() => new Promise(res => {
    let v = null;
    new PerformanceObserver(l => { for (const e of l.getEntries()) v = { t: Math.round(e.startTime), el: e.element ? e.element.tagName + (e.element.currentSrc ? " " + e.element.currentSrc.split("/").pop() : "") : e.url || "?" }; })
      .observe({ type: "largest-contentful-paint", buffered: true });
    setTimeout(() => res(v), 400);
  }));
  /* everything above is first load. Now scroll the whole page so the lazy
     images below the fold are fetched, and report that separately: the
     first-load figure is what LCP depends on, the full figure is what the
     visitor eventually downloads. */
  await page.evaluate(async () => {
    const s = innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += s) { scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(1500);

  const kb = n => (n / 1024).toFixed(0) + "kB";
  console.log(`${tag.padEnd(9)} first load ${kb(firstLoad).padStart(7)}   full scroll ${kb(total).padStart(7)}`);
  console.log(`          ${Object.entries(bytes).sort((a, c) => c[1] - a[1]).map(([k, v]) => `${k} ${kb(v)}`).join("  ")}`);
  console.log(`          LCP ${lcp ? lcp.t + "ms  " + lcp.el : "n/a"}`);
  await ctx.close();
}
await b.close();
