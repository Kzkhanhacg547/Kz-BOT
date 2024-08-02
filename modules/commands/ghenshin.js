module.exports.config = {
    "name": "genshin",
    "version": "1.0.0",
    "hasPermssion": 0,
    "credits": "DC-Nam",
    "description": "Tỉ lệ ra nhân vật 5 sao trong genshin",
    "commandCategory": "Game",
    "usages": "genshin",
    "cooldowns": 0
};
module.exports.run = async function({ api, event, Users }) {
    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
    const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
    axios.get('https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/vdghenshin').then(res => {
    let callback = function () {
          api.sendMessage({
            body : `℃húc mừng ${name} đã ra nhân vật này\n🧐 Tỉ lệ ra nhân vật này của bạn là: ${tle}%`,attachment: fs.createReadStream(__dirname + '/cache/genshin.mp4')
          }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/genshin.mp4'), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/genshin.mp4')).on("close", callback);
      })
}
