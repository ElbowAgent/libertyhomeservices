import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const URL = "https://libertyhomeservices.ca/Portfolio";
const OUT_DIR = path.resolve("public/images/scraped");

await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

console.log(`→ Visiting ${URL}`);
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// Find all project cards (clickable tiles).
// In the snapshot they are <div class="group ... cursor-pointer"> wrapping an <img alt="...">.
const tiles = await page.$$eval("img[alt]", (imgs) =>
  imgs
    .filter((img) => {
      const alt = img.getAttribute("alt") || "";
      // Filter to project cards — they have specific titles, not the logo
      return (
        alt &&
        alt !== "Liberty Home Services" &&
        !alt.toLowerCase().includes("liberty home")
      );
    })
    .map((img) => ({
      alt: img.getAttribute("alt") || "",
      tileSrc: img.currentSrc || img.src || "",
    }))
);

console.log(`Found ${tiles.length} candidate project tiles:`, tiles.map((t) => t.alt));

const results = [];

for (let i = 0; i < tiles.length; i++) {
  const tile = tiles[i];
  console.log(`\n--- [${i + 1}/${tiles.length}] ${tile.alt} ---`);

  // Click the tile by alt text
  const clickable = await page.$(`img[alt="${tile.alt.replace(/"/g, '\\"')}"]`);
  if (!clickable) {
    console.log("  Could not relocate tile, skipping.");
    continue;
  }

  // Click parent (the card div)
  await clickable.evaluate((el) => {
    let p = el;
    while (p && p.parentElement) {
      const cls = p.className || "";
      if (typeof cls === "string" && cls.includes("cursor-pointer")) {
        p.click();
        return;
      }
      p = p.parentElement;
    }
    el.click();
  });

  await page.waitForTimeout(1500);

  // Look for images inside an open modal/dialog. The modal contains "Before" / "After" labels.
  const modalImgs = await page.$$eval("img[alt]", (imgs) =>
    imgs
      .filter((img) => (img.getAttribute("alt") || "").includes(" - "))
      .map((img) => ({
        alt: img.getAttribute("alt") || "",
        src: img.currentSrc || img.src || "",
      }))
  );

  // Also try to grab description text from any visible element near "Before"
  const description = await page
    .evaluate(() => {
      // Find elements containing the words "Before" and "After" labels
      const all = Array.from(document.querySelectorAll("p, div"));
      // Heuristic: find largest <p> on page that's likely the description
      let best = "";
      for (const el of all) {
        const txt = el.textContent || "";
        if (
          txt.length > 80 &&
          txt.length < 1500 &&
          !txt.toLowerCase().includes("locally owned and operated since")
        ) {
          if (txt.length > best.length && txt.length < 1000) best = txt;
        }
      }
      return best.trim();
    })
    .catch(() => "");

  console.log(`  modal imgs: ${modalImgs.length}`);
  for (const m of modalImgs) console.log(`    ${m.alt}`);

  results.push({
    title: tile.alt,
    tileSrc: tile.tileSrc,
    description,
    modalImgs,
  });

  // Close modal — try Escape, then look for an X button
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(500);
  // If modal still open, try clicking the close button
  const closeBtn = await page.$('button[aria-label="Close"], button:has-text("✕"), button:has-text("X")');
  if (closeBtn) await closeBtn.click().catch(() => {});
  await page.waitForTimeout(800);
}

await fs.writeFile(path.join(OUT_DIR, "portfolio.json"), JSON.stringify(results, null, 2));
console.log(`\n✓ Saved metadata to ${OUT_DIR}/portfolio.json`);

// Now download each unique image
const downloaded = new Map();
for (const r of results) {
  const all = [{ alt: r.title, src: r.tileSrc }, ...r.modalImgs];
  for (const im of all) {
    if (!im.src || downloaded.has(im.src)) continue;
    try {
      const resp = await page.context().request.get(im.src);
      const buf = await resp.body();
      const ext = (im.src.match(/\.(png|jpe?g|webp)(\?|$)/i)?.[1] || "png").toLowerCase();
      const safe = im.alt
        .replace(/&amp;/g, "and")
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()
        .replace(/^_|_$/g, "");
      const fname = `${safe}.${ext}`;
      await fs.writeFile(path.join(OUT_DIR, fname), buf);
      downloaded.set(im.src, fname);
      console.log(`  ↓ ${fname} (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.log(`  ! failed ${im.src}: ${e.message}`);
    }
  }
}

await browser.close();
console.log(`\n✓ Done. ${downloaded.size} images downloaded to ${OUT_DIR}`);
