const NewsAPI = require('newsapi');
const key = require('./config');
const newsapi = new NewsAPI(key.NEWSAPI_KEY);

let headlines = [];

module.exports.getHeadlines = async () => {
  return newsapi.v2
    .topHeadlines({
      language: 'en',
      country: 'us'
    })
    .then(response => {
      response.articles.map(article => headlines.push(article.description));
      return headlines;
    })
    .catch(err => console.log(err.message));
};
