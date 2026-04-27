import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto("https://libertyhomeservices.ca/Portfolio", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);

const card = await page.$('div.cursor-pointer');
await card.click();
await page.waitForTimeout(2000);

// Try to find the draggable slider handle
const sliderInfo = await page.evaluate(() => {
  // Look for elements that might be the slider handle
  const candidates = Array.from(document.querySelectorAll('div, button')).filter((el) => {
    const cls = el.className || "";
    if (typeof cls !== "string") return false;
    return /slider|handle|divider|drag/i.test(cls) || /cursor-(ew|col)-resize/.test(cls);
  });
  return candidates.map((el) => ({
    tag: el.tagName.toLowerCase(),
    class: el.className,
    style: el.getAttribute("style"),
    html: el.outerHTML.slice(0, 500),
  }));
});
console.log("=== slider candidates ===");
console.log(JSON.stringify(sliderInfo, null, 2));

// Capture the full modal area HTML
const fullModal = await page.evaluate(() => {
  const modal = document.querySelector(".fixed.inset-0");
  return modal ? modal.outerHTML : "(none)";
});
console.log("\n=== FULL MODAL HTML ===");
console.log(fullModal);

// Try to drag with mouse
const box = await page.locator(".fixed.inset-0").first().boundingBox();
console.log("\nmodal box:", box);

await page.screenshot({ path: "/tmp/live-modal-detail.png", fullPage: false });
await browser.close();
