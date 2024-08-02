module.exports.config = {
    name: "alobot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Gọi Mèo Xanh Version 3",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 2,
    dependencies: {}
};

module.exports.handleReply = async function({ api, args, Users, event, handleReply }) {
    var name = await Users.getNameUser(event.senderID);
    switch (handleReply.type) {
        case "reply":
            {
                var idad = global.config.ADMINBOT;
                for (let ad of idad) {
                    api.sendMessage({
                        body: "=== 『 𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶 𝗧𝘂̛̀ 𝗨𝘀𝗲𝗿 』 ====\n━━━━━━━━━━━━━━━━━━\n\n" + name + ":\n→ 𝗡𝗼̣̂𝗶 𝗗𝘂𝗻𝗴:" + event.body,
                        mentions: [{
                            id: event.senderID,
                            tag: name
                        }]
                    }, ad, (e, data) => global.client.handleReply.push({
                        name: this.config.name,
                        messageID: data.messageID,
                        messID: event.messageID,
                        author: event.senderID,
                        id: event.threadID,
                        type: "goimeoxanh"
                    }))
                }
                break;
            }
        case "goimeoxanh":
            {
                api.sendMessage({ body: `=== 『 𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 』===\n━━━━━━━━━━━━━━━━━━\n\n→ [🧸] 𝗚𝘂̛̉𝗶 𝘁𝘂̛̀ 𝗮𝗱𝗺𝗶𝗻: ${name}\n→ [💓] 𝗡𝗼̣̂𝗶 𝗗𝘂𝗻𝗴: ${event.body}\n\n→ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝗯𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻 🐧`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
                    name: this.config.name,
                    author: event.senderID,
                    messageID: data.messageID,
                    type: "reply"
                }), handleReply.messID);
                break;
            }
    }
};

module.exports.handleEvent = async({ event, api, Users, Threads }) => {
    var { threadID, messageID, body, senderID } = event;
    if (senderID == global.data.botID) return;

    const moment = require("moment-timezone");
    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    let name = await Users.getNameUser(event.senderID);
    var idbox = event.threadID;
    let uidUser = event.senderID;
    let dataThread = await Threads.getData(event.threadID);
    let threadInfo = dataThread.threadInfo;
    const listAdmin = global.config.ADMINBOT;

    var tl = [
        "Meo meo, yêu thương em nhé! 😻",
        "Hi, chào bạn yêu của mèo! 😺",
        "Meo meo, có gì cần mèo giúp không? 🐾",
        "Dạ, có em đây, mèo xanh xin nghe! 🐱",
        `${name}, sử dụng 'callad' để liên lạc với admin nha!`,
        `${name}, gọi em có việc gì thế?`,
        `${name}, yêu mèo không mà gọi meo meo? 😿`,
        `${name}, tôi yêu bạn nhiều lắm! ❤`,
        `${name}, bạn có yêu mèo không? 😽`,
        `${name}, dạ có em đây, meo! 🐾`,
        `${name}, yêu admin mèo đi rồi hãy gọi! 🐾`,
        `${name}, cần mèo giúp gì không? 🐱`,
        `${name}, yêu mèo xanh không? 💙`,
        `${name}, em dỗi rồi, không chơi với bạn nữa huhu 🥺`,
        `${name}, hmmmmm, gọi mèo xanh có việc gì không dạ?`,
        `${name}, mèo xanh có thể giúp gì bạn nhỉ? 🐱`,
        `${name}, cần mèo giúp gì không? Meo! 🐾`,
        `${name}, tương tác đi nào! Meo meo! 🐱`,
        `${name}, mèo xanh đây, bạn yêu cần gì? 😻`,
        `${name}, không sao đâu, mèo đây rồi! 😇`,
        `${name}, mèo xanh đây, cần gì giúp bạn yêu? ❤️`
    ];

    var rand = tl[Math.floor(Math.random() * tl.length)];

    // Gọi mèo xanh
    var arr = ["mèo xanh", "mèo xanh ơi", "kick mèo xanh đi", "admin", "Kz Khánhh", "@Kz Khánhh", "bé ơi", "vợ ơi", "box", "mèo xanh oi", "yêu mèo xanh", "mèo xanh đâu", "kick mèo xanh", "xin"];
    arr.forEach(value => {
        let str = value[0].toUpperCase() + value.slice(1);
        if (body === value.toUpperCase() || body === value || str === body) {
            let nameT = threadInfo.threadName;
            modules = "------ Gọi mèo xanh ------\n";
            console.log(modules, value + "|", nameT);
            api.sendMessage(rand, threadID, () => {
                var idad = listAdmin;
                for (var idad of listAdmin) {
                    api.sendMessage(`=== 𝗚𝗢̣𝗜 𝗠𝗘̀𝗢 𝗫𝗔𝗡𝗛 ===\n━━━━━━━━━━━━━━━━━━\n\n→ [🧸] 𝗕𝗼𝘅 𝗡𝗮𝗺𝗲: ${nameT}\n→ [🌸] 𝗜𝗱 𝗕𝗼𝘅: ${idbox}\n→ [💓] 𝗡𝗮𝗺𝗲 𝗨𝘀𝗲𝗿: ${name} \n→ [👤] 𝗜𝗱 𝗨𝘀𝗲𝗿: ${uidUser}\n→ [⏰️] 𝗧𝗶𝗺𝗲: ${time}\n→ [🐒] 𝗚𝗼̣𝗶 𝗠𝗲̀𝗼 𝗫𝗮𝗻𝗵: ${value}\n\n⏰️= 『 ${time} 』=⏰️`,
                        idad, (error, info) =>
                        global.client.handleReply.push({
                            name: this.config.name,
                            author: senderID,
                            messageID: info.messageID,
                            messID: messageID,
                            id: idbox,
                            type: "goimeoxanh"
                        })
                    );
                }
            });
        }
    });
}

module.exports.run = async({ event, api }) => {
    return api.sendMessage("( \\_/)\n( •_•)\n// >🧠\nĐưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", event.threadID)
}
