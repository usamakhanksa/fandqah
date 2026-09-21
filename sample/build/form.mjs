/* Exercises the lead form: field validation, the spam trap, the busy
   state and both result branches. The endpoint is stubbed by route
   interception so the test never posts to the live site. */
import { chromium } from "playwright-core";
const B = "http://localhost:4700";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let fail = 0;
const ok = (c, m) => { console.log((c ? "  ok    " : "  FAIL  ") + m); if (!c) fail++; };

for (const [lang, url] of [["ar", "/contact.html"], ["en", "/en/contact.html"]]) {
  console.log("\nlead form (" + lang + ")");
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(B + url, { waitUntil: "load" });

  // 1. empty submit must block and mark the required fields
  await page.click('#lead button[type="submit"]');
  await page.waitForTimeout(150);
  ok(await page.locator('#lead [aria-invalid="true"]').count() >= 2, "empty submit flags required fields");
  ok(await page.locator("#lead .field__err").count() >= 2, "error messages rendered");
  ok(await page.evaluate(() => document.activeElement.id) === "name", "focus moves to first bad field");

  // 2. a bad email is caught
  await page.fill("#name", "Test Operator");
  await page.fill("#email", "not-an-email");
  await page.click('#lead button[type="submit"]');
  await page.waitForTimeout(150);
  ok(await page.locator('#email[aria-invalid="true"]').count() === 1, "invalid email rejected");

  // 3. correcting it clears the error live
  await page.fill("#email", "ops@example.com");
  await page.waitForTimeout(120);
  ok(await page.locator('#email[aria-invalid="true"]').count() === 0, "error clears once corrected");

  // 4. the honeypot is hidden from sight and from the a11y tree
  /* isVisible() is true for a 1px clipped box, so measure what actually
     matters: the trap occupies no perceivable area and is fully clipped. */
  const trap = await page.evaluate(() => {
    const w = document.querySelector(".hp");
    const r = w.getBoundingClientRect();
    return { w: r.width, h: r.height, clip: getComputedStyle(w).clipPath,
             tab: document.querySelector('[name="company_url"]').tabIndex };
  });
  ok(trap.w <= 1 && trap.h <= 1 && trap.clip !== "none", "spam trap occupies no visible area");
  ok(trap.tab === -1, "spam trap is not reachable by Tab");
  ok(await page.evaluate(() => document.querySelector(".hp").getAttribute("aria-hidden")) === "true",
     "spam trap hidden from the a11y tree");

  // 5. success branch
  await page.route("**/store/contact_us", r => r.fulfill({ status: 200, body: "ok" }));
  await page.click('#lead button[type="submit"]');
  await page.waitForTimeout(400);
  const good = await page.locator("#lead-status").getAttribute("class");
  ok(/form__status--ok/.test(good || ""), "success state shown");
  ok(await page.inputValue("#name") === "", "form reset after success");
  ok(await page.evaluate(() => document.querySelector('#lead button[type="submit"]').disabled) === false,
     "button re-enabled after success");

  // 6. failure branch falls back to the phone route
  await page.fill("#name", "Test Operator");
  await page.fill("#email", "ops@example.com");
  await page.route("**/store/contact_us", r => r.fulfill({ status: 500, body: "no" }));
  await page.click('#lead button[type="submit"]');
  await page.waitForTimeout(400);
  const bad = await page.locator("#lead-status").getAttribute("class");
  ok(/form__status--bad/.test(bad || ""), "failure state shown");
  ok(/920066456/.test(await page.locator("#lead-status").textContent()), "failure names the phone fallback");

  await ctx.close();
}
console.log(fail ? `\n${fail} form check(s) failed` : "\nlead form: all checks pass");
await b.close();
process.exit(fail ? 1 : 0);
