import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

// Pull every gradient orange element on local
const orange = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll("*")).filter((el) => {
    const cls = (el.className || "").toString();
    return /from-brand|from-\[#E97524\]/.test(cls);
  });
  const seen = new Set();
  const out = [];
  for (const el of els) {
    const key = (el.className || "").toString().slice(0, 100);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      tag: el.tagName.toLowerCase(),
      classes: ((el.className || "").toString()).slice(0, 220),
      text: (el.textContent || "").slice(0, 30),
      shadow: getComputedStyle(el).boxShadow,
    });
  }
  return out;
});
console.log(JSON.stringify(orange, null, 2));

await browser.close();
