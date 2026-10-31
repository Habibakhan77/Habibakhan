const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\screenshots';

try {
  require('./server.js');
} catch (e) {}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testInteractions() {
  console.log('Testing interactive features...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Test Urdu language toggle
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await wait(1000);

  const urduBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('اردو'));
  });

  if (urduBtn && urduBtn.asElement()) {
    console.log('Clicking Urdu language button...');
    await urduBtn.asElement().click();
    await wait(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'local_home_urdu.png')
    });
    console.log('Saved local_home_urdu.png');
  }

  // 2. Test Search on Products page
  await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle0' });
  await wait(1000);

  const searchInput = await page.$('input[placeholder*="Search"]');
  if (searchInput) {
    console.log('Typing "Powerbank" into search...');
    await searchInput.type('Powerbank');
    await wait(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'local_products_search.png')
    });
    console.log('Saved local_products_search.png');
  }

  // 3. Test Category filtering
  await page.goto('http://127.0.0.1:5173/products', { waitUntil: 'networkidle0' });
  await wait(1000);

  const earbudsBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Wireless Earbuds'));
  });
  if (earbudsBtn && earbudsBtn.asElement()) {
    console.log('Clicking Wireless Earbuds category...');
    await earbudsBtn.asElement().click();
    await wait(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'local_products_category_filtered.png')
    });
    console.log('Saved local_products_category_filtered.png');
  }

  await browser.close();
  console.log('Interaction testing complete!');
  process.exit(0);
}

setTimeout(testInteractions, 1000);
