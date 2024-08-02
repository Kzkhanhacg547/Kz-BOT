const axios = require('axios');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const request = require('request');

module.exports.config = {
    name: 'autott',
    version: '10.03',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống',
    usages: '[]',
    cooldowns: 3
};

const schedule = [
    { timer: '10:00:00 AM', message: ['\n{abc}'] },
    { timer: '8:00:00 AM', message: ['\n{abc}'] },
    { timer: '6:00:00 AM', message: ['\n{abc}'] },
    { timer: '12:21:00 PM', message: ['\n{abc}'] },
    { timer: '10:00:00 PM', message: ['\n{abc}'] },
    { timer: '8:00:00 PM', message: ['\n{abc}'] },
    { timer: '6:00:00 PM', message: ['\n{abc}'] },
    { timer: '4:00:00 PM', message: ['\n{abc}'] },
    { timer: '2:00:00 PM', message: ['\n{abc}'] },
    { timer: '12:00:00 PM', message: ['\n{abc}'] }
];

module.exports.onLoad = async function(o) {
    setInterval(async () => {
        const currentTime = new Date(Date.now() + 25200000).toLocaleString().split(/,/).pop().trim();
        const currentSchedule = schedule.find(s => s.timer === currentTime);

        if (currentSchedule) {
            const { message } = currentSchedule;
            const randomMessage = message[Math.floor(Math.random() * message.length)];
            const weatherData = await fetchWeatherData('Hà Nội');
            const uptime = process.uptime();

            const formattedMessage = formatMessage(randomMessage, weatherData, uptime);
            const animeAttachment = await fetchAnimeAttachment();

            const msg = {
                body: formattedMessage,
                attachment: animeAttachment
            };

            global.data.allThreadID.forEach(threadID => o.api.sendMessage(msg, threadID));
        }
    }, 1000);
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

async function fetchWeatherData(location) {
    const response = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(location)}`);
    return response.data[0];
}

async function fetchWeatherForecast(location) {
    const response = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(location)}`);
    return response.data[0].forecast;
}

function formatMessage(template, weatherData, uptime) {
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);

    const message = template
        .replace(/{abc}/g, formatWeatherData(weatherData))
        .replace(/{hours}/g, hours)
        .replace(/{minutes}/g, minutes)
        .replace(/{seconds}/g, seconds)
        .replace(/{time}/g, moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)"));

    return message;
}

function formatWeatherData(data) {
    return `===「𝗧𝗕 𝗧𝗵𝗼̛̀𝗶 𝗧𝗶𝗲̂́𝘁」===
━━━━━━━━━━━━━━
→『📌』𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝘁𝗵𝗼̛̀𝗶 𝘁𝗶𝗲̂́𝘁 𝘁𝗮̣𝗶: ${data.location.name}
→『⏰』𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${data.current.day} ${data.current.date}
→『🌡️』𝗡𝗵𝗶𝗲̣̂𝘁 đ𝗼̣̂: ${data.current.temperature}°${data.location.degreetype}
→『📋』𝗠𝗼̂ 𝘁𝗮̉: ${data.current.skytext}
→『☁️』đ𝗼̣̂ 𝗮̂̉𝗺: ${data.current.humidity}
→『💨』𝗛𝘂̛𝗼̛́𝗻𝗴 𝗴𝗶𝗼́: ${data.current.winddisplay}
→『📥』𝗚𝗵𝗶 𝗻𝗵𝗮̣̂𝗻 𝘃𝗮̀𝗼 𝗹𝘂́𝗰: ${data.current.observationtime}
→ 𝗧𝘂̛̀ 𝘁𝗿𝗮̣𝗺 𝘃𝘂̃ 𝘁𝗿𝘂̣ 🚀`;
}

async function fetchAnimeAttachment() {
    const animeUrl = (await axios.get(`https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/anime`)).data.data;
    const animeResponse = await axios.get(animeUrl, { responseType: 'stream' });
    return animeResponse.data;
}

function formatForecast(forecast, location) {
    let text = `Thời tiết của: ${location} vào các ngày`;
    forecast.slice(0, 5).forEach((day, index) => {
        text += `\n${index + 1}-> ${day.day} ${day.date}\n=>Nhiệt độ dự báo: từ ${day.low} đến ${day.high}\n=>Mô tả: ${day.skytextday}\n=>Tỷ lệ mưa: ${day.precip}\n`;
    });
    return text;
}
