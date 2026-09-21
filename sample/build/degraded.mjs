/* The page must still read with JavaScript off and with reduced motion on.
   Both paths are CSS-only by design; this proves they did not regress. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok    " : "  FAIL  ") + m); if (!c) fail++; };

for (const [tag, opts] of [
  ["javascript disabled", { javaScriptEnabled: false }],
  ["reduced motion",      { reducedMotion: "reduce" }]
]) {
  console.log("\n" + tag);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  await page.goto(B + "/index.html", { waitUntil: "load" });
  await page.waitForTimeout(500);

  const m = await page.evaluate(() => {
    const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && parseFloat(cs.opacity) > 0.05; };
    const panels = [...document.querySelectorAll(".story__panel")];
    const viz    = [...document.querySelectorAll(".story__viz")];
    return {
      panelsShown: panels.filter(vis).length,
      panelsTotal: panels.length,
      vizShown:    viz.filter(vis).length,
      revealsHidden: [...document.querySelectorAll(".rv")].filter(e => getComputedStyle(e).opacity === "0").length,
      sections: [...document.querySelectorAll("section")].filter(vis).length,
      bodyText: document.body.innerText.trim().length,
      stageSticky: getComputedStyle(document.querySelector(".story__stage")).position
    };
  });

  ok(m.panelsShown === m.panelsTotal, `all ${m.panelsTotal} story panels readable (saw ${m.panelsShown})`);
  ok(m.vizShown === m.panelsTotal,    `all ${m.panelsTotal} readouts render (saw ${m.vizShown})`);
  ok(m.revealsHidden === 0,           `no content stuck at opacity 0 (${m.revealsHidden} hidden)`);
  ok(m.sections >= 8,                 `${m.sections} sections rendered`);
  ok(m.bodyText > 3000,               `${m.bodyText} characters of readable text`);
  ok(m.stageSticky !== "sticky",      `stage is not pinned (position: ${m.stageSticky})`);

  /* the FAQ must still open, since <details> is native */
  const first = page.locator(".faq details").first();
  await first.locator("summary").click();
  await page.waitForTimeout(150);
  ok(await first.evaluate(d => d.open) !== undefined, "FAQ <details> responds without JS");
  await ctx.close();
}

/* the disclosure chevron must point down when closed and up when open,
   in both writing directions. It is drawn with physical borders so the
   rotation is not mirrored by dir=rtl. */
console.log("\nFAQ chevron orientation");
for (const [lang, url] of [["ar", "/index.html"], ["en", "/en/index.html"]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(B + url, { waitUntil: "load" });
  const r = await page.evaluate(() => {
    const d = document.querySelectorAll(".faq details");
    const rot = el => {
      const t = getComputedStyle(el, "::after").transform;
      const m = t.match(/matrix\(([^)]+)\)/); if (!m) return null;
      const [a, bb] = m[1].split(",").map(Number);
      return Math.round(Math.atan2(bb, a) * 180 / Math.PI);
    };
    const closed = [...d].find(x => !x.open), open = [...d].find(x => x.open);
    return { closed: closed && rot(closed.querySelector("summary")),
             open:   open   && rot(open.querySelector("summary")) };
  });
  ok(r.closed === 45,   `${lang}: closed chevron points down (${r.closed}deg)`);
  ok(r.open === -135,   `${lang}: open chevron points up (${r.open}deg)`);
  await ctx.close();
}

console.log(fail ? `\n${fail} degraded-path check(s) failed` : "\ndegraded paths: all checks pass");
await b.close();
process.exit(fail ? 1 : 0);
