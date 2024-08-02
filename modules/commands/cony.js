module.exports.config = {
    name: "cony",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Kz Khánh",
    description: "",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs-extra": "",
        "request": ""
    }
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.handleEvent = async ({
    args,
    event,
    api,
    Users
}) => {
    const fs = global.nodemodule["fs-extra"];
    const moment = require('moment-timezone');
    const timeStart = Date.now();
    const time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
    var thu =
        moment.tz('Asia/Ho_Chi_Minh').format('dddd');
    if (thu == 'Sunday') thu = 'Chủ Nhật'
    if (thu == 'Monday') thu = 'Thứ Hai'
    if (thu == 'Tuesday') thu = 'Thứ Ba'
    if (thu == 'Wednesday') thu = 'Thứ Tư'
    if (thu == "Thursday") thu = 'Thứ Năm'
    if (thu == 'Friday') thu = 'Thứ Sáu'
    if (thu == 'Saturday') thu = 'Thứ Bảy'
    var {
        threadID,
        messageID,
        body,
        senderID
    } = event;
    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["Cony"] !== "undefined" && thread["cony"] == false) return;
    const axios = require('axios')
    const pidusage = await global.nodemodule["pidusage"](process.pid);
    let name = await Users.getNameUser(event.senderID);
    if (senderID == api.getCurrentUserID()) return;
    const namebot = global.config.BOTNAME;
    const tle = Math.floor(Math.random() * 101);
    const { commands } = global.client;
    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }
    const res = await axios.get(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/thinh`);
    var thinh = res.data.data;
    //trả lời
    var msg = {
        body: `❏===『 𝐊𝐳 𝐁𝐎𝐓 』===❑
『 🤖』${namebot} 𝐝𝐮̛̣ đ𝐨𝐚́𝐧
『 🪪』𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠: ${name}
『 💓』𝐓𝐢̉ 𝐥𝐞̣̂ 𝐜𝐨́ 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐲𝐞̂𝐮 𝐜𝐮̉𝐚 ${name} 𝐭𝐫𝐨𝐧𝐠 𝐧𝐚̆𝐦 𝐧𝐚𝐲 𝐥𝐚̀: ${tle}%
 ➡️ 𝐓𝐚̣̆𝐧𝐠 ${name} 𝐜𝐚̂𝐮 𝐭𝐡𝐢́𝐧𝐡 đ𝐞̂̉ đ𝐢 𝐤𝐢𝐞̂́𝐦 𝐧𝐲:\n    ${thinh}`,
        attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/cony')).data.url,
            method: "GET",
            responseType: "stream"
        })).data
    }
    // Gọi bot
    var arr = ["Cony", "cony"];
    arr.forEach(i => {
        let str = i[0].toUpperCase() + i.slice(1);
        if (body === i.toUpperCase() | body === i | str === body) return out(msg)
    });
};

module.exports.languages = {
    "vi": {
        "on": "Bật",
        "off": "Tắt",
        "successText": "Cony thành công",
    },
    "en": {
        "on": "on",
        "off": "off",
        "successText": "hi success!",
    }
}

module.exports.run = async function ({
    api,
    event,
    Threads,
    getText
}) {
    const {
        threadID,
        messageID
    } = event;
    let data = (await Threads.getData(threadID)).data;

    if (typeof data["Cony"] == "undefined" || data["cony"] == true) data["Cony"] = false;
    else data["cony"] = true;

    await Threads.setData(threadID, {
        data
    });
    global.data.threadData.set(threadID, data);
    if ((data["Cony"] == false && getText("off") === "Bật") || (data["Cony"] == true && getText("on") === "Bật")) return; // Kiểm tra xem đã phản hồi chưa
    return api.sendMessage(`${(data["Cony"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
