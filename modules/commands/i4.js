const axios = require('axios');
const fs = require('fs-extra');
const request = require('request');
const API = global.config.API.domain1;

module.exports.config = {
  name: "i4",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Kz Khánhh",
  description: "Xem info Facebook",
  commandCategory: "Hệ thống",
  cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
  const userId = event.senderID; // Get the sender's user ID

  try {
    // Call API to get Facebook info
    const apiUrl = `${API}/facebook/info?uid=${userId}`;
    const response = await axios.get(apiUrl);

    // Check if API response is successful
    if (response.status === 200 && response.data.result) {
      const result = response.data.result;

      // Prepare the message with user information
      const message = `
        📌 Thông tin Facebook của bạn:\n🔹 Tên: ${result.name || 'Không có'}\n🔹 Tuổi: ${result.age?.min || 'Không có'}-${result.age?.max || 'Không có'}\n🔹 Giới tính: ${result.gender || 'Không có'}\n🔹 Trường học: ${result.education?.[0]?.school?.name || 'Không có'}\n🔹 Quê quán: ${result.hometown?.name || 'Không có'}\n🔹 Link Facebook: ${result.link || 'Không có'}\n🔹 Ngày sinh: ${result.birthday || 'Không có'}\n🔹 Số người theo dõi: ${result.follower || 'Không có'}\n🔹 Avatar: ${result.avatar || 'Không có'}\n🔹 Mối quan hệ: ${result.relationship || 'Không có'}\n🔹 Sở thích: ${result.love?.name || 'Không có'}
      `;

      // Download the avatar image
      const avatarUrl = result.avatar;
      const avatarPath = __dirname + '/cache/avatar.jpg';

      const downloadAvatar = (url, path, callback) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback);
      };

      downloadAvatar(avatarUrl, avatarPath, () => {
        // Send the message with the avatar image
        api.sendMessage({
          body: message.trim(),
          attachment: fs.createReadStream(avatarPath)
        }, event.threadID, () => {
          // Delete the image after sending the message
          fs.unlinkSync(avatarPath);
        });
      });
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    // Handle errors during API call
    console.error(error);
    api.sendMessage("Đã xảy ra lỗi khi lấy thông tin Facebook.", event.threadID, event.messageID);
  }
};
