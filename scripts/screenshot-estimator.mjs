import { chromium } from "playwright";

const browser = await chromium.launch();
const errors = [];

async function shoot(name, viewport, run) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`[${name}] ${e.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${name}] console: ${msg.text()}`);
  });
  await run(page, name);
  await ctx.close();
}

await shoot("01-step1-desktop", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/${name}.png`, fullPage: false });
});

await shoot("02-step1-mobile", { width: 375, height: 720 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/${name}.png`, fullPage: true });
});

await shoot("03-junk-prefill", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=junk", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/${name}.png` });
});

await shoot("04-junk-flow", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=junk", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  // Step 2: hauling toggle
  await page.getByRole("button", { name: /Inside home or yard/ }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: /^Continue$/ }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/${name}-step3.png` });
  // Step 3: location
  await page.getByRole("button", { name: /Phone \/ Text/ }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: /^Continue$/ }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/${name}-step4-blurred.png` });
  // Step 4: email gate — try invalid first
  await page.getByPlaceholder("you@example.com").fill("notanemail");
  await page.getByRole("button", { name: /Reveal my estimate/ }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/${name}-step4-error.png` });
  // Now valid
  await page.getByPlaceholder("you@example.com").fill("test@test.com");
  await page.getByRole("button", { name: /Reveal my estimate/ }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/${name}-step5.png` });
});

await shoot("05-single-items", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=single-items", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /Increase Sofa \/ Couch/ }).click();
  await page.getByRole("button", { name: /Increase Sofa \/ Couch/ }).click();
  // Open specialty group, add hot tub
  await page.getByRole("button", { name: /^Electronics & Specialty/ }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: /^Add$/ }).first().click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `/tmp/${name}-with-contact.png`, fullPage: true });
});

await shoot("06-light-demo", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=light-demo", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/${name}.png` });
});

await shoot("07-snow", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=snow", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/${name}.png` });
  await page.getByRole("button", { name: /Commercial \/ Large Property/ }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `/tmp/${name}-commercial.png` });
});

await shoot("08-gutters", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=gutters", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /Large \/ Custom Home/ }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `/tmp/${name}-large.png` });
});

await shoot("09-mobile-step5", { width: 375, height: 720 }, async (page, name) => {
  await page.goto("http://localhost:3000/estimate?service=gutters", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /^Continue$/ }).click();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: /^Continue$/ }).click();
  await page.waitForTimeout(400);
  await page.getByPlaceholder("you@example.com").fill("test@test.com");
  await page.getByRole("button", { name: /Reveal my estimate/ }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/${name}.png`, fullPage: true });
});

await shoot("10-home-hero", { width: 1440, height: 900 }, async (page, name) => {
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/${name}.png` });
});

await browser.close();

if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log(" -", e));
  process.exit(1);
}
console.log("ok");
