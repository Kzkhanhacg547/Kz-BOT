module.exports.config = {
    name: "noprefixvoice",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 10,
    dependencies: {
        "fs": "",
        "request": ""
    }
};

module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/Kz/`;

    // Cocainit
    if (!fs.existsSync(dirMaterial + "cocainit")) {
        fs.mkdirSync(dirMaterial, { recursive: true });
        if (!fs.existsSync(dirMaterial + "cocainit.mp3")) {
            request("https://i.imgur.com/Vv7kJxa.mp4").pipe(fs.createWriteStream(dirMaterial + "cocainit.mp3"));
        }
    }

    // haha
    if (!fs.existsSync(dirMaterial + "haha")) {
        fs.mkdirSync(dirMaterial, { recursive: true });
        if (!fs.existsSync(dirMaterial + "haha.mp3")) {
            request("https://i.imgur.com/XhOs0aw.mp4").pipe(fs.createWriteStream(dirMaterial + "haha.mp3"));
        }
    }

    // xinloiduocchua
    if (!fs.existsSync(dirMaterial + "so_ly_friend")) {
        fs.mkdirSync(dirMaterial, { recursive: true });
        if (!fs.existsSync(dirMaterial + "so_ly_friend.mp3")) {
            request("https://i.imgur.com/wQNieH9.mp4").pipe(fs.createWriteStream(dirMaterial + "so_ly_friend.mp3"));
        }
    }

    // Hetcuu
    if (!fs.existsSync(dirMaterial + "hetcuu")) {
        fs.mkdirSync(dirMaterial, { recursive: true });
        if (!fs.existsSync(dirMaterial + "hetcuu.mp3")) {
            request("https://i.imgur.com/mJDnTXC.mp4").pipe(fs.createWriteStream(dirMaterial + "hetcuu.mp3"));
        }
    }
};

module.exports.handleEvent = async ({ event, api, Currencies, Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID);

    // Cocainit
    if (["xin file", "xin", "xin mdl", "xin với", "ước có", "cho xin đi"].includes(event.body.toLowerCase())) {
        var msg = {
            body: ``,
            attachment: fs.createReadStream(__dirname + `/Kz/cocainit.mp3`)
        };
        return api.sendMessage(msg, event.threadID, event.messageID);
    }

    // Hetcuu
    if (["hết cứu", "cứu sao", "h sao cứu", "cứu với", "cứu", "help", "Hetcuu"].includes(event.body.toLowerCase())) {
        var msg = {
            body: `𝐗𝐢𝐧 𝐜𝐡𝐚̀𝐨 ${name}\nĐ𝐚̂𝐲 𝐥𝐚̀ 𝐥𝐨̛̀𝐢 𝐧𝐡𝐚̆́𝐧 𝐜𝐮̉𝐚 𝐛𝐨𝐭`,
            attachment: fs.createReadStream(__dirname + `/Kz/hetcuu.mp3`)
        };
        return api.sendMessage(msg, event.threadID, event.messageID);
    }

    // haha
    if (["kkk", "mắc cười", "haha", "buồn cười", "hhh"].includes(event.body.toLowerCase())) {
        var msg = {
            body: ``,
            attachment: fs.createReadStream(__dirname + `/Kz/haha.mp3`)
        };
        return api.sendMessage(msg, event.threadID, event.messageID);
    }

    // xinloiduocchua
    if (["xin lỗi đi", "xin loi di", "giận", "dỗi", "ác", "không vui", "cút", "ghét", "không vui đi", "không vui đâu", "đùa không vui", "đùa không vui đâu", "dỗi rồi", "giận rồi"].includes(event.body.toLowerCase())) {
        var msg = {
            body: ``,
            attachment: fs.createReadStream(__dirname + `/Kz/so_ly_friend.mp3`)
        };
        return api.sendMessage(msg, event.threadID, event.messageID);
    }
};

module.exports.run = async ({ event, api, Currencies, args, utils }) => {
    return api.sendMessage("Noprefix mà dùng như này là dở rồi", event.threadID);
};
