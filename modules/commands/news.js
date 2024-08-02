const axios = require('axios');
const moment = require("moment-timezone");
const cheerio = require('cheerio');

module.exports.config = {
  name: "news",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kz Khánhh",
  description: "Fetch top 3 news from GameK",
  commandCategory: "Tiện ích",
  cooldowns: 3
};

module.exports.run = async ({ api, event, Users }) => {
  const url = 'https://m.gamek.vn/';
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    'Accept-Language': 'vi-VN,en-US;q=0.9',
  };

  try {
    const response = await axios.get(url, { headers });
    const html = response.data;
    const $ = cheerio.load(html);

    const newsList = [];

    $('#fistUpload1 li').each((index, element) => {
      if (index < 3) {
        const title = $(element).find('a[data-linktype=newsdetail]').attr('title');
        const link = 'https://m.gamek.vn' + $(element).find('a[data-linktype=newsdetail]').attr('href');

        // Store the extracted data in an array of objects
        newsList.push({ title, link });
      }
    });

    // Now 'newsList' contains the titles and links of the first 3 items
    console.log(newsList);

    api.sendMessage(`══════╗ ⇲  Top 3 Tin Tức GameK  ⇱ ╚══════\n\n${newsList.map((news, index) => `${index + 1}. ${news.title}\n   - Link: ${news.link}`).join('\n')}`, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching data:', error);
    api.sendMessage('Có lỗi xảy ra khi lấy tin tức từ GameK.', event.threadID, event.messageID);
  }
};
