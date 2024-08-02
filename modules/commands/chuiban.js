const fs = require("fs");

module.exports.config = {
  name: "chuiban",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Your Name",
  description: "Tự động kick người dùng khi chửi bậy hoặc chửi bot",
  commandCategory: "Quản lý nhóm",
  cooldowns: 5,
};

async function checkAndKick(api, event, threadID, senderID, threadData) {
  const userDataPath = `${threadID}_${senderID}.json`;
  if (!fs.existsSync(userDataPath)) return;

  const userData = JSON.parse(fs.readFileSync(userDataPath));
  const currentTime = Date.now();

  for (const data of userData) {
    if (currentTime - data.timestamp < 60000) {
      api.removeUserFromGroup(senderID, threadID);
      api.sendMessage(
        `Người dùng ${senderID} đã bị kick vì chửi bậy hoặc chửi bot.`,
        threadID,
      );
      return;
    }
  }

  fs.unlinkSync(userDataPath);
}

module.exports.handleEvent = async function ({ api, event, args }) {
  const { threadID, senderID, body, isGroup } = event;
  const dataPath = `${threadID}.json`;

  if (!isGroup) return;

  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  const threadData = JSON.parse(fs.readFileSync(dataPath));

  if (!args && senderID !== api.getCurrentUserID()) {
    const badWords = threadData.find((item) =>
      body.toLowerCase().includes(item.toLowerCase()),
    );
    if (badWords) {
      const userDataPath = `${threadID}_${senderID}.json`;
      let userData = [];
      if (fs.existsSync(userDataPath)) {
        userData = JSON.parse(fs.readFileSync(userDataPath));
      }
      userData.push({ messageID: event.messageID, timestamp: event.timestamp });
      fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));
    }
  }

  await checkAndKick(api, event, threadID, senderID, threadData);
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const dataPath = `${threadID}.json`;

  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  const threadData = JSON.parse(fs.readFileSync(dataPath));

  switch (args[0]) {
    case "add":
      const newWord = args.slice(1).join(" ");
      if (!newWord) {
        return api.sendMessage(
          "Vui lòng nhập từ ngữ cần thêm vào danh sách.",
          threadID,
        );
      }
      if (!threadData.includes(newWord)) {
        threadData.push(newWord);
        fs.writeFileSync(dataPath, JSON.stringify(threadData, null, 2));
        api.sendMessage(
          `Từ ngữ "${newWord}" đã được thêm vào danh sách.`,
          threadID,
        );
      } else {
        api.sendMessage(
          `Từ ngữ "${newWord}" đã tồn tại trong danh sách.`,
          threadID,
        );
      }
      break;

    case "list":
      if (threadData.length === 0) {
        return api.sendMessage(
          "Hiện tại danh sách từ ngữ đang trống.",
          threadID,
        );
      }
      const message = `Danh sách từ ngữ:\n\n${threadData.map((word, index) => `${index + 1}. ${word}`).join("\n")}`;
      api.sendMessage(message, threadID);
      break;

    case "remove":
      if (threadData.length === 0) {
        return api.sendMessage(
          "Hiện tại danh sách từ ngữ đang trống.",
          threadID,
        );
      }
      const reply = event.messageReply;
      if (!reply || !reply.body) {
        return api.sendMessage(
          "Vui lòng reply tin nhắn có chứa số thứ tự của từ ngữ cần xóa.",
          threadID,
        );
      }
      const index = parseInt(reply.body) - 1;
      if (isNaN(index) || index < 0 || index >= threadData.length) {
        return api.sendMessage("Số thứ tự không hợp lệ.", threadID);
      }
      const removedWord = threadData.splice(index, 1)[0];
      fs.writeFileSync(dataPath, JSON.stringify(threadData, null, 2));
      api.sendMessage(
        `Từ ngữ "${removedWord}" đã được xóa khỏi danh sách.`,
        threadID,
      );
      break;

    default:
      api.sendMessage(
        "Sử dụng:\n\nchuiban add <từ ngữ>: Thêm từ ngữ vào danh sách.\nchuiban list: Hiển thị danh sách từ ngữ.\nchuiban remove: Reply tin nhắn chứa số thứ tự của từ ngữ cần xóa.",
        threadID,
      );
      break;
  }
};

module.exports.handleReply = ({ api, event }) => {
  const { threadID, body } = event;
  const indexToRemove = parseInt(body) - 1;

  if (isNaN(indexToRemove) || indexToRemove < 0) {
    api.sendMessage("Số thứ tự không hợp lệ.", threadID, event.messageID);
    return;
  }

  const dataPath = `${threadID}.json`;
  if (!fs.existsSync(dataPath)) {
    api.sendMessage("Danh sách từ ngữ hiện đang trống.", threadID, event.messageID);
    return;
  }

  const threadData = JSON.parse(fs.readFileSync(dataPath));
  if (indexToRemove >= threadData.length) {
    api.sendMessage(
      "Số thứ tự vượt quá số lượng từ ngữ trong danh sách.",
      threadID,
      event.messageID,
    );
    return;
  }

  const removedWord = threadData.splice(indexToRemove, 1)[0];
  fs.writeFileSync(dataPath, JSON.stringify(threadData, null, 2));
  api.sendMessage(
    `Từ ngữ "${removedWord}" đã được xóa khỏi danh sách.`,
    threadID,
    event.messageID,
  );
};
