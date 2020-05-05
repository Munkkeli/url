'use strict';
const request = require('request');
const cheerio = require('cheerio');

/**
 * Get page title from an URL
 */
const title = (url) =>
  new Promise((resolve) => {
    request(url, (error, response, body) => {
      if (error) return resolve(url);

      if (response.statusCode === 200) {
        const $ = cheerio.load(body);
        const title = $('head > title').text().trim();
        return resolve(title || url);
      } else {
        return resolve(url);
      }
    });
  });

module.exports = {
  title,
};
