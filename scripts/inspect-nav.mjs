import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto("https://libertyhomeservices.ca/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

const navHTML = await page.evaluate(() => {
  const header = document.querySelector("header") || document.querySelector("nav");
  return header ? header.outerHTML : "(no header found)";
});
console.log("=== NAV HTML ===");
console.log(navHTML.slice(0, 4000));

const favicon = await page.evaluate(() => {
  const link = document.querySelector('link[rel*="icon"]');
  return link ? link.outerHTML : "(none)";
});
console.log("\n=== FAVICON ===");
console.log(favicon);

await page.screenshot({ path: "/tmp/live-nav.png", clip: { x: 0, y: 0, width: 1440, height: 120 } });
console.log("\nsaved /tmp/live-nav.png");

await browser.close();
