const puppeteer = require('puppeteer');

const readlineSync = require('readline-sync');

var args = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  //page.on('console', consoleObj => console.log(consoleObj.text()));

  await page.goto('https://www2.correios.com.br/sistemas/rastreamento/default.cfm');
  //await page.screenshot({path: 'example.png'});

  const cod = args[0] || readlineSync.question('Digite o código de rastreio: ');//'OJ886414423BR'
  await page.type('#objetos', cod);
  await page.click('#btnPesq');

  await page.waitForSelector('.sroLbEvent');
  
  //await page.waitFor(2000);

  const data = await page.evaluate(() => {
    const dates = document.querySelectorAll('.sroDtEvent')
    const events = document.querySelectorAll('.sroLbEvent')
    
    //const eventsArray = Array.from(events, e => e.textContent);
    
    //console.log(arr);
    
    return [
      Array.from(dates, e => e.textContent.replace(/\s+/g,' ').trim()),
      Array.from(events, e => e.textContent.replace(/\s+/g,' ').trim())
    ];
  });

  
  
  for(i = 0; i < data[0].length; i++) {
    console.log(`${data[0][i]} - ${data[1][i]}\n`);
  }
  
  await browser.close();
})();