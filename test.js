const newsapi = require('./newsapi');
const generator = require('./generator');

const prompts = [];

async function test() {
  await newsapi
    .getHeadlines()
    .then((headlines) => prompts.push(...headlines))
    .catch((err) => console.log(err.message));

  try {
    for (let i = 0; i < prompts.length; i++) {
      const text = await generator.getGeneratedText(prompts[i]);
      const summarizedText = await generator.getSummarizedText(text.output);
      console.log(summarizedText);
    }
  } catch (err) {
    console.log(err.message);
  }
}

test();
