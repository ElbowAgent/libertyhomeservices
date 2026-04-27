import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1) "Recent Projects" pill on portfolio page
await page.goto("http://localhost:3000/portfolio", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/portfolio-hero.png", clip: { x: 0, y: 0, width: 1440, height: 500 } });
console.log("portfolio hero saved");

// 2) Modal with merged labels and bolder slider
await page.locator("button.group").first().click();
await page.waitForTimeout(2400);
await page.screenshot({ path: "/tmp/modal-final.png" });
const box = await page.locator("[class*='cursor-ew-resize']").first().boundingBox();
if (box) {
  await page.screenshot({
    path: "/tmp/slider-zoom.png",
    clip: { x: Math.max(0, box.x - 80), y: box.y, width: 200, height: box.height },
  });
}
console.log("modal saved");

await browser.close();
