import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:4500", { waitUntil: "load" });
await p.waitForTimeout(1500);
for (const atScroll of [0, 5000, 11000]) {
  await p.evaluate(y => window.scrollTo(0, y), atScroll);
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const ids = ["#wake","#rush","#sync","#consoles","#range","#audit","#firstrun"];
    function docTop(el){ let y=0; while(el){ y+=el.offsetTop; el=el.offsetParent; } return y; }
    return ids.map(i => {
      const el = document.querySelector(i);
      const chain = [];
      let e = el;
      while (e) { chain.push(e.tagName.toLowerCase()+(e.id?"#"+e.id:"")+":"+e.offsetTop); e = e.offsetParent; }
      return { id: i, rect: Math.round(el.getBoundingClientRect().top + scrollY),
               off: docTop(el), chain: chain.join(" + ") };
    });
  });
  console.log(`--- scrollY=${atScroll} ---`);
  for (const x of r) console.log(`  ${x.id.padEnd(10)} rect=${String(x.rect).padStart(6)} off=${String(x.off).padStart(6)}   ${x.chain}`);
}
await b.close();
