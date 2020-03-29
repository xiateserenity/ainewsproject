const newsapi = require('./news.api');
const pptr = require('puppeteer');

(async () => {
  const browser = await pptr.launch();

  try {
    const page = await browser.newPage();
    await page.goto('https://grover.allenai.org/');

    const prompt =
      "'A game changer': FDA authorizes Abbott Labs' portable, 5-minute coronavirus test the size of a toaster";

    await page.evaluate(() => {
      document.querySelector(
        '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(6) > input'
      ).value = '';
      document.querySelector(
        '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(12) > textarea'
      ).value = '';
      document.querySelector(
        '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(15) > textarea'
      ).value = '';
      document.querySelector(
        '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(18) > textarea'
      ).value = '';
    });

    await page.type(
      '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(15) > textarea',
      prompt
    );

    await page.click(
      '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(18) > button'
    );

    console.log('Generating article...');

    await page.waitFor(60000);

    console.log(
      await page.evaluate(() => {
        return document.querySelector(
          '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-jqCOkK.hDIgwA > div.sc-feJyhm.fRrBax > div.sc-jtRfpW.eslsTz > span'
        ).innerHTML;
      })
    );
  } catch (err) {
    console.log(err.message);
  } finally {
    await browser.close();
  }
})();
