const API = global.config.API.domain1;
const moment = require("moment-timezone");
const axios = require('axios');

module.exports.config = {
    name: "adduser",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Thêm người dùng vào nhóm bằng link hoặc uid",
    commandCategory: "Box",
    usages: "[args]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads, Users }) {
    const { threadID, messageID } = event;
    const currentTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

    const imageUrls = await Promise.all(Array.from({ length: 2 }, async () => {
        const res = await axios.get(`${API}/loli`);
        return res.data.url;
    }));

    const attachments = await Promise.all(imageUrls.map(async (url) => {
        return (await axios({
            url,
            method: "GET",
            responseType: "stream"
        })).data;
    }));

    if (!args[0]) {
        return api.sendMessage({
            body: `=====『 𝐌𝐄𝐍𝐔 𝐀𝐃𝐃𝐔𝐒𝐄𝐑 』=====\n◆━━━━━━━━━━━━━◆\n1. 𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠 𝐚𝐝𝐝𝐮𝐬𝐞𝐫 + 𝐥𝐢𝐧𝐤 𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤\n2. 𝐁𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐝𝐮̀𝐧𝐠 𝐚𝐝𝐝𝐮𝐬𝐞𝐫 + 𝐮𝐢𝐝\n${currentTime}\n━━━━━━━━━━━━━━━━━━\n`,
            attachment: attachments
        }, threadID, messageID);
    }

    const link = args.join(" ");
    const { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);

    let uidUser;
    if (link.includes(".com/")) {
        const res = await api.getUID(args[0] || event.messageReply.body);
        uidUser = res;
    } else {
        uidUser = args[0];
    }

    api.addUserToGroup(uidUser, threadID, (err) => {
        if (participantIDs.includes(uidUser)) {
            return api.sendMessage('𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 đ𝐚̃ 𝐜𝐨́ 𝐦𝐚̣̆𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐨́𝐦', threadID, messageID);
        }
        if (err) {
            return api.sendMessage('𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐞̂𝐦 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦', threadID, messageID);
        }
        if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) {
            return api.sendMessage('Đ𝐚̃ 𝐭𝐡𝐞̂𝐦 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐝𝐮̀𝐧𝐠 𝐯𝐚̀𝐨 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐩𝐡𝐞̂ 𝐝𝐮𝐲𝐞̣̂𝐭', threadID, messageID);
        }
        return api.sendMessage('𝐓𝐡𝐞̂𝐦 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠', threadID, messageID);
    });
};
