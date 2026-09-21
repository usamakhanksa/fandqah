/* Structural accessibility sweep across all 16 pages: heading order,
   landmark and label coverage, duplicate ids, focus visibility, and
   touch target size on a phone viewport. Contrast is measured
   separately by contrast.mjs. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const PAGES = ["index.html", "features.html", "pricing.html", "about.html",
               "blog.html", "contact.html", "privacy.html", "terms.html"];
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let problems = 0;

for (const lang of ["", "en/"]) {
  for (const pg of PAGES) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${B}/${lang}${pg}`, { waitUntil: "load" });

    const m = await page.evaluate(() => {
      const out = { skips: [], dupIds: [], noLabel: [], noName: [], landmarks: {}, langOk: true };
      /* heading order: no level may jump by more than one */
      let prev = 0;
      document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
        const l = +h.tagName[1];
        if (prev && l > prev + 1) out.skips.push(`h${prev}->h${l}: ${h.textContent.trim().slice(0, 34)}`);
        prev = l;
      });
      /* duplicate ids break label association and anchors */
      const seen = new Set();
      document.querySelectorAll("[id]").forEach(e => {
        if (seen.has(e.id)) out.dupIds.push(e.id); else seen.add(e.id);
      });
      /* every control needs an accessible name */
      document.querySelectorAll("input,select,textarea").forEach(f => {
        if (f.type === "hidden") return;
        const has = f.labels?.length || f.getAttribute("aria-label") ||
                    f.getAttribute("aria-labelledby") || f.closest("[aria-hidden='true']");
        if (!has) out.noLabel.push(f.name || f.id || f.type);
      });
      document.querySelectorAll("a,button").forEach(e => {
        const t = (e.innerText || "").trim() || e.getAttribute("aria-label") ||
                  e.querySelector("img")?.alt || e.getAttribute("title");
        if (!t) out.noName.push(e.tagName + "." + (e.className || "").split(" ")[0]);
      });
      out.landmarks = {
        header: document.querySelectorAll("header").length,
        nav:    document.querySelectorAll("nav").length,
        main:   document.querySelectorAll("main").length,
        footer: document.querySelectorAll("footer").length
      };
      out.langOk = !!document.documentElement.lang;
      return out;
    });

    const flags = [];
    if (m.skips.length)   flags.push(m.skips.length + " heading jump(s): " + m.skips[0]);
    if (m.dupIds.length)  flags.push("duplicate id: " + [...new Set(m.dupIds)].join(","));
    if (m.noLabel.length) flags.push("unlabelled field: " + m.noLabel.join(","));
    if (m.noName.length)  flags.push("unnamed control: " + [...new Set(m.noName)].join(","));
    if (m.landmarks.main !== 1) flags.push("main=" + m.landmarks.main);
    if (!m.langOk) flags.push("no lang");
    if (flags.length) problems++;
    console.log(`${(lang + pg).padEnd(22)} ${flags.length ? "FAIL " + flags.join(" | ") : "ok"}`);
    await ctx.close();
  }
}

/* focus must be visible, and phone tap targets must be reachable */
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const page = await ctx.newPage();
await page.goto(B + "/contact.html", { waitUntil: "load" });
/* Tab for real: :focus-visible does not necessarily match a
   programmatic .focus() call. */
await page.locator("#name").click();
await page.keyboard.press("Shift+Tab");
await page.keyboard.press("Tab");
const fx = await page.evaluate(() => {
  const el = document.activeElement, cs = getComputedStyle(el);
  return { on: el.id || el.tagName, w: cs.outlineWidth, style: cs.outlineStyle, shadow: cs.boxShadow !== "none" };
});
const ringOk = parseFloat(fx.w) >= 2 && fx.style !== "none";
console.log(`
focus ring (${fx.on}): outline ${fx.w} ${fx.style}, shadow ${fx.shadow}  ${ringOk ? "ok" : "FAIL"}`);
if (!ringOk) problems++;const small = await page.evaluate(() =>
  [...document.querySelectorAll("a,button,summary,input,select,textarea")]
    .filter(e => !e.closest("[aria-hidden='true']"))   /* the spam trap is not a target */
    .filter(e => { const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.height < 24 || r.width < 24); })
    .map(e => e.tagName + "." + (e.className || "").split(" ")[0] + " " +
              Math.round(e.getBoundingClientRect().width) + "x" + Math.round(e.getBoundingClientRect().height)));
console.log(small.length ? `tap targets under 24px: ${[...new Set(small)].join(", ")}` : "all tap targets >= 24px");
if (small.length) problems++;
await ctx.close();

console.log(problems ? `\n${problems} page(s)/check(s) flagged` : "\naccessibility sweep: clean");
await b.close();
