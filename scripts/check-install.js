const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
(async () => {
  console.log(`Node: ${process.version}`);
  for (const name of Object.keys(require('../package.json').dependencies)) {
    require.resolve(name);
    console.log(`Dependency OK: ${name}`);
  }
  assert.ok(fs.existsSync(chromium.executablePath()), 'Chromium not installed');
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent('<title>Installation OK</title><h1>Browser ready</h1>');
    assert.equal(await page.title(), 'Installation OK');
    console.log('Chromium OK: launched and rendered a local page.');
  } finally { await browser.close(); }
  console.log('Installation OK. No applications sent.');
})().catch(err => { console.error(err.message); process.exitCode = 1; });
