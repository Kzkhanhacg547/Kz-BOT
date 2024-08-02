const axios = require('axios');

module.exports.config = {
  name: "ảnh",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Kz Khánhh",
  description: "Xem ảnh réply",
  commandCategory: "Tiện ích",
  cooldowns: 5,
  dependencies: {
    axios: ""
  }
};

const API = global.config.API.domain1;
const ENDPOINTS = {
  "1": "/girl",
  "2": "/trai",
  "3": "/6mui",
  "4": "/random",
  "5": "/random",
  "6": "/phongcanh",
  "7": "/anime",
  "8": "/vdgirl",
  "9": "/vdtrai",
  "10": "/vdanime",
  "11": "/science",
  "12": "/chill",
  "13": "/tamtrang",
  "14": "/doraemon"
};

module.exports.run = async function({ event, api, args }) {
  if (!args[0]) {
    const picture = (await axios.get(`https://i.imgur.com/ZfQPhB0.jpeg`, { responseType: "stream"})).data;
    return api.sendMessage({
      body: "『✯』𝐃𝐀𝐍𝐇 𝐒Á𝐂𝐇 Ả𝐍𝐇『✯』\n𝟏. Ả𝐧𝐡 𝐧ữ 💕\n𝟐. Ả𝐧𝐡 𝐍𝐚𝐦 💖\n𝟑. Ả𝐧𝐡 𝐓𝐫𝐚𝐢 𝟔 𝐌ú𝐢 ❤️‍🔥\n𝟒. Ả𝐧𝐡 𝐠á𝐢 𝐓𝐫𝐮𝐧𝐠 ❤️‍🩹\n𝟓. Ả𝐧𝐡 𝐧ữ 𝐬𝐞𝐱𝐲 \n𝟔. Ả𝐧𝐡 𝐩𝐡𝐨𝐧𝐠 𝐜ả𝐧𝐡\n𝟕. Ả𝐧𝐡 𝐚𝐧𝐢𝐦𝐞\n═══════════════\n  『✭』𝐋𝐈𝐒𝐓 𝐕𝐈𝐃𝐄𝐎『✭』\n𝟖. 𝐕𝐢𝐝𝐞𝐨 𝐠á𝐢\n𝟗. 𝐕𝐢𝐝𝐞𝐨 𝐭𝐫𝐚𝐢\n𝟏𝟎. 𝐕𝐢𝐝𝐞𝐨 𝐚𝐧𝐢𝐦𝐞\n𝟏𝟏. 𝐌ộ𝐭 𝐜𝐡ú𝐭 𝐤𝐡𝐨𝐚 𝐡ọ𝐜\n𝟏𝟐. 𝐕𝐢𝐝𝐞𝐨 𝐜𝐡𝐢𝐥𝐥\n𝟏𝟑. 𝐕𝐢𝐝𝐞𝐨 𝐭â𝐦 𝐭𝐫ạ𝐧𝐠\n𝟏𝟒. 𝐕𝐢𝐝𝐞𝐨 𝐃𝐨𝐫𝐚𝐞𝐦𝐨𝐧", 
      attachment: picture 
    }, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "create"
      });
    }, event.messageID);
  }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const { type, author } = handleReply;
  const body = event.body.trim();
  const endpoint = ENDPOINTS[body];

  if (type === "create" && endpoint) {
    const url = `${API}${endpoint}`;
    const response = await axios.get(url);
    const mediaUrl = response.data.url;
    const mediaStream = (await axios.get(mediaUrl, { responseType: "stream" })).data;

    return api.sendMessage({
      body: "[ 𝗧𝗮̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 ] - 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝗻𝗲̀ ✡",
      attachment: mediaStream
    }, event.threadID, event.messageID);
  }
};
