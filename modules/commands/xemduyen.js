module.exports.config = {
    name: "xemduyen",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your name",
    description: "Xem mức độ duyên của bạn với một ai đó",
    commandCategory: "Other",
    usages: "[tên của bạn] | [tên của người đó]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const [yourName, theirName] = args.join(" ").split(" | ");

    if (!yourName || !theirName) return api.sendMessage("Vui lòng nhập đúng cú pháp: /xemduyen [tên của bạn] | [tên của người đó]", event.threadID);

    // Logic tính toán mức độ duyên ở đây (có thể là một số ngẫu nhiên)
    const duyen = Math.floor(Math.random() * 101); // Số ngẫu nhiên từ 0 đến 100

    api.sendMessage(`Mức độ duyên sống giữa ${yourName} và ${theirName}: ${duyen}%`, event.threadID);
}
