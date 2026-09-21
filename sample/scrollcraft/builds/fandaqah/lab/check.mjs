import { chromium } from "playwright-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:4500";

const b = await chromium.launch({ executablePath: CHROME });

async function probe(label, width, height, arabic) {
  const ctx = await b.newContext({ viewport: { width, height } });
  const p = await ctx.newPage();
  if (arabic) await ctx.addInitScript(() => localStorage.setItem("fandaqah_lang", "ar"));
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(1200);

  const m = await p.evaluate(() => {
    const rail = document.querySelector("[data-sc-pan]");
    const bar = document.querySelector(".fd-bar");
    const cta = document.querySelector(".fd-btn--primary");
    const r = cta.getBoundingClientRect();
    const cs = getComputedStyle(cta);
    return {
      dir: document.documentElement.dir,
      lang: document.documentElement.lang,
      railOverflow: rail ? rail.scrollWidth - window.innerWidth : null,
      barHeight: Math.round(bar.getBoundingClientRect().height),
      ctaLines: Math.round(r.height / parseFloat(cs.lineHeight || 16)),
      ctaH: Math.round(r.height),
      docScroll: Math.round(document.documentElement.scrollHeight / window.innerHeight * 10) / 10,
      hour: document.getElementById("dialTime").textContent,
      prop: document.getElementById("fdPropName").textContent
    };
  });
  console.log(label, JSON.stringify(m));

  // scroll to the peak and confirm the ledger actually posts + seal fires
  const audit = await p.evaluate(() => {
    const el = document.querySelector("#audit");
    const top = el.getBoundingClientRect().top + scrollY;
    // land inside the act's visible travel, near its end
    window.scrollTo(0, top + window.innerHeight * 3.2);
    return true;
  });
  await p.waitForTimeout(900);
  const peak = await p.evaluate(() => {
    const rows = [...document.querySelectorAll(".fd-led")];
    return {
      clock: document.getElementById("dialTime").textContent,
      posted: rows.filter(r => r.dataset.posted === "1").length,
      rows: rows.length,
      seal: document.getElementById("auditSeal").dataset.on,
      total: rows[rows.length - 1].lastChild.textContent,
      canvas: getComputedStyle(document.body).backgroundColor
    };
  });
  console.log("   peak:", JSON.stringify(peak));

  await p.screenshot({ path: `lab/${label}-peak.png` });
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(600);
  await p.screenshot({ path: `lab/${label}-hero.png` });
  await ctx.close();
}

await probe("en-desktop", 1440, 900, false);
await probe("ar-desktop", 1440, 900, true);
await probe("ar-mobile", 390, 844, true);

await b.close();
