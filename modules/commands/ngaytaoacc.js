const axios = require('axios');
const moment = require("moment-timezone");

module.exports.config = {
  name: "dateacc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kz Khánhh",
  description: "Xem thời gian tạo acc facebook",
  commandCategory: "Hệ thống",
  cooldowns: 3
};


module.exports.run = async ({ api, event, Users }) => {
  const axios = require('axios');
  const timeStart = Date.now();
  const res = await axios.get(`https://apibot.dungkon.me/facebook/timejoine?uid=${event.senderID}&apikey=APIKEY_FREE`);
  var name = res.data.name;
  var day = res.data.day;
  var time = res.data.time;

  
 api.sendMessage(`•◌•◌•◌•◌•◌•◌•◌•★•◌•◌•◌•◌•◌•◌•◌•
  👤 𝚃𝚎̂𝚗 𝚝𝚊̀𝚒 𝚔𝚑𝚘𝚊̉𝚗: ${name}
  🗓️ 𝙽𝚐𝚊̀𝚢 𝚝𝚊̣𝚘: ${day}
  ⏳ 𝚃𝚊̣𝚘 𝚕𝚞́𝚌 ${time}
  🆔 ${event.senderID}
✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`, event.threadID, event.messageID);

}