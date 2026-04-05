import { chromium, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const screenshotsDir = path.join(process.cwd(), 'tests', 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

interface ComparisonResult {
  section: string;
  prototype: string;
  current: string;
  differences: string[];
}

async function capturePrototype(page: Page): Promise<void> {
  console.log('📸 Capturing prototype...');

  // Serve prototype locally
  const prototypePath = path.join(process.cwd(), 'prototype', 'prototype.html');
  await page.goto(`file://${prototypePath}`);
  await page.waitForLoadState('networkidle');

  // Full page screenshot
  await page.screenshot({
    path: path.join(screenshotsDir, 'prototype-full.png'),
    fullPage: true,
  });

  // Header section
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(screenshotsDir, 'prototype-header.png') });
  }

  // Address bar
  const addressBar = await page.$('.address-bar');
  if (addressBar) {
    await addressBar.screenshot({ path: path.join(screenshotsDir, 'prototype-address-bar.png') });
  }

  // Navigation
  const nav = await page.$('nav');
  if (nav) {
    await nav.screenshot({ path: path.join(screenshotsDir, 'prototype-nav.png') });
  }

  // Alert box
  const alertBox = await page.$('.alert-box');
  if (alertBox) {
    await alertBox.screenshot({ path: path.join(screenshotsDir, 'prototype-alert.png') });
  }

  // Article content
  const article = await page.$('article');
  if (article) {
    await article.screenshot({ path: path.join(screenshotsDir, 'prototype-article.png') });
  }

  // Sidebar
  const sidebar = await page.$('aside');
  if (sidebar) {
    await sidebar.screenshot({ path: path.join(screenshotsDir, 'prototype-sidebar.png') });
  }

  // Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: path.join(screenshotsDir, 'prototype-footer.png') });
  }
}

async function captureCurrentSite(page: Page): Promise<void> {
  console.log('📸 Capturing current site...');

  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');

  // Wait for content to render
  await page.waitForTimeout(2000);

  // Full page screenshot
  await page.screenshot({
    path: path.join(screenshotsDir, 'current-full.png'),
    fullPage: true,
  });

  // Header section
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(screenshotsDir, 'current-header.png') });
  }

  // Address bar
  const addressBar = await page.$('.address-bar');
  if (addressBar) {
    await addressBar.screenshot({ path: path.join(screenshotsDir, 'current-address-bar.png') });
  }

  // Navigation
  const nav = await page.$('nav');
  if (nav) {
    await nav.screenshot({ path: path.join(screenshotsDir, 'current-nav.png') });
  }

  // Alert box
  const alertBox = await page.$('.alert-box');
  if (alertBox) {
    await alertBox.screenshot({ path: path.join(screenshotsDir, 'current-alert.png') });
  }

  // Article content
  const article = await page.$('article');
  if (article) {
    await article.screenshot({ path: path.join(screenshotsDir, 'current-article.png') });
  }

  // Sidebar
  const sidebar = await page.$('aside');
  if (sidebar) {
    await sidebar.screenshot({ path: path.join(screenshotsDir, 'current-sidebar.png') });
  }

  // Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: path.join(screenshotsDir, 'current-footer.png') });
  }
}

async function analyzeDifferences(page: Page): Promise<ComparisonResult[]> {
  const results: ComparisonResult[] = [];

  // Header comparison
  console.log('🔍 Analyzing header...');
  results.push({
    section: 'Header',
    prototype:
      'Full-width background image of church building with gradient overlay, white text "Church of Saint Stephen-in-the-Fields", 8px solid gold accent border at bottom',
    current: await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return 'Header not found';
      const computed = window.getComputedStyle(header);
      const h1 = header.querySelector('h1');
      const img = header.querySelector('img');
      return `${computed.backgroundImage !== 'none' ? 'Has background image' : 'No background image'}, ${img ? 'Has header image element' : 'No header image element'}, H1 text: "${h1?.textContent?.trim() || 'none'}"`;
    }),
    differences: [],
  });

  // Address bar comparison
  console.log('🔍 Analyzing address bar...');
  results.push({
    section: 'Address Bar',
    prototype:
      'Dark background (#2b2500), contains: "Saint Stephen-in-the-Fields | 103 Bellevue Ave, Toronto, ON M5T 2N8 | Anglican Diocese of Toronto (yellow link)"',
    current: await page.evaluate(() => {
      const bar = document.querySelector('.address-bar');
      if (!bar) return 'Address bar not found';
      const computed = window.getComputedStyle(bar);
      return `Background: ${computed.backgroundColor}, Content: "${bar.textContent?.trim() || 'none'}"`;
    }),
    differences: [],
  });

  // Navigation comparison
  console.log('🔍 Analyzing navigation...');
  results.push({
    section: 'Navigation',
    prototype:
      'Horizontal menu: Home (active, gold bg), Contact, Worship, Outreach, Arts, History. No dropdowns in prototype.',
    current: await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return 'Navigation not found';
      const items = Array.from(nav.querySelectorAll('a'))
        .map((a) => a.textContent?.trim())
        .filter(Boolean);
      const hasDropdowns = nav.querySelectorAll('ul ul').length > 0;
      const activeItem = nav.querySelector('.active, [aria-current="page"]');
      return `Items: ${items.join(', ')}, Has dropdowns: ${hasDropdowns}, Active: "${activeItem?.textContent?.trim() || 'none'}"`;
    }),
    differences: [],
  });

  // Layout comparison
  console.log('🔍 Analyzing layout...');
  results.push({
    section: 'Page Layout',
    prototype:
      'Two-column grid: 1fr 280px, gap 3rem, max-width 960px, outer wrapper with side borders',
    current: await page.evaluate(() => {
      const main = document.querySelector('.page-content') || document.querySelector('.container');
      if (!main) return 'Main container not found';
      const computed = window.getComputedStyle(main);
      return `Grid: ${computed.gridTemplateColumns}, Gap: ${computed.gap}, Max-width: ${computed.maxWidth}`;
    }),
    differences: [],
  });

  // Alert box comparison
  console.log('🔍 Analyzing alert box...');
  results.push({
    section: 'Alert Box',
    prototype:
      'Light yellow background (#fff9e6), 4px left border gold, contains "Christmas Services" title with dates. No close button.',
    current: await page.evaluate(() => {
      const alert = document.querySelector('.alert-box');
      if (!alert) return 'No alert box rendered (may depend on CMS data)';
      const computed = window.getComputedStyle(alert);
      const closeBtn = alert.querySelector('button');
      return `Background: ${computed.backgroundColor}, Border: ${computed.border}, Has close button: ${!!closeBtn}`;
    }),
    differences: [],
  });

  // Article comparison
  console.log('🔍 Analyzing article...');
  results.push({
    section: 'Article Content',
    prototype:
      "Welcome to St. Stephen's with gold underline border, featured image floats right with text wrapping around it",
    current: await page.evaluate(() => {
      const article = document.querySelector('article');
      if (!article) return 'Article not found';
      const h2 = article.querySelector('h2');
      const img = article.querySelector('img');
      return `Title: "${h2?.textContent?.trim() || 'none'}", Has image: ${!!img}, Image float: ${img ? window.getComputedStyle(img).float : 'N/A'}`;
    }),
    differences: [],
  });

  // Sidebar comparison
  console.log('🔍 Analyzing sidebar...');
  results.push({
    section: 'Sidebar',
    prototype:
      'Widgets: Weekly Services (schedule list), Online Donations (PayPal/CanadaHelps buttons), Social Links (Facebook/YouTube/Twitter), Affirming Congregation badge',
    current: await page.evaluate(() => {
      const sidebar = document.querySelector('aside');
      if (!sidebar) return 'Sidebar not found';
      const widgets = Array.from(sidebar.querySelectorAll('section, .widget')).map((w) => {
        const h3 = w.querySelector('h3');
        return h3?.textContent?.trim() || 'unnamed widget';
      });
      return `Widgets: ${widgets.join(', ') || 'none'}`;
    }),
    differences: [],
  });

  // Footer comparison
  console.log('🔍 Analyzing footer...');
  results.push({
    section: 'Footer',
    prototype: 'Gold top border, centered copyright text, light background (#fff9e6)',
    current: await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return 'Footer not found';
      const computed = window.getComputedStyle(footer);
      return `Border-top: ${computed.borderTop}, Text-align: ${computed.textAlign}, Background: ${computed.backgroundColor}`;
    }),
    differences: [],
  });

  return results;
}

async function runComparison() {
  console.log('🎭 Starting Playwright visual comparison...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    // Capture both versions
    await capturePrototype(page);
    await captureCurrentSite(page);

    // Analyze differences
    const results = await analyzeDifferences(page);

    // Generate report
    console.log('\n📊 COMPARISON RESULTS:\n');
    console.log('='.repeat(80));

    for (const result of results) {
      console.log(`\n🔹 ${result.section.toUpperCase()}`);
      console.log('-'.repeat(80));
      console.log('PROTOTYPE:', result.prototype);
      console.log('CURRENT:', result.current);
      console.log('');
    }

    console.log('='.repeat(80));
    console.log(`\n✅ Screenshots saved to: ${screenshotsDir}`);
    console.log('\nFiles generated:');
    const files = fs.readdirSync(screenshotsDir);
    files.forEach((f) => console.log(`  - ${f}`));
  } catch (error) {
    console.error('❌ Error during comparison:', error);
  } finally {
    await browser.close();
  }
}

runComparison();
