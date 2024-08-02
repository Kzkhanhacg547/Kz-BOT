const API = global.config.API.domain1;
const fs = require("fs-extra");
const request = require("request");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "ad",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Kz",
  description: "xem thông tin",
  commandCategory: "Admin",
  cooldowns: 5
};

module.exports.onLoad = () => {
  const dirMaterial = `${__dirname}/noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) {
    fs.mkdirSync(dirMaterial, { recursive: true });
  }
  if (!fs.existsSync(dirMaterial + "ad.gif")) {
    request("https://i.imgur.com/h03Z8AY.gif").pipe(fs.createWriteStream(dirMaterial + "ad.gif"));
  }
};


module.exports.run = async ({ event, api, args }) => {
  const { threadID, senderID } = event;

  if (!args[0]) {
    const msg = `==== [ 𝗠𝗘𝗡𝗨 𝗔𝗗𝗠𝗜𝗡 ] ====
━━━━━━━━━━━━━━━━━━
1. 𝐊𝐳_𝐊𝐡á𝐧𝐡 ( 𝗮𝗱𝗺𝗶𝗻 𝗰𝗵𝗶́𝗻𝗵 )
2. 𝐘𝐞̂́𝐧 𝐍𝐡𝐢👾
3. 𝐍𝐠ọ𝐜 𝐇â𝐧 🦨
4. 🐢

𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘁𝗵𝗲𝗼 𝘀𝗼̂́ đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝘂̉𝗮 𝗮𝗱𝗺𝗶𝗻 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺`;

    try {
      // Fetch video URL from the provided API
      const response = await axios.get(`${API}/vdnhac`);
      const videoUrl = response.data.url;

      // Download the video and save it temporarily
      const videoPath = path.join(__dirname, 'video.mp4');
      const videoResponse = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream'
      });

      videoResponse.data.pipe(fs.createWriteStream(videoPath));

      videoResponse.data.on('end', () => {
        // Send the video along with the message
        api.sendMessage({
          body: msg,
          attachment: fs.createReadStream(videoPath)
        }, threadID, (error, info) => {
          if (error) {
            console.error(error);
            return;
          }
          global.client.handleReply.push({
            type: "choose",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          });

          // Clean up: Delete the downloaded video file
          fs.unlink(videoPath, err => {
            if (err) console.error(err);
          });
        });
      });

    } catch (error) {
      console.error("Error fetching or sending video: ", error);
      return api.sendMessage("Có lỗi xảy ra khi lấy video. Vui lòng thử lại sau.", threadID);
    }
  }
};


module.exports.handleReply = async ({ event, api, handleReply, Users, Currencies }) => {
  const { threadID, senderID, messageID, body } = event;

  api.sendMessage("𝗫𝗶𝗻 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 đ𝗼̛̣𝗶 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘅𝘂̛̉ 𝗹𝘆́ !", threadID, (err, info) =>
    setTimeout(() => api.unsendMessage(info.messageID), 100000)
  );

  const nameUser = (await Users.getData(senderID)).name || (await Users.getInfo(senderID)).name;
  const data = (await Currencies.getData(senderID)).ghepTime;

  switch (handleReply.type) {
    case "choose": {
      const adminInfo = [
        {
          name: "𝐊𝐳_𝐊𝐡á𝐧𝐡",
          uid: "100081129610697",
          gender: "Nam",
          birthday: "10-11-27",
          location: "Hải Dương",
          facebook: "https://fb.me/kzkhanh547",
          note: "Cảm ơn vì đã sử dụng 🫧 𝐊𝐳_𝑩𝑶𝑻 🎀 ≧▽≦"
        },
        {
          name: "𝐘𝐞̂́𝐧 𝐍𝐡𝐢",
          nickname: "𝐂𝐡𝐢𝐁𝐢",
          birthyear: "2007",
          gender: "Nữ",
          birthday: "10 - 3",
          height: "1m65",
          hometown: "Ninh Bình",
          location: "Thành phố Hồ Chí Minh",
          zodiac: "Song Ngư",
          facebook: "https://www.facebook.com/yennhy27.chibi"
        },
        {
          name: "𝐍𝐠ọ𝐜 𝐇â𝐧",
          nickname: "𝐓𝐢𝐧𝐲",
          birthyear: "2007",
          gender: "Nữ",
          birthday: "24/6",
          height: "1m63",
          hometown: "Ninh Bình",
          location: "Hồ Chí Minh City",
          facebook: "https://www.facebook.com/100085279261059"
        }
      ];

      const choice = parseInt(body);
      if (isNaN(choice) || choice < 1 || choice > 3) {
        return api.sendMessage("Vui lòng nhập số hợp lệ trong danh sách.", threadID, messageID);
      }

      const selectedAdmin = adminInfo[choice - 1];
      const adminMessage = `
==== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ====
👤 Tên: ${selectedAdmin.name}
🌐 UID: ${selectedAdmin.uid || ''}
👤 Giới tính: ${selectedAdmin.gender}
🎊 Sinh nhật: ${selectedAdmin.birthday}
🏠 Đến từ: ${selectedAdmin.location}
🌸 Facebook: ${selectedAdmin.facebook}
${selectedAdmin.note || ''}
`;

      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(adminMessage, threadID, messageID);
    }
  }
};
