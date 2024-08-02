

module.exports.config = {
    name: "chamhoi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your name",
    description: "Chọn ngẫu nhiên một câu trả lời cho câu hỏi của bạn.",
    commandCategory: "Fun",
    usages: "[câu hỏi]",
    cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    const answers = [
      "Có lẽ là có.",
        "Không chắc chắn lắm.",
        "Hãy thử lại sau.",
        "Chắc chắn là không.",
        "Tôi không biết.",
        "Đương nhiên là có!",
        "Không nên nghĩ đến điều đó.",
        "Tất nhiên là không!",
        "Rất có thể."
    ];

    if (!args[0]) return out("Vui lòng đặt một câu hỏi.");

    const question = args.join(" ").toLowerCase();

    if (!question.endsWith("không?")) {
        return out("Vui lòng đặt câu hỏi theo dạng 'Vấn đề + không?'");
    }

    const randomIndex = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers[randomIndex];

    out(`Câu trả lời cho câu hỏi của bạn: ${randomAnswer}`);
};
