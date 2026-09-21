/* The blog archive is the only page with real client-side behaviour beyond a
   form. This proves the filter, the search, the pager and the no-JS fallback. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok    " : "  FAIL  ") + m); if (!c) fail++; };
const visible = p => p.evaluate(() => [...document.querySelectorAll(".post")].filter(e => !e.hidden).length);

for (const [lang, url, term] of [["ar", "/blog.html", "زاتكا"], ["en", "/en/blog.html", "revenue"]]) {
  console.log("\nblog archive (" + lang + ")");
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(B + url, { waitUntil: "load" });
  await page.waitForTimeout(300);

  const total = await page.evaluate(() => document.querySelectorAll(".post").length);
  ok(total > 150, `${total} posts rendered server side`);
  ok(await visible(page) === 24, "first page shows 24");
  ok(await page.locator("#arc-more").isVisible(), "show-more is offered");

  /* every card links somewhere real */
  /* the English archive lives under /en/blogs/, the Arabic one under /blogs/ */
  const bad = await page.evaluate(() =>
    [...document.querySelectorAll(".post a")]
      .filter(a => !/^https?:\/\/fandaqah\.com\/(en\/)?blogs\//.test(a.href)).length);
  ok(bad === 0, "every card links to a real fandaqah.com post");

  /* pager */
  await page.click("#arc-more");
  await page.waitForTimeout(200);
  ok(await visible(page) === 48, "show-more reveals the next 24");

  /* topic filter */
  const chip = page.locator('.chipf[data-cat="compliance"]');
  const declared = parseInt((await chip.locator("b").textContent()).trim(), 10);
  await chip.click();
  await page.waitForTimeout(200);
  const shown = await visible(page);
  ok(shown === Math.min(declared, 24) || shown === declared - 1 || shown === Math.min(declared - 1, 24),
     `compliance filter shows ${shown} of a declared ${declared} (the featured post is lifted out of the grid)`);
  ok(await page.evaluate(() => [...document.querySelectorAll(".post")].filter(e => !e.hidden)
       .every(e => e.dataset.cat === "compliance")), "filtered set is all one topic");
  ok((await page.locator("#arc-count").textContent()).trim().length > 0, "result count is announced");

  /* search, combined with the reset chip */
  await page.click('.chipf[data-cat="all"]');
  await page.fill("#q", term);
  await page.waitForTimeout(350);
  const hits = await visible(page);
  ok(hits > 0, `search "${term}" returns ${hits}`);
  ok(await page.evaluate(t => [...document.querySelectorAll(".post")].filter(e => !e.hidden)
       .every(e => e.dataset.t.includes(t)), term.toLowerCase()), "every result contains the term");

  /* empty state */
  await page.fill("#q", "zzzqqq");
  await page.waitForTimeout(350);
  ok(await visible(page) === 0 && await page.locator("#arc-empty").isVisible(), "empty state shown for no matches");
  await ctx.close();
}

/* no JS: the whole archive must still be present and linked */
console.log("\njavascript disabled");
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
const page = await ctx.newPage();
await page.goto(B + "/blog.html", { waitUntil: "load" });
const all = await page.evaluate(() => [...document.querySelectorAll(".post")].filter(e => !e.hidden).length);
ok(all > 150, `${all} posts visible with scripts off`);
ok(!(await page.locator("#arc-more").isVisible()), "the pager is hidden rather than dead");
await ctx.close();

console.log(fail ? `\n${fail} blog check(s) failed` : "\nblog archive: all checks pass");
await b.close();
process.exit(fail ? 1 : 0);
