const API = global.config.API.domain1;

module.exports.config = {
  name: "timenow",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kz Khánh",
  description: "Trả lời thời gian hiện tại",
  commandCategory: "Tiện ích",
  usages: "",
  cooldowns: 0,
  dependencies: {
    "moment-timezone": ""
  }
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const moment = require('moment-timezone');
  const timeStart = Date.now();

  const currentTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
  let dayOfWeek = moment.tz("Asia/Ho_Chi_Minh").format('dddd');

  const daysMapping = {
    'Sunday': 'Chủ Nhật',
    'Monday': 'Thứ Hai',
    'Tuesday': 'Thứ Ba',
    'Wednesday': 'Thứ Tư',
    'Thursday': 'Thứ Năm',
    'Friday': 'Thứ Sáu',
    'Saturday': 'Thứ Bảy'
  };

  dayOfWeek = daysMapping[dayOfWeek] || dayOfWeek;

  const { threadID, messageID, body, senderID } = event;
  if (senderID == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);

  if (body.toLowerCase() === "time") {
    const msg = {
      body: `Xin chào ${name}!\nHiện tại là: ${dayOfWeek}, ${currentTime}`
    };
    return api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "time thành công",
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "time success!",
  }
};

module.exports.run = async function({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["time"] == "undefined" || data["time"] == true) data["time"] = false;
  else data["time"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["time"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
