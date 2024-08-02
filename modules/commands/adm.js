const axios = require("axios");
const moment = require("moment-timezone");
const API = global.config.API.domain1;

module.exports.config = {
  name: "adm",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Kz Khánh",
  description: "",
  commandCategory: "Admin",
  usages: "",
  cooldowns: 0,
  dependencies: { "fs-extra": "", "request": "" }
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (thread["adm"] === false || senderID === api.getCurrentUserID()) return;

  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
  const day = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  const dayMap = {
    "Sunday": "Chủ Nhật", "Monday": "Thứ Hai", "Tuesday": "Thứ Ba", 
    "Wednesday": "Thứ Tư", "Thursday": "Thứ Năm", "Friday": "Thứ Sáu", 
    "Saturday": "Thứ Bảy"
  };

  const name = await Users.getNameUser(senderID);
  const thinh = (await axios.get(`${API}/thinh`)).data.data;

  const msg = {
    body: `🌟====𝐓𝐡ô𝐧𝐠 𝐓𝐢𝐧 𝐀𝐝𝐦𝐢𝐧====🌟
  👀 Tên: 𝐁ù𝐢 𝐕ă𝐧 𝐊𝐡á𝐧𝐡
  👤 Giới tính: 𝐍𝐚𝐦
  🙄 Sinh ngày: 𝟏𝟎/𝟏𝟏/𝟐𝟎𝟎𝟕 
  💫 Chiều cao × cân nặng: 𝟏𝐦𝟔𝟓 × 𝟓𝟒𝐤𝐠
  😎 Quê quán: 𝐇ả𝐢 𝐃ươ𝐧𝐠 
  🤔 Nơi ở: 𝐆𝐢𝐚 𝐋𝐚𝐢
  🌸 Cung: 𝐁ọ 𝐂ạ𝐩
  🌸 Tính cách: Quen Lâu Là Biết ❤️
  📱 Facebook: https://fb.me/kzkhanh547
      [ ✰ ]=== [  𝐊𝐳 𝐁𝐨𝐭𝐭 ] ===[ ✰ ]
[ ⚠️ ] 𝐍𝐡ữ𝐧𝐠 𝐥ư𝐮 ý 𝐤𝐡𝐢 𝐬ử 𝐝ụ𝐧𝐠 𝐛𝐨𝐭 𝐜ủ𝐚 𝐦ì𝐧𝐡 𝐧𝐞𝐤 :
[ 🛩 ] 𝙺𝚑ô𝚗𝚐 𝚜𝚙𝚊𝚖 𝚋𝚘𝚝
[ 🛩 ] 𝙺𝚑ô𝚗𝚐 𝚜ử 𝚍ụ𝚗𝚐 𝚋𝚘𝚝 𝚚𝚞á 𝚗𝚑𝚊𝚗𝚑 𝚝𝚛ê𝚗 3 𝚕ầ𝚗/120𝚜
[ 🛩 ] 𝙺𝚑ô𝚗𝚐 𝚛𝚎𝚙𝚘𝚛𝚝 𝚊𝚌𝚌 𝚋𝚘𝚝
[ 🛩 ] 𝚃𝚛𝚘𝚗𝚐 𝚚𝚞á 𝚝𝚛ì𝚗𝚑 𝚜ử 𝚍ụ𝚗𝚐 𝚗ế𝚞 𝚋𝚘𝚝 𝚕ỗ𝚒, 𝚑ã𝚢 𝚋á𝚘 𝚕ạ𝚒 𝚟ớ𝚒 𝚊𝚍𝚖𝚒𝚗 👑
[ 🌟 ] 𝙰𝚍𝚖𝚒𝚗 𝙱𝚘𝚝 𝚃𝚑𝚊𝚗𝚔𝚜 𝙲á𝚌 𝙱ạ𝚗 Đã 𝙻ự𝚊 𝙲𝚑ọ𝚗 𝙱𝚘𝚝 𝙽à𝚢 Để 𝚂ử 𝙳ụ𝚗𝚐
[ ⏰ ] Bây giờ là: ${dayMap[day]} | ${time}
[ ❤️‍🩹 ] 𝐓𝐡í𝐧𝐡: ${thinh}
      [ ✰ ]=== [  𝐊𝐳 𝐁𝐨𝐭𝐭 ] ===[ ✰ ]`,
    attachment: (await axios({
      url: (await axios(`${API}/ad`)).data.url,
      method: "GET",
      responseType: "stream"
    })).data
  };

  if (["adm", "ADM", "Adm"].includes(body)) {
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.languages = {
  vi: { "on": "Bật", "off": "Tắt", "successText": "adm thành công" },
  en: { "on": "on", "off": "off", "successText": "hi success!" }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  data["adm"] = !data["adm"];
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${data["adm"] ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
