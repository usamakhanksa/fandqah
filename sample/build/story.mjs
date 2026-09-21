import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:4700/en/index.html", { waitUntil: "load" });
await p.waitForTimeout(800);
const geo = await p.evaluate(() => {
  const s = document.querySelector("[data-story]");
  return { top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight, vh: innerHeight,
           steps: s.querySelectorAll(".story__step").length, panels: s.querySelectorAll(".story__panel").length };
});
console.log("story:", JSON.stringify(geo), " span =", (geo.h/geo.vh).toFixed(1)+"vh");
const travel = geo.h - geo.vh;
for (const f of [0, .18, .36, .54, .72, .9, 1]) {
  await p.evaluate(y => window.scrollTo({top:y, behavior:'instant'}), geo.top + travel*f);
  await p.waitForTimeout(420);
  const st = await p.evaluate(() => {
    const s = document.querySelector("[data-story]");
    const on = [...s.querySelectorAll(".story__step")].findIndex(e => e.dataset.on === "1");
    const pon = [...s.querySelectorAll(".story__panel")].findIndex(e => e.dataset.on === "1");
    const vis = [...s.querySelectorAll(".story__panel")].filter(e => getComputedStyle(e).opacity > .5).length;
    const stuck = s.querySelector(".story__stage").getBoundingClientRect().top;
    return { step: on, panel: pon, visiblePanels: vis, stageTop: Math.round(stuck), p: getComputedStyle(s).getPropertyValue("--p").trim() };
  });
  console.log(`  ${(f*100).toFixed(0).padStart(3)}%  step=${st.step} panel=${st.panel} visible=${st.visiblePanels} stageTop=${st.stageTop} --p=${st.p}`);
  await p.screenshot({ path: `lab/site/story-${Math.round(f*100)}.png` });
}
await b.close();
