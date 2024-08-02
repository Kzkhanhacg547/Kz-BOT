const API = global.config.API.domain1;
const axios = require('axios');
const moment = require('moment-timezone');
const downloader = require('image-downloader');
const fs = require('fs-extra');

module.exports.config = {
  name: "time",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TNT, mod by vthien",
  description: "Display current time",
  commandCategory: "Utilities",
  usages: "timee",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, Users }) {
  const icons = ["💞", "💖", "💗", "💜", "🌸", "💝", "🎀", "🌹", "🍁", "🎊", "🌟"];
  const icon = icons[Math.floor(Math.random() * icons.length)];
  const currentTime = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss - DD/MM/YYYY');
  const weekdayMap = {
    Sunday: 'Chủ Nhật',
    Monday: 'Thứ Hai',
    Tuesday: 'Thứ Ba',
    Wednesday: 'Thứ Tư',
    Thursday: 'Thứ Năm',
    Friday: 'Thứ Sáu',
    Saturday: 'Thứ Bảy'
  };
  const dayOfWeek = weekdayMap[moment.tz('Asia/Ho_Chi_Minh').format('dddd')];
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  const userInfo = await Users.getNameUser(event.senderID);

  // Fetch 6 different images
  const imagePromises = [];
  for (let i = 0; i < 6; i++) {
    imagePromises.push(axios.get(`${API}/images/girl`));
  }
  const responses = await Promise.all(imagePromises);

  const images = await Promise.all(responses.map(async response => {
    const imageURL = response.data.url;
    const imageStream = (await axios.get(imageURL, { responseType: 'stream' })).data;
    return imageStream;
  }));

  const timeZones = [
    { name: 'London', zone: 'Europe/London' },
    { name: 'Brasília', zone: 'America/Sao_Paulo' },
    { name: 'Seoul', zone: 'Asia/Seoul' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Kuala Lumpur', zone: 'Asia/Kuala_Lumpur' },
    { name: 'Paris', zone: 'Europe/Paris' },
    { name: 'Lisbon', zone: 'Europe/Lisbon' },
    { name: 'Jordan', zone: 'Asia/Amman' },
    { name: 'Laos', zone: 'Asia/Vientiane' },
    { name: 'Thailand', zone: 'Asia/Bangkok' },
    { name: 'Brunei', zone: 'Asia/Brunei' },
  ];

  const times = timeZones.map(tz => `${tz.name}: ${moment.tz(tz.zone).format('HH:mm:ss || D/MM/YYYY')}`).join('\n');

  api.sendMessage({
    body: `⏰ === [ SERVER TIME ] === ⏰\n━━━━━━━━━━━━━━━━━━━\n[⏰] Time: ${currentTime}\n[📅] Today is: ${dayOfWeek}\n[🌟] User: ${userInfo}\n[🔗] Facebook Link: https://www.facebook.com/${event.senderID}\n[🎀] UID: ${event.senderID}\n[⌛] Bot Uptime: ${hours} hours ${minutes} minutes ${seconds} seconds\n━━━━━━━━━━━━━━━━━━━\n🌐 === [ TIME IN OTHER REGIONS ] === 🌐\n${times}`,
    attachment: images
  }, event.threadID);
};

async function streamURL(url, mime = 'jpg') {
  const dest = `${__dirname}/cache/${Date.now()}.${mime}`;
  await downloader.image({ url, dest });
  setTimeout(() => fs.unlinkSync(dest), 60 * 1000);
  return fs.createReadStream(dest);
}
