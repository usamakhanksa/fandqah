import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const w of [1440, 1024, 960]) {
  const ctx = await b.newContext({ viewport:{width:w,height:900} });
  const p = await ctx.newPage();
  await p.goto("http://localhost:4700/index.html", {waitUntil:"load"});
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const ps=[...document.querySelectorAll(".story__panel")];
    const cont=document.querySelector(".story__panels");
    return { cont: Math.round(cont.getBoundingClientRect().height),
             panels: ps.map(el=>{
               const cs=getComputedStyle(el);
               const pad=parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom);
               const kids=[...el.children].reduce((a,c)=>a+c.getBoundingClientRect().height,0);
               const gap=parseFloat(cs.gap)||0;
               const row=cs.flexDirection==="row";
               const inner = row ? Math.max(...[...el.children].map(c=>c.getBoundingClientRect().height)) : kids+gap*(el.children.length-1);
               return Math.round(inner+pad);
             }) };
  });
  console.log(w, "container", r.cont, "needed", r.panels.join(","), "max", Math.max(...r.panels));
  await ctx.close();
}
await b.close();
