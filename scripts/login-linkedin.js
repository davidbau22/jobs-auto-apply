const path = require('node:path');
const { chromium } = require('playwright');
const config = require('../config');
(async () => {
  const context = await chromium.launchPersistentContext(
    path.join(config.paths.browserProfile, 'default-session'),
    { headless: false, viewport: config.browser.viewport }
  );
  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });
    console.log('Inicia sesión manualmente y completa la verificación en el navegador.');
    console.log('Cuando hayas terminado, cierra la ventana. La sesión quedará guardada localmente.');
    console.log('Este comando no busca empleos ni envía postulaciones.');
    await new Promise(resolve => context.once('close', resolve));
  } finally { await context.close().catch(() => {}); }
})().catch(err => { console.error(err.message); process.exitCode = 1; });
