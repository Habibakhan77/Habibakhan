const puppeteer = require('puppeteer-core');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Path to Chrome
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Start local server
require('./server.js');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const pagesToCapture = [
    { name: 'home', path: '/' },
    { name: 'products', path: '/products' },
    { name: 'product_detail', path: '/products/ronin-mist-pro-r7125' },
    { name: 'brand', path: '/brands/ronin' },
    { name: 'contact', path: '/contact' },
    { name: 'about', path: '/about' }
  ];

  const page = await browser.newPage();

  // 1. Capture Original Desktop & Mobile
  console.log('\n--- Capturing Original Website ---');
  for (const item of pagesToCapture) {
    const url = 'https://www.ajwagadgets.com' + item.path;
    try {
      console.log(`Navigating to original ${item.name} (${url})...`);
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await wait(1500);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `orig_${item.name}_desktop.png`),
        fullPage: false
      });
      console.log(`Saved orig_${item.name}_desktop.png`);

      if (item.name === 'home') {
        // Also mobile
        await page.setViewport({ width: 390, height: 844, isMobile: true });
        await wait(500);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `orig_${item.name}_mobile.png`),
          fullPage: false
        });
        console.log(`Saved orig_${item.name}_mobile.png`);
      }
    } catch (e) {
      console.error(`Failed capturing original ${item.name}:`, e.message);
    }
  }

  // 2. Capture Local Desktop & Mobile
  console.log('\n--- Capturing Local Website ---');
  for (const item of pagesToCapture) {
    const url = 'http://127.0.0.1:5173' + item.path;
    try {
      console.log(`Navigating to local ${item.name} (${url})...`);
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      await wait(1500);
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `local_${item.name}_desktop.png`),
        fullPage: false
      });
      console.log(`Saved local_${item.name}_desktop.png`);

      if (item.name === 'home') {
        // Also mobile
        await page.setViewport({ width: 390, height: 844, isMobile: true });
        await wait(500);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `local_${item.name}_mobile.png`),
          fullPage: false
        });
        console.log(`Saved local_${item.name}_mobile.png`);
      }
    } catch (e) {
      console.error(`Failed capturing local ${item.name}:`, e.message);
    }
  }

  await browser.close();
  console.log('\nAll screenshots captured successfully!');
  process.exit(0);
}

// Give server time to bind
setTimeout(capture, 1000);
