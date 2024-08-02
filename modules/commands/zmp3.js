const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "zmp3",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Phát nhạc thông qua từ khoá tìm kiếm ZingMp3",
    commandCategory: "Tiện ích",
    usages: "từ khoá tìm kiếm",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": "",
        "request": ""
    },
};

module.exports.run = async function ({ api, event, args }) {
    if (args.length === 0 || !args) {
        return api.sendMessage("Vui lòng nhập từ khóa tìm kiếm trên ZingMp3.", event.threadID, event.messageID);
    }

    const keyword = args.join(" ");

      const searchAPI = `https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/zingmp3/search?apikey=kzkhanhz7517222606&keyword=${encodeURIComponent(keyword)}`;

      try {
          const searchResponse = await axios.get(searchAPI);
          const data = searchResponse.data.data;

          if (!data || data.length === 0 || !data[0].song || data[0].song.length === 0) {
              return api.sendMessage(`Không tìm thấy kết quả nào cho "${keyword}" trên ZingMp3.`, event.threadID, event.messageID);
          }

          const songs = data[0].song;

          // Hiển thị menu với danh sách các bài hát
          const menuItems = songs.map((song, index) => `${index + 1}. ${song.name} - ${song.artist}`).join("\n");
          const menuText = `🎵 Kết quả tìm kiếm cho "${keyword}":\n${menuItems}\n\nHãy chọn số tương ứng với bài hát bạn muốn nghe.`;

          api.sendMessage(menuText, event.threadID, async (error, info) => {
              global.client.handleReply.push({
                  type: 'zingmp3',
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  songs
              });
          });

      } catch (error) {
          console.error(error);
          return api.sendMessage(`Đã xảy ra lỗi khi tìm kiếm bài hát trên ZingMp3. Vui lòng thử lại sau.`, event.threadID, event.messageID);
      }
  };
// Module xử lý reply từ người dùng khi họ chọn một bài hát
module.exports.handleReply = async function ({ api, event, handleReply }) {
    const selectedSongIndex = parseInt(event.body);
    const selectedSong = handleReply.songs[selectedSongIndex - 1];

    if (!selectedSong) {
        return api.sendMessage(`Lựa chọn không hợp lệ. Vui lòng chọn một số trong danh sách.`, event.threadID, event.messageID);
    }

    const downloadAPI = `https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/zingmp3/download?apikey=kzkhanhz7517222606&link=${selectedSong.id}`;

    try {
        const downloadResponse = await axios.get(downloadAPI, { responseType: 'stream' });
        const filePath = `${__dirname}/cache/zingmp3-${event.senderID}.mp3`;
        const fileStream = fs.createWriteStream(filePath);

        downloadResponse.data.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close();

            api.sendMessage({
                body: `🎵 Bài hát: ${selectedSong.name}\n👨‍🎤 Nghệ sĩ: ${selectedSong.artist}\n⏱️ Thời lượng: ${selectedSong.duration} giây`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        });

        fileStream.on('error', (error) => {
            console.error(error);
            return api.sendMessage(`Đã xảy ra lỗi khi tải bài hát từ ZingMp3. Vui lòng thử lại sau.`, event.threadID, event.messageID);
        });

    } catch (error) {
        console.error(error);
        return api.sendMessage(`Đã xảy ra lỗi khi tải bài hát từ ZingMp3. Vui lòng thử lại sau.`, event.threadID, event.messageID);
    }
};
