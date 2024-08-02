module.exports.config = {
    name: "catfact",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Gửi một sự thật thú vị về mèo.",
    commandCategory: "Hình ảnh - Âm thanh",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function ({ api, event }) {
    const axios = require('axios');
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    try {
        const response = await axios.get('https://catfact.ninja/fact');
        const catFact = response.data.fact;

        return out(`Sự thật thú vị về mèo:\n${catFact}`);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi tìm kiếm sự thật về mèo. Vui lòng thử lại sau.");
    }
};
