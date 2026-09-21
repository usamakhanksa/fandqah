import { chromium } from "playwright-core";

const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });

for (const url of ["https://fandaqah.com/store", "https://fandaqah.com/en/store"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch { await p.waitForTimeout(4000); }
  await p.waitForTimeout(4000);

  const data = await p.evaluate(() => {
    const out = { prices: null, cards: [], addons: [], toggles: [], headings: [] };
    try { out.prices = window.packagePrices || null; } catch {}

    // any element that looks like a plan card
    const cards = document.querySelectorAll('[data-package], [data-packageid], .package, .plan, [class*="package"], [class*="plan"]');
    const seen = new Set();
    cards.forEach(c => {
      const t = (c.innerText || "").replace(/\s+/g, " ").trim();
      if (t.length > 25 && t.length < 900 && !seen.has(t)) { seen.add(t); out.cards.push(t); }
    });

    document.querySelectorAll("h1,h2,h3,h4").forEach(h => {
      const t = (h.innerText || "").trim();
      if (t) out.headings.push(t);
    });

    document.querySelectorAll('input[type="radio"], input[type="checkbox"], select').forEach(i => {
      const lbl = i.closest("label")?.innerText || document.querySelector(`label[for="${i.id}"]`)?.innerText || i.name || "";
      const t = (lbl || "").replace(/\s+/g, " ").trim();
      if (t) out.toggles.push(t.slice(0, 120));
    });

    document.querySelectorAll("[data-variation-price], [class*='addon'], [class*='extra']").forEach(a => {
      const t = (a.innerText || "").replace(/\s+/g, " ").trim();
      if (t && t.length < 200) out.addons.push(t);
    });
    return out;
  });

  console.log("\n================ " + url + " ================");
  console.log("packagePrices:", JSON.stringify(data.prices));
  console.log("\n-- headings --");
  console.log([...new Set(data.headings)].slice(0, 30).join("\n"));
  console.log("\n-- plan cards --");
  [...new Set(data.cards)].slice(0, 14).forEach(c => console.log("• " + c.slice(0, 500) + "\n"));
  console.log("-- toggles --");
  console.log([...new Set(data.toggles)].slice(0, 25).join(" | "));
  console.log("\n-- addons --");
  console.log([...new Set(data.addons)].slice(0, 25).join("\n"));

  await p.screenshot({ path: `lab/store-${url.includes("/en/") ? "en" : "ar"}.png`, fullPage: true });
  await ctx.close();
}
await b.close();
