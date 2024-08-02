const axios = require("axios");
const fs = require("fs");
const request = require("request");

module.exports.config = {
    name: "tikinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "",
    description: "Retrieve TikTok user information",
    commandCategory: "Utilities",
    usages: "[username]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs": "",
        "request": ""
    },
    envConfig: {
        "apikey": "fOeckmtu"
    }
}

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    if (args.length === 0) {
        return api.sendMessage("Please enter a TikTok username.", threadID, messageID);
    }

    const username = args.join(" ");
    const apiUrl = `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(username)}`;

    try {
        const response = await axios.get(apiUrl);

        if (response.data.code !== 0) {
            return api.sendMessage("Failed to retrieve user information.", threadID, messageID);
        }

        const userData = response.data.data.user;
        const userStats = response.data.data.stats;

        const {
            nickname, verified, uniqueId, avatarLarger, signature, privateAccount
        } = userData;
        const {
            followerCount, followingCount, heart, diggCount, videoCount
        } = userStats;

        const userInfo = `===「USER TIKTOK」===\n\n` +
            `🤓 Name: ${nickname}\n` +
            `🔖 ID: ${uniqueId}\n` +
            `🐥 Link: https://tiktok.com/@${uniqueId}\n` +
            `${privateAccount ? "🔒 Private Account: Yes" : "🔓 Private Account: No"}\n` +
            `👀 Followers: ${followerCount}\n` +
            `♻️ Following: ${followingCount}\n` +
            `💗 Hearts: ${heart}\n` +
            `💞 Likes Given: ${diggCount} videos\n` +
            `📤 Videos Posted: ${videoCount}\n` +
            `📝 Bio: ${signature}\n` +
            `✅ Verified: ${verified ? "Yes" : "No"}`;

        const avatarPath = `${__dirname}/cache/${senderID}-info.png`;

        const sendMessage = () => api.sendMessage({
            body: userInfo,
            attachment: fs.createReadStream(avatarPath)
        }, threadID, () => fs.unlinkSync(avatarPath));

        request(avatarLarger).pipe(fs.createWriteStream(avatarPath)).on("close", sendMessage);

    } catch (error) {
        return api.sendMessage(`Error: ${error.message}`, threadID, messageID);
    }
};
