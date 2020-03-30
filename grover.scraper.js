const pptr = require('puppeteer');
const newsapi = require('./news.api');

const prompts = [];

(async () => {
  const browser = await pptr.launch({
    args: ['--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    newsapi
      .getHeadlines()
      .then(headlines => prompts.push(...headlines))
      .catch(err => console.log(err.message));

    await page.goto('https://grover.allenai.org/');

    for (let i = 0; i < prompts.length; i++) {
      await page
        .evaluate(() => {
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
        })
        .catch(err => console.log(err.message));

      await page.type(
        '#root > section > main > div > div:nth-child(2) > div.sc-kvZOFW.sc-dNLxif.eotRhV > div:nth-child(15) > textarea',
        prompts[i]
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
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    await browser.close();
  }
})();
