import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const url = process.argv[2] || "index.html";
const tag = process.argv[3] || "st";
await p.goto("http://localhost:4700/"+url, {waitUntil:"load"});
await p.waitForTimeout(500);
const geo = await p.evaluate(()=>{const s=document.querySelector("[data-story]");const r=s.getBoundingClientRect();return {top:r.top+scrollY,h:s.offsetHeight};});
for (let i=0;i<6;i++){
  const frac=(i+0.5)/6;
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}), geo.top+(geo.h-900)*frac);
  await p.waitForTimeout(700);
  await p.screenshot({path:`lab/look/${tag}-${i}.png`});
}
await b.close();
