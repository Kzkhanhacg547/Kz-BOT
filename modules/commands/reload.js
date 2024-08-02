module.exports.config = {
  name: "reload",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Tpk",
  description: "Khởi động lại Bot",
  commandCategory: "Tiện ích",
  usages: "reload + time",
  cooldowns: 5
};

module.exports.onLoad = async ({ api }) => {
  const axios = global.nodemodule["axios"];
  const moment = require("moment-timezone");
  const os = require("os");
  const { commands } = global.client;

  const cpuInfo = os.cpus();
  const startTime = Date.now();
  const formattedTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const processingTime = Math.floor((Date.now() - global.client.timeStart) / 4444);
  const status = processingTime < 10 ? "Tốt ✔️" : processingTime > 10 && processingTime < 100 ? "Ổn định 📊" : "Delay";
  const imageUrls = [
    "https://i.imgur.com/9Uk7O8O.jpeg",
    "https://i.imgur.com/KfNBAeg.jpeg",
  ];

  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  const imageStream = (await axios.get(randomImageUrl, { responseType: "stream" })).data;
  const message = {
    body: `💓 ==『 𝗦𝗘𝗥𝗩𝗘𝗥 𝗦𝗧𝗔𝗥𝗧 』== 💓
━━━━━━━━━━━━━━━━━━━
[⏰] 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${formattedTime}
[🔰] 𝗣𝗵𝗶𝗲̂𝗻 𝗯𝗮̉𝗻: ${global.config.version}
[🌸] 𝗧𝗼̂́𝗰 đ𝗼̣̂ 𝘅𝘂̛̉ 𝗹𝘆́: ${processingTime} giây
[💖] 𝗗𝗲𝗹𝗮𝘆: ${Date.now() - startTime}ms
[⚙️] 𝗟𝘂𝗼̂̀𝗻𝗴 𝗰𝗽𝘂: ${cpuInfo.length}
[📚] 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴: ${status}
━━━━━━━━━━━━━━━━━━━
[💼] 𝗧𝗼̂̉𝗻𝗴 𝗹𝗲̣̂𝗻𝗵: ${commands.size}
[🏠] 𝗧𝗼̂̉𝗻𝗴 𝗻𝗵𝗼́𝗺: ${global.data.allThreadID.length}
[👥] 𝗧𝗼̂̉𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${global.data.allUserID.length}
━━━━━━━━━━━━━━━━━━━
⬆️ 𝗣𝗵𝗶́𝗮 𝘁𝗿𝗲̂𝗻 𝗹𝗮̀ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝘀𝗮𝗼 𝗸𝗵𝗶 𝘀𝘁𝗮𝗿𝘁 𝗰𝘂̉𝗮 𝗯𝗼𝘁
⚠️ 𝗟𝘂̛𝘂 𝘆́: 𝘀𝗮𝗼 𝗸𝗵𝗶 𝗿𝘂𝗻 𝘁𝗵𝗶̀ 𝘁𝗮̂̀𝗺 𝟱,𝟲 𝗴𝗶𝗮̂𝘆 𝗯𝗼𝘁 𝗺𝗼̛́𝗶 𝗴𝘂̛̉𝗶 đ𝗲̂̉ 𝗹𝗮̂́𝘆 𝗱𝗮𝘁𝗮 𝗰𝗵𝘂𝗮̂̉𝗻 𝗻𝗵𝗮̂́𝘁`,
    attachment: [imageStream]
  };

  setTimeout()
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const os = require("os");
  const moment = require("moment-timezone");
  const startTime = Date.now();
  const { threadID, messageID } = event;
  const API = global.config.API.domain1;

  const allowedUsers = ["100081129610697"];
  if (!allowedUsers.includes(event.senderID)) return api.sendMessage("?", threadID, messageID);

  const reloadTime = args.join(" ") || "10";
  const formattedTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  const cpuInfo = os.cpus();
  const cpuSpeed = cpuInfo[0].speed;

  api.sendMessage({
    body: `🤖 ==== [ 𝐑𝐄𝐋𝐎𝐀𝐃 ] ==== 🤖\n━━━━━━━━━━━━━━━━━━━\n⚙️ 𝗕𝗼𝘁 𝘀𝗲̃ 𝘁𝗶𝗲̂́𝗻𝗴 𝗵𝗮̀𝗻𝗵 𝗿𝗲𝗹𝗼𝗮𝗱 𝘀𝗮𝘂 ${reloadTime} 𝗴𝗶𝗮̂𝘆 𝗻𝘂̛̃𝗮 
⏰ 𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${formattedTime}
📊 𝗧𝗼̂́𝗰 đ𝗼̣̂ 𝘅𝘂̛̉ 𝗹𝗶́ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${cpuSpeed}𝗠𝗛𝘇
↪️ 𝗦𝗼̂́ 𝗹𝘂𝗼̂𝗻𝗴 𝗖𝗣𝗨: ${cpuInfo.length}
💞 đ𝗼̣̂ 𝘁𝗿𝗲̂̃ 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶: ${Date.now() - startTime}𝗺𝘀\n━━━━━━━━━━━━━━━━━━━\n💓 𝗦𝗮𝘂 𝗸𝗵𝗶 𝗯𝗼𝘁 𝗿𝗲𝗹𝗼𝗮𝗱 𝗯𝗼𝘁 𝘀𝗲̃ 𝗴𝘂̛̉𝗶 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘀𝗮𝘂 𝗸𝗵𝗶 𝗿𝘂𝗻 𝗼̛̉ 𝗶𝗯`,
    attachment: (await axios.get((await axios.get(`${API}/loli`)).data.url, { responseType: "stream" })).data
  }, threadID, messageID);

  setTimeout(() => {
    api.sendMessage("💨 𝗕𝗼𝘁 𝗧𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝗥𝗲𝗹𝗼𝗮𝗱 𝗕𝗼𝘁 !", threadID, () => process.exit(1));
  }, reloadTime * 1000);
};
