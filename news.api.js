const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('26e9a268b59241b1852d2af4d3987f4a');

let headlines = [];

module.exports.getHeadlines = async () => {
  newsapi.v2
    .topHeadlines({
      language: 'en',
      country: 'us'
    })
    .then(response => {
      console.log('working');
      response.articles.map(article => headlines.push(article.description));
      return headlines;
    });
};
