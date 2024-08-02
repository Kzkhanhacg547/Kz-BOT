const axios = require('axios');

module.exports.run = async ({ api, args, event }) => {
const link = args[0];

if (!link) {
return api.sendMessage('Bạn cần nhập đường link Pinterest cần down.', event.threadID);
}

try {
const response = await axios.get(`https://api-7izq.onrender.com/pinterest/down?link=${encodeURIComponent(link)}`);
const data = response.data;

// Gửi đường link ảnh 600x315
if (data.cover && data.cover['600x315']) {
const imgUrl = data.cover['600x315'].url;
await api.sendMessage(imgUrl, event.threadID);
}

// Gửi đường link video nếu có
if (data.urls && data.urls.V_720P) {
const videoUrl = data.urls.V_720P.url;
await api.sendMessage(videoUrl, event.threadID);
}
} catch (error) {
console.error(error);
api.sendMessage('Đã xảy ra lỗi khi thực hiện yêu cầu.', event.threadID);
}
};


module.exports.config = {
name: "pindown",
version: "1.0.4",
hasPermssion: 0,
credits: "Kz Khánhh",
description: "Down ảnh, video từ link pinterest",
commandCategory: "Tiện ích",
cooldowns: 5
};