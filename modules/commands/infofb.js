  module.exports.config = {
    name: "infofb",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Lấy thông tin Facebook",
    commandCategory: "Tiện ích",
    usages: "infofb",
    cooldowns: 5
  };

  module.exports.run = async function ({ api, event, args, client, Users }) {
    const { senderID, type, messageReply } = event;
    const axios = require("axios");

    try {
      const response = await axios.get(`https://nguyenmanh.name.vn/api/fbInfo?id=${senderID}&apikey=pteyEeya`);

      // Kiểm tra nếu response có thuộc tính "result"
      if (response.data && response.data.result) {
        const userData = response.data.result;

        // In thông tin người dùng
        const infoMessage = `User ID: ${userData.id}\nName: ${userData.name}\nBirthday: ${userData.birthday}\nFollowers: ${userData.follow}\nProfile URL: ${userData.profileUrl}\nGender: ${userData.gender}\nRelationship: ${userData.relationship}\nLove: ${userData.love}\nWebsite: ${userData.website}`;

        // Gửi thông tin người dùng dưới dạng tin nhắn
        api.sendMessage(infoMessage, senderID, messageReply);
      } else {
        console.log('Không có dữ liệu hợp lệ từ API.');
      }
    } catch (error) {
      console.error('Lỗi khi truy xuất API:', error.message);
    }
  };
