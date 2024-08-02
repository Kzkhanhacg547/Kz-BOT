module.exports.config = {
    name: "xemgio",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Xem giờ hiện tại ở một số quốc gia trên thế giới",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    try {
        // Lấy thời gian hiện tại của một số quốc gia
        const timeData = [
            { country: "United States", timeZone: "America/New_York" },
            { country: "United Kingdom", timeZone: "Europe/London" },
            { country: "Japan", timeZone: "Asia/Tokyo" },
            { country: "Australia", timeZone: "Australia/Sydney" },
            { country: "Vietnam", timeZone: "Asia/Ho_Chi_Minh" },
            { country: "Germany", timeZone: "Europe/Berlin" },
            { country: "Canada", timeZone: "America/Toronto" },
            { country: "Brazil", timeZone: "America/Sao_Paulo" },
            { country: "India", timeZone: "Asia/Kolkata" },
            { country: "Russia", timeZone: "Europe/Moscow" },
            { country: "China", timeZone: "Asia/Shanghai" },
            { country: "South Korea", timeZone: "Asia/Seoul" },
            { country: "France", timeZone: "Europe/Paris" },
            { country: "Italy", timeZone: "Europe/Rome" },
            { country: "Mexico", timeZone: "America/Mexico_City" },
            { country: "Spain", timeZone: "Europe/Madrid" },
            { country: "Argentina", timeZone: "America/Argentina/Buenos_Aires" },
            { country: "Turkey", timeZone: "Europe/Istanbul" },
            { country: "Thailand", timeZone: "Asia/Bangkok" },
            { country: "Indonesia", timeZone: "Asia/Jakarta" },
            { country: "Philippines", timeZone: "Asia/Manila" },
            { country: "Egypt", timeZone: "Africa/Cairo" },
            { country: "Saudi Arabia", timeZone: "Asia/Riyadh" }
            // Thêm các quốc gia khác ở đây
        ];

        let message = "Thời gian hiện tại ở một số quốc gia trên thế giới:\n";

        for (const { country, timeZone } of timeData) {
            const time = new Date().toLocaleString("en-US", { timeZone, timeStyle: "short", hour12: true });
            message += `🌍 ${country}: ${time}\n`;
        }

        return out(message);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi lấy thông tin thời gian. Vui lòng thử lại sau.");
    }
};
