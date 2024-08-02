const API = global.config.configApi.domain1;

module.exports.config = {
  name: "123456",
  version: "1.0.2",
  hasPermssion: "0",
  credits: "Kz Khánhh", //copy nội dung từ TNT 
  description: "Noprefix",
  commandCategory: "Noprefix",
  usages: "goibot",
  cooldowns: 5
};

// Khai báo biến cờ
var isBotEnabled = true;

module.exports.handleEvent = async ({ api, event, Users, Threads }) => {
  const moment = require("moment-timezone"); 
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭';
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢';
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚';
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛';
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦';
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮';
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲';

  var { threadID, messageID, body } = event, { PREFIX } = global.config;
  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;

  if (!event.body) return;
  var { threadID, messageID } = event;
  const threadname = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;

  // Thêm kiểm tra cờ để xác định có tiếp tục trả lời tiếp không 
  if (isBotEnabled && event.body.toLowerCase().indexOf("bot") == 0) {
    const threadSetting = (await Threads.getData(String(threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("Bot")) ? threadSetting.PREFIX : global.config.PREFIX;
    const dateNow = Date.now();
    const time = process.uptime(),
          hours = Math.floor(time / (60 * 60)),
          minutes = Math.floor((time % (60 * 60)) / 60),
          seconds = Math.floor(time % 60);
    const admins = global.config.ADMINBOT;
    const namebot = config.BOTNAME;
    const { commands } = global.client;
    var i = 1;
    var msg = [];

    const name = await Users.getNameUser(event.senderID);
    api.sendMessage({
      body: ``,
      attachment: (await global.nodemodule["axios"]({
        url: (await global.nodemodule["axios"](`https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/trai`)).data.url,
        method: "GET",
        responseType: "stream"
      })).data
    }, event.threadID, event.messageID);
  }
};

// Thêm hàm để chuyển đổi trạng thái bật/tắt của chức năng trả lời bot 
module.exports.run = async ({ api, event, args }) => {
  if (!args[0]) return api.sendMessage("Hãy nhập bật hoặc tắt để thay đổi trạng thái của bot trả lời tin nhắn có chứa từ 'bot'!", event.threadID, event.messageID);
  let text = args[0].toLowerCase();
  if (text == "bật") {
    isBotEnabled = true;
    api.sendMessage(`Đã bật chức năng trả lời tin nhắn có chữ 'bot'!`, event.threadID, event.messageID);
  }
  else if (text == "tắt") {
    isBotEnabled = false;
    api.sendMessage(`Đã tắt chức năng trả lời tin nhắn có chữ 'bot'!`, event.threadID, event.messageID);
  }
  else {
    api.sendMessage("Hãy nhập bật hoặc tắt để thay đổi trạng thái của bot trả lời tin nhắn có chứa từ 'bot'!", event.threadID, event.messageID);
  }
};