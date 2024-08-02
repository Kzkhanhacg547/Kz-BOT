const fs = require("fs-extra");
const path = require("path");

module.exports.run = async ({ api, event, args }) => {
  const folderPath = args[0] || __dirname; // Đường dẫn thư mục mặc định là thư mục của script

  try {
    const files = await fs.readdir(folderPath);

    if (files.length === 0) {
      return api.sendMessage("Thư mục trống rỗng.", event.threadID, event.messageID);
    }

    const fileDetails = await Promise.all(files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);

      let details = `${file} - ${((stats.size / 1024)).toFixed(2)} KB`;

      if (stats.isDirectory()) {
        details += ` - ${await countFilesInDirectory(filePath)} file`;
      } else if (path.extname(file) === ".json" || path.extname(file) === ".txt") {
        const content = await fs.readFile(filePath, "utf-8");
        const lineCount = content.split(/\r\n|\r|\n/).length; // Tính số dòng
        details += ` - ${lineCount} dòng`;
      }

      return details;
    }));

    const message = `Danh sách các file:\n${fileDetails.map((detail, index) => `${index + 1}. ${detail}`).join("\n")}`;
    return api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, event.threadID, event.messageID);
  }
};

async function countFilesInDirectory(directory) {
  const files = await fs.readdir(directory);
  return files.length;
}

module.exports.config = {
  name: "show",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kz Khánhh",
  description: "xem file",
  commandCategory: "hệ thống",
  usages: "show + đường dẫn đến thư mục chứa file",
  cooldowns: 5,
  dependencies: {
    request: "",
    "fs-extra": "",
  },
};
