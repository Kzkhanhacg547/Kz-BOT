const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "checkcam",
  version: "1.1.0",
  hasPermission: 2,
  credits: "Kz Khánhh",
  description: "Tự động gửi file mới được thêm vào thư mục tới admin",
  commandCategory: "Hệ thống",
  usages: "[clean | sent]",
  cooldowns: 5,
  dependencies: {
    request: "",
    "fs-extra": "",
  },
};

module.exports.run = async ({ api, event, args, permssion }) => {
  const folderPath = path.resolve('./checkcam');

  if (args[0] === "sent") {
    try {
      const files = fs.readdirSync(folderPath);
      const attachments = [];

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          attachments.push(fs.createReadStream(filePath));
        }
      }

      if (attachments.length > 0) {
        api.sendMessage(
          {
            body: `Gửi ${attachments.length} file từ thư mục 1checkcam:`,
            attachment: attachments,
          },
          event.threadID
        );
      } else {
        api.sendMessage("Không có file nào trong thư mục 1checkcam.", event.threadID);
      }
    } catch (error) {
      console.error('Error sending files:', error);
      api.sendMessage('Đã xảy ra lỗi khi gửi file.', event.threadID);
    }
    return;
  }

  if (args[0] === "clean") {
    if (permssion < 1) return api.sendMessage("[𝐅𝐁 𝐀𝐃𝐌𝐈𝐍]→ https://fb.me/kzkhanh547 !! ❤️", event.threadID);
    try {
      const files = fs.readdirSync(folderPath);
      const extensions = [".m4a", ".mp4", ".png", ".jpg", ".gif", ".mp3"];
      for (const file of files) {
        for (const extension of extensions) {
          if (file.endsWith(extension)) {
            fs.unlinkSync(path.join(folderPath, file));
          }
        }
      }
      console.log("Dữ liệu đã được xóa.");
      api.sendMessage("Dữ liệu đã được xóa.", event.threadID);
    } catch (error) {
      console.error('Error cleaning cache:', error);
      api.sendMessage('Đã xảy ra lỗi khi xóa dữ liệu.', event.threadID);
    }
    return;
  }

  console.log(`Đang theo dõi thư mục ${folderPath}...`);
  fs.watch(folderPath, async (eventType, filename) => {
    if (eventType === 'rename' || eventType === 'change') {
      console.log(`File ${filename} đã được thêm hoặc thay đổi.`);
      try {
        const filePath = path.join(folderPath, filename);
        api.sendMessage({
          body: `File ${filename} đã được thêm hoặc thay đổi.`,
          attachment: fs.createReadStream(filePath),
        }, event.threadID);
      } catch (error) {
        console.error('Error sending file to admin:', error);
      }
    }
  });
};