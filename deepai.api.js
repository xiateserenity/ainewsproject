const key = require('./config');
const deepai = require('deepai');
deepai.setApiKey(key.DEEPAI_KEY);

module.exports.getGeneratedText = async (headline) => {
  const generatedText = await deepai.callStandardApi('text-generator', {
    text: headline,
  });
  return generatedText;
};
