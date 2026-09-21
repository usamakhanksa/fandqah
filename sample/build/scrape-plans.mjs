import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1600, height: 1200 } });
const p = await ctx.newPage();
try { await p.goto("https://fandaqah.com/store", { waitUntil: "networkidle", timeout: 60000 }); }
catch { await p.waitForTimeout(4000); }
await p.waitForTimeout(5000);

const dump = await p.evaluate(() => {
  const norm = s => (s || "").replace(/\s+/g, " ").trim();

  // find the heading of each plan, then walk up to the card container
  const names = ["ستارتر", "كور", "كونكت", "برو"];
  const plans = [];
  names.forEach(n => {
    const h = [...document.querySelectorAll("h1,h2,h3,h4,h5")].find(x => norm(x.innerText) === n);
    if (!h) return;
    let box = h;
    for (let i = 0; i < 7 && box.parentElement; i++) {
      box = box.parentElement;
      if (box.innerText && box.innerText.length > 120) break;
    }
    plans.push({ name: n, text: norm(box.innerText).slice(0, 1600) });
  });

  // add-ons block
  const addHead = [...document.querySelectorAll("h1,h2,h3,h4,h5")].find(x => norm(x.innerText).startsWith("الإضافات"));
  let addons = "";
  if (addHead) {
    let box = addHead;
    for (let i = 0; i < 8 && box.parentElement; i++) {
      box = box.parentElement;
      if (box.innerText && box.innerText.length > 300) break;
    }
    addons = norm(box.innerText).slice(0, 4000);
  }

  // every visible SAR figure with its nearest label
  const money = [];
  document.querySelectorAll("*").forEach(el => {
    if (el.children.length) return;
    const t = norm(el.innerText);
    if (/^\s*(SAR\s*)?[\d,]+(\.\d+)?\s*$/.test(t) && t !== "0") {
      const ctxText = norm(el.parentElement?.parentElement?.innerText || "").slice(0, 160);
      money.push(t + "  ←  " + ctxText);
    }
  });

  const setup = [...document.querySelectorAll("*")].filter(e => !e.children.length &&
    norm(e.innerText).includes("رسوم التثبيت")).map(e => norm(e.parentElement?.innerText || "")).slice(0, 3);

  return { plans, addons, money: [...new Set(money)].slice(0, 60), setup };
});

let out = "";
out += "===== PLANS =====\n";
dump.plans.forEach(pl => { out += `\n### ${pl.name}\n${pl.text}\n`; });
out += "\n\n===== ADD-ONS =====\n" + dump.addons;
out += "\n\n===== MONEY FIGURES =====\n" + dump.money.join("\n");
out += "\n\n===== SETUP FEE =====\n" + dump.setup.join("\n");

writeFileSync("build/store-dump.txt", out, "utf8");
console.log(out.slice(0, 6000));
await b.close();
