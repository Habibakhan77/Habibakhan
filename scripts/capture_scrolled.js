const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\screenshots';

try {
  require('./server.js');
} catch (e) {}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // scroll back to top
          resolve();
        }
      }, 100);
    });
  });
  await wait(1500); // wait for lazy images to finish rendering
}

async function captureScrolled() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to local home...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await wait(1000);

  console.log('Scrolling page to trigger all IntersectionObservers...');
  await scrollPage(page);

  console.log('Capturing local_home_scrolled_full.png...');
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'local_home_scrolled_full.png'),
    fullPage: true
  });

  // Also capture individual section screenshots!
  // Hero section
  const hero = await page.$('section.bg-band');
  if (hero) {
    await hero.screenshot({ path: path.join(SCREENSHOT_DIR, 'section_hero.png') });
  }

  // Brands banner
  const brands = await page.$('div.border-y');
  if (brands) {
    await brands.screenshot({ path: path.join(SCREENSHOT_DIR, 'section_brands.png') });
  }

  // Categories section
  const categories = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(el => el.textContent.includes('Shop by Category'));
    return h ? h.closest('section') : null;
  });
  if (categories && categories.asElement()) {
    await categories.asElement().screenshot({ path: path.join(SCREENSHOT_DIR, 'section_categories.png') });
  }

  // Popular products section
  const popular = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h = headings.find(el => el.textContent.includes('Popular Products'));
    return h ? h.closest('section') : null;
  });
  if (popular && popular.asElement()) {
    await popular.asElement().screenshot({ path: path.join(SCREENSHOT_DIR, 'section_popular.png') });
  }

  // Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: path.join(SCREENSHOT_DIR, 'section_footer.png') });
  }

  await browser.close();
  console.log('All scrolled captures finished successfully!');
  process.exit(0);
}

setTimeout(captureScrolled, 1000);
