module.exports.config = {
  name: "wallpaper",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kz Khánhh, Tiny",
  description: "Ảnh gái làm  bao anh say đắm",
  commandCategory: "Hình ảnh",
  usages: "girl",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
};

const request = require('request');
const fs = require("fs");

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const threadID = event.threadID;

  const imageUrls = await Promise.all(Array.from({ length: 1 }, async () => {
    const res = await axios.get('https://randomapi.kzbott.repl.co/images/wallpaper');
    return res.data.url;
  }));

  const attachments = await Promise.all(imageUrls.map(async (url) => {
    return (await axios({
      url,
      method: "GET",
      responseType: "stream"
    })).data
  }));

  const res = await axios.get(`https://4dd9ea6e-d5a6-4f8f-892c-ce90e4d539b9-00-11lae77drh9zo.janeway.replit.dev/thinh`);
  var thinh = res.data.url;
  const moment = require("moment-timezone");
  var gio =
    moment.tz('Asia/Ho_Chi_Minh').format("HH:mm:ss || D/MM/YYYY");
  var thu =
    moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
  api.sendMessage({
    body: `===『 𝗔̉𝗡𝗛 𝐖𝐀𝐋𝐋𝐏𝐀𝐏𝐄𝐑  』===\n━━━━━━━━━━━━━━━━━\n\n『💓』 𝗧𝗵𝗶́𝗻𝗵: 『 ${thinh} 』\n═══════════════\n${gio} || ${thu}`,
    attachment: attachments
  }, threadID);
};
