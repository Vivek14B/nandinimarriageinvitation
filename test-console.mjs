import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture all console messages
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  // Capture all network requests to scripts
  const scripts = [];
  page.on('response', response => {
    if (response.request().resourceType() === 'script') {
      scripts.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  try {
    console.log('Loading http://localhost:3000...\n');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for React to mount
    await page.waitForTimeout(2000);
    
    // Simulate clicking to open envelope
    console.log('\n--- Clicking envelope to trigger music play ---\n');
    const envelopeButton = await page.$('button');
    if (envelopeButton) {
      await envelopeButton.click();
      await page.waitForTimeout(1500);
    }
    
    // Inspect the DOM for audio element
    const audioElements = await page.locator('audio').all();
    console.log(`\n--- Found ${audioElements.length} audio element(s) ---`);
    for (const audio of audioElements) {
      const src = await audio.getAttribute('src');
      const sources = await page.locator('audio source').all();
      console.log('Audio element attributes:');
      console.log('  src:', src);
      for (const source of sources) {
        const srcAttr = await source.getAttribute('src');
        const type = await source.getAttribute('type');
        console.log(`  <source src="${srcAttr}" type="${type}">`);
      }
    }

    // Look for instrument script
    console.log('\n--- Scripts loaded ---');
    const uniqueScripts = [...new Map(scripts.map(s => [s.url, s])).values()];
    uniqueScripts.forEach(script => {
      if (script.url.includes('instrument') || script.url.includes('vercel') || script.url.includes('analytics')) {
        console.log(`✓ [IMPORTANT] ${script.url}`);
      } else {
        console.log(`  ${script.url}`);
      }
    });

    // Check for zustand in scripts
    console.log('\n--- Checking for zustand in page source ---');
    const pageContent = await page.content();
    if (pageContent.includes('zustand')) {
      const matches = pageContent.match(/zustand[^"']*/g);
      console.log('✓ Found zustand references:', matches);
    } else {
      console.log('No zustand found in page content');
    }

    console.log('\n--- Console logs captured ---');
    if (consoleLogs.length > 0) {
      consoleLogs.forEach(log => {
        if (log.text.includes('DEPRECATED') || log.text.includes('default export') || log.text.includes('Error') || log.text.includes('Failed')) {
          console.log(`✓ [IMPORTANT] [${log.type}] ${log.text}`);
        }
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
