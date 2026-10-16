const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');
const base = process.argv[2] || 'http://127.0.0.1:8765';
const output = path.join(__dirname, '..', '.verification');
fs.mkdirSync(output, {recursive:true});
(async () => {
  const browser = await chromium.launch({executablePath:process.env.PORTFOLIO_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [], failedLocal = [], checks = [];
  const check = (name, value) => { assert.ok(value, name); checks.push(name); };
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if(r.url().startsWith(base) && r.status() >= 400) failedLocal.push(`${r.status()} ${r.url()}`); });
  try {
    await page.goto(base, {waitUntil:'networkidle'});
    await page.emulateMedia({reducedMotion:'reduce'});
    check('Seven project entries', await page.locator('article').count() === 7);
    check('One featured project', await page.locator('.featured').count() === 1);
    check('Original nebubu video retained', await page.locator('#nebubu-film source').getAttribute('src') === 'assets/nebubu-promo.mp4');
    for(const [filter,number] of [['tools',3],['play',3],['dev',1],['all',7]]) {
      await page.locator(`[data-filter="${filter}"]`).click();
      check(`Filter ${filter}: ${number} entries`, await page.locator('article').count() === number);
      check(`Filter ${filter}: pressed state`, await page.locator(`[data-filter="${filter}"]`).getAttribute('aria-pressed') === 'true');
    }
    for(const selector of ['[data-play="city-runner"]','#nebubu-film']) {
      if(selector.includes('data-play')) await page.locator(selector).click();
      else await page.locator(selector).evaluate(v=>v.play());
      const video = selector.includes('data-play') ? page.locator('#media-city-runner video') : page.locator(selector);
      await video.evaluate(v => new Promise((resolve,reject)=>{if(v.readyState>=2)return resolve();v.addEventListener('loadeddata',resolve,{once:true});v.addEventListener('error',reject,{once:true});}));
      check(`Video plays: ${selector}`, await video.evaluate(v=>!v.paused && v.duration>0));
    }
    check('Starting nebubu pauses City Runner', await page.locator('#media-city-runner video').evaluate(v=>v.paused));
    await page.locator('[data-play="lifesimu"]').click();
    const film = page.frameLocator('#film-lifesimu iframe');
    await film.locator('#start').waitFor({state:'visible'});
    await film.locator('#start').click();
    await page.waitForTimeout(1200);
    check('LifeSimu film starts and advances', await film.locator('#seek').inputValue() > 0);
    check('LifeSimu uses bundled artwork', await film.locator('.error').isHidden());
    check('Starting LifeSimu pauses nebubu', await page.locator('#nebubu-film').evaluate(v=>v.paused));
    await page.locator('.film-close').click();
    check('Film closes and unloads', await page.locator('#film-lifesimu').count() === 0);
    check('Film returns focus to trigger', await page.locator('[data-play="lifesimu"]').evaluate(b=>b===document.activeElement));
    await page.goto(base + '/diary/',{waitUntil:'networkidle'});
    check('Diary route preserved', (await page.title()).includes('Diary'));
    await page.locator('a[href="../"]').first().click();
    check('Diary can return to portfolio', (await page.title()).startsWith('gnar127'));
    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      // Load all lazy project images before the visual capture.
      await page.locator('img[loading="lazy"]').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
      await page.waitForFunction(()=>[...document.images].every(i=>i.complete && i.naturalWidth>0));
      check(`No horizontal overflow at ${width}px`, await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      check(`Images load at ${width}px`, await page.evaluate(()=>[...document.images].every(i=>i.naturalWidth>0)));
      if(width===390 || width===1440) await page.screenshot({path:path.join(output,`${width===390?'mobile':'desktop'}.png`),fullPage:true});
    }
    check('No empty project destination links', await page.locator('.project-actions a[href="#"], .project-actions a:not([href])').count() === 0);
    check('No local HTTP errors', failedLocal.length===0);
    check('No browser runtime errors', errors.length===0);
    const report = {checks:checks.length,passed:checks,errors,failedLocal};
    fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
