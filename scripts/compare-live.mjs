import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto("https://libertyhomeservices.ca/Portfolio", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 600) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(150);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/live-portfolio.png", fullPage: true });
console.log("saved /tmp/live-portfolio.png");

await page.goto("https://libertyhomeservices.ca/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);
const h2 = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h2; y += 600) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(150);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/live-home.png", fullPage: true });
console.log("saved /tmp/live-home.png");

await browser.close();
