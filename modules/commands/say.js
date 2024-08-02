const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

module.exports.config = {
  name: "say",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Khiến bot trả về file âm thanh của chị google thông qua văn bản",
  commandCategory: "Công cụ",
  usages: "[ru/en/ko/ja] [Text]",
  cooldowns: 5,
  dependencies: {
    "path": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  try {
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (args.length == 0) return api.sendMessage(`=== 𝗩𝗢𝗜𝗖𝗘𝗦 ===\n━━━━━━━━━━━━━━━━━━\n→ 𝗖𝗮́𝗰𝗵 𝗦𝘂̛̉ 𝗗𝘂̣𝗻𝗴\n→ /say: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝘁𝗶𝗲̂́𝗻𝗴 𝗩𝗶𝗲̣̂𝘁 𝗡𝗮𝗺 🇻🇳\n→ /say 𝗿𝘂: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗴𝗮 🇷🇺\n→ /say 𝗷𝗮: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗱𝗮̣𝗻𝗴 𝗴𝗶𝗼̣𝗻𝗴 𝗻𝗼́𝗶 𝗰𝗵𝗶̣ 𝗚𝗼𝗼𝗴𝗹𝗲 𝗡𝘂̛𝗼̛́𝗰 𝗡𝗵𝗮̣̂𝘁 𝗕𝗮̉𝗻 🇯🇵\n→ /say 𝗸𝗼: 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘁𝗵𝗲𝗼 𝗡𝘂̛𝗼̛́𝗰 𝗛𝗮̀𝗻 𝗤𝘂𝗼̂́𝗰 🇰🇷\n=====「${timeNow} 」=====`, event.threadID, event.messageID);

    const { createReadStream, unlinkSync } = fs;
    const { resolve } = path;
    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    var languageToSay = (["ru", "vi","en","ko","ja"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
    var msg = (languageToSay != global.config.language) ? content.slice(3, content.length) : content;
    const filePath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);

    const response = await axios({
      method: 'get',
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`,
      responseType: 'stream'
    });

    // Pipe the response data to a file
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    // Ensure the file is fully written before proceeding
    writer.on('finish', () => {
      api.sendMessage({ attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath));
    });

    writer.on('error', (err) => {
      console.error(err);
      unlinkSync(filePath);
    });
  } catch (e) {
    console.log(e);
  }
}
