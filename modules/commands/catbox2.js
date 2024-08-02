module.exports = {
  config: {
    name: 'catbox2',
    commandCategory: 'Tiện ích',
    hasPermission: 0,
    credits: 'Lê Minh Tiến',
    usages: 'chuyển ảnh, video, gif sang link catbox',
    description: 'chuyển ảnh, video, gif sang link catbox',
    cooldowns: 0
  },

  run: async (o) => {
    let send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
      msg = [];

    if (o.event.type !== "message_reply") return send("⚠️ Hình ảnh không hợp lệ, vui lòng phản hồi một video, ảnh nào đó");

    for (let i of o.event.messageReply.attachments) {
      await require('axios').get(`https://catbox-mnib.onrender.com/upload?url=${encodeURIComponent(i.url)}`).then(async ($) => {
        msg.push(`"${$.data.url}",\n`);
      });
    }

    return send(msg.join(''));
  }
};