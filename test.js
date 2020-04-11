const newsapi = require('./news.api');
const deepai = require('./deepai.api');

const prompts = [];

async function test() {
  await newsapi
    .getHeadlines()
    .then((headlines) => prompts.push(...headlines))
    .catch((err) => console.log(err.message));

  try {
    for (let i = 0; i < prompts.length; i++) {
      console.log('hello');
      const text = await deepai.getGeneratedText(prompts[i]);
      console.log(text);
    }
  } catch (err) {
    console.log(err.message);
  }
}

test();
