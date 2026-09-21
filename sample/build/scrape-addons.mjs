import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1600, height: 1200 } });
const p = await ctx.newPage();
try { await p.goto("https://fandaqah.com/store", { waitUntil: "networkidle", timeout: 60000 }); } catch {}
await p.waitForTimeout(6000);
const rows = await p.evaluate(() => {
  const norm = s => (s || "").replace(/\s+/g, " ").trim();
  const out = [];
  document.querySelectorAll("*").forEach(el => {
    if (el.children.length === 0) return;
    const t = norm(el.innerText);
    if (!/SAR\s*(350|400|700|900|1000|1800)/.test(t)) return;
    if (t.length > 320) return;
    out.push(t);
  });
  return [...new Set(out)];
});
writeFileSync("build/addons2.txt", rows.join("\n----\n"), "utf8");
console.log("blocks:", rows.length);
await b.close();
