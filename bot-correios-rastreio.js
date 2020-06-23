#!/usr/bin/env node

const puppeteer = require('puppeteer');

const readlineSync = require('readline-sync');

const args = process.argv.slice(2);

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    //page.on('console', consoleObj => console.log(consoleObj.text()));

    await page.goto('https://www2.correios.com.br/sistemas/rastreamento/default.cfm', {
        waitUntil: "networkidle2"
    });


    await page.type('#objetos', askForTrackCode());
    await Promise.all([
        page.click('#btnPesq'),
        page.waitForNavigation({
            waitUntil: 'networkidle0',
        }),
    ]);

    const data = await page.evaluate(() => {
        const trackCode = document.querySelector('.codSro').textContent.replace(/\s+/g, ' ').trim();
        const dates = document.querySelectorAll('.sroDtEvent');
        const events = document.querySelectorAll('.sroLbEvent');
        const lastEvent = document.querySelector('#UltimoEvento').textContent.replace(/\s+/g, ' ').trim();
        const postDate = document.querySelector('#EventoPostagem').textContent.replace(/\s+/g, ' ').trim();
        const deliveryDate = document.querySelector('#DataEntrega').textContent.replace(/\s+/g, ' ').trim();

        const datesArray = Array.from(dates, e => e.textContent.replace(/\s+/g, ' ').trim());
        const eventsArray = Array.from(events, e => e.textContent.replace(/\s+/g, ' ').trim());

        const myData = {
            trackCode: trackCode,
            postDate: postDate,
            lastEvent: lastEvent,
            deliveryDate: deliveryDate,
            events: []
        };
        for (let i = 0; i < datesArray.length; i++) {
            const myObj = {
                datetime: datesArray[i].substr(0, 16),
                location: datesArray[i].substr(17),
                event: eventsArray[i]
            };
            myData.events.push(myObj);
        }

        return myData;
    });

    console.log(`Código: ${data.trackCode}`);
    console.log(`Data de postagem: ${data.postDate}`);
    console.log(`Último evento: ${data.lastEvent}`);
    console.log(`Data entrega/prevista: ${data.deliveryDate}`);
    console.log(`Log de Eventos`);
    console.log(`---`);
    data.events.forEach(function (item, index) {
        console.log(`${item.datetime} | ${item.location}`);
        console.log(`${item.event}`);
        console.log(`---`);
    });

    await browser.close();
})();

function askForTrackCode() {
    //'OJ886414423BR'
    //OJ722526415BR
    //PY424323695BR
    return args[0] || readlineSync.question('Digite o código de rastreio: ');
}