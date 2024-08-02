module.exports.config = {
    name: "in4url",
    version: "1.0.0", 
    hasPermssion: 0,
    credits: "ChatGPT",
    description: "Lấy thông tin từ URL và hiển thị trong cuộc trò chuyện",
    commandCategory: "Utility",
    usages: "[URL]",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require('axios');

    // Kiểm tra xem đã nhập URL hay chưa
    if (!args[0]) {
        return api.sendMessage("Vui lòng nhập URL để lấy thông tin!", event.threadID, event.messageID);
    }

    try {
        // Lấy thông tin từ URL
        const response = await axios.get(args[0]);

        // Hiển thị thông tin trong cuộc trò chuyện
        api.sendMessage(`Thông tin từ URL: ${args[0]}:\n${response.data}`, event.threadID, event.messageID);
    } catch (error) {
        // Bắt lỗi nếu không thể lấy thông tin từ URL
        api.sendMessage("Không thể lấy thông tin từ URL!", event.threadID, event.messageID);
    }
};
