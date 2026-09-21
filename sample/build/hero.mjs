/* The hero must gain depth from differential travel, and must be
   perfectly static when motion is reduced. Both are asserted here from
   the composited page, not from the stylesheet. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok    " : "  FAIL  ") + m); if (!c) fail++; };

const read = async page => page.evaluate(() => {
  const g = s => { const e = document.querySelector(s); if (!e) return null;
    return +e.getBoundingClientRect().top.toFixed(1); };
  return { hp: getComputedStyle(document.querySelector(".hero")).getPropertyValue("--hp").trim(),
           glow: g(".hero__glow"), frame: g(".hero .frame"), chip: g(".hero .chip") };
});

console.log("hero depth");
let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let page = await ctx.newPage();
await page.goto(B + "/index.html", { waitUntil: "load" });
await page.waitForTimeout(400);
const a = await read(page);
await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
await page.waitForTimeout(500);
const c = await read(page);

/* travel is measured relative to the scroll itself: a plane that only
   scrolls with the page moves exactly -420. */
const travel = k => +(c[k] - a[k] + 420).toFixed(1);
const tg = travel("glow"), tf = travel("frame"), tc = travel("chip");
console.log(`  --hp ${a.hp || "0"} -> ${c.hp}   travel: glow ${tg}px, frame ${tf}px, chip ${tc}px`);
ok(parseFloat(c.hp) > 0.2, "--hp advances with scroll");
ok(Math.abs(tg) > 1 && Math.abs(tf) > 1 && Math.abs(tc) > 1, "every plane moves independently of the scroll");
ok(Math.abs(tc) > Math.abs(tf) && Math.abs(tf) > 1, "the chip travels further than the photograph");
ok(new Set([tg, tf, tc]).size === 3, "the three planes travel by different amounts");
await ctx.close();

console.log("\nreduced motion");
ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
page = await ctx.newPage();
await page.goto(B + "/index.html", { waitUntil: "load" });
await page.waitForTimeout(300);
const r1 = await read(page);
await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
await page.waitForTimeout(400);
const r2 = await read(page);
const still = ["glow", "frame", "chip"].every(k => Math.abs(r2[k] - r1[k] + 420) < 1.5);
ok(still, "no plane moves independently when motion is reduced");
await ctx.close();

console.log(fail ? `\n${fail} hero check(s) failed` : "\nhero depth: all checks pass");
await b.close();
process.exit(fail ? 1 : 0);
