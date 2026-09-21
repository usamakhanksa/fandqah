import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let bad = 0;
const ok = (n, c, extra="") => { console.log((c?"  ok  ":"  FAIL") + "  " + n + (extra?"  "+extra:"")); if(!c) bad++; };

// ---- cost calculator ----
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900} });
  const p = await ctx.newPage();
  await p.goto("http://localhost:4700/en/pricing.html", { waitUntil:"load" });
  await p.waitForTimeout(600);
  console.log("cost calculator");
  for (const [plan, base] of [["Starter",0],["Core",1200],["Connect",1980],["Pro",3000]]) {
    await p.selectOption("#calc-plan", { label: plan });
    await p.waitForTimeout(150);
    const r = await p.evaluate(() => ({
      base: document.getElementById("calc-base").textContent,
      setup: document.getElementById("calc-setup").textContent,
      vat: document.getElementById("calc-vat").textContent,
      total: document.getElementById("calc-total").textContent
    }));
    const expTotal = ((base + 300) * 1.15).toFixed(2);
    const gotTotal = r.total.replace(/,/g, "");
    ok(`${plan.padEnd(8)} base=${r.base} setup=${r.setup} vat=${r.vat} total=${r.total}`,
       gotTotal === expTotal, gotTotal === expTotal ? "" : `expected ${expTotal}`);
  }
  await ctx.close();
}

// ---- FAQ, nav, keyboard ----
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900} });
  const p = await ctx.newPage();
  await p.goto("http://localhost:4700/en/index.html", { waitUntil:"load" });
  await p.waitForTimeout(500);
  console.log("\ninteractions");

  const firstOpen = await p.evaluate(() => document.querySelector(".faq details").open);
  await p.click(".faq details:nth-of-type(2) summary");
  await p.waitForTimeout(200);
  const second = await p.evaluate(() => document.querySelectorAll(".faq details")[1].open);
  ok("FAQ first is open by default", firstOpen === true);
  ok("FAQ second opens on click", second === true);

  const skip = await p.evaluate(() => { const a=document.querySelector(".skip"); a.focus();
    return getComputedStyle(a).top; });
  ok("skip link reveals on focus", skip === "0px", `top=${skip}`);

  const focusables = await p.evaluate(() =>
    document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])').length);
  ok("focusable elements present", focusables > 20, `${focusables} found`);

  // story steps are keyboard operable
  const storyKb = await p.evaluate(() => {
    const s = document.querySelector(".story__step");
    return s && s.getAttribute("role") === "button" && s.getAttribute("tabindex") === "0";
  });
  ok("story steps keyboard operable", storyKb === true);
  await ctx.close();
}

// ---- mobile nav ----
{
  const ctx = await b.newContext({ viewport:{width:390,height:844} });
  const p = await ctx.newPage();
  await p.goto("http://localhost:4700/index.html", { waitUntil:"load" });
  await p.waitForTimeout(400);
  console.log("\nmobile nav (RTL)");
  await p.click("#burger");
  await p.waitForTimeout(250);
  const open = await p.evaluate(() => document.getElementById("mnav").dataset.open === "1");
  ok("burger opens menu", open);
  await p.keyboard.press("Escape");
  await p.waitForTimeout(250);
  const closed = await p.evaluate(() => document.getElementById("mnav").dataset.open === "0");
  ok("Escape closes menu", closed);
  await ctx.close();
}

console.log(bad ? `\n${bad} functional failure(s)` : "\nall interactions working");
await b.close();
