module.exports.config = {
  name: "1",
  eventType: ["log:user-nickname"],
  version: "0.0.1",//beta
  credits: "ProCoderCyrus",
  description: "Chống đổi biệt danh của Bot"
};

module.exports.run = async function({ api, event, Users, Threads }) {
    var { logMessageData, threadID, author } = event;
    var botID = api.getCurrentUserID();
    var { BOTNAME, ADMINBOT } = global.config;
    var { nickname } = await Threads.getData(threadID, botID);
    var nickname = nickname ? nickname : BOTNAME;
    if (logMessageData.participant_id == botID && author != botID && !ADMINBOT.includes(author) && logMessageData.nickname != nickname) {
   api.changeNickname(`『 ${global.config.PREFIX } 』• ${(!global.config.BOTNAME) ? "𝐊𝐳 𝐁𝐨𝐭" : global.config.BOTNAME}`, threadID, botID) 
        var info = await Users.getData(author);
       return api.sendMessage({ body: `[WARN] - ${info.name} - chống đổi BD bot đc kích hoạt`}, threadID);
    }  
}