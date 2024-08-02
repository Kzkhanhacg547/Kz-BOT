const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "avt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuong",
  description: "lấy avt người dùng bằng id",
  commandCategory: "Công cụ",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args, Threads }) {
  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const mn = this.config.name;

  if (!args[0]) {
    return api.sendMessage(
      `=== [ FB-AVATAR ] ===\n\n` +
      `[🖼️] ➜ ${prefix}${mn} box - Lấy avatar của nhóm\n` +
      `[🖼️] ➜ ${prefix}${mn} box all - Lấy avatar của tất cả thành viên trong nhóm\n` +
      `[👥] ➜ ${prefix}${mn} id [id cần lấy] - Lấy avatar theo UID\n` +
      `[👤] ➜ ${prefix}${mn} link [link cần lấy] - Lấy avatar theo link\n` +
      `[🌐] ➜ ${prefix}${mn} user - Lấy avatar của chính người dùng lệnh\n` +
      `[👤] ➜ ${prefix}${mn} user [@mentions] - Lấy avatar của người được tag\n` +
      `[👤] ➜ ${prefix}${mn} admin - Lấy avatar của admin trong nhóm`,
      event.threadID, event.messageID
    );
  }

  try {
    switch (args[0]) {
      case "box":
        if (args[1] === "all") {
          await handleBoxAllCommand(api, event, args);
        } else {
          await handleBoxCommand(api, event, args);
        }
        break;
      case "id":
        await handleIdCommand(api, event, args);
        break;
      case "link":
        await handleLinkCommand(api, event, args);
        break;
      case "user":
        await handleUserCommand(api, event, args);
        break;
      case "admin":
        await handleAdminCommand(api, event, args);
        break;
      default:
        api.sendMessage(`[❌] ➜ Sai lệnh. Ghi ${prefix}${mn} để xem các lệnh của module.`, event.threadID, event.messageID);
        break;
    }
  } catch (error) {
    api.sendMessage(`[🚫] ➜ Đã xảy ra lỗi: ${error.message}`, event.threadID, event.messageID);
  }
};

async function handleBoxCommand(api, event, args) {
  const threadID = args[1] || event.threadID;
  const threadInfo = await api.getThreadInfo(threadID);
  const img = threadInfo.imageSrc;

  if (!img) {
    return api.sendMessage(`[🖼️] ➜ Avatar của nhóm ${threadInfo.threadName} không có`, event.threadID, event.messageID);
  }

  const filePath = __dirname + "/cache/1.png";
  await downloadImage(img, filePath);
  api.sendMessage({ body: `[🖼️] ➜ Avatar của nhóm ${threadInfo.threadName} đây`, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
}

async function handleBoxAllCommand(api, event, args) {
  const threadID = event.threadID;
  const threadInfo = await api.getThreadInfo(threadID);

  for (const userID of threadInfo.participantIDs) {
    const url = `https://graph.facebook.com/${userID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const filePath = __dirname + `/cache/${userID}.png`;
    await downloadImage(url, filePath);
    api.sendMessage({ body: `[🖼️] ➜ Avatar của thành viên ID ${userID}`, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
  }
}

async function handleIdCommand(api, event, args) {
  const id = args[1];
  if (!id) return api.sendMessage(`[👻] ➜ Vui lòng nhập UID cần lấy avatar.`, event.threadID, event.messageID);

  const url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const filePath = __dirname + "/cache/1.png";
  await downloadImage(url, filePath);
  api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
}

async function handleLinkCommand(api, event, args) {
  const link = args[1];
  if (!link) return api.sendMessage(`[❗] ➜ Vui lòng nhập link cần lấy avatar.`, event.threadID, event.messageID);

  try {
    const id = await getFacebookUID(link);
    const url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const filePath = __dirname + "/cache/1.png";
    await downloadImage(url, filePath);
    api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
  } catch (error) {
    api.sendMessage("[🚫] ➜ Người dùng không tồn tại.", event.threadID, event.messageID);
  }
}

async function handleUserCommand(api, event, args) {
  const id = args[1] ? Object.keys(event.mentions)[0] : event.senderID;
  const url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const filePath = __dirname + "/cache/1.png";
  await downloadImage(url, filePath);
  api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
}

async function handleAdminCommand(api, event, args) {
  const threadID = event.threadID;
  const threadInfo = await api.getThreadInfo(threadID);

  for (const adminID of threadInfo.adminIDs) {
    const userID = adminID.id;
    const url = `https://graph.facebook.com/${userID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const filePath = __dirname + `/cache/${userID}.png`;
    await downloadImage(url, filePath);
    api.sendMessage({ body: `[🖼️] ➜ Avatar của admin ID ${userID}`, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
  }
}

async function downloadImage(url, filePath) {
  const response = await axios({ url, responseType: 'stream' });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function getFacebookUID(link) {
  try {
    const response = await axios.get(link);
    const data = response.data;
    const uid = data.match(/"entity_id":"(\d+)"/)[1];
    return uid;
  } catch (error) {
    throw new Error("Không thể lấy UID từ link Facebook.");
  }
}
