import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:4700";
const PAGES = ["index.html", "features.html", "pricing.html", "about.html",
               "blog.html", "contact.html", "privacy.html", "terms.html"];

mkdirSync("lab/site", { recursive: true });

const b = await chromium.launch({ executablePath: CHROME });
let problems = 0;

for (const lang of ["", "en/"]) {
  for (const p of PAGES) {
    const url = `${BASE}/${lang}${p}`;
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [], bad = [];
    page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", e => errs.push("JS: " + e.message));
    page.on("response", r => { if (r.status() >= 400) bad.push(r.status() + " " + r.url().replace(BASE, "")); });

    const resp = await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => {
      const g = s => document.querySelector(s);
      const lds = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(s => { try { return JSON.parse(s.textContent)["@type"]; } catch { return "BAD-JSON"; } });
      return {
        status: "",
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        title: (document.title || "").length,
        desc: (g('meta[name="description"]')?.content || "").length,
        canon: g('link[rel="canonical"]')?.href || "",
        hreflang: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
        og: !!g('meta[property="og:title"]'),
        ld: lds,
        h1: document.querySelectorAll("h1").length,
        imgNoAlt: [...document.images].filter(i => !i.hasAttribute("alt")).length,
        scrollX: document.documentElement.scrollWidth > window.innerWidth + 2
      };
    });

    const flags = [];
    if (resp.status() !== 200) flags.push("HTTP " + resp.status());
    if (errs.length) flags.push(errs.length + " console err");
    if (bad.length) flags.push("404s: " + bad.join(", "));
    if (m.h1 !== 1) flags.push("h1=" + m.h1);
    if (m.hreflang !== 3) flags.push("hreflang=" + m.hreflang);
    if (m.title > 62) flags.push("title " + m.title + "ch");
    if (m.desc > 165 || m.desc < 70) flags.push("desc " + m.desc + "ch");
    if (m.imgNoAlt) flags.push(m.imgNoAlt + " img no alt");
    if (m.ld.includes("BAD-JSON")) flags.push("BAD JSON-LD");
    if (m.scrollX) flags.push("H-SCROLL");
    if (flags.length) problems++;

    console.log(`${(lang + p).padEnd(22)} ${m.lang}/${m.dir}  ld=[${m.ld}]  ${flags.length ? "⚠ " + flags.join(" | ") : "ok"}`);

    // walk the page so IntersectionObserver fires, then return to the top
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({top: y, behavior: 'instant'});
        await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo({top: 0, behavior: 'instant'});
    });
    await page.waitForTimeout(500);

    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".rv")].filter(e => getComputedStyle(e).opacity === "0").length);
    if (hidden) console.log(`   ⚠ ${hidden} reveal elements still invisible`);

    if (p === "index.html" || p === "features.html" || p === "pricing.html") {
      await page.screenshot({ path: `lab/site/${lang.replace("/", "-")}${p}.png`, fullPage: true });
    }
    await ctx.close();
  }
}

/* mobile pass on the two heaviest pages */
for (const u of ["/index.html", "/en/index.html", "/contact.html"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + u, { waitUntil: "load" });
  await page.waitForTimeout(500);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  console.log(`mobile ${u.padEnd(18)} ${over ? "⚠ H-SCROLL" : "ok"}`);
  if (over) problems++;
  await page.screenshot({ path: `lab/site/m${u.replace(/\//g, "-")}.png`, fullPage: true });
  await ctx.close();
}

console.log(problems ? `\n${problems} page(s) flagged` : "\nall pages clean");
await b.close();
