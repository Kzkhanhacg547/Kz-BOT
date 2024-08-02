const axios = require('axios');

module.exports.config = {
    name: "randomquote",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Gửi một trích dẫn ngẫu nhiên.",
    commandCategory: "Random",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quoteData = response.data;

        const quote = `"${quoteData.content}" - ${quoteData.author}`;

        return out(quote);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi lấy trích dẫn. Vui lòng thử lại sau.");
    }
};
