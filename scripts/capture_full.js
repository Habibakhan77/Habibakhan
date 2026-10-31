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

async function captureFull() {
  console.log('Capturing full page screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Local Full Page Desktop
  console.log('Capturing local full desktop...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await wait(2000);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'local_home_full_desktop.png'),
    fullPage: true
  });

  // 2. Local Full Page Mobile
  console.log('Capturing local full mobile...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await wait(1000);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'local_home_full_mobile.png'),
    fullPage: true
  });

  // 3. Original Full Page Desktop
  console.log('Capturing original full desktop...');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('https://www.ajwagadgets.com/', { waitUntil: 'networkidle0' });
  await wait(2000);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'orig_home_full_desktop.png'),
    fullPage: true
  });

  // 4. Original Full Page Mobile
  console.log('Capturing original full mobile...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await wait(1000);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'orig_home_full_mobile.png'),
    fullPage: true
  });

  await browser.close();
  console.log('Full page captures complete!');
  process.exit(0);
}

setTimeout(captureFull, 1000);
