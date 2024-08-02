module.exports.config = {
  name: "tbout",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "K bt",
  description: "tb out box",
  commandCategory: "Tiện ích",
  usages: "[event]",
  cooldowns: 3
}

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const { threadID, userID } = event;
  const threadInfo = await api.getThreadInfo(threadID);
  const participantInfo = await api.getUserInfo(userID);
  const participantName = participantInfo[userID].name;
  const images = await axios.get("https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/anime");

  const imageUrls = images.data.map((image) => image.url);
  const message = {
    body: `👋 Tạm biệt ${participantName}`,
    attachment: imageUrls,
    mentions: [
      {
        tag: participantName,
        id: userID,
      },
    ],
  };

  api.sendMessage(message, threadID);
};