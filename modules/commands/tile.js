module.exports.config = {
    name: "tile", //tỉ lệ hợp nhau
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Team Mirai",//mod lại by Kz Khánhh
    description: "Xem tỉ lệ hợp đôi giữa 2 người",
    commandCategory: "Game",
    usages: "[tag]",
    cooldowns: 20,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn xem tỉ lệ hợp nhau", event.threadID);
    var name = (await Users.getData(mention)).name
    var namee = (await Users.getData(event.senderID)).name
    var tle = Math.floor(Math.random() * 101);

    var arraytag = [];
        arraytag.push({id: mention, tag: name});
        arraytag.push({id: event.senderID, tag: namee});
    var mentions = Object.keys(event.mentions)

        let Avatar = (await axios.get( `https://graph.facebook.com/${mentions}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );        


       var imglove = [];
              
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
        var msg = {body: `⚡️𝐓𝐢̉ 𝐥𝐞̣̂ 𝐡𝐨̛̣𝐩 đ𝐨̂𝐢⚡️\n ${namee} 💞 ${name}: ${tle}% 🥰\n🚫Đ𝐚𝐧𝐠 𝐩𝐡𝐮̣𝐜 𝐡𝐨̂̀𝐢 𝐬𝐮̛́𝐜 𝐥𝐮̛̣𝐜 : 𝟐𝟎 𝐠𝐢𝐚̂𝐲`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
}