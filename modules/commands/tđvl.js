const request = require("request");
const fs = require("fs");

module.exports.config = {
  name: "tđvl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "",
  description: "Thực hiện hành động với người bạn tag",
  commandCategory: "Hành động",
  usages: "<đá|đấm|yêu|vả> [tag]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const actions = {
    "đá": [
      "https://i.postimg.cc/65TSxJYD/2ce5a017f6556ff103bce87b273b89b7.gif",
      "https://i.postimg.cc/65SP9jPT/Anime-083428-6224795.gif",
      "https://i.postimg.cc/RFXP2XfS/jXOwoHx.gif",
      "https://i.postimg.cc/jSPMRsNk/tumblr-nyc5ygy2a-Z1uz35lto1-540.gif"
    ],
    "đấm": [
      "https://i.imgur.com/RfOn1ww.gif",
      "https://i.postimg.cc/SNX8pD8Z/13126.gif",
      "https://i.postimg.cc/TYZb2gJT/146.g7506881-1016b5fd386cf30488508cf6f0a2bee5.gif",
      "https://i.postimg.cc/fyV3DR33/anime-punch.gif",
      "https://i.postimg.cc/P5sLnhdx/onehit-30-5-2016-3.gif"
    ],
    "yêu": [
      "https://i.imgur.com/wbAH54b.gif"
    ],
    "vả": [
      "https://i.imgur.com/01vdqea.gif"
    ]
  };

  const action = args[0];
  if (!action || !actions[action]) {
    return api.sendMessage("Vui lòng chọn hành động: đá, đấm, yêu, hoặc vả.", event.threadID, event.messageID);
  }

  const mention = Object.keys(event.mentions);
  if (mention.length === 0) {
    return api.sendMessage("Vui lòng tag 1 người.", event.threadID, event.messageID);
  }

  const tag = event.mentions[mention].replace("@", "");
  const link = actions[action][Math.floor(Math.random() * actions[action].length)];

  const callback = () => api.sendMessage({
    body: `${tag} ${action === 'yêu' ? '𝗧𝗼̛́ 𝗬𝗲̂𝘂 𝗖𝗮̣̂𝘂 𝗩𝗟' : `dám cãi lời tao à`} 🎀`,
    mentions: [{ tag: tag, id: mention[0] }],
    attachment: fs.createReadStream(__dirname + "/cache/action.gif")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/action.gif"));

  return request(encodeURI(link)).pipe(fs.createWriteStream(__dirname + "/cache/action.gif")).on("close", () => callback());
};
