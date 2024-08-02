const axios = require('axios');
const fs = require('fs');
const API = global.config.API.domain1;

module.exports.config = {
  name: "scl",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Kz Khánhh",
  description: "",
  commandCategory: "Tiện ích",
  usages: "soundcloud <tên bài hát>",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  if (args.length === 0) {
    return api.sendMessage("Vui lòng nhập tên bài hát cần tìm kiếm trên SoundCloud.", event.threadID, event.messageID);
  }

  const keyword = args.join(" ");
  const searchAPI = `${API}/soundcloud/search?apikey=kzkhanhz7517222606&keyword=${encodeURIComponent(keyword)}`;

  try {
    const searchResponse = await axios.get(searchAPI);
    const tracks = searchResponse.data.collection;

    if (tracks.length === 0) {
      return api.sendMessage(`Không tìm thấy kết quả nào cho "${keyword}" trên SoundCloud.`, event.threadID, event.messageID);
    }

    const menuItems = tracks.map((track, index) => `${index + 1}. ${track.title}`).join("\n");
    const menuText = `🔍 Kết quả tìm kiếm cho "${keyword}":\n${menuItems}\n\nHãy chọn số tương ứng với bài hát bạn muốn nghe.`;

    api.sendMessage(menuText, event.threadID, (error, info) => {
      if (error) {
        console.error(error);
        return api.sendMessage("Đã xảy ra lỗi khi gửi kết quả tìm kiếm.", event.threadID, event.messageID);
      }
      global.client.handleReply.push({
        type: 'soundcloud',
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        tracks
      });
    });

  } catch (error) {
    console.error(error);
    return api.sendMessage("Đã xảy ra lỗi khi tìm kiếm bài hát trên SoundCloud. Vui lòng thử lại sau.", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const selectedTrackIndex = parseInt(event.body) - 1;
  const selectedTrack = handleReply.tracks[selectedTrackIndex];

  if (!selectedTrack) {
    return api.sendMessage("Lựa chọn không hợp lệ. Vui lòng chọn một số trong danh sách.", event.threadID, event.messageID);
  }

  const downloadAPI = `${API}/soundcloud/download?apikey=kzkhanhz7517222606&link=${selectedTrack.permalink_url}`;

  try {
    const downloadResponse = await axios.get(downloadAPI, { responseType: 'stream' });
    const filePath = `${__dirname}/cache/soundcloud-${event.senderID}.mp3`;
    const fileStream = fs.createWriteStream(filePath);

    downloadResponse.data.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      api.sendMessage({
        body: `🎵 Bài hát: ${selectedTrack.title}\n❤️ Số lượt thích: ${selectedTrack.likes_count}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => {
        fs.unlinkSync(filePath);
        api.unsendMessage(handleReply.messageID); // Unsend the message with the track list
      }, event.messageID);
    });

    fileStream.on('error', (error) => {
      console.error(error);
      return api.sendMessage("Đã xảy ra lỗi khi tải bài hát từ SoundCloud. Vui lòng thử lại sau.", event.threadID, event.messageID);
    });

  } catch (error) {
    console.error(error);
    return api.sendMessage("Đã xảy ra lỗi khi tải bài hát từ SoundCloud. Vui lòng thử lại sau.", event.threadID, event.messageID);
  }
};
