const fs = require('fs-extra');
const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
    name: "animenopre",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "Kz Khánh",
    description: "Anime noprefix module",
    commandCategory: "Utility",
    usages: "Noprefix",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "axios": "",
        "moment-timezone": ""
    }
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.handleEvent = async ({ event, api, Users }) => {
    const { threadID, messageID, body, senderID } = event;
    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["anime"] !== "undefined" && thread["anime"] === false) return;

    const API = global.config.API.domain1;
    const timeStart = Date.now();
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
    const thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd')
        .replace('Sunday', 'Chủ Nhật')
        .replace('Monday', 'Thứ Hai')
        .replace('Tuesday', 'Thứ Ba')
        .replace('Wednesday', 'Thứ Tư')
        .replace('Thursday', 'Thứ Năm')
        .replace('Friday', 'Thứ Sáu')
        .replace('Saturday', 'Thứ Bảy');

    if (senderID === api.getCurrentUserID()) return;

    const namebot = global.config.BOTNAME;
    const PREFIX = global.config.PREFIX;
    const { commands } = global.client;

    const sendMessage = (data) => api.sendMessage(data, threadID, messageID);

    try {
        const [thinhRes, ...animeRes] = await Promise.all([
            axios.get(`${API}/thinh`),
            ...Array(6).fill().map(() => axios.get(`${API}/anime`))
        ]);

        const thinh = thinhRes.data.data;
        const attachments = await Promise.all(animeRes.map(res => 
            global.nodemodule["axios"]({ url: res.data.url, method: "GET", responseType: "stream" })
                .then(response => response.data)
        ));

        const msg = {
            body: `𖤛𖤐==『 𝐀𝐧𝐢𝐦𝐞'𝐬 𝐏𝐡𝐨𝐭𝐨 』==𖤐𖤛\nღ 𝐓𝐡í𝐧𝐡: ${thinh}\n❏ 𝐏𝐫𝐞𝐟𝐢𝐱: ${PREFIX}\n✯ 𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}ms\n\n➠Bot đã online ${hours} giờ ${minutes} phút ${seconds} giây\n➠𝐍𝐨𝐰: ${thu}\n      ${gio}\n━━━━━━━━━━━━━`,
            attachment: attachments
        };

        const triggerWords = ["anime", "ANIME", "Anime"];
        if (triggerWords.some(word => body === word)) {
            sendMessage(msg);
        }
    } catch (error) {
        console.error("Error in handleEvent:", error);
        sendMessage("An error occurred while processing your request.");
    }
};

module.exports.languages = {
    "vi": {
        "on": "Bật",
        "off": "Tắt",
        "successText": "anime thành công",
    },
    "en": {
        "on": "on",
        "off": "off",
        "successText": "anime success!",
    }
};

module.exports.run = async function({ api, event, Threads, getText }) {
    const { threadID, messageID } = event;
    let data = (await Threads.getData(threadID)).data;

    data["anime"] = !data["anime"];

    await Threads.setData(threadID, { data });
    global.data.threadData.set(threadID, data);
    return api.sendMessage(`${(data["anime"] ? getText("on") : getText("off"))} ${getText("successText")}`, threadID, messageID);
};