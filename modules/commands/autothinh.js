const axios = require('axios');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const request = require('request');

module.exports.config = {
    name: 'autothinh',
    version: '10.03',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống',
    usages: '[]',
    cooldowns: 3
};

module.exports.onLoad = async function(o) {
    setInterval(async () => {
        const now = moment().tz("Asia/Ho_Chi_Minh");
        const minutes = now.minutes();

        if (minutes === 15 || minutes === 45) {
            const thinh = await fetchThinh();
            const formattedMessage = formatMessage(thinh);

            const msg = {
                body: formattedMessage,
                attachment: await fetchAnimeAttachment()
            };

            global.data.allThreadID.forEach(threadID => o.api.sendMessage(msg, threadID));
        }
    }, 60000); // Check every minute
};

module.exports.run = async function(o) {
    try {
        const { api, event, args } = o;
        const { threadID, messageID } = event;
        const location = args.join(" ");

        if (!location) {
            return api.sendMessage("Nhập tỉnh/tp cần xem thời tiết", threadID);
        }

        const weatherForecast = await fetchWeatherForecast(location);
        const formattedForecast = formatForecast(weatherForecast, location);

        api.sendMessage(formattedForecast, threadID, messageID);
    } catch (error) {
        api.sendMessage(`Error: ${error.message}`, threadID);
    }
};

async function fetchThinh() {
    const response = await axios.get('https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/thinh');
    return response.data.data;
}

async function fetchAnimeAttachment() {
    const animeUrl = (await axios.get('https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/vdanime')).data.data;
    const animeResponse = await axios.get(animeUrl, { responseType: 'stream' });
    return animeResponse.data;
}

function formatMessage(thinh) {
    const gio = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)");
    const message = `🌟═「 𝐀𝐔𝐓𝐎 𝐂𝐀̂𝐔 𝐓𝐇𝐈́𝐍𝐇 」═🌟
🔹─────────────🔹
⏰ 𝗧𝗶𝗺𝗲: ${gio}
 🔹─────────────🔹
💞 𝐂𝐚̂𝐮 𝐭𝐡𝐢́𝐧𝐡: ${thinh}
 🔹─────────────🔹
❤️ 𝐂𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝐭𝐚́𝐧 𝐝𝐨̂̉ 𝐜𝐫𝐮𝐬𝐡 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠
 🔹─────────────🔹
🌟 ═════════════🌟`;
    return message;
}

async function fetchWeatherForecast(location) {
    const response = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(location)}`);
    return response.data[0].forecast;
}

function formatForecast(forecast, location) {
    let text = `Thời tiết của: ${location} vào các ngày`;
    forecast.slice(0, 5).forEach((day, index) => {
        text += `\n${index + 1}-> ${day.day} ${day.date}\n=>Nhiệt độ dự báo: từ ${day.low} đến ${day.high}\n=>Mô tả: ${day.skytextday}\n=>Tỷ lệ mưa: ${day.precip}\n`;
    });
    return text;
}
