import { chromium } from "playwright-core";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: CHROME });
const targets = process.argv.slice(2);
for (const spec of targets) {
  const [url, tag, wv] = spec.split("|");
  const [w,h] = (wv||"1440x900").split("x").map(Number);
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
  const p = await ctx.newPage();
  await p.goto(B+"/"+url, {waitUntil:"load"});
  await p.waitForTimeout(600);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  const stops = [0, .12, .25, .38, .5, .63, .76, .9];
  let i=0;
  for (const s of stops) {
    await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}), Math.round(s*(H-h)));
    await p.waitForTimeout(450);
    await p.screenshot({ path:`lab/look/${tag}-${String(i).padStart(2,'0')}.png` });
    i++;
  }
  await ctx.close();
  console.log(tag, "height", H);
}
await b.close();
