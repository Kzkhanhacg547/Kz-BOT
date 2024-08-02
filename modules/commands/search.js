module.exports.config = {
  name: "search",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁",
  description: "Basic Google Search",
  commandCategory: "Noprefix",
  usages: "google (câu hỏi)",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
  const google = require("googlethis");
  const searched = args.join(' ');  // Sử dụng join thay vì replace để có câu hỏi gọn gàng hơn
  const options = {
    page: 0,
    safe: false,
    additional_params: { hl: 'vi' } // Đổi ngôn ngữ sang tiếng Việt
  };

  try {
    const response = await google.search(searched, options);
    const results = response.results;

    if (results.length === 0) {
      return api.sendMessage(`Không tìm thấy kết quả nào cho: ${searched}`, event.threadID, event.messageID);
    }

    let msg = `===== 𝗧𝗜̀𝗠 𝗞𝗜𝗘̂́𝗠 𝗚𝗢𝗢𝗚𝗟𝗘 =====\n\n`;
    msg += `🔎 Bạn đã tìm: ${searched}\n\n`;
    msg += `==========================\n\n`;

    results.slice(0, 3).forEach((result, index) => {
      msg += `■ Tiêu đề:\n ${result.title}\n`;
      msg += `\n📝 Mô tả:\n [${index + 1}]. ${result.description}\n`;
      msg += `\n🔗 Đường dẫn:\n [${index + 1}]. ${result.url}\n`;
      msg += `\n==========================\n\n`;
    });

    return api.sendMessage(msg, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage(`Đã xảy ra lỗi khi tìm kiếm: ${error.message}`, event.threadID, event.messageID);
  }
};
