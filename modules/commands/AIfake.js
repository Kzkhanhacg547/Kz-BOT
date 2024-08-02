const axios = require('axios');

module.exports.config = {
    name: "assistant",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Trả lời câu hỏi một cách thú vị và ngẫu nhiên(Assistant nhưng lạ lắm)",
    commandCategory: "random",
    usages: "[câu hỏi]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    if (!args.length) return out("Vui lòng nhập câu hỏi của bạn.");

    const question = args.join(" ");

    try {
        const response = await axios.get("https://api.api-ninjas.com/v1/jokes?limit=1", {
            headers: {
                "X-Api-Key": "KL7BwtUJl6ekFqqAf0VWPA==cQ0C8SP9Z7DCQmQj"
            }
        });

        const joke = response.data[0].joke;

        const answers = [
            `Câu trả lời của tôi là: ${joke}`,
            `Tôi không biết câu trả lời chính xác, nhưng câu trả lời của tôi là: ${joke}`,
            `Một câu trả lời thú vị là: ${joke}`,
            `Đây là câu trả lời ngẫu nhiên của tôi: ${joke}`
        ];

        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        return out(randomAnswer);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi lấy câu trả lời. Vui lòng thử lại sau.");
    }
};