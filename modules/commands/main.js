const axios = require('axios');
const moment = require("moment-timezone");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require('child_process');
const os = require('os');
const { performance } = require('perf_hooks');

module.exports.config = {
  name: "main",
  version: "2.2.0",
  hasPermission: 2,
  credits: "Kz Khánhh",
  description: "Cấu hình hệ thống bot",
  commandCategory: "Hệ Thống",
  usages: "botsetting",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "moment-timezone": ""
  }
};

const PERMISSION_DENIED_MSG = "Bạn không có quyền sử dụng lệnh này!";
const API_ENDPOINT = `${global.config.API.domain1}/`;
const QUOTE_API = 'https://api.quotable.io/random';

async function getRandomImages(count) {
  try {
    const imageUrls = await Promise.all(
      Array.from({ length: count }, () => axios.get(API_ENDPOINT).then(res => res.data.url))
    );
    return await Promise.all(imageUrls.map(url =>
      axios({ url, method: "GET", responseType: "stream" }).then(res => res.data)
    ));
  } catch (error) {
    console.error("Lỗi khi tải ảnh:", error);
    return [];
  }
}

async function getRandomQuote() {
  try {
    const response = await axios.get(QUOTE_API);
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi lấy quote:", error);
    return "Không thể lấy quote vào lúc này.";
  }
}

function createSettingsMessage() {
  return `==「 CÀI ĐẶT BOT 」==
━━━━━━━━━━━━━━
1: Khởi động lại bot
2: Tắt bot
3: Xem thông tin bot
4: Đặt lại tiền cho tất cả thành viên
5: Đặt lại exp và số tin nhắn cho tất cả thành viên
6: Cập nhật dữ liệu thành viên nhóm
7: Cập nhật dữ liệu cho tất cả các nhóm
8: Sao lưu dữ liệu
9: Dọn dẹp file tạm thời
10: Kiểm tra thời gian hoạt động của bot
11: Gửi một quote ngẫu nhiên
12: Hiển thị trạng thái server
━━━━━━━━━━━━━━
Vui lòng nhập số để chọn tùy chọn.`;
}

module.exports.run = async ({ api, event, Threads }) => {
  const { threadID } = event;
  const attachments = await getRandomImages(6);

  api.sendMessage({
    body: createSettingsMessage(),
    attachment: attachments
  }, threadID, (err, info) => {
    if (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      return;
    }
    global.client.handleReply.push({
      type: "botsetting",
      name: module.exports.config.name,
      author: event.senderID,
      messageID: info.messageID
    });
  });
};

module.exports.handleReply = async function({ api, event, Threads, Users, Currencies, handleReply }) {
  const { threadID, messageID, senderID } = event;
  const { ADMINBOT } = global.config;

  if (!ADMINBOT.includes(senderID)) {
    return api.sendMessage(PERMISSION_DENIED_MSG, threadID, messageID);
  }

  const actions = {
    "1": async () => restartBot(api, threadID),
    "2": async () => shutdownBot(api, threadID),
    "3": async () => viewBotInfo(api, threadID, Threads),
    "4": async () => resetMoney(api, threadID, Currencies),
    "5": async () => resetExpAndMessages(api, threadID, Currencies),
    "6": async () => updateUserGroupData(api, threadID, Users),
    "7": async () => updateAllGroupData(api, threadID, Threads),
    "8": async () => backupDatabase(api, threadID),
    "9": async () => cleanupTempFiles(api, threadID),
    "10": async () => checkBotUptime(api, threadID),
    "11": async () => sendRandomQuote(api, threadID),
    "12": async () => showServerStatus(api, threadID)
  };

  if (handleReply.type === "botsetting") {
    const action = actions[event.body];
    if (action) {
      await action();
    } else {
      api.sendMessage("Tùy chọn không hợp lệ. Vui lòng thử lại.", threadID);
    }
  }
};

async function restartBot(api, threadID) {
  api.sendMessage("Đang khởi động lại bot...", threadID, () => process.exit(1));
}

async function shutdownBot(api, threadID) {
  api.sendMessage("Đang tắt bot...", threadID, () => process.exit(0));
}

async function viewBotInfo(api, threadID, Threads) {
  const { commands } = global.client;
  const { BOTNAME, PREFIX, ADMINBOT } = global.config;
  const threadSetting = (await Threads.getData(threadID)).data || {};
  const prefix = threadSetting.PREFIX || PREFIX;
  const ping = Date.now();

  const infoMessage = `==== [ THÔNG TIN BOT ] ====
━━━━━━━━━━━━━━━━━━
🖥 Số module: ${commands.size} lệnh
📎 Tiền tố: Tiền tố hệ thống là [ ${prefix} ]
💓 Tên Bot: ${BOTNAME}
👑 Admin Bot: ${ADMINBOT.length}
📌 Ping: ${Date.now() - ping}ms
━━━━━━━━━━━━━━━━━
Sử dụng "${prefix}help" để xem các lệnh có sẵn`;

  api.sendMessage({ body: infoMessage, attachment: await getRandomImages(1) }, threadID);
}

async function resetMoney(api, threadID, Currencies) {
  const participantIDs = (await api.getThreadInfo(threadID)).participantIDs;
  for (const id of participantIDs) {
    await Currencies.setData(id, { money: 0 });
  }
  api.sendMessage("💵 Tất cả tiền của thành viên trong nhóm đã được đặt lại về 0!", threadID);
}

async function resetExpAndMessages(api, threadID, Currencies) {
  const participantIDs = (await api.getThreadInfo(threadID)).participantIDs;
  for (const id of participantIDs) {
    await Currencies.setData(id, { exp: 0, messageCount: 0 });
  }
  api.sendMessage("🍁 Tất cả exp và số tin nhắn của thành viên trong nhóm đã được đặt lại về 0!", threadID);
}

async function updateUserGroupData(api, threadID, Users) {
  const participantIDs = (await api.getThreadInfo(threadID)).participantIDs;
  for (const id of participantIDs) {
    const { name } = await api.getUserInfo(id);
    await Users.setData(id, { name, data: {} });
  }
  api.sendMessage("🌸 Thông tin người dùng trong nhóm đã được cập nhật!", threadID);
}

async function updateAllGroupData(api, threadID, Threads) {
  const groups = await api.getThreadList(100, null, ['INBOX']);
  const groupList = groups.filter(group => group.isSubscribed && group.isGroup);
  for (const group of groupList) {
    const threadInfo = await api.getThreadInfo(group.threadID);
    await Threads.setData(group.threadID, { threadInfo });
  }
  api.sendMessage(`👉 Thông tin của ${groupList.length} nhóm đã được cập nhật!`, threadID);
}

async function backupDatabase(api, threadID) {
  const backupDir = './backups';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
  const backupFileName = `backup_${timestamp}.tar.gz`;
  const backupPath = path.join(backupDir, backupFileName);

  const dirsToBackup = [
    './modules/commands/cache',
    './modules/commands/data'
  ];

  const filesToBackup = [
    './config.json'
  ];

  const backupCommand = `tar -czf ${backupPath} ${dirsToBackup.join(' ')} ${filesToBackup.join(' ')}`;

  try {
    await new Promise((resolve, reject) => {
      exec(backupCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi thực thi lệnh: ${error}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`Lỗi stderr: ${stderr}`);
          return reject(new Error(stderr));
        }
        resolve(stdout);
      });
    });

    const backups = fs.readdirSync(backupDir).filter(file => file.startsWith('backup_') && file.endsWith('.tar.gz'));
    if (backups.length > 10) {
      const oldestBackup = backups.sort((a, b) => fs.statSync(path.join(backupDir, a)).mtimeMs - fs.statSync(path.join(backupDir, b)).mtimeMs)[0];
      fs.unlinkSync(path.join(backupDir, oldestBackup));
    }

    api.sendMessage("🗂 Dữ liệu đã được sao lưu thành công!", threadID);
  } catch (error) {
    api.sendMessage("⚠️ Lỗi khi sao lưu dữ liệu: " + error.message, threadID);
  }
}

async function cleanupTempFiles(api, threadID) {
  const tempDir = path.join(os.tmpdir());
  const files = fs.readdirSync(tempDir);
  for (const file of files) {
    const filePath = path.join(tempDir, file);
    try {
      await fs.remove(filePath);
    } catch (error) {
      console.error(`Lỗi khi xóa tệp tạm thời: ${filePath}`, error);
    }
  }
  api.sendMessage("🧹 Dọn dẹp tệp tạm thời thành công!", threadID);
}

async function checkBotUptime(api, threadID) {
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const uptimeMessage = `⏰ Thời gian hoạt động của bot:\n${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây.`;
  api.sendMessage(uptimeMessage, threadID);
}

async function sendRandomQuote(api, threadID) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quoteData = response.data;
    const quoteMessage = `💬 Quote ngẫu nhiên:\n"${quoteData.content}"\n\n- ${quoteData.author}`;
    api.sendMessage(quoteMessage, threadID);
  } catch (error) {
    console.error("Lỗi khi lấy quote:", error);
    api.sendMessage("⚠️ Không thể lấy quote vào lúc này.", threadID);
  }
}

async function showServerStatus(api, threadID) {
  const memoryUsage = process.memoryUsage();
  const totalMemory = (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2);
  const usedMemory = (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2);
  const freeMemory = (totalMemory - usedMemory).toFixed(2);
  const cpuUsage = process.cpuUsage();
  const cpuUsagePercentage = ((cpuUsage.user + cpuUsage.system) / (process.uptime() * 1000 * 1000)).toFixed(2);

  const statusMessage = `📊 Trạng thái server:\n
    - Tổng bộ nhớ: ${totalMemory} MB
    - Bộ nhớ đã sử dụng: ${usedMemory} MB
    - Bộ nhớ còn trống: ${freeMemory} MB
    - Sử dụng CPU: ${cpuUsagePercentage}%`;

  api.sendMessage(statusMessage, threadID);
}
