import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const [url, tag, sel, w, h] = process.argv.slice(2);
const ctx = await b.newContext({ viewport: { width: +(w||1440), height: +(h||900) } });
const p = await ctx.newPage();
await p.goto("http://localhost:4700/" + url, { waitUntil: "load" });
await p.waitForTimeout(500);
// walk the page so reveals fire
await p.evaluate(async () => { const s = innerHeight*0.8;
  for (let y=0; y<document.body.scrollHeight; y+=s) { scrollTo({top:y,behavior:'instant'}); await new Promise(r=>setTimeout(r,70)); } });
await p.waitForTimeout(400);
const el = p.locator(sel).first();
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
await el.screenshot({ path: `lab/look/${tag}.png` });
console.log(tag, "captured");
await b.close();
