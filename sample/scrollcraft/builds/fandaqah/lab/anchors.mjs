import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:4500", { waitUntil: "load" });
await p.waitForTimeout(1500);
const info = await p.evaluate(() => {
  const ids = ["#wake","#rush","#sync","#consoles","#range","#audit","#firstrun"];
  return {
    vh: innerHeight,
    docH: document.documentElement.scrollHeight,
    tops: ids.map(i => {
      const el = document.querySelector(i);
      return [i, Math.round(el.getBoundingClientRect().top + scrollY),
              Math.round(el.getBoundingClientRect().height)];
    })
  };
});
console.log("viewport", info.vh, "doc", info.docH, "=", (info.docH/info.vh).toFixed(1)+"vh");
for (const [id, top, h] of info.tops) console.log(`  ${id.padEnd(10)} top=${String(top).padStart(6)} (${(top/info.vh).toFixed(2)}vh)  height=${(h/info.vh).toFixed(2)}vh`);
console.log("\nhour scan:");
for (let f = 0; f <= 1.0001; f += 0.05) {
  const r = await p.evaluate(fr => {
    window.scrollTo({top:(document.documentElement.scrollHeight - innerHeight) * fr, behavior:'instant'});
    return null;
  }, f);
  await p.waitForTimeout(260);
  const c = await p.evaluate(() => document.getElementById("dialTime").textContent);
  console.log(`  ${(f*100).toFixed(0).padStart(3)}%  ${c}`);
}
await b.close();
