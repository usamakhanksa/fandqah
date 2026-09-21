import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:4500", { waitUntil: "load" });
await p.waitForTimeout(1200);
for (const vh of [2.5, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0]) {
  await p.evaluate(v => {
    const el = document.querySelector("#audit");
    window.scrollTo({top: el.getBoundingClientRect().top + scrollY + innerHeight * v, behavior:'instant'});
  }, vh);
  await p.waitForTimeout(650);
  const s = await p.evaluate(() => {
    const rows = [...document.querySelectorAll(".fd-led")];
    const st = document.querySelector("#audit [data-sc-stage]").getBoundingClientRect();
    return {
      clock: document.getElementById("dialTime").textContent,
      posted: rows.filter(r => r.dataset.posted === "1").length + "/7",
      totalLabel: rows[rows.length-1].firstChild.textContent,
      seal: document.getElementById("auditSeal").dataset.on,
      date: document.getElementById("auditDate").textContent || "-",
      stageTop: Math.round(st.top)
    };
  });
  console.log(`+${vh}vh`, JSON.stringify(s));
}
await b.close();
