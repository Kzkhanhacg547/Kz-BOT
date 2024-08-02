const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const Youtube = require('youtube-search-api');

async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if (!link) return 'Thiếu link';
  try {
    const stream = ytdl(link, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });

    const writer = fs.createWriteStream(path);
    stream.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const data = await ytdl.getInfo(link);
    return {
      title: data.videoDetails.title,
      dur: Number(data.videoDetails.lengthSeconds),
      viewCount: data.videoDetails.viewCount,
      likes: data.videoDetails.likes,
      author: data.videoDetails.author.name,
      timestart: timestart
    };
  } catch (error) {
    console.error('Error downloading music:', error);
    throw error;
  }
}

module.exports.config = {
  name: "sing2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "",
  description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
  commandCategory: "Tiện ích",
  usages: "[searchMusic]",
  cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { threadID, messageID, senderID } = event;
  const { link } = handleReply;

  if (event.senderID != handleReply.author) return;

  const path = `${__dirname}/cache/sing-${senderID}.mp3`;

  try {
    api.unsendMessage(handleReply.messageID);
    const data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + link[event.body - 1], path);

    if (fs.statSync(path).size > 26214400) {
      fs.unlinkSync(path);
      return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', threadID, messageID);
    }

    const body = `✎ ﹏✦ 𝚠 𝚎 𝚕 𝚌 𝚘 𝚖 𝚎   𝚝𝚘 
               𝙺 𝚣  𝙱 𝚘 𝚝  𝚖 𝚞 𝚜 𝚒 𝚌❞﹏
𝙼𝚞𝚜𝚒𝚌 𝙽𝚊𝚖𝚎: ${data.title}
𝚃𝚒𝚖𝚎: ${this.convertHMS(data.dur)}
𝙲𝚑𝚊𝚗𝚎𝚕: ${data.author}
𝚅𝚒𝚎𝚠: ${data.viewCount}
𝙿𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚃𝚒𝚖𝚎: ${Math.floor((Date.now() - data.timestart) / 1000)}s

↻          ◁    𝙸𝙸    ▷          ↺

ᴠᴏʟᴜᴍᴇ : ▮▮▮▮▮▮▮▮▯▯▯`;

    api.sendMessage({ body, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
  } catch (error) {
    console.error('Error in handleReply:', error);
    api.sendMessage('Đã xảy ra lỗi khi xử lý yêu cầu của bạn.', threadID, messageID);
  }
};

module.exports.convertHMS = function (value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return (hours != '00' ? hours + ':' : '') + minutes + ':' + seconds;
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  if (args.length == 0) {
    return api.sendMessage('» Phần tìm kiếm không được để trống!', threadID, messageID);
  }

  const keywordSearch = args.join(" ");

  if (args.join(" ").indexOf("https://") == 0) {
    const path = `${__dirname}/cache/sing-${event.senderID}.mp3`;
    try {
      const data = await downloadMusicFromYoutube(args.join(" "), path);

      if (fs.statSync(path).size > 26214400) {
        fs.unlinkSync(path);
        return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', threadID, messageID);
      }

      const body = `✎ ﹏✦ 𝚠 𝚎 𝚕 𝚌 𝚘 𝚖 𝚎   𝚝𝚘 
               𝙺 𝚣  𝙱 𝚘 𝚝  𝚖 𝚞 𝚜 𝚒 𝚌❞﹏
𝙼𝚞𝚜𝚒𝚌 𝙽𝚊𝚖𝚎: ${data.title}
𝚃𝚒𝚖𝚎: ${this.convertHMS(data.dur)}
𝙲𝚑𝚊𝚗𝚎𝚕: ${data.author}
𝚅𝚒𝚎𝚠: ${data.viewCount}
𝙿𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚃𝚒𝚖𝚎: ${Math.floor((Date.now() - data.timestart) / 1000)}s

↻          ◁    𝙸𝙸    ▷          ↺

ᴠᴏʟᴜᴍᴇ : ▮▮▮▮▮▮▮▮▯▯▯`;

      api.sendMessage({ body, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (error) {
      console.error('Error in run function:', error);
      api.sendMessage('Đã xảy ra lỗi khi xử lý yêu cầu của bạn.', threadID, messageID);
    }
  } else {
    try {
      const searchResults = await Youtube.GetListByKeyword(keywordSearch, false, 6);
      const link = [], msg = [];
      let num = 0; // Change const to let

      for (let value of searchResults.items) {
        if (typeof value.id == 'undefined') continue;
        link.push(value.id);
        num = num += 1;
        msg.push(`${num}. ${value.title} (${value.length.simpleText})`);
      }

      const body = `»🔎 Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg.join("\n")}\n\n» Hãy reply(phản hồi) chọn một trong những tìm kiếm trên`;

      api.sendMessage({ body }, threadID, (error, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          link
        });
      }, messageID);
    } catch (error) {
      console.error('Error in run function:', error);
      api.sendMessage('Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.', threadID, messageID);
    }
  }
};
