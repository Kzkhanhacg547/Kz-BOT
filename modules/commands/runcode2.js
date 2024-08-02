// Lệnh chạy đoạn code
module.exports.config = {
  name: "runcode2",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Your Team",
  description: "Chạy đoạn code.",
  commandCategory: "ADMIN",
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  if (event.senderID !== '100081129610697') {
    return api.sendMessage("Bạn không có quyền sử dụng lệnh này.", event.threadID, event.messageID);
  }

  try {
    const axios = global.nodemodule['axios'];
    const response = await axios.get(`${global.config.configApi.pin}${args.join(" ")}`);
    const result = JSON.stringify(response.data); // Chuyển đối tượng thành chuỗi JSON

    return api.sendMessage(`Kết quả: ${result}`, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Lỗi: ${error}`, event.threadID, event.messageID);
  }
};
