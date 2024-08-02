const axios = require("axios");
const moment = require("moment-timezone");

const linkapi = "https://api-7izq.onrender.com/infofacebook";

module.exports = {
    config: {
        name: "facebook info",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "tnt",
        description: "",
        commandCategory: "Tiện ích",
        usages: "",
        cooldowns: 5
    },

    run: ({ api, event, args }) => {},    

    handleEvent: async ({ api, event }) => {
        const { body, senderID, threadID, messageID } = event;
        const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

        if (!body || (!body.includes('https://www.facebook.com/')) || senderID === api.getCurrentUserID()) return;

        try {
            const fbLinkPattern = /https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)/;
            const linkMatch = body.match(fbLinkPattern);
            if (!linkMatch) return;

            const profileURL = linkMatch[0];
            const uidResponse = await axios.get(https://fbuid.mktsoftware.net/api/v1/fbprofile?url=${profileURL});
            const uid = uidResponse.data.uid;

            if (!uid) {
                throw new Error("UID extraction failed.");
            }


            const response = await axios.get(${linkapi}?id=${uid});
            const { name, avtlink, birthday, follower, created_time, username, tichxanh } = response.data; 
            const stream = await axios.get(avtlink, { responseType: "stream" });


            api.sendMessage({
                body: `👤 Tên: ${name}\n🎂 Sinh nhật: ${birthday}\n🌐 Uid: ${uid}\n📧 Username: ${username}\n😻 Số theo dõi: ${follower}\n📝 Ngày tạo nick: ${created_time}\n✅ Tích xanh: ${tichxanh}\n⏰ Thời gian: ${gio}`,
                attachment: stream.data
            }, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("Đã xảy ra lỗi khi lấy thông tin người dùng.", threadID, messageID);
        }
    }
};